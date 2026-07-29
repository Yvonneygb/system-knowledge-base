// 本地静态预览服务器：固定监听 8000（可用 PORT 环境变量覆盖），
// 用于在本机以 127.0.0.1 访问 VitePress 构建产物（base = /system-knowledge-base/）。
// 不依赖 VitePress 的 dev 端口逻辑（该 alpha 版本无法固定端口），因此 100% 稳定。
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', 'docs', '.vitepress', 'dist')
const PORT = Number(process.env.PORT) || 8000
const BASE = '/system-knowledge-base/'

if (!fs.existsSync(ROOT)) {
  console.error(`[serve-local] 未找到构建产物：${ROOT}\n请先执行：npm run build`)
  process.exit(1)
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json'
}

function send(res, filePath) {
  const ext = path.extname(filePath).toLowerCase()
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  if (urlPath === '/') {
    res.writeHead(302, { 'Location': BASE })
    return res.end()
  }
  if (!urlPath.startsWith(BASE)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    return res.end(`请在 ${BASE} 路径下访问本站。`)
  }
  let rel = urlPath.slice(BASE.length).replace(/^\/+/, '')
  if (rel === '' || rel.endsWith('/')) rel += 'index.html'
  let filePath = path.join(ROOT, rel)

  // 目录穿越防护
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403); return res.end('Forbidden')
  }

  const tryFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile()
  if (tryFile(filePath)) return send(res, filePath)
  if (!path.extname(rel) && tryFile(filePath + '.html')) return send(res, filePath + '.html')
  // SPA / 未知路由回退到首页
  return send(res, path.join(ROOT, 'index.html'))
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ 本地预览已启动：http://127.0.0.1:${PORT}${BASE}`)
  console.log(`   目标页：http://127.0.0.1:${PORT}${BASE}家装管理/家装往来/家装核销发票上传/\n`)
})
