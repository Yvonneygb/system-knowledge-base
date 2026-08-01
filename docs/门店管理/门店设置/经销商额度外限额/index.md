<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="经销商额度外限额" desc="设置经销商的额度外限额，控制经销商在额度外可报销的金额上限" />

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
开始 → 新增额度外限额 → 填写经销商+门店+额度信息 → 保存 → 完成
                  │
                  └→ 批量导入 → 保存 → 完成
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 依赖模块 | 依赖说明 |
|---------|---------|
| 事业部 | 新增时需选择事业部，决定数据归属范围 |
| 经销主档 | 选择经销商，带出经销商编码、名称、简称 |
| 门店主档 | 选择门店，带出门店编码、名称、地址、面积 |
| 交易公司 | 选择交易公司，带出编码和名称 |
| 开票单元 | 选择开票单元，带出编码和名称 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 门店验收报销 | 影响说明 | 验收报销时查询经销商的额度外限额，判断是否超额及处理策略 |
| 额度外预算调整 | 影响说明 | 额度外限额调整单引用当前限额数据进行调整 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 额度外限额管理">
**具体逻辑**：

- 1、为每个经销商+门店组合配置额度外限额预算
- 2、额度外总额（outlimitBudTotal）含税，不含税额度外总额（notaxOutlimitBudTotal）不含税
- 3、税率（taxRate）用于含税/不含税金额转换
</KbCard>

<KbCard num="2" title="2.2 额度使用跟踪">
**具体逻辑**：

- 1、当月1~12月已用额度（thisOutlimitBudUsed1~12）按月跟踪使用情况
- 2、下月1~12月已用额度（nextOutlimitBudUsed1~12）预占下年额度
- 3、累计已用额度（totalOutlimitBudUsed）= 各月已用之和
- 4、额度外剩余（outlimitBudSur）= 额度外总额 - 累计已用额度
</KbCard>

<KbCard num="3" title="2.3 上年结转">
**具体逻辑**：

- 1、上年额度外总额（lastOutlimitBudTotal）、上年已用（lastOutlimitBudUsed）、上年剩余（lastOutlimitBudSur）
- 2、用于年度结转时计算可结转额度
</KbCard>

<KbCard num="4" title="2.4 额度调整">
**具体逻辑**：

- 1、额度外调整额（outlimitBudAdj）和调整单号（outlimitBudAdjNo）记录调整信息
- 2、剩余核销金额（surWriteoffAmt）跟踪待核销余额
</KbCard>

<KbCard num="5" title="2.5 批量导入">
**具体逻辑**：

- 1、importFlag 标识数据是否通过导入产生
- 2、支持批量导入经销商额度外限额数据
- 3、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗</KbSubTitle>

- **经销商LOV**：选择经销商，带出编码、名称、简称
- **门店LOV**：选择门店，带出编码、名称、地址、面积、城市区域
- **交易公司LOV**：选择交易公司，带出编码和名称
- **开票单元LOV**：选择开票单元，带出编码和名称

</KbCard>
<KbCard title="导入">
支持批量导入，导入后 importFlag 标记为导入数据

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 操作说明 | 可用条件 |
|---------|---------|---------|
| 新增 | 新增一条额度外限额 | 始终可用 |
| 保存 | 保存当前编辑数据 | 编辑状态 |
| 导入 | 批量导入额度外限额数据 | 始终可用 |
| 按年度查询 | 按预算年度筛选限额数据 | 始终可用 |

</KbCard>
<KbCard title="保存校验">
- 经销商不能为空

- 门店不能为空

- 预算年度不能为空

- 同一经销商+门店+年度不允许重复

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

```text
编辑中 ──保存──→ 已保存（可继续编辑）
```

---

