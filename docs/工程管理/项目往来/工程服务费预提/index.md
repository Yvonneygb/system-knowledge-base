<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">业务是什么</span>
    <h2>工程服务费预提</h2>
    <p>按月将已签收出库对应的服务费提前入账，占用共享预算，避免人工遗漏与跨期差异</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M2 12L6 8L10 10L14 4"/><path d="M11 4H14V7"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">为何要做预提</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">解决两个业务痛点</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>跨期差异</strong> — 出库签收在前、费用入账在后，按月预提使费用与收入同期匹配</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;"><div style="font-size:.75rem;"><strong>人工遗漏</strong> — 定时任务自动汇总，避免财务逐单手工计提</div></div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5V8L10 10"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">预提数据从哪来</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">三个关键来源</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>出库签收</strong> — 以交易公司+法人客户+年月+成本中心+费用科目汇总服务费</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>事业部设置</strong> — 提供组织与费用口径的基础配置</div></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;"><div style="font-size:.75rem;"><strong>共享接口</strong> — 预提数据最终推送至财务共享系统</div></div>
      </div>
    </div>
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">流程</span>
    <h2>预提单据全流程</h2>
    <p>从生成预提数据到推送共享占用预算，再到审批中的状态流转</p>
  </div>
  <div class="biz-steps">
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 7L8 9L10 6"/></svg></div>
      <h5>生成预提数据</h5>
      <small>定时或手工按年月<br>汇总出库签收数据</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M3 4H13V12H3Z"/><path d="M6 8H10"/></svg></div>
      <h5>新建服务费预提单</h5>
      <small>新建单据并保存<br>生成共享单号与预提单号</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8H11"/></svg></div>
      <h5>执行推共享</h5>
      <small>推送预提数据至<br>共享系统占用预算</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5V8L10 10"/></svg></div>
      <h5>共享处理成功</h5>
      <small>共享返回成功<br>单据状态转为审批中</small>
    </div>
  </div>
  <div class="kl-tip" style="margin-top:14px;">
    <strong>失败处理：</strong>若共享返回失败，预提单可作废并重新生成，重新生成时按原年月重新汇总，避免重复入账。
  </div>
</div>

<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);">关键规则</span>
    <h2>预提与作废的核心规则</h2>
    <p>同一口径下避免重复生成，作废冲销走负数回冲，重新生成受状态约束</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><rect x="3" y="3" width="10" height="10" rx="2"/><path d="M6 8L7 9L10 6"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">按月汇总生成</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">按交易公司+法人客户+年月+成本中心+费用科目维度汇总出库签收服务费，自动生成预提单。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><path d="M4 8L8 4L12 8"/><path d="M8 4V12"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">防重复生成</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">同口径下已存在非作废预提单则跳过；存在保存态预提单则更新金额，不重复建单。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8H11"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">作废冲销重生成</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">作废时推送负数金额冲销预算，作废单可按原年月重新生成新预提单。</p>
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
  <h4 class="bf-main-title">工程服务费预提 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → 生成预提数据(定时/手工) → ★新建服务费预提单★ → 执行推共享 → ⚖共享处理成功？ → 状态审批中 / 失败则作废重生成 → 结束</p>
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
      <text x="175" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">出库签收数据</text>
      <rect x="250" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="305" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">事业部设置</text>
      <rect x="380" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="435" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则</text>
      <rect x="510" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="565" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">共享接口</text>
      <rect x="640" y="56" width="110" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="695" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">LOV配置</text>
      <line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="235" y1="194" x2="235" y2="210" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="155" y="210" width="160" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="235" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">生成预提数据(定时/手工)</text>
      <line x1="235" y1="250" x2="235" y2="266" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="155" y="266" width="160" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="235" y="290" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建服务费预提单★</text>
      <text x="235" y="308" text-anchor="middle" fill="#DCFCE7" font-size="10">生成共享/预提单号·保存</text>
      <line x1="235" y1="320" x2="235" y2="336" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="150" y="336" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="361" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">执行推共享(推送接口)</text>
      <line x1="235" y1="376" x2="235" y2="392" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="235,392 305,432 235,472 165,432" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="436" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 共享处理成功？</text>
      <line x1="235" y1="472" x2="235" y2="488" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="150" y="488" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="513" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">状态→审批中(AUDITING)</text>
      <line x1="235" y1="528" x2="235" y2="544" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="180" y="544" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="569" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="235" y1="584" x2="235" y2="600" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <line x1="305" y1="432" x2="430" y2="432" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="380" y="417" width="100" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="430" y="436" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">失败/重生成✗</text>
      <line x1="430" y1="432" x2="430" y2="293" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="430" y1="293" x2="315" y2="293" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
      <rect x="50" y="600" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="622" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="275" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="350" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">财务共享FSCC</text>
      <rect x="500" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="575" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">预提单状态流转</text>
      <rect x="725" y="638" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="800" y="661" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">重算预提数据</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 共享处理失败/重生成</span>
  </div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：定时任务自动生成预提数据 定时生成">
