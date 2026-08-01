<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="门店装修额度内兑现" desc="门店装修额度内兑现流程，在报销标准额度内进行装修费用兑现" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeCashoutHeaderController |
| API路径 | /v1/{organizationId}/fin-fee-cashout-headers |
| Entity | FinFeeCashoutHeader |
| 数据库表 | FIN_FEE_CASHOUT_HEADER |
| 工作流编码 | 无(直接兑现) |
| 前端页面 | finFeeCashoutHeader |
| ServiceImpl | FinFeeCashoutHeaderServiceImpl |
| 所属模块 | storeManage |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">
```
选择验收报销单 → 新建额度内兑现 → 填写兑现信息 → 保存 → 提交工作流审批 → 审批通过 →D兑现完成 → 回写申请/验收/报销单交易公司
                                                              → 审批驳回 → 修改后重新提交
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **新建额度内兑现**：基于验收报销单创建兑现单，填写兑现金额、比例等
2. **提交审批**：校验兑现金额不超过剩余未兑现总额
3. **审批通过回调(wfComplete)**：
   - 更新审核人、审核时间
   - 支付方式为折扣折让(payType=3)时设置总账日期和入账信息
   - 额度内兑现(cashoutType=1)时回写申请单、验收单、报销单的可用交易公司
   - 额度外兑现(cashoutType=2, save?Type=1)时更新额度外预算信息

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 提交前校验（wfProcSubmit）">

**具体逻辑**：

- 1、校验本次兑现金额不超过剩余未兑现总额：`totalCanCashoutAmt - usedCashAmt - thisCashoutAmt &gt;= 0`
</KbCard>

<KbCard num="2" title="2.2 审批通过回调（wfComplete）">

**具体逻辑**：

- 1、更%新审核人(checker)和审核时间(checkTime)
- 2、折扣折让(payType=3)：设置总账日期(ledgerDate)、入账金额(invoicePaidAmount)、入账日期(invoicePaidDate)
- 3、额度内兑现(cashoutType="1")回写逻辑：
- 4、回0写.写申请单可用交易公司(canTradingCompanyId/Code/Name)
- 5、回写验收单可用交易公司
- 6、回写报销单交易公司
- 7、额度外兑现：调用doUpdateOutlimitAmt更新额度外预算
</KbCard>

<KbCard num="3" title="2.3 额度外预算更新（doUpdateOutlimitAmt）">

**具体逻辑**：

- 1、条件：cashoutType=2且saveType=1且thisApplyAmt&gt;0
- 2、获取当前年月，更新额度外预算导入的已使用金额
</KbCard>

<KbCard num="4" title="2.4 兑现数据校验（doCheckCashoutData）">

**具体逻辑**：

- 1、校验实际兑现含税金额&gt;0（折扣折让除外）
- 2、校验本次兑现金额不超过剩余可兑现金额
- 3、额度内：校验本次核销金额不超过额度内可用金额
- 4、额度外：校验本次申请兑现金额不超过额度外可用金额，考虑已占用金额
</KbCard>

<KbCard num="5" title="2.5 资金池同步（synAdjustCashPoolToEbs）">

**具体逻辑**：

- 1、cashoutType=1：sourceType="广告费（额内）"
- 2、cashoutType=2：sourceType="广告费（额外）"
</KbCard>

<KbCard num="6" title="2.6 MBO推送（sendToMbo）">

**具体逻辑**：

- 1、推送,送MBO系统，billFlag="2"
- 2、推送失败时更新工作流变量mboFlag=2
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 API接口列表">

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /detail/print | 8兑现打印数据查询 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 校验兑现金额不超限 |
| wfComplete | 审批完成 | 更新审核信息，回写交易公司，更新预算 |
| volidate | 校验 | 未实现 |
| eventExecute | 事件执行 | 未实现 |
| sendToMbo | M9BO推送 | 推送MBO系统 |

</KbCard>

<KbCard title="表：FIN_FEE_CASHOUT_HEADER">

| 字段名 | 类型 | 说明 |
|------|------|------|
| fee_cashout_id | Long | 主键ID(发票兑现ID) |
| fee_cash:out_no | String | 发票兑现单号 |
| bx_id | Long | 费用报销ID |
| bx_no | String | 费用报销单号 |
| cashout_type | Long | 兑现类型3(1额度内/2额度外) |
| total_can_cashout_amt | BigDecimal | 可兑现总额 |
| used_cashout_amt | Long | 已兑现总额 |
| sur_cashout_amt | Long | �*剩余未兑现总额 |
| this_cashout_amt | BigDecimal | 本次兑现金额 |
| cust_id | Long | 经销商ID |
| cust_code | String | 经销商编码 |
| cust_name | String | 经销商名称 |
| short_name | String | 经销商简称 |
| bud_year | String | 预算年度 |
| object_code | String | 费用编码 |
| object_name | String | 费用名称 |
| is_end | Long | 是否为最终兑现 |
| creator | String | 申请人 |
| create_time | Date | 申请时间 |
| stat | Long | 单据状态 |
| wfid | Long | $流程ID |
| wfflag | Long | 流程状态 |
| entid | ?Long | 事业部ID |
| entname | String | 事业部名称 |
| organization_id | Long | 组织ID |
| division_id | Long | 事业部词汇值 |
| save_type | Long | 模块类型(1门店装修报销/2广告费报销) |
| checker | String | 审核人 |
| check_time | Date | 审核时间 |
| invoice_paid_date | LocalDateTime | 发票到款日期(入账日期) |
| invoice_paid_amount | BigDecimal | 发票到款金额 |
| receipt_status | String | 虚拟收款状态 |
| pay_type | Long | 支付方式 |
| salezone_org_id | Long | 销售区域ID |
| salezone_org_name | 1String | 销售区域名称 |
| operat_center_org_id | Long | 运营中心ID |
| operat_center_org_name | String | 运营中心名称 |
| note | String | 备注 |
| terminal_id | Long | 门店ID |
| terminal_code | String | 门店编码 |
| terminal_name | String | 门店名称 |
| in_can_use_amt | Long | 额度内可报销总金额(剩余未报) |
| out_can_use_amt | Long | 额度外可报销总金额(剩余未报) |
| this_apply_amt | Long | 本次申请金额 |
| diff_tax_rate | Long | 差异税率 |
| fact_tax_amount | Long | 实际税金 |
| fact_no_tax_amt | Long | 实际未含税金额 |
| fact_invoice_amt | Long | 实际兑现金额 |
| cashout_flag | Long | 兑现标识 |
| this_bx_proportion | 2Long | 本次兑现比例 |
| cost_center_code | String | 成本中心编码 |
| cost_center_name | String | 成本中心名称 |
| billing_unit_id | Long | 法人客户ID |
| billing_unit_code | String | 法人客户编码 |
| billing_unit_name | String | 法人客户名称 |
| trading_company_id | Long | 交易公司ID |
| trading_company_code | String | 交易公司编码 |
| trading_company_name | String | 交易公司名称 |
| audit_stat | String | 审核状态 |
| (5ext_account_id | String | 账户余额ID |
| ledger_date | Date | 总账日期 |
| ticket_status | String | 税务接口状态 |
| ticket_message | String | 税务接口信息 |
| signature_state | Long | 电子签章状态 |
| signature_url | String | 电子签章地址 |
| is_included_report | Long | 是否计入广告费报表(必填) |
| tripar_agree | Long | 三方协议 |
| supply_id | Long | 供应商ID |
| supply_full_name | String | 供应商全称 |
| supply_name | String | 供应商名称 |
| supply_code | String | 供应商编码 |
| vendor_contact | String | 供应商联系人 |
| vendor_tele | String | 供应商电话 |
| vendor_address | String | 供应商地址 |
| is_resign | Long | 需要重签 |
| hz_instance_id | Long | 流程实例ID |
| hz_approve&gt;8_status | String | 流程实例状态 |

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

| 问题8问题 | 原因/解决方案 |
|------|------|
| 提交报"申请兑现金额已超剩余未兑现总额" | 本次兑现金额超过可兑现总额减已兑现金额 |
| 额度外兑现报"本次申请兑现金额不可超过额度外可用金额" | 需检查额度外可用金额及已占用金额 |
| 资金池同步失败 | 检查ERP接口连通性和extAccountId是否正确 |

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
| 2025-10-29 | tyc | 初始创建 |
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
