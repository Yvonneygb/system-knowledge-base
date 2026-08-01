<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="额度内市场推广服务费对账单" desc="财务管理-对账单业务说明" />

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
用户选择查询条件(事业部/交易公司/法人/年月) → 查询BUD_INLIMIT_BALANCE_ACCOUNT头表 + BUD_INLIMIT_ACCOUNT_LINE行表 → 展示对账单列表
  → 可选：重新生成对账单数据(regenerate) → 按条件重新计算并生成对账单
  → 可选：更新推送状态(updateStatus) → 批量更新推送状态
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 广告费余额 | 数据依赖 | 对账单数据基于MKT_INLIMIT_BALANCE_HEADER广告费余额数据计算 | 广告费余额数据已同步 |
| 营销中台 | 数据依赖 | 额度内兑现、出库单计提等数据来源于营销中台 | 营销中台数据同步正常 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 对账单推送 | 推送对账单 | 推送状态(sendStatus)更新后，可能触发对账单推送到外部系统 |
| 对账单重生成 | 重新生成对账单 | regenerate操作会重新计算并覆盖已有对账单数据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：对账单数据查询 核心逻辑">
<KbQuote>按事业部/交易公司/法人/年月查询额度内市场推广服务费对账单</KbQuote>

**具体逻辑**：

- 1、BudInlimitBalanceAccountController基于/v1/{organizationId}/inlimit-balance-account路由
- 2、selectList方法查询头表BUD_INLIMIT_BALANCE_ACCOUNT，返回对账单列表
- 3、selectLineDetails方法查询行表BUD_INLIMIT_ACCOUNT_LINE，返回对账单明细
- 4、selectDetailsTotal方法查询对账单汇总数据
</KbCard>

<KbCard num="2" title="重点逻辑2：重新生成对账单 核心逻辑">
<KbQuote>支持按条件重新计算并生成对账单数据，用于数据修正或补生成</KbQuote>

**具体逻辑**：

- 1、regenerate接口接收BudInlimitBalanceAccountDTO参数
- 2、根据传入的事业部/交易公司/法人/年月条件，重新从广告费余额等源数据计算对账单
- 3、重新生成会覆盖已有对账单数据，需谨慎操作
</KbCard>

<KbCard num="3" title="重点逻辑3：推送状态管理">
<KbQuote>管理对账单的推送状态，支持批量更新</KbQuote>

**具体逻辑**：

- 1、updateStatus接口接收BalanceAccountBatchSendDTO参数
- 2、sendStatus字段标识推送状态(0未推送/1已推送/2推送失败)
- 3、s_stat字段标识对账单状态
</KbCard>

<KbCard num="4" title="重点逻辑4：对账单余额构成">
<KbQuote>对账单记录额度内广告费的期初余额、本期变动、期末余额</KbQuote>

**具体逻辑**：

