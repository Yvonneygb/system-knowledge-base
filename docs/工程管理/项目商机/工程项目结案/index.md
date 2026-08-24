<BreadcrumbTabs />
<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
    <h2>工程项目结案是什么</h2>
    <p>对已履约完毕的工程合同或工程项目进行收尾，关闭其后续业务流转</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6d28d9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="5" height="12" rx="1" stroke="white" stroke-width="1.5"/><rect x="9" y="2" width="5" height="7" rx="1" stroke="white" stroke-width="1.5"/><path d="M9 12H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">结案解决什么</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">两种结案方式</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>合同结案</strong> — 对单个工程合同及其增补合同收尾，标记结案日期与结案类型。</div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>项目结案</strong> — 对整项目收尾，其下已审批通过的合同一并失效，并更新项目进度为结案阶段。</div>
        </div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0ea5e9,#0284c7);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5" stroke="white" stroke-width="1.5"/><path d="M8 5V8L10 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">结案后的影响</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">状态收口与联动</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>状态失效</strong> — 结案后对应合同与项目有效状态置为失效，不再参与后续业务流转。</div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>下游联动</strong> — 结案结果回写项目档案、推送 CRM 系统，供项目透视与结案状态查询使用。</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 流程</span>
    <h2>结案如何流转</h2>
    <p>创建结案单 → 提交审批 → 审批通过后执行收尾逻辑</p>
  </div>
  <div class="biz-steps">
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8H13M8 3V13" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
      <h5>创建结案单</h5>
      <small>选择结案类型(合同/项目)<br>填写说明并保存</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#f97316,#ea580c);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3V7H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 13V9H10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 7C4 10 6 12 8 12C10 12 12 10 13 8" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
      <h5>提交审批</h5>
      <small>发起工作流审批<br>拒绝则修改后重提</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#16a34a,#15803d);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="5" height="5" rx="1" stroke="white" stroke-width="1.5"/><path d="M3 6.5L4.5 8L7 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h5>执行收尾</h5>
      <small>置失效·回写结案信息<br>更新项目进度</small>
    </div>
    <div class="biz-step-arrow">&rarr;</div>
    <div class="biz-step-item">
      <div class="biz-step-circle" style="background:linear-gradient(135deg,#0ea5e9,#0284c7);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12L6 8L10 10L14 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h5>推送联动</h5>
      <small>同步 CRM 系统<br>供项目透视与结案查询</small>
    </div>
  </div>
