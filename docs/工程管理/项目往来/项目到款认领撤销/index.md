---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EPM_PAYMENT_ALLOT_CANCEL (撤销认领头表)
  │
  ├──< EPM_PAD_CANCEL (撤销认领明细表)
  │       └── paymentAllotDetailId → EPM_PAYMENT_ALLOT_DETAIL (更新cancel_flag)
  │
  └── projectId → EPM_PROJECT (项目)

级联更新:
  EPM_PAYMENT_ALLOT_DETAIL ←── cancel_flag更新为Y
  EPM_PAYMENT_IMPORT ←── unallot_amt回加撤销金额
```

#### 撤销头表字段（EPM_PAYMENT_ALLOT_CANCEL）

| 字段名 | 类型 | 含义 | 关键说明 |
|--------|------|------|---------|
| id | Long | 撤销单ID | 主键，自增 |
| cancelNo | String | 撤销单号 | 编码规则：部门编码+AE.EPM_PAYMENT_ALLOT_CANCEL_NO |
| cancelDate | Date | 撤销时间 | 审批通过时更新 |
| projectId | Long | 项目ID | |
| cancelReason | String | 撤销原因 | |
| stat | Long | 撤销状态 | |
| hzApproveStatus | String | 审批状态 | NEW/RUN/APPROVED/REJECTED/REBUT |
| hzInstanceId | Long | 审批实例ID | |
| organizationId | Long | 事业部ID | |

#### 撤销明细表字段（EPM_PAD_CANCEL）

| 字段名 | 类型 | 含义 |
|--------|------|------|
| id | Long | 撤销明细ID（主键） |
| cancelId | Long | 撤销单ID（外键→EPM_PAYMENT_ALLOT_CANCEL） |
| paymentAllotDetailId | Long | 认领明细ID（外键→EPM_PAYMENT_ALLOT_DETAIL） |

</div>

<div class="kb-module">

### API接口

**撤销认领接口**（`/v1/{organizationId}/epm-payment-allot-cancels`）：

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| POST | /save | 保存撤销认领 |
| POST | /list/search | 撤销列表查询 |
| GET | /list/export | 撤销列表导出 |

</div>

<div class="kb-module">

### 撤销保存逻辑

**新增** (`save`，id=null)：
1. 生成撤销单号(部门编码+编码规则)
2. 设置stat=1, wfid=0, wfflag=0
3. 调用`verifyBeforeInsert`校验
4. 插入撤销头(EPM_PAYMENT_ALLOT_CANCEL)
5. 插入撤销明细(EPM_PAD_CANCEL)：`deleteByCancelId`删除旧明细后重新插入

**更新** (`save`，id!=null)：
1. 删除旧的撤销明细行
2. 重新插入撤销明细行
3. `verifyBeforeInsert`校验
4. 更新撤销头修改人/时间

**撤销前校验** (`verifyBeforeInsert`)：

按报销单(svcExpAccId)分组校验：
- 查询本次撤销的工程服务费合计cancelServiceChargeAmt
- 查询报销单认领信息：totalClaimAmt, totalClaimServiceAmt, returnServiceAmt
- 查询已申请兑现金额appliedAmt
- **可结算工程服务费** = totalClaimServiceAmt - cancelServiceChargeAmt - returnServiceAmt - appliedAmt
- 若可结算工程服务费 < 0 → "不允许撤销：报销单号-X"

</div>

<div class="kb-module">

### 审批流程

**流程提交** (`wfProcSubmit`)：
1. 校验撤销单存在性
2. 查询撤销明细列表
3. **校验明细是否有已被撤销的**：cancelFlag=Y的记录→提示剔除后再重新提交
4. 发起HZERO工作流
5. 更新hzApproveStatus=RUN

**审批回调** (`wfComplete`)：

| 审批结果 | 处理逻辑 |
|---------|---------|
| APPROVED(通过) | 推送ERP撤销数据 + 更新明细cancel_flag=Y + 金额回加到到款单 |
| REJECTED/REBUT(驳回) | 仅更新撤销单审批状态 |

**审批通过后的级联操作**：

1. **推送ERP撤销数据** (`pushAllotCancelDataToErp`)：
   - 关联7张表查询撤销明细行数据
   - 按paymentAllotId分组
   - **所有金额取负值**
   - sourceType=REVOKE_CLAIM
   - 虚拟到款单传creditMemoId
   - 组装AR_APPLY/OM_CLAIM/OM_APPLY推送到ERP

2. **更新认领明细**：cancel_flag='Y'

3. **金额回加**：将claim_amt加回到款单的unallot_amt

4. **更新撤销时间**：cancelDate=当前时间

</div>

<div class="kb-module">

### ERP撤销推送逻辑

**数据组装** (`pushAllotCancelDataToErp`)：

1. 按认领单ID(paymentAllotId)分组
2. 遍历每组：
   - **AR_APPLY**：按customerTrxId分组汇总，金额取负
   - **OM_CLAIM**：逐行组装，金额取负
   - **OM_APPLY**：按DELIVERY_NUMBER分组汇总，金额取负
   - 头信息：actionStatus=APPROVE, sourceType=REVOKE_CLAIM, revokeSourceId=原认领单ID
3. 调用`arrowEbsSdk.pushAllotDatas`推送
4. 处理ERP返回结果：任一记录returnStatus!="S"则报错

**关键区别**（撤销vs正常认领推送）：
- 所有金额取负
- sourceType=REVOKE_CLAIM（而非正常认领的来源类型）
- 虚拟到款单时传creditMemoId
- revokeSourceId指向原认领单

</div>

<div class="kb-module">

### 状态流转

**撤销审批状态(hzApproveStatus)**：

```text
NEW(新建) → RUN(审批中)
  ├── APPROVED(审批通过) → 推送ERP + cancel_flag=Y + 金额回加
  ├── REJECTED(驳回) → 仅更新状态，不回加金额
  └── REBUT(反驳) → 仅更新状态，不回加金额
