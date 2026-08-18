<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">业务是什么</span>
    <h2>工程真实性核销</h2>
    <p>将供应商发票与出库行逐笔对应核销，确认业务真实发生，并触发返利计算</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M8 2L3 4V8C3 11 8 14 8 14C8 14 13 11 13 8V4Z"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">为何要做真实性核销</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">解决两个业务诉求</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>防虚假核销</strong> — 发票与出库行必须真实对应，杜绝空核销套利</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>触发返利</strong> — 核销确认后自动核算供应商应得返利</div></div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 7L8 9L10 6"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">核销单包含什么</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">两类核心内容</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>核销行</strong> — 选择出库行，填写本次核销数量</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>发票明细</strong> — 关联已上传的有效发票明细</div></div>
      </div>
    </div>
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">流程</span>
    <h2>真实性核销流程</h2>
    <p>从关联发票上传单到提交审批，通过后更新出库行与发票并触发返利</p>
  </div>
  <div class="biz-steps">
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 7L8 9L10 6"/></svg></div>
      <h5>关联发票上传单</h5>
      <small>选择已生效的<br>发票上传单</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 8H10"/></svg></div>
      <h5>新建核销单</h5>
      <small>录入核销行与<br>发票明细并保存</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8H11"/></svg></div>
      <h5>提交审批</h5>
      <small>走真实性核销<br>工作流审批</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 7L8 9L10 6"/></svg></div>
      <h5>审批通过生效</h5>
      <small>更新出库行/发票<br>触发返利</small>
    </div>
  </div>
  <div class="kl-tip" style="margin-top:14px;">
    <strong>取消与终止：</strong>核销支持多种类型的取消操作；已提交但需中止时支持终止，并可在满足条件时撤回终止恢复。
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">关键规则</span>
    <h2>核销的关键约束</h2>
    <p>核销数量不可超额，必须以真实有效发票为依据</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><rect x="3" y="3" width="10" height="10" rx="2"/><path d="M6 8L7 9L10 6"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">核销行+发票明细</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">每行核销需明确出库行与对应发票明细，保证账实相符。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M4 8L8 4L12 8"/><path d="M8 4V12"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">核销数量不超额</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">本次核销数量受出库行可核销余额约束，超额将被拦截。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8H11"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">审批后联动</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">审批通过更新出库行与发票状态，并触发供应商返利计算。</p>
        </div>
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
  <h4 class="bf-main-title">工程真实性核销 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → 核销发票上传单(关联) → ★新建真实性核销单★ → 提交审批(工作流TRUTH_VERIFY) → ⚖审批通过？ → 更新出库行/发票状态/触发返利 / 驳回中断 → 结束</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="120" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="175" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">核销发票上传</text>
      <rect x="250" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="305" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">出库单行</text>
      <rect x="380" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="435" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">折扣政策</text>
      <rect x="510" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="565" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则</text>
      <rect x="640" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="695" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流</text>
      <line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="145" y="210" width="180" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="235" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">核销发票上传单(关联)</text>
      <line x1="235" y1="250" x2="235" y2="266" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="155" y="266" width="160" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="235" y="290" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建真实性核销单★</text>
      <text x="235" y="308" text-anchor="middle" fill="#DCFCE7" font-size="10">选出库行/发票/填数量·保存</text>
      <line x1="235" y1="320" x2="235" y2="336" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="150" y="336" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="361" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">提交审批(工作流TRUTH_VERIFY)</text>
      <line x1="235" y1="376" x2="235" y2="392" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="235,392 305,432 235,472 165,432" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="436" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
      <line x1="235" y1="472" x2="235" y2="488" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="140" y="488" width="190" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="513" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">更新出库行/发票状态/触发返利</text>
      <line x1="235" y1="528" x2="235" y2="544" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="180" y="544" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="569" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="235" y1="584" x2="235" y2="600" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <line x1="305" y1="432" x2="430" y2="432" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="380" y="417" width="100" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="430" y="436" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">驳回中断✗</text>
      <line x1="430" y1="432" x2="430" y2="293" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="430" y1="293" x2="315" y2="293" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
      <rect x="50" y="600" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="622" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="200" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="275" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">出库确认·核销数量</text>
      <rect x="375" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="450" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">发票管理·状态</text>
      <rect x="550" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="625" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">返利计算·触发重算</text>
      <rect x="725" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="800" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">核销单据·取消处理</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批驳回/中断</span>
  </div>