</div>
</div>
</div>
</div>
<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">工程项目结案 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★创建结案单★ → ⚖结案类型？ → 提交工作流·⚖审批通过？ → 执行结案逻辑/更新进度/推送CRM → 结束（拒绝则修改重提）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 990" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="77" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="126" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工程合同</text>
      <rect x="235" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="284" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">项目档案</text>
      <rect x="393" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="442" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">阶段定义</text>
      <rect x="551" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
      <rect x="709" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="758" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">CRM系统</text>
      <rect x="867" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="916" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">出库单</text>
      <rect x="1025" y="56" width="98" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="1074" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">结案值集</text>
      <line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="540" y="150" width="120" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="600" y1="194" x2="600" y2="230" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="470" y="230" width="260" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="600" y="254" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★创建结案单★</text>
      <text x="600" y="272" text-anchor="middle" fill="#DCFCE7" font-size="10">选结案类型·填说明·保存</text>
      <line x1="600" y1="284" x2="600" y2="320" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="600,320 670,350 600,380 530,350" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="354" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 结案类型？</text>
      <line x1="530" y1="350" x2="450" y2="350" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="300" y="330" width="150" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="375" y="355" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">项目结案(1)</text>
      <line x1="375" y1="370" x2="375" y2="450" stroke="#16A34A" stroke-width="1.5"/>
      <line x1="375" y1="450" x2="600" y2="450" stroke="#16A34A" stroke-width="1.5" marker-end="url(#arr-green)"/>
      <line x1="670" y1="350" x2="750" y2="350" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="750" y="330" width="150" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="825" y="355" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">合同结案(2)</text>
      <line x1="825" y1="370" x2="825" y2="450" stroke="#16A34A" stroke-width="1.5"/>
      <line x1="825" y1="450" x2="600" y2="450" stroke="#16A34A" stroke-width="1.5" marker-end="url(#arr-green)"/>
      <rect x="505" y="410" width="190" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="600" y="435" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">提交工作流·CONTRACT_COMPLETED_MAIN</text>
      <line x1="600" y1="450" x2="600" y2="480" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <polygon points="600,480 670,510 600,540 530,510" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="514" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
      <line x1="670" y1="510" x2="700" y2="510" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="700" y="496" width="80" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="740" y="515" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>
      <line x1="700" y1="510" x2="460" y2="510" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="460" y1="510" x2="460" y2="450" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="460" y1="450" x2="600" y2="450" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
      <line x1="600" y1="540" x2="600" y2="580" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="505" y="580" width="190" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="600" y="605" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">执行结案逻辑</text>
      <line x1="600" y1="620" x2="600" y2="650" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="505" y="650" width="190" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="600" y="675" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">更新项目进度(项目结案)</text>
      <line x1="600" y1="690" x2="600" y2="720" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="505" y="720" width="190" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="600" y="745" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">推送CRM·validStatus=0</text>
      <line x1="600" y1="760" x2="600" y2="790" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="540" y="790" width="120" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="817" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="600" y1="834" x2="600" y2="860" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="860" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="882" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="85" y="898" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="160" y="921" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">工程合同</text>
      <rect x="305" y="898" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="380" y="921" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">项目档案</text>
      <rect x="525" y="898" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="921" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">CRM系统推送</text>
      <rect x="745" y="898" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="820" y="921" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">项目透视</text>
      <rect x="965" y="898" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="1040" y="921" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">结案状态查询</text>
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
<KbCard title="1. 合同结案(actionType=2)核心逻辑"><ul><li>将目标合同的结案日期设为当前时间，结案类型设为提交时选择的值，有效状态设为失效(3)</li><li>查询该合同下所有增补合同(主合同ID=当前合同ID)，批量更新增补合同的结案日期和结案类型</li><li><strong>增补合同不会更新有效状态</strong>，仅更新结案日期和结案类型</li></ul></KbCard>
<KbCard title="2. 项目结案(actionType=1)核心逻辑"><ul><li>查询项目下所有审批状态为"审批通过"的合同，批量更新有效状态为失效(3)、结案日期为当前时间、结案类型为提交时选择的值</li><li>将项目报备的有效状态设为失效(3)，项目进度状态设为2，记录结案时间</li></ul></KbCard>
<KbCard title="3. 项目进度更新"><ul><li>查询阶段定义表中阶段名称为"项目结案"的记录，获取阶段ID</li><li>调用项目阶段服务更新进度，内容格式为: <code>{日期}项目结案</code></li></ul></KbCard>
<KbCard title="4. CRM推送"><ul><li>查询项目关联的报备记录，获取客户信息</li><li>推送数据包含: 客户编码、客户名称、客户简称、组织编码、报备编号、项目名称、有效状态(0=失效)</li><li>推送失败仅记录日志，不影响结案主流程</li></ul></KbCard>
<KbCard title="5. 增补合同结案字段重置"><ul><li>新增增补合同时，结案日期和结案状态会被重置为空</li></ul></KbCard>
<KbCard title="6. 前端展示逻辑"><ul><li>结案日期和结案状态字段均为只读(disabled=true)，由后端结案审批通过后自动回写</li><li>列表页支持按结案状态筛选查询</li><li>结案状态值为0时，前端转换为null不展示</li></ul></KbCard>
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
<KbCard title="API接口"><table class="kl-table"><thead><tr><th>方法</th><th>路径</th><th>说明</th></tr></thead><tbody><tr><td>GET</td><td><code>/v1/{organizationId}/epm-contract-completeds/detail</code></td><td>查询结案详情(关联合同列表+出库明细)</td></tr></tbody></table></KbCard>
<KbCard title="detail接口逻辑"><p><strong>入参:</strong> <code>EpmContractCompletedDTO</code>，关键字段: <code>flag</code>、<code>actionType</code>、<code>contractId</code>、<code>projectId</code></p>
<p>#### 场景1: flag=9 且 actionType=2 (合同结案查询)</p>
<p>1. 根据 <code>contractId</code> 查询主合同下所有增补合同列表 2. 查询合同关联的出库明细(已审核且未发货数量&gt;0) 3. 返回合同列表 + 出库明细</p>
<p>#### 场景2: flag=9 且 actionType=1 (项目结案查询)</p>
<p>1. 根据 <code>projectId</code> 查询项目下所有合同列表 2. 关联主合同信息(主合同编码、名称) 3. 查询合同关联的出库明细 4. 返回合同列表 + 出库明细</p></KbCard>
<KbCard title="doAudit审核逻辑(工作流审批通过回调)">

