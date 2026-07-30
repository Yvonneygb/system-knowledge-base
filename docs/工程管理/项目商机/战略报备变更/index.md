<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="9" title="战略报备变更" desc="工程管理-项目商机业务说明" />

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
战略项目报备(已通过) ──→ 发起战略报备变更 ──→ 选择项目并填写变更原因
                                                    │
                                                    ├── 选择经销商调整(新增/失效/恢复生效)
                                                    ├── 选择网点调整(新增/失效/恢复生效)
                                                    └── 上传附件
                                                    │
                                                    ▼
                                              保存/保存并提交
                                                    │
                                                    ▼
                                           推送OA审批(战略报备变更)
                                                    │
                                            ┌───────┴───────┐
                                            ▼               ▼
                                        OA审批通过      OA审批拒绝
                                            │               │
                                            ▼               ▼
                                    审批完成回调         审批拒绝回调
                                    (更新经销商/网点)    (更新回调来源)
                                            │
                                            ▼
                                    同步更新项目授权经销商
                                    同步更新报备授权经销商
                                    同步更新报备网点信息
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 战略项目报备 | 数据依赖 | 变更基于已通过的报备数据，获取当前经销商和网点列表 | 项目报备状态为"二次报备通过"或家装报备已审批通过 |
| OA审批系统 | 配置依赖 | 推送审批单据到OA，需配置OA单据映射（战略报备变更/家装战略报备经销商变更/家装战略网点分配变更） | OA_BILL_REF表中存在对应单据名称配置 |
| 经销商主数据 | 数据依赖 | 变更时需查询经销商信息（编码、名称、经办人、电话） | 经销商ID有效 |
| 值集配置 | 配置依赖 | 调整类型值集(AE.EPM.AUTH_ECN_TYPE)、产品线、公司性质等 | 值集已配置且生效 |

</KbCard>

<KbCard num="3" title="下游影响">

- 影响1：项目授权经销商变更
  - 审批通过后，新增的经销商写入项目授权表和报备授权表；失效的经销商标记禁用；恢复生效的经销商取消禁用

- 影响2：报备网点信息变更
  - 审批通过后，新增的网点写入报备网点表；失效的网点标记禁用；恢复生效的网点取消禁用

- 影响3：意向单校验
  - 失效经销商时，若该经销商存在已审核的意向单，则阻断失效操作

---

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：变更类型区分 多场景共用">

- **业务意义**：同一套代码支撑工程战略变更、家装战略变更、家装网点分配变更、家装单体报备变更四种场景，通过变更类型字段区分

- 具体逻辑描述

  - 第1点：变更类型为1或空时，为工程战略变更，附件对象类型为8070，审批通过后更新项目授权经销商和报备授权经销商

  - 第2点：变更类型为2时，为家装战略变更，附件对象类型为9006，审批通过后更新报备授权经销商

  - 第3点：变更类型为3时，为家装战略网点分配/变更，附件对象类型为9007，审批通过后更新报备网点信息

  - 第4点：变更类型为4时，为家装单体报备变更，附件对象类型为9008，根据单体变更类型区分变更附件或变更网点

</KbCard>

<KbCard num="2" title="重点逻辑2：审批通过后经销商/网点同步 核心逻辑">

- **业务意义**：审批通过后需将变更内容同步到正式的授权表，确保经销商和网点数据与变更一致

- 具体逻辑描述

  - 第1点：调整类型为"新增"时，在项目授权表和报备授权表中插入新记录（禁用标记为1-未禁用）

  - 第2点：调整类型为"失效"时，先校验该经销商是否存在已审核的意向单，若存在则报错阻断；校验通过后将项目授权表和报备授权表中对应记录的禁用标记更新为2

  - 第3点：调整类型为"恢复生效"时，将项目授权表和报备授权表中对应记录的禁用标记更新为1

  - 第4点：家装网点变更场景下，调整类型为"新增"时在报备网点表插入新记录；为"失效"时将禁用标记更新为2；为"恢复生效"时将禁用标记更新为1

</KbCard>

<KbCard num="3" title="重点逻辑3：OA审批推送与回调 外部集成">

- **业务意义**：变更单提交后推送OA审批，OA审批结果通过回调接口回写

