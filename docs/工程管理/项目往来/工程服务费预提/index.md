<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="工程服务费预提" desc="工程管理-项目往来业务说明" />

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
出库单签收数据 ──定时任务/手工触发──> 预提数据生成(按交易公司+法人+年月汇总)
                                          │
                                          ├── 自动生成共享单号(GCYT编码规则)
                                          ├── 自动生成预提单号(按事业部编码规则)
                                          ├── 初始单据状态=保存(SAVE)
                                          │
                                          ▼
                                    执行(推共享) ──推送共享接口──> 共享系统处理
                                          │                              │
                                          ▼                              ▼
                                    状态→审批中(AUDITING)          共享返回成功/失败
                                                                   │
                                              ┌───────────────────┤
                                              ▼                   ▼
                                         共享处理成功         共享返回失败(报错)
                                              │
                                              ▼
                                         作废(推共享) ──推送作废数据(负数金额)──> 共享系统
                                              │
                                              ▼
                                         重新生成 ──按年月重新生成预提数据──> 新预提单
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 出库单签收数据(expense_withholding_view) | 数据依赖 | 定时任务基于出库单签收数据自动生成预提数据，预提金额=服务费×预提比例 | 出库单已签收，差异单审批通过 |
| 事业部基础设置(DIVISION_BASE_SET) | 配置依赖 | 获取事业部编码，用于生成预提单号 | 事业部已配置 |
| 编码规则(AE.SHARE_NO/AE.WITHHOLDING_NO) | 配置依赖 | 生成共享单号和预提单号 | 编码规则已配置 |
| 共享接口(ArrowFsscSdk.inLimitBudPush) | 配置依赖 | 执行/作废时推送预提数据到共享系统 | 共享接口可用 |
| LOV配置(AE.SIE.POSITION_LDAP_CODE) | 配置依赖 | 获取申请人职位编码 | LOV已配置 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 财务共享(FSCC) | 预算占用更新 | 执行时推送正数金额到共享系统，占用预算；作废时推送负数金额，释放预算 |
| 服务费预提 | 预提单状态流转 | 执行/作废推送成功后，预提单状态更新为审批中(AUDITING) |
| 服务费预提 | 重算预提数据 | 作废后可重新生成，生成新的共享单号和预提单号，原单据状态标记为作废(INVALID) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：定时任务自动生成预提数据 定时生成">
<KbQuote>按月自动汇总出库单签收数据，生成服务费预提单，避免人工遗漏</KbQuote>

**具体逻辑**：

- 1、定时任务WithholdingInProjectJob支持三种模式：指定单月(syncFlag=1)、指定时间段(syncFlag=2)、全量(syncFlag=3)
- 2、从expense_withholding_view视图查询预提数据，按交易公司+法人客户+年月+成本中心+费用科目维度汇总
- 3、同一交易公司+法人+年月+成本中心维度下，若已存在非作废状态的预提单则跳过；若存在保存状态的预提单则更新金额
- 4、新生成的预提单初始状态为保存(SAVE)，自动生成共享单号和预提单号
</KbCard>

<KbCard num="2" title="重点逻辑2：执行推送共享 执行">
<KbQuote>将预提数据推送到共享系统进行预算占用，实现财务预提入账</KbQuote>

**具体逻辑**：

- 1、推送前校验单据编码、年月、交易公司不能为空
- 2、按共享单号查询所有预提明细，汇总不含税金额作为推送总金额
- 3、推送数据包含头信息和行明细，头信息含总金额、申请人、审批日期(取年月最后一天)；行明细含每条预提记录的金额、成本中心、费用科目等
- 4、执行时attribute1=1(正向)，作废时attribute1=2(冲销)，作废时金额取负数，共享单号追加_F后缀
- 5、共享接口返回状态为S则成功，否则报错展示共享返回的错误信息
</KbCard>

<KbCard num="3" title="重点逻辑3：作废与重新生成 作废">
<KbQuote>对已生成的预提单进行作废冲销，并支持按原年月重新生成</KbQuote>

**具体逻辑**：

