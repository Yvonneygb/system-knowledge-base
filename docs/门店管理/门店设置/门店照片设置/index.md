<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="门店照片设置" desc="门店管理-门店设置业务说明" />

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
<KbCard num="1" title="2.1 照片类型配置">
**具体逻辑**：

</KbCard>

<KbCard num="2" title="2.2 照片上传要求">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 附件类型">
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
<KbCard num="1" title="4.1 FIN_FEE_CHECK_BX_PHOTO（门店装修申请及完成的照片明细表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| TERMINAL_APPLY_PHOTO_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| TERMINAL_APPLY_ID | BIGINT | 门店装修申请ID | NOT NULL |
| PHOTO_ITEM | VARCHAR | 照片项目名称 | |
| PHOTO_ITEM_NOTE | VARCHAR | 照片项目说明 | |
| SHOOT_REQUIRE | VARCHAR | 拍摄角度及要求 | |
| DOCID | VARCHAR | 装修前照片ID | NOT NULL |
| DOCNAME | VARCHAR | 装修前照片名称 | |
| AFTER_DOC_ID | VARCHAR | 装修后照片ID | |
| AFTER_DOC_NAME | VARCHAR | 装修后照片名称 | |
| SEQ | BIGINT | 行ID | |
| CHECK_BX_ID | BIGINT | 验收报销ID | |
| DOCTYPE | VARCHAR | 附件类型 | |

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
