<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-20" title="合同签署异常处理" desc="品牌方电子合同签署异常的处理" />

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
[合同签署异常] --> [品牌方查看异常列表] --> [选择异常合同]
                                            |
                    +-------+-------+-------+-------+-------+
                    |       |       |       |       |       |
                    v       v       v       v       v       v
               [拒签处理] [OA驳回  [用印异常 [推送门户 [OA作废  [其他异常
                        处理]   处理]   处理]   驳回处理] 处理]
                    |       |       |       |       |       |
                    v       v       v       v       v       v
               [状态流转] [状态流转] [状态流转] [状态流转] [状态流转] [状态流转]
                    |       |       |       |       |       |
                    +-------+-------+-------+-------+-------+
                                            |
                                            v
                                    [异常处理完成]
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 依赖来源 | 依赖内容 | 说明 |
|---------|---------|------|
| 合同签署流程 | 异常状态合同 | 签署过程中产生异常状态的合同流入本页面 |
| 值集管理 | MBO.CONTRACT_TYPE | 合同类型值集 |
| 值集管理 | MBO.CONTRACT_STATUS | 合同状态值集 |
| 值集管理 | MBO.CONTRACT_SUB_TEMPLATE | 合同子模板类型值集 |
| 值集管理 | MBO.CONTRACT_SUB_TYPE | 合同子类型值集 |
| OA系统 | OA审批结果回调 | OA驳回/通过结果回传 |
| 用印系统 | 用印结果回调 | 用印成功/异常结果回传 |
| 合同模板 | 模板配置信息 | 合同关联的模板信息 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 经销商合同管理 | 合同状态变更 | 异常处理后的状态变更同步至经销商端 |
| OA系统 | 推送OA审批 | 部分异常处理后需重新推送OA |
| 用印系统 | 重新发起用印 | 用印异常处理后可重新发起用印 |
| 门户系统 | 合同推送门户 | 合同完成后推送至门户供查看 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 状态机驱动">
**具体逻辑**：

- 1、合同签署全流程由状态机驱动，无独立工作流引擎
- 2、状态流转由后端根据业务事件自动触发，前端仅展示和触发操作
- 3、异常状态包括：拒签(refuse_seal)、OA驳回(reject_oa)、用印异常等
- 4、品牌方在本页面处理异常状态，使合同回到正常流转路径或终止
</KbCard>

<KbCard num="2" title="2.2 异常处理分类">
**具体逻辑**：

- 1、**拒签处理**：经销商拒签后，品牌方确认拒签结果，合同终止或重新发起签署
- 2、**OA驳回处理**：OA审批驳回后，品牌方根据驳回原因修改合同信息后重新提交OA，或终止合同
- 3、**用印异常处理**：用印过程中出现异常（如印章异常、网络异常），品牌方确认后重新发起用印
- 4、**OA作废驳回处理**：OA作废申请被驳回，品牌方需重新处理
- 5、**推送门户处理**：合同签署完成后推送至门户，推送失败时品牌方可重新推送
</KbCard>

<KbCard num="3" title="2.3 合同编码体系">
**具体逻辑**：

- 1、electronic_contract_id：合同唯一标识
- 2、electronic_contract_code：合同业务编码，系统自动生成
- 3、unify_contract_code：统一合同编码，用于跨系统关联
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


</KbCard>
<KbCard title="导入">
- 本菜单无导入功能

</KbCard>
<KbCard title="其他按钮">

| 按钮 | 位置 | 操作说明 | 可用状态 |
|------|------|---------|---------|
| 重新提交OA | 行操作 | OA驳回后修改信息重新提交OA审批 | reject_oa |
| 确认拒签 | 行操作 | 确认经销商拒签结果，合同终止 | refuse_seal |
| 重新用印 | 行操作 | 用印异常后重新发起用印 | waiting_seal(用印异常) |
| 重新推送门户 | 行操作 | 推送门户失败后重新推送 | completed(推送失败) |
| 终止合同 | 行操作 | 异常无法恢复时终止合同 | refuse_seal, reject_oa |
| 查看签署记录 | 行操作 | 查看合同签署过程记录 | 所有异常状态 |

</KbCard>
<KbCard title="保存校验">
- 本菜单以状态操作为主，无独立保存逻辑

</KbCard>
<KbCard title="提交校验">
- 重新提交OA时校验合同必填信息完整性

- 重新用印时校验用印前置条件是否满足

</KbCard>
<KbCard title="状态机">

```
[temporary] --提交签署--> [waiting_seal] --用印成功--> [completed]
                                      --拒签--> [refuse_seal]
                                      --用印异常--> [waiting_seal](异常标记)
                                      |
                                      v
                              [submitted_oa] --OA通过--> [pass_oa] --继续签署--> [waiting_seal]
                                            --OA驳回--> [reject_oa]
                                            |
                                            v
                                      [pending] --OA审批中--> [pass_oa]/[reject_oa]

[completed] --推送门户--> [push_portal]

[reject_oa] --OA作废--> [oa_invalid_reject]
```

