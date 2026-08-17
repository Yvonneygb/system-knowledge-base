<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="门店验收与报销单" desc="门店装修验收与报销单管理，涵盖验收确认、报销金额计算与审批流程" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeCheckBxHeaderController |
| API路径 | /v1/{organizationId}/fin-fee-check-bx-headers |
| Entity | FinFeeCheckBxHeader |
| 数据库表 | FIN_FEE_CHECK_BX_HEADER |
| 工作流编码 | SUB_STORE_MDYSYBXD |
| 前端页面 | storeAcceptanceReimbursement / storeAcceptanceReimbursementInfo |
| ServiceImpl | FinFeeCheckBxHeaderServiceImpl |
| 所属模块 | storeCheck |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">门店验收与报销单 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★新建验收报销单★ → ⚖审批通过？ → 可发起装修兑现 → 结束（拒绝则修改后重提）</p>
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
<text x="234" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">已审批装修申请单</text>
<rect x="317" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="392" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">装修标准</text>
<rect x="475" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="550" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">CRM软装灯具</text>
<rect x="633" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="708" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">政策性补贴</text>
<rect x="791" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="866" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
<line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="148" y="210" width="174" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="235" y="232" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建验收报销单★</text>
<text x="235" y="252" text-anchor="middle" fill="#DCFCE7" font-size="10">关联申请·填验收/报销金额·算可报销</text>
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
<text x="235" y="391" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">审批通过生效</text>
<line x1="235" y1="406" x2="235" y2="422" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="150" y="422" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="235" y="447" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">可发起装修兑现</text>
<line x1="235" y1="462" x2="235" y2="478" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="180" y="478" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="503" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="235" y1="518" x2="235" y2="540" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="25" y="540" width="1050" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="550" y="562" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="238" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="313" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">门店装修额度内兑现</text>
<rect x="396" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="471" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">门店装修额度外兑现</text>
<rect x="554" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="629" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">验收评分率</text>
<rect x="712" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="787" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">可报销金额</text>
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
<KbCard num="1" title="2.1 验收报销金额计算">

**具体逻辑**：

- 1、**额度内(in)**：验收面积 × 验收评分率 × 申请标准 → 可报销含税金额/不含税金额
- 2、**额度外(out)**：同额度内计算逻辑，额外计算兑现比例和剩余未兑现金额
- 3、**门头(fd)**：门头验收面积 × 评分率 × 标准 → 可报销金额
- 4、**质量扣减**：checkQualityDeductionPoint影响最终可报销金额
- 5、**发票税率扣减**：invoiceTaxRateDeduction影响兑现率
</KbCard>

<KbCard num="2" title="2.2 CRM软装灯具交互">

**具体逻辑**：

- 1、**查询软装订单**：通过CrmSdkService调用CRM接口查询软装灯具订单
- 2、**绑定订单**：确认绑定CRM软装灯具订单到验收报销单
- 3、**查询已绑定**：查询当前验收单已绑定的软装灯具订单
- 4、**解绑订单**：取消已绑定的软装灯具订单
</KbCard>

<KbCard num="3" title="2.3 装修标准查询">

**具体逻辑**：

- 1、根据门店类型(terminalType)和装修等级(fixupGrade)查询对应的装修标准行
- 2、支持两种查询方式：doSearchDecorate和searchDecorate
</KbCard>

<KbCard num="4" title="2.4 打印数据">

**具体逻辑**：

- 1、支持验收报销单打印，包含补贴明细汇总、复核结果汇总、预算明细汇总
</KbCard>

<KbCard num="5" title="2.5 政策性补贴">

**具体逻辑**：

