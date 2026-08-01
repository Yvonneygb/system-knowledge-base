<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="工程服务费冲销" desc="财务管理-预提与冲销业务说明" />

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
工程服务费预提数据 ──定时任务(ExpenseWriteoffInQuotaJob)──> 冲销数据自动生成
                                                        │
                                                        ├── 按年月+交易公司+法人+事业部维度汇总
                                                        ├── 区分工程/家装(isHome): 工程前缀GCCX, 家装前缀JZCX
                                                        ├── 冲销头单号=前缀+交易公司编码+年月(去横线)
                                                        ├── 含税金额=未兑现总额, 不含税=含税/税率
                                                        ├── 初始单据状态=制单(1)
                                                        │
                                                        ▼
                                                  列表查询/详情查看
                                                        │
                                                        ▼
                                                  推送FSSC ──doserviceWithHolding──> 共享财务系统处理
                                                        │                                    │
                                                        ▼                                    ▼
                                                  校验冲销单号必填                   共享返回成功(S)/失败
                                                  查询头数据和行明细
                                                  金额取负数(冲销)
                                                  构建借贷模式行数据
                                                        │                                    │
                                                        ▼                                    ▼
                                                  更新billStatus=3(审批中)          报错展示共享错误信息
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 工程服务费预提数据 | 数据依赖 | 定时任务基于预提数据自动生成冲销数据，冲销金额=未兑现服务费总额 | 预提数据已生成且审批通过 |
| 事业部基础设置(DIVISION_BASE_SET) | 配置依赖 | 获取事业部编码和名称，用于生成冲销单号 | 事业部已配置 |
| 冲销税率(EPM_INLIMIT_TAX_RATE) | 配置依赖 | 计算不含税金额=含税金额/税率 | 税率已配置 |
| 成本中心(SCPCOSTCENTER) | 配置依赖 | 推送共享时按事业部+渠道(4)查询成本中心编码 | 成本中心已配置 |
| 共享接口(FsccSdkService.postToSie) | 配置依赖 | 推送FSSC时调用共享财务接口 | 共享接口可用 |
| 编码规则(AE.WRITE_OFF_NO) | 配置依赖 | 生成冲销单号writeoffNo | 编码规则已配置 |
| 工作流(FIN_SVC_EXP_ACC) | 配置依赖 | 冲销单提交审批使用工作流FIN_SVC_EXP_ACC | 工作流已部署 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 财务共享(FSCC) | 预算释放 | 推送FSSC时金额取负数(冲销)，释放预提时占用的预算 |
| 服务费冲销 | 冲销单状态流转 | 推送成功后billStatus更新为3(审批中) |
| 服务费冲销 | 定时任务重算 | ExpenseWriteoffInQuotaJob定时任务按时间段自动生成冲销数据，制单状态(1)的记录可被更新 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：定时任务自动生成冲销数据 定时生成">
<KbQuote>按时间段自动汇总工程服务费预提数据，生成冲销单，避免人工遗漏</KbQuote>

**具体逻辑**：

- 1、定时任务ExpenseWriteoffInQuotaJob接收startDate和endDate参数，格式yyyy-MM
- 2、调用generateExpenseWriteoffInQuotaQuery查询预提源数据
- 3、按isHome区分工程/家装：工程前缀GCCX，家装前缀JZCX
- 4、冲销头单号writeoffHeadno=前缀+交易公司编码+年月(去横线)，若已存在则复用
- 5、含税金额writeoffTaxAmt=SUM_TOTAL_UNCASH_AMT(未兑现总额)，不含税=含税/税率
- 6、若该维度无记录或billStatus=7(作废)，则新增(insert)；若billStatus=1(制单)，则更新(update)
- 7、其他状态(如3-审批中)不更新，保护已推送数据
</KbCard>

<KbCard num="2" title="重点逻辑2：推送FSSC共享 推送">
<KbQuote>将冲销数据推送到共享财务系统(FSSC)进行预算释放，实现财务冲销入账</KbQuote>

**具体逻辑**：

- 1、推送前校验headNo(冲销单号)不能为空，为空则报错"请传入冲销单号！"
- 2、按headNo查询冲销头数据(ExpenseWriteoffInQuotaPushVO)
- 3、预提金额和批准金额均取负数("-"+原金额)，表示冲销方向
- 4、sourceOrderId和sourceOrderCode设为apportionCode(分配编码)
- 5、按userId查询申请人编码(empid)和部门编码(orgId)，设置applyLdapCode/orgLdapCode
- 6、获取申请人职位编码positionLdapCode，LOV编码AE.SIE.POSITION_LDAP_CODE，含义值expense_writeoff_in_quota
- 7、费用发生日期=attribute2年月的下月第1天-1天(即月末)，设置approveDate/creationDate/lastUpdateDate
- 8、行明细查询(selectDealerDetail)，每行设置币种/汇率/ERP类型/来源系统/来源单据类型
- 9、行金额取负数，按事业部查询成本中心编码(Scpcostcenter, channel=4)设置orgSourceId
- 10、调用fsccSdkService.postToSie推送，processStatus="S"则成功，更新billStatus=3(审批中)
</KbCard>

