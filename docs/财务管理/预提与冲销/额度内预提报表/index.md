<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="额度内预提报表" desc="财务管理-预提与冲销业务说明" />

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
门店费用预提数据 ──手工触发更新──> 预提数据生成(按组织+法人+年月+兑现模式汇总)
                                        │
                                        ├── 查询法人销售区域确定bxType(成本中心类型)
                                        ├── 查询成本中心(CostCenterVO)补充编码和名称
                                        ├── 区分新旧科目：旧科目预提=旧科目兑现金额，新科目预提=剩余预提
                                        ├── 新科目cashOutMode=GGFDXRZJC，不含税=含税
                                        ├── 旧科目不含税=含税/税率(Inlimit_Tax_Rate)
                                        ├── 初始单据状态=制单(0)
                                        │
                                        ▼
                                  执行(推共享) ──推送预提数据到共享接口──> 共享系统处理
                                        │                                    │
                                        ▼                                    ▼
                                  校验数据完整性                     共享返回成功(S)/失败
                                        │                                    │
                                        ▼                                    ▼
                                  更新billStatus=1(已执行)          报错展示共享错误信息
                                        │
                                        ▼
                                  作废(推共享) ──推送作废数据(负数金额)──> 共享系统
                                        │
                                        ▼
                                  更新billStatus=7(作废)
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 门店费用预提视图(withholding_in_quota_new_view) | 数据依赖 | 预提数据基于门店费用预提视图数据生成 | 预提源数据已生成 |
| 额度内冲销数据(new_writeoff_in_quota_view) | 数据依赖 | 旧科目预提金额=旧科目兑现金额，需查询冲销数据 | 冲销数据已生成 |
| 事业部基础设置(DIVISION_BASE_SET) | 配置依赖 | 获取事业部编码，用于生成预提单号前缀 | 事业部已配置 |
| 法人销售区域(LegalSalezoneEntity) | 配置依赖 | 确定bxType用于匹配成本中心 | 销售区域已配置 |
| 成本中心(CostCenter) | 配置依赖 | 按事业部+bxType匹配成本中心编码和名称 | 成本中心已配置 |
| 冲销税率(Inlimit_Tax_Rate) | 配置依赖 | 旧科目不含税金额=含税金额/税率 | 税率已配置 |
| 共享接口(ArrowFsscSdk) | 配置依赖 | 执行/作废时推送预提数据到共享系统 | 共享接口可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 财务共享(FSCC) | 预算占用更新 | 执行时推送正数金额到共享系统，占用预算；作废时推送负数金额，释放预算 |
| 服务费预提 | 预提单状态流转 | 执行成功后billStatus=1(已执行)，作废后billStatus=7(作废) |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：更新预提数据 更新">
<KbQuote>手工触发从视图查询上月预提数据，按维度汇总生成或更新预提记录</KbQuote>

**具体逻辑**：

- 1、updateAccrualData接口自动取上月年月(startDate=当前月-1)
- 2、从withholding_in_quota_new_view视图查询预提源数据，过滤organizationId&gt;0的有效数据
- 3、查询法人销售区域(LegalSalezoneEntityVO)，按organizationId+corporateCode匹配，确定bxType
- 4、bxType计算逻辑：根据事业部ID和销售区域名称(含"南"/"北"/"鲁豫"/"赣皖"/"法恩莎营销"/"安华营销")确定成本中心类型
- 5、按organizationId+bxType查询成本中心(CostCenterVO)，补充costCenterCode和costCenterName
- 6、按corporateCode查询法人客户信息，补充corporateName
- 7、调用distributionWithholdingInQuota进行新旧科目分配
</KbCard>

<KbCard num="2" title="重点逻辑2：新旧科目分配逻辑 核心逻辑">
<KbQuote>根据兑现模式区分新旧会计科目，旧科目预提=旧科目兑现金额，剩余为新科目预提</KbQuote>

**具体逻辑**：

