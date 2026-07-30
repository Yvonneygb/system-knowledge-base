<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="项目合同失效" desc="工程管理-合同与折扣业务说明" />

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
经销商/自营工程合同列表 → 点击"失效"按钮 → 跳转项目合同失效页面
  ↓
加载合同详情+产品清单+未清订单明细
  ↓
填写失效说明 + 勾选"同时失效项目报备"
  ↓
保存 → 生成失效单号，合同状态变为"失效申请中"
  ↓
保存并提交 → 启动流程(SUB_GC_CONTRACT_EFFICACY)
  ↓
流程审批通过 → 合同状态变为"已失效"
  → 若勾选"同时失效项目报备" → 自动作废工程
  → 若项目下无其他有效合同且无订单 → 删除折扣预设率数据
流程驳回/退回 → 仅更新审批状态，合同状态不变
删除失效单 → 恢复合同状态为"已生效"
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程项目合同 | 数据依赖 | 失效操作基于已生效的工程合同发起 | 合同有效状态=2(已生效) |
| 工程项目报备 | 数据依赖 | 失效时可选择同时作废关联的工程 | 勾选"同时失效项目报备" |
| 编码规则配置 | 配置依赖 | 生成失效单号，编码规则AE_EPM_PROJECT_CONTRACT_ECN_NO | 编码规则已配置且生效 |
| 工作流引擎 | 配置依赖 | 审批流程SUB_GC_CONTRACT_EFFICACY | 流程已部署且可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程项目合同 | 合同状态流转 | 保存时合同有效状态从2(已生效)变为7(失效申请中)；审批通过后变为3(已失效)；删除/驳回时恢复为2(已生效) |
| 工程项目档案 | 项目自动作废 | 审批通过且勾选"同时失效项目报备"时，调用projectService.doDisable()自动作废工程，作废原因记录"合同【xxx】失效单【xxx】审核完毕后自动作废该工程" |
| 折扣预设率 | 预设率数据清理 | 审批通过后，若项目下无其他有效合同且该合同无订单，则删除该项目对应的折扣预设率数据(CM_DISC_PRESET_RATE_DTL) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：失效单号自动生成 {编码规则}">
<KbQuote>每次新建失效单时自动生成唯一单号，便于追溯和管理</KbQuote>

**具体逻辑**：

- 1、使用编码规则AE_EPM_PROJECT_CONTRACT_ECN_NO自动生成
- 2、仅在新增时生成，编辑已有失效单不会重新生成
</KbCard>

<KbCard num="2" title="重点逻辑2：重复失效校验 {防重复}">
<KbQuote>防止同一合同重复发起失效申请</KbQuote>

**具体逻辑**：

- 1、新增失效单时，查询该合同是否已存在失效记录
- 2、若已存在(count&gt;0)，阻断性报错"该项目已发起失效,请检查!"
</KbCard>

<KbCard num="3" title="重点逻辑3：审批通过后联动处理 {级联生效}">
<KbQuote>合同失效审批通过后，需级联处理合同状态、工程作废、折扣率清理</KbQuote>

**具体逻辑**：

- 1、将合同有效状态设为3(已失效)
- 2、若勾选"同时失效项目报备"(disableProject=2)，自动调用工程作废接口，作废原因自动记录
- 3、检查项目下是否还有其他有效合同(HZ_APPROVE_STATUS为RUN或APPROVED)，若无则继续检查
- 4、检查该合同是否存在订单，若无订单则删除项目对应的折扣预设率数据
</KbCard>

<KbCard num="4" title="重点逻辑4：删除/驳回恢复合同状态 {状态回退}">
<KbQuote>失效单被删除或审批驳回时，需恢复合同为正常有效状态</KbQuote>

**具体逻辑**：

