---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

样品及长库龄折扣政策在代码中名为"工程折扣申请单"（EpmDiscountApply），是要货订单的来源单据。折扣单定义了客户在特定合同/项目下可购买的产品、数量、折扣率和价格。折扣行的 `active_qty` 控制要货订单可下单数量。

```text
EPM_DISCOUNT_APPLY (折扣申请头表)
  │
  ├──< EPM_DISCOUNT_APPLY_LINE (折扣明细行)
  │       ├── active_qty = contract_qty - ordered_qty - replaced_qty - delayed_qty
  │       ├── policyFlag='Y'时引用统一折扣政策(sourcePolicyId)
  │       │
  │       └──< EPM_DISCOUNT_APPLY_LINE_EXT (行扩展-库龄/生命周期)
  │
  ├──< EPM_DISCOUNT_APPLY_PLAN (预计提货计划)
  │
  └──> EPM_PROJECT (项目报备, 通过projectId关联)
  └──> EPM_PROJECT_CONTRACT (工程合同, 通过contractId关联)
```

#### 头表关键字段（EPM_DISCOUNT_APPLY）

| 字段名 | 类型 | 说明 | 取值逻辑 |
|--------|------|------|---------|
| discountApplyId | Long | 折扣单ID（主键） | 自增 |
| discountApplyCode | String | 折扣单编码 | 编码规则AE_EPM_DISCOUNT_APPLY+4位流水号 |
| isHome | Long | 是否家装 | 默认0，2=家装 |
| isMakt | Long | 是否营销中台 | 样品及长库龄时设为2 |
| contractId | Long | 合同ID | 关联工程合同 |
| projectId | Long | 项目ID | 关联项目报备 |
| discountType | Long | 折扣类型 | 1=低价不变，2=折扣不变 |
| discountRate | BigDecimal | 折扣率 | 取行最小审批折扣率 |
| oaAuditStat | Long | OA审核状态 | 0=未审批 |
| hzApproveStatus | String | 审批状态 | NEW/APPROVED/REJECTED等 |
| sourceFromDelay | Long | 源自延期 | 2=由延期申请创建 |

</div>

<div class="kb-module-alt">

### 折扣行数量管理

**核心公式**：

```text
active_qty = contract_qty - ordered_qty - replaced_qty - delayed_qty
```

| 数量字段 | 说明 |
|---------|------|
| contractQty | 合同数量（初始下单数量） |
| orderedQty | 已下单数量（要货订单使用后累加） |
| replacedQty | 已替换数量（变更申请使用） |
| delayedQty | 已延期数量（延期申请使用） |
| activeQty | 剩余可下单数量（要货订单下单前校验） |

**要货订单与折扣单关系**：折扣单 → 要货订单（一对多），要货下单时扣减 ordered_qty，删除/释放时返还。

</div>

<div class="kb-module">

### 核心计算逻辑（calculate方法）

| 计算项 | 公式 |
|--------|------|
| 折后单价（家装） | 标准单价(不含安装) × 应用折扣率（3位小数） |
| 折后单价（非家装） | 标准单价(不含安装) × 应用折扣率（7位小数） |
| 应用折扣率(计开单折扣) | 出厂折扣率 × 审批折扣率 |
| 应用折扣率(不计开单折扣) | 出厂折扣率 × 客户折扣率 |
| 折前金额 | 出厂折扣率 × 标准单价(不含安装) × 数量 |
| 折后金额 | 数量 × 折后单价 |

> 标准单价(不含安装) = 标准单价 - 安装单价

</div>

<div class="kb-module-alt">

### 校验规则

| 校验点 | 触发时机 | 规则 |
|--------|---------|------|
| 产品上下架 | 保存(doBeforeSave) | 非延期申请时所有产品必须为"已上架" |
| 工程方单价 | 保存 | 非家装时contractPrice不能为0 |
| 合同数量 | 保存 | 非家装时contractQty不能为0 |
| 合同有效性 | 获取折扣数据 | 合同valid必须=2 |
| 安装单价 | 获取产品数据 | 包安装产品必须有安装单价 |
| 价格单位 | 获取产品数据 | 产品价格单位必须存在 |
| 折扣率 | 获取产品数据 | 产品必须有出厂折扣率和审批折扣率 |

