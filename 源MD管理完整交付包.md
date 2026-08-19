# 源MD管理 · 完整交付包

本文件汇总「源MD管理」涉及的全部规范、技能、源码、配置、部署信息，可作为交接/复刻的完整参考资料。

---

## 一、本次任务全流程（截至 `bdd5191`）

```
0fe1c0e refactor: 拆分'上传'与'更新'为两个独立动作
9cd57ea fix:     提升上传交互反馈，避免'点击没反应'
99577d6 docs:    更新源MD管理使用流程
9fac5bf refactor: 预览改为新浏览器窗口打开, 移除行内预览模块
b88497a refactor: 行内管理 - 弹出选择窗口, 右侧显示文件名, 点击预览
07b4b2c feat:    新增【源MD管理】—— AI生成MD上传并自动发布
bdd5191 feat:    上传成功后本地持久化, 刷新网页不再丢失
```

---

## 二、核心交互规范（Skill）

### 2.1 「上传」 vs 「更新」 两段式

| 动作 | 含义 | 是否连后端 |
|------|------|-----------|
| **上传** | 把 `.md` 文件载入浏览器本地（暂存），不连后端 | ❌ |
| **更新** | 真正调用后端 `POST /api/upload-md` 写回 GitHub 触发自动发布 | ✅ |

### 2.2 行内管理交互

```
[三级菜单行]
  📄 菜单名  一级/二级/三级   [上传]      ← 未上传
  📄 菜单名  一级/二级/三级   [📄文件名] [🔄更新] [✕] [更新说明]   ← 已上传
              ↑ 点击 [📄文件名] → window.open 新窗口预览 MD 渲染
```

- 菜单行点击「上传」 → 动态创建 `<input type="file">` → 自动 click() → 系统文件选择窗口弹出
- 选择文件 → FileReader 读为文本 → 写入 `loadedFiles[path]` → **自动 saveToStorage()** → 行内显示文件名标签
- 点击文件名 → `window.open('', '_blank', 'width=960,height=720')` → 新窗口写入带 markdown-it 样式的 HTML 预览
- 「更新」 → 调后端 → 写回 GitHub → 触发 Actions → 自动部署
- 「✕」移除 → `delete loadedFiles[path]` + `saveToStorage()`

### 2.3 批量上传命名规范

**文件名必须为 `一级-二级-三级.md`**（用 `-` 分隔）：

```
✅ 工程管理-项目交付-工程要货订单.md
✅ 门店管理-门店装修-门店验收与报销单.md
❌ product-list.md          → 无法匹配菜单
❌ 工程管理_项目交付_订单.md  → 当前版本用 `-`，可后续支持 `_`
```

匹配流程：`base.split('-')` 取 3 段 → `一级/二级/三级` → 查 `index` Map（构建时一次性建立） → 命中则载入对应菜单。

---

## 三、本地持久化规范（刷新不丢）

### 3.1 存储位置
- 浏览器 `localStorage`
- Key：`smm_loaded_files_v1`
- 数据结构：
```js
{
  files: {
    "产品中心/产品资料/产品列表": { fileName: "产品列表.md", content: "# ...\n..." }
  },
  notes: {
    "产品中心/产品资料/产品列表": "核销列表新增筛选项"
  }
}
```

### 3.2 触发时机
- `uploadFor` 载入文件成功 → `saveToStorage()`
- `notes[path]` 输入框 `@input` → `saveToStorage()`
- `removeLoaded` 移除 → `saveToStorage()`
- `onMounted` → `loadFromStorage()` 恢复

### 3.3 容量与降级
- 默认容量 ~5MB。MD 文件通常 < 100KB，无问题。
- 超限 `try/catch` 捕获 → `console.warn`，不阻塞操作。

---

## 四、后端 API 规范（qa-server.js）

### 4.1 路由总览

| 方法 | 路径 | 鉴权 | 用途 |
|------|------|------|------|
| POST | `/api/qa` | 无 | AI 问答（不在源MD管理流程） |
| GET  | `/api/qa/history` | 无 | 问答历史 |
| POST | `/api/qa/history` | 无 | 追加问答历史 |
| GET  | `/api/kb-list` | 无 | 知识库文件列表 |
| **POST** | **`/api/upload-md`** | **`X-Upload-Secret`** | **源MD上传（合并+写回）** |
| **GET**  | **`/api/upload-log`** | **`X-Upload-Secret`** | **最近上传日志** |

### 4.2 `POST /api/upload-md` 详细规范

**请求：**
```json
{
  "pagePath": "/一级/二级/三级/",
  "content": "完整的 MD 源内容（VitePress 页面全文，含 <div id=\"key-logic\"> 等区块）",
  "note": "可选，更新说明（写入 git commit message）"
}
```

**响应（成功）：**
```json
{
  "ok": true,
  "file": "一级/二级/三级/index.md",
  "changedSections": ["key-logic", "detail-logic", "faq", "history"],
  "sha": "github commit sha",
  "log": { "time": "2026/8/19 11:01:01", ... }
}
```

