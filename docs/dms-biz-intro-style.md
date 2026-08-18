# DMS 知识库 — 业务介绍（biz-intro）样式规范

> 基于「家装管理 → 项目往来 → 家装真实性核销 → 业务介绍」提炼总结。
> 本文档为所有菜单页【业务介绍】TAB 内容绘制的统一 UI 规范。

---

## 一、整体容器结构（强制标准）

每个菜单页的 `index.md` 中，业务介绍内容必须包裹在 `biz-intro` 区块内，结构固定为：

```html
<BreadcrumbTabs />

<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
  <!-- 一个或多个 kl-card 卡片，见 §三 -->
  <div class="kl-card"> ... </div>
  <div class="kl-card"> ... </div>
</div>
</div>
</div>

<div id="biz-flow" style="display:none;"> ...业务流程图区块，见 dms-style.md... </div>
<div id="key-logic" style="display:none;"> ... </div>
```

| 层级 | 元素 | 说明 |
|------|------|------|
| 1 | `<div id="biz-intro" style="display:none;">` | 业务介绍 Tab 容器 |
| 2 | `<div class="tab-pad">` | 内容内边距（padding:24px 10%） |
| 3 | `<div class="kl-wrap">` | 卡片网格容器 |
| 4 | `<div class="kl-card">` × N | 每个独立主题一个卡片 |

> **🔴 强制标准**：业务介绍一律走 `biz-intro → tab-pad → kl-wrap → kl-card`，禁止把内容散落在 `biz-intro` 之外，禁止用裸 `KbCard` 平铺代替，**不使用 `KbHero` / `biz-hero` 横幅头部**。

---

## 二、页面头部（不使用 hero 横幅）

**不使用 `.biz-hero` / `<KbHero>` 模块**。业务介绍区顶部不再放置大横幅头部（`class="biz-hero"` 及 `<KbHero>` 组件均废弃），内容直接从 `kl-wrap` 下的 `kl-card` 开始：

```html
<div id="biz-intro" style="display:none;">
<div class="tab-pad">
<div class="kl-wrap">
  <div class="kl-card"> ...第一个业务卡片，无需 hero 头部... </div>
</div>
</div>
</div>
```

> 说明：`biz-hero` / `KbHero` 是页面级大横幅，本项目不再使用。菜单定位交由页面标题/Breadcrumb 承担，业务介绍一律以 `kl-card` 直接开场。

## 三、内容卡片（kl-card）与标题头（biz-kl-hdr）

每个主题用一个 `kl-card`，卡片内部以 `biz-kl-hdr` 作为**居中标题头**（标签 + 主标题 + 一句话副标题）：

```html
<div class="kl-card">
  <div class="biz-kl-hdr">
    <span class="biz-tag" style="background:rgba(124,58,237,0.08);color:#7C3AED;border-color:rgba(124,58,237,0.18);"> 背景与动机</span>
    <h2>为何要做真实性核销</h2>
    <p>防止跨渠道套利，保障集团利润空间与市场稳定</p>
  </div>
  <div class="biz-3col"> ... </div>
</div>
```

### 3.1 biz-kl-hdr 组成

| 元素 | 类/标签 | 说明 | 样式要点 |
|------|---------|------|---------|
| 标签 | `span.biz-tag` | 主题分类（背景/定义/流程/审核/违规/考核…） | 圆角胶囊 `border-radius:20px`，紫色 `#7C3AED` 为主色；违规类用红 `#DC2626` |
| 主标题 | `h2` | 卡片主题名（"为何要做""本质&具体做什么"…） | `font-size:1.3rem; font-weight:700; color:#1E293B` |
| 副标题 | `p` | 一句话概括 | `font-size:0.83rem; color:#6B7280` |

### 3.2 biz-tag 语义色

| 语义 | 背景 | 文字 | 边框 |
|------|------|------|------|
| 通用（背景/定义/流程/审核/考核） | `rgba(124,58,237,0.08)` | `#7C3AED` | `rgba(124,58,237,0.18)` |
| 违规 / 负激励 | `rgba(239,68,68,0.08)` | `#DC2626` | `rgba(239,68,68,0.18)` |

---

## 四、内容布局组件库（复用样式类）

以下组件均在 `custom.css` / `KbLayout.vue` 中定义，可直接在 `kl-card` 内使用。

### 4.1 三列卡片 `.biz-3col`（并列要点）

```html
<div class="biz-3col">
  <div class="kl-col-box" style="margin-bottom:0;">
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#7C3AED,#A78BFA);"><svg width="16" height="16" ...>图标</svg></div>
      <div>
        <h5 style="font-size:0.88rem;font-weight:800;color:#1F2937;margin:0 0 6px;">要点标题</h5>
        <p style="font-size:0.73rem;color:#6B7280;margin:0;line-height:1.6;">要点描述。</p>
      </div>
    </div>
  </div>
  <!-- 第2、3 个 kl-col-box，可交替 .alt 背景 -->
</div>
```

