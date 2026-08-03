<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-05" title="年度经销合同" desc="年度经销合同的创建、保存、审批管理" />

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
用户新建合同 ──> 填写合同信息(经销商/区域/任务等) ──> 保存(状态:新建)
                                                        │
                                            ┌───────────┴───────────┐
                                            │                       │
                                      保存并提交                继续编辑
                                            │                       │
                                    启动工作流(DISTRIBUTION_CONTRACT_DKHB)  │
                                            │                       │
                                    状态:已提交/审批中            │
                                            │                       │
                                    ┌───────┴───────┐             │
                                    │               │             │
                                审批通过          审批驳回         │
                                    │               │             │
                            合同生效(valid=1)   状态回退          │
                                    │                               │
                            推送CRM合同信息                        │
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 经销商主数据 | 数据依赖 | 获取经销商信息、授信余额、货款余额 | 经销商已存在 |
| 交易公司 | 数据依赖 | 合同甲方交易公司信息 | 交易公司已配置 |
| 销售区域 | 配置依赖 | 合同授权区域配置 | 区域数据已维护 |
| 合同类型与渠道关联 | 配置依赖 | 合同类型对应的销售渠道 | EPM_CONTRACT_CHANNEL_REL_H已配置 |
| 工作流引擎 | 配置依赖 | 审批流程DISTRIBUTION_CONTRACT_DKHB | 工作流已部署 |
| CRM系统 | 数据依赖 | 推送合同信息至CRM | CRM接口可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 审批通过后合同生效 | 审批通过后合同生效 | 合同生效后，可用于后续的保证金认缴、合同变更等业务 |
| 推送CRM合同信息 | 推送CRM合同信息 | 合同审批通过后，将合同信息推送至CRM系统 |
| 合同变更引用 | 合同变更引用 | 已生效的合同可作为合同变更的原合同引用 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：保存合同数据 【数据保存】">
<KbQuote>新建或编辑年度经销合同，保存合同头、区域、任务拆分等多维度信息</KbQuote>

**具体逻辑**：

- 1、新增时自动获取当前事业部ID和组织ID
- 2、区分归档合同和普通合同两种保存逻辑（isPigeonhole=2为归档合同）
- 3、保存时同步保存附件信息
- 4、合同编号通过编码规则自动生成
</KbCard>

<KbCard num="2" title="重点逻辑2：保存并提交 【审批提交】">
<KbQuote>保存合同并启动工作流审批，审批通过后合同生效</KbQuote>

**具体逻辑**：

- 1、提交前校验流程编码不能为空
- 2、先执行保存逻辑，再启动工作流
- 3、工作流参数包含合同ID、事业部ID、经销商ID、流程编码、合同类型
- 4、工作流启动后，更新审核状态为"已提交"
</KbCard>

<KbCard num="3" title="重点逻辑3：区域校验 【业务校验】">
<KbQuote>校验合同授权区域是否与其他合同存在冲突</KbQuote>

**具体逻辑**：

- 1、保存时校验授权区域是否与同经销商其他生效合同存在重叠
- 2、若存在区域冲突，返回冲突提示信息但不阻断保存
- 3、合同类型为"合同信息变更"(changeType=2)且特定合同类型时触发区域校验
</KbCard>

<KbCard num="4" title="重点逻辑4：合同日期校验 【业务校验】">
<KbQuote>校验合同开始日期和结束日期的合法性</KbQuote>

**具体逻辑**：

