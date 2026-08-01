<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="门店装修申请变更" desc="门店装修申请的变更管理，支持变更装修项目、金额、标准等级等字段" />

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

- 1、校验关联的装修申请单必须存在
- 2、生成变更单号：编码规则`AE.TERMINAL_CHANGE_NO`
- 3、自动赋值：成本中心、申请人
- 4、新增变更照片明细和附件
- 5、标记原申请单isModify=2(已发起变更)
</KbCard>

<KbCard num="2" title="2.2 删除逻辑（doDelete）">
**具体逻辑**：

- 1、仅NEW状态可删除
- 2、删除变更单及关联照片
- 3、恢复原申请单isModify=0(未发起变更)
</KbCard>

<KbCard num="3" title="2.3 作废逻辑（operate）">
**具体逻辑**：

- 1、标记变更单hzApproveStatus=INTERRUPT
- 2、标记原申请单isModify=3(变更作废)，记录作废原因
</KbCard>

<KbCard num="4" title="2.4 审批通过回调（onWfComplete）">
**具体逻辑**：

- 1、读取公司参数：
- 2、`Waiting_Days`：门店装修间隔期
- 3、`Advance_Permissible_Period`：门店装修提前允许期
- 4、`Deduct_Pro`：扣除比率
- 5、`Over_Date_Limit`：超期天数限制
- 6、计算超期天数和扣减比例
- 7、回写原申请单的变更后标准金额
</KbCard>

<KbCard num="5" title="2.5 变更明细查询（doSelect）">
**具体逻辑**：

- 1、查询变更单基本信息
- 2、查询原申请单的额度内/额度外申请标准（旧值）
- 3、查询变更照片明细
- 4、查询当前工作流任务名称
</KbCard>

<KbCard num="6" title="2.6 打印数据（doSelectForPrint）">
**具体逻辑**：

