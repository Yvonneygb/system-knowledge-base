<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="工程折扣政策失效" desc="工程管理-项目交付业务说明" />

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
新建失效单 → 选择折扣政策 → 选择失效产品明细行 → 保存 → 保存并提交(发起审批) → 审批中 → 审批通过
                                                                                              ↓
                                                                                     更新政策行失效状态(VALID_STAT=3)
                                                                                              ↓
                                                                                   判断该政策所有行是否均已失效
                                                                                              ↓
                                                                                   是 → 更新政策头失效状态(VALID=3)
                                                                                   否 → 政策头保持原状态
                                                                                              ↓
                                                                                   通用(suitableType=normal)不推送CRM
                                                                                   专项(suitableType=special)推送CRM失效
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游单据 | 依赖说明 |
|---------|---------|
| 工程折扣政策申请 | 失效单必须关联一条已生效的工程折扣政策（IS_MAKT=0, SUITABLE_TYPE=normal），通过LOV选择 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 工程折扣政策行 | 政策行状态失效 | 审批通过后，关联的政策行生效状态更新为已失效(VALID_STAT=3) |
| 工程折扣政策头 | 政策头状态失效 | 当该政策下所有行均失效后，政策头有效状态更新为已失效(VALID=3) |
| CRM系统 | 失效信息推送 | 通用类型(suitableType=normal)不推送CRM；专项类型(suitableType=special)审批通过后推送CRM执行失效 |
| OA系统 | 失效审批推送 | 保存并提交时推送OA审批，携带头信息和明细行数据 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：新建失效单">
**具体逻辑**：

- 1、用户选择一条工程折扣政策，系统自动带出政策类型、政策名称、适用客户、适用区域、适用省份等信息。用户需填写失效原因（必填），并选择需要失效的产品明细行。
</KbCard>

<KbCard num="2" title="重点逻辑2：选择失效产品明细行">
**具体逻辑**：

- 1、点击"新建"按钮弹出选择弹窗，展示所选政策下尚未失效的产品明细行（过滤已失效行），用户可多选后确认添加到失效单中。已添加的行不会在弹窗中重复出现。
</KbCard>

<KbCard num="3" title="重点逻辑3：阶梯政策展示">
**具体逻辑**：

- 1、点击产品明细行时，系统加载该行的阶梯政策信息（起订量、封顶量、特价、折扣率），在下方阶梯政策区域展示。
</KbCard>

<KbCard num="4" title="重点逻辑4：保存逻辑">
**具体逻辑**：

- 1、失效政策行不允许为空，至少需要选择一行产品明细
- 2、新建时自动生成政策失效编码，编码规则根据政策类型区分（工程使用工程编码规则）
- 3、保存时将选中的政策行关联到失效单
- 4、更新时先清除旧关联，再重新建立关联
- 5、同时保存附件信息
</KbCard>

<KbCard num="5" title="重点逻辑5：保存并提交逻辑">
**具体逻辑**：

- 1、先执行保存，然后发起工作流审批。工作流主题格式为"全渠道样品折扣政策失效_失效编号_用户名_事业部_时间"。
</KbCard>

<KbCard num="6" title="重点逻辑6：审批通过后处理">
**具体逻辑**：

- 1、更新失效单状态为审批通过
- 2、更新关联政策行的生效状态为已失效
- 3、检查该政策下是否所有行均已失效，若全部失效则更新政策头有效状态为已失效
- 4、通用类型（工程）不推送CRM；专项类型推送CRM执行失效
</KbCard>

<KbCard num="7" title="重点逻辑7：删除逻辑">
**具体逻辑**：

- 1、仅新建状态的失效单允许删除。删除时同时清除政策行与该失效单的关联关系。
</KbCard>

<KbCard num="8" title="重点逻辑8：编码规则">
**具体逻辑**：

- 1、根据所失效政策的类型自动选择编码规则：
- 2、工程（suitableType=normal）：使用工程折扣政策失效编码规则
- 3、家装（suitableType=special, isMakt≠2）：使用家装折扣政策失效编码规则
- 4、样品（isMakt=2）：使用样品折扣政策失效编码规则
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块">
<KbSubTitle>列表页</KbSubTitle>

