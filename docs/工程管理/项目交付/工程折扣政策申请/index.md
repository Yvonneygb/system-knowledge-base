<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="工程折扣政策申请" desc="工程管理-项目交付业务说明" />

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
[内部用户] --> 新建工程折扣政策申请 --> 选择政策类型(客户/区域/客户分类/省份)
  --> 填写政策名称、订单类型、币种等基础信息 --> 选择适用对象(根据政策类型联动)
  --> 填写有效期(开始/结束日期) --> 添加产品明细行(选择申请类型:产品/型号)
  --> 选择优惠方式(折扣/特价) --> 配置阶梯明细(起订量/封顶量/折扣率或特价)
  --> 保存(预校验:必填项+产品行非空+申请类型互斥+优惠方式+有效期不重叠)
  --> 保存并提交(先保存再提交校验+工作流提交)
  --> 工作流审批 --> [审批通过]更新产品扩展资料+校验CRM折扣率 --> 有效状态=有效
```
</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 产品主数据 | 数据依赖 | 提供产品编码、型号、标准单价、安装单价、成本单价、生命状态、新品标识等信息 | 添加产品明细行时必选 |
| 客户主数据 | 数据依赖 | 提供客户编码、客户简称等信息 | 政策类型=客户时必选适用客户 |
| 区域管理 | 数据依赖 | 提供销售区域信息 | 政策类型=区域时必选适用区域 |
| 省份管理 | 数据依赖 | 提供省份信息 | 政策类型=省份时必选适用省份 |
| 客户分类 | 数据依赖 | 提供客户分类信息 | 政策类型=客户分类时必选 |
| 事业部管理 | 数据依赖 | 提供事业部出厂折扣率，用于特价反算折扣率 | 保存时自动获取 |
| 编码规则服务 | 配置依赖 | 生成政策申请编号(discountPolicyCode) | 新建保存时自动生成 |
| 工作流服务 | 服务依赖 | 驱动审批流程(HWKF流程引擎) | 保存并提交时调用 |
| CRM服务 | 服务依赖 | 产品查询、零售折扣底限获取、折扣率校验 | 流程提交时校验CRM折扣率 |
| EBS服务 | 服务依赖 | 产品实时价格获取、产品扩展资料(月平均动销、库存消化周期等)、成本单价 | 流程提交时更新产品扩展资料 |
| OA服务 | 服务依赖 | 审批推送 | 提交审批时调用 |

</KbCard>

<KbCard num="3" title="下游影响">
- 影响1：要货订单价格计算
  - 工程要货订单选择折扣政策时，依据折扣政策的产品明细和阶梯折扣率/特价计算折后单价
- 影响2：产品扩展资料更新
  - 流程提交时从EBS接口获取并更新产品的月平均动销数量、库存消化周期、库存数量、生命状态、新品标识等
- 影响3：CRM折扣率校验
  - 非样品/长库龄业务类型时，流程提交校验CRM折扣率(如果启用折扣管控且客户需校验)
- 影响4：经销商可使用政策
  - 政策审批通过后，经销商在要货订单中可选择该折扣政策
---
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：政策类型与适用对象联动 类型联动">
<KbQuote>折扣政策支持四种适用对象类型(客户/区域/客户分类/省份)，不同类型下适用对象字段不同，且存在条件必填逻辑</KbQuote>

**具体逻辑**：

- 1、政策类型=客户(1)时，适用客户字段必填，适用区域/省份/客户分类字段隐藏
- 2、政策类型=区域(2)时，适用区域字段必填(LOV选择)，适用客户/省份/客户分类字段隐藏
- 3、政策类型=客户分类(3)时，适用客户分类字段必填，适用客户/区域/省份字段隐藏
- 4、政策类型=省份(4)时，适用省份字段必填(LOV选择)，适用客户/区域/客户分类字段隐藏
- 5、切换政策类型时，清空所有适用对象字段
</KbCard>

<KbCard num="2" title="重点逻辑2：申请类型与优惠方式组合控制 申请组合">
<KbQuote>产品明细行的申请类型(产品/型号/全产品)和优惠方式(折扣/特价)组合决定了阶梯明细的配置方式</KbQuote>

**具体逻辑**：

- 1、工程折扣政策下申请类型不能选择"全产品"(3)，仅可选"产品"(1)或"型号"(2)
- 2、同一折扣政策中，申请类型不能同时存在"全产品"与"产品/型号"，即产品行之间申请类型互斥
- 3、优惠方式=折扣(1)时，阶梯明细需填写折扣率；优惠方式=特价(2)时，阶梯明细需填写特价
- 4、优惠方式=折扣且为通用政策时，折扣率默认值由系统计算
- 5、申请类型=产品(1)时，产品编码LOV必填(多选)；申请类型=型号(2)时，产品型号LOV必填(多选)
</KbCard>

<KbCard num="3" title="重点逻辑3：保存时折后单价与价值链计算 价格计算">
<KbQuote>保存折扣政策时，后端根据优惠方式自动计算折后单价、折扣率、价值链等核心价格指标</KbQuote>

**具体逻辑**：

- 1、优惠方式=折扣时，折后单价=标准单价(不含安装)×折扣率
- 2、优惠方式=特价时，折后单价=特价；同时反算折扣率=特价/(标准单价不含安装×出厂折扣率)
- 3、价值链=(折后单价-成本单价)/折后单价，衡量产品利润空间
- 4、比较坎级折扣率与生命状态告警水位，生成警戒线提醒
- 5、生成政策分析说明：按生命状态汇总产品数量和平均折扣率
- 6、计算整单价值链=(折后总价-成本总价)/折后总价
</KbCard>

<KbCard num="4" title="重点逻辑4：阶梯区间冲突校验 阶梯校验">
<KbQuote>同一产品明细行下的多个阶梯政策区间不能重叠，确保折扣阶梯无歧义</KbQuote>

**具体逻辑**：

- 1、起订量必须为正整数(最小1)
- 2、封顶量必须为正整数(最小1)
- 3、起订量必须小于封顶量
- 4、不同阶梯政策的区间不能重叠，判断4种重叠情况：(新起≤旧起且新封≥旧起)、(新起≤旧封且新封≥旧封)、(新起≥旧起且新封≤旧封)、(新起≤旧起且新封≥旧封)
</KbCard>

<KbCard num="5" title="重点逻辑5：封顶数量校验 封顶校验">
<KbQuote>提交时校验封顶数量逻辑一致性，确保单个经销商封顶数量和政策行总数量合理</KbQuote>

**具体逻辑**：

- 1、单个经销商存在封顶(capping=2)时，max(坎级封顶量)≤单个经销商封顶数量≤政策行总数量
- 2、单个经销商不存在封顶(capping=1)时，max(坎级封顶量)≤政策行总数量
- 3、单个经销商封顶数量(customerCapsNumber)在capping=2时必填，且不能超过totalCapNumber
</KbCard>

<KbCard num="6" title="重点逻辑6：通用政策有效期不重叠 有效期校验">
<KbQuote>通用政策(suitableType=normal)的有效区间不能与已有通用政策重叠，避免同一产品在同一时间段存在多个通用折扣政策</KbQuote>

**具体逻辑**：

- 1、保存时校验当前政策的有效开始日期和有效结束日期
- 2、查询数据库中已存在的通用政策(suitableType=normal)的有效期区间
- 3、判断是否存在重叠(当前开始≤已有结束 且 当前结束≥已有开始)
- 4、重叠时阻断保存并提示冲突的政策信息
</KbCard>

<KbCard num="7" title="重点逻辑7：流程提交时产品一口价校验 一口价校验">
<KbQuote>产品定位为一口价时，折扣率必须等于1(即不打折)，确保一口价产品价格一致性</KbQuote>

**具体逻辑**：

- 1、流程提交时更新产品扩展资料(从EBS接口获取月平均动销数量、库存消化周期、库存数量、生命状态、新品标识等)
- 2、遍历产品明细行，若产品定位为一口价且折扣率不等于1，阻断提交
- 3、业务类型=3或16时，额外更新产品定位和管理分类
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
<td>政策申请编号</td>
<td>文本框</td>
<td>系统生成的政策编号</td>
<td>常显(查询栏+列表)</td>
<td>-</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.DISCOUNT_POLICY_CODE</td>
</tr>
<tr>
<td>政策名称</td>
<td>文本框</td>
<td>折扣政策名称</td>
<td>常显(查询栏+列表)</td>
<td>-</td>
<td>最大30字符</td>
<td>EPM_DISCOUNT_POLICY.DISCOUNT_POLICY_NAME</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉框</td>
<td>审批流程状态</td>
<td>常显(查询栏+列表)</td>
<td>值集HWKF.APPROVE_STATUS</td>
<td>HWKF.APPROVE_STATUS值集；排查SQL：`SELECT * FROM HPFM_VALUE_SET_VL WHERE VALUE_SET_CODE = 'HWKF.APPROVE_STATUS'`</td>
<td>EPM_DISCOUNT_POLICY.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>申请人</td>
<td>文本框</td>
<td>创建人姓名</td>
<td>常显(查询栏+列表)</td>
<td>-</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.CREATED_BY_NAME</td>
</tr>
<tr>
<td>申请时间</td>
<td>日期框</td>
<td>创建时间</td>
<td>常显(查询栏+列表)</td>
<td>-</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.CREATION_DATE</td>
</tr>
<tr>
<td>政策类型</td>
<td>下拉框</td>
<td>适用对象类型</td>
<td>常显(查询栏+列表)</td>
<td>值集AE.EPM.POLICY_TYPE</td>
<td>AE.EPM.POLICY_TYPE值集：1-客户、2-区域、3-客户分类、4-省份</td>
<td>EPM_DISCOUNT_POLICY.POLICY_TYPE</td>
</tr>
<tr>
<td>订单类型</td>
<td>下拉框</td>
<td>订单类型</td>
<td>常显(查询栏+列表)</td>
<td>值集AE.EPM.ORDER_CHOOSE</td>
<td>AE.EPM.ORDER_CHOOSE值集</td>
<td>EPM_DISCOUNT_POLICY.BILL_TYPE</td>
</tr>
<tr>
<td>销售渠道</td>
<td>下拉框</td>
<td>销售渠道</td>
<td>常显(列表)</td>
<td>值集AE.MKT.SALES_CHANNEL</td>
<td>AE.MKT.SALES_CHANNEL值集</td>
<td>EPM_DISCOUNT_POLICY.CHANNEL</td>
</tr>
<tr>
<td>业务类型</td>
<td>下拉框</td>
<td>业务类型</td>
<td>常显(列表)</td>
<td>值集AE.EPM.ENGINEER.BUSINESS_TYPE</td>
<td>AE.EPM.ENGINEER.BUSINESS_TYPE值集</td>
<td>EPM_DISCOUNT_POLICY.BUSINESS_TYPE</td>
</tr>
<tr>
<td>有效状态</td>
<td>下拉框</td>
<td>有效状态</td>
<td>常显(查询栏+列表)</td>
<td>值集AE.VALID</td>
<td>AE.VALID值集：1-未审核、2-有效、3-失效</td>
<td>EPM_DISCOUNT_POLICY.VALID</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：详情页-基础信息">
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
<td>政策申请编号</td>
<td>文本框</td>
<td>系统生成的政策编号</td>
<td>常显</td>
<td>新建时自动生成，不可编辑</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.DISCOUNT_POLICY_CODE</td>
</tr>
<tr>
<td>申请人</td>
<td>文本框</td>
<td>当前登录用户姓名</td>
<td>常显</td>
<td>默认值=当前登录用户realName，不可编辑</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.CREATED_BY_NAME</td>
</tr>
<tr>
<td>申请时间</td>
<td>日期框</td>
<td>当前日期</td>
<td>常显</td>
<td>默认值=当前日期，不可编辑</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.CREATION_DATE</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉框</td>
<td>审批流程状态</td>
<td>常显</td>
<td>值集HWKF.APPROVE_STATUS，不可编辑</td>
<td>HWKF.APPROVE_STATUS值集</td>
<td>EPM_DISCOUNT_POLICY.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>政策类型</td>
<td>下拉框</td>
<td>适用对象类型</td>
<td>常显</td>
<td>值集AE.EPM.POLICY_TYPE，必填；变更时清空所有适用对象字段</td>
<td>AE.EPM.POLICY_TYPE值集：1-客户、2-区域、3-客户分类、4-省份</td>
<td>EPM_DISCOUNT_POLICY.POLICY_TYPE</td>
</tr>
<tr>
<td>政策名称</td>
<td>文本框</td>
<td>折扣政策名称</td>
<td>常显</td>
<td>必填，最大30字符</td>
<td>最大30字符</td>
<td>EPM_DISCOUNT_POLICY.DISCOUNT_POLICY_NAME</td>
</tr>
<tr>
<td>订单类型</td>
<td>下拉框</td>
<td>订单类型</td>
<td>常显</td>
<td>值集AE.EPM.ORDER_CHOOSE；事业部111时用AE.EPM.ORDER_CHOOSE_OVERSEAS；必填</td>
<td>AE.EPM.ORDER_CHOOSE/AE.EPM.ORDER_CHOOSE_OVERSEAS值集</td>
<td>EPM_DISCOUNT_POLICY.BILL_TYPE</td>
</tr>
<tr>
<td>销售渠道</td>
<td>下拉框</td>
<td>销售渠道</td>
<td>常显</td>
<td>值集AE.MKT.SALES_CHANNEL，默认4，禁用</td>
<td>AE.MKT.SALES_CHANNEL值集</td>
<td>EPM_DISCOUNT_POLICY.CHANNEL</td>
</tr>
<tr>
<td>业务类型</td>
<td>下拉框</td>
<td>业务类型</td>
<td>常显</td>
<td>值集AE.EPM.ENGINEER.BUSINESS_TYPE，默认1(工程)，禁用</td>
<td>AE.EPM.ENGINEER.BUSINESS_TYPE值集</td>
<td>EPM_DISCOUNT_POLICY.BUSINESS_TYPE</td>
</tr>
<tr>
<td>适用客户</td>
<td>文本框</td>
<td>适用客户编码</td>
<td>政策类型=客户(1)时显示</td>
<td>政策类型=客户时必填</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.CUSTOMER_STR</td>
</tr>
<tr>
<td>适用区域</td>
<td>LOV</td>
<td>适用销售区域</td>
<td>政策类型=区域(2)时显示</td>
<td>LOV:AE.SALE_SALEAREAS；政策类型=区域时必填</td>
<td>AE.SALE_SALEAREAS LOV；排查SQL：`SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'AE.SALE_SALEAREAS'`</td>
<td>EPM_DISCOUNT_POLICY.SALE_AREA_OBJ</td>
</tr>
<tr>
<td>适用省份</td>
<td>LOV</td>
<td>适用省份</td>
<td>政策类型=省份(4)时显示</td>
<td>LOV:AE.APPLY_SCPAREA；政策类型=省份时必填</td>
<td>AE.APPLY_SCPAREA LOV；排查SQL：`SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'AE.APPLY_SCPAREA'`</td>
<td>EPM_DISCOUNT_POLICY.PROVINCE_OBJ</td>
</tr>
<tr>
<td>适用客户分类</td>
<td>下拉框</td>
<td>适用客户分类</td>
<td>政策类型=客户分类(3)时显示</td>
<td>值集AE.APPLICABLE_CUSTOMER_CLASS；政策类型=客户分类时必填</td>
<td>AE.APPLICABLE_CUSTOMER_CLASS值集</td>
<td>EPM_DISCOUNT_POLICY.CUSTOMER_CLASS</td>
</tr>
<tr>
<td>有效开始日期</td>
<td>日期框</td>
<td>政策有效开始日期</td>
<td>常显</td>
<td>必填；最小为当天</td>
<td>当天起</td>
<td>EPM_DISCOUNT_POLICY.EFFECTIVE_DATE_START</td>
</tr>
<tr>
<td>有效结束日期</td>
<td>日期框</td>
<td>政策有效结束日期</td>
<td>常显</td>
<td>必填；最小为有效开始日期+1天</td>
<td>有效开始日期+1天起</td>
<td>EPM_DISCOUNT_POLICY.EFFECTIVE_DATE_END</td>
</tr>
<tr>
<td>政策描述</td>
<td>文本框</td>
<td>政策描述信息</td>
<td>常显</td>
<td>必填</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.NOTE</td>
</tr>
<tr>
<td>计广告费</td>
<td>开关</td>
<td>是否计算广告费</td>
<td>常显</td>
<td>默认1(否)；trueValue=2, falseValue=1</td>
<td>1-否，2-是</td>
<td>EPM_DISCOUNT_POLICY.IS_CAL_AD</td>
</tr>
<tr>
<td>币种</td>
<td>LOV</td>
<td>币种</td>
<td>常显</td>
<td>LOV:HPFM.CURRENCY，必填</td>
<td>HPFM.CURRENCY LOV；排查SQL：`SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'HPFM.CURRENCY'`</td>
<td>EPM_DISCOUNT_POLICY.CURRENCY_OBJ</td>
</tr>
<tr>
<td>批次开始日期</td>
<td>日期框</td>
<td>批次开始日期</td>
<td>常显</td>
<td>最大=batchEndDate</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.BATCH_START_DATE</td>
</tr>
<tr>
<td>批次结束日期</td>
<td>日期框</td>
<td>批次结束日期</td>
<td>常显</td>
<td>最小=batchStartDate</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.BATCH_END_DATE</td>
</tr>
<tr>
<td>品类</td>
<td>文本框</td>
<td>品类</td>
<td>常显</td>
<td>禁用</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.PROD_ATTRIBUTION_CHANNEL</td>
</tr>
<tr>
<td>政策分析说明</td>
<td>文本框</td>
<td>按生命状态汇总的数量和平均折扣</td>
<td>常显</td>
<td>保存时后端自动生成，禁用</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.POLICY_ANALYSIS_DESCRIPTION</td>
</tr>
<tr>
<td>适用事业部Id</td>
<td>隐藏</td>
<td>当前用户事业部ID</td>
<td>常显</td>
<td>默认值=当前用户DEPT</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.DIVISION_ID</td>
</tr>
<tr>
<td>适用事业部</td>
<td>文本框</td>
<td>当前用户事业部名称</td>
<td>常显</td>
<td>默认值=当前用户deptName，禁用</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY.DIVISION_NAME</td>
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
<td>下拉框</td>
<td>产品申请类型</td>
<td>常显</td>
<td>值集AE.EPM.APPLICATION_TYPE，必填；工程折扣不能选全产品(3)</td>
<td>AE.EPM.APPLICATION_TYPE值集：1-产品、2-型号(工程不可选3-全产品)</td>
<td>EPM_DISCOUNT_POLICY_ITEM.APPLICATION_TYPE</td>
</tr>
<tr>
<td>优惠方式</td>
<td>下拉框</td>
<td>优惠方式</td>
<td>常显</td>
<td>值集AE.EPM.PREFERENTIAL_TYPE，必填</td>
<td>AE.EPM.PREFERENTIAL_TYPE值集：1-折扣、2-特价</td>
<td>EPM_DISCOUNT_POLICY_ITEM.PREFERENTIAL_TYPE</td>
</tr>
<tr>
<td>新品</td>
<td>文本框</td>
<td>是否新品</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.NEW_PROD_FLAG</td>
</tr>
<tr>
<td>产品定位</td>
<td>文本框</td>
<td>产品定位</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.PROD_POSITIONING</td>
</tr>
<tr>
<td>零售折扣底限</td>
<td>文本框</td>
<td>零售折扣底限</td>
<td>常显</td>
<td>由CRM接口获取</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.PROD_DISCOUNT</td>
</tr>
<tr>
<td>底限渠道</td>
<td>文本框</td>
<td>底限渠道</td>
<td>常显</td>
<td>由CRM接口获取</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.PROD_DISC_CHANNEL</td>
</tr>
<tr>
<td>产品编码</td>
<td>LOV(多选)</td>
<td>选择产品编码</td>
<td>申请类型=产品(1)时</td>
<td>LOV:AE.GET_CRM_ITEM，申请类型=产品时必填；传参channel、currency、divisionId、customerId、customerCode、flag=2、isMakt=0、suitableType='normal'、inAccount=2、prodChooseControlFlag=2、type=1、isHome=1</td>
<td>AE.GET_CRM_ITEM LOV</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_CODE_OBJ</td>
</tr>
<tr>
<td>产品型号</td>
<td>LOV(多选)</td>
<td>选择产品型号</td>
<td>申请类型=型号(2)时</td>
<td>LOV:AE.GET_MODEL，申请类型=型号时必填</td>
<td>AE.GET_MODEL LOV</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_MODEL_OBJ</td>
</tr>
<tr>
<td>生命周期</td>
<td>文本框</td>
<td>产品生命状态</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.SM_STATE</td>
</tr>
<tr>
<td>库龄区间</td>
<td>文本框</td>
<td>库龄区间</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.STOCK_AGE_NUM_STR</td>
</tr>
<tr>
<td>月平均动销数量</td>
<td>文本框</td>
<td>月平均动销数量</td>
<td>申请类型=产品(1)时</td>
<td>由EBS接口获取</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.AVG_MONTH_DYNAMIC_SALE_NUM</td>
</tr>
<tr>
<td>库存消化周期</td>
<td>文本框</td>
<td>库存消化周期</td>
<td>申请类型=产品(1)时</td>
<td>由EBS接口获取</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.INVENTORY_DIGESTION_MONTHS</td>
</tr>
<tr>
<td>计广告费</td>
<td>开关</td>
<td>是否计算广告费</td>
<td>常显</td>
<td>默认1(否)；trueValue=2, falseValue=1</td>
<td>1-否，2-是</td>
<td>EPM_DISCOUNT_POLICY_ITEM.CAL_ADVERTISE_EXPENSES</td>
</tr>
<tr>
<td>计开单折扣</td>
<td>开关</td>
<td>是否计算开单折扣</td>
<td>常显</td>
<td>默认1(否)；trueValue=2, falseValue=1</td>
<td>1-否，2-是</td>
<td>EPM_DISCOUNT_POLICY_ITEM.CAL_BILLING_DISCOUNT</td>
</tr>
<tr>
<td>单位</td>
<td>文本框</td>
<td>计量单位</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.UOM_NAME</td>
</tr>
<tr>
<td>标准单价(含安装)</td>
<td>数字框</td>
<td>含安装的标准单价</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.STAND_PRICE</td>
</tr>
<tr>
<td>标准单价(不含安装)</td>
<td>数字框</td>
<td>不含安装的标准单价</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.STANDARD_PRICE</td>
</tr>
<tr>
<td>安装单价</td>
<td>数字框</td>
<td>安装单价</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.INSTALL_UNIT_PRICE</td>
</tr>
<tr>
<td>成本</td>
<td>数字框</td>
<td>成本单价</td>
<td>常显</td>
<td>由EBS接口获取</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_COST</td>
</tr>
<tr>
<td>任务返点率</td>
<td>文本框</td>
<td>任务返点率</td>
<td>常显</td>
<td>由产品信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.TASKDISCOUNT</td>
</tr>
<tr>
<td>政策封顶总数量行</td>
<td>数字框</td>
<td>政策行封顶总数量</td>
<td>常显</td>
<td>最小1，整数</td>
<td>正整数</td>
<td>EPM_DISCOUNT_POLICY_ITEM.TOTAL_CAP_NUMBER</td>
</tr>
<tr>
<td>单个经销商封顶数量校验</td>
<td>开关</td>
<td>是否启用单个经销商封顶</td>
<td>常显</td>
<td>默认1(否)；trueValue=2, falseValue=1</td>
<td>1-否，2-是</td>
<td>EPM_DISCOUNT_POLICY_ITEM.CAPPING</td>
</tr>
<tr>
<td>单个经销商封顶数量</td>
<td>数字框</td>
<td>单个经销商封顶数量</td>
<td>capping=2时</td>
<td>capping=2时必填，且≤totalCapNumber</td>
<td>正整数，≤totalCapNumber</td>
<td>EPM_DISCOUNT_POLICY_ITEM.CUSTOMER_CAPS_NUMBER</td>
</tr>
<tr>
<td>是否已终止</td>
<td>隐藏</td>
<td>产品行是否已终止</td>
<td>常显</td>
<td>默认0</td>
<td>0-未终止</td>
<td>EPM_DISCOUNT_POLICY_ITEM.VALID_STAT</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块4：详情页-阶梯明细">
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
<td>数字框</td>
<td>阶梯起订量</td>
<td>常显</td>
<td>必填；最小1，整数，需小于封顶量</td>
<td>正整数</td>
<td>EPM_DISCOUNT_POLICY_ITEM_LINE.MINIMUM_QTY</td>
</tr>
<tr>
<td>封顶量</td>
<td>数字框</td>
<td>阶梯封顶量</td>
<td>常显</td>
<td>必填；最小1，整数，需大于起订量</td>
<td>正整数</td>
<td>EPM_DISCOUNT_POLICY_ITEM_LINE.CAPPING_QTY</td>
</tr>
<tr>
<td>特价</td>
<td>数字框</td>
<td>特价金额</td>
<td>优惠方式=特价(2)时</td>
<td>优惠方式=特价时必填；精度3位，最小0.001</td>
<td>最小0.001，精度3位</td>
<td>EPM_DISCOUNT_POLICY_ITEM_LINE.SPECIAL_OFFER</td>
</tr>
<tr>
<td>折扣率</td>
<td>数字框</td>
<td>折扣率</td>
<td>优惠方式=折扣(1)时</td>
<td>优惠方式=折扣时必填；精度3位</td>
<td>精度3位</td>
<td>EPM_DISCOUNT_POLICY_ITEM_LINE.DISCOUNT_RATE</td>
</tr>
<tr>
<td>价值链</td>
<td>数字框</td>
<td>价值链</td>
<td>常显</td>
<td>保存时后端自动计算=(折后单价-成本单价)/折后单价</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM_LINE.VALUE_CHAIN</td>
</tr>
<tr>
<td>警戒线提醒</td>
<td>文本框</td>
<td>警戒线提醒信息</td>
<td>常显</td>
<td>保存时后端自动生成(比较坎级折扣率与生命状态告警水位)</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM_LINE.WARNNING_LINE_MSG</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块5：详情页-客户明细">
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
<td>客户编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>政策类型=客户(1)时</td>
<td>由适用客户字段带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_CUSTOMER.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户简称</td>
<td>文本框</td>
<td>经销商简称</td>
<td>政策类型=客户(1)时</td>
<td>由客户信息带入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_CUSTOMER.SHORT_NAME</td>
</tr>
<tr>
<td>特价</td>
<td>文本框</td>
<td>客户特价</td>
<td>政策类型=客户(1)时</td>
<td>-</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_CUSTOMER.SPECIAL_OFFER</td>
</tr>
<tr>
<td>是否主要</td>
<td>开关</td>
<td>是否为主要客户</td>
<td>政策类型=客户(1)时</td>
<td>trueValue=2, falseValue=1</td>
<td>1-否，2-是</td>
<td>EPM_DISCOUNT_POLICY_CUSTOMER.IS_IMPORTANCE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：产品编码选择LOV <KbBadge type="purple">多选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| channel | 销售渠道 | 当前销售渠道 | 4 |
| currency | 币种 | 当前币种 | CNY |
| divisionId | 事业部ID | 当前事业部ID | 100001 |
| customerId | 客户ID | 当前客户ID | 200001 |
| customerCode | 客户编码 | 当前客户编码 | C001 |
| flag | 查询标识 | 2表示折扣政策场景 | 2 |
| isMakt | 是否样品 | 0表示工程 | 0 |
| suitableType | 适用类型 | normal表示通用 | normal |
| inAccount | 入账标识 | 2 | 2 |
| prodChooseControlFlag | 产品选择控制标识 | 2 | 2 |
| type | 类型 | 1 | 1 |
| isHome | 是否家装 | 1表示工程 | 1 |

**数据范围**

```sql
SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'AE.GET_CRM_ITEM'`；过滤条件：CHANNEL=? AND CURRENCY=? AND DIVISION_ID=? AND IS_MAKT=0 AND SUITABLE_TYPE='normal'
```

