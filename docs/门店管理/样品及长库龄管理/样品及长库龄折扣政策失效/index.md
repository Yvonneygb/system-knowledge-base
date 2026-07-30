<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="样品及长库龄折扣政策失效" desc="门店管理-样品及长库龄管理业务说明" />

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
新建折扣政策失效单 → 选择折扣政策(isMakt=2,suitableType=special) → 选择失效政策行(产品明细) → 保存 → 保存并提交 → OA审批 → 审批通过 → 失效政策行+推送CRM
                                                                                                    ↓
                                                                                              审批拒绝/撤回/终止 → 回到可编辑状态
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 样品及长库龄折扣政策申请 | 数据依赖 | 失效单关联的折扣政策必须已存在且审批通过（有效状态） | 选择折扣政策时通过LOV弹窗筛选isMakt=2且suitableType=special的政策 |
| 折扣政策产品明细(EPM_DISCOUNT_POLICY_ITEM) | 数据依赖 | 失效行从折扣政策的产品明细中选择，仅validStat=0(未失效)的行可选 | 新建失效行时弹窗查询，排除已在本失效单中的行 |
| 编码规则(AE.YP_DISCOUNT_POLICY_DISABLED) | 编码依赖 | 新增失效单时自动生成政策失效编号 | 新建保存时调用编码规则引擎 |
| 工作流(DISCOUNT_POLICY_DISABLED) | 流程依赖 | 保存并提交时启动工作流审批 | 审批状态为NEW/REJECTED/WITHDRAW时可提交 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程折扣政策行/头 | 生效状态失效 | 审批通过后，更新折扣政策行的生效状态(validStat=3表示已失效)，若该政策所有行均已失效，则政策头的有效状态也更新为3(已失效) |
| CRM系统 | 失效信息推送 | 审批通过后，非通用折扣政策(suitableType≠normal)需推送CRM，调用CRM接口将政策行标记为失效 |
| OA系统 | 审批数据推送 | 审批通过后，推送OA审批数据，包含政策头信息、产品明细行信息、附件等 |
| 工程折扣政策行 | 失效单关联清除 | 删除失效单时，清除折扣政策行上的discountPolicyDisabledId关联 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：共用后端代码区分样品/家装/工程 核心">
<KbQuote>样品折扣政策失效、家装折扣政策失效、工程折扣政策失效三个菜单共用同一个后端ServiceImpl(EpmDiscountPolicyDisabledServiceImpl)，通过isMakt和suitableType参数区分业务类型</KbQuote>

**具体逻辑**：

- 1、样品及长库龄菜单：isMakt=2, suitableType='special'，前端ListDS和headDS提交时固定传入这两个参数
- 2、家装菜单：isMakt≠2, suitableType='special'，编码规则使用AE.JZ_DISCOUNT_POLICY_DISABLED
- 3、工程菜单：suitableType='normal'，编码规则使用AE.GC_DISCOUNT_POLICY_DISABLED
- 4、样品菜单编码规则使用AE.YP_DISCOUNT_POLICY_DISABLED，在generateCode方法中通过判断isMakt==2确定
- 5、Mapper XML中通过edp.is_makt和edp.suitable_type条件过滤，实现不同菜单只查询对应类型数据
</KbCard>

<KbCard num="2" title="重点逻辑2：保存逻辑 核心">
<KbQuote>保存折扣政策失效单，包含头信息和失效政策行</KbQuote>

**具体逻辑**：

- 1、失效政策行不允许为空，否则抛出异常"失效政策行不允许为空"
- 2、新增时自动生成失效编号，调用编码规则AE.YP_DISCOUNT_POLICY_DISABLED
- 3、新增时插入头记录，然后更新政策行的discountPolicyDisabledId关联到当前失效单
- 4、更新时先更新头记录，再清除旧的行关联(clearDisabledId)，再重新关联新的行(updateDisabledId)
- 5、保存时同步处理附件信息，附件的objId设置为失效单ID
</KbCard>

<KbCard num="3" title="重点逻辑3：删除逻辑 核心">
<KbQuote>仅新建状态的单据允许删除</KbQuote>

**具体逻辑**：

- 1、校验单据是否存在，不存在抛出"未找到该单据"
- 2、校验审批状态必须为NEW(新建)，否则抛出"仅新建状态单据允许删除."
- 3、删除时先清除折扣政策行上的discountPolicyDisabledId关联(clearDisabledId)，再删除头记录
</KbCard>

