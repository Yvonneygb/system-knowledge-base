<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="报备生失效申请" desc="工程管理-项目商机业务说明" />

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
项目报备（已生效）
       │
       ├──[报备失效申请]──> 新建失效申请单 ──> 提交审批 ──> 审批通过 ──> 报备状态变更为"已失效"
       │                                                              │
       │                                                              ├── 更新项目有效状态为3（已失效）
       │                                                              ├── 推送失效信息到CRM
       │                                                              └── 删除ES索引数据
       │
       └──[恢复生效申请]──> 新建恢复生效申请单 ──> 提交审批 ──> 审批通过 ──> 报备状态变更为"已生效"
                                                                      │
                                                                      ├── 更新项目有效状态为2（已生效）
                                                                      ├── 推送生效信息到CRM
                                                                      └── 推送ES索引数据
```
</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 项目报备（EPM_REPORT） | 数据依赖 | 失效/生效申请必须基于已存在的项目报备数据，审批通过后需查询报备信息推送CRM和操作ES | 项目报备数据存在 |
| 项目信息（EPM_PROJECT） | 数据依赖 | 审批通过后需更新项目有效状态字段 | 项目已创建且存在PROJECT_ID |
| 客户信息（CUSTOMER） | 数据依赖 | 推送CRM时需获取客户简称 | 报备关联的客户ID有效 |
| 编码规则（HPFM_CODE_RULE） | 配置依赖 | 新建申请单时自动生成单号，失效和恢复生效使用不同编码规则 | 编码规则已配置 |
| 工作流引擎 | 配置依赖 | 提交审批依赖工作流引擎驱动 | 工作流定义已配置 |
| CRM系统（EBS接口） | 数据依赖 | 审批通过后推送报备有效状态变更信息到CRM | 非家装单体报备失效（MONOMER_TYPE≠2） |
| ES搜索引擎 | 数据依赖 | 单体报备（REPORT_TYPE=1）审批通过后需同步ES索引：失效时删除，生效时推送 | 报备类型为单体报备 |

</KbCard>

<KbCard num="3" title="下游影响">
- 影响1：项目有效状态变更
  - 审批通过后，项目的有效状态（PROJECT_VALID）会被更新：失效申请设为3（已失效），恢复生效申请设为2（已生效）
- 影响2：CRM系统数据同步
  - 审批通过后，通过EBS接口（INDIVIREPORT_ADD）将报备有效状态变更推送到CRM系统，失效时传validStatus=0，生效时传validStatus=1
- 影响3：ES索引数据变更
  - 单体报备（REPORT_TYPE=1）审批通过后：失效时删除ES文档，恢复生效时重新推送ES文档
- 影响4：合同关联影响
  - 报备失效后，关联的项目合同中报备有效状态会同步显示为"已失效"，影响合同相关业务
---
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：失效与恢复生效共用同一实体，通过类型字段区分 TYPE区分">
<KbQuote>报备失效申请和报备恢复生效申请共用同一张表和同一个服务，通过TYPE字段区分业务类型，减少冗余代码</KbQuote>

**具体逻辑**：

- 1、TYPE=1表示报备失效申请，TYPE=2（非1）表示报备恢复生效申请
- 2、两种类型使用不同的编码规则生成单号：失效使用AE.PROJECT_DISABLE_CODE，恢复生效使用AE.PROJECT_DISABLE_ENABLE_CODE
- 3、审批通过后，根据TYPE值决定将项目有效状态更新为3（已失效）或2（已生效）
</KbCard>

<KbCard num="2" title="重点逻辑2：审批通过后的多系统联动 审批回调联动">
<KbQuote>报备有效状态变更不仅影响本系统，还需同步到CRM和ES，确保各系统数据一致</KbQuote>

**具体逻辑**：

- 1、审批通过后，首先更新项目有效状态，然后记录审批人和审批时间
- 2、非家装单体报备失效（MONOMER_TYPE≠2）时，推送报备有效状态变更信息到CRM系统
- 3、单体报备（REPORT_TYPE=1）时，失效删除ES索引数据，恢复生效推送ES索引数据
- 4、CRM推送失败不影响主流程，仅记录错误日志；ES操作失败同样仅记录日志不阻断
</KbCard>

<KbCard num="3" title="重点逻辑3：家装单体报备失效不推送CRM 家装特殊处理">
<KbQuote>家装单体报备失效（MONOMER_TYPE=2）不需要推送到CRM系统，与工程单体报备失效区分处理</KbQuote>

**具体逻辑**：

- 1、当MONOMER_TYPE=2时，跳过CRM推送逻辑
- 2、家装单体报备失效仍会执行项目有效状态更新和ES数据同步（如果报备类型为单体报备）
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：报备失效/生效申请详情页（低代码页面）">
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
<td>报备失效申请单号</td>
<td>文本框</td>
<td>系统自动生成的申请单编号</td>
<td>常显</td>
<td>新建时自动生成：失效申请使用编码规则AE.PROJECT_DISABLE_CODE，恢复生效申请使用AE.PROJECT_DISABLE_ENABLE_CODE；不可编辑</td>
<td>系统自动生成</td>
<td>EPM_PROJECT_DISABLE.PROJ_DISABLE_CODE</td>
</tr>
<tr>
<td>工程ID</td>
<td>文本框</td>
<td>关联的工程项目ID</td>
<td>常显</td>
<td>从报备项目带入；不可编辑</td>
<td>有效的工程项目ID</td>
<td>EPM_PROJECT_DISABLE.PROJECT_ID</td>
</tr>
<tr>
<td>工程编号</td>
<td>文本框</td>
<td>关联的工程项目编号</td>
<td>常显</td>
<td>从报备项目自动带出；不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.PROJECT_CODE</td>
</tr>
<tr>
<td>工程名称</td>
<td>文本框</td>
<td>关联的工程项目名称</td>
<td>常显</td>
<td>从报备项目自动带出；不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.PROJECT_NAME</td>
</tr>
<tr>
<td>申请类型</td>
<td>单选框</td>
<td>区分失效申请和恢复生效申请</td>
<td>常显</td>
<td>新建时选择：1=失效申请，2=恢复生效申请；选择后不可更改</td>
<td>1（失效）/2（恢复生效）</td>
<td>EPM_PROJECT_DISABLE.TYPE</td>
</tr>
<tr>
<td>类型</td>
<td>单选框</td>
<td>区分工程单体和家装单体</td>
<td>常显</td>
<td>从报备项目带入；2=家装单体报备失效</td>
<td>2（家装单体报备失效）</td>
<td>EPM_PROJECT_DISABLE.MONOMER_TYPE</td>
</tr>
<tr>
<td>失效申请说明</td>
<td>文本域</td>
<td>失效申请的原因说明</td>
<td>TYPE=1时显示</td>
<td>可编辑</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.REASON</td>
</tr>
<tr>
<td>恢复生效申请说明</td>
<td>文本域</td>
<td>恢复生效申请的原因说明</td>
<td>TYPE=2时显示</td>
<td>可编辑</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.ENABLE_REASON</td>
</tr>
<tr>
<td>经销商销售区域</td>
<td>文本框</td>
<td>经销商所属销售区域</td>
<td>常显</td>
<td>从报备项目带入</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.SALE_REGION</td>
</tr>
<tr>
<td>状态</td>
<td>文本框</td>
<td>单据审批状态</td>
<td>常显</td>
<td>新建=1，审批中=3，审批通过=5，审批拒绝=7，已撤回=96</td>
<td>值集HWKF.APPROVE_STATUS</td>
<td>EPM_PROJECT_DISABLE.STAT</td>
</tr>
<tr>
<td>审核人</td>
<td>文本框</td>
<td>审批通过的操作人</td>
<td>审批通过后显示</td>
<td>审批通过时自动记录当前用户名</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.AUDITOR</td>
</tr>
<tr>
<td>审核时间</td>
<td>文本框</td>
<td>审批通过的时间</td>
<td>审批通过后显示</td>
<td>审批通过时自动记录当前时间</td>
<td>-</td>
<td>EPM_PROJECT_DISABLE.AUDITTIME</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbQuote>本菜单为低代码页面，选择弹窗由低代码平台配置，无独立前端源码。</KbQuote>
</KbCard>
<KbCard title="导入">
<KbQuote>本菜单不支持批量导入功能。</KbQuote>
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 新建 | 新建报备失效/恢复生效申请单 | 列表页 | 有新建权限 | 打开新建页面，选择申请类型后填写申请信息 |
| 提交 | 提交审批 | 详情页 | 单据状态为新建时 | 启动工作流，单据状态变更为审批中 |
| 撤回 | 撤回已提交的审批 | 详情页 | 单据状态为审批中且为提交人 | 撤回工作流，单据状态变更为已撤回 |
| 查询上一次失效数据 | 查询该项目上一次失效申请记录 | 详情页 | 常显 | 调用接口/v1/{organizationId}/epm-project-disables/query-last-disable，返回该项目最近一次TYPE=1的失效记录 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：工程ID不能为空 —— 确保申请单关联有效的工程项目</KbSubTitle>

- 第1点：PROJECT_ID字段标注@NotNull，保存时框架自动校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EPM_PROJECT_DISABLE WHERE PROJECT_ID IS NULL;
```

