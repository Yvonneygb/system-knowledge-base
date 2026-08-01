<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="2" title="门店档案" desc="门店档案管理，维护门店的基本信息、经营状态、历史变更记录等" />

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
<KbCard num="1" title="2.1 列表查询自动填充组织与经销商">
**具体逻辑**：

- 1、当前端未传入组织ID时，自动从当前登录用户的附加信息中获取DEPT作为组织ID
- 2、当前端未传入经销商编码时，自动从当前登录用户附加信息中获取DC作为经销商编码
- 3、业务意义：经销商用户登录后只能查看本经销商下的门店，无需手动选择
</KbCard>

<KbCard num="2" title="2.2 保存逻辑仅允许局部字段维护">
**具体逻辑**：

- 1、保存接口仅更新`otherCondition`（其他情况说明）和`terminalAreaChange`（门店面积变动说明）两个字段
- 2、不允许通过此接口修改门店核心属性（如编码、名称、经销商等），核心属性变更需走变更申请流程
- 3、业务意义：保护门店核心数据的一致性，变更必须经过审批
</KbCard>

<KbCard num="3" title="2.3 LOV查询接口">
**具体逻辑**：

- 1、`finFeeApplyLov`：为门店装修申请与进度提供门店选择LOV，增加装修提前天数校验参数
- 2、`custDhReimburseHead`：为门头展板报销申请提供门店信息查询
- 3、--
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
支持批量导入，导入数据通过`import_flag`字段标识。

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 功能说明 |
|---------|---------|
| 查询 | 按条件分页查询门店档案列表 |
| 保存 | 仅保存其他情况说明和面积变动说明 |

</KbCard>
<KbCard title="保存校验">
<KbSubTitle>校验门店ID对应的数据必须存在，否则抛出"数据不存在"</KbSubTitle>


</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">

本菜单无工作流状态机。门店状态`terminal_stat`由新建门店申请和变更申请审批后写入。

---

</KbCard>
<KbCard num="1" title="MKT_TERMINAL">

