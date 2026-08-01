<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="8" title="政策性补贴申请" desc="财务管理-对账单业务说明" />

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
用户选择查询条件(申请单号/经销商/事业部/审核状态) → 查询SPECIAL_ALLOW_BX_CASH表 → 返回政策性补贴兑现与报销数据 → 展示列表
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 政策性补贴申请 | 数据依赖 | SPECIAL_ALLOW_BX_CASH表数据由政策性补贴申请流程写入 | 补贴申请已提交 |
| 工作流回调 | 数据依赖 | WorkflowCallbackProcessServiceImpl处理流程回调更新SPECIAL_ALLOW_BX_CASH状态 | 工作流已配置 |

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
<KbCard num="1" title="重点逻辑1：政策性补贴兑现与报销查询 核心逻辑">
<KbQuote>查询政策性补贴的兑现与报销记录，包括兑现金额、核销金额、审核状态等</KbQuote>

**具体逻辑**：

- 1、SpecialAllowBxCashController基于/v1/{organizationId}/special-allow-bx-cashs路由
- 2、SpecialAllowBxCashMapper提供selectList方法查询补贴兑现报销记录
- 3、Controller当前无自定义API端点，业务逻辑主要通过WorkflowCallbackProcessServiceImpl流程回调处理
</KbCard>

<KbCard num="2" title="重点逻辑2：兑现金额与核销金额 核心逻辑">
<KbQuote>跟踪政策性补贴的兑现和核销全流程金额</KbQuote>

**具体逻辑**：

- 1、usedCashoutAmt为已兑现金额，记录历史累计兑现金额
- 2、verifyCashoutAmt为已核销金额，记录历史累计核销金额
- 3、thisCashoutAmt为本次申请兑现金额
- 4、thisWriteoffAmt为本次核销金额
- 5、thisSurCashoutAmt为剩余未兑现金额
- 6、surWriteoffAmt为剩余未核销金额
</KbCard>

<KbCard num="3" title="重点逻辑3：实际兑现金额与税金">
<KbQuote>记录实际兑现的含税金额、税金、未税金额</KbQuote>

**具体逻辑**：

- 1、factInvoiceAmt为实际兑现含税金额
- 2、factTaxAmount为实际兑现税金
- 3、factNoTaxAmt为实际兑现未税金额
- 4、diffTaxRate为差异税率，用于跨税率兑现场景
</KbCard>

<KbCard num="4" title="重点逻辑4：流程状态管理">
<KbQuote>通过工作流管理补贴兑现报销的审批流程</KbQuote>

**具体逻辑**：