| 区域 | 说明 |
|------|------|
| 查询栏 | 政策失效编号、政策申请编号、审核状态（HWKF.APPROVE_STATUS）、政策类型（AE.EPM.POLICY_TYPE） |
| 操作按钮 | 新建、导出 |
| 列表字段 | 审核状态、政策失效编号、政策申请编号、申请人、申请时间、政策类型、政策名称、适用客户、适用区域、适用省份、适用客户分类、有效开始日期、有效结束日期、失效原因、最后更新时间 |
| 行操作 | 查看（所有状态）、删除（仅新建状态） |


<KbSubTitle>详情页</KbSubTitle>

| 区域 | 说明 |
|------|------|
| 头部按钮 | 刷新、编辑、保存、保存并提交（新建/拒绝/撤回状态可见） |
| 基本信息Tab | 政策失效编号（自动生成）、申请人（默认当前用户）、申请时间（默认当前时间）、单据状态、政策申请单号（LOV选择）、政策类型、政策名称、适用客户、适用区域、适用省份、适用客户分类、失效原因（必填）、有效开始日期、有效结束日期 |
| 产品明细区 | 产品明细行表格，支持新建（弹窗选择）、删除操作 |
| 阶梯政策区 | 点击产品行展示阶梯政策（起订量、封顶量、特价、折扣率） |
| 附件Tab | 附件上传，attachConfId=9022 |
| 流程审批Tab | 有流程实例ID时展示审批历史 |


</KbCard>
<KbCard title="选择弹窗">
<KbSubTitle>政策申请单号LOV（DISCOUNT_POLICY_DIALOG_V）</KbSubTitle>

- 数据范围：IS_MAKT=0 且 SUITABLE_TYPE='normal' 的已生效折扣政策
- 排查SQL：
```sql
SELECT * FROM EPM_DISCOUNT_POLICY
WHERE IS_MAKT = 0
  AND SUITABLE_TYPE = 'normal'
  AND VALID = 2;
```


<KbSubTitle>产品明细选择弹窗</KbSubTitle>

- 数据范围：所选政策下未失效（VALID_STAT≠3）且未被当前失效单选中的产品明细行
- 排查SQL：
```sql
SELECT * FROM EPM_DISCOUNT_POLICY_ITEM
WHERE DISCOUNT_POLICY_ID = :discountPolicyId
  AND VALID_STAT = 0
  AND DISCOUNT_POLICY_ITEM_ID NOT IN (:notExistsIds);
```


</KbCard>
<KbCard title="导入">
无导入功能。
</KbCard>
<KbCard title="其他按钮">

| 按钮 | 说明 |
|------|------|
| 导出 | 列表页导出，接口：/v1/{organizationId}/epm-discount-policy-disabled/exportEpmDiscountPolicyDisabled，条件suitableType=normal |

</KbCard>
<KbCard title="保存校验">

| 校验项 | 校验规则 | 排查SQL |
|--------|---------|---------|
| 失效政策行非空 | 至少选择一行产品明细 | `SELECT COUNT(*) FROM EPM_DISCOUNT_POLICY_ITEM WHERE DISCOUNT_POLICY_DISABLED_ID = :disabledId;` 结果需>0 |
| 政策申请单号必填 | 头部折扣政策不能为空 | - |
| 失效原因必填 | 头部失效原因不能为空 | - |
| 政策类型必填 | 头部政策类型不能为空 | - |
| 有效日期校验 | 有效开始日期不能大于有效结束日期 | - |
| 封顶数量校验 | 政策封顶总数量行必须大于单个经销商封顶数量 | - |
| 编码生成校验 | 所选折扣政策必须存在 | `SELECT * FROM EPM_DISCOUNT_POLICY WHERE DISCOUNT_POLICY_CODE = :code;` 需有结果 |
| 用户上下文校验 | 必须能获取当前登录用户信息 | - |

</KbCard>
<KbCard title="提交校验">