</div>

<div class="kb-module">

### 审批与审批标识

**审批标识判断**（selectDiscountApplyAuditFlagByContractId）：

| 条件 | 审批层级 |
|------|---------|
| 小项目 | 3 |
| 折扣类型=2且非定制且折扣规则非6且非多单 | 2 |
| 其他 | 1 |

**新增默认值**：oaAuditStat=0(未审批)，hzApproveStatus=NEW

**审批通过EpmDiscountEcn（折扣变更）实现**：折扣申请单的审批流程不直接在自身处理，而是通过关联的变更单完成。

</div>

<div class="kb-module-alt">

### 状态流转

```text
新建(hzApproveStatus=NEW, oaAuditStat=0) → 折扣变更申请(EpmDiscountEcn) → OA审批 → 
  ├── 审批通过 → APPROVED → 折扣单生效
  ├── 拒绝 → REJECTED
  └── 变更申请追加明细 / 延期申请创建新折扣单
```

**LOV查询条件**（要货订单选择折扣单）：
- 已审批通过(hzApproveStatus=APPROVED)
- 有效期内(discountValidDate >= 当前)
- 有剩余可下单数量(active_qty > 0)

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1: 折扣单LOV列表为空 🔴高频

**现象**：要货订单选择折扣单时列表无数据

**根因**：折扣单未审批通过、已过期、或active_qty=0

**排查SQL**：
```sql
SELECT DA.DISCOUNT_APPLY_ID, DA.DISCOUNT_APPLY_CODE, DA.HZ_APPROVE_STATUS,
       DA.DISCOUNT_VALID_DATE, DA.CONTRACT_ID
FROM EPM_DISCOUNT_APPLY DA
WHERE DA.CUSTOMER_ID = :customerId
  AND DA.CONTRACT_ID = :contractId;
```

> HZ_APPROVE_STATUS需为APPROVED；DISCOUNT_VALID_DATE需未过期

</div>

<div class="kb-module-alt">

### Q2: 获取折扣数据时报错合同无效

**现象**：根据折扣单获取要货单数据时报错

**根因**：折扣单关联的合同 `valid != 2`

**排查SQL**：
```sql
SELECT CONTRACT_ID, CONTRACT_CODE, VALID 
FROM EPM_PROJECT_CONTRACT 
WHERE CONTRACT_ID = :contractId;
```

> VALID=2表示合同已生效；其他值→合同未生效

</div>

<div class="kb-module">

### Q3: 产品上下架校验失败 🟡偶发

**现象**：保存折扣单时报错产品未上架

**根因**：非延期申请时，产品在EBS中的状态不是"已上架"

**排查**：调用 `webserviceDictRepository.getProdStatusMap` 查询产品状态

</div>

<div class="kb-module-alt">

### Q4: 要货订单下单数量不足

**现象**：要货订单下单时折扣行可下单数量为0

**根因**：active_qty = contract_qty - ordered_qty - replaced_qty - delayed_qty，已被其他订单/变更/延期占用

**排查SQL**：
```sql
SELECT CONTRACT_QTY, ORDERED_QTY, REPLACED_QTY, DELAYED_QTY, ACTIVE_QTY
FROM EPM_DISCOUNT_APPLY_LINE
WHERE DISCOUNT_APPLY_ID = :discountApplyId;
```

</div>

<div class="kb-module">

### Q5: 折扣率计算异常

**现象**：折后单价为0或异常值

**根因**：出厂折扣率或审批折扣率为空/0

**排查**：检查 EPM_DISCOUNT_APPLY_LINE 的 BASE_DISCOUNT_RATE 和 EXTRA_DISCOUNT_RATE

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：确认折扣单基本信息**