- 1、删除失效单时，将合同有效状态恢复为2(已生效)
- 2、审批驳回/退回时，仅更新失效单审批状态，合同有效状态不变(仍为7-失效申请中)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：项目合同失效详情页">
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
<td>失效单编号，系统自动生成</td>
<td>常显</td>
<td>1.默认值：新增时为空，保存后自动生成；2.来源：编码规则AE_EPM_PROJECT_CONTRACT_ECN_NO；3.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT_ECN.ECN_CODE</td>
</tr>
<tr>
<td>申请人</td>
<td>文本框</td>
<td>创建失效单的当前用户</td>
<td>常显</td>
<td>1.默认值：当前登录用户真实姓名；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT_ECN.CREATOR</td>
</tr>
<tr>
<td>申请日期</td>
<td>文本框</td>
<td>失效单创建时间</td>
<td>常显</td>
<td>1.默认值：当前系统时间；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT_ECN.CREATETIME</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批流程状态</td>
<td>常显</td>
<td>1.默认值：NEW；2.来源：值集HWKF.APPROVE_STATUS；3.不可编辑</td>
<td>值集HWKF.APPROVE_STATUS中的项</td>
<td>EPM_PROJECT_CONTRACT_ECN.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>关联的工程合同编码</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_CODE</td>
</tr>
<tr>
<td>合同名称</td>
<td>文本框</td>
<td>关联的工程合同名称</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_NAME</td>
</tr>
<tr>
<td>合同金额</td>
<td>数字框</td>
<td>合同总金额</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_AMT</td>
</tr>
<tr>
<td>变更类型</td>
<td>下拉选择框</td>
<td>变更类型，失效固定为2</td>
<td>常显</td>
<td>1.默认值：2(失效)；2.来源：值集AE.CONTRACT.ECN_TYPE；3.不可编辑</td>
<td>值集AE.CONTRACT.ECN_TYPE中的项</td>
<td>EPM_PROJECT_CONTRACT_ECN.ECN_TYPE</td>
</tr>
<tr>
<td>客户编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CUSTOMER_NAME</td>
</tr>
<tr>
<td>签约时间</td>
<td>日期选择框</td>
<td>合同签订日期</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.SIGNED_DATE</td>
</tr>
<tr>
<td>签约类型</td>
<td>下拉选择框</td>
<td>合同签约类型(直销/经销)</td>
<td>常显</td>
<td>1.来源：值集AE.EPM.CONTRACT_TYPE；2.不可编辑</td>
<td>值集AE.EPM.CONTRACT_TYPE中的项</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_TYPE</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>1.来源：根据contractId关联交易公司带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>1.来源：根据contractId关联交易公司带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>签约单位</td>
<td>文本框</td>
<td>签约单位名称</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_UNIT</td>
</tr>
<tr>
<td>开票单位</td>
<td>文本框</td>
<td>开票单位名称</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>币种</td>
<td>文本框</td>
<td>合同币种</td>
<td>常显</td>
<td>1.来源：根据contractId从合同表带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CURRENCY</td>
</tr>
<tr>
<td>失效说明</td>
<td>文本框</td>
<td>申请失效的原因说明</td>
<td>常显</td>
<td>1.默认值：无；2.必输；3.审核状态为NEW/REJECTED/REBUT时可编辑，否则不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT_ECN.ECN_REASON</td>
</tr>
<tr>
<td>同时失效项目报备</td>
<td>复选框</td>
<td>是否同时作废关联的工程</td>
<td>常显</td>
<td>1.默认值：否(1)；2.勾选时值为2(是)；3.审核状态为NEW/REJECTED/REBUT时可编辑，否则不可编辑</td>
<td>是(2)/否(1)</td>
<td>EPM_PROJECT_CONTRACT_ECN.DISABLE_PROJECT</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：工程信息区域">
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
<td>工程编码</td>
<td>文本框</td>
<td>关联工程项目的编码</td>
<td>常显</td>
<td>1.来源：根据合同关联的projectId带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.PROJECT_CODE</td>
</tr>
<tr>
<td>工程名称</td>
<td>文本框</td>
<td>关联工程项目的名称</td>
<td>常显</td>
<td>1.来源：根据合同关联的projectId带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.PROJECT_NAME</td>
</tr>
<tr>
<td>项目当前进度</td>
<td>文本框</td>
<td>工程当前所处阶段</td>
<td>常显</td>
<td>1.来源：根据项目关联的阶段定义带出；2.不可编辑</td>
<td>-</td>
<td>EPM_STAGE_DEF.STAGE_NAME</td>
</tr>
<tr>
<td>申报日期</td>
<td>文本框</td>
<td>项目申报日期</td>
<td>常显</td>
<td>1.来源：根据projectId带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.REPORT_TIME</td>
</tr>
<tr>
<td>工程地址</td>
<td>文本框</td>
<td>工程地址</td>
<td>常显</td>
<td>1.来源：根据projectId带出；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.ADDRESS</td>
</tr>
<tr>
<td>本地/异地</td>
<td>下拉选择框</td>
<td>工程所在地类型</td>
<td>常显</td>
<td>1.来源：值集AE.EPM.IS_LOCAL；2.不可编辑</td>
<td>值集AE.EPM.IS_LOCAL中的项</td>
<td>EPM_PROJECT.IS_LOCAL</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：产品清单表格">
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
<td>合同关联的产品编码</td>
<td>常显</td>
<td>1.来源：根据contractId查询折扣申请行带出</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>产品名称</td>
<td>文本框</td>
<td>产品名称</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>产品型号</td>
<td>文本框</td>
<td>产品型号</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>标准单价(元)</td>
<td>文本框</td>
<td>产品标准单价</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>合同价(元)</td>
<td>文本框</td>
<td>合同约定价格</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>应用折扣率</td>
<td>数字框</td>
<td>应用的折扣率</td>
<td>常显</td>
<td>1.来源：同上；2.精度5位小数</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>折扣单价(元)</td>
<td>文本框</td>
<td>折扣后单价</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>合同数量</td>
<td>数字框</td>
<td>合同约定数量</td>
<td>常显</td>
<td>1.来源：同上；2.必须为非负整数</td>
<td>非负整数</td>
<td>-</td>
</tr>
<tr>
<td>已下单数量</td>
<td>文本框</td>
<td>已下单的数量</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块4：未清订单明细表格">
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
<td>要货单号</td>
<td>文本框</td>
<td>订单要货单号</td>
<td>常显</td>
<td>1.来源：查询合同下stat=5且未清数量&gt;0的订单</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.SA_SALEBILLNO</td>
</tr>
<tr>
<td>折扣单号</td>
<td>文本框</td>
<td>关联的折扣单号</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>订单日期</td>
<td>文本框</td>
<td>订单日期</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.DATE_INVBILL</td>
</tr>
<tr>
<td>产品编码</td>
<td>文本框</td>
<td>产品编码</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>产品名称</td>
<td>文本框</td>
<td>产品名称</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>要货数量</td>
<td>文本框</td>
<td>要货数量</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>SA_OUT_BILL_LINE.QTY_BILL</td>
</tr>
<tr>
<td>出库数量</td>
<td>文本框</td>
<td>已出库数量</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>SA_OUT_BILL_LINE.CONFIRM_OUT_QTY</td>
</tr>
<tr>
<td>取消数量</td>
<td>文本框</td>
<td>已取消数量</td>
<td>常显</td>
<td>1.来源：同上</td>
<td>-</td>
<td>SA_OUT_BILL_LINE.CANCEL_QTY</td>
</tr>
<tr>
<td>未清数量</td>
<td>文本框</td>
<td>未清数量=要货数量-出库数量-取消数量</td>
<td>常显</td>
<td>1.自动计算=要货数量-出库数量-取消数量</td>
<td>-</td>
<td>-</td>
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
| 保存并提交 | 保存数据并启动审批流程 | 详情页Header | 审核状态为NEW/REJECTED/REBUT时显示；权限contract.invalid.to.do.list.button.save.and.submit-todo | 调用save-contract-ecn保存，再调用save-submit-contract-ecn启动流程SUB_GC_CONTRACT_EFFICACY |
| 保存 | 仅保存数据不提交 | 详情页Header | 审核状态为NEW/REJECTED/REBUT时显示；权限contract.invalid.to.do.list.button.save-todo | 调用save-contract-ecn保存 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：同一合同不可重复发起失效 —— 防止重复提交失效申请</KbSubTitle>

