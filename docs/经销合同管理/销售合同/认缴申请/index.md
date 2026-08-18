<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
  <div class="kl-card">
    <div class="biz-kl-hdr">
      <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
      <h2>认缴申请是什么</h2>
      <p>将一笔到款认款按合同类型认缴为合同保证金，并走审批的单据</p>
    </div>
    <div class="biz-2col-inner">
      <div class="kl-col-box">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M5.5 6L7 7.5L10.5 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">单据结构</h4>
        </div>
        <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">头行两层，关联认款记录</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
            <div style="font-size:.75rem;"><strong>申请头</strong> — 经销商、法人、认缴类型，关联一笔认款记录</div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
            <div style="font-size:.75rem;"><strong>申请行</strong> — 按合同类型填写认缴金额，受可用余额约束</div>
          </div>
        </div>
      </div>
      <div class="kl-col-box alt">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#059669,#047857);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5.5" stroke="white" stroke-width="1.5"/><path d="M8 5.5V8L9.8 9.2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">存在意义</h4>
        </div>
        <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">认款如何变成保证金</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;">
            <div style="font-size:.75rem;"><strong>抵扣来源</strong> — 基于 EBS 同步的到款认款发起认缴</div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;">
            <div style="font-size:.75rem;"><strong>缴清判定</strong> — 认缴生效后才更新合同与概况缴清状态</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="kl-card">
    <div class="biz-kl-hdr">
      <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 流程</span>
      <h2>认缴申请怎么流转</h2>
      <p>关联认款 → 填认缴金额 → 提交审批 → 生效并推送</p>
    </div>
    <div class="biz-steps">
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h10M8 3v10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h5>新建申请</h5>
        <small>选认款记录<br>带出可用金额</small>
      </div>
      <div class="biz-step-arrow">&rarr;</div>
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h10M8 3v10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h5>保存并提交</h5>
        <small>按合同类型填金额<br>启动审批</small>
      </div>
      <div class="biz-step-arrow">&rarr;</div>
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2L3 4V8C3 11 8 14 8 14C8 14 13 11 13 8V4L8 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
        <h5>审批判断</h5>
        <small>通过则认缴生效<br>驳回回退未生效</small>
      </div>
      <div class="biz-step-arrow">&rarr;</div>
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#059669,#047857);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13L6 9L9 11L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h5>生效同步</h5>
        <small>生成认缴记录<br>更新缴清·推送CRM</small>
      </div>
    </div>
  </div>

  <div class="kl-card">
    <div class="biz-kl-hdr">
      <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 规则</span>
      <h2>关键规则与边界</h2>
      <p>认缴类型、金额上限与状态约束</p>
    </div>
    <div class="biz-3col">
      <div class="kl-col-box" style="margin-bottom:0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M2 6H14M5 2V4M11 2V4" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div>
            <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">认缴类型</h5>
            <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">分普通认缴与封顶认缴，类型由关联认款记录带入，影响撤销处理逻辑。</p>
          </div>
        </div>
      </div>
      <div class="kl-col-box alt" style="margin-bottom:0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5.5" stroke="white" stroke-width="1.5"/><path d="M8 5.5V8" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div>
            <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">金额上限</h5>
            <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">每行认缴金额须大于0且不超过该认款记录的可用余额（认款金额减已使用）。</p>
          </div>
        </div>
      </div>
      <div class="kl-col-box" style="margin-bottom:0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2L3 4V8C3 11 8 14 8 14C8 14 13 11 13 8V4L8 2Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
          <div>
            <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">状态边界</h5>
            <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">仅"未生效"状态可编辑、提交或删除；审批中不可改动。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="kl-tip" style="margin-top:14px;">
      <strong>业务原则：</strong>认缴须基于真实到款认款，金额不得超出可用余额，经审批生效后才更新缴清状态并推送 CRM；撤销认款会反向回退认缴状态。
    </div>
  </div>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">认缴申请 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★认缴申请★ → ⚖审批通过？ → 认缴生效(生成记录/更新缴清/推送CRM) → 结束（驳回则回退未生效）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="195" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="270" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">合同保证金</text>
      <rect x="360" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="435" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">保证金标准设定</text>
      <rect x="525" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">年度经销合同</text>
      <rect x="690" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="765" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
      <rect x="855" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="930" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">CRM系统</text>
      <line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="560" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="600" y1="194" x2="600" y2="230" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="470" y="230" width="260" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="600" y="254" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★认缴申请★</text>
      <text x="600" y="272" text-anchor="middle" fill="#DCFCE7" font-size="10">选认款记录/按合同类型填认缴金额</text>
      <line x1="600" y1="284" x2="600" y2="300" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="600,300 680,340 600,380 520,340" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="344" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
      <line x1="680" y1="340" x2="755" y2="340" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="755" y="325" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="800" y="344" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">驳回 ✗</text>
      <line x1="800" y1="325" x2="800" y2="200" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="800" y1="200" x2="700" y2="200" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="700" y1="200" x2="700" y2="257" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
      <line x1="600" y1="380" x2="600" y2="400" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="500" y="400" width="200" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="600" y="425" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">认缴生效</text>
      <line x1="600" y1="440" x2="600" y2="460" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="545" y="460" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="485" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="600" y1="500" x2="600" y2="520" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="520" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="542" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="270" y="558" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="370" y="581" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">生成认缴记录</text>
      <rect x="500" y="558" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="581" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">更新合同缴清状态</text>
      <rect x="730" y="558" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="830" y="581" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">推送CRM认缴状态</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑系统</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：保存认缴申请 【数据保存】">
