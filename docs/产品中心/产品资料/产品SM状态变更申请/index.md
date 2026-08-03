<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-03" title="产品SM状态变更申请" desc="产品SM状态的变更申请、审批管理" />

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
<td>ProductOverHeaderController</td>
</tr>
<tr>
<td>基础路径</td>
<td>`/v1/{organizationId}/product-over-headers`</td>
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
<td>`/v1/{organizationId}/product-over-headers`</td>
<td>GET</td>
<td>查询变更申请列表</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers/{id}`</td>
<td>GET</td>
<td>查询变更申请详情（含行）</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers`</td>
<td>POST</td>
<td>新增变更申请</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers/{id}`</td>
<td>PUT</td>
<td>更新变更申请</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers/{id}`</td>
<td>DELETE</td>
<td>删除变更申请（仅草稿）</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers/{id}/submit`</td>
<td>POST</td>
<td>提交审批</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers/{id}/approve`</td>
<td>POST</td>
<td>审批通过</td>
</tr>
<tr>
<td>`/v1/{organizationId}/product-over-headers/{id}/reject`</td>
<td>POST</td>
<td>审批驳回</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="3" title="2.3 工作流">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>项目</th>
<th>说明</th>
</tr>
<tr>
<td>工作流实体</td>
<td>PRODUCT_OVER_HEADER</td>
</tr>
<tr>
<td>工作流名称</td>
<td>产品SM状态变更</td>
</tr>
<tr>
<td>审批节点</td>
<td>根据工作流配置，支持多级审批</td>
</tr>
</tbody></table></div>

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 变更申请头（PRODUCT_OVER_HEADER）">

- **申请单号（apply_no）**：系统自动生成，格式按编码规则
- **申请人（applicant）**：当前登录用户
- **申请日期（apply_date）**：默认当前日期
- **变更原因（change_reason）**：必填，说明SM状态变更原因
- **申请状态（apply_status）**：草稿/待审批/审批中/已通过/已驳回/已撤回
- **审批意见（approval_comment）**：审批人填写的意见

</KbCard>

<KbCard title="3.2 变更申请行（PRODUCT_OVER_LINE）">

- 每行对应一个产品的SM状态变更
- **产品ID（product_id）**：关联产品
- **产品编码（product_code）**：产品编码
- **产品名称（product_name）**：产品名称
- **当前SM状态（current_sm_status）**：变更前的SM状态
- **目标SM状态（target_sm_status）**：变更后的SM状态
- **行备注（line_remark）**：行级备注说明

</KbCard>

<KbCard title="3.3 SM状态说明">

- SM（Sales Management）状态用于控制产品在销售管理中的可用性
- 常见SM状态：正常销售/限制销售/停止销售/淘汰等
- SM状态变更需审批，防止随意变更影响业务

</KbCard>

<KbCard title="3.4 审批通过后处理">

- 审批通过后，系统自动将行中产品的SM状态更新为目标SM状态
- 更新操作在事务中执行，确保头和行数据一致性
- 状态更新后触发相关业务通知

</KbCard>

<KbCard title="3.5 数据校验">

- 申请单号唯一性校验
- 目标SM状态不可与当前SM状态相同
- 产品必须存在且有效
- 草稿状态才可编辑和删除

</KbCard>

<KbCard num="1" title="4.1 产品SM#状态变更头表">

> 表名：PRODUCT_OVER_HEADER（产品SM状态变更头表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| apply_no | VARCHAR2 | 申请单号@ |D| 唯一，自动生成 |
| applicant | NUMBER | 申请人 | |
| apply_date | DATE | 申请日期 | |
| change_reason | VARCHAR2 | 变更原因 | NOT NULL |
| apply_status | VARCHAR2 | 申请状态 | DRAFT/SUBMITTED/APPROVING/APPROVED/REJECTED/WITHDRAWN |
| approval_comment | VARCHAR2 | 审批意见 | |
| organization_id | NUMBER | 组织ID | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | NUMBER | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |
| object_version_number | NUMBER | 版本号 | 乐观锁 |

</KbCard>

<KbCard num="2" title="4.2 产品SM状态变更行表">

> 表名：PRODUCT_OVER_LINE（产品SM状态变更行表）

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | NUMBER | 主键ID | PK |
| header_id | NUMBER | 变更头ID | FK→PRODUCT_OVER_HEADER |
| line_number | NUMBER | 行号 | |
| product_id | NUMBER | 产品ID | FK→PRODUCT |
| product_code | VARCHAR2 | 产品编码 | |
| product_name | VARCHAR2 | 产品名称 | |
| current_sm_status | VARCHAR2 | 当前SM状态 | |
| target_sm_status | VARCHAR2 | 目标SM状态 | |
| line_remark | VARCHAR2 | 行备注 | |
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
