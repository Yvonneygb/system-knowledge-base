<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-02" title="保证金减免申请" desc="合同保证金的减免申请、审批管理" />

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
用户新建减免申请 ──> 保存(状态:未生效) ──> 保存并提交(启动工作流,状态:审批中)
                                                      │
                                              ┌───────┴───────┐
                                              │               │
                                          审批通过          审批驳回
                                              │               │
                                    状态:有效(enable)   状态:未生效(pending)
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 认缴概况 | 数据依赖 | 获取各合同类型的保证金标准金额 | 认缴概况中已配置标准金额 |
| 保证金标准设定 | 配置依赖 | 确定各合同类型的保证金标准金额 | 已配置保证金标准 |
| 工作流引擎 | 配置依赖 | 审批流程DEPOSITS_REDUCTION_HEAD_MCS_AW | 工作流已部署 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 审批通过后保证金减免生效 | 审批通过后保证金减免生效 | 减免申请审批通过后状态变为"有效"，实际减免金额生效 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：保存减免申请 【数据保存】">
<KbQuote>新建或编辑保证金减免申请，支持头行结构保存</KbQuote>

**具体逻辑**：

- 1、新增时自动生成减免单号（编码规则AE.DEPOSITS_REDUCTION_HEAD_NO，含事业部编码前缀）
- 2、新增时设置审批状态为"新建"，业务状态为"未生效"
- 3、新增时自动获取当前登录用户所属事业部ID
- 4、保存行信息时，自动查询各合同类型对应的保证金标准金额并回填
- 5、支持附件保存，关联对象ID为减免申请头ID
</KbCard>

<KbCard num="2" title="重点逻辑2：保存并提交 【审批提交】">
<KbQuote>保存减免申请并启动工作流审批流程</KbQuote>

**具体逻辑**：

- 1、提交前校验流程编码不能为空，否则报错"流程编码缺失，请选择流程！"
- 2、先执行保存逻辑，再启动工作流
- 3、工作流启动后，将业务状态更新为"审批中"
</KbCard>

<KbCard num="3" title="重点逻辑3：工作流审批回调 【状态流转】">
<KbQuote>工作流审批完成后回调更新单据状态</KbQuote>

**具体逻辑**：

- 1、审批通过时，业务状态更新为"有效"，审批状态更新为"已批准"
- 2、审批驳回时，业务状态回退为"未生效"，审批状态更新为"已驳回"
</KbCard>

<KbCard num="4" title="重点逻辑4：删除减免申请 【数据删除】">
<KbQuote>删除未生效的减免申请及其关联数据</KbQuote>

**具体逻辑**：

- 1、批量删除头记录及关联的行记录
- 2、同时删除关联的附件记录
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：保证金减免申请列表页">
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
<td>减免单号</td>
<td>文本框</td>
<td>减免申请单据编号</td>
<td>常显</td>
<td>新增时自动生成</td>
<td>-</td>
<td>CM_DEPOSITS_REDUCTION_HEAD.REDUCTION_NO</td>
</tr>
<tr>
<td>经销商</td>
<td>下拉选择框</td>
<td>申请减免的经销商</td>
<td>常显</td>
<td>弹窗选择</td>
<td>系统内有效经销商</td>
<td>CM_DEPOSITS_REDUCTION_HEAD.CUSTOMER_ID</td>
</tr>
<tr>
<td>状态</td>
<td>文本框</td>
<td>业务有效状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>pending/running/enable/disenable</td>
<td>CM_DEPOSITS_REDUCTION_HEAD.STATUS</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>申请备注说明</td>
<td>常显</td>
<td>手工输入</td>
<td>-</td>
<td>CM_DEPOSITS_REDUCTION_HEAD.REMARKS</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：保证金减免申请明细行">
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
<td>合同类型</td>
<td>下拉选择框</td>
<td>减免对应的合同类型</td>
<td>常显</td>
<td>从值集scpdict:sales_contract_type选择</td>
<td>值集内有效项</td>
<td>CM_DEPOSITS_REDUCTION_LINE.CONTRACT_TYPE</td>
</tr>
<tr>
<td>保证金标准金额</td>
<td>文本框</td>
<td>该合同类型的保证金标准金额</td>
<td>常显</td>
<td>根据事业部+经销商+合同类型自动查询</td>
<td>-</td>
<td>CM_DEPOSITS_REDUCTION_LINE.DEPOSITS_AMOUNT</td>
</tr>
<tr>
<td>申请减免金额</td>
<td>文本框</td>
<td>申请减免的金额</td>
<td>常显</td>
<td>手工输入</td>
<td>大于0，不超过标准金额</td>
<td>CM_DEPOSITS_REDUCTION_LINE.REDUCTION_AMOUNT</td>
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
系统内当前事业部下的有效经销商
```

</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 导出 | 导出减免申请列表 | 列表页 | 常显 | 导出Excel |
| 新增 | 新建减免申请 | 列表页 | 常显 | 跳转新建页面 |
| 保存 | 保存减免申请 | 新建/编辑页 | 常显 | 调用save接口保存头行数据 |
| 保存并提交 | 保存并提交审批 | 新建/编辑页 | 状态为未生效时可用 | 调用saveAndSubmit接口，启动工作流 |
| 删除 | 删除减免申请 | 列表页 | 状态为未生效时可用 | 调用remove接口删除头行及附件 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：行信息中合同类型必填 —— 确保每行都有对应的合同类型</KbSubTitle>

- 第1点：保存行记录时，contractType字段不能为空

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM CM_DEPOSITS_REDUCTION_LINE WHERE HEAD_ID = :headId AND CONTRACT_TYPE IS NULL;
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：流程编码不能为空 —— 确保选择了审批流程</KbSubTitle>

- 第1点：保存并提交时，flowCode参数不能为空

<KbTip>阻断性报错，提示"流程编码缺失，请选择流程！"</KbTip>

```sql
-- 无需SQL，前端参数校验
```

</KbCard>
<KbCard title="状态机">


```text
新建 ──保存──> 未生效(pending) ──提交──> 审批中(running) ──审批通过──> 有效(enable)
                                          │
                                      审批驳回
                                          │
                                          v
                                     未生效(pending)
