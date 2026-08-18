<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
    <h2>维护什么</h2>
    <p>配置门头展板报销标准，明确不同场景下的报销金额上限</p>
  </div>
  <div class="biz-2col-inner">
    <div class="kl-col-box">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="none" stroke="white" stroke-width="1.5"/><path d="M5.5 5.5H10.5M5.5 8H10.5M5.5 10.5H8.5" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">标准配置</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">报销标准的设定维度</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>生效管理</strong> — 新建默认未生效，审批通过后生效，支持手动作废</div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>经销商限额</strong> — 可标识是否对经销商设置限额，并区分额度内/额度外计算</div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>行为控制</strong> — 可配置是否允许单独门店申请、是否允许超额报销、审批是否可调金额</div>
        </div>
      </div>
    </div>
    <div class="kl-col-box alt">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#4ADE80);"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H13V11H3Z" fill="none" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M5 7H11" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">行匹配规则</h4>
      </div>
      <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">标准明细的匹配口径</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>多维匹配</strong> — 按装修项目、适用门店类型、标准等级、数量范围匹配对应标准</div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F0FDF4;border-radius:8px;">
          <div style="font-size:.75rem;"><strong>金额区分</strong> — 同一行内分别设定额度内与额度外的报销金额</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 影响</span>
    <h2>影响范围</h2>
    <p>报销标准被哪些下游模块引用</p>
  </div>
  <div class="biz-3col">
    <div class="kl-col-box" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="none" stroke="white" stroke-width="1.5"/><path d="M5.5 8L7.5 10L11 5.5" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">门店验收报销</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">门店验收与报销按标准匹配报销金额，控制费用支出。</p>
        </div>
      </div>
    </div>
    <div class="kl-col-box alt" style="margin-bottom:0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#16A34A,#4ADE80);"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H13V11H3Z" fill="none" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 2.5V5.5M10 2.5V5.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <div>
          <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">门店装修申请</h5>
          <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">门店装修申请引用标准作为费用预估与申请依据。</p>
        </div>
      </div>
    </div>
  </div>
  <div class="kl-tip" style="margin-top:14px;">
    <strong>生效原则：</strong>报销标准须审批通过后方可被下游引用，作废后即停止生效，确保报销金额口径始终受控且可追溯。
  </div>
</div>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
<h4 class="bf-main-title">【门头展板报销标准】 — 全链路流程图</h4>
<p class="bf-main-sub">开始 → ★维护报销标准★ → ⚖审批通过？ → 生效(供下游引用) → 结束（拒绝则修改重提）</p>
<div class="bf-fc-svg-wrap">
<svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 720" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
<marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
<marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
<marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
</defs>
<rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
<rect x="345" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="405" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">事业部</text>
<rect x="475" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="535" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">词汇quota_type</text>
<rect x="605" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="665" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">词汇quota_out_limit</text>
<rect x="735" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="795" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">词汇装修项目</text>
<line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="560" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="600" y1="194" x2="600" y2="222" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="515" y="222" width="170" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="600" y="246" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★维护报销标准★</text>
<text x="600" y="266" text-anchor="middle" fill="#DCFCE7" font-size="10">填头/行·保存·提交审批</text>
<line x1="600" y1="276" x2="600" y2="304" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<polygon points="600,304 670,334 600,364 530,334" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="338" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
<line x1="670" y1="334" x2="780" y2="334" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
<rect x="735" y="319" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
<text x="780" y="338" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>
<line x1="780" y1="319" x2="780" y2="249" stroke="#EF4444" stroke-width="1.5"/>
<line x1="780" y1="249" x2="515" y2="249" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
<line x1="600" y1="364" x2="600" y2="392" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="520" y="392" width="160" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="600" y="419" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">生效·供下游引用</text>
<line x1="600" y1="436" x2="600" y2="464" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="545" y="464" width="110" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="491" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="600" y1="508" x2="600" y2="528" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="50" y="528" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="550" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="440" y="562" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="515" y="585" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">门店验收与报销</text>
<rect x="610" y="562" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="685" y="585" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">门店装修申请</text>
</svg>
</div>
<div class="bf-fc-legend">
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
<span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
</div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 报销标准生效管理">
**具体逻辑**：

- 1、新建标准默认为**未生效**状态（valid=1）
- 2、审批通过后自动变为**已生效**（valid=2）
- 3、支持手动**作废**操作，作废后状态变为**已作废**（valid=3）
- 4、作废操作通过 `doInvalid` 接口执行，仅已生效状态可作废
</KbCard>

<KbCard num="2" title="2.2 经销商限额控制">
**具体逻辑**：

- 1、当经销商限额标识为Y时，表示该标准对经销商有限额约束
- 2、额度类型（budgetType）决定限额的计算方式
- 3、使用额度外预算为Y时，需录入预算年度，否则年度字段禁用
</KbCard>

<KbCard num="3" title="2.3 单独门店申请与超额报销">
**具体逻辑**：

- 1、单独门店申请标识控制是否允许门店单独发起申请
- 2、超额报销标识控制超出标准金额时是否允许报销
- 3、审核可修改金额标识控制审批环节是否可调整报销金额
</KbCard>

<KbCard num="4" title="2.4 行信息匹配规则">
**具体逻辑**：

- 1、每个标准头下可配置多行明细，按装修项目+适用门店类型+标准等级+数量范围匹配
- 2、数量下限和上限定义适用区间，额度内/外标准分别设定金额
- 3、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗</KbSubTitle>

