<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-04" title="经销合同变更" desc="经销合同的变更申请、区域校验、审批管理" />

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
用户选择原合同 ──> 新建变更(校验原合同状态) ──> 填写变更信息 ──> 保存(状态:新建)
                                                              │
                                                  ┌───────────┴───────────┐
                                                  │                       │
                                            保存并提交                继续编辑
                                                  │                       │
                                          启动工作流(CONTRACT_JXHTBG_AW_XS)  │
                                                  │                       │
                                          状态:已提交/审批中            │
                                                  │                       │
                                          ┌───────┴───────┐             │
                                          │               │             │
                                      审批通过          审批驳回         │
                                          │               │             │
                                  生成新合同            状态回退          │
                                          │                               │
                                  推送CRM/OA                              │
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 年度经销合同 | 数据依赖 | 变更的原合同数据 | 原合同已生效且未被归档 |
| 经销商主数据 | 数据依赖 | 经销商信息 | 经销商已存在 |
| 销售区域 | 配置依赖 | 合同授权区域 | 区域数据已维护 |
| 工作流引擎 | 配置依赖 | 审批流程CONTRACT_JXHTBG_AW_XS | 工作流已部署 |
| CRM系统 | 数据依赖 | 推送变更信息至CRM | CRM接口可用 |
| OA系统 | 数据依赖 | 推送变更审批至OA | OA接口可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 审批通过后生成新合同 | 审批通过后生成新合同 | 变更审批通过后，基于原合同和变更内容生成新的年度经销合同 |
| 推送CRM和OA | 推送CRM和OA | 变更审批通过后，将变更信息推送至CRM系统和OA系统 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：新建变更校验 【前置校验】">
<KbQuote>确保原合同满足变更条件，避免重复变更或对无效合同发起变更</KbQuote>

**具体逻辑**：

- 1、校验原合同是否存在正在归档的单据，若有则不允许变更
- 2、校验原合同是否存在未审核完的变更单，若有则不允许重复变更
- 3、自动获取最新的经销商名称和法人名称，确保信息最新
</KbCard>

<KbCard num="2" title="重点逻辑2：变更编号生成 【编码规则】">
<KbQuote>为每个变更单生成唯一编号，编号包含原合同编号和变更次数</KbQuote>

**具体逻辑**：

- 1、查询原合同已有的变更单数量
- 2、变更编号=原合同编号+"_"+变更次数（如：HT001_1、HT001_2）
</KbCard>

<KbCard num="3" title="重点逻辑3：区域校验 【业务校验】">
<KbQuote>变更类型为"合同信息变更"时，校验授权区域是否冲突</KbQuote>

**具体逻辑**：

- 1、变更类型为2（合同信息变更）且特定合同类型时触发区域校验
- 2、事业部ID非111且合同类型为1或6时触发
- 3、若区域冲突，标记repeatArea=2并返回冲突提示，但不阻断保存
</KbCard>

<KbCard num="4" title="重点逻辑4：保存并提交 【审批提交】">
<KbQuote>保存变更单并启动工作流审批</KbQuote>

**具体逻辑**：

