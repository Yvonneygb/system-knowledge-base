---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EPM_URGENT_ORDER (紧急要货单据头)
  │
  ├──< EPM_URGENT_ORDER_LINE (紧急要货明细行)
  │       │
  │       └──< EPM_URGENT_ORDER_LINE_STOCK (紧急要货库存保留记录)
  │              │
  │              └── 记录ERP库存占用反馈数量及有效期
  │
  ├──< EPM_URGENT_EXTEND (紧急要货延期申请单)
  │       │
  │       └──< EPM_URGENT_EXTEND_LINE (紧急要货延期申请明细)
  │
  └──< EPM_URGENT_ADJUST (紧急要货插单记录)

关联外部表:
  SA_OUT_BILL_HEAD ←── 紧急要货单.saOutBillHeadId (要货订单头)
  SA_OUT_BILL_LINE ←── 紧急要货行.saOutBillLineId (要货订单行)
  CUSTOMER ←── 客户信息
  LINKCRM.CRM_SALE_ORDER_V ←── CRM订单视图 (库存占用/延期推送)
```

#### 紧急要货单头字段（EPM_URGENT_ORDER）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| urgentOrderId | URGENT_ORDER_ID | Long | 主键 | 自增生成 |
| urgentOrderBillno | URGENT_ORDER_BILLNO | String | 紧急要货单号 | 编码规则生成 |
| saOutBillHeadId | SA_OUT_BILL_HEAD_ID | Long | 要货订单ID | 必填，关联SA_OUT_BILL_HEAD |
| saSalebillno | SA_SALEBILLNO | String | 要货单号 | 来源于要货订单 |
| dateApproval | DATE_APPROVAL | LocalDateTime | 审批日期 | 工作流审批通过时=LocalDateTime.now() |
| hzInstanceId | HZ_INSTANCE_ID | Long | H0流程实例ID | 工作流启动时赋值 |
| hzApproveStatus | HZ_APPROVE_STATUS | String | H0流程审批状态 | APPROVED/RUN/NEW等 |

#### 紧急要货行字段（EPM_URGENT_ORDER_LINE）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| urgentOrderLineId | URGENT_ORDER_LINE_ID | Long | 主键 | 自增生成 |
| urgentOrderId | URGENT_ORDER_ID | Long | 紧急要货单ID | 关联头表 |
| itemId | ITEM_ID | Long | 产品ID | 来源于sa_out_bill_line |
| itemCode | ITEM_CODE | String | 产品编码 | 来源于base_view_item_org |
| itemName | ITEM_NAME | String | 产品名称 | 来源于base_view_item_org |
| qtyBill | QTY_BILL | Long | 订单数量 | 来源于sa_out_bill_line.qty_bill |
| notShippedQty | NOT_SHIPPED_QTY | Long | 未出库数量 | = qty_bill - confirm_out_qty - cancel_qty |
| urgentQty | URGENT_QTY | Long | 紧急要货数量 | 前端传入 |
| intfResult | INTF_RESULT | String | 接口调用状态 | S=成功, E=错误 |
| intfInfo | INTF_INFO | String | 错误信息 | ERP接口返回 |
| validityTerm | VALIDITY_TERM | Long | 有效天数 | 审批通过时从系统参数VALIDITY_OF_STOCK_RETENTION读取 |
| validDate | VALID_DATE | LocalDateTime | 有效期至 | ERP返回的EFFECTIVE_DATE_TO |
| isCancel | IS_CANCEL | Long | 有效否 | 2=已取消/已失效 |
| isOverdue | IS_OVERDUE | Long | 是否已超期 | 2=是，ERP返回"超期"释放时置为2 |
| reservedQty | RESERVED_QTY | BigDecimal | 已占用数量 | ERP返回后累加更新 |
| preReservedQty | PRE_RESERVED_QTY | BigDecimal | 已预占数量 | ERP返回后更新；插单调整时加减 |
| releasedQty | RELEASED_QTY | Long | 已释放数量 | ERP释放后更新 |

#### 行有效性校验 — valid()

```text
行有效条件（全部满足）:
  ✓ intfResult == 'S'   (接口调用成功)
  ✓ isOverdue != 2      (未超期)
  ✓ isCancel != 2       (未取消)
  ✓ validDate >= now    (有效期未过)
  ✓ reservedQty + preReservedQty + releasedQty != 1  (数量未用完)
