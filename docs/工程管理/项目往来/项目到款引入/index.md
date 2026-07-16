---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EPM_PAYMENT_IMPORT (项目到款引入主表)
  │
  └──< EPM_PAYMENT_IMPORT_RCD (兑付记录表)

关联查询表:
  EPM_PAYMENT_ALLOT (回款认领头表) ←── 到款单.paymentImportId
  EPM_PAYMENT_ALLOT_LINE (回款认领行表)
  EPM_PAYMENT_ALLOT_DETAIL (回款认领明细表) ←── 认领明细.cancel_flag='N'
  CUSTOMER_ORG (客户组织表) ←── 币种查询
  EPM_TRADING_COMPANY (交易公司表)
  DIVISION_BASE_SET (事业部基础设置表)
  BASE_CURRENCY (币种基础表)
```

#### 到款引入主表字段（EPM_PAYMENT_IMPORT）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| paymentImportId | PAYMENT_IMPORT_ID | Long | 到款记录单ID | 主键，自增 |
| paymentImportCode | PAYMENT_IMPORT_CODE | String | 到款记录编号 | EPMS系统生成 |
| extPaymentImportId | EXT_PAYMENT_IMPORT_ID | String | 外部系统到款单ID | ERP的RECEIPT_ID，用于去重判断 |
| sourceSystem | SOURCE_SYSTEM | String | 来源系统 | erp/epms |
| sourceSystemNo | SOURCE_SYSTEM_NO | String | 来源系统单号 | ERP收款单号 |
| billType | BILL_TYPE | String | 到款单据类型 | RECEIPT=实际到款单；VIRTUAL_RECEIPT=虚拟到款单 |
| receiveAmt | RECEIVE_AMT | BigDecimal | 收款金额 | |
| confirmedAmt | CONFIRMED_AMT | BigDecimal | 已认款金额 | ERP同步时=appliedAmount |
| unallotAmt | UNALLOT_AMT | BigDecimal | 剩余可认款金额 | ERP同步时=unappliedAmount |
| allotStatus | ALLOT_STATUS | String | 认领状态 | WAITING=待认领；CLEAR=认领完成 |
| importStat | IMPORT_STAT | String | 到款引入状态 | 已生效/已失效/信用卡拖欠款项冲销/暂停付款/冲销付款/资金不足 |
| paymentStatus | PAYMENT_STATUS | String | 兑付状态 | PENDING=未兑付；SUCCESS=已兑付 |
| acceptanceType | ACCEPTANCE_TYPE | String | 票据类型 | 商业承兑/银行承兑/无需承兑 |
| customerId | CUSTOMER_ID | Long | 客户ID | 经销商ID |
| customerCode | CUSTOMER_CODE | String | 客户编码 | |
| receiveUnitId | RECEIVE_UNIT_ID | Long | 收款公司ID | 对应交易公司ID |
| remitUnitId | REMIT_UNIT_ID | Long | 汇款单位ID | 对应法人客户ID |
| receiveDate | RECEIVE_DATE | LocalDateTime | 收款日期 | |
| serialNumber | SERIAL_NUMBER | String | 银行流水号 | |
| paymentRemark | PAYMENT_REMARK | String | 打款说明 | |
| isHome | IS_HOME | Long | 是否家装 | 2=是，0=否 |

#### 兑付记录表字段（EPM_PAYMENT_IMPORT_RCD）

| 字段名 | 数据库列名 | 类型 | 含义 |
|--------|-----------|------|------|
| id | ID | Long | 主键，自增 |
| paymentImportCode | PAYMENT_IMPORT_CODE | String | 到款记录编号 |
| paymentDate | PAYMENT_DATE | Date | 兑付时间 |
| paymentOperator | PAYMENT_OPERATOR | String | 兑付操作员（系统配置ATTRIBUTE2） |

</div>

<div class="kb-module">

### API接口

**基础URL**：`/v1/{organizationId}/epmPaymentImport`

| HTTP方法 | URL路径 | 功能描述 | 权限 |
|---------|---------|---------|------|
| POST | /getErpPaymentData | 获取ERP到款单（单条） | Public |
| POST | /getPaymentImportCanAllotAmt | 获取到款单可认领金额 | Public |
| POST | /list/search | 项目到款引入分页查询 | Login |
| POST | /sur-amt-by-import | 判断剩余可认款金额 | Login |
| POST | /draftPayment | 商票兑付操作 | Login |
| GET | /export | 导出Excel | Login |

</div>

<div class="kb-module">

### ERP同步逻辑

**批量同步** (`syncPaymentDataFromErp`)：
1. 设置ERP请求参数：instance(erpEnvironment)、external="EPMS"、batchNumber(UUID)
2. 调用`erpSdk.getErpReceipt()`获取数据
3. 逐条处理，每条独立事务（`transactionCommit.commitBatch()`）
4. 异常记录日志，不影响其他记录

**核心处理** (`paymentImportErpProcess`)：

**已存在记录（更新）**：根据`extPaymentImportId + sourceSystem="erp"`查询
- 更新confirmedAmt、unallotAmt、allotStatus、acceptanceType、importStat
- allotStatus规则：unappliedAmount≤0→CLEAR，否则→WAITING

**不存在记录（新增）**：
1. 前置校验4项：经销商信息、法人信息、交易公司信息、事业部信息
2. 新增完整字段映射（约40+字段）
3. 兑付状态计算：商业承兑/银行承兑→PENDING，其他→SUCCESS
4. billType固定为RECEIPT（实际到款单）

**单条获取** (`getOnePaymentImportFromErp`)：
- 在同一事务内执行，异常直接抛出
- 返回完整的EpmPaymentImport对象

**定时任务** (`syncPaymentDataFromErpJob`)：
- 指定编码模式：逗号分隔，最多100个
- 时间范围模式：startTime和endTime必须同时有值

</div>

<div class="kb-module">

### 可认领金额计算

| 到款单类型 | 计算方式 | 说明 |
|-----------|---------|------|
| 实际到款单(RECEIPT) | 实时调用ERP接口获取unappliedAmount | 保证数据实时性 |
| 虚拟到款单(VIRTUAL_RECEIPT) | 本地SQL计算 | 虚拟到款单不存在于ERP |

**虚拟到款单SQL**：

```sql
SELECT i.receive_amt - nvl(allot.claim_amt, 0) canAllotAmt
FROM epm_payment_import i
LEFT JOIN (
    SELECT nvl(SUM(d.claim_amt), 0) claim_amt, head.payment_import_id
    FROM epm_payment_allot_detail d
    JOIN epm_payment_allot_line line ON d.payment_allot_line_id = line.payment_allot_line_id
    JOIN epm_payment_allot head ON line.payment_allot_id = head.payment_allot_id
         AND head.payment_allot_id <> #{paymentAllotId}
    WHERE d.cancel_flag = 'N' AND head.payment_import_id = #{paymentImportId}
    GROUP BY head.payment_import_id
) allot ON i.payment_import_id = allot.payment_import_id
WHERE i.payment_import_id = #{paymentImportId}
```

**实际到款单**：调用`getOnePaymentImportFromErp()`→返回ERP的unappliedAmount

</div>

<div class="kb-module">

### 商票兑付逻辑

**前置校验**：
1. acceptanceType必须为"商业承兑"或"银行承兑" → 否则"非商票类型到款无需兑付！"
2. paymentStatus不能为"success" → 否则"该商票已兑付！"
3. importStat必须为"已核销"或"未核销" → 否则"已核销、未核销的到款单才能发起兑付！"

**执行三步操作**：

```sql
-- Step 1: 更新到款单兑付状态
UPDATE epm_payment_import p SET p.payment_status = 'SUCCESS'
WHERE p.payment_import_id = #{paymentImportId};

