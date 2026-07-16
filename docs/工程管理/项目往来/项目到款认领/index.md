---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EPM_PAYMENT_ALLOT (回款认领单头表)
  │
  ├──< EPM_PAYMENT_ALLOT_LINE (回款认领合同行表)
  │       ├──< EPM_PAYMENT_ALLOT_DETAIL (认款出库单明细表)
  │       │     └── cancel_flag='N' 为有效认领
  │       └── contractId → EPM_PROJECT_CONTRACT (合同)
  │           └── projectId → EPM_PROJECT (项目)
  │
  └── paymentImportId → EPM_PAYMENT_IMPORT (到款单)

关联查询表:
  INV_OUT_BILL_INTF_CONFIRM_B ←── 明细.lineNumber (出库确认行)
  INV_OUT_BILL_INTF_HEAD_B ←── 确认行.deliveryId (出库确认头)
  DRP_DIFFPROCBILL_LINE ←── 明细.sourceId (签收差异行)
  DRP_DIFFPROCBILL_HEADER ←── 差异行.diffbillId (签收差异头)
  EPM_CUST_TRX_DETAIL_IFACE ←── 应收事务处理(获取customerTrxId)
  CUSTOMER_ORG ←── 币种查询
```

#### 认领头表字段（EPM_PAYMENT_ALLOT）

| 字段名 | 类型 | 含义 | 关键说明 |
|--------|------|------|---------|
| paymentAllotId | Long | 认领单ID | 主键，自增 |
| paymentAllotCode | String | 认领单号 | 编码规则：AE_PAYMENT_ALLOT_NO |
| paymentImportId | Long | 到款单ID | 外键→EPM_PAYMENT_IMPORT |
| customerId | Long | 客户ID | 经销商ID |
| allotAmt | BigDecimal | 本次认款合计 | 由合同行金额汇总 |
| unallotAmtBefore | BigDecimal | 认款前可认金额 | 保存时计算 |
| unallotAmtAfter | BigDecimal | 认款后可认金额 | = unallotAmtBefore - allotAmt |
| claimType | String | 认领方式 | auto=自动；manual=手动 |
| paymentAllotStat | String | 认款状态 | APPLYING/APPROVED/TRANSFER/ACCOUNTED/CANCEL |
| hzApproveStatus | String | 审批状态 | NEW/RUN/APPROVED/REBUT/INTERRUPT |
| manualInvoiceClaim | String | 手工发票认领 | Y/N，决定ERP推送逻辑 |
| isHome | Long | 是否家装 | 2=是 |

#### 合同行表字段（EPM_PAYMENT_ALLOT_LINE）

| 字段名 | 类型 | 含义 |
|--------|------|------|
| paymentAllotLineId | Long | 合同行ID（主键） |
| paymentAllotId | Long | 认领单ID |
| contractId | Long | 合同ID |
| allotAmt | BigDecimal | 本次认款金额 |
| contractAmtReceived | BigDecimal | 当时已回款金额 |
| hasAllotAmount | BigDecimal | 已认领金额 |

#### 出库明细表字段（EPM_PAYMENT_ALLOT_DETAIL）

| 字段名 | 类型 | 含义 | 关键说明 |
|--------|------|------|---------|
| paymentAllotDetailId | Long | 明细ID | 主键 |
| paymentAllotLineId | Long | 合同行ID | 外键 |
| lineNumber | Long | 出库确认行ID | →INV_OUT_BILL_INTF_CONFIRM_B |
| sourceId | Long | 签收明细ID | →DRP_DIFFPROCBILL_LINE |
| claimAmt | BigDecimal | 本次认款金额 | 核心字段 |
| returnAmt | BigDecimal | 经销商回款金额 | 核心计算字段 |
| claimServiceAmt | BigDecimal | 本次认领工程服务费 | 核心计算字段 |
| claimPercent | BigDecimal | 认款比例 | |
| allowCashFlag | String | 能否兑现 | Y/N，商票未兑付时为N |
| cancelFlag | String | 是否撤销 | Y/N，撤销审批通过后更新为Y |

</div>

<div class="kb-module">

### API接口

**认领单接口**（`/v1/{organizationId}/epmPaymentAllot`）：

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| POST | /saveAllot | 保存认领 |
| POST | /updateAllot | 更新认领 |
| POST | /deleteAllot | 删除认领 |
| POST | /queryOne | 认领详情 |
| POST | /queryCanAllotProjectPage | 可认领项目（分页） |
| POST | /queryCanAllotContractPage | 可认领合同（分页） |
| POST | /queryCanAllotDetail | 可认领出库明细 |
| POST | /select-contract-amt | 合同认缴金额 |
| POST | /selectDetailsByProject | 项目出库明细 |
| POST | /list/search | 认领列表 |

**合同行接口**（`/v1/{organizationId}/epmPaymentAllotLine`）：

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| POST | /queryLinesByPaymentAllotId | 合同行查询 |
| POST | /queryContractAllotDatas | 合同认领数据 |

**明细行接口**（`/v1/{organizationId}/epmPaymentAllotDetail`）：

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| POST | /queryAllotDetails | 出库明细查询 |

</div>

<div class="kb-module">

### 认领保存逻辑

**新增** (`saveAllot`)：
1. 从用户附加信息获取事业部(DEPT)
2. 查询到款单(EPM_PAYMENT_IMPORT)
3. 汇总合同行allotAmt → 头.allotAmt
4. 前置校验(`beforeUpsert`)：到款单状态+可认领金额
5. 赋值：paymentAllotStat=APPLYING, claimType=manual, hzApproveStatus=NEW
6. 保存认领头+合同行+出库明细行

**更新** (`updateAllot`)：采用"先删后插"策略，删除所有子行后重新插入

**删除** (`deleteAllot`)：
- 仅NEW/INTERRUPT状态可删除
- 删除后更新到款单可认领金额（虚拟→本地计算；真实→ERP查询）

**兑现标记** (`saveLine`)：
- 商票/银行承兑且未兑付→allowCashFlag='N'
- 其他→allowCashFlag='Y'

</div>

<div class="kb-module">

### 核心金额计算

**经销商回款金额(returnAmt)**：

| 场景 | 计算公式 |
|------|---------|
| 本次认领=剩余可认领 | returnAmt = 经销商金额 - 已认领经销商金额 |
| 本次认领<剩余可认领 | returnAmt = (经销商金额 / 工程方金额) × 本次认领金额，7位精度→2位 |

**工程服务费(claimServiceAmt)**：

| 场景 | 计算公式 |
|------|---------|
| 本次认领=剩余可认领 | claimServiceAmt = 工程方金额 - 经销商金额 - 已认领工程服务费 |
| 本次认领<剩余可认领 | claimServiceAmt = returnAmt - claimAmt |

**超额校验**：totalClaimAmt + claimAmt > engineeringAmount → 报错

**认领前后金额**：
- unallotAmtBefore = 当前可认领金额
- unallotAmtAfter = unallotAmtBefore - allotAmt
- 到款单unallotAmt更新为 canAllotAmt - allotAmt
- unallotAmt=0 → allotStatus=CLEAR

</div>

<div class="kb-module">

### 审批与ERP推送

**流程提交** (`wfProcSubmit`)：
1. 校验到款单状态+可认领金额
2. 推送核销数据到ERP(SUBMIT状态)
3. 启动HZERO工作流
4. 更新hzApproveStatus=RUN

**审批回调** (`wfComplete`)：
- 驳回→推送ERP取消核销(CANCEL)
- 通过→推送ERP核销(APPROVE)，paymentAllotStat=APPROVED

**ERP推送数据结构** (`pushAllotDataToErp`)：
- **AR_APPLY**：按customerTrxId分组汇总claimAmt和returnAmt
- **OM_CLAIM**：逐行组装CLAIM_DELIVERY_LINE_ID, CLAIM_AMT, RETURN_AMT
- **OM_APPLY**：按DELIVERY_NUMBER分组汇总

**手工发票认领(manualInvoiceClaim=Y)的影响**：

| 维度 | manualInvoiceClaim=Y | manualInvoiceClaim=N |
|------|---------------------|---------------------|
| 数据来源 | source_type=trx, source_name=TRX | source_type=inv_out, source_name=DELIVERY |
| 合同金额 | engineering_amount | sales_real_quantity × engineering_price |
| 经销商金额 | =合同金额 | sales_real_quantity × dealer_parice |
| 应收事务ID | source_doc_id | epm_cust_trx_detail_iface |

</div>

<div class="kb-module">

### 状态流转

**认领单状态(paymentAllotStat)**：

```text
新建 → APPLYING(申请中)
  │
  ├── 审批通过 → APPROVED(已审核) → ERP推送成功 → TRANSFER(已推送)
  │                                            └── ACCOUNTED(已认领)
  └── 认领撤销 → CANCEL(已撤销)
