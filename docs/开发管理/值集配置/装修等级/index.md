---
---

<!-- 自定义顶部 TAB 栏（值集配置专用） -->
<div class="vs-tabs-bar">
  <div class="vs-tabs-inner">
    <div class="vs-tab-btn active" data-tab="intro" onclick="switchVsTab('intro', this)">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      <span>值集简介</span>
    </div>
    <div class="vs-tab-btn" data-tab="overview" onclick="switchVsTab('overview', this)">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      <span>涉及菜单概览</span>
    </div>
    <div class="vs-tab-btn" data-tab="detail" onclick="switchVsTab('detail', this)">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
      <span>涉及详细逻辑</span>
    </div>
    <div class="vs-tab-btn" data-tab="translate" onclick="switchVsTab('translate', this)">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
      <span>值集翻译方式汇总</span>
    </div>
  </div>
</div>

<!-- ============== TAB 1：值集简介 ============== -->
<div id="vs-intro" class="vs-tab-content" style="display:block;">
<div class="kl-wrap">

<div class="kl-card">
  <div class="kl-card-header">
    <span class="kl-num">1</span>
    <h2 class="kl-card-title">值集基本信息</h2>
  </div>
  <table class="kl-table">
    <tr><th style="width:150px;">属性</th><th>内容</th></tr>
    <tr><td>值集编码</td><td><code>AE.FIXUP_GRADE</code></td></tr>
    <tr><td>中文名称</td><td>门店装修等级</td></tr>
    <tr><td>存储位置</td><td>HZERO 平台 <code>HPFM_LOV_VALUE</code> 表</td></tr>
    <tr><td>当前模式</td><td>同一 value + 同一 meaning，通过 <code>tag</code> 字段标记适用的事业部（organization_id）</td></tr>
    <tr><td>存储方式</td><td>所有业务表中 <code>FIXUP_GRADE</code> 字段统一存储的是值集的 <strong>value（Long 类型数值）</strong>，界面展示时翻译为 meaning（中文含义）</td></tr>
  </table>
</div>

<div class="kl-card alt">
  <div class="kl-card-header">
    <span class="kl-num">2</span>
    <h2 class="kl-card-title">值集定义方式</h2>
  </div>
  <p class="kl-desc">值集在 <code>HPFM_LOV_VALUE</code> 表中定义，每个装修等级对应一个 value 和 meaning。当前所有事业部共用同一套 value→meaning 映射，通过 tag 字段区分适用的事业部。</p>
  <div class="kl-two-col">
    <div class="kl-col-box info">
      <div class="kl-col-title">📋 值集定义示例</div>
      <div class="kl-col-items">
        <code>value = 1, meaning = '一级', tag = '123'</code><br>
        <code>value = 2, meaning = '二级', tag = '123'</code><br>
        <code>value = 3, meaning = '三级', tag = '123'</code>
      </div>
    </div>
    <div class="kl-col-box warn">
      <div class="kl-col-title">🔧 改动方向</div>
      <div class="kl-col-items">
        如需支持不同事业部自定义装修等级的 value 和 meaning，需在 Java 翻译层增加 organizationId 参数，并调整值集配置方式。
      </div>
    </div>
  </div>
</div>

</div>
</div>

<!-- ============== TAB 2：涉及菜单概览 ============== -->
<div id="vs-overview" class="vs-tab-content" style="display:none;">
<div class="kl-wrap">