<KbCard num="4" title="重点逻辑4：审批通过后失效逻辑 核心">
<KbQuote>审批通过后真正执行政策失效，更新政策行和政策头的生效状态</KbQuote>

**具体逻辑**：

- 1、审批拒绝(REJECTED)/驳回(REBUT)/终止(INTERRUPT)时，仅更新审批状态，不执行失效操作
- 2、审批通过时，先更新失效单审批状态为APPROVED
- 3、调用updateVaildByDisabledId更新关联的政策行生效状态为失效(validStat=3)
- 4、检查该政策下所有行，若所有非当前失效单关联的行都已失效(count&lt;=0)，则将政策头的valid字段更新为3(已失效)
- 5、通用折扣政策(suitableType=normal)不需要推送CRM，直接返回
- 6、非通用折扣政策需逐行推送CRM，调用crmSdkService.policyDisabled接口，传入policyItemId(crmLineId)、endFlag=Y、endUser、endTime
- 7、CRM推送失败时抛出异常"政策明细推送crm出错"或"政策明细推送crm出错：{lineId}:{message}"
</KbCard>

<KbCard num="5" title="重点逻辑5：保存并提交工作流 核心">
<KbQuote>保存数据并启动工作流审批流程</KbQuote>

**具体逻辑**：

- 1、先调用saveData保存数据
- 2、构建工作流参数：flowCode(流程编码)、businessKey(失效编号)、businessId(失效ID)
- 3、工作流主题格式："全渠道样品折扣政策失效_{失效编号}_{用户名}_{事业部名称}_{当前时间}"
- 4、调用workFlowStart启动工作流
</KbCard>

<KbCard num="6" title="重点逻辑6：推送OA审批数据 核心">
<KbQuote>将失效单数据推送到OA系统进行审批</KbQuote>

**具体逻辑**：