</div>
</div>
</div>
<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：真实性核销保存逻辑 保存">
<KbQuote>保存真实性核销单，包含出库单行和发票核销明细</KbQuote>

**具体逻辑**：

- 1、新增时自动生成核销单号，初始状态为新建(stat=1)
- 2、保存数据包含两部分：核销行(EPM_INVOICE_TRUTH_LINE)和核销发票明细(EPM_VERIFER_INVOICE_DETAILS)
- 3、每行核销数据包含：出库单号、发货日期、产品编码、可核销数量、剩余可核销数量、本次核销数量
- 4、本次核销数量的小数位不可超过3位
- 5、修改时采用先删后插策略处理子表数据
</KbCard>

<KbCard num="2" title="重点逻辑2：核销数量校验 数量校验">
<KbQuote>确保本次核销数量不超过剩余可核销数量，防止超额核销</KbQuote>

**具体逻辑**：

- 1、保存时校验每行的本次核销数量是否大于剩余可核销数量
- 2、剩余可核销数量来源于出库单行的可核销数量(CAN_VERIFY_NUM)
- 3、校验发货日期和产品编码是否匹配
</KbCard>

<KbCard num="3" title="重点逻辑3：审批通过后处理 审批通过">
<KbQuote>审批通过后更新出库单行核销数量，触发返利计算</KbQuote>

**具体逻辑**：

- 1、更新出库单行的已核销数量增加本次核销数量，可核销数量减少本次核销数量
- 2、更新核销发票明细有效状态为valid
- 3、若出库单行渠道上调价&gt;0，触发返利计算(operationRebateBiz)
</KbCard>

<KbCard num="4" title="重点逻辑4：取消核销/作废发票 取消核销">
<KbQuote>支持多种维度取消核销或作废发票，灵活处理核销异常</KbQuote>

**具体逻辑**：

- 1、支持5种操作类型：invoice(按发票)、invoiceDetail(按发票明细)、invLine(按出库单行)、veriferDetail(按核销明细)、obsInvoice(作废发票)
- 2、取消核销时，查询受影响的核销明细，更新有效状态为canceled，记录取消操作人和时间
- 3、若受影响的核销单处于审批中(stat=3)，则中断审批，将核销单状态重置为新建
- 4、更新出库单行：可核销数量回加取消数量，已核销数量减少取消数量
- 5、作废发票时，更新发票主要信息有效状态为obsolete，同时更新关联核销明细状态
- 6、取消操作使用分布式锁控制并发，避免同时取消导致数据不一致
</KbCard>

<KbCard num="5" title="重点逻辑5：终止与撤回终止 终止">
<KbQuote>对真实性核销单进行终止操作，支持撤回终止恢复</KbQuote>

**具体逻辑**：