```
wfComplete(dto) → 判断审批结果 == APPROVED → doAudit(epmContractCompleted)
```

<p>#### 合同结案(actionType=2)</p>

```
1. 查询目标合同 → 设置 completedDate=now, completedType=提交值, valid=3
2. 更新合同(COMPLETED_DATE, COMPLETED_TYPE, VALID)
3. 查询增补合同(MAIN_CONTRACT_ID=当前合同ID)
4. 批量更新增补合同(COMPLETED_DATE=now, COMPLETED_TYPE=提交值)
```

<p>#### 项目结案(actionType=1)</p>

```
1. 查询项目下所有已审批通过的合同(HZ_APPROVE_STATUS=APPROVED)
2. 批量更新合同(VALID=3, COMPLETED_DATE=now, COMPLETED_TYPE=提交值)
3. 更新项目报备(PROJECT_VALID=3, PROJECT_STAGE_TYPE=2, CLOSE_PROJECT_TIME=now)
```

<p>#### 公共逻辑</p>

```
1. 查询阶段定义(STAGE_NAME='项目结案') → 获取STAGE_ID
2. 更新项目进度(内容: "{日期}项目结案")
3. 查询项目报备 → 获取客户信息
4. 推送CRM(indivireportAdd): validStatus=0
```

</KbCard>
<KbCard title="出库明细查询SQL逻辑">

```sql
SELECT l.*, i.ITEM_CODE, i.ITEM_NAME, h.SA_SALEBILLNO, h.CONTRACT_CODE, h.CONTRACT_NAME
FROM SA_OUT_BILL_LINE l
LEFT JOIN SA_OUT_BILL_HEAD h ON h.SA_OUT_BILL_HEAD_ID = l.SA_OUT_BILL_HEAD_ID
LEFT JOIN ITEM i ON i.ITEM_ID = l.ITEM_ID
WHERE h.ORDER_STAT = 3
  AND (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) > 0
  AND h.CONTRACT_ID = #{contractId}   -- 合同结案时
  -- 或 h.CONTRACT_ID IN (#{contractIds}) -- 项目结案时
```

