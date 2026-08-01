<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="门店装修标准" desc="门店管理-门店设置业务说明" />

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
</KbCard>

<KbCard num="2" title="上游依赖">
</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 本功能为纯设置/档案管理，不向任何下游系统/模块写入数据 |

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

</KbCard>

<KbCard num="2" title="2.2 有效期控制">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 补贴方式">
**具体逻辑**：

</KbCard>

<KbCard num="4" title="2.4 事业部隔离">
**具体逻辑**：

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">
</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
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
<KbCard title="常见问题">
<div class="faq-qa-wrap">
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
