<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="1" title="门店变更申请" desc="门店管理-门店档案业务说明" />

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
| 无 | 无下游影响 | 本功能为纯设置/档案管理，不向任何下游系统/模块写入数据 |

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

</KbCard>

<KbCard num="2" title="2.2 撤店前校验">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 审批通过更新门店档案">
**具体逻辑**：

</KbCard>

<KbCard num="4" title="2.4 变更单编码自动生成">
**具体逻辑**：

</KbCard>

<KbCard num="5" title="2.5 工作流提交参数构造">
**具体逻辑**：

</KbCard>

<KbCard num="6" title="2.6 工作流回调统一处理">
**具体逻辑**：

</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">
</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
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