- 1、提交前校验流程编码不能为空
- 2、先执行保存逻辑，再启动工作流
- 3、工作流参数包含变更单ID、事业部ID、经销商ID、流程编码
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：经销合同变更列表页">
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
<td>变更编号</td>
<td>文本框</td>
<td>合同变更单编号</td>
<td>常显</td>
<td>新增时自动生成(原合同编号_次数)</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.SA_CONTR_HEAD_ADD_CODE</td>
</tr>
<tr>
<td>原合同编号</td>
<td>文本框</td>
<td>被变更的原合同编号</td>
<td>常显</td>
<td>选择原合同后带出</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.SA_CONTR_HEAD_CODE</td>
</tr>
<tr>
<td>变更类型</td>
<td>下拉选择框</td>
<td>合同变更类型</td>
<td>常显</td>
<td>从值集选择</td>
<td>1(合同增补)/2(合同信息变更)/3(合同延期)</td>
<td>SALE_CONTRACT_ADD_HEAD.CHANGE_TYPE</td>
</tr>
<tr>
<td>经销商</td>
<td>文本框</td>
<td>经销商名称</td>
<td>常显</td>
<td>选择原合同后自动带出</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.CUST_NAME</td>
</tr>
<tr>
<td>申请人</td>
<td>文本框</td>
<td>变更申请人</td>
<td>常显</td>
<td>自动取当前登录用户</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.CREATOR</td>
</tr>
<tr>
<td>申请日期</td>
<td>日期选择框</td>
<td>变更申请日期</td>
<td>常显</td>
<td>默认当前日期</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.CREATE_TIME</td>
</tr>
<tr>
<td>审核状态</td>
<td>文本框</td>
<td>审核状态</td>
<td>常显</td>
<td>系统自动维护</td>
<td>新建/已提交/已批准/已驳回</td>
<td>SALE_CONTRACT_ADD_HEAD.AUDIT_STAT</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="界面模块2：经销合同变更详情页">
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
<td>合同开始日期</td>
<td>日期选择框</td>
<td>变更后合同开始日期</td>
<td>常显</td>
<td>默认取原合同，可修改</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.START_DATE</td>
</tr>
<tr>
<td>合同截止日期</td>
<td>日期选择框</td>
<td>变更后合同截止日期</td>
<td>常显</td>
<td>默认取原合同，可修改</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.END_DATE</td>
</tr>
<tr>
<td>变更说明</td>
<td>文本框</td>
<td>变更原因说明</td>
<td>常显</td>
<td>手工输入</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.CHANGE_EXPLAIN</td>
</tr>
<tr>
<td>保证金(万元)</td>
<td>数字输入框</td>
<td>变更后保证金金额</td>
<td>常显</td>
<td>默认取原合同，可修改</td>
<td>大于等于0</td>
<td>SALE_CONTRACT_ADD_HEAD.DEPOSIT_AMT</td>
</tr>
<tr>
<td>销售任务总额</td>
<td>数字输入框</td>
<td>变更后合同任务总额</td>
<td>常显</td>
<td>默认取原合同，可修改</td>
<td>大于等于0</td>
<td>SALE_CONTRACT_ADD_HEAD.TOTAL_TASK_AMT</td>
</tr>
<tr>
<td>市场推广服务费率(%)</td>
<td>数字输入框</td>
<td>变更后市场推广服务费率</td>
<td>常显</td>
<td>默认取原合同，可修改</td>
<td>0-100</td>
<td>SALE_CONTRACT_ADD_HEAD.MKT_COST_RATE</td>
</tr>
<tr>
<td>指导价下浮比例(%)</td>
<td>数字输入框</td>
<td>变更后指导价下浮比例</td>
<td>常显</td>
<td>默认取原合同，可修改</td>
<td>0-100</td>
<td>SALE_CONTRACT_ADD_HEAD.PRICE_DOWN_RATE</td>
</tr>
<tr>
<td>备注</td>
<td>文本框</td>
<td>变更备注</td>
<td>常显</td>
<td>手工输入</td>
<td>-</td>
<td>SALE_CONTRACT_ADD_HEAD.NOTE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
<KbSubTitle>弹窗1：原合同选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| entid | 事业部ID | 限定事业部范围 | 111 |

**数据范围**

```sql
已生效且未被归档、无未完成变更的合同
```

</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 新增 | 新建合同变更 | 列表页 | 常显 | 跳转新建页面，需先选择原合同 |
| 保存 | 保存变更 | 新建/编辑页 | 常显 | 调用save接口保存变更及关联数据 |
| 保存并提交 | 保存并提交审批 | 新建/编辑页 | 审核状态为新建时可用 | 调用saveAndSubmit接口，启动工作流 |
| 删除 | 删除变更 | 列表页 | 审核状态为新建时可用 | 删除变更头、区域、任务拆分等关联数据 |
| 校验区域 | 校验授权区域冲突 | 编辑页 | 变更类型为信息变更时可用 | 调用check-area接口 |
| 校验原合同 | 判断原合同是否可变更 | 新建页 | 选择原合同后 | 调用check-contract接口 |
| 提交前校验 | 提交前业务校验 | 编辑页 | 提交前 | 调用valid-before-submit接口 |
| 导出 | 导出变更列表 | 列表页 | 常显 | 导出Excel |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：原合同编号必填 —— 确保选择了要变更的原合同</KbSubTitle>

- 第1点：saContrHeadCode字段标注@NotBlank

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM SALE_CONTRACT_ADD_HEAD WHERE SA_CONTR_ADD_ID = :id AND SA_CONTR_HEAD_CODE IS NULL;
```

<KbSubTitle>校验2：原合同不存在正在归档的单据 —— 确保原合同未被归档流程占用</KbSubTitle>

- 第1点：doCheckContra方法校验原合同是否存在归档单据

<KbTip>阻断性报错</KbTip>

```sql
-- 具体逻辑在ServiceImpl中
```

<KbSubTitle>校验3：原合同不存在未审核完的变更单 —— 避免重复变更</KbSubTitle>

- 第1点：doCheckContactEcn方法校验原合同是否存在未完成的变更单

<KbTip>阻断性报错</KbTip>

```sql
SELECT * FROM SALE_CONTRACT_ADD_HEAD WHERE SA_CONTR_HEAD_CODE = :code AND AUDIT_STAT NOT IN ('APPROVED','REJECTED');
```

</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验1：流程编码不能为空 —— 确保选择了审批流程</KbSubTitle>

- 第1点：saveAndSubmit方法入口校验flowCode为空时报错

<KbTip>阻断性报错，提示"流程编码缺失，请选择流程！"</KbTip>

```sql
-- 无需SQL，前端参数校验
```

</KbCard>
<KbCard title="状态机">


```text
新建 ──保存──> 新建 ──提交──> 已提交/审批中 ──审批通过──> 已批准(生成新合同)
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
| APPROVED | 已批准 | 查看（已生成新合同） |
| REJECTED | 已驳回 | 编辑、重新提交 |

