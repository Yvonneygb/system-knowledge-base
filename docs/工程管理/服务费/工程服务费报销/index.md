---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
FIN_SVC_EXP_ACC_HEAD (服务费报销表头)
  │
  ├──< FIN_SVC_EXP_ACC_LINE (服务费报销出库单明细, 关联签收差异处理行)
  │       │
  │       └── 虚拟调账行(source_type=virtual, 正数/负数行互关联)
  │
  └──< FIN_SVC_EXP_INV_REF (报销与发票关联关系)
         │
         └──< FIN_INVOICE (发票表, 复用已有表)

关联外部表:
  DRP_DIFFPROCBILL_LINE ←── FIN_SVC_EXP_ACC_LINE.DIFFBILL_LINE_ID
  DRP_DIFFPROCBILL_HEADER ←── 签收差异处理头
  EPM_PAYMENT_ALLOT_DETAIL ←── 认领出库单明细
```

#### 报销表头字段（FIN_SVC_EXP_ACC_HEAD）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| svcExpAccId | SVC_EXP_ACC_ID | Long | 主键id | 自增生成 |
| svcExpAccNo | SVC_EXP_ACC_NO | String | 报销单号 | 前缀+yyMMdd+编码规则序列(CodeRule: SVC_EXP_ACC_NO) |
| organizationId | ORGANIZATION_ID | Long | 组织id(事业部id) | 取当前用户附加信息DEPT |
| stat | STAT | Long | 单据状态 | 新建=1 |
| auditStat | AUDIT_STAT | String | 审核状态 | 新建时="新建" |
| billType | BILL_TYPE | String | 单据状态 | 新建时="未核销" |
| billingUnitId | BILLING_UNIT_ID | Long | 开票单位id(法人客户id) | 前端传入 |
| projectId | PROJECT_ID | Long | 工程项目id | 前端传入 |
| customerId | CUSTOMER_ID | Long | 经销商id | 前端传入 |
| tradingCompanyId | TRADING_COMPANY_ID | Long | 交易公司id | 根据customerId+billingUnitId自动查询 |
| vendorId | VENDOR_ID | Long | 供应商id | 前端传入 |
| bankName | BANK_NAME | String | 开户银行 | 前端传入 |
| bankAccount | BANK_ACCOUNT | String | 银行账号 | 前端传入 |
| wfid | WFID | Long | 流程id | 默认0 |
| wfflag | WFFLAG | Long | 流程状态 | 默认0 |
| hzInstanceId | HZ_INSTANCE_ID | Long | 流程实例id | 流程启动后回写 |
| hzApproveStatus | HZ_APPROVE_STATUS | String | 流程实例状态 | NEW/RUN/APPROVED/RETURN等 |
| accruedDemeritRate | ACCRUED_DEMERIT_RATE | BigDecimal | 应计扣分率 | = max(行.总扣分率) |
| adjustDemeritRate | ADJUST_DEMERIT_RATE | BigDecimal | 调整扣分率 | 默认=应计扣分率，审批节点可修改 |
| actualReimbRate | ACTUAL_REIMB_RATE | BigDecimal | 实际报销比例 | = (1-调整扣分率) × (1+税率) / 1.09 |
| writeOffAmt | WRITE_OFF_AMT | BigDecimal | 核销金额 | = Σ行.serviceChargeAmt |
| totalUncashAmt | TOTAL_UNCASH_AMT | BigDecimal | 本次报销金额 | = 实际报销比例 × 核销金额 |
| actualBxAmt | ACTUAL_BX_AMT | BigDecimal | 实际报销金额 | 无发票=本次报销金额; 有发票=min(|本次报销金额|, 发票金额合计) |
| totalCashAmt | TOTAL_CASH_AMT | BigDecimal | 已兑现金额 | 计算字段 |
| exchangeFlag | EXCHANGE_FLAG | Long | 兑现标识 | 来源于词汇值 |
| cashingWay | CASHING_WAY | Long | 兑现方式 | 1=转货款, 其他=银行转账 |
| taxRate | TAX_RATE | BigDecimal | 税率 | 前端传入/发票税率 |
| invoiceType | INVOICE_TYPE | Long | 发票类型 | 前端传入 |
| offlineReimbursement | OFFLINE_REIMBURSEMENT | String | 线下已报销 | Y/N |
| writeOffAmount | WRITE_OFF_AMOUNT | BigDecimal | 冲销金额 | 前端传入，保留2位小数 |
| ledgerDate | LEDGER_DATE | LocalDate | 总账日期 | 前端传入 |
| checker | CHECKER | String | 审核人 | 审批通过时=当前用户ID |
| checkTime | CHECK_TIME | Date | 审核时间 | 审批通过时=当前时间 |
| errorCollection | ERROR_COLLECTION | String | 错误信息 | 推送共享失败时记录 |
| callbackSource | CALLBACK_SOURCE | String | 外部系统回调结果 | 外部回调写入 |

#### 出库单明细字段（FIN_SVC_EXP_ACC_LINE）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| svcExpAccLineId | SVC_EXP_ACC_LINE_ID | Long | 主键id | 自增生成 |
| svcExpAccId | SVC_EXP_ACC_ID | Long | 报销id | 关联HEAD主键 |
| lineNumber | LINE_NUMBER | Long | 来源行id | 签收行line_number |
| sourceType | SOURCE_TYPE | String | 来源类型 | return=退库单, inv_out=出库单, inv_out_map=历史签收, virtual=虚拟调账 |
| serviceChargeAmt | SERVICE_CHARGE_AMT | BigDecimal | 服务费 | = 合同金额 - 实际结算金额 |
| reimbOverDay | REIMB_OVER_DAY | Long | 逾期报销天数 | 计算值，默认0 |
| reimbOverDeductRate | REIMB_OVER_DEDUCT_RATE | BigDecimal | 逾期报销扣费率(%) | = 报销逾期率 × 逾期天数，上限100% |
| signOverDay | SIGN_OVER_DAY | Long | 逾期签收天数 | 计算值，默认0 |
| signOverDeductRate | SIGN_OVER_DEDUCT_RATE | BigDecimal | 逾期签收扣费率(%) | = 签收逾期率 × 逾期天数，上限100% |
| actualServiceAmt | ACTUAL_SERVICE_AMT | BigDecimal | 实际服务费含税金额 | = (1-总扣分率) × serviceChargeAmt × (1+税率) / 1.09 |
| serviceAmtNotax | SERVICE_AMT_NOTAX | BigDecimal | 实际服务费未税金额 | = (1-总扣分率) × serviceChargeAmt / 1.09 |
| taxAmt | TAX_AMT | BigDecimal | 税金 | 默认0 |
| diffbillLineId | DIFFBILL_LINE_ID | Long | 签收行id | 关联DRP_DIFFPROCBILL_LINE |
| projectId | PROJECT_ID | Long | 项目id | 通过项目找虚拟行时用 |
| virtualAvailableFlag | VIRTUAL_AVAILABLE_FLAG | String | 正数虚拟调账行可用标识 | Y=可用, N=不可用 |
| virtualSourceLineId | VIRTUAL_SOURCE_LINE_ID | Long | 对应负数虚拟调账行id | — |

> **initVirtual()方法**：虚拟调账行初始化，reimbOverDay=0, signOverDay=0, taxAmt=0, actualSignDeductDay=0, actualReimbDeductDay=0, diffbillLineId=0, virtualSourceLineId=0, actualServiceAmt=serviceChargeAmt, serviceAmtNotax=serviceChargeAmt/1.09

#### 报销与发票关联字段（FIN_SVC_EXP_INV_REF）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| svcExpInvRefId | SVC_EXP_INV_REF_ID | Long | 主键id | 自增生成 |
| svcExpAccId | SVC_EXP_ACC_ID | Long | 报销id | 关联HEAD主键 |
| finInvoiceId | FIN_INVOICE_ID | Long | 发票id | 关联FIN_INVOICE主键 |

</div>

<div class="kb-module-alt">

### 可选出库单/退库单逻辑

**出库单明细接口**：`GET /v1/{organizationId}/fin-svc-exp-acc-heads/get-inv-lines`

**过滤条件**：

| 条件 | 说明 |
|------|------|
| 匹配 organizationId+customerId+billingUnitId+projectId | 项目+经销商+法人限定 |
| 匹配 tradingCompanyCode | 交易公司限定 |
| 未被其他报销单关联 | 出库明细不能已被其他报销单使用 |

**退库单明细接口**：`GET /v1/{organizationId}/fin-svc-exp-acc-heads/get-other-info`（doGetOtherInfo方法）

**过滤条件**：organizationId+customerId+billingUnitId+projectId限定，未被其他报销单关联

> **虚拟调账行**：source_type='virtual'，正数行(serviceChargeAmt>0)为可核销行，负数行(serviceChargeAmt<0)为调整行。正数行update，负数行insert+initVirtual()

</div>

<div class="kb-module">

### 逾期天数与扣分率计算

**逾期参数来源**：

| 参数 | 说明 |
|------|------|
| SIGN_OVER_DEDUCT_RATE | 签收逾期扣费率 |
| BX_OVER_DEDUCT_RATE | 报销逾期扣费率 |
| BX_OVER_LIMIT_DAY | 报销超期免扣天数 |
| SIGN_OVER_LIMIT_DAY | 签收超期免扣天数 |
| SC_REIMB_CUTTING_LINE | 签收/报销不计扣分时间切割线 |
| SC_REIMB_INVBILL_CUTTING_LINE | 出库日期不计扣分时间线 |

**逾期签收天数计算**：
- 签收时间 < 切割线 或 来源=退库 → 0
- 出库日期 < 2023-06-01 → 0
- 否则 = 签收时间 - 出库时间 - 签收超期免扣天数，最小0

**逾期报销天数计算**：
- 当前时间 < 切割线 或 来源=退库 → 0
- 出库日期 < 2023-06-01 → 0
- 否则 = 当前时间 - 签收时间 - 报销超期免扣天数，最小0

**扣分率计算**：
- 签收逾期率 = 签收逾期率 × 签收逾期天数，上限100%
- 报销逾期率 = 报销逾期率 × 报销逾期天数，上限100%
- **总扣分率 = 签收逾期率 + 报销逾期率，上限100%**

</div>

<div class="kb-module-alt">

### 保存与提交

**保存接口**：`POST /v1/{organizationId}/fin-svc-exp-acc-heads/insert`

**新增逻辑**：
1. 在途校验 → 冲销金额处理 → 基础数据初始化(stat=1, auditStat="新建", billType="未核销")
2. 转货款校验账户(cashingWay==1) → 生成单号(SVC_EXP_ACC_NO) → 计算金额(calHeadAmt)
3. 插入表头(hzApproveStatus="NEW") → 插入明细行(doInsertLine) → 保存附件

**更新逻辑**：`POST /v1/{organizationId}/fin-svc-exp-acc-heads/update`
- 先删后增：删除发票明细 → 处理虚拟调账行 → 删除关联关系和明细行 → 重新插入

#### 金额计算逻辑（calHeadAmt）

| 计算项 | 公式 |
|--------|------|
| 应计扣分率 | max(行.总扣分率) |
| 调整扣分率 | 默认=应计扣分率，审批节点可修改 |
| 实际报销比例 | (1-调整扣分率) × (1+税率) / 1.09 |
| 核销金额 | Σ行.serviceChargeAmt |
| 本次报销金额 | 实际报销比例 × 核销金额 |
| 实际报销金额 | 无发票=本次报销金额; 有发票=min(|本次报销金额|, 发票金额合计) |
| 行未税金额 | (1-最大扣分率) × serviceChargeAmt / 1.09 |
| 行含税金额 | (1-最大扣分率) × serviceChargeAmt × (1+税率) / 1.09 |

**税金计算**：
- 有发票时：applyTaxAmount = 发票税金总和
- 无发票时：applyTaxAmount = 本次报销金额 × 税率 / (1+税率)

#### 提交逻辑（wfProcSubmit）

1. 校验出库明细及退库明细(validCheck)
2. 组装流程参数(svcExpAccId, offlineFlag, area)
3. 调用workflowClient.startInstanceByFlowKey()启动流程
4. 更新hzInstanceId和hzApproveStatus="RUN"

</div>

<div class="kb-module">

### 状态流转

```text
新建 ──提交──> 已提交(RUN) ──审批通过──> 审批通过(APPROVED)
                  │                        
                  └──审批驳回──> 驳回(RETURN)

