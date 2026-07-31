<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="8" title="工程折扣延期" desc="工程管理-项目交付业务说明" />

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
折扣单(已审批，即将到期) → 新建折扣延期申请 → 选择原折扣单 → 生成延期数据
  ↓
设置折扣延期至日期(>=当前时间) → 修改延期后产品行(折后单价须>=原折后单价)
  ↓
保存 → 生成延期单号
  ↓
保存并提交 → 启动审批流程(DISCOUNT_ECN_CHANGE)
  ↓
审批通过 → 生成新折扣单(源折扣单标记sourceFromDelay=2) → 原折扣单失效
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程折扣单 | 数据依赖 | 延期基于已有折扣单 | 折扣单审批状态=APPROVED，即将到期 |
| 工程项目合同 | 数据依赖 | 折扣单关联合同 | 合同有效状态=2(已生效) |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程折扣单 | 生成新折扣单 | 审批通过后，基于延期申请生成新折扣单，新折扣单的sourceFromDelay=2，sourceDiscountApplyId指向原折扣单 |
| 工程折扣单 | 原折扣单失效 | 审批通过后，原折扣单的有效期更新为延期前的日期 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：与工程合同产品变更共用后端代码 {共用代码}">
<KbQuote>折扣延期和合同产品变更共用EPM_DISCOUNT_ECN表和Controller，通过ecnType区分</KbQuote>

**具体逻辑**：

- 1、折扣延期ecnType=2，合同产品变更ecnType=1
- 2、共用EpmDiscountEcnController，前端页面独立
</KbCard>

<KbCard num="2" title="重点逻辑2：折后单价校验 {价格控制}">
<KbQuote>延期后的折后单价不能低于原折扣单的折后单价，防止通过延期变相降价</KbQuote>

**具体逻辑**：

- 1、延期申请的折后单价须&gt;=原折扣单的折后单价
- 2、若低于原折后单价，阻断性报错
</KbCard>

<KbCard num="3" title="重点逻辑3：延期至日期校验 {时间控制}">
<KbQuote>延期日期必须在未来，确保延期有意义</KbQuote>

**具体逻辑**：

- 6、折扣延期至日期(discountValidDate)不能小于当前时间
- 2、查询折扣延期申请的提前允许期，校验延期时间范围
</KbCard>

<KbCard num="4" title="重点逻辑4：不推送ERP {ERP隔离}">
<KbQuote>折扣延期不推送ERP，仅在本系统内生效</KbQuote>

**具体逻辑**：

- 1、延期申请审批通过后，不调用ERP推送接口
- 2、仅在本系统内生成新折扣单和失效原折扣单
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：工程折扣延期列表页">
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
<td>延期单号</td>
<td>文本框</td>
<td>延期单编码</td>
<td>常显</td>
<td>1.系统自动生成</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.DISCOUNT_ECN_CODE</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批状态</td>
<td>常显</td>
<td>1.来源：值集HWKF.APPROVE_STATUS</td>
<td>值集HWKF.APPROVE_STATUS</td>
<td>EPM_DISCOUNT_ECN.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>源折扣单号</td>
<td>文本框</td>
<td>原折扣单号</td>
<td>常显</td>
<td>1.选择折扣单带出</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.SOURCE_DISCOUNT_APPLY_CODE</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>关联合同编码</td>
<td>常显</td>
<td>1.折扣单带出</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.CONTRACT_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>1.折扣单带出</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.CUSTOMER_NAME</td>
</tr>
<tr>
<td>折扣延期至</td>
<td>日期选择框</td>
<td>延期至日期</td>
<td>常显</td>
<td>1.用户设置</td>
<td>&gt;=当前时间</td>
<td>EPM_DISCOUNT_ECN.DISCOUNT_VALID_DATE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：折扣延期详情页">
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
<td>延期单号</td>
<td>文本框</td>
<td>延期单编码</td>
<td>常显</td>
<td>1.保存后自动生成</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.DISCOUNT_ECN_CODE</td>
</tr>
<tr>
<td>变更类型</td>
<td>下拉选择框</td>
<td>固定为2(折扣延期)</td>
<td>常显</td>
<td>1.默认值2</td>
<td>2</td>
<td>EPM_DISCOUNT_ECN.ECN_TYPE</td>
</tr>
<tr>
<td>源折扣单号</td>
<td>LOV</td>
<td>原折扣单</td>
<td>常显</td>
<td>1.选择折扣单LOV带出</td>
<td>LOV:折扣单</td>
<td>EPM_DISCOUNT_ECN.SOURCE_DISCOUNT_APPLY_CODE</td>
</tr>
<tr>
<td>折扣延期至</td>
<td>日期选择框</td>
<td>延期至日期</td>
<td>常显</td>
<td>1.必输；2.不能小于当前时间</td>
<td>&gt;=当前时间</td>
<td>EPM_DISCOUNT_ECN.DISCOUNT_VALID_DATE</td>
</tr>
<tr>
<td>申请说明</td>
<td>文本框</td>
<td>延期原因</td>
<td>常显</td>
<td>1.用户输入</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.ECN_REASON</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批状态</td>
<td>常显</td>
<td>1.来源：值集HWKF.APPROVE_STATUS</td>
<td>值集HWKF.APPROVE_STATUS</td>
<td>EPM_DISCOUNT_ECN.HZ_APPROVE_STATUS</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：延期产品行明细">
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
<td>产品编码</td>
<td>文本框</td>
<td>产品编码</td>
<td>常显</td>
<td>1.来源：原折扣单行</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.ITEM_CODE</td>
</tr>
<tr>
<td>产品名称</td>
<td>文本框</td>
<td>产品名称</td>
<td>常显</td>
<td>1.来源：原折扣单行</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.ITEM_NAME</td>
</tr>
<tr>
<td>折后单价</td>
<td>数字框</td>
<td>延期后折后单价</td>
<td>常显</td>
<td>1.可修改；2.须&gt;=原折扣单折后单价</td>
<td>&gt;=原折后单价</td>
<td>EPM_DISCOUNT_ECN_LINE.DISCOUNTED_PRICE</td>
</tr>
<tr>
<td>合同数量</td>
<td>数字框</td>
<td>合同数量</td>
<td>常显</td>
<td>1.来源：原折扣单行</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.CONTRACT_QTY</td>
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
<KbSubTitle>校验1：折后单价不低于原折扣单 —— 防止通过延期变相降价</KbSubTitle>

