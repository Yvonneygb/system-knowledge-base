<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">业务是什么</span>
    <h2>项目到款引入</h2>
    <p>将ERP回传的到款数据同步引入系统，作为后续认领、兑付与虚拟单的业务源头</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M2 12L6 8L10 10L14 4"/><path d="M11 4H14V7"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">为何要引入到款</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">解决两个业务诉求</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>统一口径</strong> — 将ERP到款集中引入，业务侧统一认领与核销</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>可追溯</strong> — 每笔引入记录来源与状态，便于核对账目</div></div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5V8L10 10"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">数据从哪来</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">两种引入方式</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>定时同步</strong> — 由接口按计划自动拉取ERP到款</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>手动同步</strong> — 按需触发，新增或更新到款记录</div></div>
      </div>
    </div>
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">流程</span>
    <h2>到款引入流程</h2>
    <p>从ERP接口获取数据到写入主表，形成可认领的到款记录</p>
  </div>
  <div class="biz-steps">
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8H11"/></svg></div>
      <h5>ERP接口获取</h5>
      <small>定时或手动<br>拉取ERP到款</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 8H10"/></svg></div>
      <h5>新建到款引入单</h5>
      <small>新增或更新<br>到款记录</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M2 12L6 8L10 10L14 4"/><path d="M11 4H14V7"/></svg></div>
      <h5>写入主表</h5>
      <small>记录来源与状态<br>进入可认领池</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5V8L10 10"/></svg></div>
      <h5>下游流转</h5>
      <small>供认领/兑付<br>虚拟单使用</small>
    </div>
  </div>
  <div class="kl-tip" style="margin-top:14px;">
    <strong>下游衔接：</strong>引入的到款记录是认领、商票兑付与虚拟到款单的业务源头，未认领部分按剩余可认款持续可用。
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">关键规则</span>
    <h2>到款引入的关键约束</h2>
    <p>认领状态受控，商票需兑付，剩余可认款动态计算</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><rect x="3" y="3" width="10" height="10" rx="2"/><path d="M6 8L7 9L10 6"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">同步引入</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">按来源标识新增或更新到款记录，已认领数据不重复引入覆盖。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M8 2L3 4V8C3 11 8 14 8 14C8 14 13 11 13 8V4Z"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">认领状态校验</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">已认领或已兑付的到款不可重复引入，避免账目冲突。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8H11"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">商票与可认款</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">商票类到款需兑付后方可用；剩余可认款按认领占用动态计算。</p>
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
  <h4 class="bf-main-title">项目到款引入 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ERP接口获取(定时/手动) → ★新建到款引入单★ → 写入主表EPM_PAYMENT_IMPORT → 结束（下游支撑认领/兑付/虚拟单）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
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
      <text x="175" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">ERP系统</text>
      <rect x="250" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="305" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">客户主数据</text>
      <rect x="380" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="435" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">交易公司</text>
      <rect x="510" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="565" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">事业部</text>
      <rect x="640" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="695" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">分布式锁</text>
      <line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="145" y="210" width="180" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="235" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">ERP接口获取(定时/手动)</text>
      <line x1="235" y1="250" x2="235" y2="266" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="155" y="266" width="160" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="235" y="290" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建到款引入单★</text>
      <text x="235" y="308" text-anchor="middle" fill="#DCFCE7" font-size="10">已存在更新/不存在新增·保存</text>
      <line x1="235" y1="320" x2="235" y2="344" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="140" y="344" width="190" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="369" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">写入主表EPM_PAYMENT_IMPORT</text>
      <line x1="235" y1="384" x2="235" y2="400" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="180" y="400" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="425" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="235" y1="440" x2="235" y2="560" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="560" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="582" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="300" y="596" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="375" y="619" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">项目到款认领</text>
      <rect x="525" y="596" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="619" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">兑付记录</text>
      <rect x="750" y="596" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="825" y="619" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">应收虚拟到款单</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#16A34A;"></span> 引入数据落地/下游前置</span>
  </div>
</div>
</div>
</div>
<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：ERP到款数据同步引入 [核心流程]">
<KbQuote>从ERP系统获取到款数据并同步到本系统，是到款引入功能的核心入口，支持定时任务自动同步和页面手动引入两种方式</KbQuote>

**具体逻辑**：

- 1、定时任务通过分布式锁(SYNC_PAYMENT_IMPORT_ERP)控制并发，同一时刻只允许一个同步任务执行
- 2、支持两种同步模式：按到款单号同步（最多100个，逗号分隔）和按时间范围同步（需同时指定开始和结束时间）
- 3、调用ERP接口时统一设置实例参数为ERP环境配置值，外部系统标识为"EPMS"，批次号为UUID
- 4、ERP返回数据逐条处理，每条独立事务，单条失败不影响其他数据，失败时记录日志
</KbCard>

<KbCard num="2" title="重点逻辑2：到款数据处理(新增/更新) [数据合并]">
<KbQuote>根据ERP返回的到款单ID判断系统中是否已存在该到款记录，已存在则更新关键字段，不存在则新增完整记录</KbQuote>

