# 家装真实性核销知识库 - 修复记录

## 日期：2026-07-16 14:40 - 15:00

## 目标
修复用户反馈的两个问题：
1. FAQ 的"其他常见问题"模块（Q1-Q6）不显示
2. "详细逻辑"内容缺失

## 根因分析

### 问题1：faq-qa 不显示
`<div id="faq-qa">` 被错误嵌套在 `<div id="err-detail-10" class="error-detail-overlay">` 内部。由于 `err-detail-10` 是一个默认隐藏的 overlay（CSS `display:none`），`faq-qa` 跟着被隐藏了。

**修复**：在 `error-detail-box` 关闭后、`faq-qa` 开始前，插入 `</div>` 关闭 `err-detail-10`，使 `faq-qa` 不再嵌套在 overlay 内部。

### 问题2：详细逻辑内容缺失
detail-logic 区域原来有 7 个模块，经过多轮 div 修复后只剩 2 个（基础信息模块 + 核销明细表），5 个模块被误删。

**修复**：从 LCM 记忆系统中检索到 7 个模块的详细内容描述（来源 sum_5f9c980af1a58b28），重建了 5 个缺失模块：
- 模块2：可选出库单逻辑（过滤条件表 + 计算字段）
- 模块3：可选发票逻辑（过滤条件表 + 剩余可核销数计算 + 产品编码一致性校验）
- 模块4：核销明细（核销行表字段表 + 说明）
- 模块5：保存校验（校验规则表 + 数据处理说明）
- 模块6：提交校验（4大校验规则表）
- 模块7：状态机（状态流转表 + 取消操作类型表）

## 验证结果
- div balance = 0
- VitePress build 成功（12.22s 零错误）
- dist 输出验证：9 个 section ID + 7 个 detail-logic 模块 + 273 个 tr + Q1-Q6 全部存在
- faq-qa 不再嵌套在 err-detail-10 内部（balance=0 确认）
- HTML 大小 96KB
- Dev server 运行于 http://localhost:5176/

## 关键文件
- `docs/家装管理/项目往来/家装真实性核销/index.md`（1505 行）
- `docs/.vitepress/theme/custom.css`
- `docs/.vitepress/theme/BreadcrumbTabs.vue`（8 个 tab）

## 待用户验证
- 切换到"详细逻辑"tab，确认 7 个模块全部显示
- 切换到"FAQ"tab，确认"其他常见问题"Q1-Q6 卡片显示