<KbSubTitle>弹窗2：产品型号选择LOV <KbBadge type="purple">多选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| channel | 销售渠道 | 当前销售渠道 | 4 |
| currency | 币种 | 当前币种 | CNY |
| divisionId | 事业部ID | 当前事业部ID | 100001 |

**数据范围**

```sql
SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'AE.GET_MODEL'
```

<KbSubTitle>弹窗3：适用区域选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|

**数据范围**

```sql
SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'AE.SALE_SALEAREAS'
```

<KbSubTitle>弹窗4：适用省份选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|

**数据范围**

```sql
SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'AE.APPLY_SCPAREA'
```

<KbSubTitle>弹窗5：币种选择LOV <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|

**数据范围**

```sql
SELECT * FROM HPFM_LOV_SQL_VL WHERE LOV_CODE = 'HPFM.CURRENCY'
```

</KbCard>
<KbCard title="导入">
<KbSubTitle>前置约定</KbSubTitle>


- 导入模板文件名：折扣政策导入模板.xlsx
- 导入接口：POST /v1/{orgId}/epm-discount-policy/importProduct
- 导入场景：批量导入产品明细行数据


<KbSubTitle>字段映射</KbSubTitle>


| 模板列名 | 对应字段 | 必填 | 备注 |
|---------|---------|------|------|
| 产品编码 | ITEM_CODE | 是 | 需在系统中存在 |
| 产品型号 | ITEM_MODEL | 否 | |
| 申请类型 | APPLICATION_TYPE | 是 | 1-产品、2-型号 |
| 优惠方式 | PREFERENTIAL_TYPE | 是 | 1-折扣、2-特价 |


