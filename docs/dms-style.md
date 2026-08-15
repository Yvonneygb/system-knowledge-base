# DMS 知识库 — 业务流程图（biz-flow）样式规范

> 基于「家装管理 → 项目往来 → 家装真实性核销 → 真实性核销主流程」总结提炼。
> 本文档为所有菜单页业务流程图绘制的统一 UI 规范。

---

## 一、整体容器结构

```html
<div class="tab-pad">
  <div class="bf-truth-flow">
    <h4 class="bf-main-title">【主流程名称】</h4>
    <p class="bf-main-sub">【一句话流程摘要，如：前置报备 → 抬价判断 → 双分支处理】</p>
    <div class="bf-fc-svg-wrap">
      <svg class="bf-fc-svg" viewBox="0 0 [总宽度] [总高度]" xmlns="http://www.w3.org/2000/svg">
        <!-- 流程图 SVG 内容 -->
      </svg>
    </div>
    <div class="bf-fc-legend">
      <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
      <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
      <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
      <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
    </div>
  </div>
</div>
```

### 容器 CSS

| 类名 | 用途 | 关键样式 |
|------|------|---------|
| `.tab-pad` | Tab 内容区 | `padding:24px 10%; margin-top:32px; margin-bottom:32px` |
| `.bf-truth-flow` | 流程图最外层容器 | `background:#FAF5FF; border:1px solid #EDE9FE; border-radius:12px; padding:24px 20px 20px` |
| `.bf-main-title` | 主标题 | `font-size:18px; font-weight:700; color:#4C1D95` |
| `.bf-main-sub` | 副标题/流程摘要 | `font-size:13px; color:#6D28D9` |
| `.bf-fc-svg-wrap` | SVG 容器 | `background:#FFF; border:1px solid #E5E7EB; border-radius:8px; padding:16px; display:flex; justify-content:center; overflow-x:auto` |
| `.bf-fc-svg` | SVG 标签 | `display:block; width:100%; min-width:720px; max-height:600px` |
| `.bf-fc-legend` | 图例容器 | `display:flex; gap:24px; justify-content:center; margin-top:16px; flex-wrap:wrap` |

---

## 二、SVG 组件规范

### 2.1 开始/结束节点（虚线圆角矩形）

**应用场景**：每个流程图必须有一个"开始"节点和一个"结束"节点。

```xml
<!-- 开始 -->
<rect x="20" y="30" width="80" height="44" rx="6"
      fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="60" y="57" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>

<!-- 结束 -->
<rect x="500" y="540" width="110" height="40" rx="6"
      fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="555" y="565" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
```

| 属性 | 值 | 说明 |
|------|----|------|
| 形状 | `<rect rx="6">` | 圆角矩形，rx=6 保证圆角一致 |
| 填充 | `#FAF5FF` | 浅紫色背景 |
| 描边 | `#9333EA` | 紫色虚线边框 |
| 虚线 | `stroke-dasharray="5,3"` | 5px实线 + 3px空白 |
| 文字颜色 | `#7C3AED` | 紫色文字 |
| 字号 | `font-size="13"` | 13px |
| 字重 | `font-weight="600"` | 半粗体 |

### 2.2 普通流程节点（实线圆角矩形）

**应用场景**：标准操作步骤，如"项目报备"、"订单"、"出库"等。

```xml
<!-- 绿色实线节点 -->
<rect x="130" y="30" width="100" height="44" rx="6"
      fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
<text x="180" y="57" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">项目报备</text>

<!-- 灰色实线节点（非重点分支） -->
<rect x="680" y="375" width="110" height="40" rx="6"
      fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1.5"/>
<text x="735" y="400" text-anchor="middle" fill="#4B5563" font-size="12" font-weight="600">出库</text>
```

| 变体 | 填充 | 描边 | 文字颜色 | 应用场景 |
|------|------|------|---------|---------|
| **绿色（主流程）** | `#F0FDF4` | `#16A34A` / `2px` | `#166534` | 主流程中的正常步骤 |
| **灰色（非重点）** | `#FFFFFF` | `#9CA3AF` / `1.5px` | `#4B5563` | 不符合分支/次要步骤 |

### 2.3 核心高亮节点（实心填充圆角矩形）

**应用场景**：本菜单的核心操作节点，需要最突出的视觉效果。

```xml
<rect x="230" y="440" width="120" height="40" rx="6"
      fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
<text x="290" y="465" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">★真实性核销★</text>
```

