<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="新建门店申请" desc="新建门店申请流程，包括门店信息录入、资质审核、审批流转等环节" />

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
[填写新建门店申请] --> [保存草稿] --> [MKT_TERMINAL_APPLY插入, stat=SAVE]
       |
       v
[提交审批] --> [wfProcSubmit] --> [启动工作流NEW_STORE_APPLY]
       |                              |
       |                              v
       |                     [hzApproveStatus=RUN]
       |
       v
[工作流审批] --> 审批通过 --> [onWfComplete]
       |                         |
       |                         +--> [生成门店编码] --> [syncMktTerminal]
       |                         |         |
       |                         |         v
       |                         |   [MKT_TERMINAL插入, usable=2]
       |                         |         |
       |                         |         v
       |                         |   [迁移附件: attachConfId 8122→8123]
       |                         |
       |                         +--> [hzApproveStatus=APPROVED]
       |
       +--> 驳回/退回/终止/撤回/拒绝 --> [onWfBreak]
                                           |
                                           v
                                   [hzApproveStatus=对应状态]
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游来源 | 说明 | 关联方式 |
|---------|------|---------|
| 经销商主数据 | 选择所属经销商 | custId/custCode/custName |
| 分销商主数据 | 选择所属分销商 | dCustId/dCustCode/dCustName |
| 行政区划 | 选择省市区 | provinceAreaid/cityAreaid/countyAreaid |
| 事业部基础设置 | 获取事业部编码用于生成门店编码 | DivisionBaseSet |
| 系统词汇表 | 门店类型、装修等级、产权归属等LOV | LOV翻译 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 门店档案(MKT_TERMINAL) | 审批通过后自动创建门店档案 | 全字段同步 |
| 附件关系(OBJ_ATTACH_REL) | 审批通过后迁移附件到门店档案 | attachConfId从8122变更为8123 |
| 工作流引擎 | 启动NEW_STORE_APPLY流程 | hzInstanceId |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="2.1 门店编码自动生成">
**具体逻辑**：

- 1、审批通过时调用`getMktTerminalCode`方法生成门店编码
- 2、编码规则：城市车辆编码(barCode) + 事业部编码(divisionCode) + 5位流水号
- 3、流水号通过Redis自增key实现：`ae:terminal:{divisionCode}:{barCode}`
- 4、业务意义：保证门店编码全局唯一且可追溯归属区域和事业部
</KbCard>

<KbCard num="2" title="2.2 审批通过自动创建门店档案">
**具体逻辑**：

- 1、审批通过后调用`syncMktTerminal`方法，将申请单数据通过MapStruct转换为门店档案实体
- 2、新建门店档案时设置`usable=2`（有效），记录审核人和审核时间
- 3、同时将申请单的审批状态更新为APPROVED
- 4、业务意义：确保门店档案的创建必须经过审批，避免随意建店
</KbCard>

<KbCard num="3" title="2.3 附件迁移">
**具体逻辑**：

- 1、审批通过后，将申请单的附件（attachConfId=8122）迁移到门店档案（attachConfId=8123）
- 2、迁移时重新设置objId为新创建的门店ID
- 3、根据用户所属部门匹配对应的attachTypeId
- 4、业务意义：申请阶段的附件自动归档到门店档案下
</KbCard>

<KbCard num="4" title="2.4 工作流提交参数构造">
**具体逻辑**：

- 1、提交工作流时传递关键业务参数：applyId、terminalApplyId、startRealName、custId、terminalType、terminalNameFlag、terminalStat、tradeYears、oALinkTitle
- 2、`terminalNameFlag`根据门店类型和名称判断：类型=2返回"1"，名称含"五金店"或"优选店"返回"2"，其他返回"3"
- 3、`oALinkTitle`格式：`新建门店申请_门店名称_申请单号_更新时间`
- 4、业务意义：工作流节点根据这些参数进行条件分支和审批人路由
</KbCard>

<KbCard num="5" title="2.5 工作流回调统一处理">
**具体逻辑**：

- 1、继承AbstractTerminalServiceImpl的`workFlowEvent`方法统一分发审批结果
- 2、审批通过(APPROVED) → onWfComplete：创建门店档案+迁移附件
- 3、驳回(REBUT)/退回(RETURN)/终止(INTERRUPT)/撤回(WITHDRAW)/拒绝(REJECTED) → onWfBreak：仅更新审批状态
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
| 分销商选择 | d_cust_id/d_cust_code/d_cust_name | 选择所属分销商 |  |
| 行政区划选择 | province_areaid/city_areaid/county_areaid | 选择省市区，带出名称 |  |

