<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品图片上传" desc="" />

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
用户进入产品详情页 → 在图片区域点击上传 → 选择图片文件 → 上传至服务器 → 图片关联到产品 → 展示缩略图
```

</KbCard>

<KbCard num="2" title="1.2 核心业务场景">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>场景</th>
<th>说明</th>
</tr>
<tr>
<td>图片上传</td>
<td>上传产品图片，支持单张/批量上传</td>
</tr>
<tr>
<td>图片预览</td>
<td>查看已上传的产品图片大图</td>
</tr>
<tr>
<td>图片删除</td>
<td>删除已上传的产品图片</td>
</tr>
<tr>
<td>图片排序</td>
<td>调整产品图片的显示顺序</td>
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

本功能嵌入在CRM产品详情页中使用，无独立路由页面。

</KbCard>

<KbCard num="2" title="2.2 API接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/images`</td>
<td>GET</td>
<td>查询产品图片列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/images`</td>
<td>POST</td>
<td>上传产品图片</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/images/{id}`</td>
<td>DELETE</td>
<td>删除产品图片</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{productId}/images/sort`</td>
<td>PUT</td>
<td>调整图片排序</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 无工作流">

本功能无审批工作流，图片上传后直接生效。

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 上传功能">

- **上传方式**：点击上传按钮或拖拽上传
- **文件格式限制**：支持JPG、JPEG、PNG、GIF、BMP等常见图片格式
- **文件大小限制**：单张图片一般不超过5MB，具体以系统配置为准
- **批量上传**：支持一次选择多张图片上传
- **上传进度**：显示上传进度条，支持上传失败重试

</KbCard>

<KbCard title="3.2 图片处理">

- **缩略图生成**：上传后系统自动生成缩略图，用于列表展示
- **图片压缩**：大图自动压缩到合理尺寸，减少存储和加载开销
- **水印**：可根据配置自动添加产品水印
- **主图设置**：第一张上传的图片默认为主图，可手动调整

</KbCard>

<KbCard title="3.3 图片管理">

- **图片列表**：在产品详情页以缩略图网格展示
- **图片预览**：点击缩略图可查看大图，支持左右切换
- **图片删除**：支持删除单张图片，主图删除后自动将下一张设为主图
- **图片排序**：支持拖拽排序调整显示顺序
- **主图标记**：排序第一的图片自动标记为主图

</KbCard>

<KbCard title="3.4 存储方式">

- 图片文件存储在文件服务器或对象存储（如OSS/S3）
- 数据库中存储文件的相对路径和关联信息
- 图片URL通过文件服务获取，支持CDN加速

</KbCard>

<KbCard num="1" title="4.1 产品图片表">

> 表名：PRODUCT_IMAGE（产品图片表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| product_id | NUMBER | 产品ID | FK→PRODUCT |
| file_name | VARCHAR2 | 文件名 | |
| file_path | VARCHAR2 | 文件路径 | 相对路径 |
| file_url | VARCHAR2 | 文件访问URL | |
| file_size | NUMBER | 文件大小（字节） | |
| file_type | VARCHAR2 | 文件类型 | JPG/PNG/GIF等 |
| thumbnail_path | VARCHAR2 | 缩略图路径 | |
| thumbnail_url | VARCHAR2 | 缩略图URL | |
| sequence_number | NUMBER | 排序号 | 排序第一为主图 |
| is_primary | VARCHAR2 | 是否主图 | Y/N |
| organization_id | NUMBER | 组织ID | |
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
      <span style="font-size:15px;">支持哪些图片格式？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>支持JPG、JPEG、PNG、GIF、BMP等常见格式
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">单张图片大小限制是多少？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>一般不超过5MB，具体以系统配置为准
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">主图如何设置？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>排序第一的图片自动为主图，可通过拖拽排序调整
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">图片上传失败怎么办？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>检查文件格式和大小是否超限，网络是否正常，支持重新上传
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">图片存储在哪里？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>文件服务器或对象存储（如OSS/S3），数据库存储路径信息
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
