<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门店统计分析" desc="门店综合统计分析报表，支持多维度统计门店数据" />

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
  ├─ 输入查询条件（事业部/销售区域/运营中心/省份/城市/经销商编码）
  │
  ├─ 点击查询 → POST /v1/{organizationId}/terminalReport/mkt-terminal-distribution/search
  │
  ├─ 查看按经销商维度汇总的门店综合统计
  │
  └─ 可导出 → GET /v1/{organizationId}/terminalReport/mkt-terminal-distribution/export
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游数据源 | 说明 | 关联方式 |
|-----------|------|---------|
| MKT_TERMINAL | 门店档案 | 各维度COUNT子查询统计 |
| CUSTOMER | 客户/经销商 | 主查询驱动表 |
| CUSTOMER_ORG | 客户组织关系 | 经销商的事业部/省市区/销售区域/运营中心 |
| DIVISION_BASE_SET | 事业部基础设置 | 事业部名称翻译 |

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
<KbCard num="1" title="2.1 门店综合统计分析">
<KbQuote>按经销商维度汇总展示门店的多维度统计数据，包括运营状态、经营属性、门店等级、门店类型、面积分段、装修风格（按品牌）、连锁属性、系统归属等，用于全面掌握经销商门店结构。</KbQuote>

**具体逻辑**：

- 1、以CUSTOMER为主表，LEFT JOIN CUSTOMER_ORG获取组织维度信息
- 2、对MKT_TERMINAL按经销商(cust_id)做大量子查询COUNT统计
- 3、仅展示有门店的经销商（EXISTS子查询过滤）
- 4、支持按事业部、销售区域、运营中心、省份、城市、经销商编码筛选
- 5、支持Excel导出
</KbCard>

<KbCard num="2" title="2.2 统计维度说明">
**具体逻辑**：

- 1、**运营状态**：运营中(terminal_stat=1)、撤店(terminal_stat=2)
- 2、**经营属性**：直营专营(customer_class=1)、经销专营(2)、分销(3)
- 3、**门店等级**：一级(store_area_level='1')、二级('2')、三级('3')
- 4、**门店类型**：5种类型(terminal_type=1~5)
- 5、**面积分段**：≤100㎡、100-200㎡、200-300㎡、&gt;300㎡
- 6、**装修风格**：按品牌entid(101~109)×装修风格(decoration_style)组合统计
- 7、**连锁**：is_ls=2为连锁门店
- 8、**系统归属**：8种系统(sys_id=1~8)
</KbCard>

<KbCard num="3" title="2.3 装修风格与品牌映射">
**具体逻辑**：

- 1、--
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

| 按钮 | 功能 | 显隐条件 |
|------|------|---------|
| 导出 | Excel导出门店统计数据 | 始终显示 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

无。纯查询报表，无状态流转。

---

</KbCard>
<KbCard num="1" title="MKT_TERMINAL（门店档案表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| terminal_id | BIGINT | 主键 | - |
| terminal_code | VARCHAR | 门店编码 | - |
| terminal_name | VARCHAR | 门店名称 | - |
| cust_id | BIGINT | 所属经销商ID | 子查询关联键 |
| entid | BIGINT | 组织ID/品牌ID | 101~109对应不同品牌 |
| terminal_stat | INTEGER | 门店状态 | 1-运营中, 2-撤店 |
| customer_class | INTEGER | 经营属性 | 1-直营专营, 2-经销专营, 3-分销 |
| store_area_level | VARCHAR | 门店等级 | '1'/'2'/'3' |
| terminal_type | INTEGER | 门店类型 | 1~5 |
| terminal_area | DECIMAL | 门店面积 | 用于面积分段统计 |
| decoration_style | INTEGER | 装修风格 | 按品牌不同含义不同 |
| is_ls | INTEGER | 是否连锁 | 2-连锁 |
| sys_id | INTEGER | 系统归属 | 1~8 |

</KbCard>

<KbCard num="2" title="CUSTOMER（客户/经销商表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| customer_id | BIGINT | 客户ID | 主查询驱动键 |
| customer_code | VARCHAR | 客户编码 | - |
| customer_name | VARCHAR | 客户名称 | - |

</KbCard>

<KbCard num="3" title="CUSTOMER_ORG（客户组织关系表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| customer_id | BIGINT | 客户ID | - |
| division_id | BIGINT | 事业部ID | - |
| province_id | BIGINT | 省份ID | - |
| province_name | VARCHAR | 省份名称 | - |
| city_id | BIGINT | 城市ID | - |
| city_name | VARCHAR | 城市名称 | - |
| salezone_org_id | BIGINT | 销售区域ID | - |
| salezone_org_name | VARCHAR | 销售区域名称 | - |
| operat_center_org_id | BIGINT | 运营中心ID | - |
| operat_center_org_name | VARCHAR | 运营中心名称 | - |
| organization_id | BIGINT | 组织ID | - |

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
            <td style="font-size:13px;">该组织下无门店或筛选条件过严</td>
            <td style="font-size:13px;">放宽查询条件重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">查询性能慢</td>
            <td style="font-size:13px;">大量子查询COUNT统计</td>
            <td style="font-size:13px;">属于已知性能特征，建议缩小查询范围</td>
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
    <h4><span style="color:#7C3AED;">报错：</span>查询性能慢</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>属于已知性能特征，建议缩小查询范围</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">为什么用子查询而不是GROUP BY？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>每个统计维度独立子查询，逻辑清晰但性能有代价
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">装修风格列名含义是什么？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>列名=风格简称+品牌entid后缀，如a6101表示品牌101的A6风格
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">系统归属有哪些？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>1-DMG, 2-华夏名酒连, 3-华美利嘉, 4-金融之家, 5-欧亚达, 6-月星家居, 7-月星家居, 8-其他
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">为什么只展示有门店的经销商？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>SQL使用EXISTS子查询过滤无门店的经销商，避免空行
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
| 2026-01-15 | v1.0.0 | 初始创建门店统计分析报表 | - |
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
