<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="战略经理变更" desc="工程管理-项目商机业务说明" />

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
战略项目报备（项目商机模块） → 战略经理变更申请（新建/编辑） → 保存校验 → 提交校验 → 审批流程启动 → 审批通过 → wfComplete回调 → 更新战略项目表项目经理 + 更新项目报备表项目经理
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 战略项目报备（EPM_PROJECT） | 数据依赖 | 战略经理变更的明细行需要引用战略项目信息（项目ID、编码、名称、当前项目经理） | 战略项目已存在且已生效 |
| 用户信息（IAM_USER） | 数据依赖 | 根据变更后的项目经理工号查询用户真实姓名，用于回写项目经理名称 | 变更后的工号在用户表中存在 |

</KbCard>

<KbCard num="3" title="下游影响">

<KbSubTitle>影响1：战略项目表项目经理更新</KbSubTitle>
审批通过后，将明细行中"修改为项目经理工号"对应的用户真实姓名写入战略项目表的项目经理字段，同时更新项目经理工号字段

<KbSubTitle>影响2：项目报备表项目经理更新</KbSubTitle>
审批通过后，同步更新该战略项目关联的所有报备记录的项目经理名称和工号


</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：审批通过后回写项目经理 【流程回调】">

- **业务意义**：战略经理变更申请审批通过后，需要将变更后的项目经理信息同步更新到战略项目表和项目报备表，确保后续业务使用最新的项目经理信息

- **具体逻辑描述**

  - 第1点：审批通过触发wfComplete回调，根据申请单ID查询所有明细行

  - 第2点：根据明细行中的"修改为项目经理工号"查询用户表，获取用户真实姓名

  - 第3点：逐行更新对应战略项目的项目经理名称和工号

  - 第4点：同时查询该战略项目关联的所有报备记录，批量更新报备表的项目经理名称和工号

</KbCard>

<KbCard num="2" title="重点逻辑2：提交时校验在途申请 【防重复提交】">

- **业务意义**：防止同一战略项目存在多条在途的战略经理变更申请，避免审批通过后数据冲突

- **具体逻辑描述**

  - 第1点：提交校验时，根据申请单ID查询所有明细行，提取战略项目编码列表

  - 第2点：查询是否存在审批状态为"RUN"（审批中）的申请单包含相同战略项目编码

  - 第3点：若存在，抛出异常提示"以下战略项目已有在途申请，无法重复提交"，并列出重复的项目编码

</KbCard>

<KbCard num="3" title="重点逻辑3：保存时校验明细行项目编码重复 【数据完整性】">

- **业务意义**：同一张变更申请单内不允许出现相同战略项目，确保每条明细行对应唯一的战略项目

- **具体逻辑描述**

  - 第1点：保存校验时，遍历所有明细行的战略项目编码

  - 第2点：若发现重复编码，抛出异常提示"以下战略项目编码重复，请检查"，并列出重复的编码

---

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="界面模块1：战略经理变更申请（低代码页面）">

> 本菜单为低代码页面（hlod），无独立前端源码，界面由后端配置驱动渲染

