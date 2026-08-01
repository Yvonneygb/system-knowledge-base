<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="5" title="门头验收信息设置" desc="配置门头验收的信息项及验收标准，确保门店门头符合品牌规范" />

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
<KbCard num="1" title="2.1 验收信息项配置">
**具体逻辑**：

- 1、配置门头验收时需要检查的信息项（验收项目）
- 2、每项包含验收项目名称、验收结果、验收比例、是否验收申请时提供等属性
- 3、验收申请时提供标识控制该信息项在验收申请环节是否需要填写
</KbCard>

<KbCard num="2" title="2.2 验收比例">
**具体逻辑**：

- 1、验收比例（decorationRate）表示该验收项目在整体验收中的权重或比例
- 2、用于验收评分或验收结果汇总计算
</KbCard>

<KbCard num="3" title="2.3 数据转换逻辑">
**具体逻辑**：

- 1、AcceptanceInfoSetLine 实体包含 convertEntity 方法
- 2、验收报销时将设置行转换为 FinFeeCheckBxAcceptance 实体
- 3、转换时自动取当前用户真实姓名作为创建人和修改人
- 4、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗</KbSubTitle>

- **装修项目LOV**：词汇编码 `mkt.decorate_project`

</KbCard>
<KbCard title="导入">
不支持批量导入

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 操作说明 | 可用条件 |
|---------|---------|---------|
| 新增行 | 新增一条验收信息项 | 始终可用 |
| 删除行 | 删除选中的验收信息项 | 选中行后可用 |
| 保存 | 保存所有验收信息项 | 编辑状态 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>验收项目不能为空</KbSubTitle>


<KbSubTitle>序号不能重复</KbSubTitle>


</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

```text
编辑中 ──保存──→ 已保存（可继续编辑）
```

---

</KbCard>
<KbCard num="1" title="4.1 ACCEPTANCE_INFO_SET_LINE（门店验收信息设置明细表）">

| 列名 | 类型 | 说明 | 约束 |
|-----|------|------|------|
| SET_LINE_ID | BIGINT | 主键ID | PK, AUTO_INCREMENT |
| SET_ID | BIGINT | 关联主表主键ID | FK |
| SEQ | BIGINT | 序号 | |
| DECORATION_PROJECT | VARCHAR | 验收项目 | |
| NOTE | VARCHAR | 验收结果 | |
| IS_YS_PROVIDE | BIGINT | 验收申请时提供 0/1 | |
| DESCRIPTION | VARCHAR | 备注 | |
| DECORATE_PROJECT | BIGINT | 装修项目(词汇值) | |
| DECORATION_RATE | DECIMAL | 验收比例 | |
| CREATOR | VARCHAR | 创建人 | |
| CREATE_TIME | DATETIME | 创建时间 | |
| UPDATOR | VARCHAR | 修改人 | |
| UPDATE_TIME | DATETIME | 修改时间 | |

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
            <td style="color:#DC2626;font-weight:600;">验收项目不能为空</td>
            <td style="font-size:13px;">行信息未填写验收项目</td>
            <td style="font-size:13px;">补充验收项目后保存</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>验收项目不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>补充验收项目后保存</div>
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
