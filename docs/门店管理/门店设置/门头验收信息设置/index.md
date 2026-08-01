<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="门头验收信息设置" desc="门店管理-门店设置业务说明" />

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
<KbCard num="1" title="2.1 验收信息项配置">
**具体逻辑**：

</KbCard>

<KbCard num="2" title="2.2 验收比例">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 数据转换逻辑">
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
<KbCard num="1" title="4.1 ACCEPTANCE_INFO_SET_LINE（门店验收信息设置明细表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| SET_LINE_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| SET_ID | BIGINT | 关联主表主键ID | FK |
| SEQ | BIGINT | 序号 | |
| DECORATION_PROJECT | VARCHAR | 验收项目 | |
| NOTE | VARCHAR | 验收结果 | |
| IS_YS_PROVIDE | BIGINT | 验收申请时提供 0/1 | |
| DESCRIPTION | VARCHAR | 备注 | |
| DECORATE_PROJECT | BIGINT | 装修项目(词汇值) | |
| DECORATION_RATE | DECIMAL | 验收比例 | |
| CREATOR | VARCHAR | 创建人 | |
| CREATE_TIME | DATETIME | 创建时间 | |
| UPDATOR | VARCHAR | 修改人 | |
| UPDATE_TIME | DATETIME | 修改时间 | |

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