</KbCard>
<KbCard title="EPM_CONTRACT_COMPLETED (工程项目合同结案主表)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>CONTRACT_COMPLETED_ID</td><td>BIGINT</td><td>主键，工程项目合同结案ID</td></tr><tr><td>ORGANIZATION_ID</td><td>BIGINT</td><td>组织ID</td></tr><tr><td>COMPLETED_CODE</td><td>VARCHAR</td><td>合同结案单号</td></tr><tr><td>CONTRACT_ID</td><td>BIGINT</td><td>工程项目合同ID(合同结案时使用)</td></tr><tr><td>PROJECT_ID</td><td>BIGINT</td><td>工程项目ID(项目结案时使用)</td></tr><tr><td>COMPLETED_TYPE</td><td>VARCHAR</td><td>结案类型(1=正常结案,2=提前结案,3=逾期结案)</td></tr><tr><td>COMPLETED_DESC</td><td>VARCHAR</td><td>结案说明</td></tr><tr><td>REMARK</td><td>VARCHAR</td><td>备注</td></tr><tr><td>STAT</td><td>BIGINT</td><td>单据状态(已弃用，使用HZ_APPROVE_STATUS)</td></tr><tr><td>WFID</td><td>BIGINT</td><td>流程ID</td></tr><tr><td>WFFLAG</td><td>BIGINT</td><td>流程状态</td></tr><tr><td>ACTION_TYPE</td><td>BIGINT</td><td>操作类型(1=项目结案,2=合同结案)</td></tr><tr><td>SALE_REGION</td><td>VARCHAR</td><td>经销商销售区域</td></tr><tr><td>HZ_INSTANCE_ID</td><td>BIGINT</td><td>H0流程实例ID</td></tr><tr><td>HZ_APPROVE_STATUS</td><td>VARCHAR</td><td>H0流程审批状态</td></tr><tr><td>CALLBACK_SOURCE</td><td>VARCHAR</td><td>外部审批回调来源</td></tr><tr><td>CREATION_DATE</td><td>DATETIME</td><td>创建时间</td></tr><tr><td>CREATED_BY</td><td>BIGINT</td><td>创建人</td></tr><tr><td>LAST_UPDATE_DATE</td><td>DATETIME</td><td>最后更新时间</td></tr><tr><td>LAST_UPDATED_BY</td><td>BIGINT</td><td>最后更新人</td></tr><tr><td>OBJECT_VERSION_NUMBER</td><td>BIGINT</td><td>乐观锁版本号</td></tr></tbody></table></KbCard>
<KbCard title="EPM_PROJECT_CONTRACT (工程项目合同表 - 结案相关字段)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>CONTRACT_ID</td><td>BIGINT</td><td>主键，工程项目合同ID</td></tr><tr><td>PROJECT_ID</td><td>BIGINT</td><td>工程项目ID</td></tr><tr><td>MAIN_CONTRACT_ID</td><td>BIGINT</td><td>主合同ID(&gt;0时为增补合同)</td></tr><tr><td>COMPLETED_DATE</td><td>DATETIME</td><td>结案日期，系统自动回写</td></tr><tr><td>COMPLETED_TYPE</td><td>BIGINT</td><td>结案类型，系统自动回写(1=正常,2=提前,3=逾期)</td></tr><tr><td>VALID</td><td>BIGINT</td><td>有效状态(1=未审核,2=有效,3=失效)</td></tr><tr><td>HZ_APPROVE_STATUS</td><td>VARCHAR</td><td>H0流程审批状态</td></tr><tr><td>CONTRACT_CODE</td><td>VARCHAR</td><td>合同编码</td></tr><tr><td>CONTRACT_NAME</td><td>VARCHAR</td><td>合同名称</td></tr></tbody></table></KbCard>
<KbCard title="EPM_PROJECT (项目信息表 - 结案相关字段)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>PROJECT_ID</td><td>BIGINT</td><td>主键，项目ID</td></tr><tr><td>PROJECT_VALID</td><td>BIGINT</td><td>项目有效状态(1=未生效,2=已生效,3=已失效,4=已冻结)</td></tr><tr><td>PROJECT_STAGE_TYPE</td><td>BIGINT</td><td>项目进度状态</td></tr><tr><td>CLOSE_PROJECT_TIME</td><td>DATETIME</td><td>结案时间</td></tr><tr><td>PROJECT_CODE</td><td>VARCHAR</td><td>项目编码</td></tr><tr><td>PROJECT_NAME</td><td>VARCHAR</td><td>项目名称</td></tr></tbody></table></KbCard>
<KbCard title="EPM_STAGE_DEF (项目阶段定义表)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>STAGE_ID</td><td>BIGINT</td><td>主键，阶段ID</td></tr><tr><td>ORGANIZATION_ID</td><td>BIGINT</td><td>组织ID</td></tr><tr><td>STAGE_NAME</td><td>VARCHAR</td><td>阶段名称(结案时查询STAGE_NAME='项目结案')</td></tr><tr><td>SEQ</td><td>BIGINT</td><td>序号</td></tr><tr><td>UPDATE_MODE</td><td>BIGINT</td><td>更新方式(1=手动,2=自动)</td></tr></tbody></table></KbCard>
<KbCard title="EPM_REPORT (项目报备表 - CRM推送相关字段)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>REPORT_ID</td><td>BIGINT</td><td>主键，报备ID</td></tr><tr><td>PROJECT_ID</td><td>BIGINT</td><td>项目ID</td></tr><tr><td>CUSTOMER_ID</td><td>BIGINT</td><td>客户ID</td></tr><tr><td>CUSTOMER_CODE</td><td>VARCHAR</td><td>客户编码</td></tr><tr><td>CUSTOMER_NAME</td><td>VARCHAR</td><td>客户名称</td></tr><tr><td>PROJECT_CODE</td><td>VARCHAR</td><td>项目编码</td></tr><tr><td>PROJECT_NAME</td><td>VARCHAR</td><td>项目名称</td></tr><tr><td>DIVISION_NAME</td><td>VARCHAR</td><td>组织名称</td></tr></tbody></table></KbCard>
<KbCard title="SA_OUT_BILL_HEAD (出库单头表 - 结案查询关联)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>SA_OUT_BILL_HEAD_ID</td><td>BIGINT</td><td>主键，出库单头ID</td></tr><tr><td>CONTRACT_ID</td><td>BIGINT</td><td>合同ID</td></tr><tr><td>ORDER_STAT</td><td>BIGINT</td><td>单据状态(3=已审核)</td></tr><tr><td>SA_SALEBILLNO</td><td>VARCHAR</td><td>要货单号</td></tr><tr><td>CONTRACT_CODE</td><td>VARCHAR</td><td>合同编码</td></tr><tr><td>CONTRACT_NAME</td><td>VARCHAR</td><td>合同名称</td></tr></tbody></table></KbCard>
<KbCard title="SA_OUT_BILL_LINE (出库单行表 - 结案查询关联)"><table class="kl-table"><thead><tr><th>字段名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>SA_OUT_BILL_LINE_ID</td><td>BIGINT</td><td>主键，出库单行ID</td></tr><tr><td>SA_OUT_BILL_HEAD_ID</td><td>BIGINT</td><td>出库单头ID</td></tr><tr><td>ITEM_ID</td><td>BIGINT</td><td>物料ID</td></tr><tr><td>QTY_BILL</td><td>BIGINT</td><td>开单数量</td></tr><tr><td>CONFIRM_OUT_QTY</td><td>BIGINT</td><td>出库确认数量</td></tr><tr><td>CANCEL_QTY</td><td>BIGINT</td><td>取消数量</td></tr><tr><td>ITEM_CODE</td><td>VARCHAR</td><td>物料编码(关联ITEM表)</td></tr><tr><td>ITEM_NAME</td><td>VARCHAR</td><td>物料名称(关联ITEM表)</td></tr></tbody></table></KbCard>
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
      <span style="font-size:15px;">结案审批通过后合同状态没有更新为失效？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>工作流审批状态未更新为APPROVED(5)，或回调接口未正确触发。
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询结案单审批状态
SELECT ECC.CONTRACT_COMPLETED_ID, ECC.COMPLETED_CODE, ECC.ACTION_TYPE, ECC.HZ_APPROVE_STATUS, ECC.COMPLETED_TYPE
FROM EPM_CONTRACT_COMPLETED ECC
WHERE ECC.COMPLETED_CODE = '结案单号';
-- 2. 查询合同当前有效状态和结案信息
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.VALID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE, EPC.HZ_APPROVE_STATUS
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 合同ID;
-- 3. 检查工作流实例状态
SELECT ECC.HZ_INSTANCE_ID, ECC.HZ_APPROVE_STATUS
FROM EPM_CONTRACT_COMPLETED ECC
WHERE ECC.CONTRACT_COMPLETED_ID = 结案ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">项目结案后报备状态未失效？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>项目结案(actionType=1)审批未通过，或doAudit执行异常。
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询项目当前状态
SELECT EP.PROJECT_ID, EP.PROJECT_CODE, EP.PROJECT_VALID, EP.PROJECT_STAGE_TYPE, EP.CLOSE_PROJECT_TIME
FROM EPM_PROJECT EP
WHERE EP.PROJECT_ID = 项目ID;
-- 2. 查询报备状态
SELECT ER.REPORT_ID, ER.PROJECT_ID, ER.HZ_APPROVE_STATUS, ER.CUSTOMER_CODE, ER.CUSTOMER_NAME
FROM EPM_REPORT ER
WHERE ER.PROJECT_ID = 项目ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">合同结案后增补合同未结案？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询主合同下的增补合同
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.MAIN_CONTRACT_ID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE, EPC.VALID
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.MAIN_CONTRACT_ID = 主合同ID;
-- 2. 对比主合同结案信息
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 主合同ID;</code></pre>
      <br>
      <strong style="color:#7C3AED;">说明：</strong>合同结案时增补合同仅更新结案日期和结案类型，不更新有效状态(VALID)，这是设计行为。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">结案后CRM推送失败？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询报备关联客户信息