| 属性 | 值 | 说明 |
|------|----|------|
| 填充 | `#16A34A` | 绿色实心填充 |
| 描边 | `#15803D` / `2px` | 深绿色边框 |
| 文字颜色 | `#FFFFFF` | 白色文字 |
| 阴影 | `filter="url(#shadow)"` | 增加投影突出层次 |
| 字重 | `font-weight="700"` | 粗体 |

### 2.4 判断/分支节点（菱形）

**应用场景**：流程中的条件判断分支，如"是否符合抬价范围？"。

```xml
<!-- 菱形判断节点 -->
<polygon points="470,125 570,165 470,205 370,165"
         fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="470" y="170" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 订单行是否符合抬价范围？</text>
```

| 属性 | 值 | 说明 |
|------|----|------|
| 形状 | `<polygon>` 四点菱形 | 上下左右四个顶点 |
| 宽高比 | ~100:80 | 菱形宽约100px，高约80px |
| 填充 | `#FAF5FF` | 浅紫色背景 |
| 描边 | `#9333EA` / `1.5px` / 虚线 | 与开始/结束节点风格统一 |
| 文字颜色 | `#7C3AED` | 紫色 |
| 前缀 | `⚖` | 建议加 emoji 前缀增强辨识 |

### 2.5 分支标签（小实心标签）

**应用场景**：菱形分叉后标注"符合 ✓" / "不符合 ✗"。

```xml
<!-- 符合标签 -->
<rect x="155" y="220" width="70" height="30" rx="4"
      fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>
<text x="190" y="240" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">符合 ✓</text>

<!-- 不符合标签 -->
<rect x="695" y="220" width="80" height="30" rx="4"
      fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1"/>
<text x="735" y="240" text-anchor="middle" fill="#6B7280" font-size="11" font-weight="600">不符合 ✗</text>
```

| 变体 | 填充 | 描边 | 文字颜色 | 尺寸 |
|------|------|------|---------|------|
| 符合 ✓ | `#DCFCE7` | `#16A34A` | `#166534` | 70×30 |
| 不符合 ✗ | `#F3F4F6` | `#9CA3AF` | `#6B7280` | 80×30 |

### 2.6 分支虚线外框（分组容器）

**应用场景**：用虚线外框将某个分支内的节点圈在一起，并标注分支名称。

```xml
<!-- 符合分支外框 -->
<rect x="50" y="265" width="460" height="240" rx="8"
      fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="260" y="290" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">符合分支</text>

<!-- 不符合分支外框 -->
<rect x="580" y="265" width="310" height="200" rx="8"
      fill="#F9FAFB" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="6,4"/>
<text x="735" y="290" text-anchor="middle" fill="#6B7280" font-size="12" font-weight="600">不符合分支</text>
```

| 变体 | 填充 | 描边 | 虚线 | 文字颜色 |
|------|------|------|------|---------|
| 符合分支 | `#F0FDF4` | `#16A34A` | `6,4` | `#166534` |
| 不符合分支 | `#F9FAFB` | `#9CA3AF` | `6,4` | `#6B7280` |

---

## 三、连接线与箭头规范

### 3.1 箭头定义（defs）

每个流程图的 `<defs>` 中必须定义以下箭头标记：

```xml
<defs>
  <!-- 绿色箭头（主流程/符合分支） -->
  <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="7" markerHeight="7" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/>
  </marker>
  <!-- 灰色箭头（非重点/不符合分支） -->
  <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="7" markerHeight="7" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF"/>
  </marker>
  <!-- 阴影滤镜（核心高亮节点用） -->
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
  </filter>
</defs>
```

### 3.2 直线连接线

```xml
<!-- 水平连线 -->
<line x1="100" y1="52" x2="130" y2="52" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

<!-- 垂直连线 -->
<line x1="470" y1="74" x2="470" y2="125" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
```

### 3.3 Y 形分叉线（判断节点后）

```xml
<!-- 从判断节点底部向下 → 水平分叉到两个分支 -->
<line x1="470" y1="205" x2="470" y2="235" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<line x1="470" y1="235" x2="210" y2="235" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>
<line x1="470" y1="235" x2="730" y2="235" stroke="#9CA3AF" stroke-width="2" marker-end="url(#arr-gray)"/>
```

### 3.4 连接线铁律：只允许水平和垂直线段

> **所有连接线必须由水平和/或垂直线段组成，禁止使用对角线（斜线）或弯曲弧线。**

#### 3.4.1 基本原则

