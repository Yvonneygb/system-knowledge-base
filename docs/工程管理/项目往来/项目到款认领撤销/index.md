<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="4" title="项目到款认领撤销" desc="工程管理-项目往来业务说明" />

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
项目到款认领(EPM_PAYMENT_ALLOT) ──选择已认领明细──> 撤销认领(新建)
                                                      │
                                                      ├── 选择项目 → 填写撤销原因
                                                      ├── 选择已认领明细行 → 保存(校验可结算服务费)
                                                      │
                                                      ▼
                                                提交审批(启动工作流EPM_PAYMENT_ALLOT_CANCEL)
                                                      │
                                            ┌─────────┴─────────┐
                                            ▼                   ▼
                                      审批通过              审批驳回
                                      (推送ERP撤销数据)      (流程中断)
                                      (更新认领明细撤销标识=Y)
                                      (回加到款单可认领金额)
                                            │
                                            ▼
                                      ERP撤销完成
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 项目到款认领(EPM_PAYMENT_ALLOT) | 数据依赖 | 提供已认领的明细数据，撤销基于认领明细 | 认领单审批状态=APPROVED，明细撤销标识=N |
| 到款引入(EPM_PAYMENT_IMPORT) | 数据依赖 | 撤销审批通过后回加到款单可认领金额 | 到款单存在且有效 |
| ERP核销接口(EPMS_AR_APPLY) | 配置依赖 | 撤销审批通过后推送ERP撤销数据(负数金额) | ERP接口可用 |
| 编码规则(AE.EPM_PAYMENT_ALLOT_CANCEL_NO) | 配置依赖 | 生成撤销单号 | 编码规则已配置 |
| 工作流(EPM_PAYMENT_ALLOT_CANCEL) | 配置依赖 | 撤销审批流程 | 工作流已部署 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 项目到款单 | 可认领金额回加 | 撤销审批通过后，按认领单维度将撤销的认领金额回加到对应到款单(EPM_PAYMENT_IMPORT)的可认领金额(UNALLOT_AMT) |
| 项目到款认领 | 认领明细撤销标记 | 撤销审批通过后，对应认领明细行(EPM_PAYMENT_ALLOT_DETAIL)的撤销标识(CANCEL_FLAG)更新为Y，该明细不可再次撤销 |
| ERP系统 | 推送核销撤销 | 撤销审批通过后，推送负数金额核销数据到ERP，包含AR_APPLY(应收撤销)、OM_CLAIM(出库认领撤销)、OM_APPLY(出库核销撤销) |
| 项目到款认领 | 记录撤销时间 | 撤销审批通过后，更新撤销单头的撤销时间(CANCEL_DATE) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：撤销保存逻辑 保存">
<KbQuote>新建撤销单并关联已认领明细行，支持新增和修改两种模式</KbQuote>

**具体逻辑**：

- 1、新增时自动生成撤销单号，格式为：部门编码+编码规则生成的序号
- 2、新增时初始状态为1(新建)，流程ID和流程标志均为0
- 3、修改时采用先删后插策略，先删除原有撤销明细(EPM_PAD_CANCEL)，再重新插入
- 4、撤销明细行支持标记删除状态(_status=delete)，删除状态的行不插入
</KbCard>

<KbCard num="2" title="重点逻辑2：撤销前服务费校验 服务费校验">
<KbQuote>防止撤销后可结算工程服务费小于零，确保已兑现的服务费不被超额撤销</KbQuote>

**具体逻辑**：

- 1、按报销单(SVC_EXP_ACC_ID)分组校验，仅校验关联了报销单的明细行
- 2、可结算兑现金额=(已认领工程服务费-本次撤销的工程服务费-已退货工程服务费)-已申请兑现金额
- 3、若可结算兑现金额小于0，则报错提示具体报销单号，不允许撤销
- 4、已认领工程服务费和已退货工程服务费从queryBxAllotInfo查询；已申请兑现金额从getAppliedAmt查询
</KbCard>

<KbCard num="3" title="重点逻辑3：撤销提交前校验 提交校验">
<KbQuote>防止已撤销的明细被重复提交撤销</KbQuote>

**具体逻辑**：

