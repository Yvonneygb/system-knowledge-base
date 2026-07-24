<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="家装核销发票上传" desc="家装往来业务说明" />

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
[经销商/内部用户] --> 新建核销发票上传单 --> 选择核销类型(家装项目/经销商/收据)
  --> 选择项目/经销商/交易公司 --> 上传发票影像(凭证附件)
  --> OCR自动识别/手工录入发票主要信息和详细信息
  --> 保存(校验发票重复、明细完整性) --> 提交审批(家装流程:INVOICE_JZHXFPSC_AW)
  --> 审批中 --> 审批通过(发票有效状态更新为valid) --> 可被真实性核销引用
  --> 审批拒绝 --> 可修改后重新提交
```

<KbTip>OCR 自动识别仅在凭证类型为发票或收据时触发,非发票类型不返回详细信息。</KbTip>

</KbCard>
<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 项目管理 | 数据依赖 | 提供家装项目信息(项目编码、名称、地址) | 核销类型为"家装项目"时必选 |
| 经销商管理 | 数据依赖 | 提供经销商信息(编码、名称) | 核销类型为"家装项目"或"收据"时必选 |
| 交易公司/法人 | 数据依赖 | 提供交易公司和开票单位信息 | 选择经销商后可选 |
| OCR识别服务 | 服务依赖 | 识别上传的发票图片，自动填充发票主要信息和详细信息 | 凭证类型为"发票"或"收据"时触发 |
| 编码规则服务 | 配置依赖 | 生成核销单号(家装规则:AE.JZ_INVOICE_VERIFER_NO) | 新建保存时自动生成 |
| 工作流服务 | 服务依赖 | 驱动审批流程(家装流程编码:INVOICE_JZHXFPSC_AW) | 提交审批时调用 |
| 单位基础表(HPFM_UOM) | 数据依赖 | 根据规格型号匹配基本单位 | 保存/导入时自动匹配 |

</KbCard>
<KbCard num="3" title="下游影响">

- 影响1：真实性核销引用
  - 审批通过后，发票数据可被家装真实性核销菜单引用进行核销操作

- 影响2：发票数据占用
  - 发票代码+发票号码被核销后，其他核销单不能再使用同一发票

- 影响3：折扣政策关联
  - 主表记录折扣政策ID/编码/名称，与折扣政策模块产生关联

</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：OCR发票自动识别 OCR识别">

<KbQuote>上传发票凭证附件后，系统自动调用OCR接口识别发票内容，减少手工录入工作量</KbQuote>

**具体逻辑**：

- 仅凭证类型为"发票"或"收据"时，上传凭证附件后自动触发OCR识别
- OCR识别成功后，自动填充发票主要信息(发票代码、号码、开票日期、购买方、销售方、金额)和详细信息(产品名称、规格型号、数量、单价、金额、税率、税额)
- OCR识别的数据标记操作标识为2(OCR识别)，与手工录入(0)和手工修改(1)区分
- OCR识别失败时，前端提示错误信息，用户可点击"重新识别"按钮重试
- 非发票类型(凭证类型=1)不触发OCR识别，也不返回详细信息

</KbCard>

<KbCard num="2" title="重点逻辑2：凭证号码与发票号码关联机制 凭证关联">

<KbQuote>一个凭证号码下可能有多张发票，需要建立凭证与发票的对应关系</KbQuote>

**具体逻辑**：

- 新建发票影像行时，系统自动生成凭证号码(调用编码规则生成)
- 非发票类型(凭证类型=1)时，系统自动为该凭证号码下的主要信息生成子号码(格式：凭证号码-01、凭证号码-02...)，作为发票号码和发票代码
- 发票类型(凭证类型=2)时，发票号码和发票代码由OCR识别或手工录入
- 删除发票影像行时，同步清除该凭证号码关联的主要信息和详细信息
- 变更凭证类型时，重新计算关联的发票号码

</KbCard>

<KbCard num="3" title="重点逻辑3：发票重复校验 防重复">

<KbQuote>确保同一发票不会被重复核销，避免财务数据冲突</KbQuote>

**具体逻辑**：

- 前端在修改发票代码或发票号码时，实时调用后端接口校验该发票是否已被其他核销单使用
- 后端保存前(beforeSave)统一校验所有发票代码+发票号码组合是否重复(同一单内和跨单)
- 导入明细时也会校验凭证号码是否存在于当前发票影像列表中

<KbWarn>同一发票代码 + 发票号码不得被重复核销,跨单由后端 beforeSave 统一校验。</KbWarn>

</KbCard>

<KbCard num="4" title="重点逻辑4：家装与工程共用后端代码 共用代码">

<KbQuote>家装核销发票上传和工程核销发票上传共用同一套后端代码，通过isHome参数区分</KbQuote>

**具体逻辑**：

- 家装标识isHome=2，工程为其他值
- 家装使用编码规则AE.JZ_INVOICE_VERIFER_NO生成核销单号，工程使用AE.INVOICE_VERIFER_NO
- 家装使用工作流编码INVOICE_JZHXFPSC_AW，工程使用INVOICE_WF_UPLOAD_AW
- 家装导出使用homeExport接口，工程使用export接口
- 家装项目LOV查询传参isHome=2，限制只查家装项目

<KbTip>家装 isHome=2,工程为其他值;编码规则 (AE.JZ_INVOICE_VERIFER_NO / AE.INVOICE_VERIFER_NO) 与工作流编码 (INVOICE_JZHXFPSC_AW / INVOICE_WF_UPLOAD_AW) 均不同。</KbTip>

</KbCard>
</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="界面模块1：列表页">

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 审批状态 | EPM_UPLOAD_INVOICE_VERIFER.HZ_APPROVE_STATUS | 下拉选择框 | 单据审批状态 | 常显(查询栏+列表) | 值集HWKF.APPROVE_STATUS | HWKF.APPROVE_STATUS值集；排查SQL：`SELECT * FROM HPFM_VALUE_SET_VL WHERE VALUE_SET_CODE = 'HWKF.APPROVE_STATUS'` |
| 流程状态 | - | 文本框 | 当前流程节点名称 | 常显(列表) | 由工作流返回 | - |
| 核销单号 | EPM_UPLOAD_INVOICE_VERIFER.INVOICE_VERIFER_NO | 文本框 | 系统自动生成的单据编号 | 常显(查询栏+列表) | 点击可跳转详情页 | - |
| 发票上传日期 | EPM_UPLOAD_INVOICE_VERIFER.CREATION_DATE | 日期选择框 | 单据创建日期 | 常显(查询栏+列表) | 日期范围查询 | 日期范围 |
| 项目编码 | EPM_UPLOAD_INVOICE_VERIFER.PROJECT_CODE | 文本框 | 家装项目编码 | 常显(查询栏+列表) | - | - |
| 项目名称 | EPM_UPLOAD_INVOICE_VERIFER.PROJECT_NAME | 文本框 | 家装项目名称 | 常显(查询栏+列表) | - | - |
| 经销商编码 | EPM_UPLOAD_INVOICE_VERIFER.CUSTOMER_CODE | 文本框 | 经销商编码 | 常显(查询栏+列表) | - | - |
| 经销商名称 | EPM_UPLOAD_INVOICE_VERIFER.CUSTOMER_NAME | 文本框 | 经销商名称 | 常显(查询栏+列表) | - | - |
| 交易公司 | EPM_UPLOAD_INVOICE_VERIFER.TRADING_COMPANY_NAME | 文本框 | 交易公司名称 | 常显(查询栏+列表) | - | - |
| 验真通过 | EPM_UPLOAD_INVOICE_VERIFER.IS_FIRST_PASSED | 复选框 | 是否通过一次验真 | 常显(查询栏+列表) | trueValue=2, falseValue=1 | 0-未通过，2-已通过 |
| 二次验真通过 | EPM_UPLOAD_INVOICE_VERIFER.IS_SECOND_PASSED | 复选框 | 是否通过二次验真 | 常显(查询栏+列表) | trueValue=2, falseValue=1 | 0-未通过，2-已通过 |
| 申请人 | EPM_UPLOAD_INVOICE_VERIFER.CREATOR_NAME | 文本框 | 创建人姓名 | 常显(查询栏+列表) | - | - |
| 修改人 | EPM_UPLOAD_INVOICE_VERIFER.UPDATOR_NAME | 文本框 | 最后修改人姓名 | 常显(列表) | - | - |
| 修改时间 | EPM_UPLOAD_INVOICE_VERIFER.LAST_UPDATE_DATE | 日期选择框 | 最后修改时间 | 常显(查询栏+列表) | 日期范围查询 | 日期范围 |

</KbCard>

<KbCard num="2" title="界面模块2：详情页-基础信息">

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 核销单号 | EPM_UPLOAD_INVOICE_VERIFER.INVOICE_VERIFER_NO | 文本框 | 系统自动生成的单据编号 | 常显 | 新建时保存后自动生成，不可编辑 | - |
| 发票上传日期 | EPM_UPLOAD_INVOICE_VERIFER.CREATION_DATE | 文本框 | 单据创建日期 | 常显 | 系统自动赋值，不可编辑 | - |
| 申请人 | EPM_UPLOAD_INVOICE_VERIFER.CREATOR_NAME | 文本框 | 当前登录用户姓名 | 常显 | 默认值=当前登录用户realName，不可编辑 | - |
| 单据状态 | EPM_UPLOAD_INVOICE_VERIFER.HZ_APPROVE_STATUS | 下拉选择框 | 审批状态 | 常显 | 值集HWKF.APPROVE_STATUS，默认值NEW，不可编辑 | HWKF.APPROVE_STATUS值集 |
| 项目编码 | EPM_UPLOAD_INVOICE_VERIFER.PROJECT_CODE | LOV弹窗 | 选择家装项目 | 核销类型=1时显示 | LOV:AE.UPLOAD_WRITE_OFF_INVOICE_PROJECT_VIEW，传参isHome=2和customerId；选择后自动带出项目名称、项目ID、项目地址、交易公司、经销商信息 | 当前用户有权限的家装项目；排查SQL：`SELECT * FROM EPM_PROJECT WHERE IS_HOME = 2` |
| 项目名称 | EPM_UPLOAD_INVOICE_VERIFER.PROJECT_NAME | 文本框 | 项目名称 | 核销类型=1时显示 | 由项目LOV自动带出，不可编辑 | - |
| 经销商编码 | EPM_UPLOAD_INVOICE_VERIFER.CUSTOMER_CODE | LOV弹窗 | 选择经销商 | 核销类型=1或3时显示 | LOV:BASIC_CUSTOM_ORG_LOV_2，传参searchFlag=142；经销商登录时自动填充且不可编辑；选择后自动带出经销商名称、清空交易公司和开票单位 | 生效的经销商；排查SQL：`SELECT * FROM BASIC_CUSTOMER WHERE SEARCH_FLAG = 142` |
| 经销商名称 | EPM_UPLOAD_INVOICE_VERIFER.CUSTOMER_NAME | 文本框 | 经销商名称 | 核销类型=1或3时显示 | 由经销商LOV自动带出，不可编辑 | - |
| 核销类型 | EPM_UPLOAD_INVOICE_VERIFER.VERIFER_TYPE | 下拉选择框 | 核销业务类型 | 核销类型=1或3时显示 | 值集AE.VERIFER_TYPE，必填；变更时清空项目、经销商、交易公司、开票单位等关联字段 | AE.VERIFER_TYPE值集；排查SQL：`SELECT * FROM HPFM_VALUE_SET_VL WHERE VALUE_SET_CODE = 'AE.VERIFER_TYPE'` |
| 交易公司 | EPM_UPLOAD_INVOICE_VERIFER.TRADING_COMPANY_NAME | LOV弹窗 | 选择交易公司 | 核销类型=1或3时显示 | LOV:TRADING_LEGAL_SQL_V，传参customerId和isHome=2；核销类型=3时才可编辑；选择后自动带出开票单位(法人的legalEntity) | 经销商关联的交易公司；排查SQL：`SELECT * FROM EPM_TRADING_COMPANY WHERE CUSTOMER_ID = ? AND IS_HOME = 2` |
| 开票单位 | EPM_UPLOAD_INVOICE_VERIFER.BILLING_UNIT_NAME | 文本框 | 开票单位名称 | 核销类型=3时显示 | 由交易公司LOV自动带出(取法人的legalEntityName)，不可编辑 | - |
| 备注 | EPM_UPLOAD_INVOICE_VERIFER.REMARK | 多行文本框 | 备注信息 | 核销类型=1或3时显示 | 可编辑 | - |

</KbCard>

<KbCard num="3" title="界面模块3：详情页-发票影像信息">

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 凭证类型 | EPM_UPLOAD_INVOICE.VERIFY_VOUCHER_TYPE | 下拉选择框 | 凭证类型：1-非发票、2-发票、3-收据 | 常显 | 值集AE.EPM.VERIFY_VOUCHER_TYPE，必填；变更时触发发票号码重新计算 | AE.EPM.VERIFY_VOUCHER_TYPE值集：1-非发票、2-发票、3-收据 |
| 凭证号码 | EPM_UPLOAD_INVOICE.NOUCHER_NUMBER | 文本框 | 系统生成的凭证号码 | 常显 | 新建行时自动生成(调用generate-invoice接口)，不可编辑 | - |
| 凭证附件 | EPM_UPLOAD_INVOICE.DOCNAME | 文件上传 | 发票凭证图片/PDF | 常显 | 必填；上传后自动触发OCR识别(凭证类型=2或3时)；支持上传/下载/预览/删除 | 图片/PDF文件 |
| 清单附件 | EPM_UPLOAD_INVOICE.DOC_NAME | 文件上传 | 发票清单附件 | 常显 | 非必填；仅支持pdf和jpg格式；支持上传/下载/预览/删除 | 仅pdf和jpg格式 |
| 备注 | EPM_UPLOAD_INVOICE.INVOICE_NOTE | 文本框 | 发票影像备注 | 常显 | 可编辑 | - |

</KbCard>

<KbCard num="4" title="界面模块4：详情页-发票主要信息">

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 有效状态 | EPM_UPLOAD_INVOICE_INFO.EFFECT_STATUS | 下拉选择框 | 发票有效状态 | 常显 | 值集AE.INVOICEEFFECTSTATUS | AE.INVOICEEFFECTSTATUS值集：invalid-未生效、valid-已生效、obsolete-已作废 |
| 操作标识 | EPM_UPLOAD_INVOICE_INFO.OPERATION_FLAG | 下拉选择框 | 0-手工添加/1-手工修改/2-OCR识别 | 常显 | 值集AE.OPERATION_FLAG，默认值0 | AE.OPERATION_FLAG值集：0-手工添加、1-手工修改、2-OCR识别 |
| 凭证号码 | EPM_UPLOAD_INVOICE_INFO.NOUCHER_NUMBER | 下拉选择框 | 关联发票影像的凭证号码 | 常显 | 必填；下拉选项来自发票影像信息的凭证号码列表 | 当前发票影像行已有的凭证号码 |
| 发票代码 | EPM_UPLOAD_INVOICE_INFO.INVOICE_CODE | 文本框 | 发票代码 | 常显 | 必填；修改时触发发票重复校验 | - |
| 发票号码 | EPM_UPLOAD_INVOICE_INFO.INVOICE_NUMBER | 文本框 | 发票号码 | 常显 | 必填；修改时触发发票重复校验 | - |
| 开票日期 | EPM_UPLOAD_INVOICE_INFO.INVOICE_DATE | 日期选择框 | 发票开票日期 | 常显 | 可编辑 | 日期 |
| 购买方名称 | EPM_UPLOAD_INVOICE_INFO.BUYER_NAME | 文本框 | 发票购买方名称 | 常显 | 可编辑 | - |
| 销售方名称 | EPM_UPLOAD_INVOICE_INFO.SELLER_NAME | 文本框 | 发票销售方名称 | 常显 | 可编辑 | - |
| 购买方联系电话 | EPM_UPLOAD_INVOICE_INFO.BUYER_MOB | 文本框 | 购买方联系电话 | 常显 | 可编辑 | - |
| 楼号 | EPM_UPLOAD_INVOICE_INFO.BUILDING_NUMBER | 文本框 | 购买方楼号 | 常显 | 可编辑 | - |
| 总额 | EPM_UPLOAD_INVOICE_INFO.ALL_AMOUNT | 金额输入框 | 发票金额(不含税额) | 常显 | 可编辑；列表底部显示合计 | 金额，精度2位 |
| 作废发票操作人 | EPM_UPLOAD_INVOICE_INFO.OBSOLETE_OPERATOR | 文本框 | 作废发票的操作人 | 常显 | 系统自动赋值 | - |
| 作废时间 | EPM_UPLOAD_INVOICE_INFO.OBSOLETE_TIME | 文本框 | 发票作废时间 | 常显 | 系统自动赋值 | - |

</KbCard>

<KbCard num="5" title="界面模块5：详情页-发票详细信息">

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 有效状态 | EPM_UPLOAD_INVOICE_DETAILS.EFFECT_STATUS | 下拉选择框 | 发票明细有效状态 | 常显 | 值集AE.INVOICEEFFECTSTATUS | AE.INVOICEEFFECTSTATUS值集：invalid-未生效、valid-已生效、canceled-已取消 |
| 操作标识 | EPM_UPLOAD_INVOICE_DETAILS.OPERATION_FLAG | 下拉选择框 | 0-手工添加/1-手工修改/2-OCR识别 | 常显 | 值集AE.OPERATION_FLAG，默认值0 | AE.OPERATION_FLAG值集：0-手工添加、1-手工修改、2-OCR识别 |
| 凭证号码 | EPM_UPLOAD_INVOICE_DETAILS.NOUCHER_NUMBER | 下拉选择框 | 关联发票影像的凭证号码 | 常显 | 必填；下拉选项来自发票影像信息的凭证号码列表 | 当前发票影像行已有的凭证号码 |
| 发票代码 | EPM_UPLOAD_INVOICE_DETAILS.INVOICE_CODE | 文本框 | 发票代码 | 常显 | 修改时校验是否存在于主要信息中 | - |
| 发票号码 | EPM_UPLOAD_INVOICE_DETAILS.INVOICE_NUMBER | 文本框 | 发票号码 | 常显 | 必填；修改时校验是否存在于主要信息中 | - |
| 产品名称 | EPM_UPLOAD_INVOICE_DETAILS.SERVICES_NAME | 文本框 | 货物或服务名称 | 常显 | 可编辑 | - |
| 产品编码 | EPM_UPLOAD_INVOICE_DETAILS.SERVICES_CODE | 文本框 | 产品编码 | 常显 | 可编辑 | - |
| 规格型号 | EPM_UPLOAD_INVOICE_DETAILS.SPEC_MODEL | 文本框 | 规格型号 | 常显 | 必填；修改时自动匹配基本单位 | - |
| 发票数量 | EPM_UPLOAD_INVOICE_DETAILS.MDF_ITEM_NUMBER | 数字输入框 | 发票上的数量 | 常显 | 必填，最小值0；修改时自动计算：可核销数量=发票数量×转换率(保留3位小数)、剩余可核销数量=发票数量×转换率(保留3位小数)、基本单位数量=发票数量×转换率(保留3位小数) | 正数 |
| 转换率 | EPM_UPLOAD_INVOICE_DETAILS.CONVERSION_RATE | 数字输入框 | 发票数量到基本单位的转换率 | 常显 | 必填，精度5位，最小值0；组织ID不在[104,105,106]范围时默认值1；修改时自动计算：可核销数量=发票数量×转换率(保留3位小数)、剩余可核销数量=发票数量×转换率(保留3位小数)、基本单位数量=发票数量×转换率(保留3位小数) | 正数，精度5位 |
| 基本单位 | EPM_UPLOAD_INVOICE_DETAILS.BASE_UOM_NAME | LOV弹窗 | 基本计量单位 | 常显 | 必填；LOV:AE.BASE_UNIT_VIEW；规格型号修改时自动匹配 | AE.BASE_UNIT_VIEW值集 |
| 基本单位数量 | EPM_UPLOAD_INVOICE_DETAILS.BASE_UOM_NUMBER | 数字输入框 | 基本单位下的数量 | 常显 | 自动计算=发票数量×转换率(保留3位小数)，默认值0 | - |
| 可核销数量 | EPM_UPLOAD_INVOICE_DETAILS.CAN_CHECK_NUMBER | 数字输入框 | 可用于核销的数量 | 常显 | 自动计算=发票数量×转换率(保留3位小数)，默认值0 | - |
| 剩余可核销数量 | EPM_UPLOAD_INVOICE_DETAILS.UNAPPLIE_QUANTITY | 数字输入框 | 剩余可核销的数量 | 常显 | 自动计算=发票数量×转换率(保留3位小数)，默认值0 | - |
| 发票单位 | EPM_UPLOAD_INVOICE_DETAILS.UOM | 文本框 | 发票上的计量单位 | 常显 | 可编辑 | - |
| 单价 | EPM_UPLOAD_INVOICE_DETAILS.UNIT_PRICE | 数字输入框 | 产品单价 | 常显 | 必填，最小值0；修改时自动计算：税额=金额×税率/100(保留3位小数) | 正数 |
| 金额 | EPM_UPLOAD_INVOICE_DETAILS.AMOUNT | 数字输入框 | 金额 | 常显 | 精度2位，最小值0；修改时自动计算：税额=金额×税率/100(保留3位小数) | 正数，精度2位 |
| 税率(%) | EPM_UPLOAD_INVOICE_DETAILS.TAX_RATE | 数字输入框 | 税率百分比 | 常显 | 最小值0；修改时自动计算：税额=金额×税率/100(保留3位小数) | 0-100 |
| 税额 | EPM_UPLOAD_INVOICE_DETAILS.TAX | 数字输入框 | 税额 | 常显 | 自动计算=金额×税率/100(保留3位小数) | - |

</KbCard>

<KbCard num="6" title="界面模块6：异动记录">

| 字段名 | 数据库列名 | 组件 | 业务释义 | 显隐条件 | 取值/赋值逻辑 | 合法值 |
|-------|-----------|------|---------|---------|-------------|-------|
| 用户名称 | INVOICE_TRUTH_CANCEL_RECORD.CREATED_NAME | 文本框 | 操作人姓名 | 常显 | 系统自动赋值，不可编辑 | - |
| 操作 | INVOICE_TRUTH_CANCEL_RECORD.HANDLE_TYPE | 文本框 | 操作类型(终止/撤销终止) | 常显 | 系统自动赋值，不可编辑 | disEnable-终止、enable-撤销终止 |
| 流程id | INVOICE_TRUTH_CANCEL_RECORD.WF_ID | 文本框 | 关联的工作流实例ID | 常显 | 系统自动赋值，不可编辑 | - |
| 操作时间 | INVOICE_TRUTH_CANCEL_RECORD.LAST_UPD | 文本框 | 操作时间 | 常显 | 系统自动赋值，不可编辑 | - |
| 操作原因 | INVOICE_TRUTH_CANCEL_RECORD.REASON | 文本框 | 操作原因 | 常显 | 用户填写，不可编辑 | - |

</KbCard>

<KbCard num="7" title="选择弹窗">

<KbSubTitle>弹窗1：项目选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| isHome | 是否家装 | 2表示家装 | 2 |

**数据范围**

```sql
`SELECT * FROM EPM_PROJECT WHERE IS_HOME = 2`；若传了customerId则追加过滤：`AND PROJECT_ID IN (SELECT PROJECT_ID FROM EPM_PROJECT_CUSTOMER WHERE CUSTOMER_ID = #{customerId})`；同时查询AE.STAT值集翻译项目状态名称
```

<KbSubTitle>弹窗2：经销商选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| searchFlag | 搜索标识 | 142表示核销发票上传场景 | 142 |

**数据范围**

```sql
SELECT * FROM BASIC_CUSTOMER WHERE SEARCH_FLAG = 142 AND ENABLED_FLAG = 'Y'
```

<KbSubTitle>弹窗3：交易公司选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| customerId | 经销商ID | 当前选中的经销商ID | 100001 |
| isHome | 是否家装 | 2表示家装 | 2 |

**数据范围**

```sql
SELECT * FROM EPM_TRADING_COMPANY WHERE CUSTOMER_ID = #{customerId} AND IS_HOME = 2
```

<KbSubTitle>弹窗4：基本单位选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**数据范围**

```sql
SELECT * FROM HPFM_UOM WHERE ENABLED_FLAG = 'Y'
```

```sql
SELECT * FROM HPFM_UOM WHERE ENABLED_FLAG = 'Y'
```

</KbCard>

<KbCard num="8" title="导入">

<KbSubTitle title="前置约定" />

- 模板文件：发票上传导入模板.xlsx
- 格式：Excel
- 前置条件：必须先维护发票影像信息

<KbSubTitle title="字段映射" />

| 字段含义 | 是否必输 | 字段格式 | 重复判定字段 |
|---------|---------|---------|------------|
| 凭证号码 | 是 | 文本 | 凭证号码+序号 |
| 发票代码 | 是 | 文本 | - |
| 发票号码 | 是 | 文本 | - |
| 开票日期 | 否 | 日期 | - |
| 购买方名称 | 否 | 文本 | - |
| 销售方名称 | 否 | 文本 | - |
| 购买方联系电话 | 否 | 文本 | - |
| 楼号 | 否 | 文本 | - |
| 产品名称 | 否 | 文本 | - |
| 产品编码 | 否 | 文本 | - |
| 规格型号 | 是 | 文本 | - |
| 发票数量 | 是 | 正整数 | - |
| 单位 | 否 | 文本 | - |
| 单价 | 是 | 数字 | - |
| 金额 | 否 | 数字 | - |
| 税率(%) | 否 | 数字(0-100) | - |
| 税额 | 否 | 数字 | - |
| 主要信息序号 | 否 | 数字 | - |
| 明细信息序号 | 否 | 数字 | - |
| 转换率 | 是 | 数字 | - |
| 基本单位 | 否 | 文本 | - |

<KbSubTitle title="处理逻辑" />

- **校验逻辑**：凭证号码必须在发票影像列表中存在；发票号码、发票代码、发票数量、单价、转换率、规格型号不可为空；发票数量必须大于0；税率范围0-100
- **导入逻辑**：根据凭证号码匹配凭证类型；发票类型(凭证类型=2)按凭证号码+发票号码+发票代码匹配主要信息；非发票类型按凭证号码匹配主要信息；存在则覆盖(OCR数据修改操作标识为1)，不存在则新增
- **重复处理策略**：覆盖(匹配到已有数据时覆盖更新)
- **性能方案**：同步处理

<KbSubTitle title="异常与结果约定" />

- 存在校验错误时，收集所有错误信息返回前端展示，导入不成功
- 部分行错误时，正确行也不入库

<KbSubTitle title="运维保障" />

- 日志记录：后端LOGGER记录导入过程
- 断点续传/重试机制：不支持

</KbCard>

<KbCard num="9" title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 新建 | 新建核销发票上传单 | 列表页 | 常显 | 跳转到详情页新建模式 |
| 导出 | 导出家装核销发票上传列表 | 列表页 | 常显 | 调用home-export接口导出Excel |
| 查看 | 查看核销发票上传详情 | 列表页(行操作) | 常显 | 跳转到详情页查看模式 |
| 删除 | 删除核销发票上传单 | 列表页(行操作) | 审批状态非RUN/APPROVED/SUSPEND/RETURN时显示 | 调用delete接口删除主表及所有子表数据 |
| 保存 | 保存当前编辑数据 | 详情页 | 非审批中/审批通过/暂停/退回状态 | 调用insert或update接口保存 |
| 保存并提交 | 保存并提交审批 | 详情页 | 非审批中/审批通过/暂停/退回状态 | 先保存再调用workflow/proc-submit提交审批 |
| 关闭 | 返回列表页 | 详情页 | 常显 | 返回列表页 |
| 刷新 | 刷新详情页数据 | 详情页 | 常显 | 重新查询详情数据 |
| 新建(详情) | 新建另一张核销发票上传单 | 详情页 | 常显 | 跳转到新建详情页 |
| 删除(详情) | 删除当前核销发票上传单 | 详情页 | 非审批中/审批通过/暂停/退回状态 | 调用delete接口 |
| 编辑 | 进入编辑模式 | 详情页 | 非审批中/审批通过/暂停/退回状态 | 切换为可编辑状态 |
| 取消编辑 | 退出编辑模式 | 详情页 | 编辑状态下 | 切换为只读状态 |
| 新建(发票影像行) | 新增一行发票影像 | 详情页-发票影像 | 编辑状态下 | 自动生成凭证号码 |
| 删除(发票影像行) | 删除选中的发票影像行 | 详情页-发票影像 | 编辑状态下 | 同步删除关联的主要信息和详细信息 |
| 重新识别 | 重新OCR识别发票 | 详情页-发票影像 | OCR识别失败(orcStatus=P)且凭证类型=2或3且编辑状态 | 重新调用OCR识别接口 |
| 新建(主要信息行) | 新增一行发票主要信息 | 详情页-发票主要信息 | 编辑状态下，且发票影像已选择凭证类型和上传附件 | 默认isOcr=0, operationFlag=0 |
| 删除(主要信息行) | 删除选中的主要信息行 | 详情页-发票主要信息 | 编辑状态下 | 同步删除关联的详细信息 |
| 明细导入 | 导入发票详细信息 | 详情页-发票详细信息 | 编辑状态下 | 调用import-upload-invoice-info接口 |
| 模板下载 | 下载导入模板 | 详情页-发票详细信息 | 编辑状态下 | 下载"发票上传导入模板.xlsx" |
| 新建(详细信息行) | 新增一行发票详细信息 | 详情页-发票详细信息 | 编辑状态下 | 默认isOcr=0, operationFlag=0 |
| 删除(详细信息行) | 删除选中的详细信息行 | 详情页-发票详细信息 | 编辑状态下 | - |
| 全部清空 | 清空所有详细信息 | 详情页-发票详细信息 | 编辑状态下 | 清空详细信息表格 |

</KbCard>

<KbCard num="10" title="保存校验">

<KbSubTitle title="明细行基本单位不能为空 —— 确保每条发票详细信息都有基本单位" />

- 遍历发票详细信息所有行，检查baseUomName是否为空

<KbTip>toast错误提醒&quot;明细行基本单位不能为空！&quot;</KbTip>

```sql
SELECT * FROM EPM_UPLOAD_INVOICE_DETAILS D
    WHERE D.INVOICE_VERIFER_ID = ? AND (D.BASE_UOM_NAME IS NULL OR D.BASE_UOM_NAME = '')