```

#### 库存保留记录（EPM_URGENT_ORDER_LINE_STOCK）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| pkId | PK_ID | Long | 主键 | 自增生成 |
| urgentOrderLineId | URGENT_ORDER_LINE_ID | Long | 紧急要货行ID | 关联行表 |
| seq | SEQ | Long | 序号 | = MAX(seq)+1 |
| reservedQty | RESERVED_QTY | BigDecimal | 库存保留数量 | ERP返回；插单时可负数 |
| preReservedQty | PRE_RESERVED_QTY | BigDecimal | 库存预占数量 | ERP返回 |
| reservedDate | RESERVED_DATE | LocalDateTime | 保留日期 | ERP返回/插单时=now() |
| validDate | VALID_DATE | LocalDateTime | 保留有效期 | ERP返回的EFFECTIVE_DATE_TO |
| isCancel | IS_CANCEL | Long | 有效否 | 1=有效, 2=已失效 |
| releasedType | RELEASED_TYPE | String | 释放类型 | 插单时="插单" |

</div>

<div class="kb-module-alt">

### 延期申请与插单调整

#### 延期申请单字段（EPM_URGENT_EXTEND）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| urgentExtendId | URGENT_EXTEND_ID | Long | 主键 | 自增生成 |
| urgentExtendBillno | URGENT_EXTEND_BILLNO | String | 延期单号 | 编码规则URGENT_EXTEND_BILLNO |
| urgentOrderId | URGENT_ORDER_ID | Long | 紧急要货单ID | 关联头表 |
| extendValidDate | EXTEND_VALID_DATE | LocalDate | 有效期延期至 | 前端传入，须>已延期的最大有效期 |
| stat | STAT | Long | 单据状态 | 新建=SAVE，审批通过=5(APPROVED) |
| hzApproveStatus | HZ_APPROVE_STATUS | String | H0流程审批状态 | APPROVED/RUN等 |

#### 延期行字段（EPM_URGENT_EXTEND_LINE）

| 字段名 | 数据库列名 | 类型 | 含义 |
|--------|-----------|------|------|
| urgentExtendLineId | URGENT_EXTEND_LINE_ID | Long | 主键 |
| urgentOrderLineId | URGENT_ORDER_LINE_ID | Long | 紧急要货行ID |
| validDate | VALID_DATE | LocalDate | 原有效期至 |
| extendValidDate | EXTEND_VALID_DATE | LocalDate | 申请延期至 |
| intfResult | INTF_RESULT | String | 接口状态 S/E |
| cannotExtend | CANNOT_EXTEND | Long | 不满足延期条件 2=是 |

#### 插单记录字段（EPM_URGENT_ADJUST）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| adjustId | ADJUST_ID | Long | 主键 | EPM_URGENT_ADJUST_S.NEXTVAL |
| urgentOrderLineId | URGENT_ORDER_LINE_ID | Long | 紧急要货行ID | 必填 |
| adjustType | ADJUST_TYPE | String | 调整类型 | "+"=调增(申请方), "-"=调减(被调整方) |
| adjustQty | ADJUST_QTY | BigDecimal | 调整数量 | 前端传入 |
| relAdjustId | REL_ADJUST_ID | Long | 关联插单行ID | 申请方与被调整方互相关联 |
| reservedIntfResult | RESERVED_INTF_RESULT | String | 接口状态 S/E | |
| customerId | CUSTOMER_ID | Long | 客户ID | 申请方/调整方各自客户 |
| deliveryBaseCode | DELIVERY_BASE_CODE | String | 发货基地编码 | 来源于紧急要货行 |

</div>

<div class="kb-module">

### 紧急要货核心流程

#### 创建/保存逻辑

1. **前端发起**：基于已有要货订单(sa_out_bill_head)，选择可紧急要货的订单行
2. **行数据筛选条件**（selectUrgentItem）：
   - 未出库数量 > 0：`(qty_bill - confirm_out_qty - cancel_qty) > 0`
   - 不禁止紧急要货：`cannot_urgent_order IS NULL OR <> 2`
   - 排除已添加的行
3. **行数据保存**：区分新增(urgentOrderLineId==null)和更新

#### 审批通过回调 — wfComplete()

1. 设置 dateApproval = LocalDateTime.now()
2. 从系统参数表读取有效天数(VALIDITY_OF_STOCK_RETENTION)
3. 批量更新所有明细行的 validityTerm = 有效天数
4. **调用库存占用申请**：doReserveApply()

</div>

<div class="kb-module-alt">

### 库存占用申请逻辑

#### doReserveApply() — 向ERP(EBS)发送库存占用请求

```text
事务隔离: REQUIRES_NEW（独立事务）

