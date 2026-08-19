# 源MD管理 · 部署与使用说明

本功能用于将「代码分析 AI 工具生成的最新 MD」上传到知识库，自动**只更新源码分析区块**并**保留人工整理的业务介绍/流程图**，随后自动触发 GitHub Pages 发布。

## 一、架构

```
浏览器【源MD管理】页 ──POST /api/upload-md──▶ qa-server(云端后端)
        │
        ▼ 区块级合并(保留biz-intro/biz-flow, 替换key-logic等)
        ▼ GitHub Contents API 写回 master 分支
        ▼ GitHub Actions 自动构建 → 部署 GitHub Pages
```

## 二、部署后端（Railway）

项目已含 `railway.json` + `Dockerfile`（镜像启动 qa-server.js）。在 Railway 新建项目并配置：

| 环境变量 | 必填 | 说明 |
|---------|------|------|
| `KB_REPO` | ✅ | 如 `Yvonneygb/system-knowledge-base`（写回目标仓库） |
| `KB_BRANCH` | | 默认 `master` |
| `KB_GITHUB_TOKEN` | ✅ | 有仓库**写权限**的 GitHub PAT |
| `KB_UPLOAD_SECRET` | ✅ | 上传接口共享密钥（前端上传时必须携带） |
| `LLM_API_KEY` | 可选 | AI 问答需要时填 |
| `KB_GITHUB_URL` | 可选 | 云端拉取知识库（问答用） |
| `PORT` | | 默认 `3456` |

> ⚠️ `KB_GITHUB_TOKEN` 只存于 Railway 环境变量，**切勿提交到仓库或写进前端**。

## 三、前端接入后端地址

静态页（GitHub Pages）通过 `window.KB_UPLOAD_URL` 定位后端：

- 构建时注入：设置环境变量 `VITE_UPLOAD_API_URL=https://你的railway域名` 后构建。
- 未设置时：缺省复用 `VITE_QA_API_URL`（同一后端），本地开发 fallback 到 `http://localhost:3456`。

## 四、使用流程

页面提供 **两种使用方式**，按需选择：

### 方式 A：单菜单上传（精修一个页面）

1. 点击顶栏「源MD管理」进入。
2. 在「菜单树」中点击目标三级菜单右侧的 **「上传」** 按钮，展开单页详情面板。
3. 在面板中粘贴 AI 生成的 MD 全文，或点击「选择 .md 文件」自动载入。
4. 可选填写「更新说明」。
5. （可选）点「页面内预览」实时查看 MD 渲染效果。
6. 填写顶部「上传密钥」（一次性输入，会话内复用）。
7. 点「🚀 上传并触发自动发布」→ 系统自动合并、写回、触发 Actions。
8. 约 1~2 分钟后线上更新；可在下方「上传日志」中查看结果。

### 方式 B：批量上传（一次性更新多个页面）

1. 准备多个 `.md` 文件，**文件名必须为 `一级-二级-三级.md`**，例如：
   - `工程管理-项目交付-工程要货订单.md`
   - `门店管理-门店装修-门店验收与报销单.md`
2. 在页面顶部「批量上传」区点击「Choose Files」多选。
3. 系统按文件名解析路径并显示匹配结果：
   - 🟢 绿色路径：可匹配的菜单
   - 🔴 红色警告：文件名不符合规则（需三级），将被跳过
4. 点「🚀 开始批量上传」，系统逐个提交更新并实时显示每个文件的状态（✅/❌）。
5. 全部完成后查看下方「上传日志」获取汇总。

> 💡 提示：批量上传时每个文件的更新说明会自动填充为 `批量上传（文件名）`，方便回溯。

## 五、合并规则

- **将更新**：`key-logic`（重点逻辑）、`detail-logic`（界面逻辑）、`permission`、`faq`、`changelog`、`history`
- **将保留**：`biz-intro`（业务介绍）、`biz-flow`（业务流程图）
- 若上传 MD 缺某区块，则保留原页面该区块（不会误删）。
- 每次上传前自动备份旧版到 `upload-backup/{时间戳}/`；git 历史亦可回滚。

## 六、本地验证（不接 GitHub）

不配置 `KB_REPO/KB_GITHUB_TOKEN` 时，上传仅写入本地 `docs/` 目录（供 `npm run dev` 预览），适合先验证效果。