```

<KbSubTitle title="详细信息必须存在于主要信息中 —— 确保每条详细信息的凭证号码+发票代码+发票号码在主要信息中有对应记录" />

- 构建主要信息的凭证号码+发票代码+发票号码组合集合

<KbTip>toast错误提醒&quot;明细第X、Y行，未存在头信息，请检查！&quot;</KbTip>

```sql
SELECT D.NOUCHER_NUMBER, D.INVOICE_CODE, D.INVOICE_NUMBER
    FROM EPM_UPLOAD_INVOICE_DETAILS D
    WHERE D.INVOICE_VERIFER_ID = ?
    AND NOT EXISTS (
      SELECT 1 FROM EPM_UPLOAD_INVOICE_INFO I
      WHERE I.INVOICE_VERIFER_ID = D.INVOICE_VERIFER_ID
      AND I.NOUCHER_NUMBER = D.NOUCHER_NUMBER
      AND I.INVOICE_CODE = D.INVOICE_CODE
      AND I.INVOICE_NUMBER = D.INVOICE_NUMBER
    )
```

<KbSubTitle title="详细信息转换率不能为0 —— 确保转换率有效" />

- 遍历详细信息所有行，检查conversionRate是否为空或小于等于0

<KbTip>toast错误提醒&quot;发票详细信息中第X行转换率不能为0&quot;</KbTip>

```sql
SELECT * FROM EPM_UPLOAD_INVOICE_DETAILS
    WHERE INVOICE_VERIFER_ID = ? AND (CONVERSION_RATE IS NULL OR CONVERSION_RATE <= 0)
