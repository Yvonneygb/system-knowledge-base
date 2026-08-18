<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
  <div class="kl-card">
    <div class="biz-kl-hdr">
      <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 定义</span>
      <h2>合同保证金查什么</h2>
      <p>从 EBS 共享系统同步的到款认款记录视图，管理认款、撤销与认缴跳转</p>
    </div>
    <div class="biz-3col">
      <div class="kl-col-box" style="margin-bottom:0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="5.5" stroke="white" stroke-width="1.5"/><path d="M8 5.5V8L9.8 9.2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div>
            <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">认款来源</h5>
            <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">记录来自 EBS 共享到款，含认款单号、金额与同步时间。</p>
          </div>
        </div>
      </div>
      <div class="kl-col-box alt" style="margin-bottom:0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M5.5 6L7 7.5L10.5 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div>
            <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">认缴类型</h5>
            <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">区分普通认缴与封顶认缴，封顶类型影响撤销与缴清判定。</p>
          </div>
        </div>
      </div>
      <div class="kl-col-box" style="margin-bottom:0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M2 6H14M5 2V4M11 2V4" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div>
            <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">状态标识</h5>
            <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">认款状态分已认款与撤销认款，决定可执行的操作。</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="kl-card">
    <div class="biz-kl-hdr">
      <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 使用</span>
      <h2>怎么用它管理认款</h2>
      <p>查询认款 → 撤销或发起认缴 → 同步更新缴清状态</p>
    </div>
    <div class="biz-steps">
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h10M8 3v10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h5>查询认款</h5>
        <small>查看 EBS 同步<br>到款认款记录</small>
      </div>
      <div class="biz-step-arrow">&rarr;</div>
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h10M8 3v10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h5>撤销/认缴</h5>
        <small>撤销认款<br>或跳转认缴申请</small>
      </div>
      <div class="biz-step-arrow">&rarr;</div>
      <div class="biz-step-item">
        <div class="biz-step-circle" style="background:linear-gradient(135deg,#059669,#047857);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13L6 9L9 11L13 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h5>更新状态</h5>
        <small>更新合同缴清<br>推送 CRM</small>
      </div>
    </div>
    <div class="kl-tip" style="margin-top:14px;">
      <strong>使用原则：</strong>合同保证金页是认款数据的管理台，本身由 EBS 同步驱动；撤销认款会反向回退合同与认缴概况的缴清状态，封顶认缴与普通认缴处理逻辑不同。
    </div>
  </div>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;">
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">合同保证金 — 全链路流程图</h4>
  <p class="bf-main-sub">开始 → ★合同保证金管理★(查询/撤销认款/认缴申请) → 结束（撤销更新合同与认缴概况·推送CRM；认缴申请跳转）</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 580" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#16A34A"/></marker>
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#9CA3AF"/></marker>
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#3B82F6"/></marker>
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><polygon points="0,0 10,5 0,10" fill="#EF4444"/></marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/></filter>
      </defs>
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>
      <rect x="270" y="56" width="200" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="370" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">EBS共享系统</text>
      <rect x="500" y="56" width="200" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">保证金标准设定</text>
      <rect x="730" y="56" width="200" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="830" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">年度经销合同</text>
      <line x1="600" y1="115" x2="600" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>
      <rect x="560" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="600" y1="194" x2="600" y2="230" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="430" y="230" width="340" height="54" rx="6" fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="600" y="254" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★合同保证金管理★</text>
      <text x="600" y="272" text-anchor="middle" fill="#DCFCE7" font-size="10">查询认款记录/撤销认款/认缴申请跳转</text>
      <line x1="600" y1="284" x2="600" y2="400" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
      <rect x="545" y="400" width="110" height="40" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="600" y="425" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
      <line x1="600" y1="440" x2="600" y2="460" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>
      <rect x="50" y="460" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="482" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>
      <rect x="270" y="498" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="370" y="521" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">更新合同认缴状态</text>
      <rect x="500" y="498" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="600" y="521" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">更新认缴概况</text>
      <rect x="730" y="498" width="200" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="830" y="521" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">跳转认缴申请</text>
    </svg>
  </div>
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑系统</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
</div>
</div>
</div>