- 1、先按yearmonth+tradingCompanyCode+corporateCode+organizationId查询冲销兑现数据(newWriteoffInQuotaViewMap)
- 2、若存在旧科目兑现(非GGFDXRZJC模式)，旧科目预提含税金额=兑现总额totalAmount，不含税=含税/税率
- 3、剩余预提金额=总预提含税金额-旧科目预提含税金额
- 4、若剩余预提&gt;0，全部归为新科目预提，cashOutMode=GGFDXRZJC，新科目不含税=含税(不除税率)
- 5、dataLog字段记录运算参数(cashOldAmt/holdingAmt/holdingOldAmt)用于审计
</KbCard>

<KbCard num="3" title="重点逻辑3：执行与作废 执行/作废">
<KbQuote>执行推送预提数据到共享系统占用预算，作废推送负数金额释放预算</KbQuote>

**具体逻辑**：

- 1、前端列表行操作，billStatus=0(制单)时显示"执行"按钮，billStatus=1(已执行)时显示"作废"按钮
- 2、执行时调用execute接口，传入withholdingId
- 3、作废时调用invalid接口，传入withholdingId
- 4、执行/作废共用推送逻辑，通过flag参数区分
- 5、推送成功后更新billStatus：执行→1(已执行)，作废→7(作废)
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：费用额度内预提列表页">
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
<td>单据状态</td>
<td>下拉选择框</td>
<td>预提单状态</td>
<td>常显</td>
<td>0-制单/1-已执行/7-作废</td>
<td>0,1,7</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.BILL_STATUS</td>
</tr>
<tr>
<td>事业部编码</td>
<td>文本框</td>
<td>事业部编码(传共享)</td>
<td>常显</td>
<td>按编码规则生成</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.WITHHOLDING_HEADER_NO</td>
</tr>
<tr>
<td>预提单号</td>
<td>文本框</td>
<td>预提单号</td>
<td>常显</td>
<td>按编码规则生成</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.WITHHOLDING_NO</td>
</tr>
<tr>
<td>年月</td>
<td>文本框</td>
<td>预提年月</td>
<td>常显</td>
<td>格式yyyy-MM</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.YEARMONTH</td>
</tr>
<tr>
<td>事业部</td>
<td>下拉选择框</td>
<td>事业部</td>
<td>常显</td>
<td>值集epm.division</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.DIVISION_ID</td>
</tr>
<tr>
<td>成本中心编码</td>
<td>文本框</td>
<td>成本中心编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.COST_CENTER_CODE</td>
</tr>
<tr>
<td>成本中心名称</td>
<td>文本框</td>
<td>成本中心名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.COST_CENTER_NAME</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>法人编码</td>
<td>文本框</td>
<td>法人编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.CORPORATE_CODE</td>
</tr>
<tr>
<td>法人名称</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.CORPORATE_NAME</td>
</tr>
<tr>
<td>预提含税金额</td>
<td>数值框</td>
<td>预提含税总额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.WITHHOLDING_TAX_AMT</td>
</tr>
<tr>
<td>预提不含税金额</td>
<td>数值框</td>
<td>预提不含税总额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.WITHHOLDING_ETAX_AMT</td>
</tr>
<tr>
<td>会计科目</td>
<td>文本框</td>
<td>会计科目名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>FIN_FEE_WITHHOLDING_IN_QUOTA.SUBJECT_NAME</td>
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
| 执行 | 推送预提数据到共享系统 | 列表行操作 | billStatus=0(制单) | 调用execute接口，成功后状态→1(已执行) |
| 作废 | 推送作废数据到共享系统 | 列表行操作 | billStatus=1(已执行) | 调用invalid接口，成功后状态→7(作废) |
| 导出 | 导出预提数据Excel | Header按钮 | 有权限 | 调用/v1/0/withholding-in-quotas/export |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[制单0] ──执行──> [已执行1]
[已执行1] ──作废──> [作废7]
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 0 | 制单 | 执行、更新 |
| 1 | 已执行 | 作废 |
| 7 | 作废 | 无 |

---

