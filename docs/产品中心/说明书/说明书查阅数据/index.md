<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-02" title="说明书查阅数据" desc="说明书查阅日志数据的查询统计" />

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
 
用
户
进
入
说
明
书
查
阅
数
据
页
面


2
.
 
选
择
查
看
模
式
：
列
表
模
式
或
汇
总
模
式


3
.
 
系
统
展
示
说
明
书
的
查
阅
统
计
数
据
（
查
阅
次
数
、
查
阅
人
、
查
阅
时
间
等
）


4
.
 
支
持
按
条
件
筛
选
和
排
序




`
`
`


进
入
页
面
 
→
 
选
择
模
式
(
列
表
/
汇
总
)
 
→
 
查
询
统
计
数
据
 
→
 
展
示
结
果


`
`
`


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
<KbCard title="3.1 后端接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>/v1/{organizationId}/manual-classification/list-mode-data</td>
<td>GET</td>
<td>列表模式数据查询</td>
</tr>
<tr>
<td>/v1/{organizationId}/manual-classification/summary-mode-data</td>
<td>GET</td>
<td>汇总模式数据查询</td>
</tr>
</tbody></table></div>

- Controller: `ManualClassificationController`

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-ae`
- 页面路径：`arrow-ae/productInfo/manualClassification`

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 列表模式返回每条查阅记录明细（含查阅人、查阅时间、查阅的说明书）
2. 汇总模式按说明书维度聚合，统计总查阅次数、最近查阅时间、查阅人数
3. 查阅日志由说明书查阅操作自动写入，无需手动录入
4. 无工作流

</KbCard>

<KbCard num="1" title="4.1 ES_SEARCH_LOG（查阅日志表）">

| 字段 | 说明 |
|------|------|
| search_log_id | 日志ID（主键） |
| spec_id | 说明书ID |
| spec_name | 说明书名称 |
| search_by | 查阅人 |
| search_date | 查阅时间 |
| organization_id | 组织ID |
| ip_address | 查阅人IP地址 |

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

| 日期 | 内容 |
|------|------|
| 2026-08-03 | 初始创建 |
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
