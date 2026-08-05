# DMS 知识库 — 业务流程图（biz-flow）样式规范

> 基于「家装管理 → 项目往来 → 家装真实性核销 → 真实性核销主流程」总结提炼。
> 本文档为所有菜单页业务流程图绘制的统一 UI 规范。

---

## 一、整体容器结构

```html
<div class="bf-truth-flow">
  <h4 class="bf-main-title">【主流程名称】</h4>
  <p class="bf-main-sub">【一句话流程摘要，如：前置报备 → 抬价判断 → 双分支处理】</p>
  <div class="bf-fc-svg-wrap">
    <svg class="bf-fc-svg" viewBox="0 0 [总宽度] [总高度]" xmlns="http://www.w3.org/2000/svg">
      <!-- 流程图 SVG 内容 -->
    </svg>
  </div>
</div>
```

### 容器 CSS

| 类名 | 用途 | 关键样式 |
|------|------|---------|
| `.bf-truth-flow` | 最外层容器 | `background:#FAF5FF; border:1px solid #EDE9FE; border-radius:12px; padding:24px 20px 20px` |
| `.bf-main-title` | 主标题 | `font-size:18px; font-weight:700; color:#4C1D95` |
| `.bf-main-sub` | 副标题/流程摘要 | `font-size:13px; color:#6D28D9` |
| `.bf-fc-svg-wrap` | SVG 容器 | `background:#FFF; border:1px solid #E5E7EB; border-radius:8px; padding:16px; display:flex; justify-content:center; overflow-x:auto` |
| `.bf-fc-svg` | SVG 标签 | `display:block; width:100%; min-width:720px; max-height:600px` |

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

### 3.4 S 形弯曲路径（绕行/汇入）

**应用场景**：节点需要绕过其他元素汇入目标节点时。

```xml
<!-- S 形弯曲路径 -->
<path d="M 445 480 L 445 520 L 555 520 L 555 540"
      stroke="#16A34A" stroke-width="2" fill="none" marker-end="url(#arr-green)"/>
```

| 属性 | 值 | 说明 |
|------|----|------|
| 描边 | `#16A34A` 或 `#9CA3AF` | 与分支颜色一致 |
| 线宽 | `2` | 统一 2px |
| 填充 | `none` | 路径不填充 |

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
| 节点间距（水平） | 40~50px | 两个相邻节点之间的间隔 |
| 节点间距（垂直） | 20~30px | 纵向节点之间的间隔 |
| 行高 | 40~50px | 不同行之间的间距 |

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
<div class="bf-truth-flow">
  <h4 class="bf-main-title">【流程名称】</h4>
  <p class="bf-main-sub">【简要描述】</p>
  <div class="bf-fc-svg-wrap">
    <!-- ⚠️ 必须加 style="max-height:none" 防止底部被截断 -->
    <svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 [W] [H]" xmlns="http://www.w3.org/2000/svg">
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

      <!-- 上游支撑容器（蓝色虚线外框） -->
      <rect x="20" y="42" width="240" height="170" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="140" y="68" text-anchor="middle" fill="#1D4ED8" font-size="12" font-weight="600">上游支撑</text>
      <!-- 上游支撑节点（白色实线） -->
      <rect x="35" y="82" width="100" height="34" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2"/>
      <text x="85" y="104" text-anchor="middle" fill="#1D4ED8" font-size="11" font-weight="600">项目管理</text>
      <!-- 上游→主线：蓝色虚线 -->
      <line x1="260" y1="127" x2="310" y2="252" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-blue)"/>

      <!-- 开始节点（紫色虚线圆角矩形） -->
      <rect x="20" y="230" width="80" height="44" rx="6"
            fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="60" y="257" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">开始</text>
      <!-- 连接线 -->
      <line x1="100" y1="252" x2="130" y2="252" stroke="#16A34A" stroke-width="2" marker-end="url(#arr-green)"/>

      <!-- 步骤节点（绿色实线圆角矩形） -->
      <rect x="130" y="230" width="100" height="44" rx="6"
            fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="180" y="257" text-anchor="middle" fill="#166534" font-size="13" font-weight="600">步骤1</text>

      <!-- 核心高亮节点（绿色实心 + 阴影） -->
      <rect x="620" y="225" width="160" height="54" rx="6"
            fill="#16A34A" stroke="#15803D" stroke-width="2" filter="url(#shadow)"/>
      <text x="700" y="249" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">★ 核心业务 ★</text>
      <text x="700" y="269" text-anchor="middle" fill="#DCFCE7" font-size="11">副标题说明</text>

      <!-- 判断节点（菱形紫色虚线） -->
      <polygon points="700,315 770,350 700,385 630,350"
               fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="700" y="353" text-anchor="middle" fill="#7C3AED" font-size="12" font-weight="600">⚖ 条件判断？</text>

      <!-- 拒绝分支（红色箭头 + 红色标签） -->
      <line x1="770" y1="350" x2="840" y2="350" stroke="#EF4444" stroke-width="2" marker-end="url(#arr-red)"/>
      <rect x="810" y="335" width="80" height="30" rx="4" fill="#FEF2F2" stroke="#EF4444" stroke-width="1"/>
      <text x="850" y="355" text-anchor="middle" fill="#DC2626" font-size="11" font-weight="600">拒绝 ✗</text>

      <!-- 拒绝返回路径（S形弯曲，红色） -->
      <path d="M 850 335 L 850 310 L 780 310 L 780 279" stroke="#EF4444" stroke-width="1.5" fill="none" marker-end="url(#arr-red)"/>

      <!-- 下游影响容器（绿色虚线外框） -->
      <rect x="900" y="420" width="280" height="190" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="1040" y="446" text-anchor="middle" fill="#166534" font-size="12" font-weight="600">下游影响</text>
      <!-- 下游节点 -->
      <rect x="920" y="462" width="115" height="38" rx="5" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.2"/>
      <text x="977" y="486" text-anchor="middle" fill="#166534" font-size="11" font-weight="600">下游模块A</text>
      <!-- 主线→下游连线：绿色虚线 -->
      <line x1="760" y1="440" x2="900" y2="515" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>

      <!-- 结束节点 -->
      <rect x="645" y="555" width="110" height="40" rx="6"
            fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="700" y="580" text-anchor="middle" fill="#7C3AED" font-size="13" font-weight="600">结束</text>
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