-- Step 2: 更新认领明细可兑现标识
UPDATE epm_payment_allot_detail ad SET ad.allow_cash_flag = 'Y'
WHERE ad.payment_allot_detail_id IN (
    SELECT ad.payment_allot_detail_id
    FROM epm_payment_allot a
    INNER JOIN epm_payment_allot_line al ON a.payment_allot_id = al.payment_allot_id
    INNER JOIN epm_payment_allot_detail ad ON al.payment_allot_line_id = ad.payment_allot_line_id
    WHERE a.payment_import_id = #{paymentImportId}
);

-- Step 3: 插入兑付记录到EPM_PAYMENT_IMPORT_RCD
```

</div>

<div class="kb-module">

### 到款单撤销校验

**认领前校验** (`verifyImportStat`)：
- importStat不能为以下撤销状态：
  - "信用卡拖欠款项冲销"
  - "暂停付款"
  - "冲销付款"
  - "资金不足"
- 若在撤销状态中→"该到款单已撤销，不允许认领！"

**调用方**：回款认领模块在认领操作前调用（两处）

</div>

<div class="kb-module">

### 状态流转

**认领状态(allotStatus)**：

```text
ERP同步 → WAITING(待认领, unappliedAmount > 0)
  │
  └── 认领金额累积 → unappliedAmount ≤ 0 → CLEAR(认领完成)
