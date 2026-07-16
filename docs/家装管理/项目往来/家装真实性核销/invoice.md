# 可选发票逻辑

## 接口信息

- **接口路径**：`GET /v1/{organizationId}/epm-invoice-truth-headers/invoice-truth/invoice-info`
- **Service方法**：`invoiceInfo` → `EpmInvoiceTruthHeaderMapper.invoiceInfo`
- **入参**：customerId, billingUnitId, tradingCompanyId, invoiceTruthId, itemCode, epmInvoiceTruthLines(当前已选核销行)

## 核心表关联

```
EPM_UPLOAD_INVOICE_VERIFER (uiv) -- 发票上传主表
  └── LEFT JOIN EPM_UPLOAD_INVOICE (ui) ON uiv.invoice_verifer_id = ui.invoice_verifer_id
        └── LEFT JOIN EPM_UPLOAD_INVOICE_INFO (uii) ON ui.noucher_number = uii.noucher_number
              └── LEFT JOIN EPM_UPLOAD_INVOICE_DETAILS (uidt)
                    ON uii.invoice_code = uidt.invoice_code
                    AND uii.invoice_number = uidt.invoice_number
                    AND uii.invoice_verifer_id = uidt.invoice_verifer_id
```

## 过滤条件

| 条件 | 说明 |
|------|------|
| `uidt.EFFECT_STATUS = 'valid'` | 发票明细有效 |
| `uiv.customer_id = #{customerId}` | 匹配经销商 |
| `uiv.billing_unit_id = #{billingUnitId}` | 匹配开票单位 |
| `uiv.trading_company_id = #{tradingCompanyId}` | 匹配交易公司 |
| `uiv.hz_approve_status = 'APPROVED'` | 发票上传已审批通过 |
| `can_check_number - verifer_number > 0` | 剩余可核销数量>0 |

## 关键计算字段

### 已核销数量（verifer_number）

```sql
SELECT NVL(SUM(this_verifer_number), 0)
FROM (
  SELECT CASE
    WHEN vid.uom_rate IS NULL THEN vid.this_verifer_number
    ELSE vid.this_verifer_number / vid.uom_rate
  END this_verifer_number
  FROM epm_invoice_truth_line itl
  LEFT JOIN epm_verifer_invoice_details vid ON itl.invoice_truth_line_id = vid.invoice_truth_line_id
  WHERE vid.invoice_details_id = uidt.invoice_details_id
    AND itl.invoice_truth_id != #{invoiceTruthId}  -- 排除当前核销单
    AND vid.EFFECT_STATUS IN ('invalid','valid')   -- 审批中或已生效
)
```

### 剩余可核销数量（surplus_can_verifer_number）

```
ROUND(can_check_number - verifer_number, 3)
```

## 后处理逻辑（Java层）

### 1. 扣减当前核销单占用量

遍历已选核销行，若发票明细ID匹配，则从`canCheckNumber`和`surplusCanVeriferNumber`中扣减`thisVeriferNumber`

### 2. 产品编码校验（verifyFlag）

查询发票明细已核销过的出库单产品编码（`selectItemInfo`），若已核销的产品编码不包含当前出库单产品编码，则设置`verifyFlag=false`（不可核销）

**校验SQL（selectItemInfo）**：

```sql
SELECT d.invoice_details_id, tl.item_code
FROM epm_upload_invoice_details d
  JOIN epm_upload_invoice_info info
    ON d.invoice_code = info.invoice_code
    AND d.invoice_number = info.invoice_number
    AND d.invoice_verifer_id = info.invoice_verifer_id
  JOIN epm_verifer_invoice_details vd
    ON d.invoice_details_id = vd.invoice_details_id
  JOIN epm_invoice_truth_line tl
    ON vd.invoice_truth_line_id = tl.invoice_truth_line_id
WHERE vd.EFFECT_STATUS IN ('valid','invalid')
  AND d.EFFECT_STATUS = 'valid'
  AND d.invoice_details_id IN (detailIdList)
GROUP BY d.invoice_details_id, tl.item_code
```

**校验规则**：对每个发票明细，收集其已核销过的出库单产品编码列表(itemCodes)；若itemCodes不为空且不包含当前出库单的itemCode，则`verifyFlag=false`