<KbQuote>按月自动汇总出库单签收数据，生成服务费预提单，避免人工遗漏</KbQuote>

**具体逻辑**：

- 1、定时任务WithholdingInProjectJob支持三种模式：指定单月(syncFlag=1)、指定时间段(syncFlag=2)、全量(syncFlag=3)
- 2、从expense_withholding_view视图查询预提数据，按交易公司+法人客户+年月+成本中心+费用科目维度汇总
- 3、同一交易公司+法人+年月+成本中心维度下，若已存在非作废状态的预提单则跳过；若存在保存状态的预提单则更新金额
- 4、新生成的预提单初始状态为保存(SAVE)，自动生成共享单号和预提单号
</KbCard>

<KbCard num="2" title="重点逻辑2：执行推送共享 执行">
<KbQuote>将预提数据推送到共享系统进行预算占用，实现财务预提入账</KbQuote>

**具体逻辑**：

- 1、推送前校验单据编码、年月、交易公司不能为空
- 2、按共享单号查询所有预提明细，汇总不含税金额作为推送总金额
- 3、推送数据包含头信息和行明细，头信息含总金额、申请人、审批日期(取年月最后一天)；行明细含每条预提记录的金额、成本中心、费用科目等
- 4、执行时attribute1=1(正向)，作废时attribute1=2(冲销)，作废时金额取负数，共享单号追加_F后缀
- 5、共享接口返回状态为S则成功，否则报错展示共享返回的错误信息
</KbCard>

<KbCard num="3" title="重点逻辑3：作废与重新生成 作废">
<KbQuote>对已生成的预提单进行作废冲销，并支持按原年月重新生成</KbQuote>

**具体逻辑**：

