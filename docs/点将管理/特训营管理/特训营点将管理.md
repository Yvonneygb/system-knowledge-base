<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-16" title="特训营点将管理" desc="特训营点将的申请管理" />

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
</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 前端路由">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>路由</th>
<th>用途</th>
</tr>
<tr>
<td>`/general/specialTrainingCamp/campGeneral/list`</td>
<td>特训营点将列表页</td>
</tr>
<tr>
<td>`/general/specialTrainingCamp/campGeneral/detail/:applyCode/:type`</td>
<td>特训营点将详情页（type=apply/approval/cancelApply）</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 API接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口路径</th>
<th>说明</th>
</tr>
<tr>
<td>`mlt/trainCampApply/create`</td>
<td>提交点将申请</td>
</tr>
<tr>
<td>`mlt/trainCampApply/update`</td>
<td>修改点将申请</td>
</tr>
<tr>
<td>`mlt/trainCampApply/query`</td>
<td>查询点将申请列表</td>
</tr>
<tr>
<td>`mlt/trainCampApply/detail`</td>
<td>查询点将申请详情</td>
</tr>
<tr>
<td>`mlt/trainCampApply/submit`</td>
<td>提交审批</td>
</tr>
<tr>
<td>`mlt/trainCampApply/approve`</td>
<td>审批通过</td>
</tr>
<tr>
<td>`mlt/trainCampApply/reject`</td>
<td>审批拒绝</td>
</tr>
<tr>
<td>`mlt/trainCampApply/cancelApply`</td>
<td>发起取消申请</td>
</tr>
<tr>
<td>`mlt/trainCampApply/cancelApprove`</td>
<td>取消审批通过</td>
</tr>
<tr>
<td>`mlt/trainCampApply/cancelReject`</td>
<td>取消审批拒绝</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.3 内置审批">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>审批流编码</th>
<th>说明</th>
<th>触发时机</th>
</tr>
<tr>
<td>campApplyApproval</td>
<td>点将申请审批</td>
<td>提交点将申请时触发</td>
</tr>
<tr>
<td>cancelApplyApproval</td>
<td>取消申请审批</td>
<td>发起取消申请时触发</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.4 值集定义">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>值集编码</th>
<th>说明</th>
<th>典型值</th>
</tr>
<tr>
<td>MBO.APPLY_APPROVAL_STATE</td>
<td>申请审批状态</td>
<td>待审批/已通过/已拒绝</td>
</tr>
<tr>
<td>MBO.CAMP_APPLY_STATE</td>
<td>特训营点将申请状态</td>
<td>草稿/待审批/已通过/已拒绝/已取消/执行中/已完成</td>
</tr>
<tr>
<td>MBO.CANCEL_APPROVAL_STATE</td>
<td>取消审批状态</td>
<td>待审批/已通过/已拒绝</td>
</tr>
<tr>
<td>MBO.CRM_ORDER_STATUS</td>
<td>CRM订单状态</td>
<td>待下单/已下单/已发货/已完成</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.5 核心实体">

**TrainCampApply**

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>字段</th>
<th>说明</th>
</tr>
<tr>
<td>apply_code</td>
<td>申请编码（主键）</td>
</tr>
<tr>
<td>camp_code</td>
<td>特训营编码（FK）</td>
</tr>
<tr>
<td>apply_status</td>
<td>申请状态（值集：MBO.CAMP_APPLY_STATE）</td>
</tr>
<tr>
<td>approval_state</td>
<td>审批状态（值集：MBO.APPLY_APPROVAL_STATE）</td>
</tr>
<tr>
<td>cancel_approval_state</td>
<td>取消审批状态（值集：MBO.CANCEL_APPROVAL_STATE）</td>
</tr>
<tr>
<td>crm_order_status</td>
<td>CRM订单状态（值集：MBO.CRM_ORDER_STATUS）</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="train_camp_apply（特训营点将申请主表）">

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| apply_code | VARCHAR2(32) | 申请编码 | PK |
| camp_code | VARCHAR2(32) | 特训营编码 | FK → train_camp.camp_code |
| apply_status | VARCHAR2(30) | 申请状态 | NOT NULL |
| approval_state | VARCHAR2(30) | 审批状态 | |
| cancel_approval_state | VARCHAR2(30) | 取消审批状态 | |
| crm_order_status | VARCHAR2(30) | CRM订单状态 | |
| applicant_id | NUMBER | 申请人ID | |
| apply_date | DATE | 申请日期 | |
| cancel_apply_date | DATE | 取消申请日期 | |
| created_by | NUMBER | 创建人 | |
| creation_date | DATE | 创建时间 | |
| last_updated_by | NUMBER | 最后更新人 | |
| last_update_date | DATE | 最后更新时间 | |

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

| 日期 | 版本 | 更新内容 | 作者 |
|------|------|----------|------|
| 2026-08-03 | v1.0 | 初始文档 | AI |
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