| 校验项 | 校验规则 | 排查SQL |
|--------|---------|---------|
| 保存校验全部通过 | 同保存校验 | 同上 |
| 单据状态校验 | 仅新建/拒绝/撤回状态允许提交 | `SELECT HZ_APPROVE_STATUS FROM EPM_DISCOUNT_POLICY_DISABLED WHERE DISCOUNT_POLICY_DISABLED_ID = :id;` 需为NEW/REJECTED/WITHDRAW |
| 工作流启动校验 | 流程定义编码(flowCode)必须有效 | - |

</KbCard>
<KbCard title="状态机">

```
新建(NEW) ──保存──→ 新建(NEW)
   │
   ├──保存并提交──→ 审批中(RUN)
   │                    │
   │                    ├──审批通过──→ 已审批(APPROVED) [触发失效逻辑+CRM推送]
   │                    ├──审批拒绝──→ 已拒绝(REJECTED) [可重新提交]
   │                    ├──已撤回──→ 已撤回(WITHDRAW) [可重新提交]
   │                    └──终止──→ 已终止(INTERRUPT)
   │
   └──删除──→ 物理删除（仅NEW状态允许）
```

---

</KbCard>

<KbSubTitle>数据库表详解</KbSubTitle>

<KbCard num="1" title="EPM_DISCOUNT_POLICY_DISABLED（折扣政策失效主表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| DISCOUNT_POLICY_DISABLED_ID | Long | 政策失效ID（主键） |
| DISCOUNT_POLICY_DISABLED_CODE | String | 政策失效编码（自动生成） |
| DISCOUNT_POLICY_ID | Long | 关联的折扣政策ID（必填） |
| ORGANIZATION_ID | Long | 组织ID（必填） |
| STAT | Long | 单据状态 |
| WFID | Long | 流程ID |
| WFFLAG | Long | 流程状态 |
| NOTE | String | 失效原因 |
| IS_CAL_AD | Long | 是否计广告费 |
| HZ_INSTANCE_ID | Long | 流程实例ID（关联hwkf_run_instance） |
| HZ_APPROVE_STATUS | String | 审批状态（值集：HWKF.APPROVE_STATUS） |
| CALLBACK_SOURCE | String | 外部审批回调来源 |
| CREATOR | String | 创建人 |
| CREATETIME | Date | 创建时间 |
| UPDATOR | String | 修改人 |
| UPDATETIME | Date | 修改时间 |
| CREATION_DATE | Date | 审计创建时间 |
| CREATED_BY | Long | 审计创建人 |
| LAST_UPDATED_BY | Long | 审计修改人 |
| LAST_UPDATE_DATE | Date | 审计修改时间 |
| OBJECT_VERSION_NUMBER | Long | 乐观锁版本号 |

</KbCard>

<KbCard num="2" title="EPM_DISCOUNT_POLICY_ITEM（折扣政策产品明细行）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| DISCOUNT_POLICY_ITEM_ID | Long | 政策产品ID（主键） |
| DISCOUNT_POLICY_ID | Long | 政策ID（必填） |
| DISCOUNT_POLICY_DISABLED_ID | Long | 关联的失效单ID（失效时写入） |
| SEQ | Long | 序号 |
| APPLICATION_TYPE | Long | 申请类型（值集：AE.EPM.APPLICATION_TYPE，1-产品 2-型号 3-全产品） |
| ITEM_ID | Long | 产品ID |
| ITEM_CODE | String | 产品编码 |
| ITEM_NAME | String | 产品名称 |
| ITEM_MODEL | String | 产品型号 |
| UOM_NAME | String | 单位 |
| STAND_PRICE | BigDecimal | 标准单价（含安装） |
| STANDARD_PRICE | BigDecimal | 标准单价（不含安装） |
| INSTALL_UNIT_PRICE | BigDecimal | 安装单价 |
| SUM_INSTALL_UNIT_PRICE | BigDecimal | 安装金额 |
| PREFERENTIAL_TYPE | Long | 优惠方式（值集：AE.EPM.PREFERENTIAL_TYPE，1-折扣 2-特价） |
| CAPPING | Long | 封顶数量校验 |
| TOTAL_CAP_NUMBER | String | 政策封顶总数量行 |
| CUSTOMER_CAPS_NUMBER | Long | 单个经销商封顶数量 |
| ACCTLEVEL | Long | 客户等级（值集：AE.EPM.CUSTOMER_GRADE） |
| CITYTYPE | Long | 城市类型（值集：AE.EPM.CITY_LEVEL） |
| RESPRODCHANNEL | Long | 限制产品渠道 |
| CRM_LINE_ID | String | 外部行ID（CRM） |
| ITEM_COST | BigDecimal | 物料实际成本单价 |
| TASKDISCOUNT | BigDecimal | 任务返点折扣率 |
| CAL_CONTRACT_DISCOUNT | String | 计合同折扣 |
| CAL_ADVERTISE_EXPENSES | String | 计广告费 |
| CAL_BILLING_DISCOUNT | String | 计开单折扣 |
| VALID_STAT | Long | 生效状态（0-有效，3-已失效） |
| ITEM_MANAGE_TYPE | String | 产品品类 |
| PROD_DISCOUNT | BigDecimal | 产品最高折扣率 |
| PROD_DISC_CHANNEL | String | 产品最高折扣率渠道 |
| REMARK | String | 备注 |