- 1、作废时推送负数金额到共享系统，共享单号追加_F后缀以区分
- 2、重新生成前校验该年月下是否已存在非作废状态的预提单，若存在则报错提示无需重复生成
- 3、重新生成时syncFlag=1，按指定年月重新从视图查询数据并生成新预提单
- 4、作废和执行共用同一推送逻辑(operateExpenseWithholding)，通过flag参数区分(1=作废,0=执行)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：工程服务费预提列表页">
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
<td>共享单号</td>
<td>文本框</td>
<td>推送共享系统的单据编号</td>
<td>常显</td>
<td>新增时按编码规则AE.SHARE_NO自动生成，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.SHARE_NO</td>
</tr>
<tr>
<td>预提单号</td>
<td>文本框</td>
<td>系统内部预提单编号</td>
<td>常显</td>
<td>新增时按编码规则AE.WITHHOLDING_NO自动生成，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_NO</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>法人客户编码</td>
<td>文本框</td>
<td>法人客户编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>法人客户名称</td>
<td>文本框</td>
<td>法人客户名称</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>预提年度</td>
<td>文本框</td>
<td>预提所属年度</td>
<td>常显</td>
<td>来源于出库签收数据的年月，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_YEAR</td>
</tr>
<tr>
<td>预提月份</td>
<td>文本框</td>
<td>预提所属月份</td>
<td>常显</td>
<td>来源于出库签收数据的年月，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_MONTH</td>
</tr>
<tr>
<td>预提总额(含税)</td>
<td>数值框</td>
<td>预提含税总额</td>
<td>常显</td>
<td>来源于出库签收汇总，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_RAX_AMOUNT</td>
</tr>
<tr>
<td>预提总额(不含税)</td>
<td>数值框</td>
<td>预提不含税总额</td>
<td>常显</td>
<td>来源于出库签收汇总，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_NORAX_AMOUNT</td>
</tr>
<tr>
<td>成本中心编码</td>
<td>文本框</td>
<td>成本中心编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.COST_CODE</td>
</tr>
<tr>
<td>成本中心名称</td>
<td>文本框</td>
<td>成本中心名称</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.COST_NAME</td>
</tr>
<tr>
<td>费用科目编码</td>
<td>文本框</td>
<td>费用科目编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.FEECODE</td>
</tr>
<tr>
<td>单据状态</td>
<td>下拉选择框</td>
<td>预提单状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>0-保存/3-审批中/7-作废</td>
<td>EXPENSE_WITHHOLDING_HEAD.BILL_STATUS</td>
</tr>
<tr>
<td>是否家装</td>
<td>单选框</td>
<td>是否家装合同</td>
<td>常显</td>
<td>来源于出库签收数据，2=家装</td>
<td>1-工程/2-家装</td>
<td>EXPENSE_WITHHOLDING_HEAD.IS_HOME</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>备注</td>
<td>常显</td>
<td>默认空，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.REMARK</td>
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
| 执行 | 推送预提数据到共享系统 | 详情页 | 单据状态=保存 | 调用/v1/{orgId}/expense-withholding-heads/execute，推送成功后状态→审批中 |
| 作废 | 推送作废数据(负数金额)到共享系统 | 详情页 | 单据状态=保存或审批中 | 调用/v1/{orgId}/expense-withholding-heads/invalid，推送成功后状态→审批中 |
| 重新生成 | 对作废的预提单按原年月重新生成 | 详情页 | 单据状态=作废 | 调用/v1/{orgId}/expense-withholding-heads/regenerate，生成新的预提单 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：重新生成时校验是否已存在非作废状态的预提单 —— 防止重复生成</KbSubTitle>

- 第1点：按年月+交易公司编码查询EXPENSE_WITHHOLDING_HEAD表中bill_status!=7的记录
- 第2点：若存在则报错提示"已存在重新生成【xxx】单据，无需重复生成"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EXPENSE_WITHHOLDING_HEAD 
    WHERE TO_CHAR(CHECK_TIME, 'yyyy-MM') = '{年月}' 
      AND TRADING_COMPANY_CODE = '{交易公司编码}' 
      AND NVL(BILL_STATUS, 0) != 7