- 具体逻辑描述

  - 第1点：工程战略变更推送OA单据名称为"战略报备变更"，家装战略变更推送"家装战略报备经销商变更"，家装网点分配变更推送"家装战略网点分配/变更"

  - 第2点：OA回调时，若最终审批人标记为Y且结果为"同意"，则设置回调来源为OA_PASS；若结果非"同意"，则设置为OA_REJECT

  - 第3点：家装战略变更的OA回调不判断最终审批人标记，直接根据审批结果设置回调来源

  - 第4点：回调后更新回调来源字段，等待条件扫描后触发后续业务逻辑

---

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="界面模块1：战略报备变更详情页（家装战略网点分配/变更）">

> 前端页面组件：StrategicNetworkPoints，路由：/strategic-network-points/add 和 /strategic-network-points/details/:checkBxId
> 工程战略报备变更列表页为低代码页面（hlod），无独立前端源码

<KbSubTitle>单据详情区域</KbSubTitle>

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
<td>变更单号</td>
<td>文本框</td>
<td>系统自动生成的变更单编码</td>
<td>常显</td>
<td>保存时按编码规则AE.PROJECT_AUTH_ECN_CODE自动生成，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_AUTH_ECN.PROJECT_AUTH_ECN_CODE</td>
</tr>
<tr>
<td>战略家装编码</td>
<td>LOV选择</td>
<td>关联的战略项目</td>
<td>新建时可编辑，提交后不可编辑</td>
<td>LOV：PRO_EPM_PROJECT，查询参数searchFlag=151，hzApproveStatus=APPROVED；选择后自动带出项目信息</td>
<td>项目审批通过的战略项目</td>
<td>EPM_PROJECT_AUTH_ECN.PROJECT_ID</td>
</tr>
<tr>
<td>申报日期</td>
<td>文本框</td>
<td>项目报备时间</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.REPORT_TIME</td>
</tr>
<tr>
<td>单据状态</td>
<td>文本框</td>
<td>当前审批状态</td>
<td>常显</td>
<td>默认NEW，值集HWKF.APPROVE_STATUS，不可编辑</td>
<td>NEW/RUN/APPROVED/REJECTED/WITHDRAW/INTERRUPT</td>
<td>EPM_PROJECT_AUTH_ECN.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>产品线</td>
<td>文本框</td>
<td>项目所属产品线</td>
<td>常显</td>
<td>从所选项目自动带出，值集AE.EPM.PDT_LINE，不可编辑</td>
<td>值集AE.EPM.PDT_LINE内生效项</td>
<td>EPM_PROJECT.PDT_LINE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>项目交易公司名称</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>竞争展品</td>
<td>文本框</td>
<td>项目竞争品牌</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.COMPETITIVE_BRAND</td>
</tr>
<tr>
<td>合作区域</td>
<td>文本框</td>
<td>项目合作区域</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.COOPERATION_AREA</td>
</tr>
<tr>
<td>审批经办人意见</td>
<td>文本框</td>
<td>审批经办人意见</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.AGENT_OPINION</td>
</tr>
<tr>
<td>审批经办人</td>
<td>文本框</td>
<td>审批经办人</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.AGENT</td>
</tr>
<tr>
<td>战略合作范围涉及区域</td>
<td>文本框</td>
<td>战略合作范围涉及区域</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.STRAC_COOP_INV_REGION</td>
</tr>
</tbody></table></div>
<KbSubTitle>家装公司信息区域</KbSubTitle>

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
<td>公司名称</td>
<td>文本框</td>
<td>家装公司名称</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.PROJECT_NAME</td>
</tr>
<tr>
<td>公司性质</td>
<td>文本框</td>
<td>公司性质</td>
<td>常显</td>
<td>从所选项目自动带出，值集AE.EPM.NATUREB_USINESS，不可编辑</td>
<td>值集AE.EPM.NATUREB_USINESS内生效项</td>
<td>EPM_PROJECT.NATUREB_USINESS</td>
</tr>
<tr>
<td>业务范围</td>
<td>文本框</td>
<td>业务范围</td>
<td>常显</td>
<td>从所选项目自动带出，值集AE.EPM.LINE_BUSINESS，不可编辑</td>
<td>值集AE.EPM.LINE_BUSINESS内生效项</td>
<td>EPM_PROJECT.LINE_BUSINESS</td>
</tr>
<tr>
<td>背景关系</td>
<td>文本框</td>
<td>背景关系</td>
<td>常显</td>
<td>从所选项目自动带出，值集AE.EPM.BACKGROUND，不可编辑</td>
<td>值集AE.EPM.BACKGROUND内生效项</td>
<td>EPM_PROJECT.BACKGROUND</td>
</tr>
<tr>
<td>总部所在地</td>
<td>文本框</td>
<td>总部所在地区域全名</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.AREA_FULL_NAME</td>
</tr>
<tr>
<td>详细地址</td>
<td>文本框</td>
<td>详细地址</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑；右侧有地图按钮可查看</td>
<td>-</td>
<td>EPM_PROJECT.ADDRESS</td>
</tr>
<tr>
<td>总部联系人</td>
<td>文本框</td>
<td>总部联系人</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.OWN_FOLLOWER</td>
</tr>
<tr>
<td>联系人职务</td>
<td>文本框</td>
<td>联系人职务</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.FOLLOW_PEOPLE_DUTY</td>
</tr>
<tr>
<td>联系人电话</td>
<td>文本框</td>
<td>联系人电话</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.OWN_FOLLOWER_PHONE</td>
</tr>
<tr>
<td>年销售额</td>
<td>数值框</td>
<td>预测销售金额（万元）</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑，后缀"万元"</td>
<td>-</td>
<td>EPM_PROJECT.PREDICT_SALES_AMOUNT</td>
</tr>
<tr>
<td>意向产品</td>
<td>文本框</td>
<td>意向产品</td>
<td>常显</td>
<td>从所选项目自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT.INTENT_PRODUCT</td>
</tr>
<tr>
<td>变更原因</td>
<td>文本框</td>
<td>申请变更的原因</td>
<td>常显</td>
<td>必填，可编辑</td>
<td>-</td>
<td>EPM_PROJECT_AUTH_ECN.REASON</td>
</tr>
</tbody></table></div>
<KbSubTitle>分配经销商表格</KbSubTitle>

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
<td>经销编码</td>
<td>文本框</td>
<td>变更前原经销商编码</td>
<td>常显</td>
<td>从项目报备授权经销商自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_AUTH_ECN_ORIGINAL.CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框</td>
<td>变更前原经销商名称</td>
<td>常显</td>
<td>从项目报备授权经销商自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_AUTH_ECN_ORIGINAL.CUSTOMER_NAME</td>
</tr>
<tr>
<td>经办人</td>
<td>文本框</td>
<td>经销商经办人</td>
<td>常显</td>
<td>从报备授权表关联查询，不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH.CONTACT</td>
</tr>
<tr>
<td>经办人电话</td>
<td>文本框</td>
<td>经销商经办人电话</td>
<td>常显</td>
<td>从报备授权表关联查询，不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH.TELE</td>
</tr>
<tr>
<td>已失效</td>
<td>下拉选择</td>
<td>经销商是否已失效</td>
<td>常显</td>
<td>值集AE.ITEM_CALSS_R_ITEMUSABLE，2=已失效，非2=未失效</td>
<td>值集AE.ITEM_CALSS_R_ITEMUSABLE</td>
<td>EPM_PROJECT_AUTH_ECN_ORIGINAL.DISABLED</td>
</tr>
</tbody></table></div>
<KbSubTitle>网点调整表格</KbSubTitle>

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
<td>调整类型</td>
<td>下拉选择</td>
<td>网点调整操作类型</td>
<td>常显</td>
<td>值集AE.EPM.AUTH_ECN_TYPE（1=失效，2=新增，3=恢复生效），不可编辑</td>
<td>值集AE.EPM.AUTH_ECN_TYPE</td>
<td>EPM_REPORT_AUTH_BRANCH_ECN.AUTH_ECN_TYPE</td>
</tr>
<tr>
<td>网点编码</td>
<td>文本框</td>
<td>网点编码</td>
<td>常显</td>
<td>不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH_BRANCH_ECN.BRANCH_MESSAGE_CODE</td>
</tr>
<tr>
<td>网点名称</td>
<td>文本框</td>
<td>网点名称</td>
<td>常显</td>
<td>不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH_BRANCH_ECN.BRANCH_MESSAGE_NAME</td>
</tr>
<tr>
<td>备注</td>
<td>数值框</td>
<td>行备注</td>
<td>常显</td>
<td>不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH_BRANCH_ECN.REMARK</td>
</tr>
</tbody></table></div>
<KbSubTitle>当前网点表格</KbSubTitle>

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
<td>网点编码</td>
<td>文本框</td>
<td>当前网点编码</td>
<td>常显</td>
<td>从项目报备网点信息自动带出，不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH_BRANCH.BRANCH_MESSAGE_CODE</td>
</tr>
<tr>
<td>网点名称</td>
<td>文本框</td>
<td>当前网点名称</td>
<td>常显</td>
<td>从项目报备网点信息自动带出，不可编辑</td>
<td>-</td>
<td>EPM_REPORT_AUTH_BRANCH.BRANCH_MESSAGE_NAME</td>
</tr>
<tr>
<td>已失效</td>
<td>下拉选择</td>
<td>网点是否已失效</td>
<td>常显</td>
<td>值集AE.ITEM_CALSS_R_ITEMUSABLE，2=已失效</td>
<td>值集AE.ITEM_CALSS_R_ITEMUSABLE</td>
<td>EPM_REPORT_AUTH_BRANCH.DISABLED</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard num="2" title="选择弹窗">

