<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="8" title="项目进度更新" desc="工程管理-项目商机业务说明" />

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
项目报备审批通过 → 初始化项目进度（强制更新）
        ↓
手动更新项目进度 ← 用户在报备详情页操作
        ↓
自动更新项目进度 ← 业务事件触发
  ├─ 折扣审批通过 → 阶段推进至"折扣通过"
  ├─ 首次要货审批 → 阶段推进至"已下首单"
  ├─ 二次要货审批 → 阶段推进至"项目供货中"
  ├─ 供货按期完成 → 阶段推进至"供货按期完成"
  ├─ 项目结案审批 → 阶段推进至"项目结案"
  └─ 解冻审批通过 → 更新进度并解冻
        ↓
进度超时监控 → 项目冻结（冻结类型=2）
        ↓
提交解冻申请 → 审批通过 → 解冻并更新进度
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 触发方式 | 说明 |
|---------|---------|------|
| 工程报备审批 | 审批通过回调 | 报备审批通过时强制更新项目进度 |
| 工程折扣申请 | 折扣审批通过回调 | 折扣通过后自动推进至"折扣通过"阶段 |
| 工程合同要货 | CRM订单创建回调 | 首次/二次要货自动推进对应阶段 |
| 项目结案 | 结案审批通过回调 | 自动推进至"项目结案"阶段 |
| 项目解冻申请 | 解冻审批通过回调 | 解冻时同步更新进度 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 项目冻结 | 进度超时触发 | 超过进度更新期限未更新，项目自动冻结 |
| 工程项目透视 | 列表展示 | 展示项目当前进度、进度描述、进度更新期限 |
| 工程报备列表 | 列表展示 | 展示项目当前进度、进度更新期限 |
| 预警看板 | 展示进度更新时间 | 冻结预警中展示进度更新时间 |
| CRM推送 | 解冻时推送 | 解冻审批通过后推送报备状态至CRM |

</div>
</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="手动更新进度">

用户在工程报备详情页手动修改项目的进度阶段和进度描述。系统会校验以下规则：
- **阶段只能前进不能后退**：新阶段的序号必须大于等于当前阶段序号，否则拒绝更新
- **并发校验**：如果提交时的进度与项目档案中当前进度不一致（即期间有其他人已更新了进度），提示"项目进度已变更，请驳回重审"
- **变更判断**：仅当阶段或阶段描述发生改变，或启用强制更新时，才执行更新操作
- **历程记录**：更新时在进度历程表中插入一条新记录；若仅修改描述（阶段未变），则沿用该阶段上次记录的创建人和创建时间

</KbCard>

<KbCard num="2" title="自动更新进度">

系统在特定业务事件发生时自动推进项目进度，无需人工干预：
- **折扣通过**：工程折扣审批通过后，项目进度自动推进至"折扣通过"阶段
- **增补合同折扣通过**：推进至"项目供货中"阶段
- **首次要货**：CRM创建订单且为首次要货时，推进至"已下首单"阶段
- **二次要货**：第二次要货时，推进至"项目供货中"阶段
- **供货完成**：确认出货数量等于有效数量时，推进至"供货按期完成"阶段
- **项目结案**：结案审批通过后，推进至"项目结案"阶段
- 自动更新仅在该项目尚未存在目标阶段记录时才执行，避免重复推进

</KbCard>

<KbCard num="3" title="进度超时冻结">

每个阶段定义中设置了"进度允许不更新的最大时间限制"（天数）。若项目在该阶段超过此期限未更新进度，系统将自动冻结项目，冻结类型标记为"进度超时更新"。

</KbCard>

<KbCard num="4" title="解冻时更新进度">

项目被冻结后，用户提交解冻申请，需填写解冻后的进度阶段和描述。审批通过后：
- 若冻结类型为"进度超时更新"，则启用强制更新标志
- 执行进度更新逻辑（与手动更新相同）
- 同时将项目有效状态恢复为"已生效"，清除冻结标记

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="界面模块">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<thead><tr>
<th>模块</th>
<th>路径</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>工程项目透视</td>
<td>/engineering-project-view/list</td>
<td>展示项目当前进度、进度描述、进度更新期限，支持按项目进度维度统计</td>
</tr>
<tr>
<td>工程报备列表</td>
<td>/epm-report/list</td>
<td>展示项目当前进度、进度更新期限，报备详情中可手动更新进度</td>
</tr>
<tr>
<td>冻结预警看板</td>
<td>/dashboard</td>
<td>展示进度更新时间，用于监控即将超时的项目</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="保存校验">
<KbSubTitle>项目ID</KbSubTitle>

