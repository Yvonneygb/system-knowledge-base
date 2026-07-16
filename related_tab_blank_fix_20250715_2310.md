# 修复：【关联依赖】TAB 界面空白

## 现象
点击「关联依赖」TAB 界面空白，但 index.md 中该 section（第 1425 行起）明明有内容（上游依赖表、下游影响、核销延期三块卡片）。

## 根因：跨 section 的 div 标签错配（mis-nesting）
逐 section 计算 `<div>` 开/闭平衡，发现三个 section 互相抵消但各自不平衡：
- `详细逻辑`(detail-logic)：**+2**（2 个 `<div>` 未闭合）
- `排查工作流`(troubleshoot)：**+1**（1 个 `<div>` 未闭合）
- `关联依赖`(related)：**-3**（末尾多 3 个 `</div>`）

整文件净平衡 = 0，所以 Vue 编译器不报错、build 能通过；但 related 末尾多出的 3 个 `</div>` 实际"借用"了前面两个 section 漏关的 3 个 `<div>`，导致 related 全部内容被错误嵌套进 detail-logic 的容器内，SSR 渲染时被丢弃 → 构建产物中不含相关文本（已验证 dist HTML 无"系统关联关系"/"上游依赖"）。

## 修复动作
1. 删除 related section 末尾多出的 3 个 `</div>`（原 1508-1510 行）
2. 在 `详细逻辑` section 末尾（FAQ 注释前）补 2 个 `</div>`
3. 在 `排查工作流` section 末尾（历史记录注释前）补 1 个 `</div>`

修复后逐 section 平衡校验：所有 8 个 section delta 均为 0，整文件 final = 0。

## 验证
- `vitepress build docs` 成功：build complete in 8.97s
- dist HTML `家装真实性核销/index.html` 现含「系统关联关系」「上游依赖」= True（之前为 False）
- 浏览器刷新即可看到【关联依赖】TAB 完整内容

## 文件
- `docs/家装管理/项目往来/家装真实性核销/index.md`
