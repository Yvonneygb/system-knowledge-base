<BreadcrumbTabs />
<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
    <h2>产品图册维护什么</h2>
    <p>将产品图片按主题分组管理，丰富前端展示内容</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="white" stroke-width="1.5"/><circle cx="6" cy="6.5" r="1" stroke="white" stroke-width="1.5"/><path d="M3 12l4-3 3 2 3-2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">图册分组</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">一个产品可有多个图册</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>图册名称</strong> — 如"外观图""安装图"等主题</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>封面图</strong> — 默认取首图，可手动指定</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>排序号</strong> — 控制图册展示先后顺序</div></div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v3M8 11v3M2 8h3M11 8h3" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="8" r="1.5" stroke="white" stroke-width="1.5"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">图片关联</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">图册与图片为多对多关系</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>添加图片</strong> — 从已上传图片中选入图册</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>移除图片</strong> — 仅取消关联，不删原图</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>图片排序</strong> — 控制图册内展示顺序</div></div>
      </div>
    </div>
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 影响</span>
    <h2>图册数据被谁引用</h2>
    <p>图册作为产品素材，直接服务于详情页与前端展示</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#15803D);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="white" stroke-width="1.5"/><circle cx="6" cy="6.5" r="1" stroke="white" stroke-width="1.5"/><path d="M3 12l4-3 3 2 3-2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">详情页</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">嵌入CRM产品详情页图册Tab展示。</p></div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8h12" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2v12" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">前端展示</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">在商城/门户等前端按图册呈现产品。</p></div>
      </div>
    </div>
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#15803D);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2L3 4V8C3 11 8 14 8 14C8 14 13 11 13 8V4L8 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">产品推广</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">作为推广素材提升产品曝光吸引力。</p></div>
      </div>
    </div>
  </div>
</div>

</div>
</div>
</div>
<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
<h4 class="bf-main-title">产品图册 — 全链路流程图</h4>
<p class="bf-main-sub">开始 → ★维护产品图册★(新增/编辑/删除·添加移除图片) → 保存生效 → 结束（嵌入CRM产品详情页，无审批）</p>
<div class="bf-fc-svg-wrap">
<svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
<marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
<marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
<marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
</defs>
<rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
<rect x="386" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="435" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">产品主档</text>
<rect x="496" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="545" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">产品图片</text>
<rect x="606" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="655" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">组织/权限</text>
<rect x="716" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="765" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">CRM详情页</text>
<line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="545" y="150" width="110" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="600" y1="194" x2="600" y2="220" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="500" y="220" width="200" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="600" y="244" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★维护产品图册★</text>
<text x="600" y="263" text-anchor="middle" fill="#DCFCE7" font-size="10">新增/编辑/删除图册·添加移除图片</text>
<line x1="600" y1="274" x2="600" y2="300" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="545" y="300" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="325" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="600" y1="340" x2="600" y2="380" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="50" y="380" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="402" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="355" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="430" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">产品详情页</text>
<rect x="525" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="600" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">前端/CRM展示</text>
<rect x="695" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="770" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">产品推广</text>
</svg>
</div>
<div class="bf-fc-legend">
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束</span>
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
</div>
</div>
</div>
</div>
<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 嵌入位置">

本功能嵌入在CRM产品详情页中使用，组件标识为`detailImgListConfig`，无独立路由页面。

</KbCard>

<KbCard num="2" title="2.2 API接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums`</td>
<td>GET</td>
<td>查询产品图册列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}`</td>
<td>GET</td>
<td>查询图册详情（含图片）</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums`</td>
<td>POST</td>
<td>新增图册</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}`</td>
<td>PUT</td>
<td>更新图册</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}`</td>
<td>DELETE</td>
<td>删除图册</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}/images`</td>
<td>POST</td>
<td>向图册添加图片</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}/images/{imageId}`</td>
<td>DELETE</td>
<td>从图册移除图片</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 无工作流">

本功能无审批工作流，数据直接保存生效。

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
<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 图册概念">

- **图册（ImgAlbum）**：多张产品图片的集合，按主题或用途分组
- 一个产品可以有多个图册，如"外观展示图"、"安装示意图"、"细节特写图"等
- 图册是图片的分组管理方式，同一张图片可以属于多个图册

</KbCard>

<KbCard title="3.2 图册数据结构">

- **图册名称（album_name）**：图册的显示名称，如"外观图"、"安装图"
- **图册描述（album_description）**：图册的详细说明
- **图册封面（cover_image_id）**：图册的封面图片，默认取图册中第一张图片
- **图片数量（image_count）**：图册中包含的图片数量
- **排序号（sequence_number）**：图册的显示排序

</KbCard>

<KbCard title="3.3 图册与图片的关系">

- 图册和图片是多对多关系，通过关联表维护
- 一张图片可以属于多个图册
- 图册中的图片支持排序，控制展示顺序
- 图册中的图片支持设置封面图

</KbCard>

<KbCard title="3.4 图册管理操作">

- **新增图册**：填写图册名称和描述，创建空图册
- **向图册添加图片**：从已上传的产品图片中选择添加到图册
- **从图册移除图片**：移除图册与图片的关联，不删除图片本身
- **设置封面图**：指定图册中的一张图片作为封面
- **图册排序**：调整图册的显示顺序
- **图册内图片排序**：调整图册内图片的显示顺序

</KbCard>

<KbCard title="3.5 前端组件detailImgListConfig">

- 组件标识：`detailImgListConfig`
- 嵌入位置：产品详情页的图册Tab页签
- 展示方式：图册以卡片形式展示，点击展开查看图册内图片
- 图片展示：缩略图网格，支持点击查看大图

</KbCard>

<KbCard num="1" title="4.1 产品图册表">

> 表名：PRODUCT_IMG_ALBUM（产品图册表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| product_id | NUMBER | 产品ID | FK→PRODUCT |
| album_name | VARCHAR2 | 图册名称 | NOT NULL |
| album_description | VARCHAR2 | 图册描述 | |
| cover_image_id | NUMBER | 封面图片ID | FK→PRODUCT_IMAGE |
| image_count | NUMBER | 图片数量 | |
| sequence_number | NUMBER | 排序号 | |
| organization_id | NUMBER | 组织ID | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | NUMBER | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 版本号 | 乐观锁 |

</KbCard>

<KbCard num="2" title="4.2 产品图册图片关联表">

> 表名：PRODUCT_IMG_ALBUM_REL（产品图册图片关联表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| album_id | NUMBER | 图册ID | FK→PRODUCT_IMG_ALBUM |
| image_id | NUMBER | 图片ID | FK→PRODUCT_IMAGE |
| sequence_number | NUMBER | 图册内排序号 | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| object_version_number | NUMBER | 版本号 | 乐观锁 |

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
      <span style="font-size:15px;">图册和图片是什么关系？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>多对多关系，一张图片可以属于多个图册
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">从图册移除图片会删除图片吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不会，只移除关联关系，图片本身仍保留
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">图册封面图如何设置？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>默认取图册中第一张图片，可手动指定图册中任意图片为封面
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">图册名称有重复限制吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>同一产品下图册名称建议不重复，具体以业务规则为准
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">detailImgListConfig组件在哪里使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>嵌入在产品详情页的图册Tab页签中
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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|----------|--------|
| 2026-08-03 | V1.0 | 初始创建 | AI |
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
