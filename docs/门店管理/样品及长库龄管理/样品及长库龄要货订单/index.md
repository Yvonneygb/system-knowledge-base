---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

样品及长库龄要货订单与家装要货、工程要货共用同一套代码实体（SaOutBillHead / SaOutBillLine），通过 `isMakt=2` 区分。

```text
SA_OUT_BILL_HEAD (要货订单头表)
  │
  ├──< SA_OUT_BILL_LINE (要货订单行表)
  │       └── DISCOUNT_POLICY_ITEM_ID 关联折扣政策产品行
  │
  └──> EPM_DISCOUNT_POLICY (折扣政策头, 折扣政策类型时关联)
```

#### 核心区分字段

| 字段 | 样品及长库龄 | 工程要货 | 家装要货 |
|------|-------------|---------|---------|
| isMakt | **2** | 非2 | 非2 |
| isHome | 非2 | 非2 | **2** |
| businessType | **3=样品, 12=家装样品, 16=长库龄** | 1/8/10 | 9 |
| priceType | **2=折扣政策, 3=价目表** | 1/2/3 | 1/2 |
| channel值集 | **AE.MKT.SALES_CHANNEL** | AE.SALES.CHANNEL | AE.MKT.SALES_CHANNEL |

#### 头表关键字段（SA_OUT_BILL_HEAD）

| 字段名 | 类型 | 说明 | 取值逻辑 |
|--------|------|------|---------|
| isMakt | Integer | 是否营销中台 | 2=是（样品及长库龄标识） |
| businessType | Long | 业务类型 | 3=样品, 12=家装样品, 16=长库龄 |
| discountPolicyId | Long | 政策头ID | 折扣政策类型必填 |
| priceType | Integer | 价格类型 | 2=折扣政策, 3=价目表 |
| projectId | Long | 项目ID | 折扣政策类型时projectId=0（非家装直签） |
| projectIntention | Long | 是否工程意向 | 可为2（意向单） |

</div>

<div class="kb-module-alt">

### 保存与校验

**保存流程**：
1. preCheckData → 校验紧急行数/业务类型必填/折扣政策一致性/起订量/封顶量
2. verifyCustomer → 校验客户信息
3. updateActiveQty → 返还旧的可下单数量
4. saveHeadData → 保存头信息
5. saveLineData → 保存行信息
6. updateActiveQty → 扣减新的可下单数量

**样品及长库龄专属校验**：

| 校验点 | 规则 |
|--------|------|
| 业务类型必填 | isMakt=2时businessType不能为空 |
| 折扣政策一致性 | businessType/channel/billType需与折扣政策一致 |
| 起订量 | 订单行数量≥折扣政策产品行起订量 |
| 封顶量 | 订单行数量≤折扣政策坎级封顶量 |
| 期望有效期 | 期望到达日期不能晚于政策有效期 |
| 紧急行数 | 仅计划订单(billType=2/14)可加急，上限=ceil(总行数/5) |

</div>

<div class="kb-module">

### 删除限制

| 条件 | 异常信息 |
|------|---------|
| hzApproveStatus=APPROVED 或 stat=5 | 单据已经审核，不允许删除 |
| isAuditingWh=2 | 单据已经审核，不允许删除 |
| saSalebillno不为空 | 具备了订单号的订单，不允许删除 |

</div>

<div class="kb-module-alt">

### 折扣政策价格获取

**执行流程** (`doGetPolicyPrice`)：
1. 获取行信息 → 查询折扣政策产品项(epm_discount_policy_item)
2. 设置申请类型、优惠类型、封顶量
3. 按申请类型分组调用CRM接口获取产品信息
4. 设置CRM返回属性（安装、标准单价、折扣率等）
5. 获取折扣率（出厂折扣率+客户折扣率）
6. 计算折后价格

**CRM业务类型映射**：
- businessType=3 → Sample（样品）
- businessType=12 → HomeDecorationSample（家装样品）
- businessType=16 → Long_Inv_Age（长库龄）

</div>

<div class="kb-module">

### 状态流转

```text
制单(stat=1) → 保存 → 
  ├── 折扣政策 → OA审批(hzApproveStatus=NEW) → 审批通过 → 生成CRM → ERP发货
  ├── 价目表 → 直接生成CRM(hzApproveStatus=NO_APPROVED) → ERP发货
  └── 折扣单 → 直接生成CRM(hzApproveStatus=NO_APPROVED) → ERP发货
```

