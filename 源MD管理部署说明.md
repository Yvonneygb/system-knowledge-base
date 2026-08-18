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

1. 点击顶栏「源MD管理」进入。
2. 选择目标菜单页。
3. 粘贴 AI 生成的 MD 全文（或选择 .md 文件）。
4. 填写更新说明 + 上传密钥。
5. 点「上传并触发自动发布」→ 系统自动合并、写回、触发 Actions。
6. 查看下方「上传日志」确认结果；约 1~2 分钟后线上更新。

## 五、合并规则

- **将更新**：`key-logic`（重点逻辑）、`detail-logic`（界面逻辑）、`permission`、`faq`、`changelog`、`history`
- **将保留**：`biz-intro`（业务介绍）、`biz-flow`（业务流程图）
- 若上传 MD 缺某区块，则保留原页面该区块（不会误删）。
- 每次上传前自动备份旧版到 `upload-backup/{时间戳}/`；git 历史亦可回滚。

## 六、本地验证（不接 GitHub）

不配置 `KB_REPO/KB_GITHUB_TOKEN` 时，上传仅写入本地 `docs/` 目录（供 `npm run dev` 预览），适合先验证效果。
