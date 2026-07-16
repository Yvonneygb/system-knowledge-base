# 常见问题 FAQ

## Q1: 提交时报错"出库单明细不存在"

**现象**：提交核销单时提示 `{invbillno}-{itemCode}对应的出库单明细不存在`

**根因**：核销行中的 `INV_OUT_BILL_LINE_ID` 为空，通常是以下原因：
1. 出库单行数据已被删除或归档
2. 前端选择出库单后未正确传递行ID
3. 数据同步延迟，出库单行未同步到目标环境

**排查步骤**：
1. 检查核销行数据：`SELECT * FROM EPM_INVOICE_TRUTH_LINE WHERE INVOICE_TRUTH_ID = {id}`
2. 确认 `INV_OUT_BILL_LINE_ID` 是否为空
3. 查询出库单行是否存在：`SELECT * FROM INV_OUT_BILL_LINE WHERE INV_OUT_BILL_LINE_ID = {lineId}`
4. 若出库单行不存在，检查数据归档/清理策略

---

## Q2: 提交时报错"可核销数量不足"

**现象**：提交核销单时提示 `{invbillno}-{itemCode}对应的出库单明细可核销数量({remainingVerifiableQty})不足`

**根因**：出库单行剩余可核销数量不足以覆盖本次核销数量，可能原因：
1. 同一出库单行有多张审批中的核销单占用数量
2. 已生效核销单已消耗大部分可核销数量
3. 前端显示的"可核销数量"未实时扣减审批中占用

**排查步骤**：
1. 查询出库单行当前可核销数量：
   ```sql
   SELECT CAN_VERIFY_NUM, USED_VERIFY_NUM FROM INV_OUT_BILL_LINE WHERE INV_OUT_BILL_LINE_ID = {lineId}
   ```
2. 查询审批中核销单占用数量：
   ```sql
   SELECT SUM(vid.this_verifer_number) 
   FROM epm_invoice_truth_header her
   JOIN epm_invoice_truth_line itl ON her.invoice_truth_id = itl.invoice_truth_id
   JOIN epm_verifer_invoice_details vid ON itl.invoice_truth_line_id = vid.invoice_truth_line_id
   WHERE her.HZ_APPROVE_STATUS = 'RUN'
     AND vid.EFFECT_STATUS = 'invalid'
     AND itl.inv_out_bill_line_id = {lineId}
   ```
3. 计算真实剩余：`CAN_VERIFY_NUM - 审批中占用数量`

---

## Q3: 提交时报错"发票明细同时核销不同产品"

**现象**：提交时提示 `提交失败：序号:{n} 的发票明细同时核销出库单产品: {历史产品编码列表}`

**根因**：同一张发票明细已经核销过产品A，现在又核销产品B。业务规则要求同一发票明细只能核销同一产品编码。

**排查步骤**：
1. 查询该发票明细的历史核销记录：
   ```sql
   SELECT tl.item_code
   FROM epm_upload_invoice_details d
   JOIN epm_verifer_invoice_details vd ON d.invoice_details_id = vd.invoice_details_id
   JOIN epm_invoice_truth_line tl ON vd.invoice_truth_line_id = tl.invoice_truth_line_id
   WHERE d.invoice_details_id = {detailId}
     AND vd.EFFECT_STATUS IN ('valid','invalid')
   GROUP BY tl.item_code
   ```
2. 确认历史产品编码是否包含当前出库单产品编码
3. 若不一致，需更换发票明细或使用同一产品的出库单

---

## Q4: 可选出库单列表为空

**现象**：选择经销商、开票单位、交易公司后，出库单列表无数据

**根因**：过滤条件过严，常见原因：
1. 系统参数 `Date_InvBill` 设置过晚，过滤掉早期出库单
2. 出库单 `authenticity_exempt_flag = 'Y'`（已免除真实性核销）
3. 出库单 `sur_verify_num = 0`（可核销数量已用完）
4. 出库单无签收确认记录
5. 出库单渠道不为3（工程渠道）

**排查步骤**：
1. 检查系统参数：`SELECT * FROM SYS_PARAM WHERE PARAM_CODE = 'Date_InvBill'`
2. 直接查询出库单状态：
   ```sql
   SELECT * FROM INV_OUT_BILL_HEAD 
   WHERE customer_id = #{customerId} 
   AND legal_entity_id = #{billingUnitId}
   ```
3. 检查签收记录是否存在
4. 检查 `authenticity_exempt_flag` 和 `channel` 字段

---

## Q5: 可选发票列表为空

**现象**：选择核销行后，发票列表无数据

**根因**：
1. 发票上传单未审批通过（`hz_approve_status != 'APPROVED'`）
2. 发票明细已全部核销完（`can_check_number - verifer_number <= 0`）
3. 发票明细已被作废（`effect_status != 'valid'`）
4. 产品编码校验：已核销过的产品编码与当前出库单产品不一致，`verifyFlag=false`

**排查步骤**：
1. 查询发票上传审批状态：
   ```sql
   SELECT * FROM EPM_UPLOAD_INVOICE_VERIFER 
   WHERE customer_id = #{customerId} 
   AND billing_unit_id = #{billingUnitId}
   ```
2. 查询发票明细剩余可核销数量
3. 检查产品编码校验逻辑（`selectItemInfo`）

---

## Q6: 取消核销后出库单行已核销数量小于0

**现象**：取消核销时报错 `更新失败,取消后出库单行已核销数量小于0`

**根因**：取消数量大于出库单行当前已核销数量，通常是并发取消操作导致数据不一致。

**排查步骤**：
1. 查询出库单行当前数量：
   ```sql
   SELECT CAN_VERIFY_NUM, USED_VERIFY_NUM FROM INV_OUT_BILL_LINE WHERE INV_OUT_BILL_LINE_ID = {lineId}
   ```
2. 查询该出库单行关联的所有有效核销明细数量
3. 确认是否有并发取消操作正在执行
