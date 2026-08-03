<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-12" title="设计师饱和度" desc="设计师饱和度统计查询" />

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
设
计
师
进
入
【
设
计
师
饱
和
度
】
菜
单
，
查
看
设
计
师
工
作
饱
和
度


2
.
 
系
统
自
动
统
计
每
位
设
计
师
的
已
排
期
时
间
和
可
排
期
时
间


3
.
 
计
算
饱
和
度
 
=
 
已
排
期
天
数
 
/
 
可
排
期
天
数
 
×
 
1
0
0
%


4
.
 
支
持
按
设
计
师
编
码
或
用
户
编
码
查
询
饱
和
度
详
情


5
.
 
饱
和
度
数
据
由
点
将
执
行
完
成
时
自
动
更
新


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

- **前端路由**：`/general/designGeneral/designSaturation/list`
- **API**：`mlt/maLecturerSaturation/page`
- **Entity**：`MaLecturerSaturation`
- **查询条件**：设计师姓名、设计师级别、饱和度范围、统计周期
- **列表字段**：设计师编码、设计师姓名、设计师级别、可排期天数、已排期天数、饱和度、统计周期
- **值集加载**：页面初始化时加载4个值集用于下拉选项和状态展示

</KbCard>

<KbCard title="3.2 按设计师编码查询">

- **API**：`mlt/maLecturerSaturation/getSaturationByCode`
- **参数**：lecturerCode（设计师编码）
- **返回**：该设计师的饱和度详情，包含各时间段的排期明细

</KbCard>

<KbCard title="3.3 按用户编码查询">

- **API**：`mlt/maLecturerSaturation/getSaturationByUser`
- **参数**：userCode（用户编码）
- **返回**：该用户关联设计师的饱和度详情

</KbCard>

<KbCard title="3.4 值集说明">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>值集编码</th>
<th>值集名称</th>
<th>用途</th>
</tr>
<tr>
<td>MBO.DESIGN_APPLY_TYPE</td>
<td>设定点将类型</td>
<td>区分不同类型的点将申请</td>
</tr>
<tr>
<td>MBO.DESIGN_STATE</td>
<td>设计状态</td>
<td>标识设计点将的当前状态</td>
</tr>
<tr>
<td>MBO.DESIGN_LECTURER_LEVEL</td>
<td>设计师级别</td>
<td>标识设计师的级别分类</td>
</tr>
<tr>
<td>MBO.APPLY_APPROVAL_STATE</td>
<td>审批状态</td>
<td>标识申请的审批状态</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard num="1" title="ma_lecturer_saturation（讲师饱和度统计表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| saturation_id | NUMBER | 饱和度ID（主键） |
| lecturer_code | VARCHAR2 | 设计师编码 |
| lecturer_name | VARCHAR2 | 设计师姓名 |
| lecturer_level | VARCHAR2 | 设计师级别 |
| user_code | VARCHAR2 | 用户编码 |
| available_days | NUMBER | 可排期天数 |
| scheduled_days | NUMBER | 已排期天数 |
| saturation_rate | NUMBER | 饱和度（百分比） |
| stat_period | VARCHAR2 | 统计周期 |
| apply_type | VARCHAR2 | 点将类型 |
| design_state | VARCHAR2 | 设计状态 |
| approval_state | VARCHAR2 | 审批状态 |
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