SELECT ER.REPORT_ID, ER.PROJECT_ID, ER.CUSTOMER_ID, ER.CUSTOMER_CODE, ER.CUSTOMER_NAME, ER.DIVISION_NAME
FROM EPM_REPORT ER
WHERE ER.PROJECT_ID = 项目ID;
-- 2. 查询客户详细信息
SELECT C.CUSTOMER_ID, C.CUSTOMER_CODE, C.CUSTOMER_NAME, C.SHORT_NAME
FROM CUSTOMER C
WHERE C.CUSTOMER_ID = 客户ID;</code></pre>
      <br>
      <strong style="color:#7C3AED;">说明：</strong>CRM推送失败不影响结案主流程，系统仅记录错误日志。检查日志搜索关键字: `将报备状态推送到CRM推送失败`。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">结案后项目进度未更新？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>阶段定义表中缺少STAGE_NAME='项目结案'的记录，导致查询报空指针。
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询"项目结案"阶段定义
SELECT ESD.STAGE_ID, ESD.STAGE_NAME, ESD.ORGANIZATION_ID
FROM EPM_STAGE_DEF ESD
WHERE ESD.STAGE_NAME = '项目结案'
  AND ESD.ORGANIZATION_ID = 组织ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q6</span>
      <span style="font-size:15px;">如何查询结案单关联的出库未发货明细？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT l.SA_OUT_BILL_LINE_ID, l.ITEM_ID, i.ITEM_CODE, i.ITEM_NAME,
       l.QTY_BILL, l.CONFIRM_OUT_QTY, l.CANCEL_QTY,
       (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) AS UNDELIVERED_QTY,
       h.SA_SALEBILLNO, h.CONTRACT_CODE, h.CONTRACT_NAME
