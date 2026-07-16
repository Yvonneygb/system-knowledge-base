---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EXPENSE_WITHHOLDING_HEAD (服务费预提表)
  │
  └── 关联查询 EXPENSE_WRITEOFF_IN_QUOTA (冲销数据表)
  └── 关联查询 expense_withholding_view (预提数据源视图)
```

#### 预提表字段（EXPENSE_WITHHOLDING_HEAD）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| withholdingHeadId | WITHHOLDING_HEAD_ID | Long | 主键 | 自增生成 |
| withholdingNo | WITHHOLDING_NO | String | 预提编号 | CodeRule生成，家装用WITHHOLDING_NO_HOME |
| shareNo | SHARE_NO | String | 共享单据编号 | CodeRule生成，家装用SHARE_NO_HOME |
| divisionId | DIVISION_ID | Long | 事业部ID | 必填，前端传入或视图查询 |
| tradingCompanyId | TRADING_COMPANY_ID | Long | 交易公司ID | |
| tradingCompanyCode | TRADING_COMPANY_CODE | String | 交易公司编码 | 从视图查询 |
| tradingCompanyName | TRADING_COMPANY_NAME | String | 交易公司名称 | 从视图查询 |
| billingUnitCode | BILLING_UNIT_CODE | String | 法人客户编码 | 从视图查询 |
| billingUnitName | BILLING_UNIT_NAME | String | 法人客户名称 | 从视图查询 |
| withholdingRaxAmount | WITHHOLDING_RAX_AMOUNT | BigDecimal | 预提含税总额 | 从视图查询/计算 |
| withholdingNoraxAmount | WITHHOLDING_NORAX_AMOUNT | BigDecimal | 预提不含税总额 | 从视图查询/计算 |
| withholdingYear | WITHHOLDING_YEAR | String | 预提年度 | 从审批时间提取 |
| withholdingMonth | WITHHOLDING_MONTH | String | 预提月份 | 从审批时间提取 |
| organizationId | ORGANIZATION_ID | Long | 组织ID | |
| checkTime | CHECK_TIME | LocalDate | 审批通过时间 | |
| costCode | COST_CODE | String | 成本中心编码 | |
| costName | COST_NAME | String | 成本中心名称 | |
| feecode | FEECODE | String | 费用科目编码 | |
| billStatus | BILL_STATUS | Long | 单据状态 | 1=制单, 3=审核中, 7=作废 |
| generatedTimes | GENERATED_TIMES | Long | 重新生成记录数 | |
| isHome | IS_HOME | Long | 是否家装合同 | 2=是 |
| remark | REMARK | String | 备注 | |

</div>

<div class="kb-module-alt">

### 预提单生成逻辑

#### generateBill() — 定时任务/手动触发生成预提单

```text
流程:
1. 查询数据源 → selectExpenseWithholdingView(dto)
   └── 从 expense_withholding_view 视图查询
   └── 支持三种syncFlag:
       ├── syncFlag=1 → 精确匹配check_time（指定年月）
       ├── syncFlag=2 → 范围匹配（开始月~结束月）
       └── syncFlag=3 → 全部数据

2. 查询事业部基础设置 → DivisionBaseSet

3. 逐条处理:
   ├── 查询已有操作数据 → selectOperationalData(headDTO)
   │   条件: organizationId + isHome + billingUnitCode + checkTimeStr + tradingCompanyCode
   │
   ├── 无数据或作废状态(billStatus=7) → 新增
   │   ├── 生成共享单据编号 → generateShareNo(tradingCompanyCode, isHome)
   │   ├── 生成预提编号 → generateWithholdingNo(divisionCode, isHome)
   │   └── insert
   │
   └── 制单状态(billStatus=1) → 更新
   │   ├── 保留原withholdingNo和shareNo
   │   └── updateByPrimaryKeySelective
