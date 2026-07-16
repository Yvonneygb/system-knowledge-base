---
---

<BreadcrumbTabs />

<div id="logic">

<div class="kb-module">

### 数据模型

家装要货订单与工程要货订单、样品及长库龄要货订单共用同一套代码实体（SaOutBillHead / SaOutBillLine），通过 `isHome` 和 `isMakt` 字段区分：

```text
SA_OUT_BILL_HEAD (要货订单头表)
  │
  ├──< SA_OUT_BILL_LINE (要货订单行表)
  │
  ├──< EPM_HOME_CONTRACT (家装合同映射表)
  │       └── 判断合同编码是否属于家装合同
  │
  └──< EPM_BRANCH_ECN (门店变更申请表)
          └── 审批通过后回写到 EPM_BRANCH_MESSAGE
```

#### 核心区分字段

| 字段 | 家装要货 | 工程要货 | 样品及长库龄 |
|------|---------|---------|-------------|
| isHome | **2** | 0/null | 0/null |
| isMakt | 0/null | 0/null | **2** |
| channel | **3(家装)** | 4(工程) | 3 |
| priceType | **1(折扣单)/2(折扣政策)** | 0 | 1 |
| businessType(CRM) | **HomeDecoration(9)** | Common等 | Sample等 |

#### 头表关键字段（SA_OUT_BILL_HEAD）

| 字段名 | 类型 | 说明 | 取值逻辑 |
|--------|------|------|---------|
| isHome | Long | 是否家装 | 2=家装，0/null=非家装，默认0 |
| channel | Long | 渠道 | 家装=3，工程=4 |
| priceType | Integer | 价格类型 | 1=折扣单，2=折扣政策，3=价目表 |
| businessType | Long | 业务类型 | 9=家装，12=家装样品 |
| contractType | Long | 签约方式 | 1=直签，2=经销（自动判断） |
| projectId | Long | 项目ID | 关联报备信息 |
| discountRate | BigDecimal | 折扣率 | CRM返回后取所有行最小折扣率 |
| isCalAd | Long | 计广告费 | 2=是 |
| isCalSecondYearDiscount | Long | 计次年折扣 | 2=是 |

</div>

<div class="kb-module-alt">

### 合同转家装订单逻辑

**触发条件**：工程订单的合同编码存在于 `EPM_HOME_CONTRACT` 表时，自动将订单转为家装订单。

```java
// 查询合同编码是否属于家装合同
List<SaOutBillHead> saOutBillHeads = saOutBillHeadRepository.selectByCondition(...);

if (count > 0) {
    isShift = true;
    saOutBillHead.setIsHome(2L);      // 标记为家装
    saOutBillHead.setChannel(3L);     // 渠道改为家装渠道
    saOutBillHead.setPriceType(1);    // 价格类型改为折扣单
}
```

**转单方法 `transferOrder`**：
- 家装：isHome=2, channel=3, priceType=1
- 转回工程（折扣政策审核拒绝/EBS退回时）：isHome=0, channel=4, priceType=0

</div>

<div class="kb-module">

### 签约方式自动判断

保存时（`save`方法），家装折扣单类型自动判断签约方式：

| 客户属性 | 经营子类 | 签约方式 |
|---------|---------|---------|
| 内部客户(1) | 直销类 | **直签(1)** |
| 外部客户(2) | 经销类 | **经销(2)** |
| 外部客户(2) | 子类=2 | **直签(1)** |

> 直签且存在合同时，含运费标识直接从合同获取而非从客户取。

</div>

<div class="kb-module-alt">

### 安装费与折扣率处理

**安装费强制为0**：家装/工程渠道强制 `isInstall=1(否)`，安装金额=0，折后单价含安装=折后单价不含。

**CRM返回后折扣率更新**：家装订单不更新项目进度，只更新折扣率：
```java
// 取所有行最小折扣率回写头
Optional<BigDecimal> minDiscountRate = lines.stream()
    .map(SaOutBillLineVO::getDiscountRate)
    .min(Comparator.naturalOrder());
saOutBillHead.setDiscountRate(minDiscountRate.orElse(null));
```

**CRM行ID异步同步**：家装折扣政策类型不走同步更新，改走调度任务异步执行（`HomeDiscountPolicyCrmJob`）。

**可下单数量**：家装折扣政策类型不扣减可下单数量。

</div>

<div class="kb-module">

### 校验规则

