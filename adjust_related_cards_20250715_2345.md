# 任务：【系统关联关系】卡片样式调整（业务流内）

## 需求（针对已移入【业务流】的「系统关联关系」三张卡片）
1. 删除 01、02、03 序号 kl-num
2. 上游依赖 / 下游影响 / 核销延期关联 三处标题采用与【重点逻辑】"核销双重数量控制"一致的标题样式
3. 删除 kl-card 左侧边缘线（border-left）

## 操作（仅作用于「系统关联关系」块，不影响其他含同款 purple border 的卡片，如 FAQ）
- 块范围：index.md 第 400 行（wrapper `padding:24px 10%`）→ 第 479 行，脚本按块内唯一匹配替换。
- 1) kl-num：删除 3 处 `<span class="kl-num">01/02/03</span>`。
- 2) 标题结构改为与【重点逻辑】一致：
  `<div class="kl-card-title"><span>标题</span></div>`
  → `<div class="kl-card-header"><h3 class="kl-card-title">标题</h3></div>`
- 3) kl-card 左侧线移除：
  - `border-left: 4px solid #7C3AED;` → 删（上游依赖）
  - `border-left: 4px solid #15803D;` → 删（下游影响，保留 margin-top:20px）
  - `border-left: 4px solid #D97706;` → 删（核销延期关联，保留 margin-top:20px）

## 校验
- 块内 kl-num 计数 = 0；kl-card-header = 3；h3.kl-card-title = 3。
- 剩余 border-left = 3，均为「下游影响」内层 kl-col-box 的彩色左侧强调线（非 kl-card），属预期设计，未动。
- `vitepress build docs` 成功：build complete in 6.98s。

## 文件
- `docs/家装管理/项目往来/家装真实性核销/index.md`（系统关联关系三卡片样式）
