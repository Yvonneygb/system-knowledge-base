<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-02" title="活动点将管理" desc="策划师活动点将管理" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">
#
#
 
一
、
业
务
流
程




`
`
`


提
交
活
动
点
将
申
请
(
a
c
t
i
v
i
t
y
A
p
p
l
y
A
p
p
r
o
v
a
l
)
 
→
 
审
批
通
过
 
→
 
执
行
中
 
→
 
发
起
取
消
申
请
(
a
c
t
i
v
i
t
y
C
a
n
c
e
l
A
p
p
l
y
O
r
g
A
p
p
r
o
v
a
l
)
 
→
 
取
消
审
批
通
过
 
→
 
已
取
消


`
`
`




<
d
i
v
 
c
l
a
s
s
=
"
k
b
-
f
i
e
l
d
-
s
c
r
o
l
l
"
>
<
t
a
b
l
e
 
c
l
a
s
s
=
"
k
b
-
f
i
e
l
d
-
t
b
l
"
>
<
t
b
o
d
y
>


<
t
r
>


<
t
h
>
操
作
<
/
t
h
>


<
t
h
>
说
明
<
/
t
h
>


<
t
h
>
前
置
条
件
<
/
t
h
>


<
/
t
r
>


<
t
r
>


<
t
d
>
提
交
申
请
<
/
t
d
>


<
t
d
>
策
划
师
发
起
活
动
点
将
申
请
，
触
发
a
c
t
i
v
i
t
y
A
p
p
l
y
A
p
p
r
o
v
a
l
审
批
流
<
/
t
d
>


<
t
d
>
活
动
信
息
已
填
写
完
整
<
/
t
d
>


<
/
t
r
>


<
t
r
>


<
t
d
>
审
批
<
/
t
d
>


<
t
d
>
审
批
人
审
批
活
动
点
将
申
请
（
同
意
/
拒
绝
）
<
/
t
d
>


<
t
d
>
申
请
状
态
为
待
审
批
<
/
t
d
>


<
/
t
r
>


<
t
r
>


<
t
d
>
取
消
申
请
<
/
t
d
>


<
t
d
>
发
起
取
消
申
请
，
触
发
a
c
t
i
v
i
t
y
C
a
n
c
e
l
A
p
p
l
y
O
r
g
A
p
p
r
o
v
a
l
审
批
流
<
/
t
d
>


<
t
d
>
申
请
已
审
批
通
过
且
未
完
成
执
行
<
/
t
d
>


<
/
t
r
>


<
t
r
>


<
t
d
>
取
消
审
批
<
/
t
d
>


<
t
d
>
审
批
人
审
批
取
消
申
请
（
同
意
/
拒
绝
）
<
/
t
d
>


<
t
d
>
取
消
申
请
状
态
为
待
审
批
<
/
t
d
>


<
/
t
r
>


<
/
t
b
o
d
y
>
<
/
t
a
b
l
e
>
<
/
d
i
v
>


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
<td>`/general/activityGeneral/activityGeneralManage/list`</td>
<td>活动点将管理列表页</td>
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
<td>`mlt/activityApply/create`</td>
<td>提交活动点将申请</td>
</tr>
<tr>
<td>`mlt/activityApply/update`</td>
<td>修改活动点将申请</td>
</tr>
<tr>
<td>`mlt/activityApply/query`</td>
<td>查询活动点将申请列表</td>
</tr>
<tr>
<td>`mlt/activityApply/detail`</td>
<td>查询活动点将申请详情</td>
</tr>
<tr>
<td>`mlt/activityApply/submit`</td>
<td>提交审批</td>
</tr>
<tr>
<td>`mlt/activityApply/approve`</td>
<td>审批通过</td>
</tr>
<tr>
<td>`mlt/activityApply/reject`</td>
<td>审批拒绝</td>
</tr>
<tr>
<td>`mlt/activityApply/cancelApply`</td>
<td>发起取消申请</td>
</tr>
<tr>
<td>`mlt/activityApply/cancelApprove`</td>
<td>取消审批通过</td>
</tr>
<tr>
<td>`mlt/activityApply/cancelReject`</td>
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
<td>activityApplyApproval</td>
<td>活动点将申请审批</td>
<td>提交活动点将申请时触发</td>
</tr>
<tr>
<td>activityCancelApplyOrgApproval</td>
<td>活动取消申请组织级审批</td>
<td>发起取消申请时触发</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.4 核心实体">

**ActivityApply**

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
<td>activity_name</td>
<td>活动名称</td>
</tr>
<tr>
<td>apply_status</td>
<td>申请状态</td>
</tr>
<tr>
<td>approval_state</td>
<td>审批状态</td>
</tr>
<tr>
<td>cancel_approval_state</td>
<td>取消审批状态</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="activity_apply（活动点将申请主表）">

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| apply_code | VARCHAR2(32) | 申请编码 | PK |
| activity_name | VARCHAR2(200) | 活动名称 | NOT NULL |
| activity_type | VARCHAR2(30) | 活动类型 | |
| apply_status | VARCHAR2(30) | 申请状态 | NOT NULL |
| approval_state | VARCHAR2(30) | 审批状态 | |
| cancel_approval_state | VARCHAR2(30) | 取消审批状态 | |
| planner_id | NUMBER | 策划师ID | NOT NULL |
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
