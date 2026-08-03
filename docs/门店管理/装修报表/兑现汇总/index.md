<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P15-02" title="兑现汇总" desc="额度内/额度外兑现数据合并汇总的统计查询报表" />

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
额度内兑现数据(FIN_FEE_CASHOUT_HEADER, cashoutType=1)
  │
  ├─────────────────────────────────────────┐
  │                                         │
额度外兑现数据(FIN_FEE_TERMINAL_RE_CASHOUT)  │
  │                                         │
  ▼                                         ▼
兑现汇总报表（hlod低代码报表页面）
  │
  ├─ 按条件筛选查询（门店编码/名称/经销商/日期范围/兑现类型等）
  ├─ 列表展示额度内/额度外兑现汇总信息
  └─ 可导出报表数据
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 门店装修额度内兑现 | 数据依赖 | 额度内兑现数据来源于兑现头表(cashoutType=1) | 额度内兑现单已创建 |
| 门店装修额度外兑现 | 数据依赖 | 额度外兑现数据来源于额度外兑现表 | 额度外兑现单已创建 |
| 门店验收与报销单 | 数据依赖 | 兑现单关联验收报销单信息 | 验收报销单已创建 |

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
<KbQuote>供内部人员汇总查询门店装修额度内和额度外的兑现数据，了解兑现整体情况及资金使用分布</KbQuote>

**具体逻辑**：

- 1、本页面为hlod低代码报表页面，无独立前端源码
- 2、仅提供查询和导出功能，不支持新增、修改、删除操作
- 3、数据来源于两张表：额度内兑现头表(FIN_FEE_CASHOUT_HEADER, cashoutType=1)和额度外兑现表(FIN_FEE_TERMINAL_RE_CASHOUT)
</KbCard>

<KbCard num="2" title="重点逻辑2：额度内/额度外数据合并展示 【汇总逻辑】">
<KbQuote>将额度内兑现和额度外兑现数据合并汇总展示，便于对比分析</KbQuote>

**具体逻辑**：

- 1、额度内兑现数据从FIN_FEE_CASHOUT_HEADER查询，过滤cashoutType=1(额度内)
- 2、额度外兑现数据从FIN_FEE_TERMINAL_RE_CASHOUT查询
- 3、通过兑现类型字段区分额度内/额度外数据，汇总展示门店维度的兑现金额
- 4、可按兑现类型筛选查看特定类型的兑现数据
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：兑现汇总报表页面（hlod低代码页面）">
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
<td>门店编码</td>
<td>文本框</td>
<td>按门店编码筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TERMINAL_CODE / FIN_FEE_TERMINAL_RE_CASHOUT.TERMINAL_CODE</td>
</tr>
<tr>
<td>门店名称</td>
<td>文本框</td>
<td>按门店名称筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TERMINAL_NAME / FIN_FEE_TERMINAL_RE_CASHOUT.TERMINAL_NAME</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>按经销商编码筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.CUST_CODE / FIN_FEE_TERMINAL_RE_CASHOUT.CUST_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>按经销商名称筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.CUST_NAME / FIN_FEE_TERMINAL_RE_CASHOUT.CUST_NAME</td>
</tr>
<tr>
<td>申请日期起</td>
<td>日期选择器</td>
<td>申请日期范围起</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>FIN_FEE_CASHOUT_HEADER.CREATE_TIME / FIN_FEE_TERMINAL_RE_CASHOUT.CREATE_TIME</td>
</tr>
<tr>
<td>申请日期止</td>
<td>日期选择器</td>
<td>申请日期范围止</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>FIN_FEE_CASHOUT_HEADER.CREATE_TIME / FIN_FEE_TERMINAL_RE_CASHOUT.CREATE_TIME</td>
</tr>
<tr>
<td>兑现类型</td>
<td>下拉选择框</td>
<td>按兑现类型筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>1-额度内/2-额度外</td>
<td>FIN_FEE_CASHOUT_HEADER.CASHOUT_TYPE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>按交易公司筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TRADING_COMPANY_NAME / FIN_FEE_TERMINAL_RE_CASHOUT.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>审批状态</td>
<td>下拉选择框</td>
<td>按审批状态筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>NEW/RUN/APPROVED/REJECTED</td>
<td>FIN_FEE_CASHOUT_HEADER.HZ_APPROVE_STATUS / FIN_FEE_TERMINAL_RE_CASHOUT.HZ_APPROVE_STATUS</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
> 不支持导入功能

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 查询 | 查询兑现汇总报表 | 列表页 | 常显 | 调用兑现查询接口 |
| 导出 | 导出报表数据 | 列表页 | 常显 | 导出当前查询结果为Excel |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

> 本页面为纯查询页面，无状态流转

---

