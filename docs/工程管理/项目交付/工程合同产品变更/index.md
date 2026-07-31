<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="工程合同产品变更" desc="工程管理-项目交付业务说明" />

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
折扣单(已审批) → 新建合同产品变更单 → 选择折扣单 → 生成变更数据
  ↓
展示变更前/变更后产品行对比 → 修改变更后产品行(价格/数量/折扣率)
  ↓
保存 → 生成变更单号
  ↓
保存并提交 → 启动审批流程(DISCOUNT_ECN_CHANGE)
  ↓
审批通过 → 同步更新折扣单主数据(产品行/价格/折扣率/金额)
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程折扣单 | 数据依赖 | 变更基于已有折扣单 | 折扣单审批状态=APPROVED |
| 工程项目合同 | 数据依赖 | 折扣单关联合同 | 合同有效状态=2(已生效) |
| 产品主数据 | 数据依赖 | 变更行引用产品信息 | 产品已上架 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程折扣单 | 折扣单行数据更新 | 审批通过后，同步更新原折扣单的产品行、价格、折扣率、金额等数据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：与工程折扣延期共用后端代码 {共用代码}">
<KbQuote>合同产品变更和折扣延期共用EPM_DISCOUNT_ECN表和Controller，通过ecnType区分</KbQuote>

**具体逻辑**：

- 1、合同产品变更ecnType=1，折扣延期ecnType=2
- 2、共用EpmDiscountEcnController和ServiceImpl
</KbCard>

<KbCard num="2" title="重点逻辑2：变更前后对比 {数据对比}">
<KbQuote>展示变更前后的产品行数据对比，便于审批人员判断</KbQuote>

**具体逻辑**：

- 1、前端使用LineBeforeDS(变更前)和LineDS(变更后)两个DataSet
- 2、变更前行数据从原折扣单获取，变更后行数据可修改
</KbCard>

<KbCard num="3" title="重点逻辑3：实时获取产品价格 {价格计算}">
<KbQuote>变更时实时获取最新产品价格，确保价格准确</KbQuote>

**具体逻辑**：

- 1、调用generateDiscountDatas接口，实时获取产品价格
- 2、重新计算相关金额(calculationamount)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：合同产品变更列表页">
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
<td>变更单号</td>
<td>文本框</td>
<td>变更单编码</td>
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
<td>折扣单号</td>
<td>文本框</td>
<td>源折扣单号</td>
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
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：合同产品变更详情页">
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
<td>变更单号</td>
<td>文本框</td>
<td>变更单编码</td>
<td>常显</td>
<td>1.保存后自动生成</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN.DISCOUNT_ECN_CODE</td>
</tr>
<tr>
<td>变更类型</td>
<td>下拉选择框</td>
<td>固定为1(合同产品变更)</td>
<td>常显</td>
<td>1.默认值1</td>
<td>1</td>
<td>EPM_DISCOUNT_ECN.ECN_TYPE</td>
</tr>
<tr>
<td>源折扣单号</td>
<td>LOV</td>
<td>源折扣单</td>
<td>常显</td>
<td>1.选择折扣单LOV带出</td>
<td>LOV:折扣单</td>
<td>EPM_DISCOUNT_ECN.SOURCE_DISCOUNT_APPLY_CODE</td>
</tr>
<tr>
<td>申请说明</td>
<td>文本框</td>
<td>变更原因</td>
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

