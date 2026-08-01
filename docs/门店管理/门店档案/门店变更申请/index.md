<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门店变更申请" desc="门店信息变更申请，支持门店基本信息、经营范围、负责人等字段的变更审批" />

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
<KbCard num="1" title="2.1 变更前后数据双记录">
**具体逻辑**：

- 1、变更申请表同时记录变更前数据（字段名后缀_H）和变更后数据
- 2、变更前数据从门店档案中读取并自动填入，变更后数据由用户编辑
- 3、业务意义：保留变更前后对比记录，便于审批人查看变更内容，也便于数据追溯
</KbCard>

<KbCard num="2" title="2.2 撤店前校验">
**具体逻辑**：

- 1、当变更后门店状态为撤店(terminalStat=2)时，提交审批前执行`validTerminalStat`校验
- 2、校验该门店是否存在未审批完成的门店装修申请与进度更新单（hzApproveStatus非APPROVED且非INTERRUPT）
- 3、校验该门店是否存在未审批完成的门店验收与报销单（hzApproveStatus非APPROVED且非INTERRUPT）
- 4、存在未审完单据时抛出异常，阻止提交
- 5、业务意义：撤店前必须先完成或作废所有关联的装修和报销流程
</KbCard>

<KbCard num="3" title="2.3 审批通过更新门店档案">
**具体逻辑**：

- 1、审批通过后调用`onWfComplete`方法
- 2、通过MapStruct的`toMktTerminalByModify`方法将变更后数据转换为门店档案实体
- 3、使用变更单的terminalId定位门店档案记录，执行updateByPrimaryKeySelective更新
- 4、同时记录审核人和审核时间
- 5、业务意义：确保门店档案的变更必须经过审批，变更可追溯
</KbCard>

<KbCard num="4" title="2.4 变更单编码自动生成">
**具体逻辑**：

- 1、新建变更申请时通过CodeRuleBuilder生成变更单编码
- 2、编码规则：RuleCodeEnum.TERMINAL_MODIFY_CODE，参数包含divisionCode
- 3、业务意义：变更单编码唯一标识一次变更申请
</KbCard>

<KbCard num="5" title="2.5 工作流提交参数构造">
**具体逻辑**：

- 1、提交工作流时传递关键业务参数：terminalModifyId、operatCenterOrgId、salezoneOrgId、terminalStat、terminalType、tradeYear、startRealName、customerId
- 2、工作流根据运营中心、销售区域、门店状态、门店类型等参数进行审批人路由
- 3、业务意义：不同类型的变更（如撤店）走不同的审批路径
</KbCard>

<KbCard num="6" title="2.6 工作流回调统一处理">
**具体逻辑**：

- 1、继承AbstractTerminalServiceImpl的`workFlowEvent`方法统一分发审批结果
- 2、审批通过(APPROVED) → onWfComplete：更新门店档案
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
| 经销商选择 | cust_id/cust_code/cust_name | 选择变更后所属经销商 |  |
| 分销商选择 | d_cust_id/d_cust_code/d_cust_name | 选择变更后所属分销商 |  |
| 行政区划选择 | province_areaid/city_areaid/county_areaid | 选择变更后省市区 |  |

</KbCard>
<KbCard title="导入">
无导入功能。

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 功能说明 |
|---------|---------|
| 新增 | 新建门店变更申请，选择门店后自动带出变更前数据 |
| 保存 | 保存草稿(POST /v1/{organizationId}/mkt-terminal-modifys)，不提交审批 |
| 提交 | 保存并提交工作流审批(POST /v1/{organizationId}/mkt-terminal-modifys/submit) |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>Controller层调用`validObject(modifyDTO)`进行DTO基础校验</KbSubTitle>


<KbSubTitle>新建时自动生成变更单编码</KbSubTitle>


<KbSubTitle>新建时自动设置stat=SAVE、divisionId、entid、entname</KbSubTitle>


</KbCard>
<KbCard title="提交校验">
<KbSubTitle>校验变更单数据必须存在，否则抛出"单据信息不匹配"</KbSubTitle>