```

<KbSubTitle>校验2：执行/作废时校验必填参数 —— 确保推送数据完整</KbSubTitle>

- 第1点：单据编码不能为空
- 第2点：年月不能为空
- 第3点：交易公司不能为空

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EXPENSE_WITHHOLDING_HEAD WHERE SHARE_NO = '{共享单号}'
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[保存SAVE] ──执行──> [审批中AUDITING]
[保存SAVE] ──作废──> [审批中AUDITING] (作废冲销)
[审批中AUDITING] ──作废──> [审批中AUDITING] (作废冲销)
[任意状态] ──定时任务检测到作废──> [作废INVALID]
[作废INVALID] ──重新生成──> [保存SAVE] (新单据)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 0 | 保存 | 执行、作废 |
| 3 | 审批中 | 作废 |
| 7 | 作废 | 重新生成 |

---

</KbCard>
<KbCard num="1" title="表1：EXPENSE_WITHHOLDING_HEAD（工程服务费预提主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| WITHHOLDING_HEAD_ID | NUMBER | 预提主键ID | - | 自增主键 |
| WITHHOLDING_NO | VARCHAR | 预提单号 | 预提单号 | 按编码规则AE.WITHHOLDING_NO生成 |
| SHARE_NO | VARCHAR | 共享单号 | 共享单号 | 按编码规则AE.SHARE_NO生成，作废时追加_F后缀 |
| DIVISION_ID | NUMBER | 事业部ID | - | 来源于出库签收数据 |
| ORGANIZATION_ID | NUMBER | 组织ID | - | 来源于出库签收数据 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 来源于出库签收数据 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | 来源于出库签收数据 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司名称 | 来源于出库签收数据 |
| BILLING_UNIT_CODE | VARCHAR | 法人客户编码 | 法人客户编码 | 来源于出库签收数据 |
| BILLING_UNIT_NAME | VARCHAR | 法人客户名称 | 法人客户名称 | 来源于出库签收数据 |
| WITHHOLDING_YEAR | VARCHAR | 预提年度 | 预提年度 | 来源于签收数据的年月 |
| WITHHOLDING_MONTH | VARCHAR | 预提月份 | 预提月份 | 来源于签收数据的年月 |
| CHECK_TIME | DATE | 审批通过时间 | - | 签收审批通过时间 |
| WITHHOLDING_RAX_AMOUNT | NUMBER | 预提含税总额 | 预提总额(含税) | 服务费×预提比例(含税) |
| WITHHOLDING_NORAX_AMOUNT | NUMBER | 预提不含税总额 | 预提总额(不含税) | 服务费×预提比例(不含税) |
| COST_CODE | VARCHAR | 成本中心编码 | 成本中心编码 | 来源于出库签收数据 |
| COST_NAME | VARCHAR | 成本中心名称 | 成本中心名称 | 来源于出库签收数据 |
| FEECODE | VARCHAR | 费用科目编码 | 费用科目编码 | 来源于出库签收数据 |
| BILL_STATUS | NUMBER | 单据状态 | 单据状态 | 0-保存/3-审批中/7-作废 |
| GENERATED_TIMES | NUMBER | 重新生成次数 | - | 默认0，每次重新生成+1 |
| IS_HOME | NUMBER | 是否家装 | 是否家装 | 1-工程/2-家装 |
| REMARK | VARCHAR | 备注 | 备注 | 默认空 |
| ATTRIBUTE1~5 | VARCHAR | 弹性字段 | - | 扩展字段 |

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
            <td style="color:#DC2626;font-weight:600;">已存在重新生成【xxx】单据，无需重复生成！</td>
            <td style="font-size:13px;">重新生成</td>
            <td style="font-size:13px;">该年月下已存在非作废状态的预提单，不可重复生成。需先作废现有预提单后再重新生成</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">参数错误！</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">传入的DTO对象为null</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">单据编码不能为空</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享单号为空，需检查预提单数据完整性</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">年月不能为空</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">审批通过时间为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">交易公司不能为空</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">交易公司编码为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未查询到预提单数据，单据号：xxx</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">按共享单号查询不到预提单数据，可能数据已被删除</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">共享接口返回null,执行共享接口失败！</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享接口调用失败，检查共享系统连通性</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">共享返回的错误信息</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享系统处理失败，根据具体错误信息排查</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请传入正确的同步时间段</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">定时任务参数startDate/endDate格式错误或为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">时间参数格式不符合yyyy-MM</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-10" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>已存在重新生成【xxx】单据，无需重复生成！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>该年月下已存在非作废状态的预提单，不可重复生成。需先作废现有预提单后再重新生成</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>参数错误！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>传入的DTO对象为null</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>单据编码不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享单号为空，需检查预提单数据完整性</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>年月不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>审批通过时间为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>交易公司不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>交易公司编码为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未查询到预提单数据，单据号：xxx</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>按共享单号查询不到预提单数据，可能数据已被删除</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>共享接口返回null,执行共享接口失败！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享接口调用失败，检查共享系统连通性</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>共享返回的错误信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享系统处理失败，根据具体错误信息排查</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请传入正确的同步时间段</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>定时任务参数startDate/endDate格式错误或为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-10" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>时间参数格式不符合yyyy-MM</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">定时任务执行后未生成预提数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>expense_withholding_view视图中无对应年月的出库签收数据，或DIVISION_BASE_SET中无对应事业部配置<br>
      <strong style="color:#7C3AED;">处理：</strong>1)检查视图数据`SELECT * FROM expense_withholding_view WHERE check_time = '{年月}'`; 2)检查事业部配置`SELECT * FROM division_base_set WHERE organization_id IN (...)`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">执行推送共享后状态未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>共享接口返回成功但updateBillStatus执行异常，或共享单号对应多条记录<br>
      <strong style="color:#7C3AED;">处理：</strong>`SELECT * FROM EXPENSE_WITHHOLDING_HEAD WHERE SHARE_NO = '{共享单号}'`检查记录状态
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
