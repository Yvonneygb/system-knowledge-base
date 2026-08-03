<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P19" title="问题回复" desc="事业部端回复经销商反馈单" />

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
事业部查询经销商反馈单 → 查看反馈详情 → 回复反馈 → [多次回复] → 结束反馈 → 评价
```

1. 事业部在列表页查看经销商提交的反馈单
2. 点击进入详情页，查看反馈内容和历史回复记录
3. 填写回复内容并提交，回复记录以对话形式展示
4. 问题解决后点击"结束"，反馈单状态变更为"已结束"
5. 结束后可对本次反馈进行评价

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
- 3、"已回复"状态可多次追加回复，直到结束
</KbCard>

<KbCard num="2" title="2.2 权限控制">
**具体逻辑**：

- 1、本菜单为事业部端角色
- 2、可查看本事业部下所有经销商的反馈单
- 3、具备回复、结束、评价操作权限
</KbCard>

<KbCard num="3" title="2.3 与问题反馈的关系">
**具体逻辑**：

- 1、共用同一张MBO反馈表，通过角色区分操作端
- 2、经销商端负责提交反馈，事业部端负责回复和评价
- 3、回复记录和评价信息双向可见
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
<td>`/afterSales/brand/feedback/list`</td>
<td>列表页</td>
<td>事业部端分页查询反馈单</td>
</tr>
<tr>
<td>`/afterSales/brand/feedback/:type/:id?`</td>
<td>详情/回复页</td>
<td>type=view查看/answer回复</td>
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
<td>`feedback/division/page`</td>
<td>POST</td>
<td>事业部端分页查询反馈单</td>
</tr>
<tr>
<td>`feedback/answer`</td>
<td>POST</td>
<td>回复反馈单</td>
</tr>
<tr>
<td>`feedback/cancel/{id}`</td>
<td>PUT</td>
<td>取消反馈单</td>
</tr>
<tr>
<td>`feedback/end/{id}`</td>
<td>PUT</td>
<td>结束反馈单</td>
</tr>
<tr>
<td>`feedback/comment`</td>
<td>POST</td>
<td>获取回复记录</td>
</tr>
<tr>
<td>`feedback/evaluate`</td>
<td>POST</td>
<td>提交/查看评价</td>
</tr>
</tbody></table></div>

</KbCard>

<KbCard title="3.3 列表页逻辑">

- 调用 `feedback/division/page` 分页查询
- 支持按反馈单号、状态、反馈类型、经销商、创建时间等条件筛选
- 操作列根据状态动态显示：已提交/已回复（回复/结束）、已结束（评价）
- 点击行跳转详情页

</KbCard>

<KbCard title="3.4 详情页逻辑">

- 展示反馈单基本信息（只读）
- **FeedbackChat.tsx** 组件：以对话形式展示反馈回复记录
  - 调用 `feedback/comment` 获取历史回复
  - 左侧显示经销商反馈，右侧显示事业部回复
  - 支持时间线排序展示
- 回复区域：文本输入框 + 提交按钮，调用 `feedback/answer`
- 结束按钮：调用 `feedback/end/{id}`，结束前确认提示

</KbCard>

<KbCard title="3.5 评价逻辑">

- **Evaluation.tsx** 组件：评价表单
- 仅"已结束"状态可评价
- 调用 `feedback/evaluate` 提交评价
- 评价内容可能包含评分、评语等（具体字段由Evaluation组件定义）

</KbCard>

<KbCard title="3.6 前端文件结构">

```
arrow-mbo/src/pages/afterSales/feedback/brand/
├── index.tsx              # 列表页
├── Detail.tsx             # 详情页（含回复功能）
└── components/            # 事业部端私有组件

arrow-mbo/src/pages/afterSales/feedback/
└── components/
    ├── FeedbackChat.tsx   # [公共] 反馈回复记录对话组件
    └── Evaluation.tsx     # [公共] 评价组件
```

---

</KbCard>

<KbCard num="1" title="MBO反馈表（与问题反馈共用）">

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

</KbCard>

<KbCard num="2" title="MBO反馈回复表（关联表）">

| 字段 | 类型 | 说明 |
|------|------|------|
| id | NUMBER | 主键 |
| questionid | VARCHAR2 | 反馈单号（外键关联MBO反馈表） |
| content | VARCHAR2/CLOB | 回复内容 |
| reply_type | VARCHAR2 | 回复类型（经销商反馈/事业部回复） |
| createCmp | VARCHAR2 | 创建人 |
| createDate | TIMESTAMP | 创建时间 |

> 注：回复记录和评价可能存储在独立的子表中，通过questionid与主表关联

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
      <span style="font-size:15px;">事业部能否取消经销商的反馈单？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>可以。事业部端有 `feedback/cancel/{id}` 接口，可取消已提交的反馈单。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">结束反馈后还能继续回复吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能。"已结束"状态不可再回复，仅可进行评价操作。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">评价是否必填？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>评价为可选操作，结束反馈后不强制要求评价。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">回复记录是否支持附件/图片？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>取决于FeedbackChat组件实现，当前文档未涉及附件上传接口，默认仅支持文本回复。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q5</span>
      <span style="font-size:15px;">事业部端能否看到所有经销商的反馈？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>仅能看到本事业部管辖范围内的经销商反馈，数据范围由后端权限控制。
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
