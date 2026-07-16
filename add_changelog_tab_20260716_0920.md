# 任务：在【常见问题】右侧插入【更新记录】tab

## 数据源
- `D:\VIP冰\项目\新门户\源码\ae-business\家装真实性核销代码提交记录.md`（UTF-8, 9419 bytes）
- 内容：按月组织的代码提交记录（1月~6月）+ 按贡献者统计 + 按问题单号统计

## 操作

### index.md（内容写入 + 结构调整）

**写入 changelog 块**（位于 `id="faq"` 之后、`id="history"` 之前）：
- 结构：`<div id="changelog">` → `<div class="tab-pad">` → `<div style="padding:24px 10%;">` → `kl-section-title` + `kl-tip`（统计范围/提交数/截止日期）+ 8 张 `kl-card`（每人月／按贡献者／按问题单）
- 每张卡：`kl-card-header > h3.kl-card-title`（月份/标题）+ `kl-table`（表格，提交ID 用 `<code>` 包裹）
- 样式：与【历史排查记录】一致（24px 10% padding、margin-top:20px 间隔）
- 原始 markdown 表格自动转换；无空白行（规避 markdown-it 截断解析）
- 源数据含额外 2 个汇总表（按贡献者统计、按问题单号统计），同步转换。

**结构调整**（发现 `id="faq"` 和 `id="faq-qa"` 是分离的两个块，初始插入位置在二者之间）：
- 将 changelog 块从 `faq`~`faq-qa` 之间移到 `faq-qa` 之后。
- 最终内容顺序：faq (1014-1270) → faq-qa (1273-1346) → changelog (1348-1579) → history (1581-1637)

### BreadcrumbTabs.vue（tab 按钮 + 图标）
- Tab 数组：在 `id='faq'` 后插入 `{ id: 'changelog', label: '更新记录', icon: 'fa-solid fa-code-commit' }`
- SVG 图标（git-commit 风格）：在 faq SVG 后插入 `<svg v-if="tab.id==='changelog'">...</svg>`
- 最终 tab 顺序：业务介绍 → 业务流 → 重点逻辑 → 详细逻辑 → 权限控制 → 常见问题FAQ → **更新记录** → 历史排查记录

## 文件
- `docs/家装管理/项目往来/家装真实性核销/index.md`（1637 行）
- `docs/.vitepress/theme/BreadcrumbTabs.vue`（125 行，8 tabs）

## 校验
- div 全局平衡 = 0
- `vitepress build docs` 成功：build complete in 11.36s
