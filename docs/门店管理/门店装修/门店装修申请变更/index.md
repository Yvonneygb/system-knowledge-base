<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="6" title="门店装修申请变更" desc="门店装修申请的变更管理，支持变更装修项目、金额、标准等级等字段" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeApplyChangeHeaderController |
| API路径 | /v1/{organizationId}/fin-fee-apply-change-headers |
| Entity | FinFeeApplyChangeHeader |
| 数据库表 | FIN_FEE_APPLY_CHANGE_HEADER |
| 工作流编码 | SUB_STORE_DECORATION_CHANGE |
| 前端页面 | finFeeApplyChange / finFeeApplyChangeClose |
| ServiceImpl | FinFeeApplyChangeHeaderServiceImpl |
| 所属模块 | storeCheck |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">
```
选择已审批的装修申请 → 新建变更单 → 修改装修信息(面积/金额/项目等) → 保存 → 提交工作流审批 → 审批通过 → 回写原申请单
                                                                                    → 审批驳回 → 更新状态
作废操作 → 标记变更单为作废 → 恢复原申请单签呈标记
```
</KbCard>

<KbCard num="2" title="流程说明">
1. **新建变更单**：基于已审批的装修申请单创建变更单，自动带入原申请信息，生成变更单号
2. **修改信息**：可调整装修面积、金额、项目、设计师等，记录变更前后差异
3. **提交审批**：启动工作流`SUB_STORE_DECORATION_CHANGE`
4. **审批通过回调(onWfComplete)**：读取公司参数(装修间隔期Waiting_Days、提前允许期Advance_Permissible_Period、扣除比率Deduct_Pro)，计算超期天数和扣减比例，回写原申请单
5. **作废**：标记变更单为INTERRUPT，恢复原申请单isModify=3

</KbCard>

</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 新增逻辑（doInsert）">

**具体逻辑**：

- 1、校验关联的装修申请单必须存在
- 2、生成变更单号：编码规则`AE.TERMINAL_CHANGE_NO`
- 3、自动赋值：成本中心、申请人
- 4、新增变更照片明细和附件
- 5、标记原申请单isModify=2(已发起变更)
</KbCard>

<KbCard num="2" title="2.2 删除逻辑（doDelete）">

**具体逻辑**：

- 1、仅NEW状态可删除
- 2、删除变更单及关联照片
- 3、恢复原申请单isModify=0(未发起变更)
</KbCard>

<KbCard num="3" title="2.3 作废逻辑（operate）">

**具体逻辑**：

- 1、标记变更单hzApproveStatus=INTERRUPT
- 2、标记原申请单isModify=3(变更作废)，记录作废原因
</KbCard>

<KbCard num="4" title="2.4 审批通过回调（onWfComplete）">

**具体逻辑**：

- 1、读取公司参数：
- 2、`Waiting_Days`：门店装修间隔期
- 3、`Advance_Permissible_Period`：门店装修提前允许期
- 4、`Deduct_Pro`：扣除比率
- 5、`Over_Date_Limit`：超期天数限制
- 6、计算超期天数和扣减比例
- 7、回写原申请单的变更后标准金额
</KbCard>

<KbCard num="5" title="2.5 变更明细查询（doSelect）">

**具体逻辑**：

- 1、查询变更单基本信息
- 2、查询原申请单的额度内/额度外申请标准（旧值）
- 3、查询变更照片明细
- 4、查询当前工作流任务名称
</KbCard>

<KbCard num="6" title="2.6 打印数据（doSelectForPrint）">

**具体逻辑**：

- 1、转换词汇值含义（门店类型、装修等级、产权归属、位置类型）
- 2、查询审批历史
- 3、计算补贴明细汇总（政策标准、申请标准、差异标准）
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
| GET | /lov | 变更列表(分页) |
| GET | /do-select | 变更明细 |
| GET | /do-select-print | 变更明细-打印 |
| DELETE | /delete | 删除变更 |
| POST | /operate | 作废 |
| POST | /do-save | 保存 |
| GET | /role | 成员查询 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 通过→onWfComplete；驳回→onWfBreak |
| onWfComplete | 审批通过 | 计算超期/扣减，回写原申请单 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_APPLY_CHANGE_HEADER">

| 字段名 | 类型 | 说明 |
|------|------|------|
| terminal_change_id | Long | 主键ID(变更ID) |
| terminal_change_no | String | 变更单号 |
| terminal_apply_id | Long | 关联装修申请ID(必填) |
| terminal_apply_no | String | 关联装修申请单号 |
| terminal_id | Long | 门店ID |
| terminal_code | String | 门店编码 |
| terminal_name | String | 门店名称 |
| cust_id | Long | 经销商ID |
| cust_code | String | 经销商编码 |
| cust_name | String | 经销商名称 |
| short_name | String | 经销商简称 |
| cust_full_name | String | 经销商拼接名称 |
| customer_class | Long | 经营属性 |
| d_cust_id | Long | 分销商ID |
| d_cust_code | String | 分销商编码 |
| d_cust_name | String | 分销商名称 |
| d_cust_full_name | String | 分销商拼接名称 |
| province_areaid | Long | 省ID |
| city_areaid | Long | 市ID |
| county_areaid | Long | 县/区ID |
| areaname | String | 拼接省市区 |
| addr | String | 详细地址 |
| terminal_type | Long | 门店类型 |
| store_location_type | Long | 位置类型 |
| trading_company_id | Long | 交易公司ID(必填-变更后) |

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
| 新增时报"未获取+到门店申请信息" | 关联的装修申请ID不存在 |
| 删除报"不能删除非制单状态的单据" | 仅NEW状态可删除 |
| 变更后原申请单未更新 | 检查工作流是否审批通过，onWfComplete是否正常执行 |

</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

" | 日期 | 作者 | 说明 |
|------|------|------|
| 2025-11-22 | hfy | 初始创建 |
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