- 第1点：新增失效单时(ecnId为空)，查询EPM_PROJECT_CONTRACT_ECN表中该contractId的记录数
- 第2点：若count&gt;0，阻断性报错"该项目已发起失效,请检查!"

<KbTip>阻断性报错</KbTip>

```sql
SELECT COUNT(1) FROM EPM_PROJECT_CONTRACT_ECN WHERE CONTRACT_ID = #{contractId}
```

<KbSubTitle>校验2：失效说明必输 —— 确保失效原因有据可查</KbSubTitle>

- 第1点：前端DataSet字段ecnReason设置required=true
- 第2点：保存时若ecnReason为空，前端校验不通过

<KbTip>前端校验提示</KbTip>

```sql
-
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：同一合同不可重复发起失效 —— 同保存校验1</KbSubTitle>

- 第1点：提交前先调用保存接口saveContractEcn，保存时执行重复校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT COUNT(1) FROM EPM_PROJECT_CONTRACT_ECN WHERE CONTRACT_ID = #{contractId}
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建 NEW] ──保存并提交──→ [审批中 RUN] ──审批通过──→ [已审批 APPROVED]
                                │                    │
                                ├──驳回──→ [已驳回 REJECTED]
                                └──退回──→ [已退回 REBUT]

[新建 NEW] ──删除──→ [删除]
[已驳回 REJECTED] ──删除──→ [删除]
[已退回 REBUT] ──删除──→ [删除]

可编辑状态: NEW / REJECTED / REBUT
不可编辑状态: RUN / APPROVED
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建，失效单已保存但未提交 | 保存、保存并提交、删除 |
| RUN | 审批中，流程已启动 | 无(等待审批结果) |
| APPROVED | 已审批，审批通过 | 无(合同已失效) |
| REJECTED | 已驳回，审批驳回 | 保存、保存并提交、删除 |
| REBUT | 已退回，审批退回 | 保存、保存并提交、删除 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_PROJECT_CONTRACT_ECN（合同变更单/失效单）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ECN_ID | Long | 合同变更单ID(主键) | - | 自增主键 |
| ORGANIZATION_ID | Long | 组织ID | - | 新增时从当前用户事业部获取 |
| ECN_CODE | String | 合同变更单编码 | 变更单号 | 新增时由编码规则AE_EPM_PROJECT_CONTRACT_ECN_NO生成 |
| ECN_TYPE | Long | 变更类型 | 变更类型 | 1=变更，2=失效；失效页面固定为2 |
| CONTRACT_ID | Long | 合同ID | - | 从合同列表跳转时传入 |
| ECN_REASON | String | 申请说明 | 失效说明 | 用户输入，必输 |
| STAT | Long | 单据状态 | - | 旧版流程状态字段 |
| WFID | Long | 流程ID | - | 旧版流程ID |
| WFFLAG | Long | 流程状态 | - | 旧版流程状态标记 |
| CREATOR | String | 创建人 | 申请人 | 系统自动记录当前用户username |
| CREATETIME | LocalDateTime | 创建时间 | 申请日期 | 系统自动记录 |
| UPDATOR | String | 修改人 | - | 系统自动记录 |
| UPDATETIME | LocalDateTime | 修改时间 | - | 系统自动记录 |
| DISABLE_PROJECT | Long | 同时作废工程 | 同时失效项目报备 | 2=是，非2=否；默认1(否) |
| IS_HOME | Long | 是否家装 | - | 2=家装，非2=工程；工程合同失效为1 |
| HZ_INSTANCE_ID | Long | H0流程实例ID | - | 提交流程后由工作流引擎返回 |
| HZ_APPROVE_STATUS | String | H0流程审批状态 | 审核状态 | NEW/RUN/APPROVED/REJECTED/REBUT |
| OBJECT_VERSION_NUMBER | Long | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_PROJECT_CONTRACT（工程项目合同表）- 失效相关字段">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| CONTRACT_ID | Long | 工程项目合同ID(主键) | - | 关联字段 |
| VALID | Long | 有效状态 | - | 1=未审核，2=已生效，3=已失效，7=失效申请中；保存失效单时设为7，审批通过设为3，删除/驳回恢复为2 |
| PROJECT_ID | Long | 工程项目ID | - | 关联工程，用于作废工程和清理折扣率 |
| CONTRACT_CODE | String | 合同编码 | 合同编码 | 只读展示 |
| CONTRACT_NAME | String | 合同名称 | 合同名称 | 只读展示 |
| CONTRACT_AMT | BigDecimal | 合同金额 | 合同金额 | 只读展示 |
| CUSTOMER_CODE | String | 客户编码 | 客户编码 | 只读展示 |
| CUSTOMER_NAME | String | 客户名称 | 客户名称 | 只读展示 |
| SIGNED_DATE | LocalDateTime | 签约时间 | 签约时间 | 只读展示 |
| CONTRACT_TYPE | Long | 签约类型 | 签约类型 | 只读展示 |
| TRADING_COMPANY_NAME | String | 交易公司名称 | 交易公司名称 | 只读展示 |
| BILLING_UNIT_NAME | String | 开票单位名称 | 开票单位 | 只读展示 |
| CURRENCY | String | 币种 | 币种 | 只读展示 |
| IS_HOME | Long | 是否家装 | - | 2=家装，工程合同为非2 |
| HZ_INSTANCE_ID | Long | H0流程实例ID | - | 合同审批流程实例 |
| HZ_APPROVE_STATUS | String | H0流程审批状态 | - | 合同审批状态 |

</KbCard>

<KbCard num="3" title="表3：CM_DISC_PRESET_RATE_DTL（折扣预设率明细表）- 相关字段">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_ID | Long | 工程项目ID | - | 审批通过后，若项目无其他有效合同且无订单，按PROJECT_ID删除 |

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
            <td style="color:#DC2626;font-weight:600;">参数不能为空！</td>
            <td style="font-size:13px;">查询失效详情</td>
            <td style="font-size:13px;">contractId参数未传入，检查路由传参是否正确</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">合同数据不存在！未找到合同详情数据,合同ID：{contractId}</td>
            <td style="font-size:13px;">查询失效详情</td>
            <td style="font-size:13px;">合同ID在数据库中不存在，检查数据是否被删除</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该项目已发起失效,请检查!</td>
            <td style="font-size:13px;">保存失效单</td>
            <td style="font-size:13px;">该合同已存在失效记录(EPM_PROJECT_CONTRACT_ECN)，不可重复发起</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程中objid为空，流程失败!</td>
            <td style="font-size:13px;">流程审批回调</td>
            <td style="font-size:13px;">流程回调时objId为空，检查流程配置</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程中objid为0，流程失败!</td>
            <td style="font-size:13px;">审批通过执行变更</td>
            <td style="font-size:13px;">流程回调时objId为0，数据异常</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该单据对应的合同【{contractCode}】已经失效</td>
            <td style="font-size:13px;">审批通过执行变更</td>
            <td style="font-size:13px;">合同已处于失效状态(valid=3)，无需重复失效</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">合同变更数据不存在！合同变更ecnId：{ecnId}</td>
            <td style="font-size:13px;">删除失效单</td>
            <td style="font-size:13px;">失效单数据已被删除，刷新页面</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">合同变更ID不能为空！</td>
            <td style="font-size:13px;">查看失效详情</td>
            <td style="font-size:13px;">ecnId参数未传入</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>参数不能为空！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>contractId参数未传入，检查路由传参是否正确</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同数据不存在！未找到合同详情数据,合同ID：{contractId}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>合同ID在数据库中不存在，检查数据是否被删除</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该项目已发起失效,请检查!</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>该合同已存在失效记录(EPM_PROJECT_CONTRACT_ECN)，不可重复发起</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程中objid为空，流程失败!</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>流程回调时objId为空，检查流程配置</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程中objid为0，流程失败!</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>流程回调时objId为0，数据异常</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该单据对应的合同【{contractCode}】已经失效</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>合同已处于失效状态(valid=3)，无需重复失效</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同变更数据不存在！合同变更ecnId：{ecnId}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>失效单数据已被删除，刷新页面</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同变更ID不能为空！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>ecnId参数未传入</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">合同失效审批通过后，合同状态未变为"已失效"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>流程回调wfComplete未正确触发，或doContractAlteration中合同已失效(valid=3)导致报错中断<br>
      <strong style="color:#7C3AED;">处理：</strong>检查HZ_APPROVE_STATUS是否为APPROVED，检查合同VALID值；排查SQL：`SELECT C.CONTRACT_CODE, C.VALID, E.HZ_APPROVE_STATUS FROM EPM_PROJECT_CONTRACT C JOIN EPM_PROJECT_CONTRACT_ECN E ON E.CONTRACT_ID = C.CONTRACT_ID WHERE E.ECN_ID = #{ecnId}`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">失效审批通过后工程未作废</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>DISABLE_PROJECT字段不为2，即用户未勾选"同时失效项目报备"<br>
      <strong style="color:#7C3AED;">处理：</strong>检查EPM_PROJECT_CONTRACT_ECN.DISABLE_PROJECT值；排查SQL：`SELECT DISABLE_PROJECT FROM EPM_PROJECT_CONTRACT_ECN WHERE ECN_ID = #{ecnId}`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">失效单删除后合同仍为"失效申请中"状态</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>删除操作未正确恢复合同状态，可能是并发操作导致<br>
      <strong style="color:#7C3AED;">处理：</strong>手动恢复合同状态；排查SQL：`SELECT VALID FROM EPM_PROJECT_CONTRACT WHERE CONTRACT_ID = #{contractId}`；修复SQL：`UPDATE EPM_PROJECT_CONTRACT SET VALID = 2 WHERE CONTRACT_ID = #{contractId} AND VALID = 7`
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
