---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EPM_EXPENSE_TO_CASH (服务费兑现主表)
  │
  ├──< EXP_CASH_REIMB_REF (服务费负数兑现与报销关联关系表)
  │       │
  │       └── 关联 FIN_SVC_EXP_ACC_HEAD (报销表头)
  │
  └──< EXP_CASH_REIMB_CLAIM_REF (服务费兑现与报销认领关联关系表)
         │
         └── 关联 FIN_SVC_EXP_ACC_LINE (报销出库单明细)
         └── 关联 EPM_PAYMENT_ALLOT_DETAIL (认领出库单明细)
```

#### 兑现主表字段（EPM_EXPENSE_TO_CASH）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| cashingId | CASHING_ID | Long | 主键 | 自增生成 |
| cashingNo | CASHING_NO | String | 兑现编号 | CodeRule(EPM_CASHING_NO)生成 |
| cashType | CASH_TYPE | Long | 兑现类型 | 1=正数兑现, 2=负数兑现, 3=退款兑现 |
| cashingWay | CASHING_WAY | Long | 兑现方式 | 词汇(epm.cashing_way)，1=转货款 |
| customerId | CUSTOMER_ID | Long | 经销商ID | 前端传入 |
| svcExpAccId | SVC_EXP_ACC_ID | Long | 报销id | 关联报销表头 |
| serviceAmt | SERVICE_AMT | BigDecimal | 服务费金额 | 默认0 |
| cashableAmtBefore | CASHABLE_AMT_BEFORE | BigDecimal | 兑现前剩余可兑现金额 | 默认0 |
| cashableAmtAfter | CASHABLE_AMT_AFTER | BigDecimal | 兑现后剩余可兑现金额 | 默认0 |
| cashableAmt | CASHABLE_AMT | BigDecimal | 本次可兑现金额 | 默认0 |
| applyAmt | APPLY_AMT | BigDecimal | 本次申请实际兑现金额 | 正数兑现=复核申请金额×实际报销比例; 负数兑现=负数合计 |
| depositDeduct | DEPOSIT_DEDUCT | BigDecimal | 应扣质保金 | 默认0 |
| taxesDeduct | TAXES_DEDUCT | BigDecimal | 应扣税金 | 默认0 |
| otherDeduct | OTHER_DEDUCT | Long | 应扣其他 | 默认0 |
| diffTaxRate | DIFF_TAX_RATE | BigDecimal | 发票差异税率 | = max(0, 0.09-实际税率) |
| totalReturnAmt | TOTAL_RETURN_AMT | BigDecimal | 合同回款总额 | 默认0 |
| contractId | CONTRACT_ID | Long | 合同ID | 前端传入 |
| contractCode | CONTRACT_CODE | String | 合同编码 | 前端传入 |
| contractName | CONTRACT_NAME | String | 合同名称 | 前端传入 |
| thisWriteoffAmt | THIS_WRITEOFF_AMT | BigDecimal | 本次核销金额 | 默认0 |
| applyNotaxAmt | APPLY_NOTAX_AMT | BigDecimal | 实际兑现未税金额 | 默认0 |
| applyTaxAmount | APPLY_TAX_AMOUNT | BigDecimal | 行税金总额 | |
| auditStat | AUDIT_STAT | String | 单据审核状态 | 新建时="新建" |
| hzApproveStatus | HZ_APPROVE_STATUS | String | 流程实例状态 | NEW/RUN/APPROVED等 |
| billType | BILL_TYPE | String | 单据类型 | 默认"manual" |
| exchangeFlag | EXCHANGE_FLAG | Long | 兑现标识 | |
| actualReimbRate | ACTUAL_REIMB_RATE | BigDecimal | 实际报销比例 | 来自报销单 |
| appliedCashAmt | APPLIED_CASH_AMT | BigDecimal | 已申请兑现金额 | 计算值 |
| settleableCashAmt | SETTLEABLE_CASH_AMT | BigDecimal | 可结算工程服务费 | = 已认领服务费 - 退货服务费 - 已申请兑现 + 调账金额 |
| currentApplyCashAmt | CURRENT_APPLY_CASH_AMT | BigDecimal | 本次申请金额 | 前端传入 |
| projectSurplus | PROJECT_SURPLUS | BigDecimal | 项目盈余 | = 已认领合同金额 - (发货结算金额-退货结算金额) - 已申请兑现 |
| auditApplyCashAmt | AUDIT_APPLY_CASH_AMT | BigDecimal | 复核申请金额 | 前端传入 |
| offlineCashed | OFFLINE_CASHED | String | 线下已兑现 | Y/N，默认N |
| paymentStatus | PAYMENT_STATUS | Long | 付款状态 | 0=未付款, 2=付款成功 |
| tradingCompanyId | TRADING_COMPANY_ID | Long | 交易公司ID | |
| tradingCompanyCode | TRADING_COMPANY_CODE | String | 交易公司编码 | |
| tradingCompanyName | TRADING_COMPANY_NAME | String | 交易公司名称 | |

#### 负数兑现关联表（EXP_CASH_REIMB_REF）

| 字段名 | 数据库列名 | 类型 | 含义 |
|--------|-----------|------|------|
| cashReimbRefId | CASH_REIMB_REF_ID | Long | 主键id |
| cashingId | CASHING_ID | Long | 兑现id |
| svcExpAccId | SVC_EXP_ACC_ID | Long | 报销id |
| cashAmt | CASH_AMT | Long | 含税兑现金额 |
| surCashAmt | SUR_CASH_AMT | Long | 剩余兑现金额 |
| noTaxCashAmt | NO_TAX_CASH_AMT | Long | 不含税兑现金额 |

#### 认领关联表（EXP_CASH_REIMB_CLAIM_REF）

| 字段名 | 数据库列名 | 类型 | 含义 |
|--------|-----------|------|------|
| expCashReimbClaimRefId | EXP_CASH_REIMB_CLAIM_REF_ID | Long | 主键id |
| cashingId | CASHING_ID | Long | 兑现记录ID |
| svcExpAccLineId | SVC_EXP_ACC_LINE_ID | Long | 报销明细id |
| paymentAllotDetailId | PAYMENT_ALLOT_DETAIL_ID | Long | 认领出库单明细id |
| cashAmt | CASH_AMT | Long | 含税兑现金额 |

</div>

<div class="kb-module-alt">

### 兑现类型判断逻辑

#### checkCashType() — 自动判断兑现类型

1. **获取报销信息**：调用getBxInfo()查询报销金额
   - 如果actualBxAmt >= 0 → **正数兑现(cashType=1)**

2. **负数/退款判断**：
   - 查询可关联的正数报销单（resetBxCodes）
   - **存在正数报销单** → **负数兑现(cashType=2)**，applyAmt = Σ负数行金额
   - **不存在正数报销单** → **退款兑现(cashType=3)**，applyAmt = 实际报销金额 - 已兑现金额

#### 三种兑现类型对比

```text
cashType=1 正数兑现:  正常报销兑现，金额 > 0
cashType=2 负数兑现:  报销单金额为负，需关联正数报销单冲减
cashType=3 退款兑现:  报销单金额为负，无可关联正数单，走退款流程
```

</div>

<div class="kb-module">

### 金额计算逻辑

#### 可结算金额计算 — calSettleableAmt()

```text
可结算兑现金额 = (已认领工程服务费 - 已退货工程服务费) - 已申请兑现金额 + 虚拟调账金额
  └── 已申请兑现金额 = Σ(stat in (3,5) 或 HZ_APPROVE_STATUS in ('RUN','APPROVED') 的 Audit_Apply_Cash_Amt)
  └── 虚拟调账金额 = FIN_SVC_EXP_ACC_LINE中 source_type='virtual' 的 service_charge_amt之和