```sql
SELECT DISCOUNT_APPLY_ID, DISCOUNT_APPLY_CODE, IS_HOME, IS_MAKT,
       CONTRACT_ID, PROJECT_ID, DISCOUNT_TYPE, DISCOUNT_RATE,
       HZ_APPROVE_STATUS, OA_AUDIT_STAT, DISCOUNT_VALID_DATE
FROM EPM_DISCOUNT_APPLY 
WHERE DISCOUNT_APPLY_ID = :applyId;
```

> IS_MAKT=2为样品及长库龄；HZ_APPROVE_STATUS=APPROVED为已审批

</div>

<div class="kb-module-alt">

**步骤2：检查折扣明细行**

```sql
SELECT DISCOUNT_APPLY_LINE_ID, ITEM_CODE, CONTRACT_QTY, 
       ACTIVE_QTY, ORDERED_QTY, REPLACED_QTY, DELAYED_QTY,
       DISCOUNT_RATE, BASE_DISCOUNT_RATE, EXTRA_DISCOUNT_RATE,
       POLICY_FLAG, SOURCE_POLICY_ID, IS_CANCEL
FROM EPM_DISCOUNT_APPLY_LINE 
WHERE DISCOUNT_APPLY_ID = :applyId;
```

> ACTIVE_QTY=0→无法下单；POLICY_FLAG='Y'→引用统一政策

</div>

<div class="kb-module">

**步骤3：检查关联合同有效性**

```sql
SELECT CONTRACT_ID, CONTRACT_CODE, VALID, CONTRACT_NAME
FROM EPM_PROJECT_CONTRACT 
WHERE CONTRACT_ID = :contractId;
```

> VALID=2为已生效；其他→合同未生效或失效

</div>

<div class="kb-module-alt">

**步骤4：检查关联项目报备**

```sql
SELECT PROJECT_ID, PROJECT_CODE, PROJECT_NAME, PROJECT_VALID
FROM EPM_PROJECT 
WHERE PROJECT_ID = :projectId;
```

> PROJECT_VALID=2为已生效

</div>

<div class="kb-module">

**步骤5：检查要货订单占用数量**

```sql
SELECT SOBH.SA_OUT_BILL_HEAD_ID, SOBH.SA_SALEBILLNO, SOBH.ORDER_STAT,
       SOBL.ITEM_CODE, SOBL.QTY_BILL, SOBL.DISCOUNT_APPLY_LINE_ID
FROM SA_OUT_BILL_HEAD SOBH
JOIN SA_OUT_BILL_LINE SOBL ON SOBH.SA_OUT_BILL_HEAD_ID = SOBL.SA_OUT_BILL_HEAD_ID
WHERE SOBL.DISCOUNT_APPLY_LINE_ID IN (
  SELECT DAL.DISCOUNT_APPLY_LINE_ID 
  FROM EPM_DISCOUNT_APPLY_LINE DAL 
  WHERE DAL.DISCOUNT_APPLY_ID = :applyId
)
AND SOBH.STAT != 5;
```

> 已下单但未审核完成的订单占用 ordered_qty

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
| 工程合同(EPM_PROJECT_CONTRACT) | 数据依赖 | 合同valid=2才能使用折扣单 |
| 项目报备(EPM_PROJECT) | 数据依赖 | 折扣单关联项目信息 |
| 客户组织(CUSTOMER_ORG) | 数据依赖 | 客户折扣率、币种 |
| 折扣政策(EPM_DISCOUNT_POLICY) | 数据依赖 | 统一政策引用(sourcePolicyId) |
| CRM系统 | 数据依赖 | 产品信息同步、上下架状态校验 |
| EBS系统 | 数据依赖 | 产品PAC成本获取 |

</div>

<div class="kb-module-alt">

### 下游影响

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 要货订单(SA_OUT_BILL_HEAD) | 数据依赖 | 折扣单是要货订单的来源，active_qty控制可下单数量 |
| 折扣变更(EPM_DISCOUNT_ECN) | 业务触发 | 变更→追加明细；延期→创建新折扣单 |
| 要货订单数量扣减 | 数据更新 | 下单时ordered_qty+active_qty-；删除/释放时返还 |
| CRM政策同步 | 异步依赖 | 折扣政策审批通过后同步CRM |

</div>

</div>
