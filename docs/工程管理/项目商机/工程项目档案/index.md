<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="工程项目档案" desc="工程管理-项目商机业务说明" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="1.1 整体流程">

```
项目报备审核通过 → 写入/更新项目档案(EPM_PROJECT) → 项目生效
    ↓
项目进度更新 → 更新项目档案进度阶段
    ↓
项目有效期超期/进度超时 → 系统自动冻结项目档案
    ↓
项目解冻申请 → 审批通过 → 解冻项目档案
    ↓
项目失效申请 → 审批通过 → 项目失效
    ↓
项目恢复生效 → 审批通过 → 项目恢复
    ↓
项目合同签订确认 → 回写合同信息至项目档案
```

</KbCard>

<KbCard num="2" title="1.2 核心流程节点">

| 节点 | 触发方式 | 操作对象 | 说明 |
|------|---------|---------|------|
| 报备审核写入档案 | 报备审批通过 | EPM_PROJECT | 首次报备INSERT，二次报备UPDATE |
| 进度更新写入档案 | 进度更新审批通过 | EPM_PROJECT | 更新STAGE_ID/STAGE_NAME/STAGE_DESC |
| 解冻写入档案 | 解冻审批通过 | EPM_PROJECT | 更新PROJECT_VALID=2，FREEZE_TYPE=0 |
| 失效写入档案 | 失效审批通过 | EPM_PROJECT | 更新PROJECT_VALID=3 |
| 恢复生效写入档案 | 恢复审批通过 | EPM_PROJECT | 更新PROJECT_VALID=2 |
| 合同回写档案 | 合同签订确认 | EPM_PROJECT | 回写CONTRACT_CODE/CONTRACT_AMOUNT等 |

</KbCard>

<KbCard num="3" title="1.3 项目有效状态流转">

```
1(未生效) → 2(已生效) → 4(已冻结) → 2(已生效,解冻)
                      → 3(已失效) → 2(已生效,恢复)

已冻结细分状态(前端展示):
6=解冻草稿  7=解冻拒绝  8=解冻申请中
9=已冻结(有效期内未签合同,freezeType=1)
10=已冻结(进度更新超时,freezeType=2)
12=已冻结(有效期内已签合同,freezeType=4)
```

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="1 报备审核写入项目档案">

- **首次报备**：报备审核通过后，将报备数据转换为项目档案数据INSERT到EPM_PROJECT，设置PROJECT_VALID=2(已生效)，计算有效期VALID_START_DATE=当前时间，VALID_END_DATE=VALID_START_DATE+项目有效周期天数
- **二次报备**：报备审核通过后，根据PROJECT_ID查询已有项目档案并UPDATE，更新报备时间、阶段、交易公司、甲乙方、项目名称等字段
- **字段校验**：写入前检查EPM_PROJECT表是否存在报备表缺少的字段，若缺失则抛错"项目档案表（epm_project）缺失以下字段：xxx"
- **项目授权同步**：审核通过后，先删除该项目原有授权记录，再批量插入新的授权记录
- **乙方信息同步**：审核通过后，先删除该项目原有乙方记录，再批量插入新的乙方记录

</KbCard>

<KbCard num="2" title="2 项目进度更新写入档案">

- **阶段变更校验**：新阶段序号必须大于等于旧阶段序号，否则抛错"阶段更新，只能前进，不能后退"
- **并发校验**：若单据中当前进度与项目档案中的进度不一致（即单据记录的旧进度 < 档案中实际进度），抛错"项目进度已变更，请驳回重审!"
- **更新字段**：STAGE_DESC、STAGE_ID、STAGE_NAME、STAGE_NOTE
- **阶段历程记录**：每次阶段变更同时INSERT一条EPM_PROJECT_STAGE记录

</KbCard>

<KbCard num="3" title="3 项目冻结机制">

