<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="广告报销发票兑现" desc="广告报销发票兑现流程，支持发票上传、金额校验、审批流转与兑现" />

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
广告投放申请(审批通过) → 广告费报销(审批通过) → 广告报销发票兑现(提交审批)
    ↓                                          ↓
额度内兑现: 回写申请单/验收单/报销单交易公司    额度外兑现: 同步额度外预算已使用金额
    ↓                                          ↓
审批通过 → wfComplete回调                      审批通过 → 调用ERP资金池调整接口
    ↓
支付方式=费用转到款时: 设置总账日期/发票到款信息
    ↓
推送MBO系统
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 广告费报销单(FIN_FEE_BX_HEADER) | 数据依赖 | 发票兑现基于已审批通过的报销单创建，继承报销单的交易公司、经销商等信息 | 报销单审批通过（HZ_APPROVE_STATUS=APPROVED） |
| 广告投放申请单(FIN_FEE_APPLY_HEADER) | 数据依赖 | 额度内兑现完成后回写申请单的可交易公司信息 | 兑现类型=额度内且审批通过 |
| 额度外预算模块(MKT_OUTLIMIT_BUD_HEADER) | 数据依赖 | 额度外兑现时更新已使用金额到预算导入 | 兑现类型=额度外且saveType=1 |
| ERP资金池接口 | 配置依赖 | 审批通过后调用ERP资金池调整接口同步兑现数据 | 审批通过 |
| MBO系统 | 配置依赖 | 审批通过后推送兑现数据到MBO | 审批通过 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 额度外预算数据更新 | 额度外预算数据更新 | 额度外兑现审批通过后，更新MKT_OUTLIMIT_BUD_HEADER中对应月份的已使用金额，并重新计算剩余金额 |
| 申请单/验收单/报销单交易公司回写 | 申请单/验收单/报销单交易公司回写 | 额度内兑现审批通过后，回写广告投放申请单、验收单、报销单的交易公司信息 |
| ERP系统 | ERP侧资金池调整 | 审批通过后调用ERP资金池调整接口，将兑现金额同步到ERP系统 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：发票兑现金额校验 提交校验">
<KbQuote>确保本次兑现金额不超过报销单剩余可兑现金额，防止超额兑现</KbQuote>

**具体逻辑**：

- 1、提交时校验本次兑现金额+已兑现金额不超过可兑现总额，超过则阻断
- 2、兑现类型为额度内时，本次核销金额不可超过额度内可用金额
- 3、兑现类型为额度外时，本次兑现金额不可超过额度外可用金额，且需扣除已占用金额
</KbCard>

<KbCard num="2" title="重点逻辑2：额度外预算同步 审批回调">
<KbQuote>额度外兑现审批通过后，需将兑现金额同步到额度外预算模块，更新已使用金额</KbQuote>

**具体逻辑**：

- 1、仅当兑现类型=额度外且模块类型=门店装修报销且本次申请金额&gt;0时触发
- 2、根据当前年月和预算年度，计算兑现比例=本次兑现金额÷可兑现总额（保留2位小数）
- 3、使用金额=本次申请金额×兑现比例，再除以配置的额度外税率
- 4、若当前年份&gt;预算年度，更新次年预算字段；否则更新当年预算字段
- 5、若为最终兑现，将剩余预算清零；否则重新计算剩余金额
</KbCard>

<KbCard num="3" title="重点逻辑3：额度内兑现回写交易公司 审批回调">
<KbQuote>额度内兑现审批通过后，需将兑现单上的交易公司回写到上游申请单、验收单和报销单</KbQuote>

**具体逻辑**：

- 1、仅当兑现类型=额度内时触发
- 2、模块类型=门店装修报销时，回写申请单的可用交易公司字段
- 3、模块类型=广告费报销时，回写申请单的交易公司字段
- 4、同时回写验收单和报销单的交易公司信息
</KbCard>

<KbCard num="4" title="重点逻辑4：ERP资金池调整 审批回调">
<KbQuote>审批通过后需将兑现数据同步到ERP资金池，实现财务数据一致性</KbQuote>

**具体逻辑**：

- 1、兑现类型=额度内时，来源类型为"广告费（额内）"
- 2、兑现类型=额度外时，来源类型为"广告费（额外）"
- 3、其他兑现类型抛出异常
- 4、调用ERP接口后判断返回状态是否为S（成功）
</KbCard>

