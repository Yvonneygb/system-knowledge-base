<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="工程项目结案" desc="工程管理-项目商机业务说明" />

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

```
创建结案单 → 选择结案类型(项目结案/合同结案) → 提交工作流(CONTRACT_COMPLETED_MAIN) → 审批通过 → 执行结案逻辑 → 更新项目进度 → 推送CRM
```

</KbCard>

<KbCard num="2" title="流程节点说明">

| 节点 | 说明 | 操作人 |
|------|------|--------|
| 创建结案单 | 填写结案类型(正常/提前/逾期)、结案说明、备注 | 业务人员 |
| 提交工作流 | 工作流编码: `CONTRACT_COMPLETED_MAIN`，进入审批流程 | 业务人员 |
| 审批通过 | 工作流回调 `wfComplete`，审批结果为 `APPROVED`(code=5) 时触发 `doAudit` | 审批人 |
| 执行结案逻辑 | 根据操作类型(actionType)分别执行合同结案或项目结案 | 系统自动 |
| 更新项目进度 | 将项目进度阶段更新为"项目结案" | 系统自动 |
| 推送CRM | 将报备失效状态(validStatus=0)推送到CRM系统 | 系统自动 |

</KbCard>

<KbCard num="3" title="结案类型">

| 类型 | actionType | 说明 |
|------|-----------|------|
| 项目结案 | 1 | 将项目下所有已审批合同批量结案，同时将报备设为失效 |
| 合同结案 | 2 | 将指定合同及关联增补合同结案 |

</KbCard>

<KbCard num="4" title="结案状态值集">

| 值 | 含义 | 值集编码 |
|----|------|---------|
| 1 | 正常结案 | `AE.EPM.CONTRACT_COMPLETED_TYPE` |
| 2 | 提前结案 | `AE.EPM.CONTRACT_COMPLETED_TYPE` |
| 3 | 逾期结案 | `AE.EPM.CONTRACT_COMPLETED_TYPE` |

---

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="合同结案(actionType=2)核心逻辑">

- 将目标合同的结案日期设为当前时间，结案类型设为提交时选择的值，有效状态设为失效(3)
- 查询该合同下所有增补合同(主合同ID=当前合同ID)，批量更新增补合同的结案日期和结案类型
- **增补合同不会更新有效状态**，仅更新结案日期和结案类型

</KbCard>

<KbCard num="2" title="项目结案(actionType=1)核心逻辑">

- 查询项目下所有审批状态为"审批通过"的合同，批量更新有效状态为失效(3)、结案日期为当前时间、结案类型为提交时选择的值
- 将项目报备的有效状态设为失效(3)，项目进度状态设为2，记录结案时间

</KbCard>

<KbCard num="3" title="项目进度更新">

- 查询阶段定义表中阶段名称为"项目结案"的记录，获取阶段ID
- 调用项目阶段服务更新进度，内容格式为: `{日期}项目结案`

</KbCard>

<KbCard num="4" title="CRM推送">

- 查询项目关联的报备记录，获取客户信息
- 推送数据包含: 客户编码、客户名称、客户简称、组织编码、报备编号、项目名称、有效状态(0=失效)
- 推送失败仅记录日志，不影响结案主流程

</KbCard>

<KbCard num="5" title="增补合同结案字段重置">

- 新增增补合同时，结案日期和结案状态会被重置为空

</KbCard>

<KbCard num="6" title="前端展示逻辑">

- 结案日期和结案状态字段均为只读(disabled=true)，由后端结案审批通过后自动回写
- 列表页支持按结案状态筛选查询
- 结案状态值为0时，前端转换为null不展示