```

#### 项目盈余计算 — calProjectSurplus()

```text
项目盈余 = 已认领合同金额 - (发货结算金额 - 退货结算金额) - 已申请兑现金额
```

#### 兑现金额计算 — calCashAmt()

```text
正数兑现(cashType=1):
  如果 已申请兑现+可结算=核销金额 且 复核申请=可结算:
    applyAmt = 实际报销金额 - 已兑现金额  (防止尾差)
  否则:
    applyAmt = 复核申请金额 × 实际报销比例

负数兑现(cashType=2):
  applyAmt = -Σ(正数报销单行.cashAmt)
```

</div>

<div class="kb-module-alt">

### 保存与提交

#### 创建逻辑 — doInsert()

1. 设置 auditStat="新建", hzApproveStatus="NEW"
2. 设置 organizationId=当前用户DEPT
3. billType默认="manual"
4. **转货款账户校验**：cashingWay==1时查询事业部虚拟经销商账户余额ID
5. 生成单号：CodeRule(EPM_CASHING_NO)
6. 计算兑现金额：calCashAmt()
7. 赋默认值：assignDefaultValue()
8. 插入主表 EPM_EXPENSE_TO_CASH
9. 插入明细行：EXP_CASH_REIMB_CLAIM_REF和EXP_CASH_REIMB_REF
10. 保存前校验：validCheck()

#### 流程提交 — wfProcSubmit()

1. 数据校验：volidate()
2. 组装流程参数：cashingId, offlineFlag, area, startRealName, titleName, projectId
3. 调用workflowClient.startInstanceByFlowKey()启动流程
4. 更新 hzInstanceId 和 hzApproveStatus="RUN"

</div>

<div class="kb-module">

### 状态流转

```text
新建 → 已提交(RUN) → 审批通过(APPROVED) / 审批驳回
  │        │              │
  │        │              └── 推送共享: eventExecute() → arrowFsscSdk.pushExpenseToCash()
  │        │
  │        └── 流程驳回回调: onWfBreak() → hzApproveStatus=code
  │
  └── 流程完结回调: onWfComplete() → hzApproveStatus="APPROVED"
