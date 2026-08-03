<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-01" title="特训营管理" desc="特训营主数据管理" />

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


新
增
特
训
营
 
→
 
编
辑
配
置
(
时
间
/
地
点
/
讲
师
)
 
→
 
启
动
特
训
营
 
→
 
结
束
特
训
营


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
新
增
<
/
t
d
>


<
t
d
>
创
建
特
训
营
基
本
信
息
，
生
成
c
a
m
p
C
o
d
e
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
编
辑
<
/
t
d
>


<
t
d
>
修
改
特
训
营
配
置
信
息
<
/
t
d
>


<
t
d
>
特
训
营
状
态
为
草
稿
/
未
启
动
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
启
动
<
/
t
d
>


<
t
d
>
将
特
训
营
状
态
变
更
为
进
行
中
<
/
t
d
>


<
t
d
>
特
训
营
已
配
置
完
整
（
时
间
、
地
点
、
讲
师
）
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
结
束
<
/
t
d
>


<
t
d
>
将
特
训
营
状
态
变
更
为
已
结
束
<
/
t
d
>


<
t
d
>
特
训
营
状
态
为
进
行
中
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
<td>`/general/specialTrainingCamp/camp/list`</td>
<td>特训营列表页</td>
</tr>
<tr>
<td>`/general/specialTrainingCamp/camp/detail/:id/:type`</td>
<td>特训营详情页（type区分新增/编辑/查看）</td>
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
<td>`mlt/trainCamp/create`</td>
<td>新增特训营</td>
</tr>
<tr>
<td>`mlt/trainCamp/update`</td>
<td>编辑特训营</td>
</tr>
<tr>
<td>`mlt/trainCamp/query`</td>
<td>查询特训营列表</td>
</tr>
<tr>
<td>`mlt/trainCamp/detail`</td>
<td>查询特训营详情</td>
</tr>
<tr>
<td>`mlt/trainCamp/start`</td>
<td>启动特训营</td>
</tr>
<tr>
<td>`mlt/trainCamp/end`</td>
<td>结束特训营</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.3 值集定义">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>值集编码</th>
<th>说明</th>
<th>典型值</th>
</tr>
<tr>
<td>MBO.CAMP_TYPE</td>
<td>特训营类型</td>
<td>线上/线下/混合</td>
</tr>
<tr>
<td>MBO.CAMP_STATUS</td>
<td>特训营状态</td>
<td>草稿/进行中/已结束</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.4 核心实体">

**TrainCamp**

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>字段</th>
<th>说明</th>
</tr>
<tr>
<td>camp_code</td>
<td>特训营编码（主键）</td>
</tr>
<tr>
<td>camp_name</td>
<td>特训营名称</td>
</tr>
<tr>
<td>camp_type</td>
<td>特训营类型（值集：MBO.CAMP_TYPE）</td>
</tr>
<tr>
<td>camp_status</td>
<td>特训营状态（值集：MBO.CAMP_STATUS）</td>
</tr>
<tr>
<td>start_date</td>
<td>开始日期</td>
</tr>
<tr>
<td>end_date</td>
<td>结束日期</td>
</tr>
<tr>
<td>location</td>
<td>地点</td>
</tr>
<tr>
<td>teacher_id</td>
<td>讲师ID</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="train_camp（特训营主表）">

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| camp_code | VARCHAR2(32) | 特训营编码 | PK |
| camp_name | VARCHAR2(200) | 特训营名称 | NOT NULL |
| camp_type | VARCHAR2(30) | 特训营类型 | NOT NULL |
| camp_status | VARCHAR2(30) | 特训营状态 | NOT NULL |
| start_date | DATE | 开始日期 | |
| end_date | DATE | 结束日期 | |
| location | VARCHAR2(500) | 地点 | |
| teacher_id | NUMBER | 讲师ID | FK → teacher.teacher_id |
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