- 1、查询撤销单下所有明细对应的认领明细行
- 2、检查认领明细行的撤销标识(CANCEL_FLAG)是否为Y
- 3、若存在已撤销明细，报错列出具体认领单号、出库单号、产品编码，要求剔除后再提交
</KbCard>

<KbCard num="4" title="重点逻辑4：撤销审批通过逻辑 审批通过">
<KbQuote>审批通过后执行撤销操作，推送ERP并回加到款单金额</KbQuote>

**具体逻辑**：

- 1、推送ERP撤销数据，金额取负数(取反)，actionStatus=APPROVE，sourceType=REVOKE_CLAIM
- 2、更新认领明细的撤销标识为Y
- 3、更新撤销单头的撤销时间为当前时间
- 4、按认领单维度汇总撤销的认领金额，回加到对应到款单的可认领金额
</KbCard>

<KbCard num="5" title="重点逻辑5：ERP撤销数据推送 ERP推送">
<KbQuote>将撤销数据推送至ERP进行核销冲销，实现DMS与ERP的账务同步</KbQuote>

**具体逻辑**：

- 1、推送数据按认领单(PAYMENT_ALLOT_ID)分组，每组包含AR_APPLY、OM_CLAIM、OM_APPLY三类数据
- 2、AR_APPLY按应收事务ID(CUSTOMER_TRX_ID)汇总，金额取负数
- 3、OM_CLAIM按出库明细行(DELIVERY_LINE_ID)维度，金额取负数
- 4、OM_APPLY按出库单号(DELIVERY_NUMBER)汇总，金额取负数
- 5、虚拟到款单(VIRTUAL_RECEIPT)需额外传递creditMemoId
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：撤销认领列表页">
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
<td>撤销单号</td>
<td>文本框</td>
<td>系统自动生成的撤销单号</td>
<td>常显</td>
<td>保存时按编码规则自动生成(部门编码+序号)，不可编辑</td>
<td>-</td>
<td>EPM_PAYMENT_ALLOT_CANCEL.CANCEL_NO</td>
</tr>
<tr>
<td>撤销日期</td>
<td>文本框</td>
<td>撤销审批通过时间</td>
<td>常显</td>
<td>审批通过时自动写入当前时间，不可编辑</td>
<td>-</td>
<td>EPM_PAYMENT_ALLOT_CANCEL.CANCEL_DATE</td>
</tr>
<tr>
<td>审批状态</td>
<td>下拉选择框</td>
<td>工作流审批状态</td>
<td>常显</td>
<td>值集HWKF.APPROVE_STATUS翻译</td>
<td>NEW/RUN/APPROVED/INTERRUPT</td>
<td>EPM_PAYMENT_ALLOT_CANCEL.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>项目编号</td>
<td>文本框</td>
<td>撤销关联的项目编号</td>
<td>常显</td>
<td>来源于项目信息，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.PROJECT_CODE</td>
</tr>
<tr>
<td>项目名称</td>
<td>文本框</td>
<td>撤销关联的项目名称</td>
<td>常显</td>
<td>来源于项目信息，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.PROJECT_NAME</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>来源于项目关联的交易公司，不可编辑</td>
<td>-</td>
<td>EPM_TRADING_COMPANY.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>客户编号</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>来源于项目信息，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>来源于项目信息，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.CUSTOMER_NAME</td>
</tr>
<tr>
<td>撤销原因</td>
<td>文本框</td>
<td>撤销原因说明</td>
<td>常显</td>
<td>新建时手工填写，可编辑</td>
<td>-</td>
<td>EPM_PAYMENT_ALLOT_CANCEL.CANCEL_REASON</td>
</tr>
<tr>
<td>错误信息</td>
<td>文本框</td>
<td>ERP推送错误信息</td>
<td>推送失败时显示</td>
<td>来源于异常消息表，不可编辑</td>
<td>-</td>
<td>SYS_EXCEPTION_MSG.MSG</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：撤销认领详情页-撤销明细行">
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
<td>认领单号</td>
<td>文本框</td>
<td>被撤销的认领单号</td>
<td>常显</td>
<td>来源于认领明细，不可编辑</td>
<td>-</td>
<td>EPM_PAYMENT_ALLOT.PAYMENT_ALLOT_CODE</td>
</tr>
<tr>
<td>出库单号</td>
<td>文本框</td>
<td>认领关联的出库单号</td>
<td>常显</td>
<td>来源于认领明细，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>产品编码</td>
<td>文本框</td>
<td>产品编码</td>
<td>常显</td>
<td>来源于认领明细，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>认领金额</td>
<td>数值框</td>
<td>原认领金额</td>
<td>常显</td>
<td>来源于认领明细，不可编辑</td>
<td>&gt;0</td>
<td>EPM_PAYMENT_ALLOT_DETAIL.CLAIM_AMT</td>
</tr>
<tr>
<td>退货金额</td>
<td>数值框</td>
<td>原退货金额</td>
<td>常显</td>
<td>来源于认领明细，不可编辑</td>
<td>≥0</td>
<td>EPM_PAYMENT_ALLOT_DETAIL.RETURN_AMT</td>
</tr>
<tr>
<td>工程服务费</td>
<td>数值框</td>
<td>工程服务费金额</td>
<td>常显</td>
<td>来源于认领明细，不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>撤销标识</td>
<td>单选框</td>
<td>是否已撤销</td>
<td>常显</td>
<td>审批通过后自动更新为Y</td>
<td>Y/N</td>
<td>EPM_PAYMENT_ALLOT_DETAIL.CANCEL_FLAG</td>
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
| 保存 | 保存撤销单及明细 | 详情页 | 新建/编辑状态 | 调用/v1/{orgId}/epm-payment-allot-cancels/save，生成撤销单号 |
| 提交 | 提交撤销审批 | 详情页 | 撤销单已保存，明细未全部已撤销 | 启动工作流EPM_PAYMENT_ALLOT_CANCEL |
| 导出 | 导出撤销认领列表 | 列表页 | 常显 | 调用/v1/{orgId}/epm-payment-allot-cancels/list/export |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：撤销后可结算工程服务费不可小于零 —— 防止超额撤销影响已兑现服务费</KbSubTitle>