- 1、wfid为工作流ID，wfflag为工作流状态
- 2、hzInstanceId为流程实例ID，hzApproveStatus为流程实例状态
- 3、auditStat为审核状态，stat为单据状态
- 4、WorkflowCallbackProcessServiceImpl处理流程回调，更新审核状态
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
<td>申请单号</td>
<td>文本框</td>
<td>补贴报销单号筛选</td>
<td>常显</td>
<td>支持模糊查询</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SPECIAL_BX_CASH_NO</td>
</tr>
<tr>
<td>关联申请单号</td>
<td>文本框</td>
<td>关联的补贴申请单号</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SPECIAL_APPLY_NO</td>
</tr>
<tr>
<td>事业部</td>
<td>下拉选择框</td>
<td>事业部筛选</td>
<td>常显</td>
<td>来源值集epm.division</td>
<td>epm.division值集</td>
<td>SPECIAL_ALLOW_BX_CASH.DIVISION_ID</td>
</tr>
<tr>
<td>经销商</td>
<td>下拉选择框</td>
<td>经销商筛选</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.CUST_ID</td>
</tr>
<tr>
<td>供应商</td>
<td>文本框</td>
<td>供应商筛选</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SUPPLY_NAME</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审核状态筛选</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.AUDIT_STAT</td>
</tr>
<tr>
<td>兑现标识</td>
<td>下拉选择框</td>
<td>兑现标识筛选</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.CASHOUT_FLAG</td>
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
<td>补贴报销单号</td>
<td>文本框</td>
<td>补贴报销与兑现申请单号</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SPECIAL_BX_CASH_NO</td>
</tr>
<tr>
<td>关联申请单号</td>
<td>文本框</td>
<td>关联的补贴申请单号</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SPECIAL_APPLY_NO</td>
</tr>
<tr>
<td>支付方式</td>
<td>下拉选择框</td>
<td>支付方式</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.PAY_TYPE</td>
</tr>
<tr>
<td>供应商名称</td>
<td>文本框</td>
<td>供应商名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SUPPLY_NAME</td>
</tr>
<tr>
<td>供应商编码</td>
<td>文本框</td>
<td>供应商编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SUPPLY_CODE</td>
</tr>
<tr>
<td>已兑现金额</td>
<td>数值框</td>
<td>历史累计已兑现金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.USED_CASHOUT_AMT</td>
</tr>
<tr>
<td>已核销金额</td>
<td>数值框</td>
<td>历史累计已核销金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.VERIFY_CASHOUT_AMT</td>
</tr>
<tr>
<td>本次兑现金额</td>
<td>数值框</td>
<td>本次申请兑现金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.THIS_CASHOUT_AMT</td>
</tr>
<tr>
<td>本次核销金额</td>
<td>数值框</td>
<td>本次核销金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.THIS_WRITEOFF_AMT</td>
</tr>
<tr>
<td>剩余未兑现金额</td>
<td>数值框</td>
<td>剩余未兑现金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.THIS_SUR_CASHOUT_AMT</td>
</tr>
<tr>
<td>剩余未核销金额</td>
<td>数值框</td>
<td>剩余未核销金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.SUR_WRITEOFF_AMT</td>
</tr>
<tr>
<td>实际兑现含税金</td>
<td>数值框</td>
<td>实际兑现含税金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.FACT_INVOICE_AMT</td>
</tr>
<tr>
<td>实际兑现税金</td>
<td>数值框</td>
<td>实际兑现税金</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.FACT_TAX_AMOUNT</td>
</tr>
<tr>
<td>实际兑现未税金</td>
<td>数值框</td>
<td>实际兑现未税金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.FACT_NO_TAX_AMT</td>
</tr>
<tr>
<td>入账金额</td>
<td>数值框</td>
<td>入账金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.INVOICE_PAID_AMOUNT</td>
</tr>
<tr>
<td>入账日期</td>
<td>日期选择器</td>
<td>入账日期</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.INVOICE_PAID_DATE</td>
</tr>
<tr>
<td>申请人</td>
<td>文本框</td>
<td>申请人</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.CREATOR</td>
</tr>
<tr>
<td>申请日期</td>
<td>日期选择器</td>
<td>申请日期</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.CREATE_TIME</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审核状态</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.AUDIT_STAT</td>
</tr>
<tr>
<td>单据状态</td>
<td>下拉选择框</td>
<td>单据状态</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.STAT</td>
</tr>
<tr>
<td>虚拟收款状态</td>
<td>下拉选择框</td>
<td>虚拟收款状态</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.RECEIPT_STATUS</td>
</tr>
<tr>
<td>税务接口状态</td>
<td>下拉选择框</td>
<td>箭牌税务接口状态</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPECIAL_ALLOW_BX_CASH.TICKET_STATUS</td>
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
| 查询 | 查询政策性补贴兑现报销 | 查询区域 | 查询条件已填写 | 调用后端查询接口 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本菜单为纯查询视图，不直接操作状态。数据状态由工作流回调更新。

<KbSubTitle>审核状态流转图</KbSubTitle>


```text
NEW(新建) ──提交──→ RUN(审批中) ──审批通过──→ APPROVED(已审批)
  ↑                         │
  │                         ├──审批拒绝──→ REJECTED(已拒绝)
  │                         └──终止──────→ INTERRUPT(已终止)
```

<KbSubTitle>审核状态列表</KbSubTitle>


| 状态值 | 状态释义 | 说明 |
|-------|---------|------|
| NEW | 新建 | 初始状态 |
| RUN | 审批中 | 工作流审批中 |
| APPROVED | 已审批 | 审批通过 |
| REJECTED | 已拒绝 | 审批拒绝 |

---

