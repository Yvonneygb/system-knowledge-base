<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-08" title="合同任务完成率明细报表" desc="合同任务完成率三维度汇总、图表可视化报表" />

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
合同任务完成率明细报表 → 查询条件输入 → 查询
                              ↓
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
        合同明细Tab      合同汇总Tab      项目汇总Tab
              ↓               ↓               ↓
     展示合同行级明细    展示合同级汇总    展示项目级汇总
     (含完成率/金额)    (含完成率/金额)    (含完成率/金额)
                              ↓
                        图表展示
                    (按月完成率柱状图+折线图)
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| AE_REPORT报表服务 | 数据依赖 | 通过报表服务查询合同完成率数据 | 查询时 |
| 经销合同(SA_SALE_CONTRACT_HEAD) | 数据依赖 | 合同基本信息(编号/经销商/合同类型等) | 报表数据源 |
| 工程合同(EPM_PROJECT_CONTRACT) | 数据依赖 | 工程合同信息(工程编码/工程名称等) | 报表数据源 |
| 出库单/发货单 | 数据依赖 | 发货完成数量/发货金额 | 完成率计算 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 无下游影响 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：三维度汇总展示 {多维度报表}">
<KbQuote>从不同维度展示合同任务完成率，满足不同管理层级需求</KbQuote>

**具体逻辑**：

- 1、**业务意义**：从不同维度展示合同任务完成率，满足不同管理层级需求
- 2、具体逻辑描述
- 3、第1点：合同明细维度：展示合同行级明细，包含项目编码、合同编码、物料编码、合同数量、发货数量、完成率等
- 4、第2点：合同汇总维度：按合同汇总，展示有效合同数量、发货数量、完成率、发货金额、合同金额、金额完成率
- 5、第3点：项目汇总维度：按项目汇总，展示项目级别的完成率统计
</KbCard>

<KbCard num="2" title="重点逻辑2：图表可视化 {ECharts图表}">
<KbQuote>通过图表直观展示月度完成率趋势</KbQuote>

**具体逻辑**：

- 1、**业务意义**：通过图表直观展示月度完成率趋势
- 2、具体逻辑描述
- 3、第1点：按月度展示完成率柱状图，支持按数量和按金额两种维度
- 4、第2点：柱状图上方显示具体完成率百分比标签
- 5、第3点：叠加折线图展示完成率趋势
</KbCard>

<KbCard num="3" title="重点逻辑3：汇总行计算 {前端计算}">
<KbQuote>在查询结果基础上计算汇总数据</KbQuote>

**具体逻辑**：

