<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-03" title="单店点将管理" desc="单店培训点将的申请管理" />

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
 
管
理
员
/
培
训
专
员
进
入
【
单
店
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
单
店
培
训
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
讲
师
、
培
训
经
销
商
、
培
训
门
店
、
培
训
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
：
`
t
r
a
i
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
`
（
单
店
培
训
审
批
）


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
已
提
交
的
申
请


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

- **前端路由**：`/general/singleStoreGeneral/singleStoreGeneralManage/list`
- **API**：`mlt/trainApply/page`
- **Entity**：`TrainApply`
- **查询条件**：申请单号、讲师姓名、经销商名称、门店名称、申请状态、申请时间范围
- **列表字段**：申请单号、培训主题、讲师姓名、经销商名称、门店名称、培训时间、申请状态、审批状态、创建时间
- **操作按钮**：新建、提交、取消、查看详情

</KbCard>

<KbCard title="3.2 新建/编辑">

- **API**：`mlt/trainApply/insert`、`mlt/trainApply/update`
- **必填字段**：讲师、培训经销商、培训门店、培训开始时间、培训结束时间、培训主题
- **校验逻辑**：
  - 讲师必须在档且状态正常
  - 培训时间不可与该讲师已有排期冲突
  - 培训时间需在有效范围内

</KbCard>

<KbCard title="3.3 提交审批">

- **API**：`mlt/trainApply/submit`
- **内置审批**：`trainApplyApproval`
- **审批回调**：审批通过/驳回后自动更新申请状态

</KbCard>

<KbCard title="3.4 取消申请">

- **API**：`mlt/trainApply/cancel`
- **前置条件**：申请已提交且审批未完成
- **逻辑**：取消后申请状态变为"已取消"

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
<td>trainApplyApproval</td>
<td>单店培训审批</td>
<td>提交申请后</td>
<td>业务审批，审批通过后点将生效</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="train_apply（单店培训点将申请表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| apply_code | VARCHAR2 | 申请单号（主键） |
| train_theme | VARCHAR2 | 培训主题 |
| train_start_date | DATE | 培训开始时间 |
| train_end_date | DATE | 培训结束时间 |
| lecturer_code | VARCHAR2 | 讲师编码 |
| lecturer_name | VARCHAR2 | 讲师姓名 |
| dealer_code | VARCHAR2 | 经销商编码 |
| dealer_name | VARCHAR2 | 经销商名称 |
| terminal_code | VARCHAR2 | 门店编码 |
| terminal_name | VARCHAR2 | 门店名称 |
| apply_status | VARCHAR2 | 申请状态 |
| approval_status | VARCHAR2 | 审批状态 |
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