<KbSubTitle>撤店校验(validTerminalStat)：当terminalStat=2时，检查是否存在未审完的装修申请或报销单</KbSubTitle>


</KbCard>
<KbCard title="状态机">

```
[新建/草稿(SAVE)] --提交--> [审批中(RUN)] --审批通过--> [已批准(APPROVED)]
                               |
                               +--驳回--> [已驳回(REBUT)]
                               +--退回--> [已退回(RETURN)]
                               +--终止--> [已终止(INTERRUPT)]
                               +--撤回--> [已撤回(WITHDRAW)]
                               +--拒绝--> [已拒绝(REJECTED)]
```

---

</KbCard>
<KbCard num="1" title="MKT_TERMINAL_MODIFY">

| 列名 | 类型 | 说明 | 是否可空 | 默认值 |
|-----|------|------|---------|-------|
| terminal_modify_id | BIGINT | 门店变更单ID(主键) | N | 自增 |
| terminal_modify_code | VARCHAR | 门店变更单编码 | Y | - |
| stat | BIGINT | 单据状态 | Y | - |
| wfid | BIGINT | 流程ID | Y | - |
| wfflag | BIGINT | 流程FLAG | Y | - |
| terminal_id | BIGINT | 门店ID | Y | - |
| terminal_code | VARCHAR | 门店编码 | Y | - |
| terminal_name | VARCHAR | 门店名称 | Y | - |
| cust_id | BIGINT | 所属经销商ID(变更后) | Y | - |
| cust_code | VARCHAR | 所属经销商编码(变更后) | Y | - |
| cust_name | VARCHAR | 所属经销商名称(变更后) | Y | - |
| addr | VARCHAR | 门店详细地址(变更后) | Y | - |
| brand | BIGINT | 经销品牌(变更后) | Y | - |
| creator | VARCHAR | 申请人 | Y | - |
| create_time | DATETIME | 申请日期 | Y | - |
| updator | VARCHAR | 更新人 | Y | - |
| update_time | DATETIME | 更新日期 | Y | - |
| note | VARCHAR | 变更说明 | Y | - |
| sys_id | BIGINT | 连锁商场ID(变更后) | Y | - |
| sys_code | VARCHAR | 连锁商场编码(变更后) | Y | - |
| shopmanager_name | VARCHAR | 负责人(变更后) | Y | - |
| shopmanager_mob | VARCHAR | 负责人电话(变更后) | Y | - |
| city_areaid | BIGINT | 门店所属市ID(变更后) | Y | - |
| city_areaname | VARCHAR | 门店所属市名称(变更后) | Y | - |
| entid | BIGINT | 组织ID | Y | - |
| is_ls | BIGINT | 是否连锁(变更后) | Y | - |
| terminal_area | VARCHAR | 门店面积(变更后) | Y | - |
| customer_class | BIGINT | 经营属性(变更后) | Y | - |
| province_areaid | BIGINT | 门店所属省ID(变更后) | Y | - |
| province_areaname | VARCHAR | 门店所属省名称(变更后) | Y | - |
| county_areaid | BIGINT | 门店所在地区/县ID(变更后) | Y | - |
| county_areaname | VARCHAR | 门店所在地区/县名称(变更后) | Y | - |
| checkor | VARCHAR | 审核人 | Y | - |
| check_time | DATETIME | 审核时间 | Y | - |
| areaname | VARCHAR | 拼接省市区名称(变更后) | Y | - |
| terminal_type | BIGINT | 门店类型(变更后) | Y | - |
| cust_id_h | BIGINT | 所属经销商ID(变更前) | Y | - |
| cust_code_h | VARCHAR | 所属经销商编码(变更前) | Y | - |
| cust_name_h | VARCHAR | 所属经销商名称(变更前) | Y | - |
| addr_h | VARCHAR | 门店详细地址(变更前) | Y | - |
| brand_h | BIGINT | 经销品牌(变更前) | Y | - |
| sys_id_h | BIGINT | 连锁商场ID(变更前) | Y | - |
| sys_code_h | VARCHAR | 连锁商场编码(变更前) | Y | - |
| shopmanager_name_h | VARCHAR | 负责人(变更前) | Y | - |
| shopmanager_mob_h | VARCHAR | 负责人电话(变更前) | Y | - |
| city_areaid_h | BIGINT | 门店所属市ID(变更前) | Y | - |
| city_areaname_h | VARCHAR | 门店所属市名称(变更前) | Y | - |
| is_ls_h | BIGINT | 是否连锁(变更前) | Y | - |
| terminal_area_h | VARCHAR | 门店面积(变更前) | Y | - |
| customer_class_h | BIGINT | 经营属性(变更前) | Y | - |
| province_areaid_h | BIGINT | 门店所属省ID(变更前) | Y | - |
| province_areaname_h | VARCHAR | 门店所属省名称(变更前) | Y | - |
| county_areaid_h | BIGINT | 门店所在地区/县ID(变更前) | Y | - |
| county_areaname_h | VARCHAR | 门店所在地区/县名称(变更前) | Y | - |
| areaname_h | VARCHAR | 拼接省市区名称(变更前) | Y | - |
| terminal_type_h | BIGINT | 门店类型(变更前) | Y | - |
| change_type | BIGINT | 变更类型 | Y | - |
| division_id | BIGINT | 事业部ID | Y | - |
| entname | VARCHAR | 组织名称 | Y | - |
| cust_full_name | VARCHAR | 所属经销商拼接名称(变更后) | Y | - |
| cust_full_name_h | VARCHAR | 所属经销商拼接名称(变更前) | Y | - |
| decoration_style | VARCHAR | 店面装修风格(变更后) | Y | - |
| property_type | BIGINT | 产权归属(变更后) | Y | - |
| decoration_style_h | VARCHAR | 店面装修风格(变更前) | Y | - |
| property_type_h | BIGINT | 产权归属(变更前) | Y | - |
| terminal_stat_h | BIGINT | 门店状态(变更前) | Y | - |
| terminal_stat | BIGINT | 门店状态(变更后) | Y | - |
| create_part | BIGINT | 申请部门 | Y | - |
| store_location_type_h | BIGINT | 位置类型(变更前) | Y | - |
| store_location_type | BIGINT | 位置类型(变更后) | Y | - |
| fixup_grade_h | BIGINT | 装修等级(变更前) | Y | - |
| fixup_grade | BIGINT | 装修等级(变更后) | Y | - |
| start_saleme_date_h | DATE | 经营我司产品起始时间(变更前) | Y | - |
| start_saleme_date | DATE | 经营我司产品起始时间(变更后) | Y | - |
| lease_expiration_date_h | DATE | 店面租赁到期日(变更前) | Y | - |
| lease_expiration_date | DATE | 店面租赁到期日(变更后) | Y | - |
| salezone_org_id_h | BIGINT | 所属销售区域ID(变更前) | Y | - |
| salezone_org_name_h | VARCHAR | 所属销售区域名称(变更前) | Y | - |
| operat_center_org_id_h | BIGINT | 所属运营中心ID(变更前) | Y | - |
| operat_center_org_name_h | VARCHAR | 所属运营中心名称(变更前) | Y | - |
| salezone_org_id | BIGINT | 所属销售区域ID(变更后) | Y | - |
| salezone_org_name | VARCHAR | 所属销售区域名称(变更后) | Y | - |
| operat_center_org_id | BIGINT | 所属运营中心ID(变更后) | Y | - |
| operat_center_org_name | VARCHAR | 所属运营中心名称(变更后) | Y | - |
| sore_managers_name_h | VARCHAR | 店长姓名(变更前) | Y | - |
| sore_managers_tel_h | VARCHAR | 店长联系电话(变更前) | Y | - |
| guide_count_h | BIGINT | 导购员数量(变更前) | Y | - |
| designer_count_h | BIGINT | 设计师数量(变更前) | Y | - |
| sore_managers_name | VARCHAR | 店长姓名(变更后) | Y | - |
| sore_managers_tel | VARCHAR | 店长联系电话(变更后) | Y | - |
| guide_count | BIGINT | 导购员数量(变更后) | Y | - |
| designer_count | BIGINT | 设计师数量(变更后) | Y | - |
| d_cust_id_h | BIGINT | 所属分销商ID(变更前) | Y | - |
| d_cust_code_h | VARCHAR | 所属分销商编码(变更前) | Y | - |
| d_cust_name_h | VARCHAR | 所属分销商名称(变更前) | Y | - |
| d_cust_id | BIGINT | 所属分销商ID(变更后) | Y | - |
| d_cust_code | VARCHAR | 所属分销商编码(变更后) | Y | - |
| d_cust_name | VARCHAR | 所属分销商名称(变更后) | Y | - |
| d_cust_full_name_h | VARCHAR | 所属分销商拼接名称(变更前) | Y | - |
| d_cust_full_name | VARCHAR | 所属分销商拼接名称(变更后) | Y | - |
| short_name_h | VARCHAR | 所属经销商简称(变更前) | Y | - |
| short_name | VARCHAR | 所属经销商简称(变更后) | Y | - |
| clientname | VARCHAR | 区分APP与PC | Y | - |
| store_area_level_h | VARCHAR | 门店区域等级(变更前) | Y | - |
| store_area_level | VARCHAR | 门店区域等级(变更后) | Y | - |
| shut_date_h | DATE | 撤店日期(变更前) | Y | - |
| shut_date | DATE | 撤店日期(变更后) | Y | - |
| trade_years | VARCHAR | 营业年限 | Y | - |
| other_condition_h | VARCHAR | 其他情况说明(变更前) | Y | - |
| terminal_area_change_h | VARCHAR | 门店面积变动说明(变更前) | Y | - |
| in_shop_date_h | DATETIME | 开店日期(变更前) | Y | - |
| latest_decoration_date_h | DATETIME | 最新装修日期(变更前) | Y | - |
| other_condition | VARCHAR | 其他情况说明(变更后) | Y | - |
| terminal_area_change | VARCHAR | 门店面积变动说明(变更后) | Y | - |
| in_shop_date | DATETIME | 开店日期(变更后) | Y | - |
| latest_decoration_date | DATETIME | 最新装修日期(变更后) | Y | - |
| hz_instance_id | BIGINT | 流程实例Id | Y | - |
| hz_approve_status | VARCHAR | 流程实例状态 | Y | - |
| sore_managers_count | BIGINT | 店长数量(变更后) | Y | - |
| sore_managers_count_h | BIGINT | 店长数量(变更前) | Y | - |

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
            <td style="font-size:13px;">根据terminalModifyId未查到变更单</td>
            <td style="font-size:13px;">确认变更单ID是否正确，数据是否已被删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">门店档案信息不匹配</td>
            <td style="font-size:13px;">审批通过时根据terminalId未查到门店档案</td>
            <td style="font-size:13px;">确认关联门店是否存在</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">流程中objid为空，流程失败!</td>
            <td style="font-size:13px;">工作流回调时objId为空或&lt;=0</td>
            <td style="font-size:13px;">检查工作流配置，确认objId正确传递</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请先审批通过/作废未审完的门店装修申请与进度更新单</td>
            <td style="font-size:13px;">撤店时存在未审完的装修单</td>
            <td style="font-size:13px;">先完成或作废该门店的装修申请单</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">请先审批通过/作废未审完的门店验收与报销单</td>
            <td style="font-size:13px;">撤店时存在未审完的报销单</td>
            <td style="font-size:13px;">先完成或作废该门店的验收报销单</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未获取到部门信息</td>
            <td style="font-size:13px;">事业部基础设置未配置</td>
            <td style="font-size:13px;">联系管理员配置事业部基础设置</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>单据信息不匹配</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认变更单ID是否正确，数据是否已被删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>门店档案信息不匹配</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认关联门店是否存在</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>流程中objid为空，流程失败!</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查工作流配置，确认objId正确传递</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请先审批通过/作废未审完的门店装修申请与进度更新单</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>先完成或作废该门店的装修申请单</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>请先审批通过/作废未审完的门店验收与报销单</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>先完成或作废该门店的验收报销单</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未获取到部门信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>联系管理员配置事业部基础设置</div>
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
