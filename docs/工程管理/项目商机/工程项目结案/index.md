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
<KbCard num="1" title="合同结案(actionType=2)核心逻辑">

- 将目标合同的结案日期设为当前时间，结案类型设为提交时选择的值，有效状态设为失效(3)
- 查询该合同下所有增补合同(主合同ID=当前合同ID)，批量更新增补合同的结案日期和结案类型
- **增补合同不会更新有效状态**，仅更新结案日期和结案类型

</KbCard>

<KbCard num="2" title="项目结案(actionType=1)核心逻辑">

- 查询项目下所有审批状态为"审批通过"的合同，批量更新有效状态为失效(3)、结案日期为当前时间、结案类型为提交时选择的值
- 将项目报备的有效状态设为失效(3)，项目进度状态设为2，记录结案时间

</KbCard>

<KbCard num="3" title="项目进度更新">

- 查询阶段定义表中阶段名称为"项目结案"的记录，获取阶段ID
- 调用项目阶段服务更新进度，内容格式为: `{日期}项目结案`

</KbCard>

<KbCard num="4" title="CRM推送">

- 查询项目关联的报备记录，获取客户信息
- 推送数据包含: 客户编码、客户名称、客户简称、组织编码、报备编号、项目名称、有效状态(0=失效)
- 推送失败仅记录日志，不影响结案主流程

</KbCard>

<KbCard num="5" title="增补合同结案字段重置">

- 新增增补合同时，结案日期和结案状态会被重置为空

</KbCard>

<KbCard num="6" title="前端展示逻辑">

- 结案日期和结案状态字段均为只读(disabled=true)，由后端结案审批通过后自动回写
- 列表页支持按结案状态筛选查询
- 结案状态值为0时，前端转换为null不展示

