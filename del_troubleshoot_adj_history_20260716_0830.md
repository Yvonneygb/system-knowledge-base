# 任务：删除【排查工作流】tab + 调整【历史排查记录】tab

## 1. 删除【排查工作流】(troubleshoot) tab
- `BreadcrumbTabs.vue`：移除 tab 数组项 `{ id:'troubleshoot', label:'排查工作流', ... }` 及对应 SVG（第 18、36 行）。剩余 7 个 tab：业务介绍/业务流/重点逻辑/详细逻辑/权限控制/常见问题FAQ/历史排查记录。
- `index.md`：删除整段「6. 排查工作流」注释 + `id="troubleshoot"` 块（含 tab-pad）。文件由 1503 行 → 1402 行。
- 结果：tab 栏与正文均不再含排查工作流，无其他板块受影响（默认 activeTab 仍为 detail-logic）。

## 2. 【历史排查记录】(history) tab 调整
仅针对该块，不改全局 CSS，不影响其他板块。
- 2.1 左右留白 24px 10%：在 history 的 `tab-pad` 内、内容外层插入 `<div style="padding:24px 10%;">` 包裹（kl-section-title + 两张 kl-card），并在 tab-pad 关闭前补 `</div>`。
- 2.2 删除每个 kl-card 左侧边缘线：块内两处（card1 `border-left:4px solid #7C3AED`、card2 `border-left:4px solid #7C3AED; margin-top:20px`）的 border-left 移除（保留 margin-top:20px；保留 kl-num 01/02，按需求未删序号）。
  - 注意：card2 内层 kl-col-box 的 `border-left:3px solid`（红/灰）为统计小卡片自带强调线，非 kl-card 左边线，保持不动。

## 校验
- index.md 全局 div 平衡 = 0。
- `vitepress build docs` 成功：build complete in 19.50s。

## 文件
- `docs/家装管理/项目往来/家装真实性核销/index.md`
- `docs/.vitepress/theme/BreadcrumbTabs.vue`
