<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbHero num="11" title="折扣政策明细查询（内部）" desc="工程管理-项目交付业务说明" />

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

```text
折扣政策申请(已审核通过)
  │
  ▼
折扣政策明细查询（内部）
  │
  ├─ 按政策ID查询 → 展示该政策下所有产品明细行
  ├─ 按产品编码/名称/型号筛选
  ├─ 按申请类型筛选(产品/型号/全产品)
  ├─ 按优惠方式筛选(折扣/特价)
  ├─ 按生效状态筛选
  └─ 查看产品二级明细行(折扣率/特价) + 经销商封顶数量行
```

</KbCard>

<KbCard num="2" title="上游依赖">

| 上游模块 | 依赖类型 | 依赖说明 | 依赖成立条件 |
|---------|---------|---------|------------|
| 折扣政策申请 | 数据依赖 | 明细行数据来源于折扣政策申请单的产品明细 | 折扣政策已保存/已审核 |
| 折扣政策失效 | 数据依赖 | 失效后明细行的生效状态(validStat)和失效ID(discountPolicyDisabledId)会更新 | 折扣政策失效单已审核通过 |

</KbCard>

<KbCard num="3" title="下游影响">
<div class="ds-impact">

| 下游系统/模块 | 影响内容 | 说明 |
|---|---|---|
| 无 | 无下游影响 | 无直接下游影响 |

</div>
</KbCard>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：纯查询页面，无增删改操作 【只读查询】">
<KbQuote>供内部人员查询折扣政策的产品明细信息，了解各产品的折扣率、特价、封顶数量等详细配置</KbQuote>

**具体逻辑**：

- 1、本页面仅提供查询功能，不支持新增、修改、删除操作
- 2、查询结果关联产品拓展表，展示月平均动销数量、库存消化月数、现有量、库龄等扩展信息
</KbCard>

<KbCard num="2" title="重点逻辑2：产品明细行关联二级明细 【层级结构】">
<KbQuote>折扣政策产品明细行下可挂载二级明细行(折扣率阶梯/特价阶梯)和经销商封顶数量行</KbQuote>

**具体逻辑**：

- 1、每个产品明细行(applicationType=1产品/2型号)下可有多条二级明细行，定义不同折扣率/特价
- 2、每个产品明细行下可有多条经销商封顶数量行，限制单个经销商的购买数量
- 3、申请类型=3(全产品)时，无二级明细行，折扣率/特价直接在产品行上
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：折扣政策明细查询页面（hlod低代码页面）">
<div class="kb-field-scroll">
<table class="kb-field-tbl">
<colgroup><col style="width:13%"><col style="width:9%"><col style="width:17%"><col style="width:12%"><col style="width:21%"><col style="width:12%"><col style="width:16%"></colgroup>
<thead><tr>
<th>字段名</th>
<th>组件</th>
<th>业务释义</th>
<th>显隐条件</th>
<th>取值/赋值逻辑</th>
<th>合法值</th>
<th>数据库列名</th>
</tr></thead>
<tbody>
<tr>
<td>政策ID</td>
<td>数值输入框</td>
<td>按折扣政策ID筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.DISCOUNT_POLICY_ID</td>
</tr>
<tr>
<td>申请类型</td>
<td>下拉选择框</td>
<td>产品明细的申请类型</td>
<td>常显</td>
<td>来源值集epm.Application_type</td>
<td>1=产品，2=型号，3=全产品</td>
<td>EPM_DISCOUNT_POLICY_ITEM.APPLICATION_TYPE</td>
</tr>
<tr>
<td>产品编码</td>
<td>文本框</td>
<td>按产品编码模糊筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_CODE</td>
</tr>
<tr>
<td>产品名称</td>
<td>文本框</td>
<td>按产品名称模糊筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_NAME</td>
</tr>
<tr>
<td>产品型号</td>
<td>文本框</td>
<td>按产品型号模糊筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_MODEL</td>
</tr>
<tr>
<td>优惠方式</td>
<td>下拉选择框</td>
<td>优惠方式筛选</td>
<td>常显</td>
<td>来源值集epm.preferential_type</td>
<td>1=折扣，2=特价</td>
<td>EPM_DISCOUNT_POLICY_ITEM.PREFERENTIAL_TYPE</td>
</tr>
<tr>
<td>生效状态</td>
<td>下拉选择框</td>
<td>明细行生效状态</td>
<td>常显</td>
<td>用户选择</td>
<td>0=未生效，1=生效，3=已失效</td>
<td>EPM_DISCOUNT_POLICY_ITEM.VALID_STAT</td>
</tr>
<tr>
<td>产品品类</td>
<td>下拉选择框</td>
<td>产品品类筛选</td>
<td>常显</td>
<td>用户输入</td>
<td>-</td>
<td>EPM_DISCOUNT_POLICY_ITEM.ITEM_MANAGE_TYPE</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 查询 | 查询折扣政策明细 | 列表页 | 常显 | 调用GET /v1/{organizationId}/epm-discount-policy-item查询 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">
### 状态机