- 1、作废时推送负数金额到共享系统，共享单号追加_F后缀以区分
- 2、重新生成前校验该年月下是否已存在非作废状态的预提单，若存在则报错提示无需重复生成
- 3、重新生成时syncFlag=1，按指定年月重新从视图查询数据并生成新预提单
- 4、作废和执行共用同一推送逻辑(operateExpenseWithholding)，通过flag参数区分(1=作废,0=执行)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：工程服务费预提列表页">
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
<td>共享单号</td>
<td>文本框</td>
<td>推送共享系统的单据编号</td>
<td>常显</td>
<td>新增时按编码规则AE.SHARE_NO自动生成，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.SHARE_NO</td>
</tr>
<tr>
<td>预提单号</td>
<td>文本框</td>
<td>系统内部预提单编号</td>
<td>常显</td>
<td>新增时按编码规则AE.WITHHOLDING_NO自动生成，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_NO</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>交易公司名称</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>法人客户编码</td>
<td>文本框</td>
<td>法人客户编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>法人客户名称</td>
<td>文本框</td>
<td>法人客户名称</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>预提年度</td>
<td>文本框</td>
<td>预提所属年度</td>
<td>常显</td>
<td>来源于出库签收数据的年月，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_YEAR</td>
</tr>
<tr>
<td>预提月份</td>
<td>文本框</td>
<td>预提所属月份</td>
<td>常显</td>
<td>来源于出库签收数据的年月，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_MONTH</td>
</tr>
<tr>
<td>预提总额(含税)</td>
<td>数值框</td>
<td>预提含税总额</td>
<td>常显</td>
<td>来源于出库签收汇总，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_RAX_AMOUNT</td>
</tr>
<tr>
<td>预提总额(不含税)</td>
<td>数值框</td>
<td>预提不含税总额</td>
<td>常显</td>
<td>来源于出库签收汇总，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.WITHHOLDING_NORAX_AMOUNT</td>
</tr>
<tr>
<td>成本中心编码</td>
<td>文本框</td>
<td>成本中心编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.COST_CODE</td>
</tr>
<tr>
<td>成本中心名称</td>
<td>文本框</td>
<td>成本中心名称</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.COST_NAME</td>
</tr>
<tr>
<td>费用科目编码</td>
<td>文本框</td>
<td>费用科目编码</td>
<td>常显</td>
<td>来源于出库签收数据，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.FEECODE</td>
</tr>
<tr>
<td>单据状态</td>
<td>下拉选择框</td>
<td>预提单状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>0-保存/3-审批中/7-作废</td>
<td>EXPENSE_WITHHOLDING_HEAD.BILL_STATUS</td>
</tr>
<tr>
<td>是否家装</td>
<td>单选框</td>
<td>是否家装合同</td>
<td>常显</td>
<td>来源于出库签收数据，2=家装</td>
<td>1-工程/2-家装</td>
<td>EXPENSE_WITHHOLDING_HEAD.IS_HOME</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>备注</td>
<td>常显</td>
<td>默认空，不可编辑</td>
<td>-</td>
<td>EXPENSE_WITHHOLDING_HEAD.REMARK</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 执行 | 推送预提数据到共享系统 | 详情页 | 单据状态=保存 | 调用/v1/{orgId}/expense-withholding-heads/execute，推送成功后状态→审批中 |
| 作废 | 推送作废数据(负数金额)到共享系统 | 详情页 | 单据状态=保存或审批中 | 调用/v1/{orgId}/expense-withholding-heads/invalid，推送成功后状态→审批中 |
| 重新生成 | 对作废的预提单按原年月重新生成 | 详情页 | 单据状态=作废 | 调用/v1/{orgId}/expense-withholding-heads/regenerate，生成新的预提单 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：重新生成时校验是否已存在非作废状态的预提单 —— 防止重复生成</KbSubTitle>

- 第1点：按年月+交易公司编码查询EXPENSE_WITHHOLDING_HEAD表中bill_status!=7的记录
- 第2点：若存在则报错提示"已存在重新生成【xxx】单据，无需重复生成"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EXPENSE_WITHHOLDING_HEAD 
    WHERE TO_CHAR(CHECK_TIME, 'yyyy-MM') = '{年月}' 
      AND TRADING_COMPANY_CODE = '{交易公司编码}' 
      AND NVL(BILL_STATUS, 0) != 7
