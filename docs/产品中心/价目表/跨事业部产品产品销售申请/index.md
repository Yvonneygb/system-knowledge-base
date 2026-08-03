<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="跨事业部产品产品销售申请" desc="" />

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

1. 用户进入跨事业部产品销售申请页面
2. 新建销售申请单
3. 填写申请信息（目标事业部、产品、数量、价格等）
4. 提交申请
5. 审批通过后可执行跨事业部销售

```
新建申请 → 填写申请信息 → 提交 → 审批流转 → 审批通过 → 执行销售
```

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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">跨事业部销售申请是否需要审批？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>是，提交后需走审批流程。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批通过后如何执行销售？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>审批通过后在相关业务模块执行，具体流程视业务而定。
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