- **自动冻结**：系统定时任务检测项目有效期超期或进度更新超时，自动将PROJECT_VALID置为4(已冻结)，记录FREEZE_TYPE和FREEZE_TIME
- **冻结类型**：1=超项目有效期(有效期内未签合同)；2=进度超时更新；4=有效期内已签合同但超期
- **有效周期**：通过系统参数Proj_Effective_Cycle配置项目有效期限天数

</KbCard>

<KbCard num="4" title="4 项目解冻逻辑">

- 解冻申请审批通过后，更新项目档案：PROJECT_VALID=2(已生效)，FREEZE_TYPE=0，记录UNFREEZE_TIME
- 解冻时若进度阶段与档案不一致，同步更新档案进度

</KbCard>

<KbCard num="5" title="5 项目失效/恢复逻辑">

- **失效**：失效申请审批通过后，PROJECT_VALID=3(已失效)，记录CHANGE_VALID_USER/CHANGE_VALID_TIME/CHANGE_VALID_REASON
- **恢复生效**：恢复申请审批通过后，PROJECT_VALID=2(已生效)，重新计算有效期

</KbCard>

<KbCard num="6" title="6 合同信息回写">

- 项目合同签订确认时，回写以下字段至项目档案：CONTRACT_CODE、CONTRACT_AMOUNT、PERFORMANCE_SECURITY、GUARANTEE_AMOUNT、GUARANTEE_PERIOD、CONTRACT_SIGNUP_DATE、PERIOD_START_DATE、PERIOD_END_DATE

</KbCard>

<KbCard num="7" title="7 折扣校验配置中的项目档案标识">

- 折扣校验配置C1/C2规则中，PROJECT_ARCHIVE字段标识是否为本地项目档案(1=异地,2=本地)，影响折扣校验逻辑

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="3.1 报备审核写入档案 - 详细">

**入口**：`EpmReportServiceImpl.doAudit()`

**步骤**：
1. 查询报备主记录 `epmReportRepository.selectByPrimaryKey(reportId)`
2. 避免重复审核：若AUDITTIME不为空则直接返回
3. 判断首次/二次报备：`isUpdateProj = epmReport.getReportTimes() > 1`
4. 检查EPM_PROJECT表字段完整性：`epmReportRepository.selectMissingProjectFields()`
5. 设置审核人和审核时间
6. 首次报备：
   - 将报备数据转换为EpmProject对象
   - 设置HZ_APPROVE_STATUS=APPROVED
   - 获取项目有效周期天数(系统参数Proj_Effective_Cycle)
   - 设置VALID_START_DATE=当前时间，VALID_END_DATE=VALID_START_DATE+有效周期+1天
   - 设置PROJECT_VALID=2(已生效)，FREEZE_TYPE=0
   - INSERT到EPM_PROJECT
   - 回写projectId到报备记录
7. 二次报备：
   - 根据projectId查询已有项目档案
   - 逐字段更新：REPORT_TIME、STAGE_NAME、TRADING_COMPANY_ID/NAME、MANAGER、PDT_LINE、OPERATING_MODE、甲乙方信息、PROJECT_NAME、STRATEGIC_STAGE、PROJECT_TYPE、BACKGROUND、预测信息、INTENT_PRODUCT、COMPETITOR、REPORT_TIMES、REPORT_TYPE、STAGE_ID、STAGE_NOTE等
   - UPDATE EPM_PROJECT
8. 同步项目授权：先删除旧授权，再批量插入新授权
9. 同步乙方信息：先删除旧乙方，再批量插入新乙方

</KbCard>

<KbCard num="2" title="3.2 进度更新写入档案 - 详细">

**入口**：`EpmProjectStageServiceImpl.doUpdate()`