```

<KbSubTitle>校验2：执行/作废时校验必填参数 —— 确保推送数据完整</KbSubTitle>

- 第1点：单据编码不能为空
- 第2点：年月不能为空
- 第3点：交易公司不能为空

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EXPENSE_WITHHOLDING_HEAD WHERE SHARE_NO = '{共享单号}'
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[保存SAVE] ──执行──> [审批中AUDITING]
[保存SAVE] ──作废──> [审批中AUDITING] (作废冲销)
[审批中AUDITING] ──作废──> [审批中AUDITING] (作废冲销)
[任意状态] ──定时任务检测到作废──> [作废INVALID]
[作废INVALID] ──重新生成──> [保存SAVE] (新单据)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 0 | 保存 | 执行、作废 |
| 3 | 审批中 | 作废 |
| 7 | 作废 | 重新生成 |

---

</KbCard>
<KbCard num="1" title="表1：EXPENSE_WITHHOLDING_HEAD（工程服务费预提主表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| WITHHOLDING_HEAD_ID | NUMBER | 预提主键ID | - | 自增主键 |
| WITHHOLDING_NO | VARCHAR | 预提单号 | 预提单号 | 按编码规则AE.WITHHOLDING_NO生成 |
| SHARE_NO | VARCHAR | 共享单号 | 共享单号 | 按编码规则AE.SHARE_NO生成，作废时追加_F后缀 |
| DIVISION_ID | NUMBER | 事业部ID | - | 来源于出库签收数据 |
| ORGANIZATION_ID | NUMBER | 组织ID | - | 来源于出库签收数据 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | - | 来源于出库签收数据 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | 来源于出库签收数据 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司名称 | 来源于出库签收数据 |
| BILLING_UNIT_CODE | VARCHAR | 法人客户编码 | 法人客户编码 | 来源于出库签收数据 |
| BILLING_UNIT_NAME | VARCHAR | 法人客户名称 | 法人客户名称 | 来源于出库签收数据 |
| WITHHOLDING_YEAR | VARCHAR | 预提年度 | 预提年度 | 来源于签收数据的年月 |
| WITHHOLDING_MONTH | VARCHAR | 预提月份 | 预提月份 | 来源于签收数据的年月 |
| CHECK_TIME | DATE | 审批通过时间 | - | 签收审批通过时间 |
| WITHHOLDING_RAX_AMOUNT | NUMBER | 预提含税总额 | 预提总额(含税) | 服务费×预提比例(含税) |
| WITHHOLDING_NORAX_AMOUNT | NUMBER | 预提不含税总额 | 预提总额(不含税) | 服务费×预提比例(不含税) |
| COST_CODE | VARCHAR | 成本中心编码 | 成本中心编码 | 来源于出库签收数据 |
| COST_NAME | VARCHAR | 成本中心名称 | 成本中心名称 | 来源于出库签收数据 |
| FEECODE | VARCHAR | 费用科目编码 | 费用科目编码 | 来源于出库签收数据 |
| BILL_STATUS | NUMBER | 单据状态 | 单据状态 | 0-保存/3-审批中/7-作废 |
| GENERATED_TIMES | NUMBER | 重新生成次数 | - | 默认0，每次重新生成+1 |
| IS_HOME | NUMBER | 是否家装 | 是否家装 | 1-工程/2-家装 |
| REMARK | VARCHAR | 备注 | 备注 | 默认空 |
| ATTRIBUTE1~5 | VARCHAR | 弹性字段 | - | 扩展字段 |

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
            <td style="color:#DC2626;font-weight:600;">已存在重新生成【xxx】单据，无需重复生成！</td>
            <td style="font-size:13px;">重新生成</td>
            <td style="font-size:13px;">该年月下已存在非作废状态的预提单，不可重复生成。需先作废现有预提单后再重新生成</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">参数错误！</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">传入的DTO对象为null</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">单据编码不能为空</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享单号为空，需检查预提单数据完整性</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">年月不能为空</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">审批通过时间为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">交易公司不能为空</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">交易公司编码为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未查询到预提单数据，单据号：xxx</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">按共享单号查询不到预提单数据，可能数据已被删除</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">共享接口返回null,执行共享接口失败！</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享接口调用失败，检查共享系统连通性</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-7" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">共享返回的错误信息</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享系统处理失败，根据具体错误信息排查</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-8" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请传入正确的同步时间段</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">定时任务参数startDate/endDate格式错误或为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-9" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">时间参数格式不符合yyyy-MM</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-10" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>已存在重新生成【xxx】单据，无需重复生成！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>该年月下已存在非作废状态的预提单，不可重复生成。需先作废现有预提单后再重新生成</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>参数错误！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>传入的DTO对象为null</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>单据编码不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享单号为空，需检查预提单数据完整性</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>年月不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>审批通过时间为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>交易公司不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>交易公司编码为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未查询到预提单数据，单据号：xxx</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>按共享单号查询不到预提单数据，可能数据已被删除</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-7" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>共享接口返回null,执行共享接口失败！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享接口调用失败，检查共享系统连通性</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-8" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>共享返回的错误信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享系统处理失败，根据具体错误信息排查</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-9" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请传入正确的同步时间段</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>定时任务参数startDate/endDate格式错误或为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-10" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>时间参数格式不符合yyyy-MM</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">定时任务执行后未生成预提数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>expense_withholding_view视图中无对应年月的出库签收数据，或DIVISION_BASE_SET中无对应事业部配置<br>
      <strong style="color:#7C3AED;">处理：</strong>1)检查视图数据`SELECT * FROM expense_withholding_view WHERE check_time = '{年月}'`; 2)检查事业部配置`SELECT * FROM division_base_set WHERE organization_id IN (...)`
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">执行推送共享后状态未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>共享接口返回成功但updateBillStatus执行异常，或共享单号对应多条记录<br>
      <strong style="color:#7C3AED;">处理：</strong>`SELECT * FROM EXPENSE_WITHHOLDING_HEAD WHERE SHARE_NO = '{共享单号}'`检查记录状态
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
| 2026-07-31 | - | - | 初始生成知识库文档 |
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
