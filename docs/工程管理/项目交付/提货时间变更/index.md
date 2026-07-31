<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="10" title="提货时间变更" desc="工程管理-项目交付业务说明" />

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
紧急要货单(已提交) → 选择要货行 → 修改提货时间 → 提交变更
  → 调用ERP接口(EbsAction-PickupDateChangeList) → ERP返回有效期
  → 更新紧急要货行提货时间和有效期 → 更新库存保留有效期 → 记录变更日志
  → ERP失败 → 返回错误信息
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 紧急要货单 | 数据依赖 | 提货时间变更基于紧急要货单行，从中获取要货行ID、原提货时间、CRM订单信息 | 紧急要货单已提交且有预占数量 |
| ERP系统(EBS) | 数据依赖 | 调用ERP接口执行提货时间变更，ERP返回新的有效期 | ERP接口可用 |
| 系统参数配置 | 配置依赖 | 系统参数Validity_of_stock_retention(库存保留有效期) | 参数已配置 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 紧急要货行 | 提货时间与有效期更新 | ERP成功后，更新EPM_URGENT_ORDER_LINE的pickUpDate(提货时间)和validDate(有效期至) |
| 库存保留 | 库存保留有效期更新 | ERP成功后，批量更新EPM_URGENT_ORDER_LINE_STOCK中releasedType为空的记录的validDate |
| 变更日志 | 写入变更记录 | ERP成功后，插入PICKUP_DATE_CHANGE_LIST记录，包含原/新提货时间、保留数量等 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：预占数量校验 核心逻辑">
<KbQuote>只有存在预占数量的行才需要变更提货时间，已全部保留成功的行无需变更</KbQuote>

**具体逻辑**：

- 1、提交时检查每行的preReservedQty(预占数量)，如果≤0则标记为"不处理"
- 2、不处理的行设置processMessage="数量已全部保留成功，无需进行提货时间变更，请知悉"
- 3、不处理的行不调用ERP接口，直接跳过
</KbCard>

<KbCard num="2" title="重点逻辑2：推送ERP执行变更 核心逻辑">
<KbQuote>提货时间变更需同步到ERP系统，ERP计算新的库存保留有效期并返回</KbQuote>

**具体逻辑**：

- 1、组装PickupDatePushVO，包含CRM头ID、CRM行ID、新提货日期、审批日期、有效期参数
- 2、调用PickupDateChangeIntf推送ERP(EbsAction-PickupDateChangeList)
- 3、ERP返回PickupDateChangeErpVO，包含success标识、message、effectiveDateTo(新有效期)
- 4、ERP成功时更新紧急要货行和库存记录；失败时仅设置错误状态和消息，不阻断其他行
</KbCard>

<KbCard num="3" title="重点逻辑3：变更日志记录 审计逻辑">
<KbQuote>每次提货时间变更需记录变更前后信息，用于追溯和审计</KbQuote>

**具体逻辑**：