**校验规则：** 不能为空

**提示信息：** 项目ID不能为空

<KbSubTitle>阶段ID</KbSubTitle>

**校验规则：** 不能为空

**提示信息：** 阶段ID不能为空

<KbSubTitle>进度描述</KbSubTitle>

**校验规则：** 不能为空

**提示信息：** 项目进度描述不能为空

<KbSubTitle>阶段方向</KbSubTitle>

**校验规则：** 新阶段序号 ≥ 当前阶段序号

**提示信息：** 阶段更新，只能前进，不能后退

<KbSubTitle>并发校验</KbSubTitle>

**校验规则：** 提交时进度值 ≤ 项目档案当前进度值

**提示信息：** 项目进度已变更，请驳回重审!

</KbCard>

<KbCard title="提交校验（解冻申请）">
<KbSubTitle>附件校验</KbSubTitle>

**校验规则：** 根据系统参数配置，部分事业部需上传附件

**提示信息：** 附件不能为空 / 附件必须上传且数量不少于【N】

<KbSubTitle>并发校验</KbSubTitle>

**校验规则：** 解冻前进度值 ≤ 解冻后进度值

**提示信息：** 项目进度已变更，请驳回重审!

</KbCard>

<KbCard num="4" title="状态机">

```
项目进度状态流转：

报备初始化 → [初始阶段] 
    → 手动/自动更新 → [折扣通过]
    → 手动/自动更新 → [已下首单]
    → 手动/自动更新 → [项目供货中]
    → 手动/自动更新 → [供货按期完成]
    → 手动/自动更新 → [项目结案]

注：阶段只能前进不能后退，每个阶段定义中有序号控制顺序
```

```
项目有效状态流转（与进度更新相关）：

已生效(2) → 进度超时未更新 → 已冻结(4) [冻结类型=2]
已冻结(4) → 解冻审批通过 → 已生效(2)
```

</KbCard>

<KbCard num="1" title="EPM_PROJECT（项目信息表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJECT_ID | Long | 项目ID（主键） |
| STAGE_ID | Long | 项目进度阶段ID |
| STAGE_DESC | String | 项目进度描述 |
| STAGE_NAME | String | 项目进度阶段名称 |
| STAGE_NOTE | String | 项目进度阶段备注 |
| PROJECT_VALID | Long | 项目有效状态（1=未生效, 2=已生效, 3=已失效, 4=已冻结） |
| FREEZE_TYPE | Long | 冻结类型（1=超项目有效期, 2=进度超时更新） |
| FREEZE_TIME | LocalDateTime | 冻结时间 |
| UNFREEZE_TIME | LocalDateTime | 解冻时间 |
| VALID_START_DATE | LocalDateTime | 有效期开始时间 |
| VALID_END_DATE | LocalDateTime | 有效期结束时间 |
| PROJECT_STAGE_TYPE | Long | 项目进度状态 |
| CLOSE_PROJECT_TIME | LocalDateTime | 结案时间 |

</KbCard>

<KbCard num="2" title="EPM_PROJECT_STAGE（项目进度历程表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PK_ID | Long | 主键 |
| PROJECT_ID | Long | 项目ID |
| STAGE_ID | Long | 阶段ID |
| STAGE_DESC | String | 阶段描述 |
| CREATOR | String | 创建人 |
| CREATETIME | Date | 创建时间 |
| UPDATOR | String | 更新人 |
| UPDATETIME | Date | 更新时间 |

</KbCard>

<KbCard num="3" title="EPM_STAGE_DEF（项目阶段定义表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| STAGE_ID | Long | 阶段ID（主键） |
| ORGANIZATION_ID | Long | 组织ID |
| STAGE_NAME | String | 阶段名称 |
| STAGE_NOTE | String | 阶段描述 |
| STAGE_COLOR | String | 阶段颜色 |
| SEQ | Long | 序号（控制阶段顺序，只能前进不能后退） |
| UPDATE_MODE | Long | 更新方式（1=手动, 2=自动） |
| UPDATE_CYCLE | String | 进度允许不更新的最大时间限制（天），超期未更新则冻结项目 |

</KbCard>