流程:
1. 参数校验 → 只能使用一种参数传递方式
2. 查询库存占用申请参数 → queryReserveApply SQL
3. 判断订单行是否已取消(isCancel==2)
4. 对未成功的行(intfResult!='S'):
   ├── 已取消 → 设置 intfResult='E', intfInfo='该要货信息已取消...'
   └── 未取消 → 构造EBS请求 → 调用ErpSdkService.stockReserveApply()
5. 解析EBS响应(L_RET_STATUS)
6. 处理反馈数据(reserveFeedbackProcess):
   ├── 从X_RESERVE_OUT_TBL_ITEM提取CRM_LINE_ID列表
   ├── 查询对应的紧急要货行
   ├── 解析ERP返回数据:
   │   ├── RESERVED_QUANTITY → 保留数量
   │   ├── PRE_RESERVED_QUANTITY → 预占数量
   │   ├── RESERVED_DATE/RESERVED_TIME → 保留日期
   │   └── EFFECTIVE_DATE_TO → 有效期至
   ├── 插入EPM_URGENT_ORDER_LINE_STOCK记录
   └── 更新紧急要货行的reservedQty、preReservedQty、validDate
```

</div>

<div class="kb-module">

### 延期申请逻辑

#### 延期详情查询

- 查询条件：HZ_APPROVE_STATUS='APPROVED' 且存在有效的紧急要货行
- 有效行条件：intfResult='S', isOverdue!=2, isCancel!=2, validDate>当前日期
- 计算maxValidDate：所有有效行的最大validDate

#### 延期保存/更新

1. 校验：延期时间 > 已延期的最大时间
2. 检查是否存在未审核完毕的延期申请单
3. 新建：生成单据号 → 创建头记录(stat=SAVE) → 插入延期行
4. 更新：更新延期头 → 删除旧行重新插入 → 保存附件

#### 延期审批通过回调 — wfComplete()

1. 若延期日期早于今天：全部行标记cannotExtend=2
2. 将行分为可推送ERP(valid()=true)和已失效两组
3. 对已失效行对应的延期行：设置cannotExtend=2
4. 对可推送行：调用toExtend()发送ERP延期请求
5. 成功(S)：更新延期行intfResult → 更新紧急要货行validDate=extendValidDate
6. 失败(E)：更新延期行intfResult和intfInfo

</div>

<div class="kb-module-alt">

### 插单调整逻辑

#### 插单流程

```text
1. 查询可发起插单的行 → intfResult='S', isOverdue!=2, validDate>=当前日期, preReservedQty>0
2. 查询可被插单的行 → 同发货基地+同产品编码+不同客户, reservedQty>0
3. 发送插单请求 → pushAdjust()
   ├── 校验：总调整数量不超过申请行preReservedQty
   ├── 校验：单行调整数量不超过adjustReservedQty
   ├── 构造EBS请求 → 调用epmUrgentAdjustInft发送插单调整
   ├── 解析EBS响应 → 获取X_RESERVE_OUT_TBL_ITEM
   └── 更新数量:
       ├── 申请方: reservedQty += adjustQty, preReservedQty -= adjustQty
       └── 调整方: reservedQty += adjustQty, preReservedQty -= adjustQty
   └── 插入库存保留记录:
       ├── 申请方: reservedQty=adjustQty(正数)
       └── 调整方: reservedQty=-adjustQty(负数), releasedType="插单"
   └── 插入插单记录:
       ├── 申请方: adjustType='+'
       └── 调整方: adjustType='-'
       └── 通过relAdjustId互相关联
   └── 对被调整方重新发送库存占用申请(doReserveApply)
