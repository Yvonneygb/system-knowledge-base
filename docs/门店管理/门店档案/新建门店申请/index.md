<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="3" title="新建门店申请" desc="门店管理-门店档案业务说明" />

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
<KbCard num="1" title="2.1 门店编码自动生成">
**具体逻辑**：

</KbCard>

<KbCard num="2" title="2.2 审批通过自动创建门店档案">
**具体逻辑**：

</KbCard>

<KbCard num="3" title="2.3 附件迁移">
**具体逻辑**：

</KbCard>

<KbCard num="4" title="2.4 工作流提交参数构造">
**具体逻辑**：

</KbCard>

<KbCard num="5" title="2.5 工作流回调统一处理">
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
