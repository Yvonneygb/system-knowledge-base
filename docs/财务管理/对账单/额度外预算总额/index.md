<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="额度外预算总额" desc="财务管理-对账单业务说明" />

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
用户选择查询条件(预算年度/事业部/法人/经销商) → 调用后端查询接口 → 查询MKT_OUTLIMIT_BUD_HEADER表 → 返回额度外预算使用数据 → 展示列表
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 额度外预算导入 | 数据依赖 | MKT_OUTLIMIT_BUD_HEADER表数据通过Excel导入或系统同步写入 | 预算数据已导入 |
| 费用兑现 | 数据依赖 | FinFeeCashoutHeaderServiceImpl引用MktOutlimitBudHeaderRepository查询额度外预算数据 | 费用兑现业务已使用 |

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
<KbCard num="1" title="重点逻辑1：额度外预算总额查询 核心逻辑">
<KbQuote>查询经销商的额度外预算总额、已使用金额、剩余金额等信息</KbQuote>

**具体逻辑**：

- 1、MktOutlimitBudHeaderRepository提供selectList和selectByPrimary方法查询预算数据
- 2、selectByBudYear方法按预算年度查询汇总数据
- 3、MktOutlimitBudHeader无独立Controller，作为数据实体被FinFeeCashoutHeaderServiceImpl引用
</KbCard>

<KbCard num="2" title="重点逻辑2：预算使用金额按月分解 核心逻辑">
<KbQuote>额度外预算使用金额按月(1-12月)分别记录，支持月度预算使用分析</KbQuote>

**具体逻辑**：

- 1、thisOutlimitBudUsed1~thisOutlimitBudUsed12为本年1-12月已使用预算金额
- 2、nextOutlimitBudUsed1~nextOutlimitBudUsed12为次年1-12月已使用预算金额
- 3、totalOutlimitBudUsed为本年累计已使用预算总额
- 4、nowTotalOutlimitBudUsed为当前累计已使用预算总额(含次年)
</KbCard>

<KbCard num="3" title="重点逻辑3：预算余额计算">
<KbQuote>预算剩余金额=预算总额-累计已使用金额</KbQuote>

**具体逻辑**：

- 1、outlimitBudTotal为额度外预算总额(含税)
- 2、notaxOutlimitBudTotal为额度外预算总额(不含税)
- 3、outlimitBudSur为预算剩余金额=outlimitBudTotal-totalOutlimitBudUsed
- 4、surWriteoffAmt为剩余核销金额
</KbCard>

<KbCard num="4" title="重点逻辑4：上年度预算结转">
<KbQuote>支持上年度额度外预算结转至本年度</KbQuote>

**具体逻辑**：

