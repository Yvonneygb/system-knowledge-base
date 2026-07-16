# 保存与提交

## 保存（invoiceTruthSave）

**接口路径**：`POST /v1/{organizationId}/epm-invoice-truth-headers/invoice-truth/save`

### 新增逻辑（invoiceTruthId为空）

```
1. 校验核销发票 (checkVeriferInvoice)
2. 生成核销单号: 前缀 + yyMMdd + 编码规则序列号
3. 设置审核状态 = "新建"
4. 插入头表 EPM_INVOICE_TRUTH_HEADER
5. 插入附件 EPM_PROJECT_ATTACH
6. 插入行表和明细表 (insertInvoiceTruthLines)
   - 遍历行：插入 EPM_INVOICE_TRUTH_LINE
   - 遍历明细：校验小数位、处理精度、设置effectStatus=invalid，批量插入 EPM_VERIFER_INVOICE_DETAILS
```

### 更新逻辑（invoiceTruthId不为空）

```
1. 查询现有头表数据
2. 复制DTO到实体（以下字段不更新：organizationId, stat, auditStat, wfid, wfflag）
3. 更新头表
4. 更新附件
5. 删除旧行和明细：先删 EPM_VERIFER_INVOICE_DETAILS，再删 EPM_INVOICE_TRUTH_LINE
6. 重新插入行和明细 (insertInvoiceTruthLines)
```

## 提交审批（wfProcSubmit）

通过工作流框架调用。

### 校验逻辑（checkWorkFlowData）

#### 校验1：出库单明细是否存在

- 条件：`EPM_INVOICE_TRUTH_LINE.INV_OUT_BILL_LINE_ID IS NULL`
- 报错：`{invbillno}-{itemCode}对应的出库单明细不存在.`

#### 校验2：出库单行剩余可核销数量

```
剩余可核销数量 = INV_OUT_BILL_LINE.CAN_VERIFY_NUM - SUM(审批中核销单占用的本次核销数量)
占用过滤：HZ_APPROVE_STATUS = 'RUN' 且 EFFECT_STATUS = 'invalid'
```

- 条件：`remainingVerifiableQty - thisVeriferNumberCount < 0`
- 报错：`{invbillno}-{itemCode}对应的出库单明细可核销数量({remainingVerifiableQty})不足`

#### 校验3：发票明细剩余可核销数量

```
剩余可核销数量 = EPM_UPLOAD_INVOICE_DETAILS.CAN_CHECK_NUMBER
               - SUM(审批中或已生效的核销数量，按uom_rate转换)
过滤：HZ_APPROVE_STATUS IN ('RUN','APPROVED') 且 EFFECT_STATUS IN ('invalid','valid')
```

- 条件：`surplusCanVeriferNumber < 0`
- 报错：`{invoiceNumber}本次核销数量为:{invoiceDetailsId},剩余可核销数量为:{surplusCanVeriferNumber + invoiceDetailsId}`

#### 校验4：核销行日期和产品编码重复（checkDateAndItemCode）

**校验4-1：同一发票明细的历史核销产品编码一致性**

查询当前核销明细对应的发票明细在其他核销单中已核销过的出库单产品编码。

- 若历史核销过的产品编码中**包含**当前出库单行的产品编码 → 允许
- 若历史核销过的产品编码中**不包含**当前出库单行的产品编码 → 报错
- 报错信息：`提交失败：序号:{n} 的发票明细同时核销出库单产品: {历史产品编码列表}`
- **业务含义**：同一张发票明细如果已经核销过A产品，就不能再核销B产品

**校验4-2：同一核销单内，同一发票明细不能核销不同产品**

遍历当前核销单的其他出库单行，检查是否存在同一个发票明细ID但产品编码不同的情况。

- 报错信息：`提交失败：序号:{n} 的发票明细同时核销本核销单下的多个出库单产品`
- **业务含义**：同一核销单内，一张发票明细不能同时核销两种不同的出库单产品

### 执行操作