<div class="kl-card">
  <div class="kl-card-header">
    <span class="kl-num">1</span>
    <h2 class="kl-card-title">菜单总览表</h2>
  </div>
  <table class="kl-table">
    <tr>
      <th>序号</th>
      <th>菜单名称</th>
      <th>核心 Entity</th>
      <th>界面显示字段名</th>
      <th>存储内容</th>
      <th>fixupGrade 业务用途</th>
      <th>frontdoorFixupGrade</th>
    </tr>
    <tr>
      <td>1</td>
      <td>门店装修申请与进度更新</td>
      <td>FinFeeApplyFinishedHeader</td>
      <td>"门店装修等级" / "门头装修等级"</td>
      <td>value</td>
      <td>⭐核心：匹配装修标准、提交校验、OA推送</td>
      <td>有，界面显示"门头装修等级"，存 value</td>
    </tr>
    <tr>
      <td>2</td>
      <td>门店装修申请变更</td>
      <td>FinFeeApplyChangeHeader</td>
      <td>"门店装修等级" / "门头装修等级"</td>
      <td>value</td>
      <td>从原申请单带入，打印展示</td>
      <td>有，存 value</td>
    </tr>
    <tr>
      <td>3</td>
      <td>门店装修申请关闭</td>
      <td>FinFeeApplyClose</td>
      <td>"门店装修等级" / "门头装修等级"</td>
      <td>value</td>
      <td>从原申请单带入，仅展示</td>
      <td>有，存 value</td>
    </tr>
    <tr>
      <td>4</td>
      <td>门店验收与报销单</td>
      <td>FinFeeCheckBxHeader</td>
      <td>"本次店面装修等级" / "本次门头装修等级"</td>
      <td>value</td>
      <td>⭐核心：匹配装修标准行、计算补贴金额</td>
      <td>有，界面显示"本次门头装修等级"，存 value</td>
    </tr>
    <tr>
      <td>5</td>
      <td>门店装修标准设置</td>
      <td>TerminalDecorateStandard + TerminalDecorateLine</td>
      <td>"门店装修等级"（标准行维度）</td>
      <td>value</td>
      <td>⭐核心：作为标准行的维度字段，定义不同等级的补贴标准</td>
      <td>无</td>
    </tr>
    <tr>
      <td>6</td>
      <td>网点资料（门店主数据）</td>
      <td>MktTerminal</td>
      <td>"门店装修等级(从对应的系统词汇表下拉选择)"</td>
      <td>value</td>
      <td>门店属性字段，标识门店当前装修等级</td>
      <td>无</td>
    </tr>
    <tr>
      <td>7</td>
      <td>网点申请单</td>
      <td>MktTerminalApply</td>
      <td>"门店装修等级(从对应的系统词汇表下拉选择)"</td>
      <td>value</td>
      <td>门店申请属性字段</td>
      <td>无</td>
    </tr>
    <tr>
      <td>8</td>
      <td>门店变更</td>
      <td>MktTerminalModify</td>
      <td>"装修等级（变更前）" / "装修等级（变更后）"</td>
      <td>value</td>
      <td>门店变更属性字段</td>
      <td>无</td>
    </tr>
    <tr>
      <td>9</td>
      <td>门头展板报销（旧）</td>
      <td>FinFeeBxHeader</td>
      <td>"门店装修等级(从对应的系统词汇表下拉选择)"</td>
      <td>value</td>
      <td>门店属性字段</td>
      <td>无</td>
    </tr>
    <tr>
      <td>10</td>
      <td>门店装修申请（旧）</td>
      <td>FinFeeApplyHeader</td>
      <td>"门店装修等级" / "本次申请装修等级"</td>
      <td>value</td>
      <td>门店属性 + 本次装修等级</td>
      <td>无</td>
    </tr>
  </table>
</div>

<div class="kl-card alt">
  <div class="kl-card-header">
    <span class="kl-num">2</span>
    <h2 class="kl-card-title">涉及的数据库表字段及存储说明</h2>
  </div>
  <p class="kl-desc"><strong>统一结论：</strong>所有业务表中的 <code>FIXUP_GRADE</code> 字段存储的都是值集的 <strong>value（Long 类型数值）</strong>，不是 meaning。</p>
  <table class="kl-table">
    <tr>
      <th>表名</th>
      <th>字段</th>
      <th>DB 类型</th>
      <th>存储内容</th>
      <th>界面显示名称</th>
      <th>说明</th>
    </tr>
    <tr><td>FIN_FEE_APPLY_FINISHED_HEADER</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>店面装修等级</td></tr>
    <tr><td>FIN_FEE_APPLY_FINISHED_HEADER</td><td>FRONTDOOR_FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门头装修等级</td><td>门头装修等级</td></tr>
    <tr><td>FIN_FEE_APPLY_CHANGE_HEADER</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>店面装修等级</td></tr>
    <tr><td>FIN_FEE_APPLY_CHANGE_HEADER</td><td>FRONTDOOR_FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门头装修等级</td><td>门头装修等级</td></tr>
    <tr><td>FIN_FEE_APPLY_CLOSE</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>店面装修等级</td></tr>
    <tr><td>FIN_FEE_APPLY_CLOSE</td><td>FRONTDOOR_FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门头装修等级</td><td>门头装修等级</td></tr>
    <tr><td>FIN_FEE_CHECK_BX_HEADER</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>本次店面装修等级</td><td>店面装修等级</td></tr>
    <tr><td>FIN_FEE_CHECK_BX_HEADER</td><td>FRONTDOOR_FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>本次门头装修等级</td><td>门头装修等级</td></tr>
    <tr><td>TERMINAL_DECORATE_LINE</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>⭐标准行维度</td></tr>
    <tr><td>MKT_TERMINAL</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>门店属性</td></tr>
    <tr><td>MKT_TERMINAL_APPLY</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>申请属性</td></tr>
    <tr><td>MKT_TERMINAL_MODIFY</td><td>FIXUP_GRADE_H</td><td>NUMBER</td><td>value</td><td>装修等级（变更前）</td><td>变更前值</td></tr>
    <tr><td>MKT_TERMINAL_MODIFY</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>装修等级（变更后）</td><td>变更后值</td></tr>
    <tr><td>FIN_FEE_APPLY_HEADER（旧）</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>店面装修等级</td></tr>
    <tr><td>FIN_FEE_APPLY_HEADER（旧）</td><td>THIS_FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>本次申请装修等级</td><td>本次装修等级</td></tr>
    <tr><td>FIN_FEE_BX_HEADER（旧）</td><td>FIXUP_GRADE</td><td>NUMBER</td><td>value</td><td>门店装修等级</td><td>店面装修等级</td></tr>
  </table>
