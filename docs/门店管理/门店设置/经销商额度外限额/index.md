<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="经销商额度外限额" desc="门店管理-门店设置业务说明" />

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
</KbCard>

<KbCard num="2" title="上游依赖">
</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 本功能为纯设置/档案管理，不向任何下游系统/模块写入数据 |

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

</KbCard>

<KbCard num="2" title="2.2 额度使用跟踪">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 上年结转">
**具体逻辑**：

</KbCard>

<KbCard num="4" title="2.4 额度调整">
**具体逻辑**：

</KbCard>

<KbCard num="5" title="2.5 批量导入">
**具体逻辑**：

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
</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
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
