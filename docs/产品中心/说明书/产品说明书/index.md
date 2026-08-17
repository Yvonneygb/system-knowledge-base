<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品说明书" desc="" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">产品说明书 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★新建产品说明书★ → ⚖审批通过？ → (通过)说明书生效 → 结束（拒绝则修改重提；关联型号/分类、附件入ES_DOCS）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="280" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="340" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">产品型号主数据</text>
      <rect x="410" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="470" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">产品分类主数据</text>
      <rect x="540" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">文件存储ES_DOCS</text>
      <rect x="670" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="730" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
      <rect x="800" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="860" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">组织主数据</text>
      <line x1="540" y1="115" x2="540" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="500" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="540" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="540" y1="194" x2="540" y2="228" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="380" y="228" width="320" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="540" y="252" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建产品说明书★</text>
      <text x="540" y="270" text-anchor="middle" fill="#DCFCE7" font-size="10">填信息·关联型号/分类·传附件·保存提交</text>
      <line x1="540" y1="282" x2="540" y2="316" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="540,316 610,350 540,384 470,350" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="540" y="354" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
      <line x1="610" y1="350" x2="770" y2="350" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="725" y="335" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="770" y="354" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>
      <line x1="770" y1="350" x2="770" y2="260" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="770" y1="260" x2="610" y2="260" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
      <line x1="540" y1="384" x2="540" y2="410" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="425" y="410" width="230" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="540" y="435" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">说明书生效</text>
      <line x1="540" y1="450" x2="540" y2="486" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="485" y="486" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="540" y="511" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="540" y1="526" x2="540" y2="560" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="560" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="582" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="270" y="598" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="345" y="621" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">产品前端展示</text>
      <rect x="440" y="598" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="515" y="621" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">型号关联表</text>
      <rect x="610" y="598" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="685" y="621" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">分类关联表</text>
      <rect x="780" y="598" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="855" y="621" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">文件库ES_DOCS</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑">
**具体逻辑**：

- 1、**说明书与型号关联**：一份说明书可关联多个产品型号，通过ES_SPEC_MODEL表维护多对多关系
- 2、**说明书与分类关联**：一份说明书可关联多个产品分类，通过ES_SPECCLAS_REF表维护多对多关系
- 3、**附件管理**：说明书文件存储在ES_DOCS表，支持多文件上传
- 4、**审批流程**：提交后触发SUB_PRODUCT_SPECIFICATION_MAIN工作流，审批通过后方可生效
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 后端接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs</td>
<td>POST</td>
<td>新建说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs</td>
<td>GET</td>
<td>查询说明书列表</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>GET</td>
<td>查询说明书详情</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>PUT</td>
<td>更新说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>DELETE</td>
<td>删除说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}/submit</td>
<td>POST</td>
<td>提交审批</td>
</tr>
</tbody></table></div>

- Controller: `EsSpecController`

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-ae`
- 页面路径：`arrow-ae/productInfo/esSpecProp`
- 路由：
  - `/es-spec-prop/list` — 说明书列表页
  - `/es-spec-prop/detail/:specid` — 说明书详情页

</KbCard>

<KbCard title="3.3 工作流">

- 工作流编码：`SUB_PRODUCT_SPECIFICATION_MAIN`
- 工作流名称：产品说明书
- 触发时机：用户点击"提交审批"按钮

</KbCard>

<KbCard title="3.4 核心业务规则">

1. 新建时必填说明书名称、说明书编码
2. 关联型号和分类支持多选
3. 草稿状态可编辑，审批中不可修改
4. 审批拒绝后可重新编辑提交

</KbCard>

<KbCard num="1" title="4.1 ES_SPEC（说明书表）">

| 字段 | 说明 |
|------|------|
| spec_id | 说明书ID（主键） |
| spec_name | 说明书名称 |
| spec_code | 说明书编码 |
| organization_id | 组织ID |
| status | 状态（草稿/审批中/生效/失效） |
| created_by | 创建人 |
| creation_date | 创建时间 |
| last_updated_by | 最后更新人 |
| last_update_date | 最后更新时间 |

</KbCard>

<KbCard num="2" title="4.2 ES_SPEC_MODEL（说明书关联型号表）">

| 字段 | 说明 |
|------|------|
| spec_model_id | 关联ID（主键） |
| spec_id | 说明书ID |
| model_id | 产品型号ID |
| model_code | 产品型号编码 |

</KbCard>

<KbCard num="3" title="4.3 ES_SPECCLAS_REF（说明书与分类关联表）">

| 字段 | 说明 |
|------|------|
| specclas_ref_id | 关联ID（主键） |
| spec_id | 说明书ID |
| classification_id | 产品分类ID |
| classification_code | 产品分类编码 |

</KbCard>

<KbCard num="4" title="4.4 ES_DOCS（说明书文件表）">

| 字段 | 说明 |
|------|------|
| doc_id | 文件ID（主键） |
| spec_id | 说明书ID |
| file_name | 文件名 |
| file_path | 文件存储路径 |
| file_type | 文件类型 |
| file_size | 文件大小 |
| upload_date | 上传时间 |
| upload_by | 上传人 |

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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">说明书提交审批后能否修改？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>审批中和审批通过状态不可修改，审批拒绝后可重新编辑提交。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">一份说明书可以关联多少个型号？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>无数量限制，支持多对多关联。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">附件文件格式有限制吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>通常支持PDF、Word、图片等常见格式，具体以后端校验为准。
    </div>
  </div>
</div>
</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 内容 |
|------|------|
| 2026-08-03 | 初始创建 |
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