<KbSubTitle>头信息</KbSubTitle>

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
<td>申请单ID</td>
<td>文本框</td>
<td>申请单主键，系统自动生成</td>
<td>新建时隐藏</td>
<td>新建时为空，保存后自动生成</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER.EPM_PROJECT_MANAGER_ID</td>
</tr>
<tr>
<td>申请单编码</td>
<td>文本框</td>
<td>申请单编号，用于唯一标识本次变更申请</td>
<td>常显</td>
<td>系统自动生成编码</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER.EPM_PROJECT_MANAGER_CODE</td>
</tr>
<tr>
<td>组织ID</td>
<td>文本框</td>
<td>租户组织ID</td>
<td>隐藏</td>
<td>自动取当前登录用户所属组织</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER.ORGANIZATION_ID</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>变更申请备注说明</td>
<td>常显</td>
<td>默认为空，可编辑</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER.NOTE</td>
</tr>
<tr>
<td>H0流程实例ID</td>
<td>文本框</td>
<td>H0流程引擎的流程实例ID</td>
<td>隐藏</td>
<td>提交审批后由流程引擎回写</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER.HZ_INSTANCE_ID</td>
</tr>
<tr>
<td>H0流程审批状态</td>
<td>下拉选择框</td>
<td>当前申请单的审批状态</td>
<td>常显</td>
<td>新建时为空，提交后由流程引擎更新</td>
<td>DRAFT/RUN/APPROVED/REJECTED</td>
<td>EPM_PROJECT_MANAGER.HZ_APPROVE_STATUS</td>
</tr>
<tr>
<td>外部审批回调来源</td>
<td>文本框</td>
<td>标识审批回调来源，枚举CallbackSourceEnum</td>
<td>隐藏</td>
<td>由回调接口写入</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER.CALLBACK_SOURCE</td>
</tr>
</tbody></table></div>
<KbSubTitle>明细行信息</KbSubTitle>

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
<td>明细行ID</td>
<td>文本框</td>
<td>明细行主键</td>
<td>隐藏</td>
<td>新建时为空，保存后自动生成</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER_LINE.EPM_PROJECT_MANAGER_LINE_ID</td>
</tr>
<tr>
<td>战略项目ID</td>
<td>文本框</td>
<td>关联的战略项目ID</td>
<td>隐藏</td>
<td>选择战略项目后自动带出</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER_LINE.PROJECT_ID</td>
</tr>
<tr>
<td>战略项目编码</td>
<td>文本框</td>
<td>战略项目编码</td>
<td>常显</td>
<td>选择战略项目后自动带出，不可编辑</td>
<td>弹窗选择战略项目，数据范围见下方弹窗SQL</td>
<td>EPM_PROJECT_MANAGER_LINE.PROJECT_CODE</td>
</tr>
<tr>
<td>战略项目名称</td>
<td>文本框</td>
<td>战略项目名称</td>
<td>常显</td>
<td>选择战略项目后自动带出，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER_LINE.PROJECT_NAME</td>
</tr>
<tr>
<td>项目经理工号</td>
<td>文本框</td>
<td>变更前的项目经理工号</td>
<td>常显</td>
<td>选择战略项目后自动带出当前项目经理工号，不可编辑</td>
<td>-</td>
<td>EPM_PROJECT_MANAGER_LINE.EMPID</td>
</tr>
<tr>
<td>修改为项目经理工号</td>
<td>文本框</td>
<td>变更后的项目经理工号</td>
<td>常显</td>
<td>默认为空，需手动输入或选择</td>
<td>弹窗选择用户，数据范围见下方弹窗SQL</td>
<td>EPM_PROJECT_MANAGER_LINE.TO_EMPID</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard num="2" title="选择弹窗">

<KbSubTitle>弹窗1：战略项目选择弹窗</KbSubTitle>


| 入参 | | | | 数据范围 | 单选/多选 |
|------|------|------|------|---------|---------|
| 字段名 | 中文名 | 释义 | 示例 | | |
| organizationId | 组织ID | 当前租户组织ID | 1 | `SELECT PROJECT_ID, PROJECT_CODE, PROJECT_NAME, MANAGER, EMPID FROM EPM_PROJECT WHERE ORGANIZATION_ID = #{organizationId} AND PROJECT_SOURCE = '2' AND PROJECT_VALID = 2`（战略工程且已生效的项目） | 多选 |

> 点击查看详情按钮：选择战略项目后，PROJECT_ID、PROJECT_CODE、PROJECT_NAME自动赋值到明细行对应字段，EMPID赋值到"项目经理工号"字段

<KbSubTitle>弹窗2：用户选择弹窗（修改为项目经理）</KbSubTitle>