```

**兑付状态(paymentStatus)**：

```text
票据类型=商业承兑/银行承兑 → PENDING(未兑付)
  │
  └── 商票兑付操作 → SUCCESS(已兑付)

票据类型=其他 → SUCCESS(已兑付)（初始即为已兑付）
```

**引入状态(importStat)**：

```text
ERP同步时设为 receiptStatus 值
- 已生效：可正常认领
- 已失效/信用卡拖欠/暂停付款/冲销付款/资金不足：不允许认领
```

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1：实际到款单和虚拟到款单的区别？ 🔴高频

实际到款单(billType=RECEIPT)来自ERP同步，可认领金额实时查ERP；虚拟到款单(billType=VIRTUAL_RECEIPT)由红字发票模块自动生成，可认领金额走本地SQL计算。

</div>

<div class="kb-module-alt">

### Q2：ERP同步去重规则？

根据extPaymentImportId(ERP的RECEIPT_ID) + sourceSystem="erp"判断：已存在则更新金额和状态，不存在则新增完整记录。

</div>

<div class="kb-module">

### Q3：认领状态如何计算？

ERP同步时：unappliedAmount≤0→CLEAR(认领完成)，否则→WAITING(待认领)。认领撤销审批通过后，金额回加到unallotAmt，allotStatus可能回退为WAITING。

</div>

<div class="kb-module-alt">

### Q4：商票兑付需要什么前提条件？

①票据类型为商业承兑或银行承兑；②兑付状态为未兑付(PENDING)；③引入状态为已核销或未核销。

</div>

<div class="kb-module">

### Q5：定时任务支持哪些同步模式？

两种模式：①指定编码模式（逗号分隔，最多100个）；②时间范围模式（startTime+endTime必须同时有值）。

</div>

<div class="kb-module-alt">

### Q6：经销商用户能看所有到款单吗？

不能。经销商用户(userType=D)只能查看自己客户编码下的到款单，通过LOV弹窗查询时自动过滤。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：查到款单基本信息**

```sql
SELECT payment_import_id, payment_import_code, bill_type, allot_status, import_stat, payment_status
FROM epm_payment_import WHERE payment_import_id = #{paymentImportId};
```

> 异常判断：查不到→到款单被删除；allot_status与实际认领金额不一致→需重新计算

</div>

<div class="kb-module-alt">

**步骤2：查到款单金额**

```sql
SELECT receive_amt, confirmed_amt, unallot_amt
FROM epm_payment_import WHERE payment_import_id = #{paymentImportId};
```

</div>

<div class="kb-module">

**步骤3：查认领明细（虚拟到款单本地查）**

```sql
SELECT i.receive_amt - nvl(SUM(d.claim_amt), 0) canAllotAmt
FROM epm_payment_import i
LEFT JOIN epm_payment_allot_detail d ON ...
WHERE i.payment_import_id = #{paymentImportId};
```

> 实际到款单：调ERP接口实时查询unappliedAmount

</div>

<div class="kb-module-alt">

**步骤4：查兑付记录**

```sql
SELECT * FROM epm_payment_import_rcd WHERE payment_import_code = #{paymentImportCode};
```

</div>

<div class="kb-module">

**步骤5：查关联认领单**

```sql
SELECT a.payment_allot_id, a.payment_allot_code, a.stat
FROM epm_payment_allot a WHERE a.payment_import_id = #{paymentImportId};
```

</div>

<div class="kb-module-alt">

**上游依赖**：ERP系统(到款数据同步)、客户(CUSTOMER)、交易公司(EPM_TRADING_COMPANY)、事业部(DIVISION_BASE_SET)

**下游影响**：回款认领(EPM_PAYMENT_ALLOT)、回款认领撤销(更新unallotAmt)、红字发票(创建虚拟到款单)

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
| 回款认领(EpmPaymentAllot) | 调用verifyImportStat+getPaymentImportCanAllotAmt | 认领前校验状态、获取金额 |
| 回款认领撤销(EpmPaymentAllotCancel) | 直接更新unallotAmt | 撤销审批通过后金额回加 |
| 红字发票(EpmCustTrxDetailIface) | 创建虚拟到款单 | 红字发票自动生成VIRTUAL_RECEIPT |
| ERP系统 | erpSdk.getErpReceipt() | 同步数据、实时查询金额 |
| 定时任务(PaymentImportErpJob) | syncPaymentDataFromErpJob | 定时/手动同步 |

</div>

</div>
