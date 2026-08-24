<BreadcrumbTabs />
<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
    <h2>基础参数配置维护什么</h2>
    <p>设定责任制内结价定价的基础规则与系数，是算价前提</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M5 6h6M5 9h6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">定价规则</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">规则与系数定义算价逻辑</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>定价规则</strong> — 内结价计算所依据的方法</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>定价系数</strong> — 影响最终价格的权重因子</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>生失效日期</strong> — 控制配置有效期区间</div></div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5" stroke="white" stroke-width="1.5"/><path d="M8 5.5v5M5.5 8h5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">适用范围</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">限定配置作用的组织与场景</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>适用范围</strong> — 配置命中的组织/业务场景</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>启用标志</strong> — Y/N 控制配置是否生效</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#EDE9FE;border-radius:8px;"><div style="font-size:.75rem;"><strong>唯一性</strong> — 同适用范围不允许重复配置</div></div>
      </div>
    </div>
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 影响</span>
    <h2>配置被谁引用</h2>
    <p>基础参数支撑内结价算价与跨事业部销售定价</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8h12" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2v12" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">内结价计算</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">作为算价基础参数直接被引用。</p></div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#15803D);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M5 6h6M5 9h6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">瓷砖配置</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">同体系下供瓷砖参数配置继承使用。</p></div>
      </div>
    </div>
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2L3 4V8C3 11 8 14 8 14C8 14 13 11 13 8V4L8 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
        <div><h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">跨部定价</h5><p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">支撑跨事业部销售申请的定价依据。</p></div>
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
  <h4 class="bf-main-title">责任制内结价定价基础参数配置 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★基础参数配置★ → 结束（CRUD配置，保存即生效无审批；下游供内结价定价计算/跨事业部销售申请使用）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 520" xmlns="http://www.w3.org/2000/svg">
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
      <text x="340" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">责任制内结价体系</text>
      <rect x="410" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="470" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">产品主档</text>
      <rect x="540" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">适用范围值集</text>
      <rect x="670" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="730" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">组织主数据</text>
      <rect x="800" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="860" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">价格类型值集</text>
      <line x1="540" y1="115" x2="540" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="500" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="540" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="540" y1="194" x2="540" y2="228" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="400" y="228" width="280" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="540" y="252" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★基础参数配置★</text>
      <text x="540" y="270" text-anchor="middle" fill="#DCFCE7" font-size="10">新建/编辑·填定价规则系数·保存即生效</text>
      <line x1="540" y1="282" x2="540" y2="316" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="485" y="316" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="540" y="341" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="540" y1="356" x2="540" y2="400" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="400" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="422" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="270" y="438" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="345" y="461" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">内结价定价计算</text>
      <rect x="440" y="438" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="515" y="461" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">瓷砖参数配置</text>
      <rect x="610" y="438" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="685" y="461" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">跨事业部销售申请定价</text>
      <rect x="780" y="438" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="855" y="461" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">经营分析</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
