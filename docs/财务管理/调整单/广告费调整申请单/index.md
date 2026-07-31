<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="广告费调整申请单" desc="财务管理-调整单业务说明" />

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
新建广告费调整申请 → 选择事业部/调整类型/年度 → 录入明细行(法人/经销商/调整金额) → 保存
  → 提交审批 → H0工作流(SUB_ADJ_FEES_QUOTA) + OA审批(双轨)
  → 审批通过 → 更新审核状态(auditStat="审核通过") + 记录审核人/时间
  → 审批拒绝 → callbackSource=OA_REJECT
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 编码规则 | 配置依赖 | 生成调整单号，编码规则AE_SA_ADS_FEE_ADJUST_IN_QUOTA_ADJ(含事业部编码变量) | 编码规则已配置 |
| 工作流引擎 | 配置依赖 | H0工作流审批，流程编码SUB_ADJ_FEES_QUOTA | 工作流已部署 |
| OA审批系统 | 配置依赖 | 推送OA待办审批(单据名:广告费调整申请) | OA单据映射已配置 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 经销商广告费额度 | 额度可用余额调整 | 审批通过后，经销商的额度内广告费可用余额按调整金额增减 |
| 来源单据 | 来源单据关联 | 通过sourceBillId和sourceBillType关联来源单据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：H0工作流与OA双轨审批 核心逻辑">
<KbQuote>广告费调整申请同时走H0工作流和OA审批两条审批路径</KbQuote>

**具体逻辑**：

- 1、H0工作流编码SUB_ADJ_FEES_QUOTA，完成时更新auditStat="审核通过"
- 2、OA推送封装头行报文，含调整单号/申请人/事业部/调整类型/年度/来源单据/入账时间/申请原因等
- 3、OA回调中，最终审批节点同意时设置callbackSource=OA_PASS，拒绝时设置OA_REJECT
</KbCard>

<KbCard num="2" title="重点逻辑2：数据来源区分 核心逻辑">
<KbQuote>支持人工录入和Excel导入两种数据来源</KbQuote>

**具体逻辑**：

- 1、dataSource字段区分——manual=人工录入，import=Excel导入
- 2、导入时行表的adjustAmt字段记录Excel中的应调整金额
</KbCard>

<KbCard num="3" title="重点逻辑3：调整后可用金额计算 核心逻辑">
<KbQuote>调整后可用金额=可用余额+申请调整金额(正为增加，负为扣减)</KbQuote>

**具体逻辑**：

