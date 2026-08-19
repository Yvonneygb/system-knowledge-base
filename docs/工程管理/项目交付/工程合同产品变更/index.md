# 工程管理-项目交付-工程合同产品变更

---

## 业务流程

### 业务流程图

```text
折扣单(已审批) → 新建合同产品变更单 → 选择折扣单 → 生成变更数据
  ↓
展示变更前/变更后产品行对比 → 修改变更后产品行(价格/数量/折扣率)
  ↓
保存 → 生成变更单号
  ↓
保存并提交 → 启动审批流程(DISCOUNT_ECN_CHANGE)
  ↓
审批通过 → 同步更新折扣单主数据(产品行/价格/折扣率/金额)
```

### 上游依赖

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程折扣单 | 数据依赖 | 变更基于已有折扣单 | 折扣单审批状态=APPROVED |
| 工程项目合同 | 数据依赖 | 折扣单关联合同 | 合同有效状态=2(已生效) |
| 产品主数据 | 数据依赖 | 变更行引用产品信息 | 产品已上架 |

### 下游影响

- 影响1：折扣单数据更新
  - 审批通过后，同步更新原折扣单的产品行、价格、折扣率、金额等数据

---

## 重点逻辑

### 重点逻辑1：与工程折扣延期共用后端代码 {共用代码}

- **业务意义**：合同产品变更和折扣延期共用EPM_DISCOUNT_ECN表和Controller，通过ecnType区分

- **具体逻辑描述**

  - 第1点：合同产品变更ecnType=1，折扣延期ecnType=2

  - 第2点：共用EpmDiscountEcnController和ServiceImpl

### 重点逻辑2：变更前后对比 {数据对比}

- **业务意义**：展示变更前后的产品行数据对比，便于审批人员判断

- **具体逻辑描述**

  - 第1点：前端使用LineBeforeDS(变更前)和LineDS(变更后)两个DataSet

  - 第2点：变更前行数据从原折扣单获取，变更后行数据可修改

### 重点逻辑3：实时获取产品价格 {价格计算}

- **业务意义**：变更时实时获取最新产品价格，确保价格准确

- **具体逻辑描述**

  - 第1点：调用generateDiscountDatas接口，实时获取产品价格

  - 第2点：重新计算相关金额(calculationamount)

### 重点逻辑4：可选折扣单的筛选条件 {折扣单筛选}

- **业务意义**：合同产品变更时，只能选择符合条件的折扣单进行变更，确保数据有效性和业务合规

- **接口入口**：`POST /v1/{organizationId}/contracts-update/discount-apply-list`
  - Controller: `ContractUpdateController.getDiscountApplyList`
  - Service: `ContractUpdateServiceImpl.getDiscountApplyList`
  - SQL: `EpmProjectContractMapper.getDiscountApply`

- **Service层前置处理**（`ContractUpdateServiceImpl` 行104-112）：
  - 当 `searchFlag=1`（折扣单列表页）或 `searchFlag=2`（要货单下单时），自动设置 `projectCategory='small'`，SQL中用 `c.project_category != 'small'` 排除小型项目折扣单
  - 合同产品变更场景 `searchFlag=3` 不做此过滤

- **筛选条件清单**（searchFlag=3 合同产品变更场景）：

| # | 条件 | SQL片段 | 说明 |
|---|------|---------|------|
| 1 | 合同ID匹配 | `a.contract_id = #{contractId}` | 折扣单必须关联当前合同 |
| 2 | 折扣单已审批 | `a.stat = 5` | 折扣单审批状态必须为5（已审批） |
| 3 | 合同有效 | `c.valid = 2`（当isMakt=0时） | 关联合同必须为有效状态 |
| 4 | 折扣单在有效期内 | `trunc(sysdate) <= trunc(a.discount_valid_date)` | 当前日期不能超过折扣单有效期 |
| 5 | 有可下单数量 | `a.discount_apply_id in (select discount_apply_id from epm_discount_apply_line where active_qty > 0)`（当searchType!=1时） | 折扣单行必须有剩余可下单数量 |
| 6 | 事业部匹配 | `a.organization_id = #{organizationId}` | 折扣单属于当前事业部 |
| 7 | 营销中台标识 | `a.is_makt = #{isMakt}` | 按是否营销中台过滤 |
| 8 | 家装标识 | `a.is_home = #{isHome}` | 按是否家装合同过滤 |
| 9 | 合同未失效 | 计算字段 `failure_cause` | 不存在合同失效变更单(Ecn_Type=2且stat=5) |
| 10 | 项目未结案 | 计算字段 `failure_cause` | 项目状态不为结案(stat=5且stage_name='项目结案') |