| priceType | 审批路径 | 是否送签OA |
|-----------|---------|-----------|
| 2(折扣政策) | OA审批→CRM | 是 |
| 3(价目表) | 直接生成CRM | 否 |

> 样品及长库龄一般使用折扣政策(priceType=2)或价目表(priceType=3)，折扣单(priceType=1)不常用

</div>

<div class="kb-module-alt">

### OA审批推送

**OA单据名称**：YPYHDD（样品要货订单）

**推送流程** (`doOaRequestOrderAudit`)：
1. 查询业务单据信息
2. 已审批且非EBS退回状态跳过
3. 折扣政策类型校验行有效性
4. 获取OA单据配置(OABillRef)
5. 封装OA头/行信息 → 推送OA
6. 更新审核状态：auditStat="已送签OA", reviwestatus=1, callbackSource=WAIT

**OA行字段名**：样品编码/样品名称（区别于工程订单的产品编码/产品名称）

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1: 折扣政策类型订单起订量校验失败 🔴高频

**现象**：保存时报错起订量不足

**根因**：订单行下单数量小于折扣政策坎级行的起订量(minimumQty)

**排查SQL**：
```sql
SELECT EPIL.MINIMUM_QTY, EPIL.CAPPING_QTY 
FROM EPM_DISCOUNT_POLICY_ITEM_LINE EPIL
WHERE EPIL.DISCOUNT_POLICY_ITEM_ID = :policyItemId;
```

> 下单数量必须 >= MINIMUM_QTY

</div>

<div class="kb-module-alt">

### Q2: 折扣政策封顶量超限 🔴高频

**现象**：保存时报错封顶量超限

**根因**：订单行下单数量超过折扣政策坎级封顶量或经销商封顶量

**排查SQL**：
```sql
SELECT EPIL.CAPPING_QTY, EPIC.CAPPING_QTY AS CUSTOMER_CAP
FROM EPM_DISCOUNT_POLICY_ITEM_LINE EPIL
LEFT JOIN EPM_DISCOUNT_POLICY_ITEM_CUSTOMER EPIC 
  ON EPIL.DISCOUNT_POLICY_ITEM_ID = EPIC.DISCOUNT_POLICY_ITEM_ID
WHERE EPIL.DISCOUNT_POLICY_ITEM_ID = :policyItemId;
```

</div>

<div class="kb-module">

### Q3: 业务类型与折扣政策不一致 🟡偶发

**现象**：保存时报错业务类型/渠道/订单类型与折扣政策不一致

**根因**：订单的 businessType、channel、billType 与关联的折扣政策字段不匹配

**排查**：对比 SA_OUT_BILL_HEAD 和 EPM_DISCOUNT_POLICY 的对应字段

</div>

<div class="kb-module-alt">

### Q4: 可下单数量不足

**现象**：下单时折扣行的可下单数量为0或不足

**根因**：折扣政策行的 `active_qty` 已被其他订单占用

**排查SQL**：
```sql
SELECT DISCOUNT_APPLY_LINE_ID, CONTRACT_QTY, ACTIVE_QTY, ORDERED_QTY
FROM EPM_DISCOUNT_APPLY_LINE
WHERE DISCOUNT_APPLY_LINE_ID = :applyLineId;
```

</div>

<div class="kb-module">

### Q5: 删除订单报错"具备了订单号" 🔴高频

**现象**：删除订单时报错不允许删除

**根因**：`saSalebillno` 不为空，表示CRM已生成订单号，不可删除

**解决**：已推CRM的订单无法删除，只能通过CRM取消/退回流程处理

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：确认订单基本信息**

```sql
SELECT SA_OUT_BILL_HEAD_ID, SA_SALEBILLNO, IS_MAKT, IS_HOME, CHANNEL,
       PRICE_TYPE, BUSINESS_TYPE, BILL_TYPE, ORDER_STAT, HZ_APPROVE_STATUS,
       DISCOUNT_POLICY_ID, PROJECT_ID
FROM SA_OUT_BILL_HEAD 
WHERE SA_OUT_BILL_HEAD_ID = :orderId;
```

> IS_MAKT=2, IS_HOME!=2 为样品及长库龄订单

