<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-08" title="单店点将" desc="经销商视角的单店点将查询" />

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
发
起
单
店
培
训
点
将
，
指
定
参
训
经
销
商
及
门
店


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
单
店
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
单
店
培
训
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
单
店
培
训
详
情
（
培
训
主
题
、
时
间
、
讲
师
、
门
店
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
训
安
排


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

- **前端路由**：`/general/distributorGeneral/distributorGeneralSingleStore/list`
- **API**：`mlt/trainApply/dealer/page`
- **Entity**：`TrainApply`
- **查询条件**：培训主题、培训时间范围、门店名称、申请状态
- **列表字段**：申请单号、培训主题、培训时间、门店名称、讲师姓名、申请状态、创建时间
- **数据过滤**：后端自动按当前登录用户的经销商ID过滤

</KbCard>

<KbCard title="3.2 详情页">

- **前端路由**：`/general/distributorGeneral/distributorGeneralSingleStore/detail/:applyCode/:type`
- **API**：`mlt/trainApply/dealer/detail`
- **参数说明**：
  - `applyCode`：单店培训点将申请单号
  - `type`：详情查看类型
- **展示内容**：培训基本信息、讲师信息、门店信息、时间安排、审批状态等

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
