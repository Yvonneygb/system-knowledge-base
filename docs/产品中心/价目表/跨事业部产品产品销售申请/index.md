<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-12" title="跨事业部产品产品销售申请" desc="跨事业部产品的销售申请管理" />

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
跨
事
业
部
产
品
销
售
申
请
页
面


2
.
 
新
建
销
售
申
请
单


3
.
 
填
写
申
请
信
息
（
目
标
事
业
部
、
产
品
、
数
量
、
价
格
等
）


4
.
 
提
交
申
请


5
.
 
审
批
通
过
后
可
执
行
跨
事
业
部
销
售




`
`
`


新
建
申
请
 
→
 
填
写
申
请
信
息
 
→
 
提
交
 
→
 
审
批
流
转
 
→
 
审
批
通
过
 
→
 
执
行
销
售


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
<td>CRM_BUSINESS/v1/{orgId}/cross-bu-sales-apply</td>
<td>POST</td>
<td>新建申请</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/cross-bu-sales-apply</td>
<td>GET</td>
<td>查询申请列表</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/cross-bu-sales-apply/{id}</td>
<td>GET</td>
<td>查询申请详情</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/cross-bu-sales-apply/{id}</td>
<td>PUT</td>
<td>更新申请</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/cross-bu-sales-apply/{id}/submit</td>
<td>POST</td>
<td>提交审批</td>
</tr>
</tbody></table></div>

&gt; 接口路径为推测，以实际代码为准

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-crm`

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 申请时需选择目标事业部和产品
2. 销售价格根据责任制内结价定价参数自动计算
3. 草稿状态可编辑，审批中不可修改
4. 审批拒绝后可重新编辑提交

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