- 1、lastOutlimitBudTotal为上年度预算总额
- 2、lastOutlimitBudUsed为上年度已使用金额
- 3、lastOutlimitBudSur为上年度剩余金额
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
<td>预算年度</td>
<td>文本框</td>
<td>预算年度筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>年度格式</td>
<td>MKT_OUTLIMIT_BUD_HEADER.BUD_YEAR</td>
</tr>
<tr>
<td>事业部</td>
<td>下拉选择框</td>
<td>事业部筛选</td>
<td>常显</td>
<td>来源值集epm.division</td>
<td>epm.division值集</td>
<td>MKT_OUTLIMIT_BUD_HEADER.DIVISION_ID</td>
</tr>
<tr>
<td>法人编码</td>
<td>下拉选择框</td>
<td>法人筛选</td>
<td>常显</td>
<td>选择法人后带入</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>下拉选择框</td>
<td>交易公司筛选</td>
<td>常显</td>
<td>选择交易公司后带入</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码筛选</td>
<td>常显</td>
<td>支持模糊查询</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.CUSTOMER_CODE</td>
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
<td>预算单号</td>
<td>文本框</td>
<td>预算单号</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.OUTLIMIT_BUD_ID_NO</td>
</tr>
<tr>
<td>预算年度</td>
<td>文本框</td>
<td>预算年度</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.BUD_YEAR</td>
</tr>
<tr>
<td>事业部名称</td>
<td>文本框</td>
<td>事业部名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.DIVISION_NAME</td>
</tr>
<tr>
<td>法人名称</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.CUSTOMER_NAME</td>
</tr>
<tr>
<td>终端编码</td>
<td>文本框</td>
<td>终端编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.TERMINAL_CODE</td>
</tr>
<tr>
<td>终端名称</td>
<td>文本框</td>
<td>终端名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.TERMINAL_NAME</td>
</tr>
<tr>
<td>上年预算总额</td>
<td>数值框</td>
<td>上年度预算总额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.LAST_OUTLIMIT_BUD_TOTAL</td>
</tr>
<tr>
<td>上年已使用</td>
<td>数值框</td>
<td>上年度已使用金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.LAST_OUTLIMIT_BUD_USED</td>
</tr>
<tr>
<td>上年剩余</td>
<td>数值框</td>
<td>上年度剩余金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.LAST_OUTLIMIT_BUD_SUR</td>
</tr>
<tr>
<td>预算总额(含税)</td>
<td>数值框</td>
<td>本年预算总额(含税)</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.OUTLIMIT_BUD_TOTAL</td>
</tr>
<tr>
<td>预算总额(不含税)</td>
<td>数值框</td>
<td>本年预算总额(不含税)</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.NOTAX_OUTLIMIT_BUD_TOTAL</td>
</tr>
<tr>
<td>预算调整</td>
<td>数值框</td>
<td>预算调整金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.OUTLIMIT_BUD_ADJ</td>
</tr>
<tr>
<td>1月使用</td>
<td>数值框</td>
<td>本年1月已使用</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.THIS_OUTLIMIT_BUD_USED_1</td>
</tr>
<tr>
<td>2月使用</td>
<td>数值框</td>
<td>本年2月已使用</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.THIS_OUTLIMIT_BUD_USED_2</td>
</tr>
<tr>
<td>累计已使用</td>
<td>数值框</td>
<td>本年累计已使用</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.TOTAL_OUTLIMIT_BUD_USED</td>
</tr>
<tr>
<td>预算剩余</td>
<td>数值框</td>
<td>预算剩余金额</td>
<td>常显</td>
<td>预算总额-累计已使用</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.OUTLIMIT_BUD_SUR</td>
</tr>
<tr>
<td>剩余核销金额</td>
<td>数值框</td>
<td>剩余核销金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.SUR_WRITEOFF_AMT</td>
</tr>
<tr>
<td>税率</td>
<td>数值框</td>
<td>税率</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>MKT_OUTLIMIT_BUD_HEADER.TAX_RATE</td>
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
| 查询 | 查询额度外预算总额 | 查询区域 | 查询条件已填写 | 调用后端查询接口 |

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
<KbCard num="1" title="表1：MKT_OUTLIMIT_BUD_HEADER（额度外预算头表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| OUTLIMIT_BUD_ID | BIGINT | 主键ID | - | 自增主键 |
| OUTLIMIT_BUD_ID_NO | VARCHAR | 预算单号 | 预算单号 | - |
| BUD_YEAR | VARCHAR | 预算年度 | 预算年度 | - |
| DIVISION_ID | BIGINT | 事业部ID | 事业部 | 值集epm.division |
| DIVISION_NAME | VARCHAR | 事业部名称 | 事业部名称 | - |
| ENTID | BIGINT | 事业部实体ID | - | - |
| ENTNAME | VARCHAR | 事业部实体名称 | - | - |
| CUSTOMER_ID | BIGINT | 经销商ID | - | - |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销商编码 | - |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | 经销商名称 | - |
| SHORT_NAME | VARCHAR | 经销商简称 | - | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | - | - |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司名称 | - |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | - |
| BILLING_UNIT_ID | BIGINT | 法人ID | - | - |
| BILLING_UNIT_CODE | VARCHAR | 法人编码 | 法人编码 | - |
| BILLING_UNIT_NAME | VARCHAR | 法人名称 | 法人名称 | - |
| TERMINAL_ID | BIGINT | 终端ID | - | - |
| TERMINAL_CODE | VARCHAR | 终端编码 | 终端编码 | - |
| TERMINAL_NAME | VARCHAR | 终端名称 | 终端名称 | - |
| CITY_AREAID | BIGINT | 城市区域ID | - | - |
| CITY_AREANAME | VARCHAR | 城市区域名称 | - | - |
| ADDR | VARCHAR | 地址 | - | - |
| TERMINAL_AREA | DECIMAL | 终端面积 | - | - |
| LAST_OUTLIMIT_BUD_TOTAL | DECIMAL | 上年预算总额 | 上年预算总额 | - |
| LAST_OUTLIMIT_BUD_USED | DECIMAL | 上年已使用 | 上年已使用 | - |
| LAST_OUTLIMIT_BUD_SUR | DECIMAL | 上年剩余 | 上年剩余 | - |
| OUTLIMIT_BUD_TOTAL | DECIMAL | 预算总额(含税) | 预算总额(含税) | - |
| NOTAX_OUTLIMIT_BUD_TOTAL | DECIMAL | 预算总额(不含税) | 预算总额(不含税) | - |
| OUTLIMIT_BUD_ADJ | DECIMAL | 预算调整 | 预算调整 | - |
| OUTLIMIT_BUD_ADJ_NO | VARCHAR | 预算调整单号 | - | - |
| THIS_OUTLIMIT_BUD_USED_1 | DECIMAL | 本年1月已使用 | 1月使用 | - |
| THIS_OUTLIMIT_BUD_USED_2 | DECIMAL | 本年2月已使用 | 2月使用 | - |
| THIS_OUTLIMIT_BUD_USED_3~12 | DECIMAL | 本年3-12月已使用 | 3-12月使用 | - |
| TOTAL_OUTLIMIT_BUD_USED | DECIMAL | 本年累计已使用 | 累计已使用 | - |
| OUTLIMIT_BUD_SUR | DECIMAL | 预算剩余 | 预算剩余 | 预算总额-累计已使用 |
| NEXT_OUTLIMIT_BUD_USED_1~12 | DECIMAL | 次年1-12月已使用 | - | - |
| NOW_TOTAL_OUTLIMIT_BUD_USED | DECIMAL | 当前累计已使用(含次年) | - | - |
| SUR_WRITEOFF_AMT | DECIMAL | 剩余核销金额 | 剩余核销金额 | - |
| TAX_RATE | DECIMAL | 税率 | 税率 | - |
| IMPORT_FLAG | VARCHAR | 导入标识 | - | - |
| CREATOR | VARCHAR | 创建人 | - | 系统自动记录 |
| CREATE_TIME | DATE | 创建时间 | - | 系统自动记录 |
| UPDATOR | VARCHAR | 更新人 | - | 系统自动记录 |
| UPDATE_TIME | DATE | 更新时间 | - | 系统自动记录 |
| CHECKER | VARCHAR | 审核人 | - | - |
| CHECK_TIME | DATE | 审核时间 | - | - |
| NOTE | VARCHAR | 备注 | - | - |

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
            <td style="font-size:13px;">MKT_OUTLIMIT_BUD_HEADER表中无匹配记录</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询结果为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>MKT_OUTLIMIT_BUD_HEADER表中无匹配记录</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">预算剩余金额与手动计算不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>outlimitBudSur ≠ outlimitBudTotal - totalOutlimitBudUsed<br>
      <strong style="color:#7C3AED;">处理：</strong>确认预算数据导入时计算逻辑是否正确
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">月度使用金额之和与累计已使用不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>totalOutlimitBudUsed ≠ SUM(thisOutlimitBudUsed1~12)<br>
      <strong style="color:#7C3AED;">处理：</strong>确认月度使用金额数据是否完整导入
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
| 2026-03-03 | - | - | 初始创建额度外预算总额查询功能 |

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
