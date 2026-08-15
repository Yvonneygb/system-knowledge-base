---
---

<KbSectionTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

家装折扣政策代码中名为"工程折扣变更单"（EpmDiscountEcn），支持变更申请(ecnType=1)和延期申请(ecnType=2)。通过 `isHome` 区分家装(isHome=2)和工程(isHome=0)。

```text
EPM_DISCOUNT_ECN (折扣变更头表)
  │
  ├──< EPM_DISCOUNT_ECN_LINE (变更明细行)
  │       ├── ecnLineType=1: 变更前明细
  │       └── ecnLineType=2: 变更后明细
  │       │
  │       └──< EPM_DISCOUNT_ECN_LINE_EXT (行扩展-库龄/生命周期)
  │
  ├──< EPM_DISCOUNT_ECN_PLAN (预计提货计划, 仅非家装)
  │
  └──> EPM_DISCOUNT_APPLY (原折扣申请单, 通过discountApplyId关联)
```

#### 头表关键字段（EPM_DISCOUNT_ECN）

| 字段名 | 类型 | 说明 | 取值逻辑 |
|--------|------|------|---------|
| discountEcnId | Long | 变更单ID（主键） | 自增 |
| ecnType | Long | 变更类型 | 1=变更申请，2=延期申请 |
| isHome | Long | 是否家装 | 2=家装，0=工程 |
| discountApplyId | Long | 原折扣单ID | 变更时关联原折扣单 |
| sourceDiscountApplyId | Long | 原折扣单ID | 延期时关联原折扣单 |
| discountType | Long | 折扣类型 | 1=低价不变，2=折扣不变 |
| discountRate | BigDecimal | 折扣率 | 区域经理节点取最小审批折扣率 |
| contractId | Long | 合同ID | 关联工程合同 |
| projectId | Long | 项目ID | 关联项目报备 |
| oaAuditStat | Long | OA审核状态 | 0=未审批，1=项目/区域经理审批，2=公司审批，3=审批完成，99=审核拒绝 |

</div>

<div class="kb-module-alt">

### 变更与延期业务逻辑

**变更申请(ecnType=1)**：
- 在原折扣单基础上追加/替换产品明细
- 变更前明细记录原折扣单产品（ecnLineType=1）
- 变更后明细记录新增/替换产品（ecnLineType=2）
- 审批通过后：追加新明细到原折扣单，回写 `discountApplyLineId`

**延期申请(ecnType=2)**：
- 创建全新折扣单（新有效期）
- 审批通过后：调用 `epmDiscountApplyService.doInsert` 创建新折扣单
- 回写新折扣单ID和单号

**家装特殊逻辑**：家装不处理提货计划（非家装审批通过后会插入/复制提货计划）

</div>

<div class="kb-module">

### 校验规则

| 校验点 | 触发时机 | 规则 |
|--------|---------|------|
| 合同有效性 | 保存(doBeforeSave) | 合同valid必须=2 |
| 工程方单价 | 保存(doInsertLine) | **非家装**时工程方单价不能为空或0；家装不校验 |
| 折扣类型校验 | 保存(checkDiscountType) | 延期+折扣不变+全引用统一政策时校验政策失效/坎级/折扣率一致性 |
| 可替换数量 | 保存(updateReplacedQty) | 原折扣单行可替换数量必须充足 |
| 可延期数量 | 保存(updateDelayedQty) | 原折扣单行可延期数量必须充足 |
| 报备生效 | 提交(saveAndSubmit) | 合同关联的单体报备必须已生效 |
| CRM开票单位 | 提交(onUserSubmit) | 家装(isHome=2)时跳过后续校验 |
| CRM折扣率 | 提交(checkRate) | 零售政策和工程家装政策联动校验 |

</div>

<div class="kb-module-alt">

### 审批流程

**OA推送**：
- 家装延期 → `doOaAudit`，单据名"家装合同"，附件配置ID=9017
- 家装变更 → `doOaHomeChangeAudit`，单据名"家装合同"，附件配置ID=9016
- 工程折扣 → `doSendToOABill`，单据名"工程折扣申请单"，附件配置ID=8022/8023

**OA审核状态转换**（doProcessOA）：

