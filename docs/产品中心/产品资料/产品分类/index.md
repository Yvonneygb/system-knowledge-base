<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-05" title="产品分类" desc="产品分类树的管理维护" />

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
<KbCard num="1" title="2.1 后端Controller">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>项目</th>
<th>说明</th>
</tr>
<tr>
<td>Controller</td>
<td>ManualClassificationController</td>
</tr>
<tr>
<td>基础路径</td>
<td>`/v1/{organizationId}/manual-classification/`</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="2" title="2.2 API接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>`/v1/{organizationId}/manual-classification/`</td>
<td>GET</td>
<td>查询分类列表/树</td>
</tr>
<tr>
<td>`/v1/{organizationId}/manual-classification/{id}`</td>
<td>GET</td>
<td>查询分类详情</td>
</tr>
<tr>
<td>`/v1/{organizationId}/manual-classification/`</td>
<td>POST</td>
<td>新增分类</td>
</tr>
<tr>
<td>`/v1/{organizationId}/manual-classification/{id}`</td>
<td>PUT</td>
<td>更新分类</td>
</tr>
<tr>
<td>`/v1/{organizationId}/manual-classification/{id}`</td>
<td>DELETE</td>
<td>删除分类</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 无工作流">

本菜单无审批工作流，数据直接保存生效。

</KbCard>

<KbCard num="4" title="2.4 嵌入使用">

本菜单作为嵌入式组件，嵌入在CRM产品详情页中使用，前端在arrow-crm包中调用AE微服务接口。

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 分类树结构">

- 产品分类采用树形结构，支持多级分类
- 顶级分类为根节点，下级分类为子节点
- 每个分类节点包含：分类编码、分类名称、父分类ID、层级、排序号等
- 分类树支持展开/折叠操作

</KbCard>

<KbCard title="3.2 分类数据结构">

- **分类编码（class_code）**：分类的唯一编码
- **分类名称（class_name）**：分类的显示名称
- **父分类ID（parent_class_id）**：上级分类ID，顶级分类为空或0
- **层级（level_number）**：分类在树中的层级，从1开始
- **排序号（sequence_number）**：同级分类的排序顺序
- **分类描述（description）**：分类的详细说明
- **启用标志（enabled_flag）**：Y/N，控制分类是否可用

</KbCard>

<KbCard title="3.3 业务规则">

- 分类编码在同一组织下唯一
- 分类被产品引用后不可删除，只能禁用
- 删除父分类时需先处理子分类（级联删除或移动子分类）
- 分类层级深度有限制，一般不超过5级
- 分类排序号影响同级分类的显示顺序

</KbCard>

<KbCard title="3.4 与产品关联">

- 产品通过product_category字段关联到分类编码
- 一个产品只能归属一个主分类
- 分类变更不影响已关联产品的分类归属，需手动调整

</KbCard>

<KbCard num="1" title="4.1 产品分类表">

> 表名：ITEM_CLASS（产品分类表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| class_code | VARCHAR2 | 分类编码 | 唯一 |
| class_name | VARCHAR2 | 分类名称 | NOT NULL |
| parent_class_id | NUMBER | 父分类ID | 顶级为空 |
| level_number | NUMBER | 层级 | 从1开始 |
| sequence_number | NUMBER | 排序号 | 同级排序 |
| description | VARCHAR2 | 分类描述 | |
| enabled_flag | VARCHAR2 | 启用标志 | Y/N |
| organization_id | NUMBER | 组织ID | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | NUMBER | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
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