**步骤**：
1. 查询更新前项目档案：`epmProjectRepository.selectByPrimaryKey(projectId)`
2. 判断阶段是否改变：`stageChanged = newStageId != oldStageId`
3. 判断阶段描述是否改变：`stageDescChanged = newStageDesc != oldStageDesc`
4. 若阶段或描述改变或强制更新：
   - 并发校验：若stageValueBefore > 档案中stageId，抛错"项目进度已变更，请驳回重审!"
   - 查询旧阶段定义和新阶段定义
   - 阶段前进校验：新阶段序号 < 旧阶段序号时抛错"阶段更新，只能前进，不能后退"
   - 更新项目档案：STAGE_DESC、STAGE_ID、STAGE_NAME、STAGE_NOTE
   - 插入阶段历程记录EPM_PROJECT_STAGE

</KbCard>

<KbCard num="3" title="3.3 项目档案查询 - 详细">

**API**：`GET /v1/{organizationId}/epm-projects/{projectId}/detail`

**入口**：`EpmProjectController.detail()`

**逻辑**：
1. 根据projectId查询EPM_PROJECT主记录
2. 通过EpmProjectConvert转换为EpmProjectVO返回

</KbCard>

<KbCard num="4" title="3.4 项目档案列表查询 - 详细">

**前端页面**：`/epm-report/list`（单体项目报备页面，展示项目档案数据）

**API**：`POST /v1/{organizationId}/report/getReportList`

**查询条件**：项目编码、项目名称、客户编码、客户名称、修改时间范围、甲方名称、客户简称、申报日期范围、乙方名称、本地/异地、省、市、区、详细地址、审核状态、有效状态、流程状态、工程类型

</KbCard>

<KbCard num="5" title="3.5 工程项目透视 - 详细">

**前端页面**：`/engineering-project-view`（工程项目透视页面）

**功能**：
- 分Tab展示单体项目(reportType=1)和战略项目(reportType=2)
- 项目看板：展示客户信息、项目编码/名称、工程类型、地址、意向产品、合同数量/总额、签约日期、交付/签收/下单/回款进度
- 统计图：支持按工程类型/业务类型/项目进度/有效状态/行政区域等维度统计

</KbCard>

<KbCard num="6" title="3.6 项目冻结定时任务 - 详细">

**相关Mapper方法**：
- `selectProjectFreeze`/`selectProjectFreeze1`/`selectProjectFreeze2`/`selectProjectFreeze3`：查询不同冻结条件的项目
- `updateProjectFreeze`：更新项目冻结状态FREEZE_TYPE和FREEZE_TIME
- `selectRecentValidHolidays`：查询最近的法定节假日（用于计算工作日）

</KbCard>

<KbCard num="7" title="3.7 项目关键词处理 - 详细">

**入口**：`ProjectKeywordServiceImpl`

**逻辑**：
1. 查询未处理的项目：`epmProjectMapper.selectUnprocessedProjects()`
2. 对每个项目的指定字段值进行关键词提取
3. 将提取的关键词批量INSERT到EPM_KEY_VALUE表

</KbCard>

