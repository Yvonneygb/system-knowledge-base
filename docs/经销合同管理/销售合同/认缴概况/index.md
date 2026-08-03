<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-06" title="认缴概况" desc="认缴概况的查询、保证金标准金额查询" />

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
认缴申请审批通过 ──> 生成认缴记录 ──> 更新认缴概况(按经销商+法人+合同类型汇总)
                                        │
                                        ├── 判断是否缴清 ──> 更新缴清标识(payComplete)
                                        │
                                        └── 更新合同缴清状态 ──> 推送CRM
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 认缴申请 | 数据依赖 | 认缴申请审批通过后生成认缴记录，更新认缴概况 | 认缴申请已审批通过 |
| 保证金标准设定 | 配置依赖 | 各合同类型的保证金标准金额，用于判断是否缴清 | 已配置保证金标准 |
| 年度经销合同 | 数据依赖 | 合同缴清状态更新 | 合同已生效 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 缴清标识更新 | 缴清标识更新 | 当认缴金额达到保证金标准金额时，将缴清标识更新为Y |
| 合同缴清状态更新 | 合同缴清状态更新 | 缴清标识变更后，同步更新对应年度经销合同的"是否缴清"字段 |
| 推送CRM | 推送CRM | 缴清状态变更后，推送至CRM系统 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：保证金标准金额查询 【数据查询】">
<KbQuote>查询指定事业部+合同类型的保证金标准金额，用于判断是否缴清</KbQuote>

**具体逻辑**：

- 1、根据事业部ID和合同类型查询保证金标准设定
- 2、若未配置标准设定则报错"保证金标准设定未配置，请先配置"
- 3、返回标准金额（STANDARD_AMOUNT），若为null则返回0
</KbCard>

<KbCard num="2" title="重点逻辑2：认缴概况查询 【数据查询】">
<KbQuote>按经销商+法人+合同类型维度汇总展示认缴情况</KbQuote>

**具体逻辑**：

- 1、支持按事业部、经销商、法人、合同类型等条件筛选查询
- 2、每条记录展示需缴纳保证金金额和是否缴清标识
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：认缴概况列表页">
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
<td>经销商</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>查询结果</td>
<td>-</td>
<td>CM_CONTRACT_PAYMENT_SUMMARY.CUSTOMER_ID</td>
</tr>
<tr>
<td>法人</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>查询结果</td>
<td>-</td>
<td>CM_CONTRACT_PAYMENT_SUMMARY.BILLING_UNIT_ID</td>
</tr>
<tr>
<td>合同类型</td>
<td>文本框</td>
<td>合同类型名称</td>
<td>常显</td>
<td>查询结果，来源值集scpdict:sales_contract_type</td>
<td>-</td>
<td>CM_CONTRACT_PAYMENT_SUMMARY.CONTRACT_TYPE</td>
</tr>
<tr>
<td>需缴纳保证金金额</td>
<td>文本框</td>
<td>该维度的保证金标准金额</td>
<td>常显</td>
<td>从保证金标准设定获取</td>
<td>大于等于0</td>
<td>CM_CONTRACT_PAYMENT_SUMMARY.PAYMENT_AMOUNT</td>
</tr>
<tr>
<td>是否缴清</td>
<td>文本框</td>
<td>保证金是否已缴清</td>
<td>常显</td>
<td>系统自动维护</td>
<td>Y(是)/N(否)</td>
<td>CM_CONTRACT_PAYMENT_SUMMARY.PAY_COMPLETE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

无（纯查询页面）

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">


```text
未缴清(N) ──认缴金额达到标准──> 已缴清(Y)
已缴清(Y) ──撤销认缴──> 未缴清(N)
```


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| N | 未缴清 | 无（由认缴申请和撤销认款触发状态变更） |
| Y | 已缴清 | 无（由撤销认款触发状态变更） |

---

</KbCard>
<KbCard num="1" title="表1：CM_CONTRACT_PAYMENT_SUMMARY（认缴概况/认缴信息头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 自增 |
| ENTID | NUMBER | 组织ID | - | 创建时赋值 |
| CUSTOMER_ID | NUMBER | 经销商ID | 经销商 | 认缴申请审批通过时生成 |
| BILLING_UNIT_ID | NUMBER | 法人ID | 法人 | 认缴申请审批通过时生成 |
| CONTRACT_TYPE | NUMBER | 合同类型 | 合同类型 | 认缴申请审批通过时生成，来源值集 |
| PAYMENT_AMOUNT | NUMBER | 需缴纳保证金金额 | 需缴纳保证金金额 | 从保证金标准设定获取 |
| PAY_COMPLETE | VARCHAR2 | 是否缴清 | 是否缴清 | 系统自动维护，Y/N |

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
            <td style="color:#DC2626;font-weight:600;">合同类型、事业部、经销商 不能为空</td>
            <td style="font-size:13px;">查询标准金额</td>
            <td style="font-size:13px;">查询保证金标准金额时关键参数为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">保证金标准设定未配置，请先配置</td>
            <td style="font-size:13px;">查询标准金额</td>
            <td style="font-size:13px;">对应合同类型未配置保证金标准</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同类型、事业部、经销商 不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>查询保证金标准金额时关键参数为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>保证金标准设定未配置，请先配置</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>对应合同类型未配置保证金标准</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">认缴概况中某记录的缴清标识始终为N</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>认缴金额未达到保证金标准金额。排查SQL：<br>
      <strong style="color:#7C3AED;">处理：</strong>确认认缴记录是否已审批通过并生成认缴记录
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">撤销认款后认缴概况缴清标识未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>撤销认款逻辑中未正确匹配到认缴概况记录<br>
      <strong style="color:#7C3AED;">处理：</strong>检查撤销认款时summaryIdSet是否正确收集
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
| 2025-09-18 | - | jiaqiang.fu01 | 初始创建认缴概况模块 |
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
