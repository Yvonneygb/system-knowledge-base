<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="户外广告分布" desc="户外广告投放分布报表，按区域维度统计户外广告分布情况" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程图">

```
用户进入报表页面(hlod低代码)
  │
  ├─ 输入查询条件（事业部/销售区域/运营中心/经销商/省份/单号/发布日期）
  │
  ├─ 点击查询 → POST /v1/{organizationId}/terminalReport/outdoor-advertising-distribution/search
  │
  └─ 查看户外广告投放分布明细
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游数据源 | 说明 | 关联方式 |
|-----------|------|---------|
| FIN_FEE_APPLY_HEADER | 广告投放申请表 | 主数据来源，apply_type=2且审批通过 |
| DIVISION_BASE_SET | 事业部基础设置 | 事业部组织ID翻译 |
| CUSTOMER_ORG | 客户组织关系 | 经销商组织信息 |
| HPFM_LOV_VALUE | 平台LOV值表 | 广告媒介项目值集翻译 |
| CUSTOMER | 客户表 | 创建人翻译为经销商编码 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 户外广告投放分布查询">
<KbQuote>查询已审批通过的户外广告投放申请的分布情况，按区域、经销商、广告媒介等维度展示，用于分析户外广告资源投放的覆盖范围和分布合理性。</KbQuote>

**具体逻辑**：

- 1、仅查询申请类型为户外广告(apply_type=2)且审批状态为已通过(hz_approve_status='APPROVED')的记录
- 2、地址通过拼接省+市+区县+详细地址生成完整地址
- 3、广告媒介项目通过HPFM_LOV_VALUE值集翻译(AE.ASVERT_MEDIUM_ITEM)
- 4、发布日期格式化为YYYY-MM-DD
- 5、创建人字段实际取值为经销商编码（通过子查询从CUSTOMER表获取）
</KbCard>

<KbCard num="2" title="2.2 数据过滤条件">
**具体逻辑**：

- 1、apply_type = 2：仅户外广告类型
- 2、hz_approve_status = 'APPROVED'：仅审批通过的申请
- 3、支持按事业部、销售区域、运营中心、经销商编码/名称、省份、费用申请单号、发布日期筛选
</KbCard>

<KbCard num="3" title="2.3 区域/组织名称翻译">
**具体逻辑**：

- 1、销售区域：通过子查询从SCPORG表翻译orgid→orgname
- 2、运营中心：通过子查询从SCPORG表翻译orgid→orgname
- 3、事业部：通过DIVISION_BASE_SET关联获取organization_id
- 4、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">

</KbCard>
<KbCard title="其他按钮">

无。纯查询报表，无新增/编辑/删除/导出按钮。

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

无。纯查询报表，无状态流转。

---

</KbCard>
<KbCard num="1" title="FIN_FEE_APPLY_HEADER（广告投放申请表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| fee_apply_id | BIGINT | 主键 | - |
| fee_apply_no | VARCHAR | 费用申请单号 | - |
| apply_type | INTEGER | 申请类型 | 2-户外广告 |
| hz_approve_status | VARCHAR | 审批状态 | APPROVED-已通过 |
| entid | BIGINT | 组织ID/事业部ID | - |
| cust_id | BIGINT | 经销商ID | - |
| cust_code | VARCHAR | 经销商编码 | - |
| cust_name | VARCHAR | 经销商名称 | - |
| division_id | BIGINT | 事业部ID | - |
| salezone_org_name | VARCHAR | 销售区域名称 | - |
| operat_center_org_name | VARCHAR | 运营中心名称 | - |
| province_areaname | VARCHAR | 省份名称 | - |
| city_areaname | VARCHAR | 城市名称 | - |
| county_areaname | VARCHAR | 区县名称 | - |
| addr | VARCHAR | 详细地址 | - |
| advert_medium_type | VARCHAR | 广告媒介类型 | - |
| advert_size | VARCHAR | 广告尺寸 | - |
| advert_medium_item | VARCHAR | 广告媒介项目 | LOV: AE.ASVERT_MEDIUM_ITEM |
| advert_company | VARCHAR | 广告公司 | - |
| publish_from_date | DATE | 发布开始日期 | - |
| publish_to_date | DATE | 发布结束日期 | - |
| total_apply_amt_bx | DECIMAL | 申请金额(报销) | - |

</KbCard>

<KbCard num="2" title="DIVISION_BASE_SET（事业部基础设置表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| division_id | BIGINT | 事业部ID | - |
| division_name | VARCHAR | 事业部名称 | - |
| organization_id | BIGINT | 组织ID | 关联FIN_FEE_APPLY_HEADER.entid |

</KbCard>

<KbCard num="3" title="HPFM_LOV_VALUE（平台LOV值表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| lov_code | VARCHAR | LOV编码 | AE.ASVERT_MEDIUM_ITEM |
| value | VARCHAR | 值 | 对应advert_medium_item |
| meaning | VARCHAR | 含义 | 翻译后的中文描述 |

---

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
<KbCard title="报错一览表" :hover="false">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:27%"><col style="width:13%"><col style="width:32%"><col style="width:14%"><col style="width:14%"></colgroup>
<thead><tr><th>报错信息</th><th>提示节点</th><th>根因与解决方案</th><th>等级</th><th>详细逻辑</th></tr></thead>
<tbody>
          <tr>
            <td style="color:#DC2626;font-weight:600;">查询无数据</td>
            <td style="font-size:13px;">无审批通过的户外广告申请或筛选条件过严</td>
            <td style="font-size:13px;">放宽查询条件重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">广告媒介项目显示编码而非中文</td>
            <td style="font-size:13px;">HPFM_LOV_VALUE中未维护对应值</td>
            <td style="font-size:13px;">在LOV值集中添加翻译</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询无数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>放宽查询条件重试</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>广告媒介项目显示编码而非中文</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>在LOV值集中添加翻译</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">为什么只显示apply_type=2的记录？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>本报表专用于户外广告分布，apply_type=2表示户外广告类型
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">为什么只显示审批通过的记录？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>未审批或审批中的申请不代表最终投放，仅已通过记录纳入统计
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">creator字段为什么是经销商编码？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>SQL中creator通过子查询从CUSTOMER表取customer_code，非实际创建人
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">发布日期筛选是精确匹配还是范围？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>当前为精确匹配(to_date等值比较)，非范围查询
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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|---------|--------|
| 2026-01-16 | v1.0.0 | 初始创建户外广告分布报表 | - |
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
