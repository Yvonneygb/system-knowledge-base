<BreadcrumbTabs />
<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
    <h2>产品分类维护什么</h2>
    <p>构建多级产品分类体系，作为产品归并与检索的基础数据</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="5" height="5" rx="1" stroke="white" stroke-width="1.5"/><path d="M3 6.5L4.5 8L7 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/><rect x="2" y="10" width="5" height="3" rx="1" stroke="white" stroke-width="1.5"/><path d="M9 10H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M9 13H13" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">树形结构</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">支持多级层级与同编码唯一</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>分类编码</strong> — 组织内唯一，作为关联主键</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>父级关系</strong> — 子分类挂靠上级，形成树状层级</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>排序号</strong> — 控制同级分类的展示顺序</div></div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5" stroke="white" stroke-width="1.5"/><path d="M8 5v3l2 1.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">状态与描述</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">控制可用性与补充说明</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>启用标志</strong> — Y/N 控制分类是否可用</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>分类名称</strong> — 业务展示用的可读名称</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>分类描述</strong> — 补充说明分类用途与范围</div></div>
      </div>
    </div>
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 影响</span>
    <h2>分类数据被谁引用</h2>
    <p>分类是产品体系的基础，被多个产品相关页面与前端复用</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#15803D);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="5" height="5" rx="1" stroke="white" stroke-width="1.5"/><path d="M9 5H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/><rect x="2" y="10" width="5" height="3" rx="1" stroke="white" stroke-width="1.5"/><path d="M9 10H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">产品列表</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">产品按分类归并，列表与筛选均依赖分类。</p></div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8h12" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2v12" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">产品搜索</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">按分类检索产品，提升前端查找效率。</p></div>
      </div>
    </div>
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#15803D);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M5 5h6M5 8h6M5 11h4" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">CRM展示</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">嵌入CRM详情页，作为前端分类选择器来源。</p></div>
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
<h4 class="bf-main-title">产品分类 — 全链路流程图</h4>
<p class="bf-main-sub">开始 → ★维护产品分类★(新增/编辑/删除/移动节点) → 保存生效 → 结束（嵌入CRM产品详情页，无审批）</p>
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
<text x="545" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">组织/权限</text>
<rect x="606" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="655" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则</text>
<rect x="716" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="765" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">CRM详情页</text>
<line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="545" y="150" width="110" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="600" y1="194" x2="600" y2="220" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="500" y="220" width="200" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="600" y="244" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★维护产品分类★</text>
<text x="600" y="263" text-anchor="middle" fill="#DCFCE7" font-size="10">新增/编辑/删除/移动节点·保存</text>
<line x1="600" y1="274" x2="600" y2="300" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="545" y="300" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="325" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="600" y1="340" x2="600" y2="380" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="50" y="380" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="402" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="270" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="345" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">产品列表(分类)</text>
<rect x="440" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="515" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">产品详情页</text>
<rect x="610" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="685" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">产品搜索</text>
<rect x="780" y="418" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="855" y="441" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">CRM展示</text>
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
<KbCard title="2.1 后端Controller"><table class="kl-table"><thead><tr><th>项目</th><th>说明</th></tr></thead><tbody><tr><td>Controller</td><td>ManualClassificationController</td></tr><tr><td>基础路径</td><td><code>/v1/{organizationId}/manual-classification/</code></td></tr></tbody></table></KbCard>
<KbCard title="2.2 API接口"><table class="kl-table"><thead><tr><th>接口</th><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><code>/v1/{organizationId}/manual-classification/</code></td><td>GET</td><td>查询分类列表/树</td></tr><tr><td><code>/v1/{organizationId}/manual-classification/{id}</code></td><td>GET</td><td>查询分类详情</td></tr><tr><td><code>/v1/{organizationId}/manual-classification/</code></td><td>POST</td><td>新增分类</td></tr><tr><td><code>/v1/{organizationId}/manual-classification/{id}</code></td><td>PUT</td><td>更新分类</td></tr><tr><td><code>/v1/{organizationId}/manual-classification/{id}</code></td><td>DELETE</td><td>删除分类</td></tr></tbody></table></KbCard>
<KbCard title="2.3 无工作流"><p>本菜单无审批工作流，数据直接保存生效。</p></KbCard>
<KbCard title="2.4 嵌入使用"><p>本菜单作为嵌入式组件，嵌入在CRM产品详情页中使用，前端在arrow-crm包中调用AE微服务接口。</p></KbCard>
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
<KbCard title="3.1 分类树结构"><ul><li>产品分类采用树形结构，支持多级分类</li><li>顶级分类为根节点，下级分类为子节点</li><li>每个分类节点包含：分类编码、分类名称、父分类ID、层级、排序号等</li><li>分类树支持展开/折叠操作</li></ul></KbCard>
<KbCard title="3.2 分类数据结构"><ul><li><strong>分类编码（class_code）</strong>：分类的唯一编码</li><li><strong>分类名称（class_name）</strong>：分类的显示名称</li><li><strong>父分类ID（parent_class_id）</strong>：上级分类ID，顶级分类为空或0</li><li><strong>层级（level_number）</strong>：分类在树中的层级，从1开始</li><li><strong>排序号（sequence_number）</strong>：同级分类的排序顺序</li><li><strong>分类描述（description）</strong>：分类的详细说明</li><li><strong>启用标志（enabled_flag）</strong>：Y/N，控制分类是否可用</li></ul></KbCard>
<KbCard title="3.3 业务规则"><ul><li>分类编码在同一组织下唯一</li><li>分类被产品引用后不可删除，只能禁用</li><li>删除父分类时需先处理子分类（级联删除或移动子分类）</li><li>分类层级深度有限制，一般不超过5级</li><li>分类排序号影响同级分类的显示顺序</li></ul></KbCard>
<KbCard title="3.4 与产品关联"><ul><li>产品通过product_category字段关联到分类编码</li><li>一个产品只能归属一个主分类</li><li>分类变更不影响已关联产品的分类归属，需手动调整</li></ul>
<p>\\#\\#\\#\\ 选择弹窗\\r\\n\\r\\n&gt;\\ 无LOV选择弹窗。使用四级级联值集\\ CRM\\.PRODUCT_CLASS（SQL值集）选择产品分类。\\r\\n\\r\\n\\#\\#\\#\\ 导入\\r\\n\\r\\n&gt;\\ 不支持导入功能。\\r\\n\\r\\n\\#\\#\\#\\ 其他按钮\\r\\n\\r\\n\\|\\ 按钮\\ \\|\\ 接口\\ \\|\\ 说明\\ \\|\\r\\n\\|------\\|------\\|------\\|\\r\\n\\|\\ 新增\\ \\|\\ POST\\ /save-item-class\\ \\|\\ 新增产品分类\\ \\|\\r\\n\\|\\ 删除\\ \\|\\ POST\\ /deleta-item-class\\ \\|\\ 删除产品分类\\ \\|\\r\\n\\r\\n\\#\\#\\#\\ 保存校验\\r\\n\\r\\n&gt;\\ 后端校验在ManualClassificationService\\.saveItemClass中。前端代码缺失，无法确认前端校验。\\r\\n\\r\\n\\#\\#\\#\\ 提交校验\\r\\n\\r\\n&gt;\\ 无提交/审批功能。</p></KbCard>
<KbCard title="4.1 产品分类表"><p class='kl-tip'>表名：ITEM_CLASS（产品分类表）</p>
<table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>NUMBER</td><td>主键ID</td><td>PK</td></tr><tr><td>class_code</td><td>VARCHAR2</td><td>分类编码</td><td>唯一</td></tr><tr><td>class_name</td><td>VARCHAR2</td><td>分类名称</td><td>NOT NULL</td></tr><tr><td>parent_class_id</td><td>NUMBER</td><td>父分类ID</td><td>顶级为空</td></tr><tr><td>level_number</td><td>NUMBER</td><td>层级</td><td>从1开始</td></tr><tr><td>sequence_number</td><td>NUMBER</td><td>排序号</td><td>同级排序</td></tr><tr><td>description</td><td>VARCHAR2</td><td>分类描述</td><td></td></tr><tr><td>enabled_flag</td><td>VARCHAR2</td><td>启用标志</td><td>Y/N</td></tr><tr><td>organization_id</td><td>NUMBER</td><td>组织ID</td><td></td></tr><tr><td>created_by</td><td>NUMBER</td><td>创建人</td><td></td></tr><tr><td>creation_date</td><td>DATE</td><td>创建时间</td><td></td></tr><tr><td>last_updated_by</td><td>NUMBER</td><td>最后更新人</td><td></td></tr><tr><td>last_update_date</td><td>DATE</td><td>最后更新时间</td><td></td></tr><tr><td>object_version_number</td><td>NUMBER</td><td>版本号</td><td>乐观锁</td></tr></tbody></table></KbCard>
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
      <span style="font-size:15px;">分类层级最多支持几级？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>一般不超过5级，具体以系统配置为准
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">删除有子分类的节点会怎样？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>需先处理子分类（删除或移动），不可直接删除有子节点的分类
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">分类编码可以修改吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>分类编码被产品引用后不建议修改，可能影响关联关系
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">本菜单在CRM前端如何使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>作为嵌入式组件嵌入在CRM产品详情页中，通过AE微服务接口获取分类数据
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">手动分类和自动分类的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>手动分类由用户维护分类体系，自动分类由系统根据规则自动归类
    </div>
  </div>
</div>
</KbCard>
</div>
</div>
</div>
<div id="faq-qa" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="常见问题FAQ"><table class="kl-table"><thead><tr><th>问题</th><th>解答</th></tr></thead><tbody><tr><td>分类层级最多支持几级？</td><td>一般不超过5级，具体以系统配置为准</td></tr><tr><td>删除有子分类的节点会怎样？</td><td>需先处理子分类（删除或移动），不可直接删除有子节点的分类</td></tr><tr><td>分类编码可以修改吗？</td><td>分类编码被产品引用后不建议修改，可能影响关联关系</td></tr><tr><td>本菜单在CRM前端如何使用？</td><td>作为嵌入式组件嵌入在CRM产品详情页中，通过AE微服务接口获取分类数据</td></tr><tr><td>手动分类和自动分类的区别？</td><td>手动分类由用户维护分类体系，自动分类由系统根据规则自动归类</td></tr></tbody></table></KbCard>
</div>
</div>
</div>
<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录"><table class="kl-table"><thead><tr><th>日期</th><th>版本</th><th>更新内容</th><th>更新人</th></tr></thead><tbody><tr><td>2026-08-03</td><td>V1.0</td><td>初始创建</td><td>AI</td></tr></tbody></table></KbCard>
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