- **其他可选过滤条件**（前端传入时生效）：
  - `contractCode` — 合同编码模糊查询
  - `discountApplyCode` — 折扣单号模糊查询
  - `customerId` — 客户ID精确匹配
  - `projectId` — 项目ID精确匹配
  - `itemCode` — 产品编码模糊查询（通过折扣单行）
  - `model` — 产品型号模糊查询（通过折扣单行）
  - `customerCode/customerName` — 客户编码/名称模糊查询
  - `createTime/createTimeEnd` — 申请时间范围
  - `discountValidDate/discountValidDateEnd` — 有效期范围
  - `contractType` — 签约方式
  - `supplementType` — 增补类型
  - `tradingCompanyName/billingUnitName/contractName` — 交易公司/开票单位/合同名称模糊查询

- **searchFlag各场景对比**：

| searchFlag | 场景 | stat=5 | 排除小型项目 | 合同有效 | 有效期内 | 可下单数量 | 延期单排除 | 提前天数校验 |
|:---:|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 折扣单列表页 | - | ✓ | - | - | - | - | - |
| 2 | 要货单下单 | ✓ | ✓ | ✓(isMakt=0) | ✓ | ✓(searchType!=1) | - | - |
| 3 | 折扣变更 | ✓ | - | ✓(isMakt=0) | ✓ | ✓(searchType!=1) | - | - |
| 4 | 折扣延期 | ✓ | - | ✓(isMakt=0) | - | - | ✓ | ✓ |
| 5 | 其他场景 | ✓ | - | ✓(isMakt=0) | ✓ | ✓(searchType!=1) | - | - |

- **完整SQL**（searchFlag=3场景的核心查询）：