- 第1点：延期申请每行的折后单价须&gt;=原折扣单对应行的折后单价

<KbTip>阻断性报错</KbTip>

```sql
SELECT EL.ITEM_CODE, EL.DISCOUNTED_PRICE AS NEW_PRICE, AL.DISCOUNTED_PRICE AS OLD_PRICE FROM EPM_DISCOUNT_ECN_LINE EL JOIN EPM_DISCOUNT_APPLY_LINE AL ON EL.SOURCE_LINE_ID = AL.DISCOUNT_APPLY_LINE_ID WHERE EL.DISCOUNT_ECN_ID = #{discountEcnId} AND EL.DISCOUNTED_PRICE < AL.DISCOUNTED_PRICE
```

<KbSubTitle>校验2：延期至日期不小于当前时间 —— 确保延期有意义</KbSubTitle>

- 第1点：discountValidDate &gt;= 当前时间

<KbTip>阻断性报错</KbTip>

```sql
SELECT DISCOUNT_ECN_CODE, DISCOUNT_VALID_DATE FROM EPM_DISCOUNT_ECN WHERE DISCOUNT_ECN_ID = #{discountEcnId} AND DISCOUNT_VALID_DATE <5 CURRENT_TIMESTAMP
```

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
| APPROVED | 已审批 | 查看(新折扣单已生成) |
| REJECTED | 已驳回 | 保存、保存并提交、编辑 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_DISCOUNT_ECN（折扣变更/延期头）- 与合同产品变更共用">

> 与合同产品变更共用同一张表，通过ECN_TYPE=2区分折扣延期。完整字段参见"工程合同产品变更"文档

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ECN_TYPE | Long | 变更类型 | 变更类型 | 折扣延期固定为2 |
| DISCOUNT_VALID_DATE | LocalDateTime | 折扣延期至日期 | 折扣延期至 | 用户设置，>=当前时间 |

</KbCard>

<KbCard num="2" title="表2：EPM_DISCOUNT_ECN_LINE（折扣变更/延期行）- 与合同产品变更共用">

> 字段详见"工程合同产品变更"文档

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
            <td style="color:#DC2626;font-weight:600;">折后单价不能低于原折扣单</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">延期后折后单价低于原折扣单，修改折后单价</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">延期至日期不能小于当前时间</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">延期日期在过去，修改延期日期</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>折后单价不能低于原折扣单</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>延期后折后单价低于原折扣单，修改折后单价</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>延期至日期不能小于当前时间</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>延期日期在过去，修改延期日期</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">延期审批通过后新折扣单未生成</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>审批回调wfComplete未正确触发；排查SQL：`SELECT DE.DISCOUNT_ECN_CODE, DE.HZ_APPROVE_STATUS FROM EPM_DISCOUNT_ECN DE WHERE DE.DISCOUNT_ECN_ID = #{discountEcnId}`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查流程实例状态，手动触发回调
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">原折扣单未失效</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>延期审批通过后原折扣单的有效期未更新；排查SQL：`SELECT DA.DISCOUNT_APPLY_CODE, DA.DISCOUNT_VALID_DATE FROM EPM_DISCOUNT_APPLY DA JOIN EPM_DISCOUNT_ECN DE ON DE.SOURCE_DISCOUNT_APPLY_ID = DA.DISCOUNT_APPLY_ID WHERE DE.DISCOUNT_ECN_ID = #{discountEcnId}`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查审批回调逻辑，确认原折扣单有效期是否已更新
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