<KbSubTitle>处理逻辑</KbSubTitle>


1. 解析Excel文件，逐行读取产品信息
2. 校验产品编码在系统中是否存在且有效
3. 根据申请类型和优惠方式校验对应字段
4. 将校验通过的数据写入产品明细行DataSet


<KbSubTitle>异常与结果约定</KbSubTitle>


- 产品编码不存在：提示"产品编码XXX不存在"
- 申请类型不合法：提示"申请类型只能为1(产品)或2(型号)"
- 优惠方式不合法：提示"优惠方式只能为1(折扣)或2(特价)"


<KbSubTitle>运维保障</KbSubTitle>


- 导入失败时查看导入日志：`SELECT * FROM EPM_IMPORT_LOG WHERE BUSINESS_TYPE = 'DISCOUNT_POLICY' ORDER BY CREATION_DATE DESC`


</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 新建 | 新建工程折扣政策 | 列表页 | 常显 | 跳转到详情页新建模式 |
| 查看 | 查看折扣政策详情 | 列表页(行操作) | 常显 | 跳转到详情页查看模式 |
| 编辑 | 进入编辑模式 | 详情页 | 审核状态=NEW或REJECTED时 | 切换为可编辑状态 |
| 保存 | 保存当前编辑数据 | 详情页 | 编辑状态下 | 调用saveData接口保存；保存前执行预校验(preCheckData) |
| 保存并提交 | 保存并提交审批 | 详情页 | 编辑状态下 | 先保存(saveData)再提交校验(submitCheck)再工作流提交(wfProcSubmit) |
| 导入 | 导入产品明细 | 详情页 | 编辑状态下 | 弹出导入弹窗，选择Excel文件上传 |
| 导出 | 导出折扣政策 | 列表页 | 常显 | 调用GET /v1/{orgId}/epm-discount-policy/exportEpmDiscountPolicy导出 |
| 删除 | 删除折扣政策 | 列表页(行操作) | 审核状态=NEW时 | 调用DELETE接口删除 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：头表必填数据校验 —— 确保基础信息完整</KbSubTitle>