- 第1点：按报销单分组，计算：可结算兑现金额=(已认领工程服务费-本次撤销工程服务费-已退货工程服务费)-已申请兑现金额
- 第2点：若结果小于0，报错提示具体报销单号

<KbTip>阻断性报错</KbTip>

```sql
SELECT NVL(SUM(aot.claim_amt), 0) total_claim_amt,
           NVL(SUM(aot.claim_service_amt), 0) total_claim_service_amt,
           NVL(SUM(ROUND(so.return_qty * so.engineering_price, 2) - ROUND(so.return_qty * so.dealer_price, 2)), 0) return_service_amt
    FROM fin_svc_exp_acc_line l
    LEFT JOIN (SELECT ad.source_id, SUM(ad.claim_amt) claim_amt, SUM(ad.claim_service_amt) claim_service_amt
               FROM epm_payment_allot_detail ad
               JOIN epm_payment_allot_line al ON ad.payment_allot_line_id = al.payment_allot_line_id
               JOIN epm_payment_allot a ON al.payment_allot_id = a.payment_allot_id
               WHERE a.stat = 5 AND a.payment_allot_stat = 'APPROVED' AND ad.allow_cash_flag = 'Y' AND ad.cancel_flag = 'N'
               GROUP BY ad.source_id) aot ON l.DIFFBILL_LINE_ID = aot.source_id
    LEFT JOIN sales_return_order so ON l.line_number = so.order_line_id
    WHERE l.svc_exp_acc_id = {svcExpAccId}
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：明细中不可包含已撤销的认领明细 —— 防止重复撤销</KbSubTitle>

- 第1点：查询撤销单下所有明细对应的认领明细行
- 第2点：检查CANCEL_FLAG是否为Y，若存在则列出认领单号、出库单号、产品编码

<KbTip>阻断性报错</KbTip>

```sql
SELECT pad.payment_allot_code, pad.inv_bill_no, pad.item_code
    FROM epm_pad_cancel pc
    JOIN epm_payment_allot_detail pad ON pc.payment_allot_detail_id = pad.payment_allot_detail_id
    WHERE pc.cancel_id = {cancelId} AND pad.cancel_flag = 'Y'
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建stat=1] ──提交──> [审批中RUN] ──审批通过──> [已审批APPROVED]
                            │
                            └──审批驳回──> [已中断INTERRUPT]
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、提交 |
| RUN | 审批中 | - |
| APPROVED | 审批通过 | - |
| INTERRUPT | 审批驳回 | - |

