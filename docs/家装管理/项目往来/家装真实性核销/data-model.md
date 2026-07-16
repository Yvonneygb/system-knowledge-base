# 数据模型

## 核心表结构

```
EPM_INVOICE_TRUTH_HEADER (核销头表)
  │
  ├──< EPM_INVOICE_TRUTH_LINE (核销行表, 关联出库单行)
  │       │
  │       └──< EPM_VERIFER_INVOICE_DETAILS (核销明细表, 关联发票明细)
  │
  └──< EPM_PROJECT_ATTACH (核销附件表)

关联外部表:
  INV_OUT_BILL_LINE (出库单行表) ←── EPM_INVOICE_TRUTH_LINE.INV_OUT_BILL_LINE_ID
  EPM_UPLOAD_INVOICE_DETAILS (发票明细表) ←── EPM_VERIFER_INVOICE_DETAILS.INVOICE_DETAILS_ID
```

## 头表字段（EPM_INVOICE_TRUTH_HEADER）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| invoiceTruthId | INVOICE_TRUTH_ID | Long | 核销单主键 | 自增生成 |
| invoiceTruthNo | INVOICE_TRUTH_NO | String | 核销单号 | `前缀 + yyMMdd + 编码规则序列号`，前缀取自`BILL_NUMBER`表(bill_type_id=211115)，序列号由编码规则`AE.EPM_INVOICE_TRUTH_NO`生成 |
| createTime | CREATE_TIME | Date | 创建时间 | 自动填充 |
| projectCode | PROJECT_CODE | String | 项目编码 | 前端选择项目后带入 |
| projectName | PROJECT_NAME | String | 项目名称 | 前端选择项目后带入 |
| projectId | PROJECT_ID | Long | 项目ID | 前端选择项目后带入 |
| contractCode | CONTRACT_CODE | String | 合同编码 | 前端选择合同后带入 |
| contractName | CONTRACT_NAME | String | 合同名称 | 前端选择合同后带入 |
| contractId | CONTRACT_ID | BigDecimal | 合同ID | 前端选择合同后带入 |
| customerCode | CUSTOMER_CODE | String | 经销商编码 | 前端选择经销商后带入 |
| customerName | CUSTOMER_NAME | String | 经销商名称 | 前端选择经销商后带入 |
| customerId | CUSTOMER_ID | BigDecimal | 经销商ID | 前端选择经销商后带入 |
| tradingCompanyName | TRADING_COMPANY_NAME | String | 交易公司名称 | 前端选择交易公司后带入 |
| tradingCompanyCode | TRADING_COMPANY_CODE | String | 交易公司编码 | 前端选择交易公司后带入 |
| tradingCompanyId | TRADING_COMPANY_ID | BigDecimal | 交易公司ID | 前端选择交易公司后带入 |
| billingUnitName | BILLING_UNIT_NAME | String | 开票单位名称 | 前端选择开票单位后带入 |
| billingUnitCode | BILLING_UNIT_CODE | String | 开票单位编码 | 前端选择开票单位后带入 |
| billingUnitId | BILLING_UNIT_ID | BigDecimal | 开票单位客户ID | 前端选择开票单位后带入 |
| contractUnit | CONTRACT_UNIT | String | 工程签约单位 | 前端录入 |
| note | NOTE | String | 备注 | 前端录入 |
| organizationId | ORGANIZATION_ID | BigDecimal | 组织ID | 自动取当前用户所属部门ID |
| isHome | IS_HOME | Integer | 是否家装 | 2=家装，其他=工程 |
| discountPolicyId | DISCOUNT_POLICY_ID | BigDecimal | 折扣政策ID | 前端选择 |
| discountPolicyCode | DISCOUNT_POLICY_CODE | String | 折扣政策编码 | 前端选择 |
| discountPolicyName | DISCOUNT_POLICY_NAME | String | 折扣政策名称 | 前端选择 |
| veriferType | VERIFER_TYPE | BigDecimal | 核销类型 | 前端选择 |
| invoiceVeriferId | INVOICE_VERIFER_ID | BigDecimal | 核销发票上传ID | 关联发票上传表 |
| invoiceVeriferNo | INVOICE_VERIFER_NO | String | 核销单号 | 关联发票上传表 |
| auditStat | AUDIT_STAT | String | 审核状态 | 新建/已提交/审批通过/审批拒绝 |
| verifyStat | VERIFY_STAT | String | 核销类型(字典) | 字典: truth_header.verify_stat |
| hzInstanceId | HZ_INSTANCE_ID | Long | H0流程实例ID | 提交审批时由工作流引擎返回 |
| hzApproveStatus | HZ_APPROVE_STATUS | String | H0流程审批状态 | RUN=运行中, APPROVED=已通过, REJECTED=已拒绝 |
| stat | STAT | Long | 单据状态(已弃用) | 使用HZ_APPROVE_STATUS代替 |
| wfid | WFID | Long | 流程ID | 旧流程字段 |
| wfflag | WFFLAG | Long | 流程标识 | 旧流程字段 |

