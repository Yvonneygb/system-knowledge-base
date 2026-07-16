---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

**核心表结构**：

```text
EPM_PROJECT_CONTRACT (工程项目合同主表)
  │
  ├──< EPM_CONTRACT_TERMS (合同约定条款表)
  ├──< EPM_CONTRACT_ITEM (合同产品清单表)
  ├──< EPM_CONTRACT_COMPLETED (合同结案表)
  ├──< EPM_PROJECT_CONTRACT_ECN (合同变更单表)
  │       └──< EPM_PAYMENT_PLAN_ECN (付款计划变更表)
  ├──< EPM_DISCOUNT_APPLY (折扣申请单头表)
  │       ├──< EPM_DISCOUNT_APPLY_LINE (折扣申请单行表)
  │       │     └──< EPM_DISCOUNT_APPLY_LINE_EXT (折扣申请行扩展表)
  │       └──< EPM_DISCOUNT_APPLY_PLAN (折扣申请提货计划表)
  ├──< EPM_DISCOUNT_ECN (折扣变更单头表)
  │       ├──< EPM_DISCOUNT_ECN_LINE (折扣变更单行表)
  │       │     └──< EPM_DISCOUNT_ECN_LINE_EXT (折扣变更行扩展表)
  │       └──< EPM_DISCOUNT_ECN_PLAN (折扣变更提货计划表)
  ├──< EPM_CONTRACT_INTENTION_REL (合同意向单关联表)
  ├──< EPM_CONTRACT_ADDRESS_EXT (合同地址扩展表)
  ├──< EPM_PAYMENT_PLAN_SET (付款计划/周期条件表)
  ├──< EPM_CONTRACT_CHANNEL_REL_H (合同渠道关联头表)

关联外部表:
  EPM_PROJECT ←── 合同.projectId
  EPM_PROJECT_ECN ←── 合同变更单.ecnId
  SA_OUT_BILL_HEAD ←── 意向单关联.outBillHeadId
  CUSTOMER_ADDRESS ←── 合同地址
  CM_DISC_PRESET_RATE_DTL ←── 折扣预设率明细
```

#### 合同主表字段（EPM_PROJECT_CONTRACT）

| 字段名 | 数据库列名 | 类型 | 含义 | 取值/赋值逻辑 |
|--------|-----------|------|------|-------------|
| contractId | CONTRACT_ID | Long | 工程项目合同ID | 主键，自增 |
| contractCode | CONTRACT_CODE | String | 合同编码 | 自动生成：事业部编码+编码规则AE_EPM_PROJECT_CONTRACT+序号 |
| contractName | CONTRACT_NAME | String | 合同名称 | @NotNull，长度≤80 |
| contractCharacter | CONTRACT_CHARACTER | String | 合同性质 | AR=收款合同；AP=付款合同 |
| contractType | CONTRACT_TYPE | Long | 签约类型 | 1=直销/自营工程；2=经销 |
| contractAmt | CONTRACT_AMT | String | 合同总额 | |
| contractMode | CONTRACT_MODE | Long | 操作模式 | 1=自营工程；2=经销商服务，默认0 |
| isFrame | IS_FRAME | Long | 是否战略协议 | 2=是；非2=否 |
| valid | VALID | Long | 有效状态 | 1=未审核；2=有效；3=失效；7=审批中 |
| hzApproveStatus | HZ_APPROVE_STATUS | String | 审批状态 | NEW/RUN/APPROVED/REJECTED/REBUT |
| projectId | PROJECT_ID | Long | 工程项目ID | |
| partyAId | PARTY_A_ID | Long | 甲方客户ID | |
| partyAName | PARTY_A_NAME | String | 甲方名称 | |
| partyBName | PARTY_B_NAME | String | 乙方名称 | |
| customerId | CUSTOMER_ID | Long | 客户ID | |
| tradingCompanyId | TRADING_COMPANY_ID | Long | 交易公司ID | |
| supplementType | SUPPLEMENT_TYPE | Long | 增补类型 | 1=新增合同；2=合同增补 |
| mainContractId | MAIN_CONTRACT_ID | Long | 主合同ID | >0时为增补合同 |
| isHome | IS_HOME | Long | 是否家装 | 2=是 |
| isCustom | IS_CUSTOM | Long | 是否纯定制 | 2=是；非2=否 |
| projectCategory | PROJECT_CATEGORY | String | 项目分类 | normal=标准项目；small=小型项目 |
| signedDate | SIGNED_DATE | LocalDateTime | 签订时间 | |
| completedDate | COMPLETED_DATE | LocalDateTime | 结案日期 | 系统自动回写 |
| completedType | COMPLETED_TYPE | Long | 结案类型 | 系统自动回写 |

</div>

<div class="kb-module">

### API接口

