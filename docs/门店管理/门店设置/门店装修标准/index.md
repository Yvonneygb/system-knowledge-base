<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="门店装修标准" desc="设置门店装修的标准规范，包括装修等级、材料标准、验收要求等" />

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
开始 → 新建装修标准 → 填写头信息+行信息 → 保存 → (审核) → 完成
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 依赖模块 | 依赖说明 |
|---------|---------|
| 事业部 | 新增时需选择事业部，决定数据归属范围 |
| 系统词汇 mkt.decorate_project | 行-装修项目取值来源 |
| 系统词汇 fixup_grade | 行-门店装修等级取值来源 |
| 值列表 decorate_subsidy_mode | 行-补贴方式取值来源 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 门店验收与报销 | 影响说明 | 验收报销时通过 doSearchDecorate 接口查询门店等级对应的装修标准，计算额度内/外金额 |
| 门店装修申请 | 影响说明 | 装申请时根据门店等级和面积范围匹配装修标准行 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 装修标准匹配规则">
**具体逻辑**：

- 1、每个标准头下配置多行明细，按**装修项目+门店装修等级+面积范围**进行匹配
- 2、面积范围通过"面积范围大于"和"面积范围小于等于"定义区间（左开右闭）
- 3、额度内标准（元/m²）和额度外标准（元/m²）分别设定单价
- 4、额度外面积上限限制超出额度的最大可报销面积
</KbCard>

<KbCard num="2" title="2.2 有效期控制">
**具体逻辑**：

- 1、每行明细有独立的生效起止日期，控制该行标准何时可用
- 2、门店验收报销时仅匹配当前日期在有效期范围内的行
</KbCard>

<KbCard num="3" title="2.3 补贴方式">
**具体逻辑**：

- 1、补贴方式字段控制该行标准的补贴计算方式
- 2、不同补贴方式影响金额计算逻辑
</KbCard>

<KbCard num="4" title="2.4 事业部隔离">
**具体逻辑**：

- 1、数据按事业部隔离，不同事业部维护各自的装修标准
- 2、查询时通过 selectFixupGradeList 按事业部和装修等级筛选
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

- **事业部LOV**：选择事业部，带出事业部ID和名称
- **装修项目LOV**：词汇编码 `mkt.decorate_project`

</KbCard>
<KbCard title="导入">
不支持批量导入

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 操作说明 | 可用条件 |
|---------|---------|---------|
| 新增 | 新建一条装修标准 | 始终可用 |
| 保存 | 保存当前编辑数据 | 编辑状态 |
| 提交 | 提交审批流程(如有) | 保存后 |

</KbCard>
<KbCard title="保存校验">
- 事业部不能为空

- 行信息至少一行

- 面积范围小于等于需大于面积范围大于

- 有效结束日期需&gt;=有效开始日期

</KbCard>
<KbCard title="提交校验">
- 头信息保存校验通过

- 行信息完整无空值

</KbCard>
<KbCard title="状态机">

```text
新建 ──保存──→ 已保存 ──提交──→ 审批中 ──审批通过──→ 已审核
                                    │
                                    └──审批拒绝──→ 已拒绝(可修改重新提交)
```

---

</KbCard>
<KbCard num="1" title="4.1 TERMINAL_DECORATE_STANDARD（门店装修标准设置主表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| DECORATE_STANDARD_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| DECORATE_STANDARD_NO | VARCHAR | 装修申请单号 | |
| APPLY_REASON | VARCHAR | 申请原因 | |
| STAT | BIGINT | 单据状态(已弃用) | |
| ENTID | BIGINT | 事业部ID | |
| ENTNAME | VARCHAR | 事业部名称 | |
| DIVISION_ID | BIGINT | 事业部词汇值 | |
| CREATOR | VARCHAR | 申请人ID | |
| CREATOR_NAME | VARCHAR | 申请人名称 | |
| CREATE_TIME | DATETIME | 申请时间 | |
| UPDATOR | VARCHAR | 修改人ID | |
| UPDATOR_NAME | VARCHAR | 修改人名称 | |
| UPDATE_TIME | DATETIME | 修改时间 | |
| CHECKER | VARCHAR | 审核人ID | |
| CHECKER_NAME | VARCHAR | 审核人名称 | |
| CHECK_TIME | DATETIME | 审核时间 | |
| WFID | BIGINT | 流程ID | |
| WFFLAG | BIGINT | 流程状态 | |
| HZ_INSTANCE_ID | BIGINT | H0流程实例ID | |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 | |

</KbCard>

<KbCard num="2" title="4.2 TERMINAL_DECORATE_LINE（门店装修标准设置明细表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| DECORATE_LINE_ID | BIGINT | 主键ID | PK |
| DECORATE_STANDARD_ID | BIGINT | 关联主表ID | FK → TERMINAL_DECORATE_STANDARD |
| DECORATE_PROJECT | BIGINT | 装修项目 | |
| FIXUP_GRADE | BIGINT | 门店装修等级 | |
| UPER_AREA | DECIMAL | 面积范围大于 | |
| LOWER_AREA | DECIMAL | 面积范围小于等于 | |
| IN_STANDARD | DECIMAL | 额度内标准(元/m²) | |
| OUT_STANDARD | DECIMAL | 额度外标准(元/m²) | |
| OUT_MAX_AREA | DECIMAL | 额度外面积上限(m²) | |
| START_DATE | DATETIME | 有效开始日期 | |
| END_DATE | DATETIME | 有效结束日期 | |
| SUBSIDY_MODE | VARCHAR | 补贴方式 | |

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
            <td style="color:#DC2626;font-weight:600;">事业部不能为空</td>
            <td style="font-size:13px;">未选择事业部</td>
            <td style="font-size:13px;">选择事业部后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">面积范围不合法</td>
            <td style="font-size:13px;">lower_area &lt;= uper_area</td>
            <td style="font-size:13px;">确保面积范围小于等于大于面积范围大于</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>事业部不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>选择事业部后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>面积范围不合法</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确保面积范围小于等于大于面积范围大于</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">装修标准如何被下游使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>门店验收报销时通过 `doSearchDecorate` 或 `searchDecorate` 接口，传入门店等级和装修项目，返回匹配的装修标准行明细用于金额计算。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">面积范围如何匹配？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>门店面积A匹配条件为：uper_area &lt; A &lt;= lower_area，即左开右闭区间。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">该页面是hold低代码页面吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>是，该页面基于hold低代码平台配置，无独立Controller，通过TerminalDecorateStandardRepository访问数据。
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
