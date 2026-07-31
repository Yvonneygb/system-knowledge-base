<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="经销商工程合同" desc="工程管理-项目合同业务说明" />

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
项目报备(已生效) → 新建经销商工程合同 → 选择项目/客户/交易公司
  ↓
填写合同基本信息(签约方式=经销) + 产品清单 + 付款计划 + 约定条款
  ↓
保存 → 生成合同编码，校验项目/客户/交易公司
  ↓
保存并提交 → 启动审批流程(按区域:东/西/南/北区)
  ↓
审批通过 → 合同有效状态=2(已生效) → 可创建折扣单/要货订单
审批驳回 → 合同有效状态不变
  ↓
合同失效 → 参见"项目合同失效"菜单
合同结案 → 参见"工程项目结案"菜单
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程项目报备 | 数据依赖 | 合同关联项目，获取项目信息、客户、地址等 | 项目已报备且有效 |
| 客户主数据 | 数据依赖 | 合同关联经销商客户 | 客户已创建且有效 |
| 交易公司 | 数据依赖 | 合同关联交易公司，确定开票单位 | 交易公司已配置 |
| 编码规则配置 | 配置依赖 | 生成合同编码 | 编码规则已配置且生效 |
| 工作流引擎 | 配置依赖 | 审批流程(按区域区分) | 流程已部署且可用 |
| 产品主数据 | 数据依赖 | 产品清单引用产品信息 | 产品已上架 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程折扣政策申请 | 基于合同创建折扣申请 | 合同生效后，可基于合同创建折扣政策申请，审批通过后生成折扣单 |
| 工程要货订单 | 基于合同下单 | 合同生效后，可基于合同和折扣单创建要货订单 |
| 项目合同失效 | 发起失效申请 | 合同可发起失效申请，失效后合同状态变为3(已失效) |
| 增补合同 | 创建增补合同 | 合同可创建增补合同，mainContractId指向原始合同 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：合同编码自动生成 {编码规则}">
<KbQuote>每次新建合同时自动生成唯一编码</KbQuote>

**具体逻辑**：

- 1、新增合同时，系统自动生成合同编码
- 2、增补合同时，mainContractId记录原始合同ID，supplementType=2(增补)
</KbCard>

<KbCard num="2" title="重点逻辑2：签约方式区分 {经销/直销}">
<KbQuote>经销商工程合同固定签约方式为经销(contractType=2)</KbQuote>

**具体逻辑**：

- 1、列表查询固定传参contractType=2，仅展示经销合同
- 2、新建时默认contractType=2(经销)
</KbCard>

<KbCard num="3" title="重点逻辑3：审批流程按区域区分 {多流程}">
<KbQuote>不同区域的经销商工程合同使用不同的审批流程</KbQuote>

**具体逻辑**：

- 1、东区使用SUB_CONTRACT_JXSGCHT_EAST
- 2、西区使用SUB_CONTRACT_JXSGCHT_WEST
- 3、南区使用SUB_CONTRACT_JXSGCHT_SOUTH
- 4、北区使用SUB_CONTRACT_JXSGCHT_NORTH
</KbCard>

<KbCard num="4" title="重点逻辑4：战略工程关联 {战略项目}">
<KbQuote>合同可关联战略工程，享受战略工程特殊政策</KbQuote>

**具体逻辑**：