<KbCard num="1" title="4.1 EPM_PROJECT（项目信息表/项目档案表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_ID | BIGINT | 项目ID，主键，自增 |
| ORGANIZATION_ID | BIGINT | 组织ID，必填 |
| PROJECT_CODE | VARCHAR | 项目编码 |
| PROJECT_NAME | VARCHAR | 项目名称 |
| REPORT_ID | BIGINT | 报备ID |
| REPORT_TIMES | BIGINT | 报备次数 |
| PROJECT_CHARACTER | VARCHAR | 项目性质(联营/直营) |
| PROJECT_DOCKET | VARCHAR | 项目概述 |
| PROJECT_STATUS | VARCHAR | 项目状态(报备/已立项/已报名/投标中/已投标/中标/未中标/已签约/已开工/施工中/停工/验收中/已竣工/已结案/项目终止) |
| BRAND | VARCHAR | 品牌 |
| SQUARE | VARCHAR | 面积 |
| HOLDER_TYPE | VARCHAR | 业主类型(政府/医院/企业) |
| HOLDER | VARCHAR | 项目业主 |
| HOLDER_LINKMAN | VARCHAR | 业主联系人 |
| HOLDER_PHONE_NO | VARCHAR | 业主联系电话 |
| HOLDER_ID | BIGINT | 项目业主ID |
| PARTNER | VARCHAR | 项目合伙人 |
| PARTNER_LINKMAN | VARCHAR | 合伙人联系人 |
| PARTNER_PHONE_NO | VARCHAR | 合伙人联系电话 |
| PARTNER_ID | BIGINT | 项目合伙人ID |
| CUSTOMER_ID | BIGINT | 客户ID |
| CUSTOMER_CODE | VARCHAR | 客户编码 |
| CUSTOMER_NAME | VARCHAR | 客户名称 |
| TRADING_COMPANY_ID | BIGINT | 交易公司ID |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 |
| PARTY_A_ID | BIGINT | 甲方客户ID |
| PARTY_A_NAME | VARCHAR | 甲方名称 |
| PARTY_A_LINK_PERSON | VARCHAR | 甲方联系人 |
| PARTY_A_PHONE | VARCHAR | 甲方联系电话 |
| PARTY_B_ID | BIGINT | 乙方客户ID |
| PARTY_B_NAME | VARCHAR | 乙方名称 |
| PARTY_B_LINK_PERSON | VARCHAR | 乙方联系人 |
| PARTY_B_PHONE | VARCHAR | 乙方联系电话 |
| PROVINCE_ID | BIGINT | 项目地址:省ID |
| PROVINCE_NAME | VARCHAR | 项目地址:省名称 |
| CITY_ID | BIGINT | 项目地址:地市ID |
| CITY_NAME | VARCHAR | 项目地址:地市名称 |
| AREA_ID | BIGINT | 项目地址:区县ID |
| AREA_NAME | VARCHAR | 项目地址:区县名称 |
| ADDRESS | VARCHAR | 项目地址:详细地址 |
| DIVISION_ID | BIGINT | 所属事业部ID |
| DIVISION_NAME | VARCHAR | 所属事业部 |
| IS_LOCAL | BIGINT | 本地/异地(1:异地 2:本地) |
| OPERATING_MODE | BIGINT | 管理类型(1:自营工程 2:经销商服务 3:自营+经销商服务) |
| PROJECT_TYPE | VARCHAR | 项目类型/业主类型 |
| PROJECT_SOURCE | VARCHAR | 项目来源(1:常规工程 2:战略工程) |
| REPORT_TIME | DATETIME | 报备时间 |
| REPORT_TYPE | BIGINT | 报备类型(1:单体报备 2:战略报备 3:家装战略 4:家装单体) |
| STAGE_ID | BIGINT | 项目进度阶段ID |
| STAGE_NAME | VARCHAR | 项目进度阶段名称 |
| STAGE_DESC | VARCHAR | 项目进度描述 |
| STAGE_NOTE | VARCHAR | 项目进度阶段备注 |
| PROJECT_VALID | BIGINT | 项目有效状态(1:未生效 2:已生效 3:已失效 4:已冻结) |
| VALID_START_DATE | DATETIME | 有效期开始时间 |
| VALID_END_DATE | DATETIME | 有效期结束时间 |
| FREEZE_TYPE | BIGINT | 冻结类型(0:未冻结 1:超项目有效期 2:进度超时更新 4:有效期内已签合同) |
| FREEZE_TIME | DATETIME | 冻结时间 |
| UNFREEZE_TIME | DATETIME | 解冻时间 |
| CHANGE_VALID_USER | VARCHAR | 改变有效性的用户 |
| CHANGE_VALID_TIME | DATETIME | 改变有效性的时间 |
| CHANGE_VALID_REASON | VARCHAR | 改变有效性的原因 |
| CONTRACT_CODE | VARCHAR | 项目合同号(合同签订确认时回写) |
| CONTRACT_AMOUNT | BIGINT | 项目合同金额(合同签订确认时回写) |
| PERFORMANCE_SECURITY | BIGINT | 履约保证金(合同签订确认时回写) |
| GUARANTEE_AMOUNT | BIGINT | 质保金(合同签订确认时回写) |
| GUARANTEE_PERIOD | VARCHAR | 质保期(合同签订确认时回写) |
| CONTRACT_SIGNUP_DATE | DATETIME | 合同签约日期(合同签订确认时回写) |
| PERIOD_START_DATE | VARCHAR | 工期开始日期(合同签订确认时回写) |
| PERIOD_END_DATE | VARCHAR | 工期截止日期(合同签订确认时回写) |
| PREDICT_SIGN_DATE | DATETIME | 预计签订日期 |
| PREDICT_SALES_AMOUNT | VARCHAR | 预计销售收入(元) |
| PREDICT_PROJ_QTY | VARCHAR | 预估单体项目数量 |
| PREDICT_PDT_QTY | VARCHAR | 预估工产品用量 |
| INTENT_PRODUCT | VARCHAR | 工程意向产品 |
| COMPETITIVE_BRAND | VARCHAR | 竞争品牌 |
| COMPETITOR | VARCHAR | 竞争对手 |
| SITE_AREA | BIGINT | 工程建筑面积 |
| CONSTRUCTION_STAGE | VARCHAR | 工程施工阶段 |
| BACKGROUND | BIGINT | 背景关系 |
| BELONG_TO | BIGINT | 工程操作性质，必填 |
| NEED_DEPOSIT | BIGINT | 是否同意缴纳保证金(1:同意 2:不同意) |
| DEPOSIT_AMOUNT | BIGINT | 保证金金额 |
| DEPOSIT_NOTE | VARCHAR | 保证金备注 |
| IS_FOREIGN | VARCHAR | 是否海外，必填 |
| IS_NOT_BID | BIGINT | 是否免招标(1否 2是) |
| IS_SYSTEM | BIGINT | 是否系统初始化(1否 2是) |
| IS_INIT | BIGINT | 为2时表示初始化产生的数据，必填 |
| REMOTE_SHARED | BIGINT | 2=启用异地划分，必填 |
| TASK_SHARED_RATE | BIGINT | 任务划分比例 |
| SERVICE_FEE_SHARED_RATE | BIGINT | 售后服务金划分比例 |
| PROJECT_CATEGORY | VARCHAR | 项目分类(normal:标准项目 small:小型项目) |
| LANDMARK_FLAG | VARCHAR | 是否地标建筑(默认N:否) |
| HZ_INSTANCE_ID | BIGINT | H0流程实例id |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态，必填 |
| MANAGER | VARCHAR | 项目经理 |
| STRATEGIC_STAGE | VARCHAR | 战略对接阶段 |
| REL_PROJECT_ID | BIGINT | 关联战略项目ID |
| REL_PROJECT_CODE | VARCHAR | 关联战略项目编码 |
| REL_PROJECT_NAME | VARCHAR | 关联战略项目名称 |
| AGENT | VARCHAR | 经办人 |
| AGENT_PHONE | VARCHAR | 经办人电话 |
| AGENT_OPINION | VARCHAR | 经办人意见 |
| NEED_SAMPLE | VARCHAR | 产品送样(是否) |
| NEED_QUOTE | VARCHAR | 产品报价(是否) |
| CLOSE_PROJECT_TIME | DATETIME | 结案时间 |
| PROJECT_STAGE_TYPE | BIGINT | 项目进度状态 |
| EXTERNAL_ID | VARCHAR | 外部系统唯一标识 |
| EXT_PROJECT_ID | VARCHAR | 外部系统对应的项目ID |
| EXT_STATUS | VARCHAR | 外部系统项目状态 |
| creation_date | DATETIME | 创建时间 |
| created_by | BIGINT | 创建人 |
| last_update_date | DATETIME | 最后更新时间 |
| last_updated_by | BIGINT | 最后更新人 |
| object_version_number | BIGINT | 乐观锁版本号 |

