<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="门店装修额度外兑现" desc="门店装修额度外兑现流程，超出标准额度外的装修费用兑现管理" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程图">
</KbCard>

<KbCard num="2" title="上游依赖">
</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 新增逻辑（doInsert）">
**具体逻辑**：

- 1、生成兑现编码：编码规则`AE.TERMINAL_CASHOUT_CODE`，前缀为divisionCode
- 2、计提年份：若未填写，从验收报销单号截取并查询对应年份
- 3、新增主表、发票明细(FinFeeTerminalReCashInv)、资源信息明细(FinFeeTerminalReCashLine)
- 4、发票税金汇总：自动计算invoiceTaxAmt和factInvoiceNotaxAmt
- 5、新增附件
</KbCard>

<KbCard num="2" title="2.2 更新逻辑（doUpdate）">
**具体逻辑**：

- 1、更新主表、发票明细、资源信息明细
- 2、重新计算发票税金汇总
- 3、保存附件
</KbCard>

<KbCard num="3" title="2.3 删除逻辑（doDelete）">
**具体逻辑**：

- 1、删除主表、发票明细、资源信息明细
</KbCard>

<KbCard num="4" title="2.4 审批通过回调（onWfComplete）">
**具体逻辑**：

- 1、更新兑现单：checkTime=今天，hzApproveStatus=APPROVED
- 2、更新验收报销单：
- 3、额度外兑现比例 = 已兑现金额 / 额度外可兑现小计(sumOutCanNotaxBxAmt)
- 4、剩余未兑现金额 = 额度外可兑现小计 - 已兑现金额
</KbCard>

<KbCard num="5" title="2.5 推送共享（doSendToSie）">
**具体逻辑**：

- 1、调用terminalReCashShareIntf.terminalCashShare构建共享接口数据
- 2、推送成功：hzApproveStatus=RUN
- 3、推送失败：记录错误信息到errorCollection
</KbCard>

<KbCard num="6" title="2.6 推送资金池（synAdjustCashPoolToEbs）">
**具体逻辑**：

- 1、获取经销商账户(extAccountId)
- 2、构建CashPoolDataDTO，sourceType="广告费（额外）"
- 3、amount取afterTaxCashoutAmt(扣税差后可兑现金额)
</KbCard>

<KbCard num="7" title="2.7 提交审批（wfProcSubmit）">
**具体逻辑**：

- 1、更新工作流变量objId
- 2、启动工作流实例，状态更新为RUN
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">

</KbCard>
<KbCard title="其他按钮">
</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
</KbCard>
<KbCard num="1" title="表：FIN_FEE_TERMINAL_RE_CASHOUT">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| terminal_cashout_id | Long | 主键ID(兑现ID) |
| terminal_cashout_code | String | 兑现编码 |
| check_bx_code | String | 验收报销单号 |
| check_bx_id | Long | 验收报销ID |
| cust_id | Long | 经销商ID |
| cust_code | String | 经销商编码 |
| short_name | String | 经销商简称 |
| cust_name | String | 经销商名称 |
| trading_company_id | Long | 交易公司ID |
| trading_company_code | String | 交易公司编码 |
| trading_company_name | String | 交易公司名称 |
| billing_unit_id | Long | 开票单位ID |
| billing_unit_code | String | 法人编码 |
| billing_unit_name | String | 法人名称 |
| finished_time | LocalDate | 验收完成时间 |
| out_cashout_end_time | LocalDate | 额度外二次兑现失效日期 |
| terminal_id | Long | 门店ID |
| terminal_code | String | 门店编码 |
| terminal_name | String | 门店名称 |
| pay_type | Long | 支付方式 |
| vendor_id | Long | 供应商ID |
| vendor_code | String | 供应商编码 |
| vendor_name | String | 供应商名称 |
| cost_center_id | Long | 成本中心ID |
| cost_center_code | String | 成本中心编码 |
| cost_center_name | String | 成本中心名称 |
| note | String | 备注 |
| creator_name | String | 申请人 |
| create_time | Date | 申请时间 |
| organization_id | Long | 组织ID |
| stat | Long | 单据状态 |
| wfid | Long | 流程ID |
| wfflag | Long | 流程状态 |
| invoice_tax_rate | Long | 发票税点 |
| invoice_type | Long | 发票类型 |
| our_invoicing | Long | 本方开票 |
| this_sur_cashout_amt | BigDecimal | 剩余未兑现金额(未扣税) |
| this_bx_proportion | BigDecimal | 申请兑现比例(%) |
| this_apply_cashout_amt | BigDecimal | 本次申请兑现金额 |
| after_tax_cashout_amt | BigDecimal | 扣税差后可兑现金额 |
| fact_invoice_amt | BigDecimal | 实际兑现含税金额 |
| invoice_tax_amt | BigDecimal | 发票税金 |
| fact_invoice_notax_amt | BigDecimal | 实际兑现不含税金额 |
| receipt_status | String | 转货款状态 |
| invoice_paid_date | LocalDateTime | 入账日期 |
| invoice_paid_amount | BigDecimal | 入账金额 |
| reduce_amt | BigDecimal | 核销金额 |
| cashout_rate | Long | 兑现率 |
| can_not_tax_bx_amt | BigDecimal | 可兑现金额-不含税 |
| cashout_type | Long | 兑现类型 |
| creator | String | 申请人 |
| checker | String | 审核人 |
| check_time | LocalDate | 审核日期 |
| entid | Long | 事业部ID |
| audit_stat | String | 审核状态 |
| salezone_org_id | Long | 销售区域ID |
| salezone_org_name | String | 销售区域 |
| operat_center_org_id | Long | 运营中心ID |
| operat_center_org_name | String | 运营中心 |
| close_cash | Long | 是否关闭剩余未兑现 |
| error_collection | String | 错误收集器 |
| ledger_date | LocalDate | 总账日期 |
| cash_count | String | 兑现次数 |
| ticket_status | String | 税务接口状态 |
| ticket_message | String | 税务接口信息 |
| withholding_time_year | String | 计提年份 |
| designer | String | 委派设计师 |
| userid | String | 设计师ID |
| hz_instance_id | Long | 流程实例ID |
| hz_approve_status | String | 流程实例状态 |

</KbCard>

</div>
</div>
</div>

<div id="permission" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="权限控制">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="faq" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="常见问题">
<div class="faq-qa-wrap">
</div>
</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 作者 | 说明 |
|------|------|------|
| 2025-11-13 | YD | 初始创建 |
</KbCard>
</div>
</div>
</div>

<div id="history" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="历史排查记录">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>