<KbSubTitle>校验2：单据状态不能为空 —— 确保单据有明确的审批状态</KbSubTitle>

- 第1点：STAT字段标注@NotNull，保存时框架自动校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EPM_PROJECT_DISABLE WHERE STAT IS NULL;
```

<KbSubTitle>校验3：组织ID不能为空 —— 确保单据归属正确的组织</KbSubTitle>

- 第1点：ORGANIZATION_ID字段标注@NotNull，保存时框架自动校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EPM_PROJECT_DISABLE WHERE ORGANIZATION_ID IS NULL;
```

<KbSubTitle>校验4：类型（MONOMER_TYPE）不能为空 —— 确保区分工程单体和家装单体</KbSubTitle>

- 第1点：MONOMER_TYPE字段标注@NotNull，保存时框架自动校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EPM_PROJECT_DISABLE WHERE MONOMER_TYPE IS NULL;
```

</KbCard>

<KbCard title="提交校验">
<KbSubTitle>校验1：项目报备数据必须存在 —— 确保审批通过后能查询到报备信息用于推送CRM和操作ES</KbSubTitle>

- 第1点：审批通过回调（wfComplete）中，根据PROJECT_ID查询EPM_REPORT表
- 第2点：如果查询结果为空，抛出异常"项目报备数据不存在"，阻断流程

<KbTip>阻断性报错</KbTip>

```sql
SELECT EPD.PROJECT_ID, EPD.PROJ_DISABLE_CODE
    FROM EPM_PROJECT_DISABLE EPD
    LEFT JOIN EPM_REPORT ER ON EPD.PROJECT_ID = ER.PROJECT_ID
    WHERE ER.REPORT_ID IS NULL;