```
1. 通过校验后，查询流程标识(发货日期是否>=2024-01-01)
2. 构建流程变量参数:
   - invoiceTruthId: 核销单ID
   - flag: 流程标识
   - startRealName: 申请人姓名
   - customerId: 经销商ID
   - nodeNameFlag: 非家装时设为1
   - projectSource: 项目来源(如有)
3. 启动HZERO工作流实例
4. 更新核销头:
   - HZ_INSTANCE_ID = 流程实例ID
   - HZ_APPROVE_STATUS = 'RUN'
   - AUDIT_STAT = '已提交'
```

## 审批通过回调（wfComplete）

```
1. 若审批拒绝: 更新 AUDIT_STAT = '审批拒绝'，结束
2. 若审批通过:
   a. 更新 AUDIT_STAT = '审批通过'
   b. 遍历核销行:
      - 校验出库单行是否存在 (INV_OUT_BILL_LINE_ID <= 0)
      - 累加本次核销数量(排除null和canceled)
      - 校验可核销数量: CAN_VERIFY_NUM < num → 报错
      - 更新出库单行:
        - CAN_VERIFY_NUM = CAN_VERIFY_NUM - num
        - USED_VERIFY_NUM = USED_VERIFY_NUM + num
      - 若有渠道提价: 计算抬价返点
   c. 批量更新核销明细状态为 valid
```

## 取消/作废（cancel）

**接口路径**：`POST /v1/{organizationId}/epm-invoice-truth-headers/invoice-truth/cancel`

**入参**：actionType(操作类型), ids(逗号分隔的ID)

| actionType | 说明 | 操作范围 |
|-----------|------|---------|
| `obsInvoice` | 作废发票 | 更新发票上传信息状态为OBSOLETE + 取消关联核销明细 |
| `invoice` | 取消发票 | 按发票维度查询并取消核销明细 |
| `invoiceDetail` | 取消发票明细 | 按发票明细维度查询并取消核销明细 |
| `invLine` | 取消出库单行核销 | 按出库单行维度查询并取消核销明细 |
| `veriferDetail` | 取消核销明细 | 按核销明细ID逐条取消 |

### 取消执行逻辑

```
1. 查询需要取消的核销明细 (selectVerifyDetailsForCancel，按actionType动态查询)
2. 遍历查询结果，按核销头stat分类收集数据:
   - stat=3(审批中): 记录核销头ID到headIdSet（用于中断审批）
   - stat=5(审批完成): 记录出库单行ID和本次核销数量到invLineMap（用于回退数量）
3. 更新核销明细状态 (updateToCanceled):
   - EFFECT_STATUS = 'CANCELED'
   - CANCEL_TYPE = actionType
   - CANCEL_OPERATOR = 当前用户ID
   - CANCEL_TIME = SYSDATE
4. 中断审批流程 (interruptApproval):
   - 更新核销头: STAT=1, WFID=0, WFFLAG=0
   - 删除审批对象(scpwfobj)
5. 回退出库单行核销数量 (updateVerifyNum):
   - CAN_VERIFY_NUM = CAN_VERIFY_NUM + cancelNum
   - USED_VERIFY_NUM = USED_VERIFY_NUM - cancelNum
   - 条件: USED_VERIFY_NUM - cancelNum >= 0
6. 处理返点回退 (operationRebateBiz):
   - 仅对有渠道提价(CHANNEL_UP_PRICE > 0)的出库单行处理
   - 操作类型: UNVERIFIER
```

## 删除（invoiceTruthDelete）

```
1. 删除头表 EPM_INVOICE_TRUTH_HEADER
2. 删除附件关联
3. 删除行表 EPM_INVOICE_TRUTH_LINE
4. 删除明细表 EPM_VERIFER_INVOICE_DETAILS
```

## 终止/撤销终止

- **终止**：通过 `InvoiceCancelService` 处理，记录异动记录到 `INVOICE_TRUTH_CANCEL_RECORD`
- **撤销终止**：撤销终止操作