```

**认领明细级联更新**：

```text
审批通过前: cancel_flag = 'N' (有效认领)
审批通过后: cancel_flag = 'Y' (已撤销)
```

**到款单金额回加**：

```text
审批通过后: EPM_PAYMENT_IMPORT.unallot_amt += 撤销的claim_amt
```

**特别注意**：
- 驳回/反驳等审批结果**不回加金额**，也不影响ERP推送
- 只有APPROVED才会执行完整的撤销逻辑

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1：撤销认领和删除认领有什么区别？ 🔴高频

删除认领只适用于NEW/INTERRUPT状态的认领单，直接删除数据记录；撤销认领适用于已审批通过的认领单，需要走审批流程，审批通过后推送ERP取消核销、标记明细cancel_flag=Y、金额回加到到款单。

</div>

<div class="kb-module-alt">

### Q2：为什么撤销前要按报销单分组校验？

因为工程服务费可能与报销单关联，撤销后可能导致可结算工程服务费小于0（即已报销的金额无法追回），这种情况下不允许撤销。

</div>

<div class="kb-module">

### Q3：撤销推送ERP时为什么所有金额取负？

撤销是反向操作，取负值表示取消之前推送的核销金额，ERP侧通过负值冲销原核销记录。

</div>

<div class="kb-module-alt">

### Q4：明细已被撤销的还能再发起撤销吗？

不能。wfProcSubmit校验时会检查明细中是否有cancelFlag=Y的记录，如果有则提示剔除后再重新提交。

</div>

<div class="kb-module">

### Q5：审批驳回后能否重新提交？

可以。驳回后撤销单状态更新为REJECTED/REBUT，用户可以编辑后重新提交审批。

</div>

<div class="kb-module-alt">

### Q6：虚拟到款单撤销推送有什么特殊处理？

虚拟到款单(VIRTUAL_RECEIPT)推送时需要传creditMemoId，而非真实到款单的source_system_no。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：查撤销单基本信息**

```sql
SELECT id, cancel_no, cancel_reason, hz_approve_status, cancel_date, project_id
FROM epm_payment_allot_cancel WHERE id = #{cancelId};
```

> 异常判断：查不到→撤销单被删除；hz_approve_status与实际状态不一致→数据异常

</div>

<div class="kb-module-alt">

**步骤2：查撤销明细（关联认领明细）**

```sql
SELECT pc.cancel_id, pc.payment_allot_detail_id, ad.claim_amt, ad.return_amt
FROM epm_pad_cancel pc
JOIN epm_payment_allot_detail ad ON pc.payment_allot_detail_id = ad.payment_allot_detail_id
WHERE pc.cancel_id = #{cancelId};
```

</div>

<div class="kb-module">

**步骤3：查认领明细撤销状态**

```sql
SELECT ad.payment_allot_detail_id, ad.cancel_flag, ad.claim_amt
FROM epm_payment_allot_detail ad
JOIN epm_pad_cancel pc ON ad.payment_allot_detail_id = pc.payment_allot_detail_id
WHERE pc.cancel_id = #{cancelId};
```

</div>

<div class="kb-module-alt">

**步骤4：查到款单金额是否已回加**

```sql
SELECT epi.payment_import_id, epi.unallot_amt, epi.allot_status
FROM epm_payment_allot pa
JOIN epm_payment_import epi ON pa.payment_import_id = epi.payment_import_id
WHERE pa.payment_allot_id IN (
  SELECT DISTINCT a.payment_allot_id FROM epm_payment_allot_detail a
  JOIN epm_pad_cancel pc ON a.payment_allot_detail_id = pc.payment_allot_detail_id
  WHERE pc.cancel_id = #{cancelId}
);
```

</div>

<div class="kb-module">

**步骤5：查撤销列表（含ERP错误信息）**

```sql
SELECT t.id, t.cancel_no, t.hz_approve_status, ep.project_code, ep.project_name, msg.err_msg
FROM epm_payment_allot_cancel t
JOIN epm_project ep ON t.project_id = ep.project_id
LEFT JOIN sys_exception_msg msg ON t.id = msg.objid AND msg.objtypename='到款认领撤销'
WHERE t.id = #{cancelId};
```

</div>

<div class="kb-module-alt">

**上游依赖**：回款认领(EPM_PAYMENT_ALLOT)→cancelFlag校验、工程服务费报销→可结算金额校验

**下游影响**：到款单(EPM_PAYMENT_IMPORT)→unallotAmt回加、ERP系统→撤销核销推送(金额取负)

</div>

</div>

<div id="history">

<div class="kb-module">

### 历史排查记录

*(本模块暂无历史排查记录，后续遇到问题后会在此补充)*

</div>

</div>

<div id="related">

<div class="kb-module">

### 关联模块

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 项目到款认领(EpmPaymentAllot) | 撤销明细.paymentAllotDetailId | cancel_flag从N→Y |
| 项目到款引入(EpmPaymentImport) | 金额回加 | 撤销审批通过后unallot_amt增加 |
| 工程服务费报销(EpmServiceFee) | verifyBeforeInsert校验 | 撤销后可结算工程服务费≥0 |
| 工程服务费兑现(EpmServiceFeeCash) | appliedAmt查询 | 撤销前校验已申请兑现金额 |
| ERP系统(EBS) | pushAllotDatas | sourceType=REVOKE_CLAIM，金额取负 |

</div>

</div>
