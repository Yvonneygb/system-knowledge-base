<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="12" title="有效延期申请" desc="工程管理-项目交付业务说明" />

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

```text
紧急要货订单(已审核通过)
  │
  ▼
选择紧急要货单 → 查询可延期的行项(接口成功/未过期/未取消/有预留数量)
  │
  ▼
填写延期日期(必须大于已延期最大有效期) + 备注
  │
  ▼
保存 → 生成延期单号(AE.URGENT_EXTEND_BILLNO编码规则) → 状态=制单(1)
  │
  ▼
提交 → 启动H0工作流(VALIDITY_POST_PONE) → 状态=已提交(-1)
  │
  ▼
H0审批 → 审批通过
  │
  ├─ 延期日期 < 当前日期 → 全部行项标记为失效(cannotExtend=2)
  │
  ├─ 行项已过期/已取消/接口失败 → 标记为不满足延期条件(cannotExtend=2)
  │
  └─ 行项仍有效 → 调用EBS接口(EbsAction-ValidityPostpone)推送延期
       │
       ├─ EBS返回S → 更新紧急要货行有效期 + 记录接口成功
       └─ EBS返回E → 记录接口失败信息
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 紧急要货订单 | 数据依赖 | 有效延期申请基于已审核通过的紧急要货单创建 | 紧急要货单审批状态=APPROVED，且存在可延期的行项 |
| H0工作流引擎 | 配置依赖 | 提交审批使用H0工作流(VALIDITY_POST_PONE) | 工作流已配置且启用 |
| EBS系统 | 数据依赖 | 审批通过后调用EBS接口执行有效期延期 | 行项仍有效且延期日期>=当前日期 |
| 编码规则 | 配置依赖 | 生成延期单号使用编码规则AE.URGENT_EXTEND_BILLNO | 编码规则已配置 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 紧急要货订单行 | 有效期更新为延期日期 | 审批通过且EBS接口返回成功后，更新紧急要货订单行的有效期(VALID_DATE)为延期日期 |
| EBS系统 | 库存预留有效期更新 | 审批通过后调用EBS接口(EbsAction-ValidityPostpone)，EBS侧更新库存预留的有效期 |
| 延期申请行项 | 不满足延期条件行项失效 | 审批通过时，不满足延期条件的行项标记cannotExtend=2(不满足延期申请条件) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：同一紧急要货单不允许存在多条未审核完毕的延期申请 【互斥控制】">
<KbQuote>防止同一紧急要货单同时存在多条延期申请导致有效期冲突</KbQuote>

**具体逻辑**：

- 1、查询详情时，若该紧急要货单存在状态非"审核通过(5)"的延期申请，则阻断并提示"该紧急要货单存在有未审核完毕的延期申请单"
- 2、新建保存时，同样校验是否存在未审核完毕的延期申请，存在则阻断
- 3、更新保存时，允许当前延期单自身存在，但不允许其他未审核完毕的延期单存在
</KbCard>

<KbCard num="2" title="重点逻辑2：延期日期必须大于已延期最大有效期 【日期校验】">
<KbQuote>确保延期是向后延伸，不允许缩短有效期或重复延期</KbQuote>

**具体逻辑**：

- 1、最大有效期=该紧急要货单所有可延期行项(接口成功/未过期/未取消/有预留数量)中VALID_DATE的最大值
- 2、保存时校验延期日期必须严格大于最大有效期，否则阻断提示"延期时间不能小于等于已延期的最大时间"
</KbCard>

<KbCard num="3" title="重点逻辑3：审批通过后分情况处理行项 【条件分支处理】">
<KbQuote>根据延期日期和行项状态，区分可推送EBS和不可推送的行项</KbQuote>

**具体逻辑**：

- 1、若延期日期已早于当前日期，则全部行项标记为失效(cannotExtend=2)，不调用EBS
- 2、若延期日期&gt;=当前日期，则逐行判断行项是否仍有效(接口成功/未过期/未取消/有效期在未来/有预留数量)
- 3、已失效的行项标记cannotExtend=2，仍有效的行项调用EBS接口推送延期
- 4、EBS接口返回S则更新紧急要货行有效期；返回E则仅记录接口失败信息，不影响其他行项
</KbCard>

<KbCard num="4" title="重点逻辑4：可延期行项筛选条件 【数据范围】">
<KbQuote>只有满足条件的紧急要货行项才能参与延期</KbQuote>

**具体逻辑**：

- 1、接口调用状态=intf_result='S'(成功)
- 2、未过期：is_overdue != 2
- 3、未取消：is_cancel != 2
- 4、有效期在未来：trunc(valid_date) &gt; trunc(sysdate)
- 5、有预留数量：(reserved_qty + pre_reserved_qty + released_qty) != 0
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：有效延期申请页面（hlod低代码页面）">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>紧急要货单号</td>
<td>文本框</td>
<td>关联的紧急要货单号</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>EPM_URGENT_ORDER.URGENT_ORDER_BILLNO</td>
</tr>
<tr>
<td>要货单号</td>
<td>文本框</td>
<td>关联的要货单号</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.SA_SALEBILLNO</td>
</tr>
<tr>
<td>客户编码</td>
<td>文本框</td>
<td>客户编码</td>
<td>常显</td>
<td>由紧急要货单关联客户带入，不可编辑</td>
<td>-</td>
<td>CUSTOMER.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>客户名称</td>
<td>常显</td>
<td>由紧急要货单关联客户带入，不可编辑</td>
<td>-</td>
<td>CUSTOMER.CUSTOMER_NAME</td>
</tr>
<tr>
<td>期望到达日期</td>
<td>文本框</td>
<td>期望到达日期</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.IN_DATE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>订单状态</td>
<td>文本框</td>
<td>订单状态</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.ORDER_STAT</td>
</tr>
<tr>
<td>订单类型</td>
<td>文本框</td>
<td>订单类型</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.BILL_TYPE</td>
</tr>
<tr>
<td>开票单位</td>
<td>文本框</td>
<td>开票单位名称</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>合同编码</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.CONTRACT_CODE</td>
</tr>
<tr>
<td>合同名称</td>
<td>文本框</td>
<td>合同名称</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.CONTRACT_NAME</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框</td>
<td>项目编码</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.PROJECT_CODE</td>
</tr>
<tr>
<td>项目名称</td>
<td>文本框</td>
<td>项目名称</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.PROJECT_NAME</td>
</tr>
<tr>
<td>订单日期</td>
<td>文本框</td>
<td>订单日期</td>
<td>常显</td>
<td>由紧急要货单带入，不可编辑</td>
<td>-</td>
<td>SA_OUT_BILL_HEAD.DATE_INVBILL</td>
</tr>
<tr>
<td>最大有效期</td>
<td>文本框</td>
<td>可延期行项中最大有效期</td>
<td>常显</td>
<td>SQL子查询计算，不可编辑</td>
<td>-</td>
<td>计算值(MAX(EPM_URGENT_ORDER_LINE.VALID_DATE))</td>
</tr>
<tr>
<td>延期单号</td>
<td>文本框</td>
<td>延期申请单号</td>
<td>常显</td>
<td>保存时自动生成(AE.URGENT_EXTEND_BILLNO编码规则)，不可编辑</td>
<td>-</td>
<td>EPM_URGENT_EXTEND.URGENT_EXTEND_BILLNO</td>
</tr>
<tr>
<td>有效期延期至</td>
<td>日期选择器</td>
<td>申请延期到的日期</td>
<td>常显</td>
<td>默认空，必输，必须大于最大有效期</td>
<td>日期，且&gt;最大有效期</td>
<td>EPM_URGENT_EXTEND.EXTEND_VALID_DATE</td>
</tr>
<tr>
<td>审批日期</td>
<td>文本框</td>
<td>审批通过日期</td>
<td>常显</td>
<td>审批通过时自动赋值当前时间，不可编辑</td>
<td>-</td>
<td>EPM_URGENT_EXTEND.DATE_APPROVAL</td>
</tr>
<tr>
<td>单据状态</td>
<td>文本框</td>
<td>延期单状态</td>
<td>常显</td>
<td>新建时=1(制单)，审批通过后=5(审核通过)</td>
<td>1=制单，5=审核通过</td>
<td>EPM_URGENT_EXTEND.STAT</td>
</tr>
<tr>
<td>备注</td>
<td>文本域</td>
<td>备注信息</td>
<td>常显</td>
<td>默认空，可编辑</td>
<td>-</td>
<td>EPM_URGENT_EXTEND.REMARK</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 保存 | 保存延期申请 | 详情页 | 单据状态=制单(1)或新建 | 调用POST /v1/{organizationId}/epm-urgent-extends保存，新建时生成单号 |
| 删除 | 删除延期申请 | 详情页 | 单据状态≠审核通过(5) | 调用DELETE /v1/{organizationId}/epm-urgent-extends删除头行数据 |
| 提交 | 提交审批 | 详情页 | 单据状态=制单(1) | 启动H0工作流VALIDITY_POST_PONE，状态变为已提交(-1) |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：延期日期必须大于已延期的最大有效期 —— 确保延期是向后延伸</KbSubTitle>

- 第1点：查询该紧急要货单所有可延期行项中VALID_DATE的最大值(maxValidDate)
- 第2点：比较用户输入的extendValidDate与maxValidDate，若extendValidDate &lt;= maxValidDate则阻断

<KbTip>阻断性报错，提示"延期时间不能小于等于已延期的最大时间"</KbTip>

```sql
SELECT MAX(el.VALID_DATE) AS max_valid_date
    FROM epm_urgent_order_line el
    WHERE el.urgent_order_id = :urgentOrderId
      AND el.intf_result = 'S'
      AND el.is_overdue != 2
      AND el.is_cancel != 2
      AND TRUNC(el.valid_date) > TRUNC(SYSDATE)
      AND (el.reserved_qty + el.pre_reserved_qty + el.released_qty) != 0