</div>

</div>
</div>

<!-- ============== TAB 3：涉及详细逻辑 ============== -->
<div id="vs-detail" class="vs-tab-content" style="display:none;">
<div class="dlm-wrap">

<div class="dlm-card">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">1</span>
    门店装修申请与进度更新 — <strong>FinFeeApplyFinishedHeader</strong>
  </div>
  <div class="dlm-mod-sub">⭐ 核心菜单 · 字段："门店装修等级"（fixupGrade）、"门头装修等级"（frontdoorFixupGrade）</div>

  <div class="dlm-sub-title">1.1 提交校验</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeApplyFinishedHeaderServiceImpl.java:629-649</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">业务用途：确保该门店的装修等级在系统中有对应的补贴政策标准，否则无法提交申请。</p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">使用：value（fixupGrade 存储的数值直接用于匹配 TERMINAL_DECORATE_LINE 表）</p>
  <div class="kl-tip" style="margin-top:8px;">
    <strong>逻辑：</strong><br>
    1. fixupGrade 为空或 0 → 抛异常"无政策标准不能提交！"<br>
    2. 用 fixupGrade(value) 查询 TERMINAL_DECORATE_LINE 是否有对应标准行 → 无则抛异常"店面装修等级没有对应的政策标准！"<br>
    3. 用 fixupGrade(value) + 面积 + 日期 + 门店类型 + 事业部ID 精确匹配有效期内的标准行 → 无则抛异常"店面装修等级没有有效期内的政策标准！"
  </div>

  <div class="dlm-sub-title">1.2 匹配装修标准行（doSearchDecorate）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeApplyFinishedHeaderServiceImpl.java:945 / Mapper.xml:1255-1273</code></p>
  <div class="kl-tip" style="margin-top:8px;">
    <strong>匹配条件：</strong><br>
    <code>WHERE fixup_grade = #{fixupGrade}</code> — 装修等级(value)<br>
    AND uper_area &lt; #{thisTerminalArea} — 面积下限<br>
    AND lower_area &gt;= #{thisTerminalArea} — 面积上限<br>
    AND start_date &lt;= #{startDate} — 生效开始<br>
    AND end_date &gt;= #{startDate} — 生效结束<br>
    AND rel.terminal_type_code = #{terminalType} — 门店类型<br>
    AND tds.HZ_APPROVE_STATUS = 'APPROVED' — 标准已审批<br>
    AND tds.division_id = #{divisionId} — 事业部
  </div>
  <div class="kl-warn">关键：fixupGrade 的 value 是匹配 TERMINAL_DECORATE_LINE 的必要条件，直接决定补贴标准金额。</div>

  <div class="dlm-sub-title">1.3 OA 推送（装修等级翻译输出）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeApplyFinishedHeaderServiceImpl.java:817-818</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">fixupGrade(value) → <code>lovService.getMeaning("AE.FIXUP_GRADE", value)</code> → 中文含义 → 推送给 OA</p>

  <div class="dlm-sub-title">1.4 OA 回写（装修等级反向翻译）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeApplyFinishedHeaderServiceImpl.java:742-747</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">OA JSON 字段 "Decoration_grade"(meaning) → <code>lovService.getValue("AE.FIXUP_GRADE", meaning)</code> → value(Long) → 存入 fixupGrade</p>

  <div class="dlm-sub-title">1.5 打印数据翻译</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeApplyFinishedHeaderServiceImpl.java:364-378</code></p>
  <ul style="font-size:13px;color:#374151;">
    <li>fixupGrade(value) → <code>lovService.getMeaning()</code> → fixupGradeMeaning(meaning) → 打印展示</li>
    <li>frontdoorFixupGrade(value) → <code>lovService.getValue()</code> → frontdoorFixupGradeMeaning → 打印展示</li>
  </ul>
  <div class="kl-err">⚠️ 注意：门头用 getValue 而非 getMeaning，疑似 frontdoorFixupGrade 存储的可能是 meaning 而非 value，或者此处代码有误。</div>

  <div class="dlm-sub-title">1.6 补贴明细构建</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeApplyFinishedHeaderVO.java:439-488</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">value + meaning 同时传入 SubsidyDetailVO，用于打印时展示。</p>
