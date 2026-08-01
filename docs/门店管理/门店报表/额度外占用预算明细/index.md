<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="额度外占用预算明细" desc="额度外占用预算明细报表，展示额度外预算的占用和使用明细" />

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
用户进入报表页面
  │
  ├─ 输入查询条件（经销商/法人/报销单号/门店）
  │
  ├─ 点击查询 → POST /v1/{organizationId}/terminalReport/fin-fee-out-standing-book-report/search
  │
  └─ 查看额度外占用预算明细数据（含3年月度金额）
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游数据源 | 说明 | 关联方式 |
|-----------|------|---------|
| MKT_OUTLIMIT_BUD_HEADER | 经销商额度外限额主表 | 额度外预算额度数据来源 |
| FIN_FEE_APPLY_HEADER | 费用申请单 | 额度外装修申请/报销数据 |
| MKT_TERMINAL | 门店档案 | 门店基础信息 |
| CUSTOMER | 客户/经销商 | 经销商编码/名称 |

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
<KbCard num="1" title="2.1 额度外占用预算明细查询">
<KbQuote>查询经销商额度外预算的占用明细，跟踪每笔额度外装修申请的申请、验收、兑现情况，以及3年（前年/当年/次年）按月的兑现金额分布。</KbQuote>

**具体逻辑**：

- 1、支持按经销商编码、法人编码、验收报销单号、门店编码四个维度筛选
- 2、查询结果包含装修申请月份、两次兑现单号及时间、报销金额、面积、标准等核心字段
- 3、月度金额字段动态生成3年×12月=36列，按年月展示兑现金额
- 4、所有金额字段保留2位小数（BigDecimal2Serializer）
</KbCard>

<KbCard num="2" title="2.2 LOV选择弹窗">
**具体逻辑**：

- 1、经销商编码：LOV `AE.DISTRIBUTOR_SEARCH_VIEW`，取customerCode
- 2、法人编码：LOV `AE.CUSTOMER_ID_QUERY`，取customerCode
- 3、门店编码：LOV `AE.STORE_FINFEEAPPLYCLOSE_DATA_VIEW`，取terminalCode
- 4、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| 法人查询 | AE.CUSTOMER_ID_QUERY | - | customerCode |
| 门店搜索 | AE.STORE_FINFEEAPPLYCLOSE_DATA_VIEW | - | terminalCode |

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
<KbCard num="1" title="MKT_OUTLIMIT_BUD_HEADER（经销商额度外限额主表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| outlimit_bud_id | BIGINT | 主键 | - |
| outlimit_bud_id_no | VARCHAR | 编号 | - |
| bud_year | VARCHAR | 预算年度 | - |
| division_id | BIGINT | 事业部ID | - |
| division_name | VARCHAR | 事业部名称 | - |
| entid | BIGINT | 组织ID | - |
| entname | VARCHAR | 组织名称 | - |
| customer_id | BIGINT | 经销商ID | - |
| customer_code | VARCHAR | 经销商编码 | - |
| customer_name | VARCHAR | 经销商名称 | - |
| terminal_id | BIGINT | 门店ID | - |
| terminal_code | VARCHAR | 门店编码 | - |
| terminal_name | VARCHAR | 门店名称 | - |
| trading_company_id | BIGINT | 交易公司ID | - |
| trading_company_code | VARCHAR | 交易公司编码 | - |
| trading_company_name | VARCHAR | 交易公司名称 | - |
| billing_unit_id | BIGINT | 法人ID | - |
| billing_unit_code | VARCHAR | 法人编码 | - |
| billing_unit_name | VARCHAR | 法人名称 | - |
| last_outlimit_bud_total | DECIMAL | 上年额度总额 | - |
| last_outlimit_bud_used | DECIMAL | 上年额度已用 | - |
| last_outlimit_bud_sur | DECIMAL | 上年额度剩余 | - |
| outlimit_bud_total | DECIMAL | 本年额度总额 | - |
| notax_outlimit_bud_total | DECIMAL | 未税额度总额 | - |
| outlimit_bud_adj | DECIMAL | 额度调整 | - |
| outlimit_bud_adj_no | VARCHAR | 调整单号 | - |
| this_outlimit_bud_used1~12 | DECIMAL | 本年1-12月已用 | - |
| total_outlimit_bud_used | DECIMAL | 本年已用合计 | - |
| outlimit_bud_sur | DECIMAL | 本年剩余 | - |
| next_outlimit_bud_used1~12 | DECIMAL | 下年1-12月已用 | - |
| now_total_outlimit_bud_used | DECIMAL | 下年已用合计 | - |
| sur_writeoff_amt | DECIMAL | 剩余核销金额 | - |
| tax_rate | DECIMAL | 税率 | - |
| terminal_area | DECIMAL | 门店面积 | - |
| city_areaid | BIGINT | 城市区域ID | - |
| city_areaname | VARCHAR | 城市区域名称 | - |

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
            <td style="font-size:13px;">查询条件过滤过严或该经销商无额度外占用记录</td>
            <td style="font-size:13px;">放宽查询条件重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">LOV弹窗无数据</td>
            <td style="font-size:13px;">经销商/法人/门店数据未维护</td>
            <td style="font-size:13px;">先维护基础数据</td>
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
    <h4><span style="color:#7C3AED;">报错：</span>LOV弹窗无数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>先维护基础数据</div>
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
| 2026-01-28 | v1.0.0 | 初始创建额度外占用预算明细报表 | - |
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