- 1、行表canUseAmount为当前可用余额
- 2、applyAdjustAmt为申请调整金额(可正可负)
- 3、adjustedAvailableAmt=canUseAmount+applyAdjustAmt
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
<td>调整单号</td>
<td>文本框</td>
<td>系统生成的调整单号</td>
<td>常显</td>
<td>新建时按编码规则自动生成(含事业部编码)</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.ADJUST_HEADER_NO</td>
</tr>
<tr>
<td>申请人</td>
<td>文本框</td>
<td>申请人</td>
<td>常显</td>
<td>系统自动取当前用户</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.APPLICANT</td>
</tr>
<tr>
<td>申请时间</td>
<td>日期选择器</td>
<td>申请时间</td>
<td>常显</td>
<td>系统自动记录</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.APPLICANT_TIME</td>
</tr>
<tr>
<td>事业部</td>
<td>下拉选择框</td>
<td>事业部</td>
<td>常显</td>
<td>必填；来源值集epm.division</td>
<td>epm.division值集</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.DIVISION_ID</td>
</tr>
<tr>
<td>调整类型</td>
<td>下拉选择框</td>
<td>调整类型</td>
<td>常显</td>
<td>必填；来源值集adjust_type</td>
<td>adjust_type值集</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.ADJUST_TYPE</td>
</tr>
<tr>
<td>调整年度</td>
<td>文本框</td>
<td>调整年度</td>
<td>常显</td>
<td>必填</td>
<td>年度格式</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.ADJUST_YEAR</td>
</tr>
<tr>
<td>扣减比例</td>
<td>数值框</td>
<td>扣减比例</td>
<td>常显</td>
<td>用户输入</td>
<td>0-100</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.DEDUCTION_RATIO</td>
</tr>
<tr>
<td>申请原因</td>
<td>文本域</td>
<td>申请原因</td>
<td>常显</td>
<td>必填；用户输入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.APPLYREASON</td>
</tr>
<tr>
<td>来源单据类型</td>
<td>下拉选择框</td>
<td>来源单据类型</td>
<td>常显</td>
<td>来源值集fin_fee_bill_type</td>
<td>fin_fee_bill_type值集</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.SOURCE_BILL_TYPE</td>
</tr>
<tr>
<td>入账日期</td>
<td>日期选择器</td>
<td>入账日期</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.INVOICE_PAID_DATE</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批状态</td>
<td>常显</td>
<td>默认NEW</td>
<td>HWKF.APPROVE_STATUS值集</td>
<td>ADS_FEE_ADJUST_IN_QUOTA.HZ_APPROVE_STATUS</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：明细行">
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
<td>法人编码</td>
<td>文本框</td>
<td>法人编码</td>
<td>常显</td>
<td>选择法人后带入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.LEGAL_ENTITY_CODE</td>
</tr>
<tr>
<td>法人客户名称</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>选择法人后带入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.LEGAL_ENTITY_NAME</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>选择交易公司后带入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>选择经销商后带入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.CUST_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>选择经销商后带入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.CUST_NAME</td>
</tr>
<tr>
<td>可用余额</td>
<td>数值框</td>
<td>当前可用余额</td>
<td>常显</td>
<td>来源资金池查询</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.CAN_USE_AMOUNT</td>
</tr>
<tr>
<td>申请调整金额</td>
<td>数值框</td>
<td>本次申请调整金额</td>
<td>常显</td>
<td>必填；用户输入；正为增加，负为扣减</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.APPLY_ADJUST_AMT</td>
</tr>
<tr>
<td>调整后可用金额</td>
<td>数值框</td>
<td>调整后的可用余额</td>
<td>常显</td>
<td>自动计算=可用余额+申请调整金额</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.ADJUSTED_AVAILABLE_AMT</td>
</tr>
<tr>
<td>币种</td>
<td>文本框</td>
<td>交易币种</td>
<td>常显</td>
<td>来源交易公司</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.CURRENCY</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>行备注</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>ADS_FEE_ADJUST_IN_QUOTA_L.REMARKS</td>
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
| 保存 | 保存广告费调整 | 详情页 | 编辑模式下 | 调用save接口，新增时生成调整单号 |
| 批量删除 | 批量删除调整单 | 列表页 | 选中记录且状态允许 | 调用batch-delete接口 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
NEW(新建) ──提交──→ RUN(审批中) ──审批通过──→ APPROVED(已审批)
  ↑                         │
  │                         ├──审批拒绝──→ REJECTED(已拒绝)
  │                         └──终止──────→ INTERRUPT(已终止)
  │
  └──删除──→ (删除)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 编辑、保存、提交、删除 |
| RUN | 审批中 | 无(等待审批结果) |
| APPROVED | 审批通过 | 无(流程结束) |
| REJECTED | 审批拒绝 | 编辑、重新提交 |
| INTERRUPT | 已终止 | 无(流程结束) |

---