</div>

<div class="kb-module-alt">

**步骤2：检查折扣政策有效性**

```sql
SELECT DISCOUNT_POLICY_ID, DISCOUNT_POLICY_CODE, VALID, 
       EFFECTIVE_DATE_START, EFFECTIVE_DATE_END, SUITABLE_TYPE
FROM EPM_DISCOUNT_POLICY 
WHERE DISCOUNT_POLICY_ID = :policyId;
```

> VALID=2有效, 3失效；有效结束日期需 >= 当前日期

</div>

<div class="kb-module">

**步骤3：检查订单行与政策产品关联**

```sql
SELECT SA_OUT_BILL_LINE_ID, ITEM_CODE, QTY_BILL, DISCOUNT_RATE, 
       DISCOUNT_POLICY_ITEM_ID, CUSTOMER_DISCOUNT_RATE, EXTRA_DISCOUNT_RATE
FROM SA_OUT_BILL_LINE 
WHERE SA_OUT_BILL_HEAD_ID = :orderId;
```

> DISCOUNT_POLICY_ITEM_ID 应不为空（折扣政策类型）

</div>

<div class="kb-module-alt">

**步骤4：检查政策坎级行起订量/封顶量**

```sql
SELECT EPIL.DISCOUNT_POLICY_ITEM_LINE_ID, EPIL.MINIMUM_QTY, EPIL.CAPPING_QTY,
       EPIL.DISCOUNT_RATE, EPIL.SPECIAL_OFFER
FROM EPM_DISCOUNT_POLICY_ITEM_LINE EPIL
WHERE EPIL.DISCOUNT_POLICY_ID = :policyId;
```

> 起订量/封顶量校验规则：QTY_BILL >= MINIMUM_QTY 且 <= CAPPING_QTY

</div>

<div class="kb-module">

**步骤5：检查CRM订单号与状态**

```sql
SELECT SA_OUT_BILL_HEAD_ID, SA_SALEBILLNO, ORDER_STAT, CALLBACK_SOURCE,
       STAT, HZ_APPROVE_STATUS
FROM SA_OUT_BILL_HEAD 
WHERE SA_OUT_BILL_HEAD_ID = :orderId;
```

> SA_SALEBILLNO不为空→CRM已生成订单号；ORDER_STAT反映CRM返回状态

</div>

</div>

<div id="history">

<div class="kb-module">

> 本页面记录真实排查案例，用于频次分析和趋势监控。

| 日期 | 问题简述 | 根因 | 耗时 | 频次标记 |
|------|---------|------|------|---------|
| — | — | — | — | — |

</div>

<div class="kb-module-alt">

### 按根因分类统计

| 根因分类 | 次数 | 占比 |
|---------|------|------|
| 数据异常 | 0 | 0% |
| 逻辑缺陷 | 0 | 0% |
| 并发冲突 | 0 | 0% |
| 配置错误 | 0 | 0% |
| 其他 | 0 | 0% |

> 暂无数据，积累排查记录后自动更新。

</div>

</div>

<div id="related">

<div class="kb-module">

### 上游依赖

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 折扣政策(EPM_DISCOUNT_POLICY) | 数据依赖 | 折扣政策类型关联政策头ID，控制产品/价格/数量 |
| 折扣政策产品行(EPM_DISCOUNT_POLICY_ITEM) | 数据依赖 | 关联政策产品ID，获取产品价格和折扣率 |
| 折扣政策坎级(EPM_DISCOUNT_POLICY_ITEM_LINE) | 数据依赖 | 起订量/封顶量校验 |
| 客户组织(CUSTOMER_ORG) | 数据依赖 | 客户信息、客户折扣率 |
| CRM系统 | 数据依赖 | 产品信息同步、开票单位校验 |

</div>

<div class="kb-module-alt">

### 下游影响

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| CRM系统 | 业务触发 | 生成CRM订单，推送业务类型为Sample/HomeDecorationSample/Long_Inv_Age |
| OA审批系统 | 流程依赖 | 折扣政策类型提交OA审批(YPYHDD单据名) |
| ERP发货 | 业务触发 | CRM订单成功后ERP发货 |
| 折扣政策行数量 | 数据更新 | 下单时扣减可下单数量，删除时返还 |

</div>

</div>
