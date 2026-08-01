<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="门店照片设置" desc="配置门店照片的拍摄要求、上传规范及审核标准" />

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
开始 → 新增照片类型项 → 填写照片项目名称+拍摄要求等 → 保存 → 完成
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 依赖模块 | 依赖说明 |
|---------|---------|
| 门店装修申请 | 照片关联门店装修申请ID(terminalApplyId) |
| 门店验收报销 | 照片关联验收报销ID(checkBxId) |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 门店验收与报销 | 影响说明 | 验收报销时根据照片设置项生成待上传照片行，要求上传装修前/后照片 |
| 门店装修申请 | 影响说明 | 装申请时根据照片设置项要求上传对应类型照片 |

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

- 1、配置门店验收报销时需要上传的照片类型（照片项目）
- 2、每项包含照片项目名称、照片项目说明、拍摄角度及要求
- 3、照片分为装修前照片和装修后照片两类
</KbCard>

<KbCard num="2" title="2.2 照片上传要求">
**具体逻辑**：

- 1、拍摄角度及要求（shootRequire）描述该照片的拍摄规范
- 2、装修前照片（docid/docname）为必填项
- 3、装修后照片（afterDocId/afterDocName）为选填项
</KbCard>

<KbCard num="3" title="2.3 附件类型">
**具体逻辑**：

- 1、doctype 字段标识附件类型，区分不同用途的照片
- 2、照片设置项可被门店装修申请和验收报销两个模块引用
- 3、--
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
不支持批量导入

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 操作说明 | 可用条件 |
|---------|---------|---------|
| 新增行 | 新增一条照片类型项 | 始终可用 |
| 删除行 | 删除选中的照片类型项 | 选中行后可用 |
| 保存 | 保存所有照片类型项 | 编辑状态 |
| 上传照片 | 上传装修前/后照片附件 | 对应行可用 |

</KbCard>
<KbCard title="保存校验">
- 照片项目名称不能为空

- 门店装修申请ID不能为空（terminalApplyId）

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

```text
编辑中 ──保存──→ 已保存（可继续编辑）
```

---

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
<KbCard title="报错一览表" :hover="false">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:27%"><col style="width:13%"><col style="width:32%"><col style="width:14%"><col style="width:14%"></colgroup>
<thead><tr><th>报错信息</th><th>提示节点</th><th>根因与解决方案</th><th>等级</th><th>详细逻辑</th></tr></thead>
<tbody>
          <tr>
            <td style="color:#DC2626;font-weight:600;">照片项目名称不能为空</td>
            <td style="font-size:13px;">未填写照片项目名称</td>
            <td style="font-size:13px;">补充名称后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">门店装修申请ID不能为空</td>
            <td style="font-size:13px;">terminalApplyId为空</td>
            <td style="font-size:13px;">确保关联有效的装修申请</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>照片项目名称不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>补充名称后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>门店装修申请ID不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确保关联有效的装修申请</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">照片设置如何被下游使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>门店验收报销和装修申请时，根据照片设置项生成待上传照片行，用户需按拍摄要求上传装修前/后照片。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">装修前照片和装修后照片的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>装修前照片（docid）为必填，记录装修前门店状态；装修后照片（afterDocId）为选填，记录装修完成后的门店状态。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">该页面是hold低代码页面吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>是，该页面基于hold低代码平台配置，无独立Controller，通过FinFeeCheckBxPhoto实体直接访问。
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