- 第1点：政策类型必填
- 第2点：政策名称必填且不超过30字符
- 第3点：订单类型必填
- 第4点：币种必填
- 第5点：有效开始日期和有效结束日期必填
- 第6点：政策描述必填
- 第7点：根据政策类型校验对应适用对象必填

<KbTip>toast错误提醒对应必填字段</KbTip>

```sql
SELECT DISCOUNT_POLICY_ID, POLICY_TYPE, DISCOUNT_POLICY_NAME, BILL_TYPE, CURRENCY,
           EFFECTIVE_DATE_START, EFFECTIVE_DATE_END, NOTE
    FROM EPM_DISCOUNT_POLICY
    WHERE DISCOUNT_POLICY_ID = ?
```

<KbSubTitle>校验2：产品行不能为空 —— 确保至少有一条产品明细</KbSubTitle>

- 第1点：检查产品明细行DataSet是否为空
- 第2点：空时阻断保存

<KbTip>toast错误提醒"产品明细行不能为空"</KbTip>

```sql
SELECT COUNT(*) FROM EPM_DISCOUNT_POLICY_ITEM WHERE DISCOUNT_POLICY_ID = ?
```

<KbSubTitle>校验3：申请类型不能同时存在全产品与产品/型号 —— 确保申请类型互斥</KbSubTitle>