```


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| pending | 未生效 | 编辑、保存、提交、删除 |
| running | 审批中 | 无（等待审批） |
| enable | 有效 | 无（已生效） |
| disenable | 失效 | 无 |

---

</KbCard>
<KbCard num="1" title="表1：CM_DEPOSITS_REDUCTION_HEAD（保证金减免申请头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 自增 |
| ENTID | NUMBER | 组织ID | - | 新增时自动获取当前事业部 |
| CUSTOMER_ID | NUMBER | 经销商ID | 经销商 | 弹窗选择 |
| STATUS | VARCHAR2 | 有效状态 | 状态 | pending/running/enable/disenable |
| STAT | NUMBER | 单据状态 | - | 工作流状态 |
| WFID | NUMBER | 流程ID | - | 工作流实例ID |
| WFFLAG | NUMBER | 流程标志 | - | 工作流标志 |
| REDUCTION_NO | VARCHAR2 | 减免单号 | 减免单号 | 编码规则自动生成 |
| REMARKS | VARCHAR2 | 备注 | 备注 | 手工输入 |

</KbCard>

<KbCard num="2" title="表2：CM_DEPOSITS_REDUCTION_LINE（保证金减免申请行）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 自增 |
| HEAD_ID | NUMBER | 申请头ID | - | 关联CM_DEPOSITS_REDUCTION_HEAD.ID |
| CONTRACT_TYPE | NUMBER | 合同类型 | 合同类型 | 从值集选择 |
| REDUCTION_AMOUNT | NUMBER | 申请减免金额 | 申请减免金额 | 手工输入 |
| DEPOSITS_AMOUNT | NUMBER | 保证金标准金额 | 保证金标准金额 | 根据合同类型自动查询 |

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
          <tr>
            <td style="color:#DC2626;font-weight:600;">请选择需要删除的数据！</td>
            <td style="font-size:13px;">删除</td>
            <td style="font-size:13px;">未选择任何记录就点击删除</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法获上线文信息</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">无法获取当前登录用户信息</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法获事业部信息</td>
            <td style="font-size:13px;">保存</td>
            <td style="font-size:13px;">当前用户未关联事业部</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
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

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请选择需要删除的数据！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>未选择任何记录就点击删除</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法获上线文信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>无法获取当前登录用户信息</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法获事业部信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>当前用户未关联事业部</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">保存后减免单号未生成</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>编码规则AE.DEPOSITS_REDUCTION_HEAD_NO未配置或事业部编码未设置<br>
      <strong style="color:#7C3AED;">处理：</strong>检查编码规则配置和事业部基础设置
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">提交后工作流未启动</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>工作流编码DEPOSITS_REDUCTION_HEAD_MCS_AW未部署或流程定义有误<br>
      <strong style="color:#7C3AED;">处理：</strong>检查工作流引擎中该流程是否已部署
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
| 2025-09-16 | - | jiaqiang.fu01 | 初始创建保证金减免申请模块 |
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
