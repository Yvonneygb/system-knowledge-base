<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="工程核销发票上传" desc="工程管理-项目往来业务说明" />

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
工程真实性核销(EPM_INVOICE_TRUTH_HEADER) ──关联核销单──> 核销发票上传(新建)
                                                          │
                                                          ├── 选择项目/合同/经销商
                                                          ├── 上传发票影像(OCR识别)
                                                          ├── 录入发票主要信息(发票代码/号码/金额/日期)
                                                          ├── 录入发票详细信息(产品/数量/金额)
                                                          ├── 关联出库单行(核销数量)
                                                          │
                                                          ▼
                                                    保存(校验发票重复/行金额)
                                                          │
                                                          ▼
                                                    提交审批(启动工作流INVOICE_WF_UPLOAD_AW)
                                                          │
                                                ┌─────────┴─────────┐
                                                ▼                   ▼
                                          审批通过              审批驳回
                                          (更新发票有效状态)    (流程中断)
                                                │
                                                ▼
                                          发票明细有效状态→valid

                    ┌──────────────────────────────────────────────┐
                    │          终止/撤回终止流程                      │
                    │  终止：标记核销发票为终止状态                    │
                    │  撤回终止：恢复核销发票为正常状态                │
                    └──────────────────────────────────────────────┘
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程真实性核销(EPM_INVOICE_TRUTH_HEADER) | 数据依赖 | 核销发票上传关联真实性核销单，提供核销单号和核销类型 | 核销单已保存 |
| 出库单行(INV_OUT_BILL_LINE) | 数据依赖 | 发票详细信息关联出库单行，获取可核销数量 | 出库单已签收确认 |
| OCR识别服务 | 配置依赖 | 上传发票影像后调用OCR识别发票信息 | OCR服务可用 |
| 编码规则(AE.INVOICE_VERIFER_NO) | 配置依赖 | 生成核销发票上传单号 | 编码规则已配置 |
| 工作流(INVOICE_WF_UPLOAD_AW) | 配置依赖 | 工程核销发票上传审批流程 | 工作流已部署 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 发票管理 | 发票状态更新为有效 | 审批通过后，发票详细信息(EPM_VERIFER_INVOICE_DETAILS)的有效状态(EFFECT_STATUS)更新为valid |
| 出库确认 | 出库行核销数量更新 | 核销发票上传审批通过后，对应出库单行的已核销数量增加，可核销数量减少 |
| 工程真实性核销 | 关联真实性核销单 | 核销发票上传单关联真实性核销单，影响核销进度统计 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：OCR发票识别 OCR识别">
<KbQuote>上传发票影像文件后自动识别发票信息，减少人工录入</KbQuote>

**具体逻辑**：

- 1、上传发票影像文件，调用OcrSdkService进行OCR识别
- 2、识别结果返回发票代码、发票号码、开票日期、金额、校验码等信息
- 3、识别结果自动回填到发票主要信息字段，支持人工修正
</KbCard>

<KbCard num="2" title="重点逻辑2：发票重复校验 重复校验">
<KbQuote>防止同一张发票被重复上传核销</KbQuote>

**具体逻辑**：

- 1、保存前校验发票号码和发票代码是否已存在于同一核销发票上传单中
- 2、checkInvoices接口提供独立的发票重复检查功能
- 3、重复校验范围：同一核销发票上传单下相同发票代码+发票号码的记录
</KbCard>

<KbCard num="3" title="重点逻辑3：核销发票保存逻辑 保存">
<KbQuote>保存核销发票上传单，包含影像、主要信息、详细信息、附件</KbQuote>

**具体逻辑**：

- 1、新增时自动生成核销单号(编码规则AE.INVOICE_VERIFER_NO)和凭证号码
- 2、保存数据包含四部分：发票影像(EPM_UPLOAD_INVOICE)、发票主要信息(EPM_UPLOAD_INVOICE_INFO)、发票详细信息(EPM_UPLOAD_INVOICE_DETAILS)、附件
- 3、修改时采用先删后插策略处理子表数据
- 4、保存前校验行金额合计与发票金额是否一致
</KbCard>