- 1、从OA单据配置表(OABillRef)查询"折扣政策"对应的OA表单ID
- 2、头部数据包含：头ID、折扣政策单号、申请人、申请时间、政策类型、政策名称、适用客户、适用区域、适用省份、适用客户分类、类型(失效)、有效开始/结束日期、失效原因、附件
- 3、额外携带原折扣政策字段：计合同折扣、计广告费、战略协议、订单类型、业务类型
- 4、明细行数据包含：申请类型、客户等级、城市类型、产品编码/名称/型号、单位、标准单价(含/不含包装)、安装单价、优惠方式、限制产品渠道、封顶量校验、起订量、封顶量、特价、折扣率
- 5、推送后更新callbackSource为WAIT(等待回调)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：列表页">
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
<td>Select(值集HWKF.APPROVE_STATUS)</td>
<td>工作流审批状态</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY_DISABLED表查询</td>
<td>NEW/RUN/APPROVED/REJECTED/WITHDRAW/INTERRUPT</td>
<td>HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>政策失效编号</td>
<td>TextField</td>
<td>系统自动生成的失效单编号</td>
<td>始终显示</td>
<td>编码规则AE.YP_DISCOUNT_POLICY_DISABLED自动生成</td>
<td>-</td>
<td>DISCOUNT_POLICY_DISABLED_CODE</td>
</tr>
<tr>
<td>政策申请编号</td>
<td>TextField</td>
<td>关联的折扣政策单号</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>DISCOUNT_POLICY_CODE</td>
</tr>
<tr>
<td>申请人</td>
<td>TextField</td>
<td>创建人姓名</td>
<td>始终显示</td>
<td>iam_user.real_name，关联created_by</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>申请时间</td>
<td>DatePicker</td>
<td>创建时间</td>
<td>始终显示</td>
<td>系统自动记录</td>
<td>-</td>
<td>CREATION_DATE</td>
</tr>
<tr>
<td>政策类型</td>
<td>Select(值集AE.EPM.POLICY_TYPE)</td>
<td>折扣政策类型</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>1-客户 2-区域 3-客户分类 4-省份</td>
<td>POLICY_TYPE</td>
</tr>
<tr>
<td>政策名称</td>
<td>TextField</td>
<td>折扣政策名称</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>DISCOUNT_POLICY_NAME</td>
</tr>
<tr>
<td>适用客户</td>
<td>TextField</td>
<td>政策适用的客户全称</td>
<td>始终显示</td>
<td>listagg聚合epm_discount_policy_customer</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>适用区域</td>
<td>TextField</td>
<td>政策适用销售区域</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>SALE_AREA_NAME</td>
</tr>
<tr>
<td>适用省份</td>
<td>TextField</td>
<td>政策适用省份</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>PROVINCE_NAME</td>
</tr>
<tr>
<td>适用客户分类</td>
<td>Select(值集AE.EPM.MAKT.BUSINESS_TYPE)</td>
<td>客户分类</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>CUSTOMER_CLASS</td>
</tr>
<tr>
<td>有效开始日期</td>
<td>DatePicker</td>
<td>政策有效开始日期</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>EFFECTIVE_DATE_START</td>
</tr>
<tr>
<td>有效结束日期</td>
<td>DatePicker</td>
<td>政策有效结束日期</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY表关联查询</td>
<td>-</td>
<td>EFFECTIVE_DATE_END</td>
</tr>
<tr>
<td>失效原因</td>
<td>TextField</td>
<td>失效原因说明</td>
<td>始终显示</td>
<td>用户输入</td>
<td>-</td>
<td>NOTE</td>
</tr>
<tr>
<td>最后更新时间</td>
<td>DatePicker</td>
<td>最后更新时间</td>
<td>始终显示</td>
<td>系统自动记录</td>
<td>-</td>
<td>LAST_UPDATE_DATE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：详情页-基本信息">
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
<td>政策失效编号</td>
<td>TextField(disabled)</td>
<td>系统自动生成的失效单编号</td>
<td>始终显示</td>
<td>新增时自动生成，不可编辑</td>
<td>-</td>
<td>DISCOUNT_POLICY_DISABLED_CODE</td>
</tr>
<tr>
<td>申请人</td>
<td>TextField(disabled)</td>
<td>当前登录用户姓名</td>
<td>始终显示</td>
<td>默认值=currentUser.realName</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>申请时间</td>
<td>DatePicker(disabled)</td>
<td>创建时间</td>
<td>始终显示</td>
<td>默认值=当前时间</td>
<td>-</td>
<td>CREATION_DATE</td>
</tr>
<tr>
<td>单据状态</td>
<td>Select(disabled,值集HWKF.APPROVE_STATUS)</td>
<td>审批状态</td>
<td>始终显示</td>
<td>默认值=NEW</td>
<td>NEW/RUN/APPROVED/REJECTED/WITHDRAW/INTERRUPT</td>
<td>HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>政策申请单号</td>
<td>Lov(DISCOUNT_POLICY_DIALOG_V)</td>
<td>选择要失效的折扣政策</td>
<td>始终显示</td>
<td>LOV参数: isMakt=2, suitableType=special；选择后自动带出政策类型、名称、客户、区域等</td>
<td>必填</td>
<td>DISCOUNT_POLICY_CODE</td>
</tr>
<tr>
<td>政策类型</td>
<td>Select(disabled,值集AE.EPM.POLICY_TYPE)</td>
<td>折扣政策类型</td>
<td>始终显示</td>
<td>从选择的折扣政策自动带出</td>
<td>-</td>
<td>POLICY_TYPE</td>
</tr>
<tr>
<td>政策名称</td>
<td>TextField(disabled,colSpan=2)</td>
<td>折扣政策名称</td>
<td>始终显示</td>
<td>从选择的折扣政策自动带出</td>
<td>-</td>
<td>DISCOUNT_POLICY_NAME</td>
</tr>
<tr>
<td>适用客户</td>
<td>TextField(disabled)</td>
<td>政策适用客户</td>
<td>始终显示</td>
<td>从选择的折扣政策自动带出</td>
<td>-</td>
<td>CUSTOM_ALL_NAME</td>
</tr>
<tr>
<td>适用区域</td>
<td>TextField(disabled)</td>
<td>政策适用销售区域</td>
<td>始终显示</td>
<td>从选择的折扣政策自动带出</td>
<td>-</td>
<td>SALE_AREA_NAME</td>
</tr>
<tr>
<td>适用省份</td>
<td>TextField(disabled)</td>
<td>政策适用省份</td>
<td>始终显示</td>
<td>从选择的折扣政策自动带出</td>
<td>-</td>
<td>PROVINCE_NAME</td>
</tr>
<tr>
<td>适用客户分类</td>
<td>Select(disabled,值集AE.APPLICABLE_CUSTOMER_CLASS)</td>
<td>客户分类</td>
<td>始终显示</td>
<td>从选择的折扣政策自动带出</td>
<td>-</td>
<td>CUSTOMER_CLASS</td>
</tr>
<tr>
<td>失效原因</td>
<td>TextArea(colSpan=2)</td>
<td>失效原因说明</td>
<td>始终显示</td>
<td>用户输入</td>
<td>必填</td>
<td>NOTE</td>
</tr>
<tr>
<td>有效开始日期</td>
<td>DatePicker(disabled)</td>
<td>政策有效开始日期</td>
<td>始终显示</td>
<td>从折扣政策带出，有结束日期时必填</td>
<td>-</td>
<td>EFFECTIVE_DATE_START</td>
</tr>
<tr>
<td>有效结束日期</td>
<td>DatePicker(disabled)</td>
<td>政策有效结束日期</td>
<td>始终显示</td>
<td>从折扣政策带出，有开始日期时必填</td>
<td>-</td>
<td>EFFECTIVE_DATE_END</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块3：详情页-产品明细行">
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
<td>申请类型</td>
<td>Select(值集AE.EPM.APPLICATION_TYPE)</td>
<td>产品申请类型</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>1-产品 2-型号 3-全产品</td>
<td>APPLICATION_TYPE</td>
</tr>
<tr>
<td>产品编码</td>
<td>TextField</td>
<td>产品编码</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>-</td>
<td>ITEM_CODE</td>
</tr>
<tr>
<td>产品名称</td>
<td>TextField</td>
<td>产品名称</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>-</td>
<td>ITEM_NAME</td>
</tr>
<tr>
<td>产品型号</td>
<td>TextField</td>
<td>产品型号</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>-</td>
<td>ITEM_MODEL</td>
</tr>
<tr>
<td>单位</td>
<td>TextField</td>
<td>计量单位</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>-</td>
<td>UOM_NAME</td>
</tr>
<tr>
<td>标准单价(元)</td>
<td>NumberField</td>
<td>标准单价含安装</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出，0转为null</td>
<td>-</td>
<td>STAND_PRICE</td>
</tr>
<tr>
<td>优惠方式</td>
<td>Select(值集AE.EPM.PREFERENTIAL_TYPE)</td>
<td>优惠方式</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>1-折扣 2-特价</td>
<td>PREFERENTIAL_TYPE</td>
</tr>
<tr>
<td>封顶数量校验</td>
<td>Boolean(trueValue=2,falseValue=1)</td>
<td>是否启用封顶数量校验</td>
<td>始终显示</td>
<td>从弹窗选择的政策行带出</td>
<td>-</td>
<td>CAPPING</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块4：详情页-阶梯政策(二级明细)">
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
<td>起订量</td>
<td>NumberField</td>
<td>阶梯起订量</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY_ITEM_LINE表查询，0转为null</td>
<td>-</td>
<td>MINIMUM_QTY</td>
</tr>
<tr>
<td>封顶量</td>
<td>NumberField</td>
<td>阶梯封顶量</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY_ITEM_LINE表查询，0转为null</td>
<td>-</td>
<td>CAPPING_QTY</td>
</tr>
<tr>
<td>特价</td>
<td>NumberField</td>
<td>阶梯特价</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY_ITEM_LINE表查询，0转为null</td>
<td>-</td>
<td>SPECIAL_OFFER</td>
</tr>
<tr>
<td>折扣率</td>
<td>NumberField</td>
<td>阶梯折扣率</td>
<td>始终显示</td>
<td>从EPM_DISCOUNT_POLICY_ITEM_LINE表查询，0转为null</td>
<td>-</td>
<td>DISCOUNT_RATE</td>
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
| 新建 | 新建折扣政策失效单 | 列表页Header | 始终显示 | 跳转到详情页新建模式，自动设置isMakt=2, suitableType=special |
| 导出 | 导出折扣政策失效列表 | 列表页Header | 始终显示 | 调用导出接口，固定传isMakt=2 |
| 查看 | 查看失效单详情 | 列表页行操作 | 始终显示 | 跳转详情页查看模式(editFlag=false) |
| 删除 | 删除失效单 | 列表页行操作 | 审核状态=NEW | 调用DELETE接口，清除行关联并删除头记录 |
| 刷新 | 刷新详情页数据 | 详情页Header | 始终显示 | 重新查询头信息和行信息 |
| 编辑 | 进入编辑模式 | 详情页Header | 审批状态非RUN/APPROVED/SUSPEND/RETURN | 设置editFlag=true |
| 取消编辑 | 退出编辑模式 | 详情页Header | 编辑状态下 | 设置editFlag=false |
| 保存 | 保存失效单 | 详情页Header | 编辑状态下 | 调用POST接口保存 |
| 保存并提交 | 保存并提交审批 | 详情页Header | 编辑状态且审批状态为NEW/REJECTED/WITHDRAW/null | 先保存再启动工作流 |
| 新建(行) | 新增失效政策行 | 详情页产品明细Table | 编辑状态下 | 弹出政策行选择弹窗 |
| 删除(行) | 删除失效政策行 | 详情页产品明细Table | 编辑状态下，需选中行 | 从行列表中移除选中行 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
NEW(新建) ──保存并提交──→ RUN(审批中) ──审批通过──→ APPROVED(审批通过)
  ↑                          │
  │                          ├──审批拒绝──→ REJECTED(审批拒绝) ──保存并提交──→ RUN
  │                          ├──驳回──────→ REBUT(驳回)
  │                          ├──撤回──────→ WITHDRAW(已撤回) ──保存并提交──→ RUN
  │                          └──终止──────→ INTERRUPT(终止)
  │
  └──删除──→ (物理删除)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 编辑、保存、保存并提交、删除 |