```

#### 重新生成 — doRegenerate()

1. 校验：不能存在同checkTimeStr+tradingCompanyCode且billStatus!=7的记录
2. 若存在则抛异常："已存在重新生成【xxx】单据，无需重复生成！"
3. 调用generateBill()生成新预提单(syncFlag="1")

</div>

<div class="kb-module">

### 执行与作废

#### 执行/作废 — operateExpenseWithholding()

```text
参数:
  flag=0 → 执行（推送共享）
  flag=1 → 作废（推送作废数据到共享）

流程:
1. 参数校验: shareNo/checkTimeStr/tradingCompanyCode不能为空
2. 构建推送数据 → doserviceWithHolding(shareNo, flag, isHome)
3. 推送共享 → arrowFsscSdk.inLimitBudPush(pushDTO)
4. 校验返回 → processStatus必须="S"
5. 更新状态 → updateBillStatus(shareNo)，billStatus设为3(审核中)
```

#### 构建推送共享数据 — doserviceWithHolding()

```text
表头数据:
  ├── attribute1: flag=1(作废)→"2", flag=0(执行)→"1"
  ├── attribute2: 审批年月(checkTime或year-month)
  ├── apportionCode: 作废时加后缀"_F"
  ├── apportionAmount: 作废时为负数
  ├── 日期: 取年月的最后一天
  ├── 币种/系统/单据类型/汇率: 从ArrowFsccProperty获取
  └── reasonDesc: "{年}-{月}-工程费用预提"

明细数据:
  ├── 跳过金额为0的记录
  ├── 金额作废时取负数
  ├── 借贷类型: "DR"
  ├── 入账单位: organizationId
  ├── 费用科目: feecode
  ├── 行政部门: costCode
  └── 法人客户: billingUnitCode/billingUnitName
```

</div>

<div class="kb-module-alt">

### 状态流转

```text
制单(1) → 审核中(3) → 推送共享完成
  │         │
  │         └── 推送成功 → FSSC处理入账
  │
  └── 可重新生成 → 新增预提单
  │
  └── 可作废(7) → 推送作废数据到FSSC
```

**状态说明**：
- billStatus=1(制单)：新生成的预提单，可执行或作废
- billStatus=3(审核中)：已推送到FSSC，等待FSSC处理
- billStatus=7(作废)：已作废，可重新生成

### API接口清单

| URL | HTTP方法 | 功能说明 |
|-----|---------|---------|
| `/v1/{orgId}/expense-withholding-heads/regenerate` | POST | 重新生成预提单 |
| `/v1/{orgId}/expense-withholding-heads/invalid` | POST | 作废预提单 |
| `/v1/{orgId}/expense-withholding-heads/execute` | POST | 执行预提单(推送共享) |

</div>

</div>

<div id="faq">

<div class="kb-module">

### 常见问题 FAQ

#### Q1: 预提单生成数据为空？

预提数据来源于 expense_withholding_view 视图，查询条件包括 organizationId、isHome、syncFlag、tradingCompanyCode等。若返回为空需检查：
1. 视图中是否有对应的审批通过报销单数据
2. checkTime条件是否匹配（syncFlag=1精确匹配、2范围、3全部）

排查SQL：
```text
SELECT * FROM expense_withholding_view
WHERE organization_id = #{组织id} AND trading_company_code = #{交易公司编码}
```

#### Q2: 重新生成报错"已存在重新生成单据"？

校验逻辑：不能存在同checkTimeStr+tradingCompanyCode且billStatus!=7的记录。若已存在制单或审核中的预提单，则无法重复生成。

排查SQL：
```text
SELECT withholding_head_id, withholding_no, bill_status, check_time
FROM EXPENSE_WITHHOLDING_HEAD
WHERE trading_company_code = #{交易公司编码}
  AND to_char(check_time,'yyyy-MM') = #{年月}
  AND nvl(bill_status,0) != 7
