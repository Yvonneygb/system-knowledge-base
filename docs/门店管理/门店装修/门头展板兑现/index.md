<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门头展板兑现" desc="门头展板的报销兑现流程，支持额度内/外兑现、审批流转与兑现复核" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | CustDhCashoutHeadController |
| API路径 | /v1/{organizationId}/cust-dh-cashout-heads |
| Entity | CustDhCashoutHead |
| 数据库表 | CUST_DH_CASHOUT_HEAD |
| 工作流编码 | SUB_STORE_MTZBBXDX |
| 前端页面 | custDhCashoutHead |
| ServiceImpl | CustDhCashoutHeadServiceImpl |
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
选择门头报销单 → 新建门头兑现 → 填写兑现信息(额度内/外比例/金额) → 保存 → 提交工作流审批 → 审批通过 → 兑现完成
                                                                           → 审批驳回 → 修改后重新提交
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **新建门头兑现**：基于已审批的门头报销单创建兑现单，填写额度内/外兑现比例和金额
2. **兑现金额校验**：校验兑现比例和金额不超过限制
3. **提交审批**：启动工作流`SUB_STORE_MTZBBXDX`
4. **审批通过**：兑现完成，可推送资金池

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 新增逻辑（doInsert）">

**具体逻辑**：

- 1、校验参数：兑现比例和金额不超过限制(checkParams)
- 2、查询已兑现信息(sumCashOut)，计算首次兑现有效时间
- 3、组装字段：额度内/外申请兑现金额、业务批准金额、财务批准金额(fillFields)
- 4、获取账户余额ID(checkExtAccountId)
- 5、获取成本中心
- 6、生成兑现编码：编码规则`AE.DH_CASHOUT_HEAD_NO`，前缀为divisionCode
- 7、插入主表、行表、附件
</KbCard>

<KbCard num="2" title="2.2 更新逻辑（doUpdate）">

**具体逻辑**：

- 1、审批节点编辑保存：区域经理审批/设计师审批/销售会计审批/运营专员审批时调用nodeEditSave
- 2、普通更新：校验状态(checkUpOrDelete)，重新计算兑现信息，更新主表和行表
</KbCard>

<KbCard num="3" title="2.3 删除逻辑（doDelete）">

**具体逻辑**：

- 1、校验状态：仅NEW和REBUT状态可删除
- 2、删除主表、行表、附件
</KbCard>

<KbCard num="4" title="2.4 兑现金额计算（sumCashOut / computeFirstCheckOut）">

**具体逻辑**：

- 1、查询同一报销单下所有兑现单的汇总信息
- 2、计算额度内/外已兑现总额、已兑现比例
- 3、获取首次兑现的有效日期
</KbCard>

<KbCard num="5" title="2.5 打印数据（doSelectForPrint）">

**具体逻辑**：

- 1、转换词汇值含义：经营属性、支付方式、审批状态、门店类型、装修项目等
- 2、查询审批历史
</KbCard>

<KbCard num="6" title="2.6 资金池同步（synAdjustCashPoolToEbs）">

**具体逻辑**：

- 1、获取经销商账户(extAccountId)
- 2、构建CashPoolDataDTO，sourceType="广告费（额外）"
- 3、amount取outCashoutApplyAmt(额度外申请兑现金额)
</KbCard>

<KbCard num="7" title="2.7 保证书">

**具体逻辑**：

- 1、门头兑现关联验收人员保证书HTML内容
- 2、包含设计师验收和区域经理验收两部分
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

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| 方法 | 触发时机 | 逻辑说明 |
| 方法 | 触发时机 | 逻辑说明 |

</KbCard>

<KbCard num="1" title="表：CUST_DH_CASHOUT_HEAD">

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
| 2025-09-30 | jiaqiang.fu01 | 初始创建 |
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
