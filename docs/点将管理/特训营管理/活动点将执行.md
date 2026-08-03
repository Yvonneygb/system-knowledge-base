<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-15" title="活动点将执行" desc="特训营活动点将的执行管理" />

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


活
动
点
将
申
请
审
批
通
过
 
→
 
执
行
跟
踪
(
查
看
进
度
/
完
成
情
况
)
 
→
 
执
行
完
成


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
查
看
执
行
列
表
<
/
t
d
>


<
t
d
>
查
看
已
审
批
通
过
的
活
动
点
将
申
请
执
行
情
况
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
点
将
申
请
已
审
批
通
过
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
查
看
执
行
详
情
<
/
t
d
>


<
t
d
>
查
看
单
条
活
动
点
将
申
请
的
执
行
进
度
明
细
<
/
t
d
>


<
t
d
>
无
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
跟
踪
执
行
进
度
<
/
t
d
>


<
t
d
>
实
时
查
看
执
行
完
成
率
、
关
键
节
点
状
态
<
/
t
d
>


<
t
d
>
无
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
<td>`/general/activityGeneral/activityGeneralExecute/list`</td>
<td>活动点将执行列表页</td>
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
<td>`mlt/activityApply/query`</td>
<td>查询活动点将申请列表（筛选执行中/已完成状态）</td>
</tr>
<tr>
<td>`mlt/activityApply/detail`</td>
<td>查询活动点将申请执行详情</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.3 核心实体">

**ActivityApply**（复用活动点将申请实体，筛选执行阶段数据）

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
<td>申请状态（执行中/已完成）</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.4 列表筛选条件">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>筛选项</th>
<th>说明</th>
<th>默认值</th>
</tr>
<tr>
<td>活动名称</td>
<td>按活动名称模糊筛选</td>
<td>无</td>
</tr>
<tr>
<td>申请编码</td>
<td>按申请编码筛选</td>
<td>无</td>
</tr>
<tr>
<td>执行状态</td>
<td>按执行状态筛选</td>
<td>执行中</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="activity_apply（活动点将申请主表，同活动点将管理）">

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| apply_code | VARCHAR2(32) | 申请编码 | PK |
| activity_name | VARCHAR2(200) | 活动名称 | NOT NULL |
| activity_type | VARCHAR2(30) | 活动类型 | |
| apply_status | VARCHAR2(30) | 申请状态 | NOT NULL |
| execution_progress | NUMBER(5,2) | 执行完成率(%) | |
| planner_id | NUMBER | 策划师ID | NOT NULL |
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