---

## 九、节点粒度原则

> **核心原则：一个节点 = 一种业务单据/业务模块，而不是一个操作步骤。**

### 9.1 正确示例（业务层级）

```
[开始] → 项目报备 → 项目合同 → 订单 → 出库 → ★核销发票上传★ → 发票生效 → 真实性核销 → [结束]
```

每个节点对应一个独立的业务单据或模块。

### 9.2 错误示例（操作步骤层级）

```
[开始] → 新建上传单 → 选择核销类型 → 选择项目 → 上传附件 → OCR识别 → 录入信息 → 保存 → 提交审批 → [结束]
```

这些是同一个单据内部的表单操作步骤，不应拆分为独立节点。

### 9.3 判断标准

| 问题 | 答案 |
|------|------|
| 这个节点能作为一个独立菜单吗？ | 能 → 可作节点；不能 → 应合并 |
| 这个节点有独立的单据号吗？ | 有 → 可作节点；没有 → 应合并 |
| 上下游系统是否需要感知这个步骤？ | 需要 → 可作节点；不需要 → 应合并 |

### 9.4 合理使用判断节点

流程图中的判断菱形仅用于**影响后续业务走向的关键决策**，如：
- 审批是否通过？（决定是否进入下游）
- 是否符合抬价范围？（决定走哪条分支路径）

不应为表单校验（如"必填项是否为空"、"发票是否重复"）设置判断节点，这些属于本业务内部的校验逻辑，放在「重点逻辑」Tab 中描述。

---

## 十、布局模式

### 10.1 横向主线 + 纵向支撑（全链路流程图）

适用于需要展示上下游依赖关系的场景。主线从左到右串联上下游业务单据，支撑服务/下游影响以纵向卡片形式布局在主线上下方或两侧。

```
┌────────── 上游支撑（左上） ──────────┐
│ 项目管理 · 经销商 · 交易公司 · OCR ···│──→ (数据/服务流入)
└────────────────────────────────────┘

  [开始] → 项目报备 → 项目合同 → 订单 → 出库 → ★本业务★ → 发票生效 → 真实性核销 → [结束]
                                                                    │
                                                    ┌───────────────┘
                                                    ↓
                              ┌────────── 下游影响（右下）──────────┐
                              │ 真实性核销引用 · 发票占用 · 折扣关联 │
                              └────────────────────────────────────┘
```

**关键规则**：
- 上游支撑使用**蓝色虚线外框** `#3B82F6`，放置在主线左上方
- 下游影响使用**绿色虚线外框** `#16A34A`，放置在主线右下方
- 支撑服务到主线的连线使用**蓝色虚线箭头** `stroke-dasharray="4,3"`
- 本业务节点使用**核心高亮样式**（绿色实心 + 白色文字 + 阴影）

### 10.2 分支并行（条件分支流程图）

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
<svg class="bf-fc-svg" style="max-height:none;" viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg">
```

### 12.3 常见问题

| 现象 | 原因 | 解决 |
|------|------|------|
| 流程图底部被截断 | viewBox 高度不够 或 max-height 限制 | 增大 viewBox 高度 + 添加 `style="max-height:none"` |
| 下游影响区域不可见 | 该区域 y 坐标超出 viewBox | 将下游区域移至 viewBox 范围内，或增大高度 |
| 横向滚动条出现 | SVG 宽度超过容器 | 确保 viewBox 宽度 ≤ 1200，节点不超出右侧边界 |