- 第1点：遍历所有产品明细行，收集申请类型
- 第2点：若同时存在全产品(3)与产品(1)或型号(2)，阻断保存
- 第3点：工程折扣政策下不允许选择全产品(3)

<KbTip>toast错误提醒"申请类型不能同时存在全产品与产品/型号"</KbTip>

```sql
SELECT DISTINCT APPLICATION_TYPE FROM EPM_DISCOUNT_POLICY_ITEM WHERE DISCOUNT_POLICY_ID = ?
```

<KbSubTitle>校验4：优惠方式校验 —— 确保优惠方式与阶梯明细数据一致</KbSubTitle>

- 第1点：优惠方式=折扣时，阶梯明细的折扣率必填
- 第2点：优惠方式=特价时，阶梯明细的特价必填
- 第3点：通用政策时默认折扣方式
- 第4点：专项政策时校验封顶数量逻辑

<KbTip>toast错误提醒对应字段</KbTip>

```sql
SELECT I.PREFERENTIAL_TYPE, L.DISCOUNT_RATE, L.SPECIAL_OFFER
    FROM EPM_DISCOUNT_POLICY_ITEM I
    LEFT JOIN EPM_DISCOUNT_POLICY_ITEM_LINE L ON L.DISCOUNT_POLICY_ITEM_ID = I.DISCOUNT_POLICY_ITEM_ID
    WHERE I.DISCOUNT_POLICY_ID = ?
```

<KbSubTitle>校验5：通用政策有效区间不能重复 —— 确保同一产品不会同时适用多个通用政策</KbSubTitle>

- 第1点：查询数据库中已存在的通用政策(suitableType=normal, isMakt=0)的有效期区间
- 第2点：判断当前政策有效期与已有政策是否重叠(当前开始≤已有结束 且 当前结束≥已有开始)
- 第3点：重叠时阻断保存

<KbTip>toast错误提醒"通用政策有效区间不能重复"</KbTip>

```sql
SELECT D.DISCOUNT_POLICY_ID, D.DISCOUNT_POLICY_CODE, D.EFFECTIVE_DATE_START, D.EFFECTIVE_DATE_END
    FROM EPM_DISCOUNT_POLICY D
    WHERE D.SUITABLE_TYPE = 'normal' AND D.IS_MAKT = 0 AND D.VALID != 3
    AND D.EFFECTIVE_DATE_START <= ? AND D.EFFECTIVE_DATE_END >= ?
    AND D.DISCOUNT_POLICY_ID != ?
```

<KbSubTitle>校验6：阶梯区间冲突校验 —— 确保同一产品行下阶梯区间不重叠</KbSubTitle>

- 第1点：起订量和封顶量必须为正整数(最小1)
- 第2点：起订量必须小于封顶量
- 第3点：不同阶梯政策的区间不能重叠(4种重叠情况判断)

<KbTip>toast错误提醒"阶梯区间存在重叠"</KbTip>

```sql
SELECT L1.MINIMUM_QTY, L1.CAPPING_QTY, L2.MINIMUM_QTY, L2.CAPPING_QTY
    FROM EPM_DISCOUNT_POLICY_ITEM_LINE L1
    JOIN EPM_DISCOUNT_POLICY_ITEM_LINE L2 ON L1.DISCOUNT_POLICY_ITEM_ID = L2.DISCOUNT_POLICY_ITEM_ID
    WHERE L1.DISCOUNT_POLICY_ITEM_LINE_ID < L2.DISCOUNT_POLICY_ITEM_LINE_ID
    AND L1.MINIMUM_QTY <= L2.CAPPING_QTY AND L1.CAPPING_QTY >= L2.MINIMUM_QTY
    AND L1.DISCOUNT_POLICY_ITEM_ID = ?
```

<KbSubTitle>校验7：家装专项校验新品 —— 家装专项政策需校验新品标识</KbSubTitle>

- 第1点：家装专项政策下，产品明细行的新品标识需满足业务规则

<KbTip>toast错误提醒</KbTip>

