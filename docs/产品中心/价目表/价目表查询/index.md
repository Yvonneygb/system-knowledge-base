<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="价目表查询" desc="" />

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

1. 用户进入价目表查询页面
2. 设置查询条件（产品、事业部、价格类型等）
3. 系统查询价目表数据
4. 展示价目表列表
5. 支持导出价目表数据

```
进入页面 → 设置查询条件 → 查询价目表 → 展示结果 → 可选导出
```

</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑">
**具体逻辑**：

- 1、**价目表查询**：查询产品价目表信息，包含产品编码、名称、价格等
- 2、**导出功能**：支持将查询结果导出为Excel等格式
- 3、**数据只读**：本页面仅查询和导出，不支持修改价目表
</KbCard>

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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">导出支持什么格式？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>通常支持Excel格式导出。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">能否在此页面修改价格？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能，本页面仅查询和导出，价格修改需通过价目表维护功能。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">价目表数据多久更新一次？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>价目表数据由价目表维护功能写入，查询时实时读取最新数据。
    </div>
  </div>
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
