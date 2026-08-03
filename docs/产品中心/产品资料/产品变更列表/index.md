<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-04" title="产品变更列表" desc="产品变更记录的列表查询" />

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
<KbCard num="1" title="2.1 前端路由">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>路由</th>
<th>说明</th>
</tr>
<tr>
<td>`/product/changeList`</td>
<td>产品变更列表页</td>
</tr>
<tr>
<td>`/product/changeDetail/:id?`</td>
<td>产品变更详情页（:id可选，无id时为新建）</td>
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
<td>`CRM_BUSINESS/v1/{orgId}/productChange`</td>
<td>GET</td>
<td>查询产品变更列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/productChange/{id}`</td>
<td>GET</td>
<td>查询产品变更详情</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 无工作流">

本菜单无审批工作流，变更记录由系统自动生成或由业务操作触发。

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 产品变更列表页">

- **查询条件**：产品编码、产品名称、变更类型、变更时间范围、变更人等
- **列表展示字段**：变更单号、产品编码、产品名称、变更类型、变更前值、变更后值、变更人、变更时间等
- **操作按钮**：查看详情
- **分页**：支持前端分页参数传递，后端返回分页结果

</KbCard>

<KbCard title="3.2 产品变更详情页">

- **变更基础信息**：
  - 变更单号（change_no）：系统自动生成
  - 产品编码（product_code）：关联产品
  - 变更类型（change_type）：价格变更/状态变更/属性变更等
  - 变更原因（change_reason）：变更原因描述
  - 变更人（changed_by）：执行变更的人员
  - 变更时间（change_date）：变更发生的时间

- **变更明细区域**：
  - 变更字段（changed_field）：发生变更的具体字段
  - 变更前值（before_value）：变更前的值
  - 变更后值（after_value）：变更后的值

</KbCard>

<KbCard title="3.3 变更记录生成逻辑">

- 产品价格变更时自动生成变更记录
- 产品状态变更时自动生成变更记录
- 产品属性（型号/规格/分类等）变更时自动生成变更记录
- 变更记录不可编辑和删除，仅作查询和追溯用途

</KbCard>

<KbCard num="1" title="4.1 产品变更头表">

> 表名：PRODUCT_CHANGE_HEADER（产品变更头表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| change_no | VARCHAR2 | 变更单号 | 唯一，自动生成 |
| product_id | NUMBER | 产品ID | FK→PRODUCT |
| product_code | VARCHAR2 | 产品编码 | |
| product_name | VARCHAR2 | 产品名称 | |
| change_type | VARCHAR2 | 变更类型 | PRICE/STATUS/ATTRIBUTE等 |
| change_reason | VARCHAR2 | 变更原因 | |
| changed_by | NUMBER | 变更人 | |
| change_date | DATE | 变更时间 | |
| organization_id | NUMBER | 组织ID | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | NUMBER | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 版本号 | 乐观锁 |

</KbCard>

<KbCard num="2" title="4.2 产品变更行表">

> 表名：PRODUCT_CHANGE_LINE（产品变更行表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| header_id | NUMBER | 变更头ID | FK→PRODUCT_CHANGE_HEADER |
| changed_field | VARCHAR2 | 变更字段 | |
| field_name | VARCHAR2 | 字段名称 | |
| before_value | VARCHAR2 | 变更前值 | |
| after_value | VARCHAR2 | 变更后值 | |
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