## 行表字段（EPM_INVOICE_TRUTH_LINE）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| invoiceTruthLineId | INVOICE_TRUTH_LINE_ID | Long | 核销行主键 | 自增生成 |
| invoiceTruthId | INVOICE_TRUTH_ID | Long | 关联核销头ID | 保存时自动赋值 |
| invbillno | INVBILLNO | String | ERP出库单号 | 从可选出库单列表选择，取`INV_OUT_BILL_HEAD.INVBILLNO` |
| dateInvbill | DATE_INVBILL | Date | 发货日期 | 从出库单带入，取`INV_OUT_BILL_HEAD.DATE_INVBILL` |
| veriferEndDate | VERIFER_END_DATE | Date | 核销截止日 | 从出库单查询结果带入，计算逻辑见"可选出库单逻辑" |
| repairVeriferEndDate | REPAIR_VERIFER_END_DATE | Date | 补核销截止日 | 从出库单查询结果带入，计算逻辑见"可选出库单逻辑" |
| itemCode | ITEM_CODE | String | 产品编码 | 从出库单行带入，取`INV_OUT_BILL_LINE.ITEM_CODE` |
| itemName | ITEM_NAME | String | 产品名称 | 从出库单行带入，取`INV_OUT_BILL_LINE.ITEM_NAME` |
| itemId | ITEM_ID | Long | 产品ID | 从出库单行带入，取`INV_OUT_BILL_LINE.ITEM_ID` |
| qtyBill | QTY_BILL | Long | 实发数量 | 从出库单行带入，取签收数量合计`SUM(INV_OUT_CONFIRM_LINE.STOCK_QTY_BILL)` |
| invoiceNumber | INVOICE_NUMBER | String | 发票号码 | 从核销明细中取（非直接赋值） |
| servicesName | SERVICES_NAME | String | 货物或服务名称 | 从核销明细中取 |
| canVeriferNumber | CAN_VERIFER_NUMBER | Long | 可核销数量 | 从出库单行带入，取`INV_OUT_BILL_LINE.CAN_VERIFY_NUM` |
| surplusCanVeriferNumber | SURPLUS_CAN_VERIFER_NUMBER | Long | 剩余可核销数量 | 从出库单查询结果带入，取`sur_verify_num` |
| thisVeriferNumber | THIS_VERIFER_NUMBER | BigDecimal | 本次核销数量 | 前端录入/自动汇总核销明细的本次核销数量 |
| invOutBillLineId | INV_OUT_BILL_LINE_ID | Long | 出库单行ID | 从出库单行带入 |
| invoiceDetailsId | INVOICE_DETAILS_ID | Long | 发票详细信息ID | 从核销明细中取 |
| invoiceCode | INVOICE_CODE | String | 发票代码 | 从核销明细中取 |
| surVerifyNum | SUR_VERIFY_NUM | Long | 出库单可核销数量 | 从出库单查询结果带入 |
| canVerifyNum | CAN_VERIFY_NUM | Long | 出库单可核销数量 | 从出库单查询结果带入 |
| unitNameIsAgreement | UNIT_NAME_IS_AGREEMENT | Long | 发票购买方与工程采购单位名称是否一致 | 前端核对时选择(1=一致/0=不一致) |
| billingNameIsAgreement | BILLING_NAME_IS_AGREEMENT | Long | 发票销售方与经销商法人名称是否一致 | 前端核对时选择 |
| dateIsAgreement | DATE_IS_AGREEMENT | Long | 发票日期是否在基地对经销商发货日期之前 | 前端核对时选择 |
| seq | SEQ | Long | 行ID | 行序号 |

