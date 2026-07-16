# 排查工作流

## 通用排查流程

### Step 1: 确认核销单基本信息

```sql
-- 查询核销单头信息
SELECT h.INVOICE_TRUTH_ID, h.INVOICE_TRUTH_NO, h.AUDIT_STAT, h.HZ_APPROVE_STATUS,
       h.PROJECT_NAME, h.CUSTOMER_NAME, h.TRADING_COMPANY_NAME
FROM EPM_INVOICE_TRUTH_HEADER h
WHERE h.INVOICE_TRUTH_NO = '{核销单号}';
```

**预期结果**：能查到对应核销单，AUDIT_STAT 和 HZ_APPROVE_STATUS 状态一致。

**异常判断**：
- 查不到 → 核销单被物理删除或单号错误
- AUDIT_STAT 与 HZ_APPROVE_STATUS 不一致 → 数据状态异常，需人工核对

---

### Step 2: 查询核销行与出库单关联

```sql
-- 查询核销行信息
SELECT l.INVOICE_TRUTH_LINE_ID, l.INVBILLNO, l.ITEM_CODE, l.ITEM_NAME,
       l.THIS_VERIFER_NUMBER, l.CAN_VERIFER_NUMBER, l.SURPLUS_CAN_VERIFER_NUMBER,
       l.INV_OUT_BILL_LINE_ID
FROM EPM_INVOICE_TRUTH_LINE l
WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId};
```

**预期结果**：每行都有有效的 INV_OUT_BILL_LINE_ID，THIS_VERIFER_NUMBER 不为0。

**异常判断**：
- INV_OUT_BILL_LINE_ID 为空 → 出库单行已被删除
- THIS_VERIFER_NUMBER 为0 → 核销行数据异常

---

### Step 3: 查询核销明细与发票关联

```sql
-- 查询核销明细信息
SELECT d.PK_ID, d.INVOICE_NUMBER, d.INVOICE_CODE, d.SERVICES_NAME,
       d.THIS_VERIFER_NUMBER, d.CAN_VERIFER_NUMBER, d.SURPLUS_CAN_VERIFER_NUMBER,
       d.EFFECT_STATUS, d.UOM_RATE, d.INVOICE_DETAILS_ID
FROM EPM_VERIFER_INVOICE_DETAILS d
WHERE d.INVOICE_TRUTH_LINE_ID IN (
  SELECT l.INVOICE_TRUTH_LINE_ID 
  FROM EPM_INVOICE_TRUTH_LINE l 
  WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId}
);
```

**预期结果**：明细数量与行匹配，EFFECT_STATUS 与核销单审批状态一致。

**异常判断**：
- 明细缺失 → 保存时数据不完整
- EFFECT_STATUS 异常 → 取消/审批回调处理异常

---

### Step 4: 检查出库单行可核销数量

```sql
-- 检查出库单行数量状态
SELECT iobl.INV_OUT_BILL_LINE_ID, iobl.ITEM_CODE, iobl.CAN_VERIFY_NUM, iobl.USED_VERIFY_NUM,
       iobl.CAN_VERIFY_NUM - iobl.USED_VERIFY_NUM AS REMAINING
FROM INV_OUT_BILL_LINE iobl
WHERE iobl.INV_OUT_BILL_LINE_ID IN (
  SELECT l.INV_OUT_BILL_LINE_ID 
  FROM EPM_INVOICE_TRUTH_LINE l 
  WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId}
);
```

**预期结果**：CAN_VERIFY_NUM > 0，REMAINING >= 本次核销数量合计。

**异常判断**：
- CAN_VERIFY_NUM = 0 → 出库单已核销完毕
- REMAINING < 本次核销数量 → 数量不足，需检查审批中占用

---

### Step 5: 检查发票明细可核销数量