- 网格：`display:grid; grid-template-columns:repeat(3,1fr); gap:16px`。
- 图标：36×36 圆角方块 + 线性 SVG（白描边 1.5），渐变色区分要点。
- 交替背景：`kl-col-box` 可加 `.alt` 类（交替浅色底）。

### 4.2 两列内联卡片 `.biz-2col-inner`（本质 / 对比）

```html
<div class="biz-2col-inner">
  <div class="kl-col-box">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
      <div style="width:40px;height:40px;border-radius:10px;...渐变圆角方块图标"></div>
      <h4 style="font-size:1rem;font-weight:800;color:#1F2937;margin:0;">核销本质</h4>
    </div>
    <p style="font-size:0.78rem;font-weight:600;color:#6B7280;margin:0 0 10px;">三个"对应"</p>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#F5F3FF;border-radius:8px;">
        <div style="font-size:.75rem;"><strong>对应的渠道</strong> — 在正确的渠道下单</div>
      </div>
      <!-- 更多条目 -->
    </div>
  </div>
  <div class="kl-col-box alt"> ... </div>
</div>
```

- 网格：`1fr 1fr`；子条目用浅色圆角块（`#F5F3FF` 紫 / `#F0FDF4` 绿 / `#EDE9FE`），可加边框 `border:1px solid`。
- 小标题 `h4` 统一紫 `#7C3AED`。

### 4.3 水平步骤流程 `.biz-steps`（全流程/链路）

```html
<div class="biz-steps">
  <div class="biz-step-item">
    <div class="biz-step-circle" style="background:linear-gradient(135deg,#7C3AED,#6D28D9);"><svg width="16" height="16" ...>图标</svg></div>
    <h5>自动抬价</h5>
    <small>集团出库，符合条件<br>订单自动抬价</small>
  </div>
  <div class="biz-step-arrow">&rarr;</div>
  <div class="biz-step-item"> ... </div>
  ...
</div>
```

- 圆：44×44 圆形 + 渐变背景 + 白色线性图标，`margin-bottom:10px`。
- 步骤名 `h5`（0.85rem 深灰），说明 `small`（0.75rem 灰）。
- 箭头 `&rarr;` 连接；`min-width:140px; flex:1` 自动等宽。
- 步数建议 3~5 个，步数多则自动横向滚动。

### 4.4 竖向时间轴 `.biz-tl`（政策演进 / 历史）

```html
<div class="biz-tl">
  <div class="biz-tl-item">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
      <div style="width:28px;height:28px;border-radius:8px;background:#EDE9FE;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="14" height="14" ...>图标</svg></div>
      <span class="biz-tl-date">2023-06-28 · 奠基通知</span>
    </div>
    <h6>发布《...通知》</h6>
    <p>要点说明...</p>
  </div>
  ...
</div>
```

- 左侧竖线 + 圆点（紫 `#7C3AED`）；日期 `biz-tl-date`（0.75rem 紫加粗）。
- 事件标题 `h6`（0.88rem 深灰），描述 `p`（0.8rem 灰）。
- 事件图标 28×28 圆角块，色块语义化（紫/绿/黄/红）。

### 4.5 角色卡 `.biz-roles` / `.biz-role`（谁在做）

```html
<div class="biz-roles">
  <div class="biz-role purple"><strong>财务人员</strong> — 主管部门：财务部 · 负责全流程审核</div>
  <div class="biz-role blue"><strong>经销商</strong> — 上传发票与核销资料</div>
</div>
```

- 网格 `1fr 1fr`；角色卡左侧 `border-left:3px solid`，色系 `.blue/#3B82F6`、`.purple/#7C3AED`、`.orange/#F97316`。

### 4.6 强调公式条 `.biz-formula`（核心计算/规则）

```html
<div class="biz-formula">
  <div class="biz-formula-label">抬价金额计算</div>
  抬价单价 × 出库数量 = 多扣客户的余额
</div>
```

- 深色底 `#1E293B`，浅蓝标签 `#93C5FD`，等宽字体。

### 4.7 提示条 `.kl-tip` / 徽标 `.kl-badge`（原则/结论）

```html
<div class="kl-tip" style="margin-top:14px;">
  <strong>审核原则：</strong>所有核销资料必须满足对应最低真实性标准...
</div>
```

- `kl-badge` 用于表格列内标签，支持 `.red/.orange/.green/.yellow` 变体。

### 4.8 表格 `.kl-table`（标准/明细）

```html
<div style="overflow-x:auto;border-radius:12px;border:1px solid #E8ECF0;background:#fff;">
  <table class="kl-table" style="margin:0;width:100%;border-collapse:collapse;">
    <thead><tr style="background:#F5F3FF;">...</tr></thead>
    <tbody>...</tbody>
  </table>
</div>
```