</KbCard>

<KbCard num="2" title="4.2 EPM_PROJECT_STAGE（项目进度历程表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_STAGE_ID | BIGINT | 主键，自增 |
| PROJECT_ID | BIGINT | 项目ID |
| STAGE_ID | BIGINT | 阶段ID |
| STAGE_DESC | VARCHAR | 阶段描述 |
| creation_date | DATETIME | 创建时间 |
| created_by | BIGINT | 创建人 |

</KbCard>

<KbCard num="3" title="4.3 EPM_PROJECT_AUTH（项目授权表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PK_ID | BIGINT | 主键 |
| PROJECT_ID | BIGINT | 项目ID |

</KbCard>

<KbCard num="4" title="4.4 EPM_PROJECT_PARTYB（项目乙方信息表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PK_ID | BIGINT | 主键 |
| PROJECT_ID | BIGINT | 项目ID |

</KbCard>

<KbCard num="5" title="4.5 EPM_PROJECT_DISABLE（报备失效申请表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJ_DISABLE_ID | BIGINT | 主键 |
| PROJ_DISABLE_CODE | VARCHAR | 失效单号 |
| PROJECT_ID | BIGINT | 项目ID |
| TYPE | BIGINT | 类型(1:失效 2:恢复生效) |

</KbCard>

