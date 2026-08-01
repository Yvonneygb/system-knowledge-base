<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="7" title="门店装修申请关闭" desc="门店装修申请的关闭操作，支持手动关闭不再需要的装修申请单" />

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
<KbCard num="1" title="表：FIN_FEE_APPLY_CLOSE">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| apply_close_id | Long | 主键ID |
| apply_close_no | String | 关闭单号 |
| terminal_apply_id | Long | 关联装修申请ID |
| terminal_apply_no | String | 关联装修申请单号 |
| terminal_id | Long | 门店ID |
| terminal_code | String | 门店编码 |
| terminal_name | String | 门店名称 |
| cust_id | Long | 经销商ID |
| cust_code | String | 经销商编码 |
| cust_name | String | 经销商名称 |
| short_name | String | 经销商简称 |
| cust_full_name | String | 经销商拼接名称 |
| customer_class | Long | 经营属性(词汇值:customer_class) |
| d_cust_id | Long | 分销商ID |
| d_cust_code | String | 分销商编码 |
| d_cust_name | String | 分销商名称 |
| d_cust_full_name | String | 分销商拼接名称 |
| province_areaid | Long | 省ID |
| province_areaname | String | 省名称 |
| city_areaid | Long | 市ID |
| city_areaname | String | 市名称 |
| county_areaid | Long | 县/区ID |
| county_areaname | String | 县/区名称 |
| areaname | String | 拼接省市区名称 |
| addr | String | 详细地址 |
| terminal_type | Long | 门店类型(词汇值:terminal_type) |
| store_location_type | Long | 位置类型(词汇值:Store_Location_Type) |
| trading_company_id | Long | 交易公司ID(必填) |
| trading_company_code | String | 交易公司编码 |
| trading_company_name | String | 交易公司名称 |
| billing_unit_id | Long | 开票单位ID(必填) |
| billing_unit_code | String | 开票单位编码 |
| billing_unit_name | String | 开票单位名称 |
| is_close | Long | 是否关闭申请单(词汇值:yesno) |
| closing_reasons | String | 关闭原因 |
| decoration_style | Long | 装修风格(词汇值:decoration_style) |
| this_decoration_style | Long | 本次装修风格 |
| terminal_area | BigDecimal | 门店面积 |
| this_terminal_area | BigDecimal | 本次装修面积 |
| area_standard_rate | BigDecimal | 面积分配标准比例 |
| plan_open_date | LocalDate | 计划开业日期 |
| fixup_grade | Long | 门店装修等级(词汇值:fixup_grade) |
| decoration_days | Long | 装修周期 |
| decoration_type | Long | 装修性质(词汇值:decoration_type) |
| last_decoration_date | LocalDate | 旧店上次装修时间 |
| property_type | Long | 产权归属(词汇值:property_type) |
| lease_expiration_date | LocalDate | 租赁到期日 |
| designer | String | 委派设计师 |
| designer_mob | String | 设计师手机号 |
| shopmanager_name | String | 负责人 |
| shopmanager_mob | String | 负责人电话 |
| decoration_finished_time | LocalDate | 装修完成时间 |
| plan_design_date | LocalDate | 要求完成设计日期 |
| reply_design_date | LocalDate | 交付设计日期 |
| decoration_interval_date | LocalDate | 装修间隔期至 |
| is_over_standard | Long | 是否超标准(词汇值:yesno) |
| salezone_org_name | String | 销售区域名称 |
| operat_center_org_name | String | 运营中心名称 |
| stat | Long | 单据状态 |
| wfflag | Long | 流程状态 |
| wfid | Long | 流程ID |
| audit_stat | String | 审核状态 |
| apply_cause | String | 关闭原因 |
| creator | String | 申请人 |
| create_time | Date | 申请时间 |
| updator | String | 更新人 |
| update_time | Date | 更新时间 |
| organization_id | Long | 组织ID |
| hz_instance_id | Long | 流程实例ID |
| hz_approve_status | String | 流程实例状态 |
| deduction_sum_amount | BigDecimal | 扣减总额 |
| deduction_adv_amount | BigDecimal | 广告费扣减额度 |
| deduction_capital_amount | BigDecimal | 资金池扣减额度 |
| thistime_terminal_area | BigDecimal | 本次装修面积(计算用) |
| thistime_frontdoor_area | BigDecimal | 本次门头面积(计算用) |

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