| 规则 | 说明 |
|------|------|
| **只用 `<line>`** | 所有连线使用 `<line>` 元素，禁止 `<path>` 带曲线或对角线 |
| **只拐直角弯** | 如需改变方向，用多条 `<line>` 拼接成 L 形（一次拐弯）或 ┐ 形（两次拐弯） |
| **禁止斜线** | x1≠x2 且 y1≠y2 的 `<line>` 即为斜线，禁止使用 |
| **禁止弯曲路径** | 禁止 `<path d="M... C...">` 或 `<path d="M... Q...">` 等曲线命令 |

#### 3.4.2 常见连线模式

```xml
<!-- 1. 水平直线（同 y 坐标） -->
<line x1="100" y1="252" x2="130" y2="252" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

<!-- 2. 垂直直线（同 x 坐标） -->
<line x1="700" y1="279" x2="700" y2="315" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

<!-- 3. L 形（先水平后垂直，一次拐弯） -->
<line x1="280" y1="127" x2="310" y2="127" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3"/>
<line x1="310" y1="127" x2="310" y2="252" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>

<!-- 4. ┐ 形（先垂直后水平，一次拐弯） -->
<line x1="850" y1="335" x2="850" y2="279" stroke="#EF4444" stroke-width="1.5"/>
<line x1="850" y1="279" x2="780" y2="279" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>

<!-- 5. ┌ 形（先水平后垂直再水平，两次拐弯，用于绕行场景） -->
<line x1="850" y1="350" x2="890" y2="350" stroke="#EF4444" stroke-width="1.5"/>
<line x1="890" y1="350" x2="890" y2="279" stroke="#EF4444" stroke-width="1.5"/>
<line x1="890" y1="279" x2="780" y2="279" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>
```

#### 3.4.3 错误示例

```xml
<!-- ❌ 斜线（禁止） -->
<line x1="260" y1="127" x2="310" y2="252" .../>

<!-- ❌ 弯曲路径（禁止） -->
<path d="M 445 480 C 445 500, 555 500, 555 540" .../>
```

### 3.5 连接线颜色规则

| 场景 | 颜色 | 箭头 ID |
|------|------|---------|
| 主流程步骤之间 | `#16A34A`（绿色） | `arr-green` |
| 符合分支内部 | `#16A34A`（绿色） | `arr-green` |
| 不符合分支内部 | `#9CA3AF`（灰色） | `arr-gray` |
| 开始→第一个节点 | `#16A34A`（绿色） | `arr-green` |
| 最后节点→结束 | `#16A34A`（绿色） | `arr-green` |

---

## 四、色彩体系

### 4.1 功能色板

| 颜色名称 | Hex | 用途 |
|---------|-----|------|
| **主流程绿** | `#16A34A` / `#F0FDF4` | 主流程节点描边/填充、箭头 |
| **主流程绿-深** | `#166534` | 主流程节点文字 |
| **高亮绿** | `#15803D` / `#16A34A` | 核心高亮节点 |
| **判断紫** | `#9333EA` / `#FAF5FF` | 判断节点、开始/结束节点 |
| **判断紫-深** | `#7C3AED` | 判断节点、开始/结束文字 |
| **非重点灰** | `#9CA3AF` / `#F9FAFB` | 不符合分支 |
| **非重点灰-深** | `#6B7280` / `#4B5563` | 不符合分支文字 |

### 4.2 语义映射

| 语义 | 填充色 | 描边色 | 文字色 | 线条风格 |
|------|--------|--------|--------|---------|
| 开始/结束 | `#FAF5FF` | `#9333EA` | `#7C3AED` | 虚线 `5,3` |
| 判断/分支 | `#FAF5FF` | `#9333EA` | `#7C3AED` | 虚线 `5,3` |
| 主流程步骤 | `#F0FDF4` | `#16A34A` | `#166534` | 实线 `2px` |
| 核心操作 | `#16A34A` | `#15803D` | `#FFFFFF` | 实线 + 阴影 |
| 次要步骤 | `#FFFFFF` | `#9CA3AF` | `#4B5563` | 实线 `1.5px` |
| 符合分支容器 | `#F0FDF4` | `#16A34A` | `#166534` | 虚线 `6,4` |
| 不符合分支容器 | `#F9FAFB` | `#9CA3AF` | `#6B7280` | 虚线 `6,4` |

---

## 五、布局规范

