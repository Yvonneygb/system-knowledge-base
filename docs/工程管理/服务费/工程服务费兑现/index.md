<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="工程服务费兑现" desc="工程管理-服务费业务说明" />

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
工程服务费报销单(已审核通过) + 合同回款
  │
  ▼
新建工程服务费兑现单 → 选择经销商/合同 → 查询可兑现的报销明细
  │
  ▼
选择报销明细 → 自动计算可兑现金额(服务费-质保金-税金-其他扣款)
  │
  ▼
填写本次申请兑现金额 → 保存
  │
  ▼
提交 → 启动H0工作流(EXPENSE_TO_CASH，按区域D/N/X/B区分) → 审批
  │
  ▼
审批通过 → 推送财务共享(FSCC)
  │
  ├─ FSCC审批通过 → 更新状态为已核销 → 触发付款
  └─ FSCC审批拒绝 → 更新状态为拒绝
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程服务费报销 | 数据依赖 | 兑现基于已审核通过的报销单 | 报销单审批状态=APPROVED |
| 工程合同 | 数据依赖 | 兑现关联合同，获取合同回款总额 | 合同已生效 |
| 经销商 | 数据依赖 | 兑现关联经销商 | 经销商已存在 |
| H0工作流引擎 | 配置依赖 | 提交审批使用H0工作流(EXPENSE_TO_CASH) | 工作流已配置，按区域(D/N/X/B)区分 |
| 财务共享(FSCC) | 配置依赖 | 审批通过后推送FSCC进行共享审批 | FSCC接口已配置 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 财务共享(FSCC) | 推送FSCC共享审批 | 审批通过后推送兑现数据到FSCC，FSCC进行共享审批和付款处理 |
| 工程服务费报销 | 更新已兑现金额 | 兑现后更新报销单的已兑现金额(TOTAL_CASH_AMT) |
| 付款流程 | 触发付款更新状态 | FSCC审批通过后触发付款，更新付款状态(PAYMENT_STATUS) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：兑现金额计算逻辑 【金额计算】">
<KbQuote>兑现金额需要扣除质保金、税金等扣款后计算实际可兑现金额</KbQuote>

**具体逻辑**：

- 1、服务费金额=报销单中该经销商/合同下的服务费总额
- 2、本次可兑现金额=服务费金额-应扣质保金-应扣税金-应扣其他
- 3、兑现前剩余可兑现金额=历史累计可兑现金额-已兑现金额
- 4、本次申请兑现金额&lt;=本次可兑现金额，用户输入
</KbCard>

<KbCard num="2" title="重点逻辑2：工作流按区域区分 【区域区分】">
<KbQuote>不同区域(大区)使用不同的工作流编码</KbQuote>

**具体逻辑**：

- 1、工作流编码EXPENSE_TO_CASH按区域区分：D/N/X/B四个区域
- 2、提交时根据经销商所属区域匹配对应的工作流编码
</KbCard>

<KbCard num="3" title="重点逻辑3：双轨审批（H0工作流+FSCC共享审批） 【双轨审批】">
<KbQuote>工程服务费兑现需要经过DMS内部审批和财务共享审批两道流程</KbQuote>

**具体逻辑**：