| 入参 | | | | 数据范围 | 单选/多选 |
|------|------|------|------|---------|---------|
| 字段名 | 中文名 | 释义 | 示例 | | |
| loginName | 用户工号 | 变更后的项目经理工号 | ZHANGSAN | `SELECT LOGIN_NAME, REAL_NAME FROM IAM_USER WHERE LOGIN_NAME = #{loginName}`（用户表中存在的有效用户） | 单选 |

> 点击查看详情按钮：选择用户后，LOGIN_NAME赋值到"修改为项目经理工号"字段

</KbCard>

<KbCard num="3" title="导入">

> 本功能无导入功能

</KbCard>

<KbCard num="4" title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 保存 | 保存当前申请单头及明细行数据 | 详情页 | 新建/编辑状态下可点击 | 调用保存接口，触发保存校验 |
| 提交 | 提交审批流程 | 详情页 | 单据状态为草稿时可点击 | 先触发保存校验，再触发提交校验，校验通过后启动审批流程 |
| 删除 | 删除当前申请单 | 详情页 | 单据状态为草稿时可点击 | 调用删除接口删除头及明细行数据 |

</KbCard>

<KbCard title="保存校验">

<KbSubTitle>明细行战略项目编码不可重复 —— 防止同一申请单内出现重复的战略项目</KbSubTitle>


  - 详细逻辑

    - 第1点：遍历所有明细行，收集战略项目编码

    - 第2点：检测是否存在重复编码，若存在则收集到错误列表

    - 第3点：若错误列表非空，抛出异常"以下战略项目编码重复，请检查！{重复编码}"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT PROJECT_CODE, COUNT(*) AS CNT
    FROM EPM_PROJECT_MANAGER_LINE
    WHERE EPM_PROJECT_MANAGER_ID = #{epmProjectManagerId}
    GROUP BY PROJECT_CODE
    HAVING COUNT(*) > 1;
    ```

</KbCard>

<KbCard title="提交校验">

<KbSubTitle>明细行必须存在 —— 确保变更申请至少包含一条明细行</KbSubTitle>


  - 详细逻辑

    - 第1点：根据申请单ID查询明细行

    - 第2点：若明细行为空，抛出异常"战略经理变更申请明细行不存在！"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT COUNT(*)
    FROM EPM_PROJECT_MANAGER_LINE
    WHERE EPM_PROJECT_MANAGER_ID = #{epmProjectManagerId};
    -- 若结果为0则不通过
    ```