</KbCard>
<KbCard title="导入">
无导入功能。

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 功能说明 |
|---------|---------|
| 新增 | 新建门店申请单 |
| 保存 | 保存草稿，不提交审批 |
| 提交 | 保存并提交工作流审批 |
| 审批通过同步 | 手动触发syncMktTerminal（审批通过后调用） |

</KbCard>
<KbCard title="保存校验">
- terminalApplyNo（申请单号）不能为空（@NotBlank）

- soreManagersCount（店长数量）不能为空（@NotNull）

- guideCount（导购员数量）不能为空（@NotNull）

- designerCount（设计师数量）不能为空（@NotNull）

- serviceEngineerCount（服务工程师数量）不能为空（@NotNull）

- hzApproveStatus（审批状态）不能为空（@NotBlank）

</KbCard>
<KbCard title="提交校验">
- 校验申请单数据必须存在，否则抛出"单据信息不匹配"

- 校验工作流编码必须正确

</KbCard>
<KbCard title="状态机">

```
[新建/草稿] --提交--> [审批中(RUN)] --审批通过--> [已批准(APPROVED)]
                          |
                          +--驳回--> [已驳回(REBUT)]
                          +--退回--> [已退回(RETURN)]
                          +--终止--> [已终止(INTERRUPT)]
                          +--撤回--> [已撤回(WITHDRAW)]
                          +--拒绝--> [已拒绝(REJECTED)]
```

---

</KbCard>
<KbCard num="1" title="MKT_TERMINAL_APPLY">