- 1、提交时启动H0工作流(EXPENSE_TO_CASH)，DMS内部审批
- 2、H0审批通过后，推送兑现数据到财务共享系统(FSCC)
- 3、FSCC审批回调(objType=8067)，更新兑现单状态：通过→已核销，拒绝→拒绝
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：工程服务费兑现页面（hlod低代码页面）">
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
<td>兑现单号</td>
<td>文本框</td>
<td>兑现单编号</td>
<td>常显</td>
<td>保存时自动生成，不可编辑</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CASHING_NO</td>
</tr>
<tr>
<td>兑现类型</td>
<td>下拉选择框</td>
<td>兑现方式</td>
<td>常显</td>
<td>来源值集epm.cashing_way，必输</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CASHING_WAY</td>
</tr>
<tr>
<td>兑现类型(业务)</td>
<td>下拉选择框</td>
<td>业务兑现类型</td>
<td>常显</td>
<td>必输</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CASH_TYPE</td>
</tr>
<tr>
<td>经销商</td>
<td>弹窗选择</td>
<td>经销商</td>
<td>常显</td>
<td>用户选择，选择后带出编码和名称</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CUSTOMER_ID</td>
</tr>
<tr>
<td>合同</td>
<td>弹窗选择</td>
<td>工程合同</td>
<td>常显</td>
<td>用户选择，选择后带出编码和名称</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CONTRACT_ID</td>
</tr>
<tr>
<td>交易公司</td>
<td>下拉选择框</td>
<td>交易公司</td>
<td>常显</td>
<td>由合同带入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.TRADING_COMPANY_ID</td>
</tr>
<tr>
<td>常规销售主体</td>
<td>下拉选择框</td>
<td>常规销售主体</td>
<td>常显</td>
<td>用户选择或自动带出</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.SALES_MAJOR_ID</td>
</tr>
<tr>
<td>供应商</td>
<td>弹窗选择</td>
<td>供应商</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.VENDOR_ID</td>
</tr>
<tr>
<td>收款方</td>
<td>文本框</td>
<td>收款方</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.RECEIVER</td>
</tr>
<tr>
<td>开户银行</td>
<td>文本框</td>
<td>开户银行</td>
<td>常显</td>
<td>由供应商带入或用户输入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.BANK_NAME</td>
</tr>
<tr>
<td>银行账号</td>
<td>文本框</td>
<td>银行账号</td>
<td>常显</td>
<td>由供应商带入或用户输入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.BANK_ACCOUNT</td>
</tr>
<tr>
<td>服务费金额</td>
<td>数值框</td>
<td>服务费金额</td>
<td>常显</td>
<td>由报销明细汇总，默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.SERVICE_AMT</td>
</tr>
<tr>
<td>兑现前剩余可兑现金额</td>
<td>数值框</td>
<td>兑现前剩余可兑现金额</td>
<td>常显</td>
<td>自动计算，默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.CASHABLE_AMT_BEFORE</td>
</tr>
<tr>
<td>应扣质保金</td>
<td>数值框</td>
<td>应扣质保金</td>
<td>常显</td>
<td>自动计算，默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.DEPOSIT_DEDUCT</td>
</tr>
<tr>
<td>应扣税金</td>
<td>数值框</td>
<td>应扣税金</td>
<td>常显</td>
<td>自动计算，默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.TAXES_DEDUCT</td>
</tr>
<tr>
<td>应扣其他</td>
<td>数值框</td>
<td>应扣其他扣款</td>
<td>常显</td>
<td>默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.OTHER_DEDUCT</td>
</tr>
<tr>
<td>本次可兑现金额</td>
<td>数值框</td>
<td>本次可兑现金额</td>
<td>常显</td>
<td>=服务费-质保金-税金-其他，默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.CASHABLE_AMT</td>
</tr>
<tr>
<td>本次申请兑现金额</td>
<td>数值框</td>
<td>本次申请实际兑现金额</td>
<td>常显</td>
<td>用户输入，&lt;=本次可兑现金额</td>
<td>正数</td>
<td>EPM_EXPENSE_TO_CASH.APPLY_AMT</td>
</tr>
<tr>
<td>合同回款总额</td>
<td>数值框</td>
<td>合同回款总额</td>
<td>常显</td>
<td>由合同带入，默认0</td>
<td>非负数</td>
<td>EPM_EXPENSE_TO_CASH.TOTAL_RETURN_AMT</td>
</tr>
<tr>
<td>单据状态</td>
<td>文本框</td>
<td>单据状态</td>
<td>常显</td>
<td>新建=0，制单=1，审核通过=5</td>
<td>0/1/5</td>
<td>EPM_EXPENSE_TO_CASH.STAT</td>
</tr>
<tr>
<td>审批状态</td>
<td>文本框</td>
<td>H0审批状态</td>
<td>常显</td>
<td>NEW/RUN/APPROVED/REJECTED</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>付款状态</td>
<td>文本框</td>
<td>付款状态</td>
<td>常显</td>
<td>0=未付款，2=付款成功</td>
<td>0/2</td>
<td>EPM_EXPENSE_TO_CASH.PAYMENT_STATUS</td>
</tr>
<tr>
<td>总账日期</td>
<td>日期选择器</td>
<td>总账日期</td>
<td>常显</td>
<td>用户输入</td>
<td>日期</td>
<td>EPM_EXPENSE_TO_CASH.LEDGER_DATE</td>
</tr>
<tr>
<td>备注</td>
<td>文本域</td>
<td>备注</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_EXPENSE_TO_CASH.CASH_REMARK</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：经销商选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| organizationId | 组织ID | 租户组织ID | 1 |