FROM SA_OUT_BILL_LINE l
LEFT JOIN SA_OUT_BILL_HEAD h ON h.SA_OUT_BILL_HEAD_ID = l.SA_OUT_BILL_HEAD_ID
LEFT JOIN ITEM i ON i.ITEM_ID = l.ITEM_ID
WHERE h.ORDER_STAT = 3
  AND (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) &gt; 0
  AND h.CONTRACT_ID = 合同ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q7</span>
      <span style="font-size:15px;">结案日期和状态前端显示为空？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT EPC.CONTRACT_ID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 合同ID;</code></pre>
      <br>
      <strong style="color:#7C3AED;">说明：</strong>COMPLETED_TYPE值为0时，前端会转换为null不展示。结案审批通过后系统自动回写结案日期和类型，若为空说明结案审批未通过。
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
<KbCard title="Q1: 结案审批通过后合同状态没有更新为失效？"><p><strong>排查SQL:</strong></p>

```sql
-- 1. 查询结案单审批状态
SELECT ECC.CONTRACT_COMPLETED_ID, ECC.COMPLETED_CODE, ECC.ACTION_TYPE, ECC.HZ_APPROVE_STATUS, ECC.COMPLETED_TYPE
FROM EPM_CONTRACT_COMPLETED ECC
WHERE ECC.COMPLETED_CODE = '结案单号';

-- 2. 查询合同当前有效状态和结案信息
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.VALID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE, EPC.HZ_APPROVE_STATUS
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 合同ID;

-- 3. 检查工作流实例状态
SELECT ECC.HZ_INSTANCE_ID, ECC.HZ_APPROVE_STATUS
FROM EPM_CONTRACT_COMPLETED ECC
WHERE ECC.CONTRACT_COMPLETED_ID = 结案ID;
```

<p><strong>可能原因:</strong> 工作流审批状态未更新为APPROVED(5)，或回调接口未正确触发。</p></KbCard>
<KbCard title="Q2: 项目结案后报备状态未失效？"><p><strong>排查SQL:</strong></p>

