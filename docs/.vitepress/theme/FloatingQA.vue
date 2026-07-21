<template>
  <div class="floating-qa">
    <!-- 悬浮按钮 -->
    <button class="qa-fab" @click="isOpen = !isOpen" :class="{ active: isOpen }">
      <svg v-if="!isOpen" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
      <svg v-if="isOpen" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <!-- 问答面板 -->
    <transition name="qa-slide">
      <div class="qa-panel" v-if="isOpen">
        <div class="qa-panel-header">
          <div class="qa-panel-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>
            <span>系统知识库 AI 问答</span>
            <span v-if="!API_URL" class="qa-env-tag">仅本地可用</span>
          </div>
          <span class="qa-panel-desc">
            {{ API_URL ? (API_URL.includes('localhost') ? '基于业务逻辑文档智能检索' : '🤖 云端 AI 问答服务') : '请在本地开发环境（localhost:3456）使用' }}
          </span>
        </div>

        <!-- 历史问答 -->
        <div class="qa-messages" ref="messagesContainer">
          <div v-for="(item, i) in qaHistory" :key="i" class="qa-msg">
            <div class="qa-msg-q">
              <div class="qa-msg-avatar q"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
              <div class="qa-msg-bubble">{{ item.question }}</div>
            </div>
            <div class="qa-msg-meta" v-if="item.time || item.page">
              <span v-if="item.time" class="qa-meta-time">{{ item.time }}</span>
              <span v-if="item.page" class="qa-meta-page">{{ shortPage(item.page) }}</span>
            </div>
            <div class="qa-msg-a">
              <div class="qa-msg-avatar a"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg></div>
              <div class="qa-msg-bubble" v-html="renderMd(item.answer)"></div>
            </div>
            <div v-if="item.sources && item.sources.length" class="qa-msg-sources">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
              <span v-for="s in item.sources" :key="s" class="qa-src-tag">{{ shortSrc(s) }}</span>
            </div>
          </div>

          <div v-if="isLoading" class="qa-msg">
            <div class="qa-msg-a">
              <div class="qa-msg-avatar a"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg></div>
              <div class="qa-msg-bubble loading">
                <div class="qa-dots">
                  <span></span><span></span><span></span>
                </div>
                <span>AI 正在检索分析...</span>
              </div>
            </div>
          </div>

          <div v-if="errorMsg" class="qa-error">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{{ errorMsg }}</span>
            <button @click="errorMsg = ''" class="qa-err-close"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
        </div>

        <!-- 输入区 -->
        <div class="qa-input-wrap">
          <textarea
            v-model="question"
            placeholder="输入问题，如：核销提交报错怎么排查？"
            rows="2"
            @keydown.enter.ctrl="submit"
            class="qa-input"
          ></textarea>
          <div class="qa-input-actions">
            <button @click="submit" :disabled="isLoading || !question.trim()" class="qa-send-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg>
            </button>
            <button @click="clearHistory" v-if="qaHistory.length" class="qa-clear-btn" title="清空记录">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="qa-hint">
          <kbd>Ctrl</kbd>+<kbd>Enter</kbd> 快捷提交 · 回答限定在面板内展示 · 历史自动保存
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue'

const STORAGE_KEY = 'kb-qa-history'
// 优先级：window.KB_API_URL（构建时注入） > localhost
const getApiUrl = () => {
  if (typeof window === 'undefined') return null
  // 云端构建时通过 window.KB_API_URL 注入
  const injected = window.KB_API_URL
  if (injected) return injected
  // 本地开发 fallback
  const host = window.location.hostname
  return (host === 'localhost' || host === '127.0.0.1')
    ? 'http://localhost:3456/api/qa'
    : null
}
const API_URL = getApiUrl()

const isOpen = ref(false)
const question = ref('')
const qaHistory = ref([])
const isLoading = ref(false)
const errorMsg = ref('')
const messagesContainer = ref(null)

// 客户端挂载后从 localStorage 恢复历史记录
onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) qaHistory.value = JSON.parse(saved)
  } catch (_) {}
})

// 持久化问答历史到 localStorage（仅客户端）
watch(qaHistory, (val) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(val)) } catch (_) {}
}, { deep: true })

function shortSrc(path) {
  const decoded = decodeURIComponent(path)
  const parts = decoded.split('/')
  return parts[parts.length - 1].replace('.md', '')
}

function shortPage(page) {
  if (!page) return ''
  // URL 解码处理中文路径
  const decoded = decodeURIComponent(page)
  const parts = decoded.split('/').filter(p => p && p !== 'docs')
  return parts.length > 0 ? parts.join('/') : decoded
}

function renderMd(text) {
  let html = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="qa-md-code"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="qa-md-inline">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
  return html
}

function clearHistory() {
  qaHistory.value = []
  try { localStorage.removeItem(STORAGE_KEY) } catch (_) {}
  // 同步清空后端历史文件（仅本地环境）
  if (API_URL) {
    try { fetch(`${API_URL}/history`, { method: 'DELETE' }) } catch (_) {}
  }
}

