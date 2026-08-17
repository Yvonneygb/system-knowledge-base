<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="9" title="门头展板报销申请单" desc="门头展板报销申请单的创建与管理，支持额度内/外报销申请的提交与审批" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | CustDhReimburseHeadController |
| API路径 | /v1/{organizationId}/cust-dh-reimburse-heads |
| 8Entity | CustDhReimburseHead |
| 数据库表 | CUST_DH_REIMBURSE_HEAD |
| 工作流编码 | SUB_STORE_HEAD_PROCESS_DOOR |
| 前端页面 | custDhReimburseHead |
| ServiceImpl | CustDhReimburseHeadServiceImpl |
| 所属模块 | storeManage |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">门头展板报销申请单 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★新建门头报销申请单★ → ⚖审批通过？ → 可发起门头兑现 → 结束（拒绝则修改后重提）</p>
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
<text x="234" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">经销商主档</text>
<rect x="317" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="392" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">补贴政策</text>
<rect x="475" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="550" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">门店主档</text>
<rect x="633" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="708" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
<rect x="791" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="866" y="79" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则服务</text>
<line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="148" y="210" width="174" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="235" y="232" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建门头报销申请单★</text>
<text x="235" y="252" text-anchor="middle" fill="#DCFCE7" font-size="10">选经销商/年度/政策·录门店金额·保存</text>
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
<text x="235" y="447" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">可发起门头兑现</text>
<line x1="235" y1="462" x2="235" y2="478" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="180" y="478" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="235" y="503" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="235" y1="518" x2="235" y2="540" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="25" y="540" width="1050" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="550" y="562" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="238" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="313" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">门头兑现</text>
<rect x="396" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="471" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">报销分析统计</text>
<rect x="554" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="629" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">验收人员保证书</text>
<rect x="712" y="576" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="787" y="601" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">额度已申请统计</text>
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
<KbCard num="1" title="2.1 保存逻辑（doSave）">

**具体逻辑**：

- 1、新增(doInsert)：生成报销编码，插入主表和行表
- 2、更新(doUpdate)：更新主表和行表
</KbCard>

<KbCard num="2" title="2.2 报销分析（1bxFx）">

**具体逻辑**：

- 1、查询已启动、已审批、已驳回状态的@状态的相关8的报销单据
- 2、按装修项目(de9ecorateProject)分类汇总申请金额
- 3、特殊处理灯具+灯具(五金专区)、软装+软装(整体)等合并统计
</KbCard>

<KbCard num="3" title="2.3 行表金额汇总（computeLineSum）">

**具体逻辑**：

- 1、汇总各门店行表的额度内/额度外申请金额、业务批准金额、财务批准金额
</KbCard>

<KbCard num="4" title="2.4 审批人获取">

**具体逻辑**：

- 1、**部门负责人**：getUnitManageLoginNameById?ById - 根据报销单ID获取部门负责人
- 2、**省级负责人**：getProvincialManagerLoginNameById - 根据报销单ID获取省级负责人
- 3、返回格式为ApproveUsersVO列表（工作流固定格式）
</KbCard>

<KbCard num="5" title="2.5 门头兑现查询">

**具体逻辑**：

- 1、getCashoutSearch：查询门头兑现关联数据
- 2、getCashoutSearchLov：门头兑现LOV查询
- 3、生成验收人员保证书HTML内容
</KbCard>

<KbCard num="6" title="2.6 删除逻辑（doDelete）">

**具体逻辑**：

- 1、删除主表数据
</KbCard>

<KbCard num="7" title="2.7 打印数据（doSelectForPrint）">

**具体逻辑**：

- 1、查询详情并转换词汇值含义
- 2、根据事业部配置earlyEncashmentFlag判断是否允许提前兑现
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
| GET | /get-reimburse-head-list | 门头报销申请列表(分页) |
| GET | /get-reimburse-head-detail | 门头报销申请详情 |
| GET | /do-select | 门头报销申请详情(工作流) |
| GET | /do-select-print | 打印详情 |
| GET | /get-cashout-search | 门头兑现查询 |
| GET | /get-cashout-lov | 门头兑现LOV |
| POST | /insert-reimburse | 门头报销保存(旧) |
| DELETE | /do-delete | 删除 |
| POST | /do-save | 门头报销保存(新) |
| POST | /get-unit-manage-users | 获取部门负责人 |
| POST | /get-provincial-manage-users | 获取省级负责人 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 更新审核状态 |

</KbCard>

<KbCard num="1" title="表：CUST_DH_REIMBURSE_HEAD">

| 字段名 | 类型 | 说明 |
|------|------|------|
| id | Long | 主键 |
| created | Date | 创建时间 |
| last_upd | Date | 最后更新时间 |
| last_upd_by | String | 最后更新人 |
| entid | Long | 事业部ID |
| division_id | Long | 事业部词汇值 |
| audit_stat | String | 审核状态 |
| )stat | Long | 状态 |
| wfid | Long | 流程ID |
| wfflag | Long | 流程状态 |
| reimburse_code | String | 报销编码 |
| customer_legal_id | Long | 交易公司法人中间表ID |
| policy_standard_id | Long | 补贴政策ID |
| year | Long | 年度 |
| remark | String | 备注 |
| pay_type | Long | 支付方式 |
| status | String | 生效状态 |
| customer_id | Long | 经销商ID |
| bx_type | Long | 报销类型 |
| cust_limit_amt | BigDecimal | 经销商限额 |
| out_excess_amt | BigDecimal | 额度外超限金额 |
| out_bx_amt | BigDecimal | 额度外实际报销金额 |
| in_bx_amt | BigDecimal | 额度内实际报销金额 |
| out_actual_apply_amt | BigDecimal | 额度外实际申请总额 |
| in_actual_apply_amt | BigDecimal | 额度内实际申请金额 |
| out_bx_used_amt | BigDecimal | 额度外已报销金额 |
| trading_company_code | String | 交易公司编码 |
| in_early_cashout_ratio | BigDecimal | 额度内提前兑现比例 |
| signature_state | Long | 电子签章状态 |
| signature_url | String | 电子签章地址 |
| re_sign_flag | String | 需要重签标识(y/n) |
| hz_instance_id | Long | H0流程实例ID0ID |
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
| 审批人获取为空 | 检查部门/省级负责人配置 |
| 报销分析数据不完整 | 确认关联的报销单据状态为已启动/已审批/已驳回 |

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
| 2025-09-29 | jiaqiang.fu01 | 初始创建 |
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