**基础URL**：`/v1/{organizationId}/epm-project-contracts`

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| POST | /save-data | 创建合同（仅保存） |
| POST | /save-data-submit | 创建合同（保存+提交审批） |
| POST | /delete-contract | 删除合同 |
| POST | /ask-crm-item | 查询产品最高折扣率 |
| POST | /do-check-motion-change | 经销商合同提交审批（流程前校验+更新项目阶段） |
| POST | /do-Contract-Check | 经销商合同审批回调 |
| GET | /query-project | 查询合同列表 |
| GET | /get-contract-terms | 查询合同条款值集 |
| GET | /trading-company-customer | 开票单位查询 |

**合同变更单接口**（`/v1/{organizationId}/epm-project-contract-ecns`）：

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| GET | /search | 变更单列表查询 |
| DELETE | / | 删除变更单 |
| GET | /select | 变更单详情 |

**合同结案接口**（`/v1/{organizationId}/epm-contract-completeds`）：

| HTTP方法 | URL路径 | 功能描述 |
|---------|---------|---------|
| GET | /detail | 结案详情 |

</div>

<div class="kb-module">

### 合同创建逻辑

**核心方法**：`EpmProjectContractServiceImpl.newSave()`

1. **校验数据** (`checkSaveData`)：
   - 合同名称不能为空，长度≤80
   - 合同名称、交易公司名称、开票单位名称必填
   - 经销合同(contractType=2)且非家装：签约单位不能为空
   - 非纯定制：折扣清单和订单产品线不能为空
   - 家装合同：合作结束时间>合作开始时间

2. **参数补齐** (`parameterCompletion`)：
   - 从项目表查询stageName/projectCode/stageId
   - 将战略报备信息写回合同
   - 设置创建人/修改人/时间

3. **小型项目校验** (`smallProjectAssignment`)：
   - 默认projectCategory=normal
   - 小型项目：同一项目只能存在一个生效的合同

4. **校验产品数量** (`checkItemQuantityHandle`)：
   - 意向单中产品在合同清单中不存在→报错
   - 意向单产品下单数量>合同相同产品数量→报错

5. **校验操作模式** (`validContractMode`)：
   - 内部用户(customerClass=1)→只能自营工程(contractMode=1)
   - 外部用户(customerClass=2)→只能经销商服务(contractMode=2)

6. **保存合同头** → 生成编码(事业部编码+AE_EPM_PROJECT_CONTRACT+序号)，valid=1

7. **处理子表**：意向单关联、附件、产品清单、折扣单

</div>

<div class="kb-module">

### 合同审批流程

**提交流程** (`saveDataSubmit`)：
1. 调用`onUserSubmit()`进行提交前处理
2. 调用`newSave()`保存数据
3. 构建流程启动参数（subject=工程折扣申请单）
4. 调用`workflowClient.startInstanceByFlowKey()`启动HZERO工作流
5. 更新hzApproveStatus=RUN

**流程前校验** (`doCheckMotionChange`)：
- 非定制合同必须维护产品信息和折扣类型
- 校验合同是否已审核
- 更新项目阶段为"折扣申请"

**审批回调** (`doContractCheck`)：
- 更新折扣单状态为APPROVED
- 更新项目阶段：增补→"项目供货中"；非增补→"折扣通过"

</div>

<div class="kb-module">

### 合同变更(ECN)

**变更类型**：
- **ecnType=1（变更）**：更新周期条件，删除原EPM_PAYMENT_PLAN_SET，插入变更后EPM_PAYMENT_PLAN_ECN(isNew=2)
- **ecnType=2（失效）**：设置合同valid=3，可选同时作废工程，删除折扣预设率明细

**保存变更单** (`saveContractEcn`)：
1. 校验同一合同不能重复发起失效
2. 生成变更单编码(AE_EPM_PROJECT_CONTRACT_ECN_NO)
3. 更新合同valid=7（审批中）

**删除变更单**：
1. 删除变更单记录
2. 恢复合同valid=2

</div>

<div class="kb-module">

### 合同结案

**结案类型**：
- **actionType=1（项目结案）**：项目下所有合同valid=3，报备失效(projectValid=3)
- **actionType=2（合同结案）**：合同及所有增补合同valid=3

**通用处理**：
- 更新项目阶段为"项目结案"
- 推送CRM：调用`arrowEbsSdkService.indivireportAdd()`，有效状态设为0

</div>

<div class="kb-module">

### 折扣单管理

**保存折扣单** (`saveDiscountApply`)：
1. 战略协议(isFrame=2)不维护折扣单
2. 查询额度内广告费
3. 校验封顶量(`checkCappedQuantity`)
4. 保存前校验(产品上架、工程方单价≠0、合同数量≠0)
5. 金额计算(`calculate`)

**关键计算公式**：

| 计算项 | 公式 | 精度 |
|--------|------|------|
| 折前金额 | 出厂折扣率 × 标准单价(不含安装) × 销售额计算数量 | - |
| 应用折扣率 | 出厂折扣率 × 审批折扣率 | 5位小数 |
| 折后单价(家装) | 标准单价(不含安装) × 应用折扣率 | 3位小数 |
| 折后单价(自营工程) | 工程方单价 | 7位小数 |
| 折后金额 | 销售额计算数量 × 折后单价 | 2位小数 |
| 运费 | 标准单价 × 运费点数 × 折扣率 | - |

