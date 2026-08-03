<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-18" title="合同模板管理" desc="电子合同模板的创建、版本、状态管控" />

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

```
[品牌方管理员] --> [新增合同模板] --> [填写模板基本信息]
                                        |
                                        v
                                [配置合同条款]
                                        |
                                        v
                                [配置签署流程]
                                        |
                                        v
                                [保存为草稿/启用模板]
                                        |
                              +---------+---------+
                              v                   v
                        [启用模板]          [禁用模板]
                              |                   |
                              v                   v
                    [可供合同签署使用]    [不可用于新建合同]
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 依赖来源 | 依赖内容 | 说明 |
|---------|---------|------|
| 值集管理 | MBO.CONTRACT_TEMPLATE | 合同模板类型值集 |
| 值集管理 | MBO.CONTRACT_TEMPLATE_STATUS | 合同模板状态值集 |
| 值集管理 | MBO.CONTRACT_SUB_TEMPLATE | 合同子模板类型值集 |
| 组织架构 | 品牌/公司信息 | 模板归属品牌方 |
| 用户权限 | 品牌方管理员角色 | 仅品牌方有配置权限 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 合同签署 | 模板被引用创建合同 | 启用状态的模板可被合同签署流程引用 |
| 合同条款 | 条款内容被带入合同 | 模板中配置的条款自动带入新合同 |
| 签署流程 | 签署节点被带入合同 | 模板中配置的签署流程自动带入新合同 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 模板状态管控">
**具体逻辑**：

- 1、模板存在"启用"和"禁用"两种状态
- 2、新增模板默认为"禁用"状态，需手动启用
- 3、启用前校验模板必填信息完整性（基本信息、条款、签署流程）
- 4、已被合同引用的模板禁用时需提示影响范围，但不阻止禁用操作
- 5、禁用后的模板不再出现在新建合同的可选列表中
</KbCard>

<KbCard num="2" title="2.2 模板版本与引用">
**具体逻辑**：

- 1、模板修改后不影响已引用该模板的历史合同
- 2、新建合同时始终引用模板的最新启用版本
- 3、同一类型下可存在多个启用的模板，供签署时选择
</KbCard>

<KbCard num="3" title="2.3 模板类型与子模板">
**具体逻辑**：

- 1、模板按类型区分（经销合同、装修协议、广告协议等），通过值集MBO.CONTRACT_TEMPLATE管理
- 2、子模板通过值集MBO.CONTRACT_SUB_TEMPLATE管理，用于细分合同场景
- 3、模板类型决定可配置的条款范围和签署流程节点
- 4、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗 <KbBadge type="purple">单选</KbBadge></KbSubTitle>

**入参**

| 字段名 | 中文名 | 释义 | 示例 |
|-------|-------|------|------|
| 子模板类型弹窗 | 选择子模板类型 | 子模板类型编码、名称 |  |

</KbCard>
<KbCard title="导入">
- 本菜单无导入功能

</KbCard>
<KbCard title="其他按钮">

| 按钮 | 位置 | 操作说明 |
|------|------|---------|
| 新增 | 列表页 | 跳转到新增模板页面 |
| 编辑 | 列表行操作 | 跳转到编辑模板页面 |
| 启用 | 列表行操作 | 将禁用状态的模板改为启用 |
| 禁用 | 列表行操作 | 将启用状态的模板改为禁用 |
| 复制 | 列表行操作 | 复制已有模板创建新模板 |
| 删除 | 列表行操作 | 删除草稿状态的模板（已被引用不可删除） |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
- 本菜单无提交操作，保存即生效

</KbCard>
<KbCard title="状态机">

```
[新增] --> [禁用(disabled)] --启用--> [启用(enabled)]
                                      --禁用--> [禁用(disabled)]
```

| 状态 | 可执行操作 |
|------|-----------|
| 禁用(disabled) | 编辑、启用、复制、删除 |
| 启用(enabled) | 编辑、禁用、复制 |

---

</KbCard>
<KbCard num="1" title="ELECTRONIC_CONTRACT_TEMPLATE（电子合同模板表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| template_id | NUMBER | 模板ID，主键 |
| template_name | VARCHAR2 | 模板名称 |
| template_type | VARCHAR2 | 模板类型 |
| sub_template_type | VARCHAR2 | 子模板类型 |
| brand_id | NUMBER | 归属品牌ID |
| brand_name | VARCHAR2 | 归属品牌名称 |
| template_status | VARCHAR2 | 模板状态（enabled/disabled） |
| clause_content | CLOB | 条款内容JSON |
| sign_flow_config | CLOB | 签署流程配置JSON |
| object_version_number | NUMBER | 乐观锁版本号 |
| created_by | NUMBER | 创建人 |
| creation_date | DATE | 创建时间 |
| last_updated_by | NUMBER | 最后更新人 |
| last_update_date | DATE | 最后更新时间 |

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
            <td style="color:#DC2626;font-weight:600;">模板名称已存在</td>
            <td style="font-size:13px;">同类型下存在同名模板</td>
            <td style="font-size:13px;">更换模板名称</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请至少配置一条合同条款</td>
            <td style="font-size:13px;">保存时条款为空</td>
            <td style="font-size:13px;">添加至少一条条款</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请至少配置一个签署节点</td>
            <td style="font-size:13px;">保存时签署流程为空</td>
            <td style="font-size:13px;">添加至少一个签署节点</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">模板已被引用，不可删除</td>
            <td style="font-size:13px;">有合同引用了该模板</td>
            <td style="font-size:13px;">禁用而非删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>模板名称已存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>更换模板名称</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请至少配置一条合同条款</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>添加至少一条条款</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请至少配置一个签署节点</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>添加至少一个签署节点</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>模板已被引用，不可删除</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>禁用而非删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">禁用模板后，已引用该模板的合同会受影响吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不会。已创建的合同保留引用时的模板快照，不受模板后续修改或禁用影响。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">一个模板类型下可以有多少个启用的模板？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>无限制，同一类型下可存在多个启用的模板，供签署时选择。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">模板的条款和签署流程可以部分配置后保存吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>可以保存为草稿（禁用状态），但启用前必须完成所有必填项的配置。
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

| 日期 | 版本 | 更新内容 | 更新人 |
|------|------|---------|--------|
| 2026-08-03 | v1.0 | 初始创建文档 | AI |
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
