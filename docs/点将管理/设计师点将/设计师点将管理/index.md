<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-13" title="设计师点将管理" desc="设计师点将的申请管理" />

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




1
.
 
设
计
师
/
管
理
员
进
入
【
设
计
师
点
将
管
理
】
菜
单
，
新
建
设
计
点
将
申
请


2
.
 
填
写
点
将
信
息
：
设
计
师
、
服
务
经
销
商
、
服
务
门
店
、
服
务
时
间
等


3
.
 
提
交
申
请
，
触
发
审
批
流
程


4
.
 
审
批
流
程
依
次
经
过
：


 
 
 
-
 
*
*
讲
师
审
批
*
*
（
d
e
s
i
g
n
A
p
p
l
y
L
e
c
t
u
r
e
r
A
p
p
r
o
v
a
l
）
：
讲
师
确
认
可
提
供
服
务


 
 
 
-
 
*
*
门
店
审
批
*
*
（
d
e
s
i
g
n
A
p
p
l
y
T
e
r
m
i
n
a
l
A
p
p
r
o
v
a
l
）
：
门
店
确
认
接
受
服
务


 
 
 
-
 
*
*
常
规
审
批
*
*
（
d
e
s
i
g
n
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
）
：
业
务
审
批


5
.
 
审
批
通
过
后
，
点
将
生
效
，
进
入
执
行
阶
段


6
.
 
支
持
取
消
审
批
（
d
e
s
i
g
n
A
p
p
l
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
r
o
v
a
l
）
，
取
消
已
提
交
的
点
将


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
<KbCard title="3.1 列表页">

- **前端路由**：`/general/designGeneral/designGeneralManage/list`
- **API**：`mlt/designApply/page`
- **Entity**：`DesignApply`
- **查询条件**：申请单号、设计师姓名、经销商名称、申请状态、申请时间范围
- **列表字段**：申请单号、设计师姓名、设计师级别、经销商名称、门店名称、服务时间、申请状态、审批状态、创建时间
- **操作按钮**：新建、提交、取消、查看详情

</KbCard>

<KbCard title="3.2 新建/编辑">

- **API**：`mlt/designApply/insert`、`mlt/designApply/update`
- **必填字段**：设计师、服务经销商、服务门店、服务开始时间、服务结束时间
- **校验逻辑**：
  - 设计师必须在档且状态正常
  - 服务时间不可与该设计师已有排期冲突
  - 服务时间需在有效范围内

</KbCard>

<KbCard title="3.3 提交审批">

- **API**：`mlt/designApply/submit`
- **审批流程**：提交后依次触发讲师审批→门店审批→常规审批
- **审批回调**：审批通过/驳回后自动更新申请状态

</KbCard>

<KbCard title="3.4 取消审批">

- **API**：`mlt/designApply/cancelApproval`
- **内置审批**：`designApplyCancelApproval`
- **前置条件**：申请已提交且未完成全部审批

</KbCard>

<KbCard title="3.5 内置审批说明">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>审批编码</th>
<th>审批名称</th>
<th>触发时机</th>
<th>说明</th>
</tr>
<tr>
<td>designApplyLecturerApproval</td>
<td>讲师审批</td>
<td>提交申请后</td>
<td>讲师确认可提供服务</td>
</tr>
<tr>
<td>designApplyTerminalApproval</td>
<td>门店审批</td>
<td>讲师审批通过后</td>
<td>门店确认接受服务</td>
</tr>
<tr>
<td>designApplyApproval</td>
<td>常规审批</td>
<td>门店审批通过后</td>
<td>业务审批</td>
</tr>
<tr>
<td>designApplyCancelApproval</td>
<td>取消审批</td>
<td>发起取消时</td>
<td>取消已提交的点将</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="design_apply（设计点将申请表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| apply_code | VARCHAR2 | 申请单号（主键） |
| apply_type | VARCHAR2 | 申请类型 |
| lecturer_code | VARCHAR2 | 设计师编码 |
| lecturer_name | VARCHAR2 | 设计师姓名 |
| lecturer_level | VARCHAR2 | 设计师级别 |
| dealer_code | VARCHAR2 | 经销商编码 |
| dealer_name | VARCHAR2 | 经销商名称 |
| terminal_code | VARCHAR2 | 门店编码 |
| terminal_name | VARCHAR2 | 门店名称 |
| service_start_date | DATE | 服务开始时间 |
| service_end_date | DATE | 服务结束时间 |
| apply_status | VARCHAR2 | 申请状态 |
| approval_status | VARCHAR2 | 审批状态 |
| lecturer_approval_status | VARCHAR2 | 讲师审批状态 |
| terminal_approval_status | VARCHAR2 | 门店审批状态 |
| cancel_approval_status | VARCHAR2 | 取消审批状态 |
| remark | VARCHAR2 | 备注 |
| created_by | VARCHAR2 | 创建人 |
| creation_date | DATE | 创建时间 |
| last_updated_by | VARCHAR2 | 最后更新人 |
| last_update_date | DATE | 最后更新时间 |

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
| 2026-08-03 | v1.0 | 初始创建 | AI生成 |
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
