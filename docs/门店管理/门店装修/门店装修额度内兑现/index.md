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
| 方法 | 路径 | 说明 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |

</KbCard>

<KbCard title="表：FIN_FEE_CASHOUT_HEADER">

| 字段名 | 类型 | 说明 |
|------|------|------|
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |
| 字段名 | 类型 | 说明 |

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
| 问题8问题 | 原因/解决方案 |
| 问题8问题 | 原因/解决方案 |
| 问题8问题 | 原因/解决方案 |

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