- 1、ERP成功后插入PICKUP_DATE_CHANGE_LIST记录
- 2、记录内容包括：原提货时间、新提货时间、有效期至、保留数量、预占数量、释放数量
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：hlod低代码页面">
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
<td>紧急要货行ID</td>
<td>-</td>
<td>关联紧急要货行</td>
<td>常显</td>
<td>弹窗选择带入</td>
<td>-</td>
<td>EPM_URGENT_ORDER_LINE.URGENT_ORDER_LINE_ID</td>
</tr>
<tr>
<td>要货单号</td>
<td>文本框</td>
<td>关联要货单号</td>
<td>常显</td>
<td>来源紧急要货单头</td>
<td>-</td>
<td>EPM_URGENT_ORDER.SA_SALEBILLNO</td>
</tr>
<tr>
<td>原提货日期</td>
<td>日期选择器</td>
<td>变更前的提货时间</td>
<td>常显</td>
<td>来源紧急要货行；不可编辑</td>
<td>-</td>
<td>EPM_URGENT_ORDER_LINE.PICK_UP_DATE</td>
</tr>
<tr>
<td>新提货日期</td>
<td>日期选择器</td>
<td>变更后的提货时间</td>
<td>常显</td>
<td>必填；用户手动输入</td>
<td>不早于当前时间</td>
<td>-</td>
</tr>
<tr>
<td>有效期至</td>
<td>日期选择器</td>
<td>库存保留有效期</td>
<td>常显</td>
<td>ERP返回后更新</td>
<td>-</td>
<td>EPM_URGENT_ORDER_LINE.VALID_DATE</td>
</tr>
<tr>
<td>保留数量</td>
<td>数值框</td>
<td>当时保留数量合计</td>
<td>常显</td>
<td>来源紧急要货行</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>预占数量</td>
<td>数值框</td>
<td>当时预占数量合计</td>
<td>常显</td>
<td>来源紧急要货行；≤0时不允许变更</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>释放数量</td>
<td>数值框</td>
<td>当时释放数量合计</td>
<td>常显</td>
<td>来源紧急要货行</td>
<td>-</td>
<td>-</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：要货行选择弹窗(verifyData) <KbBadge type="purple">多选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| saOutBillHeadId | 要货订单头ID | 查询该订单下的要货行 | 1001 |
| organizationId | 组织ID | 租户组织 | 1 |

**数据范围**

```sql
SA_OUT_BILL_LINE中关联的要货行，含紧急要货行数据
```

</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 提交变更 | 执行提货时间变更并推送ERP | 列表页 | 选中行且有新提货日期 | 调用pushChangeDate接口，推送ERP并更新本地数据 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：紧急要货行数据必须存在 —— 确保变更操作有有效数据</KbSubTitle>

- 第1点：根据urgentOrderLineId列表查询EPM_URGENT_ORDER_LINE
- 第2点：如果查询为空，抛出异常"未找到对应的紧急要货行数据"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EPM_URGENT_ORDER_LINE 
    WHERE URGENT_ORDER_LINE_ID IN (:urgentOrderLineIds)
```

<KbSubTitle>校验2：要货行提货时间数据必须存在 —— 确保CRM订单信息可查</KbSubTitle>

- 第1点：queryPushData查询要货行对应的CRM订单信息
- 第2点：如果查询为空，抛出异常"未找到对应的要货行提货时间数据"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM SA_OUT_BILL_LINE l
    INNER JOIN EPM_URGENT_ORDER_LINE uol ON uol.SA_OUT_BILL_LINE_ID = l.SA_OUT_BILL_LINE_ID
    WHERE uol.URGENT_ORDER_LINE_ID IN (:urgentOrderLineIds)
    AND l.CRM_LINE_ID IS NOT NULL
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：预占数量必须大于0 —— 仅预占中的行需要变更</KbSubTitle>

- 第1点：preReservedQty≤0的行标记为"不处理"，不调用ERP
- 第2点：提示"数量已全部保留成功，无需进行提货时间变更，请知悉"

<KbTip>非阻断性提示(标记不处理，不阻断其他行)</KbTip>

```sql
SELECT URGENT_ORDER_LINE_ID, PRE_RESERVED_QTY FROM EPM_URGENT_ORDER_LINE
    WHERE URGENT_ORDER_LINE_ID IN (:ids)
