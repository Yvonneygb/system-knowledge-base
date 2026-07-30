<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="7" title="价格保护函" desc="工程管理-项目商机业务说明" />

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
项目报备(已审批通过) → 发起价格保护函 → 填写保护函内容(自动生成模板) → 保存(校验+生成编号) → 提交审批 → 审批流转 → 审批通过(计算过期时间+发布) → 价格保护函生效 → 过期自动失效
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 项目报备 | 数据依赖 | 价格保护函需关联已报备的项目，从中获取项目名称、地址、经销商、经办人等信息 | 项目已存在且审批通过 |
| 系统参数配置(PriceProtectionReaders) | 配置依赖 | 价格函阅读者配置，保存时校验是否已配置 | 系统参数表中存在该配置项 |
| 系统参数配置(PriceProtectionPeriod) | 配置依赖 | 价格保护函有效期时长（天数），审批通过时用于计算过期时间 | 系统参数表中存在该配置项 |
| 编码规则(AE.PRICE_PROTECTION_LETTER_NO) | 配置依赖 | 价格保护函编号生成规则，保存时自动生成编号 | 编码规则已配置 |
| 事业部基础设置 | 数据依赖 | 获取事业部名称、事业部编码（用于编号前缀和模板内容填充） | 事业部基础数据已维护 |
| 工作流引擎 | 配置依赖 | 价格保护函提交审批依赖工作流引擎进行审批流转 | 工作流已配置 |

</KbCard>

<KbCard num="3" title="下游影响">

- 影响1：折扣政策校验
  - 折扣政策行项校验时，会引用价格保护函Mapper判断项目是否存在生效的价格保护函

- 影响2：项目价格保护
  - 审批通过后，该项目获得价格保护资格，其他经销商不得恶意报价，否则将受处罚

- 影响3：发文通知
  - 审批通过后，价格保护函内容将作为发文通知推送（当前代码已注释，暂未启用）

---

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：保护函内容模板自动生成 模板填充">

- **业务意义**：价格保护函有标准格式，需要根据项目信息自动填充模板内容，减少人工填写工作量，保证格式统一

- **具体逻辑描述**

  - 第1点：系统内置HTML模板，包含事业部名称、项目名称、项目地址、经销商名称、联系人、联系电话、日期等占位符

  - 第2点：根据项目ID查询项目信息，自动填充：项目名称、项目地址（省+市+区+详细地址）、经销商名称、报备经办人姓名、报备经办人电话、当前年份、当前日期

  - 第3点：事业部名称从事业部基础设置中获取，默认为"箭牌卫浴事业部"（编码101），若用户上下文中存在DEPT信息则使用该值对应的事业部

</KbCard>

<KbCard num="2" title="重点逻辑2：保存时重复保护函校验 防重复">

- **业务意义**：同一项目不应存在多条进行中的价格保护函，避免重复发起导致管理混乱

- **具体逻辑描述**

  - 第1点：保存时校验该项目是否已存在进行中的价格保护函（审批状态非"审批通过"的，或审批通过但未过期的）

  - 第2点：若存在，阻断保存并提示该项目已存在进行中的价格保护函编号，无需重复发起

  - 第3点：编辑已有保护函时，排除自身（通过主键ID过滤）

</KbCard>

<KbCard num="3" title="重点逻辑3：审批通过后计算过期时间 有效期计算">

- **业务意义**：价格保护函有有效期限，过期后不再具有价格保护效力，需要自动计算过期时间

- **具体逻辑描述**

  - 第1点：审批通过时，取系统参数"价格保护函有效期时长"（PriceProtectionPeriod，单位：天）

  - 第2点：计算过期时间 = 审批通过时间 + 有效期天数

  - 第3点：若计算出的过期时间超过项目报备有效期结束时间，则过期时间取项目报备有效期结束时间（即过期时间不会超过项目报备有效期）

  - 第4点：同时将模板中的${CURRENT_TIME}占位符替换为审批通过时的中文日期（如"2026年01月07日"），并更新审批状态为"审核通过"

</KbCard>

<KbCard num="4" title="重点逻辑4：价格保护函编号自动生成 编号生成">

- **业务意义**：每条价格保护函需要唯一编号用于追踪和管理

- **具体逻辑描述**

  - 第1点：新建保存时，编号 = 事业部编码前缀 + 编码规则后缀

  - 第2点：前缀取事业部基础设置中的事业部编码，若为空则默认使用"ARR"

  - 第3点：后缀通过编码规则引擎生成，规则编码为"AE.PRICE_PROTECTION_LETTER_NO"