新建 ──删除──> 物理删除所有数据
审批通过 ──推送共享──> 共享系统(FSSC)
```

| auditStat | hzApproveStatus | 含义 |
|-----------|-----------------|------|
| 新建 | NEW | 刚创建，未提交 |
| 已提交 | RUN | 审批流程运行中 |
| 审批通过 | APPROVED | 审批已通过，推送共享 |
| 驳回 | RETURN | 审批驳回 |

#### 审批通过回调（onWfComplete）

1. 设置checker=当前用户ID, checkTime=当前时间
2. 设置hzApproveStatus="APPROVED"
3. 线下报销且有负数虚拟调账行 → 插入正数虚拟调整行(serviceChargeAmt取反, svcExpAccId=0)

#### 审批驳回回调（onWfBreak）

1. code=RUN时执行volidate校验
2. 更新hzApproveStatus=code

#### 流程节点动作（eventExecute）

| action | 执行内容 |
|--------|---------|
| approvalCompleted | 推送数据到共享(pushDataToFssc) |
| uploadFile | 流程节点生成PDF |

</div>

<div class="kb-module-alt">

### 推送共享逻辑（pushDataToFssc）

**推送数据组成**：

| 数据类型 | 来源 | 内容 |
|---------|------|------|
| 头数据 | queryDataPushFssc SQL | 费用支付单号、摘要、供应商地址、银行信息、经营单位、付款方式、来源单据、兑现标识、法人客户编号、转货款单位 |
| 系统参数 | 配置值 | 币种、单据类型、支付类型、系统来源、汇率、ERP类型、URL |
| 审批人信息 | 流程数据 | applyLdapCode, orgLdapCode, positionLdapCode |
| 金额 | 计算字段 | 申请报销未税金额、批准报销未税金额、付款金额、扣减金额 |
| 行数据 | queryDataLinePushFssc SQL | 成本中心编码、费用科目编码 |
| 附件 | 发票+单据 | 发票附件(businessType=01) + 单据附件 |

> 推送调用：`arrowFsscSdk.pushFinSvcExpAcc()`

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1: 保存时报错"该项目存在其它在途的报销单" 🔴高频

**现象**：同一项目+经销商+法人下无法创建新的报销单

**根因**：已存在hzApproveStatus为NEW或RUN的报销单

**排查SQL**：

```sql
SELECT SVC_EXP_ACC_NO, HZ_APPROVE_STATUS, AUDIT_STAT
FROM FIN_SVC_EXP_ACC_HEAD
WHERE PROJECT_ID = :projectId
  AND CUSTOMER_ID = :customerId
  AND BILLING_UNIT_ID = :billingUnitId
  AND HZ_APPROVE_STATUS IN ('NEW', 'RUN')
