<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P15-05" title="门店装修申请与进度更新报表" desc="门店装修申请与进度更新数据的统计查询报表" />

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
门店装修申请与进度更新数据(FIN_FEE_APPLY_FINISHED_HEADER)
  │
  ▼
门店装修申请与进度更新报表（hlod低代码报表页面）
  │
  ├─ 按条件筛选查询（门店编码/名称/经销商/日期范围/审批状态等）
  ├─ 列表展示装修申请汇总信息
  └─ 可导出报表数据
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 门店装修申请与进度更新 | 数据依赖 | 报表数据来源于装修申请头表数据 | 装修申请单已创建 |
| 门店装修申请变更 | 数据依赖 | 变更后的申请数据也纳入报表 | 变更审批通过 |
| 门店装修申请关闭 | 数据依赖 | 关闭状态更新后反映在报表中 | 关闭操作已完成 |

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
<KbQuote>供内部人员查询门店装修申请与进度更新的汇总报表信息，了解装修申请的整体情况及审批进度</KbQuote>

**具体逻辑**：

- 1、本页面为hlod低代码报表页面，无独立前端源码
- 2、仅提供查询和导出功能，不支持新增、修改、删除操作
- 3、数据来源于装修申请头表(FIN_FEE_APPLY_FINISHED_HEADER)，包含额度内/额度外/门头/终端的申请标准和金额信息
</KbCard>

<KbCard num="2" title="重点逻辑2：与装修申请页面共用后端代码 【共用代码】">
<KbQuote>报表查询复用装修申请的查询接口</KbQuote>

**具体逻辑**：

- 1、后端使用FinFeeApplyFinishedHeaderController的查询接口，通过searchFlag参数区分报表查询场景
- 2、报表页面与装修申请管理页面使用相同的后端查询逻辑，区别在于报表页面仅展示不可编辑
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：门店装修申请与进度更新报表页面（hlod低代码页面）">
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
<td>FIN_FEE_APPLY_FINISHED_HEADER.TERMINAL_CODE</td>
</tr>
<tr>
<td>门店名称</td>
<td>文本框</td>
<td>按门店名称筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.TERMINAL_NAME</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>按经销商编码筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.CUST_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>按经销商名称筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.CUST_NAME</td>
</tr>
<tr>
<td>申请日期起</td>
<td>日期选择器</td>
<td>申请日期范围起</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.CREATE_TIME</td>
</tr>
<tr>
<td>申请日期止</td>
<td>日期选择器</td>
<td>申请日期范围止</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.CREATE_TIME</td>
</tr>
<tr>
<td>审批状态</td>
<td>下拉选择框</td>
<td>按审批状态筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>NEW/RUN/APPROVED/REJECTED/INTERRUPT</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>按交易公司筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>装修等级</td>
<td>下拉选择框</td>
<td>按装修等级筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>值集</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.FIXUP_GRADE</td>
</tr>
<tr>
<td>是否关闭</td>
<td>下拉选择框</td>
<td>按关闭状态筛选</td>
<td>常显</td>
<td>用户选择</td>
<td>1-未关闭/2-已关闭</td>
<td>FIN_FEE_APPLY_FINISHED_HEADER.IS_CLOSE</td>
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
| 查询 | 查询装修申请报表 | 列表页 | 常显 | 调用装修申请查询接口 |
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
<KbCard num="1" title="表1：FIN_FEE_APPLY_FINISHED_HEADER（门店装修申请与进度更新表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| TERMINAL_APPLY_ID | NUMBER | 装修申请ID(主键) | - | 关联字段 |
| TERMINAL_APPLY_NO | VARCHAR | 装修申请单号 | 装修申请单号 | 编码规则生成 |
| TERMINAL_ID | NUMBER | 门店ID | - | 关联门店 |
| TERMINAL_CODE | VARCHAR | 门店编码 | 门店编码 | 保存时带入 |
| TERMINAL_NAME | VARCHAR | 门店名称 | 门店名称 | 保存时带入 |
| CUST_ID | NUMBER | 经销商ID | - | 关联经销商 |
| CUST_CODE | VARCHAR | 经销商编码 | 经销商编码 | 保存时带入 |
| CUST_NAME | VARCHAR | 经销商名称 | 经销商名称 | 保存时带入 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 关联交易公司 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | - | 保存时带入 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 保存时带入 |
| BILLING_UNIT_ID | NUMBER | 开票单位ID | - | 关联开票单位 |
| BILLING_UNIT_CODE | VARCHAR | 开票单位编码 | - | 保存时带入 |
| BILLING_UNIT_NAME | VARCHAR | 开票单位名称 | 开票单位 | 保存时带入 |
| TERMINAL_TYPE | NUMBER | 门店类型 | 门店类型 | 保存时带入 |
| FIXUP_GRADE | NUMBER | 装修等级 | 装修等级 | 保存时带入 |
| DECORATION_STYLE | NUMBER | 装修风格 | 装修风格 | 保存时带入 |
| TERMINAL_AREA | DECIMAL | 门店面积 | 门店面积 | 用户输入 |
| DECORATION_DAYS | NUMBER | 装修周期 | 装修周期 | 用户输入 |
| IN_APPLY_STANDARD_AMT | DECIMAL | 额度内申请标准金额 | 额度内申请标准金额 | 装修标准计算 |
| OUT_APPLY_STANDARD_AMT | DECIMAL | 额度外申请标准金额 | 额度外申请标准金额 | 装修标准计算 |
| FRONTDOOR_APPLY_STANDARD_AMT | DECIMAL | 门头申请标准金额 | 门头申请标准金额 | 装修标准计算 |
| PLAN_OPEN_DATE | DATE | 计划开业日期 | 计划开业日期 | 用户输入 |
| DECORATION_FINISHED_TIME | DATE | 装修完成时间 | 装修完成时间 | 用户输入 |
| IS_CLOSE | NUMBER | 是否关闭 | 是否关闭 | 1-未关闭/2-已关闭 |
| CLOSING_REASONS | VARCHAR | 关闭原因 | - | 关闭时填写 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审批状态 | NEW/RUN/APPROVED/REJECTED/INTERRUPT |
| HZ_INSTANCE_ID | NUMBER | 流程实例ID | - | 工作流实例 |
| CREATOR | VARCHAR | 申请人 | 申请人 | 系统自动赋值 |
| CREATE_TIME | DATE | 申请日期 | 申请日期 | 系统自动赋值 |
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
      <span style="font-size:15px;">报表数据与装修申请页面数据不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>可能存在缓存或查询条件差异<br>
      <strong style="color:#7C3AED;">处理：</strong>刷新页面重新查询，确认查询条件一致
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批状态筛选无结果</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>审批状态值可能包含INTERRUPT(作废)状态，需确认筛选条件<br>
      <strong style="color:#7C3AED;">处理：</strong>检查审批状态下拉选项是否包含所需状态值
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
