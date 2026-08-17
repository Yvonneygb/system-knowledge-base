<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="9" title="紧急要货插单" desc="工程管理-项目交付业务说明" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">紧急要货插单 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★新建紧急要货插单★ → 推送ERP执行插单(更新出库单) → 结束（即时操作，无审批）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="430" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="505" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">紧急要货单</text>
      <rect x="620" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="695" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">ERP系统</text>
      <line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="235" y1="194" x2="235" y2="230" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="155" y="230" width="160" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="235" y="254" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建紧急要货插单★</text>
      <text x="235" y="272" text-anchor="middle" fill="#DCFCE7" font-size="10">查要货行/校验/设调整量/发送</text>
      <line x1="235" y1="284" x2="235" y2="320" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="150" y="320" width="170" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="345" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">推送ERP执行插单</text>
      <line x1="235" y1="360" x2="235" y2="400" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="180" y="400" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="425" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="235" y1="440" x2="235" y2="476" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="476" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="498" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="525" y="514" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="537" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">ERP系统·出库单数量调整</text>
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
<KbCard num="1" title="重点逻辑1：插单数据校验 {数据合法性}">
<KbQuote>确保插单数据合法，避免无效插单</KbQuote>

**具体逻辑**：

- 1、校验原始要货行是否存在可插单的产品行数据
- 2、若订单号不存在可插单的产品行数据，阻断性报错
</KbCard>

<KbCard num="2" title="重点逻辑2：ERP推送执行插单 {外部系统集成}">
<KbQuote>插单请求通过ERP接口执行实际的库存调整</KbQuote>

**具体逻辑**：

- 1、调用EpmUrgentAdjustInft推送ERP接口URGENT_ADJUST_INFT
- 2、ERP执行插单后返回结果，更新插单记录状态
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：紧急要货插单(hlod低代码页面)">
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
<td>插单记录号</td>
<td>文本框</td>
<td>插单记录编码</td>
<td>常显</td>
<td>1.系统自动生成</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.ADJUST_CODE</td>
</tr>
<tr>
<td>调整类型</td>
<td>下拉选择框</td>
<td>插单调整类型</td>
<td>常显</td>
<td>1.用户选择</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.ADJUST_TYPE</td>
</tr>
<tr>
<td>调整数量</td>
<td>数字框</td>
<td>调整数量</td>
<td>常显</td>
<td>1.用户输入</td>
<td>&gt;0</td>
<td>EPM_URGENT_ADJUST.ADJUST_QTY</td>
</tr>
<tr>
<td>预留数量</td>
<td>数字框</td>
<td>预留数量</td>
<td>常显</td>
<td>1.系统计算</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.RESERVED_QTY</td>
</tr>
<tr>
<td>关联插单ID</td>
<td>文本框</td>
<td>关联的原始插单ID</td>
<td>常显</td>
<td>1.关联插单时记录</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.REL_ADJUST_ID</td>
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
| 查询要货行数据 | 加载原始要货行 | 详情页 | 选择要货单后 | 调用get-sa-out-bill-data查询 |
| 校验插单数据 | 校验合法性 | 详情页 | 填写插单数据后 | 调用verify-data校验 |
| 发送插单请求 | 推送ERP执行插单 | 详情页 | 校验通过后 | 调用push-adjust推送ERP |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：插单数据校验 —— 确保插单数据合法</KbSubTitle>

- 第1点：校验原始要货行是否存在可插单的产品行

<KbTip>阻断性报错</KbTip>

```sql
-
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
无独立状态机，插单操作为即时生效，不涉及审批流程
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| - | 即时操作 | 查询、校验、发送插单 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_URGENT_ADJUST（紧急要货插单记录）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ADJUST_ID | Long | 插单ID(主键) | - | 自增主键 |
| ADJUST_CODE | String | 插单记录号 | 插单记录号 | 编码规则自动生成 |
| ADJUST_TYPE | Long | 调整类型 | 调整类型 | 用户选择 |
| ADJUST_QTY | BigDecimal | 调整数量 | 调整数量 | 用户输入 |
| RESERVED_QTY | BigDecimal | 预留数量 | 预留数量 | 系统计算 |
| REL_ADJUST_ID | Long | 关联插单ID | 关联插单ID | 关联原始插单 |
| URGENT_ORDER_ID | Long | 紧急要货单ID | - | 关联原始要货单 |

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
            <td style="color:#DC2626;font-weight:600;">订单号不存在可插单的产品行数据</td>
            <td style="font-size:13px;">校验插单数据</td>
            <td style="font-size:13px;">原始要货行无可用产品，检查要货单和产品状态</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>订单号不存在可插单的产品行数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>原始要货行无可用产品，检查要货单和产品状态</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">插单推送ERP失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>ERP接口不可用或网络问题<br>
      <strong style="color:#7C3AED;">处理：</strong>检查ERP接口URGENT_ADJUST_INFT状态，修复后重试
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
| - | - | - | 暂无2026年提交记录 |
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
