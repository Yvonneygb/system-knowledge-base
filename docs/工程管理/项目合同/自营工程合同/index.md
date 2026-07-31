<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="自营工程合同" desc="工程管理-项目合同业务说明" />

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
项目报备(已生效) → 新建自营工程合同 → 选择项目/客户/交易公司(autotrophyFlag=999)
  ↓
填写合同基本信息(签约方式=直销) + 签收方式 + 操作模式 + 产品清单 + 付款计划 + 合同条款
  ↓
保存 → 生成合同编码，校验项目/客户/交易公司
  ↓
保存并提交 → 启动审批流程(按区域:东/西/南/北区，SUB_CONTRACT_ZYGCHT_{区域})
  ↓
审批通过 → 合同有效状态=2(已生效) → 可创建折扣单/签收单
审批驳回 → 合同有效状态不变
  ↓
合同失效 → 参见"项目合同失效"菜单
签收 → 参见"工程自营签收"菜单
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程项目报备 | 数据依赖 | 合同关联项目，获取项目信息、客户、地址等 | 项目已报备6且有效 |
| 客户主数据 | 数据依赖 |D | 合同关联客户 | �&户已创建且有效 |
| 交易公司 | 数据依赖 | 合同关联交易公司(自营范围，tradingScope=2) | 交易公司已配置 |
| 编码规则配置 | 配置依赖 | 生成合同编码 | 编码规则已配置且生效 |
| 工作流引擎 | 配置依赖 | 审批流程SUB_CONTRACT_ZYGCHT_{区域} | 流程已部署且可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程折扣政策申请 | 基于合同创建折扣申请 | 合同生效后，可基于合同创建折扣政策申请 |
| 工程自营签收 | 创建自营签收单 | 合同生效后，可创建自营签收单(签收方式决定签收流程) |
| 项目合同失效 | 发起失效申请 | 合同可发起失效申请，失效后合同状态变为3(已失效) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：与经销商工程合同共用后端代码 {共用代码}">
<KbQuote>自营合同和经销商合同共用EPM_PROJECT_CONTRACT表和后端ServiceImpl，通过contractType区分</KbQuote>

**具体逻辑**：