</KbCard>

<KbCard num="3" title="EPM_DISCOUNT_POLICY_ITEM_LINE（折扣政策阶梯明细行）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| DISCOUNT_POLICY_ITEM_LINE_ID | Long | 二级明细ID（主键） |
| DISCOUNT_POLICY_ITEM_ID | Long | 政策产品ID |
| DISCOUNT_POLICY_ID | Long | 政策ID |
| GROUPING | Long | 分组标识 |
| MINIMUM_QTY | Long | 起订量 |
| CAPPING_QTY | Long | 封顶量 |
| SPECIAL_OFFER | BigDecimal | 特价 |
| DISCOUNT_RATE | BigDecimal | 折扣率 |
| SPECIAL_DISCOUNT_RATE | BigDecimal | 特价折扣率 |
| VALUE_CHAIN | BigDecimal | 价值链 |

</KbCard>

<KbCard num="4" title="EPM_DISCOUNT_POLICY（折扣政策头表，关联查询）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| DISCOUNT_POLICY_ID | Long | 政策ID（主键） |
| DISCOUNT_POLICY_CODE | String | 政策单号 |
| DISCOUNT_POLICY_NAME | String | 政策名称 |
| POLICY_TYPE | Long | 政策类型（值集：AE.EPM.POLICY_TYPE） |
| CUSTOMER_ID | Long | 适用客户ID |
| SALE_AREA_NAME | String | 适用区域名称 |
| PROVINCE_NAME | String | 适用省份 |
| CUSTOMER_CLASS | Long | 适用客户分类 |
| EFFECTIVE_DATE_START | Date | 有效开始日期 |
| EFFECTIVE_DATE_END | Date | 有效结束日期 |
| IS_MAKT | Long | 是否营销中台（0-否，2-是） |
| SUITABLE_TYPE | String | 适用类型（normal-通用/工程，special-专项） |
| VALID | Long | 有效状态（1-未审核，2-有效，3-失效） |
| HZ_APPROVE_STATUS | String | 审批状态 |

</KbCard>

<KbCard num="5" title="EPM_DISCOUNT_POLICY_CUSTOMER（折扣政策客户表，关联查询）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| PK_ID | Long | 主键ID |
| DISCOUNT_POLICY_ID | Long | 政策ID |
| CUSTOMER_ID | Long | 客户ID |
| CUSTOMER_CODE | String | 客户编码 |
| CUSTOMER_NAME | String | 客户名称 |
| IS_IMPORTANCE | Long | 是否主要 |
| SHORT_NAME | String | 客户简称 |

</KbCard>