- 1、合同开始日期必须为合同年度第一天
- 2、合同结束日期必须为合同年度最后一天
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：年度经销合同列表页">
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
<td>合同编号</td>
<td>文本框</td>
<td>销售合同编号</td>
<td>常显</td>
<td>新增时编码规则自动生成</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.SA_CONTR_HEAD_CODE</td>
</tr>
<tr>
<td>经销商</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>弹窗选择后自动带出</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.CUST_NAME</td>
</tr>
<tr>
<td>合同类型</td>
<td>下拉选择框</td>
<td>销售合同类型</td>
<td>常显</td>
<td>从值集选择</td>
<td>值集内有效项</td>
<td>SA_SALE_CONTRACT_HEAD.SALES_CONTRACT_TYPE</td>
</tr>
<tr>
<td>合同开始日期</td>
<td>日期选择框</td>
<td>合同生效起始日期</td>
<td>常显</td>
<td>手工选择，校验为年度第一天</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.START_DATE</td>
</tr>
<tr>
<td>合同截止日期</td>
<td>日期选择框</td>
<td>合同生效截止日期</td>
<td>常显</td>
<td>手工选择，校验为年度最后一天</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.END_DATE</td>
</tr>
<tr>
<td>交易公司</td>
<td>文本框</td>
<td>甲方交易公司</td>
<td>常显</td>
<td>弹窗选择后自动带出</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.TRADING_COMPANY_NAME</td>
</tr>
<tr>
<td>法人</td>
<td>文本框</td>
<td>法人名称</td>
<td>常显</td>
<td>根据交易公司自动带出</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.CORPORATE</td>
</tr>
<tr>
<td>保证金(万元)</td>
<td>数字输入框</td>
<td>合同保证金金额</td>
<td>常显</td>
<td>手工输入</td>
<td>大于等于0</td>
<td>SA_SALE_CONTRACT_HEAD.DEPOSIT_AMT</td>
</tr>
<tr>
<td>销售任务总额</td>
<td>数字输入框</td>
<td>合同销售任务总额</td>
<td>常显</td>
<td>手工输入</td>
<td>大于等于0</td>
<td>SA_SALE_CONTRACT_HEAD.TOTAL_TASK</td>
</tr>
<tr>
<td>审核状态</td>
<td>文本框</td>
<td>外部系统审核状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>新建/已提交/已批准/已驳回</td>
<td>SA_SALE_CONTRACT_HEAD.AUDIT_STAT</td>
</tr>
<tr>
<td>是否缴清</td>
<td>文本框</td>
<td>保证金是否缴清</td>
<td>常显</td>
<td>系统自动维护</td>
<td>Y/N</td>
<td>SA_SALE_CONTRACT_HEAD.PAY_COMPLETE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：年度经销合同详情页-基本信息">
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
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>选择经销商后自动带出</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.CUST_CODE</td>
</tr>
<tr>
<td>经销商简称</td>
<td>文本框</td>
<td>经销商简称</td>
<td>常显</td>
<td>选择经销商后自动带出</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.SHORT_NAME</td>
</tr>
<tr>
<td>授信余额</td>
<td>文本框</td>
<td>交易公司授信余额</td>
<td>常显</td>
<td>查询交易公司授信信息</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.CREDIT_BALANCE</td>
</tr>
<tr>
<td>货款余额</td>
<td>文本框</td>
<td>经销商货款余额</td>
<td>常显</td>
<td>查询经销商货款信息</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.BALANCE</td>
</tr>
<tr>
<td>客户等级</td>
<td>文本框</td>
<td>客户等级</td>
<td>常显</td>
<td>查询经销商等级信息</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.RANK</td>
</tr>
<tr>
<td>市场推广服务费率(%)</td>
<td>数字输入框</td>
<td>市场推广服务费率</td>
<td>常显</td>
<td>手工输入</td>
<td>0-100</td>
<td>SA_SALE_CONTRACT_HEAD.MKT_COST_RATE</td>
</tr>
<tr>
<td>指导价下浮比例(%)</td>
<td>数字输入框</td>
<td>指导价下浮比例</td>
<td>常显</td>
<td>手工输入</td>
<td>0-100</td>
<td>SA_SALE_CONTRACT_HEAD.PRICE_DOWN_RATE</td>
</tr>
<tr>
<td>专卖店建设任务(个)</td>
<td>数字输入框</td>
<td>专卖店建设任务数</td>
<td>常显</td>
<td>手工输入</td>
<td>非负整数</td>
<td>SA_SALE_CONTRACT_HEAD.NEW_STORE_TASK</td>
</tr>
<tr>
<td>新开网点任务</td>
<td>数字输入框</td>
<td>新开网点任务数</td>
<td>常显</td>
<td>手工输入</td>
<td>非负整数</td>
<td>SA_SALE_CONTRACT_HEAD.NEW_OUTLETS_TASK</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>合同备注</td>
<td>常显</td>
<td>手工输入</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.NOTE</td>
</tr>
<tr>
<td>币种</td>
<td>下拉选择框</td>
<td>合同币种</td>
<td>常显</td>
<td>根据事业部自动带出</td>
<td>-</td>
<td>SA_SALE_CONTRACT_HEAD.CURRENCY</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：经销商选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| entid | 事业部ID | 限定事业部范围 | 111 |

