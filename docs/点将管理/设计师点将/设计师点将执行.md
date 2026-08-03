<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P17-14" title="设计师点将执行" desc="设计师点将的执行管理" />

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
点
将
申
请
审
批
通
过
后
，
进
入
执
行
阶
段


2
.
 
在
【
设
计
师
点
将
执
行
】
菜
单
查
看
所
有
已
生
效
的
点
将
记
录


3
.
 
跟
踪
执
行
状
态
：
待
执
行
→
执
行
中
→
已
完
成


4
.
 
可
更
新
执
行
进
度
、
填
写
执
行
反
馈


5
.
 
执
行
完
成
后
自
动
更
新
设
计
师
饱
和
度
数
据


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

- **前端路由**：`/general/designGeneral/designGeneralExecute/list`
- **API**：`mlt/designApply/page`（查询条件增加执行状态过滤）
- **Entity**：`DesignApply`
- **查询条件**：申请单号、设计师姓名、经销商名称、执行状态、服务时间范围
- **列表字段**：申请单号、设计师姓名、经销商名称、门店名称、服务时间、执行状态、完成时间、创建时间
- **操作按钮**：查看详情、更新进度、完成执行

</KbCard>

<KbCard title="3.2 执行进度更新">

- **API**：`mlt/designApply/updateProgress`
- **更新内容**：执行进度百分比、执行备注、附件上传
- **校验逻辑**：仅执行中状态可更新进度

</KbCard>

<KbCard title="3.3 完成执行">

- **API**：`mlt/designApply/complete`
- **触发逻辑**：
  - 更新执行状态为"已完成"
  - 自动更新设计师饱和度数据
  - 记录完成时间和操作人

</KbCard>

<KbCard num="1" title="design_apply（设计点将申请表-执行相关字段）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| apply_code | VARCHAR2 | 申请单号（主键） |
| execute_status | VARCHAR2 | 执行状态（待执行/执行中/已完成） |
| execute_progress | NUMBER | 执行进度百分比 |
| execute_remark | VARCHAR2 | 执行备注 |
| complete_date | DATE | 完成时间 |
| complete_by | VARCHAR2 | 完成人 |
| lecturer_code | VARCHAR2 | 设计师编码 |
| lecturer_name | VARCHAR2 | 设计师姓名 |
| dealer_code | VARCHAR2 | 经销商编码 |
| dealer_name | VARCHAR2 | 经销商名称 |
| terminal_code | VARCHAR2 | 门店编码 |
| terminal_name | VARCHAR2 | 门店名称 |
| service_start_date | DATE | 服务开始时间 |
| service_end_date | DATE | 服务结束时间 |
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