- 1、勾选"战略工程相关"后，可选择战略项目和战略协议
- 2、战略工程关联后，合同享受战略工程折扣政策
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：经销商工程合同列表页">
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
<td>值集HWKF.APPROVE_STATUS中的项</td>
<td>EPM_PROJECT_CONTRACT.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>有效状态</td>
<td>下拉选择框</td>
<td>合同有效状态</td>
<td>常显</td>
<td>1.来源：值集AE.VALID</td>
<td>1未审核/2有效/3失效/7失效申请中</td>
<td>EPM_PROJECT_CONTRACT.VALID</td>
</tr>
<tr>
<td>合同编码</td>
<td>文本框</td>
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
<td>合同签订日期</td>
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
<td>客户编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>1.选择项目/客户带出</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>经销商名称</td>
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
<td>1.用户输入或产品清单汇总</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_AMT</td>
</tr>
<tr>
<td>增补类型</td>
<td>下拉选择框</td>
<td>1=新增/2=增补</td>
<td>常显</td>
<td>1.来源：值集AE.EPM.SUPPLEMENT_TYPE</td>
<td>值集AE.EPM.SUPPLEMENT_TYPE</td>
<td>EPM_PROJECT_CONTRACT.SUPPLEMENT_TYPE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>1.选择交易公司LOV带出</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>结案状态</td>
<td>下拉选择框</td>
<td>合同结案类型</td>
<td>常显</td>
<td>1.来源：值集AE.EPM.CONTRACT_COMPLETED_TYPE</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.COMPLETED_TYPE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：合同详情页-基本信息">
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
<td>合同编码</td>
<td>文本框</td>
<td>合同编码</td>
<td>常显</td>
<td>1.新建时为空，保存后自动生成；2.不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_CODE</td>
</tr>
<tr>
<td>合同名称</td>
<td>文本框</td>
<td>合同名称</td>
<td>常显</td>
<td>1.必输；2.编辑模式下可修改</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_NAME</td>
</tr>
<tr>
<td>审核状态</td>
<td>下拉选择框</td>
<td>审批状态</td>
<td>常显</td>
<td>1.来源：值集HWKF.APPROVE_STATUS；2.不可编辑</td>
<td>值集HWKF.APPROVE_STATUS</td>
<td>EPM_PROJECT_CONTRACT.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>有效状态</td>
<td>下拉选择框</td>
<td>合同有效状态</td>
<td>常显</td>
<td>1.来源：值集AE.VALID；2.不可编辑</td>
<td>值集AE.VALID</td>
<td>EPM_PROJECT_CONTRACT.VALID</td>
</tr>
<tr>
<td>报备项目编码</td>
<td>LOV</td>
<td>关联项目</td>
<td>常显</td>
<td>1.选择项目LOV(AE.PROJECT_DATA_VIEW)带出；2.选择后自动填充项目名称/客户/地址等</td>
<td>LOV:项目报备</td>
<td>EPM_PROJECT_CONTRACT.PROJECT_CODE</td>
</tr>
<tr>
<td>客户编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>1.选择项目后自动带出</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CUSTOMER_CODE</td>
</tr>
<tr>
<td>客户名称</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>1.选择项目后自动带出</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CUSTOMER_NAME</td>
</tr>
<tr>
<td>业主类型</td>
<td>下拉选择框</td>
<td>业主类型</td>
<td>常显</td>
<td>1.必输；2.来源：值集AE.EPM.PROJECT_TYPE</td>
<td>值集AE.EPM.PROJECT_TYPE</td>
<td>EPM_PROJECT_CONTRACT.PROJECT_MAIN_TYPE</td>
</tr>
<tr>
<td>签约方式</td>
<td>下拉选择框</td>
<td>签约方式</td>
<td>常显</td>
<td>1.默认值：2(经销)；2.来源：值集AE.EPM.CONTRACT_TYPE</td>
<td>值集AE.EPM.CONTRACT_TYPE</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_TYPE</td>
</tr>
<tr>
<td>工程签约单位</td>
<td>文本框</td>
<td>签约单位</td>
<td>常显</td>
<td>1.必输</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_UNIT</td>
</tr>
<tr>
<td>合同总额</td>
<td>数字框</td>
<td>合同金额</td>
<td>常显</td>
<td>1.用户输入</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_AMT</td>
</tr>
<tr>
<td>签订时间</td>
<td>日期选择框</td>
<td>合同签订日期</td>
<td>常显</td>
<td>1.必输</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.SIGNED_DATE</td>
</tr>
<tr>
<td>签订地点</td>
<td>文本框</td>
<td>合同签订地点</td>
<td>常显</td>
<td>1.必输</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.SIGNED_LOCATION</td>
</tr>
<tr>
<td>合作开始时间</td>
<td>日期选择框</td>
<td>合同生效时间</td>
<td>常显</td>
<td>1.用户输入</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_EFFECT_DATE</td>
</tr>
<tr>
<td>合作结束时间</td>
<td>日期选择框</td>
<td>合同失效时间</td>
<td>常显</td>
<td>1.用户输入</td>
<td>-</td>
<td>EPM_PROJECT_CONTRACT.CONTRACT_EXPIRE_DATE</td>
</tr>
<tr>
<td>增补类型</td>
<td>下拉选择框</td>
<td>新增/增补</td>
<td>常显</td>
<td>1.来源：值集AE.EPM.SUPPLEMENT_TYPE</td>
<td>1(新增)/2(增补)</td>
<td>EPM_PROJECT_CONTRACT.SUPPLEMENT_TYPE</td>
</tr>
<tr>
<td>战略工程相关</td>
<td>复选框</td>
<td>是否关联战略工程</td>
<td>常显</td>
<td>1.勾选后可选择战略项目和战略协议</td>
<td>是(2)/否(非2)</td>
<td>EPM_PROJECT_CONTRACT.STRATEGIC_RELATED</td>
</tr>
<tr>
<td>纯定制</td>
<td>复选框</td>
<td>是否纯定制合同</td>
<td>常显</td>
<td>1.纯定制合同不要求维护产品清单</td>
<td>是(2)/否(非2)</td>
<td>EPM_PROJECT_CONTRACT.IS_CUSTOM</td>
</tr>
<tr>
<td>地标工程</td>
<td>复选框</td>
<td>是否地标建筑</td>
<td>常显</td>
<td>1.默认N</td>
<td>Y/N</td>
<td>EPM_PROJECT_CONTRACT.LANDMARK_FLAG</td>
</tr>
<tr>
<td>交易公司</td>
<td>LOV</td>
<td>交易公司</td>
<td>常显</td>
<td>1.选择交易公司LOV带出</td>
<td>LOV:交易公司</td>
<td>EPM_PROJECT_CONTRACT.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>开票单位</td>
<td>LOV</td>
<td>开票单位</td>
<td>常显</td>
<td>1.选择开票单位LOV带出</td>
<td>LOV:法人客户</td>
<td>EPM_PROJECT_CONTRACT.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>销售渠道</td>
<td>下拉选择框</td>
<td>销售渠道</td>
<td>常显</td>
<td>1.必输；2.来源：值集AE.SALES.CHANNEL</td>
<td>值集AE.SALES.CHANNEL</td>
<td>EPM_PROJECT_CONTRACT.CHANNEL</td>
</tr>
<tr>
<td>折扣审批标准</td>
<td>下拉选择框</td>
<td>折扣审批标准</td>
<td>常显</td>
<td>1.来源：值集AE.DISC_APPROVAL_CRITERIA</td>
<td>值集AE.DISC_APPROVAL_CRITERIA</td>
<td>-</td>
</tr>
<tr>
<td>审批折扣率</td>
<td>数字框</td>
<td>审批折扣率</td>
<td>常显</td>
<td>1.精度5位小数</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>折后总金额</td>
<td>数字框</td>
<td>折后总金额</td>
<td>常显</td>
<td>1.系统计算</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>折前总金额</td>
<td>数字框</td>
<td>折前总金额</td>
<td>常显</td>
<td>1.系统计算</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>经销商毛利率</td>
<td>数字框</td>
<td>经销商毛利率</td>
<td>常显</td>
<td>1.系统计算；2.不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>事业部内结毛利率</td>
<td>数字框</td>
<td>事业部内结毛利率</td>
<td>常显</td>
<td>1.系统计算；2.不可编辑</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>集团价值链毛利率</td>
<td>数字框</td>
<td>价值链毛利率</td>
<td>常显</td>
<td>1.系统计算；2.不可编辑</td>
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
| 新建 | 新建合同 | 列表页 | 常显 | 跳转合同详情页 |
| 失效 | 发起合同失效 | 列表页行操作 | 合同有效状态=2(已生效) | 跳转合同失效页面 |
| 删除 | 删除合同 | 列表页行操作 | 审核状态=NEW | 调用delete-contract删除 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：项目必选 —— 确保合同关联有效项目</KbSubTitle>