```

#### 审批通过推送共享 — eventExecute()

1. 校验本次申请金额 > 0
2. 构建推送数据：buildPushData()
   - 查询推送数据体（queryDataToErp SQL）
   - 设置系统参数：sourceSystem="EPMS"
   - 设置审批人信息：applyLdapCode, orgLdapCode, positionLdapCode
   - 银行转账时清空custCode和custSiteCode
3. 调用 arrowFsscSdk.pushExpenseToCash() 推送
4. 校验返回结果每行 processStatus="S"

</div>

<div class="kb-module-alt">

### API接口清单

| URL | HTTP方法 | 功能说明 |
|-----|---------|---------|
| `/v1/{orgId}/epm-expense-to-cash/select` | GET | 查询兑现单详细信息 |
| `/v1/{orgId}/epm-expense-to-cash/get-bx-info` | GET | 查询出库明细/判断兑现类型 |
| `/v1/{orgId}/epm-expense-to-cash/insert` | POST | 保存新增 |
| `/v1/{orgId}/epm-expense-to-cash/update` | POST | 保存修改 |
| `/v1/{orgId}/epm-expense-to-cash/salesmajor` | GET | 查询常规销售主体 |
| `/v1/{orgId}/epm-expense-to-cash/delete` | DELETE | 删除 |
| `/v1/{orgId}/epm-expense-to-cash/volidate` | POST | 流程提交前数据校验 |

</div>

</div>

<div id="faq">

<div class="kb-module">

### 常见问题 FAQ

#### Q1: 兑现类型自动判断错误怎么办？

兑现类型由 checkCashType() 自动判断，依据是报销单金额的正负值和可关联正数报销单的存在性。如果判断结果不符合预期，需检查：
1. 报销单 actualBxAmt 的值是否正确
2. 正数报销单是否已被取消（cancel_flag='N' 且不存在未取消的取消单）
3. resetBxCodes 的查询条件：stat=5 + actual_bx_amt>0 + 剩余兑现金额>0 + 同项目

排查SQL：
```text
SELECT cashing_id, cash_type, apply_amt, actual_reimb_rate
FROM EPM_EXPENSE_TO_CASH
WHERE svc_exp_acc_id = #{报销id}
```

#### Q2: 正数兑现金额为0或负数？

正数兑现 applyAmt 必须 > 0。若为0，常见原因：
1. 出库明细未被认领（allow_cash_flag='Y' 的认领记录为空）
2. 可结算金额为0（已认领服务费 - 退货服务费 - 已申请兑现 ≤ 0）
3. 实际报销比例为0（调整扣分率=1）

排查SQL：
```text
-- 检查认领情况
SELECT allot_detail_id, actual_service_amt, allow_cash_flag
FROM EPM_PAYMENT_ALLOT_DETAIL
WHERE svc_exp_acc_line_id IN (SELECT svc_exp_acc_line_id FROM FIN_SVC_EXP_ACC_LINE WHERE svc_exp_acc_id = #{报销id})

-- 检查可结算金额
SELECT applied_cash_amt, settleable_cash_amt, project_surplus
FROM EPM_EXPENSE_TO_CASH
WHERE svc_exp_acc_id = #{报销id}
```

#### Q3: 兑现金额超过报销金额？

校验规则：|本次兑现金额| + |已兑现金额| ≤ |实际报销金额|。若超限，异常信息为"报销单剩余兑现金额为:xxx,本单兑现金额:xxx，请检查"。

排查SQL：
```text
SELECT svc_exp_acc_id, actual_bx_amt,
  (SELECT SUM(ABS(apply_amt)) FROM EPM_EXPENSE_TO_CASH WHERE svc_exp_acc_id = #{报销id} AND stat IN (3,5) OR HZ_APPROVE_STATUS IN ('RUN','APPROVED')) as total_cash
FROM FIN_SVC_EXP_ACC_HEAD
WHERE svc_exp_acc_id = #{报销id}
```

#### Q4: 项目盈余不足无法兑现？

项目盈余 = 已认领合同金额 - (发货结算金额 - 退货结算金额) - 已申请兑现。若项目盈余 < 复核申请金额，则报错"当前项目盈余：xxx元，小于复核申请金额：xxx元，无法兑现！"

排查SQL：
```text
SELECT project_id, 
  (SELECT SUM(contract_amt) FROM EPM_PAYMENT_ALLOT_DETAIL WHERE project_id = #{projectId}) as claimed_contract,
  (SELECT SUM(settlement_amt) - SUM(return_settlement_amt) FROM ...) as goods_settlement,
  (SELECT SUM(apply_amt) FROM EPM_EXPENSE_TO_CASH WHERE project_id = #{projectId} AND stat IN (3,5)) as applied_cash
```

#### Q5: 负数兑现提示"正数报销单明细兑现金额不足"？

负数兑现需关联正数报销单行，且每行的剩余兑现金额(surCashAmt)必须≥本次兑现金额。若不足则报错"以下正数报销单明细兑现金额不足：xxx"。

#### Q6: 转货款方式兑现报错？

转货款(cashingWay=1)时需查询事业部虚拟经销商账户余额ID。若查询不到，可能原因：
1. division_trading_rel 中缺少对应记录
2. 交易公司与事业部不匹配

#### Q7: 推送共享返回错误？

审批通过后 eventExecute() 推送共享，校验返回每行 processStatus="S"。若失败需检查 errorCollection 字段记录的错误信息。

#### Q8: 流程提交校验失败？

volidate() 校验三项：
1. currentApplyCashAmt > 0
2. 已结算+复核申请 ≤ 核算金额
3. 项目盈余 ≥ 复核申请金额

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

### 排查工作流

#### Step 1: 确认报销单状态

```text
SELECT hz_approve_status, actual_bx_amt, audit_stat
FROM FIN_SVC_EXP_ACC_HEAD
WHERE svc_exp_acc_id = #{报销id}
```

预期：hz_approve_status = 'APPROVED'，actual_bx_amt 有值

#### Step 2: 确认兑现单数量和状态

```text
SELECT cashing_id, cashing_no, cash_type, hz_approve_status, apply_amt, audit_apply_cash_amt
FROM EPM_EXPENSE_TO_CASH
WHERE svc_exp_acc_id = #{报销id}
```

#### Step 3: 确认已申请兑现金额汇总

```text
SELECT SUM(apply_amt) as total_applied
FROM EPM_EXPENSE_TO_CASH
WHERE svc_exp_acc_id = #{报销id}
  AND (stat IN (3,5) OR HZ_APPROVE_STATUS IN ('RUN','APPROVED'))
```

#### Step 4: 确认认领和可结算金额

```text
-- 认领服务费
SELECT SUM(actual_service_amt) as claimed_svc
FROM EPM_PAYMENT_ALLOT_DETAIL
WHERE svc_exp_acc_id = #{报销id} AND allow_cash_flag = 'Y' AND cancel_flag = 'N'

-- 虚拟调账
SELECT SUM(service_charge_amt) as virtual_amt
FROM FIN_SVC_EXP_ACC_LINE
WHERE svc_exp_acc_id = #{报销id} AND source_type = 'virtual'
```

#### Step 5: 确认推送共享状态

```text
SELECT cashing_id, error_collection, hz_approve_status
FROM EPM_EXPENSE_TO_CASH
WHERE cashing_id = #{兑现id}
```

</div>

</div>

<div id="history">

<div class="kb-module-alt">

### 历史排查记录

| 日期 | 问题描述 | 排查结果 | 解决方案 |
|------|---------|---------|---------|
| — | 暂无历史排查记录 | — | — |

</div>

</div>

<div id="related">

<div class="kb-module">

### 关联模块

#### 上游依赖

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| 工程服务费报销 | 兑现数据来源于已审批报销单 | 报销单审批通过后才可发起兑现 |
| 报销出库单明细 | 可兑现金额依赖出库单认领情况 | 认领数据影响可结算金额 |
| 报销发票 | 实际报销金额受发票金额约束 | 发票金额限制实际兑现金额上限 |
| 工程项目 | 项目盈余计算依赖项目关联数据 | 项目盈余不足时无法兑现 |
| 工程合同 | 合同回款总额影响兑现 | 合同数据影响兑现金额计算 |
| 交易公司 | 转货款时需查询交易公司关联 | 交易公司不匹配则转货款失败 |
| 事业部基础设置 | 虚拟经销商账户依赖事业部设置 | 设置缺失导致转货款报错 |
| 供应商 | 银行转账时需供应商信息 | 供应商数据影响付款 |

#### 下游影响

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| 出库单数量 | 兑现后影响出库单的可兑现数量 | 已兑现金额减少可兑现金额 |
| 工程服务费冲销 | 审批通过后报销单的冲销金额参与冲销汇总 | 兑现通过→冲销数据增加 |
| 共享财务系统(FSSC) | 审批通过后推送共享 | 推送数据影响财务入账 |
| 工作流系统 | 兑现流程依赖工作流审批 | 流程状态变更触发后续操作 |

</div>

</div>