| RUN | 审批中 | 查看、刷新 |
| APPROVED | 审批通过 | 查看、刷新 |
| REJECTED | 审批拒绝 | 编辑、保存、保存并提交 |
| WITHDRAW | 已撤回 | 编辑、保存、保存并提交 |
| INTERRUPT | 终止 | 查看、刷新 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_DISCOUNT_POLICY_DISABLED（折扣政策失效头表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_DISABLED_ID | Long | 政策失效ID，主键 | - | 自增主键 |
| DISCOUNT_POLICY_DISABLED_CODE | String | 政策失效编码 | 政策失效编号 | 编码规则AE.YP_DISCOUNT_POLICY_DISABLED自动生成 |
| STAT | Long | 单据状态 | - | 默认0 |
| WFID | Long | 流程ID | - | 默认0 |
| WFFLAG | Long | 流程状态 | - | 默认0 |
| CREATOR | String | 创建人(旧字段) | - | 系统自动记录 |
| CREATETIME | Date | 创建时间(旧字段) | - | 系统自动记录 |
| UPDATOR | String | 修改人(旧字段) | - | 系统自动记录 |
| UPDATETIME | Date | 修改时间(旧字段) | - | 系统自动记录 |
| DISCOUNT_POLICY_ID | Long | 关联的折扣政策ID | 政策申请单号(LOV) | 必填，关联EPM_DISCOUNT_POLICY |
| ORGANIZATION_ID | Long | 组织ID | - | 从用户上下文additionInfo.DEPT获取 |
| NOTE | String | 失效原因 | 失效原因 | 必填，用户输入 |
| IS_CAL_AD | Long | 是否计广告费 | - | 默认0 |
| HZ_INSTANCE_ID | Long | 工作流实例ID | - | 启动工作流后回填 |
| HZ_APPROVE_STATUS | String | 审批状态 | 单据状态 | 值集HWKF.APPROVE_STATUS，默认NEW |
| CALLBACK_SOURCE | String | 外部审批回调来源 | - | 推送OA后设为WAIT |
| CREATION_DATE | Date | 创建时间 | 申请时间 | 框架自动记录 |
| CREATED_BY | Long | 创建人ID | - | 框架自动记录 |
| LAST_UPDATED_BY | Long | 最后更新人ID | - | 框架自动记录 |
| LAST_UPDATE_DATE | Date | 最后更新时间 | 最后更新时间 | 框架自动记录 |
| OBJECT_VERSION_NUMBER | Long | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_DISCOUNT_POLICY_ITEM（折扣政策产品明细行表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_ID | Long | 政策产品ID，主键 | - | 自增主键 |
| DISCOUNT_POLICY_ID | Long | 关联的折扣政策ID | - | 必填 |
| SEQ | Long | 序号 | - | 必填 |
| APPLICATION_TYPE | Long | 申请类型 | 申请类型 | 值集AE.EPM.APPLICATION_TYPE: 1-产品 2-型号 3-全产品 |
| ITEM_ID | Long | 产品ID | - | 必填 |
| ITEM_CODE | String | 产品编码 | 产品编码 | - |
| ITEM_NAME | String | 产品名称 | 产品名称 | - |
| ITEM_MODEL | String | 产品型号 | 产品型号 | - |
| UOM_NAME | String | 单位 | 单位 | - |
| STAND_PRICE | BigDecimal | 标准单价(含安装) | 标准单价(元) | - |
| PREFERENTIAL_TYPE | Long | 优惠方式 | 优惠方式 | 值集AE.EPM.PREFERENTIAL_TYPE: 1-折扣 2-特价 |
| CAPPING | Long | 封顶数量校验 | 封顶数量校验 | - |
| INSTALL_UNIT_PRICE | BigDecimal | 安装单价 | 安装单价 | - |
| SUM_INSTALL_UNIT_PRICE | BigDecimal | 安装金额 | - | - |
| STANDARD_PRICE | BigDecimal | 标准单价(不含安装) | 标准单价(不含安装) | - |
| ACCTLEVEL | Long | 客户等级 | - | 值集AE.EPM.CUSTOMER_GRADE |
| CITYTYPE | Long | 城市类型 | - | 值集AE.EPM.CITY_LEVEL |
| RESPRODCHANNEL | Long | 限制产品渠道 | - | - |
| CRM_LINE_ID | String | 外部行ID(CRM) | - | 推送CRM时使用 |
| ITEM_COST | BigDecimal | 物料实际成本单价 | - | - |
| TASKDISCOUNT | BigDecimal | 任务返点折扣率 | 任务返点率 | - |
| TOTAL_CAP_NUMBER | String | 政策封顶总数量行 | 政策封顶总数量行 | - |
| CAL_CONTRACT_DISCOUNT | String | 计合同折扣 | - | Y/N |
| CAL_ADVERTISE_EXPENSES | String | 计广告费 | 计广告费 | Y/N |
| CAL_BILLING_DISCOUNT | String | 计开单折扣 | 计开单折扣 | Y/N |
| DISCOUNT_POLICY_DISABLED_ID | Long | 关联的政策失效ID | - | 失效单关联时更新，删除时清除 |
| VALID_STAT | Long | 生效状态 | 是否已终止 | 0-未失效 3-已失效；审批通过后更新为3 |
| CUSTOM_CAPS_NUMBER | Long | 单个经销商封顶数量 | 单个经销商封顶数量 | - |
| ITEM_MANAGE_TYPE | String | 产品品类 | - | - |
| PROD_DISCOUNT | BigDecimal | 产品最高折扣率 | - | - |
| PROD_DISC_CHANNEL | String | 产品最高折扣率渠道 | - | - |
| REMARK | String | 备注 | - | - |