---

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="界面模块1：价格保护函新建/编辑页面">
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
<td>价格保护函ID</td>
<td>隐藏</td>
<td>主键</td>
<td>隐藏</td>
<td>新建时为空，保存后自动生成</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.PRICE_PROTECTION_ID</td>
</tr>
<tr>
<td>价格保护函编号</td>
<td>文本框(只读)</td>
<td>价格保护函唯一编号</td>
<td>常显</td>
<td>新建保存时自动生成（事业部编码+编码规则后缀），编辑时不可修改</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.PRICE_PROTECTION_NO</td>
</tr>
<tr>
<td>项目ID</td>
<td>弹窗选择</td>
<td>关联的项目</td>
<td>常显</td>
<td>用户选择项目后自动带出项目编码、项目名称、经销商信息</td>
<td>项目必须已存在</td>
<td>EPM_PRICE_PROTECTION_LETTER.PROJECT_ID</td>
</tr>
<tr>
<td>项目编码</td>
<td>文本框(只读)</td>
<td>项目编码</td>
<td>常显</td>
<td>选择项目后自动带出</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.PROJECT_CODE</td>
</tr>
<tr>
<td>项目名称</td>
<td>文本框(只读)</td>
<td>项目名称</td>
<td>常显</td>
<td>选择项目后自动带出</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.PROJECT_NAME</td>
</tr>
<tr>
<td>经销商ID</td>
<td>隐藏</td>
<td>经销商ID</td>
<td>隐藏</td>
<td>选择项目后自动带出</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.CUSTOMER_ID</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框(只读)</td>
<td>经销商编码</td>
<td>常显</td>
<td>选择项目后自动带出</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.CUSTOMER_CODE</td>
</tr>
<tr>
<td>经销商名称</td>
<td>文本框(只读)</td>
<td>经销商名称</td>
<td>常显</td>
<td>选择项目后自动带出</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.CUSTOMER_NAME</td>
</tr>
<tr>
<td>保护函名称</td>
<td>文本框</td>
<td>保护函标题名称</td>
<td>常显</td>
<td>手动输入</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.LETTER_NAME</td>
</tr>
<tr>
<td>价格函内容</td>
<td>富文本编辑器</td>
<td>保护函正文内容</td>
<td>常显</td>
<td>默认值：根据项目信息自动生成模板内容，用户可编辑修改</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.NEWS_CONTENT</td>
</tr>
<tr>
<td>审批状态</td>
<td>文本框(只读)</td>
<td>审批状态</td>
<td>常显</td>
<td>新建时为空，审批通过后为"审核通过"</td>
<td>新建/审批中/审核通过/驳回</td>
<td>EPM_PRICE_PROTECTION_LETTER.AUDIT_STAT</td>
</tr>
<tr>
<td>审批通过时间</td>
<td>文本框(只读)</td>
<td>审批通过的时间</td>
<td>审批通过后显示</td>
<td>审批通过时自动设置为当前时间</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.CHECK_TIME</td>
</tr>
<tr>
<td>保护函过期时间</td>
<td>文本框(只读)</td>
<td>保护函失效时间</td>
<td>审批通过后显示</td>
<td>审批通过时自动计算：min(审批通过时间+有效期天数, 项目报备有效期结束时间)</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.EXPIRE_TIME</td>
</tr>
<tr>
<td>组织ID</td>
<td>隐藏</td>
<td>组织ID</td>
<td>隐藏</td>
<td>新建时从用户上下文中获取DEPT值，默认101</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.ENTID</td>
</tr>
<tr>
<td>事业部ID</td>
<td>隐藏</td>
<td>事业部ID</td>
<td>隐藏</td>
<td>-</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.DIVISION_ID</td>
</tr>
<tr>
<td>发文ID</td>
<td>隐藏</td>
<td>关联发文ID</td>
<td>隐藏</td>
<td>-</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.NEWS_ID</td>
</tr>
<tr>
<td>发文编码</td>
<td>隐藏</td>
<td>关联发文编码</td>
<td>隐藏</td>
<td>-</td>
<td>-</td>
<td>EPM_PRICE_PROTECTION_LETTER.NEWS_NO</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard num="2" title="选择弹窗">

<KbSubTitle>弹窗1：项目选择弹窗</KbSubTitle>


| 入参 | | | | 数据范围 | 单选/多选 |
|------|------|------|------|---------|---------|
| 字段名 | 中文名 | 释义 | 示例 | | |
| projectId | 项目ID | 已报备的项目 | 123456 | 已报备且审批通过的项目 | 单选 |

