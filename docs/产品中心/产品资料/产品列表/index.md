<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品列表" desc="" />

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
用户进入产品列表页 → 输入查询条件 → 调用API查询产品列表 → 展示产品基础信息
                                                    ↓
用户点击新增/编辑 → 进入产品详情页 → 填写产品信息 → 保存 → 返回列表页
```

</KbCard>

<KbCard num="2" title="1.2 核心业务场景">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>场景</th>
<th>说明</th>
</tr>
<tr>
<td>产品列表查询</td>
<td>按编码/名称/分类/状态等条件分页查询产品</td>
</tr>
<tr>
<td>产品详情查看</td>
<td>查看产品完整基础信息</td>
</tr>
<tr>
<td>产品新增</td>
<td>创建新产品基础信息</td>
</tr>
<tr>
<td>产品编辑</td>
<td>修改已有产品基础信息</td>
</tr>
</tbody></table></div>

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 前端路由">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>路由</th>
<th>说明</th>
</tr>
<tr>
<td>`/product/list`</td>
<td>产品列表页</td>
</tr>
<tr>
<td>`/product/detail/:id`</td>
<td>产品详情页（:id为产品ID）</td>
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
<td>`CRM_BUSINESS/v1/{orgId}/product`</td>
<td>GET</td>
<td>查询产品列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{id}`</td>
<td>GET</td>
<td>查询产品详情</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product`</td>
<td>POST</td>
<td>新增产品</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/product/{id}`</td>
<td>PUT</td>
<td>更新产品</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 无工作流">

本菜单无审批工作流，数据直接保存生效。

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 产品列表页">

- **查询条件**：产品编码、产品名称、产品型号、产品分类、产品状态、规格等
- **列表展示字段**：产品编码、产品名称、产品型号、产品分类、规格、计量单位、产品状态、创建时间等
- **操作按钮**：新增、编辑、查看详情、删除
- **分页**：支持前端分页参数传递，后端返回分页结果

</KbCard>

<KbCard title="3.2 产品详情页">

- **基础信息区域**：
  - 产品编码（product_code）：唯一标识，新建时自动生成或手动输入
  - 产品名称（product_name）：必填
  - 产品型号（product_model）：产品型号描述
  - 产品分类（product_category）：关联产品分类体系
  - 规格（specification）：产品规格描述
  - 计量单位（uom）：关联计量单位LOV
  - 产品状态（product_status）：启用/禁用
  - 产品描述（description）：文本描述

- **Tab页签**：产品详情页可能包含多个Tab页签，如基础信息、产品图片、产品图册、产品分类等嵌入式组件

</KbCard>

<KbCard title="3.3 数据校验">

- 产品编码唯一性校验
- 产品名称必填校验
- 产品分类有效性校验

</KbCard>

<KbCard num="1" title="4.1 产品主表">

> 表名：PRODUCT（产品主表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| product_code | VARCHAR2 | 产品编码 | 唯一 |
| product_name | VARCHAR2 | 产品名称 | NOT NULL |
| product_model | VARCHAR2 | 产品型号 | |
| product_category | VARCHAR2 | 产品分类 | |
| specification | VARCHAR2 | 规格 | |
| uom | VARCHAR2 | 计量单位 | |
| product_status | VARCHAR2 | 产品状态 | |
| description | VARCHAR2 | 产品描述 | |
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
      <span style="font-size:15px;">产品编码如何生成？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>根据系统编码规则自动生成，或由用户手动输入，需保证唯一性
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">产品分类从哪里获取？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>产品分类数据来源于AE微服务的ITEM_CLASS表，通过嵌入式组件在详情页中展示
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">产品删除有什么限制？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>已被业务引用的产品不可删除，需先解除关联关系
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">产品状态变更如何操作？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>在产品列表或详情页直接修改状态字段，无需审批流程
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