</div>

<div class="dlm-card alt">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">2</span>
    门店验收与报销单 — <strong>FinFeeCheckBxHeader</strong>
  </div>
  <div class="dlm-mod-sub">⭐ 核心菜单 · 字段："本次店面装修等级"（fixupGrade）、"本次门头装修等级"（frontdoorFixupGrade）</div>

  <div class="dlm-sub-title">2.1 匹配装修标准行（doSearchDecorate）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeCheckBxHeaderServiceImpl.java:205-212</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">fixupGrade(value) + 面积 + 日期 + 门店类型 + 事业部ID → 匹配标准行 → 用于报销金额计算。</p>

  <div class="dlm-sub-title">2.2 报销打印翻译</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeCheckBxHeaderServiceImpl.java:404</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">fixupGrade(value) → <code>lovService.getMeaning()</code> → fixupGradeName(meaning) → 打印展示。</p>

  <div class="dlm-sub-title">2.3 报销导出查询 SQL 翻译</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>FinFeeCheckBxHeaderMapper.xml:1070-1071</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">value → <code>GET_DIV_DICT_NAME</code> 函数 → meaning</p>
</div>

<div class="dlm-card">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">3</span>
    门店装修标准设置 — <strong>TerminalDecorateStandard + TerminalDecorateLine</strong>
  </div>
  <div class="dlm-mod-sub">⭐ 核心菜单 · 字段："门店装修等级"（标准行明细中的维度字段）</div>

  <div class="dlm-sub-title">3.1 标准行定义</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">定义不同装修等级 + 不同面积范围对应的补贴标准（额度内/额度外单价），是整个补贴体系的基础配置表。</p>
  <div class="kl-tip">
    <strong>TERMINAL_DECORATE_LINE 表结构（与 fixupGrade 相关）：</strong><br>
    - FIXUP_GRADE: 装修等级(value) — 维度字段<br>
    - DECORATE_PROJECT: 装修项目<br>
    - UPER_AREA / LOWER_AREA: 面积范围<br>
    - IN_STANDARD: 额度内标准(元/m²) — 匹配后用于计算额度内补贴金额<br>
    - OUT_STANDARD: 额度外标准(元/m²) — 匹配后用于计算额度外补贴金额<br>
    - START_DATE / END_DATE: 有效期
  </div>

  <div class="dlm-sub-title">3.2 按装修等级查询标准行</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">位置：<code>TerminalDecorateStandardMapper.xml:44-50</code></p>
  <p style="font-size:13px;color:#374151;line-height:1.7;">value（fixupGrade 数值直接匹配）</p>
</div>

<div class="dlm-card alt">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">4</span>
    门店装修申请变更 — <strong>FinFeeApplyChangeHeader</strong>
  </div>
  <div class="dlm-mod-sub">字段："门店装修等级"（从原申请单带入）、"门头装修等级"（从原申请单带入）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">变更单中的装修等级用于记录变更后的值，审批通过后回写到原申请单。</p>
  <div class="kl-err">⚠️ 疑似 BUG：第 173 行 <code>lovService.getMeaning("AE.FIXUP_GRADE", item.getSubsidyType())</code> 应为 <code>item.getFixupGrade()</code> 而非 <code>item.getSubsidyType()</code></div>