- 1、终止时标记核销单为终止状态
- 2、撤回终止时恢复为正常状态
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：真实性核销列表页">
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
<td>核销单号</td>
<td>文本框</td>
<td>系统自动生成的核销单号</td>
<td>常显</td>
<td>新增时按编码规则自动生成，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.INVOICE_TRUTH_NO</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框</td>
<td>关联项目编码</td>
<td>常显</td>
<td>来源于项目选择，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.PROJECT_CODE</td>
</tr>
<tr>
<td>项目名称</td>
<td>文本框</td>
<td>关联项目名称</td>
<td>常显</td>
<td>来源于项目选择，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.PROJECT_NAME</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>关联合同编码</td>
<td>常显</td>
<td>来源于合同选择，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.CONTRACT_CODE</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>来源于项目/合同，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>来源于项目/合同，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.CUSTOMER_NAME</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>来源于项目，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>核销发票上传单号</td>
<td>文本框</td>
<td>关联的核销发票上传单号</td>
<td>常显</td>
<td>选择核销发票上传单后带入，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.INVOICE_VERIFER_NO</td>
</tr>
<tr>
<td>核销类型</td>
<td>下拉选择框</td>
<td>核销类型</td>
<td>常显</td>
<td>来源于核销发票上传单</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.VERIFER_TYPE</td>
</tr>
<tr>
<td>审批状态</td>
<td>下拉选择框</td>
<td>工作流审批状态</td>
<td>常显</td>
<td>值集HWKF.APPROVE_STATUS翻译</td>
<td>NEW/RUN/APPROVED/INTERRUPT</td>
<td>EPM_INVOICE_TRUTH_HEADER.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>单据状态</td>
<td>下拉选择框</td>
<td>业务状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>1-新建/3-审批中/5-审批通过</td>
<td>EPM_INVOICE_TRUTH_HEADER.STAT</td>
</tr>
<tr>
<td>是否家装</td>
<td>单选框</td>
<td>是否家装</td>
<td>常显</td>
<td>工程=1，家装=2</td>
<td>1/2</td>
<td>EPM_INVOICE_TRUTH_HEADER.IS_HOME</td>
</tr>
<tr>
<td>折扣政策</td>
<td>文本框</td>
<td>关联折扣政策名称</td>
<td>常显</td>
<td>选择折扣政策后带入</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_HEADER.DISCOUNT_POLICY_NAME</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：真实性核销详情页-核销行">
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
<td>出库单号</td>
<td>文本框</td>
<td>ERP出库单号</td>
<td>常显</td>
<td>来源于出库单行，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.INVBILLNO</td>
</tr>
<tr>
<td>发货日期</td>
<td>日期选择框</td>
<td>发货日期</td>
<td>常显</td>
<td>来源于出库单行，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.DATE_INVBILL</td>
</tr>
<tr>
<td>产品编码</td>
<td>文本框</td>
<td>产品编码</td>
<td>常显</td>
<td>来源于出库单行，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.ITEM_CODE</td>
</tr>
<tr>
<td>产品名称</td>
<td>文本框</td>
<td>产品名称</td>
<td>常显</td>
<td>来源于出库单行，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.ITEM_NAME</td>
</tr>
<tr>
<td>实发数量</td>
<td>数值框</td>
<td>实发数量</td>
<td>常显</td>
<td>来源于出库单行，不可编辑</td>
<td>&gt;0</td>
<td>EPM_INVOICE_TRUTH_LINE.QTY_BILL</td>
</tr>
<tr>
<td>可核销数量</td>
<td>数值框</td>
<td>出库单行可核销数量</td>
<td>常显</td>
<td>来源于出库单行CAN_VERIFY_NUM，不可编辑</td>
<td>≥0</td>
<td>EPM_INVOICE_TRUTH_LINE.CAN_VERIFER_NUMBER</td>
</tr>
<tr>
<td>剩余可核销数量</td>
<td>数值框</td>
<td>剩余可核销数量</td>
<td>常显</td>
<td>来源于出库单行，不可编辑</td>
<td>≥0</td>
<td>EPM_INVOICE_TRUTH_LINE.SURPLUS_CAN_VERIFER_NUMBER</td>
</tr>
<tr>
<td>本次核销数量</td>
<td>数值框</td>
<td>本次核销数量</td>
<td>常显</td>
<td>手工录入，可编辑，小数位≤3</td>
<td>&gt;0且≤剩余可核销数量</td>
<td>EPM_INVOICE_TRUTH_LINE.THIS_VERIFER_NUMBER</td>
</tr>
<tr>
<td>核销截止日</td>
<td>日期选择框</td>
<td>核销截止日期</td>
<td>常显</td>
<td>手工录入，可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.VERIFER_END_DATE</td>
</tr>
<tr>
<td>发票号码</td>
<td>文本框</td>
<td>关联发票号码</td>
<td>常显</td>
<td>来源于发票信息，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.INVOICE_NUMBER</td>
</tr>
<tr>
<td>发票代码</td>
<td>文本框</td>
<td>关联发票代码</td>
<td>常显</td>
<td>来源于发票信息，不可编辑</td>
<td>-</td>
<td>EPM_INVOICE_TRUTH_LINE.INVOICE_CODE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：真实性核销详情页-核销发票明细">
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
<td>发票号码</td>
<td>文本框</td>
<td>发票号码</td>
<td>常显</td>
<td>来源于核销发票上传，不可编辑</td>
<td>-</td>
<td>EPM_VERIFER_INVOICE_DETAILS.INVOICE_NUMBER</td>
</tr>
<tr>
<td>发票代码</td>
<td>文本框</td>
<td>发票代码</td>
<td>常显</td>
<td>来源于核销发票上传，不可编辑</td>
<td>-</td>
<td>EPM_VERIFER_INVOICE_DETAILS.INVOICE_CODE</td>
</tr>
<tr>
<td>货物或服务名称</td>
<td>文本框</td>
<td>货物或服务名称</td>
<td>常显</td>
<td>来源于核销发票上传，不可编辑</td>
<td>-</td>
<td>EPM_VERIFER_INVOICE_DETAILS.SERVICES_NAME</td>
</tr>
<tr>
<td>产品编码</td>
<td>文本框</td>
<td>产品编码</td>
<td>常显</td>
<td>来源于核销发票上传，不可编辑</td>
<td>-</td>
<td>EPM_VERIFER_INVOICE_DETAILS.SERVICES_CODE</td>
</tr>
<tr>
<td>可核销数量</td>
<td>数值框</td>
<td>可核销数量</td>
<td>常显</td>
<td>来源于发票明细，不可编辑</td>
<td>≥0</td>
<td>EPM_VERIFER_INVOICE_DETAILS.CAN_VERIFER_NUMBER</td>
</tr>
<tr>
<td>剩余可核销数量</td>
<td>数值框</td>
<td>剩余可核销数量</td>
<td>常显</td>
<td>来源于发票明细，不可编辑</td>
<td>≥0</td>
<td>EPM_VERIFER_INVOICE_DETAILS.SURPLUS_CAN_VERIFER_NUMBER</td>
</tr>
<tr>
<td>本次核销数量</td>
<td>数值框</td>
<td>本次核销数量</td>
<td>常显</td>
<td>来源于核销行，不可编辑</td>
<td>&gt;0</td>
<td>EPM_VERIFER_INVOICE_DETAILS.THIS_VERIFER_NUMBER</td>
</tr>
<tr>
<td>有效状态</td>
<td>下拉选择框</td>
<td>有效状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>invalid/valid/canceled</td>
<td>EPM_VERIFER_INVOICE_DETAILS.EFFECT_STATUS</td>
</tr>
<tr>
<td>取消类型</td>
<td>文本框</td>
<td>取消核销类型</td>
<td>已取消时显示</td>
<td>取消操作时记录</td>
<td>invoice/invoiceDetail/invLine/veriferDetail/obsInvoice</td>
<td>EPM_VERIFER_INVOICE_DETAILS.CANCEL_TYPE</td>
</tr>
<tr>
<td>取消操作人</td>
<td>文本框</td>
<td>执行取消的操作人</td>
<td>已取消时显示</td>
<td>取消操作时记录当前用户</td>
<td>-</td>
<td>EPM_VERIFER_INVOICE_DETAILS.CANCEL_OPERATOR</td>
</tr>
<tr>
<td>取消时间</td>
<td>文本框</td>
<td>取消操作时间</td>
<td>已取消时显示</td>
<td>取消操作时记录当前时间</td>
<td>-</td>
<td>EPM_VERIFER_INVOICE_DETAILS.CANCEL_TIME</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 保存 | 保存真实性核销单 | 详情页 | 新建/编辑状态 | 调用truthSave/truthUpdate接口 |
| 提交 | 提交审批 | 详情页 | 核销单已保存 | 启动工作流INVOICE_TRUTH_VERIFY |
| 删除 | 删除核销单 | 详情页 | 新建状态 | 调用invoiceTruthDelete接口 |
| 终止 | 终止核销单 | 详情页 | 非终止状态 | 调用terminate接口 |
| 撤回终止 | 撤回终止 | 详情页 | 已终止状态 | 调用undoTerminate接口 |
| 取消核销 | 取消已核销的明细 | 详情页 | 存在有效核销明细 | 调用clVerifyObsInvo接口，支持5种操作类型 |
| 作废发票 | 作废指定发票 | 详情页 | 存在有效发票 | 调用clVerifyObsInvo接口(actionType=obsInvoice) |
| 查询项目 | 查询可核销项目 | 详情页 | 常显 | 调用searchProject接口 |
| 查询出库单 | 查询可核销出库单 | 详情页 | 已选项目 | 调用searchOutBill接口 |
| 查询发票信息 | 查询可核销发票 | 详情页 | 已选项目 | 调用invoiceInfo接口 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：本次核销数量不可超过剩余可核销数量 —— 防止超额核销</KbSubTitle>

