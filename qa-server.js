import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json({ charset: 'utf-8' }))

const KB_ROOT = path.resolve(__dirname, 'docs')
const HISTORY_FILE = path.resolve(__dirname, 'qa-history.json')

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

// 更新MD文件中 <div id="history"> 内的表格，追加排查记录行
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
    // 匹配"## 根因"或"**根因**"标题
    if (line.match(/^#+\s*根因/) || line.match(/\*+根因\*+/)) {
      // 检查本行是否有实质内容（不只是"根因"二字）
      const inlineContent = line.replace(/^#+\s*根因[：:]?\s*/, '').replace(/\*+根因\*+[：:]?\s*/, '').replace(/\*+/g, '').trim()
      if (inlineContent && inlineContent !== '根因') {
        rootCause = inlineContent.substring(0, 30)
        break
      }
      // 标题后跳过空行，取下一非空行
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].trim()) {
          rootCause = lines[j].replace(/\*+/g, '').replace(/^[-]\s*/, '').replace(/^\d+[.]\s*/, '').substring(0, 30)
          break
        }
      }
      if (rootCause !== 'AI排查') break
    }
    // 匹配"原因："行（排除仅含"常见原因："的空标题）
    if (line.match(/原因[：:]/) && !line.match(/^#+/) && line.replace(/常见原因[：:]?\s*/,'').trim()) {
      rootCause = line.replace(/常见原因[：:]?\s*/, '').replace(/\*+/g, '').substring(0, 30)
      break
    }
  }
  // 如果没提取到根因，取回答的第一行摘要
  if (rootCause === 'AI排查' && lines.length > 0) {
    const firstContent = lines.find(l => l.trim() && !l.match(/^#+/))
    if (firstContent) rootCause = firstContent.replace(/\*+/g, '').substring(0, 30)
  }
  
  const newRow = `| ${dateStr} | ${questionShort} | ${rootCause} | — | — |`
  
  // 在history区域内找到 |------|------| 分隔行，在其下一行插入新记录
  const afterHistory = content.substring(historyStart)
  const separatorMatch = afterHistory.match(/\|[-|]+\|\s*\n/)
  if (separatorMatch) {
    const insertPos = historyStart + afterHistory.indexOf(separatorMatch[0]) + separatorMatch[0].length
    // 在分隔行之后、现有数据行之前插入新行（最新的排在前）
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
  }
  walkDir(KB_ROOT)
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

async function callLLM(messages) {
  const baseUrl = 'http://127.0.0.1:64856'
  const resp = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a640245d914c76aaa324d4d32feee6604de1b5ee2c43429f' },
    body: JSON.stringify({ model: 'openclaw', messages, temperature: 0.3, max_tokens: 2048, stream: false })
  })
  if (!resp.ok) {
    const text = await resp.text()
    console.error(`LLM API error: ${resp.status} body: ${text.substring(0, 500)}`)
    throw new Error(`LLM API error: ${resp.status} | ${text.substring(0, 100)}`)
  }
  const data = await resp.json()
  return data.choices?.[0]?.message?.content || '无法获取回答'
}

// 问答接口
app.post('/api/qa', async (req, res) => {
  try {
    const { question, page } = req.body
    if (!question) return res.json({ error: '请输入问题' })
    
    const kbFiles = loadKnowledgeBase()
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
    
    // 保存到历史JSON文件
    const history = loadHistory()
    history.push(record)
    saveHistory(history)
    
    // ★ 核心功能：将排查记录回写到当前页面的"历史排查记录"tab
    if (page) {
      const mdFile = pageToMdFile(page)
      if (mdFile) updateHistorySection(mdFile, record)
      else console.log(`⚠ 未找到对应MD文件: ${page}`)
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
  if (record.page) { const mdFile = pageToMdFile(record.page); if (mdFile) updateHistorySection(mdFile, record) }
  res.json({ ok: true, count: history.length })
})
app.delete('/api/qa/history', (req, res) => { saveHistory([]); res.json({ ok: true }) })
app.get('/api/kb-list', (req, res) => { res.json(loadKnowledgeBase().map(f => ({ path: f.path, size: f.content.length }))) })

const kbCount = loadKnowledgeBase().length
console.log(`知识库文件数: ${kbCount}`)
const PORT = 3456
app.listen(PORT, '0.0.0.0', () => {
  console.log(`知识库问答 API 服务启动: http://localhost:${PORT}`)
  console.log(`历史记录文件: ${HISTORY_FILE}`)
})