<KbCard num="6" title="OBJ_ATTACH_REL（附件关联表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| ATTACH_REL_ID | Long | 主键 |
| ATTACHMENT_UUID | String | 附件ID |
| ATTACH_CONF_ID | Long | 对象配置ID |
| OBJ_ID | Long | 业务对象ID（关联DISCOUNT_POLICY_DISABLED_ID） |
| ATTACH_TYPE_ID | Long | 对象附件类型ID |

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
            <td style="font-size:13px;">保存时未选择任何产品明细行</td>
            <td style="font-size:13px;">检查是否选择了失效行</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法获上线文信息</td>
            <td style="font-size:13px;">生成编码时获取不到当前登录用户</td>
            <td style="font-size:13px;">检查用户登录状态和Token有效性</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">当前折扣政策不允许失效 请检查</td>
            <td style="font-size:13px;">生成编码时根据政策单号查不到对应政策</td>
            <td style="font-size:13px;">检查关联的政策单号是否正确</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未找到该单据</td>
            <td style="font-size:13px;">删除时根据ID查不到失效单</td>
            <td style="font-size:13px;">检查失效单ID是否正确</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">仅新建状态单据允许删除.</td>
            <td style="font-size:13px;">删除非新建状态的失效单</td>
            <td style="font-size:13px;">检查单据审批状态</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策失效id不能为空</td>
            <td style="font-size:13px;">工作流审批完成时传入的objId为空</td>
            <td style="font-size:13px;">检查工作流回调参数</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策明细推送crm出错,请稍后再试</td>
            <td style="font-size:13px;">审批通过后推送CRM返回null</td>
            <td style="font-size:13px;">检查CRM接口连通性和参数</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">政策明细推送crm出错：{lineId}:{message}</td>
            <td style="font-size:13px;">审批通过后推送CRM返回失败</td>
            <td style="font-size:13px;">检查CRM返回的错误信息</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请先选择折扣政策！</td>
            <td style="font-size:13px;">新建产品明细行时未先选择折扣政策</td>
            <td style="font-size:13px;">先选择政策申请单号</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请选择要删除的明细</td>
            <td style="font-size:13px;">批量删除行时未选中任何行</td>
            <td style="font-size:13px;">勾选需要删除的行</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-10" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">明细的政策封顶总数量行必须大于单个经销商封顶数量</td>
            <td style="font-size:13px;">封顶数量校验不通过</td>
            <td style="font-size:13px;">检查TOTAL_CAP_NUMBER和CUSTOMER_CAPS_NUMBER</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-11" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>失效政策行不允许为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查是否选择了失效行<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>SELECT COUNT(*) FROM EPM_DISCOUNT_POLICY_ITEM WHERE DISCOUNT_POLICY_DISABLED_ID = :disabledId;</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法获上线文信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查用户登录状态和Token有效性<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>-</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>当前折扣政策不允许失效 请检查</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查关联的政策单号是否正确<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>SELECT * FROM EPM_DISCOUNT_POLICY WHERE DISCOUNT_POLICY_CODE = :code;</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到该单据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查失效单ID是否正确<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>SELECT * FROM EPM_DISCOUNT_POLICY_DISABLED WHERE DISCOUNT_POLICY_DISABLED_ID = :id;</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>仅新建状态单据允许删除.</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查单据审批状态<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>SELECT HZ_APPROVE_STATUS FROM EPM_DISCOUNT_POLICY_DISABLED WHERE DISCOUNT_POLICY_DISABLED_ID = :id;</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策失效id不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查工作流回调参数<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>-</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策明细推送crm出错,请稍后再试</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查CRM接口连通性和参数<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>查看日志：Method wfComplete() toCRM</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策明细推送crm出错：{lineId}:{message}</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查CRM返回的错误信息<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>查看日志：Method wfComplete() toCRM</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请先选择折扣政策！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>先选择政策申请单号<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>-</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-10" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请选择要删除的明细</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>勾选需要删除的行<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>-</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-11" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>明细的政策封顶总数量行必须大于单个经销商封顶数量</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>检查TOTAL_CAP_NUMBER和CUSTOMER_CAPS_NUMBER<br><br><strong style="color:#7C3AED;">排查SQL：</strong><br><code>SELECT TOTAL_CAP_NUMBER, CUSTOMER_CAPS_NUMBER FROM EPM_DISCOUNT_POLICY_ITEM WHERE DISCOUNT_POLICY_ITEM_ID = :itemId;</code></div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">工程折扣政策失效提交时isMakt和suitableType参数是什么？**</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      A1：列表查询使用suitableType='normal'过滤工程政策；LOV选择弹窗使用isMakt=0, suitableType='normal'筛选工程折扣政策。**注意：当前代码headDS.ts提交时发送isMakt=2, suitableType='special'，与LOV查询参数不一致，疑似为复制样品页面代码未修改的BUG，实际应以isMakt=0, suitableType='normal'为准。**<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批通过后工程折扣政策失效为什么不推送CRM？**</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      A2：通用类型（suitableType=normal，即工程类型）审批通过后不推送CRM，仅更新内部政策行和头的失效状态。仅专项类型（suitableType=special）才推送CRM。<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">如何查看某个政策是否已全部失效？**</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      A3：<br>
      ```sql<br>
      SELECT DP.DISCOUNT_POLICY_ID, DP.DISCOUNT_POLICY_CODE, DP.VALID,<br>
      COUNT(*) AS TOTAL_ITEMS,<br>
      SUM(CASE WHEN DPI.VALID_STAT = 3 THEN 1 ELSE 0 END) AS DISABLED_ITEMS<br>
      FROM EPM_DISCOUNT_POLICY DP<br>
      JOIN EPM_DISCOUNT_POLICY_ITEM DPI ON DPI.DISCOUNT_POLICY_ID = DP.DISCOUNT_POLICY_ID<br>
      WHERE DP.DISCOUNT_POLICY_ID = :policyId<br>
      GROUP BY DP.DISCOUNT_POLICY_ID, DP.DISCOUNT_POLICY_CODE, DP.VALID;<br>
      ```<br>
      当DISABLED_ITEMS = TOTAL_ITEMS时，政策头VALID应已更新为3（已失效）。<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">删除失效单后，关联的政策行状态如何恢复？**</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      A4：删除时调用clearDisabledId清除政策行上的DISCOUNT_POLICY_DISABLED_ID关联，但不会恢复VALID_STAT状态。如果需要恢复，需手动更新。<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">工程、家装、样品折扣政策失效共用后端代码的差异点是什么？**</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      A5：详见下方共用关系说明。<br>
      ---<br>
    </div>
  </div>
