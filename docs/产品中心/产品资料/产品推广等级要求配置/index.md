<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-10" title="产品推广等级要求配置" desc="产品推广等级要求的配置管理" />

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
<td>`/product/promoteGradeFieldList`</td>
<td>产品推广等级要求配置列表页</td>
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
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGradesControls`</td>
<td>GET</td>
<td>查询等级要求配置列表</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGradesControls/{id}`</td>
<td>GET</td>
<td>查询配置详情</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGradesControls`</td>
<td>POST</td>
<td>新增配置</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGradesControls/{id}`</td>
<td>PUT</td>
<td>更新配置</td>
</tr>
<tr>
<td>`CRM_BUSINESS/v1/{orgId}/prodPromoteGradesControls/{id}`</td>
<td>DELETE</td>
<td>删除配置</td>
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
<KbCard title="3.1 等级要求配置列表页">

- **查询条件**：推广等级、指标名称、启用状态等
- **列表展示字段**：推广等级、指标名称、指标类型、比较运算符、阈值、单位、启用状态等
- **操作按钮**：新增、编辑、删除、启用/禁用
- **分页**：支持前端分页参数传递，后端返回分页结果

</KbCard>

<KbCard title="3.2 配置数据结构">

- **关联推广等级（promote_grade_id）**：关联PROD_PROMOTE_GRADES表，指定此条件属于哪个推广等级
- **指标名称（indicator_name）**：考核指标名称，如"销售额"、"销售量"、"毛利率"等
- **指标类型（indicator_type）**：指标的数据类型，如金额（AMOUNT）、数量（QUANTITY）、比率（RATE）等
- **比较运算符（comparison_operator）**：比较方式，如≥（大于等于）、&gt;（大于）、=（等于）等
- **阈值（threshold_value）**：达标的标准值，如销售额≥1000000中的1000000
- **单位（unit）**：阈值的计量单位，如元、件、%等
- **启用状态（enabled_flag）**：Y/N，控制此条件是否生效

</KbCard>

<KbCard title="3.3 业务规则">

- 同一推广等级可配置多个要求条件，需同时满足才能达到该等级
- 条件之间为"且"的关系，即所有条件都满足才算达标
- 指标类型为AMOUNT时，阈值以元为单位
- 指标类型为QUANTITY时，阈值以件/台等为单位
- 指标类型为RATE时，阈值为百分比数值（如30表示30%）
- 配置变更后，产品的推广等级需重新评估

</KbCard>

<KbCard title="3.4 等级评估逻辑示例">

```
A级要求：销售额≥100万 且 销售量≥1000件
B级要求：销售额≥50万  且 销售量≥500件
C级要求：销售额≥10万  且 销售量≥100件
D级要求：无特殊要求（默认等级）

产品实际销售额80万，销售量600件 → 满足B级，不满足A级 → 推广等级为B
```

</KbCard>

<KbCard num="1" title="4.1 产品推广等级要求配置表">

> 表名：PROD_PROMOTE_GRADES_CONTROLS（产品推广等级要求配置表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| promote_grade_id | NUMBER | 推广等级ID | FK→PROD_PROMOTE_GRADES |
| indicator_name | VARCHAR2 | 指标名称 | 如销售额/销售量/毛利率 |
| indicator_type | VARCHAR2 | 指标类型 | AMOUNT/QUANTITY/RATE |
| comparison_operator | VARCHAR2 | 比较运算符 | GTE/GT/EQ/LTE/LT |
| threshold_value | NUMBER | 阈值 | 达标标准值 |
| unit | VARCHAR2 | 单位 | 元/件/%等 |
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
