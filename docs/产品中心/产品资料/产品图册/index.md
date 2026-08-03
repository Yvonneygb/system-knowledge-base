<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品图册" desc="" />

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

```
用户进入产品详情页 → 在图册区域管理图册 → 新增/编辑/删除图册 → 向图册中添加/移除图片 → 保存生效
```

</KbCard>

<KbCard num="2" title="1.2 核心业务场景">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>场景</th>
<th>说明</th>
</tr>
<tr>
<td>图册列表</td>
<td>查看产品下的所有图册</td>
</tr>
<tr>
<td>图册新增</td>
<td>创建新图册（如"外观图"、"安装图"、"细节图"等）</td>
</tr>
<tr>
<td>图册编辑</td>
<td>修改图册名称、描述等</td>
</tr>
<tr>
<td>图册删除</td>
<td>删除图册及其包含的图片关联</td>
</tr>
<tr>
<td>图片管理</td>
<td>向图册中添加或移除图片</td>
</tr>
</tbody></table></div>

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 嵌入位置">

本功能嵌入在CRM产品详情页中使用，组件标识为`detailImgListConfig`，无独立路由页面。

</KbCard>

<KbCard num="2" title="2.2 API接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums`</td>
<td>GET</td>
<td>查询产品图册列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}`</td>
<td>GET</td>
<td>查询图册详情（含图片）</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums`</td>
<td>POST</td>
<td>新增图册</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}`</td>
<td>PUT</td>
<td>更新图册</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}`</td>
<td>DELETE</td>
<td>删除图册</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}/images`</td>
<td>POST</td>
<td>向图册添加图片</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/imgAlbums/{id}/images/{imageId}`</td>
<td>DELETE</td>
<td>从图册移除图片</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 无工作流">

本功能无审批工作流，数据直接保存生效。

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 图册概念">

- **图册（ImgAlbum）**：多张产品图片的集合，按主题或用途分组
- 一个产品可以有多个图册，如"外观展示图"、"安装示意图"、"细节特写图"等
- 图册是图片的分组管理方式，同一张图片可以属于多个图册

</KbCard>

<KbCard title="3.2 图册数据结构">

- **图册名称（album_name）**：图册的显示名称，如"外观图"、"安装图"
- **图册描述（album_description）**：图册的详细说明
- **图册封面（cover_image_id）**：图册的封面图片，默认取图册中第一张图片
- **图片数量（image_count）**：图册中包含的图片数量
- **排序号（sequence_number）**：图册的显示排序

</KbCard>

<KbCard title="3.3 图册与图片的关系">

- 图册和图片是多对多关系，通过关联表维护
- 一张图片可以属于多个图册
- 图册中的图片支持排序，控制展示顺序
- 图册中的图片支持设置封面图

</KbCard>

<KbCard title="3.4 图册管理操作">

- **新增图册**：填写图册名称和描述，创建空图册
- **向图册添加图片**：从已上传的产品图片中选择添加到图册
- **从图册移除图片**：移除图册与图片的关联，不删除图片本身
- **设置封面图**：指定图册中的一张图片作为封面
- **图册排序**：调整图册的显示顺序
- **图册内图片排序**：调整图册内图片的显示顺序

</KbCard>

<KbCard title="3.5 前端组件detailImgListConfig">

- 组件标识：`detailImgListConfig`
- 嵌入位置：产品详情页的图册Tab页签
- 展示方式：图册以卡片形式展示，点击展开查看图册内图片
- 图片展示：缩略图网格，支持点击查看大图

</KbCard>

<KbCard num="1" title="4.1 产品图册表">

> 表名：PRODUCT_IMG_ALBUM（产品图册表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| product_id | NUMBER | 产品ID | FK→PRODUCT |
| album_name | VARCHAR2 | 图册名称 | NOT NULL |
| album_description | VARCHAR2 | 图册描述 | |
| cover_image_id | NUMBER | 封面图片ID | FK→PRODUCT_IMAGE |
| image_count | NUMBER | 图片数量 | |
| sequence_number | NUMBER | 排序号 | |
| organization_id | NUMBER | 组织ID | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | NUMBER | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 版本号 | 乐观锁 |

</KbCard>

<KbCard num="2" title="4.2 产品图册图片关联表">

> 表名：PRODUCT_IMG_ALBUM_REL（产品图册图片关联表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| album_id | NUMBER | 图册ID | FK→PRODUCT_IMG_ALBUM |
| image_id | NUMBER | 图片ID | FK→PRODUCT_IMAGE |
| sequence_number | NUMBER | 图册内排序号 | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| object_version_number | NUMBER | 版本号 | 乐观锁 |

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
      <span style="font-size:15px;">图册和图片是什么关系？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>多对多关系，一张图片可以属于多个图册
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">从图册移除图片会删除图片吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不会，只移除关联关系，图片本身仍保留
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">图册封面图如何设置？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>默认取图册中第一张图片，可手动指定图册中任意图片为封面
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">图册名称有重复限制吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>同一产品下图册名称建议不重复，具体以业务规则为准
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">detailImgListConfig组件在哪里使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>嵌入在产品详情页的图册Tab页签中
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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|----------|--------|
| 2026-08-03 | V1.0 | 初始创建 | AI |
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