### 5.1 SVG 坐标系统

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| viewBox 宽度 | 根据内容，通常 900~1200 | 确保所有节点可见 |
| viewBox 高度 | 根据内容，通常 500~800 | 上下留白 |
| 节点间距（水平） | 30~40px | 两个相邻节点之间的间隔 |
| 节点间距（垂直） | **25~30px** | 相邻节点之间必须留出足够空隙，确保连接线和箭头清晰可见；不宜小于 20px，否则在密集分支处箭头会被遮挡 |
| 行高 | 40~50px | 不同行之间的间距 |

> **纵向间距原则**：主流程的纵向链（如 审批→后续步骤→结束）节点间距控制在 **25~30px**，保证连接线与箭头清晰可见。上下游横带与主流程之间的连接线间隙保持 35~40px 即可（示例：上游带底→开始 35px，结束→下游带 40px）。过紧会导致分支箭头被节点遮挡。

### 5.2 节点尺寸规范

| 节点类型 | 宽度 | 高度 | 圆角 |
|---------|------|------|------|
| 开始/结束 | 80~110px | 40~44px | rx=6 |
| 普通步骤 | 100~120px | 40~44px | rx=6 |
| 核心高亮 | 120~150px | 40~44px | rx=6 |
| 判断菱形 | ~100px 宽 | ~80px 高 | — |
| 分支标签 | 70~80px | 30px | rx=4 |

### 5.3 文字规范

| 场景 | 字号 | 字重 | 对齐 |
|------|------|------|------|
| 开始/结束节点 | 13px | 600 | 居中 |
| 普通步骤节点 | 13px | 600 | 居中 |
| 核心高亮节点 | 13px | 700 | 居中 |
| 判断菱形文字 | 12px | 600 | 居中 |
| 分支标签 | 11px | 600 | 居中 |
| 分支容器标题 | 12px | 600 | 居中 |

---

## 六、流程图命名与目录规范

### 6.1 文件命名

流程图 SVG 内联写在对应页面的 `index.md` 中，位于 `<div id="biz-flow">` 区块内。

### 6.2 流程图 ID 命名

每个流程图的 SVG 外层容器使用语义化类名：
- 主流程：`.bf-truth-flow` → 可扩展为 `.bf-[模块名]-flow`
- 详细流程：`.bf-detail-flow`

### 6.3 图例（可选）

复杂流程图应在 SVG 下方添加图例：

```html
<div class="bf-fc-legend">
  <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 主流程步骤</span>
  <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
  <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-gray"></span> 不符合分支</span>
</div>
```

---

## 七、完整模板骨架