<KbCard num="4" title="重点逻辑4：导入发票明细 导入">
<KbQuote>支持通过Excel导入发票详细信息，提高录入效率</KbQuote>

**具体逻辑**：

- 1、导入时校验产品编码、数量、金额等字段格式
- 2、导入数据写入EPM_UPLOAD_INVOICE_DETAILS表
- 3、导入后自动校验行金额
</KbCard>

<KbCard num="5" title="重点逻辑5：终止与撤回终止 终止">
<KbQuote>对核销发票上传单进行终止操作，支持撤回终止恢复</KbQuote>

**具体逻辑**：

- 1、终止时标记核销发票上传单为终止状态
- 2、撤回终止时恢复为正常状态
- 3、终止/撤回终止需满足特定状态条件
</KbCard>

<KbCard num="6" title="重点逻辑6：审批完成回调 审批回调">
<KbQuote>审批通过后更新发票有效状态，确保核销数据生效</KbQuote>

**具体逻辑**：

- 1、流程完成回调(wfComplete)中，审批通过时更新发票详细信息有效状态为valid
- 2、流程节点完成回调(onProcComplete)中，更新有效状态
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：核销发票上传列表页">
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
<td>核销单号</td>
<td>文本框</td>
<td>系统自动生成的核销发票上传单号</td>
<td>常显</td>
<td>新增时按编码规则自动生成，不可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_VERIFER.INVOICE_VERIFER_NO</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框</td>
<td>关联项目编码</td>
<td>常显</td>
<td>来源于项目选择，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>项目名称</td>
<td>文本框</td>
<td>关联项目名称</td>
<td>常显</td>
<td>来源于项目选择，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>来源于项目/合同，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>来源于项目/合同，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>来源于项目，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>核销类型</td>
<td>下拉选择框</td>
<td>核销类型</td>
<td>常显</td>
<td>选择核销单时带入</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_VERIFER.VERIFER_TYPE</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>工作流审批状态</td>
<td>常显</td>
<td>值集HWKF.APPROVE_STATUS翻译</td>
<td>NEW/RUN/APPROVED/INTERRUPT</td>
<td>EPM_UPLOAD_INVOICE_VERIFER.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>验真通过</td>
<td>单选框</td>
<td>首次验真是否通过</td>
<td>常显</td>
<td>来源于验真结果</td>
<td>Y/N</td>
<td>EPM_UPLOAD_INVOICE_VERIFER.IS_FIRST_PASSED</td>
</tr>
<tr>
<td>二次验真通过</td>
<td>单选框</td>
<td>二次验真是否通过</td>
<td>常显</td>
<td>来源于二次验真结果</td>
<td>Y/N</td>
<td>EPM_UPLOAD_INVOICE_VERIFER.IS_SECOND_PASSED</td>
</tr>
<tr>
<td>是否家装</td>
<td>单选框</td>
<td>是否家装</td>
<td>常显</td>
<td>工程=1，家装=2</td>
<td>1/2</td>
<td>EPM_UPLOAD_INVOICE_VERIFER.IS_HOME</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：核销发票上传详情页-发票影像">
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
<td>发票影像文件</td>
<td>文件上传</td>
<td>发票影像文件</td>
<td>常显</td>
<td>上传后调用OCR识别，可编辑</td>
<td>图片/PDF</td>
<td>EPM_UPLOAD_INVOICE.ATT_UUID</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：核销发票上传详情页-发票主要信息">
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
<td>发票代码</td>
<td>文本框</td>
<td>发票代码</td>
<td>常显</td>
<td>OCR识别或手工录入，可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_INFO.INVOICE_CODE</td>
</tr>
<tr>
<td>发票号码</td>
<td>文本框</td>
<td>发票号码</td>
<td>常显</td>
<td>OCR识别或手工录入，可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_INFO.INVOICE_NUMBER</td>
</tr>
<tr>
<td>开票日期</td>
<td>日期选择框</td>
<td>发票开票日期</td>
<td>常显</td>
<td>OCR识别或手工录入，可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_INFO.INVOICE_DATE</td>
</tr>
<tr>
<td>发票金额</td>
<td>数值框</td>
<td>发票总金额(含税)</td>
<td>常显</td>
<td>OCR识别或手工录入，可编辑</td>
<td>&gt;0</td>
<td>EPM_UPLOAD_INVOICE_INFO.INVOICE_AMOUNT</td>
</tr>
<tr>
<td>不含税金额</td>
<td>数值框</td>
<td>发票不含税金额</td>
<td>常显</td>
<td>自动计算或手工录入</td>
<td>≥0</td>
<td>EPM_UPLOAD_INVOICE_INFO.INVOICE_AMOUNT_NORAX</td>
</tr>
<tr>
<td>税额</td>
<td>数值框</td>
<td>发票税额</td>
<td>常显</td>
<td>自动计算=含税金额-不含税金额</td>
<td>≥0</td>
<td>-</td>
</tr>
<tr>
<td>购方名称</td>
<td>文本框</td>
<td>购买方名称</td>
<td>常显</td>
<td>OCR识别或手工录入</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_INFO.BUYER_NAME</td>
</tr>
<tr>
<td>销方名称</td>
<td>文本框</td>
<td>销售方名称</td>
<td>常显</td>
<td>OCR识别或手工录入</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_INFO.SELLER_NAME</td>
</tr>
<tr>
<td>有效状态</td>
<td>下拉选择框</td>
<td>发票有效状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>invalid/valid/obsolete</td>
<td>EPM_UPLOAD_INVOICE_INFO.EFFECT_STATUS</td>
</tr>
<tr>
<td>凭证号码</td>
<td>文本框</td>
<td>凭证号码</td>
<td>常显</td>
<td>点击生成凭证号码按钮自动生成</td>
<td>-</td>
<td>-</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块4：核销发票上传详情页-发票详细信息">
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
<td>货物或服务名称</td>
<td>文本框</td>
<td>发票明细货物名称</td>
<td>常显</td>
<td>OCR识别或手工录入，可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.SERVICES_NAME</td>
</tr>
<tr>
<td>产品编码</td>
<td>文本框</td>
<td>产品编码</td>
<td>常显</td>
<td>手工录入或弹窗选择，可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.SERVICES_CODE</td>
</tr>
<tr>
<td>规格型号</td>
<td>文本框</td>
<td>规格型号</td>
<td>常显</td>
<td>手工录入，可编辑</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.SPECS</td>
</tr>
<tr>
<td>单位</td>
<td>下拉选择框</td>
<td>计量单位</td>
<td>常显</td>
<td>弹窗选择</td>
<td>-</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.UOM</td>
</tr>
<tr>
<td>数量</td>
<td>数值框</td>
<td>发票数量</td>
<td>常显</td>
<td>手工录入，可编辑</td>
<td>&gt;0</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.QUANTITY</td>
</tr>
<tr>
<td>单价</td>
<td>数值框</td>
<td>不含税单价</td>
<td>常显</td>
<td>手工录入，可编辑</td>
<td>≥0</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.UNIT_PRICE</td>
</tr>
<tr>
<td>金额</td>
<td>数值框</td>
<td>不含税金额</td>
<td>常显</td>
<td>自动计算=数量×单价(保留2位小数)，可编辑</td>
<td>≥0</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.AMOUNT</td>
</tr>
<tr>
<td>税率</td>
<td>数值框</td>
<td>税率</td>
<td>常显</td>
<td>手工录入，可编辑</td>
<td>0-100</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.TAX_RATE</td>
</tr>
<tr>
<td>税额</td>
<td>数值框</td>
<td>税额</td>
<td>常显</td>
<td>自动计算=金额×税率/100(保留2位小数)</td>
<td>≥0</td>
<td>EPM_UPLOAD_INVOICE_DETAILS.TAX</td>
</tr>
<tr>
<td>转换率</td>
<td>数值框</td>
<td>单位转换率</td>
<td>常显</td>
<td>根据单位自动带出，可编辑</td>
<td>&gt;0</td>
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
| OCR识别 | 上传发票影像后识别发票信息 | 详情页 | 已上传发票影像 | 调用invoiceIdentify接口，识别结果回填 |
| 生成凭证号码 | 生成核销凭证号码 | 详情页 | 常显 | 调用generateNoucherNumber接口 |
| 保存 | 保存核销发票上传单 | 详情页 | 新建/编辑状态 | 调用insert/update接口 |
| 导入发票明细 | Excel导入发票详细信息 | 详情页 | 编辑状态 | 调用importLine接口 |
| 校验发票重复 | 检查发票是否重复 | 详情页 | 编辑状态 | 调用checkInvoices接口 |
| 终止 | 终止核销发票上传单 | 详情页 | 非终止状态 | 调用terminate接口 |
| 撤回终止 | 撤回终止状态 | 详情页 | 已终止状态 | 调用undoTerminate接口 |
| 删除 | 删除核销发票上传单 | 详情页 | 新建状态 | 调用delete接口，删除主表及所有子表数据 |
| 导出 | 导出核销发票上传列表 | 列表页 | 常显 | 调用export/homeExport接口 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：发票号码和发票代码不可重复 —— 防止同一张发票重复上传</KbSubTitle>