- 1、通过getLovSearch接口查询政策性补贴LOV列表
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
| GET | /search | 验收报销列表(分页) |
| POST | /save | 新增验收报销 |
| GET | /detail/{checkBxId} | 验收报销明细 |
| GET | /detail/print | 打印数据 |
| GET | /do-select | 额度内兑现新增-详情 |
| POST | /cancel | 作废 |
| DELETE | /do-delete | 删除 |
| POST | /update | 更新 |
| GET | /select-crm-soft-order | 查询CRM软装灯具 |
| POST | /confirm-crm-soft-order | 绑定CRM软装灯具 |
| GET | /query-bind-crm-soft-order | 查询已绑定软装灯具 |
| POST | /unbind-soft-order | 解绑软装灯具 |
| POST | /doSearchDecorate | 查询装修标准(旧) |
| POST | /do-search-decorate | 查询装修标准(新) |
| POST | /get-inv-order-amt | 查询软装灯具采购清单及计算金额 |
| POST | /get-acceptance-info | 获取质量信息设置 |
| GET | /get-lov-search | 政策性补贴LOV查询 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 更新审核人/审核时间，处理兑现相关逻辑 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_CHECK_BX_HEADER">

| 字段名 | 类型 | 说明 |
|------|------|------|
| check_bx_id | Long | 主键ID(验收报销id) |
| check_bx_code | String | 验收报销单号 |
| terminal_apply_no | String | 装修申请A申请单号 |
| terminal_apply_id | Long | 装修申请ID |
| terminal_id | Long | 门店ID |
| terminal_code | String | 门店编码 |
| terminal_name | String | 门店名称 |
| cust_id | Long | 经销商ID |
| cust_code | String | 经销商编码 |
| cust_name | String | 经销商名称 |
| short_name | String | 经销商简称 |
| customer_class | Long | 经营属性 |
| trading_company_id | Long | 交易公司ID |
| trading_company_code | String | 交易公司编码 |
| trading_company_name | String | 交易公司名称 |
| billing_unit_id | Long | 开票单位ID |
| billing_unit_code | String | 开票单位编码 |
| billing_unit_name | String | 开票单位名称 |
| salezone_org_name | String | 销售区域 |
| salezone_org_id | Long | 销售区域ID |
| operat_center_org_name | String | 运营中心 |
| operat_center_org_id | Long | 运营中心ID |
| province_areaid | Long | 省ID |
| city_areaid | Long | 市ID |
| county_areaid | Long | 县/区ID |
| areaname | String | 拼接省市区 |
| addr | String | 详细地址 |
| terminal_type | Long | 门店类型 |
| store_location_type | Long | 位置类型 |
| decoration_style | Long | 装修风格 |
| this_decoration_style | Long | 本次装修风格 |
| terminal_area | BigDecimal | 门店面积 |
| this_terminal_area | BigDecimal | 本次装修面积 |
| decoration_days | Long | 装修周期 |
| decoration_type | Long | 装修性质 |
| last_decoration_date | LocalDate | 旧店上次装修时间 |
| fixup_grade | Long | 装修等级 |
| frontdoor_fixup_grade | Long | 门头装修等级 |
| frontdoor_area | BigDecimal | 门头面积 |
| in_check_area | BigDecimal | 额度内验收面积 |
| check_score_rate | BigDecimal | 验收评分率 |
| in_apply_standard | BigDecimal | 额度内申请标准 |
| in_apply_standard_amt | BigDecimal | 额度内申请标准金额 |
| in_check_standard | BigDecimal | 额度内验收标准 |
| in_check_standard_amt | BigDecimal | 额度内验收标准金额 |
| out_check_area | BigDecimal | 额度外验收面积 |
| out_apply_standard | BigDecimal | 额度外申请标准 |
| out_apply_standard_amt | BigDecimal | 额度外申请标准金额 |
| out_check_standard | BigDecimal | 额度外验收标准 |
| out_check_standard_amt | BigDecimal | 额度外验收标准金额 |
| fd_check_area | BigDecimal | 门头验收面积 |
| fd_check_score_rate | BigDecimal | 门头验收评分率 |
| fd_apply_standard | BigDecimal | 门头申请标准 |
| fd_apply_standard_amt | BigDecimal | 门头申请标准金额 |
| check_quality_ded_point | BigDecimal | 质量扣减点 |
| invoice_tax_rate_deduction | BigDecimal | 发票税率扣减 |
| cashout_rate | Long | 兑现率 |
| in_review_standard | BigDecimal | 额度内复核标准 |
| in_reduce_amt | BigDecimal | 额度内核销金额 |
| in_can_tax_bx_amt | BigDecimal | 额度内可报销含税金额 |
| in_can_not_tax_bx_amt | BigDecimal | 额度内可报销不含税金额 |
| out_review_standard | BigDecimal | 额度外复核标准 |
| out_reduce_amt | BigDecimal | 额度外核销金额 |
| out_can_tax_bx_amt | BigDecimal | 额度外可报销含税金额 |
| out_can_not_tax_bx_amt | BigDecimal | 额度外可报销不含税金额 |
| fd_review_standard | BigDecimal | 门头复核标准 |
| fd_reduce_amt | BigDecimal | 门头核销金额 |
| fd_can_tax_bx_amt | BigDecimal | 门头可报销含税金额 |
| fd_can_not_tax_bx_amt | BigDecimal | 门头可报销不含税金额 |
| out_this_can_bx_amt | BigDecimal | 额度外本次可报销金额 |
| out_this_cashout_proportion | BigDecimal | 额度外本次兑现比例 |
| out_this_sur_cashout_amt | BigDecimal | 额度外本次剩余未兑现金额 |
| out_fact_invoice_amt | BigDecimal | 额度外实际兑现含税金额 |
| out_fact_invoice_notax_amt | BigDecimal | 额度外实际兑现不含税金额 |
| invoice_tax_rate | Long | 发票税点 |
| invoice_type | Long | 发票类型 |
| pay_type | Long | 支付方式 |
| vendor_org_id | Long | 供应商ID |
| vendor_code | String | 供应商编码 |
| vendor_name | String | 供应商名称 |
| over_date | Long | 超期天数 |
| offline_check_date | LocalDate | 线下验收日期 |
| in_validity_date | LocalDate | 额度内有效期 |
| out_cashout_end_time | LocalDate | 额度外兑现失效日期 |
| is_over_standard | Long | 是否超标准 |
| stat | Long | 单据状态 |
| wfflag | Long | 流程状态 |
| wfid | Long | 流程ID |
| audit_stat | String | 审核状态 |
| apply_cause | String | 作废原因 |
| note | String | 备注 |
| creator | String | 申请人 |
| create_time | Date | 申请时间 |
| checker | String | 审核人 |
| check_time | Date | 审核时间 |
| organization_id | Long | 组织ID |
| hz_instance_id | Long | 流程实例ID |
| hz_approve_status | String | 流程实例状态 |
| decorate_standard_id | Long | 装修标准ID |
| fd_decorate_standard_id | Long | 门头装修标准ID |
| designer | String | 委派设计师 |
| bud_year | Long | 预算年度 |
| receipt_status | String | 转货款状态 |
| ticket_status | String | 税务接口状态 |
| ticket_message | String | 税务接口信息 |
| signature_state | Long | 电子签章状态 |
| signature_url | String | 电子签章地址 |
| is_resign | Long | 需要重签 |
| tripar_agree | Long | 三方协议 |
| subsidy_mode | Long | 补贴方式 |
| decorate_project | Long | 装修项目 |
| review_note | String | 复核备注 |
| early_encashment_ratio | BigDecimal | 提前兑现比例 |

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
| CRM软装灯具查询无数据 | 检查CRM接口连通性和订单号 |
| 验收报销金额计算异常 | 检查验收面积、评分率、装修标准是否完整填写 |
| 作废后额度未释放 | 确认工作流状态已更新为INTERRUPT |

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
| 2025-09-03 | hfy | 初始创建 |
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