<KbQuote>新建或编辑认缴申请，支持头行结构，行按合同类型分别填写认缴金额</KbQuote>

**具体逻辑**：

- 1、新增时自动生成认缴申请单号（编码规则AE.CONTRACT_PAYMENT_APPLY_NO，含事业部编码前缀）
- 2、新增时设置审批状态为"新建"，业务状态为"未生效"
- 3、新增时自动获取当前登录用户所属事业部ID
- 4、保存行信息时，每行关联头ID和经销商ID
- 5、支持附件保存
</KbCard>

<KbCard num="2" title="重点逻辑2：认缴申请详情查询 【数据查询】">
<KbQuote>查看认缴申请详情时，关联查询认款记录的可用金额信息</KbQuote>

**具体逻辑**：

- 1、根据认缴申请关联的认款单ID(paymentRefId)，查询认款记录详情
- 2、返回认款的同步金额、已使用金额（已认缴+在途），用于前端展示可认缴金额上限
</KbCard>

<KbCard num="3" title="重点逻辑3：保存并提交 【审批提交】">
<KbQuote>保存认缴申请并启动工作流审批，审批通过后认缴生效</KbQuote>

**具体逻辑**：

- 1、提交前校验流程编码不能为空
- 2、先执行保存逻辑，再启动工作流
- 3、工作流启动后，将业务状态更新为"审批中"
</KbCard>

<KbCard num="4" title="重点逻辑4：工作流审批回调 【状态流转】">
<KbQuote>工作流审批完成后回调更新单据状态并执行后续业务</KbQuote>

**具体逻辑**：

