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
<div class="kl-wrap">
<KbCard num="1" title="业务流程图">

```text
工程要货订单数据(SA_OUT_BILL_HEAD + SA_OUT_BILL_LINE)
  │
  ▼
工程要货订单报表（hlod低代码报表页面）
  │
  ├─ 按条件筛选查询（单号/客户/交易公司/合同/项目/日期范围/订单状态等）
  ├─ 列表展示工程要货订单汇总信息
  └─ 可导出报表数据
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程要货订单 | 数据依赖 | 报表数据来源于工程要货订单头行数据 | 工程要货订单已创建 |
| 紧急要货订单 | 数据依赖 | 紧急要货产生的要货订单也纳入报表 | 紧急要货审批通过并推送EBS成功 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 无直接下游影响 |

</div>
</KbCard>
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