<KbSubTitle>同一战略项目不可存在在途申请 —— 防止重复提交导致数据冲突</KbSubTitle>


  - 详细逻辑

    - 第1点：提取当前申请单所有明细行的战略项目编码

    - 第2点：查询是否存在审批状态为RUN的申请单包含相同战略项目编码

    - 第3点：若存在，抛出异常"以下战略项目已有在途申请，无法重复提交，请等待原申请流程完成。详情如下：{项目编码列表}"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT DISTINCT l.PROJECT_CODE
    FROM EPM_PROJECT_MANAGER m
    LEFT JOIN EPM_PROJECT_MANAGER_LINE l ON m.EPM_PROJECT_MANAGER_ID = l.EPM_PROJECT_MANAGER_ID
    WHERE m.HZ_APPROVE_STATUS = 'RUN'
    AND l.PROJECT_CODE IN (
      SELECT PROJECT_CODE
      FROM EPM_PROJECT_MANAGER_LINE
      WHERE EPM_PROJECT_MANAGER_ID = #{epmProjectManagerId}
    );
    -- 若有结果则不通过
    ```

</KbCard>

<KbCard num="7" title="状态机">

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[DRAFT/新建] --提交--> [RUN/审批中] --审批通过--> [APPROVED/已通过]
[RUN/审批中] --审批驳回--> [REJECTED/已驳回]
[DRAFT/新建] --删除--> [已删除]
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| DRAFT | 草稿/新建 | 编辑、保存、提交、删除 |
| RUN | 审批中 | 查看（不可编辑） |
| APPROVED | 审批通过 | 查看（不可编辑） |
| REJECTED | 审批驳回 | 编辑、保存、重新提交 |

---

</KbCard>

<KbCard num="1" title="表1：EPM_PROJECT_MANAGER（战略经理变更申请头表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| EPM_PROJECT_MANAGER_ID | BIGINT | 申请单主键ID | 申请单ID | 自增主键 |
| CREATOR | VARCHAR | 创建人 | - | 自动取当前登录用户 |
| CREATETIME | DATETIME | 创建时间 | - | 自动取当前系统时间 |
| UPDATOR | VARCHAR | 修改人 | - | 自动取当前登录用户 |
| UPDATETIME | DATETIME | 修改时间 | - | 自动取当前系统时间 |
| NOTE | VARCHAR | 备注 | 备注 | 默认为空，可编辑 |
| STAT | BIGINT | 单据状态（已弃用） | - | 已弃用，使用HZ_APPROVE_STATUS |
| WFID | BIGINT | 流程ID | - | 流程相关字段 |
| WFFLAG | BIGINT | 流程标志 | - | 流程相关字段 |
| ORGANIZATION_ID | BIGINT | 组织ID | 组织ID | 自动取当前登录用户所属组织 |
| EPM_PROJECT_MANAGER_CODE | VARCHAR | 申请单编码 | 申请单编码 | 系统自动生成 |
| HZ_INSTANCE_ID | BIGINT | H0流程实例ID | H0流程实例ID | 提交审批后由流程引擎回写 |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 | H0流程审批状态 | DRAFT/RUN/APPROVED/REJECTED |
| CALLBACK_SOURCE | VARCHAR | 外部审批回调来源 | 外部审批回调来源 | 枚举CallbackSourceEnum，回调时写入 |
| CREATION_DATE | DATETIME | 审计创建时间 | - | 框架审计字段 |
| CREATED_BY | BIGINT | 审计创建人 | - | 框架审计字段 |
| LAST_UPDATED_BY | BIGINT | 审计修改人 | - | 框架审计字段 |
| LAST_UPDATE_DATE | DATETIME | 审计修改时间 | - | 框架审计字段 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架字段，每次更新自增 |

</KbCard>

<KbCard num="2" title="表2：EPM_PROJECT_MANAGER_LINE（战略经理变更申请明细行表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| EPM_PROJECT_MANAGER_LINE_ID | BIGINT | 明细行主键ID | 明细行ID | 自增主键 |
| EPM_PROJECT_MANAGER_ID | BIGINT | 外键，关联头表 | - | 关联EPM_PROJECT_MANAGER.EPM_PROJECT_MANAGER_ID |
| PROJECT_ID | BIGINT | 战略项目ID | 战略项目ID | 选择战略项目后自动带出 |
| PROJECT_CODE | VARCHAR | 战略项目编码 | 战略项目编码 | 选择战略项目后自动带出 |
| PROJECT_NAME | VARCHAR | 战略项目名称 | 战略项目名称 | 选择战略项目后自动带出 |
| EMPID | VARCHAR | 变更前项目经理工号 | 项目经理工号 | 选择战略项目后自动带出当前项目经理工号 |
| TO_EMPID | VARCHAR | 变更后项目经理工号 | 修改为项目经理工号 | 手动输入或选择，审批通过后回写至EPM_PROJECT.EMPID和EPM_REPORT.EMPID |
| CREATION_DATE | DATETIME | 审计创建时间 | - | 框架审计字段 |
| CREATED_BY | BIGINT | 审计创建人 | - | 框架审计字段 |
| LAST_UPDATED_BY | BIGINT | 审计修改人 | - | 框架审计字段 |
| LAST_UPDATE_DATE | DATETIME | 审计修改时间 | - | 框架审计字段 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架字段，每次更新自增 |

</KbCard>

<KbCard num="3" title="表3：EPM_PROJECT（战略项目表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_ID | BIGINT | 项目ID | - | 主键，审批通过后根据明细行PROJECT_ID定位记录并更新 |
| MANAGER | VARCHAR | 项目经理名称 | - | 审批通过后更新为变更后用户的真实姓名 |
| EMPID | VARCHAR | 项目经理工号 | - | 审批通过后更新为明细行的TO_EMPID |

</KbCard>

<KbCard num="4" title="表4：EPM_REPORT（项目报备表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| REPORT_ID | BIGINT | 报备ID | - | 主键 |
| PROJECT_ID | BIGINT | 关联战略项目ID | - | 根据此字段关联战略项目，审批通过后批量更新 |
| MANAGER | VARCHAR | 项目经理名称 | - | 审批通过后更新为变更后用户的真实姓名 |
| EMPID | VARCHAR | 项目经理工号 | - | 审批通过后更新为明细行的TO_EMPID |

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
            <td style="color:#DC2626;font-weight:600;">战略经理变更申请明细行不存在！</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">根因：当前申请单没有明细行数据。解决方案：至少添加一条战略项目明细行后再提交</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">以下战略项目已有在途申请，无法重复提交，请等待原申请流程完成。详情如下：{项目编码}</td>
            <td style="font-size:13px;">提交校验</td>
            <td style="font-size:13px;">根因：明细行中的战略项目已有审批中的变更申请。解决方案：等待原申请流程完成后再提交</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">以下战略项目编码重复，请检查！{项目编码}</td>
            <td style="font-size:13px;">保存校验</td>
            <td style="font-size:13px;">根因：同一申请单内存在相同战略项目编码的明细行。解决方案：删除重复明细行</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
</tbody></table></div>
</KbCard>

<KbCard title="常见问题">

- 问题1：审批通过后项目经理未更新
  - 原因：wfComplete回调未正常执行，或变更后工号在用户表中不存在导致无法获取真实姓名。排查SQL：
    ```sql
    -- 检查变更后工号是否在用户表中存在
    SELECT * FROM IAM_USER WHERE LOGIN_NAME = #{toEmpid};
    -- 检查申请单审批状态
    SELECT HZ_APPROVE_STATUS FROM EPM_PROJECT_MANAGER WHERE EPM_PROJECT_MANAGER_ID = #{epmProjectManagerId};
    ```
  - 解决思路：1. 确认HZ_APPROVE_STATUS已变为APPROVED；2. 确认TO_EMPID对应的用户在IAM_USER表中存在；3. 检查流程回调是否正常触发

- 问题2：提交时提示"已有在途申请"但找不到在途申请
  - 原因：可能存在历史申请单的HZ_APPROVE_STATUS状态未正确更新（如流程异常中断）。排查SQL：
    ```sql
    SELECT m.EPM_PROJECT_MANAGER_ID, m.EPM_PROJECT_MANAGER_CODE, m.HZ_APPROVE_STATUS, l.PROJECT_CODE
    FROM EPM_PROJECT_MANAGER m
    LEFT JOIN EPM_PROJECT_MANAGER_LINE l ON m.EPM_PROJECT_MANAGER_ID = l.EPM_PROJECT_MANAGER_ID
    WHERE m.HZ_APPROVE_STATUS = 'RUN'
    AND l.PROJECT_CODE = #{projectCode};
    ```
  - 解决思路：1. 查询上述SQL确认在途申请单；2. 若流程已实际结束但状态未更新，需手动修正HZ_APPROVE_STATUS

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
| 2026-03-21 | - | zhaojiawei | 新增EpmProjectManagerLineDTO，支持保存校验入参 |
| 2025-12-16 | - | jiaqiang.fu01 | 初始创建战略经理变更模块（Controller/Service/Entity/Mapper） |
</KbCard>
</div>
</div>
</div>
