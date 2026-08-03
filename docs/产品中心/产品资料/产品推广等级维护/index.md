<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="产品推广等级维护" desc="" />

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
用户进入推广等级列表 → 查询现有等级配置 → 新增/编辑/删除推广等级 → 保存生效
```

</KbCard>

<KbCard num="2" title="1.2 核心业务场景">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>场景</th>
<th>说明</th>
</tr>
<tr>
<td>推广等级列表查询</td>
<td>查询已配置的产品推广等级</td>
</tr>
<tr>
<td>推广等级新增</td>
<td>新增推广等级（如A/B/C/D级）</td>
</tr>
<tr>
<td>推广等级编辑</td>
<td>修改推广等级的名称、描述、排序等</td>
</tr>
<tr>
<td>推广等级删除</td>
<td>删除未被引用的推广等级</td>
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
<td>`/product/promoteGradeList`</td>
<td>产品推广等级维护列表页</td>
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
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGrades`</td>
<td>GET</td>
<td>查询推广等级列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGrades/{id}`</td>
<td>GET</td>
<td>查询推广等级详情</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGrades`</td>
<td>POST</td>
<td>新增推广等级</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGrades/{id}`</td>
<td>PUT</td>
<td>更新推广等级</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGrades/{id}`</td>
<td>DELETE</td>
<td>删除推广等级</td>
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
<KbCard title="3.1 推广等级列表页">

- **查询条件**：等级编码、等级名称、启用状态等
- **列表展示字段**：等级编码、等级名称、等级描述、排序号、启用状态、创建时间等
- **操作按钮**：新增、编辑、删除、启用/禁用
- **分页**：支持前端分页参数传递，后端返回分页结果

</KbCard>

<KbCard title="3.2 推广等级数据结构">

- **等级编码（grade_code）**：推广等级的唯一编码，如A、B、C、D等
- **等级名称（grade_name）**：推广等级的显示名称，如"重点推广"、"一般推广"、"限制推广"等
- **等级描述（grade_description）**：推广等级的详细说明
- **排序号（sequence_number）**：等级的排序顺序，数值越小优先级越高
- **启用状态（enabled_flag）**：Y/N，控制等级是否可用

</KbCard>

<KbCard title="3.3 业务规则">

- 推广等级编码在同一组织下唯一
- 推广等级被产品引用后不可删除，只能禁用
- 推广等级控制产品在不同渠道的推广力度，等级越高推广力度越大
- 推广等级与推广等级要求配置（prodPromoteGradesControls）配合使用，等级要求配置定义达到某等级需要满足的条件

</KbCard>

<KbCard num="1" title="4.1 产品推广等级表">

> 表名：PROD_PROMOTE_GRADES（产品推广等级表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| grade_code | VARCHAR2 | 等级编码 | 唯一，如A/B/C/D |
| grade_name | VARCHAR2 | 等级名称 | NOT NULL |
| grade_description | VARCHAR2 | 等级描述 | |
| sequence_number | NUMBER | 排序号 | 数值越小优先级越高 |
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
      <span style="font-size:15px;">推广等级编码有哪些约定？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>通常使用A/B/C/D等字母编码，A为最高等级，D为最低等级
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">推广等级被产品引用后能否删除？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能删除，只能通过启用标志设为N来禁用
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">推广等级和推广等级要求配置的关系？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>推广等级定义等级本身（A/B/C），要求配置定义达到某等级需满足的指标条件（如销售额≥100万为A级）
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">推广等级如何影响业务？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>推广等级控制产品在不同渠道的推广力度，等级越高产品在各渠道的曝光和推广资源越多
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