| 列名 | 类型 | 说明 | 是否可空 | 默认值 |
|-----|------|------|---------|-------|
| terminal_apply_id | BIGINT | 门店申请单ID(主键) | N | 自增 |
| terminal_apply_no | VARCHAR | 门店申请单号 | N | - |
| terminal_code | VARCHAR | 门店编码 | Y | - |
| terminal_name | VARCHAR | 门店名称 | Y | - |
| cust_id | BIGINT | 所属经销商ID | Y | - |
| cust_code | VARCHAR | 所属经销商编码 | Y | - |
| cust_name | VARCHAR | 所属经销商名称 | Y | - |
| addr | VARCHAR | 门店详细地址 | Y | - |
| stat | BIGINT | 单据状态(已弃用) | Y | - |
| creator | VARCHAR | 申请人 | Y | - |
| create_time | DATETIME | 申请日期 | Y | - |
| updator | VARCHAR | 更新人 | Y | - |
| update_time | DATETIME | 更新日期 | Y | - |
| checkor | VARCHAR | 审核人 | Y | - |
| check_time | DATETIME | 审核时间 | Y | - |
| note | VARCHAR | 备注 | Y | - |
| sys_id | BIGINT | 连锁商场ID | Y | - |
| sys_code | VARCHAR | 连锁商场编码 | Y | - |
| shopmanager_name | VARCHAR | 负责人 | Y | - |
| division_id | BIGINT | 事业部ID | Y | - |
| shopmanager_mob | VARCHAR | 负责人电话 | Y | - |
| wfid | BIGINT | 流程ID | Y | - |
| wfflag | BIGINT | 流程FLAG | Y | - |
| entid | BIGINT | 组织ID | Y | - |
| in_shop_date | DATE | 开店日期 | Y | - |
| terminal_type | BIGINT | 门店类型 | Y | - |
| terminal_area | BIGINT | 门店面积 | Y | - |
| customer_class | BIGINT | 经营属性 | Y | - |
| brand | VARCHAR | 经营品牌 | Y | - |
| is_ls | BIGINT | 是否连锁 | Y | - |
| province_areaname | VARCHAR | 门店所属省名称 | Y | - |
| city_areaname | VARCHAR | 门店所属市名称 | Y | - |
| county_areaname | VARCHAR | 门店所在地区/县名称 | Y | - |
| province_areaid | BIGINT | 门店所属省ID | Y | - |
| city_areaid | BIGINT | 门店所属市ID | Y | - |
| county_areaid | BIGINT | 门店所在地区/县ID | Y | - |
| areaname | VARCHAR | 拼接省市区名称 | Y | - |
| store_location_type | BIGINT | 门店位置类型 | Y | - |
| latest_decoration_date | DATE | 最新装修日期 | Y | - |
| start_saleme_date | DATE | 开始经营我司产品日期 | Y | - |
| lease_expiration_date | DATE | 店面租赁到期日 | Y | - |
| sore_managers_name | VARCHAR | 店长姓名 | Y | - |
| sore_managers_tel | VARCHAR | 店长联系电话 | Y | - |
| sore_managers_count | BIGINT | 店长数量 | N | - |
| guide_count | BIGINT | 导购员数量 | N | - |
| designer_count | BIGINT | 设计师数量 | N | - |
| service_engineer_count | BIGINT | 服务工程师数量 | N | - |
| entname | VARCHAR | 组织名称 | Y | - |
| cust_full_name | VARCHAR | 所属经销商拼接名称 | Y | - |
| decoration_style | BIGINT | 店面装修风格 | Y | - |
| property_type | BIGINT | 产权归属 | Y | - |
| fixup_grade | BIGINT | 门店装修等级 | Y | - |
| jx_store_count | BIGINT | 经销商自营门店数 | Y | - |
| jx_store_salesamt | DECIMAL | 经销商自营门店月均销售额 | Y | - |
| fx_store_count | BIGINT | 分销商自营门店数 | Y | - |
| fx_store_salesamt | DECIMAL | 分销商自营门店月均销售额 | Y | - |
| city_changzhurenkou | DECIMAL | 当地常住人口(万人) | Y | - |
| city_gdp | DECIMAL | 当地上年度GDP(万元) | Y | - |
| city_gdp_perpeson | DECIMAL | 当地人均GDP(万元) | Y | - |
| salezone_org_id | BIGINT | 所属销售区域ID | Y | - |
| salezone_org_name | VARCHAR | 所属销售区域名称 | Y | - |
| operat_center_org_id | BIGINT | 所属运营中心ID | Y | - |
| operat_center_org_name | VARCHAR | 所属运营中心名称 | Y | - |
| d_cust_id | BIGINT | 所属分销商ID | Y | - |
| d_cust_code | VARCHAR | 所属分销商编码 | Y | - |
| d_cust_name | VARCHAR | 所属分销商名称 | Y | - |
| short_name | VARCHAR | 所属经销商简称 | Y | - |
| store_area_level | VARCHAR | 门店区域等级 | Y | - |
| d_cust_full_name | VARCHAR | 所属分销商拼接名称 | Y | - |
| clientname | VARCHAR | 区分APP与PC | Y | - |
| terminal_stat | BIGINT | 门店状态 | Y | - |
| bar_code | VARCHAR | 车辆简称 | Y | - |
| division_code | VARCHAR | 事业部编码 | Y | - |
| hz_instance_id | BIGINT | H0流程实例id | Y | - |
| hz_approve_status | VARCHAR | H0流程审批状态 | N | - |

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
            <td style="color:#DC2626;font-weight:600;">单据信息不匹配</td>
            <td style="font-size:13px;">根据terminalApplyId未查到申请单</td>
            <td style="font-size:13px;">确认申请单ID是否正确，数据是否已被删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程中objid为空，流程失败!</td>
            <td style="font-size:13px;">工作流回调时objId为空或&lt;=0</td>
            <td style="font-size:13px;">检查工作流配置，确认objId正确传递</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未获取到用户信息</td>
            <td style="font-size:13px;">用户附加信息中无userType</td>
            <td style="font-size:13px;">检查用户登录状态和权限配置</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未获取到事业部信息</td>
            <td style="font-size:13px;">用户附加信息中无DEPT</td>
            <td style="font-size:13px;">联系管理员配置用户所属事业部</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>单据信息不匹配</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认申请单ID是否正确，数据是否已被删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程中objid为空，流程失败!</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查工作流配置，确认objId正确传递</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未获取到用户信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查用户登录状态和权限配置</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未获取到事业部信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>联系管理员配置用户所属事业部</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">门店编码什么时候生成？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>门店编码在审批通过后调用syncMktTerminal方法时生成，不在保存草稿时生成。编码规则为：城市车辆编码+事业部编码+5位Redis流水号。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">审批通过后门店档案没有创建怎么办？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>A: 检查工作流回调是否正常触发，确认onWfComplete方法是否执行成功。常见原因：MapStruct转换失败、MKT_TERMINAL插入异常等。<br>
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q3</span>
      <span style="font-size:15px;">stat字段和hz_approve_status字段有什么区别？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>stat字段已弃用，当前审批状态统一使用hz_approve_status字段管理。stat字段保留仅为兼容历史数据。
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q4</span>
      <span style="font-size:15px;">terminalNameFlag参数的含义？</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">处理：</strong>工作流条件分支参数：门店类型=2时返回"1"，门店名称含"五金店"或"优选店"返回"2"，其他返回"3"。用于工作流节点根据门店类型和名称走不同审批路径。
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
|-----|------|---------|-------|
| 2026-07-31 | v1.0 | 初始生成知识库文档 | AI |
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