<KbCard num="5" title="重点逻辑5：签章状态校验 操作校验">
<KbQuote>确保单据在签章完成后才能进行后续操作</KbQuote>

**具体逻辑**：

- 1、签章状态不为2（已签章）时返回true（允许操作）
- 2、签章状态为2且需要重签为2时返回true（允许操作）
- 3、签章状态为2且不需要重签时返回false（不允许操作）
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：广告报销发票兑现主页面">
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
<td>发票兑现ID</td>
<td>文本框</td>
<td>主键ID</td>
<td>常显</td>
<td>新建时自动生成，不可编辑</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.FEE_CASHOUT_ID</td>
</tr>
<tr>
<td>发票兑现单号</td>
<td>文本框</td>
<td>兑现单唯一编号</td>
<td>常显</td>
<td>新建时系统自动生成，不可编辑</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.FEE_CASHOUT_NO</td>
</tr>
<tr>
<td>费用报销ID</td>
<td>文本框</td>
<td>关联的广告费报销单ID</td>
<td>常显</td>
<td>从报销单带入，不可编辑</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.BX_ID</td>
</tr>
<tr>
<td>费用报销单号</td>
<td>文本框</td>
<td>关联的广告费报销单号</td>
<td>常显</td>
<td>从报销单带入，不可编辑</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.BX_NO</td>
</tr>
<tr>
<td>兑现类型</td>
<td>下拉选择框</td>
<td>区分额度内/额度外兑现</td>
<td>常显</td>
<td>默认无，手工选择</td>
<td>值集AE_BX_TYPE：1-额度内，2-额度外</td>
<td>FIN_FEE_CASHOUT_HEADER.CASHOUT_TYPE</td>
</tr>
<tr>
<td>可兑现总额</td>
<td>文本框</td>
<td>报销单可兑现的总金额</td>
<td>常显</td>
<td>从报销单自动带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TOTAL_CAN_CASHOUT_AMT</td>
</tr>
<tr>
<td>已兑现总额</td>
<td>文本框</td>
<td>已完成兑现的金额合计</td>
<td>常显</td>
<td>系统自动计算</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.USED_CASHOUT_AMT</td>
</tr>
<tr>
<td>剩余未兑现总额</td>
<td>文本框</td>
<td>尚未兑现的金额</td>
<td>常显</td>
<td>自动计算=可兑现总额-已兑现总额</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.SUR_CASHOUT_AMT</td>
</tr>
<tr>
<td>本次兑现金额</td>
<td>文本框</td>
<td>本次申请兑现的金额</td>
<td>常显</td>
<td>默认无，手工填写</td>
<td>大于0且不超过剩余可兑现金额</td>
<td>FIN_FEE_CASHOUT_HEADER.THIS_CASHOUT_AMT</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.CUST_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.CUST_NAME</td>
</tr>
<tr>
<td>经销商简称</td>
<td>文本框</td>
<td>经销商简称</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.SHORT_NAME</td>
</tr>
<tr>
<td>预算年度</td>
<td>文本框</td>
<td>费用计入的预算年度</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.BUD_YEAR</td>
</tr>
<tr>
<td>费用编码</td>
<td>文本框</td>
<td>费用项目编码</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.OBJECT_CODE</td>
</tr>
<tr>
<td>费用名称</td>
<td>文本框</td>
<td>费用项目名称</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.OBJECT_NAME</td>
</tr>
<tr>
<td>是否为最终兑现</td>
<td>单选框</td>
<td>标识是否为最后一次兑现</td>
<td>常显</td>
<td>默认否，手工选择</td>
<td>1-否，2-是</td>
<td>FIN_FEE_CASHOUT_HEADER.IS_END</td>
</tr>
<tr>
<td>模块类型</td>
<td>下拉选择框</td>
<td>区分门店装修报销与广告费报销</td>
<td>常显</td>
<td>从报销单带入</td>
<td>1-门店装修报销，2-广告费报销</td>
<td>FIN_FEE_CASHOUT_HEADER.SAVE_TYPE</td>
</tr>
<tr>
<td>支付方式</td>
<td>下拉选择框</td>
<td>兑现的支付方式</td>
<td>常显</td>
<td>默认无，手工选择</td>
<td>值集AE_PAY_TYPE</td>
<td>FIN_FEE_CASHOUT_HEADER.PAY_TYPE</td>
</tr>
<tr>
<td>门店编码</td>
<td>文本框</td>
<td>门店编码</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TERMINAL_CODE</td>
</tr>
<tr>
<td>门店名称</td>
<td>文本框</td>
<td>门店名称</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TERMINAL_NAME</td>
</tr>
<tr>
<td>额度内可报销总金额</td>
<td>文本框</td>
<td>额度内剩余未报金额</td>
<td>兑现类型=额度内</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.IN_CAN_USE_AMT</td>
</tr>
<tr>
<td>额度外可报销总金额</td>
<td>文本框</td>
<td>额度外剩余未报金额</td>
<td>兑现类型=额度外</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.OUT_CAN_USE_AMT</td>
</tr>
<tr>
<td>本次核销金额</td>
<td>文本框</td>
<td>本次核销的金额</td>
<td>兑现类型=额度内</td>
<td>默认无，手工填写</td>
<td>不超过额度内可用金额</td>
<td>FIN_FEE_CASHOUT_HEADER.THIS_WRITEOFF_AMT</td>
</tr>
<tr>
<td>实际兑现金额</td>
<td>文本框</td>
<td>实际发票兑现金额</td>
<td>常显</td>
<td>默认无，手工填写</td>
<td>支付方式≠3时必须大于0</td>
<td>FIN_FEE_CASHOUT_HEADER.FACT_INVOICE_AMT</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>从报销单带入</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>成本中心编码</td>
<td>文本框</td>
<td>成本中心编码</td>
<td>常显</td>
<td>默认无，手工填写</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.COST_CENTER_CODE</td>
</tr>
<tr>
<td>成本中心名称</td>
<td>文本框</td>
<td>成本中心名称</td>
<td>常显</td>
<td>默认无，手工填写</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.COST_CENTER_NAME</td>
</tr>
<tr>
<td>供应商编码</td>
<td>文本框</td>
<td>供应商编码</td>
<td>常显</td>
<td>随供应商ID自动带出</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.SUPPLY_CODE</td>
</tr>
<tr>
<td>供应商全称</td>
<td>文本框</td>
<td>供应商全称</td>
<td>常显</td>
<td>随供应商ID自动带出</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.SUPPLY_FULL_NAME</td>
</tr>
<tr>
<td>是否计入广告费报表</td>
<td>单选框</td>
<td>是否计入广告费报表统计</td>
<td>常显</td>
<td>默认无，必填</td>
<td>1-否，2-是</td>
<td>FIN_FEE_CASHOUT_HEADER.IS_INCLUDED_REPORT</td>
</tr>
<tr>
<td>三方协议</td>
<td>单选框</td>
<td>是否有三方协议</td>
<td>常显</td>
<td>默认无，手工选择</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.TRIPAR_AGREE</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>备注说明</td>
<td>常显</td>
<td>默认无，手工填写</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.NOTE</td>
</tr>
<tr>
<td>审核人</td>
<td>文本框</td>
<td>审批通过的操作人</td>
<td>常显</td>
<td>审批通过时自动赋值</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.CHECKER</td>
</tr>
<tr>
<td>审核时间</td>
<td>文本框</td>
<td>审批通过的时间</td>
<td>常显</td>
<td>审批通过时自动赋值</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.CHECK_TIME</td>
</tr>
<tr>
<td>发票到款日期</td>
<td>日期选择器</td>
<td>发票到款的入账日期</td>
<td>支付方式=3</td>
<td>审批通过且支付方式=3时自动赋值当前时间</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.INVOICE_PAID_DATE</td>
</tr>
<tr>
<td>发票到款金额</td>
<td>文本框</td>
<td>发票到款金额</td>
<td>支付方式=3</td>
<td>审批通过且支付方式=3时自动赋值实际兑现金额</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.INVOICE_PAID_AMOUNT</td>
</tr>
<tr>
<td>电子签章状态</td>
<td>文本框</td>
<td>电子签章完成状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>-</td>
<td>FIN_FEE_CASHOUT_HEADER.SIGNATURE_STATE</td>
</tr>
<tr>
<td>需要重签</td>
<td>单选框</td>
<td>是否需要重新签章</td>
<td>常显</td>
<td>系统自动维护</td>
<td>1-否，2-是</td>
<td>FIN_FEE_CASHOUT_HEADER.IS_RESIGN</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：供应商选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| supplyCode | 供应商编码 | 按编码模糊查询 | S001 |
| supplyName | 供应商名称 | 按名称模糊查询 | XX广告公司 |

