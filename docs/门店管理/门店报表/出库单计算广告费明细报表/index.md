<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="出库单计算广告费明细报表" desc="出库单计算广告费明细报表，按出库单维度计算广告费用" />

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
  ├─ 输入查询条件（经销商/出库单号/是否计广告费/发货日期/签收日期）
  │
  ├─ 点击查询 → POST /v1/{organizationId}/rebate-details/mktOutBillHead/search
  │
  ├─ 查看出库单广告费计算明细
  │
  └─ 可导出 → GET /v1/{organizationId}/rebate-details/mktOutBillHead/export
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游数据源 | 说明 | 关联方式 |
|-----------|------|---------|
| INV_OUT_BILL_INTF_HEAD | 出库单接口头表 | 出库单基本信息 |
| INV_OUT_BILL_INTF_CONFIRM | 出库单接口确认行 | 出库行明细及广告费标记 |
| LNK_OB_ORDER_RECEIVABLE | 订单应收关联 | 签收日期(gl_date) |
| CUSTOMER | 客户/经销商 | 经销商信息 |
| DIVISION_BASE_SET | 事业部基础设置 | 事业部和组织ID |
| ITEM | 物料主表 | 产品型号 |
| ITEM_ORG | 物料组织 | 产品型号翻译 |

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
<KbCard num="1" title="2.1 出库单广告费计算明细查询">
<KbQuote>展示出库单中每个产品的广告费计算明细，包括是否计广告费、折后单价、开票金额、广告费计提比例、最终广告金额等，用于核对广告费计算的正确性。</KbQuote>

**具体逻辑**：

- 1、以出库单接口头表(INV_OUT_BILL_INTF_HEAD)为主表
- 2、INNER JOIN确认行(INV_OUT_BILL_INTF_CONFIRM)获取行级产品明细
- 3、INNER JOIN订单应收(LNK_OB_ORDER_RECEIVABLE)获取签收日期
- 4、排除特殊产品编码：CUX_OM_CASH_POOL(资金池)、CUX_OM_PRICE_RAISE(提价)
</KbCard>

<KbCard num="2" title="2.2 广告费计算逻辑">
**具体逻辑**：

- 1、**开票金额** = ROUND(折后单价 × 实发数量, 2)
- 2、**实际结算金额** = 开票金额 + 扣除广告费金额 + 不计广告费金额
- 3、**广告金额** = CASE advertising_flag WHEN 'Y' THEN (开票金额 + 扣除广告费金额) × 广告费计提比例 ELSE 0 END
- 4、其中广告费计提比例(advertising_fee)为百分比，如0.05表示5%
</KbCard>

<KbCard num="3" title="2.3 查询条件支持">
**具体逻辑**：

- 1、经销商名称：模糊匹配(LIKE %name%)
- 2、经销商编码：精确匹配
- 3、ERP出库单号：模糊匹配(LIKE %number%)
- 4、是否计广告费：精确匹配(Y/N)
- 5、发货日期：BETWEEN范围查询
- 6、确认签收日期：BETWEEN范围查询
- 7、--
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
| 导出 | Excel导出出库单广告费明细 | 始终显示 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

无。纯查询报表，无状态流转。

---

</KbCard>
<KbCard num="1" title="INV_OUT_BILL_INTF_HEAD（出库单接口头表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| delivery_id | BIGINT | 出库单ID | 主键 |
| delivery_number | VARCHAR | ERP出库单号 | - |
| delivery_date | TIMESTAMP | 发货日期 | - |
| service_number | VARCHAR | 经销商编码 | - |
| service_name | VARCHAR | 经销商名称 | - |
| sell_channel | VARCHAR | 销售渠道 | - |
| advertising_fee | DECIMAL | 广告费计提比例 | 百分比，如0.05 |
| delivery_ou_name | VARCHAR | 交易公司名称 | - |
| invoice_party | VARCHAR | 法人客户名称 | - |
| invoice_party_number | VARCHAR | 法人客户编码 | - |
| business_division | VARCHAR | 事业部名称 | - |

</KbCard>

<KbCard num="2" title="INV_OUT_BILL_INTF_CONFIRM（出库单接口确认行表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| delivery_id | BIGINT | 出库单头ID | 关联头表 |
| delivery_line_id | BIGINT | 出库行ID | - |
| item_number | VARCHAR | 产品编码 | - |
| product_name | VARCHAR | 产品名称 | - |
| advertising_flag | VARCHAR | 是否计广告费 | Y/N |
| sales_uom_code | VARCHAR | 单位 | - |
| sales_real_quantity | DECIMAL | 实发数量 | - |
| dealer_parice | DECIMAL | 折后单价 | - |
| deduct_cashpool_amount | DECIMAL | 扣除广告费金额 | - |
| exclude_cashpool_amount | DECIMAL | 不计广告费金额 | - |

</KbCard>

<KbCard num="3" title="LNK_OB_ORDER_RECEIVABLE（订单应收关联表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| delivery_line_id | BIGINT | 出库行ID | 关联确认行 |
| gl_date | TIMESTAMP | 确认签收日期 | - |

</KbCard>

<KbCard num="4" title="DIVISION_BASE_SET（事业部基础设置表）">

| 列名 | 类型 | 业务释义 | 备注 |
|------|------|---------|------|
| division_id | BIGINT | 事业部ID | - |
| division_name | VARCHAR | 事业部名称 | - |
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
            <td style="font-size:13px;">日期范围过窄或经销商无出库记录</td>
            <td style="font-size:13px;">放宽查询条件重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">广告金额全为0</td>
            <td style="font-size:13px;">advertising_flag为N或advertising_fee为0</td>
            <td style="font-size:13px;">检查出库单广告费标记和计提比例配置</td>
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
    <h4><span style="color:#7C3AED;">报错：</span>广告金额全为0</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查出库单广告费标记和计提比例配置</div>
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
| 2026-01-15 | v1.0.0 | 初始创建出库单计算广告费明细报表 | - |
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