---

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="API接口">

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/v1/{organizationId}/epm-contract-completeds/detail` | 查询结案详情(关联合同列表+出库明细) |

</KbCard>

<KbCard num="2" title="detail接口逻辑">

**入参:** `EpmContractCompletedDTO`，关键字段: `flag`、`actionType`、`contractId`、`projectId`

<KbSubTitle>场景1: flag=9 且 actionType=2 (合同结案查询)</KbSubTitle>


1. 根据 `contractId` 查询主合同下所有增补合同列表
2. 查询合同关联的出库明细(已审核且未发货数量>0)
3. 返回合同列表 + 出库明细

<KbSubTitle>场景2: flag=9 且 actionType=1 (项目结案查询)</KbSubTitle>


1. 根据 `projectId` 查询项目下所有合同列表
2. 关联主合同信息(主合同编码、名称)
3. 查询合同关联的出库明细
4. 返回合同列表 + 出库明细

</KbCard>

<KbCard num="3" title="doAudit审核逻辑(工作流审批通过回调)">

```
wfComplete(dto) → 判断审批结果 == APPROVED → doAudit(epmContractCompleted)
```

<KbSubTitle>合同结案(actionType=2)</KbSubTitle>


```
1. 查询目标合同 → 设置 completedDate=now, completedType=提交值, valid=3
2. 更新合同(COMPLETED_DATE, COMPLETED_TYPE, VALID)
3. 查询增补合同(MAIN_CONTRACT_ID=当前合同ID)
4. 批量更新增补合同(COMPLETED_DATE=now, COMPLETED_TYPE=提交值)
```

<KbSubTitle>项目结案(actionType=1)</KbSubTitle>


```
1. 查询项目下所有已审批通过的合同(HZ_APPROVE_STATUS=APPROVED)
2. 批量更新合同(VALID=3, COMPLETED_DATE=now, COMPLETED_TYPE=提交值)
3. 更新项目报备(PROJECT_VALID=3, PROJECT_STAGE_TYPE=2, CLOSE_PROJECT_TIME=now)
```

<KbSubTitle>公共逻辑</KbSubTitle>


```
1. 查询阶段定义(STAGE_NAME='项目结案') → 获取STAGE_ID
2. 更新项目进度(内容: "{日期}项目结案")
3. 查询项目报备 → 获取客户信息
4. 推送CRM(indivireportAdd): validStatus=0
```

</KbCard>

<KbCard num="4" title="出库明细查询SQL逻辑">

```sql
SELECT l.*, i.ITEM_CODE, i.ITEM_NAME, h.SA_SALEBILLNO, h.CONTRACT_CODE, h.CONTRACT_NAME
FROM SA_OUT_BILL_LINE l
LEFT JOIN SA_OUT_BILL_HEAD h ON h.SA_OUT_BILL_HEAD_ID = l.SA_OUT_BILL_HEAD_ID
LEFT JOIN ITEM i ON i.ITEM_ID = l.ITEM_ID
WHERE h.ORDER_STAT = 3
  AND (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) > 0
  AND h.CONTRACT_ID = #{contractId}   -- 合同结案时
  -- 或 h.CONTRACT_ID IN (#{contractIds}) -- 项目结案时
```

---

</KbCard>

<KbCard num="1" title="EPM_CONTRACT_COMPLETED (工程项目合同结案主表)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| CONTRACT_COMPLETED_ID | BIGINT | 主键，工程项目合同结案ID |
| ORGANIZATION_ID | BIGINT | 组织ID |
| COMPLETED_CODE | VARCHAR | 合同结案单号 |
| CONTRACT_ID | BIGINT | 工程项目合同ID(合同结案时使用) |
| PROJECT_ID | BIGINT | 工程项目ID(项目结案时使用) |
| COMPLETED_TYPE | VARCHAR | 结案类型(1=正常结案,2=提前结案,3=逾期结案) |
| COMPLETED_DESC | VARCHAR | 结案说明 |
| REMARK | VARCHAR | 备注 |
| STAT | BIGINT | 单据状态(已弃用，使用HZ_APPROVE_STATUS) |
| WFID | BIGINT | 流程ID |
| WFFLAG | BIGINT | 流程状态 |
| ACTION_TYPE | BIGINT | 操作类型(1=项目结案,2=合同结案) |
| SALE_REGION | VARCHAR | 经销商销售区域 |
| HZ_INSTANCE_ID | BIGINT | H0流程实例ID |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 |
| CALLBACK_SOURCE | VARCHAR | 外部审批回调来源 |
| CREATION_DATE | DATETIME | 创建时间 |
| CREATED_BY | BIGINT | 创建人 |
| LAST_UPDATE_DATE | DATETIME | 最后更新时间 |
| LAST_UPDATED_BY | BIGINT | 最后更新人 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 |

</KbCard>

<KbCard num="2" title="EPM_PROJECT_CONTRACT (工程项目合同表 - 结案相关字段)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| CONTRACT_ID | BIGINT | 主键，工程项目合同ID |
| PROJECT_ID | BIGINT | 工程项目ID |
| MAIN_CONTRACT_ID | BIGINT | 主合同ID(>0时为增补合同) |
| COMPLETED_DATE | DATETIME | 结案日期，系统自动回写 |
| COMPLETED_TYPE | BIGINT | 结案类型，系统自动回写(1=正常,2=提前,3=逾期) |
| VALID | BIGINT | 有效状态(1=未审核,2=有效,3=失效) |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 |
| CONTRACT_CODE | VARCHAR | 合同编码 |
| CONTRACT_NAME | VARCHAR | 合同名称 |

</KbCard>

<KbCard num="3" title="EPM_PROJECT (项目信息表 - 结案相关字段)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_ID | BIGINT | 主键，项目ID |
| PROJECT_VALID | BIGINT | 项目有效状态(1=未生效,2=已生效,3=已失效,4=已冻结) |
| PROJECT_STAGE_TYPE | BIGINT | 项目进度状态 |
| CLOSE_PROJECT_TIME | DATETIME | 结案时间 |
| PROJECT_CODE | VARCHAR | 项目编码 |
| PROJECT_NAME | VARCHAR | 项目名称 |

</KbCard>

<KbCard num="4" title="EPM_STAGE_DEF (项目阶段定义表)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| STAGE_ID | BIGINT | 主键，阶段ID |
| ORGANIZATION_ID | BIGINT | 组织ID |
| STAGE_NAME | VARCHAR | 阶段名称(结案时查询STAGE_NAME='项目结案') |
| SEQ | BIGINT | 序号 |
| UPDATE_MODE | BIGINT | 更新方式(1=手动,2=自动) |

</KbCard>

<KbCard num="5" title="EPM_REPORT (项目报备表 - CRM推送相关字段)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| REPORT_ID | BIGINT | 主键，报备ID |
| PROJECT_ID | BIGINT | 项目ID |
| CUSTOMER_ID | BIGINT | 客户ID |
| CUSTOMER_CODE | VARCHAR | 客户编码 |
| CUSTOMER_NAME | VARCHAR | 客户名称 |
| PROJECT_CODE | VARCHAR | 项目编码 |
| PROJECT_NAME | VARCHAR | 项目名称 |
| DIVISION_NAME | VARCHAR | 组织名称 |

</KbCard>

<KbCard num="6" title="SA_OUT_BILL_HEAD (出库单头表 - 结案查询关联)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| SA_OUT_BILL_HEAD_ID | BIGINT | 主键，出库单头ID |
| CONTRACT_ID | BIGINT | 合同ID |
| ORDER_STAT | BIGINT | 单据状态(3=已审核) |
| SA_SALEBILLNO | VARCHAR | 要货单号 |
| CONTRACT_CODE | VARCHAR | 合同编码 |
| CONTRACT_NAME | VARCHAR | 合同名称 |

</KbCard>

<KbCard num="7" title="SA_OUT_BILL_LINE (出库单行表 - 结案查询关联)">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| SA_OUT_BILL_LINE_ID | BIGINT | 主键，出库单行ID |
| SA_OUT_BILL_HEAD_ID | BIGINT | 出库单头ID |
| ITEM_ID | BIGINT | 物料ID |
| QTY_BILL | BIGINT | 开单数量 |
| CONFIRM_OUT_QTY | BIGINT | 出库确认数量 |
| CANCEL_QTY | BIGINT | 取消数量 |
| ITEM_CODE | VARCHAR | 物料编码(关联ITEM表) |
| ITEM_NAME | VARCHAR | 物料名称(关联ITEM表) |

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
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">结案审批通过后合同状态没有更新为失效？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>工作流审批状态未更新为APPROVED(5)，或回调接口未正确触发。
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询结案单审批状态
SELECT ECC.CONTRACT_COMPLETED_ID, ECC.COMPLETED_CODE, ECC.ACTION_TYPE, ECC.HZ_APPROVE_STATUS, ECC.COMPLETED_TYPE
FROM EPM_CONTRACT_COMPLETED ECC
WHERE ECC.COMPLETED_CODE = '结案单号';
-- 2. 查询合同当前有效状态和结案信息
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.VALID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE, EPC.HZ_APPROVE_STATUS
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 合同ID;
-- 3. 检查工作流实例状态
SELECT ECC.HZ_INSTANCE_ID, ECC.HZ_APPROVE_STATUS
FROM EPM_CONTRACT_COMPLETED ECC
WHERE ECC.CONTRACT_COMPLETED_ID = 结案ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">项目结案后报备状态未失效？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>项目结案(actionType=1)审批未通过，或doAudit执行异常。
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询项目当前状态
SELECT EP.PROJECT_ID, EP.PROJECT_CODE, EP.PROJECT_VALID, EP.PROJECT_STAGE_TYPE, EP.CLOSE_PROJECT_TIME
FROM EPM_PROJECT EP
WHERE EP.PROJECT_ID = 项目ID;
-- 2. 查询报备状态
SELECT ER.REPORT_ID, ER.PROJECT_ID, ER.HZ_APPROVE_STATUS, ER.CUSTOMER_CODE, ER.CUSTOMER_NAME
FROM EPM_REPORT ER
WHERE ER.PROJECT_ID = 项目ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">合同结案后增补合同未结案？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询主合同下的增补合同
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.MAIN_CONTRACT_ID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE, EPC.VALID
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.MAIN_CONTRACT_ID = 主合同ID;
-- 2. 对比主合同结案信息
SELECT EPC.CONTRACT_ID, EPC.CONTRACT_CODE, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 主合同ID;</code></pre>
      <br>
      <strong style="color:#7C3AED;">说明：</strong>合同结案时增补合同仅更新结案日期和结案类型，不更新有效状态(VALID)，这是设计行为。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">结案后CRM推送失败？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询报备关联客户信息
SELECT ER.REPORT_ID, ER.PROJECT_ID, ER.CUSTOMER_ID, ER.CUSTOMER_CODE, ER.CUSTOMER_NAME, ER.DIVISION_NAME
FROM EPM_REPORT ER
WHERE ER.PROJECT_ID = 项目ID;
-- 2. 查询客户详细信息
SELECT C.CUSTOMER_ID, C.CUSTOMER_CODE, C.CUSTOMER_NAME, C.SHORT_NAME
FROM CUSTOMER C
WHERE C.CUSTOMER_ID = 客户ID;</code></pre>
      <br>
      <strong style="color:#7C3AED;">说明：</strong>CRM推送失败不影响结案主流程，系统仅记录错误日志。检查日志搜索关键字: `将报备状态推送到CRM推送失败`。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">结案后项目进度未更新？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>阶段定义表中缺少STAGE_NAME='项目结案'的记录，导致查询报空指针。
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>-- 1. 查询"项目结案"阶段定义
SELECT ESD.STAGE_ID, ESD.STAGE_NAME, ESD.ORGANIZATION_ID
FROM EPM_STAGE_DEF ESD
WHERE ESD.STAGE_NAME = '项目结案'
  AND ESD.ORGANIZATION_ID = 组织ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q6</span>
      <span style="font-size:15px;">如何查询结案单关联的出库未发货明细？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT l.SA_OUT_BILL_LINE_ID, l.ITEM_ID, i.ITEM_CODE, i.ITEM_NAME,
       l.QTY_BILL, l.CONFIRM_OUT_QTY, l.CANCEL_QTY,
       (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) AS UNDELIVERED_QTY,
       h.SA_SALEBILLNO, h.CONTRACT_CODE, h.CONTRACT_NAME
FROM SA_OUT_BILL_LINE l
LEFT JOIN SA_OUT_BILL_HEAD h ON h.SA_OUT_BILL_HEAD_ID = l.SA_OUT_BILL_HEAD_ID
LEFT JOIN ITEM i ON i.ITEM_ID = l.ITEM_ID
WHERE h.ORDER_STAT = 3
  AND (l.QTY_BILL - l.CONFIRM_OUT_QTY - l.CANCEL_QTY) &gt; 0
  AND h.CONTRACT_ID = 合同ID;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q7</span>
      <span style="font-size:15px;">结案日期和状态前端显示为空？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT EPC.CONTRACT_ID, EPC.COMPLETED_DATE, EPC.COMPLETED_TYPE
FROM EPM_PROJECT_CONTRACT EPC
WHERE EPC.CONTRACT_ID = 合同ID;</code></pre>
      <br>
      <strong style="color:#7C3AED;">说明：</strong>COMPLETED_TYPE值为0时，前端会转换为null不展示。结案审批通过后系统自动回写结案日期和类型，若为空说明结案审批未通过。
    </div>
  </div>
</div>
</KbCard>

</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|---------|--------|
| 2026-07-28 | v1.0 | 初始创建，梳理工程项目结案完整业务逻辑 | AI |
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
