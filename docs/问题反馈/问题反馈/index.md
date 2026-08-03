<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P19" title="问题反馈" desc="经销商端提交和管理反馈单" />

<KbCard title="业务介绍">

<!-- 空白:待补充 -->

</KbCard>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="业务流程">

```
经销商新建反馈单 → 编辑反馈内容 → 提交反馈 → [品牌方回复] → 查看回复与评价 → 取消/删除
```

1. 经销商在列表页点击"新建"，进入反馈表单页
2. 填写反馈类型、反馈内容、联系人等信息，可暂存（保存）或直接提交
3. 提交后反馈单状态变更为"已提交"，等待品牌方回复
4. 经销商可在详情页查看品牌方的回复记录和评价信息
5. 已提交但未回复的反馈单可取消；草稿状态的反馈单可删除

---

</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 状态流转">
**具体逻辑**：

- 1、状态值集：`MBO.FEEDBACK_STATE`
- 2、无工作流引擎，状态变更通过API直接更新
</KbCard>

<KbCard num="2" title="2.2 权限控制">
**具体逻辑**：

- 1、本菜单为经销商端角色
- 2、仅能操作本经销商创建的反馈单
- 3、品牌方回复和评价为只读展示
- 4、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="3.1 前端路由">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>路由</th>
<th>页面</th>
<th>说明</th>
</tr>
<tr>
<td>`/afterSales/dealer/feedback/list`</td>
<td>列表页</td>
<td>反馈单分页查询</td>
</tr>
<tr>
<td>`/afterSales/dealer/feedback/:type/:id?`</td>
<td>表单/详情页</td>
<td>type=new新建/view查看/edit编辑</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.2 API接口">

<div class="kb-field-scroll"><table class="kb-field-tbl"><tbody>
<tr>
<th>接口</th>
<th>方法</th>
<th>说明</th>
</tr>
<tr>
<td>`feedback/distributor/page`</td>
<td>POST</td>
<td>经销商端分页查询反馈单</td>
</tr>
<tr>
<td>`feedback/save`</td>
<td>POST</td>
<td>保存反馈单（草稿）</td>
</tr>
<tr>
<td>`feedback/submit`</td>
<td>POST</td>
<td>提交反馈单</td>
</tr>
<tr>
<td>`feedback/cancel/{id}`</td>
<td>PUT</td>
<td>取消反馈单</td>
</tr>
<tr>
<td>`feedback/delete/{id}`</td>
<td>DELETE</td>
<td>删除反馈单</td>
</tr>
<tr>
<td>`feedback/comment`</td>
<td>POST</td>
<td>查看回复记录</td>
</tr>
<tr>
<td>`feedback/evaluate`</td>
<td>POST</td>
<td>查看评价信息</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.3 列表页逻辑">

- 调用 `feedback/distributor/page` 分页查询
- 支持按反馈单号、状态、反馈类型、创建时间等条件筛选
- 操作列根据状态动态显示：草稿（编辑/删除）、已提交（取消）、已取消/已回复（无操作）
- 点击行跳转详情页

</KbCard>

<KbCard title="3.4 新建/编辑页逻辑">

- 路由参数 `type=new` 为新建，`type=edit` 为编辑
- 必填字段：反馈类型、反馈内容、联系人、电话
- 保存按钮调用 `feedback/save`，提交按钮调用 `feedback/submit`
- 提交前校验必填项，校验通过后状态变更为"已提交"

</KbCard>

<KbCard title="3.5 详情页逻辑">

- 路由参数 `type=view`，表单只读
- 展示反馈单基本信息
- 调用 `feedback/comment` 获取品牌方回复记录，以对话形式展示
- 调用 `feedback/evaluate` 获取品牌方评价信息

</KbCard>

<KbCard title="3.6 前端文件结构">

```
arrow-mbo/src/pages/afterSales/feedback/dealer/
├── index.tsx              # 列表页
├── Detail.tsx             # 详情页
├── Form.tsx               # 新建/编辑表单页
└── components/            # 经销商端私有组件
```

---

</KbCard>

<KbCard num="1" title="MBO反馈表">

| 字段 | 类型 | 说明 |
|------|------|------|
| questionid | VARCHAR2 | 反馈单号（主键/业务单号） |
| state | VARCHAR2 | 状态（值集：MBO.FEEDBACK_STATE） |
| type_code | VARCHAR2 | 反馈类型 |
| type_sup_code | VARCHAR2 | 反馈子类型 |
| type_detail_code | VARCHAR2 | 产品细分 |
| content | VARCHAR2/CLOB | 反馈内容 |
| contacts_name | VARCHAR2 | 联系人 |
| phone | VARCHAR2 | 电话 |
| address | VARCHAR2 | 地址 |

> 注：本表与"问题回复"菜单共用，经销商端和事业部端通过角色区分数据范围

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
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">已提交的反馈单能否编辑？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能。已提交状态仅支持取消操作，取消后也不可再编辑。如需修改，需取消后重新新建。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">删除反馈单是物理删除还是逻辑删除？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>仅草稿状态可删除，具体删除方式取决于后端实现，一般为逻辑删除（状态标记为已删除）。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">反馈单号如何生成？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>由后端在保存时自动生成，前端无需传入。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">品牌方回复后经销商能否继续追加反馈？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>当前版本经销商端为单向提交模式，不支持追加反馈。如需补充，需新建反馈单。
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

| 日期 | 版本 | 更新内容 | 作者 |
|------|------|---------|------|
| 2026-08-03 | v1.0 | 初始文档生成 | AI |
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