> 选择项目后，自动带出项目编码、项目名称、经销商ID、经销商编码、经销商名称

排查SQL：

```sql
SELECT PROJECT_ID, PROJECT_CODE, PROJECT_NAME, CUSTOMER_ID, CUSTOMER_CODE, CUSTOMER_NAME
FROM EPM_PROJECT
WHERE PROJECT_ID = :projectId
```

</KbCard>

<KbCard num="3" title="导入">

> 本模块无导入功能

</KbCard>

<KbCard num="4" title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 获取保护函内容 | 根据项目自动生成保护函模板内容 | 新建页 | 已选择项目时可点击 | 调用getNewsContent接口，返回填充后的HTML模板内容 |
| 保存 | 保存价格保护函 | 新建页/编辑页 | 必填项已填写 | 新建时生成编号并插入，编辑时更新 |
| 提交 | 提交审批 | 新建页/编辑页 | 已保存且未提交 | 触发工作流提交审批 |

</KbCard>

<KbCard title="保存校验">

<KbSubTitle>价格函阅读者配置必须存在 —— 确保审批通过后能正确推送通知</KbSubTitle>


  - 详细逻辑

    - 第1点：查询系统参数表，编码为"PriceProtectionReaders"，组织ID为当前用户所属事业部

    - 第2点：若配置值为空，抛出异常"缺少价格函阅读者配置，请联系系统管理员"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT * FROM SYS_PARAM WHERE PARAM_CODE = 'PriceProtectionReaders' AND ORG_ID = :entid
    ```

<KbSubTitle>项目不能为空 —— 价格保护函必须关联一个项目</KbSubTitle>


  - 详细逻辑

    - 第1点：校验项目ID字段是否为空

    - 第2点：若为空，抛出异常"项目不能为空"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT * FROM EPM_PRICE_PROTECTION_LETTER WHERE PRICE_PROTECTION_ID = :id AND PROJECT_ID IS NULL
    ```

<KbSubTitle>保护函内容不能为空 —— 保护函必须有正文内容</KbSubTitle>


  - 详细逻辑

    - 第1点：校验保护函内容字段是否为空

    - 第2点：若为空，抛出异常"保护函内容不能为空"

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT * FROM EPM_PRICE_PROTECTION_LETTER WHERE PRICE_PROTECTION_ID = :id AND NEWS_CONTENT IS NULL
    ```

<KbSubTitle>同一项目不能存在进行中的价格保护函 —— 防止重复发起</KbSubTitle>


  - 详细逻辑

    - 第1点：查询该项目是否存在其他进行中的价格保护函（审批状态非"APPROVED"，或审批通过但未过期）

    - 第2点：若存在，抛出异常"该项目{项目编码}已存在进行中的价格函{编号}），无需重复发起价格保护函"

    - 第3点：编辑已有保护函时，排除自身（通过主键ID过滤）

  - 系统体现：阻断性报错

  - 排查SQL：

    ```sql
    SELECT t.PRICE_PROTECTION_NO, t.PROJECT_CODE
    FROM EPM_PRICE_PROTECTION_LETTER t
    WHERE t.PROJECT_ID = :projectId
    AND (t.HZ_APPROVE_STATUS <> 'APPROVED' OR (t.HZ_APPROVE_STATUS = 'APPROVED' AND t.EXPIRE_TIME > SYSDATE))
    ```

</KbCard>

<KbCard title="提交校验">

<KbSubTitle>保存校验全部通过 —— 提交前必须通过保存校验</KbSubTitle>


  - 详细逻辑

    - 第1点：提交时触发工作流校验（volidate方法），当前实现返回null，无额外校验

  - 系统体现：无额外校验

  - 排查SQL：

    ```sql
    -- 无额外提交校验SQL
    ```

</KbCard>

<KbCard num="7" title="状态机">

<KbSubTitle>状态机流转图</KbSubTitle>


```text
新建(草稿) → 保存 → 提交审批 → 审批中(RUN) → 审批通过(APPROVED) → 已过期(自动)
                                    ↓
                                 驳回(REJECTED) → 修改后重新提交
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建/草稿 | 保存、编辑、提交审批 |
| RUN | 审批中/运行中 | 等待审批（不可编辑） |
| APPROVED | 审批通过 | 查看（不可编辑，自动计算过期时间） |
| REJECTED | 驳回 | 修改后重新提交 |
| END | 终止/过期 | 查看（不可操作） |

