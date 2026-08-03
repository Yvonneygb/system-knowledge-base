<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品分类" desc="" />

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
用户进入产品分类管理 → 查询分类树结构 → 新增/编辑/删除分类节点 → 保存生效
```

</KbCard>

<KbCard num="2" title="1.2 核心业务场景">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>场景</th>
<th>说明</th>
</tr>
<tr>
<td>分类树查询</td>
<td>查询产品分类的树形结构</td>
</tr>
<tr>
<td>分类新增</td>
<td>在指定节点下新增子分类</td>
</tr>
<tr>
<td>分类编辑</td>
<td>修改分类名称、编码、排序等</td>
</tr>
<tr>
<td>分类删除</td>
<td>删除未被产品引用的分类节点</td>
</tr>
<tr>
<td>分类移动</td>
<td>将分类节点移动到其他父节点下</td>
</tr>
</tbody></table></div>

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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">分类层级最多支持几级？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>一般不超过5级，具体以系统配置为准
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">删除有子分类的节点会怎样？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>需先处理子分类（删除或移动），不可直接删除有子节点的分类
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">分类编码可以修改吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>分类编码被产品引用后不建议修改，可能影响关联关系
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">本菜单在CRM前端如何使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>作为嵌入式组件嵌入在CRM产品详情页中，通过AE微服务接口获取分类数据
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">手动分类和自动分类的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>手动分类由用户维护分类体系，自动分类由系统根据规则自动归类
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