</KbCard>
<KbCard num="1" title="表1：ADS_FEE_ADJUST_IN_QUOTA（广告费调整申请头表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ADJUST_HEADER_ID | BIGINT | 主键ID | - | 自增主键 |
| ADJUST_HEADER_NO | VARCHAR | 调整单号 | 调整单号 | 新建时按编码规则自动生成(含事业部编码变量) |
| APPLICANT | VARCHAR | 申请人 | 申请人 | 系统自动取当前用户 |
| APPLICANT_TIME | DATE | 申请时间 | 申请时间 | 系统自动记录 |
| DIVISION_ID | LONG | 事业部 | 事业部 | 必填；值集epm.division |
| ORGANIZATION_ID | LONG | 组织ID | - | 取用户上下文 |
| ADJUST_TYPE | LONG | 调整类型 | 调整类型 | 必填；值集adjust_type |
| ADJUST_YEAR | VARCHAR | 调整年度 | 调整年度 | 必填 |
| DEDUCTION_RATIO | LONG | 扣减比例 | 扣减比例 | 用户输入 |
| APPLYREASON | VARCHAR | 申请原因 | 申请原因 | 必填 |
| SOURCE_BILL_ID | BIGINT | 来源单据ID | - | 关联来源单据 |
| SOURCE_BILL_TYPE | VARCHAR | 来源单据类型 | 来源单据类型 | 值集fin_fee_bill_type |
| DATA_SOURCE | VARCHAR | 数据来源 | - | manual=人工录入/import=Excel导入 |
| INVOICE_PAID_DATE | VARCHAR | 入账日期 | 入账日期 | 用户输入 |
| AUDIT_STAT | VARCHAR | 审核状态 | - | 审批通过后更新为"审核通过" |
| CHECKOR | VARCHAR | 审核人 | - | 审批通过后记录 |
| CHECK_TIME | DATETIME | 审核完成时间 | - | 审批通过后记录 |
| HZ_INSTANCE_ID | BIGINT | 流程实例ID | - | 工作流启动后回写 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审核状态 | 默认NEW |
| CALLBACK_SOURCE | VARCHAR | 外部审批回调来源 | - | OA回调后更新(OA_PASS/OA_REJECT) |
| CREATION_DATE | DATETIME | 创建时间 | - | 框架自动记录 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：ADS_FEE_ADJUST_IN_QUOTA_L（广告费调整申请行表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ADJUST_LINE_ID | BIGINT | 行ID(主键) | - | 自增主键 |
| ADJUST_HEADER_ID | BIGINT | 头ID | - | 关联头表 |
| SEQ | LONG | 序号 | - | 自动生成 |
| YEAR | VARCHAR | 年度 | - | 来源头表 |
| DIVISION_ID | LONG | 事业部 | - | 来源头表 |
| LEGAL_ENTITY_ID | BIGINT | 法人ID | 法人编码 | 选择法人后带入 |
| LEGAL_ENTITY_CODE | VARCHAR | 法人编码 | 法人编码 | - |
| LEGAL_ENTITY_NAME | VARCHAR | 法人客户名称 | 法人客户名称 | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | 交易公司 | 选择交易公司后带入 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | - | - |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | - |
| CUST_ID | BIGINT | 经销商ID | 经销商编码 | 选择经销商后带入 |
| CUST_CODE | VARCHAR | 经销商编码 | 经销商编码 | - |
| CUST_NAME | VARCHAR | 经销商名称 | 经销商名称 | - |
| CAN_USE_AMOUNT | DECIMAL | 可用余额 | 可用余额 | 来源资金池查询 |
| APPLY_ADJUST_AMT | DECIMAL | 申请调整金额 | 申请调整金额 | 必填；用户输入 |
| ADJUSTED_AVAILABLE_AMT | DECIMAL | 调整后可用金额 | 调整后可用金额 | 自动计算=可用余额+申请调整金额 |
| ADJUST_AMT | LONG | 应调整金额(导入) | - | Excel导入时的原始应调整金额 |
| CURRENCY | VARCHAR | 币种 | 币种 | 来源交易公司 |
| REMARKS | VARCHAR | 备注 | 备注 | 用户输入 |

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
            <td style="color:#DC2626;font-weight:600;">调整单号生成失败</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">编码规则AE_SA_ADS_FEE_ADJUST_IN_QUOTA_ADJ未配置</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">明细行不允许为空</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">无明细行记录</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>调整单号生成失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>编码规则AE_SA_ADS_FEE_ADJUST_IN_QUOTA_ADJ未配置</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>明细行不允许为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>无明细行记录</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">OA审批后审核状态未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>OA回调中判断"最终审批节点"条件不满足<br>
      <strong style="color:#7C3AED;">处理：</strong>确认OA审批是否为最终审批节点通过
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
| 2025-09-15 | - | - | 初始创建广告费调整申请单功能 |

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
