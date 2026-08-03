<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-14" title="责任制内结价定价瓷砖参数配置" desc="责任制内结价定价瓷砖参数配置管理" />

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
瓷
砖
参
数
配
置
页
面


2
.
 
新
建
或
编
辑
瓷
砖
品
类
参
数
配
置


3
.
 
填
写
头
信
息
（
适
用
范
围
、
生
效
条
件
等
）
和
行
信
息
（
具
体
定
价
参
数
）


4
.
 
保
存
配
置




`
`
`


进
入
页
面
 
→
 
新
建
/
编
辑
配
置
 
→
 
填
写
头
行
信
息
 
→
 
保
存


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
