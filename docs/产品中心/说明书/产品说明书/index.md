<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品说明书" desc="" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">

1. 用户新建产品说明书，填写说明书基本信息并上传附件文件
2. 关联产品型号（ES_SPEC_MODEL）和产品分类（ES_SPECCLAS_REF）
3. 保存草稿或直接提交审批
4. 审批流程流转（工作流：SUB_PRODUCT_SPECIFICATION_MAIN）
5. 审批通过后说明书生效，可供查阅

```
新建说明书 → 关联型号/分类 → 保存/提交审批 → 审批流转 → 生效
```

</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 后端接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs</td>
<td>POST</td>
<td>新建说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs</td>
<td>GET</td>
<td>查询说明书列表</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>GET</td>
<td>查询说明书详情</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>PUT</td>
<td>更新说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}</td>
<td>DELETE</td>
<td>删除说明书</td>
</tr>
<tr>
<td>/v1/{organizationId}/es-specs/{specId}/submit</td>
<td>POST</td>
<td>提交审批</td>
</tr>
</tbody></table></div>

- Controller: `EsSpecController`

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-ae`
- 页面路径：`arrow-ae/productInfo/esSpecProp`
- 路由：
  - `/es-spec-prop/list` — 说明书列表页
  - `/es-spec-prop/detail/:specid` — 说明书详情页

</KbCard>

<KbCard title="3.3 工作流">

- 工作流编码：`SUB_PRODUCT_SPECIFICATION_MAIN`
- 工作流名称：产品说明书
- 触发时机：用户点击"提交审批"按钮

</KbCard>

<KbCard title="3.4 核心业务规则">

1. 新建时必填说明书名称、说明书编码
2. 关联型号和分类支持多选
3. 草稿状态可编辑，审批中不可修改
4. 审批拒绝后可重新编辑提交

</KbCard>

<KbCard num="1" title="4.1 ES_SPEC（说明书表）">

| 字段 | 说明 |
|------|------|
| spec_id | 说明书ID（主键） |
| spec_name | 说明书名称 |
| spec_code | 说明书编码 |
| organization_id | 组织ID |
| status | 状态（草稿/审批中/生效/失效） |
| created_by | 创建人 |
| creation_date | 创建时间 |
| last_updated_by | 最后更新人 |
| last_update_date | 最后更新时间 |

</KbCard>

<KbCard num="2" title="4.2 ES_SPEC_MODEL（说明书关联型号表）">

| 字段 | 说明 |
|------|------|
| spec_model_id | 关联ID（主键） |
| spec_id | 说明书ID |
| model_id | 产品型号ID |
| model_code | 产品型号编码 |

</KbCard>

<KbCard num="3" title="4.3 ES_SPECCLAS_REF（说明书与分类关联表）">

| 字段 | 说明 |
|------|------|
| specclas_ref_id | 关联ID（主键） |
| spec_id | 说明书ID |
| classification_id | 产品分类ID |
| classification_code | 产品分类编码 |

</KbCard>

<KbCard num="4" title="4.4 ES_DOCS（说明书文件表）">

| 字段 | 说明 |
|------|------|
| doc_id | 文件ID（主键） |
| spec_id | 说明书ID |
| file_name | 文件名 |
| file_path | 文件存储路径 |
| file_type | 文件类型 |
| file_size | 文件大小 |
| upload_date | 上传时间 |
| upload_by | 上传人 |

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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">说明书提交审批后能否修改？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>审批中和审批通过状态不可修改，审批拒绝后可重新编辑提交。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">一份说明书可以关联多少个型号？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>无数量限制，支持多对多关联。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">附件文件格式有限制吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>通常支持PDF、Word、图片等常见格式，具体以后端校验为准。
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

| 日期 | 内容 |
|------|------|
| 2026-08-03 | 初始创建 |
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
