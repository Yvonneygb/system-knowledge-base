---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EXPENSE_WRITEOFF_IN_QUOTA (工程服务费冲销数据表)
  │
  └── 关联查询 FIN_SVC_EXP_ACC_HEAD (报销表头, 数据来源)
  └── 关联查询 SCPCOSTCENTER (成本中心表)
```

#### 冲销数据表字段（EXPENSE_WRITEOFF_IN_QUOTA）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| writeoffId | WRITEOFF_ID | Long | 主键 | 自增生成 |
| writeoffNo | WRITEOFF_NO | String | 冲销单号 | CodeRule(AE_WRITE_OFF_NO)生成，必填 |
| writeoffHeadno | WRITEOFF_HEADNO | String | 冲销头单据编码 | 工程→GCCX+交易公司编码+年月; 家装→JZCX+交易公司编码+年月 |
| yearmonth | YEARMONTH | String | 年月 | 从报销单ledger_date提取 |
| billingUnitCode | BILLING_UNIT_CODE | String | 法人编码 | 从报销单关联查询 |
| billingUnitName | BILLING_UNIT_NAME | String | 法人客户名称 | 从报销单关联查询 |
| divisionId | DIVISION_ID | Long | 事业部词汇值 | 从DivisionBaseSet查询 |
| entid | ENTID | Long | 组织ID | 从报销单organization_id |
| entname | ENTNAME | String | 事业部名称 | 从DivisionBaseSet查询 |
| costCenterCode | COST_CENTER_CODE | String | 成本中心编码 | |
| costCenterName | COST_CENTER_NAME | String | 成本中心名称 | |
| tradingCompanyName | TRADING_COMPANY_NAME | String | 交易公司 | 从报销单关联查询 |
| tradingCompanyCode | TRADING_COMPANY_CODE | String | 交易公司编码 | 从报销单关联查询 |
| writeoffTaxAmt | WRITEOFF_TAX_AMT | BigDecimal | 冲销含税总额 | = Σ报销单.write_off_amount |
| writeoffNotaxAmt | WRITEOFF_NOTAX_AMT | BigDecimal | 冲销不含税总额 | = writeoffTaxAmt / 税率(EPM_INLIMIT_TAX_RATE) |
| writeoffSumamt | WRITEOFF_SUMAMT | BigDecimal | 出库冲销总额 | |
| syncItem | SYNC_ITEM | Date | 同步时间 | 当前时间 |
| billStatus | BILL_STATUS | Long | 单据状态 | 1=制单, 3=审核中, 7=作废 |
| isHome | IS_HOME | Long | 是否家装合同 | 2=是(report_type in (3,4)), 0=否(report_type in (1,2)) |

</div>

<div class="kb-module-alt">

### 冲销数据生成逻辑

#### generateExpenseWriteoffInQuota() — 定时任务自动生成

```text
流程:
1. 参数获取: startDate, endDate（格式yyyy-MM）
2. 日期格式校验 → checkDateFormat()

3. 查询数据源 → generateWriteoffInQuotaQuery(startDate, endDate)
   └── 从FIN_SVC_EXP_ACC_HEAD查询 hz_approve_status='APPROVED' 且 ledger_date不为空
   └── 关联epm_project, customer, epm_trading_company
   └── 按 organization_id + trading_company_code + trading_company_name 
       + billing_unit_code + billing_unit_name + yearmonth + is_home 分组
   └── 汇总 write_off_amount 作为 sum_total_uncash_amt
   └── 支持三种日期参数:
       ├── 仅startDate → 精确匹配该月
       ├── startDate+endDate → 范围匹配
       └── 均为空 → 默认当月

4. 遍历数据源, 逐条处理:
   ├── 确定冲销头编码:
   │   ├── 家装 → "JZCX"+tradingCompanyCode+yearmonth
   │   └── 工程 → "GCCX"+tradingCompanyCode+yearmonth
   │
   ├── 查询是否已有同headNo记录 → selectByCondition(LIKE_RIGHT writeoffHeadno)
   │   ├── 已有 → 复用headNo
   │   └── 无 → 新建
   │
   ├── 查询事业部 → DivisionBaseSet(divisionId, divisionName)
   │
   ├── 获取冲销税率 → EPM_INLIMIT_TAX_RATE系统配置
   │
   ├── 组装数据体:
   │   ├── writeoffTaxAmt = sum_total_uncash_amt
   │   ├── writeoffNotaxAmt = writeoffTaxAmt / 税率
   │   ├── syncItem = 当前时间
   │   └── billStatus = 1(制单)
   │
   ├── 查询已有数据 → selectOne(entid+tradingCompanyCode+billingUnitCode+yearmonth)
   │   ├── 无数据或作废状态(billStatus=7) → 新增
   │   │   ├── 生成冲销单号 → CodeRule(AE_WRITE_OFF_NO)
   │   │   └── insert
   │   └── 制单状态(billStatus=1) → 更新
   │       ├── 保留原writeoffNo和writeoffHeadno
   │       └── updateByPrimaryKey