- 第1点：同一核销发票上传单下，相同发票代码+发票号码的记录不可重复
- 第2点：保存前调用beforeSave方法校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT INVOICE_CODE, INVOICE_NUMBER, COUNT(*) 
    FROM EPM_UPLOAD_INVOICE_INFO 
    WHERE INVOICE_VERIFER_ID = {invoiceVeriferId}
    GROUP BY INVOICE_CODE, INVOICE_NUMBER 
    HAVING COUNT(*) > 1
```

<KbSubTitle>校验2：行金额校验 —— 确保发票明细金额合计与发票总金额一致</KbSubTitle>

- 第1点：校验每张发票的明细行金额合计是否等于发票主要信息中的金额
- 第2点：调用verifyData方法校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT i.INVOICE_CODE, i.INVOICE_NUMBER, i.INVOICE_AMOUNT, 
           NVL(SUM(d.AMOUNT), 0) detail_amount
    FROM EPM_UPLOAD_INVOICE_INFO i
    LEFT JOIN EPM_UPLOAD_INVOICE_DETAILS d ON d.INVOICE_VERIFER_ID = i.INVOICE_VERIFER_ID 
      AND d.INVOICE_CODE = i.INVOICE_CODE AND d.INVOICE_NUMBER = i.INVOICE_NUMBER
    WHERE i.INVOICE_VERIFER_ID = {invoiceVeriferId}
    GROUP BY i.INVOICE_CODE, i.INVOICE_NUMBER, i.INVOICE_AMOUNT
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建NEW] ──提交──> [审批中RUN] ──审批通过──> [已审批APPROVED]
                         │
                         └──审批驳回──> [已中断INTERRUPT]
[任意状态] ──终止──> [已终止]
[已终止] ──撤回终止──> [原状态]
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、提交、删除、终止 |
| RUN | 审批中 | 终止 |
| APPROVED | 审批通过 | 终止 |
| INTERRUPT | 审批驳回 | 终止 |
| TERMINATED | 已终止 | 撤回终止 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_UPLOAD_INVOICE_VERIFER（核销发票上传主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_VERIFER_ID | NUMBER | 核销发票上传ID | - | 自增主键 |
| INVOICE_VERIFER_NO | VARCHAR | 核销单号 | 核销单号 | 按编码规则生成 |
| PROJECT_ID | NUMBER | 项目ID | - | 关联项目 |
| CONTRACT_ID | NUMBER | 合同ID | - | 关联合同 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 关联交易公司 |
| CUSTOMER_ID | NUMBER | 客户ID | - | 关联经销商 |
| IS_HOME | NUMBER | 是否家装 | 是否家装 | 1-工程/2-家装 |
| VERIFER_TYPE | VARCHAR | 核销类型 | 核销类型 | 来源于核销单 |
| AUDIT_STAT | VARCHAR | 审核状态 | - | 审核状态 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审核状态 | NEW/RUN/APPROVED/INTERRUPT |
| HZ_INSTANCE_ID | NUMBER | 审批实例ID | - | 工作流返回 |
| DISCOUNT_POLICY_ID | NUMBER | 折扣政策ID | - | 关联折扣政策 |
| IS_FIRST_PASSED | VARCHAR | 验真通过 | 验真通过 | Y/N |
| IS_SECOND_PASSED | VARCHAR | 二次验真通过 | 二次验真通过 | Y/N |
| WFID | NUMBER | 流程ID | - | 默认0 |
| WFFLAG | NUMBER | 流程标志 | - | 默认0 |
| ORGANIZATION_ID | NUMBER | 组织ID | - | 事业部 |

</KbCard>

<KbCard num="2" title="表2：EPM_UPLOAD_INVOICE_INFO（发票主要信息表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_INFO_ID | NUMBER | 发票信息ID | - | 自增主键 |
| INVOICE_VERIFER_ID | NUMBER | 核销发票上传ID | - | 关联主表 |
| INVOICE_CODE | VARCHAR | 发票代码 | 发票代码 | OCR识别或手工录入 |
| INVOICE_NUMBER | VARCHAR | 发票号码 | 发票号码 | OCR识别或手工录入 |
| INVOICE_DATE | DATE | 开票日期 | 开票日期 | OCR识别或手工录入 |
| INVOICE_AMOUNT | NUMBER | 含税金额 | 发票金额 | OCR识别或手工录入 |
| BUYER_NAME | VARCHAR | 购方名称 | 购方名称 | OCR识别 |
| SELLER_NAME | VARCHAR | 销方名称 | 销方名称 | OCR识别 |
| EFFECT_STATUS | VARCHAR | 有效状态 | 有效状态 | invalid/valid/obsolete |

</KbCard>

<KbCard num="3" title="表3：EPM_UPLOAD_INVOICE_DETAILS（发票详细信息表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_DETAILS_ID | NUMBER | 发票明细ID | - | 自增主键 |
| INVOICE_VERIFER_ID | NUMBER | 核销发票上传ID | - | 关联主表 |
| INVOICE_CODE | VARCHAR | 发票代码 | - | 关联发票主要信息 |
| INVOICE_NUMBER | VARCHAR | 发票号码 | - | 关联发票主要信息 |
| SERVICES_NAME | VARCHAR | 货物或服务名称 | 货物或服务名称 | OCR识别或手工录入 |
| SERVICES_CODE | VARCHAR | 产品编码 | 产品编码 | 手工录入 |
| QUANTITY | NUMBER | 数量 | 数量 | 手工录入 |
| AMOUNT | NUMBER | 金额 | 金额 | 数量×单价 |
| UOM | VARCHAR | 单位 | 单位 | 弹窗选择 |
| TAX_RATE | NUMBER | 税率 | 税率 | 手工录入 |
| TAX | NUMBER | 税额 | 税额 | 金额×税率/100 |
| EFFECT_STATUS | VARCHAR | 有效状态 | - | invalid/valid/obsolete |

</KbCard>

<KbCard num="4" title="表4：EPM_UPLOAD_INVOICE（发票影像表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_VERIFER_ID | NUMBER | 核销发票上传ID | - | 关联主表 |
| ATT_UUID | VARCHAR | 附件UUID | 发票影像文件 | 文件上传后返回 |

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
            <td style="color:#DC2626;font-weight:600;">发票号码重复</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">同一核销单下存在相同发票代码+号码的记录，需删除重复项</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">行金额校验失败</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">发票明细金额合计与发票总金额不一致</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">OCR识别失败</td>
            <td style="font-size:13px;">OCR识别</td>
            <td style="font-size:13px;">OCR服务不可用或影像文件格式不支持</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>发票号码重复</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>同一核销单下存在相同发票代码+号码的记录，需删除重复项</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>行金额校验失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>发票明细金额合计与发票总金额不一致</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>OCR识别失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>OCR服务不可用或影像文件格式不支持</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">OCR识别后发票信息不完整</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>发票影像模糊、格式不规范、OCR服务识别精度限制<br>
      <strong style="color:#7C3AED;">处理：</strong>手工补充修正识别结果，或重新上传清晰影像
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">导入发票明细后金额校验失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>导入数据中金额字段格式错误或与发票总金额不一致<br>
      <strong style="color:#7C3AED;">处理：</strong>检查导入Excel中金额列格式，确保明细金额合计=发票总金额
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
| 2026-07-31 | - | - | 初始生成知识库文档 |
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