```

**审批状态(hzApproveStatus)**：

```text
NEW(新建) → RUN(审批中)
  ├── APPROVED(审批通过)
  ├── REBUT(驳回) → 可重新编辑提交
  └── INTERRUPT(终止) → 可删除
```

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1：虚拟到款单和真实到款单的可认领金额如何计算？ 🔴高频

虚拟到款(VIRTUAL_RECEIPT)走本地SQL计算；真实到款(RECEIPT)实时查ERP的unappliedAmount。

</div>

<div class="kb-module-alt">

### Q2：更新认领单时为什么采用"先删后插"？

合同行和出库明细行可能发生变化（增删明细），最安全的做法是删除所有子行后重新插入。

</div>

<div class="kb-module">

### Q3：哪些状态可以删除认领单？

仅NEW(新建)和INTERRUPT(终止)状态可删除。审批中(RUN)或已通过(APPROVED)不可删除。

</div>

<div class="kb-module-alt">

### Q4：手工发票认领和普通认领有什么本质区别？

手工发票认领(manualInvoiceClaim=Y)的数据来源是应收事务处理(TRX)，而非出库单(DELIVERY)。合同金额等于工程方金额，经销商金额也等于工程方金额，没有独立的经销商定价。ERP推送时使用不同的查询逻辑。

</div>

<div class="kb-module">

### Q5：商票到款单的兑现标记如何影响认领？

商票(TRADE_BILL)或银行承兑(BANK_BILL)且未兑付(PENDING)时，明细allowCashFlag='N'，表示不可兑现。兑付成功后更新为'Y'。

</div>

<div class="kb-module-alt">

### Q6：预认领自动推送的触发条件是什么？

定时任务检查申请中的预认领数据，当出库确认行对应的最后签收记录已入账(account_status=ACCOUNTED)且入账数量=明细数量时，自动推送ERP核销。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：查认领单基本信息**

```sql
SELECT payment_allot_id, payment_allot_code, payment_allot_stat, hz_approve_status, manual_invoice_claim
FROM epm_payment_allot WHERE payment_allot_id = #{paymentAllotId};
```

> 异常判断：查不到→认领单被删除；状态不一致→数据异常

</div>

<div class="kb-module-alt">

**步骤2：查认领金额**

```sql
SELECT allot_amt, unallot_amt_before, unallot_amt_after, payment_import_id
FROM epm_payment_allot WHERE payment_allot_id = #{paymentAllotId};
```

</div>

<div class="kb-module">

**步骤3：查到款单状态与金额**

```sql
SELECT payment_import_id, allot_status, unallot_amt, bill_type, import_stat
FROM epm_payment_import WHERE payment_import_id = #{paymentImportId};
```

</div>

<div class="kb-module-alt">

**步骤4：查认领明细（是否有撤销）**

```sql
SELECT ad.payment_allot_detail_id, ad.claim_amt, ad.return_amt, ad.cancel_flag, ad.allow_cash_flag
FROM epm_payment_allot_line al
JOIN epm_payment_allot_detail ad ON al.payment_allot_line_id = ad.payment_allot_line_id
WHERE al.payment_allot_id = #{paymentAllotId};
```

</div>

<div class="kb-module">

**步骤5：查合同行认领数据**

```sql
SELECT line.contract_id, line.allot_amt, epc.contract_code, epc.contract_name
FROM epm_payment_allot_line line
JOIN epm_project_contract epc ON line.contract_id = epc.contract_id
WHERE line.payment_allot_id = #{paymentAllotId};
```

</div>

<div class="kb-module-alt">

**上游依赖**：到款单(EPM_PAYMENT_IMPORT)、客户(CUSTOMER)、合同(EPM_PROJECT_CONTRACT)、项目(EPM_PROJECT)、出库确认(INV_OUT_BILL_INTF_CONFIRM_B)、签收差异(DRP_DIFFPROCBILL)

**下游影响**：工程服务费兑现(allowCashFlag控制)、回款金额(contractAmtReceived)、ERP核销推送

</div>

</div>

<div id="history">

<div class="kb-module">

### 历史排查记录

*(本模块暂无历史排查记录，后续遇到问题后会在此补充)*

</div>

</div>

<div id="related">

<div class="kb-module">

### 关联模块

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 项目到款引入(EpmPaymentImport) | 认领单.paymentImportId | 认领前校验状态、获取可认领金额 |
| 项目到款认领撤销(EpmPaymentAllotCancel) | 明细.cancel_flag | 撤销审批通过后标记为Y、金额回加 |
| 自营工程合同(EpmProjectContract) | 合同行.contractId | 合同已回款金额计算 |
| 工程服务费兑现(EpmServiceFeeCash) | 明细.allowCashFlag | 商票未兑付不可兑现 |
| 工程项目(EpmProject) | 合同.projectId | 项目维度查询可认领数据 |
| ERP系统(EBS) | pushAllotDatas | AR_APPLY/OM_CLAIM/OM_APPLY推送 |

</div>

</div>