```sql
SELECT a.*,
       ct.short_name,
       co.operat_center_org_name,
       co.salezone_org_name,
       nvl(c.include_freight_flag,'N') includeFreightFlag,
       c.valid AS contractValid,
       c.contract_amt,
       c.strategic_related,
       c.signed_date,
       c.supplement_type,
       c.business_type,
       c.currency,
       c.has_offer_invoice hasOfferInvo,
       c.completed_type,
       c.completed_date,
       c.project_category,
       c.include_customize_flag,
       c.multiple_orders_flag,
       c.is_custom isCustomType,
       ep1.is_local,
       ep2.project_code strategicProjectCode,
       ep2.project_name strategicProjectName,
       ep1.project_type,
       ep1.project_valid,
       r.province_name projectProvince,
       r.city_name projectCity,
       r.area_name projectArea,
       r.area_full_name,
       r.address,
       r.project_source,
       r.business_unit_type,
       ecn.ecn_type ecnTypeDiscount,
       ecn.stat ecnStat,
       CASE WHEN (SELECT count(1) FROM Epm_Project_Contract_Ecn c
                  WHERE c.contract_id = a.contract_id AND c.Ecn_Type = 2 AND c.stat = 5) > 0
            THEN '合同失效'
            WHEN (SELECT count(1) FROM epm_project p
                  WHERE p.project_id = a.project_id AND p.stat = 5 AND p.stage_name = '项目结案') > 0
            THEN '项目结案'
            ELSE '' END failure_cause,
       -- 已发货数量
       (SELECT sum(sobl.confirm_out_qty) FROM sa_out_bill_line sobl
        WHERE sobl.discount_apply_line_id IN
          (SELECT al.discount_apply_line_id FROM epm_discount_apply_line al
           WHERE al.discount_apply_id = a.discount_apply_id)) confirm_out_q,
       -- 已发货金额 = 已发数量 × 折后单价
       (SELECT sum(sobl.confirm_out_qty * sobl.discounted_price) FROM sa_out_bill_line sobl
        WHERE sobl.discount_apply_line_id IN
          (SELECT al.discount_apply_line_id FROM epm_discount_apply_line al
           WHERE al.discount_apply_id = a.discount_apply_id)) confirm_out_a,
       cd.discount_rules,
       iu.REAL_NAME createdByName
FROM epm_discount_apply a
LEFT JOIN epm_project_contract c ON a.contract_id = c.contract_id
LEFT JOIN epm_project_contract_ecn ecn ON c.contract_id = ecn.contract_id AND ecn.stat != 5
LEFT JOIN epm_project ep1 ON ep1.project_id = c.project_id
LEFT JOIN epm_project ep2 ON ep2.project_id = ep1.rel_project_id
LEFT JOIN customer ct ON ct.customer_id = a.customer_id
LEFT JOIN customer_org co ON a.CUSTOMER_ID = co.CUSTOMER_ID
LEFT JOIN epm_report r ON a.project_id = r.project_id
LEFT JOIN cm_disc_preset_rate_dtl cd ON cd.project_id = c.project_id
LEFT JOIN HZERO.IAM_USER iu ON a.CREATED_BY = iu.ID
WHERE a.contract_id = #{contractId}          -- 1.合同ID匹配
  AND a.stat = 5                               -- 2.折扣单已审批
  AND c.valid = 2                              -- 3.合同有效(isMakt=0时)
  AND trunc(sysdate) <= trunc(a.discount_valid_date)  -- 4.在有效期内
  AND a.discount_apply_id IN                   -- 5.有可下单数量(searchType!=1时)
      (SELECT discount_apply_id FROM epm_discount_apply_line WHERE active_qty > 0)
  AND a.organization_id = #{organizationId}    -- 6.事业部匹配
ORDER BY a.createtime DESC
```

- **源码位置**：
  - Controller: `biz/project/api/controller/v1/ContractUpdateController.java:70`
  - Service: `biz/project/app/service/impl/ContractUpdateServiceImpl.java:104`
  - SQL Mapper: `resources/mapper/EpmProjectContractMapper.xml:1073`

---

## 详细逻辑

### 界面模块1：合同产品变更列表页

> 前端页面位于 packages/arrow-ae/src/pages/projectManage/DiscountContractChange/views/ListPage/

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 变更单号 | EPM_DISCOUNT_ECN.DISCOUNT_ECN_CODE | 文本框 | 变更单编码 | 常显 | 1.系统自动生成 | - |
| 审核状态 | EPM_DISCOUNT_ECN.HZ_APPROVE_STATUS | 下拉选择框 | 审批状态 | 常显 | 1.来源：值集HWKF.APPROVE_STATUS | 值集HWKF.APPROVE_STATUS |
| 折扣单号 | EPM_DISCOUNT_ECN.SOURCE_DISCOUNT_APPLY_CODE | 文本框 | 源折扣单号 | 常显 | 1.选择折扣单带出 | - |
| 合同编码 | EPM_DISCOUNT_ECN.CONTRACT_CODE | 文本框 | 关联合同编码 | 常显 | 1.折扣单带出 | - |
| 客户名称 | EPM_DISCOUNT_ECN.CUSTOMER_NAME | 文本框 | 经销商名称 | 常显 | 1.折扣单带出 | - |

### 界面模块2：合同产品变更详情页