```sql
SELECT I.ITEM_CODE, I.NEW_PROD_FLAG FROM EPM_DISCOUNT_POLICY_ITEM I
    WHERE I.DISCOUNT_POLICY_ID = ? AND I.NEW_PROD_FLAG IS NULL
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：产品类型校验 —— 确保产品编码与型号折扣政策不冲突</KbSubTitle>

- 第1点：产品编码折扣政策与型号折扣政策不能同时覆盖同一产品
- 第2点：检查产品编码对应的型号是否已存在型号级别的折扣政策

<KbTip>toast错误提醒"产品编码与型号折扣政策冲突"</KbTip>

```sql
SELECT I1.ITEM_CODE, I2.ITEM_MODEL
    FROM EPM_DISCOUNT_POLICY_ITEM I1
    JOIN EPM_DISCOUNT_POLICY_ITEM I2 ON I1.DISCOUNT_POLICY_ID = I2.DISCOUNT_POLICY_ID
    WHERE I1.DISCOUNT_POLICY_ID = ? AND I1.APPLICATION_TYPE = 1 AND I2.APPLICATION_TYPE = 2
```

<KbSubTitle>校验2：折扣产品及坎级数量校验 —— 确保封顶数量逻辑一致</KbSubTitle>

- 第1点：单个经销商存在封顶(capping=2)时，max(坎级封顶量)≤单个经销商封顶数量≤政策行总数量
- 第2点：单个经销商不存在封顶(capping=1)时，max(坎级封顶量)≤政策行总数量

<KbTip>toast错误提醒"封顶数量不合法"</KbTip>

```sql
SELECT I.DISCOUNT_POLICY_ITEM_ID, I.TOTAL_CAP_NUMBER, I.CAPPING, I.CUSTOMER_CAPS_NUMBER,
           MAX(L.CAPPING_QTY) AS MAX_CAPPING_QTY
    FROM EPM_DISCOUNT_POLICY_ITEM I
    LEFT JOIN EPM_DISCOUNT_POLICY_ITEM_LINE L ON L.DISCOUNT_POLICY_ITEM_ID = I.DISCOUNT_POLICY_ITEM_ID
    WHERE I.DISCOUNT_POLICY_ID = ?
    GROUP BY I.DISCOUNT_POLICY_ITEM_ID, I.TOTAL_CAP_NUMBER, I.CAPPING, I.CUSTOMER_CAPS_NUMBER