| OA审批人+结果 | 状态值 | 说明 |
|---------------|--------|------|
| 最终审批人+同意 | 3 | 审批完成，callbackSource=OA_PASS |
| 最终审批人+不同意 | 99 | 审核拒绝，callbackSource=OA_REJECT |
| 非最终审批人+同意+首次 | 1 | 项目/区域经理审批 |
| 非最终审批人+同意+非首次 | 2 | 公司审批 |

**防重复执行**：audittime非空则跳过回调处理

</div>

<div class="kb-module">

### 家装与工程差异

| 维度 | 工程(isHome=0) | 家装(isHome=2) |
|------|----------------|----------------|
| 工程方单价 | 必填，不能为0 | **不校验** |
| 提货计划 | 审批通过后插入/复制 | **不处理** |
| 运费计算 | 运费=标准单价×出厂折扣×运费点数 | **不计算运费** |
| 产品成本 | PAC成本+运费 | **仅PAC成本** |
| 提交校验 | 完整校验(CRM/标准折扣/一口价等) | **isHome=2时直接返回** |
| OA推送 | "工程折扣申请单" | **"家装合同"** |

</div>

<div class="kb-module-alt">

### 状态流转

```text
新建(hzApproveStatus=NEW) → OA审批 → 审批完成(3) → 变更生效/延期创建新折扣单
                              │
                              ├── 拒绝(99) → hzApproveStatus=REJECTED
                              ├── 驳回/中断/撤回 → processFlag=No
                              │
                              └── 区域经理节点 → 更新头折扣率为行最小审批折扣率
```

</div>

</div>

<div id="faq" style="display:none;">

<div class="kb-module">

### Q1: 变更申请可替换数量不足 🔴高频

**现象**：保存变更单时报错，可替换数量不足

**根因**：原折扣单行的 `replacedQty` 已占用，`activeQty` 剩余不足以替换

**排查SQL**：
```sql
SELECT DISCOUNT_APPLY_LINE_ID, CONTRACT_QTY, ACTIVE_QTY, REPLACED_QTY, ORDERED_QTY
FROM EPM_DISCOUNT_APPLY_LINE 
WHERE DISCOUNT_APPLY_ID = :discountApplyId;
```

> ACTIVE_QTY = CONTRACT_QTY - ORDERED_QTY - REPLACED_QTY - DELAYED_QTY，需 > 0

</div>

<div class="kb-module-alt">

### Q2: 延期申请可延期数量不足

**现象**：保存延期申请时报错，可延期数量不足

**根因**：原折扣单行的 `delayedQty` 已占用，剩余可延期数量不足

**排查SQL**：
```sql
SELECT DISCOUNT_APPLY_LINE_ID, CONTRACT_QTY, ACTIVE_QTY, DELAYED_QTY
FROM EPM_DISCOUNT_APPLY_LINE 
WHERE DISCOUNT_APPLY_ID = :sourceDiscountApplyId;
```

</div>

<div class="kb-module">

### Q3: 家装变更单提交被跳过校验 🟡偶发

**现象**：家装变更单提交时某些校验未执行

**根因**：`onUserSubmit` 中 isHome=2 时直接返回，跳过CRM/标准折扣/一口价等校验

**说明**：这是正常逻辑，家装变更单不需要走工程项目的完整校验流程

</div>

<div class="kb-module-alt">

### Q4: OA审批回调重复执行

**现象**：OA回调多次触发导致数据异常

**根因**：`wfComplete` 中 audittime非空时应跳过，但可能防重复机制未生效

**排查**：检查 EPM_DISCOUNT_ECN 的 AUDITTIME 字段是否已填充

</div>

<div class="kb-module">

### Q5: 折扣政策类型延期后新折扣单未创建

**现象**：延期审批通过后未生成新的折扣申请单

**根因**：延期审批通过时应调用 `epmDiscountApplyService.doInsert` 创建新折扣单

**排查**：检查 `wfComplete` → `doAudit` 流程是否正常执行，查看 EPM_DISCOUNT_APPLY 是否有新记录

</div>

</div>

<div id="troubleshoot" style="display:none;">

<div class="kb-module">

**步骤1：确认变更单基本信息**