> 前端页面位于 packages/arrow-ae/src/pages/projectManage/DiscountContractChange/views/DetailPage/

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 变更单号 | EPM_DISCOUNT_ECN.DISCOUNT_ECN_CODE | 文本框 | 变更单编码 | 常显 | 1.保存后自动生成 | - |
| 变更类型 | EPM_DISCOUNT_ECN.ECN_TYPE | 下拉选择框 | 固定为1(合同产品变更) | 常显 | 1.默认值1 | 1 |
| 源折扣单号 | EPM_DISCOUNT_ECN.SOURCE_DISCOUNT_APPLY_CODE | LOV | 源折扣单 | 常显 | 1.选择折扣单LOV带出 | LOV:折扣单 |
| 申请说明 | EPM_DISCOUNT_ECN.ECN_REASON | 文本框 | 变更原因 | 常显 | 1.用户输入 | - |
| 审核状态 | EPM_DISCOUNT_ECN.HZ_APPROVE_STATUS | 下拉选择框 | 审批状态 | 常显 | 1.来源：值集HWKF.APPROVE_STATUS | 值集HWKF.APPROVE_STATUS |

### 界面模块3：变更前后产品行对比

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 产品编码 | EPM_DISCOUNT_ECN_LINE.ITEM_CODE | 文本框 | 产品编码 | 常显 | 1.来源：折扣单行 | - |
| 产品名称 | EPM_DISCOUNT_ECN_LINE.ITEM_NAME | 文本框 | 产品名称 | 常显 | 1.来源：折扣单行 | - |
| 标准单价 | EPM_DISCOUNT_ECN_LINE.STANDARD_PRICE | 数字框 | 标准单价 | 常显 | 1.变更后可修改 | - |
| 出厂折扣率 | EPM_DISCOUNT_ECN_LINE.BASE_DISCOUNT_RATE | 数字框 | 出厂折扣率 | 常显 | 1.变更后可修改 | - |
| 审批折扣率 | EPM_DISCOUNT_ECN_LINE.EXTRA_DISCOUNT_RATE | 数字框 | 审批折扣率 | 常显 | 1.变更后可修改 | - |
| 应用折扣率 | EPM_DISCOUNT_ECN_LINE.DISCOUNT_RATE | 数字框 | 应用折扣率 | 常显 | 1.自动计算=出厂×审批 | - |
| 折后单价 | EPM_DISCOUNT_ECN_LINE.DISCOUNTED_PRICE | 数字框 | 折后单价 | 常显 | 1.自动计算=标准单价×应用折扣率 | - |





### 选择弹窗

> 无弹窗选择功能
### 导入

> 不支持导入功能
### 其他按钮

> 无其他按钮
### 保存校验

> 无保存校验


### 提交校验

> 无提交校验

### 状态机

#



### 选择弹窗

> 无弹窗选择功能
### 导入

> 不支持导入功能
### 其他按钮

> 无其他按钮
### 保存校验

> 无保存校验


### 提交校验

> 无提交校验

### 状态机流转图

```text
[新建 NEW] ──保存并提交──→ [审批中 RUN] ──审批通过──→ [已审批 APPROVED]
                                │
                                └──审批驳回──→ [已驳回 REJECTED]
```

#



### 选择弹窗

> 无弹窗选择功能
### 导入

> 不支持导入功能
### 其他按钮

> 无其他按钮
### 保存校验

> 无保存校验


### 提交校验

> 无提交校验

### 状态机列表

| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、保存并提交、编辑、删除 |
| RUN | 审批中 | 等待审批结果 |
| APPROVED | 已审批 | 查看(折扣单已更新) |
| REJECTED | 已驳回 | 保存、保存并提交、编辑 |

---

## 数据库表详解

### 表1：EPM_DISCOUNT_ECN（折扣变更/延期头）

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_ECN_ID | Long | 变更ID(主键) | - | 自增主键 |
| DISCOUNT_ECN_CODE | String | 变更单号 | 变更单号 | 编码规则自动生成 |
| ECN_TYPE | Long | 变更类型 | 变更类型 | 1=合同产品变更，2=折扣延期 |
| SOURCE_DISCOUNT_APPLY_ID | Long | 源折扣单ID | - | 关联原折扣单 |
| SOURCE_DISCOUNT_APPLY_CODE | String | 源折扣单号 | 源折扣单号 | 关联原折扣单 |
| CONTRACT_ID | Long | 合同ID | - | 折扣单带出 |
| CUSTOMER_ID | Long | 客户ID | - | 折扣单带出 |
| PROJECT_ID | Long | 项目ID | - | 折扣单带出 |
| ECN_REASON | String | 申请说明 | 申请说明 | 用户输入 |
| HZ_APPROVE_STATUS | String | 审批状态 | 审核状态 | NEW/RUN/APPROVED/REJECTED |
| HZ_INSTANCE_ID | Long | 流程实例ID | - | 流程启动后写入 |

