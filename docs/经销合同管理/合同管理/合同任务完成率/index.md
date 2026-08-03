<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P16-07" title="合同任务完成率" desc="合同任务完成率的月度拆分、查询报表" />

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
经销合同详情页 → 内嵌"合同任务完成率"Tab → 查询合同任务拆分数据
                                                    ↓
                              展示1月~12月各月新开发网点任务数
                                                    ↓
                              校验: sum(月度明细) = 新开发网点个数
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 经销合同(SA_SALE_CONTRACT_HEAD) | 数据依赖 | 合同头ID作为查询条件，获取任务拆分数据 | 内嵌于合同详情页 |
| 新开发网点个数 | 数据依赖 | 校验月度明细之和是否等于新开发网点个数 | 保存合同时校验 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 经销合同保存校验 | 经销合同保存校验 | 经销合同保存时，若新开发网点任务不为空，校验月度明细之和必须等于新开发网点个数，否则阻断保存 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：月度任务拆分校验 {数据一致性}">
<KbQuote>保证新开发网点任务按月拆分后，各月之和与总任务数一致</KbQuote>

**具体逻辑**：

- 1、**业务意义**：保证新开发网点任务按月拆分后，各月之和与总任务数一致
- 2、具体逻辑描述
- 3、第1点：校验1月到12月的任务数之和是否等于合同头的新开发网点个数
- 4、第2点：空值月份不参与求和计算
- 5、第3点：仅当事业部为101或102且合同类型为8或20时才触发校验
</KbCard>

<KbCard num="2" title="重点逻辑2：纯查询报表 {只读展示}">
<KbQuote>合同任务完成率为内嵌查询页面，无独立增删改操作</KbQuote>

**具体逻辑**：

- 1、**业务意义**：合同任务完成率为内嵌查询页面，无独立增删改操作
- 2、具体逻辑描述
- 3、第1点：Controller仅提供search查询接口，无保存/修改/删除接口
- 4、第2点：内嵌于经销合同详情页的Tab页中，不可独立访问
- 5、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：合同任务完成率Tab页">
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
<td>一月</td>
<td>文本框</td>
<td>一月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.JAN_TASK</td>
</tr>
<tr>
<td>二月</td>
<td>文本框</td>
<td>二月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.FEB_TASK</td>
</tr>
<tr>
<td>三月</td>
<td>文本框</td>
<td>三月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.MAR_TASK</td>
</tr>
<tr>
<td>四月</td>
<td>文本框</td>
<td>四月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.APR_TASK</td>
</tr>
<tr>
<td>五月</td>
<td>文本框</td>
<td>五月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.MAY_TASK</td>
</tr>
<tr>
<td>六月</td>
<td>文本框</td>
<td>六月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.JUN_TASK</td>
</tr>
<tr>
<td>七月</td>
<td>文本框</td>
<td>七月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.JUL_TASK</td>
</tr>
<tr>
<td>八月</td>
<td>文本框</td>
<td>八月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.AUG_TASK</td>
</tr>
<tr>
<td>九月</td>
<td>文本框</td>
<td>九月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.SEP_TASK</td>
</tr>
<tr>
<td>十月</td>
<td>文本框</td>
<td>十月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.OCT_TASK</td>
</tr>
<tr>
<td>十一月</td>
<td>文本框</td>
<td>十一月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.NOV_TASK</td>
</tr>
<tr>
<td>十二月</td>
<td>文本框</td>
<td>十二月新开发网点任务数</td>
<td>常显</td>
<td>可编辑</td>
<td>非负整数</td>
<td>SALE_CONTRACT_TASK_SPLIT.DEC_TASK</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

无独立按钮，数据随经销合同保存一起提交。

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验1：新开发网点月度明细之和必须等于新开发网点个数 —— 保证任务拆分完整性</KbSubTitle>

- 第1点：仅当事业部为101(箭牌卫浴)或102(法恩莎)且合同类型为8或20时校验
- 第2点：计算1月到12月非空任务数之和
- 第3点：sum(月度任务)必须等于合同头的NEW_OUTLETS_TASK(新开发网点个数)

<KbTip>阻断性报错</KbTip>

```sql
SELECT 
      h.NEW_OUTLETS_TASK,
      NVL(s.JAN_TASK, 0) + NVL(s.FEB_TASK, 0) + NVL(s.MAR_TASK, 0) +
      NVL(s.APR_TASK, 0) + NVL(s.MAY_TASK, 0) + NVL(s.JUN_TASK, 0) +
      NVL(s.JUL_TASK, 0) + NVL(s.AUG_TASK, 0) + NVL(s.SEP_TASK, 0) +
      NVL(s.OCT_TASK, 0) + NVL(s.NOV_TASK, 0) + NVL(s.DEC_TASK, 0) AS TASK_SUM
    FROM SA_SALE_CONTRACT_HEAD h
    LEFT JOIN SALE_CONTRACT_TASK_SPLIT s ON s.HEAD_ID = h.SA_CONTR_HEAD_ID
    WHERE h.SA_CONTR_HEAD_ID = :headId
```

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

无独立状态机，数据随经销合同状态流转。

---

</KbCard>
<KbCard num="1" title="表1：SALE_CONTRACT_TASK_SPLIT（新增网点按月拆分扩展表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 自增主键 |
| HEAD_ID | NUMBER | 合同头ID | - | 关联SA_SALE_CONTRACT_HEAD.SA_CONTR_HEAD_ID |
| JAN_TASK | VARCHAR | 一月任务数 | 一月 | 可编辑 |
| FEB_TASK | VARCHAR | 二月任务数 | 二月 | 可编辑 |
| MAR_TASK | VARCHAR | 三月任务数 | 三月 | 可编辑 |
| APR_TASK | VARCHAR | 四月任务数 | 四月 | 可编辑 |
| MAY_TASK | VARCHAR | 五月任务数 | 五月 | 可编辑 |
| JUN_TASK | VARCHAR | 六月任务数 | 六月 | 可编辑 |
| JUL_TASK | VARCHAR | 七月任务数 | 七月 | 可编辑 |
| AUG_TASK | VARCHAR | 八月任务数 | 八月 | 可编辑 |
| SEP_TASK | VARCHAR | 九月任务数 | 九月 | 可编辑 |
| OCT_TASK | VARCHAR | 十月任务数 | 十月 | 可编辑 |
| NOV_TASK | VARCHAR | 十一月任务数 | 十一月 | 可编辑 |
| DEC_TASK | VARCHAR | 十二月任务数 | 十二月 | 可编辑 |
| CREATED | DATE | 创建时间 | - | 系统自动填充 |
| LAST_UPD | DATE | 更新时间 | - | 系统自动填充 |
| LAST_UPD_BY | VARCHAR | 更新人 | - | 系统自动填充 |

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
            <td style="color:#DC2626;font-weight:600;">新开发网点月度明细任务数与新开发网点个数不相等</td>
            <td style="font-size:13px;">经销合同保存</td>
            <td style="font-size:13px;">月度任务拆分之和与合同头新开发网点个数不一致</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>新开发网点月度明细任务数与新开发网点个数不相等</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>月度任务拆分之和与合同头新开发网点个数不一致</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">合同任务完成率Tab页无数据</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>该合同未配置新开发网点月度拆分数据，检查SALE_CONTRACT_TASK_SPLIT表中是否有HEAD_ID对应的记录<br>
      <strong style="color:#7C3AED;">处理：</strong>在经销合同详情页编辑模式中填写月度拆分数据并保存
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
| 2026-01-22 | - | hfy | 新增网点按月拆分扩展表实体类更新 |
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
