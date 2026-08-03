<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="责任制内结价定价基础参数配置" desc="" />

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

1. 用户进入责任制内结价定价基础参数配置页面
2. 新建或编辑参数配置记录
3. 填写定价规则、系数等基础参数
4. 保存配置

```
进入页面 → 新建/编辑配置 → 填写定价参数 → 保存
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

- 1、**基础参数配置**：配置责任制内结价定价的基础参数，包括定价规则、系数等
- 2、**CRUD操作**：支持新建、编辑、删除、查看配置
- 3、**无审批流程**：配置保存即生效，无需审批
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
<td>CRM_BUSINESS/v1/{orgId}/rspStmCfg</td>
<td>POST</td>
<td>新建配置</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmCfg</td>
<td>GET</td>
<td>查询配置列表</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmCfg/{id}</td>
<td>GET</td>
<td>查询配置详情</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmCfg/{id}</td>
<td>PUT</td>
<td>更新配置</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmCfg/{id}</td>
<td>DELETE</td>
<td>删除配置</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-crm`
- 路由：
  - `/rspStmCfg/list` — 配置列表页
  - `/rspStmCfg/detail/:id?` — 配置详情/新建页（id为空时新建）

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 配置参数包括定价规则、定价系数、适用范围等
2. 同一适用范围内不允许重复配置
3. 配置保存后立即生效
4. 无工作流

</KbCard>

<KbCard num="1" title="4.1 RSP_STM_CFG（责任制内结价定价基础参数配置表）">

| 字段 | 说明 |
|------|------|
| cfg_id | 配置ID（主键） |
| organization_id | 组织ID |
| cfg_name | 配置名称 |
| pricing_rule | 定价规则 |
| pricing_coefficient | 定价系数 |
| applicable_scope | 适用范围 |
| effective_date | 生效日期 |
| expiry_date | 失效日期 |
| enabled_flag | 启用标识（Y/N） |
| created_by | 创建人 |
| creation_date | 创建时间 |
| last_updated_by | 最后更新人 |
| last_update_date | 最后更新时间 |

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
      <span style="font-size:15px;">配置保存后是否需要审批？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不需要，保存即生效。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">能否同时启用多条配置？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>可以，但同一适用范围内不允许重复。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">已生效的配置能否修改？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>可以修改，修改后立即生效。
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