- 1、**业务意义**：在查询结果基础上计算汇总数据
- 2、具体逻辑描述
- 3、第1点：有效合同数量=各记录有效合同数量之和
- 4、第2点：发货数量=各记录发货确认数量之和
- 5、第3点：未发货数量=有效合同数量-发货数量
- 6、第4点：数量完成率=发货数量/有效合同数量
- 7、第5点：金额完成率=发货金额/合同金额
- 8、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：查询条件区域">
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
<td>开始年月</td>
<td>月份选择框</td>
<td>查询起始年月</td>
<td>常显</td>
<td>必输</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>结束年月</td>
<td>月份选择框</td>
<td>查询截止年月</td>
<td>常显</td>
<td>必输</td>
<td>大于等于开始年月</td>
<td>-</td>
</tr>
<tr>
<td>合同编码</td>
<td>LOV选择框</td>
<td>按合同编码筛选</td>
<td>常显</td>
<td>可选</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>工程编码</td>
<td>LOV选择框</td>
<td>按工程编码筛选</td>
<td>常显</td>
<td>可选</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>经销商编码</td>
<td>LOV选择框</td>
<td>按经销商编码筛选</td>
<td>常显</td>
<td>可选</td>
<td>-</td>
<td>-</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：合同明细Tab">
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
<td>工程编码</td>
<td>文本框</td>
<td>工程项目编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>PROJECT_CODE</td>
</tr>
<tr>
<td>工程名称</td>
<td>文本框</td>
<td>工程项目名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>PROJECT_NAME</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>合同编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_CODE</td>
</tr>
<tr>
<td>合同名称</td>
<td>文本框</td>
<td>合同名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_NAME</td>
</tr>
<tr>
<td>完成类型</td>
<td>文本框</td>
<td>完成类型</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>COMPLETED_TYPE</td>
</tr>
<tr>
<td>有效标识</td>
<td>文本框</td>
<td>合同有效标识</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>VALID</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CUSTOMER_NAME</td>
</tr>
<tr>
<td>简称</td>
<td>文本框</td>
<td>经销商简称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SHORT_NAME</td>
</tr>
<tr>
<td>币种</td>
<td>文本框</td>
<td>币种</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CURRENCY</td>
</tr>
<tr>
<td>合同类型</td>
<td>文本框</td>
<td>合同类型</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_TYPE</td>
</tr>
<tr>
<td>折扣申请单号</td>
<td>文本框</td>
<td>关联折扣申请单号</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>DISCOUNT_APPLY_CODE</td>
</tr>
<tr>
<td>折扣有效日期</td>
<td>文本框</td>
<td>折扣有效日期</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>DISCOUNT_VALID_DATE</td>
</tr>
<tr>
<td>分组序号</td>
<td>文本框</td>
<td>分组序号(小计行标识)</td>
<td>常显</td>
<td>小计行显示"小计"</td>
<td>-</td>
<td>GRP_SEQ</td>
</tr>
<tr>
<td>物料编码</td>
<td>文本框</td>
<td>物料编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>ITEM_CODE</td>
</tr>
<tr>
<td>物料名称</td>
<td>文本框</td>
<td>物料名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>ITEM_NAME</td>
</tr>
<tr>
<td>规格</td>
<td>文本框</td>
<td>物料规格</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SPEC</td>
</tr>
<tr>
<td>颜色</td>
<td>文本框</td>
<td>物料颜色</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>COLOR</td>
</tr>
<tr>
<td>合同数量</td>
<td>数值输入框</td>
<td>合同任务数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_QTY</td>
</tr>
<tr>
<td>替代数量</td>
<td>数值输入框</td>
<td>已替代数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>REPLACED_QTY</td>
</tr>
<tr>
<td>延期数量</td>
<td>数值输入框</td>
<td>已延期数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>DELAYED_QTY</td>
</tr>
<tr>
<td>有效数量</td>
<td>数值输入框</td>
<td>有效合同数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>VALID_QTY</td>
</tr>
<tr>
<td>出库数量</td>
<td>数值输入框</td>
<td>已出库数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>QTY_BILL</td>
</tr>
<tr>
<td>完成率(数量)</td>
<td>数值输入框</td>
<td>数量完成率</td>
<td>常显</td>
<td>显示为百分比，保留2位小数</td>
<td>0~100%</td>
<td>INV_RATE</td>
</tr>
<tr>
<td>发货金额</td>
<td>数值输入框</td>
<td>已发货金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>DELIVER_AMOUNT</td>
</tr>
<tr>
<td>合同金额</td>
<td>数值输入框</td>
<td>合同金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_AMOUNT</td>
</tr>
<tr>
<td>完成率(金额)</td>
<td>数值输入框</td>
<td>金额完成率</td>
<td>常显</td>
<td>显示为百分比，保留2位小数</td>
<td>0~100%</td>
<td>AMOUNT_PERCENTAGE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：合同汇总Tab">
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
<td>工程编码</td>
<td>文本框</td>
<td>工程项目编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>PROJECT_CODE</td>
</tr>
<tr>
<td>工程名称</td>
<td>文本框</td>
<td>工程项目名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>PROJECT_NAME</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
<td>合同编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_CODE</td>
</tr>
<tr>
<td>合同名称</td>
<td>文本框</td>
<td>合同名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_NAME</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CUSTOMER_NAME</td>
</tr>
<tr>
<td>简称</td>
<td>文本框</td>
<td>经销商简称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SHORT_NAME</td>
</tr>
<tr>
<td>币种</td>
<td>文本框</td>
<td>币种</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CURRENCY</td>
</tr>
<tr>
<td>有效数量</td>
<td>数值输入框</td>
<td>有效合同数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>VALID_QTY</td>
</tr>
<tr>
<td>发货确认数量</td>
<td>数值输入框</td>
<td>发货确认数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONFIRM_OUT_QTY</td>
</tr>
<tr>
<td>完成率(数量)</td>
<td>数值输入框</td>
<td>数量完成率</td>
<td>常显</td>
<td>-</td>
<td>0~100%</td>
<td>INV_RATE</td>
</tr>
<tr>
<td>发货金额</td>
<td>数值输入框</td>
<td>已发货金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>DELIVER_AMOUNT</td>
</tr>
<tr>
<td>合同金额</td>
<td>数值输入框</td>
<td>合同金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_AMOUNT</td>
</tr>
<tr>
<td>完成率(金额)</td>
<td>数值输入框</td>
<td>金额完成率</td>
<td>常显</td>
<td>-</td>
<td>0~100%</td>
<td>AMOUNT_PERCENTAGE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块4：项目汇总Tab">
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
<td>工程编码</td>
<td>文本框</td>
<td>工程项目编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>PROJECT_CODE</td>
</tr>
<tr>
<td>工程名称</td>
<td>文本框</td>
<td>工程项目名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>PROJECT_NAME</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CUSTOMER_NAME</td>
</tr>
<tr>
<td>简称</td>
<td>文本框</td>
<td>经销商简称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>SHORT_NAME</td>
</tr>
<tr>
<td>币种</td>
<td>文本框</td>
<td>币种</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CURRENCY</td>
</tr>
<tr>
<td>有效数量</td>
<td>数值输入框</td>
<td>有效合同数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>VALID_QTY</td>
</tr>
<tr>
<td>发货确认数量</td>
<td>数值输入框</td>
<td>发货确认数量</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONFIRM_OUT_QTY</td>
</tr>
<tr>
<td>完成率(数量)</td>
<td>数值输入框</td>
<td>数量完成率</td>
<td>常显</td>
<td>-</td>
<td>0~100%</td>
<td>INV_RATE</td>
</tr>
<tr>
<td>发货金额</td>
<td>数值输入框</td>
<td>已发货金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>DELIVER_AMOUNT</td>
</tr>
<tr>
<td>合同金额</td>
<td>数值输入框</td>
<td>合同金额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>CONTRACT_AMOUNT</td>
</tr>
<tr>
<td>完成率(金额)</td>
<td>数值输入框</td>
<td>金额完成率</td>
<td>常显</td>
<td>-</td>
<td>0~100%</td>
<td>AMOUNT_PERCENTAGE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 查询 | 执行报表查询 | 查询区域 | 常显 | 调用AE_REPORT接口查询数据 |
| 按合同导出 | 导出合同汇总Excel | 合同汇总Tab | 常显 | 调用exportContractRate接口 |
| 按工程导出 | 导出项目汇总Excel | 项目汇总Tab | 常显 | 调用exportProjectRate接口 |
| 按合同明细导出 | 导出合同明细Excel | 合同明细Tab | 常显 | 调用exportContractInvRate接口 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