**具体逻辑**：

- 1、以外部系统到款单ID(ERP的receiptId)为唯一标识，查询系统中是否已存在该到款记录
- 2、已存在时，仅更新已认款金额、剩余可认款金额、认领状态、票据类型、引入状态，不覆盖其他字段
- 3、认领状态根据剩余可认款金额自动判断：剩余金额≤0则认领完成(CLEAR)，否则待认领(WAITING)
- 4、新增时需校验经销商、法人、交易公司、事业部四项基础数据是否在系统中存在，任一不存在则阻断报错
- 5、新增时根据票据类型自动设置兑付状态：商业承兑/银行承兑为未兑付(PENDING)，其他为已兑付(SUCCESS)
</KbCard>

<KbCard num="3" title="重点逻辑3：到款认领状态校验 [业务校验]">
<KbQuote>到款认领前校验到款单的引入状态，防止已撤销的到款单被认领</KbQuote>

**具体逻辑**：

- 1、校验到款单ID是否有效（非空且大于0）
- 2、校验到款单是否存在
- 3、引入状态为"信用卡拖欠款项冲销"、"暂停付款"、"冲销付款"、"资金不足"四种状态时，不允许认领，提示"该到款单已撤销，不允许认领！"
</KbCard>

<KbCard num="4" title="重点逻辑4：商票兑付 [业务操作]">
<KbQuote>商业承兑/银行承兑类型的到款单到期后需进行兑付操作，确认票据已兑现</KbQuote>

**具体逻辑**：

- 1、仅商业承兑/银行承兑类型的到款单可发起兑付，其他类型提示"非商票类型到款无需兑付！"
- 2、已兑付的到款单不允许重复兑付，提示"该商票已兑付！"
- 3、仅引入状态为"已核销"或"未核销"的到款单可发起兑付，其他状态提示"已核销、未核销的到款单才能发起兑付！"
- 4、兑付操作包含三步：更新兑付状态为SUCCESS → 将认领明细的可兑现标识改为Y → 插入兑付记录
</KbCard>

<KbCard num="5" title="重点逻辑5：剩余可认款金额计算 [金额计算]">
<KbQuote>认领时需实时获取到款单的剩余可认款金额，确保认领金额不超过可用余额</KbQuote>

**具体逻辑**：