- 1、转换词汇值含义（门店类型、装修等级、产权归属、位置类型）
- 2、查询审批历史
- 3、计算补贴明细汇总（政策标准、申请标准、差异标准）
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
<KbCard num="1" title="表：FIN_FEE_APPLY_CHANGE_HEADER">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| terminal_change_id | Long | 主键ID(变更ID) |
| terminal_change_no | String | 变更单号 |
| terminal_apply_id | Long | 关联装修申请ID(必填) |
| terminal_apply_no | String | 关联装修申请单号 |
| terminal_id | Long | 门店ID |
| terminal_code | String | 门店编码 |
| terminal_name | String | 门店名称 |
| cust_id | Long | 经销商ID |
| cust_code | String | 经销商编码 |
| cust_name | String | 经销商名称 |
| short_name | String | 经销商简称 |
| cust_full_name | String | 经销商拼接名称 |
| customer_class | Long | 经营属性 |
| d_cust_id | Long | 分销商ID |
| d_cust_code | String | 分销商编码 |
| d_cust_name | String | 分销商名称 |
| d_cust_full_name | String | 分销商拼接名称 |
| province_areaid | Long | 省ID |
| city_areaid | Long | 市ID |
| county_areaid | Long | 县/区ID |
| areaname | String | 拼接省市区 |
| addr | String | 详细地址 |
| terminal_type | Long | 门店类型 |
| store_location_type | Long | 位置类型 |
| trading_company_id | Long | 交易公司ID(必填-变更后) |
Cust_code | String | 交易公司编码 |
| trading_company_name | String | 交易公司名称 |
| billing_unit_id | Long | 开票单位ID(必填) |
| billing_unit_code | String | 开票单位编码 |
| billing_unit_name | String | 开票单位名称 |
| is_close | Long | 是否关闭 |
| closing_reasons | String | 关闭原因 |
| decoration_style | Long | 装修风格 |
| this_decoration_style | Long | 本次装修风格 |
| terminal_area | BigDecimal | 门店面积 |
| this_terminal_area | BigDecimal | 本次装修面积 |
| area_standard_rate | BigDecimal | 面积分配标准比例 |
| plan_open_date | LocalDate | 计划开业日期 |
| fixup_grade | Long | 装修等级 |
| decoration_days | Long | 装修周期 |
| decoration_type | Long |Cust性质 |
| last_decoration_date | LocalDate | 旧店上次装修时间 |
| property_type | Long | 产权归属 |
| lease_expiration_date | LocalDate | 租赁到期日 |
| designer | String | 委派设计师 |
| designer_mob | String | 设计师手机号 |
| shopmanager_name | String | 负责人 |
| shopmanager_mob | String | 负责人电话 |
| decoration_finished_time | LocalDate | 装修完成时间 |
| plan_design_date | LocalDate | 要求完成设计日期 |
| reply_design_date | LocalDate | 交付设计日期 |
| decoration_interval_date | LocalDate | 装修间隔4期至 |
| is_over_standard | Long | 是否超标准 |
| over_date | Long | 超期天数 |
| in_expected_deduction | BigDecimal | 预计扣减额度(额度内) |
| out_expected_deduction | BigDecimal | 预计扣减额度(额度外) |
| is_over_year | Long | 是否超年 |
| subsidy_type | Long | 补贴类型 |
| decoration_area | BigDecimal | 装修面积 |
| frontdoor_area | BigDecimal | 门头面积 |
| in_policy_standard | BigDecimal | 额度内政策标准 |
| out_policy_standard | BigDecimal | 额度外政策标准 |
| terminal_policy_standard | BigDecimal | 终端政策标准 |
| frontdoor_policy_standard | BigDecimal | 门头政策标准 |
| in_policy_standard_amt | BigDecimal | 额度内政策标准金额 |
| out_policy_standard_amt | BigDecimal | 额度外政策标准金额 |
| terminal_policy_standard_amt | BigDecimal | 终端政策标准金额 |
| frontdoor_policy_standard_amt | BigDecimal | 门头政策标准金额 |
| in_apply_standard | BigDecimal | 额度内申请标准 |
| out_apply_standard | BigDecimal | 额度外申请标准 |
| terminal_apply_standard | BigDecimal | 终端申请标准 |
| frontdoor_apply_standard | BigDecimal | 门&头申请标准 |
| in_apply_standard_amt | BigDecimal | 额度内申请标准金额 |
| out_apply_standard_amt | BigDecimal | 额度外申请(标准金额 |
| terminal_apply_standard_amt | BigDecimal | 终端申请标准金额 |
| frontdoor_apply_standard_amt | BigDecimal | 门头申请标准金额 |
| in_diff_standard_amt | BigDecimal | 额度内差异标准金额 |
| out_diff_standard_amt | BigDecimal | 额度外差异标准金额 |
| terminal_diff_standard_amt | BigDecimal | 终端差异标准金额 |
| frontdoor_diff_standard_amt | BigDecimal | 门头差异标准金额 |
| note | String | 备注 |
| stat | Long | 单据状态(已弃用,用hz_approve_status) |
| wfflag | Long | 流程状态 |
| wfid | Long | 流程ID |
| audit_stat | String | 审核状态 |
| apply_cause | String | 作废原因 |
| frontdoor_fixup_grade | Long | 门头装修等级 |
| sum_out_apply_standard_amt | BigDecimal | 额度外申请标准金额合计 |
| creator | String | 申请人 |
| create_time | Date | 申请日期 |
| organization_id | Long | 组织ID |
| entid | Long | 事业部ID |
| cost_center_code | String | 成本中心编码 |
| cost_center_name | String | 成本中心名称 |
| is_use | Long | 是否使用 |
| is_regenerate | Long | 是否重新生成 |
| userid | String | 设计师ID |
| salezone_org_id | Long | 销售区域ID |
| salezone_org_name | String | �>售8售区域名称 |
| operat_center_org_id | Long | 运营中心ID |
| operat_center_org_name | String | 运营中心名称 |
| deduct_proportion | BigDecimal | 扣减比例 |
| pre_decoration_finished_time | LocalDate | 上次装修完成时间 |
| thistime_terminal_area | BigDecimal | 本次装修面积 |
| thistime_frontdoor_area | BigDecimal | 本次门头面积 |
| bud_year | Long | 预算年度 |
| soft_userid | String | 软装设计师ID |
| soft_designer | String | 软装设计师 |
| softGor_mob | String | 软装设计师手机号 |
| soft_purchase_standard | BigDecimal | 软装采购标准 |
| soft_purchase_amt | BigDecimal | 软装采购金额 |
| lantern_standard | BigDecimal | 灯具标准 |
| lantern_amt | BigDecimal | 灯具金额 |
| hz_instance_id | Long | 流程实例ID |
| hz_approve_status | String | 流程实例状态 |

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

" | 日期 | 作者 | 说明 |
|------|------|------|
| 2025-11-22 | hfy | 初始创建 |
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