- 1、审批通过时，业务状态更新为"有效"，同时生成认缴记录、更新合同缴清状态、推送CRM
- 2、审批驳回时，业务状态回退为"未生效"
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：认缴申请列表页">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>认缴申请单号</td>
<td>文本框</td>
<td>认缴申请单据编号</td>
<td>常显</td>
<td>新增时自动生成</td>
<td>-</td>
<td>CM_CONTRACT_PAYMENT_APPLY.PAYMENT_APPLY_NO</td>
</tr>
<tr>
<td>经销商</td>
<td>下拉选择框</td>
<td>申请认缴的经销商</td>
<td>常显</td>
<td>弹窗选择</td>
<td>系统内有效经销商</td>
<td>CM_CONTRACT_PAYMENT_APPLY.CUSTOMER_ID</td>
</tr>
<tr>
<td>法人</td>
<td>下拉选择框</td>
<td>经销商对应的法人</td>
<td>常显</td>
<td>选择经销商后带出</td>
<td>-</td>
<td>CM_CONTRACT_PAYMENT_APPLY.BILLING_UNIT_ID</td>
</tr>
<tr>
<td>认缴类型</td>
<td>下拉选择框</td>
<td>认缴类型分类</td>
<td>常显</td>
<td>从合同保证金带入</td>
<td>normal(普通认缴)/ceiling(封顶认缴)</td>
<td>CM_CONTRACT_PAYMENT_APPLY.PAYMENT_TYPE</td>
</tr>
<tr>
<td>状态</td>
<td>文本框</td>
<td>业务有效状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>pending/running/enable/disenable</td>
<td>CM_CONTRACT_PAYMENT_APPLY.STATUS</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：认缴申请明细行">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>合同类型</td>
<td>下拉选择框</td>
<td>认缴对应的合同类型</td>
<td>常显</td>
<td>从值集scpdict:sales_contract_type选择</td>
<td>值集内有效项</td>
<td>CM_CONTRACT_PAYMENT_APPLY_LINE.CONTRACT_TYPE</td>
</tr>
<tr>
<td>认缴金额</td>
<td>数字输入框</td>
<td>该合同类型的认缴金额</td>
<td>常显</td>
<td>手工输入</td>
<td>大于0，不超过可用余额</td>
<td>CM_CONTRACT_PAYMENT_APPLY_LINE.PAYMENT_AMOUNT</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：认款记录关联信息">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>认款单号</td>
<td>文本框</td>
<td>关联的认款单号</td>
<td>常显</td>
<td>从合同保证金带入</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.PAYMENT_NO</td>
</tr>
<tr>
<td>认款金额</td>
<td>文本框</td>
<td>认款总金额</td>
<td>常显</td>
<td>从合同保证金带入</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.SYN_PAYMENT_AMOUNT</td>
</tr>
<tr>
<td>已使用金额</td>
<td>文本框</td>
<td>已认缴+在途金额</td>
<td>常显</td>
<td>系统计算</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>可认缴金额</td>
<td>文本框</td>
<td>认款金额-已使用金额</td>
<td>常显</td>
<td>系统计算</td>
<td>-</td>
<td>-</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：经销商选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| entid | 事业部ID | 限定事业部范围 | 111 |

**数据范围**

```sql
当前事业部下有效经销商
```

<KbSubTitle>弹窗2：法人选择弹窗（通过客户找法人） <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| customerId | 经销商ID | 限定经销商范围 | 1001 |

**数据范围**

```sql
该经销商关联的有效法人
```

</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 新增 | 新建认缴申请 | 列表页 | 常显 | 跳转新建页面 |
| 保存 | 保存认缴申请 | 新建/编辑页 | 常显 | 调用save接口保存头行数据 |
| 保存并提交 | 保存并提交审批 | 新建/编辑页 | 状态为未生效时可用 | 调用saveAndSubmit接口，启动工作流 |
| 删除 | 删除认缴申请 | 列表页 | 状态为未生效时可用 | 调用remove接口删除头行及附件 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：行信息中合同类型和认缴金额必填 —— 确保每行都有完整的认缴信息</KbSubTitle>

- 第1点：保存行记录时，contractType和paymentAmount字段不能为空

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM CM_CONTRACT_PAYMENT_APPLY_LINE WHERE HEAD_ID = :headId AND (CONTRACT_TYPE IS NULL OR PAYMENT_AMOUNT IS NULL);
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：流程编码不能为空 —— 确保选择了审批流程</KbSubTitle>

- 第1点：saveAndSubmit方法入口校验flowCode为空时报错

<KbTip>阻断性报错，提示"流程编码缺失，请选择流程！"</KbTip>

```sql
-- 无需SQL，前端参数校验
```

</KbCard>
<KbCard title="状态机">


```text
新建 ──保存──> 未生效(pending) ──提交──> 审批中(running) ──审批通过──> 有效(enable)
                                          │
                                      审批驳回
                                          │
                                          v
                                     未生效(pending)
```


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| pending | 未生效 | 编辑、保存、提交、删除 |
| running | 审批中 | 无（等待审批） |
| enable | 有效 | 无（已生效） |
| disenable | 失效 | 无 |

---