<div id="key-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard num="1" title="重点逻辑1：EBS认款数据同步 【数据同步】">
<KbQuote>从EBS共享系统定时同步认款数据，保证DMS系统保证金数据与EBS一致</KbQuote>

**具体逻辑**：

- 1、通过EBS接口分页查询认款数据，逐条处理入库
- 2、同步时先保存历史记录到CM_DEPOSITS_PAYMENT_HISTORY表，再判断是否为手工调整数据
- 3、若存在相同收款编号的历史记录，比较最后更新时间，以较新的为准更新认款状态
- 4、若EBS标识为撤销（rkDisplay=N），则同步更新本地状态为撤销，并触发撤销认缴逻辑
</KbCard>

<KbCard num="2" title="重点逻辑2：撤销认款 【状态变更】">
<KbQuote>撤销已认款的保证金记录，恢复合同和认缴概况的缴清状态</KbQuote>

**具体逻辑**：

- 1、查找该认款记录关联的所有认缴记录，逐条更新认缴记录状态为"撤销"
- 2、区分封顶认缴和普通认缴两种类型分别处理
- 3、封顶认缴撤销时，更新法人下所有合同的认缴状态为未缴清，并推送CRM
- 4、普通认缴撤销时，判断法人下是否存在封顶认缴且已缴清的记录，若有则更新对应合同认缴状态为未缴清，并推送CRM
- 5、最后批量更新认缴概况表中相关记录的缴清标识
</KbCard>

<KbCard num="3" title="重点逻辑3：封顶认款转换处理 【金额计算】">
<KbQuote>当普通认款被转换为封顶认款后，撤销时需回退封顶认款金额</KbQuote>

**具体逻辑**：

- 1、若认款记录已标记为转换为封顶认缴（convertCeilingFlag=Y），撤销时从封顶认款金额中扣减原认款金额
- 2、扣减后若封顶认款金额小于封顶配置金额，则触发封顶认款的撤销
</KbCard>

</div>
</div>
</div>

<div id="detail-logic" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
<KbCard title="界面模块1：合同保证金列表页">
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
<td>认款单号</td>
<td>文本框</td>
<td>认款单据编号</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.PAYMENT_NO</td>
</tr>
<tr>
<td>法人编码</td>
<td>文本框</td>
<td>经销商对应的法人编码</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.BILLING_UNIT_CODE</td>
</tr>
<tr>
<td>经销商编码</td>
<td>文本框</td>
<td>经销商编码</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.CUSTOMER_CODE</td>
</tr>
<tr>
<td>同步认款金额</td>
<td>文本框</td>
<td>从EBS同步的认款金额</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>大于0</td>
<td>CM_DEPOSITS_PAYMENT.SYN_PAYMENT_AMOUNT</td>
</tr>
<tr>
<td>已认款金额</td>
<td>文本框</td>
<td>已完成认缴的金额</td>
<td>常显</td>
<td>系统计算</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.PAYMENT_AMOUNT</td>
</tr>
<tr>
<td>认款状态</td>
<td>文本框</td>
<td>认款当前状态</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>completepay(已认款)/cancelpay(撤销认款)</td>
<td>CM_DEPOSITS_PAYMENT.PAYMENT_STATUS</td>
</tr>
<tr>
<td>认缴类型</td>
<td>文本框</td>
<td>认缴的类型分类</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>normal(普通认缴)/ceiling(封顶认缴)</td>
<td>CM_DEPOSITS_PAYMENT.PAYMENT_TYPE</td>
</tr>
<tr>
<td>是否转封顶</td>
<td>文本框</td>
<td>是否已转换为封顶认缴</td>
<td>常显</td>
<td>系统赋值</td>
<td>Y(是)/N(否)</td>
<td>CM_DEPOSITS_PAYMENT.CONVERT_CEILING_FLAG</td>
</tr>
<tr>
<td>同步时间</td>
<td>文本框</td>
<td>认款数据同步时间</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.SYN_PAYMENT_TIME</td>
</tr>
<tr>
<td>共享认款单号</td>
<td>文本框</td>
<td>共享系统的认款单号</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.FSSC_DOC_NUMBER</td>
</tr>
<tr>
<td>打款说明</td>
<td>文本框</td>
<td>打款备注说明</td>
<td>常显</td>
<td>同步EBS时赋值</td>
<td>-</td>
<td>CM_DEPOSITS_PAYMENT.RK_COMMENTS</td>
</tr>
</tbody></table></div>
</KbCard>