---

</KbCard>
<KbCard num="1" title="表1：EPM_PAYMENT_ALLOT_CANCEL（撤销认领主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 撤销单ID | - | 自增主键 |
| CANCEL_NO | VARCHAR | 撤销单号 | 撤销单号 | 部门编码+编码规则序号 |
| CANCEL_DATE | DATE | 撤销时间 | 撤销日期 | 审批通过时写入当前时间 |
| PROJECT_ID | NUMBER | 项目ID | - | 关联EPM_PROJECT |
| STAT | NUMBER | 撤销状态 | - | 1-新建 |
| WFID | NUMBER | 流程ID | - | 默认0 |
| WFFLAG | NUMBER | 流程标志 | - | 默认0 |
| CANCEL_REASON | VARCHAR | 撤销原因 | 撤销原因 | 手工填写 |
| ORGANIZATION_ID | NUMBER | 事业部ID | - | 来源于项目 |
| HZ_APPROVE_STATUS | VARCHAR | 审批状态 | 审批状态 | NEW/RUN/APPROVED/INTERRUPT |
| HZ_INSTANCE_ID | NUMBER | 审批实例ID | - | 工作流返回 |

</KbCard>

<KbCard num="2" title="表2：EPM_PAD_CANCEL（撤销认领明细表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 撤销明细ID | - | 自增主键 |
| CANCEL_ID | NUMBER | 撤销单ID | - | 关联EPM_PAYMENT_ALLOT_CANCEL.ID |
| PAYMENT_ALLOT_DETAIL_ID | NUMBER | 认领明细ID | - | 关联EPM_PAYMENT_ALLOT_DETAIL |

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
            <td style="color:#DC2626;font-weight:600;">撤销明细中，含有已经报销的认领明细，且撤销后可结算工程服务费小于零，不允许撤销：报销单号-xxx</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">撤销后可结算兑现金额&lt;0，需减少撤销明细或撤销金额</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程启动异常，单据id不能为空</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">传入的单据ID为null或0</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程启动异常，单据不存在</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">按ID查询不到撤销单</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程启动异常，撤销明细不存在</td>
            <td style="font-size:13px;">提交/审批完成</td>
            <td style="font-size:13px;">撤销单下无明细数据</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">明细中以下认领明细已被撤销，请剔除后再重新提交撤销：...</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">明细中包含CANCEL_FLAG=Y的认领明细</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>撤销明细中，含有已经报销的认领明细，且撤销后可结算工程服务费小于零，不允许撤销：报销单号-xxx</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>撤销后可结算兑现金额&lt;0，需减少撤销明细或撤销金额</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程启动异常，单据id不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>传入的单据ID为null或0</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程启动异常，单据不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>按ID查询不到撤销单</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程启动异常，撤销明细不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>撤销单下无明细数据</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>明细中以下认领明细已被撤销，请剔除后再重新提交撤销：...</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>明细中包含CANCEL_FLAG=Y的认领明细</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">撤销审批通过后到款单可认领金额未回加</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>selectClaimAmtByCancelId查询结果为空，或EPM_PAYMENT_IMPORT记录不存在<br>
      <strong style="color:#7C3AED;">处理：</strong>`SELECT pa.payment_import_id, pad.claim_amt FROM epm_payment_allot pa JOIN epm_payment_allot_line pal ON pa.payment_allot_id = pal.payment_allot_id JOIN epm_payment_allot_detail pad ON pal.payment_allot_line_id = pad.payment_allot_line_id JOIN epm_pad_cancel ce ON pad.payment_allot_detail_id = ce.payment_allot_detail_id WHERE ce.cancel_id = {cancelId}`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">ERP撤销推送失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>ERP接口不可用或推送数据异常，错误信息记录在SYS_EXCEPTION_MSG表<br>
      <strong style="color:#7C3AED;">处理：</strong>`SELECT * FROM sys_exception_msg WHERE objid = {cancelId} AND objtypename = '到款认领撤销'`
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
| 2026-07-31 | - | - | 初始生成知识库文档 |
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