```html
<div class="tab-pad">
<div class="bf-truth-flow">
  <h4 class="bf-main-title">【流程名称】</h4>
  <p class="bf-main-sub">【简要描述】</p>
  <div class="bf-fc-svg-wrap">
    <!-- ⚠️ 必须加 style="max-height:none" 防止底部被截断 -->
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 绿色箭头（主流程） -->
        <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#16A34A"/>
        </marker>
        <!-- 灰色箭头（非重点分支） -->
        <marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF"/>
        </marker>
        <!-- 蓝色箭头（上游支撑） -->
        <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#3B82F6"/>
        </marker>
        <!-- 红色箭头（拒绝/驳回） -->
        <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/>
        </marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.15"/>
        </filter>
      </defs>

      <!-- ========== 上游支撑（正上方横带，子卡片横向平铺） ========== -->
      <rect x="50" y="20" width="1100" height="95" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="42" text-anchor="middle" fill="#1D4ED8" font-size="13" font-weight="600">上游支撑</text>

      <!-- 7 张子卡片 横向平铺（单行，卡片宽度 120） -->
      <rect x="150" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="210" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">项目管理</text>
      <rect x="280" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="340" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">经销商管理</text>
      <rect x="410" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="470" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">交易公司/法人</text>
      <rect x="540" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="600" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">OCR识别服务</text>
      <rect x="670" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="730" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">编码规则服务</text>
      <rect x="800" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="860" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">工作流服务</text>
      <rect x="930" y="56" width="120" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="990" y="78" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">单位基础表</text>

      <!-- 上游→开始：垂直直连（蓝色虚线箭头，无斜线） -->
      <line x1="60" y1="115" x2="60" y2="150" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>

      <!-- ========== 主线：前置业务 → 本业务 → 后置业务（纵向紧凑） ========== -->
      <!-- 开始 -->
      <rect x="20" y="150" width="80" height="44" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="60" y="177" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <line x1="100" y1="172" x2="130" y2="172" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 步骤1 -->
      <rect x="130" y="150" width="100" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="180" y="177" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">步骤1</text>
      <line x1="230" y1="172" x2="260" y2="172" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 步骤2 -->
      <rect x="260" y="150" width="100" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="310" y="177" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">步骤2</text>

      <!-- 步骤2→本业务（水平直线） -->
      <line x1="360" y1="172" x2="620" y2="172" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 核心高亮节点（绿色实心 + 阴影） -->
      <rect x="620" y="145" width="160" height="54" rx="6"
            fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="700" y="169" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">★ 核心业务 ★</text>
      <text x="700" y="189" text-anchor="middle" fill="#DCFCE7" font-size="11">副标题说明</text>

      <!-- 本业务→审批判断 -->
      <line x1="700" y1="199" x2="700" y2="212" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 判断节点（菱形紫色虚线） -->
      <polygon points="700,212 770,247 700,282 630,247"
               fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="700" y="250" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 条件判断？</text>

      <!-- 拒绝分支（红色箭头 + 红色标签） -->
      <line x1="770" y1="247" x2="850" y2="247" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="805" y="232" width="90" height="28" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="850" y="251" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>

      <!-- 拒绝返回路径（L形直角：先垂直上再水平左，无弯曲） -->
      <line x1="850" y1="232" x2="850" y2="199" stroke="#EF4444" stroke-width="1.5"/>
      <line x1="850" y1="199" x2="780" y2="199" stroke="#EF4444" stroke-width="1.5" marker-end="url(#arr-red)"/>

      <!-- 通过分支：垂直下（间距 25px，确保箭头可见） -->
      <line x1="700" y1="282" x2="700" y2="295" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 后续步骤 -->
      <rect x="640" y="295" width="120" height="40" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="700" y="320" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">后续步骤</text>

      <!-- 后续→结束（间距 25px，确保箭头可见） -->
      <line x1="700" y1="335" x2="700" y2="401" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 结束节点 -->
      <rect x="645" y="401" width="110" height="40" rx="6"
            fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="700" y="426" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>

      <!-- 结束→下游：垂直直连（绿色虚线箭头，无斜线） -->
      <line x1="700" y1="441" x2="700" y2="476" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>

      <!-- ========== 下游影响（正下方横带，子卡片横向平铺） ========== -->
      <rect x="50" y="476" width="1100" height="95" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="600" y="498" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">下游影响</text>

      <!-- 4 张子卡片 横向平铺（单行，卡片宽度 150） -->
      <rect x="270" y="512" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="345" y="535" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">下游模块A</text>
      <rect x="440" y="512" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="515" y="535" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">下游模块B</text>
      <rect x="610" y="512" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="685" y="535" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">下游模块C</text>
      <rect x="780" y="512" width="150" height="36" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="855" y="535" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">下游模块D</text>
    </svg>
  </div>

  <!-- 图例 -->
  <div class="bf-fc-legend">
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-green"></span> 上下游业务单据</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-purple"></span> 开始/结束/判断</span>
    <span class="bf-fc-legend-item"><span class="bf-fc-dot bf-fc-dot-blue"></span> 上游支撑服务</span>
    <span class="bf-fc-legend-item"><span style="display:inline-block;width:22px;height:2px;background:#EF4444;"></span> 审批拒绝/驳回</span>
  </div>
</div>
</div>
```

---

## 八、注意事项

1. **必须包含开始和结束节点**：每个流程图以"开始"节点开头，以"结束"节点收尾。
2. **判断节点使用菱形 + 虚线边框**：菱形用 `<polygon>` 绘制四点坐标，边框为紫色虚线。
3. **分支使用虚线外框分组**：符合/不符合分支各用一个虚线矩形框圈起来。
4. **核心节点用实心填充 + 阴影突出**：本菜单的核心操作节点使用绿色实心填充 + `filter="url(#shadow)"`。
5. **箭头颜色与分支一致**：绿色箭头用于主流程，灰色箭头用于非重点分支。
6. **文字统一使用 sans-serif 字体族**：通过 CSS `.bf-fc-svg text` 指定。
7. **SVG 最小宽度 720px**：确保在窄屏下可横向滚动查看。
8. **viewBox 坐标需预留余量**：最左边从 x=20 开始，最右边保留至少 20px 边距。
9. **viewBox 高度必须大于最底部元素的 y+字高**：viewBox 高度 = 最底部元素 y + 文字高度 + 至少 20px 余量。同时必须在 `<svg>` 标签上添加 `style="max-height:none"` 覆盖全局 CSS 的 `max-height:600px` 限制。
10. **箭头 ID 必须全局唯一**：同一页面中多个 SVG 流程图不可共用相同的 marker id（如 `arr-green`），否则箭头颜色会错乱。建议每个流程图的 marker id 加前缀区分，如 `arr-green-upload`。
11. **连接线只能用直线，禁止斜线和曲线**：所有连接线必须由水平和/或垂直线段（`<line>`）组成，禁止使用 `<path>` 曲线、对角线（x1≠x2 且 y1≠y2 的 line）等。改变方向时用多条 `<line>` 拼接成 L 形或 ┐ 形直角。
12. **上游支撑与下游影响布局规则**：优先采用"上-中-下"三段式（上游正上方、下游正下方，§10.1）；上下游子卡片必须**横向平铺**（单行水平排列），不可纵向堆叠；上游→主流程、主流程→下游 用垂直直线相连。
13. **节点粒度铁律（见 §9）**：一个节点 = 一种业务单据/模块，禁止把"填明细/保存/提交审批"等操作步骤拆成独立节点；创建单的内部步骤只允许作为核心节点的副标题出现，不占节点。