---

</KbCard>
<KbCard num="1" title="表1：SALE_CONTRACT_ADD_HEAD（经销合同变更头）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| SA_CONTR_ADD_ID | NUMBER | 销售合同变更单ID | - | 主键，自增 |
| SA_CONTR_HEAD_CODE | VARCHAR2 | 原销售合同编号 | 原合同编号 | 选择原合同后带出，必填 |
| SA_CONTR_HEAD_ADD_CODE | VARCHAR2 | 销售合同变更编号 | 变更编号 | 自动生成：原编号_次数，必填 |
| CHANGE_TYPE | NUMBER | 变更类型 | 变更类型 | 1=合同增补/2=合同信息变更/3=合同延期 |
| SA_CONTR_HEAD_ID | NUMBER | 原销售合同ID | - | 选择原合同后带出 |
| CUST_ID | NUMBER | 经销商ID | - | 选择原合同后带出 |
| CUST_CODE | VARCHAR2 | 经销商编码 | - | 选择原合同后带出 |
| CUST_NAME | VARCHAR2 | 经销商名称 | 经销商 | 选择原合同后带出 |
| START_DATE | DATE | 合同开始日期 | 合同开始日期 | 默认取原合同 |
| END_DATE | DATE | 合同截止日期 | 合同截止日期 | 默认取原合同 |
| CHANGE_EXPLAIN | VARCHAR2 | 变更说明 | 变更说明 | 手工输入 |
| DEPOSIT_AMT | NUMBER | 保证金(万元) | 保证金 | 默认取原合同 |
| TOTAL_TASK_AMT | NUMBER | 合同任务总额 | 销售任务总额 | 默认取原合同 |
| MKT_COST_RATE | NUMBER | 市场推广服务费率(%) | 市场推广服务费率 | 默认取原合同 |
| PRICE_DOWN_RATE | NUMBER | 指导价下浮比例(%) | 指导价下浮比例 | 默认取原合同 |
| FREQUENCY | NUMBER | 变更次数 | - | 新增时为0 |
| ENTID | NUMBER | 事业部ID | - | 新增时自动获取 |
| DIVISION_ID | NUMBER | 事业部ID | - | 新增时自动获取 |
| AUDIT_STAT | VARCHAR2 | 外部系统审核状态 | 审核状态 | 系统维护 |
| NOTE | VARCHAR2 | 备注 | 备注 | 手工输入 |
| CORPORATE_CODE | VARCHAR2 | 法人编码 | - | 根据交易公司带出 |
| CURRENCY | VARCHAR2 | 币种 | - | 根据事业部带出 |
| REPEAT_AREA | NUMBER | 是否存在重复区域 | - | 1=不是/2=是 |
| ERROR | VARCHAR2 | 提示信息 | - | 区域冲突时赋值 |

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
            <td style="color:#DC2626;font-weight:600;">未找到该记录！</td>
            <td style="font-size:13px;">查看详情</td>
            <td style="font-size:13px;">变更单ID不存在</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">合同信息不匹配</td>
            <td style="font-size:13px;">查看详情</td>
            <td style="font-size:13px;">变更单关联的原合同不存在</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">无法匹配合同类型与销售渠道关联关系！</td>
            <td style="font-size:13px;">查看详情</td>
            <td style="font-size:13px;">原合同的合同类型未配置渠道关联</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程编码缺失，请选择流程！</td>
            <td style="font-size:13px;">保存并提交</td>
            <td style="font-size:13px;">未选择审批流程编码</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未找到该记录！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>变更单ID不存在</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同信息不匹配</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>变更单关联的原合同不存在</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>无法匹配合同类型与销售渠道关联关系！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>原合同的合同类型未配置渠道关联</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
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
      <span style="font-size:15px;">新建变更时提示原合同正在走变更</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>该原合同已存在未审核完成的变更单。排查SQL：<br>
      <strong style="color:#7C3AED;">处理：</strong>等待已有变更单审批完成后再发起新变更
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">变更审批通过后未生成新合同</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>工作流回调逻辑异常或新合同保存失败<br>
      <strong style="color:#7C3AED;">处理：</strong>检查工作流回调日志和新合同生成逻辑
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
| 2025-09-16 | - | hfy | 初始创建经销合同变更模块 |
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