| 校验方法 | 触发时机 | 规则 |
|---------|---------|------|
| checkHomeBillContractType | 保存校验 | 家装直签时校验合同限定的下单数量 |
| checkHomeProjectValid | 保存/生成CRM | 报备必须存在且已生效(projectValid=2) |
| beforeSubmitHomeCheck | OA提交 | 报备生效校验 + CRM开票单位校验；折扣单/价目表不允许送签OA |
| homeOrderCheck | 生成CRM | 报备存在且生效 |

</div>

<div class="kb-module-alt">

### OA审批与项目阶段

**审批对象类型**：家装=9020（工程=8021，营销中台=8161）

**项目阶段自动更新**（提交OA时）：

| 条件 | 阶段更新 |
|------|---------|
| 首次要货(saCount==0) | → 已下首单(13) |
| 第二次(saCount==1) | → 持续供货中(14) |
| 供货完成(validQty==confirmOutQty) | → 供货按期完成(12) |

**CRM回调不扣减数量**：家装订单CRM回调时不扣除可下单数量。

</div>

<div class="kb-module">

### 状态流转

```text
制单(stat=1) → 保存 → OA审批(折扣政策) → 审批通过 → 生成CRM订单 → CRM返回 → ERP发货
                │
                ↓ (折扣单/价目表)
            生成CRM订单 → CRM返回 → ERP发货

折扣政策审核拒绝/EBS退回 → transferOrder(false) → 转回工程订单
```

| priceType | 审批路径 | 是否送签OA |
|-----------|---------|-----------|
| 1(折扣单) | 直接生成CRM | 否 |
| 2(折扣政策) | OA审批→CRM | 是 |
| 3(价目表) | 直接生成CRM | 否 |

</div>

</div>

<div id="faq">

<div class="kb-module">

### Q1: 合同转家装订单失败 🔴高频

**现象**：工程订单创建后未自动转为家装订单

**根因**：合同编码不在 `EPM_HOME_CONTRACT` 映射表中

**排查SQL**：
```sql
SELECT EHC.CONTRACT_CODE FROM EPM_HOME_CONTRACT EHC 
WHERE EHC.CONTRACT_CODE = ':合同编码';
```

> 查不到→需在映射表中新增该合同编码

</div>

<div class="kb-module-alt">

### Q2: 提交时报错"关联的报备未生效，不允许下单" 🔴高频

**现象**：家装折扣单类型生成CRM订单时报错

**根因**：关联的项目报备 `projectValid != 2`

**排查SQL**：
```sql
SELECT ep.PROJECT_ID, ep.PROJECT_VALID, ep.PROJECT_NAME 
FROM EPM_PROJECT ep 
WHERE ep.PROJECT_ID = :projectId;
```

> PROJECT_VALID 不为2→报备未生效，需先激活报备

</div>

<div class="kb-module">

### Q3: 折扣单/价目表送签OA报错 🟡偶发

**现象**：折扣单或价目表类型订单提交OA时报错

**根因**：折扣单和价目表要货不需要送签OA，应选择生成CRM订单

**解决**：确认 priceType=1 或 3 时，直接生成CRM订单而非提交OA审批

</div>

<div class="kb-module-alt">

### Q4: CRM返回后折扣率未更新

**现象**：CRM回调后家装订单头的折扣率仍为空或旧值

**根因**：CRM返回后取所有行最小折扣率回写头，如果所有行折扣率为null则头折扣率也为null

**排查**：检查 SA_OUT_BILL_LINE 的 DISCOUNT_RATE 字段是否CRM返回后有值

</div>

<div class="kb-module">

### Q5: 家装订单CRM行ID丢失

**现象**：家装折扣政策订单的 ext_sa_out_bill_line_id 为空

**根因**：家装折扣政策类型CRM行ID走调度任务异步同步，不是同步更新

**排查**：检查 HomeDiscountPolicyCrmJob 定时任务是否正常执行

</div>

<div class="kb-module-alt">

### Q6: CRM回调后订单被转回工程 🟡偶发

**现象**：折扣政策类型家装订单CRM审核拒绝或EBS退回后变为工程订单

**根因**：这是正常逻辑——`transferOrder(false)` 将家装订单转回工程订单

**解决**：需重新创建或修改后再次提交

</div>

</div>

<div id="troubleshoot">

<div class="kb-module">

**步骤1：确认订单基本信息与类型**

```sql
SELECT SA_OUT_BILL_HEAD_ID, SA_SALEBILLNO, IS_HOME, IS_MAKT, CHANNEL, 
       PRICE_TYPE, BUSINESS_TYPE, CONTRACT_TYPE, ORDER_STAT, HZ_APPROVE_STATUS,
       PROJECT_ID, DISCOUNT_RATE
FROM SA_OUT_BILL_HEAD 
WHERE SA_OUT_BILL_HEAD_ID = :orderId;
```