<KbCard num="3" title="重点逻辑3：冲销单号生成规则">
<KbQuote>冲销头单号按规则生成，同批次数据共享同一头单号</KbQuote>

**具体逻辑**：

- 1、工程冲销前缀GCCX，家装冲销前缀JZCX
- 2、头单号=前缀+交易公司编码+年月(去横线)，如GCCX001202607
- 3、定时任务生成时，若同前缀的头单号已存在则复用，否则新建
- 4、冲销明细单号writeoffNo按编码规则AE.WRITE_OFF_NO生成，变量DIVISION_CODE
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：hlod低代码查询页面">
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
<td>冲销单号</td>
<td>文本框</td>
<td>冲销明细单号</td>
<td>常显</td>
<td>按编码规则AE.WRITE_OFF_NO生成</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.WRITEOFF_NO</td>
</tr>
<tr>
<td>冲销头单号</td>
<td>文本框</td>
<td>冲销批次头单号</td>
<td>常显</td>
<td>前缀+交易公司+年月</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.WRITEOFF_HEADNO</td>
</tr>
<tr>
<td>年月</td>
<td>文本框</td>
<td>冲销年月</td>
<td>常显</td>
<td>格式yyyy-MM</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.YEARMONTH</td>
</tr>
<tr>
<td>法人编码</td>
<td>文本框</td>
<td>法人编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>法人名称</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.BILLING_UNIT_NAME</td>
</tr>
<tr>
<td>事业部</td>
<td>文本框</td>
<td>事业部名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.ENTNAME</td>
</tr>
<tr>
<td>交易公司编码</td>
<td>文本框</td>
<td>交易公司编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.TRADING_COMPANY_CODE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>交易公司名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>冲销含税金额</td>
<td>数值框</td>
<td>冲销含税总额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.WRITEOFF_TAX_AMT</td>
</tr>
<tr>
<td>冲销不含税金额</td>
<td>数值框</td>
<td>冲销不含税总额</td>
<td>常显</td>
<td>含税/税率</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.WRITEOFF_NOTAX_AMT</td>
</tr>
<tr>
<td>出库冲销总额</td>
<td>数值框</td>
<td>出库冲销总额</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.WRITEOFF_SUMAMT</td>
</tr>
<tr>
<td>单据状态</td>
<td>下拉选择框</td>
<td>冲销单状态</td>
<td>常显</td>
<td>1-制单/3-审批中/7-作废</td>
<td>1,3,7</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.BILL_STATUS</td>
</tr>
<tr>
<td>是否家装</td>
<td>下拉选择框</td>
<td>是否家装合同</td>
<td>常显</td>
<td>1-工程/2-家装</td>
<td>1,2</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.IS_HOME</td>
</tr>
<tr>
<td>成本中心编码</td>
<td>文本框</td>
<td>成本中心编码</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.COST_CENTER_CODE</td>
</tr>
<tr>
<td>成本中心名称</td>
<td>文本框</td>
<td>成本中心名称</td>
<td>常显</td>
<td>-</td>
<td>-</td>
<td>EXPENSE_WRITEOFF_IN_QUOTA.COST_CENTER_NAME</td>
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
| 查询 | 查询冲销数据 | 查询区域 | 查询条件已填写 | 调用list接口分页查询 |
| 查看明细 | 查看冲销明细 | 列表行操作 | 常显 | 调用/{writeoffId}/detail接口 |
| 推送FSSC | 推送冲销数据到共享财务系统 | 详情页 | 单据状态=制单 | 调用/v1/{orgId}/expense-writeoff-in-quotas/push-data-fscc，推送成功后状态→审批中 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：推送时冲销单号不能为空 —— 确保推送数据可定位</KbSubTitle>

