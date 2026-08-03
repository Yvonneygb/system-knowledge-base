<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="库存查询" desc="" />

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

1. 用户进入库存查询页面
2. 设置查询条件（仓库、产品、事业部等）
3. 系统调用CRM接口查询库存数据
4. 展示库存列表结果

```
进入页面 → 设置查询条件 → 调用API查询 → 展示库存数据
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

- 1、**多维度查询**：支持按仓库、产品、事业部等维度查询库存
- 2、**实时库存**：查询结果为实时库存数据，直接从LNK_INVENTORYS表读取
- 3、**分页展示**：列表支持分页，避免大数据量时页面卡顿
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
<td>CRM_BUSINESS/v1/{orgId}/lnkInventorys</td>
<td>GET</td>
<td>查询库存列表</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-crm`
- 路由：`/inventory/list`

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 查询条件支持多选（如多个仓库、多个产品）
2. 库存数据为只读，不可在此页面修改
3. 无工作流

</KbCard>

<KbCard num="1" title="4.1 LNK_INVENTORYS（库存表）">

| 字段 | 说明 |
|------|------|
| inventory_id | 库存ID（主键） |
| organization_id | 组织ID |
| warehouse_code | 仓库编码 |
| warehouse_name | 仓库名称 |
| product_code | 产品编码 |
| product_name | 产品名称 |
| business_unit | 事业部 |
| available_qty | 可用库存数量 |
| total_qty | 总库存数量 |
| locked_qty | 锁定数量 |
| uom | 单位 |

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
      <span style="font-size:15px;">库存数据是否实时？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>是，直接从LNK_INVENTORYS表实时查询。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">能否在此页面调整库存？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能，本页面仅查询展示，库存调整需通过其他业务单据。
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
