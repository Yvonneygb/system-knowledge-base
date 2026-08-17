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
<div class="bf-truth-flow">
  <h4 class="bf-main-title">门头展板兑现 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★新建门头兑现★ → ⚖审批通过？ → 兑现完成·推送资金池(EBS) → 结束（拒绝则修改后重提）</p>
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
<text x="234" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">门头报销单</text>
<rect x="317" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="392" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">经销商/交易公司</text>
<rect x="475" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="550" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则服务</text>
<rect x="633" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="708" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
<rect x="791" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="866" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">资金池账户</text>
<line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="148" y="210" width="174" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="235" y="232" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建门头兑现★</text>
<text x="235" y="252" text-anchor="middle" fill="#DCFCE7" font-size="10">选报销单·填额度内/外比例金额·保存</text>
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
<text x="235" y="391" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">兑现完成</text>
<line x1="235" y1="406" x2="235" y2="422" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="150" y="422" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="235" y="447" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">推送资金池(EBS)</text>
<line x1="235" y1="462" x2="235" y2="478" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="180" y="478" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="503" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="235" y1="518" x2="235" y2="540" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="25" y="540" width="1050" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="550" y="562" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="238" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="313" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">资金池(EBS)同步</text>
<rect x="396" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="471" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">报销单兑现状态</text>
<rect x="554" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="629" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">验收人员保证书</text>
<rect x="712" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="787" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">额度已兑现统计</text>
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
| DELETE | /do-delete | 删除 |
| POST | /do-save | 保存 |
| GET | /do-select | 详情 |
| GET | /do-select-print | 打印详情 |
| GET | /sum-cash-out | 计算兑现数值 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 更新审核状态 |

</KbCard>

<KbCard num="1" title="表：CUST_DH_CASHOUT_HEAD">

| 字段名 | 类型 | 说明 |
|------|------|------|
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
| out_biz_amt | 8BigDecimal | 额度外业务批准金额 |
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

| 问题 | 原因/解决方案 |
|------|------|
| 兑现比例超限 | 检查已兑现比例，确保本次兑现后总额不超过100% |
| 删除报状态不允许 | 仅NEW和REBUT状态可删除 |
| 保证书内容为空 | 确认关联的门头报销单行表数据完整 |

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