<KbCard title="界面模块3：变更前后产品行对比">
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
<td>1.来源：折扣单行</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.ITEM_CODE</td>
</tr>
<tr>
<td>产品名称</td>
<td>文本框</td>
<td>产品名称</td>
<td>常显</td>
<td>1.来源：折扣单行</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.ITEM_NAME</td>
</tr>
<tr>
<td>标准单价</td>
<td>数字框</td>
<td>标准单价</td>
<td>常显</td>
<td>1.变更后可修改</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.STANDARD_PRICE</td>
</tr>
<tr>
<td>出厂折扣率</td>
<td>数字框</td>
<td>出厂折扣率</td>
<td>常显</td>
<td>1.变更后可修改</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.BASE_DISCOUNT_RATE</td>
</tr>
<tr>
<td>审批折扣率</td>
<td>数字框</td>
<td>审批折扣率</td>
<td>常显</td>
<td>1.变更后可修改</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.EXTRA_DISCOUNT_RATE</td>
</tr>
<tr>
<td>应用折扣率</td>
<td>数字框</td>
<td>应用折扣率</td>
<td>常显</td>
<td>1.自动计算=出厂×审批</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.DISCOUNT_RATE</td>
</tr>
<tr>
<td>折后单价</td>
<td>数字框</td>
<td>折后单价</td>
<td>常显</td>
<td>1.自动计算=标准单价×应用折扣率</td>
<td>-</td>
<td>EPM_DISCOUNT_ECN_LINE.DISCOUNTED_PRICE</td>
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
| APPROVED | 已审批 | 查看(折扣单已更新) |
| REJECTED | 已驳回 | 保存、保存并提交、编辑 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_DISCOUNT_ECN（折扣变更/延期头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_ECN_ID | Long | 变更ID(主键) | - | 自增主键 |
| DISCOUNT_ECN_CODE | String | 变更单号 | 变更单号 | 编码规则自动生成 |
| ECN_TYPE | Long | 变更类型 | 变更类型 | 1=合同产品变更，2=折扣延期 |
| SOURCE_DISCOUNT_APPLY_ID | Long | 源折扣单ID | - | 关联原折扣单 |
| SOURCE_DISCOUNT_APPLY_CODE | String | 源折扣单号 | 源折扣单号 | 关联原折扣单 |
| CONTRACT_ID | Long | 合同ID | - | 折扣单带出 |
| CUSTOMER_ID | Long | 客户ID | - | 折扣单带出 |
| PROJECT_ID | Long | 项目ID | - | 折扣单带出 |
| ECN_REASON | String | 申请说明 | 申请说明 | 用户输入 |
| HZ_APPROVE_STATUS | String | 审批状态 | 审核状态 | NEW/RUN/APPROVED/REJECTED |
| HZ_INSTANCE_ID | Long | 流程实例ID | - | 流程启动后写入 |

</KbCard>

<KbCard num="2" title="表2：EPM_DISCOUNT_ECN_LINE（折扣变更/延期行）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_ECN_LINE_ID | Long | 变更行ID(主键) | - | 自增主键 |
| DISCOUNT_ECN_ID | Long | 变更头ID(外键) | - | 关联头表 |
| ITEM_CODE | String | 产品编码 | 产品编码 | 折扣单行带出 |
| ITEM_NAME | String | 产品名称 | 产品名称 | 折扣单行带出 |
| STANDARD_PRICE | BigDecimal | 标准单价 | 标准单价 | 变更后可修改 |
| BASE_DISCOUNT_RATE | BigDecimal | 出厂折扣率 | 出厂折扣率 | 变更后可修改 |
| EXTRA_DISCOUNT_RATE | BigDecimal | 审批折扣率 | 审批折扣率 | 变更后可修改 |
| DISCOUNT_RATE | BigDecimal | 应用折扣率 | 应用折扣率 | 自动计算=出厂×审批 |
| DISCOUNTED_PRICE | BigDecimal | 折后单价 | 折后单价 | 自动计算=标准单价×应用折扣率 |
| DISCOUNTED_AMOUNT | BigDecimal | 折后金额 | 折后金额 | 自动计算=折后单价×数量 |

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
            <td style="color:#DC2626;font-weight:600;">-</td>
            <td style="font-size:13px;">-</td>
            <td style="font-size:13px;">-</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>-</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>-</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">变更审批通过后折扣单数据未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>审批回调wfComplete未正确触发；排查SQL：`SELECT DE.DISCOUNT_ECN_CODE, DE.HZ_APPROVE_STATUS, DA.DISCOUNT_APPLY_CODE FROM EPM_DISCOUNT_ECN DE JOIN EPM_DISCOUNT_APPLY DA ON DE.SOURCE_DISCOUNT_APPLY_ID = DA.DISCOUNT_APPLY_ID WHERE DE.DISCOUNT_ECN_ID = #{discountEcnId}`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查流程实例状态，手动触发回调
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