```sql
-- 检查发票明细剩余可核销数量
SELECT uidt.INVOICE_DETAILS_ID, uidt.INVOICE_CODE, uidt.INVOICE_NUMBER,
       uidt.SERVICES_NAME, uidt.CAN_CHECK_NUMBER,
       uidt.CAN_CHECK_NUMBER - (
         SELECT NVL(SUM(
           CASE WHEN vid.uom_rate IS NULL THEN vid.this_verifer_number 
           ELSE vid.this_verifer_number / vid.uom_rate END
         ), 0)
         FROM epm_verifer_invoice_details vid
         JOIN epm_invoice_truth_line itl ON vid.invoice_truth_line_id = itl.invoice_truth_line_id
         JOIN epm_invoice_truth_header her ON itl.invoice_truth_id = her.invoice_truth_id
         WHERE vid.invoice_details_id = uidt.invoice_details_id
           AND vid.EFFECT_STATUS IN ('invalid','valid')
           AND her.HZ_APPROVE_STATUS IN ('RUN','APPROVED')
       ) AS SURPLUS
FROM EPM_UPLOAD_INVOICE_DETAILS uidt
WHERE uidt.INVOICE_DETAILS_ID IN (
  SELECT d.INVOICE_DETAILS_ID 
  FROM EPM_VERIFER_INVOICE_DETAILS d 
  WHERE d.INVOICE_TRUTH_LINE_ID IN (
    SELECT l.INVOICE_TRUTH_LINE_ID 
    FROM EPM_INVOICE_TRUTH_LINE l 
    WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId}
  )
);
```

**预期结果**：每条发票明细 SURPLUS >= 对应本次核销数量。

**异常判断**：
- SURPLUS < 0 → 发票明细被过度核销，需排查并发核销单

---

## 提交失败专项排查

### 提交校验逐项检查脚本

```sql
-- 校验1: 出库单明细是否存在
SELECT l.INVBILLNO, l.ITEM_CODE, l.INV_OUT_BILL_LINE_ID,
       CASE WHEN l.INV_OUT_BILL_LINE_ID IS NULL THEN '异常' ELSE '正常' END AS CHECK_RESULT
FROM EPM_INVOICE_TRUTH_LINE l
WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId};

-- 校验2: 出库单行剩余可核销数量
SELECT l.INVBILLNO, l.ITEM_CODE, l.THIS_VERIFER_NUMBER,
       iobl.CAN_VERIFY_NUM,
       iobl.CAN_VERIFY_NUM - (
         SELECT NVL(SUM(vid.this_verifer_number), 0)
         FROM epm_invoice_truth_header her
         JOIN epm_invoice_truth_line itl2 ON her.invoice_truth_id = itl2.invoice_truth_id
         JOIN epm_verifer_invoice_details vid ON itl2.invoice_truth_line_id = vid.invoice_truth_line_id
         WHERE her.HZ_APPROVE_STATUS = 'RUN'
           AND vid.EFFECT_STATUS = 'invalid'
           AND itl2.inv_out_bill_line_id = l.INV_OUT_BILL_LINE_ID
       ) AS REMAINING,
       CASE WHEN (剩余 - 本次) < 0 THEN '不足' ELSE '充足' END AS CHECK_RESULT
FROM EPM_INVOICE_TRUTH_LINE l
JOIN INV_OUT_BILL_LINE iobl ON l.INV_OUT_BILL_LINE_ID = iobl.INV_OUT_BILL_LINE_ID
WHERE l.INVOICE_TRUTH_ID = {invoiceTruthId};

-- 校验4: 发票明细产品编码一致性
SELECT d.INVOICE_DETAILS_ID, tl.ITEM_CODE AS CURRENT_ITEM,
       (
         SELECT LISTAGG(tl2.item_code, ',') WITHIN GROUP (ORDER BY tl2.item_code)
         FROM epm_upload_invoice_details d2
         JOIN epm_verifer_invoice_details vd ON d2.invoice_details_id = vd.invoice_details_id
         JOIN epm_invoice_truth_line tl2 ON vd.invoice_truth_line_id = tl2.invoice_truth_line_id
         WHERE d2.invoice_details_id = d.INVOICE_DETAILS_ID
           AND vd.EFFECT_STATUS IN ('valid','invalid')
           AND d2.EFFECT_STATUS = 'valid'
         GROUP BY d2.invoice_details_id
       ) AS HISTORY_ITEMS
FROM EPM_VERIFER_INVOICE_DETAILS d
JOIN EPM_INVOICE_TRUTH_LINE tl ON d.INVOICE_TRUTH_LINE_ID = tl.INVOICE_TRUTH_LINE_ID
WHERE tl.INVOICE_TRUTH_ID = {invoiceTruthId};
```
