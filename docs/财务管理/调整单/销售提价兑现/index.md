<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="销售提价兑现" desc="财务管理-调整单业务说明" />

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
签收返利明细 → 按事业部+法人+经销商+交易主体汇总 → 生成兑现汇总单
  → 推送ERP(EBS synAdjustCashPoolToEbs) → 更新推送状态(SUCCESS/FAIL)
  
服务费兑现流程(并行)：
创建兑现单 → 提交工作流(EXPENSE_TO_CASH) → 审批通过 → 推送FSSC(财务共享)
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 销售价格行(SA_SALEPRICE_LINE) | 数据依赖 | 返点数据来源，含月/季/年返点率 | 价格行已生效且有返点 |
| 返利明细 | 数据依赖 | 签收后的返利明细作为兑现数据来源 | 返利明细已签收(signFlag=Y)且未兑现(redemptionFlag=N) |
| 工作流引擎 | 配置依赖 | 服务费兑现审批，流程编码EXPENSE_TO_CASH(按区域分D/N/X/B) | 工作流已部署 |
| ERP系统(EBS) | 数据依赖 | 推送兑现数据到ERP(synAdjustCashPoolToEbs) | EBS接口可用 |
| FSSC系统 | 数据依赖 | �6审6批通过后推送财务共享 | FSSC接口可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 返利明细 | 兑现标识更新 | 生成兑现汇总单后，返点记录的redemptionFlag更新为Y(已兑现)，关联cashDetailsId |
| ERP系统 | ERP侧资金池调整 | 推送EBS后，ERP侧执行资金池调整(sourceType="真实性核销返利") |
| 兑现汇总单 | 推送状态更新 | ERP推送成功后pushStatus=SUCCESS，失败则=FAIL |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：签收返利明细 核心逻辑">
<KbQuote>兑现前需先签收返利明细，确保兑现基于已确认的返利数据</KbQuote>

**具体逻辑**：

- 1、查询未签收(signFlag=N)且未兑现(redemptionFlag=N)的返点明细
- 2、批量(200条/批)检查发货行签收状态
- 3、已签收的明细更新signFlag=Y
</KbCard>

<KbCard num="2" title="重点逻辑2：按事业部分组生成兑现汇总单 核心逻辑">
<KbQuote>兑现汇总单按事业部维度分组，每个事业部生成一个兑现头</KbQuote>

**具体逻辑**：

- 1、按事业部+法人客户+经销商+交易主体汇总查询兑现明细
- 2、按事业部(entId)分组，每组创建一个兑现头(CashSummary)，pushStatus=PENDING
- 3、逐行保存兑现明细(CashDetails)，关联兑现头ID
- 4、更新0点记录的兑现标识=Y，关联cashDetailsId
</KbCard>

<KbCard num="3" title="重点逻辑3：推送ERP 核心逻辑">
<KbQuote>兑现汇总单需推送到ERP执行资金池调整</KbQuote>

**具体逻辑**：

- 1、查询兑现头下未推送/推送失败的兑现明细
- 2、组装CashPoolDataDTO(sourceType="真实性核销返利")，含法人账户信息
- 3、调用ebsSdkService.synAdjustCashPoolToEbs()推送EBS
- 4、逐行更新推送状态——任一行FAIL则头FAIL，全SUCCESS则头SUCCESS
</KbCard>

<KbCard num="4" title="重点逻辑4：服务费兑现工作流(并行流程) 核心逻辑">
<KbQuote>服务费兑现走工作流审批，按区域区分不同审批流程</KbQuote>

**具体逻辑**：