**错误：**
- 400：`缺少 pagePath 或 content` / `content 内容过短或格式不正确` / `合并后 div 开闭不平衡`
- 401：`未配置 KB_UPLOAD_SECRET` / `密钥不正确`
- 500：`上传失败: <err.message>`

### 4.3 区块级合并规则（`mergeBySections`）

**核心原则：保留人工整理，只替换源码分析。**

```
SOURCE_SECTIONS = ['key-logic', 'detail-logic', 'permission',
                   'faq', 'faq-qa', 'changelog', 'history']
PROTECTED_SECTIONS = ['biz-intro', 'biz-flow']  // 人工整理，永远不动
```

**合并算法（src/qa-server.js:395）：**
1. 用 `extractSections(content)` 扫描 `<div id="X">...</div>` 的绝对位置（含嵌套平衡）
2. 从后往前遍历 SOURCE_SECTIONS → 在 oldContent 中查找对应 id → 用 newContent 的对应区块内容替换
3. 从后往前替换避免位置偏移
4. `biz-flow` 后追加新的 SOURCE_SECTIONS 区块（按顺序）
5. `checkDivBalance()` 校验 `<div>` 开闭平衡，否则 400 拒绝

### 4.4 备份与日志

- 每次上传前：备份旧版到 `upload-backup/{ISO时间戳}-{pagePath}/index.md`
- 日志：`upload-log.json`，保留最近 200 条
- 无 `KB_GITHUB_TOKEN`：仅写本地 `docs/`，不触发发布（适合先验证）

---

## 五、环境变量与部署

### 5.1 必需环境变量（`qa-server.env.example`）

```bash
# ===== 源MD管理上传配置 =====
KB_REPO=Yvonneygb/system-knowledge-base        # 写回目标仓库
KB_BRANCH=master                               # 写回分支
KB_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx        # 有写权限的 PAT
KB_UPLOAD_SECRET=your-upload-secret-here        # 前端上传时必须携带

# ===== 服务配置 =====
PORT=3456
NODE_ENV=production
```

### 5.2 前端注入（构建时）

```bash
VITE_UPLOAD_API_URL=https://your-railway-app.up.railway.app
```

→ `docs/.vitepress/theme/index.js` 注入 `window.KB_UPLOAD_URL = import.meta.env.VITE_UPLOAD_API_URL`
→ 组件 `getApiBase()` 读取 `window.KB_UPLOAD_URL || window.KB_API_URL`

### 5.3 Railway 部署

仓库含 `railway.json` + `Dockerfile`，镜像启动 `qa-server.js`。Railway 控制台配置上述环境变量即可。

### 5.4 PAT 权限要求

- `repo` (Full control of private repositories) ��少需要
- 或经典 PAT：`public_repo` + `contents:write`（按需）
- 不需要 admin/org 权限

### 5.5 GitHub Actions（自动发布）

`.github/workflows/deploy-pages.yml`：master 分支 push → `npm run build` → 部署 `docs/.vitepress/dist` 到 Pages。
源MD管理上传后 → `writeToGitHub` → `git push master` → 自动触发 → ~1分钟线上更新。

---

## 六、关键源码文件

| 文件 | 行数 | 角色 |
|------|------|------|
| `docs/.vitepress/theme/SourceMdManager.vue` | 601 | 前端：菜单树 + 上传 + 预览 + 更新 |
| `qa-server.js` | 611 | 后端：合并 + 写回 + 日志 |
| `docs/源MD管理/index.md` | - | 页面入口：`<SourceMdManager />` |
| `docs/.vitepress/theme/KbLayout.vue` | - | 顶栏菜单加"源MD管理"入口 |
| `源MD管理部署说明.md` | - | 用户侧使用/部署文档 |

---

## 七、SOP（标准操作流程）

### 7.1 用户视角：上传并更新一个菜单

1. 进入 `https://Yvonneygb.github.io/system-knowledge-base/源MD管理/`
2. 顶部填写「🔑 更新密钥」（一次性输入，会话内复用）
3. 在菜单树中找到目标菜单行 → 点该行右侧的「上传」
4. 系统弹出文件选择窗口 → 选择 `一级-二级-三级.md` → 自动载入
5. 行内右侧出现：绿色文件名标签 + 「🔄 更新」+ 「✕」+「更新说明」
6. 点击文件名 → 新窗口预览 MD 渲染（可关闭不阻塞）
7. 确认无误 → 点「🔄 更新」 → 后端合并 + 写回 + 触发 Actions
8. ~1分钟线上更新；可点文件名反复预览确认

### 7.2 管理员视角：批量更新多个菜单