**数据范围**

```sql
供应商主数据中生效的记录
```

</KbCard>
<KbCard title="导入">
> 本模块无导入功能

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 提交 | 提交审批 | 详情页 | 单据状态为新建/驳回时 | 触发工作流ADJ_GGBXFPDX，进入审批流程 |
| 打印 | 打印兑现单 | 详情页 | 单据已保存 | 调用detail/print接口获取打印数据 |
| 电子签章 | 发起电子签章 | 详情页 | 审批通过且未签章 | 触发电子签章流程 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：是否计入广告费报表必填 —— 确保兑现数据是否纳入报表统计的标识明确</KbSubTitle>

- 第1点：字段IS_INCLUDED_REPORT标注@NotNull，保存时框架自动校验非空

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM FIN_FEE_CASHOUT_HEADER WHERE IS_INCLUDED_REPORT IS NULL;
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：本次兑现金额不超过剩余可兑现金额 —— 防止超额兑现</KbSubTitle>

- 第1点：查询该报销单下所有已提交兑现单的已兑现金额合计
- 第2点：剩余可兑现金额=可兑现总额-已兑现金额合计
- 第3点：若本次兑现金额&gt;剩余可兑现金额，阻断提交

<KbTip>阻断性报错，提示"申请兑现金额：X元，已超剩余未兑现总额：Y元，请检查！"</KbTip>