```sql
-- 1. 查询项目当前状态
SELECT EP.PROJECT_ID, EP.PROJECT_CODE, EP.PROJECT_VALID, EP.PROJECT_STAGE_TYPE, EP.CLOSE_PROJECT_TIME
FROM EPM_PROJECT EP
WHERE EP.PROJECT_ID = 项目ID;

-- 2. 查询报备状态
SELECT ER.REPORT_ID, ER.PROJECT_ID, ER.HZ_APPROVE_STATUS, ER.CUSTOMER_CODE, ER.CUSTOMER_NAME
FROM EPM_REPORT ER
WHERE ER.PROJECT_ID = 项目ID;
```

<p><strong>可能原因:</strong> 项目结案(actionType=1)审批未通过，或doAudit执行异常。</p></KbCard>
<KbCard title="Q3: 合同结案后增补合同未结案？"><p><strong>排查SQL:</strong></p>

```sql
-- 1. 查询主合同下的增补合同
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.MAIN_CONTRACT_ID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE, EPC.VALID
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.MAIN_CONTRACT_ID = 主合同ID;

-- 2. 对比主合同结案信息
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 主合同ID;
```

<p><strong>说明:</strong> 合同结案时增补合同仅更新结案日期和结案类型，不更新有效状态(VALID)，这是设计行为。</p></KbCard>
<KbCard title="Q4: 结案后CRM推送失败？"><p><strong>排查SQL:</strong></p>

```sql
-- 1. 查询报备关联客户信息
SELECT ER.REPORT_ID, ER.PROJECT_ID, ER.CUSTOMER_ID, ER.CUSTOMER_CODE, ER.CUSTOMER_NAME, ER.DIVISION_NAME
FROM EPM_REPORT ER
WHERE ER.PROJECT_ID = 项目ID;

-- 2. 查询客户详细信息
SELECT C.CUSTOMER_ID, C.CUSTOMER_CODE, C.CUSTOMER_NAME, C.SHORT_NAME
FROM CUSTOMER C
WHERE C.CUSTOMER_ID = 客户ID;
```

<p><strong>说明:</strong> CRM推送失败不影响结案主流程，系统仅记录错误日志。检查日志搜索关键字: <code>将报备状态推送到CRM推送失败</code>。</p></KbCard>
<KbCard title="Q5: 结案后项目进度未更新？"><p><strong>排查SQL:</strong></p>

```sql
-- 1. 查询"项目结案"阶段定义
SELECT ESD.STAGE_ID, ESD.STAGE_NAME, ESD.ORGANIZATION_ID
FROM EPM_STAGE_DEF ESD
WHERE ESD.STAGE_NAME = '项目结案'
  AND ESD.ORGANIZATION_ID = 组织ID;
```

<p><strong>可能原因:</strong> 阶段定义表中缺少STAGE_NAME='项目结案'的记录，导致查询报空指针。</p></KbCard>
<KbCard title="Q6: 如何查询结案单关联的出库未发货明细？"><p><strong>排查SQL:</strong></p>

```sql
SELECT l.SA_OUT_BILL_LINE_ID, l.ITEM_ID, i.ITEM_CODE, i.ITEM_NAME,
       l.QTY_BILL, l.CONFIRM_OUT_QTY, l.CANCEL_QTY,
       (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) AS UNDELIVERED_QTY,
       h.SA_SALEBILLNO, h.CONTRACT_CODE, h.CONTRACT_NAME
FROM SA_OUT_BILL_LINE l
LEFT JOIN SA_OUT_BILL_HEAD h ON h.SA_OUT_BILL_HEAD_ID = l.SA_OUT_BILL_HEAD_ID
LEFT JOIN ITEM i ON i.ITEM_ID = l.ITEM_ID
WHERE h.ORDER_STAT = 3
  AND (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) > 0
  AND h.CONTRACT_ID = 合同ID;
```

</KbCard>
<KbCard title="Q7: 结案日期和状态前端显示为空？"><p><strong>排查SQL:</strong></p>

```sql
SELECT EPC.CONTRACT_ID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 合同ID;
```

