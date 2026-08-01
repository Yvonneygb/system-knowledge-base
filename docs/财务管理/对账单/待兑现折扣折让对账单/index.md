<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="待兑现折扣折让对账单" desc="财务管理-对账单业务说明" />

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
用户选择查询条件(事业部/交易公司/法人/年月/经销商) → 查询待兑现折扣折让对账单数据 → 展示对账单列表
  → 可选：查看对账单详情 → 展示对账单明细信息
  → 可选：打印对账单 → 生成对账单打印报表
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 折扣折让政策 | 数据依赖 | 对账单数据基于已审批的折扣折让政策兑现数据 | 折扣折让政策已审批生效 |
| 经销商主数据 | 数据依赖 | 经销维度的对账单关联经销商基础信息 | 经销商主数据已维护 |
| CRM基础数据 | 配置依赖 | 法人、交易公司、事业部等基础数据来源于CRM模块 | CRM基础数据已配置 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 对账单查询 | 查询对账单数据 | 待兑现折扣折让对账单为纯查询报表，不产生下游数据变更 |
| 对账单打印 | 打印对账单 | 打印操作仅生成报表，不影响业务数据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：待兑现对账单查询 核心逻辑">
<KbQuote>查询尚未兑现的折扣折让对账单数据，用于财务对账和兑现跟踪</KbQuote>

**具体逻辑**：

- 1、支持按事业部、交易公司、法人、年月、经销商等多维度查询
- 2、查询结果展示待兑现的折扣折让金额、政策信息、经销商信息等
- 3、列表支持分页查询和排序
</KbCard>

<KbCard num="2" title="重点逻辑2：对账单详情查看">
<KbQuote>查看单条对账单的详细信息，包括折扣折让明细</KbQuote>

**具体逻辑**：

- 1、从列表页点击查看进入详情页
- 2、详情页展示对账单头信息和行明细信息
- 3、详情页数据为只读，不可编辑
</KbCard>

<KbCard num="3" title="重点逻辑3：对账单打印">
<KbQuote>打印对账单用于线下对账或存档</KbQuote>

**具体逻辑**：

- 1、支持从列表页或详情页发起打印
- 2、打印内容包含对账单头信息和行明细
- 3、打印格式按系统配置的报表模板输出
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：查询条件区域">
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
<td>事业部</td>
<td>下拉选择框</td>
<td>事业部筛选</td>
<td>常显</td>
<td>来源值集epm.division</td>
<td>epm.division值集</td>
<td>-</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>下拉选择框</td>
<td>交易公司筛选</td>
<td>常显</td>
<td>LOV选择交易公司</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>法人编码</td>
<td>下拉选择框</td>
<td>法人筛选</td>
<td>常显</td>
<td>LOV选择法人客户</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>年月</td>
<td>文本框</td>
<td>对账年月</td>
<td>常显</td>
<td>格式yyyy-MM</td>
<td>年月格式</td>
<td>-</td>
</tr>
<tr>
<td>经销商编码</td>
<td>LOV</td>
<td>经销商筛选</td>
<td>常显</td>
<td>LOV选择经销商</td>
<td>-</td>
<td>-</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：查询结果列表">
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
<td>事业部</td>
<td>文本框</td>
<td>事业部名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>法人编码</td>
<td>文本框</td>
<td>法人编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>年月</td>
<td>文本框</td>
<td>对账年月</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>折扣折让金额</td>
<td>数值框</td>
<td>待兑现折扣折让金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>-</td>
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
| 查询 | 查询对账单 | 查询区域 | 查询条件已填写 | 调用查询接口分页查询 |
| 查看详情 | 查看对账单明细 | 列表行操作 | 常显 | 跳转详情页 |
| 打印 | 打印对账单 | 列表页/详情页 | 有选中记录 | 生成打印报表 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本菜单无工作流审批，无状态流转。为纯查询报表页面。

---

</KbCard>
<KbCard num="1" title="关联表1：折扣折让政策表（CRM模块）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| POLICY_ID | BIGINT | 政策主键ID | - | 自增主键 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销商编码 | - |
| DISCOUNT_AMOUNT | DECIMAL | 折扣金额 | 折扣折让金额 | 待兑现金额 |
| BILL_STATUS | INTEGER | 单据状态 | - | 审批通过的数据参与对账 |

</KbCard>

<KbCard num="2" title="关联表2：CUSTOMER_LEGAL_ENTITY（客户-法人关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| REL_ID | BIGINT | 关联关系ID | - | 自增主键 |
| CUSTOMER_ID | BIGINT | 客户ID | - | 关联经销商 |
| LEGAL_ENTITY_ID | BIGINT | 法人客户ID | - | 关联法人 |
| LEGAL_ENTITY_CODE | VARCHAR | 法人客户编码 | 法人编码 | - |
| LEGAL_ENTITY_NAME | VARCHAR | 法人客户名称 | - | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | - | 关联交易公司 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | - | - |
| VALID | BIGINT | 有效状态 | - | 1-未审核/2-已审核/3-已失效 |

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
            <td style="color:#DC2626;font-weight:600;">查询结果为空</td>
            <td style="font-size:13px;">查询</td>
            <td style="font-size:13px;">对应条件下的待兑现折扣折让数据不存在</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询结果为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>对应条件下的待兑现折扣折让数据不存在</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">查询不到待兑现的折扣折让数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>折扣折让政策未审批通过，或已全部兑现完成<br>
      <strong style="color:#7C3AED;">处理：</strong>确认折扣折让政策审批状态，检查是否已兑现
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">对账单金额与预期不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>折扣折让政策金额在审批后发生了调整，或兑现部分金额后未更新对账单<br>
      <strong style="color:#7C3AED;">处理：</strong>核对折扣折让政策原始金额与已兑现金额
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

> 要求：
> 1. 按倒序展示
> 2. 只需要包含2026年的提交记录
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
