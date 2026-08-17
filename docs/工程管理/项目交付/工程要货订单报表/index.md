<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="14" title="工程要货订单报表" desc="工程管理-项目交付业务说明" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">工程要货订单报表 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → 设置查询条件 → ★工程要货订单报表★(查询/展示/导出) → 结束（纯只读，无审批）</p>
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
      <text x="505" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工程要货订单</text>
      <rect x="620" y="56" width="150" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="695" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">紧急要货订单</text>
      <line x1="235" y1="115" x2="235" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="195" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="235" y1="194" x2="235" y2="230" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="150" y="230" width="170" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="235" y="257" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">设置查询条件</text>
      <line x1="235" y1="274" x2="235" y2="300" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="155" y="300" width="160" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="235" y="324" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★工程要货订单报表★</text>
      <text x="235" y="342" text-anchor="middle" fill="#DCFCE7" font-size="10">查询/展示汇总/导出Excel</text>
      <line x1="235" y1="354" x2="235" y2="390" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="180" y="390" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="415" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="235" y1="430" x2="235" y2="466" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="466" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="488" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="525" y="504" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="527" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">无直接下游影响</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游数据源</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：纯报表查询页面 【只读查询】">
<KbQuote>供内部人员查询工程要货订单的汇总报表信息，了解工程要货订单的整体情况</KbQuote>

**具体逻辑**：

- 1、本页面为hlod低代码报表页面，无独立前端源码
- 2、仅提供查询和导出功能，不支持新增、修改、删除操作
- 3、数据来源于要货订单头表(SA_OUT_BILL_HEAD)和行表(SA_OUT_BILL_LINE)，通过searchFlag/billType区分工程要货
</KbCard>

<KbCard num="2" title="重点逻辑2：与工程要货订单共用后端代码 【共用代码】">
<KbQuote>报表查询复用要货订单的查询接口</KbQuote>

**具体逻辑**：

- 1、后端使用SaOutBillHeadController的查询接口，通过searchFlag参数区分报表查询场景
- 2、报表页面与工程要货订单管理页面使用相同的后端查询逻辑，区别在于报表页面仅展示不可编辑
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：工程要货订单报表页面（hlod低代码页面）">
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
<td>要货单号</td>
<td>文本框</td>
<td>按单号筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.SA_SALEBILLNO</td>
</tr>
<tr>
<td>客户编码</td>
<td>文本框</td>
<td>按客户编码筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>CUSTOMER.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>按客户名称筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>CUSTOMER.CUSTOMER_NAME</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>按交易公司筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>按合同编码筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.CONTRACT_CODE</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框</td>
<td>按项目编码筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.PROJECT_CODE</td>
</tr>
<tr>
<td>订单日期起</td>
<td>日期选择器</td>
<td>订单日期范围起</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>SA_OUT_BILL_HEAD.DATE_INVBILL</td>
</tr>
<tr>
<td>订单日期止</td>
<td>日期选择器</td>
<td>订单日期范围止</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>SA_OUT_BILL_HEAD.DATE_INVBILL</td>
</tr>
<tr>
<td>订单状态</td>
<td>下拉选择框</td>
<td>按订单状态筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.ORDER_STAT</td>
</tr>
<tr>
<td>订单类型</td>
<td>下拉选择框</td>
<td>按订单类型筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.BILL_TYPE</td>
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
| 查询 | 查询工程要货订单报表 | 列表页 | 常显 | 调用要货订单查询接口 |
| 导出 | 导出报表数据 | 列表页 | 常显 | 导出当前查询结果为Excel |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本页面为纯查询页面，无状态流转

---

</KbCard>
<KbCard num="1" title="表1：SA_OUT_BILL_HEAD（要货订单头表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SA_OUT_BILL_HEAD_ID | NUMBER | 要货单ID(主键) | - | 关联字段 |
| SA_SALEBILLNO | VARCHAR | 要货单号 | 要货单号 | 编码规则生成 |
| CUSTOMER_ID | NUMBER | 客户ID | - | 关联客户 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 保存时带入 |
| BILLING_UNIT_NAME | VARCHAR | 开票单位名称 | 开票单位 | 保存时带入 |
| CONTRACT_CODE | VARCHAR | 合同编码 | 合同编码 | 保存时带入 |
| CONTRACT_NAME | VARCHAR | 合同名称 | 合同名称 | 保存时带入 |
| PROJECT_CODE | VARCHAR | 项目编码 | 项目编码 | 保存时带入 |
| PROJECT_NAME | VARCHAR | 项目名称 | 项目名称 | 保存时带入 |
| DATE_INVBILL | DATE | 订单日期 | 订单日期 | 保存时赋值 |
| IN_DATE | DATE | 期望到达日期 | 期望到达日期 | 用户输入 |
| ORDER_STAT | VARCHAR | 订单状态 | 订单状态 | EBS返回 |
| BILL_TYPE | VARCHAR | 订单类型 | 订单类型 | 保存时赋值 |

</KbCard>

<KbCard num="2" title="表2：SA_OUT_BILL_LINE（要货订单行表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SA_OUT_BILL_LINE_ID | NUMBER | 要货单行ID(主键) | - | 关联字段 |
| SA_OUT_BILL_HEAD_ID | NUMBER | 要货单ID | - | 关联头表 |
| ITEM_CODE | VARCHAR | 产品编码 | 产品编码 | 由产品带入 |
| ITEM_NAME | VARCHAR | 产品名称 | 产品名称 | 由产品带入 |
| QTY_BILL | NUMBER | 开票数量 | 开票数量 | 用户输入 |
| UOM_NAME | VARCHAR | 计量单位 | 计量单位 | 由产品带入 |

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
            <td style="color:#DC2626;font-weight:600;">无</td>
            <td style="font-size:13px;">-</td>
            <td style="font-size:13px;">-</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>-</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">报表数据与工程要货订单页面数据不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>可能存在缓存或查询条件差异<br>
      <strong style="color:#7C3AED;">处理：</strong>刷新页面重新查询，确认查询条件一致
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
| 2025-10-16 | - | - | 初始创建工程要货订单报表功能 |
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