- 1、beginningBalance为期初余额
- 2、checkoutOrderProvision为出库单计提
- 3、deductionAmount为账户别名发放扣减
- 4、expireAdjustQuota为到期额度调整
- 5、otherAdjustQuota为其他调整
- 6、inlimitCashoutQuota为额度内兑现已审核金额
- 7、actualEndingBalance为期末余额
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
<td>BUD_INLIMIT_BALANCE_ACCOUNT.ENTNAME</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>下拉选择框</td>
<td>交易公司筛选</td>
<td>常显</td>
<td>选择交易公司后带入</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>法人编码</td>
<td>下拉选择框</td>
<td>法人筛选</td>
<td>常显</td>
<td>选择法人后带入</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>年月</td>
<td>文本框</td>
<td>对账年月</td>
<td>常显</td>
<td>格式yyyy-MM</td>
<td>年月格式</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.YEARMONTH</td>
</tr>
<tr>
<td>推送状态</td>
<td>下拉选择框</td>
<td>推送状态筛选</td>
<td>常显</td>
<td>0未推送/1已推送/2推送失败</td>
<td>0,1,2</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.SEND_STATUS</td>
</tr>
<tr>
<td>对账单状态</td>
<td>下拉选择框</td>
<td>对账单状态筛选</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.S_STAT</td>
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
<td>事业部</td>
<td>文本框</td>
<td>事业部名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.ENTNAME</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>法人编码</td>
<td>文本框</td>
<td>法人编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>年月</td>
<td>文本框</td>
<td>对账年月</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.YEARMONTH</td>
</tr>
<tr>
<td>开始时间</td>
<td>日期选择器</td>
<td>对账期间起始</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.START_TIME</td>
</tr>
<tr>
<td>结束时间</td>
<td>日期选择器</td>
<td>对账期间截止</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.END_TIME</td>
</tr>
<tr>
<td>期初余额</td>
<td>数值框</td>
<td>期初余额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.BEGINNING_BALANCE</td>
</tr>
<tr>
<td>出库单计提</td>
<td>数值框</td>
<td>出库单计提金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.CHECKOUT_ORDER_PROVISION</td>
</tr>
<tr>
<td>账户别名发放扣减</td>
<td>数值框</td>
<td>发放扣减金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.DEDUCTION_AMOUNT</td>
</tr>
<tr>
<td>到期额度调整</td>
<td>数值框</td>
<td>到期调整金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.EXPIRE_ADJUST_QUOTA</td>
</tr>
<tr>
<td>其他调整</td>
<td>数值框</td>
<td>其他调整金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.OTHER_ADJUST_QUOTA</td>
</tr>
<tr>
<td>额度内兑现已审核金额</td>
<td>数值框</td>
<td>兑现已审核金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.INLIMIT_CASHOUT_QUOTA</td>
</tr>
<tr>
<td>期末余额</td>
<td>数值框</td>
<td>期末余额</td>
<td>常显</td>
<td>期初-扣减+调整</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.ACTUAL_ENDING_BALANCE</td>
</tr>
<tr>
<td>推送状态</td>
<td>下拉选择框</td>
<td>推送状态</td>
<td>常显</td>
<td>0未推送/1已推送/2推送失败</td>
<td>0,1,2</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.SEND_STATUS</td>
</tr>
<tr>
<td>对账单状态</td>
<td>下拉选择框</td>
<td>对账单状态</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_BALANCE_ACCOUNT.S_STAT</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：对账单明细行">
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
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_ACCOUNT_LINE.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_ACCOUNT_LINE.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>法人编码</td>
<td>文本框</td>
<td>法人编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_ACCOUNT_LINE.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>法人名称</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_ACCOUNT_LINE.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>开始时间</td>
<td>日期选择器</td>
<td>明细期间起始</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_ACCOUNT_LINE.START_TIME</td>
</tr>
<tr>
<td>结束时间</td>
<td>日期选择器</td>
<td>明细期间截止</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>BUD_INLIMIT_ACCOUNT_LINE.END_TIME</td>
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
| 查询 | 查询对账单 | 查询区域 | 查询条件已填写 | 调用selectList接口分页查询 |
| 重新生成 | 重新生成对账单数据 | 列表页/详情页 | 有权限且状态允许 | 调用regenerate接口，覆盖已有数据 |
| 更新推送状态 | 批量更新推送状态 | 列表页 | 选中记录 | 调用updateStatus接口 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本菜单无工作流审批，推送状态流转如下：

<KbSubTitle>推送状态流转图</KbSubTitle>


```text
0(未推送) ──推送成功──→ 1(已推送)
   │                        │
   ├──推送失败──→ 2(推送失败) │
   │                        │
   └──重新推送──→ 0/1/2     └──重推──→ 0(未推送)
```

<KbSubTitle>推送状态列表</KbSubTitle>