<KbSubTitle>弹窗1：战略家装编码LOV</KbSubTitle>


| 入参 | | | | 数据范围 | 单选/多选 |
|------|------|------|------|---------|---------|
| 字段名 | 中文名 | 释义 | 示例 | | |
| searchFlag | 搜索标记 | 固定值151，筛选家装战略项目 | 151 | | |
| organizationId | 组织ID | 当前用户所属部门组织ID | 1001 | | |
| hzApproveStatus | 审批状态 | 固定值APPROVED，仅显示已审批通过的项目 | APPROVED | SELECT * FROM EPM_PROJECT WHERE HZ_APPROVE_STATUS = 'APPROVED' AND SEARCH_FLAG = 151 | 单选 |

> 选择后自动调用get-report-auth接口，带出该项目的经销商授权列表和网点信息

</KbCard>

<KbCard num="3" title="导入">

> 无导入功能

</KbCard>

<KbCard num="4" title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 保存 | 保存变更单数据 | 详情页Header | 单据状态为NEW/REBUT/REJECT时可点击；权限编码：strategic.network.points.to.do.head.save-todo | 调用/v1/{organizationId}/epm-project-auth-ecns/save接口，保存头信息、原经销商列表、网点调整列表、附件 |
| 提交 | 保存并提交审批 | 详情页Header | 单据状态为NEW/REBUT/REJECT时可点击；权限编码：strategic.network.points.to.do.head.submit-todo | 调用/v1/{organizationId}/epm-project-auth-ecns/save-and-submit接口，先保存再启动工作流 |

