# 本机运行系统知识库（127.0.0.1）

把知识库跑在你自己的电脑上，完全不受 CloudStudio 沙箱「空闲回收 / 未运行」影响，永远在线。

## 前提

- 已安装 **Node.js 22+**（与沙箱一致；`node -v` 确认）
- 有 npm（Node 自带）
- 能联网（首次 `npm install` 需拉依赖）

## 步骤

1. 把本工程目录（`system-knowledge-base/`）下载到本机任意位置并解压。
2. 进入目录，安装依赖：

   ```bash
   cd system-knowledge-base
   npm install
   ```

3. 一键启动（构建 + 自带静态服务锁定 8000）：

   ```bash
   npm run dev
   ```

   看到 `✅ 本地预览已启动：http://127.0.0.1:8000/system-knowledge-base/` 即成功。

4. 浏览器打开：

   ```
   http://127.0.0.1:8000/system-knowledge-base/家装管理/家装往来/家装核销发票上传/
   ```

   > 直接打开 `http://127.0.0.1:8000/` 会自动跳转到 `/system-knowledge-base/`。

## 说明

- `npm run dev` = `vitepress build docs` + `node scripts/serve-local.mjs`。
  之所以不用 VitePress 自带的 `vitepress dev`，是因为当前 alpha 版本（v1.0.0-alpha.28）**完全忽略 dev 端口配置**，实测始终起在 5173/5174；改用「构建后由自带 Node 静态服务器托管」可 100% 锁定 8000。
- 想换端口：`PORT=9000 npm run dev`（服务会监听 9000）。
- 改了 `docs/` 下的文档后，重新执行 `npm run dev` 即可看到新内容（无热更新，需手动重启）。
- 若只想构建不启动服务：`npm run build`（产物在 `docs/.vitepress/dist`）。

## 常见问题

- **端口被占用**：关掉占用 8000 的程序，或用 `PORT=其他端口 npm run dev`。
- **`npm install` 很慢/失败**：检查网络；可换国内镜像 `npm config set registry https://registry.npmmirror.com`。
- **打开是空白/404**：确认 URL 带 `/system-knowledge-base/` 基路径；若访问根路径会自动跳转。