> IS_HOME 应为2，CHANNEL应为3；不符→转单逻辑可能未生效

</div>

<div class="kb-module-alt">

**步骤2：检查家装合同映射**

```sql
SELECT EHC.CONTRACT_CODE 
FROM EPM_HOME_CONTRACT EHC 
WHERE EHC.CONTRACT_CODE = (
  SELECT CONTRACT_CODE FROM SA_OUT_BILL_HEAD WHERE SA_OUT_BILL_HEAD_ID = :orderId
);
```

> 查不到→合同未在家装映射表中，转单逻辑未触发

</div>

<div class="kb-module">

**步骤3：检查项目报备生效状态**

```sql
SELECT ep.PROJECT_ID, ep.PROJECT_VALID, ep.PROJECT_CODE, ep.PROJECT_NAME
FROM EPM_PROJECT ep 
WHERE ep.PROJECT_ID = (
  SELECT PROJECT_ID FROM SA_OUT_BILL_HEAD WHERE SA_OUT_BILL_HEAD_ID = :orderId
);
```

> PROJECT_VALID != 2 → 报备未生效，无法生成CRM订单

</div>

<div class="kb-module-alt">

**步骤4：检查订单行折扣率**

```sql
SELECT SA_OUT_BILL_LINE_ID, ITEM_CODE, DISCOUNT_RATE, DISCOUNTED_PRICE, 
       EXT_SA_OUT_BILL_LINE_ID, DISCOUNT_POLICY_ITEM_ID
FROM SA_OUT_BILL_LINE 
WHERE SA_OUT_BILL_HEAD_ID = :orderId;
```

> DISCOUNT_RATE为空→CRM未返回折扣率；EXT_SA_OUT_BILL_LINE_ID为空→CRM行ID未同步

</div>

<div class="kb-module">

**步骤5：检查CRM回调与转单记录**

```sql
SELECT SA_OUT_BILL_HEAD_ID, CALLBACK_SOURCE, ORDER_STAT, 
       IS_HOME, CHANNEL, PRICE_TYPE
FROM SA_OUT_BILL_HEAD 
WHERE SA_OUT_BILL_HEAD_ID = :orderId;
```

> CALLBACK_SOURCE=OA_REJECT 或 EBS退回 → 可能触发transferOrder(false)转回工程

</div>

</div>

<div id="history">

<div class="kb-module">

> 本页面记录真实排查案例，用于频次分析和趋势监控。

| 日期 | 问题简述 | 根因 | 耗时 | 频次标记 |
|------|---------|------|------|---------|
| — | — | — | — | — |

</div>

<div class="kb-module-alt">

### 按根因分类统计

| 根因分类 | 次数 | 占比 |
|---------|------|------|
| 数据异常 | 0 | 0% |
| 逻辑缺陷 | 0 | 0% |
| 并发冲突 | 0 | 0% |
| 配置错误 | 0 | 0% |
| 其他 | 0 | 0% |

> 暂无数据，积累排查记录后自动更新。

</div>

</div>

<div id="related">

<div class="kb-module">

### 上游依赖

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| 家装合同映射(EPM_HOME_CONTRACT) | 数据依赖 | 合同编码是否属于家装合同，决定是否触发转单 |
| 项目报备(EPM_PROJECT) | 数据依赖 | 折扣单类型需要报备生效才能下单 |
| 工程合同 | 数据依赖 | 直签类型关联工程合同ID |
| 客户组织(CUSTOMER_ORG) | 数据依赖 | 签约方式判断、广告费/次年折扣来源 |
| 折扣单(EPM_DISCOUNT_APPLY) | 数据依赖 | 折扣单类型关联折扣申请单 |
| 折扣政策(EPM_DISCOUNT_POLICY) | 数据依赖 | 折扣政策类型关联政策头ID |
| 门店变更(EPM_BRANCH_ECN) | 数据依赖 | 家装独立模块，审批通过回写网点信息 |

</div>

<div class="kb-module-alt">

### 下游影响

| 模块 | 关联方式 | 说明 |
|------|---------|------|
| CRM系统 | 业务触发 | 生成CRM订单、CRM回调更新折扣率 |
| OA审批系统 | 流程依赖 | 折扣政策类型提交OA审批(objType=9020) |
| 项目阶段(EPM_PROJECT_STAGE) | 数据更新 | OA提交时自动更新项目进度阶段 |
| ERP发货 | 业务触发 | CRM订单成功后ERP发货 |
| 工程要货订单 | 业务转换 | CRM拒绝/退回时转回工程订单 |

</div>

</div>