</KbCard>
<KbCard num="1" title="4.1 MKT_OUTLIMIT_BUD_HEADER（经销商额度外限额表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| OUTLIMIT_BUD_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| OUTLIMIT_BUD_ID_NO | VARCHAR | 单据编号 | |
| BUD_YEAR | VARCHAR | 预算年度 | |
| DIVISION_ID | BIGINT | 事业部ID | |
| DIVISION_NAME | VARCHAR | 事业部名称 | |
| ENTID | BIGINT | 事业部实体ID | |
| ENTNAME | VARCHAR | 事业部名称 | |
| CREATOR | VARCHAR | 创建人 | |
| CREATE_TIME | DATETIME | 创建时间 | |
| UPDATOR | VARCHAR | 修改人 | |
| UPDATE_TIME | DATETIME | 修改时间 | |
| CHECKER | VARCHAR | 审核人 | |
| CHECK_TIME | DATETIME | 审核时间 | |
| CUSTOMER_ID | BIGINT | 经销商ID | |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | |
| NOTE | VARCHAR | 备注 | |
| SHORT_NAME | VARCHAR | 经销商简称 | |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | |
| BILLING_UNIT_ID | BIGINT | 开票单元ID | |
| BILLING_UNIT_CODE | VARCHAR | 开票单元编码 | |
| BILLING_UNIT_NAME | VARCHAR | 开票单元名称 | |
| TERMINAL_ID | BIGINT | 门店ID | |
| TERMINAL_CODE | VARCHAR | 门店编码 | |
| TERMINAL_NAME | VARCHAR | 门店名称 | |
| CITY_AREAID | BIGINT | 城市区域ID | |
| ADDR | VARCHAR | 地址 | |
| TERMINAL_AREA | DECIMAL | 门店面积 | |
| LAST_OUTLIMIT_BUD_TOTAL | DECIMAL | 上年额度外总额 | |
| LAST_OUTLIMIT_BUD_USED | DECIMAL | 上年已用额度 | |
| LAST_OUTLIMIT_BUD_SUR | DECIMAL | 上年剩余额度 | |
| OUTLIMIT_BUD_TOTAL | DECIMAL | 额度外总额(含税) | |
| NOTAX_OUTLIMIT_BUD_TOTAL | DECIMAL | 额度外总额(不含税) | |
| OUTLIMIT_BUD_ADJ | DECIMAL | 额度外调整额 | |
| OUTLIMIT_BUD_ADJ_NO | VARCHAR | 额度外调整单号 | |
| THIS_OUTLIMIT_BUD_USED_1 | DECIMAL | 当年1月已用 | |
| THIS_OUTLIMIT_BUD_USED_2 | DECIMAL | 当年2月已用 | |
| THIS_OUTLIMIT_BUD_USED_3 | DECIMAL | 当年3月已用 | |
| THIS_OUTLIMIT_BUD_USED_4 | DECIMAL | 当年4月已用 | |
| THIS_OUTLIMIT_BUD_USED_5 | DECIMAL | 当年5月已用 | |
| THIS_OUTLIMIT_BUD_USED_6 | DECIMAL | 当年6月已用 | |
| THIS_OUTLIMIT_BUD_USED_7 | DECIMAL | 当年7月已用 | |
| THIS_OUTLIMIT_BUD_USED_8 | DECIMAL | 当年8月已用 | |
| THIS_OUTLIMIT_BUD_USED_9 | DECIMAL | 当年9月已用 | |
| THIS_OUTLIMIT_BUD_USED_10 | DECIMAL | 当年10月已用 | |
| THIS_OUTLIMIT_BUD_USED_11 | DECIMAL | 当年11月已用 | |
| THIS_OUTLIMIT_BUD_USED_12 | DECIMAL | 当年12月已用 | |
| TOTAL_OUTLIMIT_BUD_USED | DECIMAL | 累计已用额度 | |
| OUTLIMIT_BUD_SUR | DECIMAL | 额度外剩余 | |
| IMPORT_FLAG | VARCHAR | 导入标识 | |
| CITY_AREANAME | VARCHAR | 城市区域名称 | |
| TAX_RATE | DECIMAL | 税率 | |
| NEXT_OUTLIMIT_BUD_USED_1 | DECIMAL | 下年1月已用 | |
| NEXT_OUTLIMIT_BUD_USED_2 | DECIMAL | 下年2月已用 | |
| NEXT_OUTLIMIT_BUD_USED_3 | DECIMAL | 下年3月已用 | |
| NEXT_OUTLIMIT_BUD_USED_4 | DECIMAL | 下年4月已用 | |
| NEXT_OUTLIMIT_BUD_USED_5 | DECIMAL | 下年5月已用 | |
| NEXT_OUTLIMIT_BUD_USED_6 | DECIMAL | 下年6月已用 | |
| NEXT_OUTLIMIT_BUD_USED_7 | DECIMAL | 下年7月已用 | |
| NEXT_OUTLIMIT_BUD_USED_8 | DECIMAL | 下年8月已用 | |
| NEXT_OUTLIMIT_BUD_USED_9 | DECIMAL | 下年9月已用 | |
| NEXT_OUTLIMIT_BUD_USED_10 | DECIMAL | 下年10月已用 | |
| NEXT_OUTLIMIT_BUD_USED_11 | DECIMAL | 下年11月已用 | |
| NEXT_OUTLIMIT_BUD_USED_12 | DECIMAL | 下年12月已用 | |
| NOW_TOTAL_OUTLIMIT_BUD_USED | DECIMAL | 下年累计已用 | |
| SUR_WRITEOFF_AMT | DECIMAL | 剩余核销金额 | |

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
            <td style="color:#DC2626;font-weight:600;">经销商不能为空</td>
            <td style="font-size:13px;">未选择经销商</td>
            <td style="font-size:13px;">选择经销商后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">门店不能为空</td>
            <td style="font-size:13px;">未选择门店</td>
            <td style="font-size:13px;">选择门店后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">预算年度不能为空</td>
            <td style="font-size:13px;">未填写预算年度</td>
            <td style="font-size:13px;">选择预算年度后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">数据重复</td>
            <td style="font-size:13px;">同一经销商+门店+年度已存在</td>
            <td style="font-size:13px;">检查是否已录入相同组合的数据</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>经销商不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>选择经销商后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>门店不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>选择门店后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>预算年度不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>选择预算年度后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>数据重复</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查是否已录入相同组合的数据</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">额度外限额如何被下游使用？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>门店验收报销时查询经销商+门店+年度对应的额度外限额，判断报销金额是否超额，超额时根据报销标准中的额度外超额处理策略决定是否允许。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">当月已用额度和下月已用额度如何更新？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>验收报销单审批通过后，根据报销月份自动累加到对应月份的已用额度字段。跨年报销累加到下年对应月份。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">该页面是hold低代码页面吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>是，该页面基于hold低代码平台配置，无独立Controller，通过MktOutlimitBudHeaderRepository访问数据，支持selectByBudYear按年度查询。
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

| 日期 | 版本 | 修改内容 | 修改人 |
|-----|------|---------|-------|
| 2026-07-31 | V1.0 | 初始生成知识库文档 | AI |
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