- 1、虚拟到款单(BILL_TYPE=VIRTUAL_RECEIPT)通过本地SQL计算：收款金额 - 已认领金额（排除当前认领单自身的认领金额）
- 2、实际到款单(BILL_TYPE=RECEIPT)实时调用ERP接口获取最新数据，返回ERP的未核销金额
- 3、列表查询时，剩余可认款金额大于0的到款单排在前面（按剩余金额降序）
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：项目到款引入列表页">
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
<td>到款记录编号</td>
<td>文本框</td>
<td>ERP到款单编号，唯一标识一笔到款</td>
<td>常显</td>
<td>ERP引入时自动赋值，精确查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.PAYMENT_IMPORT_CODE</td>
</tr>
<tr>
<td>来源系统单号</td>
<td>文本框</td>
<td>来源系统的单据编号</td>
<td>常显</td>
<td>ERP引入时赋值为ERP到款单号，模糊查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.SOURCE_SYSTEM_NO</td>
</tr>
<tr>
<td>客户编码</td>
<td>文本框</td>
<td>CRM经销商编码</td>
<td>常显</td>
<td>ERP引入时根据CRM编码匹配客户信息自动带出，模糊查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>客户/经销商名称</td>
<td>常显</td>
<td>ERP引入时自动带出，模糊查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.CUSTOMER_NAME</td>
</tr>
<tr>
<td>收款公司编码</td>
<td>文本框</td>
<td>收款方交易公司编码</td>
<td>常显</td>
<td>ERP引入时自动带出，模糊查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.RECEIVE_UNIT_CODE</td>
</tr>
<tr>
<td>汇款单位编码</td>
<td>文本框</td>
<td>付款方单位编码</td>
<td>常显</td>
<td>ERP引入时自动带出，模糊查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.REMIT_UNIT_CODE</td>
</tr>
<tr>
<td>汇款单位名称</td>
<td>文本框</td>
<td>付款方单位名称</td>
<td>常显</td>
<td>ERP引入时自动带出，模糊查询</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.REMIT_UNIT_NAME</td>
</tr>
<tr>
<td>收款日期</td>
<td>日期选择器</td>
<td>ERP到款日期</td>
<td>常显</td>
<td>ERP引入时自动赋值，默认按收款日期降序排列</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.RECEIVE_DATE</td>
</tr>
<tr>
<td>收款金额</td>
<td>数字输入框</td>
<td>ERP到款总金额</td>
<td>常显</td>
<td>ERP引入时自动赋值</td>
<td>≥0</td>
<td>EPM_PAYMENT_IMPORT.RECEIVE_AMT</td>
</tr>
<tr>
<td>已认款金额</td>
<td>数字输入框</td>
<td>已被认领的金额合计</td>
<td>常显</td>
<td>ERP同步时更新为ERP的已核销金额</td>
<td>≥0</td>
<td>EPM_PAYMENT_IMPORT.CONFIRMED_AMT</td>
</tr>
<tr>
<td>剩余可认款金额</td>
<td>数字输入框</td>
<td>尚未被认领的可用金额</td>
<td>常显</td>
<td>ERP同步时更新为ERP的未核销金额，默认按降序排列</td>
<td>≥0</td>
<td>EPM_PAYMENT_IMPORT.UNALLOT_AMT</td>
</tr>
<tr>
<td>到款引入状态</td>
<td>文本框</td>
<td>到款单在ERP中的核销状态</td>
<td>常显</td>
<td>ERP引入时自动赋值，已生效排序在前</td>
<td>已生效/已失效/已核销/未核销/信用卡拖欠款项冲销/暂停付款/冲销付款/资金不足</td>
<td>EPM_PAYMENT_IMPORT.IMPORT_STAT</td>
</tr>
<tr>
<td>认领状态</td>
<td>文本框</td>
<td>本系统认领完成状态</td>
<td>常显</td>
<td>根据剩余可认款金额自动判断：≤0为CLEAR，&gt;0为WAITING</td>
<td>WAITING(待认领)/CLEAR(认领完成)</td>
<td>EPM_PAYMENT_IMPORT.ALLOT_STATUS</td>
</tr>
<tr>
<td>票据类型</td>
<td>文本框</td>
<td>到款单的票据承兑类型</td>
<td>常显</td>
<td>ERP引入时自动赋值</td>
<td>商业承兑/银行承兑/无需承兑</td>
<td>EPM_PAYMENT_IMPORT.ACCEPTANCE_TYPE</td>
</tr>
<tr>
<td>兑付状态</td>
<td>文本框</td>
<td>商票的兑付完成状态</td>
<td>常显</td>
<td>商票类型引入时默认PENDING，兑付后更新为SUCCESS</td>
<td>PENDING(未兑付)/SUCCESS(已兑付)</td>
<td>EPM_PAYMENT_IMPORT.PAYMENT_STATUS</td>
</tr>
<tr>
<td>到款单据类型</td>
<td>文本框</td>
<td>区分实际到款单和虚拟到款单</td>
<td>常显</td>
<td>ERP引入时默认RECEIPT，虚拟到款单为VIRTUAL_RECEIPT</td>
<td>RECEIPT(实际到款)/VIRTUAL_RECEIPT(虚拟到款)</td>
<td>EPM_PAYMENT_IMPORT.BILL_TYPE</td>
</tr>
<tr>
<td>事业部名称</td>
<td>文本框</td>
<td>到款单所属事业部</td>
<td>常显</td>
<td>ERP引入时自动带出</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.DIVISION_NAME</td>
</tr>
<tr>
<td>收款公司</td>
<td>文本框</td>
<td>收款方交易公司名称</td>
<td>常显</td>
<td>ERP引入时自动带出</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.RECEIVE_UNIT_NAME</td>
</tr>
<tr>
<td>打款说明</td>
<td>文本框</td>
<td>ERP到款单的备注说明</td>
<td>常显</td>
<td>ERP引入时自动赋值</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.PAYMENT_REMARK</td>
</tr>
<tr>
<td>创建人</td>
<td>文本框</td>
<td>到款记录创建人</td>
<td>常显</td>
<td>系统自动记录，列表展示时关联IAM_USER表获取真实姓名</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.CREATED_BY</td>
</tr>
<tr>
<td>币种名称</td>
<td>文本框</td>
<td>到款金额对应币种</td>
<td>常显</td>
<td>根据币别ID关联base_currency表获取</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.CURRENCY_NAME</td>
</tr>
<tr>
<td>CRM经销商编码</td>
<td>文本框</td>
<td>CRM系统中的经销商编码</td>
<td>常显</td>
<td>关联customer_org表获取</td>
<td>-</td>
<td>EPM_PAYMENT_IMPORT.CRM_CUST_CODE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：到款单号LOV选择 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| paymentImportCode | 到款记录编号 | 模糊搜索到款单号 | PI2026001 |
| remitUnitCode | 汇款单位编码 | 模糊搜索汇款单位 | CUST001 |
| remitUnitName | 汇款单位名称 | 模糊搜索汇款单位名称 | 某某公司 |
| serialNumber | 银行流水号 | 模糊搜索银行流水号 | SN2026001 |
| currencyName | 币种名称 | 模糊搜索币种 | 人民币 |
| divisionName | 事业部名称 | 模糊搜索事业部 | 工程事业部 |

**数据范围**

```sql
EPM_PAYMENT_IMPORT表中数据，支持按到款单号/汇款单位编码/汇款单位名称/银行流水号/币种名称/事业部名称模糊搜索
```

