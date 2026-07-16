# 任务：【关联依赖】内容移入【业务流】页面

## 需求
将【关联依赖】的内容移动到【业务流】页面中“真实性核销主流程”模块下方，留出上下间隔、左右留白 24px 10%；且“真实性核销主流程”模块内容与样式一律不动。

## 操作
1. 提取【关联依赖】section 内层内容（`<div class="kl-section-title">系统关联关系</div>` + 3 张 kl-card：上游依赖 / 下游影响 / 核销延期关联），共 78 行。
2. 在【业务流】的 `id="biz-flow"` 内、紧跟 `bf-truth-flow`（真实性核销主流程）模块之后插入，外层包裹：
   `<div style="padding:24px 10%; margin-top:32px; margin-bottom:32px;">`
   - 左右留白 10%、上下内边距 24px；上下间隔由 margin 32px 提供。
3. 删除原【关联依赖】section（注释 + `id="related"` 容器 + 内层内容）。
4. 因该 tab 已无内容，从 `BreadcrumbTabs.vue` 移除 `related` tab 项及其 SVG 图标（避免空 tab）。

## 校验
- 逐 section div 平衡 + 全局平衡 = 0，全部通过。
- `vitepress build docs` 成功：build complete in 12.08s。
- 源码确认：系统关联关系 present=True；id="related" gone=True；8. 关联依赖 注释 gone=True；wrapper padding 存在=True。
- 【真实性核销主流程】bf-truth-flow 模块未改动（仅在其后插入新块）。

## 注意
- 原来【关联依赖】是独立 TAB；移动后内容并入【业务流】，故该 TAB 已删除。若希望保留 TAB 入口请告知。
- 移动块外层加了 padding/spacing，内部 3 张卡片的样式完全沿用原【关联依赖】样式，未改动。

## 文件
- `docs/家装管理/项目往来/家装真实性核销/index.md`（关联依赖内容移入 biz-flow）
- `docs/.vitepress/theme/BreadcrumbTabs.vue`（移除 related tab 项与图标）
