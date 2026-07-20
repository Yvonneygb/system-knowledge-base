import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 加载 .env 文件（本地开发时读取 API Key）
const envPath = path.resolve(__dirname, '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (key && !process.env[key]) process.env[key] = val
  }
}
import { readFile } from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json({ charset: 'utf-8' }))

const KB_ROOT = path.resolve(__dirname, 'docs')
const HISTORY_FILE = path.resolve(__dirname, 'qa-history.json')

// 云端模式：知识库从 GitHub 动态加载，不写文件
const IS_CLOUD = process.env.KB_GITHUB_URL || process.env.LLM_API_KEY
const KB_GITHUB_URL = process.env.KB_GITHUB_URL || ''

function loadHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'))
    }
  } catch (_) {}
  return []
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8')
}

// 页面URL → MD文件路径映射
function pageToMdFile(pagePath) {
  if (!pagePath) return null
  let decoded = decodeURIComponent(pagePath).replace(/^\/+|\/+$/g, '')
  const mdPath = path.join(KB_ROOT, decoded, 'index.md')
  return fs.existsSync(mdPath) ? mdPath : null
}

// 更新MD文件中 <div id="history"> 内的表格，追加排查记录行（仅本地模式）
function updateHistorySection(mdFilePath, record) {
  if (!mdFilePath || !fs.existsSync(mdFilePath)) return false
  
  let content = fs.readFileSync(mdFilePath, 'utf-8')
  const historyStart = content.indexOf('<div id="history">')
  if (historyStart === -1) return false
  
  const dateStr = record.time || new Date().toLocaleDateString('zh-CN')
  const questionShort = record.question.length > 30 
    ? record.question.substring(0, 30) + '...' : record.question
  
  let rootCause = 'AI排查'
  const answer = record.answer || ''
  const lines = answer.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.match(/^#+\s*根因/) || line.match(/\*+根因\*+/)) {
      const inlineContent = line.replace(/^#+\s*根因[：:]?\s*/, '').replace(/\*+根因\*+[：:]?\s*/, '').replace(/\*+/g, '').trim()
      if (inlineContent && inlineContent !== '根因') {
        rootCause = inlineContent.substring(0, 30)
        break
      }
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].trim()) {
          rootCause = lines[j].replace(/\*+/g, '').replace(/^[-]\s*/, '').replace(/^\d+[.]\s*/, '').substring(0, 30)
          break
        }
      }
      if (rootCause !== 'AI排查') break
    }
    if (line.match(/原因[：:]/) && !line.match(/^#+/) && line.replace(/常见原因[：:]?\s*/,'').trim()) {
      rootCause = line.replace(/常见原因[：:]?\s*/, '').replace(/\*+/g, '').substring(0, 30)
      break
    }
  }
  if (rootCause === 'AI排查' && lines.length > 0) {
    const firstContent = lines.find(l => l.trim() && !l.match(/^#+/))
    if (firstContent) rootCause = firstContent.replace(/\*+/g, '').substring(0, 30)
  }
  
  const newRow = `| ${dateStr} | ${questionShort} | ${rootCause} | — | — |`
  
  const afterHistory = content.substring(historyStart)
  const separatorMatch = afterHistory.match(/\|[-|]+\|\s*\n/)
  if (separatorMatch) {
    const insertPos = historyStart + afterHistory.indexOf(separatorMatch[0]) + separatorMatch[0].length
    content = content.substring(0, insertPos) + newRow + '\n' + content.substring(insertPos)
    fs.writeFileSync(mdFilePath, content, 'utf-8')
    console.log(`✅ 已写入排查记录到: ${mdFilePath}`)
    return true
  }
  
  console.log(`⚠ history区域未找到表格分隔行: ${mdFilePath}`)
  return false
}

function loadKnowledgeBase() {
  const files = []
  const walkDir = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory() && entry.name !== '.vitepress') {
          walkDir(fullPath)
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const relPath = path.relative(KB_ROOT, fullPath).replace(/\\/g, '/')
          files.push({ path: relPath, content })
        }
      }
    } catch (_) {}
  }
  walkDir(KB_ROOT)
  return files
}