```

</div>

<div class="kb-module">

### 推送共享逻辑

#### doserviceWithHolding() — 手动推送到FSSC共享财务系统

```text
流程:
1. 参数校验 → headNo不能为空
2. 查询表头数据 → selectHead(headNo)
   ├── 汇总writeoff_notax_amt → apportion_amount / approve_amount
   ├── attribute1='2' (冲销标识)
   ├── attribute2=yearmonth
   ├── ou_id=trading_company_code
   ├── reason_desc=yearmonth+'-工程费用冲销'
   └── is_home!=2 过滤家装

3. 获取当前用户信息 → selectApplyCode(userId) → empid, orgId
4. 获取申请人职位 → LovValue(AE.SIE.POSITION_LDAP_CODE)

5. 设置表头数据:
   ├── 预提金额取负数（"-"+amount）
   ├── 来源单据ID/编码 = apportionCode
   ├── 日期 → 年月+1月-1天（取月末）
   └── 来源单据链接

6. 查询明细数据 → selectDealerDetail(headNo)
   ├── 每行设置币种/汇率/ERP类型/系统/单据类型
   ├── 费用发生日期 → 取月末
   ├── 成本中心编码 → doGetCostCenterCode(entid)
   │   └── 查询SCPCOSTCENTER(entid, channel='4')
   └── 金额取负数

7. 推送共享 → fsccSdkService.postToSie(vec)
8. 校验返回 → processStatus="S"
9. 更新状态 → 同writeoffHeadno的所有记录 billStatus=3(审核中)
```

#### 成本中心查询 — doGetCostCenterCode()

```text
查询SCPCOSTCENTER表:
  条件: entid=组织ID, channel='4'
  返回: costCode
```

</div>

<div class="kb-module-alt">

### 状态流转

```text
制单(1) → 审核中(3) → 推送共享完成
  │         │
  │         └── 推送成功 → FSSC处理入账(冲销)
  │
  └── 可重新生成(定时任务覆盖)
  │
  └── 作废(7) → 定时任务可重新生成覆盖
```

**冲销头编码规则**：

```text
工程合同: GCCX + 交易公司编码 + 年月
家装合同: JZCX + 交易公司编码 + 年月
示例: GCCXCORP202603 → 工程/交易公司CORP/2026年3月
```

### API接口清单

| URL | HTTP方法 | 功能说明 |
|-----|---------|---------|
| `/v1/{orgId}/expense-writeoff-in-quotas` | GET | 冲销数据列表(分页) |
| `/v1/{orgId}/expense-writeoff-in-quotas/{writeoffId}/detail` | GET | 冲销数据明细 |
| `/v1/{orgId}/expense-writeoff-in-quotas/push-data-fscc` | POST | 推送到共享财务系统 |

### 定时任务

| JobHandler名称 | 分布式锁 | 参数 |
|----------------|---------|------|
| expenseWriteoffInQuotaJob | SYNC_EXPENSE_WRITEOFF_IN_QUOTA | startDate(yyyy-MM), endDate(yyyy-MM) |

</div>

</div>

<div id="faq">

<div class="kb-module">

### 常见问题 FAQ

#### Q1: 定时任务生成冲销数据为空？

数据来源为FIN_SVC_EXP_ACC_HEAD中 hz_approve_status='APPROVED' 且 ledger_date不为空的报销单。若为空需检查：
1. 是否有审批通过的报销单
2. 报销单的ledger_date是否已填写
3. startDate/endDate参数格式是否正确(yyyy-MM)

排查SQL：
```text
SELECT hz_approve_status, ledger_date, write_off_amount, organization_id
FROM FIN_SVC_EXP_ACC_HEAD
WHERE hz_approve_status = 'APPROVED' AND ledger_date IS NOT NULL
  AND to_char(ledger_date,'yyyy-MM') = #{目标年月}