```

<KbSubTitle>校验3：流程编码不能为空 —— 确保工作流配置正确</KbSubTitle>

- 第1点：提交前校验工作流编码是否已配置

<KbTip>toast错误提醒"流程编码不能为空"</KbTip>

```sql
SELECT * FROM HWKF_WORKFLOW_DEF WHERE WORKFLOW_CODE = ? AND ENABLED_FLAG = 'Y'
```

</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[NEW 新建] --保存--> [NEW 新建]
[NEW 新建] --保存并提交--> [RUN 审批中]
[RUN 审批中] --审批通过--> [APPROVED 审批通过]
[RUN 审批中] --审批拒绝--> [REJECTED 审批拒绝]
[RUN 审批中] --撤回--> [WITHDRAW 已撤回]
[REJECTED 审批拒绝] --修改后重新提交--> [RUN 审批中]
[WITHDRAW 已撤回] --修改后重新提交--> [RUN 审批中]
[APPROVED 审批通过] --> 有效状态=有效(2)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、编辑、删除、保存并提交 |
| RUN | 审批中 | 查看 |
| APPROVED | 审批通过 | 查看；有效状态更新为2(有效) |
| REJECTED | 审批拒绝 | 查看、编辑、保存并提交 |
| WITHDRAW | 已撤回 | 查看、编辑、保存并提交 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_DISCOUNT_POLICY（折扣政策主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ID | BIGINT | 折扣政策ID/主键 | - | 自增主键 |
| DISCOUNT_POLICY_CODE | VARCHAR | 政策申请编号 | 政策申请编号 | 新建时自动生成 |
| DISCOUNT_POLICY_NAME | VARCHAR | 政策名称 | 政策名称 | 必填，最大30字符 |
| POLICY_TYPE | INTEGER | 政策类型 | 政策类型 | 值集AE.EPM.POLICY_TYPE：1-客户、2-区域、3-客户分类、4-省份 |
| BILL_TYPE | INTEGER | 订单类型 | 订单类型 | 值集AE.EPM.ORDER_CHOOSE/AE.EPM.ORDER_CHOOSE_OVERSEAS |
| CHANNEL | INTEGER | 销售渠道 | 销售渠道 | 值集AE.MKT.SALES_CHANNEL，默认4 |
| BUSINESS_TYPE | INTEGER | 业务类型 | 业务类型 | 值集AE.EPM.ENGINEER.BUSINESS_TYPE，默认1(工程) |
| CUSTOMER_STR | VARCHAR | 适用客户 | 适用客户 | 政策类型=客户时必填 |
| SALE_AREA_OBJ | VARCHAR | 适用区域 | 适用区域 | 政策类型=区域时必填 |
| PROVINCE_OBJ | VARCHAR | 适用省份 | 适用省份 | 政策类型=省份时必填 |
| CUSTOMER_CLASS | INTEGER | 适用客户分类 | 适用客户分类 | 政策类型=客户分类时必填 |
| EFFECTIVE_DATE_START | DATE | 有效开始日期 | 有效开始日期 | 必填，最小为当天 |
| EFFECTIVE_DATE_END | DATE | 有效结束日期 | 有效结束日期 | 必填，最小为有效开始日期+1天 |
| NOTE | VARCHAR | 政策描述 | 政策描述 | 必填 |
| IS_CAL_AD | INTEGER | 计广告费 | 计广告费 | 1-否，2-是，默认1 |
| CURRENCY | VARCHAR | 币种 | 币种 | LOV:HPFM.CURRENCY，必填 |
| BATCH_START_DATE | DATE | 批次开始日期 | 批次开始日期 | 最大=batchEndDate |
| BATCH_END_DATE | DATE | 批次结束日期 | 批次结束日期 | 最小=batchStartDate |
| PROD_ATTRIBUTION_CHANNEL | VARCHAR | 品类 | 品类 | 禁用 |
| POLICY_ANALYSIS_DESCRIPTION | VARCHAR | 政策分析说明 | 政策分析说明 | 保存时后端自动生成，禁用 |
| DIVISION_ID | BIGINT | 适用事业部ID | 适用事业部Id | 默认值=当前用户DEPT |
| DIVISION_NAME | VARCHAR | 适用事业部名称 | 适用事业部 | 默认值=当前用户deptName，禁用 |
| HZ_APPROVE_STATUS | VARCHAR | 审核状态 | 审核状态 | 值集HWKF.APPROVE_STATUS，默认NEW |
| VALID | INTEGER | 有效状态 | 有效状态 | 值集AE.VALID：1-未审核、2-有效、3-失效 |
| STAT | INTEGER | 单据状态 | - | 0-草稿、5-已审批 |
| IS_MAKT | INTEGER | 是否样品 | - | 0-工程 |
| SUITABLE_TYPE | VARCHAR | 适用类型 | - | normal-通用 |
| SOURCE_SYSTEM | VARCHAR | 来源系统 | - | EPMS |
| CREATED_BY_NAME | VARCHAR | 申请人 | 申请人 | 默认值=当前登录用户realName |
| CREATION_DATE | DATE | 申请时间 | 申请时间 | 默认值=当前日期 |

</KbCard>

<KbCard num="2" title="表2：EPM_DISCOUNT_POLICY_ITEM（折扣政策产品明细表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_ID | BIGINT | 产品明细ID/主键 | - | 自增主键 |
| DISCOUNT_POLICY_ID | BIGINT | 折扣政策ID | - | 关联EPM_DISCOUNT_POLICY.DISCOUNT_POLICY_ID |
| APPLICATION_TYPE | INTEGER | 申请类型 | 申请类型 | 值集AE.EPM.APPLICATION_TYPE：1-产品、2-型号、3-全产品(工程不可选) |
| PREFERENTIAL_TYPE | INTEGER | 优惠方式 | 优惠方式 | 值集AE.EPM.PREFERENTIAL_TYPE：1-折扣、2-特价 |
| NEW_PROD_FLAG | VARCHAR | 新品标识 | 新品 | 由产品信息带入 |
| PROD_POSITIONING | VARCHAR | 产品定位 | 产品定位 | 由产品信息带入 |
| PROD_DISCOUNT | VARCHAR | 零售折扣底限 | 零售折扣底限 | 由CRM接口获取 |
| PROD_DISC_CHANNEL | VARCHAR | 底限渠道 | 底限渠道 | 由CRM接口获取 |
| ITEM_CODE | VARCHAR | 产品编码 | 产品编码 | LOV:AE.GET_CRM_ITEM，申请类型=产品时必填 |
| ITEM_MODEL | VARCHAR | 产品型号 | 产品型号 | LOV:AE.GET_MODEL，申请类型=型号时必填 |
| SM_STATE | VARCHAR | 生命状态 | 生命周期 | 由产品信息带入 |
| STOCK_AGE_NUM_STR | VARCHAR | 库龄区间 | 库龄区间 | 由产品信息带入 |
| AVG_MONTH_DYNAMIC_SALE_NUM | VARCHAR | 月平均动销数量 | 月平均动销数量 | 由EBS接口获取 |
| INVENTORY_DIGESTION_MONTHS | VARCHAR | 库存消化周期 | 库存消化周期 | 由EBS接口获取 |
| CAL_ADVERTISE_EXPENSES | INTEGER | 计广告费 | 计广告费 | 1-否，2-是，默认1 |
| CAL_BILLING_DISCOUNT | INTEGER | 计开单折扣 | 计开单折扣 | 1-否，2-是，默认1 |
| UOM_NAME | VARCHAR | 单位 | 单位 | 由产品信息带入 |
| STAND_PRICE | DECIMAL | 标准单价(含安装) | 标准单价(含安装) | 由产品信息带入 |
| STANDARD_PRICE | DECIMAL | 标准单价(不含安装) | 标准单价(不含安装) | 由产品信息带入 |
| INSTALL_UNIT_PRICE | DECIMAL | 安装单价 | 安装单价 | 由产品信息带入 |
| ITEM_COST | DECIMAL | 成本单价 | 成本 | 由EBS接口获取 |
| TASKDISCOUNT | VARCHAR | 任务返点率 | 任务返点率 | 由产品信息带入 |
| TOTAL_CAP_NUMBER | INTEGER | 政策封顶总数量 | 政策封顶总数量行 | 最小1，整数 |
| CAPPING | INTEGER | 单个经销商封顶校验 | 单个经销商封顶数量校验 | 1-否，2-是，默认1 |
| CUSTOMER_CAPS_NUMBER | INTEGER | 单个经销商封顶数量 | 单个经销商封顶数量 | capping=2时必填，且≤totalCapNumber |
| VALID_STAT | INTEGER | 是否已终止 | 是否已终止 | 默认0(未终止) |

</KbCard>

<KbCard num="3" title="表3：EPM_DISCOUNT_POLICY_ITEM_LINE（折扣政策阶梯明细表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_LINE_ID | BIGINT | 阶梯明细ID/主键 | - | 自增主键 |
| DISCOUNT_POLICY_ITEM_ID | BIGINT | 产品明细ID | - | 关联EPM_DISCOUNT_POLICY_ITEM.DISCOUNT_POLICY_ITEM_ID |
| MINIMUM_QTY | INTEGER | 起订量 | 起订量 | 必填，最小1，整数，需小于封顶量 |
| CAPPING_QTY | INTEGER | 封顶量 | 封顶量 | 必填，最小1，整数，需大于起订量 |
| SPECIAL_OFFER | DECIMAL | 特价 | 特价 | 优惠方式=特价时必填，精度3位，最小0.001 |
| DISCOUNT_RATE | DECIMAL | 折扣率 | 折扣率 | 优惠方式=折扣时必填，精度3位 |
| VALUE_CHAIN | DECIMAL | 价值链 | 价值链 | 保存时后端自动计算=(折后单价-成本单价)/折后单价 |
| WARNNING_LINE_MSG | VARCHAR | 警戒线提醒 | 警戒线提醒 | 保存时后端自动生成 |

</KbCard>

<KbCard num="4" title="表4：EPM_DISCOUNT_POLICY_CUSTOMER（折扣政策适用客户表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_CUSTOMER_ID | BIGINT | 适用客户ID/主键 | - | 自增主键 |
| DISCOUNT_POLICY_ID | BIGINT | 折扣政策ID | - | 关联EPM_DISCOUNT_POLICY.DISCOUNT_POLICY_ID |
| CUSTOMER_CODE | VARCHAR | 客户编码 | 客户编码 | 由适用客户字段带入 |
| SHORT_NAME | VARCHAR | 客户简称 | 客户简称 | 由客户信息带入 |
| SPECIAL_OFFER | VARCHAR | 特价 | 特价 | - |
| IS_IMPORTANCE | INTEGER | 是否主要 | 是否主要 | 1-否，2-是 |

</KbCard>

<KbCard num="5" title="表5：EPM_DISCOUNT_POLICY_ITEM_CUSTOMER（产品经销商封顶量表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_CUSTOMER_ID | BIGINT | 封顶量ID/主键 | - | 自增主键 |
| DISCOUNT_POLICY_ITEM_ID | BIGINT | 产品明细ID | - | 关联EPM_DISCOUNT_POLICY_ITEM.DISCOUNT_POLICY_ITEM_ID |
| CUSTOMER_ID | BIGINT | 经销商ID | - | 关联客户主数据 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | - | - |
| CAPS_NUMBER | INTEGER | 封顶数量 | - | capping=2时保存 |

</KbCard>

<KbCard num="6" title="表6：EPM_DISCOUNT_POLICY_ITEM_EXT（产品明细扩展表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_EXT_ID | BIGINT | 扩展ID/主键 | - | 自增主键 |
| DISCOUNT_POLICY_ITEM_ID | BIGINT | 产品明细ID | - | 关联EPM_DISCOUNT_POLICY_ITEM.DISCOUNT_POLICY_ITEM_ID |
| AVG_MONTH_DYNAMIC_SALE_NUM | VARCHAR | 月平均动销数量 | 月平均动销数量 | 流程提交时从EBS接口获取更新 |
| INVENTORY_DIGESTION_MONTHS | VARCHAR | 库存消化周期 | 库存消化周期 | 流程提交时从EBS接口获取更新 |
| INVENTORY_QTY | VARCHAR | 库存数量 | - | 流程提交时从EBS接口获取更新 |
| SM_STATE | VARCHAR | 生命状态 | - | 流程提交时从EBS接口获取更新 |
| NEW_PROD_FLAG | VARCHAR | 新品标识 | - | 流程提交时从EBS接口获取更新 |
| PROD_POSITIONING | VARCHAR | 产品定位 | - | 流程提交时从EBS接口获取更新 |
| MANAGE_CATEGORY | VARCHAR | 管理分类 | - | 业务类型=3或16时更新 |

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
            <td style="color:#DC2626;font-weight:600;">产品明细行不能为空</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">未添加任何产品明细行</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">申请类型不能同时存在全产品与产品/型号</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">产品行中同时存在全产品(3)与产品(1)或型号(2)的申请类型</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">工程折扣不能选择全产品</td>
            <td style="font-size:13px;">产品明细行</td>
            <td style="font-size:13px;">工程折扣政策下申请类型不允许选择全产品(3)</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">通用政策有效区间不能重复</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">当前政策有效期与已有通用政策重叠</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">阶梯区间存在重叠</td>
            <td style="font-size:13px;">保存/阶梯明细编辑</td>
            <td style="font-size:13px;">同一产品行下不同阶梯政策的起订量-封顶量区间重叠</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">起订量必须为正整数</td>
            <td style="font-size:13px;">阶梯明细编辑</td>
            <td style="font-size:13px;">起订量小于1或非整数</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">封顶量必须为正整数</td>
            <td style="font-size:13px;">阶梯明细编辑</td>
            <td style="font-size:13px;">封顶量小于1或非整数</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">起订量必须小于封顶量</td>
            <td style="font-size:13px;">阶梯明细编辑</td>
            <td style="font-size:13px;">起订量≥封顶量</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">产品编码与型号折扣政策冲突</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">产品编码折扣政策与型号折扣政策覆盖同一产品</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">封顶数量不合法</td>
            <td style="font-size:13px;">提交</td>
            <td style="font-size:13px;">max(坎级封顶量)&gt;单个经销商封顶数量或&gt;政策行总数量</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-10" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程编码不能为空</td>
            <td style="font-size:13px;">保存并提交</td>
            <td style="font-size:13px;">工作流编码未配置</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-11" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">产品定位为一口价时折扣必须等于1</td>
            <td style="font-size:13px;">流程提交</td>
            <td style="font-size:13px;">一口价产品的折扣率≠1</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-12" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">CRM折扣率校验不通过</td>
            <td style="font-size:13px;">流程提交</td>
            <td style="font-size:13px;">启用折扣管控且客户需校验时CRM折扣率不合规</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-13" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">特价必须大于0.001</td>
            <td style="font-size:13px;">阶梯明细编辑</td>
            <td style="font-size:13px;">优惠方式=特价时特价值小于0.001</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-14" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">单个经销商封顶数量不能超过政策行总数量</td>
            <td style="font-size:13px;">产品明细行</td>
            <td style="font-size:13px;">customerCapsNumber&gt;totalCapNumber</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-15" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策名称不能超过30字符</td>
            <td style="font-size:13px;">详情页</td>
            <td style="font-size:13px;">政策名称长度超过30</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-16" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">有效开始日期不能小于当天</td>
            <td style="font-size:13px;">详情页</td>
            <td style="font-size:13px;">effectiveDateStart&lt;当天</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-17" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">有效结束日期不能小于有效开始日期+1天</td>
            <td style="font-size:13px;">详情页</td>
            <td style="font-size:13px;">effectiveDateEnd&lt;effectiveDateStart+1</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-18" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>产品明细行不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>未添加任何产品明细行</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>申请类型不能同时存在全产品与产品/型号</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>产品行中同时存在全产品(3)与产品(1)或型号(2)的申请类型</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>工程折扣不能选择全产品</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>工程折扣政策下申请类型不允许选择全产品(3)</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>通用政策有效区间不能重复</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>当前政策有效期与已有通用政策重叠</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>阶梯区间存在重叠</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>同一产品行下不同阶梯政策的起订量-封顶量区间重叠</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>起订量必须为正整数</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>起订量小于1或非整数</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>封顶量必须为正整数</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>封顶量小于1或非整数</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>起订量必须小于封顶量</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>起订量≥封顶量</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>产品编码与型号折扣政策冲突</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>产品编码折扣政策与型号折扣政策覆盖同一产品</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-10" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>封顶数量不合法</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>max(坎级封顶量)&gt;单个经销商封顶数量或&gt;政策行总数量</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-11" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程编码不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>工作流编码未配置</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-12" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>产品定位为一口价时折扣必须等于1</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>一口价产品的折扣率≠1</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-13" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>CRM折扣率校验不通过</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>启用折扣管控且客户需校验时CRM折扣率不合规</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-14" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>特价必须大于0.001</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>优惠方式=特价时特价值小于0.001</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-15" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>单个经销商封顶数量不能超过政策行总数量</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>customerCapsNumber&gt;totalCapNumber</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-16" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策名称不能超过30字符</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>政策名称长度超过30</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-17" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>有效开始日期不能小于当天</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>effectiveDateStart&lt;当天</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-18" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>有效结束日期不能小于有效开始日期+1天</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>effectiveDateEnd&lt;effectiveDateStart+1</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">保存时提示"通用政策有效区间不能重复"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>当前折扣政策的有效期与系统中已存在的通用政策重叠<br>
      <strong style="color:#7C3AED;">处理：</strong>查询冲突政策：`SELECT D.DISCOUNT_POLICY_CODE, D.EFFECTIVE_DATE_START, D.EFFECTIVE_DATE_END FROM EPM_DISCOUNT_POLICY D WHERE D.SUITABLE_TYPE = 'normal' AND D.IS_MAKT = 0 AND D.VALID != 3 AND D.EFFECTIVE_DATE_START &lt;= ? AND D.EFFECTIVE_DATE_END &gt;= ?`，调整有效期或联系冲突政策负责人
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">提交时提示"产品编码与型号折扣政策冲突"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>同一折扣政策中产品编码级别和型号级别的折扣政策覆盖了同一产品<br>
      <strong style="color:#7C3AED;">处理：</strong>检查产品明细行：`SELECT I1.ITEM_CODE, I2.ITEM_MODEL FROM EPM_DISCOUNT_POLICY_ITEM I1 JOIN EPM_DISCOUNT_POLICY_ITEM I2 ON I1.DISCOUNT_POLICY_ID = I2.DISCOUNT_POLICY_ID WHERE I1.DISCOUNT_POLICY_ID = ? AND I1.APPLICATION_TYPE = 1 AND I2.APPLICATION_TYPE = 2`，移除冲突行
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">流程提交后产品扩展资料未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>EBS接口调用失败或返回数据为空<br>
      <strong style="color:#7C3AED;">处理：</strong>检查EBS接口连通性，查看扩展表：`SELECT * FROM EPM_DISCOUNT_POLICY_ITEM_EXT WHERE DISCOUNT_POLICY_ITEM_ID = ?`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">阶梯明细保存后价值链和警戒线提醒为空</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>保存时后端计算价值链需要成本单价和标准单价，若EBS未返回成本单价则无法计算<br>
      <strong style="color:#7C3AED;">处理：</strong>确认EBS接口返回的成本单价：`SELECT I.ITEM_CODE, I.ITEM_COST, I.STANDARD_PRICE FROM EPM_DISCOUNT_POLICY_ITEM I WHERE I.DISCOUNT_POLICY_ID = ? AND (I.ITEM_COST IS NULL OR I.STANDARD_PRICE IS NULL)`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">导入产品明细失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>Excel中产品编码在系统中不存在或已失效<br>
      <strong style="color:#7C3AED;">处理：</strong>校验产品编码：`SELECT ITEM_CODE FROM EPM_ITEM WHERE ITEM_CODE IN (?) AND ENABLED_FLAG = 'Y'`，确认产品编码有效
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
