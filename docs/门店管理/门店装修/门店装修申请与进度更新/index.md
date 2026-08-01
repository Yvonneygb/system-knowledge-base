<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="8" title="门店装修申请与进度更新" desc="门店装修申请的创建与进度更新，涵盖新建申请、进度跟踪与状态流转" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeApplyFinishedHeaderController |
| API路径 | /v1/{organizationId}/fin-fee-apply-finished-headers |
| Entity | FinFeeApplyFinishedHeader |
| 数据库表 | FIN_FEE_APPLY_FINISHED_HEADER |
| 工作流编码 | SUB_STORE_MDZXBZSQYJDG |
| 前端页面 | finFeeApplyFinishedHeader |
| ServiceImpl | FinFeeApplyFinishedHeaderServiceImpl |
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
新建装修申请 → 填写门店/装修信息 → 计算装修标准/补贴金额 → 保存 → 提交工作流审批 → 审批通过 → 可发起验收报销
                                                                                      → 审批驳回 → 修改后重新提交
作废操作 → 标记单据为作废状态
重新生成 → 校验条件 → 复制原单据信息生成新申请
二次变更 → 标记申请单为二次变更状态
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **新建装修申请**：选择门店，填写装修信息（面积、风格、等级、周期等），系统自动生成申请单号
2. **装修标准计算**：根据门店类型和装修等级查询装修标准，计算额度内/额度外/门头/终端的申请标准和金额
3. **提交审批**：启动工作流`SUB_STORE_MDZXBZSQYJDG`
4. **作废**：仅NEW和REJECTED状态可作废，标记原因为INTERRUPT
5. **重新生成**：校验同一门店无其他有效申请单、超期天数和扣减比例，复制原单据重新生成
6. **二次变更**：发起签呈后标记isModify=1，二次变更后标记isSecondChange=2

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 新增校验（doInsert）">

**具体逻辑**：

- 1、装修周期校验：不超过公司参数`Decoration_Days`
- 2、自动赋值：成本中心、省市区名称、签章状态(0)、二次变更(0)、签呈标记(0)
- 3、默认值：isClose=1(未关闭)、isOverYear=1(未超年)、isOverStandard=1(未超标准)
- 4、单号生成：编码规则`AE.TERMINAL_APPLY_NO`
</KbCard>

<KbCard num="2" title="2.2 更新校验（doUpdate）">

**具体逻辑**：

- 1、装修周期校验：不超过公司参数`Decoration_Days`
- 2、预算年度：根据上次装修完成时间自动计算budYear
</KbCard>

<KbCard num="3" title="2.3 作废逻辑（operate）">

**具体逻辑**：

- 1、仅NEW和REJECTED状态可作废
- 2、作废后标记hzApproveStatus=INTERRUPT，记录作废原因
</KbCard>

<KbCard num="4" title="2.4 重新生成（validRegenerate）">

**具体逻辑**：

- 1、校验同一门店无其他非INTERRUPT状态的申请单
- 2、校验超期天数不超过公司参数`Over_Date_Limit`
- 3、校验扣减比例&lt;1（补贴金额不为0）
- 4、清空原ID/单号/流程信息，状态重置为NEW
</KbCard>

<KbCard num="5" title="2.5 删除校验（doDelete）">

**具体逻辑**：

- 1、仅NEW状态可删除
- 2、删除主表及关联照片明细
</KbCard>

<KbCard num="6" title="2.6 二次变更（doUpdateSecondChange）">

**具体逻辑**：

- 1、批量更新指定申请单的isSecondChange=2
</KbCard>

<KbCard num="7" title="2.7 装修前后照片">

**具体逻辑**：

- 1、支持查询门店装修前后照片（MktStorephotoSetLine）
</KbCard>

<KbCard num="8" title="2.8 交易公司LOV">

**具体逻辑**：

- 1、提供交易公司LOV查询接口getTradingCompany
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
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |
| 方法 | 路径 | 说明 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_APPLY_FINISHED_HEADER">

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
| 2025-09-05 | hfy | 初始创建 |
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
