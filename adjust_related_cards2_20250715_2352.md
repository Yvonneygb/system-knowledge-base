# 任务：【系统关联关系】卡片样式再调整（业务流内）

## 需求（延续上一轮，仍只针对【业务流】内「系统关联关系」块）
1. 每个 kl-card-header 取消下方 margin-bottom
2. 每个 kl-card-header 之间增大间隙留白
3. 删除「系统关联关系」标题及其下方横线

## 操作（按块内唯一匹配替换，不动全局 CSS，不影响【重点逻辑】/FAQ）
- 块范围：index.md 第 400 行（wrapper）~ 第 476 行。
- 1) 3 个 `<div class="kl-card-header">` → 加 `style="margin-bottom:0;"`，覆盖 CSS 的 `margin-bottom:12px`。
- 2) 卡片间间隙：两张后续卡片 `margin-top:20px;` → `margin-top:32px;`（块内 2 处，第 1 张为首卡无 margin-top）。
- 3) 删除 `  <div class="kl-section-title">系统关联关系</div>` 整行（文字 + 其 border-bottom 横线一并消失）。

## 校验
- 块内 kl-section-title 计数 = 0（标题已删）。
- margin-bottom:0 计数 = 3（3 个 header）。
- margin-top:32px 计数 = 3（其中 1 处为 wrapper 自身的上下间隔，2 处为卡片间间隙；原 margin-top:20px 计数 = 0）。
- `vitepress build docs` 成功：build complete in 8.57s。

## 注意
- 改动均为块内联样式/行删除，全局 custom.css 未动，其他使用 kl-card-header / kl-section-title 的板块（如【重点逻辑】"核销双重数量控制"）外观不受影响。
- 「下游影响」内层 kl-col-box 的彩色左边线保持不动。

## 文件
- `docs/家装管理/项目往来/家装真实性核销\index.md`