```

</KbCard>
<KbCard title="状态机">
### 状态机

> 本功能为即时操作型业务，不经过工作流审批，无状态机。

---

</KbCard>
<KbCard num="1" title="表1：PICKUP_DATE_CHANGE_LIST（提货时间变更记录表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| LIST_ID | BIGINT | 记录ID(主键) | - | 自增主键 |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 取紧急要货行的entorgid |
| URGENT_ORDER_LINE_ID | BIGINT | 紧急要货单行ID | - | 关联EPM_URGENT_ORDER_LINE |
| SA_OUT_BILL_LINE_ID | BIGINT | 要货订单行ID | - | 关联SA_OUT_BILL_LINE |
| EXT_SA_OUT_BILL_LINE_ID | VARCHAR | 要货订单外部系统行ID | - | 来源紧急要货行 |
| SA_SALEBILLNO | VARCHAR | 要货单号 | 要货单号 | 来源紧急要货单头 |
| OLD_PICK_UP_DATE | DATETIME | 原提货日期 | 原提货日期 | 变更前的pickUpDate |
| NEW_PICK_UP_DATE | DATETIME | 新提货日期 | 新提货日期 | 用户输入的新提货时间 |
| VALID_DATE | DATETIME | 有效期至 | 有效期至 | ERP返回的有效期 |
| RESERVED_QTY | BIGINT | 当时保留数量合计 | 保留数量 | 变更时的快照 |
| PRE_RESERVED_QTY | BIGINT | 当时预占数量合计 | 预占数量 | 变更时的快照 |
| RELEASED_QTY | BIGINT | 当时释放数量合计 | 释放数量 | 变更时的快照 |
| CREATOR | VARCHAR | 创建者 | - | 系统自动记录 |
| CREATETIME | DATE | 创建日期 | - | 系统自动记录 |
| REMARK | VARCHAR | 备注 | - | - |
| CREATION_DATE | DATETIME | 创建时间 | - | 框架自动记录 |
| CREATED_BY | BIGINT | 创建人ID | - | 框架自动记录 |
| LAST_UPDATED_BY | BIGINT | 最后修改人ID | - | 框架自动记录 |
| LAST_UPDATE_DATE | DATETIME | 最后修改时间 | - | 框架自动记录 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_URGENT_ORDER_LINE（紧急要货单行表，上游关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_LINE_ID | BIGINT | 紧急要货行ID(主键) | - | - |
| URGENT_ORDER_ID | BIGINT | 紧急要货头ID | - | 关联紧急要货单头 |
| SA_OUT_BILL_LINE_ID | BIGINT | 要货订单行ID | - | 关联要货订单行 |
| PICK_UP_DATE | DATETIME | 提货时间 | 原提货日期 | ERP成功后更新为新提货时间 |
| VALID_DATE | DATETIME | 有效期至 | 有效期至 | ERP成功后更新为ERP返回的有效期 |
| PRE_RESERVED_QTY | DECIMAL | 预占数量 | 预占数量 | ≤0时不允许变更 |

</KbCard>

<KbCard num="3" title="表3：EPM_URGENT_ORDER_LINE_STOCK（紧急要货库存保留表，下游影响表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_LINE_ID | BIGINT | 紧急要货行ID | - | 关联紧急要货行 |
| VALID_DATE | DATETIME | 有效期 | - | ERP成功后批量更新为ERP返回的有效期 |
| RELEASED_TYPE | VARCHAR | 释放类型 | - | releasedType为空的记录才更新 |

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
            <td style="color:#DC2626;font-weight:600;">未找到对应的紧急要货行数据</td>
            <td style="font-size:13px;">提交变更</td>
            <td style="font-size:13px;">传入的urgentOrderLineId在EPM_URGENT_ORDER_LINE中不存在</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未找到对应的要货行提货时间数据</td>
            <td style="font-size:13px;">提交变更</td>
            <td style="font-size:13px;">queryPushData查询无结果，可能CRM行ID为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">数量已全部保留成功，无需进行提货时间变更，请知悉</td>
            <td style="font-size:13px;">提交变更</td>
            <td style="font-size:13px;">preReservedQty≤0，该行已全部保留成功</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到对应的紧急要货行数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>传入的urgentOrderLineId在EPM_URGENT_ORDER_LINE中不存在</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到对应的要货行提货时间数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>queryPushData查询无结果，可能CRM行ID为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>数量已全部保留成功，无需进行提货时间变更，请知悉</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>preReservedQty≤0，该行已全部保留成功</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">提货时间变更后有效期未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>ERP接口调用失败(success=false)，本地数据未更新<br>
      <strong style="color:#7C3AED;">处理：</strong>检查ERP接口状态，确认ERP返回的success标识
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">部分行变更成功部分失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>- 解决思路：查看processMessage了解失败原因，修正后重新提交失败行<br>
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
| 2025-10-16 | - | jiaqiang.fu01 | 初始创建提货时间变更功能 |

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