</div>
</div>
</div>
<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="重点逻辑"><p>1. <strong>基础参数配置</strong>：配置责任制内结价定价的基础参数，包括定价规则、系数等 2. <strong>CRUD操作</strong>：支持新建、编辑、删除、查看配置 3. <strong>无审批流程</strong>：配置保存即生效，无需审批</p></KbCard>
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
<KbCard title="3.1 后端接口"><table class="kl-table"><thead><tr><th>接口</th><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>CRM_BUSINESS/v1/{orgId}/rspStmCfg</td><td>POST</td><td>新建配置</td></tr><tr><td>CRM_BUSINESS/v1/{orgId}/rspStmCfg</td><td>GET</td><td>查询配置列表</td></tr><tr><td>CRM_BUSINESS/v1/{orgId}/rspStmCfg/{id}</td><td>GET</td><td>查询配置详情</td></tr><tr><td>CRM_BUSINESS/v1/{orgId}/rspStmCfg/{id}</td><td>PUT</td><td>更新配置</td></tr><tr><td>CRM_BUSINESS/v1/{orgId}/rspStmCfg/{id}</td><td>DELETE</td><td>删除配置</td></tr></tbody></table></KbCard>
<KbCard title="3.2 前端页面"><ul><li>前端包：<code>arrow-crm</code></li><li>路由：<ul><li><code>/rspStmCfg/list</code> — 配置列表页</li><li><code>/rspStmCfg/detail/:id?</code> — 配置详情/新建页（id为空时新建）</li></ul></li></ul></KbCard>
<KbCard title="3.3 核心业务规则"><p>1. 配置参数包括定价规则、定价系数、适用范围等 2. 同一适用范围内不允许重复配置 3. 配置保存后立即生效 4. 无工作流</p></KbCard>
<KbCard title="3.4 选择弹窗"><p class='kl-tip'>无LOV选择弹窗。使用值集Select：产品分类四级级联CRM.PRODUCT_CLASS（SQL值集）、定价类型CRM.LNK_RSP_STM_CGF_PRICE_TYPE、状态CRM.LNK_RSP_STM_CFG_STATUS。</p></KbCard>
<KbCard title="3.5 导入"><p>支持Excel导入。templateCode=CRM.RSP_STM_CFG。</p></KbCard>
<KbCard title="3.6 其他按钮"><table class="kl-table"><thead><tr><th>按钮</th><th>显示条件</th><th>说明</th></tr></thead><tbody><tr><td>新建</td><td>列表页</td><td>跳详情页</td></tr><tr><td>导出</td><td>列表页</td><td>导出列表</td></tr><tr><td>保存</td><td>新建或编辑模式</td><td>保存配置</td></tr><tr><td>编辑</td><td>查看模式</td><td>进入编辑</td></tr><tr><td>取消</td><td>编辑已有记录</td><td>取消编辑</td></tr></tbody></table>
<p class='kl-tip'>编辑模式离开时弹确认"当前有未保存的更改，确定要离开吗？"</p></KbCard>
<KbCard title="3.7 保存校验"><p><strong>前端校验：</strong> commonFn_formValid(formDs)，必填字段：定价类型、一级分类、二级分类、三级分类、状态</p>
<p><strong>条件必填：</strong> 定价比例（priceType为ase_gross_margin或standard_price_ratio时必填，min=0、max=999999）</p></KbCard>
<KbCard title="3.8 提交校验"><p class='kl-tip'>无提交/审批功能。</p></KbCard>
<KbCard title="4.1 RSP_STM_CFG（责任制内结价定价基础参数配置表）"><table class="kl-table"><thead><tr><th>字段</th><th>说明</th></tr></thead><tbody><tr><td>cfg_id</td><td>配置ID（主键）</td></tr><tr><td>organization_id</td><td>组织ID</td></tr><tr><td>cfg_name</td><td>配置名称</td></tr><tr><td>pricing_rule</td><td>定价规则</td></tr><tr><td>pricing_coefficient</td><td>定价系数</td></tr><tr><td>applicable_scope</td><td>适用范围</td></tr><tr><td>effective_date</td><td>生效日期</td></tr><tr><td>expiry_date</td><td>失效日期</td></tr><tr><td>enabled_flag</td><td>启用标识（Y/N）</td></tr><tr><td>created_by</td><td>创建人</td></tr><tr><td>creation_date</td><td>创建时间</td></tr><tr><td>last_updated_by</td><td>最后更新人</td></tr><tr><td>last_update_date</td><td>最后更新时间</td></tr></tbody></table></KbCard>
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
      <span style="font-size:15px;">配置保存后是否需要审批？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不需要，保存即生效。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">能否同时启用多条配置？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>可以，但同一适用范围内不允许重复。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">已生效的配置能否修改？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>可以修改，修改后立即生效。
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
<KbCard title="常见问题"><p><strong>Q1：配置保存后是否需要审批？</strong></p>
<p>A1：不需要，保存即生效。</p>
<p><strong>Q2：能否同时启用多条配置？</strong></p>
<p>A2：可以，但同一适用范围内不允许重复。</p>
<p><strong>Q3：已生效的配置能否修改？</strong></p>
<p>A3：可以修改，修改后立即生效。</p></KbCard>
</div>
</div>
</div>
<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录"><table class="kl-table"><thead><tr><th>日期</th><th>内容</th></tr></thead><tbody><tr><td>2026-08-03</td><td>初始创建</td></tr></tbody></table></KbCard>
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
