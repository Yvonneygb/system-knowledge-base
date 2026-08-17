<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-12" title="设计师饱和度" desc="设计师饱和度统计查询" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">设计师饱和度 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★查询设计师饱和度★ → 结束（饱和度由点将执行完成自动更新，按编码/用户编码查询）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 660" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="270" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="345" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">设计师点将执行</text>
      <rect x="440" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="515" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">设计师主档</text>
      <rect x="610" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="685" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">值集(级别/状态)</text>
      <rect x="780" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="855" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">排期数据</text>
      <line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="560" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="600" y1="194" x2="600" y2="290" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="440" y="290" width="320" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="600" y="315" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★查询设计师饱和度★</text>
      <text x="600" y="335" text-anchor="middle" fill="#DCFCE7" font-size="10">按编码/用户编码筛选·统计已排期/可排期</text>
      <line x1="600" y1="344" x2="600" y2="460" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="555" y="460" width="90" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="485" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="600" y1="500" x2="600" y2="540" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="540" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="562" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="280" y="586" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="380" y="609" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">点将申请排期校验</text>
      <rect x="500" y="586" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="609" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">饱和度图表展示</text>
      <rect x="720" y="586" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="820" y="609" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">服务冲突预警</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
  </div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 列表页">

- **前端路由**：`/general/designGeneral/designSaturation/list`
- **API**：`mlt/maLecturerSaturation/page`
- **Entity**：`MaLecturerSaturation`
- **查询条件**：设计师姓名、设计师级别、饱和度范围、统计周期
- **列表字段**：设计师编码、设计师姓名、设计师级别、可排期天数、已排期天数、饱和度、统计周期
- **值集加载**：页面初始化时加载4个值集用于下拉选项和状态展示

</KbCard>

<KbCard title="3.2 按设计师编码查询">

- **API**：`mlt/maLecturerSaturation/getSaturationByCode`
- **参数**：lecturerCode（设计师编码）
- **返回**：该设计师的饱和度详情，包含各时间段的排期明细

</KbCard>

<KbCard title="3.3 按用户编码查询">

- **API**：`mlt/maLecturerSaturation/getSaturationByUser`
- **参数**：userCode（用户编码）
- **返回**：该用户关联设计师的饱和度详情

</KbCard>

<KbCard title="3.4 值集说明">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>值集编码</th>
<th>值集名称</th>
<th>用途</th>
</tr>
<tr>
<td>MBO.DESIGN_APPLY_TYPE</td>
<td>设定点将类型</td>
<td>区分不同类型的点将申请</td>
</tr>
<tr>
<td>MBO.DESIGN_STATE</td>
<td>设计状态</td>
<td>标识设计点将的当前状态</td>
</tr>
<tr>
<td>MBO.DESIGN_LECTURER_LEVEL</td>
<td>设计师级别</td>
<td>标识设计师的级别分类</td>
</tr>
<tr>
<td>MBO.APPLY_APPROVAL_STATE</td>
<td>审批状态</td>
<td>标识申请的审批状态</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="ma_lecturer_saturation（讲师饱和度统计表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| saturation_id | NUMBER | 饱和度ID（主键） |
| lecturer_code | VARCHAR2 | 设计师编码 |
| lecturer_name | VARCHAR2 | 设计师姓名 |
| lecturer_level | VARCHAR2 | 设计师级别 |
| user_code | VARCHAR2 | 用户编码 |
| available_days | NUMBER | 可排期天数 |
| scheduled_days | NUMBER | 已排期天数 |
| saturation_rate | NUMBER | 饱和度（百分比） |
| stat_period | VARCHAR2 | 统计周期 |
| apply_type | VARCHAR2 | 点将类型 |
| design_state | VARCHAR2 | 设计状态 |
| approval_state | VARCHAR2 | 审批状态 |
| created_by | VARCHAR2 | 创建人 |
| creation_date | DATE | 创建时间 |
| last_updated_by | VARCHAR2 | 最后更新人 |
| last_update_date | DATE | 最后更新时间 |

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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|----------|--------|
| 2026-08-03 | v1.0 | 初始创建 | AI生成 |
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