<KbCard title="选择弹窗">
</KbCard>
<KbCard title="导入">
无

</KbCard>
<KbCard title="其他按钮">

| 按钮名称 | 按钮作用 | 所在位置 | 显隐条件/可点击条件 | 影响 |
|---------|---------|---------|-------------------|------|
| 撤销认款 | 撤销当前认款记录 | 列表页 | 认款状态为"已认款"时可用 | 调用cancelPayById接口，更新认缴记录状态、合同缴清状态、推送CRM |
| 认缴申请 | 跳转至认缴申请页面 | 列表页 | 认款状态非"撤销认款"且未转封顶时可用 | 调用respectively接口，返回认款详情用于认缴申请 |

</KbCard>
<KbCard title="保存校验">
</KbCard>
<KbCard title="提交校验">
</KbCard>
<KbCard title="状态机">


```text
EBS同步 ──> 已认款(completepay) ──撤销认款──> 撤销认款(cancelpay)
```


| 状态机名称 | 状态释义 | 可执行的操作 |
|-----------|---------|------------|
| completepay | 已认款 | 撤销认款、认缴申请 |
| cancelpay | 撤销认款 | 无 |

---

</KbCard>
<KbCard num="1" title="表1：CM_DEPOSITS_PAYMENT（合同保证金/共享到款）">

| 字段名 | 类型 | 释义 | 对应界面字段 | 逻辑 |
|-------|------|------|------------|------|
| ID | NUMBER | 主键ID | - | 自增 |
| SYN_PAYMENT_AMOUNT | NUMBER | 同步认款金额 | 同步认款金额 | EBS同步时赋值 |
| ENTID | NUMBER | 组织ID | - | EBS同步时根据事业部匹配赋值 |
| BILLING_UNIT_CODE | VARCHAR2 | 法人编码 | 法人编码 | EBS同步时赋值 |
| CUSTOMER_CODE | VARCHAR2 | 经销商编码 | 经销商编码 | EBS同步时赋值 |
| PAYMENT_AMOUNT | NUMBER | 已认款金额 | 已认款金额 | 系统计算 |
| RECEIPT_NUMBER | VARCHAR2 | 收款编号 | - | EBS同步时赋值，用于匹配历史记录 |
| SYN_LAST_UPDATE_TIME | TIMESTAMP | 共享最后更新时间 | - | EBS同步时赋值，用于增量判断 |
| PAYMENT_NO | VARCHAR2 | 认款单号 | 认款单号 | EBS同步时赋值 |
| PAYMENT_STATUS | VARCHAR2 | 认款状态 | 认款状态 | EBS同步时赋值，completepay/cancelpay |
| PAYMENT_TYPE | VARCHAR2 | 认缴类型 | 认缴类型 | EBS同步时赋值，normal/ceiling |
| CONVERT_CEILING_FLAG | VARCHAR2 | 是否转封顶 | 是否转封顶 | 系统赋值，Y/N |
| SYN_PAYMENT_TIME | TIMESTAMP | 同步时间 | 同步时间 | EBS同步时赋值 |
| FSSC_DOC_NUMBER | VARCHAR2 | 共享认款单号 | 共享认款单号 | EBS同步时赋值 |
| RK_COMMENTS | VARCHAR2 | 打款说明 | 打款说明 | EBS同步时赋值 |

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
            <td style="color:#DC2626;font-weight:600;">当前法人不存在，请联系it处理</td>
            <td style="font-size:13px;">撤销认款</td>
            <td style="font-size:13px;">撤销认款时根据法人编码查询客户信息为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-1" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">保证金ID不能空！</td>
            <td style="font-size:13px;">认缴申请</td>
            <td style="font-size:13px;">点击认缴申请时未传入保证金记录ID</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-2" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该笔认款金额已进行撤销操作，不能进行认领</td>
            <td style="font-size:13px;">认缴申请</td>
            <td style="font-size:13px;">当前认款记录状态为撤销认款</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-3" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">该认款已转换为封顶认款，不能再进行认缴操作</td>
            <td style="font-size:13px;">认缴申请</td>
            <td style="font-size:13px;">普通认缴且已转封顶标识为Y</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-4" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">推送crm 认缴标识不能为空</td>
            <td style="font-size:13px;">撤销认款</td>
            <td style="font-size:13px;">推送CRM时认缴标识参数为空</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-5" class="view-btn">查看</a></td>
          </tr>
          <tr>
            <td style="color:#DC2626;font-weight:600;">事业部id 或 经销商id 或 合同类型 不能为空</td>
            <td style="font-size:13px;">撤销认款</td>
            <td style="font-size:13px;">推送CRM时关键参数为0</td>
            <td style="font-size:13px;"><span style="background:#FEF2F2;color:#DC2626;padding:2px 8px;border-radius:3px;font-weight:600;font-size:12px;">阻断性报错</span></td>
            <td style="font-size:13px;text-align:center;"><a href="#err-detail-6" class="view-btn">查看</a></td>
          </tr>