```

</div>

<div class="kb-module-alt">

### Q2: 提交时报错"实际报销金额必须大于0" 🔴高频

**现象**：销财会计节点校验失败

**根因**：扣分率过高导致实际报销金额≤0

**排查SQL**：

```sql
SELECT ACCRUED_DEMERIT_RATE, ADJUST_DEMERIT_RATE, ACTUAL_REIMB_RATE,
       WRITE_OFF_AMT, TOTAL_UNCASH_AMT, ACTUAL_BX_AMT
FROM FIN_SVC_EXP_ACC_HEAD
WHERE SVC_EXP_ACC_ID = :accId
-- 确认: 实际报销比例 = (1-调整扣分率) × (1+税率) / 1.09
-- 若调整扣分率接近100%，实际报销金额≈0
```

</div>

<div class="kb-module">

### Q3: 提交时报错"发票必须上传" 🔴高频

**现象**：经销商上传发票节点校验失败

**根因**：非线下报销(OFFLINE_REIMBURSEMENT≠Y)未上传发票

**排查SQL**：

```sql
SELECT OFFLINE_REIMBURSEMENT FROM FIN_SVC_EXP_ACC_HEAD WHERE SVC_EXP_ACC_ID = :accId
-- Y=线下报销直接通过, 非Y必须上传发票
SELECT * FROM FIN_SVC_EXP_INV_REF WHERE SVC_EXP_ACC_ID = :accId
-- 检查是否有关联发票
```

</div>

<div class="kb-module-alt">

### Q4: 提交时报错"发票类型与预开发票类型不一致" 🟡偶发

**现象**：发票类型校验失败

**根因**：上传的发票类型与报销单预开发票类型(INVOICE_TYPE)不一致

**排查SQL**：

```sql
SELECT INVOICE_TYPE FROM FIN_SVC_EXP_ACC_HEAD WHERE SVC_EXP_ACC_ID = :accId
SELECT INVOICE_TYPE FROM FIN_INVOICE WHERE FIN_INVOICE_ID IN (
  SELECT FIN_INVOICE_ID FROM FIN_SVC_EXP_INV_REF WHERE SVC_EXP_ACC_ID = :accId
)
-- 对比两者是否一致
```

</div>

<div class="kb-module">

### Q5: 提交时报错"发票税率与预开发票税率不一致" 🟡偶发

**现象**：发票税率校验失败

**根因**：上传的发票税率与报销单预开发票税率(TAX_RATE)不一致

**排查SQL**：

```sql
SELECT TAX_RATE FROM FIN_SVC_EXP_ACC_HEAD WHERE SVC_EXP_ACC_ID = :accId
SELECT TAX_RATE FROM FIN_INVOICE WHERE FIN_INVOICE_ID IN (
  SELECT FIN_INVOICE_ID FROM FIN_SVC_EXP_INV_REF WHERE SVC_EXP_ACC_ID = :accId
)
-- 对比两者是否一致
```

</div>

<div class="kb-module-alt">

### Q6: 可选出库单明细为空 🟡偶发

| 可能原因 | 检查方式 |
|---------|---------|
| 出库明细已被其他报销单使用 | 查FIN_SVC_EXP_ACC_LINE中已有关联 |
| 项目+经销商+法人+交易公司条件不匹配 | 确认查询参数 |
| 签收差异处理行不存在 | 查DRP_DIFFPROCBILL_LINE |
| 认领出库单明细不存在 | 查EPM_PAYMENT_ALLOT_DETAIL |

</div>

<div class="kb-module">

### Q7: 上传发票时报错"上传发票金额合计大于本次报销金额" 🟡偶发

**现象**：发票金额校验失败

**根因**：发票金额合计 > 本次报销金额(TOTAL_UNCASH_AMT)

**排查**：计算发票含税金额总和，与TOTAL_UNCASH_AMT比较

</div>

<div class="kb-module-alt">

### Q8: 推送共享失败 🟡偶发

**现象**：审批通过后推送FSSC失败，errorCollection字段记录错误信息

**排查SQL**：

```sql
SELECT ERROR_COLLECTION FROM FIN_SVC_EXP_ACC_HEAD
WHERE SVC_EXP_ACC_ID = :accId
-- 查看推送失败的具体错误信息
```

| 可能原因 | 检查方式 |
|---------|---------|
| FSSC接口异常 | 查errorCollection |
| 必填字段缺失 | 检查推送数据组装 |
| 供应商地址/银行信息缺失 | 查VENDOR_SITE_ID, BANK_NAME, BANK_ACCOUNT |

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：确认报销单基本信息**

```sql
SELECT SVC_EXP_ACC_ID, SVC_EXP_ACC_NO, STAT, AUDIT_STAT, HZ_APPROVE_STATUS,
       BILL_TYPE, CASHING_WAY, OFFLINE_REIMBURSEMENT,
       ACCRUED_DEMERIT_RATE, ADJUST_DEMERIT_RATE, ACTUAL_REIMB_RATE,
       WRITE_OFF_AMT, TOTAL_UNCASH_AMT, ACTUAL_BX_AMT