</KbCard>

<KbCard num="3" title="表3：EPM_DISCOUNT_POLICY_ITEM_LINE（折扣政策阶梯明细行表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_LINE_ID | Long | 二级明细ID，主键 | - | 自增主键 |
| DISCOUNT_POLICY_ITEM_ID | Long | 关联的政策产品ID | - | 必填 |
| DISCOUNT_POLICY_ID | Long | 关联的折扣政策ID | - | 必填 |
| GROUPING | Long | 分组标识 | - | - |
| MINIMUM_QTY | Long | 起订量 | 起订量 | 默认0 |
| CAPPING_QTY | Long | 封顶量 | 封顶量 | 默认0 |
| SPECIAL_OFFER | BigDecimal | 特价 | 特价 | 默认0 |
| DISCOUNT_RATE | BigDecimal | 折扣率 | 折扣率 | 默认0 |
| SPECIAL_DISCOUNT_RATE | BigDecimal | 特价折扣率 | - | 默认0 |
| VALUE_CHAIN | BigDecimal | 价值链 | - | 默认0 |

</KbCard>

<KbCard num="4" title="表4：EPM_DISCOUNT_POLICY（折扣政策头表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ID | Long | 折扣政策ID，主键 | - | 被EPM_DISCOUNT_POLICY_DISABLED关联 |
| DISCOUNT_POLICY_CODE | String | 折扣政策编码 | 政策申请编号 | - |
| DISCOUNT_POLICY_NAME | String | 折扣政策名称 | 政策名称 | - |
| POLICY_TYPE | Long | 政策类型 | 政策类型 | 值集AE.EPM.POLICY_TYPE |
| CUSTOMER_ID | Long | 客户ID | - | - |
| SALE_AREA_NAME | String | 适用区域名称 | 适用区域 | - |
| PROVINCE_NAME | String | 适用省份名称 | 适用省份 | - |
| CUSTOMER_CLASS | Long | 客户分类 | 适用客户分类 | - |
| EFFECTIVE_DATE_START | Date | 有效开始日期 | 有效开始日期 | - |
| EFFECTIVE_DATE_END | Date | 有效结束日期 | 有效结束日期 | - |
| IS_MAKT | Long | 是否营销中台 | - | 样品=2，工程=0 |
| SUITABLE_TYPE | String | 适用类型 | - | normal:通用，special:专项 |
| VALID | Long | 有效状态 | - | 1:未审核 2:有效 3:失效；所有行失效后更新为3 |
| HZ_APPROVE_STATUS | String | 审批状态 | - | - |

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
            <td style="color:#DC2626;font-weight:600;">失效政策行不允许为空</td>
            <td style="font-size:13px;">保存时</td>
            <td style="font-size:13px;">未选择任何失效政策行就点击保存。解决方案：至少选择一行产品明细</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未找到该单据</td>
            <td style="font-size:13px;">删除时</td>
            <td style="font-size:13px;">删除的失效单不存在，可能已被其他用户删除。解决方案：刷新列表确认数据状态</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">仅新建状态单据允许删除.</td>
            <td style="font-size:13px;">删除时</td>
            <td style="font-size:13px;">非新建状态的单据不允许删除。解决方案：仅NEW状态可删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法获上线文信息</td>
            <td style="font-size:13px;">生成编码时</td>
            <td style="font-size:13px;">无法获取当前登录用户上下文信息。解决方案：确认用户已登录且会话有效</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">当前折扣政策不允许失效 请检查</td>
            <td style="font-size:13px;">生成编码时</td>
            <td style="font-size:13px;">关联的折扣政策编码在EPM_DISCOUNT_POLICY表中不存在。解决方案：检查折扣政策是否已被删除或编码是否正确</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策失效id不能为空</td>
            <td style="font-size:13px;">审批完成时</td>
            <td style="font-size:13px;">工作流回调时objId为空。解决方案：检查工作流配置是否正确传递了businessId</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策明细推送crm出错,请稍后再试</td>
            <td style="font-size:13px;">审批通过后</td>
            <td style="font-size:13px;">CRM接口返回null。解决方案：检查CRM服务是否可用，稍后重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策明细推送crm出错：{lineId}:{message}</td>
            <td style="font-size:13px;">审批通过后</td>
            <td style="font-size:13px;">CRM接口返回success=false。解决方案：根据message信息排查CRM端问题</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请先选择折扣政策！</td>
            <td style="font-size:13px;">新建行时</td>
            <td style="font-size:13px;">未选择折扣政策就点击新建行按钮。解决方案：先选择折扣政策</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>失效政策行不允许为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>未选择任何失效政策行就点击保存。解决方案：至少选择一行产品明细</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到该单据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>删除的失效单不存在，可能已被其他用户删除。解决方案：刷新列表确认数据状态</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>仅新建状态单据允许删除.</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>非新建状态的单据不允许删除。解决方案：仅NEW状态可删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法获上线文信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>无法获取当前登录用户上下文信息。解决方案：确认用户已登录且会话有效</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>当前折扣政策不允许失效 请检查</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>关联的折扣政策编码在EPM_DISCOUNT_POLICY表中不存在。解决方案：检查折扣政策是否已被删除或编码是否正确</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策失效id不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>工作流回调时objId为空。解决方案：检查工作流配置是否正确传递了businessId</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策明细推送crm出错,请稍后再试</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>CRM接口返回null。解决方案：检查CRM服务是否可用，稍后重试</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策明细推送crm出错：{lineId}:{message}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>CRM接口返回success=false。解决方案：根据message信息排查CRM端问题</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请先选择折扣政策！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>未选择折扣政策就点击新建行按钮。解决方案：先选择折扣政策</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
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
| 2026-07-28 | - | - | 初始梳理：样品及长库龄折扣政策失效业务逻辑知识库 |
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