```sql
SELECT h.FEE_CASHOUT_ID, h.THIS_CASHOUT_AMT, h.TOTAL_CAN_CASHOUT_AMT,
           (SELECT SUM(h2.THIS_CASHOUT_AMT) FROM FIN_FEE_CASHOUT_HEADER h2 WHERE h2.BX_ID = h.BX_ID AND h2.STAT >= 1) AS USED_AMT
    FROM FIN_FEE_CASHOUT_HEADER h WHERE h.FEE_CASHOUT_ID = :feeCashoutId;
```

<KbSubTitle>校验2：支付方式非费用转到款时实际兑现金额必须大于0 —— 确保发票金额有效</KbSubTitle>

- 第1点：支付方式≠3时，实际兑现含税金额必须大于0

<KbTip>阻断性报错，提示"发票金额异常，请检查！"</KbTip>

```sql
SELECT * FROM FIN_FEE_CASHOUT_HEADER WHERE PAY_TYPE != 3 AND FACT_INVOICE_AMT <= 0;
```

<KbSubTitle>校验3：额度内核销金额不超过可用金额 —— 防止超额核销</KbSubTitle>

- 第1点：兑现类型=额度内时，本次核销金额不可超过额度内可用金额

<KbTip>阻断性报错，提示"本次核销金额不可超过额度内可用金额：X"</KbTip>

```sql
SELECT * FROM FIN_FEE_CASHOUT_HEADER WHERE CASHOUT_TYPE = 1 AND THIS_WRITEOFF_AMT > IN_CAN_USE_AMT;
```

<KbSubTitle>校验4：额度外兑现金额不超过可用金额且扣除占用 —— 防止超额兑现</KbSubTitle>

- 第1点：兑现类型=额度外时，本次兑现金额不可超过额度外可用金额
- 第2点：查询已占用金额，本次兑现金额不可超过(额度外可用金额-已占用金额)

<KbTip>阻断性报错，提示"额度外金额已占用：X,剩余：Y"</KbTip>

```sql
SELECT * FROM FIN_FEE_CASHOUT_HEADER WHERE CASHOUT_TYPE = 2 AND THIS_CASHOUT_AMT > OUT_CAN_USE_AMT;
```

</KbCard>
<KbCard title="状态机">


```text
新建 → 提交 → 审批中 → 审批通过 → (额度外预算同步/交易公司回写/ERP资金池调整/MBO推送)
                ↓
             审批驳回 → 修改后可重新提交
```


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 新建 | 单据已保存未提交 | 编辑、删除、提交 |
| 审批中 | 已提交工作流审批中 | 撤回 |
| 审批通过 | 工作流审批通过 | 打印、电子签章 |
| 审批驳回 | 工作流审批驳回 | 编辑、重新提交 |