| 列名 | 类型 | 说明 | 是否可空 | 默认值 |
|-----|------|------|---------|-------|
| terminal_id | BIGINT | 门店ID(主键) | N | 自增 |
| terminal_code | VARCHAR | 门店编码 | N | - |
| terminal_name | VARCHAR | 门店名称 | Y | - |
| cust_id | BIGINT | 所属经销商ID | Y | - |
| cust_code | VARCHAR | 所属经销商编码 | Y | - |
| cust_name | VARCHAR | 所属经销商名称 | Y | - |
| addr | VARCHAR | 门店详细地址 | Y | - |
| usable | BIGINT | 有效状态 | Y | - |
| division_id | BIGINT | 事业部ID | Y | - |
| guide_count | BIGINT | 导购员数量 | Y | - |
| service_engineer_count | BIGINT | 服务工程师数量 | Y | - |
| property_type | BIGINT | 产权归属 | Y | - |
| fixup_grade | BIGINT | 门店装修等级 | Y | - |
| creator | VARCHAR | 创建人 | Y | - |
| create_time | DATETIME | 创建时间 | Y | - |
| updator | VARCHAR | 更新人 | Y | - |
| update_time | DATETIME | 更新时间 | Y | - |
| note | VARCHAR | 备注 | Y | - |
| sys_id | BIGINT | 连锁商场ID | Y | - |
| sys_code | VARCHAR | 连锁商场编码 | Y | - |
| shopmanager_name | VARCHAR | 负责人 | Y | - |
| d_cust_id | BIGINT | 所属分销商ID | Y | - |
| shopmanager_mob | VARCHAR | 负责人电话 | Y | - |
| city_areaid | BIGINT | 门店所属市ID | Y | - |
| city_areaname | VARCHAR | 门店所属市名称 | Y | - |
| entid | BIGINT | 组织ID | Y | - |
| in_shop_date | DATE | 开店日期 | Y | - |
| terminal_type | BIGINT | 门店类型 | Y | - |
| terminal_area | BIGINT | 门店面积 | Y | - |
| customer_class | BIGINT | 经营属性 | Y | - |
| province_areaid | BIGINT | 门店所属省ID | Y | - |
| province_areaname | VARCHAR | 门店所属省名称 | Y | - |
| county_areaid | BIGINT | 门店所在地区/县ID | Y | - |
| county_areaname | VARCHAR | 门店所在地区/县名称 | Y | - |
| is_ls | BIGINT | 是否连锁 | Y | - |
| areaname | VARCHAR | 拼接省市区名称 | Y | - |
| shut_date | DATE | 撤店日期 | Y | - |
| brand | VARCHAR | 品牌 | Y | - |
| store_location_type | BIGINT | 门店位置类型 | Y | - |
| latest_decoration_date | DATE | 最新装修日期 | Y | - |
| start_saleme_date | DATE | 开始经营我司产品日期 | Y | - |
| lease_expiration_date | DATE | 店面租赁到期日 | Y | - |
| sore_managers_name | VARCHAR | 店长姓名 | Y | - |
| sore_managers_tel | VARCHAR | 店长联系电话 | Y | - |
| designer_count | BIGINT | 设计师数量 | Y | - |
| entname | VARCHAR | 组织名称 | Y | - |
| cust_full_name | VARCHAR | 所属经销商拼接名称 | Y | - |
| decoration_style | BIGINT | 店面装修风格 | Y | - |
| jx_store_count | BIGINT | 经销商自营门店数 | Y | - |
| jx_store_salesamt | BIGINT | 经销商自营门店月均销售额 | Y | - |
| fx_store_count | BIGINT | 分销商自营门店数 | Y | - |
| fx_store_salesamt | BIGINT | 分销商自营门店月均销售额 | Y | - |
| city_changzhurenkou | BIGINT | 当地常住人口(万人) | Y | - |
| city_gdp | BIGINT | 当地上年度GDP(亿元) | Y | - |
| city_gdp_perpeson | BIGINT | 当地人均GDP(万元) | Y | - |
| salezone_org_id | BIGINT | 所属销售区域ID | Y | - |
| salezone_org_name | VARCHAR | 所属销售区域名称 | Y | - |
| operat_center_org_id | BIGINT | 所属运营中心ID | Y | - |
| operat_center_org_name | VARCHAR | 所属运营中心名称 | Y | - |
| d_cust_code | VARCHAR | 所属分销商编码 | Y | - |
| d_cust_name | VARCHAR | 所属分销商名称 | Y | - |
| terminal_stat | BIGINT | 门店状态 | Y | - |
| import_flag | VARCHAR | 导入标识 | Y | - |
| short_name | VARCHAR | 所属经销商简称 | Y | - |
| store_area_level | VARCHAR | 门店区域等级 | Y | - |
| d_cust_full_name | VARCHAR | 所属分销商拼接名称 | Y | - |
| checkor | VARCHAR | 审核人 | Y | - |
| check_time | DATETIME | 审核时间 | Y | - |
| retail_amount2018 | BIGINT | 2018年零售金额 | Y | - |
| retail_amount2019 | BIGINT | 2019年零售金额 | Y | - |
| retail_amount2020 | BIGINT | 2020年零售金额 | Y | - |
| retail_amount20210106 | BIGINT | 2021年1-6月零售金额 | Y | - |
| retail_amount20210712 | BIGINT | 2021年7-12月零售金额 | Y | - |
| retail_amount20220106 | BIGINT | 2022年1-6月零售金额 | Y | - |
| retail_amount20220712 | BIGINT | 2022年7-12月零售金额 | Y | - |
| decoration_check_time | DATE | 门店装修验收审核时间 | Y | - |
| decoration_over_time | DATE | 门店装修验收过期时间 | Y | - |
| other_condition | VARCHAR | 其他情况说明 | Y | - |
| terminal_area_change | VARCHAR | 门店面积变动说明 | Y | - |
| sore_managers_count | BIGINT | 店长数量 | Y | - |
| original_stat | BIGINT | 原门店属性 | Y | - |

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
            <td style="color:#DC2626;font-weight:600;">数据不存在</td>
            <td style="font-size:13px;">保存时根据terminalId未查到对应门店记录</td>
            <td style="font-size:13px;">确认门店ID是否正确，数据是否已被删除</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未获取到用户信息</td>
            <td style="font-size:13px;">用户附加信息中无userType</td>
            <td style="font-size:13px;">检查用户登录状态和权限配置</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">未获取到事业部信息</td>
            <td style="font-size:13px;">用户附加信息中无DEPT</td>
            <td style="font-size:13px;">联系管理员配置用户所属事业部</td>
            <td style="font-size:13px;"><span style="background:#F5F3FF;color:#7C3AED;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">toast提醒</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>数据不存在</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>确认门店ID是否正确，数据是否已被删除</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>未获取到用户信息</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>检查用户登录状态和权限配置</div>
    <div class="detail-tip" v-pre>提示型提醒（toast），不阻断操作；按提示补充或修正数据后重试</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
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