```

<KbSubTitle title="发票重复校验(后端beforeSave) —— 确保发票代码+发票号码不重复" />

- 遍历主要信息，检查同一单内发票代码+发票号码是否重复

<KbTip>阻断性报错&quot;发票主要明细校验异常:xxx&quot;或&quot;发票详细明细校验异常:xxx&quot;</KbTip>

```sql
SELECT INVOICE_CODE, INVOICE_NUMBER, COUNT(*)
    FROM EPM_UPLOAD_INVOICE_INFO
    WHERE INVOICE_VERIFER_ID = ?
    GROUP BY INVOICE_CODE, INVOICE_NUMBER
    HAVING COUNT(*) > 1
```

<KbWarn>所有保存校验均在前端 toast 提示或后端阻断性报错,任一校验失败将阻断操作。</KbWarn>

</KbCard>

<KbCard num="11" title="提交校验">

<KbSubTitle title="非发票类型主要信息只能存在一行 —— 确保非发票类型凭证号码下只有一条主要信息" />

- 收集凭证类型为1(非发票)的凭证号码集合

<KbTip>toast错误提醒&quot;非发票类型主要信息以下行：第X行主要信息只能存在一行&quot;</KbTip>

```sql
SELECT I.NOUCHER_NUMBER, COUNT(*)
    FROM EPM_UPLOAD_INVOICE_INFO I
    JOIN EPM_UPLOAD_INVOICE U ON U.NOUCHER_NUMBER = I.NOUCHER_NUMBER AND U.INVOICE_VERIFER_ID = I.INVOICE_VERIFER_ID
    WHERE I.INVOICE_VERIFER_ID = ? AND U.VERIFY_VOUCHER_TYPE = 1
    GROUP BY I.NOUCHER_NUMBER
    HAVING COUNT(*) > 1