> 本页面为纯查询页面，无状态流转

---

</KbCard>
<KbCard num="1" title="表1：EPM_DISCOUNT_POLICY_ITEM（折扣政策产品明细表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ID | NUMBER | 政策ID | 政策ID | 关联EPM_DISCOUNT_POLICY头表 |
| DISCOUNT_POLICY_ITEM_ID | NUMBER | 政策产品ID(主键) | - | 自增生成 |
| SEQ | NUMBER | 序号 | 序号 | 保存时赋值 |
| APPLICATION_TYPE | NUMBER | 申请类型 | 申请类型 | 1=产品，2=型号，3=全产品 |
| ITEM_ID | NUMBER | 产品ID | - | 关联产品主键 |
| ITEM_CODE | VARCHAR | 产品编码 | 产品编码 | 由产品带入 |
| ITEM_NAME | VARCHAR | 产品名称 | 产品名称 | 由产品带入 |
| ITEM_MODEL | VARCHAR | 产品型号 | 产品型号 | 由产品带入 |
| UOM_NAME | VARCHAR | 单位名称 | 单位 | 由产品带入 |
| STAND_PRICE | NUMBER | 标准单价(含安装) | 标准单价 | 由产品带入 |
| PREFERENTIAL_TYPE | NUMBER | 优惠方式 | 优惠方式 | 1=折扣，2=特价 |
| CAPPING | NUMBER | 封顶数量校验 | 封顶数量校验 | 保存时赋值 |
| INSTALL_UNIT_PRICE | NUMBER | 安装单价 | 安装单价 | 由产品带入 |
| SUM_INSTALL_UNIT_PRICE | NUMBER | 安装金额 | 安装金额 | 计算赋值 |
| STANDARD_PRICE | NUMBER | 标准单价(不含安装) | 标准单价(不含安装) | 由产品带入 |
| ACCTLEVEL | NUMBER | 客户等级 | 客户等级 | 来源值集epm.customer_grade |
| CITYTYPE | NUMBER | 城市类型 | 城市类型 | 来源值集epm.city_level |
| RESPRODCHANNEL | NUMBER | 限制产品渠道 | 限制产品渠道 | 保存时赋值 |
| CRM_LINE_ID | VARCHAR | 外部行ID | - | CRM系统行ID |
| ITEM_COST | NUMBER | 物料实际成本单价 | 物料实际成本单价 | 通过接口获取各事业部平均成本 |
| TASKDISCOUNT | NUMBER | 任务返点折扣率 | 任务返点折扣率 | 保存时赋值 |
| TOTAL_CAP_NUMBER | VARCHAR | 政策封顶总数量行 | 政策封顶总数量 | 保存时赋值 |
| CAL_CONTRACT_DISCOUNT | VARCHAR | 计合同折扣 | 计合同折扣 | Y/N |
| CAL_ADVERTISE_EXPENSES | VARCHAR | 计广告费 | 计广告费 | Y/N |
| CAL_BILLING_DISCOUNT | VARCHAR | 计开单折扣 | 计开单折扣 | Y/N |
| DISCOUNT_POLICY_DISABLED_ID | NUMBER | 政策失效ID | - | 失效时关联EPM_DISCOUNT_POLICY_DISABLED |
| VALID_STAT | NUMBER | 生效状态 | 生效状态 | 0=未生效，1=生效，3=已失效 |
| CUSTOMER_CAPS_NUMBER | NUMBER | 单个经销商封顶数量 | 单个经销商封顶数量 | 保存时赋值 |
| ITEM_MANAGE_TYPE | VARCHAR | 产品品类 | 产品品类 | 由产品带入 |
| PROD_DISCOUNT | NUMBER | 产品最高折扣率 | 产品最高折扣率 | 保存时赋值 |
| PROD_DISC_CHANNEL | VARCHAR | 产品最高折扣率渠道 | 产品最高折扣率渠道 | 保存时赋值 |
| REMARK | VARCHAR | 备注 | 备注 | 用户输入 |
| OBJECT_VERSION_NUMBER | NUMBER | 乐观锁版本号 | - | 框架自动维护 |