</KbCard>
<KbCard num="1" title="表1：SPECIAL_ALLOW_BX_CASH（特殊发票兑现与报销表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SPECIAL_BX_CASH_ID | BIGINT | 主键ID | - | 自增主键 |
| SPECIAL_BX_CASH_NO | VARCHAR | 补贴报销与兑现申请单号 | 补贴报销单号 | - |
| SPECIAL_APPLY_ID | BIGINT | 关联申请ID | - | 关联政策性补贴申请 |
| SPECIAL_APPLY_NO | VARCHAR | 关联申请单号 | 关联申请单号 | - |
| PAY_TYPE | BIGINT | 支付方式 | 支付方式 | - |
| SUPPLY_NAME | VARCHAR | 供应商名称 | 供应商名称 | - |
| SUPPLY_CODE | VARCHAR | 供应商编码 | 供应商编码 | - |
| SUPPLY_ORG_ID | BIGINT | 供应商ID | - | - |
| USED_CASHOUT_AMT | BIGINT | 已兑现金额 | 已兑现金额 | 历史累计 |
| VERIFY_CASHOUT_AMT | BIGINT | 已核销金额 | 已核销金额 | 历史累计 |
| DIFF_TAX_RATE | BIGINT | 差异税率 | - | 跨税率兑现场景 |
| CASHOUT_FLAG | BIGINT | 兑现标识 | 兑现标识 | - |
| THIS_CASHOUT_AMT | BIGINT | 本次申请兑现金额 | 本次兑现金额 | - |
| THIS_WRITEOFF_AMT | BIGINT | 本次核销金额 | 本次核销金额 | - |
| THIS_SUR_CASHOUT_AMT | BIGINT | 剩余未兑现金额 | 剩余未兑现金额 | - |
| SUR_WRITEOFF_AMT | BIGINT | 剩余未核销金额 | 剩余未核销金额 | - |
| NOTE | VARCHAR | 备注 | - | - |
| FACT_INVOICE_AMT | BIGINT | 实际兑现含税金 | 实际兑现含税金 | - |
| FACT_TAX_AMOUNT | BIGINT | 实际兑现税金 | 实际兑现税金 | - |
| FACT_NO_TAX_AMT | BIGINT | 实际兑现未税金 | 实际兑现未税金 | - |
| INVOICE_PAID_AMOUNT | DECIMAL | 入账金额 | 入账金额 | - |
| INVOICE_PAID_DATE | VARCHAR | 入账日期 | 入账日期 | - |
| STAT | BIGINT | 单据状态 | 单据状态 | - |
| WFID | BIGINT | 工作流ID | - | - |
| WFFLAG | BIGINT | 工作流状态 | - | - |
| HZ_INSTANCE_ID | BIGINT | 流程实例ID | - | 工作流启动后回写 |
| HZ_APPROVE_STATUS | VARCHAR | 流程实例状态 | - | - |
| CREATE_TIME | VARCHAR | 申请日期 | 申请日期 | - |
| CREATOR | VARCHAR | 申请人 | 申请人 | - |
| UPDATETIME | VARCHAR | 修改时间 | - | 系统自动记录 |
| UPDATOR | VARCHAR | 更新人 | - | 系统自动记录 |
| AUDIT_STAT | VARCHAR | 审核状态 | 审核状态 | 工作流回调更新 |
| DIVISION_ID | BIGINT | 事业部ID | 事业部 | 值集epm.division |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 取用户上下文 |
| CUST_ID | BIGINT | 经销商ID | 经销商 | - |
| EXT_ACCOUNT_ID | VARCHAR | 法人客户地址编号 | - | - |
| ERROR_COLLECTION | VARCHAR | 错误收集器 | - | - |
| RECEIPT_STATUS | VARCHAR | 虚拟收款状态 | 虚拟收款状态 | - |
| LEDGER_DATE | DATETIME | 总账日期 | - | - |
| TICKET_STATUS | VARCHAR | 箭牌税务接口状态 | 税务接口状态 | - |
| TICKET_MESSAGE | VARCHAR | 筭牌税务接口信息 | - | - |

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
            <td style="font-size:13px;">SPECIAL_ALLOW_BX_CASH表中无匹配记录</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询结果为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>SPECIAL_ALLOW_BX_CASH表中无匹配记录</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">审核状态长时间停留在审批中</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>工作流未完成审批或OA审批未回调<br>
      <strong style="color:#7C3AED;">处理：</strong>检查工作流实例状态，确认OA审批是否已完成回调
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">剩余未兑现金额与预期不一致</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>thisSurCashoutAmt计算基准与预期不同<br>
      <strong style="color:#7C3AED;">处理：</strong>核对已兑现金额和本次兑现金额，确认计算逻辑
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">税务接口状态异常</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>ticketStatus非成功状态，税务接口调用失败<br>
      <strong style="color:#7C3AED;">处理：</strong>查看ticketMessage错误信息，确认税务接口连通性后重试
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
| 2025-11-14 | - | YD | 初始创建政策性补贴兑现与报销查询功能 |

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
