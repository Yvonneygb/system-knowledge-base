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
| GET | / | 装修申请列表(分页) |
| GET | /change-header-lov | 变更-关闭申请-LOV |
| POST | /do-search-decorate | 查询装修标准 |
| GET | /storephoto-set-line | 装修前后照片 |
| GET | /do-select | 装修申请详情 |
| GET | /do-select-print | 打印数据 |
| POST | /operate | 作废 |
| GET | /valid-regenerate | 重新生成 |
| GET | /do-search-modify | 发起签呈-列表查询 |
| POST | /do-update-second-change | 二次变更 |
| GET | /do-delete | 删除 |
| POST | /do-save | 保存 |
| GET | /get-trading-company | 交易公司LOV |
| GET | /get-com-data | 面积分配标准比 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 更新审核状态，处理后续逻辑 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_APPLY_FINISHED_HEADER">

| 字段名 | 类型 | 说明 |
|------|------|------|
| terminal_apply_id | Long | 主键ID(装修申请ID) |
| terminal_apply_no | String | 装修申请单号 |
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
| trading_company_id | Long | 交易公司ID(必填) |
| trading_company_code | String | 交易公司编码 |
| trading_company_name | String | 交易公司名称 |
| billing_unit_id | Long | 开票单位ID(必填) |
| billing_unit_code | String | 开票单位编码 |
| billing_unit_name | String | 开票单位名称 |
| is_close | Long | 是否关闭(1未关闭/2已关闭) |
| closing_reasons | String | 关闭原因 |
| decoration_style | Long | 装修风格 |
| this_decoration_style | Long | 本次装修风格 |
| terminal_area | BigDecimal | 门店面积 |
| this_terminal_area | BigDecimal | 实际装修面积 |
| area_standard_rate | BigDecimal | 面积分配标准比例 |
| plan_open_date | LocalDate | 计划开业日期 |
| fixup_grade | Long | 装修等级 |
| decoration_days | Long | 装修周期 |
| decoration_type | Long | 装修性质 |
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
| decoration_interval_date | LocalDate | 装修间隔期至 |
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
| frontdoor_apply_standard | BigDecimal | 门头申请标准 |
| in_apply_standard_amt | BigDecimal | 额度内申请标准金额 |
| out_apply_standard_amt | BigDecimal | 额度外申请标准金额 |
| terminal_apply_standard_amt | BigDecimal | 终端申请标准金额 |
| frontdoor_apply_standard_amt | BigDecimal | 门头申请标准金额 |
| in_diff_standard_amt | BigDecimal | 额度内差异标准金额 |
| out_diff_standard_amt | BigDecimal | 额度外差异标准金额 |
| terminal_diff_standard_amt | BigDecimal | 终端差异标准金额 |
| frontdoor_diff_standard_amt | BigDecimal | 门头差异标准金额 |
| note | String | 备注 |
| stat | Long | 单据状态 |
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
| is_modify | Long | 签呈标记(0未发起/1已发起/3作废) |
| is_second_change | Long | 二次变更标记(0否/2是) |
| userid | String | 设计师ID |
| soft_userid | String | 软装设计师ID |
| soft_designer | String | 软装设计师 |
| soft_designer_mob | String | 软装设计师手机号 |
| bud_year | Long | 预算年度 |
| deduct_proportion | BigDecimal | 扣减比例 |
| pre_decoration_finished_time | LocalDate | 上次装修完成时间 |
| thistime_terminal_area | BigDecimal | 本次装修面积(变更用) |
| thistime_frontdoor_area | BigDecimal | 本次门头面积(变更用) |
| soft_purchase_standard | BigDecimal | 软装采购标准 |
| soft_purchase_amt | BigDecimal | 软装采购金额 |
| lantern_standard | BigDecimal | 灯具标准 |
| lantern_amt | BigDecimal | 灯具金额 |
| subsidy_mode | Long | 补贴方式 |
| decorate_project | Long | 装修项目 |
| signature_state | Long | 电子签章状态 |
| signature_url | String | 电子签章地址 |
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

| 问题 | 原因/解决方案 |
|------|------|
| 新增时"装修周期只能小于等于X" | 公司参数Decoration_Days限制了最大装修周期 |
| 重新生成报"已有其它装修申请单" | 同一门店已有非作废状态的申请单 |
| 重新生成报"超期天数大于X或补贴金额为0" | 超期天数超过Over_Date_Limit或扣减比例≥1 |
| 删除报"不能删除非制单状态的单据" | 仅NEW状态可删除 |

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