```

</div>

<div class="kb-module">

### 流程发起前校验

#### workFlowStartVolidate()

```text
校验逻辑:
  关联sa_out_bill_head → 判断 order_stat IN (1, 11) 或 HZ_APPROVE_STATUS = 'NE'
  若 count > 0 → 抛出异常: "紧急要货订单对应的要货单状态为EBS退回或者制单状态，流程失败!"
```

### API接口清单

| URL | HTTP方法 | 功能说明 |
|-----|---------|---------|
| `/v1/{orgId}/epm-urgent-orders/` | GET | 紧急要货单据头分页列表 |
| `/v1/{orgId}/epm-urgent-orders/detail` | GET | 紧急要货单详情(含行+库存+延期+插单) |
| `/v1/{orgId}/epm-urgent-orders/work-flow-start-volidate` | GET | 流程发起前校验 |
| `/v1/{orgId}/epm-urgent-order-lines/select-urgent-item` | GET | 可紧急要货行弹窗查询 |
| `/v1/{orgId}/epm-urgent-extends/detail` | GET | 延期申请单详情 |
| `/v1/{orgId}/epm-urgent-extends/` | POST | 创建或更新延期申请单 |
| `/v1/{orgId}/epm-urgent-extends/` | DELETE | 删除延期申请单 |
| `/v1/{orgId}/epm-urgent-adjusts/get-sa-out-bill-data` | GET | 查询可发起插单的行 |
| `/v1/{orgId}/epm-urgent-adjusts/verify-data` | GET | 插单数据校验 |
| `/v1/{orgId}/epm-urgent-adjusts/select-sa-out-line` | GET | 查询可被插单的行 |
| `/v1/{orgId}/epm-urgent-adjusts/push-adjust` | POST | 发送插单请求 |

</div>

</div>

<div id="faq">

<div class="kb-module-alt">

### 常见问题 FAQ

#### Q1: 紧急要货单流程提交失败？

流程发起前校验(workFlowStartVolidate)：检查要货单状态。若 order_stat IN (1,11) 或 HZ_APPROVE_STATUS='NE'(EBS退回)，则报错。

排查SQL：
```text
SELECT order_stat, hz_approve_status
FROM SA_OUT_BILL_HEAD
WHERE sa_out_bill_head_id = #{要货单id}
```

#### Q2: ERP库存占用接口返回错误？

 intfResult='E' 表示接口调用失败。常见原因：
1. CRM订单行ID缺失(CRM_LINE_ID为空)
2. ERP系统内部错误
3. 订单行已取消(isCancel==2)

排查SQL：
```text
SELECT urgent_order_line_id, intf_result, intf_info, intf_time
FROM EPM_URGENT_ORDER_LINE
WHERE urgent_order_id = #{紧急要货单id}
```

#### Q3: 延期申请提交失败？

延期时间必须 > 已延期的最大时间，且不能存在未审核完毕的延期申请单。常见错误：
- "延期时间不能小于等于已延期的最大时间"
- "该紧急要货单存在有未审核完毕的延期申请单"

排查SQL：
```text
SELECT urgent_extend_id, stat, extend_valid_date
FROM EPM_URGENT_EXTEND
WHERE urgent_order_id = #{紧急要货单id}
```

#### Q4: 延期审批通过但行标记cannotExtend=2？

审批回调时检查：延期日期早于今天 → 全部行标记cannotExtend=2；行有效性校验valid()返回false → 对应延期行标记cannotExtend=2。

#### Q5: 插单调整数量校验失败？

校验规则：
- 同一申请行的总adjustQty不超过其preReservedQty
- 单行adjustQty不超过adjustReservedQty
失败信息："该记录的数量目前已不符合调整需求，请检查"

排查SQL：
```text
SELECT urgent_order_line_id, reserved_qty, pre_reserved_qty
FROM EPM_URGENT_ORDER_LINE
WHERE intf_result='S' AND is_overdue!=2 AND valid_date >= SYSDATE
```

#### Q6: 插单后库存保留数量异常？

插单调整后，申请方reservedQty增加、preReservedQty减少；调整方同样。被调整方会重新发送库存占用申请(doReserveApply)。检查EPM_URGENT_ORDER_LINE_STOCK记录确认调整是否生效。

#### Q7: 紧急要货行变为无效？

行无效的5种情况：接口未成功(intfResult!='S')、已超期(isOverdue==2)、已取消(isCancel==2)、有效期已过(validDate<now)、数量用完(reservedQty+preReservedQty+releasedQty==1)。

#### Q8: 提货时间变更校验失败？

校验要货订单是否存在未完成的紧急要货行变更或延期申请。若存在则变更失败。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

### 排查工作流

#### Step 1: 确认要货订单状态

```text
SELECT sa_out_bill_head_id, order_stat, hz_approve_status
FROM SA_OUT_BILL_HEAD
WHERE sa_out_bill_head_id = #{要货单id}
```

预期：order_stat NOT IN (1,11)，HZ_APPROVE_STATUS NOT 'NE'

#### Step 2: 确认紧急要货单头和行

```text
SELECT urgent_order_id, urgent_order_billno, hz_approve_status, date_approval
FROM EPM_URGENT_ORDER
WHERE sa_out_bill_head_id = #{要货单id}