```

#### Q3: 执行推送共享失败？

推送共享调用 arrowFsscSdk.inLimitBudPush()，返回processStatus必须="S"。失败常见原因：
1. 共享单据编号(shareNo)为空 → 校验报错"单据编码不能为空"
2. checkTimeStr为空 → 校验报错"年月不能为空"
3. tradingCompanyCode为空 → 校验报错"交易公司不能为空"
4. FSSC系统内部错误

排查SQL：
```text
SELECT share_no, withholding_no, bill_status, withholding_rax_amount, withholding_norax_amount
FROM EXPENSE_WITHHOLDING_HEAD
WHERE share_no = #{共享单据编号}
```

#### Q4: 预提编号生成规则？

家装预提：CodeRule(WITHHOLDING_NO_HOME)
工程预提：CodeRule(WITHHOLDING_NO)
家装共享编号：CodeRule(SHARE_NO_HOME)
工程共享编号：CodeRule(SHARE_NO)

#### Q5: 作废和执行的区别？

执行(flag=0)：attribute1="1"，金额正数，推送FSSC正常入账
作废(flag=1)：attribute1="2"，金额取负数，apportionCode加"_F"后缀，推送FSSC冲销入账

#### Q6: 费用科目编码缺失？

明细数据的feecode字段影响推送FSSC的费用分类。若为空则需检查视图数据中费用科目映射。

#### Q7: 成本中心编码如何获取？

明细数据中的costCode来自预提表，影响FSSC入账的成本中心分配。缺失时需在预提单生成时补全。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module-alt">

### 排查工作流

#### Step 1: 确认预提数据源

```text
SELECT * FROM expense_withholding_view
WHERE organization_id = #{组织id}
ORDER BY check_time DESC
```

预期：视图中有审批通过的报销单汇总数据

#### Step 2: 确认预提单状态

```text
SELECT withholding_head_id, withholding_no, share_no, bill_status,
  withholding_rax_amount, withholding_norax_amount, trading_company_code,
  to_char(check_time,'yyyy-MM') as check_month
FROM EXPENSE_WITHHOLDING_HEAD
WHERE organization_id = #{组织id}
ORDER BY check_time DESC
```

#### Step 3: 确认推送共享状态

```text
SELECT share_no, bill_status, is_home, feecode, cost_code
FROM EXPENSE_WITHHOLDING_HEAD
WHERE share_no = #{共享单据编号}
```

预期：billStatus=3(审核中)表示已推送，processStatus="S"表示FSSC处理成功

#### Step 4: 确认作废/重新生成状态

```text
SELECT withholding_head_id, bill_status, generated_times
FROM EXPENSE_WITHHOLDING_HEAD
WHERE trading_company_code = #{交易公司编码}
  AND to_char(check_time,'yyyy-MM') = #{年月}
```

预期：billStatus=7(作废)时可重新生成

#### Step 5: 确认事业部基础设置

```text
SELECT division_id, division_name, division_code
FROM DivisionBaseSet
WHERE organization_id = #{组织id}
```

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
| 工程服务费报销 | 预提数据来源于审批通过的报销单 | 报销审批通过→数据进入视图→生成预提 |
| expense_withholding_view | 预提数据源视图 | 视图数据完整性决定预提单内容 |
| 事业部基础设置 | 预提编号依赖事业部编码 | 设置缺失导致编号生成失败 |
| ArrowFsccProperty | 推送共享的币种/汇率/系统参数 | 参数缺失导致推送数据不完整 |
| 工作流职位 | 推送共享需申请人职位信息 | LovValue获取职位 |
| 共享财务系统(FSSC) | 推送目标系统 | FSSC接口可用性影响推送结果 |

#### 下游影响

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| 共享财务系统(FSSC) | 执行/作废均推送到FSSC | 预提金额影响FSSC入账 |
| 工程服务费冲销 | 报销单审批通过后冲销数据汇总 | 预提与冲销共同影响财务核算 |
| 财务报表 | 预提/作废金额影响月度财务报表 | 预提数据准确性影响报表 |

</div>

</div>