</KbCard>
<KbCard num="1" title="表1：FIN_FEE_WITHHOLDING_IN_QUOTA（费用额度内预提表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| WITHHOLDING_ID | BIGINT | 预提主键ID | - | 自增主键 |
| WITHHOLDING_NO | VARCHAR | 预提单号 | 预提单号 | 按编码规则生成 |
| WITHHOLDING_HEADER_NO | VARCHAR | 事业部编码(传共享) | 事业部编码 | 按编码规则生成 |
| SHARE_NO | VARCHAR | 共享单号 | - | 推送共享时使用 |
| YEARMONTH | VARCHAR | 年月 | 年月 | 格式yyyy-MM |
| ORGANIZATION_ID | BIGINT | 组织ID | - | 来源于预提视图 |
| CORPORATE_CODE | VARCHAR | 法人编码 | 法人编码 | 来源于预提视图 |
| CORPORATE_NAME | VARCHAR | 法人名称 | 法人名称 | 来源于客户主数据 |
| DIVISION_ID | BIGINT | 事业部ID | 事业部 | 来源于DivisionBaseSet |
| DIVISION_NAME | VARCHAR | 事业部名称 | - | 来源于预提视图 |
| COST_CENTER_CODE | VARCHAR | 成本中心编码 | 成本中心编码 | 按bxType匹配 |
| COST_CENTER_NAME | VARCHAR | 成本中心名称 | 成本中心名称 | 按bxType匹配 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 来源于预提视图 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | - | 来源于预提视图 |
| WITHHOLDING_TAX_AMT | DECIMAL | 预提含税总额 | 预提含税金额 | 新科目=含税；旧科目=含税 |
| WITHHOLDING_ETAX_AMT | DECIMAL | 预提不含税总额 | 预提不含税金额 | 旧科目=含税/税率；新科目=含税 |
| SUMAMT | DECIMAL | 出库预提总额 | - | - |
| SUMPAYAMT | DECIMAL | 门店装修验收额度内应付总额 | - | - |
| SYNC_ITEM | DATE | 同步时间 | - | 数据生成时间 |
| BILL_STATUS | BIGINT | 单据状态 | 单据状态 | 0-制单/1-已执行/7-作废 |
| GENERATED_TIMES | BIGINT | 重新生成记录数 | - | 默认0，每次重新生成+1 |
| SUBJECT_NAME | VARCHAR | 会计科目名称 | 会计科目 | - |
| CASH_OUT_MODE | VARCHAR | 兑现模式 | - | GGFDXRZJC=新科目，null=旧科目 |
| DATA_LOG | VARCHAR | 运算记录 | - | JSON格式记录计算参数 |

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
            <td style="color:#DC2626;font-weight:600;">共享接口返回null,执行共享接口失败！</td>
            <td style="font-size:13px;">执行</td>
            <td style="font-size:13px;">共享接口调用失败，检查共享系统连通性</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">共享返回的错误信息</td>
            <td style="font-size:13px;">执行/作废</td>
            <td style="font-size:13px;">共享系统处理失败，根据具体错误信息排查</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>共享接口返回null,执行共享接口失败！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享接口调用失败，检查共享系统连通性</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>共享返回的错误信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享系统处理失败，根据具体错误信息排查</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">更新预提数据后记录数为0</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>withholding_in_quota_new_view视图中无上月预提源数据，或organizationId&lt;=0<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">新旧科目分配金额异常</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>冲销兑现数据(newWriteoffInQuotaViewMap)缺失导致旧科目预提=0，全部归入新科目<br>
      <strong style="color:#7C3AED;">处理：</strong>检查DATA_LOG字段中的运算记录，核对cashOldAmt和holdingAmt
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">成本中心为空</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>法人销售区域未配置或bxType计算结果与成本中心不匹配<br>
      <strong style="color:#7C3AED;">处理：</strong>检查LegalSalezoneEntity和CostCenter配置
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

> 要求：
> 1. 按倒序展示
> 2. 只需要包含2026年的提交记录
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