| 状态 | 状态说明 | 可执行操作 |
|------|---------|-----------|
| temporary | 临时/草稿 | 编辑、提交签署 |
| waiting_seal | 待用印 | 重新用印（异常时）、查看签署记录 |
| completed | 已完成 | 重新推送门户（推送失败时） |
| submitted_oa | 已提交OA | 查看签署记录 |
| push_portal | 已推送门户 | 查看签署记录 |
| refuse_seal | 拒签 | 确认拒签、终止合同 |
| reject_oa | OA驳回 | 重新提交OA、终止合同 |
| pending | OA审批中 | 查看签署记录 |
| pass_oa | OA通过 | 查看签署记录 |
| oa_invalid_reject | OA作废驳回 | 重新处理 |

---

</KbCard>
<KbCard num="1" title="ELECTRONIC_CONTRACT（电子合同表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| electronic_contract_id | NUMBER | 合同ID，主键 |
| electronic_contract_code | VARCHAR2 | 合同业务编码 |
| unify_contract_code | VARCHAR2 | 统一合同编码 |
| contract_type | VARCHAR2 | 合同类型 |
| sub_type | VARCHAR2 | 合同子类型 |
| sub_template_type | VARCHAR2 | 子模板类型 |
| template_id | NUMBER | 关联模板ID |
| brand_id | NUMBER | 品牌方ID |
| agent_id | NUMBER | 经销商ID |
| agent_name | VARCHAR2 | 经销商名称 |
| contract_status | VARCHAR2 | 合同状态 |
| sign_url | VARCHAR2 | 签署链接 |
| seal_status | VARCHAR2 | 用印状态 |
| oa_status | VARCHAR2 | OA审批状态 |
| push_portal_flag | VARCHAR2 | 门户推送标识(Y/N) |
| refuse_reason | VARCHAR2 | 拒签原因 |
| reject_reason | VARCHAR2 | OA驳回原因 |
| object_version_number | NUMBER | 乐观锁版本号 |
| created_by | NUMBER | 创建人 |
| creation_date | DATE | 创建时间 |
| last_updated_by | NUMBER | 最后更新人 |
| last_update_date | DATE | 最后更新时间 |

</KbCard>

<KbCard num="2" title="ELECTRONIC_CONTRACT_SIGN_RECORD（电子合同签署记录表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| sign_record_id | NUMBER | 签署记录ID，主键 |
| electronic_contract_id | NUMBER | 关联合同ID |
| sign_node | VARCHAR2 | 签署节点 |
| sign_type | VARCHAR2 | 签署类型 |
| sign_status | VARCHAR2 | 签署状态 |
| sign_time | DATE | 签署时间 |
| sign_user | VARCHAR2 | 签署人 |
| sign_result | VARCHAR2 | 签署结果 |
| sign_remark | VARCHAR2 | 签署备注 |
| object_version_number | NUMBER | 乐观锁版本号 |
| created_by | NUMBER | 创建人 |
| creation_date | DATE | 创建时间 |

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
            <td style="color:#DC2626;font-weight:600;">合同状态不允许此操作</td>
            <td style="font-size:13px;">当前状态不可执行该操作</td>
            <td style="font-size:13px;">确认合同当前状态是否正确</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">OA提交失败</td>
            <td style="font-size:13px;">OA接口调用异常</td>
            <td style="font-size:13px;">检查OA系统连通性后重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">用印前置条件不满足</td>
            <td style="font-size:13px;">合同信息不完整无法用印</td>
            <td style="font-size:13px;">补充合同必填信息后重试</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">门户推送失败</td>
            <td style="font-size:13px;">门户接口异常</td>
            <td style="font-size:13px;">检查门户系统后使用重新推送按钮</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同状态不允许此操作</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认合同当前状态是否正确</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>OA提交失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查OA系统连通性后重试</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>用印前置条件不满足</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>补充合同必填信息后重试</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>门户推送失败</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查门户系统后使用重新推送按钮</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">拒签后合同还能重新发起签署吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能。拒签确认后合同终止，需重新创建合同发起签署流程。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">OA驳回后修改信息重新提交，签署流程会从头开始吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不会。重新提交OA后从OA审批节点继续，已完成的签署节点不受影响。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">用印异常后重新用印，需要经销商重新操作吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不需要。用印异常由品牌方在后台重新发起用印，经销商无需操作。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">合同状态一直停在pending怎么办？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>检查OA系统审批状态是否正常回调，若OA已审批但回调失败，需联系运维手动触发状态同步。
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