```sql
SELECT DISCOUNT_ECN_ID, DISCOUNT_ECN_CODE, ECN_TYPE, IS_HOME, 
       DISCOUNT_APPLY_ID, SOURCE_DISCOUNT_APPLY_ID, DISCOUNT_TYPE,
       HZ_APPROVE_STATUS, OA_AUDIT_STAT, AUDITTIME, CALLBACK_SOURCE
FROM EPM_DISCOUNT_ECN 
WHERE DISCOUNT_ECN_ID = :ecnId;
```

> ECN_TYPE=1变更，2延期；IS_HOME=2家装；AUDITTIME非空→已处理过

</div>

<div class="kb-module-alt">

**步骤2：检查原折扣单状态**

```sql
SELECT DISCOUNT_APPLY_ID, DISCOUNT_APPLY_CODE, DISCOUNT_VALID_DATE, 
       HZ_APPROVE_STATUS, CONTRACT_ID, PROJECT_ID
FROM EPM_DISCOUNT_APPLY 
WHERE DISCOUNT_APPLY_ID = :discountApplyId;
```

> HZ_APPROVE_STATUS 应为 APPROVED；DISCOUNT_VALID_DATE 是否已过期

</div>

<div class="kb-module">

**步骤3：检查变更前/后明细行**

```sql
SELECT DISCOUNT_ECN_LINE_ID, ECN_LINE_TYPE, ITEM_CODE, CONTRACT_QTY, 
       ACTIVE_QTY, DISCOUNT_RATE, DISCOUNTED_PRICE, IS_CANCEL
FROM EPM_DISCOUNT_ECN_LINE 
WHERE DISCOUNT_ECN_ID = :ecnId;
```

> ECN_LINE_TYPE=1为变更前，2为变更后；IS_CANCEL=2为失效行

</div>

<div class="kb-module-alt">

**步骤4：检查可替换/可延期数量**

```sql
SELECT DAL.DISCOUNT_APPLY_LINE_ID, DAL.CONTRACT_QTY, DAL.ACTIVE_QTY, 
       DAL.REPLACED_QTY, DAL.DELAYED_QTY, DAL.ORDERED_QTY,
       DAL.CONTRACT_QTY - DAL.ORDERED_QTY - DAL.REPLACED_QTY - DAL.DELAYED_QTY AS REMAINING
FROM EPM_DISCOUNT_APPLY_LINE DAL
WHERE DAL.DISCOUNT_APPLY_ID = :discountApplyId;
```

> REMAINING <= 0 → 数量不足，无法变更或延期

</div>

<div class="kb-module">

**步骤5：检查OA审批回调状态**

```sql
SELECT DISCOUNT_ECN_ID, HZ_APPROVE_STATUS, OA_AUDIT_STAT, 
       CALLBACK_SOURCE, AUDITTIME, AUDITOR
FROM EPM_DISCOUNT_ECN 
WHERE DISCOUNT_ECN_ID = :ecnId;
```

> OA_AUDIT_STAT=3审批完成；CALLBACK_SOURCE=OA_PASS通过；AUDITTIME非空→已处理

</div>

</div>

<div id="history" style="display:none;">

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

<div id="related" style="display:none;">

<div class="kb-module">

### 上游依赖

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 折扣申请单(EPM_DISCOUNT_APPLY) | 数据依赖 | 变更基于原折扣单；延期创建新折扣单 |
| 工程合同 | 数据依赖 | 合同valid=2才能保存变更单 |
| 项目报备(EPM_PROJECT) | 数据依赖 | 提交时校验报备生效 |
| 折扣政策(EPM_DISCOUNT_POLICY) | 数据依赖 | 统一政策引用(sourcePolicyId) |
| 客户组织(CUSTOMER_ORG) | 数据依赖 | 经销商档案、客户合同校验 |

</div>

<div class="kb-module-alt">

### 下游影响

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 折扣申请单(EPM_DISCOUNT_APPLY) | 数据更新 | 变更→追加明细到原折扣单；延期→创建新折扣单 |
| 要货订单(SA_OUT_BILL_HEAD) | 数据更新 | 审批通过后更新项目经理 |
| CRM系统 | 业务触发 | CRM开票单位校验、折扣率校验 |
| OA系统 | 流程依赖 | 家装变更/延期推送OA审批 |
| EBS系统 | 数据依赖 | 产品价格获取(延期提交时刷新) |
| CRM同步任务 | 异步依赖 | HomeDiscountPolicyCrmJob同步家装折扣政策 |

</div>

</div>
