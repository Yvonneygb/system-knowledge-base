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
| GET | / | 门店装修申请关闭列表（分页） |
| GET | /detail/{applyCloseId} | 门店装修申请关闭明细 |
| POST | / | 创建或更新门店装修申请关闭 |
| DELETE | / | 删除门店装修申请关闭 |
| GET | /do-cal-deduction-amt | 计算扣除金额 |

</KbCard>

<KbCard title="3.2 工作流回调方法">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 校验验收单，启动工作流实例 |
| wfComplete | 审批完成 | 通过→onWfComplete；驳回→onWfBreak |
| onWfComplete | 审批通过 | 标记申请单已关闭，扣减额度 |
| onWfBreak | 审批驳回 | 更新状态为REJECTED |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_APPLY_CLOSE">

| 字段名 | 类型 | 说明 |
|------|------|------|
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

| 问题 | 原因/解决方案 |
|------|------|
| 提交时报"该门店申请单已发起门店验收流程" | 该申请单已存在非作废状态的验收报销单，需先作废验收单 |
| 计算扣除金额时报"公司参数Close_Amount未找到" | 需在系统参数中配置Close_Amount(申请关闭扣减单价) |
| 删除报"不能删除非制单状态的单据" | 仅NEW状态可删除，已提交审批的单据无法删除 |

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