<KbCard num="4" title="EPM_PROJECT_UNFREEZE（项目解冻申请表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PROJ_UNFREEZE_ID | Long | 解冻申请单ID（主键） |
| PROJ_UNFREEZE_CODE | String | 解冻申请单号 |
| PROJECT_ID | Long | 工程ID |
| FREEZE_TYPE | Long | 冻结类型（1=超项目有效期, 2=进度超时更新） |
| FREEZE_TIME | LocalDateTime | 冻结时间 |
| REASON | String | 解冻申请说明 |
| STAGE_VALUE_BEFORE | Long | 跟进进度-解冻前 |
| STAGE_VALUE_AFTER | Long | 跟进进度-解冻后 |
| STAGE_DESC_BEFORE | String | 跟进进度描述-解冻前 |
| STAGE_DESC_AFTER | String | 跟进进度描述-解冻后 |
| STAGE_DATE_BEFORE | LocalDateTime | 跟进进度-解冻前最后更新日期 |
| STAT | Long | 状态 |
| AUDIT_STAT | String | 审核状态 |
| CONTENT_CONFIRM | String | 项目信息确认（Y=是, N=否） |
| HZ_INSTANCE_ID | Long | 流程实例ID |
| HZ_APPROVE_STATUS | String | 流程审批状态 |

</KbCard>

<KbCard num="5" title="EPM_REPORT（工程报备表，进度相关字段）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| REPORT_ID | Long | 报备ID（主键） |
| PROJECT_ID | Long | 项目ID |
| STAGE_ID | Long | 项目进度阶段ID |
| STAGE_DESC | String | 项目进度描述 |
| STAGE_NAME | String | 项目进度阶段名称 |
| STAGE_NOTE | String | 项目进度阶段备注 |

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
            <td style="color:#DC2626;font-weight:600;">项目进度已变更，请驳回重审!</td>
            <td style="font-size:13px;">提交时项目进度已被其他人更新，与单据中记录的进度不一致</td>
            <td style="font-size:13px;">驳回当前审批单据，重新提交</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">阶段更新，只能前进，不能后退</td>
            <td style="font-size:13px;">尝试将项目阶段回退到序号更小的阶段</td>
            <td style="font-size:13px;">只能选择序号大于等于当前阶段的阶段</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">项目ID不能为空</td>
            <td style="font-size:13px;">调用进度更新接口时未传入项目ID</td>
            <td style="font-size:13px;">检查接口调用参数</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">阶段ID不能为空</td>
            <td style="font-size:13px;">调用进度更新接口时未传入阶段ID</td>
            <td style="font-size:13px;">检查接口调用参数</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">项目进度描述不能为空</td>
            <td style="font-size:13px;">调用进度更新接口时未传入进度描述</td>
            <td style="font-size:13px;">填写进度描述后重试</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">附件不能为空</td>
            <td style="font-size:13px;">解冻申请时未上传附件，且当前事业部要求上传附件</td>
            <td style="font-size:13px;">上传附件后重试</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">附件必须上传且数量不少于【N】</td>
            <td style="font-size:13px;">上传的附件数量不满足最低要求</td>
            <td style="font-size:13px;">上传足够数量的附件</td>
            <td style="font-size:13px;">toast提醒</td>
          </tr>
</tbody></table></div>
</KbCard>

<KbCard title="常见问题">

| 问题 | 解答 |
|------|------|
| 项目被冻结，冻结类型为"进度超时更新"是什么原因？ | 项目在当前阶段的进度更新期限（由阶段定义中的UPDATE_CYCLE字段控制）内未更新进度，系统自动冻结 |
| 解冻审批通过后进度会自动更新吗？ | 会，解冻申请中填写的"解冻后进度"会在审批通过后自动更新到项目档案中，且冻结类型为进度超时时会启用强制更新 |
| 家装项目会触发自动进度更新吗？ | 不会，家装项目（IS_HOME=2）在折扣审批和要货审批时跳过自动进度更新逻辑 |
| 自动更新进度在什么情况下不会执行？ | 当项目已经存在目标阶段的历程记录时，自动更新不会重复执行（避免重复推进） |
| 强制更新是什么意思？ | 强制更新（FORCE_UPDATE=2）时，即使阶段和描述都没有变化，也会执行更新操作并写入历程记录。主要用于报备审批和解冻场景 |
| 进度更新期限如何计算？ | 进度更新期限 = 当前阶段最近一次更新时间 + 阶段定义中的UPDATE_CYCLE天数 |

</KbCard>

</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 版本 | 变更内容 |
|------|------|---------|
| 2025-12-25 | v1.1 | 新增EpmProjectStageController独立接口，支持通过API直接更新项目进度历程 |
| 2025-11-21 | v1.0 | 新增项目解冻申请功能，解冻审批通过时同步更新项目进度 |
| 2025-11-17 | v1.0 | 新增EpmProjectStageService，统一项目进度更新服务，支持手动更新和自动更新 |
| 2025-10-27 | v1.0 | 初始建立项目进度历程表（EPM_PROJECT_STAGE）和阶段定义表（EPM_STAGE_DEF） |
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