---

</KbCard>

<KbCard num="1" title="表1：EPM_PRICE_PROTECTION_LETTER（价格保护函表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PRICE_PROTECTION_ID | BIGINT | 主键 | 价格保护函ID | 自增主键 |
| PRICE_PROTECTION_NO | VARCHAR | 价格保护函编号 | 价格保护函编号 | 新建保存时自动生成：事业部编码+编码规则后缀 |
| CREATED | DATE | 创建时间 | 创建时间 | 自动记录 |
| CREATED_BY_BAK | VARCHAR | 创建人 | 创建人 | 自动记录 |
| LAST_UPD | DATE | 更新日期 | 更新日期 | 自动更新 |
| LAST_UPD_BY | VARCHAR | 更新人 | 更新人 | 自动更新 |
| ENTID | BIGINT | 组织ID | 组织ID | 新建时从用户上下文DEPT获取，默认101 |
| DIVISION_ID | BIGINT | 事业部ID | 事业部ID | - |
| STATUS | VARCHAR | 状态 | 状态 | - |
| AUDIT_STAT | VARCHAR | 审批状态 | 审批状态 | 审批通过时更新为"审核通过" |
| STAT | BIGINT | 状态标识 | - | - |
| WFID | BIGINT | 工作流ID | - | 提交审批时关联工作流实例 |
| WFFLAG | BIGINT | 工作流标识 | - | - |
| CUSTOMER_ID | BIGINT | 经销商ID | 经销商ID | 保存时从项目信息自动带出 |
| CHECK_TIME | DATETIME | 审批通过时间 | 审批通过时间 | 审批通过时设置为当前时间 |
| EXPIRE_TIME | DATETIME | 保护函过期时间 | 保护函过期时间 | 审批通过时计算：min(审批通过时间+有效期天数, 项目报备有效期结束时间) |
| PROJECT_ID | BIGINT | 项目ID | 项目ID | 用户选择项目 |
| PROJECT_CODE | VARCHAR | 项目编码 | 项目编码 | 从项目信息自动带出 |
| PROJECT_NAME | VARCHAR | 项目名称 | 项目名称 | 从项目信息自动带出 |
| CUSTOMER_CODE | VARCHAR | 客户编码 | 经销商编码 | 保存时从项目信息自动带出 |
| CUSTOMER_NAME | VARCHAR | 客户名称 | 经销商名称 | 保存时从项目信息自动带出 |
| NEWS_ID | BIGINT | 发文ID | 发文ID | - |
| NEWS_NO | VARCHAR | 发文编码 | 发文编码 | - |
| LETTER_NAME | VARCHAR | 保护函名称 | 保护函名称 | 用户输入 |
| NEWS_CONTENT | CLOB/TEXT | 价格函内容 | 价格函内容 | 自动生成模板+用户编辑，审批通过时替换${CURRENT_TIME}占位符 |
| HZ_APPROVE_STATUS | VARCHAR | 工作流审批状态 | - | 工作流引擎自动维护：NEW/RUN/APPROVED/REJECTED/END |
| CREATION_DATE | DATETIME | 审计创建时间 | - | 框架自动维护 |
| CREATED_BY | BIGINT | 审计创建人 | - | 框架自动维护 |
| LAST_UPDATED_BY | BIGINT | 审计更新人 | - | 框架自动维护 |
| LAST_UPDATE_DATE | DATETIME | 审计更新时间 | - | 框架自动维护 |
| OBJECT_VERSION_NUMBER | BIGINT | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_PROJECT（项目表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| PROJECT_ID | BIGINT | 项目主键 | 项目ID | 关联字段 |
| PROJECT_NAME | VARCHAR | 项目名称 | 项目名称 | 用于模板填充${PRJ_NAME} |
| CUSTOMER_ID | BIGINT | 经销商ID | 经销商ID | 保存时回写到保护函 |
| CUSTOMER_CODE | VARCHAR | 经销商编码 | 经销商编码 | 保存时回写到保护函 |
| CUSTOMER_NAME | VARCHAR | 经销商名称 | 经销商名称 | 保存时回写到保护函，用于模板填充${CUS_NAME} |
| AGENT | VARCHAR | 报备经办人 | 联系人 | 用于模板填充${CONTACT_NAME} |
| AGENT_PHONE | VARCHAR | 经办人电话 | 联系电话 | 用于模板填充${CONTACT_TEL} |
| PROVINCE_NAME | VARCHAR | 省份名称 | - | 用于模板填充项目地址 |
| CITY_NAME | VARCHAR | 城市名称 | - | 用于模板填充项目地址 |
| AREA_NAME | VARCHAR | 区域名称 | - | 用于模板填充项目地址 |
| ADDRESS | VARCHAR | 详细地址 | - | 用于模板填充${PRJ_ADDR} |
| VALID_END_DATE | DATETIME | 报备有效期结束时间 | - | 审批通过时用于计算过期时间的上限 |

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
            <td style="color:#DC2626;font-weight:600;">缺少价格函阅读者配置，请联系系统管理员</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">系统参数"PriceProtectionReaders"未配置或配置值为空，需在系统参数表中为对应组织添加该配置项</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">项目不能为空</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">未选择项目即尝试保存，需先选择项目</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">保护函内容不能为空</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">保护函正文内容为空，需先点击"获取保护函内容"或手动输入内容</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该项目{项目编码}已存在进行中的价格函{编号}），无需重复发起价格保护函</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">同一项目已存在审批中或未过期的价格保护函，不可重复发起</td>
            <td style="font-size:13px;">阻断性报错</td>
          </tr>