```

<KbSubTitle>校验2：同一紧急要货单不允许存在未审核完毕的延期申请 —— 防止有效期冲突</KbSubTitle>

- 第1点：查询EPM_URGENT_EXTEND表中同一urgentOrderId且stat != 5(审核通过)的记录
- 第2点：若存在记录(新建时任何记录；更新时排除自身的其他记录)则阻断

<KbTip>阻断性报错，提示"该紧急要货单存在有未审核完毕的延期申请单【延期单号】"</KbTip>

```sql
SELECT * FROM epm_urgent_extend
    WHERE urgent_order_id = :urgentOrderId
      AND stat != 5
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：延期申请单必须存在 —— 确保数据完整性</KbSubTitle>

- 第1点：根据objId查询EPM_URGENT_EXTEND记录，若不存在则阻断

<KbTip>阻断性报错，提示"紧急要货延期申请单不存在"</KbTip>

```sql
SELECT * FROM epm_urgent_extend WHERE urgent_extend_id = :urgentExtendId
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
新建 → 制单(1) → 已提交(-1) → 审核通过(5)
                ↑                ↓
                └──── 可删除 ←───┘(审批拒绝/撤回后)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 1 | 制单 | 保存、删除、提交 |
| -1 | 已提交 | 等待审批(由工作流控制) |
| 5 | 审核通过 | 不可编辑、不可删除 |
| 99 | 已作废 | 不可操作 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_URGENT_EXTEND（紧急要货延期申请单）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ORGANIZATION_ID | NUMBER | 组织ID | - | 必输，由紧急要货单带入 |
| URGENT_EXTEND_ID | NUMBER | 有效期延期ID(主键) | - | 自增生成 |
| URGENT_EXTEND_BILLNO | VARCHAR | 有效期延期单号 | 延期单号 | 新建时由编码规则AE.URGENT_EXTEND_BILLNO生成 |
| URGENT_ORDER_ID | NUMBER | 紧急要货单ID | - | 必输，关联紧急要货单 |
| SA_OUT_BILL_HEAD_ID | NUMBER | 要货单ID | - | 必输，关联要货单 |
| SA_SALEBILLNO | VARCHAR | 要货单号 | 要货单号 | 由紧急要货单关联带入 |
| EXTEND_VALID_DATE | DATE | 有效期延期至 | 有效期延期至 | 用户输入，必须大于已延期最大有效期 |
| DATE_APPROVAL | TIMESTAMP | 审批日期 | 审批日期 | 审批通过时自动赋值当前时间 |
| STAT | NUMBER | 单据状态 | 单据状态 | 新建=1(制单)，审批通过=5(审核通过) |
| WFID | NUMBER | 流程ID | - | 工作流ID |
| WFFLAG | NUMBER | 流程状态 | - | 工作流状态标记 |
| CREATOR | VARCHAR | 创建者 | - | 自动赋值当前用户 |
| CREATETIME | DATE | 创建日期 | - | 自动赋值当前日期 |
| UPDATOR | VARCHAR | 最后修改人 | - | 自动赋值当前用户 |
| UPDATETIME | DATE | 最后修改日期 | - | 自动赋值当前日期 |
| REMARK | VARCHAR | 备注 | 备注 | 用户输入 |
| HZ_INSTANCE_ID | NUMBER | H0流程实例ID | - | 提交工作流时赋值 |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 | - | 提交时=RUN，审批通过时=APPROVED |
| OBJECT_VERSION_NUMBER | NUMBER | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_URGENT_EXTEND_LINE（紧急要货延期申请明细表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_EXTEND_ID | NUMBER | 有效期延期ID | - | 必输，关联EPM_URGENT_EXTEND |
| URGENT_EXTEND_LINE_ID | NUMBER | 有效期延期行ID(主键) | - | 自增生成 |
| URGENT_ORDER_LINE_ID | NUMBER | 紧急要货单行ID | - | 必输，关联紧急要货行项 |
| SA_OUT_BILL_LINE_ID | NUMBER | 要货单行ID | - | 必输，关联要货单行项 |
| EXT_SA_OUT_BILL_LINE_ID | VARCHAR | 外部系统对应的要货单行ID | - | 用于调用EBS接口时传参 |
| VALID_DATE | DATE | 原有效期至 | 原有效期至 | 由紧急要货行项的VALID_DATE带入 |
| EXTEND_VALID_DATE | DATE | 有效期申请延期至 | - | 保存时赋值为头表的EXTEND_VALID_DATE |
| INTF_RESULT | VARCHAR | 接口调用状态 | 接口调用状态 | 审批通过后调用EBS接口赋值：S=成功，E=失败 |
| INTF_INFO | VARCHAR | 接口返回信息 | 接口返回信息 | 审批通过后赋值EBS返回消息 |
| IS_CANCEL | NUMBER | 是否已失效 | - | 2=是，非2=否 |
| CANNOT_EXTEND | NUMBER | 不满足延期申请条件 | 不满足延期条件 | 审批通过后赋值：2=不满足(行项已失效/已过期/接口失败)，非2=满足 |
| OBJECT_VERSION_NUMBER | NUMBER | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="3" title="表3：EPM_URGENT_ORDER（紧急要货单，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_ID | NUMBER | 紧急要货单ID(主键) | - | 关联字段 |
| URGENT_ORDER_BILLNO | VARCHAR | 紧急要货单号 | 紧急要货单号 | 只读展示 |
| SA_OUT_BILL_HEAD_ID | NUMBER | 要货单ID | - | 关联要货单 |
| HZ_APPROVE_STATUS | VARCHAR | H0审批状态 | - | 必须为APPROVED才能创建延期申请 |

</KbCard>

<KbCard num="4" title="表4：EPM_URGENT_ORDER_LINE（紧急要货单行项，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| URGENT_ORDER_LINE_ID | NUMBER | 紧急要货单行ID(主键) | - | 关联字段 |
| URGENT_ORDER_ID | NUMBER | 紧急要货单ID | - | 关联头表 |
| EXT_SA_OUT_BILL_LINE_ID | VARCHAR | 外部系统要货单行ID | - | EBS接口传参用 |
| VALID_DATE | TIMESTAMP | 有效期至 | 原有效期至 | 延期成功后更新为延期日期 |
| INTF_RESULT | VARCHAR | 接口调用状态 | - | 筛选条件：S=成功 |
| IS_OVERDUE | NUMBER | 是否过期 | - | 筛选条件：!=2 |
| IS_CANCEL | NUMBER | 是否取消 | - | 筛选条件：!=2 |
| RESERVED_QTY | NUMBER | 预留数量 | 预留数量 | 筛选条件：合计!=0 |
| PRE_RESERVED_QTY | NUMBER | 预预留数量 | 预预留数量 | 筛选条件：合计!=0 |
| RELEASED_QTY | NUMBER | 已释放数量 | 已释放数量 | 筛选条件：合计!=0 |

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
<KbCard title="报错一览表" :hover="false">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:27%"><col style="width:13%"><col style="width:32%"><col style="width:14%"><col style="width:14%"></colgroup>
<thead><tr><th>报错信息</th><th>提示节点</th><th>根因与解决方案</th><th>等级</th><th>详细逻辑</th></tr></thead>
<tbody>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该紧急要货单存在有未审核完毕的延期申请单【延期单号】</td>
            <td style="font-size:13px;">查询详情/保存</td>
            <td style="font-size:13px;">同一紧急要货单已存在未审核完毕的延期申请，需等待其审批完成或删除后再操作</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">紧急要货延期申请单不存在</td>
            <td style="font-size:13px;">保存/删除/提交/审批</td>
            <td style="font-size:13px;">延期申请单数据已被删除或ID不正确，刷新页面重试</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">延期时间不能小于等于已延期的最大时间</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">输入的延期日期不大于可延期行项中最大有效期，需输入更大的日期</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">已审核通过的紧急要货延期申请单不能删除</td>
            <td style="font-size:13px;">删除</td>
            <td style="font-size:13px;">审核通过的延期单不允许删除，只能查看</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该紧急要货单存在有未审核完毕的延期申请单【延期单号】</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>同一紧急要货单已存在未审核完毕的延期申请，需等待其审批完成或删除后再操作</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>紧急要货延期申请单不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>延期申请单数据已被删除或ID不正确，刷新页面重试</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>延期时间不能小于等于已延期的最大时间</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>输入的延期日期不大于可延期行项中最大有效期，需输入更大的日期</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>已审核通过的紧急要货延期申请单不能删除</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>审核通过的延期单不允许删除，只能查看</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">审批通过后部分行项EBS接口调用失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>EBS接口返回错误状态(E)，可能是EBS侧库存预留已释放或数据异常<br>
      <strong style="color:#7C3AED;">处理：</strong>查看INTF_INFO字段中的EBS返回信息，确认EBS侧数据状态后重新提交延期申请
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批通过后行项全部标记为不满足延期条件</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>延期日期在审批通过时已早于当前日期(审批流程耗时过长导致延期日期过期)，或所有行项已过期/已取消<br>
      <strong style="color:#7C3AED;">处理：</strong>重新创建延期申请，设置更远的延期日期；或确认紧急要货行项的有效性状态
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">查询详情时提示存在未审核完毕的延期申请</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>同一紧急要货单已有延期申请正在审批中<br>
      <strong style="color:#7C3AED;">处理：</strong>等待现有延期申请审批完成，或联系审批人处理(通过/拒绝)后再创建新的延期申请
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

| 日期 | 提交ID | 提交人 | 提交内容 |
|------|-------|-------|---------|
| 2025-10-22 | - | hfy | 初始创建紧急要货延期申请单功能 |
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
