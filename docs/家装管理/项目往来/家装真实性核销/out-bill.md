# 可选出库单逻辑

## 接口信息

- **接口路径**：`GET /v1/{organizationId}/epm-invoice-truth-headers/invoice-truth/search-out-bill`
- **Service方法**：`searchOutBill` → `EpmInvoiceTruthHeaderMapper.searchOutBill`
- **入参**：customerId(经销商ID), billingUnitId(开票单位ID), tradingCompanyId(交易公司ID), organizationId(组织ID), invbillStartDate/invbillEndDate(出库时间范围), sqlWhere(模糊搜索)

## 核心表关联

```
INV_OUT_BILL_HEAD (iobh)
  └── INNER JOIN INV_OUT_BILL_LINE (iobl) ON iobl.inv_out_bill_head_id = iobh.inv_out_bill_head_id
        └── INNER JOIN SA_OUT_BILL_LINE (sobl) ON sobl.ext_sa_out_bill_line_id = iobl.ext_sa_out_bill_line_id
              └── INNER JOIN SA_OUT_BILL_HEAD (sobh) ON sobh.sa_out_bill_head_id = sobl.sa_out_bill_head_id
  └── LEFT JOIN INV_OUT_BILL_INTF_HEAD (ih) ON ih.delivery_id = iobh.ext_head_id  (交易公司名称)
  └── LEFT JOIN CUSTOMER (c) ON c.customer_id = iobh.customer_id  (经销商信息)
  └── LEFT JOIN EPM_INVOICE_DEALY_LINE (idl) ON idl.inv_out_bill_line_id = iobl.inv_out_bill_line_id AND idl.this_dealy = 2
        └── LEFT JOIN EPM_INVOICE_DEALY_HEADER (idh) ON idh.invoice_dealy_id = idl.invoice_dealy_id AND idh.stat = 5
```

## 过滤条件

| 条件 | 说明 |
|------|------|
| `iobh.customer_id = #{customerId}` | 匹配经销商 |
| `iobh.legal_entity_id = #{billingUnitId}` | 匹配开票单位(法人) |
| `sobh.trading_company_id = #{tradingCompanyId}` | 匹配交易公司 |
| `organization_id = #{organizationId}` | 匹配组织 |
| `is_have_order = 2` | 已有订单 |
| `billtypecode = '0204'` | 单据类型编码=0204 |
| `inv_out_type < 2` | 出库类型<2(正常出库) |
| `sur_verify_num > 0` | 剩余可核销数量>0 |
| `date_invbill > sys_param(Date_InvBill)` | 发货日期晚于系统参数配置的起始日期 |
| `channel = 3` | 渠道=3(工程渠道) |
| `bill_type in(1,2)` | 单据类型为1或2 |
| `authenticity_exempt_flag = 'N'` | 未免除真实性核销 |
| `ITEM_CODE not in('CUX_OM_CASH_POOL','CUX_OM_PRICE_RAISE')` | 排除资金池和抬价产品 |
| `exists(签收记录)` | 必须存在签收确认记录 |

## 关键计算字段

### 剩余可核销数量（sur_verify_num）

```sql
iobl.can_verify_num
- (SELECT NVL(SUM(vid.this_verifer_number), 0)
   FROM epm_invoice_truth_header her
   LEFT JOIN epm_invoice_truth_line itl ON her.invoice_truth_id = itl.invoice_truth_id
   LEFT JOIN epm_verifer_invoice_details vid ON itl.invoice_truth_line_id = vid.invoice_truth_line_id
   WHERE her.HZ_APPROVE_STATUS = 'RUN'
     AND vid.EFFECT_STATUS = 'invalid'
     AND itl.inv_out_bill_line_id = iobl.inv_out_bill_line_id)
```

> 即：出库单行可核销数量 - 审批中核销单已占用的数量

### 核销截止日（verifer_end_date）

```
IF 存在延期配置(epm_invoice_dealy):
    取延期配置的 upd_verifer_end_date
ELSE:
    发货日期 + 补核销截止天数(repairVeriferEndDate)
```

### 补核销截止日（repair_verifer_end_date）

```
IF 存在延期配置:
    取延期配置的 upd_repair_verifer_end_date
ELSE:
    发货日期 + 补核销截止天数 + 核销截止天数
```

## 系统参数

| 参数编码 | 含义 | 来源 |
|---------|------|------|
| `Date_InvBill` | 出库单发货日期起始限制 | `SYS_PARAM`表 |
| `veriferDealyArgs` | 核销延期天数 | `SYS_PARAM`表 |
| `veriferEndDate` | 核销截止天数 | `SYS_PARAM`表 |
| `repairVeriferEndDate` | 补核销截止天数 | `SYS_PARAM`表 |