</tbody></table></div>
</KbCard>

<KbCard title="常见问题">

- 问题1：价格保护函保存时报"缺少价格函阅读者配置"
  - 原因：系统参数表中未配置"PriceProtectionReaders"参数或配置值为空
    ```sql
    SELECT * FROM SYS_PARAM WHERE PARAM_CODE = 'PriceProtectionReaders'
    ```
  - 解决思路：在系统参数表中为对应组织添加"PriceProtectionReaders"配置项并设置有效值

- 问题2：价格保护函审批通过后过期时间不符合预期
  - 原因：过期时间 = min(审批通过时间+有效期天数, 项目报备有效期结束时间)，可能被项目报备有效期截断
    ```sql
    SELECT t.PRICE_PROTECTION_ID, t.CHECK_TIME, t.EXPIRE_TIME, p.VALID_END_DATE
    FROM EPM_PRICE_PROTECTION_LETTER t
    JOIN EPM_PROJECT p ON t.PROJECT_ID = p.PROJECT_ID
    WHERE t.PRICE_PROTECTION_ID = :id
    ```
  - 解决思路：检查系统参数"PriceProtectionPeriod"的有效期天数配置，以及项目报备有效期结束时间是否过早

- 问题3：同一项目无法再次发起价格保护函
  - 原因：该项目已存在审批中或未过期的价格保护函
    ```sql
    SELECT t.PRICE_PROTECTION_NO, t.HZ_APPROVE_STATUS, t.EXPIRE_TIME
    FROM EPM_PRICE_PROTECTION_LETTER t
    WHERE t.PROJECT_ID = :projectId
    AND (t.HZ_APPROVE_STATUS <> 'APPROVED' OR (t.HZ_APPROVE_STATUS = 'APPROVED' AND t.EXPIRE_TIME > SYSDATE))
    ```
  - 解决思路：等待已有保护函过期或终止后，再重新发起；或联系管理员处理已有保护函

- 问题4：价格保护函编号生成异常
  - 原因：编码规则"AE.PRICE_PROTECTION_LETTER_NO"未配置，或事业部编码为空且默认前缀"ARR"不符合预期
    ```sql
    SELECT * FROM HPFM_CODE_RULE WHERE RULE_CODE = 'AE.PRICE_PROTECTION_LETTER_NO'
    ```
  - 解决思路：检查编码规则配置，确保规则编码"AE.PRICE_PROTECTION_LETTER_NO"已正确配置；检查事业部基础设置中的事业部编码

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
| 2026-04-19 | 252fc524 | YD | 设置接口登录可访问 |
| 2026-03-06 | 46d66d01 | TanZhuoxiong | #ITSM-20250806016 SCPUSER检查替换 |
| 2026-01-07 | 285503e2 | 扶佳强 | [IMP]价格保护函 |
| 2026-01-07 | e15e6696 | 扶佳强 | [IMP]价格保护函 |
| 2026-01-07 | 18068cf5 | 扶佳强 | [IMP]价格保护函 |
| 2026-01-07 | be02f68e | 扶佳强 | [IMP]价格保护函 |
| 2026-01-07 | 0d10f19a | 扶佳强 | [IMP]价格保护函 |
| 2026-01-07 | 989a5950 | 扶佳强 | [IMP]价格保护函 |
</KbCard>
</div>
</div>
</div>