- 1、工作流编码按区域区分——EXPENSE_TO_CASH_D(东)/_N(南)/_X(西)/_B(北)
- 2、审批通过后(wfComplete)更新单据状态
- 3、节点事件执行(eventExecute)推送财务共享(FSSC)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：hlod低代码页面">
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
<td>兑现记录编号</td>
<td>文本框</td>
<td>兑现单号</td>
<td>常显</td>
<td>系统自动生成</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CASHING_NO</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>选择经销商后带入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>选择经销商后带入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CUSTOMER_NAME</td>
</tr>
<tr>
<td>兑现类型</td>
<td>下拉选择框</td>
<td>兑现方式</td>
<td>常显</td>
<td>来源值集epm.cashing_way</td>
<td>epm.cashing_way值集</td>
<td>EPM_EXPENSE_TO_CASH.CASHING_WAY</td>
</tr>
<tr>
<td>服务费金额</td>
<td>数值框</td>
<td>服务费总金额</td>
<td>常显</td>
<td>来源服务费编号</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.SERVICE_AMT</td>
</tr>
<tr>
<td>本次可兑现金额</td>
<td>数值框</td>
<td>可兑现金额</td>
<td>常显</td>
<td>自动计算=兑现前剩余-应扣质保金-应扣税金-应扣其他</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CASHABLE_AMT</td>
</tr>
<tr>
<td>本次申请兑现金额</td>
<td>数值框</td>
<td>实际申请兑现金额</td>
<td>常显</td>
<td>必填；用户输入；≤本次可兑现金额</td>
<td>正数</td>
<td>EPM_EXPENSE_TO_CASH.APPLY_AMT</td>
</tr>
<tr>
<td>应扣质保金</td>
<td>数值框</td>
<td>扣除质保金</td>
<td>常显</td>
<td>自动计算</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.DEPOSIT_DEDUCT</td>
</tr>
<tr>
<td>应扣税金</td>
<td>数值框</td>
<td>扣除税金</td>
<td>常显</td>
<td>自动计算</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.TAXES_DEDUCT</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>关联合同编码</td>
<td>常显</td>
<td>选择合同后带入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH&gt;CONTRACT_CODE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易法人公司</td>
<td>常显</td>
<td>选择后带入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>收款方</td>
<td>文本框</td>
<td>收款人/单位</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.RECEIVER</td>
</tr>
<tr>
<td>开户银行</td>
<td>文本框</td>
<td>收款银行</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.BANK_NAME</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 |D所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 生成兑现汇总单 | 生成兑现汇总数据 | 列表页 | 有权限 | 调用generate-rebate-summary接口，签收+汇总+生成兑现单 |
| 推送ERP | 推送兑现数据到ERP | 详情页 | 兑现单未推送或推送失败 | 调用request-composer接口，推送EBS |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：本次申请金额必须大于0 —— 确保兑现金额合法</KbSubTitle>

- 第1点：服务费兑现提交时校验applyAmt&gt;0

<KbTip>阻断性报错</KbTip>