```

<KbSubTitle title="发票类型发票号码或发票代码不能为空 —— 确保发票类型的主要信息和详细信息都有完整的发票标识" />

- 遍历主要信息，非非发票类型的记录，发票号码或发票代码为空的行号收集

<KbTip>toast错误提醒&quot;发票类型主要信息的以下行：第X行发票号码或发票代码不能为空&quot;</KbTip>

```sql
SELECT * FROM EPM_UPLOAD_INVOICE_INFO
    WHERE INVOICE_VERIFER_ID = ? AND (INVOICE_NUMBER IS NULL OR INVOICE_CODE IS NULL)
```

<KbSubTitle title="详细信息转换率不能为0 —— 同保存校验" />

- 遍历详细信息所有行，检查conversionRate是否为空或小于等于0

<KbTip>toast错误提醒&quot;第X行转换率不能为0&quot;</KbTip>

```sql
SELECT * FROM EPM_UPLOAD_INVOICE_DETAILS
    WHERE INVOICE_VERIFER_ID = ? AND (CONVERSION_RATE IS NULL OR CONVERSION_RATE <= 0)
```

<KbSubTitle title="后端金额校验(verifyData) —— 确保详细信息行金额与主要信息总额一致" />

- 校验详细信息每行：单价×数量是否等于金额(允许0.01元差异)

<KbTip>阻断性报错&quot;发票号码[xxx],详情行计算金额[xxx]有误&quot;或&quot;发票号码[xxx],详情信息行汇总金额与主要总金额不一致&quot;</KbTip>

```sql
SELECT I.INVOICE_NUMBER, I.ALL_AMOUNT,
      SUM(D.UNIT_PRICE * D.MDF_ITEM_NUMBER) AS DETAIL_SUM
    FROM EPM_UPLOAD_INVOICE_INFO I
    LEFT JOIN EPM_UPLOAD_INVOICE_DETAILS D ON D.INVOICE_VERIFER_ID = I.INVOICE_VERIFER_ID
      AND D.INVOICE_NUMBER = I.INVOICE_NUMBER
    WHERE I.INVOICE_VERIFER_ID = ?
    GROUP BY I.INVOICE_NUMBER, I.ALL_AMOUNT
