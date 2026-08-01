<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="9" title="门头展板报销申请单" desc="门头展板报销申请单的创建与管理，支持额度内/外报销申请的提交与审批" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | CustDhReimburseHeadController |
| API路径 | /v1/{organizationId}/cust-dh-reimburse-heads |
| 8Entity | CustDhReimburseHead |
| 数据库表 | CUST_DH_REIMBURSE_HEAD |
| 工作流编码 | SUB_STORE_HEAD_PROCESS_DOOR |
| 前端页面 | custDhReimburseHead |
| ServiceImpl | CustDhReimburseHeadServiceImpl |
| 所属模块 | storeManage |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">
```
新建门头报销申请 → 选择经销商/年度/政策 → 填写行表(门店/金额) → 保存 → 提交工作流审批 → 审批通过 → 可发起门头兑现
                                                                        → 审批驳回 → 修改后重新提交
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **新建门头报销申请**：选择经销商、年度、补贴政策，填写报销类型和支付方式
2. **行表填写**：录入各门店的门头展板报销金额，区分额度内/额度外
3. **报销分析**：自动计算各项目的申请金额、业务>8业务批准金额、财务批准金额
4. **提交审批**：启动工作流`SUB_STORE_HEAD_PROCESS_DOOR`，审批人通过部门E负责人和省级负责人接口获取
5. **审批通过**：可发起门头兑现

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 保存逻辑（doSave）">

**具体逻辑**：

- 1、新增(doInsert)：生成报销编码，插入主表和行表
- 2、更新(doUpdate)：更新主表和行表
</KbCard>

<KbCard num="2" title="2.2 报销分析（1bxFx）">

**具体逻辑**：

- 1、查询已启动、已审批、已驳回状态的@状态的相关8的报销单据
- 2、按装修项目(de9ecorateProject)分类汇总申请金额
- 3、特殊处理灯具+灯具(五金专区)、软装+软装(整体)等合并统计
</KbCard>

<KbCard num="3" title="2.3 行表金额汇总（computeLineSum）">

**具体逻辑**：

- 1、汇总各门店行表的额度内/额度外申请金额、业务批准金额、财务批准金额
</KbCard>

<KbCard num="4" title="2.4 审批人获取">

**具体逻辑**：

- 1、**部门负责人**：getUnitManageLoginNameById?ById - 根据报销单ID获取部门负责人
- 2、**省级负责人**：getProvincialManagerLoginNameById - 根据报销单ID获取省级负责人
- 3、返回格式为ApproveUsersVO列表（工作流固定格式）
</KbCard>

<KbCard num="5" title="2.5 门头兑现查询">

**具体逻辑**：

- 1、getCashoutSearch：查询门头兑现关联数据
- 2、getCashoutSearchLov：门头兑现LOV查询
- 3、生成验收人员保证书HTML内容
</KbCard>

<KbCard num="6" title="2.6 删除逻辑（doDelete）">

**具体逻辑**：

- 1、删除主表数据
</KbCard>

<KbCard num="7" title="2.7 打印数据（doSelectForPrint）">

**具体逻辑**：

- 1、查询详情并转换词汇值含义
- 2、根据事业部配置earlyEncashmentFlag判断是否允许提前兑现
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 API接口列表">

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /get-reimburse-head-list | 门头报销申请列表(分页) |
| GET | /get-reimburse-head-detail | 门头报销申请详情 |
| GET | /do-select | 门头报销申请详情(工作流) |
| GET | /do-select-print | 打印详情 |
| GET | /get-cashout-search | 门头兑现查询 |
| GET | /get-cashout-lov | 门头兑现LOV |
| POST | /insert-reimburse | 门头报销保存(旧) |
| DELETE | /do-delete | 删除 |
| POST | /do-save | 门头报销保存(新) |
| POST | /get-unit-manage-users | 获取部门负责人 |
| POST | /get-provincial-manage-users | 获取省级负责人 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 更新审核状态 |

</KbCard>

<KbCard num="1" title="表：CUST_DH_REIMBURSE_HEAD">

| 字段名 | 类型 | 说明 |
|------|------|------|
| id | Long | 主键 |
| created | Date | 创建时间 |
| last_upd | Date | 最后更新时间 |
| last_upd_by | String | 最后更新人 |
| entid | Long | 事业部ID |
| division_id | Long | 事业部词汇值 |
| audit_stat | String | 审核状态 |
| )stat | Long | 状态 |
| wfid | Long | 流程ID |
| wfflag | Long | 流程状态 |
| reimburse_code | String | 报销编码 |
| customer_legal_id | Long | 交易公司法人中间表ID |
| policy_standard_id | Long | 补贴政策ID |
| year | Long | 年度 |
| remark | String | 备注 |
| pay_type | Long | 支付方式 |
| status | String | 生效状态 |
| customer_id | Long | 经销商ID |
| bx_type | Long | 报销类型 |
| cust_limit_amt | BigDecimal | 经销商限额 |
| out_excess_amt | BigDecimal | 额度外超限金额 |
| out_bx_amt | BigDecimal | 额度外实际报销金额 |
| in_bx_amt | BigDecimal | 额度内实际报销金额 |
| out_actual_apply_amt | BigDecimal | 额度外实际申请总额 |
| in_actual_apply_amt | BigDecimal | 额度内实际申请金额 |
| out_bx_used_amt | BigDecimal | 额度外已报销金额 |
| trading_company_code | String | 交易公司编码 |
| in_early_cashout_ratio | BigDecimal | 额度内提前兑现比例 |
| signature_state | Long | 电子签章状态 |
| signature_url | String | 电子签章地址 |
| re_sign_flag | String | 需要重签标识(y/n) |
| hz_instance_id | Long | H0流程实例ID0ID |
| hz_approve_status | String | H0流程审批状态(必填) |

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

| 问题 | 原因/解决方案 |
|------|------|
| 审批人获取为空 | 检查部门/省级负责人配置 |
| 报销分析数据不完整 | 确认关联的报销单据状态为已启动/已审批/已驳回 |

</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 作者 | 说明 |
|------|------|------|
| 2025-09-29 | jiaqiang.fu01 | 初始创建 |
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