## 核销明细表字段（EPM_VERIFER_INVOICE_DETAILS）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| pkId | PK_ID | Long | 主键 | 自增生成 |
| invoiceTruthLineId | INVOICE_TRUTH_LINE_ID | Long | 关联核销行ID | 保存时自动赋值 |
| invoiceNumber | INVOICE_NUMBER | String | 发票号码 | 从可选发票列表选择，取`EPM_UPLOAD_INVOICE_INFO.INVOICE_NUMBER` |
| invoiceCode | INVOICE_CODE | String | 发票代码 | 从可选发票列表选择，取`EPM_UPLOAD_INVOICE_INFO.INVOICE_CODE` |
| servicesName | SERVICES_NAME | String | 货物或服务名称 | 从可选发票列表选择，取`EPM_UPLOAD_INVOICE_DETAILS.SERVICES_NAME` |
| servicesCode | SERVICES_CODE | String | 产品编码 | 从可选发票列表选择，取`EPM_UPLOAD_INVOICE_DETAILS.SERVICES_CODE` |
| invoiceDetailsId | INVOICE_DETAILS_ID | Long | 发票详细信息ID | 从可选发票列表选择，取`EPM_UPLOAD_INVOICE_DETAILS.INVOICE_DETAILS_ID` |
| veriferInvoiceDetailsId | VERIFER_INVOICE_DETAILS_ID | Long | 核销发票信息ID | 关联发票上传明细 |
| canVeriferNumber | CAN_VERIFER_NUMBER | String | 可核销数量 | 从可选发票列表选择，取`CAN_CHECK_NUMBER`，保存时四舍五入3位小数 |
| surplusCanVeriferNumber | SURPLUS_CAN_VERIFER_NUMBER | String | 剩余可核销数量 | `can_check_number - verifer_number`，保存时四舍五入3位小数 |
| thisVeriferNumber | THIS_VERIFER_NUMBER | Long | 本次核销数量 | 前端录入，小数位不能超过3位 |
| uomRate | UOM_RATE | String | 单位转换率 | 前端录入/默认1 |
| convertSurVeriferNumber | CONVERT_SUR_VERIFER_NUMBER | String | 转化后剩余可核销数量 | `surplusCanVeriferNumber / uomRate`，保存时四舍五入3位小数 |
| seq | SEQ | Long | 行ID | 行序号 |
| effectStatus | EFFECT_STATUS | String | 有效状态 | 保存时默认`invalid`(未生效)，审批通过后更新为`valid`(已生效)，取消后更新为`CANCELED` |
| unitNameIsAgreement | UNIT_NAME_IS_AGREEMENT | Long | 发票购买方与工程采购单位名称是否一致 | 前端核对时选择 |
| billingNameIsAgreement | BILLING_NAME_IS_AGREEMENT | Long | 发票销售方与经销商法人名称是否一致 | 前端核对时选择 |
| dateIsAgreement | DATE_IS_AGREEMENT | Long | 发票日期是否在基地对经销商发货日期之前 | 前端核对时选择 |
| cancelOperator | CANCEL_OPERATOR | String | 核销取消操作人 | 取消时自动赋值当前用户ID |
| cancelTime | CANCEL_TIME | Date | 核销取消操作时间 | 取消时自动赋值SYSDATE |
| cancelType | CANCEL_TYPE | String | 取消核销类型 | 取消时赋值：invoice/invoiceDetail/invLine/veriferDetail/obsInvoice |