async function submit() {
  if (!question.value.trim() || isLoading.value) return

  // 生产环境检测
  if (!API_URL) {
    errorMsg.value = 'AI 问答仅支持本地开发环境使用'
    return
  }

  isLoading.value = true
  errorMsg.value = ''
  const q = question.value.trim()
  const currentPage = window.location.pathname
  question.value = ''

  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ question: q, page: currentPage })
    })
    const data = await resp.json()
    if (data.error) {
      errorMsg.value = data.error
    } else {
      const record = {
        question: q,
        answer: data.answer,
        sources: data.sources || [],
        page: currentPage,
        time: new Date().toLocaleString('zh-CN')
      }
      qaHistory.value.push(record)
      // 同步保存到后端历史文件
      try {
        fetch(`${API_URL}/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(record)
        })
      } catch (_) {}
    }
  } catch (err) {
    errorMsg.value = `连接失败: ${err.message}`
  }

  isLoading.value = false
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.floating-qa {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

/* 悬浮按钮 */
.qa-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #7C3AED;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 16px rgba(124,58,237,0.3);
  transition: all 0.3s ease;
  position: absolute;
  bottom: 0;
  right: 0;
}
.qa-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(124,58,237,0.4);
}
.qa-fab.active {
  background: #6B7280;
}

/* 问答面板 */
.qa-panel {
  position: absolute;
  bottom: 68px;
  right: 0;
  width: 420px;
  max-height: 520px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.qa-slide-enter-active { transition: all 0.3s ease; }
.qa-slide-leave-active { transition: 0.2s ease; }
.qa-slide-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.qa-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }

/* 头部 */
.qa-panel-header {
  padding: 16px 20px;
  background: #F5F7FA;
  border-bottom: 1px solid #E5E7EB;
}
.qa-panel-title {
  font-size: 1rem;
  font-weight: 700;
  color: rgb(17,24,39);
  display: flex;
  align-items: center;
  gap: 8px;
}
.qa-panel-desc {
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 4px;
}
.qa-env-tag {
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(234,88,12,0.1);
  color: #EA580C;
  font-weight: 600;
  margin-left: 6px;
}

/* 消息区 */
.qa-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  max-height: 320px;
  scrollbar-width: thin;
}

.qa-msg { margin-bottom: 16px; }

.qa-msg-q, .qa-msg-a {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

/* 问答元信息（时间、页面） */
.qa-msg-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  padding-left: 38px;
  font-size: 0.7rem;
  color: #9CA3AF;
}
.qa-meta-time::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpolyline points='12 6 12 12 16 14'/%3E%3C/svg%3E") no-repeat center;
  background-size: 12px;
  margin-right: 3px;
  vertical-align: middle;
}
.qa-meta-page::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E") no-repeat center;
  background-size: 12px;
  margin-right: 3px;
  vertical-align: middle;
}

.qa-msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  flex-shrink: 0;
}
.qa-msg-avatar.q {
  background: #7C3AED;
  color: #fff;
}
.qa-msg-avatar.a {
  background: #10b981;
  color: #fff;
}

.qa-msg-bubble {
  background: #F5F7FA;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #000;
  max-width: 320px;
  overflow-x: auto;
  word-break: break-word;
}
.qa-msg-a .qa-msg-bubble {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
}

.qa-msg-sources {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  padding-left: 38px;
  font-size: 0.7rem;
  color: #6B7280;
}
.qa-msg-sources i { font-size: 0.65rem; }
.qa-src-tag {
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(124,58,237,0.08);
  color: #7C3AED;
  font-weight: 600;
}

/* 加载动画 */
.qa-msg-bubble.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6B7280;
}
.qa-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7C3AED;
  animation: dot-pulse 1.4s infinite ease-in-out both;
}
.qa-dots span:nth-child(1) { animation-delay: -0.32s; }
.qa-dots span:nth-child(2) { animation-delay: -0.16s; }
@keyframes dot-pulse {
  0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* 错误 */
.qa-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #FEF2F2;
  color: #DC2626;
  font-size: 0.8rem;
  margin-bottom: 8px;
}
.qa-err-close {
  background: none;
  border: none;
  color: #DC2626;
  cursor: pointer;
  font-size: 0.9rem;
}

/* 输入区 */
.qa-input-wrap {
  padding: 12px 20px;
  border-top: 1px solid #E5E7EB;
  background: #FFFFFF;
  display: flex;
  gap: 8px;
  align-items: flex-end;
}
.qa-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.85rem;
  resize: none;
  font-family: "Noto Sans SC", "等线", sans-serif;
  background: #F5F7FA;
  color: #000;
  transition: border-color 0.2s;
}
.qa-input:focus {
  outline: none;
  border-color: #7C3AED;
  background: #FFFFFF;
}

.qa-input-actions {
  display: flex;
  gap: 4px;
}

.qa-send-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #7C3AED;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.qa-send-btn:hover:not(:disabled) { background: #8B5CF6; }
.qa-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.qa-clear-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #F5F7FA;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: all 0.2s;
}
.qa-clear-btn:hover { background: #FEF2F2; color: #DC2626; }

/* 提示 */
.qa-hint {
  padding: 8px 20px 12px;
  font-size: 0.7rem;
  color: #6B7280;
}
kbd {
  padding: 2px 5px;
  border: 1px solid #E5E7EB;
  border-radius: 3px;
  background: #F5F7FA;
  font-size: 0.65rem;
}

/* 代码块样式 */
.qa-md-code {
  background: #1E1E1E;
  color: #D4D4D4;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.78rem;
  margin: 6px 0;
  border: 1px solid #333;
}
.qa-md-inline {
  background: rgba(124,58,237,0.12);
  color: #7C3AED;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .qa-panel {
    width: 340px;
    right: -8px;
  }
}
</style>