</KbCard>
<KbCard num="1" title="表1：FIN_FEE_CASHOUT_HEADER（额度内兑现头表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| FEE_CASHOUT_ID | NUMBER | 兑现ID(主键) | - | 关联字段 |
| FEE_CASHOUT_NO | VARCHAR | 兑现单号 | 兑现单号 | 编码规则生成 |
| CASHOUT_TYPE | NUMBER | 兑现类型 | 兑现类型 | 1-额度内/2-额度外 |
| TERMINAL_ID | NUMBER | 门店ID | - | 关联门店 |
| TERMINAL_CODE | VARCHAR | 门店编码 | 门店编码 | 保存时带入 |
| TERMINAL_NAME | VARCHAR | 门店名称 | 门店名称 | 保存时带入 |
| CUST_ID | NUMBER | 经销商ID | - | 关联经销商 |
| CUST_CODE | VARCHAR | 经销商编码 | 经销商编码 | 保存时带入 |
| CUST_NAME | VARCHAR | 经销商名称 | 经销商名称 | 保存时带入 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 关联交易公司 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 保存时带入 |
| BILLING_UNIT_ID | NUMBER | 开票单位ID | - | 关联开票单位 |
| BILLING_UNIT_NAME | VARCHAR | 开票单位名称 | 开票单位 | 保存时带入 |
| TOTAL_CAN_CASHOUT_AMT | DECIMAL | 可兑现总额 | 可兑现总额 | 验收报销单带入 |
| THIS_CASHOUT_AMT | DECIMAL | 本次兑现金额 | 本次兑现金额 | 用户输入 |
| FACT_INVOICE_AMT | DECIMAL | 实际兑现含税金额 | 实际兑现含税金额 | 计算得出 |
| SUR_CASHOUT_AMT | DECIMAL | 剩余未兑现金额 | 剩余未兑现金额 | 计算得出 |
| PAY_TYPE | NUMBER | 支付方式 | 支付方式 | 用户选择 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审批状态 | NEW/RUN/APPROVED/REJECTED |
| CREATOR | VARCHAR | 申请人 | 申请人 | 系统自动赋值 |
| CREATE_TIME | DATE | 申请时间 | 申请时间 | 系统自动赋值 |
| ORGANIZATION_ID | NUMBER | 组织ID | - | 租户组织 |

</KbCard>

<KbCard num="2" title="表2：FIN_FEE_TERMINAL_RE_CASHOUT（额度外兑现表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| TERMINAL_CASHOUT_ID | NUMBER | 兑现ID(主键) | - | 关联字段 |
| TERMINAL_CASHOUT_CODE | VARCHAR | 兑现编码 | 兑现单号 | 编码规则生成 |
| TERMINAL_ID | NUMBER | 门店ID | - | 关联门店 |
| TERMINAL_CODE | VARCHAR | 门店编码 | 门店编码 | 保存时带入 |
| TERMINAL_NAME | VARCHAR | 门店名称 | 门店名称 | 保存时带入 |
| CUST_ID | NUMBER | 经销商ID | - | 关联经销商 |
| CUST_CODE | VARCHAR | 经销商编码 | 经销商编码 | 保存时带入 |
| CUST_NAME | VARCHAR | 经销商名称 | 经销商名称 | 保存时带入 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 关联交易公司 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 保存时带入 |
| BILLING_UNIT_ID | NUMBER | 开票单位ID | - | 关联开票单位 |
| BILLING_UNIT_NAME | VARCHAR | 开票单位名称 | 开票单位 | 保存时带入 |
| THIS_APPLY_CASHOUT_AMT | DECIMAL | 本次申请兑现金额 | 本次兑现金额 | 用户输入 |
| FACT_INVOICE_AMT | DECIMAL | 实际兑现含税金额 | 实际兑现含税金额 | 计算得出 |
| THIS_SUR_CASHOUT_AMT | DECIMAL | 剩余未兑现金额 | 剩余未兑现金额 | 计算得出 |
| PAY_TYPE | NUMBER | 支付方式 | 支付方式 | 用户选择 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审批状态 | NEW/RUN/APPROVED/REJECTED |
| CREATOR | VARCHAR | 申请人 | 申请人 | 系统自动赋值 |
| CREATE_TIME | DATE | 申请时间 | 申请时间 | 系统自动赋值 |
| ORGANIZATION_ID | NUMBER | 组织ID | - | 租户组织 |

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
      <span style="font-size:15px;">额度内和额度外数据混合展示时重复</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>两张表数据通过兑现类型区分，不存在重复<br>
      <strong style="color:#7C3AED;">处理：</strong>通过兑现类型筛选条件可单独查看额度内或额度外数据
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">兑现汇总金额与单独查看兑现页面不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>可能存在查询条件差异或数据同步延迟<br>
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
| 2026-08-01 | - | - | 初始生成知识库文档 |
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