无，纯查询报表。

---

</KbCard>
<KbCard num="1" title="表1：SA_SALE_CONTRACT_HEAD（销售合同主表-相关字段）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SA_CONTR_HEAD_ID | NUMBER | 销售合同ID | - | 报表关联主键 |
| SA_CONTR_HEAD_CODE | VARCHAR | 销售合同编号 | 合同编码 | - |
| SALES_CONTRACT_TYPE | NUMBER | 销售合同类型 | 合同类型 | - |
| CUST_CODE | VARCHAR | 经销商编码 | 经销商编码 | - |
| CUST_NAME | VARCHAR | 经销商名称 | 经销商名称 | - |
| SHORT_NAME | VARCHAR | 经销商简称 | 简称 | - |
| CURRENCY | VARCHAR | 币种 | 币种 | - |
| START_DATE | DATE | 合同开始日期 | - | 时间范围筛选 |
| END_DATE | DATE | 合同截止日期 | - | 时间范围筛选 |
| VALID | NUMBER | 生效状态 | 有效标识 | 1未生效/2生效 |

</KbCard>

<KbCard num="2" title="表2：EPM_PROJECT_CONTRACT（工程合同表-相关字段）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_ID | NUMBER | 工程项目ID | - | 报表关联主键 |
| PROJECT_CODE | VARCHAR | 工程编码 | 工程编码 | - |
| PROJECT_NAME | VARCHAR | 工程名称 | 工程名称 | - |

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
            <td style="color:#DC2626;font-weight:600;">无</td>
            <td style="font-size:13px;">-</td>
            <td style="font-size:13px;">纯查询报表，无报错逻辑</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>纯查询报表，无报错逻辑</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">查询无数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>查询条件(年月范围/合同编码/工程编码/经销商编码)过滤后无匹配数据<br>
      <strong style="color:#7C3AED;">处理：</strong>放宽查询条件，检查年月范围是否正确
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">完成率显示为0或异常值</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>有效合同数量为0时完成率无法计算，或发货数据未及时更新<br>
      <strong style="color:#7C3AED;">处理：</strong>确认出库单/发货单是否已审核确认，检查有效合同数量是否正确
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">图表不显示</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>searchYearContractRate接口返回code不为success<br>
      <strong style="color:#7C3AED;">处理：</strong>检查AE_REPORT服务是否正常运行，确认报表接口返回数据格式
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
| 2026-01-15 | - | - | 合同任务完成率明细报表页面开发 |
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