- 1、自营合同contractType=1(直销)，经销商合同contractType=2(经销A
- 2、列表查询固定传参contractType=1，仅展示自营合同
- 3、交易公司LOV传入autotrophyFlag=999和tradingScope=28筛选自营范围交易公司
</KbCard>

<KbCard num="2" title="重点逻辑2：签收方式 {自营特有}">
<KbQuote>自营合同需配置签收方式，决定签收流程和ERP推送行为</KbQuote>

**具体逻辑**：

- 1、签收方式1=签收（仅签收流程），签收方式2=签收+验收（双重流程）
- 2、当signWay=2时，财务签收审核后不推送ERP
</KbCard>

<KbCard num="3" title="重点逻辑3：审批流程按区域区分 {多流程}">
<KbQuote>不同区域的自营工程合同使用不同的审批流程</KbQuote>

**具体逻辑**：

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：自营工程合同列表页">
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
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批流程状态</td>
<td>常显</td>
<td>1.来源：值集HWKF.APPROVE_STATUS</td>
<td>值集&lt;集HWKF.APPROVE_STATUS中的项</td>
<td>EPM_PROJECT_CONTRACT.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>有效状态</td>
<td>下拉选择框(</td>
<td>合同有效状态</td>
<td>常显</td>
<td>1.来源：值集AE.VALID</td>
<td>1未审核/2有效/3失效/7失效申请中</td>
<td>EPM_PROJECT_CONTRACT.VALID</td>
</tr>
<tr>
<td>合同编码</td>
<td>文7文本框</td>
<td>合同唯一编码</td>
<td>常显</td>
<td>1.系统自动生成</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_CODE</td>
</tr>
<tr>
<td>合同名称</td>
<td>文本框</td>
<td>合同名称</td>
<td>常显</td>
<td>1.用户输入</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_NAME</td>
</tr>
<tr>
<td>签订时间</td>
<td>日期选择框</td>
<td>合同签订?订日期</td>
<td>常显</td>
<td>1.用户输入</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.SIGNED_DATE</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框</td>
<td>关联项目编码</td>
<td>常显</td>
<td>1.选择项目LOV带出</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.PROJECT_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>�3客户名称</td>
<td>常显</td>
<td>1.选择项目/客户带出</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CUSTOMER_NAME</td>
</tr>
<tr>
<td>合同总额</td>
<td>数字框</td>
<td>合同金额</td>
<td>常显</td>
<td>1.用户9用户输入</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_AMT</td>
</tr>
<tr>
<td>签收方式</td>
<td>下拉选择框</td>
<td>签收方式</td>
<td>常显</td>
<td>1.来源：值集AE.EPM.SIGN_WAY</td>
<td>1(签收)/2(签收+验收)</td>
<td>EPM_PROJECT_CONTRACT.SIGN_WAY</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：合同详情页-基本信息(自营特有字段)">
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
<td>签收方式</td>
<td>下拉E选择框</td>
<td>签收方式，自营合同必填</td>
<td>常显</td>
<td></td>
<td>1(签收)/2(签收+验收)</td>
<td>EPM_PROJECT_CONTRACT.SIGN_WAY</td>
</tr>
<tr>
<td>操作模式</td>
<td>下拉选择框</td>
<td>操作模式，自营合同必填</td>
<td>常显</td>
<td></td>
<td>值集AE.EPM.CONTRACT_MODE</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_MODE</td>
</tr>
<tr>
<td>甲方名称</td>
<td>文本框</td>
<td>甲方名称</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.PARTY_A_NAME</td>
</tr>
<tr>
<td>甲方地址</td>
<td>文本框</td>
<td>甲方地址</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.PARTY_A_ADDRESS</td>
</tr>
<tr>
<td>甲方法定代表人</td>
<td>文本框</td>
<td>甲方法定代表人</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.PARTD_A_LEGAL_PERSON</td>
</tr>
<tr>
<td>甲方电话</td>
<td>文本框</td>
<td>甲方电话</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.PARTY_A_PHONE</td>
</tr>
<tr>
<td>付款方式</td>
<td>下拉选择框</td>
<td>付款方式</td>
<td>常显</td>
<td></td>
<td>值集AE.EPM.PAYMENT_WAY</td>
<td>EPM_PROJECT_CONTRACT.PAYMENT_WAY</td>
</tr>
<tr>
<td>付款方银行名称</td>
<td>文本框</td>
<td>付款方银行</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.RECEIVING_BANK</td>
</tr>
<tr>
<td>付款方银行账号</td>
<td>文本框</td>
<td>付款方银行账号</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.RECEIVING_ACCOUNT</td>
</tr>
<tr>
<td>质保期</td>
<td>数字框</td>
<td>质保期(年)</td>
<td>常显</td>
<td></td>
<td>非负整数</td>
<td>EPM_PROJECT_CONTRACT.WARRANTY_PERIOD</td>
</tr>
<tr>
<td>质保金比例</td>
<td>数字框</td>
<td>质保金比例</td>
<td>常4显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.RETENTION_MONEY_RATIO</td>
</tr>
<tr>
<td>质保金金额</td>
<td>数字框</td>
<td>质保金金额</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.RETENTION_MONEY</td>
</tr>
<tr>
<td>履约金</td>
<td>数字框</td>
<td>履约保证金金额</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.PERFORMANCE_BOND</td>
</tr>
<tr>
<td>预扣定金单</td>
<td>LOV</td>
<td>预扣定金单号</td>
<td>常显</td>
<td></td>
<td>LOV:AE.WITHHOLDING_DEPOSIT_VIEW</td>
<td>EPM_PROJECT_CONTRACT.WITHHOLDING_DEPOSIT_NO</td>
</tr>
<tr>
<td>收货人</td>
<td>文本框</td>
<td>收9收货人</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.RECEIVING_PARTY</td>
</tr>
<tr>
<td>联系方式</td>
<td>文本框</td>
<td>收货人电话</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.RECEIVING_PARTY_PHONE</td>
</tr>
<tr>
<td>详细地点</td>
<td>文本框</td>
<td>交货地点</td>
<td>常显</td>
<td></td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.DELIVERY_PLACE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：合同详情页-自营特有Tab页">
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
<td></td>
<td>EpmPaymentPlanSetInfo</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td>EpmEontractTermsInfo</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
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
| 新建 | 新建合同 | 列表页 | 常显 | 跳转合同详情页 |
| 失效 |?发起合同失效 | 列表页行操作 | 合同有效状态=2(已生效) | 跳转合同失效页面 |
| 删除 | 删除合同 | 列表页行操作 | 审核状态=NEW | 调用delete-contract删除 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：签收方式必填 —— 自营合同特有校验</KbSubTitle>

- 第1点：signWay字段为必输，前端DataSet设置required=true

<KbTip>前端校验提示</KbTip>

```sql
SELECT SIGN_WAY FROM EPM_PROJECT_CONTRACT WHERE CONTRACT_ID = #{contractId}
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：合同提交校验 —— 与经销商合同共用doContractCheck</KbSubTitle>

- 第1点：调用doContractCheck校验合同数据完整性

<KbTip>阻断性报错</KbTip>

```sql
-
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建 NEW] ──保存并提交──→ [审批中 RUN] ──审批通过──→ [已审批 APPROVED]
                                │
                                ├──审批驳回──→ [已驳回 REJECTED]
                                �%──撤回──→ [已撤回 WITHDRAW]
```

####2状态机列表

| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、保存并提交、编辑、删除 |
| RUN | 审批中 | 等待审批结果 |
| APPROVED | 已审批 | 失效、签收 |
| REJECTED | 已驳回 | 保存、保存并提交0提交、编辑 |
| WITHDRAW | 已撤回 | 保存、保存并提交、编辑 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_PROJECT_CONTRACT（工程项目合同表）- 与经销商合同共用">

> 与经销商工程合同共用同一张表，通过CONTRACT_TYPE=1区分自营合同。完整字段参见"经销商工程合同"文档，此处仅列出D自营特有/差异字段

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| CONTRACT_TYPE | Long | 签约方式 | 签约方式 | 自营合同固定为1(直销) |
| SIGN_WAY | Long | 签收方式 |/签收方式 | 1=签收/2=签收+验收，自营合同必填 |
| CONTRACT_MODE | Long | 操作模式 | 操作模式 | 系统词汇AE.EPM.CONTRACT_MODE，自营合同必填 |
| PARTY_A_NAME | String | 甲方名称 | 甲方名称 | 自营合同必填 |
| PARTY2A_ADDRESS | String | 甲方地址 | 甲方地址 | 自营合同非必填 |
| PARTY_A_LEGAL_PERSON | String | 甲方法定代表人 | 甲方法定代表人 | - |
| PARTY_A_PHONE | String | 甲方电话 | 甲方电话 | - |
| PAYMENT_WAY | String | 付款方式 | 付款方式 | 系统词汇AE.EPM.PAYMENT_WAY，自营合同必填 |
| RECEIVING_BANK | String | 付款方银行 | 付款方银行名称 | 自营合同必填 |
| RECEIVING_ACCOUNT | String | 付款方银行账号 | 付款方银行账号 | 自营合同必填 |
| WARRANTY_PERIOD | Long | 质保期(年) | 质保期 | 自营合同必填 |
| RETENTION_MONEY_RATIO | String | 质保金比例 | 质保金比例 | - |
| RETENTION_MONEY | String | 质保金金额 | 质保金金额 | - |
| PERFORMANCE_BOND | String | 履约保证金金额 | 履约金 | - |
| WITHHOLDING_DEPOSIT_NO | String | 预扣定金单号1号 | 预扣定金单 | LOV选择 |
| RECEIVING_PARTY | String | 收货人 | 收货人 | 自营合同必填 |
| RECEIVING_PARTY_PHONE | String | 联系方式 | 联系方式 | 自营合同必填 |
| DELIVERY_PLACE | String | 交货地点 | 详细地点( | 自营合同必填 |

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
            <td style="color:#DC2626;font-weight:600;">签收方式不能为空</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">自营合同签收方式为必填字段</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">项目数据不存在</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">关联的项目已被删除或无效</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>签收方式不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>自营合同签收方式为必填字段</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>项目数据不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>关联的项目已被删除或无效</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">签收方式=2(签收+验收)时ERP未推送</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>signWay=2时，财务签收审核后不推送ERP，这是设计行为<br>
      <strong style="color:#7C3AED;">处理：</strong>确认签收方式配置是否正确，如需推送ERP则签收方式应设为1
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
| - | - | - | 暂无2026年提交记录 |
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