- 第1点：合同必须关联一个已报备且有效的项目

<KbTip>前端必输校验</KbTip>

```sql
SELECT PROJECT_ID FROM EPM_PROJECT_CONTRACT WHERE CONTRACT_ID = #{contractId}
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：合同提交校验 —— 确保合同数据完整</KbSubTitle>

- 第1点：调用doContractCheck校验合同数据完整性
- 第2点：调用doCheckMotionChange校验合同变更

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
                                └──撤回──→ [已撤回 WITHDRAW]

审批通过后: 合同有效状态=2(已生效)
合同失效: 有效状态=7(失效申请中) → 3(已失效)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、保存并提交、编辑、删除 |
| RUN | 审批中 | 等待审批结果 |
| APPROVED | 已审批 | 失效、结案 |
| REJECTED | 已驳回 | 保存、保存并提交、编辑 |
| WITHDRAW | 已撤回 | 保存、保存并提交、编辑 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_PROJECT_CONTRACT（工程项目合同表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| CONTRACT_ID | Long | 合同ID(主键) | - | 自增主键 |
| ORGANIZATION_ID | Long | 组织ID | - | 当前用户事业部 |
| CONTRACT_CODE | String | 合同编码 | 合同编码 | 编码规则自动生成 |
| CONTRACT_NAME | String | 合同名称 | 合同名称 | 用户输入，必输 |
| CONTRACT_TYPE | Long | 签约方式 | 签约方式 | 1直销/2经销，经销合同固定为2 |
| PROJECT_ID | Long | 项目ID | - | 选择项目LOV |
| CUSTOMER_ID | Long | 客户ID | - | 项目带出 |
| CUSTOMER_CODE | String | 客户编码 | 客户编码 | 项目带出 |
| CUSTOMER_NAME | String | 客户名称 | 客户名称 | 项目带出 |
| SIGNED_DATE | LocalDateTime | 签订时间 | 签订时间 | 用户输入，必输 |
| CONTRACT_AMT | String | 合同总额 | 合同总额 | 用户输入 |
| VALID | Long | 有效状态 | 有效状态 | 1未审核/2有效/3失效/7失效申请中 |
| SUPPLEMENT_TYPE | Long | 增补类型 | 增补类型 | 1新增/2增补 |
| MAIN_CONTRACT_ID | Long | 主合同ID | - | 增补时记录原始合同ID |
| IS_CUSTOM | Long | 纯定制 | 纯定制 | 2=是 |
| IS_HOME | Long | 是否家装 | - | 2=家装，经销合同为非2 |
| STRATEGIC_RELATED | Long | 战略工程相关 | 战略工程相关 | 2=是 |
| TRADING_COMPANY_ID | Long | 交易公司ID | - | 选择交易公司LOV |
| TRADING_COMPANY_NAME | String | 交易公司名称 | 交易公司 | LOV带出 |
| BILLING_UNIT_ID | Long | 开票单位ID | - | 选择开票单位LOV |
| BILLING_UNIT_NAME | String | 开票单位名称 | 开票单位 | LOV带出 |
| HZ_INSTANCE_ID | Long | H0流程实例ID | - | 流程启动后写入 |
| HZ_APPROVE_STATUS | String | H0流程审批状态 | 审核状态 | NEW/RUN/APPROVED/REJECTED/WITHDRAW |
| CONTRACT_EFFECT_DATE | LocalDateTime | 合同生效时间 | 合作开始时间 | 用户输入 |
| CONTRACT_EXPIRE_DATE | LocalDateTime | 合同失效时间 | 合作结束时间 | 用户输入 |
| PROJECT_MAIN_TYPE | Long | 业主类型 | 业主类型 | 系统词汇 |
| PROJECT_CATEGORY | String | 项目分类 | 项目分类 | normal/small |
| LANDMARK_FLAG | String | 地标工程 | 地标工程 | Y/N |
| CHANNEL | Long | 渠道 | 销售渠道 | 系统词汇 |
| CURRENCY | String | 币种 | 币种 | 默认CNY |
| SERVICE_CHARGE | String | 不计服务费 | 不计服务费 | Y/N |
| OBJECT_VERSION_NUMBER | Long | 乐观锁版本号 | - | 框架自动维护 |

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
            <td style="color:#DC2626;font-weight:600;">项目数据不存在</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">关联的项目已被删除或无效，重新选择项目</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该项目已发起失效</td>
            <td style="font-size:13px;">合同失效</td>
            <td style="font-size:13px;">合同已存在失效记录，不可重复发起</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>项目数据不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>关联的项目已被删除或无效，重新选择项目</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该项目已发起失效</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>合同已存在失效记录，不可重复发起</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">合同审批通过但有效状态未变为"已生效"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>审批回调未正确触发；排查SQL：`SELECT CONTRACT_CODE, VALID, HZ_APPROVE_STATUS FROM EPM_PROJECT_CONTRACT WHERE CONTRACT_ID = #{contractId}`<br>
      <strong style="color:#7C3AED;">处理：</strong>检查HZ_INSTANCE_ID对应的流程实例状态，手动修正VALID=2
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
