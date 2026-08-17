<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="额度内兑现批量复核" desc="额度内兑现的批量复核功能，支持批量审批额度内兑现申请单" />

<KbCard title="基本信息">

| 项目 | 说明 |
|------|------|
| Controller | FinFeeInCashHeadController |
| API路径 | /v1/{organizationId}/fin-fee-in-cash-heads |
| Entity | FinFeeInCashHead |
| 数据库表 | FIN_FEE_IN_CASH_HEAD |
| 工作流编码 | STORE_FIN_FEE_IN_CASH_HEAD |
| 前端页面 | finFeeInCashHead |
| ServiceImpl | FinFeeInCashHeadServiceImpl |
| 所属模块 | storeManage |

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
<h4 class="bf-main-title">【额度内兑现批量复核】 — 全链路流程图</h4>
<p class="bf-main-sub">开始 → 额度内兑现单 → ★新建额度内兑现批量复核单★ → ⚖审批通过？ → 推送共享/资金池 → 结束（拒绝则修改重提）</p>
<div class="bf-fc-svg-wrap">
<svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 720" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
<marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
<marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
<marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
</defs>
<rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
<rect x="280" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="340" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">额度内兑现单</text>
<rect x="410" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="470" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">经销商/门店</text>
<rect x="540" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">事业部</text>
<rect x="670" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="730" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则</text>
<rect x="800" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
<text x="860" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流引擎</text>
<line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
<rect x="560" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
<line x1="600" y1="194" x2="600" y2="222" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="515" y="222" width="170" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="600" y="246" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★新建额度内兑现批量复核单★</text>
<text x="600" y="266" text-anchor="middle" fill="#DCFCE7" font-size="10">选兑现单·绑定·保存</text>
<line x1="600" y1="276" x2="600" y2="304" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<polygon points="600,304 670,334 600,364 530,334" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="338" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 审批通过？</text>
<line x1="670" y1="334" x2="780" y2="334" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
<rect x="735" y="319" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
<text x="780" y="338" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>
<line x1="780" y1="319" x2="780" y2="249" stroke="#EF4444" stroke-width="1.5"/>
<line x1="780" y1="249" x2="515" y2="249" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
<line x1="600" y1="364" x2="600" y2="392" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="520" y="392" width="160" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="600" y="419" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">推送共享/资金池</text>
<line x1="600" y1="436" x2="600" y2="464" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<rect x="545" y="464" width="110" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="600" y="491" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
<line x1="600" y1="508" x2="600" y2="528" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
<rect x="50" y="528" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="600" y="550" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
<rect x="270" y="562" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="345" y="585" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">共享/EBS接口</text>
<rect x="440" y="562" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="515" y="585" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">资金池(EBS)</text>
<rect x="610" y="562" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="685" y="585" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">兑现单状态更新</text>
<rect x="780" y="562" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
<text x="855" y="585" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">报销核算</text>
</svg>
</div>
<div class="bf-fc-legend">
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
<span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
<span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
</div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 新增逻辑（doInsert）">

**具体逻辑**：

- 1、生成复核单号：编码规则`AE.CASH_CODE`，参数包含divisionCode
- 2、插入主表
- 3、更新兑现单绑定：批量更新FinFeeTerminalCashout的cashId
</KbCard>

<KbCard num="2" title="2.2 更新逻辑（doUpdate）">

**具体逻辑**：

- 1、更新主表
- 2、解绑旧兑现单(doDeleteLine)：将原绑定的兑现单cashId置空
- 3、绑定新兑现单(doUpdateLine)：更新新兑现单的cashId
</KbCard>

<KbCard num="3" title="2.3 删除逻辑（doDelete）">

**具体逻辑**：

- 1、删除主表
- 2、解绑关联兑现单：将cashId置空
</KbCard>

<KbCard num="4" title="2.4 审批通过回调（onWfComplete）">

**具体逻辑**：

- 1、推送共享(doSendShare)
- 2、更新复核单：auditStat=审核完成，hzApproveStatus=APPROVED
- 3、批量更新兑现单：auditStat=审核完成，postFlag=Y，hzApproveStatus=APPROVED
</KbCard>

<KbCard num="5" title="2.5 推送共享（doSendShare）">

**具体逻辑**：

- 1、查询复核单绑定的兑现单明细
- 2、遍历每个兑现单：
- 3、获取对应报销单的支付方式
- 4、支付方式=3(折扣折让)：推送资金池(synAdjustCashPoolToEbs)
- 5、其他：推送共享接口(待实现)
- 6、校验收款报销单号和门头兑现单号不能同时为空
</KbCard>

<KbCard num="6" title="2.6 推送资金池（synAdjustCashPoolToEbs）">

**具体逻辑**：

- 1、获取经销商账户(extAccountId)
- 2、构建CashPoolDataDTO，sourceType="广告费（额内）"
- 3、amount取inThisCashoutAmt(额度内兑现金额)
- 4、使用兑现单号(orderPlanShareNo)作为唯一来源单号
- 5、调用ebsSdkService.synAdjustCashPoolToEbs推送
- 6、推送成功：标记isShare=2，shareFlag=2，auditStat=审核通过
</KbCard>

<KbCard num="7" title="2.7 总账日期获取（getLedgerDate）">

**具体逻辑**：

- 1、查询事业部上月是否存在入账成功的冲销数据
- 2、存在：总账日期为今天
- 3、不存在：总账日期为上个月最后一天
</KbCard>

<KbCard num="8" title="2.8 查询兑现单明细（doSelect）">

**具体逻辑**：

- 1、查询复核单基本信息
- 2、查询绑定的额度内兑现单明细
- 3、过滤共享已驳回的兑现单(isShare!=2)
- 4、计算allCashFlag(可推送兑现单数量)
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
| GET | / | 额度内兑现列表(分页) |
| GET | /{cashId}/detail | 额度内兑现明细 |
| POST | / | 创建或更新额度内兑现 |
| DELETE | / | 删除额度内兑现 |

</KbCard>

<KbCard title="3.2 工作流回调">

| 方法 | 触发时机 | 逻辑说明 |
|------|------|------|
| wfProcSubmit | 提交审批 | 启动工作流实例 |
| wfComplete | 审批完成 | 推送共享/资金池，更新兑现单状态 |
| onWfComplete | 审批通过 | doSendShare + 批量更新 |

</KbCard>

<KbCard num="1" title="表：FIN_FEE_IN_CASH_HEAD">

| 字段名 | 类型 | 说明 |
|------|------|------|
| cash_id | Long | 主键ID(单据ID) |
| cash_code | String | 单号 |
| organization_id | Long | 组织ID |
| creator | String | 申请人 |
| create_time | Date | 申请日期 |
| creator_name | String | 申请人名称 |
| updator | String | 更新人 |
| update_time | Date | 更新日期 |
| updator_name | String | 更新人名称 |
| stat | Long | 单据状态 |
| wfid | Long | 流程ID |
| wfflag | Long | 流程状态 |
| checker | String | 审核人 |
| check_time | Date | 审核时间 |
| audit_stat | String | 审核状态 |
| hz_instance_id | Long | 流程实例ID |
| hz_approve_status | String | 流程实例状态 |

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
| 推送报"验收报销单号和门头兑现单号为空" | 绑定的兑现单必须关联验收报销单或门头兑现单 |
| 资金池推送失败 | 检查ERP接口连通性和extAccountId |
| 兑现单未标记审核完成 | 确认工作流审批已通过，onWfComplete正常执行 |
| 总账日期异常 | 检查事业部上月冲销数据(FinFeeWriteoffInQuota) |

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
| 2025-12-01 | hfy | 初始创建 |
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
