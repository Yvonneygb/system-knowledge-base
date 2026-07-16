# 家装真实性核销知识库 - DIV 嵌套修复

## 目标
修复 index.md 中 div 嵌套错乱导致 VitePress 构建失败的问题。

## 根因
1. **HTML 块内空行**：L619, L693, L705, L711 有空行（只含空格），markdown-it 在空行处截断 HTML 块解析，导致后续 `</div>` 被标记为无效结束标签
2. **多余的 `</div>`**：permission 区域末尾（原 L707）有 1 个多余的 `</div>`，key-logic 区域末尾缺少 1 个 `</div>`（之前修复脚本误删）

## 修复步骤
1. 删除 4 个 HTML 块内空行（L619, L693, L705, L711）
2. 在 key-logic 末尾（L605-L607 后）恢复 1 个 `</div>` 关闭 key-logic section
3. 删除 permission 末尾 1 个多余的 `</div>`（原 L708）

## 验证
- `div balance = 0`（opens=399, closes=399）
- VitePress build 成功（14.60s，零错误）
- dist/index.html 中所有 9 个 section ID 存在
- 8 个 tab 标签全部正确渲染

## 文件状态
- `docs/家装管理/项目往来/家装真实性核销/index.md`：1462 行
- `docs/.vitepress/theme/custom.css`：未修改
- `docs/.vitepress/theme/BreadcrumbTabs.vue`：8 个 tab

## 时间
2026-07-16 13:30 完成