</KbCard>

<KbCard title="保存校验">

<KbSubTitle>网点调整至少一行 —— 确保变更单有实际调整内容</KbSubTitle>


  - 详细逻辑

    - 第1点：保存时校验reportAuthBranchEcnList不能为空

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT COUNT(*) FROM EPM_REPORT_AUTH_BRANCH_ECN WHERE PROJECT_AUTH_ECN_ID = {变更单ID};
    ```

<KbSubTitle>项目ID不能为空 —— 确保关联了有效的战略项目</KbSubTitle>


  - 详细逻辑

    - 第1点：获取报备授权时校验projectId不能为空

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT * FROM EPM_PROJECT_AUTH_ECN WHERE PROJECT_AUTH_ECN_ID = {变更单ID} AND PROJECT_ID IS NULL;
    ```

</KbCard>

<KbCard title="提交校验">

<KbSubTitle>失效经销商存在已审核意向单时阻断 —— 防止有业务往来的经销商被误失效</KbSubTitle>


  - 详细逻辑

    - 第1点：审批通过后执行doUpdateProjectAuth时，若调整类型为失效(1)且该经销商存在项目意向=2且审批状态=APPROVED的意向单，则报错

  - 系统体现：阻断性报错，提示"失效经销商存在有意向单，失效失败！"

  - 排查SQL：

    ```sql
    SELECT s.* FROM SA_OUT_BILL_HEAD s
    INNER JOIN EPM_PROJECT_AUTH_ECN_LINE l ON s.CUSTOMER_ID = l.CUSTOMER_ID
    WHERE l.PROJECT_AUTH_ECN_ID = {变更单ID}
    AND l.AUTH_ECN_TYPE = 1
    AND s.PROJECT_INTENTION = 2
    AND s.HZ_APPROVE_STATUS = 'APPROVED';
    ```

</KbCard>