**数据范围**

```sql
当前组织下的有效经销商
```

<KbSubTitle>弹窗2：合同选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| customerId | 经销商ID | 经销商ID | 100 |

**数据范围**

```sql
该经销商下已生效的工程合同
```

</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 保存 | 保存兑现单 | 详情页 | 单据状态=制单(1)或新建 | 调用POST /v1/{organizationId}/epm-expense-to-cash/insert保存 |
| 修改 | 修改兑现单 | 详情页 | 单据状态=制单(1) | 调用POST /v1/{organizationId}/epm-expense-to-cash/update修改 |
| 删除 | 删除兑现单 | 详情页 | 单据状态=制单(1) | 调用DELETE /v1/{organizationId}/epm-expense-to-cash/delete删除 |
| 提交 | 提交审批 | 详情页 | 单据状态=制单(1) | 启动H0工作流EXPENSE_TO_CASH(按区域D/N/X/B) |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：兑现类型必输 —— 确保兑现方式明确</KbSubTitle>

- 第1点：CASHING_WAY和CASH_TYPE字段标注@NotNull，框架自动校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT cashing_way, cash_type FROM epm_expense_to_cash WHERE cashing_id = :cashingId
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：兑现单必须存在 —— 确保数据完整性</KbSubTitle>

- 第1点：根据cashingId查询EPM_EXPENSE_TO_CASH记录，若不存在则阻断

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM epm_expense_to_cash WHERE cashing_id = :cashingId
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
新建(0) → 制单(1) → 已提交(-1) → 审核通过(5)
                ↑                ↓
                └──── 可删除 ←───┘(审批拒绝后)
                                      ↓
                              推送FSCC → FSCC审批通过(已核销/付款) / FSCC拒绝
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 0 | 新建 | 保存 |
| 1 | 制单 | 保存、修改、删除、提交 |
| -1 | 已提交 | 等待审批 |
| 5 | 审核通过 | 不可编辑、不可删除，已推送FSCC |

---

