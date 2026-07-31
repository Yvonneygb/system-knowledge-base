<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="客户金税发票号码查询" desc="工程管理-对账单业务说明" />

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
用户选择查询条件(发票号码/发票类型/发票日期) → 调用后端查询接口 → 查询FIN_INVOICE表 → 返回金税发票号码信息 → 展示列表
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 服务费报销单 | 数据依赖 | FIN_SVC_EXP_ACC_HEAD关联的发票数据写入FIN_INVOICE表 | 服务费报销单已提交 |
| OCR发票识别 | 数据依赖 | 通过OCR识别的发票信息写入FIN_INVOICE表 | OCR识别已完成 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 本功能为纯只读/即时操作，不向任何下游系统/模块写入数据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：发票金税号码查询 核心逻辑">
<KbQuote>查询客户发票的金税号码信息，用于对账和税务核对</KbQuote>

**具体逻辑**：

- 1、通过FinSvcExpAccHeadController的doGetInvLines方法查询发票行信息
- 2、FIN_INVOICE表存储发票号码(invoiceNo)、发票金额(invoiceAmt)、税率(taxRate)等核心字段
- 3、发票类型(invoiceType)区分专票/普票，1=普票(税率=0)，2=专票(税率≠0)
</KbCard>

<KbCard num="2" title="重点逻辑2：发票税金计算">
<KbQuote>根据发票金额和税率自动计算税金和未含税金额</KbQuote>

**具体逻辑**：

- 1、taxAmount(税金) = invoiceAmt × taxRate / (1 + taxRate)，@Transient不落库
- 2、noTaxAmt(未含税金额) = invoiceAmt - taxAmount，@Transient不落库
- 3、税金和未含税金额为运行时计算字段，不持久化到数据库
</KbCard>

<KbCard num="3" title="重点逻辑3：OCR发票识别关联">
<KbQuote>支持通过OCR识别发票并自动填充发票信息</KbQuote>

**具体逻辑**：

- 1、FinSvcExpAccHeadController提供ocrFinInvoice接口，传入uuid进行OCR识别
- 2、OCR返回JSON数组，解析invoiceNo/taxRate/totalAmount/amount/taxAmount等字段
- 3、OCR识别结果自动构造FinInvoice实体，税率≠0时invoiceType=2(专票)，否则=1(普票)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：hlod低代码查询页面">
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
<td>发票类型</td>
<td>下拉选择框</td>
<td>发票类型筛选</td>
<td>常显</td>
<td>1=普票/2=专票</td>
<td>1,2</td>
<td>FIN_INVOICE.INVOICE_TYPE</td>
</tr>
<tr>
<td>发票号码</td>
<td>文本框</td>
<td>发票号码筛选</td>
<td>常显</td>
<td>支持模糊查询</td>
<td>-</td>
<td>FIN_INVOICE.INVOICE_NO</td>
</tr>
<tr>
<td>发票日期起</td>
<td>日期选择器</td>
<td>发票日期起始</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>FIN_INVOICE.INVOICE_DATE</td>
</tr>
<tr>
<td>发票日期止</td>
<td>日期选择器</td>
<td>发票日期截止</td>
<td>常显</td>
<td>用户选择</td>
<td>-</td>
<td>FIN_INVOICE.INVOICE_DATE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：查询结果列表">
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
<td>发票号码</td>
<td>文本框</td>
<td>金税发票号码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_INVOICE.INVOICE_NO</td>
</tr>
<tr>
<td>发票类型</td>
<td>下拉选择框</td>
<td>发票类型</td>
<td>常显</td>
<td>1=普票/2=专票</td>
<td>1,2</td>
<td>FIN_INVOICE.INVOICE_TYPE</td>
</tr>
<tr>
<td>发票日期</td>
<td>日期选择器</td>
<td>开票日期</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_INVOICE.INVOICE_DATE</td>
</tr>
<tr>
<td>发票金额</td>
<td>数值框</td>
<td>含税金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_INVOICE.INVOICE_AMT</td>
</tr>
<tr>
<td>税率</td>
<td>数值框</td>
<td>发票税率</td>
<td>常显</td>
<td>-</td>
<td>0~1</td>
<td>FIN_INVOICE.TAX_RATE</td>
</tr>
<tr>
<td>税金</td>
<td>数值框</td>
<td>税金</td>
<td>常显</td>
<td>运行时计算=@Transient</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>未含税金额</td>
<td>数值框</td>
<td>不含税金额</td>
<td>常显</td>
<td>运行时计算=@Transient</td>
<td>-</td>
<td>-</td>
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
| 查询 | 查询金税发票号码 | 查询区域 | 查询条件已填写 | 调用后端查询接口 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本菜单为纯查询页面，无状态机流转。

---

</KbCard>
<KbCard num="1" title="表1：FIN_INVOICE（发票表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| FIN_INVOICE_ID | BIGINT | 主键ID | - | 自增主键 |
| INVOICE_TYPE | BIGINT | 发票类型 | 发票类型 | 1=普票(税率=0)/2=专票(税率≠0) |
| INVOICE_NO | VARCHAR | 发票号码 | 发票号码 | 金税系统发票号码 |
| INVOICE_DATE | DATE | 发票时间 | 发票日期 | 开票日期 |
| INVOICE_AMT | DECIMAL | 发票金额 | 发票金额 | 含税金额 |
| ATTACHMENT_UUID | VARCHAR | 发票附件 | - | 附件UUID |
| TAX_RATE | DECIMAL | 发票税率 | 税率 | 税率比例 |
| CREATOR | VARCHAR | 创建人 | - | 系统自动记录 |
| UPDATOR | VARCHAR | 更新人 | - | 系统自动记录 |
| CREATETIME | DATETIME | 创建时间 | - | 系统自动记录 |
| UPDATETIME | DATETIME | 更新时间 | - | 系统自动记录 |

</KbCard>

<KbCard num="2" title="表2：FIN_SVC_EXP_ACC_HEAD（服务费报销头表，关联查询）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| FIN_SVC_EXP_ACC_ID | BIGINT | 主键ID | - | 自增主键 |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 取用户上下文 |
| SVC_EXP_ACC_NO | VARCHAR | 报销单号 | - | 系统生成 |
| ACC_ID | BIGINT | 关联ID | - | 关联服务费账户 |

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
            <td style="color:#DC2626;font-weight:600;">查询结果为空</td>
            <td style="font-size:13px;">查询</td>
            <td style="font-size:13px;">FIN_INVOICE表中无匹配记录</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>查询结果为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>FIN_INVOICE表中无匹配记录</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">发票税金显示为0</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>taxRate为0时invoiceType=1(普票)，税金计算结果为0<br>
      <strong style="color:#7C3AED;">处理：</strong>确认发票类型是否为普票，普票税率为0属于正常情况
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">OCR识别后发票号码为空</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>OCR返回的JSON中invoiceNo字段为空<br>
      <strong style="color:#7C3AED;">处理：</strong>检查OCR识别结果，手动补录发票号码
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
| 2025-10-21 | - | - | 初始创建客户金税发票号码查询功能 |

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