<KbCard num="7" title="状态机">

<KbSubTitle>状态机流转图</KbSubTitle>


```text
NEW(新建) ──→ 保存 ──→ NEW(新建)
  │
  └──→ 保存并提交 ──→ RUN(审批中) ──→ OA审批
                                            │
                                    ┌───────┴───────┐
                                    ▼               ▼
                              APPROVED(审批通过)  REJECTED(审批拒绝)
                                    │               │
                                    ▼               ▼
                            更新经销商/网点      可重新提交
                                    │
                                    ▼
                              REBUT(已驳回) ──→ 可重新编辑提交
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 保存、保存并提交 |
| RUN | 审批中 | 等待OA审批结果回调 |
| APPROVED | 审批通过 | 查看（不可编辑） |
| REJECTED | 审批拒绝 | 重新编辑、保存并提交 |
| REBUT | 已驳回 | 重新编辑、保存并提交 |
| WITHDRAW | 已撤回 | 重新编辑、保存并提交 |
| INTERRUPT | 终止 | 查看（不可编辑） |

---

</KbCard>

<KbCard num="1" title="表1：EPM_PROJECT_AUTH_ECN（战略经销商变更主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ORGANIZATION_ID | LONG | 组织ID | - | 必填，创建时带入 |
| PROJECT_AUTH_ECN_ID | LONG | 战略经销商变更单ID | - | 主键，自增 |
| PROJECT_AUTH_ECN_CODE | VARCHAR | 战略经销商变更单编码 | 变更单号 | 按编码规则AE.PROJECT_AUTH_ECN_CODE自动生成 |
| PROJECT_ID | LONG | 战略项目ID | 战略家装编码 | 必填，LOV选择项目带入 |
| REASON | VARCHAR | 申请原因 | 变更原因 | 手动填写 |
| STAT | LONG | 单据状态(已弃用) | - | 已弃用，使用HZ_APPROVE_STATUS |
| WFID | LONG | 流程ID | - | 必填，工作流实例ID |
| WFFLAG | LONG | 流程状态 | - | 必填，工作流状态标记 |
| AUDITTIME | DATE | 审核时间 | - | 审核通过时记录 |
| CREATOR | VARCHAR | 创建人(申请人) | - | 系统自动记录 |
| CREATETIME | DATE | 创建时间 | - | 系统自动记录 |
| UPDATOR | VARCHAR | 修改人 | - | 系统自动记录 |
| UPDATETIME | DATE | 修改时间 | - | 系统自动记录 |
| ECN_TYPE | LONG | 变更类型 | - | 必填，1/空=工程战略变更，2=家装战略变更，3=家装网点分配变更，4=家装单体报备变更 |
| CHANGE_TYPE | LONG | 单体变更类型 | - | 必填，1=变更附件，2=变更网点（仅ecnType=4时有效） |
| HZ_INSTANCE_ID | LONG | 工作流实例ID | - | 提交工作流后回写 |
| HZ_APPROVE_STATUS | VARCHAR | 工作流审批状态 | 单据状态 | 值集HWKF.APPROVE_STATUS |
| CALLBACK_SOURCE | VARCHAR | 外部审批回调来源 | - | 枚举：WAIT/OA_PASS/OA_REJECT/FSSC_PASS/FSSC_REJECT |

</KbCard>

<KbCard num="2" title="表2：EPM_PROJECT_AUTH_ECN_ORIGINAL（战略报备变更前原经销商列表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_AUTH_ECN_ID | LONG | 战略经销商变更单ID | - | 必填，关联主表 |
| SEQ | LONG | 序号 | 序号 | 必填，按1递增 |
| CUSTOMER_ID | LONG | 经销商ID | - | 必填，从报备授权带入 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销编码 | 从报备授权带入 |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | 经销商名称 | 从报备授权带入 |
| DISABLED | LONG | 是否失效 | 已失效 | 必填，2=已失效，非2=未失效 |
| PK_ID | LONG | 主键 | - | 自增主键 |

</KbCard>

<KbCard num="3" title="表3：EPM_PROJECT_AUTH_ECN_LINE（战略经销商变更明细信息）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_AUTH_ECN_ID | LONG | 战略经销商变更单ID | - | 必填，关联主表 |
| PROJECT_AUTH_ECN_LINE_ID | LONG | 战略经销商变更单行ID | - | 主键，自增 |
| SEQ | LONG | 序号 | 序号 | 必填 |
| AUTH_ECN_TYPE | LONG | 调整类型 | 调整类型 | 必填，值集AE.EPM.AUTH_ECN_TYPE：1=失效，2=新增，3=恢复生效 |
| CUSTOMER_ID | LONG | 经销商ID | - | 必填 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销商编码 | - |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | 经销商名称 | - |
| REMARK | VARCHAR | 行备注 | 备注 | - |

</KbCard>

<KbCard num="4" title="表4：EPM_REPORT_AUTH_BRANCH_ECN（家装战略报备网点变更）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_AUTH_ECN_ID | LONG | 战略经销商变更单ID | - | 必填，关联主表 |
| BRANCH_MESSAGE_ID | LONG | 网点ID | - | 必填 |
| BRANCH_MESSAGE_CODE | VARCHAR | 网点编码 | 网点编码 | - |
| BRANCH_MESSAGE_NAME | VARCHAR | 网点名称 | 网点名称 | - |
| REL_CUSTOMER_CODE | VARCHAR | 对应经销商编码 | - | 网点所属经销商 |
| AUTH_ECN_TYPE | LONG | 调整类型 | 调整类型 | 必填，值集AE.EPM.AUTH_ECN_TYPE：1=失效，2=新增，3=恢复生效 |
| REMARK | VARCHAR | 行备注 | 备注 | - |
| PK_ID | LONG | 主键 | - | 自增主键 |

</KbCard>

<KbCard num="5" title="表5：EPM_PROJECT_AUTH（工程项目授权）- 关联表">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_ID | LONG | 项目ID | - | 关联项目 |
| CUSTOMER_ID | LONG | 经销商ID | - | 必填 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | - | - |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | - | - |
| DISABLED | LONG | 禁用标记 | - | 必填，2=禁用，1=未禁用 |
| PK_ID | LONG | 主键 | - | 自增主键 |

</KbCard>

<KbCard num="6" title="表6：EPM_REPORT_AUTH（项目报备经销商授权）- 关联表">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | LONG | 主键 | - | 自增主键 |
| REPORT_ID | LONG | 报备ID | - | 必填 |
| CUSTOMER_ID | LONG | 经销商ID | - | 必填 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | - | - |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | - | - |
| DISABLED | LONG | 禁用标记 | - | 必填，2=禁用 |
| CONTACT | VARCHAR | 经办人 | 经办人 | - |
| TELE | VARCHAR | 经办人电话 | 经办人电话 | - |

</KbCard>

<KbCard num="7" title="表7：EPM_REPORT_AUTH_BRANCH（经销商网点信息）- 关联表">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| REPORT_ID | LONG | 报备ID | - | 关联报备 |
| REL_CUSTOMER_CODE | VARCHAR | 对应经销商编码 | - | 网点所属经销商 |
| BRANCH_MESSAGE_ID | LONG | 网点ID | - | 必填 |
| DISABLED | LONG | 禁用标记 | - | 必填，2=禁用 |
| PK_ID | LONG | 主键 | - | 自增主键 |

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
<colgroup><col style="width:27%"><col style="width:18%"><col style="width:40%"><col style="width:15%"></colgroup>
<thead><tr><th>报错信息</th><th>提示节点</th><th>根因与排查方向</th><th>等级</th></tr></thead>
<tbody>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请至少维护一行网点调整</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">未填写网点调整明细行，需至少添加一行网点调整数据</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">项目ID不能为空!</td>
            <td style="font-size:13px;">获取报备授权</td>
            <td style="font-size:13px;">未选择战略项目，需先选择战略家装编码</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">主键不能为空!</td>
            <td style="font-size:13px;">查看详情</td>
            <td style="font-size:13px;">详情查询时未传入变更单主键ID</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">OA回传单号不存在，请检查！</td>
            <td style="font-size:13px;">OA审批回调</td>
            <td style="font-size:13px;">OA回调时根据ID查不到变更单记录，可能数据被删除或ID传递错误</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">失效经销商存在有意向单，失效失败！</td>
            <td style="font-size:13px;">审批通过后同步</td>
            <td style="font-size:13px;">失效的经销商存在已审核的意向单，不允许失效该经销商</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
</tbody></table></div>
</KbCard>

<KbCard title="常见问题">

- 问题1：变更单保存后经销商列表为空
  - 原因：选择战略家装编码后未触发handleBeforeSelect回调，导致报备授权数据未加载。排查SQL：
    ```sql
    SELECT * FROM EPM_REPORT_AUTH WHERE REPORT_ID = (SELECT REPORT_ID FROM EPM_PROJECT WHERE PROJECT_ID = {项目ID});
    ```
  - 解决思路：确认LOV选择后onBeforeSelect事件正常触发，检查get-report-auth接口返回数据

- 问题2：OA审批通过后经销商状态未更新
  - 原因：OA回调未成功写入CALLBACK_SOURCE字段，或等待条件扫描未触发。排查SQL：
    ```sql
    SELECT PROJECT_AUTH_ECN_ID, HZ_APPROVE_STATUS, CALLBACK_SOURCE FROM EPM_PROJECT_AUTH_ECN WHERE PROJECT_AUTH_ECN_ID = {变更单ID};
    ```
  - 解决思路：检查OA回调接口是否正常调用，确认CALLBACK_SOURCE已更新为OA_PASS，检查工作流完成事件wfComplete是否触发

- 问题3：家装战略变更OA推送失败
  - 原因：OA_BILL_REF表中缺少对应单据名称配置。排查SQL：
    ```sql
    SELECT * FROM OA_BILL_REF WHERE BILL_NAME IN ('战略报备变更', '家装战略报备经销商变更', '家装战略网点分配/变更');
    ```
  - 解决思路：在OA_BILL_REF表中补充缺失的单据名称和OA单据ID映射

---

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
| 2026-05-11 | 4b9b8f10e | 贺凤新 | [FIX] 增加详情列表复制 |
| 2026-04-21 | 095b3d68a | 贺凤新 | [FIX] 修改 |
| 2026-04-20 | 1e4fa33ce | June_Fu | [FIX] 暂时去掉权限控制(家装战略网点分配/变更等) |
| 2026-04-19 | 252fc5240 | YD | 设置接口登录可访问 |
| 2026-04-11 | 1ab45cebb | 贺凤新 | [FIX] 权限按钮调整 |
| 2026-04-02 | 994e16a35 | 扶佳强 | [IMP]家装战略网点分配/变更详情查询 |
| 2026-03-25 | 169845785 | 扶佳强 | [IMP]家装战略网点分配/变更保存提交 |
| 2026-03-25 | d820f0ead | 扶佳强 | [IMP]家装战略网点分配/变更保存提交 |
| 2026-03-25 | fa288121a | 扶佳强 | [IMP]家装战略网点分配/变更保存提交 |
| 2026-03-25 | 595a2131f | 扶佳强 | [IMP]家装战略网点分配/变更保存 |
| 2026-03-25 | ecda7fef4 | 永明丁 | bug问题修复 |
| 2026-03-25 | 844ef8dd4 | 永明丁 | 发文管理和战略接口 |
| 2026-03-24 | b7f4c1f44 | 永明丁 | 发文管理 |
| 2026-03-24 | 8c860c66f | 永明丁 | 战略网点 |
| 2026-03-17 | f1b7b1e41 | TanZhuoxiong | #ITSM-20250806016 bug修复 |
| 2026-03-05 | 4c08ce306 | 扶佳强 | [IMP]战略报备经销商变更 |
| 2026-03-03 | 9fcaf2b6b | 扶佳强 | [IMP]家装单体报备变更 |
| 2026-02-27 | 52e3a27f8 | 扶佳强 | [IMP]家装战略经销商变更 |
| 2026-02-10 | 7e958f428 | 扶佳强 | [IMP]家装战略网点分配/变更 |
| 2026-02-09 | 6e99d5f56 | 扶佳强 | [IMP]家装单体报备变更 |
| 2026-02-08 | 3d8f20e70 | 扶佳强 | [IMP]变更报备附件 |
| 2026-02-06 | 6441582dd | 扶佳强 | [IMP]家装战略经销商变更 |
| 2026-02-06 | 5f4fa2dc1 | 扶佳强 | [IMP]家装战略经销商变更 |
| 2026-02-05 | e556265aa | 扶佳强 | [IMP]家装战略报备变更OA回调 |
| 2026-02-05 | 455d62c55 | 扶佳强 | [IMP]家装战略报备变更推送OA |
| 2026-01-14 | 847dca44e | 扶佳强 | [IMP]战略报备变更 |
</KbCard>
</div>
</div>
</div>