</KbCard>
<KbCard num="1" title="表1：EPM_EXPENSE_TO_CASH（工程服务费兑现表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| CASHING_ID | NUMBER | 兑现记录ID(主键) | - | 自增生成 |
| CASHING_NO | VARCHAR | 兑现记录编号 | 兑现单号 | 编码规则生成 |
| ORGANIZATION_ID | NUMBER | 组织ID | - | 必输 |
| SERVICE_EXPENSE_HEAD_ID | NUMBER | 服务费编号ID | - | 关联服务费头表 |
| CASHING_WAY | NUMBER | 兑现类型 | 兑现类型 | 来源值集epm.cashing_way，必输 |
| CASH_TYPE | NUMBER | 兑现类型(业务) | 兑现类型(业务) | 必输 |
| CUSTOMER_ID | NUMBER | 经销商ID | 经销商 | 用户选择 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | - | 由经销商带入 |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | - | 由经销商带入 |
| CONTRACT_ID | NUMBER | 合同ID | 合同 | 用户选择 |
| CONTRACT_CODE | VARCHAR | 合同编码 | - | 由合同带入 |
| CONTRACT_NAME | VARCHAR | 合同名称 | - | 由合同带入 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | 交易公司 | 由合同带入 |
| SALES_MAJOR_ID | NUMBER | 常规销售主体ID | 常规销售主体 | 用户选择 |
| VENDOR_ID | NUMBER | 供应商ID | 供应商 | 用户选择 |
| RECEIVER | VARCHAR | 收款方 | 收款方 | 用户输入 |
| BANK_NAME | VARCHAR | 开户银行 | 开户银行 | 由供应商带入 |
| BANK_ACCOUNT | VARCHAR | 银行账号 | 银行账号 | 由供应商带入 |
| SERVICE_AMT | NUMBER | 服务费金额 | 服务费金额 | 由报销明细汇总，默认0 |
| CASHABLE_AMT_BEFORE | NUMBER | 兑现前剩余可兑现金额 | 兑现前剩余可兑现金额 | 自动计算，默认0 |
| DEPOSIT_DEDUCT | NUMBER | 应扣质保金 | 应扣质保金 | 自动计算，默认0 |
| TAXES_DEDUCT | NUMBER | 应扣税金 | 应扣税金 | 自动计算，默认0 |
| OTHER_DEDUCT | NUMBER | 应扣其他 | 应扣其他 | 默认0 |
| CASHABLE_AMT | NUMBER | 本次可兑现金额 | 本次可兑现金额 | =服务费-质保金-税金-其他，默认0 |
| APPLY_AMT | NUMBER | 本次申请兑现金额 | 本次申请兑现金额 | 用户输入 |
| TOTAL_RETURN_AMT | NUMBER | 合同回款总额 | 合同回款总额 | 由合同带入，默认0 |
| STAT | NUMBER | 单据状态 | 单据状态 | 0=新建，1=制单，5=审核通过 |
| HZ_APPROVE_STATUS | VARCHAR | H0审批状态 | 审批状态 | NEW/RUN/APPROVED/REJECTED |
| HZ_INSTANCE_ID | NUMBER | H0流程实例ID | - | 提交工作流时赋值 |
| PAYMENT_STATUS | NUMBER | 付款状态 | 付款状态 | 0=未付款，2=付款成功 |
| PAYMENT_DATE | DATE | 付款日期 | - | 付款成功时赋值 |
| LEDGER_DATE | DATE | 总账日期 | 总账日期 | 用户输入 |
| SVC_EXP_ACC_ID | NUMBER | 报销ID | - | 关联报销单 |
| BILL_TYPE | VARCHAR | 单据类型 | - | auto=自动生成 |
| OFFLINE_CASHED | VARCHAR | 线下已兑现 | - | Y/N |
| ERROR_COLLECTION | VARCHAR | 推送共享错误原因 | - | FSCC推送失败时记录 |
| CALLBACK_SOURCE | VARCHAR | 外部系统回调结果 | - | FSCC回调时赋值 |
| CASH_REMARK | VARCHAR | 备注 | 备注 | 用户输入 |
| OBJECT_VERSION_NUMBER | NUMBER | 乐观锁版本号 | - | 框架自动维护 |

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
            <td style="color:#DC2626;font-weight:600;">未找到工程服务费兑现记录</td>
            <td style="font-size:13px;">FSCC回调</td>
            <td style="font-size:13px;">FSCC回调时根据cashingId未找到对应记录，可能数据已被删除</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到工程服务费兑现记录</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>FSCC回调时根据cashingId未找到对应记录，可能数据已被删除</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">审批通过后FSCC推送失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>FSCC接口不可用或推送数据格式异常<br>
      <strong style="color:#7C3AED;">处理：</strong>查看ERROR_COLLECTION字段中的错误信息，确认FSCC服务状态后重新推送
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">兑现金额计算不准确</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>质保金、税金等扣款计算逻辑有误，或报销单数据已更新<br>
      <strong style="color:#7C3AED;">处理：</strong>核实报销单的服务费金额和扣款配置，重新计算可兑现金额
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
| 2025-10-31 | - | - | 初始创建工程服务费兑现功能 |
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