**数据范围**

```sql
当前事业部下有效经销商
```

<KbSubTitle>弹窗2：交易公司选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| custId | 经销商ID | 限定经销商范围 | 1001 |

**数据范围**

```sql
该经销商关联的有效交易公司
```

</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 新增 | 新建年度经销合同 | 列表页 | 常显 | 跳转新建页面 |
| 保存 | 保存合同 | 新建/编辑页 | 常显 | 调用save接口保存合同及关联数据 |
| 保存并提交 | 保存并提交审批 | 新建/编辑页 | 审核状态为新建时可用 | 调用saveAndSubmit接口，启动工作流 |
| 删除 | 删除合同 | 列表页 | 审核状态为新建时可用 | 删除合同头、区域、任务拆分等关联数据 |
| 校验区域 | 校验授权区域冲突 | 编辑页 | 常显 | 调用check-area接口，返回冲突提示 |
| 导出 | 导出合同列表 | 列表页 | 常显 | 导出Excel |
| 合同完成情况 | 查看合同完成情况 | 列表页 | 合同已生效时可用 | 调用deliver接口查询 |
| 变更 | 发起合同变更 | 列表页 | 合同已生效时可用 | 跳转合同变更页面 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：交易公司必填 —— 确保合同有甲方信息</KbSubTitle>

- 第1点：tradingCompanyId字段标注@NotNull，保存时校验

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM SA_SALE_CONTRACT_HEAD WHERE SA_CONTR_HEAD_ID = :id AND TRADING_COMPANY_ID IS NULL;
```

<KbSubTitle>校验2：生效状态必填 —— 确保合同有生效标识</KbSubTitle>

- 第1点：valid字段标注@NotNull

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM SA_SALE_CONTRACT_HEAD WHERE SA_CONTR_HEAD_ID = :id AND VALID IS NULL;
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：流程编码不能为空 —— 确保选择了审批流程</KbSubTitle>

- 第1点：saveAndSubmit方法入口校验flowCode为空时报错

<KbTip>阻断性报错，提示"流程编码缺失，请选择流程！"</KbTip>

```sql
-- 无需SQL，前端参数校验
```

<KbSubTitle>校验2：流程启动校验 —— workFlowStartValid接口校验</KbSubTitle>

- 第1点：提交前调用workFlowStartValid接口进行业务校验

<KbTip>阻断性报错</KbTip>

```sql
-- 具体校验逻辑在ServiceImpl中
```

</KbCard>
<KbCard title="状态机">


```text
新建 ──保存──> 新建 ──提交──> 已提交/审批中 ──审批通过──> 已生效(valid=1)
                                        │
                                    审批驳回
                                        │
                                        v
                                     新建(可重新提交)
