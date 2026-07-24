<KbHero num="UI" title="知识库 UI 组件库 · 实时演示" desc="从 custom.css 设计系统提炼的 Vue 3 通用组件,统一紫色 #7C3AED 风格。以下均为实际渲染效果。" />

<KbCard num="1" title="基础展示 · 卡片 KbCard">
<KbSubTitle>普通卡片 / alt 强调变体</KbSubTitle>

<KbCard title="无编号卡片">不带 num 的简洁卡片。</KbCard>

<KbCard num="2" title="强调卡片" alt>带 num 与浅紫渐变左边线的强调卡片。</KbCard>
</KbCard>

<KbCard num="2" title="徽章 / 标签 KbBadge">
<KbBadge type="purple">进行中</KbBadge>
<KbBadge type="red">已驳回</KbBadge>
<KbBadge type="orange">待补充</KbBadge>
<KbBadge type="green">已通过</KbBadge>
<KbBadge type="yellow">待确认</KbBadge>
</KbCard>

<KbCard num="3" title="提示与引用">
<KbTip>这是橙色实操提示,用于操作步骤或注意事项。</KbTip>
<KbWarn>这是红色警告,用于禁止项或易错点。</KbWarn>
<KbFormula label="计算公式">应扣金额 = 实付金额 − 已核销金额</KbFormula>
<KbQuote>这是紫色左边线引用块,用于补充说明或引用来源。</KbQuote>
<KbHighlight>这是行内高亮文字</KbHighlight>,可与普通文字混排。
</KbCard>

<KbCard num="4" title="列表 KbList">
<KbSubTitle>有序列表</KbSubTitle>
<KbList :items="['资料齐全','系统初核','人工复核','主管审批']" />

<KbSubTitle>无序号列表 plain</KbSubTitle>
<KbList :items="['仅展示要点','不显示序号']" plain />
</KbCard>

<KbCard num="5" title="表格 KbTable">
<KbTable
  :columns="[{key:'step',label:'环节'},{key:'owner',label:'负责方'},{key:'sys',label:'系统支持'}]"
  :rows="[
    {step:'初核',owner:'系统',sys:'自动'},
    {step:'复核',owner:'业务员',sys:'人工'},
    {step:'审批',owner:'主管',sys:'人工'}
  ]" />
</KbCard>

<KbCard num="6" title="标题组件">
<KbSubTitle>紫色左边线小标题 KbSubTitle</KbSubTitle>
普通段落文字示例,用于补充说明。

<KbSectionTitle>章节大标题 KbSectionTitle(在知识库页面内被隐藏,仅在其他场景生效)</KbSectionTitle>
</KbCard>

<KbCard num="7" title="水平步骤 KbSteps">
<KbSteps :steps="[
  {title:'申请',desc:'发起核销单'},
  {title:'初核',desc:'系统自动校验'},
  {title:'复核',desc:'业务员核对'},
  {title:'审批',desc:'主管通过'}
]" />
</KbCard>

<KbCard num="8" title="竖向时间轴 KbTimeline">
<KbTimeline :items="[
  {date:'2024-01',title:'模块上线',desc:'首批城市试点'},
  {date:'2024-03',title:'全国推广',desc:'覆盖所有门店'},
  {date:'2024-06',title:'流程优化',desc:'引入自动核验'}
]" />
</KbCard>

<KbCard num="9" title="状态机流转 KbFlow">
<KbFlow :nodes="[
  {label:'新建',type:'new'},
  {label:'审核中',type:'run'},
  {label:'通过',type:'approved'},
  {label:'驳回',type:'rejected'},
  {label:'任意',type:'any'}
]" />
</KbCard>

<KbCard num="10" title="业务介绍大卡 KbHero">
<KbHero num="03" title="家装真实性核销" desc="家装订单真实性核验业务说明,此处为嵌套 Hero 示例(实际页面通常页头仅一个)。" />
</KbCard>

<KbCard num="11" title="角色卡 KbRoleCard">
<KbSubTitle>多角色并排(可配合网格布局)</KbSubTitle>
<KbRoleCard badge="业" title="业务员" desc="发起与跟进核销单" color="purple"></KbRoleCard>
<KbRoleCard badge="主" title="主管" desc="审批与异常处理" color="blue"></KbRoleCard>
<KbRoleCard badge="财" title="财务" desc="金额核销与对账" color="green"></KbRoleCard>
</KbCard>

<KbCard num="12" title="两栏对比 KbTwoCol">
<KbTwoCol
  left-title="通过情形"
  right-title="不通过情形"
  left="资料齐全且金额一致"
  right="单据缺失或金额不符"
  left-type="pass"
  right-type="cancel" />
</KbCard>

<KbCard num="13" title="分段切换 Tab KbBreadcrumbTabs">
<KbBreadcrumbTabs :tabs="[
  {id:'seg-a',label:'第一段',icon:'fa-solid fa-star'},
  {id:'seg-b',label:'第二段',icon:'fa-solid fa-list'},
  {id:'seg-c',label:'第三段',icon:'fa-solid fa-circle-question'}
]" mode="free" />
<KbSubTitle>说明</KbSubTitle>
mode="free" 时仅 emit 事件;设为 "section" 会自动按 tab.id 切换页面中对应 section(id 同名)元素的可见性。
</KbCard>
