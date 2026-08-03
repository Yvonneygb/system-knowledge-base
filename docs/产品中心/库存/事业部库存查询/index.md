<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-17" title="事业部库存查询" desc="事业部维度的库存查询功能" />

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
事
业
部
库
存
查
询
页
面


2
.
 
选
择
事
业
部
等
查
询
条
件


3
.
 
系
统
按
事
业
部
维
度
汇
总
库
存
数
据


4
.
 
展
示
各
事
业
部
的
库
存
汇
总
信
息




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
事
业
部
条
件
 
→
 
按
事
业
部
汇
总
查
询
 
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
<td>CRM_BUSINESS/v1/{orgId}/lnkInventorys</td>
<td>GET</td>
<td>查询库存数据（按事业部维度汇总）</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-crm`

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 默认按当前用户所属事业部筛选
2. 支持切换事业部查看
3. 库存数据为汇总值，非明细
4. 无工作流

</KbCard>

<KbCard num="1" title="4.1 LNK_INVENTORYS（库存表）">

| 字段 | 说明 |
|------|------|
| inventory_id | 库存ID（主键） |
| organization_id | 组织ID |
| business_unit | 事业部 |
| warehouse_code | 仓库编码 |
| product_code | 产品编码 |
| available_qty | 可用库存数量 |
| total_qty | 总库存数量 |
| uom | 单位 |

> 查询时按business_unit字段GROUP BY汇总

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