---

## 九、节点粒度原则（最高优先级铁律）

> **🔴 铁律：一个节点 = 一种业务单据 / 一种业务模式 / 一个独立模块，绝不是一个操作步骤。**
>
> 绘制流程图前先问自己：**这个节点能不能单独成为一个菜单？有没有独立单据号？上下游系统要不要感知它？** 三者都"否"，就必须并入同一张单据节点里，不允许拆成独立节点。

### 9.1 为什么这条是铁律

流程图的目的是让读图人一眼看清"本业务和外围哪些单据/系统在打交道"，而不是复述某张单据内部怎么填表。把"填明细、保存、提交审批"拆成独立节点，流程图就退化成了操作手册——既拖长又掩盖了真正的业务依赖关系。

### 9.2 正确示例（业务 / 单据层级）

```
[开始] → 项目报备 → 项目合同 → 订单 → 出库 → ★核销发票上传★ → 发票生效 → 真实性核销 → [结束]
```

```
[开始] → ⚖ 家装类型(直销/经销) → ★新建家装要货订单★ → ⚖ 审批通过？ → 生成CRM订单 → 更新项目阶段 → [结束]
```

每个节点都对应一个独立的业务单据或模块。

### 9.3 错误示例（操作步骤层级，禁止）

```
❌ [开始] → 新建上传单 → 选择核销类型 → 选择项目 → 上传附件 → OCR识别 → 录入信息 → 保存 → 提交审批 → [结束]
```

```
❌ [开始] → 选报备项目 → 选价格类型 → 填明细 → 保存(校验) → 提交审批 → 审批 → [结束]
   ↑ 这 5 个都是"新建家装要货订单"这一张单据内部的表单操作步骤，必须合并为一个核心节点 ★新建家装要货订单★
```

### 9.4 实战对照：家装要货订单（合并前 vs 合并后）

| 维度 | ❌ 合并前（过细） | ✅ 合并后（正确） |
|------|------------------|------------------|
| 创建单 | 选报备项目·价格类型 / 填明细·期望到达日期 / 保存(校验) / 提交审批 —— 4 个独立节点 | 合并为 **1 个**核心节点 ★新建家装要货订单★ |
| 节点内步骤 | — | 写入节点副标题（选报备项目·价格类型·填明细·保存），不占独立节点 |
| 主线长度 | 被创建步骤拖得很长 | 紧凑，一眼看清业务链路 |

> 合并后"创建单"的内部步骤只作为核心节点的一行副标题出现（`font-size=10~11`，副色），读图人知道有这些步骤，但主线不被它们稀释。

### 9.5 判断标准（三问）

| 问题 | 答案=能/有/需要 → 可作节点 | 答案=不能/没有/不需要 → 必须合并 |
|------|--------------------------|-------------------------------|
| 这个节点能作为一个独立菜单吗？ | 能 | 不能 |
| 这个节点有独立的单据号吗？ | 有 | 没有 |
| 上下游系统是否需要感知这个步骤？ | 需要 | 不需要 |

### 9.6 节点副标题的正确用法

核心节点允许用一行小字标注它"内部包含的表单步骤"，**仅作说明、不拆节点**。例如：

```xml
<!-- 节点副标题：说明创建单内部步骤，但不作为独立节点 -->
<text x="235" y="414" text-anchor="middle" fill="#DCFCE7" font-size="10">选报备项目·价格类型·填明细·保存</text>
```

### 9.7 合理使用判断节点

