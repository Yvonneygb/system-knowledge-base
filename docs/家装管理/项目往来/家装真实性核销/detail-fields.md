# 核销明细字段逻辑

## 字段取值来源

| 字段 | 取值来源 |
|------|---------|
| invoiceNumber | `EPM_UPLOAD_INVOICE_INFO.INVOICE_NUMBER` |
| invoiceCode | `EPM_UPLOAD_INVOICE_INFO.INVOICE_CODE` |
| servicesName | `EPM_UPLOAD_INVOICE_DETAILS.SERVICES_NAME` |
| servicesCode | `EPM_UPLOAD_INVOICE_DETAILS.SERVICES_CODE` |
| invoiceDetailsId | `EPM_UPLOAD_INVOICE_DETAILS.INVOICE_DETAILS_ID` |
| canVeriferNumber | `EPM_UPLOAD_INVOICE_DETAILS.CAN_CHECK_NUMBER` |
| surplusCanVeriferNumber | `can_check_number - 已核销数量` |
| thisVeriferNumber | 前端录入 |
| uomRate | 前端录入/默认1 |
| convertSurVeriferNumber | `surplusCanVeriferNumber / uomRate` |
| effectStatus | 保存时默认`invalid` |

## 保存时校验与处理

### 校验规则

| 校验项 | 规则 | 报错信息 |
|--------|------|---------|
| 本次核销数量小数位 | `thisVeriferNumber.scale() > 3` | 本次核销数量的小数位不能超过3位 |
| 本次核销数量 ≤ 剩余可核销数量 | `thisVeriferNumber > convertSurVeriferNumber` | 本次核销数量不能大于剩余可核销数量 |
| 本次核销数量合计 ≤ 可核销数量 | `sumThisVeriferNumber > canVerifyNum` | 本次核销数量不能大于可核销数量 |

### 数据处理

- `surplusCanVeriferNumber`：四舍五入3位小数，去除末尾0
- `canVeriferNumber`：四舍五入3位小数，去除末尾0
- `convertSurVeriferNumber`：四舍五入3位小数，去除末尾0
- `effectStatus`：若为空则设为`invalid`（未生效）