```sql
SELECT APPLY_AMT FROM EPM_EXPENSE_TO_CASH WHERE CASHING_ID = :id
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
NEW(新建) ──提交──→ RUN(审批中) ──审批通过──→ APPROVED(已审批) → 推送FSSC
  ↑                         │
  │                         ├──审批拒绝──→ REJECTED(已拒绝)
  │                         └──终止──────→ INTERRUPT(已终止)
  │
  └──删除──→ (删除)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 编辑、保存、提交、删除 |
| RUN | 审批中 | 无(等待审批结果) |
| APPROVED | 审批通过 | 无(流程结束) |
| REJECTED | 审批拒绝 | 编辑、重新提交 |
| INTERRUPT | 已终止 | 无(流程结束) |

---

</KbCard>
<KbCard num="1" title="表1：EPM_EXPENSE_TO_CASH（服务费兑现表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| CASHING_ID | BIGINT | 兑现记录ID(主键) | - | 自增主键 |
| CASHING_NO | VARCHAR | 兑现记录编号 | 兑现记录编号 | 系统自动生成 |
| CASHING_WAY | LONG | 兑现类型 | 兑现类型 | 值集epm.cashing_way |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 取用户上下文 |
| CUSTOMER_ID | BIGINT | 经销商ID | 经销商编码 | 选择经销商后带入 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销商编码 | - |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | 经销商名称 | - |
| SERVICE_AMT | DECIMAL | 服务费金额 | 服务费金额 | 来源服务费编号 |
| CASHABLE_AMT_BEFORE | DECIMAL | 兑现前剩余可兑现金额 | - | - |
| CASHABLE_AMT_AFTER | DECIMAL | 兑现后剩余可兑现金额 | - | =兑现前-本次申请 |
| DEPOSIT_DEDUCT | DECIMAL | 应扣质保金 | 应扣质保金 | 自动计算 |
| TAXES_DEDUCT | DECIMAL | 应扣税金 | 应扣税金 | 自动计算 |
| OTHER_DEDUCT | LONG | 应扣其他 | 应扣其他 | - |
| CASHABLE_AMT |B DECIMAL | 本次可兑现金额 | 本次可兑现金额 | =兑现前-质保金-税金-其他 |
| APPLY_AMT | DECIMAL | 本次申请实际兑现金额 | 本次申请兑现金额 | 必填，用户输入 |
| CONTRACT_ID | BIGINT | 合同ID | 合同编码 | 选择合同后带入 |
| CONTRACT_CODE | VARCHAR | 合同编码 | 合同编码 | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | 交易公司 | 选择后带入 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | - |
| RECEIVER | VARCHAR | 收款方 | 收款方 | 用户输入 |
| BANK_NAME | VARCHAR | 开户银行 | 开户银行 | 用户输入 |
| BANK_ACCOUNT | VARCHAR | 银行账号 | 银行账号 | 用户输入 |
| PAYMENT_STATUS | LONG | 付款状态 | 付款状态 | 0=未付款/2=付款成功 |
| HZ_INSTANCE_ID | BIGINT | 流程实例ID | - | 工作流启动后回写 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审批状态 | 默认NEW |
| CALLBACK_SOURCE | VARCHAR | 外部审批回调来源 | - | - |
| CREATION_DATE | DATETIME | 创建时间 | - | 框架自动记录 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：SA_SALEPRICE_LINE（销售价格行表，上游关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SA_SALEPRICE_LINE_ID | BIGINT | 行ID(主键) | - | 自增主键 |
| ITEM_ID | BIGINT | 物料ID | - | 关联产品主档 |
| REBATE_MONTH | LONG | 月返点数% | - | 返利计算依据 |
| REBATE_QUARTER | LONG | 季返点数% | - | 返利计算依据 |
| REBATE_YEAR | LONG | 年返点数% | - | 返利计算依据 |
| RATIO_RESOURCES | LONG | 资源点位% | - | 批准返利率% |
| ALLOW_REBATE_AMT | LONG | 批准返利金额 | - | - |
| DIVISION_ID | LONG | 事业部ID | - | 按事业部分组 |

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
            <td style="color:#DC2626;font-weight:600;">本次申请金额必须大于0</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">applyAmt≤0</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">ERP推送失败</td>
            <td style="font-size:13px;">推送ERP</td>
            <td style="font-size:13px;">EBS接口返回错误</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>本次申请金额必须大于0</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>applyAmt≤0</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>ERP推送失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>EBS接口返回错误</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">兑现汇总单生成后无数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>无已签收且未兑现的返利明细<br>
      <strong style="color:#7C3AED;">处理：</strong>先执行签收操作，确认有可兑现的返利数据
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">ERP推送部分成功部分失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>逐行推送，某行EBS调用失败不影响其他行<br>
      <strong style="color:#7C3AED;">处理：</strong>查看失败行错误信息，修正后重新推送
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
| 2025-09-15 | - | - | 初始创建销售提价兑现功能 |

> 要求：
> 1. 按倒序展示
> 2. 只需要包含2026年的提交记录
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