判断菱形只用于**影响后续业务走向的关键决策**：
- 审批是否通过？（决定是否进入下游）
- 业务模式 / 单据类型分支（如直销/经销、折扣单/折扣政策/价目表）

不应为表单校验（必填项为空、发票重复、产品生命状态校验）设置判断节点——这些是本业务内部校验逻辑，放到「重点逻辑」Tab 描述。

### 9.8 绘制前强制检查清单

- [ ] 每个节点是否都能对应一种单据/模块？含"填/选/保存/提交/录入/上传附件"等动词的节点，先判断它是不是某单据内部步骤，是则合并。
- [ ] 是否存在仅描述"怎么操作界面"的节点？有则删除或并入上游单据节点。
- [ ] 判断菱形是否代表业务走向决策？不是则移除，逻辑移入「重点逻辑」。
- [ ] 主线节点数是否控制在 5~9 个？超过说明可能拆得过细。

---

## 十、布局模式

### 10.1 上下布局（推荐，上游正上方 / 下游正下方）

> **上游支撑放在主流程的正上方，下游影响放在主流程的正下方，形成"上-中-下"三段式全链路布局。**

适用于需要展示上下游依赖关系的全链路流程图。主流程在中间（可横向或纵向串联），上游支撑横带在顶部，下游影响横带在底部。

```
┌────────────── 上游支撑（正上方横带）──────────────┐
│ [项目管理][经销商管理][交易公司/法人][OCR][编码][工作流][单位表] │  ← 子卡片横向平铺
└────────────────────┬───────────────────────────┘
                     │ 蓝色虚线箭头（垂直）
                     ↓
  [开始] → 报备 → 合同 → 订单 → 出库 → ★本业务★ → 判断 → 生效 → 核销 → [结束]
                     │
                     ↓ 绿色虚线箭头（垂直）
┌────────────── 下游影响（正下方横带）──────────────┐
│    [真实性核销引用][发票数据占用][折扣政策关联][状态更新]     │  ← 子卡片横向平铺
└─────────────────────────────────────────────────┘
```

**关键规则**：

| 规则 | 说明 |
|------|------|
| **三段式结构** | 上游横带（顶）→ 主流程（中）→ 下游横带（底），自上而下排列 |
| **横带居中** | 上游/下游容器与主线水平居中对齐，宽度可贯通（如 x=50, width=1100） |
| **子卡片横向平铺** | 容器内的子卡片必须单行水平排列（横向平铺），不换行、不纵向堆叠 |
| **子卡片对齐** | 子卡片在容器内水平均匀分布，整体居中对齐 |
| **连接线垂直** | 上游→主流程、主流程→下游 均使用**垂直直线**直连（与 §3.4 直线铁律一致） |
| **颜色规范** | 上游容器蓝色虚线 `#3B82F6`，下游容器绿色虚线 `#16A34A` |

**子卡片横向平铺计算**（以 7 张卡片为例）：

```
容器可用内宽 W（如 1080px）
单卡宽 w（如 120px）+ 卡间距 g（如 10px）
所需总宽 = 7×w + 6×g = 7×120 + 6×10 = 900px
起始 x = 容器内左边距 + (W − 所需总宽) / 2   ← 保证整体居中
```

**横带（上游/下游）尺寸标准**：

| 元素 | 尺寸 | 说明 |
|------|------|------|
| 横带容器 | x=50, width=1100, **height=95** | 贯通居中，上下留白各约 20px |
| 横带标题 | y=42（带内顶部）, font-size=13 | 顶部居中 |
| 子卡片（上游） | width=**120**, height=34 | 单行横向平铺，卡片不宜过宽 |
| 子卡片（下游） | width=**150**, height=36 | 单行横向平铺 |
| 子卡片间距 | 8~10px（上游）/ 20px（下游） | 整体居中对齐 |
| 子卡片定位 | y=56（带内，紧贴标题下方） | 避免大段底部留白 |
| 横带底部留白 | **≤25px** | 子卡片底部到带底，保持紧凑 |

> **横带紧凑原则**：卡片宽度以"刚好容纳文字"为准（上游 7 张取 120、下游 4 张取 150），横带高度固定 95px，子卡片紧贴标题下方（y=56），底部留白控制在 25px 以内，不要留大块空白。

**上下布局的 viewBox 计算**：
```
宽度 = 容器宽度 + 左右边距（如 1100 + 100 = 1200）
高度 = 下游带底部 + 20px 余量
     （实际样例：下游带 y=476, height=95 → 底部 571；+20 = 591，取 600）
```

