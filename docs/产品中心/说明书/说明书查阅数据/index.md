<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="说明书查阅数据" desc="" />

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

1. 用户进入说明书查阅数据页面
2. 选择查看模式：列表模式或汇总模式
3. 系统展示说明书的查阅统计数据（查阅次数、查阅人、查阅时间等）
4. 支持按条件筛选和排序

```
进入页面 → 选择模式(列表/汇总) → 查询统计数据 → 展示结果
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

- 1、**双模式展示**：列表模式展示每条查阅记录明细，汇总模式按说明书维度汇总查阅次数
- 2、**查阅日志采集**：用户每次查阅说明书时，系统自动记录查阅日志到ES_SEARCH_LOG表
- 3、**统计维度**：支持按说明书、按时间范围、按查阅人等维度统计
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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">查阅数据多久更新一次？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>实时更新，每次查阅说明书时自动写入日志。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">列表模式和汇总模式的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>列表模式展示每条查阅明细记录，汇总模式按说明书维度汇总统计查阅次数。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">能否导出查阅数据？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>视前端是否提供导出按钮，具体以后端接口支持为准。
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
