# 2026-07-16：index.md 结构修复完成

## 问题诊断

修复了 `docs/家装管理/项目往来/家装真实性核销/index.md` 的 div 嵌套结构错误。

### 根因
1. **fix_dup.py 误删行**：删除了 L997-L999（3个中间 div 的闭合标签）
2. **后续修复引入错误**：导致 detail-logic 区域内的 div 链断裂
3. **dlm-wrap 关闭缩进错误**：L993 的 `</div>` 应为 2-space（dlm-wrap 关闭），误为 0-space
4. **kb-sections-4-8 过早关闭**：L996 插入了 kb-sections-4-8 的闭合标签，但 faq/changelog/history 还在它内部

### 修复操作

| 步骤 | 脚本 | 操作 |
|------|------|------|
| 1 | `fix_tr_indent.py` | L986-L989 `<tr>` 行添加 8-space 缩进 |
| 2 | `fix_kb_close.py` | 在错误位置（L997）插入 kb-sections-4-8 关闭 |
| 3 | `fix_kb_close2.py` | 删除 L997 错误插入；末尾插入 kb-sections-4-8 关闭 |
| 4 | `fix_end.py` | 修改 L1464 缩进（2-space→0-space）；删除多余 L1467 |
| 5 | `full_structure_rebuild.py` | L993 缩进修复（0-space→2-space）；删除 L996 |
| 6 | `fix_add_kb_close.py` | 在文件末尾追加 kb-sections-4-8 关闭 |

### 修复后状态
- **Div Balance**: 0 ✅
- **Build**: 7.36s 成功，零错误 ✅
- **index.html**: 105,994 字节（包含全部内容）
- **detail-logic section**: 正确渲染 ✅
- **faq section**: 正确渲染，faq-pad + faq-qa 内部结构完整 ✅
- **changelog/history**: 正确渲染 ✅

### 关键结构（L990-L1000 修复后）
```
L990:       </tbody>
L991:     </table>
L992:   </div>          ← dlm-card 关闭
L993:   </div>          ← dlm-wrap 关闭（2-space ✅）
L994: </div>            ← tab-pad 关闭
L995: </div>            ← detail-logic 关闭
L996: <!-- 报错对照表 -->
L997: <div id="faq">   ← faq 在 kb-sections-4-8 内部 ✅
L998: <div class="faq-pad">
L999: <div class="kl-card"> ← FAQ 表格开始
...
```

### 文件末尾结构（L1462-L1466 修复后）
```
L1462:   </div>          ← history tab-pad 关闭
L1463: </div>            ← history wrapper 关闭
L1464: </div>            ← history div 关闭
L1465: </div>            ← kb-sections-4-8 关闭 ✅
L1466: </div>            ← 文件结束
```

## 构建命令
```cmd
cmd /c "cd /d C:\Users\ARROW\.qclaw\workspace\kb && node_modules\.bin\vitepress.cmd build docs"
```