SELECT urgent_order_line_id, item_code, item_name, urgent_qty, intf_result, intf_info, 
  reserved_qty, pre_reserved_qty, valid_date, is_cancel, is_overdue
FROM EPM_URGENT_ORDER_LINE
WHERE urgent_order_id = #{紧急要货单id}
```

#### Step 3: 确认库存保留记录

```text
SELECT pk_id, seq, reserved_qty, pre_reserved_qty, reserved_date, valid_date, is_cancel, released_type
FROM EPM_URGENT_ORDER_LINE_STOCK
WHERE urgent_order_line_id IN (SELECT urgent_order_line_id FROM EPM_URGENT_ORDER_LINE WHERE urgent_order_id = #{紧急要货单id})
```

#### Step 4: 确认延期申请状态

```text
SELECT urgent_extend_id, urgent_extend_billno, stat, hz_approve_status, extend_valid_date
FROM EPM_URGENT_EXTEND
WHERE urgent_order_id = #{紧急要货单id}
```

#### Step 5: 确认插单记录

```text
SELECT adjust_id, urgent_order_line_id, adjust_type, adjust_qty, customer_id, 
  reserved_intf_result, rel_adjust_id
FROM EPM_URGENT_ADJUST
WHERE urgent_order_line_id IN (行ID列表)
```

</div>

</div>

<div id="history">

<div class="kb-module-alt">

### 历史排查记录

| 日期 | 问题描述 | 排查结果 | 解决方案 |
|------|---------|---------|---------|
| — | 暂无历史排查记录 | — | — |

</div>

</div>

<div id="related">

<div class="kb-module">

### 关联模块

#### 上游依赖

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| 要货订单(SA_OUT_BILL_HEAD/LINE) | 紧急要货基于要货订单发起 | 要货单状态影响流程发起 |
| CRM订单系统 | 库存占用/延期推送需CRM订单行ID | CRM数据缺失导致ERP接口失败 |
| ERP(EBS)系统 | 库存占用/延期/插单均调用EBS接口 | EBS返回数据影响保留数量和有效期 |
| 客户信息(CUSTOMER) | 插单时需不同客户筛选 | 客户数据影响插单匹配 |
| 产品信息 | 行数据需产品编码/名称/型号 | 产品数据影响行展示 |
| 系统参数 | 有效天数(VALIDITY_OF_STOCK_RETENTION) | 参数值影响有效期计算 |
| 工作流系统 | 紧急要货和延期均走工作流审批 | 流程状态变更触发后续操作 |

#### 下游影响

| 模块 | 说明 | 影响方式 |
|------|------|---------|
| ERP库存 | 库存占用/释放/调整影响ERP库存数据 | 占用数量减少可用库存 |
| 要货订单提货时间 | 提货时间变更需校验紧急要货行 | 未完成变更阻塞提货时间修改 |
| 发货基地 | 库存占用按发货基地分配 | 不同基地的库存独立管理 |
| 工程服务费报销 | 紧急要货行的计合同折扣/广告费/开单折扣标志 | 影响服务费计算 |

</div>

</div>