- 第1点：每行的本次核销数量(THIS_VERIFER_NUMBER)不可大于剩余可核销数量(SURPLUS_CAN_VERIFER_NUMBER)
- 第2点：本次核销数量小数位不可超过3位

<KbTip>阻断性报错</KbTip>

```sql
SELECT l.INVBILLNO, l.ITEM_CODE, l.SURPLUS_CAN_VERIFER_NUMBER, l.THIS_VERIFER_NUMBER
    FROM EPM_INVOICE_TRUTH_LINE l
    WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId}
      AND l.THIS_VERIFER_NUMBER > l.SURPLUS_CAN_VERIFER_NUMBER
```

<KbSubTitle>校验2：发货日期和产品编码校验 —— 确保核销行与出库单行匹配</KbSubTitle>

- 第1点：校验核销行的发货日期和产品编码与出库单行一致
- 第2点：调用checkDateAndItemCode方法校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT l.INVBILLNO, l.DATE_INVBILL, l.ITEM_CODE, iobl.INV_OUT_BILL_LINE_ID
    FROM EPM_INVOICE_TRUTH_LINE l
    JOIN INV_OUT_BILL_LINE iobl ON l.INV_OUT_BILL_LINE_ID = iobl.INV_OUT_BILL_LINE_ID
    WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId}
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：核销单必须存在有效明细行 —— 确保有核销数据可提交</KbSubTitle>