| 状态值 | 状态释义 | 可执行的操作 |
|-------|---------|------------|
| 0 | 未推送 | 推送、重新生成 |
| 1 | 已推送 | 重新推送、重新生成 |
| 2 | 推送失败 | 重新推送、重新生成 |

---

</KbCard>
<KbCard num="1" title="表1：BUD_INLIMIT_BALANCE_ACCOUNT（额度内市场推广服务费对账单头表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INLIMIT_BALANCE_ACCOUNT_ID | BIGINT | 主键ID | - | 自增主键 |
| ENTNAME | VARCHAR | 事业部名称 | 事业部 | - |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | - |
| BILLING_UNIT_CODE | VARCHAR | 法人编码 | 法人编码 | - |
| YEARMONTH | VARCHAR | 年月 | 年月 | 格式yyyy-MM |
| START_TIME | VARCHAR | 开始时间 | 开始时间 | 对账期间起始 |
| END_TIME | VARCHAR | 结束时间 | 结束时间 | 对账期间截止 |
| SEND_STATUS | INTEGER | 推送状态 | 推送状态 | 0未推送/1已推送/2推送失败 |
| S_STAT | INTEGER | 对账单状态 | 对账单状态 | - |
| BEGINNING_BALANCE | DECIMAL | 期初余额 | 期初余额 | - |
| CHECKOUT_ORDER_PROVISION | DECIMAL | 出库单计提 | 出库单计提 | - |
| DEDUCTION_AMOUNT | DECIMAL | 账户别名发放扣减 | 账户别名发放扣减 | - |
| EXPIRE_ADJUST_QUOTA | DECIMAL | 到期额度调整 | 到期额度调整 | - |
| OTHER_ADJUST_QUOTA | DECIMAL | 其他调整 | 其他调整 | - |
| INLIMIT_CASHOUT_QUOTA | DECIMAL | 额度内兑现已审核金额 | 额度内兑现已审核金额 | - |
| ACTUAL_ENDING_BALANCE | DECIMAL | 期末余额 | 期末余额 | 期初-扣减+调整 |

</KbCard>

<KbCard num="2" title="表2：BUD_INLIMIT_ACCOUNT_LINE（额度内对账单行表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INLIMIT_BALANCE_ID | BIGINT | 主键ID | - | 自增主键 |
| INLIMIT_BALANCE_ACCOUNT_ID | BIGINT | 头表ID | - | 关联头表BUD_INLIMIT_BALANCE_ACCOUNT |
| START_TIME | DATE | 开始时间 | 开始时间 | 明细期间起始 |
| END_TIME | DATE | 结束时间 | 结束时间 | 明细期间截止 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | - |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司名称 | - |
| BILLING_UNIT_CODE | VARCHAR | 法人编码 | 法人编码 | - |
| BILLING_UNIT_NAME | VARCHAR | 法人名称 | 法人名称 | - |

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
            <td style="font-size:13px;">BUD_INLIMIT_BALANCE_ACCOUNT表中无匹配记录</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">重新生成失败</td>
            <td style="font-size:13px;">重新生成</td>
            <td style="font-size:13px;">源数据(广告费余额)不存在或计算异常</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询结果为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>BUD_INLIMIT_BALANCE_ACCOUNT表中无匹配记录</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>重新生成失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>源数据(广告费余额)不存在或计算异常</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">重新生成后数据与之前不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>regenerate会基于最新源数据重新计算，源数据可能已变更<br>
      <strong style="color:#7C3AED;">处理：</strong>重新生成前确认源数据是否已更新，评估影响后操作
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">推送状态一直为推送失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>外部推送系统不可用或推送报文格式异常<br>
      <strong style="color:#7C3AED;">处理：</strong>检查外部推送系统连通性，确认推送报文格式正确后重新推送
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
| 2025-08-29 | - | YangDa | 初始创建额度内市场推广服务费对账单功能 |
| 2025-09-02 | - | YangDa | 新增对账单行表BUD_INLIMIT_ACCOUNT_LINE |

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
