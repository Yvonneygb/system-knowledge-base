<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门头展板报销标准" desc="设置门头展板的报销标准，支持按事业部、装修项目、门店类型等维度配置额度内/外报销金额" />

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
</KbCard>

<KbCard num="2" title="上游依赖">
</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 报销标准生效管理">
**具体逻辑**：

- 1、新建标准默认为**未生效**状态（valid=1）
- 2、审批通过后自动变为**已生效**（valid=2）
- 3、支持手动**作废**操作，作废后状态变为**已作废**（valid=3）
- 4、作废操作通过 `doInvalid` 接口执行，仅已生效状态可作废
</KbCard>

<KbCard num="2" title="2.2 经销商限额控制">
**具体逻辑**：

- 1、当经销商限额标识为Y时，表示该标准对经销商有限额约束
- 2、额度类型（budgetType）决定限额的计算方式
- 3、使用额度外预算为Y时，需录入预算年度，否则年度字段禁用
</KbCard>

<KbCard num="3" title="2.3 单独门店申请与超额报销">
**具体逻辑**：

- 1、单独门店申请标识控制是否允许门店单独发起申请
- 2、超额报销标识控制超出标准金额时是否允许报销
- 3、审核可修改金额标识控制审批环节是否可调整报销金额
</KbCard>

<KbCard num="4" title="2.4 行信息匹配规则">
**具体逻辑**：

- 1、每个标准头下可配置多行明细，按装修项目+适用门店类型+标准等级+数量范围匹配
- 2、数量下限和上限定义适用区间，额度内/外标准分别设定金额
- 3、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗</KbSubTitle>

- **事业部LOV**：选择事业部，带出事业部ID和词汇值
- **装修项目LOV**：词汇编码 `AE.MKT.POLICY_STANDARD_PROJECT`，选择装修项目分类
- **有效政策LOV**：接口 `/v1/{organizationId}/policy-standard-heads/valid-head`，供下游单据引用已生效标准

</KbCard>
<KbCard title="导入">
不支持批量导入

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 操作说明 | 可用条件 |
|---------|---------|---------|
| 新增 | 新建一条报销标准 | 始终可用 |
| 保存 | 保存当前编辑数据 | 编辑状态 |
| 提交 | 提交审批流程 | 保存后、未提交状态 |
| 作废 | 将已生效标准标记为已作废 | valid=2(已生效) |
| 删除 | 删除未生效的标准 | valid=1(未生效)且未提交审批 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>政策编码不能为空</KbSubTitle>


<KbSubTitle>政策名称不能为空</KbSubTitle>


<KbSubTitle>结束时间需&gt;=开始时间</KbSubTitle>


<KbSubTitle>使用额度外预算为Y时，年度必填</KbSubTitle>


<KbSubTitle>行信息至少一行</KbSubTitle>


</KbCard>
<KbCard title="提交校验">
<KbSubTitle>头信息保存校验通过</KbSubTitle>


<KbSubTitle>行信息完整无空值</KbSubTitle>


<KbSubTitle>工作流 `STORE_POLICY_STANDARD_HEAD` 启动成功</KbSubTitle>


</KbCard>
<KbCard title="状态机">

```text
新建(valid=1) ──提交──→ 审批中 ──审批通过──→ 已生效(valid=2) ──作废──→ 已作废(valid=3)
                          │
                          └──审批拒绝──→ 已拒绝(可修改重新提交)
```

---

</KbCard>
<KbCard num="1" title="4.1 POLICY_STANDARD_HEAD（政策标准头表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| POLICY_STANDARD_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| ENTID | BIGINT | 事业部ID | |
| DIVISION_ID | BIGINT | 事业部词汇值 | |
| STANDARD_CODE | VARCHAR | 政策编码 | |
| STANDARD_NAME | VARCHAR | 政策名称 | |
| CUST_LIMIT_FLAG | VARCHAR | 经销商限额标识 Y/N | |
| START_DATE | DATE | 开始时间 | |
| END_DATE | DATE | 结束时间 | |
| APPLY_REASON | VARCHAR | 备注 | |
| SINGLE_STORE_APPLY_FLAG | VARCHAR | 单独门店申请 Y/N | |
| EXCESS_FLAG | VARCHAR | 超额报销 Y/N | |
| BUDGET_TYPE | VARCHAR | 额度类型 | |
| USE_EXTRA_BUDGET_FLAG | VARCHAR | 使用额度外预算 Y/N | |
| EXTRA_BUDGET_EXCESS_STRATEGY | BIGINT | 额度外超额处理策略 | |
| MODIFY_FLAG | VARCHAR | 审核可修改金额 Y/N | |
| YEAR | BIGINT | 预算年度 | |
| VALID | BIGINT | 生效状态 1/2/3 | |
| WFID | BIGINT | 流程ID | |
| WFFLAG | BIGINT | 流程状态 | |
| HZ_INSTANCE_ID | BIGINT | H0流程实例ID | |
| HZ_APPROVE_STATUS | VARCHAR | H0流程审批状态 | NOT NULL |

</KbCard>

<KbCard num="2" title="4.2 POLICY_STANDARD_LINE（政策标准行表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| HEAD_ID | BIGINT | 关联头表ID | FK → POLICY_STANDARD_HEAD |
| DECORATE_PROJECT | VARCHAR | 装修项目 | |
| UNIT_TYPE | VARCHAR | 单位类型 | |
| TERMINAL_TYPE | VARCHAR | 适用门店类型(逗号分隔) | |
| STANDARD_GRADE | VARCHAR | 标准等级 | |
| MIN_NUM | DECIMAL | 数量下限 | |
| MAX_NUM | DECIMAL | 数量上限 | |
| WITHIN_STANDARD | DECIMAL | 额度内标准 | |
| OUTSIDE_STANDARD | DECIMAL | 额度外标准 | |

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
            <td style="color:#DC2626;font-weight:600;">政策编码不能为空</td>
            <td style="font-size:13px;">保存时未填写编码</td>
            <td style="font-size:13px;">补充政策编码后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">作废失败</td>
            <td style="font-size:13px;">标准非已生效状态</td>
            <td style="font-size:13px;">仅已生效状态可作废</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">删除失败</td>
            <td style="font-size:13px;">标准已提交审批或已生效</td>
            <td style="font-size:13px;">仅未生效且未提交审批可删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">年度不能为空</td>
            <td style="font-size:13px;">使用额度外预算为Y但未填年度</td>
            <td style="font-size:13px;">填写预算年度</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策编码不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>补充政策编码后保存</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>作废失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>仅已生效状态可作废</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>删除失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>仅未生效且未提交审批可删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>年度不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>填写预算年度</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
</div>
</KbCard>
</div>
</div>
</div>

<div id="changelog" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="更新记录">

| 日期 | 版本 | 修改内容 | 修改人 |
|-----|------|---------|-------|
| 2026-07-31 | V1.0 | 初始生成知识库文档 | AI |
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