```


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| NEW | 新建 | 编辑、保存、提交、删除 |
| 已提交 | 已提交审批 | 无（等待审批） |
| APPROVED | 已批准/已生效 | 查看、发起变更 |
| REJECTED | 已驳回 | 编辑、重新提交 |

---

</KbCard>
<KbCard num="1" title="表1：SA_SALE_CONTRACT_HEAD（年度经销合同头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SA_CONTR_HEAD_ID | NUMBER | 销售合同ID | - | 主键，自增 |
| SA_CONTR_HEAD_CODE | VARCHAR2 | 销售合同编号 | 合同编号 | 编码规则自动生成 |
| START_DATE | DATE | 合同开始日期 | 合同开始日期 | 手工输入，校验为年度第一天 |
| END_DATE | DATE | 合同截止日期 | 合同截止日期 | 手工输入，校验为年度最后一天 |
| TRADING_COMPANY_ID | NUMBER | 交易公司ID | 交易公司 | 弹窗选择，必填 |
| TRADING_COMPANY_NAME | VARCHAR2 | 交易公司名称 | 交易公司 | 选择后自动带出 |
| TRADING_COMPANY_CODE | VARCHAR2 | 交易公司编码 | - | 选择后自动带出 |
| CUST_ID | NUMBER | 经销商ID | 经销商 | 弹窗选择 |
| CUST_CODE | VARCHAR2 | 经销商编码 | 经销商编码 | 选择后自动带出 |
| CUST_NAME | VARCHAR2 | 经销商名称 | 经销商 | 选择后自动带出 |
| ENTID | NUMBER | 组织ID | - | 新增时自动获取当前事业部 |
| SALES_CONTRACT_TYPE | NUMBER | 销售合同类型 | 合同类型 | 从值集选择 |
| DEPOSIT_AMT | NUMBER | 保证金(万元) | 保证金 | 手工输入 |
| TOTAL_TASK | NUMBER | 销售任务总额 | 销售任务总额 | 手工输入 |
| TOTAL_TASK_AMT | NUMBER | 合同任务总额 | 合同任务总额 | 手工输入 |
| MKT_COST_RATE | NUMBER | 市场推广服务费率(%) | 市场推广服务费率 | 手工输入 |
| PRICE_DOWN_RATE | NUMBER | 指导价下浮比例(%) | 指导价下浮比例 | 手工输入 |
| NEW_STORE_TASK | NUMBER | 专卖店建设任务(个) | 专卖店建设任务 | 手工输入 |
| NEW_OUTLETS_TASK | NUMBER | 新开网点任务 | 新开网点任务 | 手工输入 |
| VALID | NUMBER | 生效状态 | - | 必填，1=生效 |
| AUDIT_STAT | VARCHAR2 | 外部系统审核状态 | 审核状态 | 系统维护 |
| PAY_COMPLETE | VARCHAR2 | 是否缴清 | 是否缴清 | 系统维护，Y/N |
| CORPORATE_CODE | VARCHAR2 | 法人编码 | - | 根据交易公司自动带出 |
| CURRENCY | VARCHAR2 | 币种 | 币种 | 根据事业部自动带出 |
| NOTE | VARCHAR2 | 备注 | 备注 | 手工输入 |
| DIVISION_ID | NUMBER | 事业部ID | - | 新增时自动获取 |
| SA_CONTR_ADD_ID | NUMBER | 合同变更单ID | - | 通过变更创建时关联 |
| CRM_ID | VARCHAR2 | CRM合同ID | - | 推送CRM后返回 |
| IS_PUSH_CRM | VARCHAR2 | 记录推送CRM | - | 推送后标记 |

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
            <td style="color:#DC2626;font-weight:600;">流程编码缺失，请选择流程！</td>
            <td style="font-size:13px;">保存并提交</td>
            <td style="font-size:13px;">未选择审批流程编码</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程编码缺失，请选择流程！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>未选择审批流程编码</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">合同提交后区域校验提示冲突</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>同经销商下其他生效合同的授权区域与当前合同存在重叠<br>
      <strong style="color:#7C3AED;">处理：</strong>检查区域配置，确认是否需要调整授权区域范围。排查SQL：
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">合同审批通过后未推送CRM</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>CRM接口调用失败或网络异常<br>
      <strong style="color:#7C3AED;">处理：</strong>检查CRM推送日志和接口可用性
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
| 2025-09-10 | - | hfy | 初始创建年度经销合同模块 |
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
