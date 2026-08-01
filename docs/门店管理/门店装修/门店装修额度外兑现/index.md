<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="门店装修额度外兑现" desc="门店装修额度外兑现流程，超出标准额度外的装修费用兑现管理" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeTerminalReCashoutController |
| API路径 | /v1/{organizationId}/fin-fee-terminal-re-cashouts |
| Entity | FinFeeTerminalReCashout |
| 数据库表 | FIN_FEE_TERMINAL_RE_CASHOUT |
| 工作流编码 | STORE_FIN_FEE_TERMINAL_RE_CASH |
| 前端页面 | finFeeTerminalReCashout |
| ServiceImpl | FinFeeTerminalReCashoutServiceImpl |
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
选择验收报销单 → 新建额度外兑现 → 填写兑现信息/发票明细 → 保存 → 提交工作流审批 → 审批通过 → 更新报销单兑现比例/剩余金额 → 推送共享/资金池
                                                                  → 审批驳回 → 更新状态
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **新建额度外兑现**：基于验收报销单创建二次兑现单，填写兑现金额、比例、发票信息
2. **发票明细**：支持多张发票明细录入，自动汇总税金
3. **提交审批**：启动工作流`STORE_FIN_FEE_TERMINAL_RE_CASH`
4. **审批通过回调(onWfComplete)**：
   - 更新审核时间、审核状态
   - 更新验收报销单的额度外兑现比例和剩余未兑现金额
5. **推送共享**：审批通过后推送共享接口(doSendToSie)
6. **推送资金池**：构建CashPoolDataDTO推送ERP资金池

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
<KbCard title="3.1 API接口列表">

| 方法 | 路径 | 说明 |
|------|------|------|
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_TERMINAL_RE_CASHOUT">

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

| 问题 | 原因/解决方案 |
|------|------|
| 问题 | 原因/解决方案 |
| 问题 | 原因/解决方案 |
| 问题 | 原因/解决方案 |

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