</div>

<div class="dlm-card">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">5</span>
    门店装修申请关闭 — <strong>FinFeeApplyClose</strong>
  </div>
  <div class="dlm-mod-sub">字段："门店装修等级"（不可编辑）、"门头装修等级"（不可编辑）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">关闭单中的装修等级仅用于展示原申请单的信息，不参与任何计算逻辑。无翻译逻辑。</p>
</div>

<div class="dlm-card alt">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">6</span>
    网点资料 / 门店主数据 — <strong>MktTerminal</strong>
  </div>
  <div class="dlm-mod-sub">字段："门店装修等级"（下拉选择）</div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">标识门店当前的装修等级，作为门店基础属性。创建装修申请单时从此带入。使用 <code>@LovValue</code> 注解自动翻译。</p>
</div>

<div class="dlm-card">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">7</span>
    网点申请单 — <strong>MktTerminalApply</strong>
  </div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">新建门店申请时选择装修等级，审批通过后写入 MktTerminal。无 @LovValue 注解，需前端自行翻译展示。</p>
</div>

<div class="dlm-card alt">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">8</span>
    门店变更 — <strong>MktTerminalModify</strong>
  </div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">记录门店装修等级的变更前后对比，审批通过后将变更后的值写入 MktTerminal。</p>
</div>

<div class="dlm-card">
  <div class="dlm-mod-header">
    <span class="dlm-mod-num">9~10</span>
    旧版菜单（FinFeeBxHeader / FinFeeApplyHeader）
  </div>
  <p style="font-size:13px;color:#374151;line-height:1.7;">旧版菜单中的装修等级字段，仅供历史数据展示。存储 value，无 @LovValue 注解。</p>
</div>

</div>
</div>

<!-- ============== TAB 4：值集翻译方式汇总 ============== -->
<div id="vs-translate" class="vs-tab-content" style="display:none;">
<div class="kl-wrap">

<div class="kl-card">
  <div class="kl-card-header">
    <span class="kl-num">1</span>
    <h2 class="kl-card-title">Java 层翻译</h2>
  </div>
  <table class="kl-table">
    <tr>
      <th>翻译方式</th>
      <th>代码</th>
      <th>方向</th>
      <th>使用场景</th>
      <th>入参/返回</th>
    </tr>
    <tr>
      <td>标准翻译</td>
      <td><code>lovService.getMeaning("AE.FIXUP_GRADE", value)</code></td>
      <td>value→meaning</td>
      <td>打印/展示时将数值翻译为中文</td>
      <td>入参 value，返回 meaning</td>
    </tr>
    <tr>
      <td>反向翻译</td>
      <td><code>lovService.getValue("AE.FIXUP_GRADE", meaning)</code></td>
      <td>meaning→value</td>
      <td>OA 回写时将中文反查为数值</td>
      <td>入参 meaning，返回 value</td>
    </tr>
    <tr>
      <td>注解翻译</td>
      <td><code>@LovValue(lovCode="AE.FIXUP_GRADE", meaningField="fixupGradeMeaning")</code></td>
      <td>value→meaning</td>
      <td>VO 返回前端时自动翻译</td>
      <td>自动将 value 翻译为 meaning</td>
    </tr>
    <tr>
      <td>⚠️反常用法</td>
      <td><code>lovService.getValue("AE.FIXUP_GRADE", frontdoorFixupGrade)</code></td>
      <td>meaning→value?</td>
      <td>门头装修等级翻译</td>
      <td>入参疑似 meaning，返回 value</td>
    </tr>
  </table>
</div>

<div class="kl-card alt">
  <div class="kl-card-header">
    <span class="kl-num">2</span>
    <h2 class="kl-card-title">SQL 层翻译</h2>
  </div>
  <table class="kl-table">
    <tr>
      <th>翻译方式</th>
      <th>SQL</th>
      <th>使用场景</th>
      <th>入参/返回</th>
    </tr>
    <tr>
      <td>JOIN 翻译</td>
      <td><code>left join HPFM_LOV_VALUE hlv on hlv.LOV_CODE='AE.FIXUP_GRADE' and hlv.value=to_char(afh.fixup_grade) and hlv.tag LIKE concat('%',concat(afh.organization_id,'%'))</code></td>
      <td>导出/报表查询</td>
      <td>用 value 匹配，返回 meaning</td>
    </tr>
    <tr>
      <td>函数翻译</td>
      <td><code>GET_DIV_DICT_NAME('AE.FIXUP_GRADE', to_char(cbh.fixup_grade), cbh.organization_id)</code></td>
      <td>导出/报表查询</td>
      <td>用 value 匹配，返回 meaning</td>
    </tr>
  </table>