```

<KbSubTitle title="发票主要信息和详细信息不能为空(后端wfProcSubmit) —— 确保提交时至少有一条主要信息和详细信息" />

- 查询该核销单的主要信息列表，为空则报错

<KbTip>阻断性报错&quot;单据[xxx],发票主要信息不能为空&quot;或&quot;单据[xxx],发票详细信息不能为空&quot;</KbTip>

```sql
SELECT COUNT(*) FROM EPM_UPLOAD_INVOICE_INFO WHERE INVOICE_VERIFER_ID = ?;
    SELECT COUNT(*) FROM EPM_UPLOAD_INVOICE_DETAILS WHERE INVOICE_VERIFER_ID = ?;
```

<KbWarn>提交校验包含后端金额一致性校验,主要信息总额必须等于详细信息行金额汇总。</KbWarn>

</KbCard>

<KbCard num="12" title="状态机">

<KbSubTitle title="状态机流转图" />

```text
[NEW 新建] --保存--> [NEW 新建]
[NEW 新建] --保存并提交--> [RUN 审批中]
[RUN 审批中] --审批通过--> [APPROVED 审批通过]
[RUN 审批中] --审批拒绝--> [REJECTED 审批拒绝]
[RUN 审批中] --撤回--> [WITHDRAW 已撤回]
[RUN 审批中] --终止--> [INTERRUPT 终止]
[INTERRUPT 终止] --撤销终止--> [原状态]
[REJECTED 审批拒绝] --修改后重新提交--> [RUN 审批中]
[WITHDRAW 已撤回] --修改后重新提交--> [RUN 审批中]
```

<KbSubTitle title="状态机列表" />

| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、编辑、删除、保存并提交 |
| RUN | 审批中 | 查看 |
| APPROVED | 审批通过 | 查看 |
| REJECTED | 审批拒绝 | 查看、编辑、保存并提交 |
| WITHDRAW | 已撤回 | 查看、编辑、保存并提交 |
| INTERRUPT | 终止 | 查看、撤销终止 |
| SUSPEND | 暂停 | 查看 |
| RETURN | 退回 | 查看 |

---

<KbTip>新建后默认 NEW 状态;只有 NEW / REJECTED / WITHDRAW 三种状态可执行"保存并提交"。</KbTip>

</KbCard>

<KbCard num="1" title="表1：EPM_UPLOAD_INVOICE_VERIFER（核销发票上传主表）" :hover="false">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_VERIFER_ID | BIGINT | 核销发票上传id/主键 | - | 自增主键 |
| INVOICE_VERIFER_NO | VARCHAR | 核销单号 | 核销单号 | 家装编码规则AE.JZ_INVOICE_VERIFER_NO自动生成 |
| PROJECT_ID | BIGINT | 工程id | 项目编码(LOV) | 由项目LOV选择带入 |
| PROJECT_NAME | VARCHAR | 工程名称 | 项目名称 | 由项目LOV选择带入 |
| PROJECT_CODE | VARCHAR | 工程编码 | 项目编码 | 由项目LOV选择带入 |
| CONTRACT_ID | BIGINT | 合同id | - | 由经销商LOV选择带入 |
| CONTRACT_NAME | VARCHAR | 合同名称 | - | - |
| CONTRACT_CODE | VARCHAR | 合同编码 | - | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | 交易公司(LOV) | 由交易公司LOV选择带入 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 由交易公司LOV选择带入 |
| BILLING_UNIT_ID | BIGINT | 开票单位客户ID | 开票单位 | 由交易公司LOV选择带入(取法人的legalEntityId) |
| BILLING_UNIT_NAME | VARCHAR | 开票单位名称 | 开票单位 | 由交易公司LOV选择带入(取法人的legalEntityName) |
| IS_FIRST_PASSED | INTEGER | 验真通过 | 验真通过 | 0-未通过，2-已通过 |
| IS_SECOND_PASSED | INTEGER | 二次验真通过 | 二次验真通过 | 0-未通过，2-已通过 |
| CREATE_TIME | DATETIME | 制单时间/发票上传时间 | 发票上传日期 | 系统自动赋值 |
| CREATOR | VARCHAR | 创建人 | - | 系统自动赋值 |
| UPDATE_TIME | DATETIME | 更新时间 | - | 系统自动赋值 |
| UPDATOR | VARCHAR | 更新人 | - | 系统自动赋值 |
| WFID | BIGINT | 流程id | - | 提交审批时由工作流返回 |
| WFFLAG | INTEGER | 流程标识 | - | - |
| STAT | INTEGER | 单据状态(已弃用) | - | 使用HZ_APPROVE_STATUS字段 |
| CUSTOMER_ID | BIGINT | 经销商id | 经销商编码(LOV) | 由经销商LOV选择带入；经销商登录时自动填充 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销商编码 | 由经销商LOV选择带入 |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | 经销商名称 | 由经销商LOV选择带入 |
| ORGANIZATION_ID | BIGINT | 组织id | - | 取当前用户additionInfo.DEPT |
| CREATOR_NAME | VARCHAR | 创建人姓名 | 申请人 | 默认值=当前登录用户realName |
| UPDATOR_NAME | VARCHAR | 更新人姓名 | - | 更新时赋值当前登录用户realName |
| IS_HOME | INTEGER | 是否为家装 | - | 家装=2，工程=其他值 |
| DISCOUNT_POLICY_ID | BIGINT | 折扣政策id | - | - |
| DISCOUNT_POLICY_CODE | VARCHAR | 折扣政策编码 | - | - |
| DISCOUNT_POLICY_NAME | VARCHAR | 折扣政策名称 | - | - |
| VERIFER_TYPE | INTEGER | 核销类型 | 核销类型 | 值集AE.VERIFER_TYPE |
| AUDIT_STAT | VARCHAR | 审核状态 | - | 新建时默认"新建" |
| REMARK | VARCHAR | 备注 | 备注 | 用户填写 |
| HZ_INSTANCE_ID | BIGINT | H0流程实例id | - | 提交审批时由工作流返回 |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 | 单据状态 | 值集HWKF.APPROVE_STATUS，默认值NEW |

</KbCard>

<KbCard num="2" title="表2：EPM_UPLOAD_INVOICE（发票影像信息表）" :hover="false">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PK_ID | BIGINT | 主键 | - | 自增主键 |
| INVOICE_ID | BIGINT | 发票id/附件id | - | - |
| INVOICE_VERIFER_ID | BIGINT | 主表id/核销发票上传id | - | 关联EPM_UPLOAD_INVOICE_VERIFER.INVOICE_VERIFER_ID |
| DOCID | BIGINT | 发票id/附件id | - | 凭证附件ID |
| INVOICE_NOTE | VARCHAR | 发票备注 | 备注 | 用户填写 |
| DOCNAME | VARCHAR | 附件名称 | 凭证附件 | 凭证附件文件名 |
| VERIFY_VOUCHER_TYPE | BIGINT | 核销凭证类型 | 凭证类型 | 1-非发票/2-发票/3-收据，值集AE.EPM.VERIFY_VOUCHER_TYPE |
| MSG | VARCHAR | 接口返回信息 | - | OCR识别返回信息，ok表示成功 |
| CODE | VARCHAR | OCR返回码 | - | 0表示成功 |
| NOUCHER_NUMBER | VARCHAR | 凭证号码 | 凭证号码 | 自动生成 |
| DOC_ID | BIGINT | 清单附件id | - | 清单附件ID |
| DOC_NAME | VARCHAR | 清单附件名称 | 清单附件 | 清单附件文件名 |
| SEND_STAT | BIGINT | 推送状态 | - | 2-已推送/1-未推送 |
| VOUCHER_ATT_UUID | VARCHAR | 凭证附件UUID | - | 同HZERO.HFLE_FILE.ATTACHMENT_UUID |
| LIST_ATT_UUID | VARCHAR | 清单附件UUID | - | 同HZERO.HFLE_FILE.ATTACHMENT_UUID |

</KbCard>

<KbCard num="3" title="表3：EPM_UPLOAD_INVOICE_INFO（发票主要信息表）" :hover="false">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PK_ID | BIGINT | 主键 | - | 自增主键 |
| INVOICE_INFO_ID | BIGINT | 主要信息id | - | - |
| INVOICE_VERIFER_ID | BIGINT | 主表id/核销上传id | - | 关联EPM_UPLOAD_INVOICE_VERIFER.INVOICE_VERIFER_ID |
| INVOICE_CODE | VARCHAR | 发票代码 | 发票代码 | 必填 |
| INVOICE_NUMBER | VARCHAR | 发票号码 | 发票号码 | 必填 |
| INVOICE_DATE | DATETIME | 开票日期 | 开票日期 | - |
| BUYER_NAME | VARCHAR | 购买方名称 | 购买方名称 | - |
| SELLER_NAME | VARCHAR | 销售方名称 | 销售方名称 | - |
| IS_OCR | BIGINT | 是否OCR回传数据 | - | 2-是 |
| OPERATION_FLAG | BIGINT | 操作标识 | 操作标识 | 0-手工添加/1-手工修改/2-OCR识别 |
| BF_INVOICE_CODE | VARCHAR | OCR原始发票代码 | - | OCR识别时的原始值 |
| BF_INVOICE_NUMBER | VARCHAR | OCR原始发票号码 | - | OCR识别时的原始值 |
| BF_INVOICE_DATE | DATE | OCR原始开票日期 | - | OCR识别时的原始值 |
| BF_BUYER_NAME | VARCHAR | OCR原始购买方名称 | - | OCR识别时的原始值 |
| BF_SELLER_NAME | VARCHAR | OCR原始销售方名称 | - | OCR识别时的原始值 |
| BUILDING_NUMBER | VARCHAR | 购买方楼号 | 楼号 | - |
| BF_BUILDING_NUMBER | VARCHAR | OCR原始楼号 | - | OCR识别时的原始值 |
| BUYER_MOB | VARCHAR | 购买方联系电话 | 购买方联系电话 | - |
| BF_BUYER_MOB | VARCHAR | OCR原始联系电话 | - | OCR识别时的原始值 |
| NOUCHER_NUMBER | VARCHAR | 凭证号码 | 凭证号码 | 关联EPM_UPLOAD_INVOICE.NOUCHER_NUMBER |
| ALL_AMOUNT | VARCHAR | 发票金额(不含税额) | 总额 | - |
| EFFECT_STATUS | VARCHAR | 有效状态 | 有效状态 | invalid-未生效/valid-已生效/obsolete-已作废 |
| OBSOLETE_OPERATOR | VARCHAR | 作废发票操作人 | 作废发票操作人 | - |
| OBSOLETE_TIME | DATETIME | 作废发票操作时间 | 作废时间 | - |
| OBSOLETE_OPERATOR_BY | BIGINT | 作废发票操作人ID | - | - |

</KbCard>

<KbCard num="4" title="表4：EPM_UPLOAD_INVOICE_DETAILS（发票详细信息表）" :hover="false">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| INVOICE_DETAILS_ID | BIGINT | 发票详细信息id | - | 自增主键 |
| INVOICE_VERIFER_ID | BIGINT | 主表id/核销id | - | 关联EPM_UPLOAD_INVOICE_VERIFER.INVOICE_VERIFER_ID |
| INVOICE_NUMBER | VARCHAR | 发票号码 | 发票号码 | 必填 |
| SERVICES_NAME | VARCHAR | 货物或服务名称 | 产品名称 | - |
| UOM | VARCHAR | 单位 | 发票单位 | - |
| UNIT_PRICE | VARCHAR | 单价 | 单价 | 必填 |
| AMOUNT | VARCHAR | 金额 | 金额 | - |
| TAX_RATE | VARCHAR | 税率 | 税率(%) | - |
| TAX | VARCHAR | 税额 | 税额 | 自动计算 |
| SPEC_MODEL | VARCHAR | 规格型号 | 规格型号 | 必填；修改时自动匹配基本单位 |
| ITEM_NUMBER | VARCHAR | 数量 | - | OCR原始数量 |
| UNAPPLIE_QUANTITY | VARCHAR | 剩余未核销数量 | 剩余可核销数量 | 自动计算 |
| IS_OCR | BIGINT | 是否OCR回传数据 | - | 2-是，必填 |
| MDF_ITEM_NUMBER | VARCHAR | 修改后数量/发票数量 | 发票数量 | 必填 |
| CAN_CHECK_NUMBER | VARCHAR | 可核销数量 | 可核销数量 | 自动计算 |
| OPERATION_FLAG | BIGINT | 操作标识 | 操作标识 | 0-手工添加/1-手工修改/2-OCR识别 |
| BF_INVOICE_NUMBER | VARCHAR | OCR原始发票号码 | - | - |
| BF_SERVICES_NAME | VARCHAR | OCR原始产品名称 | - | - |
| BF_UOM | VARCHAR | OCR原始单位 | - | - |
| BF_UNIT_PRICE | VARCHAR | OCR原始单价 | - | - |
| BF_AMOUNT | VARCHAR | OCR原始金额 | - | - |
| BF_TAX_RATE | VARCHAR | OCR原始税率 | - | - |
| BF_TAX | VARCHAR | OCR原始税额 | - | - |
| BF_SPEC_MODEL | VARCHAR | OCR原始规格型号 | - | - |
| BF_ITEM_NUMBER | VARCHAR | OCR原始数量 | - | - |
| NOUCHER_NUMBER | VARCHAR | 凭证号码 | 凭证号码 | 关联EPM_UPLOAD_INVOICE.NOUCHER_NUMBER |
| BF_SERVICES_CODE | VARCHAR | OCR原始产品编码 | - | - |
| SERVICES_CODE | VARCHAR | 产品编码 | 产品编码 | - |
| INVOICE_CODE | VARCHAR | 发票代码 | 发票代码 | - |
| BF_INVOICE_CODE | VARCHAR | OCR原始发票代码 | - | - |
| BASE_UOM_ID | BIGINT | 基本单位ID | - | 根据规格型号自动匹配HPFM_UOM |
| CONVERSION_RATE | DECIMAL | 转换率 | 转换率 | 必填 |
| EFFECT_STATUS | VARCHAR | 有效状态 | 有效状态 | invalid-未生效/valid-已生效/canceled-已取消 |

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
<KbCard title="报错一览表">

| 报错信息 | 提示节点 | 根因与解决方案 | 等级 | 详细逻辑 |
|---------|---------|-------------|------|---------|
| 明细行基本单位不能为空！ | 保存 | 发票详细信息中存在基本单位为空的行，需补充基本单位 | toast提醒 | [查看] |
| 明细第X行，未存在头信息，请检查！ | 保存 | 详细信息中的凭证号码+发票代码+发票号码组合在主要信息中不存在 | toast提醒 | [查看] |
| 发票详细信息中第X行转换率不能为0 | 保存/提交 | 详细信息中转换率为空或小于等于0 | toast提醒 | [查看] |
| 非发票类型主要信息以下行：第X行主要信息只能存在一行 | 提交 | 非发票类型凭证号码下有多条主要信息 | toast提醒 | [查看] |
| 发票类型主要信息的以下行：第X行发票号码或发票代码不能为空 | 提交 | 发票类型的主要信息缺少发票号码或发票代码 | toast提醒 | [查看] |
| 发票代码-发票号码(xxx-xxx)已在第X行存在 | 发票主要信息编辑 | 同一核销单内发票代码+发票号码重复 | toast提醒 | [查看] |
| xxx已被其它单进行核销. | 发票主要信息编辑/保存 | 该发票已被其他核销单使用 | toast提醒 | [查看] |
| 请先选择凭证类型或附件 | 新增主要信息/详细信息 | 发票影像行未选择凭证类型或未上传凭证附件 | toast提醒 | [查看] |
| 请先维护发票影像信息！ | 明细导入 | 未添加任何发票影像行 | toast提醒 | [查看] |
| 附件uuid:xxx未找到对应的附件 | OCR识别 | 上传的附件UUID在文件服务中找不到 | 阻断性报错 | [查看] |
| 附件uuid:xxx ocr接口识别失败 | OCR识别 | OCR识别接口返回失败 | 阻断性报错 | [查看] |
| 发票主要明细校验异常:xxx | 保存(后端) | 发票号码/代码为空、重复、或已被其他单核销 | 阻断性报错 | [查看] |
| 发票详细明细校验异常:xxx | 保存(后端) | 详细信息的发票代码+号码在主要信息中不存在 | 阻断性报错 | [查看] |
| 单据[xxx],发票主要信息不能为空 | 提交审批(后端) | 核销单没有发票主要信息 | 阻断性报错 | [查看] |
| 单据[xxx],发票详细信息不能为空 | 提交审批(后端) | 核销单没有发票详细信息 | 阻断性报错 | [查看] |
| 发票号码[xxx],详情行计算金额[xxx]有误 | 提交审批(后端) | 详细信息行单价×数量≠金额 | 阻断性报错 | [查看] |
| 发票号码[xxx],详情信息行汇总金额与主要总金额不一致 | 提交审批(后端) | 详细信息行汇总金额≠主要信息总额 | 阻断性报错 | [查看] |
| 提交流程发票详细信息不能为空! | 流程节点完成(后端) | 审批通过时发票详细信息为空 | 阻断性报错 | [查看] |
| 未查找到核销信息:xxx | 终止/撤销终止(后端) | 根据invoiceVeriferId查不到主表数据 | 阻断性报错 | [查看] |
| OCR校验异常，返回开票时间错误 | OCR识别(后端) | OCR返回的开票日期格式无法解析 | 阻断性报错 | [查看] |

> 详细逻辑列点击"查看"后，展示该报错的详细逻辑：

**明细行基本单位不能为空！**
- (1) 遍历invoiceDetailTableDS所有行，检查baseUomName是否为空字符串、null或undefined
- (2) 任一行为空则阻断保存

**明细第X行，未存在头信息，请检查！**
- (1) 构建主要信息集合：key=noucherNumber-invoiceCode-invoiceNumber
- (2) 遍历详细信息，检查每行的key是否在集合中
- (3) 排查SQL：`SELECT D.NOUCHER_NUMBER, D.INVOICE_CODE, D.INVOICE_NUMBER FROM EPM_UPLOAD_INVOICE_DETAILS D WHERE D.INVOICE_VERIFER_ID = ? AND NOT EXISTS (SELECT 1 FROM EPM_UPLOAD_INVOICE_INFO I WHERE I.INVOICE_VERIFER_ID = D.INVOICE_VERIFER_ID AND I.NOUCHER_NUMBER = D.NOUCHER_NUMBER AND I.INVOICE_CODE = D.INVOICE_CODE AND I.INVOICE_NUMBER = D.INVOICE_NUMBER)`

**xxx已被其它单进行核销.**
- (1) 调用后端check-invoice接口，传入invoiceValid(发票代码-发票号码)和invoiceVeriferId
- (2) 后端查询EPM_UPLOAD_INVOICE_INFO中除当前核销单外是否存在相同发票代码+号码
- (3) 排查SQL：`SELECT COUNT(*) FROM EPM_UPLOAD_INVOICE_INFO WHERE INVOICE_CODE || '-' || INVOICE_NUMBER = ? AND INVOICE_VERIFER_ID != ?`

**发票主要明细校验异常:xxx**
- (1) 遍历主要信息，检查发票代码和号码是否为空
- (2) 检查同一单内发票代码+号码是否重复
- (3) 调用checkInvoices校验跨单重复
- (4) 遍历详细信息，检查发票代码+号码是否在主要信息中存在

**发票号码[xxx],详情行计算金额[xxx]有误**
- (1) 查询详细信息，计算每行：单价×数量，与金额字段比较(允许0.01差异)
- (2) 排查SQL：`SELECT INVOICE_NUMBER, UNIT_PRICE, MDF_ITEM_NUMBER, AMOUNT FROM EPM_UPLOAD_INVOICE_DETAILS WHERE INVOICE_VERIFER_ID = ?`

**发票号码[xxx],详情信息行汇总金额与主要总金额不一致**
- (1) 按发票号码汇总详细信息行金额，与主要信息的ALL_AMOUNT比较
- (2) 排查SQL：`SELECT I.INVOICE_NUMBER, I.ALL_AMOUNT, SUM(D.UNIT_PRICE * D.MDF_ITEM_NUMBER) AS DETAIL_SUM FROM EPM_UPLOAD_INVOICE_INFO I LEFT JOIN EPM_UPLOAD_INVOICE_DETAILS D ON D.INVOICE_VERIFER_ID = I.INVOICE_VERIFER_ID AND D.INVOICE_NUMBER = I.INVOICE_NUMBER WHERE I.INVOICE_VERIFER_ID = ? GROUP BY I.INVOICE_NUMBER, I.ALL_AMOUNT`

</KbCard>

<KbCard title="报错详细逻辑" :hover="false">

**明细行基本单位不能为空！**
- (1) 遍历invoiceDetailTableDS所有行，检查baseUomName是否为空字符串、null或undefined
- (2) 任一行为空则阻断保存

**明细第X行，未存在头信息，请检查！**
- (1) 构建主要信息集合：key=noucherNumber-invoiceCode-invoiceNumber
- (2) 遍历详细信息，检查每行的key是否在集合中
- (3) 排查SQL：`SELECT D.NOUCHER_NUMBER, D.INVOICE_CODE, D.INVOICE_NUMBER FROM EPM_UPLOAD_INVOICE_DETAILS D WHERE D.INVOICE_VERIFER_ID = ? AND NOT EXISTS (SELECT 1 FROM EPM_UPLOAD_INVOICE_INFO I WHERE I.INVOICE_VERIFER_ID = D.INVOICE_VERIFER_ID AND I.NOUCHER_NUMBER = D.NOUCHER_NUMBER AND I.INVOICE_CODE = D.INVOICE_CODE AND I.INVOICE_NUMBER = D.INVOICE_NUMBER)`

**xxx已被其它单进行核销.**
- (1) 调用后端check-invoice接口，传入invoiceValid(发票代码-发票号码)和invoiceVeriferId
- (2) 后端查询EPM_UPLOAD_INVOICE_INFO中除当前核销单外是否存在相同发票代码+号码
- (3) 排查SQL：`SELECT COUNT(*) FROM EPM_UPLOAD_INVOICE_INFO WHERE INVOICE_CODE || '-' || INVOICE_NUMBER = ? AND INVOICE_VERIFER_ID != ?`

**发票主要明细校验异常:xxx**
- (1) 遍历主要信息，检查发票代码和号码是否为空
- (2) 检查同一单内发票代码+号码是否重复
- (3) 调用checkInvoices校验跨单重复
- (4) 遍历详细信息，检查发票代码+号码是否在主要信息中存在

**发票号码[xxx],详情行计算金额[xxx]有误**
- (1) 查询详细信息，计算每行：单价×数量，与金额字段比较(允许0.01差异)
- (2) 排查SQL：`SELECT INVOICE_NUMBER, UNIT_PRICE, MDF_ITEM_NUMBER, AMOUNT FROM EPM_UPLOAD_INVOICE_DETAILS WHERE INVOICE_VERIFER_ID = ?`

**发票号码[xxx],详情信息行汇总金额与主要总金额不一致**
- (1) 按发票号码汇总详细信息行金额，与主要信息的ALL_AMOUNT比较
- (2) 排查SQL：`SELECT I.INVOICE_NUMBER, I.ALL_AMOUNT, SUM(D.UNIT_PRICE * D.MDF_ITEM_NUMBER) AS DETAIL_SUM FROM EPM_UPLOAD_INVOICE_INFO I LEFT JOIN EPM_UPLOAD_INVOICE_DETAILS D ON D.INVOICE_VERIFER_ID = I.INVOICE_VERIFER_ID AND D.INVOICE_NUMBER = I.INVOICE_NUMBER WHERE I.INVOICE_VERIFER_ID = ? GROUP BY I.INVOICE_NUMBER, I.ALL_AMOUNT`

### 常见问题

- 问题1：OCR识别后发票信息未自动填充
  - 原因：凭证类型为"非发票"(1)时不会返回详细信息；OCR接口返回失败(code非0)；附件UUID无效
  - 解决思路：检查凭证类型是否为发票或收据；检查OCR返回的msg和code字段；确认附件已成功上传

- 问题2：保存时提示发票已被其他单核销
  - 原因：该发票代码+发票号码已存在于其他核销单的主要信息中
  - 解决思路：`SELECT V.INVOICE_VERIFER_NO, I.INVOICE_CODE, I.INVOICE_NUMBER FROM EPM_UPLOAD_INVOICE_INFO I JOIN EPM_UPLOAD_INVOICE_VERIFER V ON V.INVOICE_VERIFER_ID = I.INVOICE_VERIFER_ID WHERE I.INVOICE_CODE = ? AND I.INVOICE_NUMBER = ?`

- 问题3：提交审批时提示金额不一致
  - 原因：详细信息行的单价×数量汇总与主要信息的总额不匹配
  - 解决思路：检查详细信息行的金额计算是否正确，确认主要信息的总额与详细信息汇总一致

- 问题4：转换率默认值问题
  - 原因：组织ID不在[104,105,106]范围内时，新建详细信息行转换率默认为1；否则无默认值需手工填写
  - 解决思路：确认当前用户的组织ID，若在特殊组织范围内需手工填写转换率

---

</KbCard>

<KbCard title="常见问题">

- 问题1：OCR识别后发票信息未自动填充
  - 原因：凭证类型为"非发票"(1)时不会返回详细信息；OCR接口返回失败(code非0)；附件UUID无效
  - 解决思路：检查凭证类型是否为发票或收据；检查OCR返回的msg和code字段；确认附件已成功上传

- 问题2：保存时提示发票已被其他单核销
  - 原因：该发票代码+发票号码已存在于其他核销单的主要信息中
  - 解决思路：`SELECT V.INVOICE_VERIFER_NO, I.INVOICE_CODE, I.INVOICE_NUMBER FROM EPM_UPLOAD_INVOICE_INFO I JOIN EPM_UPLOAD_INVOICE_VERIFER V ON V.INVOICE_VERIFER_ID = I.INVOICE_VERIFER_ID WHERE I.INVOICE_CODE = ? AND I.INVOICE_NUMBER = ?`

- 问题3：提交审批时提示金额不一致
  - 原因：详细信息行的单价×数量汇总与主要信息的总额不匹配
  - 解决思路：检查详细信息行的金额计算是否正确，确认主要信息的总额与详细信息汇总一致

- 问题4：转换率默认值问题
  - 原因：组织ID不在[104,105,106]范围内时，新建详细信息行转换率默认为1；否则无默认值需手工填写
  - 解决思路：确认当前用户的组织ID，若在特殊组织范围内需手工填写转换率

---

</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录" :hover="false">

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