FROM FIN_SVC_EXP_ACC_HEAD
WHERE SVC_EXP_ACC_NO = ':报销单号';
```

> 异常判断：查不到→报销单被删除；AUDIT_STAT与HZ_APPROVE_STATUS不一致→数据异常；实际报销金额≤0→扣分率过高

</div>

<div class="kb-module-alt">

**步骤2：查询出库单明细行**

```sql
SELECT SVC_EXP_ACC_LINE_ID, LINE_NUMBER, SOURCE_TYPE, SERVICE_CHARGE_AMT,
       REIMB_OVER_DAY, SIGN_OVER_DAY, REIMB_OVER_DEDUCT_RATE, SIGN_OVER_DEDUCT_RATE,
       ACTUAL_SERVICE_AMT, SERVICE_AMT_NOTAX, DIFFBILL_LINE_ID,
       VIRTUAL_AVAILABLE_FLAG, VIRTUAL_SOURCE_LINE_ID
FROM FIN_SVC_EXP_ACC_LINE
WHERE SVC_EXP_ACC_ID = :svcExpAccId;
```

> 异常判断：SOURCE_TYPE=virtual行需检查正负行关联；扣分率之和超过100%→数据异常

</div>

<div class="kb-module">

**步骤3：查询发票关联与发票明细**

```sql
SELECT r.FIN_INVOICE_ID, i.INVOICE_NO, i.INVOICE_TYPE, i.TAX_RATE, i.AMT
FROM FIN_SVC_EXP_INV_REF r
JOIN FIN_INVOICE i ON r.FIN_INVOICE_ID = i.FIN_INVOICE_ID
WHERE r.SVC_EXP_ACC_ID = :svcExpAccId;
```

> 异常判断：无发票关联→线下报销或未上传发票；发票类型/税率与报销单不一致→校验失败

</div>

<div class="kb-module-alt">

**步骤4：检查逾期扣分率计算**

```sql
SELECT l.LINE_NUMBER, l.REIMB_OVER_DAY, l.SIGN_OVER_DAY,
       l.REIMB_OVER_DEDUCT_RATE, l.SIGN_OVER_DEDUCT_RATE,
       (l.REIMB_OVER_DEDUCT_RATE + l.SIGN_OVER_DEDUCT_RATE) AS TOTAL_DEDUCT_RATE
