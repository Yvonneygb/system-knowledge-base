<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="P18-19" title="合同管理" desc="经销商视角的电子合同签署管理" />

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
[经销商登录] --> [进入合同管理] --> [按Tab查看不同类型合同]
                                        |
              +-------+-------+-------+-------+
              |       |       |       |       |
              v       v       v       v       v
         [经销合同] [装修协议] [广告协议] [点将合同] [全部]
              |       |       |       |       |
              +-------+-------+-------+-------+
                                        |
                                        v
                                [查看合同列表]
                                        |
                    +-------+-----------+-----------+
                    |       |           |           |
                    v       v           v           v
              [查看详情] [在线签署] [下载合同] [查看签署记录]
                    |
                    v
              [合同签署/确认]
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 依赖来源 | 依赖内容 | 说明 |
|---------|---------|------|
| 品牌方合同签署 | 已发起的合同 | 品牌方发起签署后合同出现在经销商列表 |
| 值集管理 | MBO.CONTRACT_TYPE | 合同类型值集 |
| 值集管理 | MBO.CONTRACT_STATUS | 合同状态值集 |
| 合同模板 | 模板条款内容 | 合同关联的模板条款展示 |
| 电子签章系统 | 签署服务 | 经销商在线签署合同 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 品牌方异常处理 | 经销商签署/拒签结果 | 签署或拒签后品牌方可查看并处理 |
| 合同状态 | 状态流转 | 经销商签署后合同状态自动流转 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 Tab分类展示">
**具体逻辑**：

- 1、合同列表按类型分Tab展示，共4个类型Tab加1个全部Tab
- 2、**经销合同(distribution_contract)**：经销商与品牌方的经销合作合同
- 3、**装修协议(decoration_agreement)**：门店装修相关协议
- 4、**广告协议(advertising_agreement)**：广告投放相关协议
- 5、**点将合同(dj_contract)**：点将业务相关合同
- 6、默认展示"全部"Tab，可切换到具体类型Tab筛选
</KbCard>

<KbCard num="2" title="2.2 经销商视角权限">
**具体逻辑**：

- 1、经销商仅能查看和管理自己作为签署方的合同
- 2、数据隔离通过API `ch/contract/process/pageForAgent` 实现，仅返回当前经销商的合同
- 3、经销商可执行操作：查看详情、在线签署、拒签、下载合同PDF
- 4、经销商不可修改合同内容，仅能签署或拒签
</KbCard>

<KbCard num="3" title="2.3 签署操作">
**具体逻辑**：

- 1、经销商收到待签署合同后，可在线签署或拒签
- 2、签署前需阅读并同意合同条款
- 3、签署通过电子签章完成，签署后合同状态自动流转
- 4、拒签需填写拒签原因，拒签后合同进入拒签状态
- 5、--
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
<KbSubTitle>选择弹窗</KbSubTitle>

- 本菜单无选择弹窗

</KbCard>
<KbCard title="导入">
- 本菜单无导入功能

</KbCard>
<KbCard title="其他按钮">

| 按钮 | 位置 | 操作说明 | 可用状态 |
|------|------|---------|---------|
| 查看详情 | 行操作 | 查看合同详细信息 | 所有状态 |
| 在线签署 | 行操作 | 进入签署页面完成签署 | waiting_sign(待签署) |
| 拒签 | 行操作 | 填写拒签原因后拒签 | waiting_sign(待签署) |
| 下载合同 | 行操作 | 下载合同PDF文件 | completed(已完成) |
| 查看签署记录 | 行操作 | 查看签署过程记录 | 所有状态 |

</KbCard>
<KbCard title="保存校验">
- 本菜单以查看和签署操作为主，无独立保存逻辑

</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

```
[品牌方发起签署] --> [waiting_sign(待经销商签署)]
                            |
                  +---------+---------+
                  v                   v
            [经销商签署]          [经销商拒签]
                  |                   |
                  v                   v
          [signed(已签署)]     [refuse_seal(拒签)]
                  |
                  v
          [品牌方继续处理]
```

| 状态 | 状态说明 | 经销商可执行操作 |
|------|---------|----------------|
| temporary | 临时/草稿 | 无（品牌方编辑中） |
| waiting_sign | 待签署 | 在线签署、拒签、查看详情 |
| waiting_seal | 待用印 | 查看详情、查看签署记录 |
| completed | 已完成 | 查看详情、下载合同、查看签署记录 |
| refuse_seal | 拒签 | 查看详情 |
| reject_oa | OA驳回 | 查看详情 |
| pending | OA审批中 | 查看详情 |
| push_portal | 已推送门户 | 查看详情、下载合同 |

---

</KbCard>
<KbCard num="1" title="ELECTRONIC_CONTRACT（电子合同表）">

| 字段名 | 类型 | 说明 |
|--------|------|------|
| electronic_contract_id | NUMBER | 合同ID，主键 |
| electronic_contract_code | VARCHAR2 | 合同业务编码 |
| unify_contract_code | VARCHAR2 | 统一合同编码 |
| contract_type | VARCHAR2 | 合同类型（distribution_contract/decoration_agreement/advertising_agreement/dj_contract） |
| sub_type | VARCHAR2 | 合同子类型 |
| template_id | NUMBER | 关联模板ID |
| brand_id | NUMBER | 品牌方ID |
| brand_name | VARCHAR2 | 品牌方名称 |
| agent_id | NUMBER | 经销商ID |
| agent_name | VARCHAR2 | 经销商名称 |
| contract_status | VARCHAR2 | 合同状态 |
| sign_url | VARCHAR2 | 签署链接 |
| contract_content | CLOB | 合同内容JSON |
| clause_content | CLOB | 条款内容 |
| pdf_url | VARCHAR2 | 合同PDF地址 |
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
            <td style="color:#DC2626;font-weight:600;">请先阅读并同意合同条款</td>
            <td style="font-size:13px;">签署前未勾选同意条款</td>
            <td style="font-size:13px;">勾选同意条款复选框后签署</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请填写拒签原因</td>
            <td style="font-size:13px;">拒签时拒签原因为空</td>
            <td style="font-size:13px;">填写拒签原因后提交</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">合同PDF生成中，请稍后</td>
            <td style="font-size:13px;">合同完成但PDF未生成</td>
            <td style="font-size:13px;">稍后刷新页面重试下载</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">签署服务不可用</td>
            <td style="font-size:13px;">电子签章系统异常</td>
            <td style="font-size:13px;">联系运维检查签章系统</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请先阅读并同意合同条款</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>勾选同意条款复选框后签署</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请填写拒签原因</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>填写拒签原因后提交</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>合同PDF生成中，请稍后</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>稍后刷新页面重试下载</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>签署服务不可用</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>联系运维检查签章系统</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">经销商能修改合同内容吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能。经销商仅能查看合同内容并进行签署或拒签操作，合同内容由品牌方维护。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">拒签后还能重新签署吗？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>不能。拒签后合同进入拒签状态，需品牌方重新发起签署流程。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">合同列表为什么看不到某些合同？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>经销商仅能看到自己作为签署方的合同，数据通过pageForAgent接口隔离。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">下载合同PDF提示生成中怎么办？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>合同完成后PDF异步生成，通常几秒内完成，刷新页面后重试即可。
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