---

</KbCard>
<KbCard num="1" title="表1：FIN_FEE_CASHOUT_HEADER（报销发票兑现主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| FEE_CASHOUT_ID | BIGINT | 发票兑现ID | 发票兑现ID | 主键，自增 |
| FEE_CASHOUT_NO | VARCHAR | 发票兑现单号 | 发票兑现单号 | 系统自动生成 |
| BX_ID | BIGINT | 费用报销ID | 费用报销ID | 关联FIN_FEE_BX_HEADER.BX_ID |
| BX_NO | VARCHAR | 费用报销单号 | 费用报销单号 | 关联报销单号 |
| CASHOUT_TYPE | BIGINT | 兑现类型 | 兑现类型 | 1-额度内，2-额度外 |
| TOTAL_CAN_CASHOUT_AMT | DECIMAL | 可兑现总额 | 可兑现总额 | 从报销单带入 |
| USED_CASHOUT_AMT | BIGINT | 已兑现总额 | 已兑现总额 | 系统自动计算 |
| SUR_CASHOUT_AMT | BIGINT | 剩余未兑现总额 | 剩余未兑现总额 | 自动计算=可兑现总额-已兑现总额 |
| THIS_CASHOUT_AMT | DECIMAL | 本次兑现金额 | 本次兑现金额 | 手工填写 |
| CUST_ID | BIGINT | 经销商ID | - | 从报销单带入 |
| CUST_CODE | VARCHAR | 经销商编码 | 经销商编码 | 从报销单带入 |
| CUST_NAME | VARCHAR | 经销商名称 | 经销商名称 | 从报销单带入 |
| SHORT_NAME | VARCHAR | 经销商简称 | 经销商简称 | 从报销单带入 |
| BUD_YEAR | VARCHAR | 预算年度 | 预算年度 | 从报销单带入 |
| OBJECT_CODE | VARCHAR | 费用编码 | 费用编码 | 从报销单带入 |
| OBJECT_NAME | VARCHAR | 费用名称 | 费用名称 | 从报销单带入 |
| IS_END | BIGINT | 是否为最终兑现 | 是否为最终兑现 | 1-否，2-是 |
| STAT | BIGINT | 单据状态 | - | 状态机维护 |
| WFID | BIGINT | 流程ID | - | 工作流ID |
| WFFLAG | BIGINT | 流程状态 | - | 工作流状态 |
| ENTID | BIGINT | 事业部ID | - | 从报销单带入 |
| ENTNAME | VARCHAR | 事业部名称 | - | 从报销单带入 |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 租户组织ID |
| DIVISION_ID | BIGINT | 事业部词汇值 | - | 词汇值 |
| SAVE_TYPE | BIGINT | 模块类型 | 模块类型 | 1-门店装修报销，2-广告费报销 |
| CHECKER | VARCHAR | 审核人 | 审核人 | 审批通过时自动赋值 |
| CHECK_TIME | DATE | 审核时间 | 审核时间 | 审批通过时自动赋值 |
| INVOICE_PAID_DATE | DATETIME | 发票到款日期 | 发票到款日期 | 支付方式=3且审批通过时赋值当前时间 |
| INVOICE_PAID_AMOUNT | DECIMAL | 发票到款金额 | 发票到款金额 | 支付方式=3且审批通过时赋值实际兑现金额 |
| RECEIPT_STATUS | VARCHAR | 虚拟收款状态 | - | - |
| PAY_TYPE | BIGINT | 支付方式 | 支付方式 | 值集AE_PAY_TYPE |
| SALEZONE_ORG_ID | BIGINT | 所属销售区域ID | - | 从报销单带入 |
| SALEZONE_ORG_NAME | VARCHAR | 所属销售区域名称 | - | 从报销单带入 |
| OPERAT_CENTER_ORG_ID | BIGINT | 所属运营中心ID | - | 从报销单带入 |
| OPERAT_CENTER_ORG_NAME | VARCHAR | 所属运营中心名称 | - | 从报销单带入 |
| NOTE | VARCHAR | 备注 | 备注 | 手工填写 |
| TERMINAL_ID | BIGINT | 门店ID | - | 从报销单带入 |
| TERMINAL_CODE | VARCHAR | 门店编码 | 门店编码 | 从报销单带入 |
| TERMINAL_NAME | VARCHAR | 门店名称 | 门店名称 | 从报销单带入 |
| IN_CAN_USE_AMT | BIGINT | 额度内可报销总金额 | 额度内可报销总金额 | 从报销单带入 |
| OUT_CAN_USE_AMT | BIGINT | 额度外可报销总金额 | 额度外可报销总金额 | 从报销单带入 |
| THIS_APPLY_AMT | BIGINT | 本次申请金额 | - | 额度外兑现时使用 |
| FACT_INVOICE_AMT | BIGINT | 实际兑现金额 | 实际兑现金额 | 手工填写 |
| CASHOUT_FLAG | BIGINT | 兑现标识 | - | - |
| THIS_BX_PROPORTION | BIGINT | 本次兑现比例 | - | - |
| COST_CENTER_CODE | VARCHAR | 成本中心编码 | 成本中心编码 | 手工填写 |
| COST_CENTER_NAME | VARCHAR | 成本中心名称 | 成本中心名称 | 手工填写 |
| BILLING_UNIT_ID | BIGINT | 经销商法人客户ID | - | 从报销单带入 |
| BILLING_UNIT_CODE | VARCHAR | 经销商法人客户编码 | - | 从报销单带入 |
| BILLING_UNIT_NAME | VARCHAR | 经销商法人客户名称 | - | 从报销单带入 |
| THIS_WRITEOFF_AMT | BIGINT | 本次核销金额 | 本次核销金额 | 额度内兑现时手工填写 |
| THIS_WRITEOFF_PROPORTION | BIGINT | 本次核销比例 | - | - |
| SUR_WRITEOFF_AMT | BIGINT | 剩余未核销金额 | - | - |
| SUR_WRITEOFF_PROPORTION | BIGINT | 剩余未核销比例 | - | - |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID | - | 从报销单带入或手工选择 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | 随交易公司ID带出 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司名称 | 随交易公司ID带出 |
| AUDIT_STAT | VARCHAR | 审核状态 | - | - |
| EXT_ACCOUNT_ID | VARCHAR | 账户余额ID | - | ERP接口查询 |
| LEDGER_DATE | DATE | 总账日期 | - | 支付方式=3且审批通过时赋值 |
| SIGNATURE_STATE | BIGINT | 电子签章状态 | 电子签章状态 | 系统自动维护 |
| SIGNATURE_URL | VARCHAR | 电子签章地址 | - | 签章完成后赋值 |
| IS_INCLUDED_REPORT | BIGINT | 是否计入广告费报表 | 是否计入广告费报表 | 必填，1-否，2-是 |
| TRIPAR_AGREE | BIGINT | 三方协议 | 三方协议 | 手工选择 |
| SUPPLY_ID | BIGINT | 供应商ID | - | 弹窗选择 |
| SUPPLY_FULL_NAME | VARCHAR | 供应商全称 | 供应商全称 | 随供应商ID带出 |
| SUPPLY_NAME | VARCHAR | 供应商名称 | - | 随供应商ID带出 |
| SUPPLY_CODE | VARCHAR | 供应商编码 | 供应商编码 | 随供应商ID带出 |
| VENDOR_CONTACT | VARCHAR | 供应商联系人 | - | - |
| VENDOR_TELE | VARCHAR | 供应商电话 | - | - |
| VENDOR_ADDRESS | VARCHAR | 供应商地址 | - | - |
| IS_RESIGN | BIGINT | 需要重签 | 需要重签 | 1-否，2-是 |
| HZ_INSTANCE_ID | BIGINT | 流程实例id | - | HZero工作流实例ID |
| HZ_APPROVE_STATUS | VARCHAR | 流程实例状态 | - | HZero工作流审批状态 |

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
            <td style="color:#DC2626;font-weight:600;">该单据流程信息不存在</td>
            <td style="font-size:13px;">签章校验</td>
            <td style="font-size:13px;">兑现单在数据库中不存在或流程信息缺失，检查数据完整性</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程中objid为0，流程失败！</td>
            <td style="font-size:13px;">工作流校验</td>
            <td style="font-size:13px;">工作流回调时传入的对象ID为0，检查工作流配置</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">发票金额异常，请检查！</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">支付方式非费用转到款时，实际兑现金额≤0</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">本次申请兑现金额不可超过该报销单据剩余的可兑现金额：X</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">本次兑现金额超过报销单剩余可兑现金额</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">本次核销金额不可超过额度内可用金额：X</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">额度内兑现时核销金额超过可用金额</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">本次申请兑现金额不可超过额度外可用金额：X</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">额度外兑现时兑现金额超过可用金额</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">额度外金额已占用：X,剩余：Y</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">额度外兑现时兑现金额超过扣除占用后的剩余金额</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">申请兑现金额：X元，已超剩余未兑现总额：Y元，请检查！</td>
            <td style="font-size:13px;">工作流提交校验</td>
            <td style="font-size:13px;">提交工作流时校验兑现金额超限</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">兑现类型异常！</td>
            <td style="font-size:13px;">ERP资金池同步</td>
            <td style="font-size:13px;">兑现类型非1或2</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">门店编码或预算年度不能为空</td>
            <td style="font-size:13px;">额度外预算同步</td>
            <td style="font-size:13px;">额度外兑现审批通过时门店编码或预算年度为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-10" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">可兑现总额不能为零或负数</td>
            <td style="font-size:13px;">额度外预算同步</td>
            <td style="font-size:13px;">额度外兑现审批通过时可兑现总额≤0</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-11" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">税率配置格式错误：X</td>
            <td style="font-size:13px;">额度外预算同步</td>
            <td style="font-size:13px;">系统配置的额度外税率格式不正确</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-12" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">额度外预算数据不存在，请检查！</td>
            <td style="font-size:13px;">额度外预算同步</td>
            <td style="font-size:13px;">非最终兑现时查不到额度外预算数据</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-13" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该单据流程信息不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>兑现单在数据库中不存在或流程信息缺失，检查数据完整性</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程中objid为0，流程失败！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>工作流回调时传入的对象ID为0，检查工作流配置</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>发票金额异常，请检查！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>支付方式非费用转到款时，实际兑现金额≤0</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>本次申请兑现金额不可超过该报销单据剩余的可兑现金额：X</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>本次兑现金额超过报销单剩余可兑现金额</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>本次核销金额不可超过额度内可用金额：X</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>额度内兑现时核销金额超过可用金额</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>本次申请兑现金额不可超过额度外可用金额：X</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>额度外兑现时兑现金额超过可用金额</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>额度外金额已占用：X,剩余：Y</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>额度外兑现时兑现金额超过扣除占用后的剩余金额</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>申请兑现金额：X元，已超剩余未兑现总额：Y元，请检查！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>提交工作流时校验兑现金额超限</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>兑现类型异常！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>兑现类型非1或2</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-10" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>门店编码或预算年度不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>额度外兑现审批通过时门店编码或预算年度为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-11" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>可兑现总额不能为零或负数</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>额度外兑现审批通过时可兑现总额≤0</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-12" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>税率配置格式错误：X</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>系统配置的额度外税率格式不正确</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-13" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>额度外预算数据不存在，请检查！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>非最终兑现时查不到额度外预算数据</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">额度外兑现审批通过后预算数据未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>可能门店编码或预算年度为空，或额度外预算数据不存在。排查SQL：`SELECT * FROM FIN_FEE_CASHOUT_HEADER WHERE CASHOUT_TYPE = 2 AND SAVE_TYPE = 1 AND THIS_APPLY_AMT &gt; 0 AND (TERMINAL_CODE IS NULL OR BUD_YEAR IS NULL)`<br>
      <strong style="color:#7C3AED;">处理：</strong>补充门店编码和预算年度数据，或检查MKT_OUTLIMIT_BUD_HEADER中是否存在对应预算记录
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">ERP资金池同步失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>兑现类型异常或ERP接口调用失败。排查SQL：`SELECT * FROM FIN_FEE_CASHOUT_HEADER WHERE CASHOUT_TYPE NOT IN (1, 2)`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查兑现类型值是否正确，检查ERP接口连接和参数配置
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
| 2025-10-29 | - | tyc | 初始创建报销发票兑现模块 |

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