### 表2：EPM_DISCOUNT_ECN_LINE（折扣变更/延期行）

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_ECN_LINE_ID | Long | 变更行ID(主键) | - | 自增主键 |
| DISCOUNT_ECN_ID | Long | 变更头ID(外键) | - | 关联头表 |
| ITEM_CODE | String | 产品编码 | 产品编码 | 折扣单行带出 |
| ITEM_NAME | String | 产品名称 | 产品名称 | 折扣单行带出 |
| STANDARD_PRICE | BigDecimal | 标准单价 | 标准单价 | 变更后可修改 |
| BASE_DISCOUNT_RATE | BigDecimal | 出厂折扣率 | 出厂折扣率 | 变更后可修改 |
| EXTRA_DISCOUNT_RATE | BigDecimal | 审批折扣率 | 审批折扣率 | 变更后可修改 |
| DISCOUNT_RATE | BigDecimal | 应用折扣率 | 应用折扣率 | 自动计算=出厂×审批 |
| DISCOUNTED_PRICE | BigDecimal | 折后单价 | 折后单价 | 自动计算=标准单价×应用折扣率 |
| DISCOUNTED_AMOUNT | BigDecimal | 折后金额 | 折后金额 | 自动计算=折后单价×数量 |

---

## 常见问题FAQ

### 报错一览表

| 报错信息 | 提示节点 | 根因与解决方案 | 等级 | 详细逻辑 |
|---------|---------|-------------|------|---------|
| - | - | - | - | - |

### 常见问题

- 问题1：变更审批通过后折扣单数据未更新
  - 原因：审批回调wfComplete未正确触发；排查SQL：`SELECT DE.DISCOUNT_ECN_CODE, DE.HZ_APPROVE_STATUS, DA.DISCOUNT_APPLY_CODE FROM EPM_DISCOUNT_ECN DE JOIN EPM_DISCOUNT_APPLY DA ON DE.SOURCE_DISCOUNT_APPLY_ID = DA.DISCOUNT_APPLY_ID WHERE DE.DISCOUNT_ECN_ID = #{discountEcnId}`
  - 解决思路：检查流程实例状态，手动触发回调

- 问题2：选择折扣单弹窗看不到某个折扣单
  - 原因1：折扣单未审批（stat != 5）
  - 原因2：折扣单已过有效期（discount_valid_date < sysdate）
  - 原因3：折扣单行没有可下单数量（active_qty <= 0）
  - 原因4：关联合同已失效（valid != 2）
  - 原因5：项目已结案（stat=5 且 stage_name='项目结案'）
  - 排查SQL：`SELECT a.discount_apply_code, a.stat, a.discount_valid_date, c.valid, p.stat, p.stage_name FROM epm_discount_apply a LEFT JOIN epm_project_contract c ON a.contract_id=c.contract_id LEFT JOIN epm_project p ON a.project_id=p.project_id WHERE a.discount_apply_code = '折扣单号'`

- 问题3：折扣单列表页和小型项目折扣单的区别
  - 原因：searchFlag=1或2时，Service层自动设置projectCategory='small'，SQL用 `c.project_category != 'small'` 排除小型项目折扣单；searchFlag=3（变更场景）不做此过滤，所有类型项目折扣单都可选

---

## 更新记录

| 日期 | 提交ID | 提交人 | 提交内容 |
|------|-------|-------|---------|
| - | - | - | 暂无2026年提交记录 |