<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-11" title="经销合同销售区域报表" desc="经销合同销售区域报表的查询与导出" />

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

```
用户进入报表页面
        │
        ▼
设置查询条件（合同年度/经销商/事业部/审批状态等）
        │
        ▼
点击查询 ──→ POST /v1/{orgId}/contractReport/sa-sale-contract-head/search
        │              │
        │              ▼
        │         ae-report服务
        │              │
        │              ▼
        │         SaSaleContractHeadService.saSaleContractHeadSearch()
        │              │
        │              ▼
        │         SaSaleContractHeadRepository → SaSaleContractHeadMapper.saSaleContractHeadSearch()
        │              │
        │              ▼
        │         SQL查询（JOIN区域表+事业部+用户+LISTAGG排除区域）
        │              │
        │              ▼
        │         返回Page<SaSaleContractHeadSearchVO>
        │
        ▼
展示报表数据（含区域层级+排除区域）
        │
        ▼
点击导出 ──→ GET /v1/{orgId}/contractReport/sa-sale-contract-head/export
        │              │
        │              ▼
        │         查询数据 → MapStruct转换 → @ProcessLovValue翻译值集 → Excel导出
        │
        ▼
导出完成
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游服务/模块 | 依赖说明 | 接口/方式 |
|---|---|---|
| SA_SALE_CONTRACT_HEAD | 经销合同主数据，报表查询的数据源 | 直接读表 |
| SA_SALE_CONTRACT_AREA | 经销合同区域信息，提供国/省/市/区县/乡镇五级区域 | LEFT JOIN |
| EXCLUDE_AREA_REL | 排除区域关系，LISTAGG拼接不包含地区说明 | LEFT JOIN |
| DIVISION_BASE_SET | 事业部基础设置，翻译事业部名称 | 子查询 |
| hzero.iam_user | 用户信息表，翻译更新人姓名 | LEFT JOIN |
| EPMS.SCPDICT | 数据字典，翻译销售合同类型名称 | LEFT JOIN |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 影响说明 | 纯查询报表，无下游写入影响 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 经销合同区域报表查询">
<KbQuote>按销售区域维度展示经销合同信息，支持按事业部、合同年度、经销商、审批状态等多条件筛选，核心价值在于区域维度的合同管控与分析。</KbQuote>

**具体逻辑**：

- 1、查询以经销合同主表为驱动表，LEFT JOIN区域表获取五级区域信息（国/省/市/区县/乡镇）
- 2、通过LISTAGG函数将排除区域关系表的多行拼接为逗号分隔的"不包含地区说明"
- 3、事业部名称通过子查询从事业部基础设置表获取
- 4、更新人姓名通过关联hzero平台用户表翻译
- 5、合同类型名称通过关联数据字典表翻译
- 6、生效状态使用DECODE(VALID, 0, NULL, VALID)处理，0值转为空不展示
- 7、外层WHERE子句对子查询结果进行二次过滤，支持日期范围筛选（开始日期&gt;=、结束日期&lt;=+1天）
</KbCard>

<KbCard num="2" title="2.2 导出逻辑">
<KbQuote>将报表查询结果按Excel模板导出，供线下分析使用。</KbQuote>

**具体逻辑**：

- 1、导出复用查询逻辑，先调用saSaleContractHeadSearch获取数据
- 2、通过MapStruct（SaSaleContractHeadConvert）将SearchVO转为ExportVO
- 3、使用@ProcessLovValue注解自动翻译值集含义：审批状态（HWKF.APPROVE_STATUS）、生效状态（AE.VALID）、合同类型（AE.SALES_CONTRACT_TYPE）
- 4、导出Sheet标题为"经销合同销售区域报表"
- 5、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">

</KbCard>
<KbCard title="其他按钮">
</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

无（纯查询报表，无状态流转）

---

</KbCard>
<KbCard num="1" title="4.1 SA_SALE_CONTRACT_HEAD">

**说明**：经销合同主表，存储合同基本信息

| 字段名 | 类型 | 说明 |
|---|---|---|
| SA_CONTR_HEAD_ID | NUMBER | 销售合同ID（主键） |
| SA_CONTR_HEAD_CODE | VARCHAR2 | 销售合同编号 |
| START_DATE | DATE | 合同开始日期 |
| END_DATE | DATE | 合同截止日期 |
| WFID | NUMBER | 流程ID |
| STAT | NUMBER | 单据状态（已弃用，使用HZ_APPROVE_STATUS） |
| WFFLAG | NUMBER | 流程标志 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID |
| TRADING_COMPANY_NAME | VARCHAR2 | 交易公司名称 |
| TRADING_COMPANY_CODE | VARCHAR2 | 交易公司编码 |
| CREDIT_BALANCE | NUMBER | 授信余额 |
| ACTUAL_CONTROLLER | VARCHAR2 | 暂未用：实际控制人 |
| BILLING_UNIT_ID | NUMBER | 开票单位ID |
| BILLING_UNIT_NAME | VARCHAR2 | 实际控制人 |
| BALANCE | NUMBER | 货款余额 |
| RANK | NUMBER | 客户等级 |
| EXT_CONTRACT_CODE | VARCHAR2 | 外部合同编码 |
| CUST_ID | NUMBER | 经销商ID |
| CUST_CODE | VARCHAR2 | 经销商编码 |
| CUST_NAME | VARCHAR2 | 经销商名称 |
| CREATOR | VARCHAR2 | 申请人 |
| CREATE_TIME | DATE | 申请日期 |
| UPDATOR | VARCHAR2 | 更新人 |
| UPDATE_TIME | DATE | 更新日期 |
| CHECKOR | VARCHAR2 | 审核人 |
| CHECK_TIME | DATE | 审核日期 |
| CG_TASK_AMT | NUMBER | 常规任务 |
| DZ_TASK_AMT | NUMBER | 定制卫浴任务 |
| GROWTH_RATE | NUMBER | 增长率 |
| LAST_TOTAL_TASK | NUMBER | 上年总任务 |
| RETURN_AMT | NUMBER | 回款完成 |
| RETURN_RATE | NUMBER | 回款完成率 |
| SALE_AMT | NUMBER | 发货完成 |
| SALE_RATE | NUMBER | 发货完成率 |
| LAST_DZ_TASK | NUMBER | 上年定制任务 |
| ORDER_AMT | NUMBER | 定制下单金额 |
| DZ_RATE | NUMBER | 定制完成率 |
| TERMINAL_NOTE | VARCHAR2 | 网点建设要求 |
| ENTID | NUMBER | 组织ID |
| OLD_SA_CONTR_HEAD_ID | NUMBER | 原销售合同ID |
| OLD_SA_CONTR_HEAD_CODE | VARCHAR2 | 原销售合同编号 |
| SALE_YEAR | NUMBER | 销售年度 |
| TOTAL_TASK | NUMBER | 销售任务总额 |
| DEPOSIT_AMT | NUMBER | 保证金（万元） |
| MKT_COST_RATE | NUMBER | 市场推广服务费率(%) |
| PRICE_DOWN_RATE | NUMBER | 指导价下浮比例(%) |
| AFTER_SIGN_MTHS | NUMBER | 签约后XX月 |
| NEW_STORE_TASK | NUMBER | 专卖店建设任务（个） |
| NEW_OUTLETS_TASK | NUMBER | 新开网点任务 |
| OLD_OUTLETS_TASK | NUMBER | 旧网点改造任务/个 |
| TOTAL_TASK_AMT | NUMBER | 合同任务总额 |
| VALID | NUMBER | 生效状态 |
| CUST_FULL_NAME | VARCHAR2 | 经销商编码和名称拼接 |
| SALES_CONTRACT_TYPE | NUMBER | 销售合同类型 |
| OLD_START_DATE | DATE | 上年度合同开始日期 |
| OLD_END_DATE | DATE | 上年度合同结束日期 |
| SHORT_NAME | VARCHAR2 | 经销商简称 |
| CLIENTNAME | VARCHAR2 | 区分APP与PC |
| DISCOUNT_MAX | NUMBER | 最大返点 |
| CRM_ID | VARCHAR2 | CRM合同ID |
| RETAIL_CHANNEL | NUMBER | 特约客户任务 |
| DELAY_DATE | DATE | 延迟发货日期 |
| CLOSE_DATA | DATE | 结案日期 |
| IS_NEXTYEAR | NUMBER | 已执行次年折扣率 |
| IS_BALANCE | NUMBER | 已执行任务差额违约金 |
| CORPORATE | VARCHAR2 | 法人 |
| CORPORATE_CODE | VARCHAR2 | 法人编码 |
| IS_PUSH_CRM | VARCHAR2 | 记录推送CRM |
| ELECTRICITY_CONSULT | VARCHAR2 | 电商平台数量 |
| ELECTRICITY_CONSULT_SHOP | NUMBER | 电商平台开设店铺数 |
| NOTE | VARCHAR2 | 备注 |
| STATE_PIGEONHOLE | NUMBER | 归档状态 |
| PIGEONHOLE_DATE | DATE | 合同应归档时间 |
| PIGEONHOLE_DATE_REALLY | DATE | 合同实际归档时间 |
| PIGEONHOLE_CREATE | VARCHAR2 | 归档人 |
| IS_DOCRM | NUMBER | 是否抛转CRM |
| DOCRM_DATE | DATE | 抛转时间 |
| IS_PIGEONHOLE | NUMBER | 是否归档数据 |
| SA_CONTR_ADD_ID | NUMBER | 销售合同变更单ID |
| AUDIT_STAT | VARCHAR2 | 外部系统审核状态 |
| ERROR | VARCHAR2 | 提示信息 |
| REPEAT_AREA | NUMBER | 是否重复区域（1否 2是） |
| ORIGINAL_CONTRACT_CODE | VARCHAR2 | 合同变更后原合同编码 |
| CREATOR_NAME | VARCHAR2 | 申请人名称 |
| UPDATOR_NAME | VARCHAR2 | 更新人名称 |
| RETAIL_CHANNEL_AMT | NUMBER | 零售渠道金额 |
| HOME_CHANNEL_AMT | NUMBER | 家装渠道金额 |
| BUSINESS_CHANNEL_AMT | NUMBER | 商务渠道金额 |
| FITMETAL_CHANNEL_AMT | NUMBER | 五金渠道金额 |
| ENGINEERING_CHANNEL_AMT | NUMBER | 工程渠道金额 |
| OTHER_CHANNEL_AMT | NUMBER | 其他渠道金额 |
| TOWNSHIP_CHANNEL | NUMBER | 乡镇渠道 |
| DIVISION_ID | NUMBER | 事业部ID |
| CURRENCY | VARCHAR2 | 币种 |
| ROUTINE_BATHROOM_CHANNEL | NUMBER | 常规卫浴渠道 |
| SIGNATURE_STATE | NUMBER | 签章状态 |
| SIGNATURE_URL | VARCHAR2 | 签章URL |
| DOCID | NUMBER | 文档ID |
| OWNER_LINKMAN | VARCHAR2 | 业主联系人 |
| OWNER_LINKMAN_PHONE | VARCHAR2 | 业主联系电话 |
| ENGINEER_TASK | NUMBER | 工程任务 |
| HOME_TASK | NUMBER | 家装任务 |
| ENGINEER_HOME_TASK | NUMBER | 工程家装任务 |
| BATHROOM_SCREEN_TASK | NUMBER | 浴屏任务 |
| DZ_BATHROOM_TASK | NUMBER | 定制卫浴任务 |
| RETAIL_CHANNEL_TASK | NUMBER | 零售渠道任务 |
| CONTRACT_CHANNEL_REL_ID | NUMBER | 合同渠道关系ID |
| MASTER_CONTRACT_ID | NUMBER | 主合同ID |
| REBATE_ID | NUMBER | 返利ID |
| BREACH_ID | NUMBER | 违约ID |
| DISCOUNT_ID | NUMBER | 折扣ID |
| PAY_COMPLETE | VARCHAR2 | 付款完成 |
| EXIST_OUTLETS_QTY | VARCHAR2 | 现有网点数量 |
| SOLD_PRODUCTS | VARCHAR2 | 已售产品 |
| HZ_INSTANCE_ID | NUMBER | 工作流实例ID |
| HZ_APPROVE_STATUS | VARCHAR2 | 审批状态 |
| CALLBACK_SOURCE | VARCHAR2 | 回调来源 |
| CREATION_DATE | DATE | 创建时间 |
| CREATED_BY | NUMBER | 创建人 |
| LAST_UPDATED_BY | NUMBER | 更新人ID |
| LAST_UPDATE_DATE | DATE | 更新时间 |
| OBJECT_VERSION_NUMBER | NUMBER | 乐观锁版本号 |

</KbCard>

<KbCard num="2" title="4.2 SA_SALE_CONTRACT_AREA">

**说明**：经销合同区域表，存储合同对应的销售区域信息

| 字段名 | 类型 | 说明 |
|---|---|---|
| SA_CONTR_HEAD_ID | NUMBER | 销售合同ID（外键） |
| SEQ | NUMBER | 区域行序号 |
| COUNTRY_AREANAME | VARCHAR2 | 国家地区名称 |
| PROVINCE_AREANAME | VARCHAR2 | 省份地区名称 |
| CITY_AREANAME | VARCHAR2 | 城市地区名称 |
| COUNTY_AREANAME | VARCHAR2 | 区县地区名称 |
| TOWNSHIP_AREANAME | VARCHAR2 | 乡镇地区名称 |

</KbCard>

<KbCard num="3" title="4.3 EXCLUDE_AREA_REL">

**说明**：排除区域关系表，存储合同区域中排除的地区

| 字段名 | 类型 | 说明 |
|---|---|---|
| SA_CONTR_HEAD_ID | NUMBER | 销售合同ID（外键） |
| AREA_LINE_ID | NUMBER | 区域行ID（关联SA_SALE_CONTRACT_AREA.SEQ） |
| AREANAME | VARCHAR2 | 排除区域名称 |

</KbCard>

<KbCard num="4" title="4.4 DIVISION_BASE_SET">

**说明**：事业部基础设置表

| 字段名 | 类型 | 说明 |
|---|---|---|
| DIVISION_ID | NUMBER | 事业部ID |
| DIVISION_NAME | VARCHAR2 | 事业部名称 |
| ORGANIZATION_ID | NUMBER | 组织ID |

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
            <td style="color:#DC2626;font-weight:600;">开始时间格式必须为YYYY-MM-DD</td>
            <td style="font-size:13px;">startDate格式校验不通过</td>
            <td style="font-size:13px;">确保日期格式为YYYY-MM-DD</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">结束时间格式必须为YYYY-MM-DD</td>
            <td style="font-size:13px;">endDate格式校验不通过</td>
            <td style="font-size:13px;">确保日期格式为YYYY-MM-DD</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">ORA-00923: FROM keyword not found</td>
            <td style="font-size:13px;">LISTAGG在Oracle版本不支持</td>
            <td style="font-size:13px;">确认Oracle版本&gt;=11g R2</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>开始时间格式必须为YYYY-MM-DD</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确保日期格式为YYYY-MM-DD</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>结束时间格式必须为YYYY-MM-DD</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确保日期格式为YYYY-MM-DD</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>ORA-00923: FROM keyword not found</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认Oracle版本&gt;=11g R2</div>
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

| 日期 | 版本 | 变更内容 | 变更人 |
|---|---|---|---|
| 2025-12-12 | V1.0 | 初始创建经销合同销售区域报表查询及导出功能 | lingma |
| 2026-01-01 | V1.1 | 新增审批状态(hzApproveStatus)查询条件 | - |
| 2026-01-01 | V1.2 | 导出VO增加@LovValue值集翻译注解 | - |
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
