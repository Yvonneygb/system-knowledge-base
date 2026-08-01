<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="7" title="广告费余额查询" desc="财务管理-对账单业务说明" />

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

```text
用户选择查询条件(法人/交易公司/款项类型/时间范围) → 调用后端查询接口 → 查询MKT_INLIMIT_BALANCE_HEADER表 → 返回额度内广告费余额数据 → 展示列表
  → 可选：导出Excel / 查询资源金额 / 查询营销金额 / 查询合同信息
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 营销中台 | 数据依赖 | MKT_INLIMIT_BALANCE_HEADER表由营销中台同步写入 | 营销中台数据同步正常 |
| 资金池 | 数据依赖 | 查询资源金额和营销金额需资金池数据 | 资金池数据已维护 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 本功能为纯只读/即时操作，不向任何下游系统/模块写入数据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：额度内广告费余额查询 核心逻辑">
<KbQuote>按法人/交易公司查询额度内广告费的期初余额、本期变动、期末余额等信息</KbQuote>

**具体逻辑**：

- 1、MktInlimitBalanceHeaderController的query方法，支持分页查询
- 2、queryCount方法返回查询记录总数，用于分页计算
- 3、查询结果包含期初余额(beginningBalance)、期末余额(actualEndingBalance)、已占用额度(occupiedAmount)、剩余可用额度(canUseAmount)
</KbCard>

<KbCard num="2" title="重点逻辑2：余额构成明细计算 核心逻辑">
<KbQuote>期末余额由期初余额加减各项变动计算得出</KbQuote>

**具体逻辑**：

- 1、期初余额(beginningBalance)为年初或月初结转金额
- 2、扣减项包括：账户别名发放扣减(deductionAmount)、额度内兑现已审核金额(inlimitCashoutQuota)、出库单计提(checkoutOrderProvision)
- 3、调整项包括：到期额度调整(expireAdjustQuota)、其他调整(otherAdjustQuota)
- 4、期末余额(actualEndingBalance) = 期初余额 - 扣减项 + 调整项
</KbCard>

<KbCard num="3" title="重点逻辑3：占用金额分类">
<KbQuote>已占用额度按类型细分，便于分析资金占用结构</KbQuote>

**具体逻辑**：

- 1、兑现占用金额(cashout)——已兑现申请占用的金额
- 2、出库单占用金额(delivery)——出库单占用的金额
- 3、冻结占用金额(frozen)——冻结占用的金额
- 4、调整占用金额(adjustment)——调整占用的金额
- 5、已占用总额(occupiedAmount) = cashout + delivery + frozen + adjustment
</KbCard>

<KbCard num="4" title="重点逻辑4：辅助查询接口">
<KbQuote>提供资源金额、营销金额、合同信息等辅助查询</KbQuote>

**具体逻辑**：

- 1、queryResourceAmt——查询资源金额
- 2、queryMarketingMoney——查询营销金额
- 3、getContractInfo——查询合同余额信息
- 4、exportBalance——导出广告费余额Excel
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：hlod低代码查询页面">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>事业部</td>
<td>下拉选择框</td>
<td>事业部筛选</td>
<td>常显</td>
<td>来源值集epm.division</td>
<td>epm.division值集</td>
<td>MKT_INLIMIT_BALANCE_HEADER.ENTID</td>
</tr>
<tr>
<td>法人编码</td>
<td>下拉选择框</td>
<td>法人筛选</td>
<td>常显</td>
<td>选择法人后带入</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>下拉选择框</td>
<td>交易公司筛选</td>
<td>常显</td>
<td>选择交易公司后带入</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>款项类型</td>
<td>下拉选择框</td>
<td>款项类型筛选</td>
<td>常显</td>
<td>来源值集</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.MONEY_TYPE</td>
</tr>
<tr>
<td>开始时间</td>
<td>日期选择器</td>
<td>查询起始时间</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.START_TIME</td>
</tr>
<tr>
<td>结束时间</td>
<td>日期选择器</td>
<td>查询截止时间</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.END_TIME</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：查询结果列表">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>事业部名称</td>
<td>文本框</td>
<td>事业部名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.ENTNAME</td>
</tr>
<tr>
<td>法人名称</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>款项类型</td>
<td>文本框</td>
<td>款项类型</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.MONEY_TYPE</td>
</tr>
<tr>
<td>期初余额</td>
<td>数值框</td>
<td>期初余额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.BEGINNING_BALANCE</td>
</tr>
<tr>
<td>账户别名发放扣减</td>
<td>数值框</td>
<td>发放扣减金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.DEDUCTION_AMOUNT</td>
</tr>
<tr>
<td>到期额度调整</td>
<td>数值框</td>
<td>到期调整金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.EXPIRE_ADJUST_QUOTA</td>
</tr>
<tr>
<td>其他调整</td>
<td>数值框</td>
<td>其他调整金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.OTHER_ADJUST_QUOTA</td>
</tr>
<tr>
<td>额度内兑现已审核金额</td>
<td>数值框</td>
<td>兑现已审核金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.INLIMIT_CASHOUT_QUOTA</td>
</tr>
<tr>
<td>出库单计提</td>
<td>数值框</td>
<td>出库单计提金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.CHECKOUT_ORDER_PROVISION</td>
</tr>
<tr>
<td>期末余额</td>
<td>数值框</td>
<td>期末余额</td>
<td>常显</td>
<td>期初-扣减+调整</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.ACTUAL_ENDING_BALANCE</td>
</tr>
<tr>
<td>已占用额度</td>
<td>数值框</td>
<td>已占用总额</td>
<td>常显</td>
<td>cashout+delivery+frozen+adjustment</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.OCCUPIED_AMOUNT</td>
</tr>
<tr>
<td>剩余可用额度</td>
<td>数值框</td>
<td>剩余可用</td>
<td>常显</td>
<td>期末余额-已占用额度</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.CAN_USE_AMOUNT</td>
</tr>
<tr>
<td>兑现占用</td>
<td>数值框</td>
<td>兑现占用金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.CASHOUT</td>
</tr>
<tr>
<td>出库单占用</td>
<td>数值框</td>
<td>出库单占用金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.DELIVERY</td>
</tr>
<tr>
<td>冻结占用</td>
<td>数值框</td>
<td>冻结占用金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.FROZEN</td>
</tr>
<tr>
<td>调整占用</td>
<td>数值框</td>
<td>调整占用金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.ADJUSTMENT</td>
</tr>
<tr>
<td>同步时间</td>
<td>日期选择器</td>
<td>数据同步时间</td>
<td>常显</td>
<td>营销中台同步时间</td>
<td>-</td>
<td>MKT_INLIMIT_BALANCE_HEADER.SYNC_ITEM</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 查询 | 查询广告费余额 | 查询区域 | 查询条件已填写 | 调用query接口分页查询 |
| 导出 | 导出Excel | 列表页 | 有查询结果 | 调用exportBalance接口导出 |
| 查询资源金额 | 查询资源金额 | 列表页 | 选中记录 | 调用queryResourceAmt接口 |
| 查询营销金额 | 查询营销金额 | 列表页 | 选中记录 | 调用queryMarketingMoney接口 |
| 查询合同信息 | 查询合同余额信息 | 列表页 | 选中记录 | 调用getContractInfo接口 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本菜单为纯查询页面，无状态机流转。

---

</KbCard>
<KbCard num="1" title="表1：MKT_INLIMIT_BALANCE_HEADER（营销中台额度内余额查询表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INLIMIT_BALANCE_ID | BIGINT | 主键ID | - | 自增主键 |
| ENTID | BIGINT | 事业部ID | 事业部 | 值集epm.division |
| ENTNAME | VARCHAR | 事业部名称 | 事业部名称 | - |
| DIVISION_ID | BIGINT | 事业部(词汇值) | - | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | - | - |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | - |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司名称 | - |
| BILLING_UNIT_ID | BIGINT | 法人ID | - | - |
| BILLING_UNIT_CODE | VARCHAR | 法人编码 | 法人编码 | - |
| BILLING_UNIT_NAME | VARCHAR | 法人名称 | 法人名称 | - |
| START_TIME | DATE | 开始时间 | 开始时间 | 查询条件 |
| END_TIME | DATE | 结束时间 | 结束时间 | 查询条件 |
| MONEY_TYPE | VARCHAR | 款项类型 | 款项类型 | - |
| BEGINNING_BALANCE | DECIMAL | 期初余额 | 期初余额 | 年初/月初结转 |
| DEDUCTION_AMOUNT | DECIMAL | 账户别名发放扣减 | 账户别名发放扣减 | - |
| EXPIRE_ADJUST_QUOTA | DECIMAL | 到期额度调整 | 到期额度调整 | - |
| OTHER_ADJUST_QUOTA | DECIMAL | 其他调整 | 其他调整 | - |
| INLIMIT_CASHOUT_QUOTA | DECIMAL | 额度内兑现已审核金额 | 额度内兑现已审核金额 | - |
| CHECKOUT_ORDER_PROVISION | DECIMAL | 出库单计提 | 出库单计提 | - |
| OTHER | DECIMAL | 其他 | - | - |
| ACTUAL_ENDING_BALANCE | DECIMAL | 期末余额 | 期末余额 | 期初-扣减+调整 |
| TYA_ENDING_BALANCE | DECIMAL | 2年前期末余额 | - | - |
| OYA_ENDING_BALANCE | DECIMAL | 1年前期末余额 | - | - |
| THIS_ENDING_BALANCE | DECIMAL | 本年期末余额 | - | - |
| OCCUPIED_AMOUNT | DECIMAL | 已占用额度 | 已占用额度 | cashout+delivery+frozen+adjustment |
| CAN_USE_AMOUNT | DECIMAL | 剩余可用额度 | 剩余可用额度 | 期末余额-已占用额度 |
| CASHOUT | DECIMAL | 兑现占用金额 | 兑现占用 | - |
| DELIVERY | DECIMAL | 出库单占用金额 | 出库单占用 | - |
| FROZEN | DECIMAL | 冻结占用金额 | 冻结占用 | - |
| ADJUSTMENT | DECIMAL | 调整占用金额 | 调整占用 | - |
| INLIMIT_CASHOUT_QUOTA_DISCOUNT | DECIMAL | 额度内兑现已审核金额-费用转款 | - | - |
| INLIMIT_CASHOUT_QUOTA_REMIT | DECIMAL | 额度内兑现已审核金额-折扣折让 | - | - |
| CREATE_TIME | DATE | 创建时间 | - | 系统自动记录 |
| UPDATE_TIME | DATE | 更新时间 | - | 系统自动记录 |
| SYNC_ITEM | DATE | 同步时间 | 同步时间 | 营销中台同步时间 |

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
            <td style="color:#DC2626;font-weight:600;">查询结果为空</td>
            <td style="font-size:13px;">查询</td>
            <td style="font-size:13px;">MKT_INLIMIT_BALANCE_HEADER表中无匹配记录</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">余额数据未同步</td>
            <td style="font-size:13px;">查询</td>
            <td style="font-size:13px;">SYNC_ITEM时间过旧，营销中台未及时同步</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询结果为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>MKT_INLIMIT_BALANCE_HEADER表中无匹配记录</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>余额数据未同步</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>SYNC_ITEM时间过旧，营销中台未及时同步</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">期末余额与期初余额差异异常</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>扣减项或调整项数据异常<br>
      <strong style="color:#7C3AED;">处理：</strong>逐项核对期初余额、扣减项、调整项，确认数据来源正确
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">已占用额度与各占用明细之和不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>occupiedAmount ≠ cashout + delivery + frozen + adjustment<br>
      <strong style="color:#7C3AED;">处理：</strong>确认营销中台数据同步是否完整
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

| 日期 | 提交ID | 提交人 | 提交内容 |
|------|-------|-------|---------|
| 2025-09-22 | - | - | 初始创建广告费余额查询功能 |

> 要求：
> 1. 按倒序展示
> 2. 只需要包含2026年的提交记录
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