</div>

<div class="kl-card">
  <div class="kl-card-header">
    <span class="kl-num">3</span>
    <h2 class="kl-card-title">SQL 中涉及的具体位置</h2>
  </div>
  <table class="kl-table">
    <tr>
      <th>Mapper XML</th>
      <th>行号</th>
      <th>翻译方式</th>
      <th>翻译字段</th>
      <th>入参</th>
      <th>返回</th>
    </tr>
    <tr>
      <td>FinFeeApplyFinishedHeaderMapper.xml</td>
      <td>1129</td>
      <td>JOIN HPFM_LOV_VALUE</td>
      <td>fixup_grade</td>
      <td>value</td>
      <td>meaning</td>
    </tr>
    <tr>
      <td>FinFeeApplyFinishedHeaderMapper.xml</td>
      <td>1132</td>
      <td>JOIN HPFM_LOV_VALUE</td>
      <td>frontdoor_fixup_grade</td>
      <td>value</td>
      <td>meaning</td>
    </tr>
    <tr>
      <td>FinFeeCheckBxHeaderMapper.xml</td>
      <td>1070</td>
      <td>GET_DIV_DICT_NAME</td>
      <td>frontdoor_fixup_grade</td>
      <td>value</td>
      <td>meaning</td>
    </tr>
    <tr>
      <td>FinFeeCheckBxHeaderMapper.xml</td>
      <td>1071</td>
      <td>GET_DIV_DICT_NAME</td>
      <td>fixup_grade</td>
      <td>value</td>
      <td>meaning</td>
    </tr>
  </table>
</div>

<div class="kl-card alt">
  <div class="kl-card-header">
    <span class="kl-num">4</span>
    <h2 class="kl-card-title">标准行匹配 SQL（不涉及翻译，直接用 value 匹配）</h2>
  </div>
  <table class="kl-table">
    <tr>
      <th>Mapper XML</th>
      <th>行号</th>
      <th>匹配逻辑</th>
    </tr>
    <tr>
      <td>FinFeeApplyFinishedHeaderMapper.xml</td>
      <td>1262</td>
      <td><code>WHERE fixup_grade = #{fixupGrade}</code></td>
    </tr>
    <tr>
      <td>FinFeeCheckBxHeaderMapper.xml</td>
      <td>809</td>
      <td><code>WHERE fixup_grade = #{fixupGrade}</code></td>
    </tr>
    <tr>
      <td>FinFeeCheckBxHeaderMapper.xml</td>
      <td>824</td>
      <td><code>WHERE FIXUP_GRADE = #{fixupGrade}</code></td>
    </tr>
    <tr>
      <td>TerminalDecorateStandardMapper.xml</td>
      <td>49</td>
      <td><code>AND line.FIXUP_GRADE = #{fixupGrade}</code></td>
    </tr>
  </table>
</div>

</div>
</div>

<!-- JS 切换逻辑 -->
<script>
function switchVsTab(tabId, el) {
  // 隐藏所有 tab 内容
  document.querySelectorAll('.vs-tab-content').forEach(function(el) {
    el.style.display = 'none';
  });
  // 显示当前 tab
  document.getElementById('vs-' + tabId).style.display = 'block';
  // 更新按钮状态
  document.querySelectorAll('.vs-tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  el.classList.add('active');
}
</script>

<style>
/* ===== 自定义 TAB 栏（值集配置专用） ===== */
.vs-tabs-bar {
  position: sticky;
  top: 56px;
  z-index: 100;
  background: #FFFFFF;
  border-bottom: none;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.vs-tabs-inner {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.vs-tabs-inner::-webkit-scrollbar { display: none; }
.vs-tab-btn {
  padding: 12px 22px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  height: 44px;
  line-height: 1;
}
.vs-tab-btn:hover {
  color: #7C3AED;
  background: rgba(124,58,237,0.06);
}
.vs-tab-btn.active {
  color: #7C3AED;
  font-weight: 700;
  border-bottom-color: #7C3AED;
  background: rgba(124,58,237,0.08);
}
.vs-tab-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