1. 准备多个 `.md` 文件，命名严格按 `一级-二级-三级.md`
2. 在页面顶部「📦 批量上传」区多选
3. 系统按文件名解析路径，显示匹配结果（🟢命中/🔴未命中）
4. 每个命中项行内出现"已载入暂存，待更新"+单条「更新」按钮
5. 点「🔄 更新全部（提交）」→ 逐个提交
6. 失败项会显示 ❌ 错误，可单独重试

### 7.3 开发者视角：本地调试

```bash
# 本地启动后端（不写 GitHub）
KB_UPLOAD_SECRET=test PORT=3456 node qa-server.js

# 本地启动前端
VITE_UPLOAD_API_URL=http://localhost:3456 npm run dev
```

无 `KB_GITHUB_TOKEN` 时上传仅写本地 `docs/`，可立即 `npm run dev` 验证。

---

## 八、测试覆盖

| 场景 | 验证方法 | 结果 |
|------|---------|------|
| 上传按钮点击弹窗 | Playwright 真实点击 | ✅ 动态创建 input → 系统弹窗 |
| 文件载入暂存 | setInputFiles | ✅ 文件标签出现在行内 |
| 点击文件名新窗口预览 | popup 事件 | ✅ 完整渲染 H1/代码/表格 |
| 行内预览移除 | grep 检查 | ✅ 无 `.smm-preview-body kb-md-preview` |
| 刷新后保留 | localStorage 持久化 | ✅ 上传后刷新仍显示文件名 |
| 批量命名匹配 | 4 个不同命名测试 | ✅ 3 命中 + 1 未命中 |
| 提交按钮反馈 | 缺密钥/缺 MD 提示 | ✅ 给出具体原因 |
| 构建 | `npx vitepress build docs` | ✅ 16-33s 完成 |
| 推送 | `git push origin master` | ✅ Actions 自动发布 |

---

## 九、已知限制与后续改进

| 项 | 说明 |
|-----|------|
| localStorage 容量 | 默认 5MB，单文件 MD 一般 < 100KB 不影响；超限会 warn 不阻塞 |
| 浏览器/设备隔离 | localStorage 仅当前浏览器；换浏览器需重新上传 |
| 写回知识库 | 仍需"更新"按钮触发，本地持久化 ≠ 知识库持久化 |
| GitHub 速率 | 频繁上传受 GitHub API 限制（5000 次/小时） |
| `.md` 大小 | markdown-it 渲染可能慢；建议单文件 < 1MB |
| KB_UPLOAD_SECRET | 仅前端密码验证，非加密；适合内网/团队使用 |
| 批量命名分隔符 | 当前仅支持 `-`；可扩展支持 `_`、`_` 优先级 |

---

## 十、常见问题（FAQ）

**Q: 上传后刷新没了？**
A: 升级前版本问题；当前版本已用 localStorage 持久化（`bdd5191`）。

**Q: 点更新报"Failed to fetch"？**
A: 后端（Railway）未部署或前端未注入 `VITE_UPLOAD_API_URL`。

**Q: 上传成功但线上没变化？**
A: 检查 GitHub Actions 日志，QA 上传 → git push → Actions 构建 → Pages 部署，全链路 ~1 分钟。

**Q: 改名菜单怎么办？**
A: 后端按 `一级/二级/三级/index.md` 路径写回，改名需手动迁移。

**Q: 撤销一次错误上传？**
A: `upload-backup/{时间戳}/index.md` 保留旧版，可手动 `git revert` 或恢复。

**Q: 本地调试无法上传？**
A: 不配置 `KB_GITHUB_TOKEN` 时仅写本地 `docs/`，可验证上传流程但不会真正部署。

---

## 十一、提交记录（按时间倒序）

```
bdd5191 feat(source-md): 上传成功后本地持久化, 刷新网页不再���失
9fac5bf refactor(source-md): 预览改为新浏览器窗口打开, 移除行内预览模块
b88497a refactor(source-md): 行内管理 - 弹出选择窗口, 右侧显示文件名, 点击预览
0fe1c0e refactor(source-md): 拆分'上传'与'更新'为两个独立动作
9cd57ea fix(source-md): 提升上传交互反馈，避免'点击没反应'
99577d6 docs(部署说明): 更新源MD管理使用流程，反映树状布局+批量上传
07b4b2c feat: 新增【源MD管理】—— AI生成MD上传并自动发布
```

---

## 十二、快速命令速查

```bash
# 本地开发
VITE_UPLOAD_API_URL=http://localhost:3456 npm run dev:hmr

# 构建
npx vitepress build docs

# 启动后端（测试用）
KB_UPLOAD_SECRET=test PORT=3456 node qa-server.js

# 推送（推送失败时检查 /etc/hosts 是否被恢复）
cat /etc/hosts | grep github
# 若没有: echo "140.82.113.3 github.com" >> ~/.user_hosts && cat > /etc/hosts...
git push origin master
```

---

> 维护者：本文件随源MD管理功能演进持续更新。新增功能时，请在「提交记录」「测试覆盖」「已知限制」三处补充。