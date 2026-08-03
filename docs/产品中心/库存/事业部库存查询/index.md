<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="事业部库存查询" desc="" />

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

1. 用户进入事业部库存查询页面
2. 选择事业部等查询条件
3. 系统按事业部维度汇总库存数据
4. 展示各事业部的库存汇总信息

```
进入页面 → 选择事业部条件 → 按事业部汇总查询 → 展示结果
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

- 1、**事业部维度汇总**：与普通库存查询不同，本页面以事业部为维度汇总展示库存
- 2、**汇总计算**：将同一事业部下各仓库、各产品的库存数量汇总
- 3、**数据只读**：本页面仅查询展示，不支持修改
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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">事业部库存查询与普通库存查询的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>事业部库存查询按事业部维度汇总展示，普通库存查询展示明细记录。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">能否查看事业部下的库存明细？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>本页面展示汇总数据，明细需跳转到库存查询页面查看。
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
