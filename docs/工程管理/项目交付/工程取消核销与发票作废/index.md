<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="工程取消核销与发票作废" desc="工程管理-项目交付业务说明" />

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
工程真实性核销详情页 → 选择已核销的发票/核销明细 → 点击"取消核销"或"作废发票"
  ↓
选择取消类型(取消发票/取消发票明细/取消出库单行核销/取消核销明细/作废发票)
  ↓
执行取消 → 尾差处理 → 回写出库行核销数量 → 更新核销状态
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程真实性核销 | 数据依赖 | 取消核销/作废发票是真实性核销内的操作 | 真实性核销单已存在且含核销数据 |
| 出库确认行 | 数据依赖 | 取消核销时回写出库行核销数量 | 出库行存在核销记录 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 出库确认 | 出库行核销回写 | 取消核销后，回写出库行的核销数量，减少已核销数量 |
| 发票管理 | 发票状态更新为作废 | 作废发票后，发票状态更新为作废 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：5种取消类型 {操作类型区分}">
<KbQuote>支持不同粒度的取消操作，满足不同业务场景</KbQuote>

**具体逻辑**：

- 1、取消发票(invoice) - 取消整张发票的核销
- 2、取消发票明细(invoiceDetail) - 取消发票中某行明细的核销
- 3、取消出库单行核销(invLine) - 取消出库单行的核销
- 4、取消核销明细(veriferDetail) - 取消核销明细记录
- 5、作废发票(obsInvoice) - 作废整张发票
</KbCard>

<KbCard num="2" title="重点逻辑2：尾差处理 {精度控制}">
<KbQuote>取消核销时处理金额尾差，确保数据一致性</KbQuote>

**具体逻辑**：

- 1、取消核销时进行尾差计算和处理
- 2、确保回写后的核销数量和金额与实际一致
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：工程真实性核销详情页-取消核销与发票作废">
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
<td>取消类型</td>
<td>下拉选择框</td>
<td>取消操作的类型</td>
<td>执行取消操作时</td>
<td>1.用户选择</td>
<td>invoice/invoiceDetail/invLine/veriferDetail/obsInvoice</td>
<td></td>
</tr>
<tr>
<td>核销明细ID</td>
<td>文本框</td>
<td>要取消的核销明细ID</td>
<td>常显</td>
<td>1.从核销明细列表选择</td>
<td>-</td>
<td></td>
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
| 取消核销 | 取消核销记录 | 真实性核销详情页 | 核销单存在已核销数据 | 调用clVerifyObsInvo接口，回写出库行核销数量 |
| 作废发票 | 作废发票 |>作废发票 | 真实性核销详情页 | 发票存在且可作废 | 调用clVerifyObsInvo接口(obsInvoice类型)，更新发票状态为作废 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：核销数据存在性校验 —— 确保要取消的核销数据存在</KbSubTitle>

- 第1点：取消前校验核销明细ID是否存在

<KbTip>阻断性报错</KbTip>

```sql
SELECT COUNT(1) FROM EPM_VERIFER_INVOICE_DETAILS WHERE VERIFER_INVOICE_DETAILS$DETAILS_ID = #{veriferInvoiceDetailsId}
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
无独立状态机，操作为即时生效，不涉及审批流程
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| - | 即时操作 | 取消核销、作废发票 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_VERIFER_INVOICE_DETAILS（核销发票明细）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| VERIFER_INVOICE_DETAILS_ID | Long | 核销明细ID(主键) | - | 自增主键 |
| INVOICE_TRUTH_HEADER_ID | Long | 真实性核销头ID(外键) | - | 关联核销头 |
| INVOICE_TRUTH'LINE_ID | Long | 真实性核销行ID(外键) | - | 关联核销行 |
| VERIFY_QTY | BigDecimal | 核销数量 | - | 取消核销时回写减少 |

</KbCard>

<KbCard num="2" title="表2：EPM_INFVOICE_TRUTH_HEADER（真实性核销头）- 相关字段">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_TRUTH_ID | Long | 核销头ID(主键) | - | 关<关联字段 |
| HZ_APPROVE_STATUS | String | 审批状态 | - | 核销单审批状态 |

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
            <td style="color:#DC2626;font-weight:600;">核销数据不存在</td>
            <td style="font-size:13px;">取消核销</td>
            <td style="font-size:13px;">核销明细已被删除，&amp;刷新页面</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>核销数据不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>核销明细已被删除，&amp;刷新页面</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">取消核销后出库行核销数量未回写</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>取消核销逻辑执行异常；排查SQL：`SELECT INVOICE_TRUTH_HEADER_ID, VERIFY_QTY FROM EPM_VERIFER_INVOICE_DETAILS WHERE INVOICE_TRUTH_HEADER_ID = #{invoiceTruthId}`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查clVerifyObsInvo接口执行日志，确认回写SQL是否执行成功
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
| - | - | - | 暂无2026年提交记录 |
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