---

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="API接口">

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/v1/{organizationId}/epm-contract-completeds/detail` | 查询结案详情(关联合同列表+出库明细) |

</KbCard>

<KbCard num="2" title="detail接口逻辑">

**入参:** `EpmContractCompletedDTO`，关键字段: `flag`、`actionType`、`contractId`、`projectId`

<KbSubTitle>场景1: flag=9 且 actionType=2 (合同结案查询)</KbSubTitle>


1. 根据 `contractId` 查询主合同下所有增补合同列表
2. 查询合同关联的出库明细(已审核且未发货数量>0)
3. 返回合同列表 + 出库明细

<KbSubTitle>场景2: flag=9 且 actionType=1 (项目结案查询)</KbSubTitle>


1. 根据 `projectId` 查询项目下所有合同列表
2. 关联主合同信息(主合同编码、名称)
3. 查询合同关联的出库明细
4. 返回合同列表 + 出库明细

</KbCard>

<KbCard num="3" title="doAudit审核逻辑(工作流审批通过回调)">

```
wfComplete(dto) → 判断审批结果 == APPROVED → doAudit(epmContractCompleted)
```

<KbSubTitle>合同结案(actionType=2)</KbSubTitle>


```
1. 查询目标合同 → 设置 completedDate=now, completedType=提交值, valid=3
2. 更新合同(COMPLETED_DATE, COMPLETED_TYPE, VALID)
3. 查询增补合同(MAIN_CONTRACT_ID=当前合同ID)
4. 批量更新增补合同(COMPLETED_DATE=now, COMPLETED_TYPE=提交值)
```

<KbSubTitle>项目结案(actionType=1)</KbSubTitle>


```
1. 查询项目下所有已审批通过的合同(HZ_APPROVE_STATUS=APPROVED)
2. 批量更新合同(VALID=3, COMPLETED_DATE=now, COMPLETED_TYPE=提交值)
3. 更新项目报备(PROJECT_VALID=3, PROJECT_STAGE_TYPE=2, CLOSE_PROJECT_TIME=now)
```

<KbSubTitle>公共逻辑</KbSubTitle>


```
1. 查询阶段定义(STAGE_NAME='项目结案') → 获取STAGE_ID
2. 更新项目进度(内容: "{日期}项目结案")
3. 查询项目报备 → 获取客户信息
4. 推送CRM(indivireportAdd): validStatus=0
```

</KbCard>

<KbCard num="4" title="出库明细查询SQL逻辑">

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

---

</KbCard>

<KbCard num="1" title="EPM_CONTRACT_COMPLETED (工程项目合同结案主表)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| CONTRACT_COMPLETED_ID | BIGINT | 主键，工程项目合同结案ID |
| ORGANIZATION_ID | BIGINT | 组织ID |
| COMPLETED_CODE | VARCHAR | 合同结案单号 |
| CONTRACT_ID | BIGINT | 工程项目合同ID(合同结案时使用) |
| PROJECT_ID | BIGINT | 工程项目ID(项目结案时使用) |
| COMPLETED_TYPE | VARCHAR | 结案类型(1=正常结案,2=提前结案,3=逾期结案) |
| COMPLETED_DESC | VARCHAR | 结案说明 |
| REMARK | VARCHAR | 备注 |
| STAT | BIGINT | 单据状态(已弃用，使用HZ_APPROVE_STATUS) |
| WFID | BIGINT | 流程ID |
| WFFLAG | BIGINT | 流程状态 |
| ACTION_TYPE | BIGINT | 操作类型(1=项目结案,2=合同结案) |
| SALE_REGION | VARCHAR | 经销商销售区域 |
| HZ_INSTANCE_ID | BIGINT | H0流程实例ID |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 |
| CALLBACK_SOURCE | VARCHAR | 外部审批回调来源 |
| CREATION_DATE | DATETIME | 创建时间 |
| CREATED_BY | BIGINT | 创建人 |
| LAST_UPDATE_DATE | DATETIME | 最后更新时间 |
| LAST_UPDATED_BY | BIGINT | 最后更新人 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 |

</KbCard>

<KbCard num="2" title="EPM_PROJECT_CONTRACT (工程项目合同表 - 结案相关字段)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| CONTRACT_ID | BIGINT | 主键，工程项目合同ID |
| PROJECT_ID | BIGINT | 工程项目ID |
| MAIN_CONTRACT_ID | BIGINT | 主合同ID(>0时为增补合同) |
| COMPLETED_DATE | DATETIME | 结案日期，系统自动回写 |
| COMPLETED_TYPE | BIGINT | 结案类型，系统自动回写(1=正常,2=提前,3=逾期) |
| VALID | BIGINT | 有效状态(1=未审核,2=有效,3=失效) |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 |
| CONTRACT_CODE | VARCHAR | 合同编码 |
| CONTRACT_NAME | VARCHAR | 合同名称 |

</KbCard>

<KbCard num="3" title="EPM_PROJECT (项目信息表 - 结案相关字段)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_ID | BIGINT | 主键，项目ID |
| PROJECT_VALID | BIGINT | 项目有效状态(1=未生效,2=已生效,3=已失效,4=已冻结) |
| PROJECT_STAGE_TYPE | BIGINT | 项目进度状态 |
| CLOSE_PROJECT_TIME | DATETIME | 结案时间 |
| PROJECT_CODE | VARCHAR | 项目编码 |
| PROJECT_NAME | VARCHAR | 项目名称 |

</KbCard>

<KbCard num="4" title="EPM_STAGE_DEF (项目阶段定义表)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| STAGE_ID | BIGINT | 主键，阶段ID |
| ORGANIZATION_ID | BIGINT | 组织ID |
| STAGE_NAME | VARCHAR | 阶段名称(结案时查询STAGE_NAME='项目结案') |
| SEQ | BIGINT | 序号 |
| UPDATE_MODE | BIGINT | 更新方式(1=手动,2=自动) |

</KbCard>

<KbCard num="5" title="EPM_REPORT (项目报备表 - CRM推送相关字段)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| REPORT_ID | BIGINT | 主键，报备ID |
| PROJECT_ID | BIGINT | 项目ID |
| CUSTOMER_ID | BIGINT | 客户ID |
| CUSTOMER_CODE | VARCHAR | 客户编码 |
| CUSTOMER_NAME | VARCHAR | 客户名称 |
| PROJECT_CODE | VARCHAR | 项目编码 |
| PROJECT_NAME | VARCHAR | 项目名称 |
| DIVISION_NAME | VARCHAR | 组织名称 |

</KbCard>

<KbCard num="6" title="SA_OUT_BILL_HEAD (出库单头表 - 结案查询关联)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| SA_OUT_BILL_HEAD_ID | BIGINT | 主键，出库单头ID |
| CONTRACT_ID | BIGINT | 合同ID |
| ORDER_STAT | BIGINT | 单据状态(3=已审核) |
| SA_SALEBILLNO | VARCHAR | 要货单号 |
| CONTRACT_CODE | VARCHAR | 合同编码 |
| CONTRACT_NAME | VARCHAR | 合同名称 |

</KbCard>

<KbCard num="7" title="SA_OUT_BILL_LINE (出库单行表 - 结案查询关联)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| SA_OUT_BILL_LINE_ID | BIGINT | 主键，出库单行ID |
| SA_OUT_BILL_HEAD_ID | BIGINT | 出库单头ID |
| ITEM_ID | BIGINT | 物料ID |
| QTY_BILL | BIGINT | 开单数量 |
| CONFIRM_OUT_QTY | BIGINT | 出库确认数量 |
| CANCEL_QTY | BIGINT | 取消数量 |
| ITEM_CODE | VARCHAR | 物料编码(关联ITEM表) |
| ITEM_NAME | VARCHAR | 物料名称(关联ITEM表) |

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

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|---------|--------|
| 2026-07-28 | v1.0 | 初始创建，梳理工程项目结案完整业务逻辑 | AI |
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