</KbCard>

<KbCard num="2" title="表2：EPM_DISCOUNT_POLICY_ITEM_EXT（折扣政策产品明细拓展表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 拓展表ID(主键) | - | 自增生成 |
| DISCOUNT_POLICY_ITEM_ID | NUMBER | 政策产品ID | - | 关联EPM_DISCOUNT_POLICY_ITEM |
| AVG_MONTH_DYNAMIC_SALE_NUM | NUMBER | 月平均动销数量 | 月平均动销数量 | 保存时赋值 |
| INVENTORY_DIGESTION_MONTHS | NUMBER | 库存消化月数 | 库存消化月数 | 保存时赋值 |
| INVENTORY_NUM | NUMBER | 现有量 | 现有量 | 保存时赋值 |
| SM_STATE | VARCHAR | 生命周期 | 生命周期 | 保存时赋值 |
| STOCK_AGE_NUM | VARCHAR | 库龄JSON数据 | 库龄数据 | JSON格式，如{"stockagenum_0_1":10,"stockagenum_1_2":20} |
| NEW_PROD_FLAG | VARCHAR | 新品标记 | 新品标记 | Y/N |
| NEW_PROD_COLOR_FLAG | VARCHAR | 3个月内上市新品标记 | 3个月内上市新品标记 | Y/N |
| PROD_ATTRIBUTION_CHANNEL | VARCHAR | 产品归属渠道 | 产品归属渠道 | 保存时赋值 |
| PROD_POSITIONING | VARCHAR | 产品定位 | 产品定位 | 保存时赋值 |

</KbCard>

<KbCard num="3" title="表3：EPM_DISCOUNT_POLICY_ITEM_LINE（折扣政策产品二级明细表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_LINE_ID | NUMBER | 二级明细ID(主键) | - | 自增生成 |
| DISCOUNT_POLICY_ITEM_ID | NUMBER | 政策产品ID | - | 关联EPM_DISCOUNT_POLICY_ITEM |
| GROUPING | NUMBER | 分组 | - | 折扣率/特价分组编号 |
| DISCOUNT_RATE | NUMBER | 折扣率 | 折扣率 | 保存时赋值 |
| DISCOUNT_PRICE | NUMBER | 特价 | 特价 | 保存时赋值 |

</KbCard>

<KbCard num="4" title="表4：EPM_DISCOUNT_POLICY_ITEM_CUSTOMER（折扣政策产品经销商封顶数量表，关联表）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| DISCOUNT_POLICY_ITEM_CUSTOMER_ID | NUMBER | 主键 | - | 自增生成 |
| DISCOUNT_POLICY_ITEM_ID | NUMBER | 政策产品ID | - | 关联EPM_DISCOUNT_POLICY_ITEM |
| CUSTOMER_ID | NUMBER | 经销商ID | - | 关联经销商 |
| CAPS_NUMBER | NUMBER | 封顶数量 | 封顶数量 | 保存时赋值 |

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
            <td style="color:#DC2626;font-weight:600;">政策失效id不允许为空</td>
            <td style="font-size:13px;">查询失效行</td>
            <td style="font-size:13px;">查询折扣政策失效行时未传入政策失效ID，需传入discountPolicyDisabledId参数</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>政策失效id不允许为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>查询折扣政策失效行时未传入政策失效ID，需传入discountPolicyDisabledId参数</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">查询结果中部分产品明细行的拓展信息为空</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>EPM_DISCOUNT_POLICY_ITEM_EXT表中无对应记录，可能为历史数据或保存时未生成拓展数据<br>
      <strong style="color:#7C3AED;">处理：</strong>确认该产品明细行是否需要拓展信息，如需要可重新生成
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">生效状态含义不明确</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>VALID_STAT字段使用数值编码，0=未生效，1=生效，3=已失效<br>
      <strong style="color:#7C3AED;">处理：</strong>通过值集epm或前端LOV翻译显示
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

| 日期 | 提交ID | 提交人 | 提交内容 |
|------|-------|-------|---------|
| 2025-09-16 | - | lfb | 初始创建折扣政策产品明细功能 |
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
