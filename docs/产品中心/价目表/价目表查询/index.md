<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-11" title="价目表查询" desc="产品价目表的查询功能" />

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
价
目
表
查
询
页
面


2
.
 
设
置
查
询
条
件
（
产
品
、
事
业
部
、
价
格
类
型
等
）


3
.
 
系
统
查
询
价
目
表
数
据


4
.
 
展
示
价
目
表
列
表


5
.
 
支
持
导
出
价
目
表
数
据




`
`
`


进
入
页
面
 
→
 
设
置
查
询
条
件
 
→
 
查
询
价
目
表
 
→
 
展
示
结
果
 
→
 
可
选
导
出


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
<td>CRM_BUSINESS/v1/{orgId}/lnk-price-list-item/list</td>
<td>GET</td>
<td>查询价目表列表</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/lnk-price-list-item/export</td>
<td>GET/POST</td>
<td>导出价目表数据</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-crm`
- 路由：`/price/list`

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 支持按产品编码、名称、事业部、价格类型等条件筛选
2. 列表支持分页展示
3. 导出时按当前查询条件导出
4. 价目表数据为只读，修改需通过价目表维护功能
5. 无工作流

</KbCard>

<KbCard num="1" title="4.1 LNK_PRICE_LIST_ITEM（价目表明细表）">

| 字段 | 说明 |
|------|------|
| price_list_item_id$ | 价目表明细ID（主@键） |
| organization_id | 组织ID |
| price_list_id | 价目表头ID |
| product_code | 产品编码 |
| product_name | 产品名称 |
| product_category | 产品分类 |
| business_unit | 事业部 |
| list_price | 标价 |
| net_price | 净价 |
| currency_code | 币种 |
| uom | 单位 |
| effective_date | 生效日期 |
| expiry_date | 失效日期 |
| price_type | 价格类型 |

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