<p><strong>说明:</strong> COMPLETED_TYPE值为0时，前端会转换为null不展示。结案审批通过后系统自动回写结案日期和类型，若为空说明结案审批未通过。</p></KbCard>
</div>
</div>
</div>
<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录"><table class="kl-table"><thead><tr><th>日期</th><th>版本</th><th>更新内容</th><th>更新人</th></tr></thead><tbody><tr><td>2026-07-28</td><td>v1.0</td><td>初始创建，梳理工程项目结案完整业务逻辑</td><td>AI</td></tr></tbody></table></KbCard>
<KbCard title="选择弹窗"><table class="kl-table"><thead><tr><th>选择项</th><th>说明</th></tr></thead><tbody><tr><td>操作类型选择（actionType）</td><td>1=项目结案（选择项目PROJECT_ID），2=合同结案（选择合同CONTRACT_ID）</td></tr><tr><td>结案类型选择</td><td>LOV编码 <code>AE.EPM.CONTRACT_COMPLETED_TYPE</code>，值：1=正常结案、2=提前结案、3=逾期结案</td></tr></tbody></table>
<p class='kl-tip'>本菜单为hlod低代码页面，选择行为通过低代码表单配置实现。</p></KbCard>
<KbCard title="导入"><p class='kl-tip'>不支持导入功能。结案单是单条创建并走审批流程，不支持Excel批量导入。</p></KbCard>
<KbCard title="其他按钮"><table class="kl-table"><thead><tr><th>按钮</th><th>显示条件</th><th>说明</th></tr></thead><tbody><tr><td>新建</td><td>始终显示</td><td>跳转低代码详情页创建结案单</td></tr><tr><td>查看</td><td>始终显示</td><td>跳转详情查看结案信息</td></tr><tr><td>编辑</td><td>新建/拒绝状态</td><td>修改结案单</td></tr><tr><td>提交</td><td>新建/拒绝状态</td><td>启动工作流审批（CONTRACT_COMPLETED_MAIN）</td></tr></tbody></table></KbCard>
<KbCard title="保存校验"><table class="kl-table"><thead><tr><th>序号</th><th>校验项</th><th>校验位置</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>actionType=2时contractId必填</td><td>后端detail接口</td><td>contractId为空时返回空VO，阻断查询</td></tr><tr><td>2</td><td>actionType=1时projectId必填</td><td>后端detail接口</td><td>projectId为空时返回空VO，阻断查询</td></tr><tr><td>3</td><td>结案类型completedType必填</td><td>前端低代码表单</td><td>LOV选择</td></tr></tbody></table>
<p class='kl-tip'>前端为hlod低代码页面，校验由低代码平台配置承载。后端Controller仅暴露detail查询接口，保存通过低代码通用接口完成。</p></KbCard>
<KbCard title="提交校验"><p><strong>工作流编码：</strong> <code>CONTRACT_COMPLETED_MAIN</code>（工程项目结案）</p>
<p><strong>后端校验：</strong> <code>EpmContractCompletedServiceImpl</code>继承<code>WorkflowBaseService</code>，但<code>wfProcSubmit</code>、<code>volidate</code>、<code>eventExecute</code>方法均返回null，无特殊提交前校验。</p>
<p><strong>审批通过后处理（wfComplete → doAudit）：</strong></p>
<table class="kl-table"><thead><tr><th>操作类型</th><th>处理逻辑</th></tr></thead><tbody><tr><td>合同结案(actionType=2)</td><td>更新主合同valid=3、completedDate、completedType；更新子合同(MAIN_CONTRACT_ID关联)的completedDate、completedType</td></tr><tr><td>项目结案(actionType=1)</td><td>查询项目下所有HZ_APPROVE_STATUS=APPROVED的合同，批量更新valid=3、completedDate、completedType；更新报备projectValid=3、projectStageType=2、closeProjectTime</td></tr><tr><td>自动更新项目阶段</td><td>从EPM_STAGE_DEF查询stageName="项目结案"的阶段定义，自动更新项目阶段</td></tr><tr><td>推送CRM</td><td>推送报备失效状态(validStatus=0)到CRM，异常仅记录日志不影响主流程</td></tr></tbody></table></KbCard>
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
