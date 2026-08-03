<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18" title="责任制内结价定价瓷砖参数配置" desc="" />

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

1. 用户进入瓷砖参数配置页面
2. 新建或编辑瓷砖品类参数配置
3. 填写头信息（适用范围、生效条件等）和行信息（具体定价参数）
4. 保存配置

```
进入页面 → 新建/编辑配置 → 填写头行信息 → 保存
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
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgHead</td>
<td>POST</td>
<td>新建配置头</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgHead</td>
<td>GET</td>
<td>查询配置头列表</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgHead/{id}</td>
<td>GET</td>
<td>查询配置头详情</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgHead/{id}</td>
<td>PUT</td>
<td>更新配置头</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgHead/{id}</td>
<td>DELETE</td>
<td>删除配置头</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgLine</td>
<td>GET</td>
<td>查询配置行列表</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgLine</td>
<td>POST</td>
<td>新建配置行</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgLine/{id}</td>
<td>PUT</td>
<td>更新配置行</td>
</tr>
<tr>
<td>CRM_BUSINESS/v1/{orgId}/rspStmPorcCfgLine/{id}</td>
<td>DELETE</td>
<td>删除配置行</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 前端页面">

- 前端包：`arrow-crm`
- 路由：
  - `/rspStmPorcCfg/list` — 配置列表页
  - `/rspStmPorcCfg/detail/:id?` — 配置详情/新建页（id为空时新建）

</KbCard>

<KbCard title="3.3 核心业务规则">

1. 头表记录瓷砖品类定价的适用范围和生效条件
2. 行表记录具体的定价参数（如规格系数、等级系数、工艺系数等）
3. 头行为一对多关系，一个头可关联多行参数
4. 配置保存后立即生效
5. 无工作流

</KbCard>

<KbCard num="1" title="4.1 RSP_STM_PORC_CFG_HEAD（瓷砖参数配置头表）">

| 字段 | 说明 |
|------|------|
| head_id | 头ID（主键） |
| organization_id | 组织ID |
| cfg_name | 配置名称 |
| applicable_scope | 适用范围 |
| category_code | 瓷砖品类编码 |
| effective_date | 生效日期 |
| expiry_date | 失效日期 |
| enabled_flag | 启用标识（Y/N） |
| created_by | 创建人 |
| creation_date | 创建时间 |
| last_updated_by | 最后更新人 |
| last_update_date | 最后更新时间 |

</KbCard>

<KbCard num="2" title="4.2 RSP_STM_PORC_CFG_LINE（瓷砖参数配置行表）">

| 字段 | 说明 |
|------|------|
| line_id | 行ID（主键） |
| head_id | 头ID（外键） |
| param_code | 参数编码 |
| param_name | 参数名称 |
| param_value | 参数值 |
| coefficient | 系数 |
| sequence_num | 行序号 |
| description | 描述 |

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
      <span style="font-size:15px;">瓷砖参数配置与基础参数配置的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>基础参数配置为通用定价参数，瓷砖参数配置针对瓷砖品类特殊定价规则，采用头行结构。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">头行关系如何维护？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>在详情页中同时维护头信息和行信息，行信息支持增删改。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">配置是否需要审批？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不需要，保存即生效。
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