- 表头浅紫底 `#F5F3FF`，加粗；单元格 `0.73rem`；行列分隔线 `#E8ECF0`。
- 表格外包裹圆角+边框容器。

---

## 五、图标规范（线性 SVG，白色）

所有要点/步骤图标统一为 **16×16 viewBox 线性 SVG，`stroke="white" stroke-width="1.5"`**，置于渐变圆角方块内。常用主题图标：

| 主题 | 图标路径要点 |
|------|-------------|
| 概览/看板 | 折线上升 `M2 12L6 8L10 10L14 4` |
| 流转/归档 | 文件 `rect + 线条` |
| 安全/核销 | 盾牌 `M8 2L3 4V8C3 11 8 14 8 14C...` |
| 资金/余额 | 币/圆 `circle cx=8 cy=8` |
| 合规/清单 | 勾选矩形 `rect + 对勾` |
| 时间/历史 | 钟表 / 播放 |

图标块尺寸规范：要点 36×36、列头 40×40、步骤圆 44×44、事件 28×28。

---

## 六、卡片内容组织建议（按业务域量级）

### 6.1 业务域级大页（如家装真实性核销）——多卡片叙事

按"为何做 → 做什么 → 怎么做 → 谁做 → 依据 → 红线 → 演进"组织：

| 序号 | 卡片 | biz-tag | 内容组件 |
|------|------|---------|---------|
| 一 | 为何要做 | 背景与动机 | `biz-3col` 并列痛点 |
| 二 | 本质 & 具体做什么 | 定义 | `biz-2col-inner` 本质 vs 具体 |
| 三 | 全流程 | 流程 | `biz-steps` 水平步骤 |
| 四 | 谁在核、核什么 | 审核人与附件 | 角色卡 + `biz-4col`/网格附件 |
| 五 | 审核最低标准 | 审核标准 | `kl-table` 表格 + `kl-tip` |
| 六 | 违规与红线 | 违规 | 红边卡 + 负激励强调 |
| 七 | 考核演进 | 考核 | `biz-tl` 时间轴 |

### 6.2 单功能页（绝大多数菜单）——精简模板

一个菜单页通常只承载一张单据/一个查询，业务介绍建议 **1~3 个卡片**：

| 场景 | 卡片 | biz-tag | 建议内容 |
|------|------|---------|---------|
| 单据类（要货订单/报销单/申请单） | 业务是什么 | 定义 | `biz-2col-inner` 或 `biz-3col` 讲清单据边界 |
| | 谁在使用/流程 | 流程 | `biz-steps` 3~4 步 |
| | 关键规则 | 规则 | `kl-table` / `kl-tip` |
| 查询/报表类 | 查什么 | 定义 | `biz-3col` 讲清数据口径 |
| | 怎么用 | 使用 | `biz-steps` 或要点列表 |
| 配置/基础数据类 | 维护什么 | 定义 | `biz-2col-inner` 字段分组 |
| | 影响范围 | 影响 | `biz-3col` 下游引用方 |

> 核心原则：**业务介绍讲"是什么、为什么、怎么流转"，业务流程图（biz-flow）讲"跨系统链路"，重点逻辑（key-logic）讲"表单细节"。三者不重复。**

---

## 七、书写风格铁律

1. **先讲业务动机，再讲机制**：任何单据先一句话讲清"为什么存在"（防套利/控风险/提效率），再讲具体做什么。
2. **面向读者**：语言面向业务人员与实施顾问，用业务术语，少用纯开发字段名。
3. **图文结合**：要点用图标卡，流程用步骤条，标准用表格，演进用时间轴。
4. **克制篇幅**：单功能页卡片 ≤3，正文点到为止，细节交底给「重点逻辑」。
5. **数据准确**：比例、金额、时限等写具体数值（如 85%、¥10,000、120 天），不写"较高/较短"。
6. **层次清晰**：标题用 `biz-kl-hdr`（标签+h2+副标题），正文用 `h4/h5` 小标题，禁用裸大段 `<p>`。

---

## 八、构建校验（硬性检查）

每个 `biz-intro` 块必须通过：

- [ ] `biz-intro → tab-pad → kl-wrap` 三层嵌套存在，`kl-card` 全部在 `kl-wrap` 内。
- [ ] 所有 `<div>` 开闭平衡（含内联 style 里的 div）。
- [ ] SVG 图标 `<svg>` 内部无空行；整块无裸 `<`（除合法标签）。
- [ ] `biz-tag` 语义色正确（违规类用红）。
- [ ] 表格均用 `.kl-table` 且外层包裹圆角容器。
- [ ] 不新增未定义的 CSS 类（只用本文档列出的类）。
- [ ] 不修改 `biz-flow` / `key-logic` 等其它区块与 frontmatter。
