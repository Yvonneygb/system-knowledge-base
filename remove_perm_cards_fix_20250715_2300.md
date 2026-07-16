# 修复：权限控制 TAB 底部三卡片删除 + 编译恢复

## 任务
用户要求删除「权限控制」section 底部三个卡片（外部用户 / 内部用户 / 排他权限）。

## 根因
之前 `remove_perm_cards.py` 已成功从 `index.md` 删除三卡片（首次 `python` 运行输出 "Done!"），但删除逻辑留下了 **一个多余的 `</div>`**：
- 权限控制外层有 4 个 wrapper div：permission(534) / tab-pad(535) / kl-wrap(536) / kl-card(537)
- 删除后 638-641 已正确闭合这 4 个 div，但脚本多保留了一行无缩进的 `</div>`（原 line 642）
- 导致全局 `<div>` 平衡 = -1，VitePress/Vue 编译器报 `Invalid end tag` 阻断构建

## 修复动作
1. 用 Python 精确删除原 line 642 多余的 `</div>`（断言该行内容确为 `</div>`）
2. 全局 `<div>` 平衡校验：final balance = 0，无负数（结构已平衡）
3. 重建：`node_modules\.bin\vitepress.cmd build docs` → **build complete in 10.66s**
4. 清理临时脚本 `remove_perm_cards.py`

## 验证
- 文件：`docs/家装管理/项目往来/家装真实性核销/index.md`（权限控制 section 现仅含角色权限矩阵表格 + 图例，无三卡片）
- 编译：零错误，dev 刷新即可见

## 注意
浏览器若仍显示三卡片，是因为旧构建缓存；dev 服务器热更新或硬刷新即可反映最新源码。