</KbCard>
<KbCard num="1" title="表1：CM_CONTRACT_PAYMENT_APPLY（认缴申请头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 自增 |
| ENTID | NUMBER | 组织ID | - | 新增时自动获取当前事业部 |
| BILLING_UNIT_ID | NUMBER | 法人ID | 法人 | 选择经销商后带出 |
| CUSTOMER_ID | NUMBER | 经销商ID | 经销商 | 弹窗选择 |
| PAYMENT_TYPE | VARCHAR2 | 认缴类型 | 认缴类型 | 从认款记录带入，normal/ceiling |
| PAYMENT_REF_ID | NUMBER | 认款单ID | - | 关联CM_DEPOSITS_PAYMENT.ID |
| STATUS | VARCHAR2 | 有效状态 | 状态 | pending/running/enable/disenable |
| STAT | NUMBER | 单据状态 | - | 工作流状态 |
| WFID | NUMBER | 流程ID | - | 工作流实例ID |
| WFFLAG | NUMBER | 流程标志 | - | 工作流标志 |
| PAYMENT_APPLY_NO | VARCHAR2 | 认缴申请单号 | 认缴申请单号 | 编码规则自动生成 |

</KbCard>

<KbCard num="2" title="表2：CM_CONTRACT_PAYMENT_APPLY_LINE（认缴申请行）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 非自增 |
| HEAD_ID | NUMBER | 认缴信息头ID | - | 关联CM_CONTRACT_PAYMENT_APPLY.ID |
| CUSTOMER_ID | NUMBER | 经销商ID | - | 与头相同 |
| CONTRACT_TYPE | NUMBER | 合同类型 | 合同类型 | 从值集选择 |
| PAYMENT_AMOUNT | NUMBER | 认缴金额 | 认缴金额 | 手工输入 |

---

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
<KbCard title="报错一览表" :hover="false">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:27%"><col style="width:13%"><col style="width:32%"><col style="width:14%"><col style="width:14%"></colgroup>
<thead><tr><th>报错信息</th><th>提示节点</th><th>根因与解决方案</th><th>等级</th><th>详细逻辑</th></tr></thead>
<tbody>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程编码缺失，请选择流程！</td>
            <td style="font-size:13px;">保存并提交</td>
            <td style="font-size:13px;">未选择审批流程编码</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法获上线文信息</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">无法获取当前登录用户信息</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法获事业部信息</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">当前用户未关联事业部</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">事业部id、经销商id 不能为空</td>
            <td style="font-size:13px;">认缴金额查询</td>
            <td style="font-size:13px;">查询认缴金额时关键参数为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">合同类型不能为空</td>
            <td style="font-size:13px;">认缴金额查询</td>
            <td style="font-size:13px;">合同类型参数为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">保证金ID不能空！</td>
            <td style="font-size:13px;">详情查询</td>
            <td style="font-size:13px;">认款单ID为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该笔认款金额已进行撤销操作，不能进行认领</td>
            <td style="font-size:13px;">详情查询</td>
            <td style="font-size:13px;">关联的认款记录已撤销</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该认款已转换为封顶认款，不能再进行认缴操作</td>
            <td style="font-size:13px;">详情查询</td>
            <td style="font-size:13px;">普通认缴且已转封顶</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程编码缺失，请选择流程！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>未选择审批流程编码</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法获上线文信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>无法获取当前登录用户信息</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法获事业部信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>当前用户未关联事业部</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>事业部id、经销商id 不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>查询认缴金额时关键参数为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同类型不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>合同类型参数为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>保证金ID不能空！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>认款单ID为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该笔认款金额已进行撤销操作，不能进行认领</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>关联的认款记录已撤销</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该认款已转换为封顶认款，不能再进行认缴操作</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>普通认缴且已转封顶</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">保存后认缴申请单号未生成</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>编码规则AE.CONTRACT_PAYMENT_APPLY_NO未配置或事业部编码未设置<br>
      <strong style="color:#7C3AED;">处理：</strong>检查编码规则配置和事业部基础设置
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">认缴申请详情中可认缴金额为0</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>认款金额已被其他认缴申请使用完（已认缴+在途金额=认款金额）<br>
      <strong style="color:#7C3AED;">处理：</strong>检查该认款记录关联的其他认缴申请。排查SQL：
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

| 日期 | 提交ID | 提交人 | 提交内容 |
|------|-------|-------|---------|
| 2025-09-15 | - | jiaqiang.fu01 | 初始创建认缴申请模块 |
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
