<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门头展板兑现" desc="门头展板的报销兑现流程，支持额度内/外兑现、审批流转与兑现复核" />

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
<KbCard num="1" title="表：CUST_DH_CASHOUT_HEAD">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | Long | 主键 |
| customer_legal_id | Long | 交易公司法人中间表ID |
| reimburse_head_id | Long | 门头报销单ID |
| bx_type | Long | 报销类型 |
| year | Long | 预算年度 |
| in_early_cashout_ratio | BigDecimal | 额度内提前兑现比例 |
| cashout_no | String | 兑换单编码 |
| out_cashout_ratio | BigDecimal | 额度外兑现比例 |
| remark | String | 备注 |
| created | Date | 创建时间 |
| last_upd | Date | 最后更新时间 |
| last_upd_by | String | 最后更新人 |
| entid | Long | 事业部ID |
| division_id | Long | 事业部词汇值 |
| audit_stat | String | 审核状态 |
| stat | Long | 状态 |
| wfid | Long | 流程ID |
| wfflag | Long | 流程状态 |
| in_cashout_apply_amt | BigDecimal | 额度内申请兑现金额 |
| out_cashout_apply_amt | BigDecimal | 额度外申请兑现金额 |
| in_valid_date | LocalDate | 额度内兑现有效期 |
| out_valid_date | LocalDate | 额度外兑现有效期 |
| fin_date | LocalDate | 入账日期 |
| status | String | 生效状态 |
| customer_id | Long | 经销商ID |
| in_apply_amt | BigDecimal | 额度内报销申请金额 |
| in_biz_amt | BigDecimal | 额度内业务批准金额 |
| in_fin_amt | BigDecimal | 额度内财务批准金额 |
| out_apply_amt | BigDecimal | 额度外报销申请金额 |
| out_biz_amt |8BigDecimal | 额度外业务批准金额 |
| out_fin_amt | BigDecimal | 额度外财务批准金额 |
| bzs_des_method | String | 保证书设计师验收方式(1视频/2现场) |
| bzs_des_name | String | 保证书设计师保证人 |
| bzs_des_time | LocalDateTime | 保证书验收时间 |
| bzs_biz_method | String | 保证书区域经理验收方式 |
| bzs_biz_name | String | 保证书区域经理保证人 |
| bzs_biz_time | LocalDateTime | 保证书区域经理保证事件 |
| pay_type | Long | 支付方式 |
| trading_company_code | String | 交易公司编码 |
| out_this_sur_cashout_amt | BigDecimal | 额度外剩余未兑现金额 |
| in_this_sur_cashout_amt | BigDecimal | 额度内剩余未兑现金额 |
| check_time | LocalDateTime | 审核通过时间 |
| fin_amt | BigDecimal | 入账金额 |
| cost_center_code | String | 运营中心编码 |
| cost_center_name | String | 运营中心名称 |
| ext_account_id | String | 余额账户ID |
| hz_instance_id | Long | H0流程实例ID |
| hz_approve_status | String | H0流程审批状态(必填) |

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