- 第1点：headNo参数为空时抛出CommonException"请传入冲销单号！"

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM EXPENSE_WRITEOFF_IN_QUOTA WHERE WRITEOFF_HEADNO IS NULL OR WRITEOFF_HEADNO = ''
```

<KbSubTitle>校验2：定时任务时间格式校验 —— 确保参数正确</KbSubTitle>

- 第1点：startDate和endDate必须符合yyyy-MM格式
- 第2点：格式错误时抛出CommonException"【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM"

<KbTip>阻断性报错</KbTip>

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本菜单有工作流审批(FIN_SVC_EXP_ACC)，单据状态流转如下：

<KbSubTitle>状态机流转图</KbSubTitle>


```text
[制单1] ──推送FSSC──> [审批中3]
[制单1] ──提交审批──> [审批中3] (工作流FIN_SVC_EXP_ACC)
[审批中3] ──审批通过──> [已审批]
[审批中3] ──审批驳回──> [制单1]
[任意状态] ──作废──> [作废7]
[作废7] ──定时任务重新生成──> [制单1] (新记录)
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| 1 | 制单 | 推送FSSC、提交审批、编辑 |
| 3 | 审批中 | 审批通过、审批驳回 |
| 7 | 作废 | 无(定时任务可重新生成新记录) |

---

</KbCard>
<KbCard num="1" title="表1：EXPENSE_WRITEOFF_IN_QUOTA（工程服务费冲销数据表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| WRITEOFF_ID | BIGINT | 冲销主键ID | - | 自增主键 |
| WRITEOFF_NO | VARCHAR | 冲销单号 | 冲销单号 | 按编码规则AE.WRITE_OFF_NO生成 |
| WRITEOFF_HEADNO | VARCHAR | 冲销头单据编码 | 冲销头单号 | 前缀+交易公司编码+年月 |
| YEARMONTH | VARCHAR | 年月 | 年月 | 格式yyyy-MM |
| BILLING_UNIT_CODE | VARCHAR | 法人编码 | 法人编码 | 来源于预提数据 |
| BILLING_UNIT_NAME | VARCHAR | 法人名称 | 法人名称 | 来源于预提数据 |
| DIVISION_ID | BIGINT | 事业部词汇值 | - | 来源于DivisionBaseSet |
| ENTID | BIGINT | 组织ID | - | 来源于预提数据 |
| ENTNAME | VARCHAR | 事业部名称 | 事业部 | 来源于DivisionBaseSet |
| COST_CENTER_CODE | VARCHAR | 成本中心编码 | 成本中心编码 | 来源于预提数据 |
| COST_CENTER_NAME | VARCHAR | 成本中心名称 | 成本中心名称 | 来源于预提数据 |
| TRADING_COMPANY_NAME | VARCHAR | 交易公司名称 | 交易公司 | 来源于预提数据 |
| TRADING_COMPANY_CODE | VARCHAR | 交易公司编码 | 交易公司编码 | 来源于预提数据 |
| WRITEOFF_TAX_AMT | DECIMAL | 冲销含税总额 | 冲销含税金额 | =未兑现总额 |
| WRITEOFF_NOTAX_AMT | DECIMAL | 冲销不含税总额 | 冲销不含税金额 | =含税/税率 |
| WRITEOFF_SUMAMT | DECIMAL | 出库冲销总额 | 出库冲销总额 | - |
| SYNC_ITEM | DATE | 同步时间 | - | 数据生成时间 |
| BILL_STATUS | BIGINT | 单据状态 | 单据状态 | 1-制单/3-审批中/7-作废 |
| IS_HOME | BIGINT | 是否家装合同 | 是否家装 | 1-工程/2-家装 |

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
            <td style="color:#DC2626;font-weight:600;">请传入冲销单号！</td>
            <td style="font-size:13px;">推送FSSC</td>
            <td style="font-size:13px;">headNo参数为空，需传入冲销头单号</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">推共享预提 时间转换异常</td>
            <td style="font-size:13px;">推送FSSC</td>
            <td style="font-size:13px;">attribute2年月格式错误，无法转换为日期</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">服务费冲销推送共享异常：xxx</td>
            <td style="font-size:13px;">推送FSSC</td>
            <td style="font-size:13px;">共享系统处理失败，错误信息为共享返回的processMsgData</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">【xxx】该时间格式错误，请输入正确的时间格式：yyyy-MM</td>
            <td style="font-size:13px;">定时任务</td>
            <td style="font-size:13px;">时间参数格式不符合yyyy-MM</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请传入冲销单号！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>headNo参数为空，需传入冲销头单号</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>推共享预提 时间转换异常</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>attribute2年月格式错误，无法转换为日期</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>服务费冲销推送共享异常：xxx</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>共享系统处理失败，错误信息为共享返回的processMsgData</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
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
      <span style="font-size:15px;">定时任务执行后未生成冲销数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>generateWriteoffInQuotaQuery查询结果为空，预提数据中无未兑现的服务费<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">推送FSSC后状态未更新为审批中</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>共享接口返回成功但更新billStatus执行异常，或headNo对应多条记录<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">家装冲销单号前缀错误</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>isHome字段值不正确，应为2(家装)时使用了GCCX前缀而非JZCX<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">成本中心查询为空导致推送失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>Scpcostcenter表中无对应事业部+渠道(channel=4)的成本中心配置<br>
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