- 第1点：检查核销单下是否存在核销行数据
- 第2点：检查核销行是否存在本次核销数量&gt;0的记录

<KbTip>阻断性报错</KbTip>

```sql
SELECT COUNT(*) FROM EPM_INVOICE_TRUTH_LINE 
    WHERE INVOICE_TRUTH_ID = {invoiceTruthId} AND THIS_VERIFER_NUMBER > 0
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建stat=1] ──提交──> [审批中stat=3] ──审批通过──> [已审批stat=5]
                            │
                            └──审批驳回──> [已中断]
[任意状态] ──终止──> [已终止]
[已终止] ──撤回终止──> [原状态]
[审批中] ──取消核销──> [新建stat=1] (中断审批)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 1 | 新建 | 保存、提交、删除、终止、取消核销 |
| 3 | 审批中 | 终止、取消核销(中断审批) |
| 5 | 审批通过 | 终止、取消核销 |
| INTERRUPT | 审批驳回 | 终止、取消核销 |
| TERMINATED | 已终止 | 撤回终止 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_INVOICE_TRUTH_HEADER（真实性核销主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_TRUTH_ID | NUMBER | 核销单ID | - | 自增主键 |
| INVOICE_TRUTH_NO | VARCHAR | 核销单号 | 核销单号 | 按编码规则生成 |
| PROJECT_ID | NUMBER | 项目ID | - | 关联项目 |
| PROJECT_CODE | VARCHAR | 项目编码 | 项目编码 | 来源于项目 |
| PROJECT_NAME | VARCHAR | 项目名称 | 项目名称 | 来源于项目 |
| CONTRACT_ID | NUMBER | 合同ID | - | 关联合同 |
| CONTRACT_CODE | VARCHAR | 合同编码 | 合同编码 | 来源于合同 |
| CONTRACT_NAME | VARCHAR | 合同名称 | 合同名称 | 来源于合同 |
| CUSTOMER_ID | NUMBER | 客户ID | - | 关联经销商 |
| CUSTOMER_CODE | VARCHAR | 客户编码 | 经销商编码 | 来源于项目 |
| CUSTOMER_NAME | VARCHAR | 客户名称 | 经销商名称 | 来源于项目 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 关联交易公司 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | - | 来源于项目 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 来源于项目 |
| BILLING_UNIT_CODE | VARCHAR | 法人客户编码 | - | 来源于合同 |
| BILLING_UNIT_NAME | VARCHAR | 法人客户名称 | - | 来源于合同 |
| IS_HOME | NUMBER | 是否家装 | 是否家装 | 1-工程/2-家装 |
| VERIFER_TYPE | VARCHAR | 核销类型 | 核销类型 | 来源于核销发票上传单 |
| INVOICE_VERIFER_ID | NUMBER | 核销发票上传ID | - | 关联EPM_UPLOAD_INVOICE_VERIFER |
| INVOICE_VERIFER_NO | VARCHAR | 核销发票上传单号 | 核销发票上传单号 | 来源于核销发票上传单 |
| DISCOUNT_POLICY_ID | NUMBER | 折扣政策ID | - | 关联折扣政策 |
| DISCOUNT_POLICY_CODE | VARCHAR | 折扣政策编码 | - | 来源于折扣政策 |
| DISCOUNT_POLICY_NAME | VARCHAR | 折扣政策名称 | 折扣政策 | 来源于折扣政策 |
| STAT | NUMBER | 单据状态 | 单据状态 | 1-新建/3-审批中/5-审批通过 |
| WFID | NUMBER | 流程ID | - | 默认0 |
| WFFLAG | NUMBER | 流程标志 | - | 默认0 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审批状态 | NEW/RUN/APPROVED/INTERRUPT |
| HZ_INSTANCE_ID | NUMBER | 审批实例ID | - | 工作流返回 |
| AUDIT_STAT | VARCHAR | 审核状态 | - | 审核状态 |
| VERIFY_STAT | VARCHAR | 核销类型 | - | 核销类型 |

</KbCard>

<KbCard num="2" title="表2：EPM_INVOICE_TRUTH_LINE（真实性核销行表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_TRUTH_LINE_ID | NUMBER | 核销行ID | - | 自增主键 |
| INVOICE_TRUTH_ID | NUMBER | 核销单ID | - | 关联主表 |
| INVBILLNO | VARCHAR | ERP出库单号 | 出库单号 | 来源于出库单行 |
| DATE_INVBILL | DATE | 发货日期 | 发货日期 | 来源于出库单行 |
| ITEM_CODE | VARCHAR | 产品编码 | 产品编码 | 来源于出库单行 |
| ITEM_NAME | VARCHAR | 产品名称 | 产品名称 | 来源于出库单行 |
| ITEM_ID | NUMBER | 产品ID | - | 来源于出库单行 |
| QTY_BILL | NUMBER | 实发数量 | 实发数量 | 来源于出库单行 |
| INV_OUT_BILL_LINE_ID | NUMBER | 出库单行ID | - | 关联INV_OUT_BILL_LINE |
| CAN_VERIFER_NUMBER | VARCHAR | 可核销数量 | 可核销数量 | 来源于出库单行CAN_VERIFY_NUM |
| SURPLUS_CAN_VERIFER_NUMBER | VARCHAR | 剩余可核销数量 | 剩余可核销数量 | 来源于出库单行 |
| THIS_VERIFER_NUMBER | NUMBER | 本次核销数量 | 本次核销数量 | 手工录入 |
| INVOICE_NUMBER | VARCHAR | 发票号码 | 发票号码 | 来源于发票信息 |
| INVOICE_CODE | VARCHAR | 发票代码 | 发票代码 | 来源于发票信息 |
| VERIFER_END_DATE | DATE | 核销截止日 | 核销截止日 | 手工录入 |
| SUR_VERIFY_NUM | NUMBER | 出库单可核销数量 | - | 来源于出库单行 |
| CAN_VERIFY_NUM | NUMBER | 可核销数量 | - | 来源于出库单行 |

</KbCard>

<KbCard num="3" title="表3：EPM_VERIFER_INVOICE_DETAILS（核销发票明细表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PK_ID | NUMBER | 主键ID | - | 自增主键 |
| INVOICE_NUMBER | VARCHAR | 发票号码 | 发票号码 | 来源于核销发票上传 |
| INVOICE_CODE | VARCHAR | 发票代码 | 发票代码 | 来源于核销发票上传 |
| SERVICES_NAME | VARCHAR | 货物或服务名称 | 货物或服务名称 | 来源于核销发票上传 |
| SERVICES_CODE | VARCHAR | 产品编码 | 产品编码 | 来源于核销发票上传 |
| INVOICE_DETAILS_ID | NUMBER | 发票明细ID | - | 关联EPM_UPLOAD_INVOICE_DETAILS |
| VERIFER_INVOICE_DETAILS_ID | NUMBER | 核销发票信息ID | - | 序列EPM_VERIFER_INVOICE_DETAILS_S生成 |
| INVOICE_TRUTH_LINE_ID | NUMBER | 核销行ID | - | 关联EPM_INVOICE_TRUTH_LINE |
| CAN_VERIFER_NUMBER | VARCHAR | 可核销数量 | 可核销数量 | 来源于发票明细 |
| SURPLUS_CAN_VERIFER_NUMBER | VARCHAR | 剩余可核销数量 | 剩余可核销数量 | 来源于发票明细 |
| THIS_VERIFER_NUMBER | NUMBER | 本次核销数量 | 本次核销数量 | 来源于核销行 |
| UOM_RATE | VARCHAR | 转换率 | - | 单位转换率 |
| CONVERT_SUR_VERIFER_NUMBER | VARCHAR | 转换后剩余可核销数量 | - | 剩余可核销数量×转换率 |
| SEQ | NUMBER | 序号 | - | 行序号 |
| EFFECT_STATUS | VARCHAR | 有效状态 | 有效状态 | invalid/valid/canceled |
| CANCEL_OPERATOR | VARCHAR | 取消操作人 | 取消操作人 | 取消时记录当前用户 |
| CANCEL_TIME | DATE | 取消时间 | 取消时间 | 取消时记录当前时间 |
| CANCEL_TYPE | VARCHAR | 取消类型 | 取消类型 | invoice/invoiceDetail/invLine/veriferDetail/obsInvoice |
| UNIT_NAME_IS_AGREEMENT | NUMBER | 单位名称是否一致 | - | 0/1 |
| BILLING_NAME_IS_AGREEMENT | NUMBER | 开票名称是否一致 | - | 0/1 |
| DATE_IS_AGREEMENT | NUMBER | 日期是否一致 | - | 0/1 |

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
            <td style="color:#DC2626;font-weight:600;">本次核销数量的小数位不能超过3位</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">核销数量精度超限，需调整小数位</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">操作类型不能为空</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">actionType参数为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">对应列表id数组不能为空</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">idList参数为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">不支持xxx操作</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">actionType不在5种合法值范围内</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">核销取消数据为空</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">按条件查询不到可取消的核销明细</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">核销明细状态异常,请刷新数据后重试</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">更新canceled状态时影响行数与预期不一致</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">更新失败,取消后出库单行已核销数量小于0</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">取消数量大于出库单行已核销数量，数据不一致</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>本次核销数量的小数位不能超过3位</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>核销数量精度超限，需调整小数位</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>操作类型不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>actionType参数为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>对应列表id数组不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>idList参数为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>不支持xxx操作</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>actionType不在5种合法值范围内</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>核销取消数据为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>按条件查询不到可取消的核销明细</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>核销明细状态异常,请刷新数据后重试</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>更新canceled状态时影响行数与预期不一致</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>更新失败,取消后出库单行已核销数量小于0</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>取消数量大于出库单行已核销数量，数据不一致</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">取消核销后出库单行可核销数量未回加</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>updateClData中invLine为空(无审批通过的核销明细)，或分布式锁获取失败<br>
      <strong style="color:#7C3AED;">处理：</strong>`SELECT vid.VERIFER_INVOICE_DETAILS_ID, vid.EFFECT_STATUS, ith.HZ_APPROVE_STATUS FROM epm_verifer_invoice_details vid JOIN epm_invoice_truth_line itl ON vid.invoice_truth_line_id = itl.invoice_truth_line_id JOIN epm_invoice_truth_header ith ON ith.invoice_truth_id = itl.invoice_truth_id WHERE vid.EFFECT_STATUS IN ('invalid','valid') AND ith.HZ_APPROVE_STATUS IN ('NEW','RUN','APPROVED')`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批通过后出库单行核销数量未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>wfComplete回调未正确执行，或核销明细有效状态更新失败<br>
      <strong style="color:#7C3AED;">处理：</strong>检查EPM_VERIFER_INVOICE_DETAILS的EFFECT_STATUS是否为valid，检查INV_OUT_BILL_LINE的USED_VERIFY_NUM/CAN_VERIFY_NUM
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">作废发票后核销明细仍为valid</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>obsInvoice操作仅更新EPM_UPLOAD_INVOICE_INFO状态为obsolete，同时通过updateEffectStatusByInvoiceInfoIds更新关联明细<br>
      <strong style="color:#7C3AED;">处理：</strong>`SELECT vid.* FROM epm_verifer_invoice_details vid JOIN epm_upload_invoice_details euid ON euid.invoice_details_id = vid.invoice_details_id JOIN epm_upload_invoice_info uii ON euid.invoice_verifer_id = uii.invoice_verifer_id AND euid.invoice_number = uii.invoice_number AND euid.invoice_code = uii.invoice_code WHERE uii.invoice_info_id IN ({id1},{id2},...)`
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
| 2026-07-31 | - | - | 初始生成知识库文档 |
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
