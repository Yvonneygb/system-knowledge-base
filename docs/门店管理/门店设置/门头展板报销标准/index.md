<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门头展板报销标准" desc="门店管理-门店设置业务说明" />

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
<KbCard num="1" title="2.1 报销标准生效管理">
**具体逻辑**：

</KbCard>

<KbCard num="2" title="2.2 经销商限额控制">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 单独门店申请与超额报销">
**具体逻辑**：

</KbCard>

<KbCard num="4" title="2.4 行信息匹配规则">
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
