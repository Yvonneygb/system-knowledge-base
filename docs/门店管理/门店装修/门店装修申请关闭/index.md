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
<div class="bf-truth-flow">
  <h4 class="bf-main-title">门店装修申请关闭 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★创建装修申请关闭★ → ⚖审批通过？ → 标记已关闭·扣减额度 → 结束（驳回则更新为已驳回）</p>
  <div class="bf-fc-svg-wrap">
<svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1100 660" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
<marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
<marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
<marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
</defs>
<rect x="25" y="20" width="1050" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="550" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
<rect x="159" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="234" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">装修申请单(已提交)</text>
<rect x="317" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="392" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">公司参数Close_Amount</text>
<rect x="475" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="550" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">广告费余额</text>
<rect x="633" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="708" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">资金池</text>
<rect x="791" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="866" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
<line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="148" y="210" width="174" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="235" y="232" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★创建装修申请关闭★</text>
<text x="235" y="252" text-anchor="middle" fill="#DCFCE7" font-size="10">选申请单·填关闭原因·算扣除金额</text>
<line x1="235" y1="264" x2="235" y2="290" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<polygon points="235,290 305,320 235,350 165,320" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="324" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
<line x1="305" y1="320" x2="410" y2="320" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
<rect x="410" y="306" width="80" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
<text x="450" y="325" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>
<line x1="450" y1="306" x2="450" y2="237" stroke="#EF4444" stroke-width="1.5"/>
<line x1="450" y1="237" x2="322" y2="237" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
<line x1="235" y1="350" x2="235" y2="366" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="150" y="366" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="235" y="391" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">标记已关闭</text>
<line x1="235" y1="406" x2="235" y2="422" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="150" y="422" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="235" y="447" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">扣减广告费/资金池</text>
<line x1="235" y1="462" x2="235" y2="478" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="180" y="478" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="503" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="235" y1="518" x2="235" y2="540" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="25" y="540" width="1050" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="550" y="562" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="238" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="313" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">申请单标记已关闭</text>
<rect x="396" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="471" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">广告费额度扣减</text>
<rect x="554" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="629" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">资金池额度扣减</text>
<rect x="712" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="787" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">关闭原因记录</text>
</svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
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
