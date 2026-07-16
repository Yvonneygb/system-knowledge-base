<template>
  <div class="qa-container">
    <div class="qa-header">
      <h3>💡 系统知识库智能问答</h3>
      <p class="qa-desc">基于当前模块全部业务逻辑，AI 实时检索并回答你的问题</p>
    </div>

    <!-- 历史问答记录 -->
    <div v-if="qaHistory.length > 0" class="qa-history">
      <div v-for="(item, index) in qaHistory" :key="index" class="qa-item">
        <div class="qa-question">
          <span class="qa-icon q">Q</span>
          <span class="qa-text">{{ item.question }}</span>
        </div>
        <div class="qa-answer">
          <span class="qa-icon a">A</span>
          <div class="qa-text" v-html="renderMarkdown(item.answer)"></div>
          <div v-if="item.sources && item.sources.length > 0" class="qa-sources">
            <span class="source-label">参考文档：</span>
            <span v-for="(src, i) in item.sources" :key="i" class="source-tag">{{ src }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载中提示 -->
    <div v-if="isLoading" class="qa-loading">
      <div class="qa-spinner"></div>
      <span>AI 正在检索知识库并分析...</span>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMsg" class="qa-error">
      <span>{{ errorMsg }}</span>
      <button @click="errorMsg = ''" class="qa-error-close">×</button>
    </div>

    <!-- 输入区域 -->
    <div class="qa-input-area">
      <textarea
        v-model="question"
        placeholder="输入你的问题，如：核销提交报错可核销数量不足怎么排查？出库单的可选条件有哪些？"
        rows="3"
        @keydown.enter.ctrl="submitQuestion"
        class="qa-input"
      ></textarea>
      <div class="qa-actions">
        <button @click="submitQuestion" :disabled="isLoading || !question.trim()" class="qa-btn qa-btn-primary">
          {{ isLoading ? '分析中...' : '🤖 AI 提问' }}
        </button>
        <button @click="clearHistory" v-if="qaHistory.length > 0" class="qa-btn qa-btn-secondary">清空记录</button>
      </div>
    </div>

    <!-- 提示 -->
    <div class="qa-tip">
      <kbd>Ctrl</kbd> + <kbd>Enter</kbd> 快捷提交 · 基于 AI 大模型 + 知识库全文检索
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const question = ref('')
const qaHistory = ref([])
const isLoading = ref(false)
const errorMsg = ref('')

// API 地址（QA Server 代理）
const API_URL = 'http://localhost:3456/api/qa'

// 简易 Markdown 渲染（表格、代码块、加粗）
function renderMarkdown(text) {
  let html = text
    // 代码块
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="qa-code"><code>$2</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code class="qa-inline-code">$1</code>')
    // 加粗
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // 表格（简单处理）
    .replace(/\n\|(.+)\|\n\|[-| :]+\|\n((\|.+\|\n)+)/g, (match) => {
      const lines = match.trim().split('\n')
      const headers = lines[0].split('|').filter(c => c.trim())
      const rows = lines.slice(2).map(l => l.split('|').filter(c => c.trim()))
      let table = '<table class="qa-table"><thead><tr>'
      headers.forEach(h => table += `<th>${h.trim()}</th>`)
      table += '</tr></thead><tbody>'
      rows.forEach(r => {
        table += '<tr>'
        r.forEach(c => table += `<td>${c.trim()}</td>`)
        table += '</tr>'
      })
      table += '</tbody></table>'
      return table
    })
    // 换行
    .replace(/\n/g, '<br>')
  return html
}

async function submitQuestion() {
  if (!question.value.trim() || isLoading.value) return

  isLoading.value = true
  errorMsg.value = ''
  const q = question.value.trim()

  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    })

    if (!resp.ok) {
      throw new Error(`API 返回错误: ${resp.status}`)
    }

    const data = await resp.json()

    if (data.error) {
      errorMsg.value = data.error
    } else {
      qaHistory.value.push({
        question: q,
        answer: data.answer,
        sources: data.sources || []
      })
    }
  } catch (err) {
    errorMsg.value = `问答服务连接失败: ${err.message}。请确认 QA Server 是否启动（cd knowledge-base && node qa-server.js）`
  }

  question.value = ''
  isLoading.value = false
}

function clearHistory() {
  qaHistory.value = []
}
</script>

<style scoped>
.qa-container {
  margin-top: 48px;
  padding: 24px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.qa-header h3 {
  margin: 0 0 4px 0;
  font-size: 20px;
  color: var(--vp-c-text-1);
}
.qa-desc {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.qa-history {
  margin-bottom: 16px;
}
.qa-item {
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.qa-question {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}
.qa-answer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.qa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}
.qa-icon.q {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.qa-icon.a {
  background: #10b981;
  color: #fff;
}
.qa-text {
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.qa-sources {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}
.source-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.source-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.qa-loading {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  color: var(--vp-c-text-2);
}
.qa-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.qa-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 6px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 14px;
}
.qa-error-close {
  background: none;
  border: none;
  color: #dc2626;
  font-size: 18px;
  cursor: pointer;
}
.qa-input-area {
  margin-top: 8px;
}
.qa-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
}
.qa-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(4, 153, 253, 0.1);
}
.qa-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}
.qa-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.qa-btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.qa-btn-primary:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}
.qa-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.qa-btn-secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}
.qa-tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
kbd {
  padding: 2px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  background: var(--vp-c-bg);
  font-size: 12px;
}
.qa-code {
  background: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
}
.qa-inline-code {
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
}
.qa-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 13px;
}
.qa-table th, .qa-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 6px 10px;
  text-align: left;
}
.qa-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}
</style>