**封顶量校验** (`checkCappedQuantity`)：
1. 所有行引用统一政策(policyFlag=Y)时才校验
2. 合同数量必须在坎级区间(minimumQty~cappingQty)内
3. 单个经销商封顶：合同数量≤customerCapsNumber
4. 政策行总数量：累计≤totalCapNumber

</div>

<div class="kb-module">

### 状态流转

**合同有效状态(valid)**：

```text
新建 → valid=1(未审核)
  │
  ├── 提交审批 → valid=1, hzApproveStatus=RUN(审批中)
  │     ├── 审批通过 → valid=2(有效), hzApproveStatus=APPROVED
  │     └── 驳回 → hzApproveStatus=REJECTED
  │
  ├── 发起失效 → valid=7(审批中)
  │     ├── 失效审批通过 → valid=3(失效)
  │     └── 删除变更单 → valid=2(恢复有效)
  │
  └── 结案 → valid=3(失效)
```

**合同审批状态(hzApproveStatus)**：

| 值 | 含义 |
|----|------|
| NEW | 新建 |
| RUN | 审批中 |
| APPROVED | 审批通过 |
| REJECTED | 驳回 |
| REBUT | 反驳 |

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1：合同编码如何生成？ 🔴高频

事业部编码 + 编码规则AE_EPM_PROJECT_CONTRACT + 序号自动生成。

</div>

<div class="kb-module-alt">

### Q2：小型项目有什么特殊限制？

同一项目只能存在一个生效的合同，不允许增补。默认值：priceContainTax=2, priceContainFreight=2, discountType=2。

</div>

<div class="kb-module">

### Q3：经销商客户分类如何影响操作模式？

内部用户(customerClass=1)只能选自营工程(contractMode=1)；外部用户(customerClass=2)只能选经销商服务(contractMode=2)。

</div>

<div class="kb-module-alt">

### Q4：增补合同如何关联主合同？

通过mainContractId字段关联，大于0时为增补合同，记录最原始合同ID。

</div>

<div class="kb-module">

### Q5：战略协议合同为什么不维护折扣单？

isFrame=2的战略协议不需要折扣单，保存时会跳过折扣单处理直接返回。

</div>

<div class="kb-module-alt">

### Q6：纯定制合同与普通合同的差异？

纯定制合同(isCustom=2)：清除折扣信息，删除EPM_CONTRACT_ITEM、折扣单行和提货计划；提交审批时无需校验产品信息和折扣类型。

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：查合同基本信息**

```sql
SELECT contract_id, contract_code, contract_name, valid, hz_approve_status, contract_type
FROM epm_project_contract WHERE contract_id = #{contractId};
```

> 异常判断：查不到→合同被删除；valid与hz_approve_status不一致→数据异常

</div>

<div class="kb-module-alt">

**步骤2：查合同有效状态含义**

| valid值 | 含义 |
|--------|------|
| 1 | 未审核 |
| 2 | 有效 |
| 3 | 失效 |
| 7 | 审批中 |

</div>

<div class="kb-module">

**步骤3：查折扣申请单**

```sql
SELECT discount_apply_id, discount_apply_code, stat
FROM epm_discount_apply WHERE contract_id = #{contractId};
```

</div>

<div class="kb-module-alt">

**步骤4：查合同变更单**

```sql
SELECT ecn_id, ecn_code, ecn_type, hz_approve_status
FROM epm_project_contract_ecn WHERE contract_id = #{contractId};
```

</div>

<div class="kb-module">

**步骤5：查合同产品清单**

```sql
SELECT contract_item_line_id, item_code, item_name, contract_qty, contract_price
FROM epm_contract_item WHERE contract_id = #{contractId};
```

</div>

<div class="kb-module-alt">

**上游依赖**：项目(EPM_PROJECT)、客户(CUSTOMER)、交易公司(EPM_TRADING_COMPANY)、事业部(DIVISION_BASE_SET)、折扣政策(EPM_DISCOUNT_POLICY)、意向单(SA_OUT_BILL_HEAD)

**下游影响**：出库单(INV_OUT_BILL)、订单(SA_OUT_BILL)、报备(EPM_REPORT)推送CRM、折扣预设率(CM_DISC_PRESET_RATE_DTL)

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
| 工程项目(EPM_PROJECT) | 合同.projectId | 项目阶段随合同审批流转 |
| 工程要货订单(SA_OUT_BILL) | 意向单关联 | 合同产品数量≥意向单下单数量 |
| 家装真实性核销(EPM_INVOICE_TRUTH) | 出库单关联 | 合同产品经出库后进入核销 |
| 项目到款引入(EPM_PAYMENT_IMPORT) | 客户关联 | 同客户下的到款单用于回款认领 |
| 工程服务费报销(EPM_SERVICE_FEE) | 项目关联 | 合同对应项目的服务费报销 |
| 报备(EPM_REPORT) | 项目报备推送CRM | 结案时推送报备失效 |

</div>

</div>