// 从 GitHub raw 获取知识库 MD 文件（云端模式）
async function loadKnowledgeBaseFromGitHub(branch = 'master') {
  if (!KB_GITHUB_URL) return []
  
  const match = KB_GITHUB_URL.match(/github\.com\/([^\/]+\/[^\/]+)/)
  if (!match) {
    console.warn('KB_GITHUB_URL 格式不正确，应为 https://github.com/owner/repo')
    return []
  }
  
  const [owner, repo] = match[1].split('/')
  const baseRaw = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`
  
  // 获取仓库文件列表
  const listResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
  
  if (!listResp.ok) {
    console.error(`获取仓库文件列表失败: ${listResp.status}`)
    return []
  }
  
  const tree = await listResp.json()
  const mdFiles = tree.tree.filter(f => f.path.endsWith('.md') && !f.path.includes('.vitepress/'))
  
  const files = []
  for (const f of mdFiles) {
    try {
      const resp = await fetch(`${baseRaw}/${f.path}`)
      if (resp.ok) {
        const content = await resp.text()
        files.push({ path: f.path, content })
      }
    } catch (_) {}
  }
  
  console.log(`从 GitHub 加载了 ${files.length} 个知识库文件`)
  return files
}

function searchRelevantContext(question, kbFiles) {
  const keywords = []
  const rawWords = question.split(/\s+/).filter(w => w.length > 0)
  for (const word of rawWords) {
    if (word.length <= 1) continue
    if (word.length <= 6) keywords.push(word)
    else {
      for (let len = 2; len <= Math.min(4, word.length); len++) {
        for (let i = 0; i <= word.length - len; i++) keywords.push(word.slice(i, i + len))
      }
    }
  }
  const uniqueKws = [...new Set(keywords)].filter(k => k.length >= 2)
  const scored = kbFiles.map(file => {
    let score = 0
    for (const kw of uniqueKws) {
      let pos = 0, count = 0
      while ((pos = file.content.indexOf(kw, pos)) !== -1) { count++; pos += kw.length }
      score += count * kw.length
    }
    return { ...file, score }
  })
  scored.sort((a, b) => b.score - a.score)
  const selected = []
  let totalChars = 0
  for (const item of scored) {
    if (item.score <= 0) break
    if (totalChars + item.content.length > 20000) break
    selected.push(item)
    totalChars += item.content.length
  }
  return selected
}

// 调用 LLM：支持本地 OpenClaw / OpenAI 兼容 API / 云端自定义 URL
async function callLLM(messages) {
  const apiKey = process.env.LLM_API_KEY
  const baseUrl = process.env.LLM_BASE_URL
  const model = process.env.LLM_MODEL

  if (!apiKey) {
    throw new Error('LLM_API_KEY 未配置。请在 Railway/Render 等平台设置环境变量 LLM_API_KEY')
  }

  const endpoint = baseUrl
    ? `${baseUrl.replace(/\/$/, '')}/chat/completions`
    : 'http://127.0.0.1:64856/v1/chat/completions'
  const modelName = model || 'openclaw'

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ model: modelName, messages, temperature: 0.3, max_tokens: 2048, stream: false })
  })

  if (!resp.ok) {
    const text = await resp.text()
    console.error(`LLM API error: ${resp.status} body: ${text.substring(0, 500)}`)
    throw new Error(`LLM API 错误 (${resp.status})：${text.substring(0, 100)}`)
  }

  const data = await resp.json()
  return data.choices?.[0]?.message?.content || '无法获取回答'
}

// 知识库加载（启动时一次性）
let kbFiles = []
async function initKnowledgeBase() {
  if (IS_CLOUD && KB_GITHUB_URL) {
    kbFiles = await loadKnowledgeBaseFromGitHub()
  } else {
    kbFiles = loadKnowledgeBase()
    console.log(`本地知识库文件数: ${kbFiles.length}`)
  }
}
initKnowledgeBase()

// 问答接口
app.post('/api/qa', async (req, res) => {
  try {
    const { question, page } = req.body
    if (!question) return res.json({ error: '请输入问题' })
    
    const relevantFiles = searchRelevantContext(question, kbFiles)
    let contextText = relevantFiles.length > 0
      ? relevantFiles.map(f => `--- 文档: ${f.path} ---\n${f.content}`).join('\n\n')
      : kbFiles.map(f => `--- 文档: ${f.path} ---\n${f.content}`).join('\n\n').slice(0, 20000)
    
    const answer = await callLLM([
      { role: 'system', content: `你是一个系统知识库的智能问答助手。回答必须基于以下知识库内容。\n\n知识库内容：\n${contextText}\n\n回答要求：1.基于知识库内容准确回答 2.涉及排查步骤给出具体SQL 3.无信息时明确告知 4.回答简洁实用` },
      { role: 'user', content: question }
    ])
    
    const record = {
      question, answer,
      sources: relevantFiles.map(f => f.path),
      time: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
      page: page || ''
    }
    
    // 保存到历史JSON文件（云端也保存，用于参考）
    const history = loadHistory()
    history.push(record)
    saveHistory(history)
    
    // 本地模式：回写到 MD 文件的 history 区域
    if (!IS_CLOUD && page) {
      const mdFile = pageToMdFile(page)
      if (mdFile) updateHistorySection(mdFile, record)
    }
    
    res.json({ answer, sources: relevantFiles.map(f => f.path) })
  } catch (err) {
    console.error('QA API error:', err)
    res.json({ error: `问答服务异常: ${err.message}` })
  }
})

app.get('/api/qa/history', (req, res) => res.json(loadHistory()))
app.post('/api/qa/history', (req, res) => {
  const record = req.body
  if (!record?.question) return res.json({ error: '缺少必要字段' })
  if (!record.time) record.time = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  const history = loadHistory()
  history.push(record)
  saveHistory(history)
  if (!IS_CLOUD && record.page) {
    const mdFile = pageToMdFile(record.page)
    if (mdFile) updateHistorySection(mdFile, record)
  }
  res.json({ ok: true, count: history.length })
})
app.delete('/api/qa/history', (req, res) => { saveHistory([]); res.json({ ok: true }) })
app.get('/api/kb-list', (req, res) => { res.json(kbFiles.map(f => ({ path: f.path, size: f.content.length }))) })

// 健康检查
app.get('/health', (req, res) => res.json({ status: 'ok', kbFiles: kbFiles.length }))

const PORT = process.env.PORT || 3456
app.listen(PORT, '0.0.0.0', () => {
  console.log(`知识库问答 API 服务启动: http://0.0.0.0:${PORT}`)
  console.log(`模式: ${IS_CLOUD ? '云端（从 GitHub 加载知识库）' : '本地模式'}`)
  if (IS_CLOUD) console.log(`GitHub 仓库: ${KB_GITHUB_URL}`)
  console.log(`历史记录文件: ${HISTORY_FILE}`)
})