- **事业部LOV**：选择事业部，带出事业部ID和词汇值
- **装修项目LOV**：词汇编码 `AE.MKT.POLICY_STANDARD_PROJECT`，选择装修项目分类
- **有效政策LOV**：接口 `/v1/{organizationId}/policy-standard-heads/valid-head`，供下游单据引用已生效标准

</KbCard>
<KbCard title="导入">
不支持批量导入

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 操作说明 | 可用条件 |
|---------|---------|---------|
| 新增 | 新建一条报销标准 | 始终可用 |
| 保存 | 保存当前编辑数据 | 编辑状态 |
| 提交 | 提交审批流程 | 保存后、未提交状态 |
| 作废 | 将已生效标准标记为已作废 | valid=2(已生效) |
| 删除 | 删除未生效的标准 | valid=1(未生效)且未提交审批 |

</KbCard>
<KbCard title="保存校验">
- 政策编码不能为空

- 政策名称不能为空

- 结束时间需&gt;=开始时间

- 使用额度外预算为Y时，年度必填

- 行信息至少一行

</KbCard>
<KbCard title="提交校验">
- 头信息保存校验通过

- 行信息完整无空值

- 工作流 `STORE_POLICY_STANDARD_HEAD` 启动成功

</KbCard>
<KbCard title="状态机">

```text
新建(valid=1) ──提交──→ 审批中 ──审批通过──→ 已生效(valid=2) ──作废──→ 已作废(valid=3)
                          │
                          └──审批拒绝──→ 已拒绝(可修改重新提交)
```

---

</KbCard>
<KbCard num="1" title="4.1 POLICY_STANDARD_HEAD（政策标准头表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| POLICY_STANDARD_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| ENTID | BIGINT | 事业部ID | |
| DIVISION_ID | BIGINT | 事业部词汇值 | |
| STANDARD_CODE | VARCHAR | 政策编码 | |
| STANDARD_NAME | VARCHAR | 政策名称 | |
| CUST_LIMIT_FLAG | VARCHAR | 经销商限额标识 Y/N | |
| START_DATE | DATE | 开始时间 | |
| END_DATE | DATE | 结束时间 | |
| APPLY_REASON | VARCHAR | 备注 | |
| SINGLE_STORE_APPLY_FLAG | VARCHAR | 单独门店申请 Y/N | |
| EXCESS_FLAG | VARCHAR | 超额报销 Y/N | |
| BUDGET_TYPE | VARCHAR | 额度类型 | |
| USE_EXTRA_BUDGET_FLAG | VARCHAR | 使用额度外预算 Y/N | |
| EXTRA_BUDGET_EXCESS_STRATEGY | BIGINT | 额度外超额处理策略 | |
| MODIFY_FLAG | VARCHAR | 审核可修改金额 Y/N | |
| YEAR | BIGINT | 预算年度 | |
| VALID | BIGINT | 生效状态 1/2/3 | |
| WFID | BIGINT | 流程ID | |
| WFFLAG | BIGINT | 流程状态 | |
| HZ_INSTANCE_ID | BIGINT | H0流程实例ID | |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 | NOT NULL |

</KbCard>

<KbCard num="2" title="4.2 POLICY_STANDARD_LINE（政策标准行表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| HEAD_ID | BIGINT | 关联头表ID | FK → POLICY_STANDARD_HEAD |
| DECORATE_PROJECT | VARCHAR | 装修项目 | |
| UNIT_TYPE | VARCHAR | 单位类型 | |
| TERMINAL_TYPE | VARCHAR | 适用门店类型(逗号分隔) | |
| STANDARD_GRADE | VARCHAR | 标准等级 | |
| MIN_NUM | DECIMAL | 数量下限 | |
| MAX_NUM | DECIMAL | 数量上限 | |
| WITHIN_STANDARD | DECIMAL | 额度内标准 | |
| OUTSIDE_STANDARD | DECIMAL | 额度外标准 | |

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
            <td style="color:#DC2626;font-weight:600;">政策编码不能为空</td>
            <td style="font-size:13px;">保存时未填写编码</td>
            <td style="font-size:13px;">补充政策编码后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">作废失败</td>
            <td style="font-size:13px;">标准非已生效状态</td>
            <td style="font-size:13px;">仅已生效状态可作废</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">删除失败</td>
            <td style="font-size:13px;">标准已提交审批或已生效</td>
            <td style="font-size:13px;">仅未生效且未提交审批可删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">年度不能为空</td>
            <td style="font-size:13px;">使用额度外预算为Y但未填年度</td>
            <td style="font-size:13px;">填写预算年度</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策编码不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>补充政策编码后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>作废失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>仅已生效状态可作废</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>删除失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>仅未生效且未提交审批可删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>年度不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>填写预算年度</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">报销标准如何被下游引用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>下游门店验收报销通过 `/v1/{organizationId}/policy-standard-heads/valid-head` 接口查询已生效标准，再通过 `/do-select` 接口获取对应行明细进行金额匹配。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批拒绝后如何处理？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>审批拒绝后可修改数据重新提交审批流程。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">额度内标准和额度外标准如何区分？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>行信息中 within_standard 为额度内标准金额，outside_standard 为额度外标准金额，根据门店实际用量是否在额度范围内匹配对应标准。
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

| 日期 | 版本 | 修改内容 | 修改人 |
|-----|------|---------|-------|
| 2026-07-31 | V1.0 | 初始生成知识库文档 | AI |
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
