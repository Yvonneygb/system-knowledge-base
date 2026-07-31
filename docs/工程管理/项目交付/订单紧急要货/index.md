<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="订单紧急要货" desc="工程管理-项目交付业务说明" />

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
工程要货需求 → 新建紧急要货单 → 选择合同/折扣单/产品
  ↓
填写要货行明细(产品/数量/提货时间) + 库存预留
  ↓
保存 → 生成紧急要货单号
  ↓
保存并提交 → 启动审批流程(EPM_URGENT_ORDER)
  ↓
审批通过 → 自动预留库存 → 推送ERP创建出库单
审批驳回 → 状态回退
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程项目合同 | 数据依赖 | 紧急要货关联合同 | 合同有效状态=2(已生效) |
| 工程折扣单 | 数据依赖 | 紧急要货关联折扣单，获取折扣率和产品 | 折扣单审批状态=APPROVED |
| 产品主数据 | 数据依赖 | 要货行引用产品信息 | 产品已上架 |
| 库存服务 | 数据依赖 | 审批通过后预留库存 | 库存充足 |
| ERP系统 | 配置依赖 | 审批通过后推送ERP创建出库单 | ERP接口可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 库存管理 | 自动预留库存 | 审批通过后自动预留库存，锁定库存数量 |
| ERP系统 | 推送创建出库单 | 审批通过后推送ERP创建出库单 |
| 工程折扣单 | 可下单数量回写 | 要货行关联折扣单行时，回写折扣单行的已下单数量和可下单数量 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：审批通过后自动预留库存 {级联生效}">
<KbQuote>紧急要货审批通过后，自动预留库存确保货物可出</KbQuote>

**具体逻辑**：

- 1、wfComplete回调中，审批通过时调用库存预留接口
- 2、预留数量=要货行数量
</KbCard>

<KbCard num="2" title="重点逻辑2：ERP推送创建出库单 {外部系统集成}">
<KbQuote>审批通过后推送ERP创建出库单，实现库存出库</KbQuote>

**具体逻辑**：

- 1、审批通过后构造推送数据，调用ERP接口创建出库单
- 2、ERP返回结果后更新要货单状态
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：订单紧急要货(hlod低代码页面)">
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
<td>紧急要货单号</td>
<td>文本框</td>
<td>紧急要货单编码</td>
<td>常显</td>
<td>1.系统自动生成</td>
<td>-</td>
<td>EPM_URGENT_ORDER.URGENT_ORDER_CODE</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批状态</td>
<td>常显</td>
<td>1.来源：值集HWKF.APPROVE_STATUS</td>
<td>值集HWKF.APPROVE_STATUS</td>
<td>EPM_URGENT_ORDER.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>关联合同编码</td>
<td>常显</td>
<td>1.选择合同带出</td>
<td>-</td>
<td>EPM_URGENT_ORDER.CONTRACT_CODE</td>
</tr>
<tr>
<td>折扣单号</td>
<td>文本框</td>
<td>关联折扣单编码</td>
<td>常显</td>
<td>1.选择折扣单带出</td>
<td>-</td>
<td>EPM_URGENT_ORDER.DISCOUNT_APPLY_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>1.关联合同带出</td>
<td>-</td>
<td>EPM_URGENT_ORDER.CUSTOMER_NAME</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框</td>
<td>关联项目编码</td>
<td>常显</td>
<td>1.关联合同带出</td>
<td>-</td>
<td>EPM_URGENT_ORDER.PROJECT_CODE</td>
</tr>
</tbody></table></div>
</KbCard>

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
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建 NEW] ──保存并提交──→ [审批中 RUN] ──审批通过──→ [已审批 APPROVED]
                                │
                                └──审批驳回──→ [已驳回 REJECTED]
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、保存并提交、编辑、删除 |
| RUN | 审批中 | 等待审批结果 |
| APPROVED | 已审批 | 查看(已预留库存、已推送ERP) |
| REJECTED | 已驳回 | 保存、保存并提交、编辑 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_URGENT_ORDER（紧急要货头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_ID | Long | 紧急要货ID(主键) | - | 自增主键 |
| URGENT_ORDER_CODE | String | 紧急要货单号 | 紧急要货单号 | 编码规则自动生成 |
| CONTRACT_ID | Long | 合同ID | - | 关联合同 |
| DISCOUNT_APPLY_ID | Long | 折扣单ID | - | 关联折扣单 |
| CUSTOMER_ID | Long | 客户ID | - | 关联合同客户 |
| PROJECT_ID | Long | 项目ID | - | 关联合同项目 |
| HZ_APPROVE_STATUS | String | 审批状态 | 审核状态 | NEW/RUN/APPROVED/REJECTED |
| HZ_INSTANCE_ID | Long | 流程实例ID | - | 流程启动后写入 |

</KbCard>

<KbCard num="2" title="表2：EPM_URGENT_ORDER_LINE（紧急要货行）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_LINE_ID | Long | 要货行ID(主键) | - | 自增主键 |
| URGENT_ORDER_ID | Long | 要货头ID(外键) | - | 关联头表 |
| ITEM_ID | Long | 产品ID | - | 关联产品 |
| ITEM_CODE | String | 产品编码 | 产品编码 | 产品带出 |
| ORDER_QTY | BigDecimal | 要货数量 | 要货数量 | 用户输入 |
| DISCOUNT_APPLY_LINE_ID | Long | 折扣单行ID | - | 关联折扣单行 |

</KbCard>

<KbCard num="3" title="表3：EPM_URGENT_ORDER_LINE_STOCK（要货行库存预留）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_LINE_STOCK_ID | Long | 库存预留ID(主键) | - | 自增主键 |
| URGENT_ORDER_LINE_ID | Long | 要货行ID(外键) | - | 关联要货行 |
| RESERVED_QTY | BigDecimal | 预留数量 | - | 审批通过后自动预留 |

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
            <td style="color:#DC2626;font-weight:600;">流程启动校验失败</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">workFlowStartVolidate校验不通过</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程启动校验失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>workFlowStartVolidate校验不通过</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">审批通过后库存预留失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>库存不足或库存服务不可用；排查SQL：`SELECT UOL.ITEM_CODE, UOL.ORDER_QTY FROM EPM_URGENT_ORDER_LINE UOL WHERE UOL.URGENT_ORDER_ID = #{urgentOrderId}`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查库存服务状态，确认库存数量是否充足
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