### 10.2 对齐三区布局（备选，上游/下游左右对称）

> 当主流程为横向单行且上下游子项较少时，也可采用左右对称布局：上游放左、下游放右，同行对齐。

**对齐规则**：

| 规则 | 说明 |
|------|------|
| **y 坐标一致** | 上游支撑容器和下游影响容器的 y 坐标必须相同 |
| **高度一致** | 上游和下游容器的高度必须相同（如都是 170px） |
| **对称分布** | 上游靠左（x=20），下游靠右（x=920），视觉对称 |
| **水平连线** | 上游→主线、主线→下游的连接线全部使用水平+垂直直角线段，禁止斜线 |
| **连接方式** | 上游→主线：水平出 → 垂直下 → 水平入（┐形两段）；主线→下游：水平直线直连 |

```
┌─── 上游支撑（左上 y=42）───┐              ┌─── 下游影响（右上 y=42）───┐
│ 项目管理    ·  经销商管理   │              │ 真实性核销引用 · 发票占用  │
│ 交易公司/法人 · 编码规则    │              │ 折扣政策关联 · 状态更新    │
│ OCR识别·单位表·工作流      │              │                          │
└──────────┬─────────────────┘              └──────────┬───────────────┘
           │ 蓝色虚线箭头                               │ 绿色虚线箭头
           ↓                                            ↓
  [开始] → 报备 → 合同 → 订单 → 出库 → ★本业务★ → 判断 → 生效 → 核销 → [结束]
```

### 10.3 分支并行（条件分支流程图）

适用于有明确条件分叉的场景（如"是否符合抬价范围"），使用菱形判断节点 + 分支虚线外框。

```
                         ⚖ 是否符合条件？
                        ├─ ✓ → [符合分支流程...]
                        └─ ✗ → [不符合分支流程...]
```

参考「家装真实性核销 → 真实性核销主流程」。

---

## 十一、色彩体系扩展

### 11.1 新增色板

| 颜色名称 | Hex | 用途 |
|---------|-----|------|
| **上游蓝** | `#3B82F6` / `#EFF6FF` | 上游支撑服务节点/外框/箭头 |
| **上游蓝-深** | `#1D4ED8` | 上游支撑服务文字 |
| **拒绝红** | `#EF4444` / `#FEF2F2` | 审批拒绝/驳回分支箭头和标签 |
| **拒绝红-深** | `#DC2626` | 审批拒绝/驳回标签文字 |

### 11.2 语义映射扩展

| 语义 | 填充色 | 描边色 | 文字色 | 线条风格 |
|------|--------|--------|--------|---------|
| 上游支撑服务 | `#FFFFFF` | `#3B82F6` / 1.5px | `#1D4ED8` | 实线 |
| 上游支撑容器 | `#EFF6FF` | `#3B82F6` / 1.5px | `#1D4ED8` | 虚线 `6,4` |
| 上游→主线连线 | — | `#3B82F6` / 1.5px | — | 虚线 `4,3` |
| 审批拒绝/驳回 | `#FEF2F2` | `#EF4444` / 1px | `#DC2626` | 实线 |
| 拒绝返回路径 | — | `#EF4444` / 1.5px | — | 实线 |

### 11.3 箭头 marker 扩展

```xml
<!-- 蓝色箭头（上游支撑） -->
<marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
  <path d="M0,0 L10,5 L0,10 z" fill="#3B82F6"/>
</marker>

<!-- 红色箭头（拒绝/驳回） -->
<marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
  <path d="M0,0 L10,5 L0,10 z" fill="#EF4444"/>
</marker>
```

---

## 十二、viewBox 与高度规则

### 12.1 计算规则

```
viewBox 高度 = 最底部元素 y 坐标 + 元素高度 + 20px 底部留白
```

### 12.2 必加样式

每个流程图的 `<svg>` 标签必须添加 `style="max-height:none"`，覆盖全局 CSS 中 `.bf-fc-svg` 的 `max-height: 600px` 限制：

```html
<svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
```

### 12.3 常见问题

| 现象 | 原因 | 解决 |
|------|------|------|
| 流程图底部被截断 | viewBox 高度不够 或 max-height 限制 | 增大 viewBox 高度 + 添加 `style="max-height:none"` |
| 下游影响区域不可见 | 该区域 y 坐标超出 viewBox | 将下游区域移至 viewBox 范围内，或增大高度 |
| 横向滚动条出现 | SVG 宽度超过容器 | 确保 viewBox 宽度 ≤ 1200，节点不超出右侧边界 |