```

</KbCard>

<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[新建] ──提交──> [审批中] ──审批通过──> [审批通过]
  │                 │
  │                 ├──审批拒绝──> [审批拒绝]
  │                 │
  │                 ├──退回──> [退回] ──修改提交──> [审批中]
  │                 │
  │                 └──撤回──> [已撤回]
  │
  └──删除──> (删除)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 编辑、提交、删除 |
| RUN | 审批中 | 撤回 |
| APPROVED | 审批通过 | 无（终态，触发wfComplete回调） |
| REJECTED | 审批拒绝 | 重新提交 |
| RETURN | 退回 | 修改、重新提交 |
| WITHDRAW | 已撤回 | 编辑、重新提交 |
| INTERRUPT | 终止 | 无（终态） |

---

</KbCard>
<KbCard num="1" title="表1：EPM_PROJECT_DISABLE（报备失效申请表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJ_DISABLE_ID | BIGINT | 报备失效申请单ID | - | 主键，自增 |
| PROJ_DISABLE_CODE | VARCHAR | 报备失效申请单号 | 报备失效申请单号 | 新建时自动生成：TYPE=1使用编码规则AE.PROJECT_DISABLE_CODE，TYPE=2使用AE.PROJECT_DISABLE_ENABLE_CODE |
| PROJECT_ID | BIGINT | 工程ID | 工程ID | 必填，关联EPM_PROJECT.PROJECT_ID |
| PROJECT_CODE | VARCHAR | 工程编号 | 工程编号 | 从项目信息带入 |
| PROJECT_NAME | VARCHAR | 工程名称 | 工程名称 | 从项目信息带入 |
| REASON | VARCHAR | 失效申请说明 | 失效申请说明 | TYPE=1时填写 |
| STAT | BIGINT | 单据状态 | 状态 | 新建=1，审批中=3，审批通过=5，审批拒绝=7，已撤回=96 |
| WFID | BIGINT | 流程ID | - | 工作流实例ID，必填 |
| WFFLAG | BIGINT | 流程标识 | - | 工作流标识，必填 |
| CREATOR | VARCHAR | 创建人 | - | 自动记录创建人 |
| CREATETIME | DATETIME | 创建时间 | - | 自动记录创建时间 |
| UPDATOR | VARCHAR | 修改人 | - | 自动记录修改人 |
| UPDATETIME | DATETIME | 修改时间 | - | 自动记录修改时间 |
| AUDITOR | VARCHAR | 审核人 | 审核人 | 审批通过时自动记录当前用户名 |
| AUDITTIME | DATETIME | 审核时间 | 审核时间 | 审批通过时自动记录当前时间 |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 必填，租户组织ID |
| MONOMER_TYPE | BIGINT | 类型 | 类型 | 2=家装单体报备失效，其他值=工程单体报备失效；必填 |
| SALE_REGION | VARCHAR | 经销商销售区域 | 经销商销售区域 | 从报备项目带入 |
| ENABLE_REASON | VARCHAR | 恢复生效申请说明 | 恢复生效申请说明 | TYPE=2时填写 |
| TYPE | BIGINT | 生效/失效 | 申请类型 | 1=失效申请，2=恢复生效申请 |
| CREATION_DATE | DATETIME | 审计字段-创建时间 | - | 框架审计字段 |
| CREATED_BY | BIGINT | 审计字段-创建人 | - | 框架审计字段 |
| LAST_UPDATED_BY | BIGINT | 审计字段-修改人 | - | 框架审计字段 |
| LAST_UPDATE_DATE | DATETIME | 审计字段-修改时间 | - | 框架审计字段，用于queryLastDisable排序 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架字段，更新时自动递增 |

</KbCard>

<KbCard num="2" title="表2：EPM_PROJECT（项目信息表）- 相关字段">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_ID | BIGINT | 项目ID | - | 主键，报备失效申请通过此字段关联 |
| PROJECT_VALID | BIGINT | 项目有效状态 | - | 审批通过后更新：失效申请设为3，恢复生效申请设为2 |
| PROJECT_CODE | VARCHAR | 项目编码 | - | 关联字段 |
| PROJECT_NAME | VARCHAR | 项目名称 | - | 关联字段 |

</KbCard>

<KbCard num="3" title="表3：EPM_REPORT（项目报备表）- 相关字段">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| REPORT_ID | BIGINT | 报备ID | - | 主键 |
| PROJECT_ID | BIGINT | 项目ID | - | 与EPM_PROJECT_DISABLE.PROJECT_ID关联 |
| REPORT_TYPE | BIGINT | 报备类型 | - | 1=单体报备时需操作ES索引 |
| CUSTOMER_ID | BIGINT | 客户ID | - | 推送CRM时查询客户简称 |
| CUSTOMER_CODE | VARCHAR | 客户编码 | - | 推送CRM时作为acctCode |
| CUSTOMER_NAME | VARCHAR | 客户名称 | - | 推送CRM时作为acctName |
| DIVISION_NAME | VARCHAR | 事业部名称 | - | 推送CRM时作为orgCode |
| PROJECT_CODE | VARCHAR | 项目编码 | - | 推送CRM时作为reportNo |
| PROJECT_NAME | VARCHAR | 项目名称 | - | 推送CRM时作为projectName |

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
            <td style="color:#DC2626;font-weight:600;">项目报备数据不存在</td>
            <td style="font-size:13px;">审批通过回调</td>
            <td style="font-size:13px;">审批通过时根据PROJECT_ID查询EPM_REPORT表无数据。解决方案：检查项目报备数据是否被删除，或PROJECT_ID是否正确</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">推送CRM数据失败</td>
            <td style="font-size:13px;">审批通过回调</td>
            <td style="font-size:13px;">审批通过后调用EBS接口INDIVIREPORT_ADD推送报备有效状态变更到CRM失败。解决方案：检查EBS接口连通性和CRM系统状态</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">删除es数据失败</td>
            <td style="font-size:13px;">审批通过回调（失效）</td>
            <td style="font-size:13px;">失效审批通过后删除ES索引数据失败。解决方案：检查ES服务状态和索引配置</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">推送es数据失败</td>
            <td style="font-size:13px;">审批通过回调（恢复生效）</td>
            <td style="font-size:13px;">恢复生效审批通过后推送ES索引数据失败。解决方案：检查ES服务状态和索引配置</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>项目报备数据不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>审批通过时根据PROJECT_ID查询EPM_REPORT表无数据。解决方案：检查项目报备数据是否被删除，或PROJECT_ID是否正确</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>推送CRM数据失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>审批通过后调用EBS接口INDIVIREPORT_ADD推送报备有效状态变更到CRM失败。解决方案：检查EBS接口连通性和CRM系统状态</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>删除es数据失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>失效审批通过后删除ES索引数据失败。解决方案：检查ES服务状态和索引配置</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>推送es数据失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>恢复生效审批通过后推送ES索引数据失败。解决方案：检查ES服务状态和索引配置</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">审批通过后项目有效状态未变更</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>审批结果不是APPROVED，wfComplete方法中判断approveResult不等于APPROVED时直接返回true，不执行状态更新逻辑
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT EPD.PROJ_DISABLE_CODE, EPD.STAT, EPD.PROJECT_ID, EP.PROJECT_VALID
FROM EPM_PROJECT_DISABLE EPD
JOIN EPM_PROJECT EP ON EPD.PROJECT_ID = EP.PROJECT_ID
WHERE EPD.PROJ_DISABLE_ID = {申请单ID};</code></pre>
      <br>
      <strong style="color:#7C3AED;">处理：</strong>检查审批结果是否为APPROVED，确认工作流配置正确
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">家装单体报备失效后CRM未收到推送</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>MONOMER_TYPE=2时，代码中跳过了CRM推送逻辑，这是正常业务逻辑，非异常
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT EPD.PROJ_DISABLE_CODE, EPD.MONOMER_TYPE
FROM EPM_PROJECT_DISABLE EPD
WHERE EPD.MONOMER_TYPE = 2 AND EPD.TYPE = 1;</code></pre>
      <br>
      <strong style="color:#7C3AED;">处理：</strong>确认该报备确实是家装单体类型，家装单体报备失效不推送CRM是设计如此
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">恢复生效申请单号格式与失效申请单号不同</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>两种类型使用不同的编码规则：失效使用AE.PROJECT_DISABLE_CODE，恢复生效使用AE.PROJECT_DISABLE_ENABLE_CODE（格式HFSX+YY+MM+DD+3位流水号）
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT PROJ_DISABLE_CODE, TYPE FROM EPM_PROJECT_DISABLE WHERE PROJECT_ID = {项目ID} ORDER BY CREATETIME DESC;</code></pre>
      <br>
      <strong style="color:#7C3AED;">处理：</strong>检查编码规则AE.PROJECT_DISABLE_ENABLE_CODE的配置是否正确
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">审批通过后ES数据未同步</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>仅单体报备（REPORT_TYPE=1）才会操作ES数据，战略报备等其他类型不操作ES
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT EPD.PROJ_DISABLE_CODE, ER.REPORT_TYPE, ER.ES_PUSH_STATUS
FROM EPM_PROJECT_DISABLE EPD
JOIN EPM_REPORT ER ON EPD.PROJECT_ID = ER.PROJECT_ID
WHERE EPD.PROJ_DISABLE_ID = {申请单ID};</code></pre>
      <br>
      <strong style="color:#7C3AED;">处理：</strong>确认报备类型是否为单体报备（REPORT_TYPE=1），非单体报备不操作ES是正常逻辑
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
| 2025-11-20 | - | jiaqiang.fu01 | 初始创建报备失效申请功能（EpmProjectDisable实体、Controller、Service、Repository） |
</KbCard>
</div>
</div>
</div>