</KbCard>
<KbCard title="导入">
<KbSubTitle>前置约定</KbSubTitle>


- 本模块无Excel导入功能，到款数据通过ERP接口引入或定时任务同步


<KbSubTitle>字段映射</KbSubTitle>


| 字段含义 | 是否必输 | 字段格式 | 重复判定字段 |
|---------|---------|---------|------------|
| ERP到款单号(receiptNumber) | 是 | 字符串 | EXT_PAYMENT_IMPORT_ID(ERP的receiptId) |
| ERP到款单ID(receiptId) | 是 | 字符串 | EXT_PAYMENT_IMPORT_ID |
| 收款金额(amount) | 是 | 数值 | - |
| 已核销金额(appliedAmount) | 否 | 数值 | - |
| 未核销金额(unappliedAmount) | 否 | 数值 | - |
| 经销商编码(crmNum) | 是 | 字符串 | - |
| 法人编码(payFromCust) | 是 | 字符串 | - |
| 交易公司编码(ouCode) | 是 | 字符串 | - |
| 事业部名称(bu) | 是 | 字符串 | - |


<KbSubTitle>处理逻辑</KbSubTitle>


- **校验逻辑**：新增时校验经销商编码、法人编码、交易公司编码、事业部名称在系统中是否存在，任一不存在则阻断报错
- **导入逻辑**：按EXT_PAYMENT_IMPORT_ID匹配，已存在则更新（已认款金额/剩余可认款金额/认领状态/票据类型/引入状态），不存在则新增完整记录
- **重复处理策略**：已存在则更新（不跳过、不报错、不覆盖全量字段，仅更新关键金额和状态字段）
- **性能方案**：定时任务模式下每条ERP数据独立事务提交，单条失败不影响其他数据；页面引入为同步处理


<KbSubTitle>异常与结果约定</KbSubTitle>


- 单条处理失败时记录ERROR日志，不回滚其他已成功数据
- 定时任务模式：通过SchedulerTool反馈执行结果和错误信息
- 页面引入模式：失败时直接抛出CommonException，前端展示报错信息


<KbSubTitle>运维保障</KbSubTitle>


- 日志记录：LOGGER.error("同步ERP到款引入处理异常", e)记录每条处理异常
- 断点续传/重试机制：不支持断点续传，定时任务可按到款单号或时间范围重新执行同步


</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 获取ERP到款单 | 从ERP系统获取单笔到款数据并引入 | 列表页 | 需传入ERP到款单ID | 调用getErpPaymentData接口，返回到款记录ID |
| 兑现 | 对商票类型到款单发起兑付 | 列表页/详情页 | 票据类型为商业承兑或银行承兑，且兑付状态为未兑付，且引入状态为已核销或未核销 | 调用draftPayment接口，更新兑付状态为SUCCESS，认领明细可兑现标识改为Y，插入兑付记录 |
| 查询剩余可认款金额 | 实时获取到款单的剩余可认领金额 | 列表页 | 需选中到款记录 | 调用sur-amt-by-import接口，实际到款单实时查ERP，虚拟到款单本地计算 |
| 认领时获取可认领金额 | 认领操作时实时获取可认领金额 | 认领页面 | 需传入到款单ID和当前认领单ID | 调用getPaymentImportCanAllotAmt接口，排除当前认领单后计算剩余金额 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：经销商信息必须存在 —— 确保ERP返回的经销商编码在系统中有对应客户记录</KbSubTitle>

- 第1点：根据ERP返回的CRM经销商编码(crmNum)查询客户表
- 第2点：若查询结果为空，抛出异常："{到款单号}对账单对应经销商信息查询异常：{crmNum}"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM CUSTOMER WHERE CUSTOMER_CODE = '{crmNum}';
```

<KbSubTitle>校验2：法人信息必须存在 —— 确保ERP返回的汇款单位编码在系统中有对应客户记录</KbSubTitle>

- 第1点：根据ERP返回的汇款单位编码(payFromCust)查询客户表
- 第2点：若查询结果为空，抛出异常："{到款单号}对账单对应法人信息查询异常：{payFromCust}"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM CUSTOMER WHERE CUSTOMER_CODE = '{payFromCust}';
```

<KbSubTitle>校验3：交易公司信息必须存在 —— 确保ERP返回的交易公司编码在系统中有对应交易公司记录</KbSubTitle>

