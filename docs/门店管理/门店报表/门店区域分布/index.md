<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="门店区域分布" desc="门店区域分布报表，按区域层级展示门店的地理分布情况" />

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
  ├─ 输入查询条件（省份/城市/区县/门店数量阈值）
  │
  ├─ 点击查询 → POST /v1/{organizationId}/terminalReport/mkt-store-areal-distribution/search
  │
  └─ 查看按省-市-区县层级展示的门店数量分布
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游数据源 | 说明 | 关联方式 |
|-----------|------|---------|
| MKT_TERMINAL | 门店档案 | 按county_areaid分组统计门店数量 |
| SCPAREA | 区域基础表 | 省/市/区三级区域层级结构 |

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
<KbCard num="1" title="2.1 门店区域分布查询">
<KbQuote>按省-市-区县三级区域层级展示门店数量分布，用于分析各区域门店覆盖密度和布局合理性。</KbQuote>

**具体逻辑**：

- 1、以区域基础表(SCPAREA)为骨架，areatype=4(省)/5(市)/6(区县)三级LEFT JOIN
- 2、门店数量通过MKT_TERMINAL按county_areaid分组COUNT统计
- 3、无门店的区域也展示（门店数量为0），使用NVL(mt.terminal_num, 0)处理
- 4、支持按省份、城市、区县、门店数量阈值筛选
</KbCard>

<KbCard num="2" title="2.2 区域层级构建逻辑">
**具体逻辑**：

- 1、从SCPAREA取areatype=4作为省级节点
- 2、LEFT JOIN areatype=5通过superid关联省级，构建市级节点
- 3、LEFT JOIN areatype=6通过superid关联市级，构建区县级节点
- 4、LEFT JOIN门店统计结果通过county_areaid关联区县级
- 5、--
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

无。纯查询报表，无新增/编辑/删除按钮。

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
| cust_id | BIGINT | 所属经销商ID | - |
| cust_code | VARCHAR | 所属经销商编码 | - |
| cust_name | VARCHAR | 所属经销商名称 | - |
| county_areaid | BIGINT | 区县区域ID | 用于区域分布统计的关联键 |
| city_areaid | BIGINT | 城市区域ID | - |
| province_areaid | BIGINT | 省份区域ID | - |
| entid | BIGINT | 组织ID | 按组织过滤门店 |
| terminal_stat | INTEGER | 门店状态 | 1-运营中, 2-撤店 |
| terminal_type | INTEGER | 门店类型 | 1~5 |
| terminal_area | DECIMAL | 门店面积 | - |

</KbCard>

<KbCard num="2" title="SCPAREA（区域基础表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| areaid | BIGINT | 区域ID | - |
| areaname | VARCHAR | 区域名称 | - |
| areatype | INTEGER | 区域类型 | 4-省, 5-市, 6-区县 |
| superid | BIGINT | 上级区域ID | 省superid为国家, 市superid为省, 区县superid为市 |

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
            <td style="font-size:13px;">该组织下无门店数据</td>
            <td style="font-size:13px;">确认组织ID正确</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">门店数量全部为0</td>
            <td style="font-size:13px;">MKT_TERMINAL中county_areaid未维护</td>
            <td style="font-size:13px;">检查门店档案区域信息</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询无数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认组织ID正确</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>门店数量全部为0</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查门店档案区域信息</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|---------|--------|
| 2026-01-15 | v1.0.0 | 初始创建门店区域分布报表 | - |
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
