<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-08" title="产品图片上传" desc="产品图片的上传与管理" />

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

</div>
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