<KbCard num="6" title="4.6 EPM_PROJECT_UNFREEZE（项目解冻申请表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_UNFREEZE_ID | BIGINT | 主键 |
| PROJECT_ID | BIGINT | 项目ID |

</KbCard>

<KbCard num="7" title="4.7 EPM_KEY_VALUE（项目关键词表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| KEY_VALUE_ID | BIGINT | 主键 |
| PROJECT_ID | BIGINT | 项目ID |

</KbCard>

<KbCard num="8" title="4.8 DISCOUNT_CHECK_CONFIG_C（折扣校验配置C表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_ARCHIVE | INT | 项目档案标识(1:异地 2:本地) |

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
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">报备审核时报错"项目档案表（epm_project）缺失以下字段：xxx"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT column_name 
FROM all_tab_columns 
WHERE table_name = 'EPM_REPORT' 
  AND column_name NOT IN (
    SELECT column_name FROM all_tab_columns WHERE table_name = 'EPM_PROJECT'
  );</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">项目进度更新报错"项目进度已变更，请驳回重审!"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT p.PROJECT_ID, p.PROJECT_CODE, p.STAGE_ID, p.STAGE_NAME, p.STAGE_DESC
FROM EPM_PROJECT p
WHERE p.PROJECT_ID = :projectId;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">项目进度更新报错"阶段更新，只能前进，不能后退"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT sd.STAGE_ID, sd.STAGE_NAME, sd.SEQ
FROM EPM_STAGE_DEF sd
ORDER BY sd.SEQ;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">项目报备审核时报错"请配置{orgId}公司参数'Proj_Effective_Cycle'"</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT * FROM SYS_PARAM WHERE PARAM_CODE = 'Proj_Effective_Cycle' AND ORGANIZATION_ID = :orgId;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">项目已冻结但无法提交解冻申请</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT p.PROJECT_ID, p.PROJECT_CODE, p.PROJECT_VALID, p.FREEZE_TYPE, p.FREEZE_TIME,
       u.PROJECT_UNFREEZE_ID, u.HZ_APPROVE_STATUS AS UNFREEZE_STATUS
FROM EPM_PROJECT p
LEFT JOIN EPM_PROJECT_UNFREEZE u ON p.PROJECT_ID = u.PROJECT_ID
WHERE p.PROJECT_ID = :projectId;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q6</span>
      <span style="font-size:15px;">项目档案有效状态显示异常</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT p.PROJECT_ID, p.PROJECT_CODE, p.PROJECT_VALID, p.FREEZE_TYPE,
       u.HZ_APPROVE_STATUS AS EPU_STAT