</div>
</KbCard>
<KbCard title="共用后端代码关系说明">

工程折扣政策失效、家装折扣政策失效、样品及长库龄折扣政策失效三个菜单**共用同一套后端代码**（EpmDiscountPolicyDisabledController + EpmDiscountPolicyDisabledServiceImpl），通过前端传递的isMakt和suitableType参数区分业务类型。

| 菜单 | 前端路由 | LOV参数(isMakt) | LOV参数(suitableType) | 列表查询(suitableType) | 提交参数(isMakt) | 提交参数(suitableType) | 编码规则 |
|------|---------|----------------|---------------------|---------------------|----------------|---------------------|---------|
| 工程折扣政策失效 | /engineering-policy-disabled | 0 | normal | normal | 2（疑似BUG，应为0） | special（疑似BUG，应为normal） | GC_DISCOUNT_POLICY_DISABLED |
| 家装折扣政策失效 | /home-policy-disabled | 0 | special | special | 2 | special | JZ_DISCOUNT_POLICY_DISABLED |
| 样品及长库龄折扣政策失效 | /sample-policy-disabled | 2 | special | special | 2 | special | YP_DISCOUNT_POLICY_DISABLED |

**差异点汇总：**
1. **LOV筛选条件不同**：工程选isMakt=0且suitableType=normal的政策；家装选isMakt=0且suitableType=special的政策；样品选isMakt=2且suitableType=special的政策
2. **列表过滤条件不同**：工程按suitableType=normal过滤；家装和样品按suitableType=special过滤，样品额外按isMakt=2过滤
3. **编码规则不同**：工程用GC编码规则，家装用JZ编码规则，样品用YP编码规则
4. **CRM推送逻辑不同**：通用类型（工程，suitableType=normal）审批通过后不推送CRM；专项类型（家装/样品，suitableType=special）审批通过后推送CRM执行失效
5. **工作流主题不同**：当前统一使用"全渠道样品折扣政策失效"前缀

---

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
| 2026-07-28 | - | 初始梳理，完成工程折扣政策失效业务逻辑文档 |
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
