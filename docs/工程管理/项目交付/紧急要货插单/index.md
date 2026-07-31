<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="8" title="紧急要货插单" desc="工程管理-项目交付业务说明" />

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
已有紧急要货单 → 新建插单申请 → 查询原始要货行数据
  ↓
校验插单数据合法性 → 设置调整数量
  ↓
发送插单请求 → 推送ERP接口(URGENT_ADJUST_INFT)执行插单
  ↓
ERP返回结果 → 更新插单记录状态
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 紧急要货单 | 数据依赖 | 插单基于已有紧急要货单 | 紧急要货单审批状态=APPROVED |
| ERP系统 | 配置依赖 | 插单请求推送ERP执行 | ERP接口URGENT_ADJUST_INFT可用 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| ERP系统 | 出库单数量调整 | 插单推送ERP后，ERP调整出库单数量 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：插单数据校验 {数据合法性}">
<KbQuote>确保插单数据合法，避免无效插单</KbQuote>

**具体逻辑**：

- 1、校验原始要货行是否存在可插单的产品行数据
- 2、若订单号不存在可插单的产品行数据，阻断性报错
</KbCard>

<KbCard num="2" title="重点逻辑2：ERP推送执行插单 {外部系统集成}">
<KbQuote>插单请求通过ERP接口执行实际的库存调整</KbQuote>

**具体逻辑**：

- 1、调用EpmUrgentAdjustInft推送ERP接口URGENT_ADJUST_INFT
- 2、ERP执行插单后返回结果，更新插单记录状态
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：紧急要货插单(hlod低代码页面)">
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
<td>插单记录号</td>
<td>文本框</td>
<td>插单记录编码</td>
<td>常显</td>
<td>1.系统自动生成</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.ADJUST_CODE</td>
</tr>
<tr>
<td>调整类型</td>
<td>下拉选择框</td>
<td>插单调整类型</td>
<td>常显</td>
<td>1.用户选择</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.ADJUST_TYPE</td>
</tr>
<tr>
<td>调整数量</td>
<td>数字框</td>
<td>调整数量</td>
<td>常显</td>
<td>1.用户输入</td>
<td>&gt;0</td>
<td>EPM_URGENT_ADJUST.ADJUST_QTY</td>
</tr>
<tr>
<td>预留数量</td>
<td>数字框</td>
<td>预留数量</td>
<td>常显</td>
<td>1.系统计算</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.RESERVED_QTY</td>
</tr>
<tr>
<td>关联插单ID</td>
<td>文本框</td>
<td>关联的原始插单ID</td>
<td>常显</td>
<td>1.关联插单时记录</td>
<td>-</td>
<td>EPM_URGENT_ADJUST.REL_ADJUST_ID</td>
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
| 查询要货行数据 | 加载原始要货行 | 详情页 | 选择要货单后 | 调用get-sa-out-bill-data查询 |
| 校验插单数据 | 校验合法性 | 详情页 | 填写插单数据后 | 调用verify-data校验 |
| 发送插单请求 | 推送ERP执行插单 | 详情页 | 校验通过后 | 调用push-adjust推送ERP |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：插单数据校验 —— 确保插单数据合法</KbSubTitle>

- 第1点：校验原始要货行是否存在可插单的产品行

<KbTip>阻断性报错</KbTip>

```sql
-
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

<KbSubTitle>状态机流转图</KbSubTitle>


```text
无独立状态机，插单操作为即时生效，不涉及审批流程
```

<KbSubTitle>状态机列表</KbSubTitle>


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| - | 即时操作 | 查询、校验、发送插单 |

---

</KbCard>
<KbCard num="1" title="表1：EPM_URGENT_ADJUST（紧急要货插单记录）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ADJUST_ID | Long | 插单ID(主键) | - | 自增主键 |
| ADJUST_CODE | String | 插单记录号 | 插单记录号 | 编码规则自动生成 |
| ADJUST_TYPE | Long | 调整类型 | 调整类型 | 用户选择 |
| ADJUST_QTY | BigDecimal | 调整数量 | 调整数量 | 用户输入 |
| RESERVED_QTY | BigDecimal | 预留数量 | 预留数量 | 系统计算 |
| REL_ADJUST_ID | Long | 关联插单ID | 关联插单ID | 关联原始插单 |
| URGENT_ORDER_ID | Long | 紧急要货单ID | - | 关联原始要货单 |

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
            <td style="color:#DC2626;font-weight:600;">订单号不存在可插单的产品行数据</td>
            <td style="font-size:13px;">校验插单数据</td>
            <td style="font-size:13px;">原始要货行无可用产品，检查要货单和产品状态</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>订单号不存在可插单的产品行数据</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>原始要货行无可用产品，检查要货单和产品状态</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">插单推送ERP失败</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>ERP接口不可用或网络问题<br>
      <strong style="color:#7C3AED;">处理：</strong>检查ERP接口URGENT_ADJUST_INFT状态，修复后重试
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
| - | - | - | 暂无2026年提交记录 |
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