FROM EPM_PROJECT p
LEFT JOIN EPM_PROJECT_UNFREEZE u ON p.PROJECT_ID = u.PROJECT_ID 
  AND u.OBJECT_VERSION_NUMBER = (SELECT MAX(OBJECT_VERSION_NUMBER) FROM EPM_PROJECT_UNFREEZE WHERE PROJECT_ID = p.PROJECT_ID)
WHERE p.PROJECT_ID = :projectId;</code></pre>
      <br>
      <strong style="color:#7C3AED;">前端转换规则：</strong>
      <ul style="margin:4px 0 0;padding-left:20px;">
        <li>PROJECT_VALID=4 + EPU_STAT=新建/1 → 显示6(解冻草稿)</li>
        <li>PROJECT_VALID=4 + EPU_STAT=已启动/3 → 显示8(解冻申请中)</li>
        <li>PROJECT_VALID=4 + EPU_STAT=拒绝/驳回/退回 → 显示7(解冻拒绝)</li>
        <li>PROJECT_VALID=4 + FREEZE_TYPE=1 → 显示9(已冻结-有效期内未签合同)</li>
        <li>PROJECT_VALID=4 + FREEZE_TYPE=2 → 显示10(已冻结-进度更新超时)</li>
        <li>PROJECT_VALID=4 + FREEZE_TYPE=4 → 显示12(已冻结-有效期内已签合同)</li>
      </ul>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q7</span>
      <span style="font-size:15px;">查询项目档案详情</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT * FROM EPM_PROJECT WHERE PROJECT_ID = :projectId;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q8</span>
      <span style="font-size:15px;">查询项目进度历程</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT ps.*, sd.STAGE_NAME, sd.SEQ
FROM EPM_PROJECT_STAGE ps
LEFT JOIN EPM_STAGE_DEF sd ON ps.STAGE_ID = sd.STAGE_ID
WHERE ps.PROJECT_ID = :projectId
ORDER BY ps.creation_date;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q9</span>
      <span style="font-size:15px;">查询项目授权信息</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT * FROM EPM_PROJECT_AUTH WHERE PROJECT_ID = :projectId;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q10</span>
      <span style="font-size:15px;">查询项目乙方信息</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT * FROM EPM_PROJECT_PARTYB WHERE PROJECT_ID = :projectId;</code></pre>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q11</span>
      <span style="font-size:15px;">折扣校验时项目档案标识(PROJECT_ARCHIVE)如何取值</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <br>
      <pre style="background:#1e1e1e;color:#d4d4d4;padding:10px 12px;border-radius:6px;overflow:auto;font-size:12px;margin:8px 0;white-space:pre;"><code>SELECT p.PROJECT_ID, p.PROJECT_CODE, p.IS_LOCAL,
       c.PROJECT_ARCHIVE
FROM EPM_PROJECT p
LEFT JOIN DISCOUNT_CHECK_CONFIG_C c ON c.PROJECT_ARCHIVE = p.IS_LOCAL
WHERE p.PROJECT_ID = :projectId;</code></pre>
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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|---------|--------|
| 2026-07-28 | V1.0 | 初始创建，梳理工程项目档案业务逻辑 | AI |
| 2025-12-25 | - | EpmProjectController新增项目明细查询接口 | jiaqiang.fu01 |
| 2025-11-21 | - | EpmProjectUnfreezeServiceImpl项目解冻逻辑实现 | jiaqiang.fu01 |
| 2025-11-20 | - | EpmProjectDisableServiceImpl报备失效/恢复逻辑实现 | jiaqiang.fu01 |
| 2025-11-17 | - | EpmProjectStageServiceImpl项目进度更新逻辑实现 | jiaqiang.fu01 |
| 2025-10-29 | - | EpmReportController项目报备接口实现 | liuyk |
| 2025-09-29 | - | EpmProject实体类及基础CRUD创建 | - |
</KbCard>
</div>
</div>
</div>