FROM FIN_SVC_EXP_ACC_LINE l
WHERE l.SVC_EXP_ACC_ID = :svcExpAccId
  AND l.SOURCE_TYPE != 'virtual';
```

> TOTAL_DEDUCT_RATE > 100% → 数据异常；逾期天数=0但扣分率>0 → 参数配置问题

</div>

<div class="kb-module">

**步骤5：检查推送共享状态**

```sql
SELECT ERROR_COLLECTION, CALLBACK_SOURCE, INVOICE_PAID_DATE, INVOICE_PAID_AMOUNT,
       RECEIPT_STATUS
FROM FIN_SVC_EXP_ACC_HEAD
WHERE SVC_EXP_ACC_ID = :svcExpAccId;
```

> ERROR_COLLECTION非空→推送失败；CALLBACK_SOURCE非空→有外部回调；INVOICE_PAID_DATE非空→已收到款

</div>

</div>

<div id="history">

<div class="kb-module">

> 本页面记录真实排查案例，用于频次分析和趋势监控。

| 日期 | 问题简述 | 根因 | 耗时 | 频次标记 |
|------|---------|------|------|---------|
| 2026-07-03 | 页面示例创建 | 模板初始化 | — | — |

</div>

<div class="kb-module-alt">

### 按根因分类统计

| 根因分类 | 次数 | 占比 |
|---------|------|------|
| 数据异常 | 0 | 0% |
| 逻辑缺陷 | 0 | 0% |
| 并发冲突 | 0 | 0% |
| 配置错误 | 0 | 0% |
| 推送失败 | 0 | 0% |
| 其他 | 0 | 0% |

> 暂无数据，积累排查记录后自动更新。

</div>

</div>

<div id="related">

<div class="kb-module">

### 上游依赖

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 项目管理 | 数据依赖 | 报销头关联项目信息(PROJECT_ID) |
| 经销商管理 | 数据依赖 | 报销头关联经销商信息(CUSTOMER_ID) |
| 法人/开票单位 | 数据依赖 | 报销头关联法人信息(BILLING_UNIT_ID) |
| 交易公司 | 数据依赖 | 根据customerId+billingUnitId自动查询TRADING_COMPANY_ID |
| 签收差异处理 | 数据依赖 | 出库单明细行关联DRP_DIFFPROCBILL_LINE |
| 认领出库单 | 数据依赖 | 关联EPM_PAYMENT_ALLOT_DETAIL |
| 发票管理 | 数据依赖 | 复用FIN_INVOICE表，通过FIN_SVC_EXP_INV_REF关联 |
| 系统参数管理 | 配置依赖 | 逾期扣分率、切割线、免扣天数等参数 |

</div>

<div class="kb-module-alt">

### 下游影响

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 共享系统(FSSC) | 业务触发 | 审批通过后推送共享系统报销数据 |
| 虚拟调账行 | 数据更新 | 审批通过后处理正数虚拟调整行 |
| 工作流引擎 | 流程依赖 | 提交审批通过HZERO工作流引擎处理 |
| 转货款/银行转账 | 业务触发 | 兑现方式决定付款路径 |

</div>

</div>