</tbody></table></div>

<div id="err-detail-1" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>当前法人不存在，请联系it处理</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>撤销认款时根据法人编码查询客户信息为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-2" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>保证金ID不能空！</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>点击认缴申请时未传入保证金记录ID</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-3" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该笔认款金额已进行撤销操作，不能进行认领</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>当前认款记录状态为撤销认款</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-4" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>该认款已转换为封顶认款，不能再进行认缴操作</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>普通认缴且已转封顶标识为Y</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-5" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>推送crm 认缴标识不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>推送CRM时认缴标识参数为空</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>

<div id="err-detail-6" class="error-detail-overlay">
  <div class="error-detail-box" v-pre>
    <a href="#" class="close-btn">&times;</a>
    <h4><span style="color:#7C3AED;">报错：</span>事业部id 或 经销商id 或 合同类型 不能为空</h4>
    <h5>详细逻辑</h5>
    <div class="detail-text" v-pre>（该报错的详细逻辑细则待补充；以下为表格中「根因与解决方案」供参考：）<br>推送CRM时关键参数为0</div>
    <div class="detail-tip" v-pre>阻断性报错，需修正对应数据后才能继续保存/提交</div>
  </div>
</div>
</KbCard>
<KbCard title="常见问题">
<div class="faq-qa-wrap">
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q1</span>
      <span style="font-size:15px;">EBS同步后认款数据未更新</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>EBS最后更新时间早于本地最后更新时间，系统跳过更新。排查SQL：<br>
      <strong style="color:#7C3AED;">处理：</strong>确认EBS数据是否确实更新，若EBS时间较新但仍未同步，检查同步日志
    </div>
  </div>
  <div class="kl-card" style="margin-bottom:20px; padding-left:12px; padding-right:12px;">
    <div class="kl-card-title" style="margin-bottom:16px; background:#FFFFFF;">
      <span class="kl-num">Q2</span>
      <span style="font-size:15px;">撤销认款后合同缴清状态未变更</span>
    </div>
    <div class="faq-answer" style="padding:12px 16px; background:#F5F3FF; border-radius:6px; font-size:14px; color:#374151; line-height:1.8;">
      <strong style="color:#7C3AED;">原因：</strong>法人下存在封顶认缴且已缴清的记录，系统跳过普通认缴的合同状态更新<br>
      <strong style="color:#7C3AED;">处理：</strong>确认该法人下封顶认缴的缴清状态是否正确
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
| 2025-09-18 | - | jiaqiang.fu01 | 初始创建合同保证金模块 |
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
