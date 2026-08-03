<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-09" title="活动点将" desc="经销商视角的活动点将查询" />

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
 
总
部
/
大
区
/
策
划
师
发
起
活
动
点
将
，
指
定
参
与
经
销
商


2
.
 
经
销
商
登
录
系
统
，
进
入
【
活
动
点
将
】
菜
单
查
看
自
己
被
点
将
的
活
动
信
息


3
.
 
经
销
商
可
查
看
活
动
详
情
（
活
动
主
题
、
时
间
、
地
点
、
策
划
师
等
）


4
.
 
经
销
商
确
认
或
反
馈
参
与
状
态


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

- **前端路由**：`/general/distributorGeneral/distributorGeneralActivity/list`
- **API**：`mlt/activityApply/dealer/page`
- **Entity**：`ActivityApply`
- **查询条件**：活动主题、活动时间范围、申请状态
- **列表字段**：申请单号、活动主题、活动时间、活动地点、策划师姓名、申请状态、创建时间
- **数据过滤**：后端自动按当前登录用户的经销商ID过滤

</KbCard>

<KbCard title="3.2 详情页">

- **前端路由**：`/general/distributorGeneral/distributorGeneralActivity/detail/:applyCode/:type`
- **API**：`mlt/activityApply/dealer/detail`
- **参数说明**：
  - `applyCode`：活动点将申请单号
  - `type`：详情查看类型（如查看/审批等）
- **展示内容**：活动基本信息、策划师信息、参与门店信息、时间安排等

</KbCard>

<KbCard num="1" title="activity_apply（活动点将申请表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| apply_code | VARCHAR2 | 申请单号（主键） |
| activity_theme | VARCHAR2 | 活动主题 |
| activity_start_date | DATE | 活动开始时间 |
| activity_end_date | DATE | 活动结束时间 |
| activity_address | VARCHAR2 | 活动地点 |
| planner_code | VARCHAR2 | 策划师编码 |
| planner_name | VARCHAR2 | 策划师姓名 |
| dealer_code | VARCHAR2 | 经销商编码 |
| dealer_name | VARCHAR2 | 经销商名称 |
| apply_status | VARCHAR2 | 申请状态 |
| apply_type | VARCHAR2 | 申请类型 |
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
