<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="店面额度内兑现余额表" desc="店面额度内兑现余额表，查询门店装修额度内兑现的余额情况" />

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
  ├─ 输入查询条件（经销商/法人/验收报销单号/门店）
  │
  ├─ 点击查询 → POST /v1/{organizationId}/terminalReport/fin-fee-in-standing-book-report/search
  │
  └─ 查看额度内兑现余额明细数据（含3年月度金额）
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游数据源 | 说明 | 关联方式 |
|-----------|------|---------|
| MKT_INLIMIT_BALANCE_HEADER | 额度内兑现余额主表 | 额度内余额数据来源 |
| FIN_FEE_APPLY_HEADER | 费用申请单 | 额度内装修申请/报销数据 |
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
<KbCard num="1" title="2.1 店面额度内兑现余额查询">
<KbQuote>查询门店额度内兑现的余额情况，跟踪每笔额度内装修申请的申请、验收、兑现余额，以及3年（前年/当年/次年）按月的兑现金额分布。</KbQuote>

**具体逻辑**：

- 1、支持按经销商编码、法人编码、验收报销单号、门店编码四个维度筛选
- 2、查询结果包含验收报销单号、支付方式、各类金额（申请/验收/报销/兑现/剩余）、面积、标准等核心字段
- 3、月度金额字段动态生成3年×12月=36列，按年月展示兑现金额
- 4、验收报销单号通过LOV选择，支付方式和装修性质通过值集翻译
</KbCard>

<KbCard num="2" title="2.2 LOV选择弹窗">
**具体逻辑**：

- 1、经销商编码：LOV `AE.DISTRIBUTOR_SEARCH_VIEW`，取customerCode
- 2、法人编码：LOV `AE.CUSTOMER_ID_QUERY`，取customerCode
- 3、验收报销单号：LOV `AE.SA_NEW_FIN_FEE_CHECK_BX_HEADER_VIEW`，取checkBxCode
- 4、门店编码：LOV `AE.STORE_FINFEEAPPLYCLOSE_DATA_VIEW`，取terminalCode
</KbCard>

<KbCard num="3" title="2.3 值集翻译">
**具体逻辑**：

- 1、支付方式：lookupCode `AE.PAY_TYPE`
- 2、店面装修性质：lookupCode `AE.DECORATION_TYPE`
- 3、--
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
| 验收报销单搜索 | AE.SA_NEW_FIN_FEE_CHECK_BX_HEADER_VIEW | - | checkBxCode |
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
<KbCard num="1" title="MKT_INLIMIT_BALANCE_HEADER（额度内兑现余额主表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| inlimit_balance_id | BIGINT | 主键 | - |
| entid | BIGINT | 事业部ID | - |
| entname | VARCHAR | 事业部名称 | - |
| division_id | BIGINT | 事业部词汇值 | - |
| trading_company_id | BIGINT | 交易公司ID | - |
| trading_company_code | VARCHAR | 交易公司编码 | - |
| trading_company_name | VARCHAR | 交易公司名称 | - |
| billing_unit_id | BIGINT | 法人ID | - |
| billing_unit_code | VARCHAR | 法人编码 | - |
| billing_unit_name | VARCHAR | 法人名称 | - |
| start_time | DATE | 时间范围开始 | - |
| end_time | DATE | 时间范围结束 | - |
| money_type | VARCHAR | 款项类型 | - |
| beginning_balance | DECIMAL | 期初余额 | - |
| deduction_amount | DECIMAL | 账户别名发放扣减 | - |
| expire_adjust_quota | DECIMAL | 到期额度调整 | - |
| other_adjust_quota | DECIMAL | 其他调整 | - |
| inlimit_cashout_quota | DECIMAL | 额度内兑现已审核金额 | - |
| checkout_order_provision | DECIMAL | 出库单计提 | - |
| other | DECIMAL | 其他 | - |
| actual_ending_balance | DECIMAL | 期末余额 | - |
| tya_ending_balance | DECIMAL | 2年前期末余额 | - |
| oya_ending_balance | DECIMAL | 1年前期末余额 | - |
| this_ending_balance | DECIMAL | 本年期末余额 | - |
| occupied_amount | DECIMAL | 已占用额度 | - |
| can_use_amount | DECIMAL | 剩余可用额度 | - |
| cashout | DECIMAL | 兑现占用 | - |
| delivery | DECIMAL | 出库单占用 | - |
| frozen | DECIMAL | 冻结占用 | - |
| adjustment | DECIMAL | 调整占用 | - |
| inlimit_cashout_quota_discount | DECIMAL | 费用转款 | - |
| inlimit_cashout_quota_remit | DECIMAL | 折扣折让 | - |

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
            <td style="font-size:13px;">查询条件过滤过严或该门店无额度内兑现记录</td>
            <td style="font-size:13px;">放宽查询条件重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">LOV弹窗无数据</td>
            <td style="font-size:13px;">经销商/法人/门店/报销单数据未维护</td>
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
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">月度金额列为什么是36列？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>覆盖前年、当年、次年共3年，每年12个月
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">月度金额列的年份如何确定？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>基于当前系统时间动态生成，如2026年则展示2025/2026/2027三年
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">与额度外占用预算明细报表的区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>额度内报表关注兑现余额，含支付方式字段；额度外报表关注占用预算，含两次兑现单号
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">验收报销单号为什么用LOV？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>额度内报表的验收报销单号通过LOV选择确保数据准确性，额度外报表为手工输入
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
| 2026-01-28 | v1.0.0 | 初始创建店面额度内兑现余额表报表 | - |
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