```

#### Q2: 定时任务参数格式错误？

startDate/endDate必须为yyyy-MM格式。校验逻辑：若格式不匹配则报错"【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM"

#### Q3: 推送共享报错"请传入冲销单号"？

headNo不能为空。推送接口 doserviceWithHolding() 的参数headNo从列表页手动传入。

#### Q4: 推送共享时间转换异常？

attribute2(年月)+01必须能解析为LocalDate。若yearmonth格式异常则报错"推共享预提 时间转换异常"。

排查SQL：
```text
SELECT writeoff_headno, yearmonth, writeoff_tax_amt, writeoff_notax_amt
FROM EXPENSE_WRITEOFF_IN_QUOTA
WHERE writeoff_headno LIKE #{冲销头编码}
```

#### Q5: 冲销不含税金额计算异常？

writeoffNotaxAmt = writeoffTaxAmt / 税率(EPM_INLIMIT_TAX_RATE)。若税率为0或未设置则计算异常。需检查系统参数EPM_INLIMIT_TAX_RATE的值。

#### Q6: 推送共享返回失败？

校验processStatus="S"。失败时检查：
1. 成本中心编码是否正确（doGetCostCenterCode查询SCPCOSTCENTER）
2. FSSC系统内部错误
3. 费用科目编码是否匹配（selectDealerDetail关联fin_fee_header）

排查SQL：
```text
SELECT cost_center_code, cost_center_name
FROM SCPCOSTCENTER
WHERE entid = #{组织id} AND channel = '4'
```

#### Q7: 冲销头编码复用逻辑？

同headNo的记录会复用（selectByCondition LIKE_RIGHT writeoffHeadno），避免同一交易公司+年月下生成重复的冲销头。已作废(billStatus=7)的记录会被新生成的记录覆盖。

#### Q8: 家装和工程冲销区别？

isHome字段区分：report_type in (1,2) → isHome=0(工程)，report_type in (3,4) → isHome=2(家装)。冲销头编码不同：工程用GCCX前缀，家装用JZCX前缀。推送共享时is_home!=2过滤家装数据单独推送。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module-alt">

### 排查工作流

#### Step 1: 确认报销单审批状态和冲销数据来源

```text
SELECT hz_approve_status, ledger_date, write_off_amount, organization_id,
  trading_company_code, billing_unit_code
FROM FIN_SVC_EXP_ACC_HEAD
WHERE hz_approve_status = 'APPROVED' AND ledger_date IS NOT NULL
  AND to_char(ledger_date,'yyyy-MM') = #{目标年月}
```

预期：存在审批通过且有冲销金额的报销单

#### Step 2: 确认冲销数据表状态

```text
SELECT writeoff_id, writeoff_no, writeoff_headno, yearmonth,
  writeoff_tax_amt, writeoff_notax_amt, bill_status, is_home
FROM EXPENSE_WRITEOFF_IN_QUOTA
WHERE yearmonth = #{目标年月}
ORDER BY writeoff_headno
```

#### Step 3: 确认冲销税率

```text
-- 查询EPM_INLIMIT_TAX_RATE系统参数
-- 此参数影响不含税金额计算
```

#### Step 4: 确认成本中心

```text
SELECT cost_center_code, cost_center_name
FROM SCPCOSTCENTER
WHERE entid = #{组织id} AND channel = '4'
```

预期：存在匹配的成本中心编码

#### Step 5: 确认推送共享结果

```text
SELECT writeoff_headno, bill_status, sync_item
FROM EXPENSE_WRITEOFF_IN_QUOTA
WHERE writeoff_headno = #{冲销头编码}
```

预期：推送成功后billStatus=3(审核中)

</div>

</div>

<div id="history">

<div class="kb-module">

### 历史排查记录

| 日期 | 问题描述 | 排查结果 | 解决方案 |
|------|---------|---------|---------|
| — | 暂无历史排查记录 | — | — |

</div>

</div>

<div id="related">

<div class="kb-module-alt">

### 关联模块

#### 上游依赖

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| 工程服务费报销 | 冲销数据来源于审批通过的报销单 | 报销单write_off_amount参与冲销汇总 |
| FIN_SVC_EXP_ACC_HEAD | 报销表头提供冲销金额 | 报销单审批通过后write_off_amount计入冲销 |
| 工程项目(epm_project) | 报销单关联项目信息 | 项目信息影响分组维度 |
| 客户信息(customer) | 报销单关联客户 | 客户信息影响分组维度 |
| 交易公司(epm_trading_company) | 报销单关联交易公司 | 交易公司编码影响冲销头编码和分组 |
| 事业部基础设置 | DivisionBaseSet提供事业部名称 | 事业部信息影响冲销单维度 |
| 系统参数(EPM_INLIMIT_TAX_RATE) | 冲销税率 | 税率影响不含税金额计算 |
| 成本中心(SCPCOSTCENTER) | 推送共享需成本中心编码 | 成本中心缺失导致推送失败 |

#### 下游影响

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| 共享财务系统(FSSC) | 推送共享目标 | 冲销金额影响FSSC入账(预提冲销) |
| 工程服务费预提 | 预提与冲销共同影响财务核算 | 冲销抵减预提金额 |
| 财务报表 | 冲销金额影响月度财务报表 | 冲销数据准确性影响报表 |
| 定时任务调度 | 冲销数据由定时任务生成 | 调度参数影响数据生成范围 |

</div>

</div>