- 第1点：根据ERP返回的交易公司编码(ouCode)查询交易公司表
- 第2点：若查询结果为空，抛出异常："{到款单号}对账单对应交易公司信息查询异常：{ouCode}"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EPM_TRADING_COMPANY WHERE TRADING_COMPANY_CODE = '{ouCode}';
```

<KbSubTitle>校验4：事业部信息必须存在 —— 确保ERP返回的事业部名称在系统中有对应事业部记录</KbSubTitle>

- 第1点：根据ERP返回的事业部名称(bu)查询事业部基础设置表
- 第2点：若查询结果为空，抛出异常："{到款单号}对账单对应事业部信息查询异常：{bu}"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM DIVISION_BASE_SET WHERE DIVISION_NAME = '{bu}';
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：到款单引入状态校验 —— 防止已撤销的到款单被认领</KbSubTitle>

- 第1点：校验到款单ID有效（非空且大于0）
- 第2点：校验到款单记录存在
- 第3点：引入状态为"信用卡拖欠款项冲销"、"暂停付款"、"冲销付款"、"资金不足"时不允许认领

<KbTip>阻断性报错，提示"该到款单已撤销，不允许认领！"</KbTip>

```sql
SELECT PAYMENT_IMPORT_ID, PAYMENT_IMPORT_CODE, IMPORT_STAT
    FROM EPM_PAYMENT_IMPORT
    WHERE PAYMENT_IMPORT_ID = {paymentImportId};
```

<KbSubTitle>校验2：兑付前置校验 —— 确保兑付操作合法</KbSubTitle>

- 第1点：票据类型必须为"商业承兑"或"银行承兑"，否则提示"非商票类型到款无需兑付！"
- 第2点：兑付状态不能为"success"(已兑付)，否则提示"该商票已兑付！"
- 第3点：引入状态必须为"已核销"或"未核销"，否则提示"已核销、未核销的到款单才能发起兑付！"

<KbTip>阻断性报错</KbTip>

```sql
SELECT PAYMENT_IMPORT_ID, PAYMENT_IMPORT_CODE, ACCEPTANCE_TYPE, PAYMENT_STATUS, IMPORT_STAT
    FROM EPM_PAYMENT_IMPORT
    WHERE PAYMENT_IMPORT_ID = {paymentImportId};
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[ERP引入] ──→ 已生效/已失效/已核销/未核销
                    │
                    ├── 信用卡拖欠款项冲销 ──→ [禁止认领]
                    ├── 暂停付款 ──→ [禁止认领]
                    ├── 冲销付款 ──→ [禁止认领]
                    ├── 资金不足 ──→ [禁止认领]
                    │
                    ▼
            [认领状态]
            WAITING(待认领) ──→ CLEAR(认领完成)
                    │                  │
                    │                  │ (商票类型)
                    ▼                  ▼
            [兑付状态]            [兑付状态]
            PENDING(未兑付) ──→ SUCCESS(已兑付)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| IMPORT_STAT=已生效 | 到款单在ERP中有效 | 可认领、可查询 |
