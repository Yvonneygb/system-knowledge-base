<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="7" title="门店装修申请关闭" desc="门店装修申请的关闭操作，支持手动关闭不再需要的装修申请单" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeApplyCloseController |
| API路径 | /v1/{organizationId}/fin-fee-apply-closes |
| Entity | FinFeeApplyClose |
| 数据库表 | FIN_FEE_APPLY_CLOSE |
| 工作流编码 | FIN_FEE_APPLY_CLOSE |
| 前端页面 | finFeeApplyClose |
| ServiceImpl | FinFeeApplyCloseServiceImpl |
| 所属模块 | storeCheck |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">
```
创建关闭申请 → 计算扣除金额 → 提交工作流审批 → 审批通过 → 扣减额度(广告费/资金池) → 关联申请单标记已关闭
                                              → 审批驳回 → 更新状态为已驳回
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **创建关闭申请**：选择已提交的装修申请单，填写关闭原因，系统自动生成关闭单号
2. **计算扣除金额**：根据本次装修面积和门头面积，乘以公司参数`Close_Amount`计算扣减总额，再按广告费余额拆分为广告费扣减额度和资金池扣减额度
3. **提交审批**：校验该申请单是否已发起验收流程，若已发起则不允许关闭；启动工作流`FIN_FEE_APPLY_CLOSE`
4. **审批通过回调(onWfComplete)**：将关联的装修申请单标记为已关闭(`isClose=2, auditStat=已关闭`)，执行额度扣减
5. **审批驳回回调(onWfBreak)**：更新关闭单状态为已驳回

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 提交前校验（onUserSubmit）">

**具体逻辑**：

- 1、校验该装修申请单是否存在非作废状态的验收报销单，若存在则抛出异常：`该门店申请单已发起门店验收流程，不允许发起门店申请关闭`
</KbCard>

<KbCard num="2" title="2.2 扣除金额计算（doCalDeductionAmt）">

**具体逻辑**：

- 1、**扣减总额** = (本次装修面积 + 本次门头面积) × 公司参数`Close_Amount`
- 2、**广告费扣减额度** = min(扣减总额, 广告费可用余额)，广告费余额≤0时取0
- 3、**资金池扣减额度** = 扣减总额 - 广告费扣减额度
</KbCard>

<KbCard num="3" title="2.3 额度扣减（deductFinByAdvOrCapital）">

**具体逻辑**：

- 1、审批通过后执行，按广告费扣减额度和资金池扣减额度分别扣减
- 2、广告费扣减 &gt; 0 时扣减广告费余额
- 3、资金池扣减 &gt; 0 时扣减资金池
</KbCard>

<KbCard num="4" title="2.4 删除校验（doDelete）">

**具体逻辑**：

- 1、仅允许删除制单状态(`NEW`)的单据
</KbCard>

<KbCard num="5" title="2.5 单号生成规则">

**具体逻辑**：

- 1、编码规则：`AE.FIN_FEE_APPLY_CLOSE`，参数包含`divisionCode`
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
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |

</KbCard>

<KbCard title="3.2 工作流回调方法">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_APPLY_CLOSE">

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
| 2025-12-22 | hfy | 初始创建 |
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