| IMPORT_STAT=已失效 | 到款单在ERP中已失效 | 不可认领 |
| IMPORT_STAT=已核销 | 到款单在ERP中已核销 | 可认领、商票可兑付 |
| IMPORT_STAT=未核销 | 到款单在ERP中未核销 | 可认领、商票可兑付 |
| IMPORT_STAT=信用卡拖欠款项冲销 | 到款单已撤销 | 禁止认领 |
| IMPORT_STAT=暂停付款 | 到款单已撤销 | 禁止认领 |
| IMPORT_STAT=冲销付款 | 到款单已撤销 | 禁止认领 |
| IMPORT_STAT=资金不足 | 到款单已撤销 | 禁止认领 |
| ALLOT_STATUS=WAITING | 待认领，剩余可认款金额>0 | 可发起认领 |
| ALLOT_STATUS=CLEAR | 认领完成，剩余可认款金额≤0 | 不可再认领 |
| PAYMENT_STATUS=PENDING | 商票未兑付 | 可发起兑付 |
| PAYMENT_STATUS=SUCCESS | 商票已兑付 | 不可重复兑付 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_PAYMENT_IMPORT（项目到款引入主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PAYMENT_IMPORT_ID | BIGINT | 到款记录单ID，主键 | - | 自增生成 |
| PAYMENT_IMPORT_CODE | VARCHAR | 到款记录编号 | 到款记录编号 | ERP引入时赋值为ERP到款单号 |
| ORGANIZATION_ID | BIGINT | 组织ID | - | ERP引入时根据事业部带出组织ID |
| SERIAL_NUMBER | VARCHAR | 银行流水号 | 银行流水号 | ERP引入时赋值 |
| RECEIVE_DATE | DATETIME | 收款日期 | 收款日期 | ERP引入时赋值，列表默认按此降序 |
| RECEIVE_AMT | DECIMAL | 收款金额 | 收款金额 | ERP引入时赋值 |
| BASE_CURRENCY_ID | BIGINT | 币别ID | - | ERP引入时赋值 |
| EXCHANGE_RATE | DECIMAL | 汇率 | 汇率 | 新增时默认0 |
| DIVISION_ID | BIGINT | 事业部ID | - | ERP引入时根据事业部名称匹配带出 |
| DIVISION_NAME | VARCHAR | 事业部名称 | 事业部名称 | ERP引入时赋值 |
| RECEIVE_UNIT_ID | BIGINT | 收款公司ID | - | ERP引入时根据交易公司编码匹配带出 |
| RECEIVE_UNIT_NAME | VARCHAR | 收款公司名称 | 收款公司 | ERP引入时赋值 |
| RECEIVE_UNIT_CODE | VARCHAR | 收款公司编码 | 收款公司编码 | ERP引入时赋值 |
| RECEIVE_BANK | VARCHAR | 收款银行 | 收款银行 | ERP引入时赋值 |
| RECEIVE_ACCOUNT | VARCHAR | 收款账号 | 收款账号 | ERP引入时赋值 |
| REMIT_UNIT_ID | BIGINT | 汇款单位ID | - | ERP引入时根据汇款单位编码匹配带出 |
| REMIT_UNIT_CODE | VARCHAR | 汇款单位编码 | 汇款单位编码 | ERP引入时赋值 |
| REMIT_UNIT_OLD_CODE | VARCHAR | 汇款单位旧编码 | - | 历史遗留字段 |
| REMIT_UNIT_NAME | VARCHAR | 汇款单位名称 | 汇款单位名称 | ERP引入时赋值 |
| REMIT_ACCOUNT | VARCHAR | 汇款账号 | - | ERP引入时赋值为payFromBank |
| PAYMENT_REMARK | VARCHAR | 打款说明 | 打款说明 | ERP引入时赋值 |
| STAT | INTEGER | 状态 | - | 新增时默认5 |
| CONFIRMED_AMT | DECIMAL | 已认款金额 | 已认款金额 | ERP同步时更新为ERP已核销金额 |
| UNALLOT_AMT | DECIMAL | 剩余可认款金额 | 剩余可认款金额 | ERP同步时更新为ERP未核销金额，列表按此降序 |
| CUSTOMER_ID | BIGINT | 客户ID | - | ERP引入时根据CRM编码匹配带出，NOT NULL |
| CUSTOMER_CODE | VARCHAR | 客户编码 | 客户编码 | ERP引入时赋值为CRM编码 |
| CUSTOMER_NAME | VARCHAR | 客户名称 | 客户名称 | ERP引入时赋值为CRM名称 |
| ORIGINAL_AMT | DECIMAL | 到款单实际收款总金额 | - | ERP引入时赋值 |
| EXT_ACCOUNT_ID | VARCHAR | 外部账户ID | - | ERP引入时赋值 |
| LINE_SERIAL_NUMBER | VARCHAR | 分配行流水号 | - | ERP引入时赋值为payFromBankName |
| CASH_FLOW_ITEM | VARCHAR | 现金流量表项 | - | ERP引入时赋值 |
| RECEIPT_TYPE | VARCHAR | 到款款项类型 | - | ERP引入时赋值(货款/保证金等) |
| RECEIPT_CATEGORY | VARCHAR | 到款款项类别 | - | ERP引入时赋值，与RECEIPT_TYPE相同 |
| DISTRIBUTION_DATE | DATETIME | 实际分配日期 | - | ERP引入时赋值 |
| ORDER_PDT_LINE | BIGINT | 产品线 | - | 新增时默认0 |
| CHANNEL | BIGINT | 渠道 | - | 新增时默认0 |
| EXT_PAYMENT_IMPORT_ID | VARCHAR | 外部系统到款单ID | - | ERP的receiptId，用于重复判定 |
| IS_HOME | BIGINT | 是否家装 | - | 新增时默认0(工程)，2为家装；查询时默认0 |
| IMPORT_STAT | VARCHAR | 到款引入状态 | 到款引入状态 | ERP引入时赋值，已生效排序在前 |
| IMPORT_DATE | DATETIME | 到款引入时间 | - | 引入时记录 |
| SOURCE_SYSTEM | VARCHAR | 来源系统 | - | ERP引入时固定"erp" |
| SOURCE_SYSTEM_NO | VARCHAR | 来源系统单号 | 来源系统单号 | ERP引入时赋值为ERP到款单号 |
| IS_BILL | BIGINT | 是否票据收款 | - | 值集字段 |
| DIFFBILL_ID | BIGINT | 送货签收单ID | - | 关联送货签收单 |
| BILL_TYPE | VARCHAR | 到款单据类型 | 到款单据类型 | ERP引入默认RECEIPT，虚拟到款单为VIRTUAL_RECEIPT |
| ORDER_HEADER_ID | VARCHAR | 销售退货单ID | - | 关联销售退货单 |
| VIRTUAL_CLAIM_STAT | VARCHAR | 虚拟单认领状态 | - | BEGINNING(未认领完成)/FINISH(认领完成) |
| PAYMENT_STATEMENT | VARCHAR | 到款说明 | - | 到款补充说明 |
| IS_CASHOUT | VARCHAR | 是否已兑现 | - | Y/N |
| CUSTOMER_TRX_ID | BIGINT | 应收事务处理ID | - | 关联应收事务 |
| ACCEPTANCE_TYPE | VARCHAR | 票据类型 | 票据类型 | 商业承兑/银行承兑/无需承兑 |
| PAYMENT_STATUS | VARCHAR | 兑付状态 | 兑付状态 | PENDING(未兑付)/SUCCESS(已兑付) |
| AUTO_ALLOT_FLAG | VARCHAR | 自动认领标识 | - | Y/N |
| ALLOT_STATUS | VARCHAR | 认领状态 | 认领状态 | WAITING(待认领)/CLEAR(认领完成) |
| IMPORT_STAT_SEQ | VARCHAR | 到款引入状态排序 | - | 已生效=1，其他=2，用于排序 |
| CREATOR_NAME | VARCHAR | 创建人名称 | 创建人 | 关联IAM_USER表获取REAL_NAME |
| CURRENCY | VARCHAR | 币种 | - | 关联customer_org表获取 |
| CRM_CUST_CODE | VARCHAR | CRM经销商编码 | CRM经销商编码 | 关联customer_org表获取 |
| CURRENCY_NAME | VARCHAR | 币种名称 | 币种名称 | 关联base_currency表获取 |
| PAYMENT_FLAG | BIGINT | 款项标识 | - | 业务标识字段 |
| CREATED_BY | BIGINT | 创建人ID | - | 审计字段，系统自动记录 |
| CREATION_DATE | DATETIME | 创建时间 | - | 审计字段，系统自动记录 |
| LAST_UPDATED_BY | BIGINT | 更新人ID | - | 审计字段，系统自动记录 |
| LAST_UPDATE_DATE | DATETIME | 更新时间 | - | 审计字段，系统自动记录 |
| OBJECT_VERSION_NUMBER | BIGINT | 版本号 | - | 乐观锁，系统自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_PAYMENT_IMPORT_RCD（到款引入兑付记录表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | BIGINT | 主键 | - | 自增生成 |
| PAYMENT_IMPORT_CODE | VARCHAR | 到款记录编号 | - | 兑付时赋值为到款单编号，NOT NULL |
| PAYMENT_DATE | DATE | 兑付时间 | - | 兑付操作时赋值为当前时间，NOT NULL |
| PAYMENT_OPERATOR | VARCHAR | 兑付操作员 | - | 兑付操作时赋值为当前用户ID，NOT NULL |
| CREATED | DATE | 创建时间 | - | 兑付时赋值为当前时间，NOT NULL |
| LAST_UPD | DATE | 更新时间 | - | 兑付时赋值为当前时间，NOT NULL |
| LAST_UPD_BY | VARCHAR | 更新人 | - | 兑付时赋值为当前用户ID，NOT NULL |
| CREATED_BY_BAK | VARCHAR | 创建人备份 | - | 兑付时赋值为当前用户ID |
| CREATION_DATE | DATETIME | 审计创建时间 | - | 系统自动记录 |
| CREATED_BY | BIGINT | 审计创建人ID | - | 系统自动记录 |
| LAST_UPDATED_BY | BIGINT | 审计更新人ID | - | 系统自动记录 |
| LAST_UPDATE_DATE | DATETIME | 审计更新时间 | - | 系统自动记录 |
| OBJECT_VERSION_NUMBER | BIGINT | 版本号 | - | 乐观锁 |

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
            <td style="color:#DC2626;font-weight:600;">{到款单号}对账单对应经销商信息查询异常：{crmNum}</td>
            <td style="font-size:13px;">ERP到款引入(新增)</td>
            <td style="font-size:13px;">ERP返回的经销商编码在系统客户表中不存在，需先在客户主数据中维护该经销商</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">{到款单号}对账单对应法人信息查询异常：{payFromCust}</td>
            <td style="font-size:13px;">ERP到款引入(新增)</td>
            <td style="font-size:13px;">ERP返回的汇款单位编码在系统客户表中不存在，需先在客户主数据中维护该法人</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">{到款单号}对账单对应交易公司信息查询异常：{ouCode}</td>
            <td style="font-size:13px;">ERP到款引入(新增)</td>
            <td style="font-size:13px;">ERP返回的交易公司编码在系统交易公司表中不存在，需先在交易公司中维护</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">{到款单号}对账单对应事业部信息查询异常：{bu}</td>
            <td style="font-size:13px;">ERP到款引入(新增)</td>
            <td style="font-size:13px;">ERP返回的事业部名称在系统事业部表中不存在，需先在事业部基础设置中维护</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未找到该erp的到款单</td>
            <td style="font-size:13px;">页面手动引入</td>
            <td style="font-size:13px;">ERP接口返回数据为空，确认ERP中是否存在该到款单</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">erp的到款单业务处理异常</td>
            <td style="font-size:13px;">页面手动引入</td>
            <td style="font-size:13px;">ERP返回数据后业务处理失败，查看后台日志定位具体原因</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该到款单已撤销，不允许认领！</td>
            <td style="font-size:13px;">到款认领</td>
            <td style="font-size:13px;">到款单引入状态为"信用卡拖欠款项冲销"/"暂停付款"/"冲销付款"/"资金不足"</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请传入到款单id</td>
            <td style="font-size:13px;">到款认领校验</td>
            <td style="font-size:13px;">调用认领校验接口时未传入到款单ID</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未找到该到款单</td>
            <td style="font-size:13px;">到款认领校验/认领金额查询</td>
            <td style="font-size:13px;">传入的到款单ID在系统中不存在</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未指定到款单id</td>
            <td style="font-size:13px;">认领金额查询</td>
            <td style="font-size:13px;">调用可认领金额接口时未传入到款单ID</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-10" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">非商票类型到款无需兑付！</td>
            <td style="font-size:13px;">兑付操作</td>
            <td style="font-size:13px;">到款单票据类型不是商业承兑或银行承兑</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-11" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该商票已兑付！</td>
            <td style="font-size:13px;">兑付操作</td>
            <td style="font-size:13px;">到款单兑付状态已为success</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-12" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">已核销、未核销的到款单才能发起兑付！</td>
            <td style="font-size:13px;">兑付操作</td>
            <td style="font-size:13px;">到款单引入状态不是"已核销"或"未核销"</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-13" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">编码最大支持100个</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">按到款编码同步时传入的编码数量超过100</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-14" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">开始时间-结束时间必须同时有值</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">按时间范围同步时开始时间或结束时间为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-15" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>{到款单号}对账单对应经销商信息查询异常：{crmNum}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ERP返回的经销商编码在系统客户表中不存在，需先在客户主数据中维护该经销商</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>{到款单号}对账单对应法人信息查询异常：{payFromCust}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ERP返回的汇款单位编码在系统客户表中不存在，需先在客户主数据中维护该法人</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>{到款单号}对账单对应交易公司信息查询异常：{ouCode}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ERP返回的交易公司编码在系统交易公司表中不存在，需先在交易公司中维护</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>{到款单号}对账单对应事业部信息查询异常：{bu}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ERP返回的事业部名称在系统事业部表中不存在，需先在事业部基础设置中维护</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到该erp的到款单</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ERP接口返回数据为空，确认ERP中是否存在该到款单</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>erp的到款单业务处理异常</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ERP返回数据后业务处理失败，查看后台日志定位具体原因</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该到款单已撤销，不允许认领！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>到款单引入状态为"信用卡拖欠款项冲销"/"暂停付款"/"冲销付款"/"资金不足"</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请传入到款单id</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>调用认领校验接口时未传入到款单ID</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到该到款单</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>传入的到款单ID在系统中不存在</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-10" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未指定到款单id</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>调用可认领金额接口时未传入到款单ID</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-11" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>非商票类型到款无需兑付！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>到款单票据类型不是商业承兑或银行承兑</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-12" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该商票已兑付！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>到款单兑付状态已为success</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-13" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>已核销、未核销的到款单才能发起兑付！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>到款单引入状态不是"已核销"或"未核销"</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-14" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>编码最大支持100个</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>按到款编码同步时传入的编码数量超过100</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-15" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>开始时间-结束时间必须同时有值</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>按时间范围同步时开始时间或结束时间为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">ERP到款数据引入后金额与ERP不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>实际到款单的剩余可认款金额在认领时会实时查ERP接口获取最新值，若ERP端数据已变更但本系统未重新同步，列表展示的金额可能不是最新。排查SQL：<br>
      <strong style="color:#7C3AED;">处理：</strong>通过定时任务或页面手动引入重新同步该到款单数据
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">到款引入定时任务执行失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>分布式锁(SYNC_PAYMENT_IMPORT_ERP)等待超时(5秒)，可能存在其他同步任务正在执行；或ERP接口调用超时/返回异常<br>
      <strong style="color:#7C3AED;">处理：</strong>等待当前任务完成后重试；检查ERP接口连通性；查看后台日志ERROR信息
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">认领时提示到款单已撤销</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>到款单引入状态为"信用卡拖欠款项冲销"/"暂停付款"/"冲销付款"/"资金不足"之一。排查SQL：<br>
      <strong style="color:#7C3AED;">处理：</strong>确认ERP端该到款单状态是否正确，若ERP端状态已恢复需重新同步引入状态
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">商票兑付按钮不可点击</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>需同时满足三个条件：票据类型为商业承兑/银行承兑、兑付状态为未兑付、引入状态为已核销/未核销。排查SQL：<br>
      <strong style="color:#7C3AED;">处理：</strong>逐项检查三个条件是否满足，不满足则先处理前置条件
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
| 2026-01-10 | - | - | 新增EpmPaymentImportRcd兑付记录表及兑付功能 |
| 2026-01-06 | - | Edison | 新增PaymentImportErpJob定时任务，支持分布式锁控制并发 |
| 2025-12-02 | - | tzx | 初始创建PaymentImportServiceImpl到款引入核心逻辑 |
| 2025-11-13 | - | - | 初始创建EpmPaymentImport实体类 |
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
