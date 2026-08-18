<template>
  <div class="smm-container">
    <!-- 头部说明 -->
    <div class="smm-header">
      <h2>📤 源MD管理</h2>
      <p class="smm-desc">上传由代码分析AI工具生成的最新 MD，自动更新对应菜单页的<strong>源码分析区块</strong>（重点逻辑/界面逻辑/字段/校验等），并保留手工整理的<strong>业务介绍</strong>与<strong>业务流程图</strong>。</p>
    </div>

    <!-- 后端连接状态 -->
    <div class="smm-alert" :class="backendReady ? 'ok' : 'warn'">
      <span v-if="backendReady">✅ 后端服务已连接（{{ apiBase }}）</span>
      <span v-else>⚠️ 未检测到后端服务地址。请确认后端已部署并配置 <code>VITE_UPLOAD_API_URL</code>（本地开发则默认 <code>localhost:3456</code>）。</span>
    </div>

    <!-- 上传表单 -->
    <div class="smm-form">
      <div class="smm-field">
        <label class="smm-label">① 选择目标菜单页</label>
        <select v-model="pagePath" class="smm-input">
          <option value="" disabled>— 请选择要更新的页面 —</option>
          <optgroup v-for="(group, gkey) in groupedPages" :key="gkey" :label="gkey">
            <option v-for="p in group" :key="p" :value="p">{{ p }}</option>
          </optgroup>
        </select>
      </div>

      <div class="smm-field">
        <label class="smm-label">② 上传最新 MD 内容（AI 分析源码生成）</label>
        <div class="smm-file-row">
          <input type="file" accept=".md,.markdown,text/markdown" @change="onFileChange" class="smm-file" />
          <span class="smm-file-hint">{{ fileName || '或直接在下方向下方粘贴 MD 全文' }}</span>
        </div>
        <textarea
          v-model="mdContent"
          class="smm-textarea"
          rows="12"
          placeholder="将 AI 生成的 MD 全文粘贴到这里，或选择上方 .md 文件自动载入…"
        ></textarea>
      </div>

      <div class="smm-field">
        <label class="smm-label">③ 更新说明（可选）</label>
        <input v-model="note" type="text" class="smm-input" placeholder="如：核销列表页新增筛选项 / 修复字段说明" />
      </div>

      <div class="smm-field">
        <label class="smm-label">④ 上传密钥（管理员提供）</label>
        <input v-model="uploadSecret" type="password" class="smm-input" placeholder="KB_UPLOAD_SECRET" autocomplete="off" />
      </div>

      <!-- 区块说明 -->
      <div class="smm-rule">
        <div class="smm-rule-title">更新范围说明</div>
        <div class="smm-rule-body">
          <div><span class="dot red"></span><b>将被更新</b>：重点逻辑 key-logic、界面逻辑 detail-logic、权限、FAQ、更新记录、历史</div>
          <div><span class="dot green"></span><b>将保留</b>：业务介绍 biz-intro、业务流程图 biz-flow（手工整理内容）</div>
        </div>
      </div>

      <button class="smm-btn" :disabled="isLoading || !pagePath || !mdContent.trim() || !uploadSecret" @click="submit">
        {{ isLoading ? '上传中…' : '🚀 上传并触发自动发布' }}
      </button>

      <div v-if="errorMsg" class="smm-error">{{ errorMsg }}</div>
      <div v-if="successMsg" class="smm-success">{{ successMsg }}</div>
    </div>

    <!-- 上传日志 -->
    <div class="smm-log" v-if="logs.length > 0">
      <h3>📋 上传日志</h3>
      <table class="smm-table">
        <thead>
          <tr><th>时间</th><th>页面</th><th>更新区块</th><th>说明</th><th>状态</th></tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in logs" :key="i">
            <td>{{ l.time }}</td>
            <td class="smm-mono">{{ l.file }}</td>
            <td>{{ (l.changedSections || []).join(', ') }}</td>
            <td>{{ l.note || '—' }}</td>
            <td><span class="smm-status">{{ l.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 内置标准菜单页面清单（与知识库导航一致）
const ALL_PAGES = [
  '产品中心/产品资料/产品SM状态变更申请','产品中心/产品资料/产品分类','产品中心/产品资料/产品列表',
  '产品中心/产品资料/产品变更列表','产品中心/产品资料/产品图册','产品中心/产品资料/产品图片上传',
  '产品中心/产品资料/产品推广等级维护','产品中心/产品资料/产品推广等级要求配置',
  '产品中心/价目表/价目表查询','产品中心/价目表/责任制内结价定价基础参数配置',
  '产品中心/价目表/责任制内结价定价瓷砖参数配置','产品中心/价目表/跨事业部产品产品销售申请',
  '产品中心/价目表/跨事业部产品销售清单','产品中心/库存/事业部库存查询','产品中心/库存/库存查询',
  '产品中心/说明书/产品说明书','产品中心/说明书/说明书查阅数据',
  '家装管理/家装往来/家装核销发票上传','家装管理/家装往来/家装要货订单','家装管理/项目交付/家装折扣政策申请',
  '家装管理/项目往来/家装真实性核销',
  '工程管理/合同与折扣/工程折扣单','工程管理/合同与折扣/工程自营签收','工程管理/合同与折扣/项目合同失效',
  '工程管理/服务费/工程服务费兑现','工程管理/服务费/工程服务费报销','工程管理/服务费/服务费业务背景',
  '工程管理/项目交付/工程取消核销与发票作废','工程管理/项目交付/工程合同产品变更','工程管理/项目交付/工程折扣延期',
  '工程管理/项目交付/工程折扣政策失效','工程管理/项目交付/工程折扣政策申请','工程管理/项目交付/工程要货订单',
  '工程管理/项目交付/工程要货订单报表','工程管理/项目交付/折扣单报表','工程管理/项目交付/折扣政策明细查询（内部）',
  '工程管理/项目交付/提货时间变更','工程管理/项目交付/有效延期申请','工程管理/项目交付/紧急要货报表',
  '工程管理/项目交付/紧急要货插单','工程管理/项目交付/订单紧急要货',
  '工程管理/项目合同/经销商工程合同','工程管理/项目合同/自营工程合同',
  '工程管理/项目商机/价格保护函','工程管理/项目商机/单体项目报备','工程管理/项目商机/工程项目档案',
  '工程管理/项目商机/工程项目结案','工程管理/项目商机/战略报备变更','工程管理/项目商机/战略经理变更',
  '工程管理/项目商机/战略项目报备','工程管理/项目商机/报备生失效申请','工程管理/项目商机/报备解冻申请',
  '工程管理/项目商机/项目进度更新',
  '工程管理/项目往来/工程折扣政策','工程管理/项目往来/工程服务费预提','工程管理/项目往来/工程核销发票上传',
  '工程管理/项目往来/工程真实性核销','工程管理/项目往来/项目到款引入','工程管理/项目往来/项目到款认领',
  '工程管理/项目往来/项目到款认领撤销',
  '开发管理/值集配置/装修等级',
  '点将管理/单店培训点将管理/单店点将执行','点将管理/单店培训点将管理/单店点将管理',
  '点将管理/基础管理/档案审批','点将管理/基础管理/讲师排期','点将管理/基础管理/讲师档案',
  '点将管理/特训营管理/活动点将执行','点将管理/特训营管理/特训营点将执行','点将管理/特训营管理/特训营点将管理',
  '点将管理/特训营管理/特训营管理','点将管理/策划师点将/活动点将管理',
  '点将管理/经销商点将/单店点将','点将管理/经销商点将/活动点将','点将管理/经销商点将/特训营',
  '点将管理/经销商点将/设计点将','点将管理/设计师点将/设计师点将执行','点将管理/设计师点将/设计师点将管理',
  '点将管理/设计师点将/设计师饱和度',
  '电子合同管理/品牌方/合同签署异常处理','电子合同管理/基础管理/合同模板管理','电子合同管理/经销商/合同管理',
  '经销合同管理/合同管理/合同任务完成率','经销合同管理/合同管理/合同任务完成率明细报表',
  '经销合同管理/合同管理/年度营销政策','经销合同管理/合同管理/经销合同归档',
  '经销合同管理/报表中心/经销合同销售区域报表',
  '经销合同管理/销售合同/保证金减免申请','经销合同管理/销售合同/合同保证金','经销合同管理/销售合同/年度经销合同',
  '经销合同管理/销售合同/经销合同变更','经销合同管理/销售合同/认缴概况','经销合同管理/销售合同/认缴申请',
  '财务管理/对账单/客户金税发票号码查询','财务管理/对账单/广告费余额查询','财务管理/对账单/待兑现折扣折让对账单',
  '财务管理/对账单/政策性补贴申请','财务管理/对账单/法人对账单','财务管理/对账单/经销商余额明细查询',
  '财务管理/对账单/额度内市场推广服务费对账单','财务管理/对账单/额度外预算总额',
  '财务管理/调整单/广告费调整申请单','财务管理/调整单/政策性补贴申请','财务管理/调整单/销售提价兑现',
  '财务管理/预提与冲销/工程服务费冲销','财务管理/预提与冲销/额度内冲销报表','财务管理/预提与冲销/额度内预提报表',
  '门店管理/广告投放/广告投放申请','门店管理/广告投放/广告报销发票兑现','门店管理/广告投放/广告费报销',
  '门店管理/样品及长库龄管理/样品及长库龄折扣政策','门店管理/样品及长库龄管理/样品及长库龄折扣政策失效',
  '门店管理/样品及长库龄管理/样品及长库龄要货订单',
  '门店管理/装修报表/兑现汇总','门店管理/装修报表/门店装修申请与进度更新报表','门店管理/装修报表/门店装修额度外报表',
  '门店管理/装修报表/门店验收与报销单报表','门店管理/装修报表/门额度内兑现统计报表',
  '门店管理/门店报表/出库单计算广告费明细报表','门店管理/门店报表/店面额度内兑现余额表','门店管理/门店报表/户外广告分布',
  '门店管理/门店报表/门店区域分布','门店管理/门店报表/门店统计分析','门店管理/门店报表/额度外占用预算明细',
  '门店管理/门店档案/新建门店申请','门店管理/门店档案/门店变更申请','门店管理/门店档案/门店档案',
  '门店管理/门店装修/门头展板兑现','门店管理/门店装修/门头展板报销申请单','门店管理/门店装修/门店装修申请与进度更新',
  '门店管理/门店装修/门店装修申请关闭','门店管理/门店装修/门店装修申请变更','门店管理/门店装修/门店装修额度内兑现',
  '门店管理/门店装修/门店装修额度外兑现','门店管理/门店装修/门店验收与报销单','门店管理/门店装修/额度内兑现批量复核',
  '门店管理/门店设置/经销商额度外限额','门店管理/门店设置/门头展板报销标准','门店管理/门店设置/门头验收信息设置',
  '门店管理/门店设置/门店照片设置','门店管理/门店设置/门店装修标准',
  '问题反馈/问题反馈','问题反馈/问题回复'
]

// 按一级目录分组，用于下拉分组展示
const groupedPages = computed(() => {
  const groups = {}
  for (const p of ALL_PAGES) {
    const top = p.split('/')[0]
    if (!groups[top]) groups[top] = []
    groups[top].push(p)
  }
  return groups
})

const pagePath = ref('')
const mdContent = ref('')
const note = ref('')
const uploadSecret = ref('')
const fileName = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const logs = ref([])

// 后端地址：优先 window.KB_UPLOAD_URL，其次 window.KB_API_URL，本地 fallback
const getApiBase = () => {
  if (typeof window === 'undefined') return null
  const injected = window.KB_UPLOAD_URL || window.KB_API_URL
  if (injected) return injected.replace(/\/$/, '')
  const host = window.location.hostname
  return (host === 'localhost' || host === '127.0.0.1') ? 'http://localhost:3456' : null
}
const apiBase = getApiBase()
const backendReady = computed(() => !!apiBase)

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = () => { mdContent.value = reader.result }
  reader.readAsText(file, 'utf-8')
}

async function submit() {
  errorMsg.value = ''
  successMsg.value = ''
  if (!apiBase) { errorMsg.value = '后端服务地址未配置，无法上传。' ; return }
  isLoading.value = true
  try {
    const resp = await fetch(`${apiBase}/api/upload-md`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Upload-Secret': uploadSecret.value
      },
      body: JSON.stringify({
        pagePath: '/' + pagePath.value + '/',
        content: mdContent.value,
        note: note.value
      })
    })
    const data = await resp.json()
    if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`)
    if (data.error) throw new Error(data.error)
    successMsg.value = `✅ 上传成功！已更新 ${data.file}，更新区块：${(data.changedSections||[]).join(', ')}。GitHub Actions 正在自动发布，稍后刷新即可看到。`
    // 刷新日志
    loadLogs()
    mdContent.value = ''
    note.value = ''
  } catch (err) {
    errorMsg.value = `❌ 上传失败：${err.message}`
  } finally {
    isLoading.value = false
  }
}

async function loadLogs() {
  if (!apiBase) return
  try {
    const resp = await fetch(`${apiBase}/api/upload-log`, {
      headers: { 'X-Upload-Secret': uploadSecret.value || '__none__' }
    })
    if (resp.ok) {
      const data = await resp.json()
      logs.value = data
    }
  } catch (_) {}
}

onMounted(loadLogs)
</script>

<style scoped>
.smm-container {
  max-width: 880px;
  margin: 0 auto;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #1F2937;
}
.smm-header { margin-bottom: 16px; }
.smm-header h2 { margin: 0 0 6px; font-size: 1.5rem; color: #1E293B; }
.smm-desc { margin: 0; font-size: 0.85rem; color: #64748B; line-height: 1.7; }
.smm-alert { padding: 10px 14px; border-radius: 10px; font-size: 0.82rem; margin-bottom: 18px; }
.smm-alert.ok { background: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; }
.smm-alert.warn { background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; }
.smm-alert code { background: rgba(0,0,0,0.06); padding: 1px 5px; border-radius: 4px; }
.smm-form { border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; background: #fff; }
.smm-field { margin-bottom: 16px; }
.smm-label { display: block; font-size: 0.83rem; font-weight: 700; color: #334155; margin-bottom: 6px; }
.smm-input, .smm-textarea {
  width: 100%; box-sizing: border-box; border: 1px solid #CBD5E1; border-radius: 8px;
  padding: 9px 12px; font-size: 0.83rem; color: #1F2937; background: #F8FAFC;
}
.smm-input:focus, .smm-textarea:focus { outline: none; border-color: #7C3AED; background: #fff; }
.smm-textarea { resize: vertical; font-family: ui-monospace, Menlo, monospace; line-height: 1.5; }
.smm-file-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.smm-file { font-size: 0.8rem; }
.smm-file-hint { font-size: 0.75rem; color: #94A3B8; }
.smm-rule {
  border: 1px solid #E9D5FF; background: #FAF5FF; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px;
}
.smm-rule-title { font-size: 0.8rem; font-weight: 800; color: #7C3AED; margin-bottom: 8px; }
.smm-rule-body { font-size: 0.78rem; color: #334155; line-height: 1.9; }
.dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 7px; }
.dot.red { background: #EF4444; }
.dot.green { background: #10B981; }
.smm-btn {
  width: 100%; padding: 12px; border: none; border-radius: 10px; font-size: 0.9rem; font-weight: 800;
  color: #fff; background: linear-gradient(135deg, #7C3AED, #6D28D9); cursor: pointer;
}
.smm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.smm-error { margin-top: 12px; padding: 10px 14px; background: #FEF2F2; border: 1px solid #FECACA; color: #B91C1C; border-radius: 8px; font-size: 0.8rem; }
.smm-success { margin-top: 12px; padding: 10px 14px; background: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; border-radius: 8px; font-size: 0.8rem; line-height: 1.6; }
.smm-log { margin-top: 24px; }
.smm-log h3 { font-size: 1.05rem; color: #1E293B; margin: 0 0 10px; }
.smm-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #E8ECF0; }
.smm-table th { background: #F5F3FF; color: #7C3AED; padding: 8px 10px; text-align: left; }
.smm-table td { padding: 7px 10px; border-top: 1px solid #F1F5F9; color: #334155; }
.smm-mono { font-family: ui-monospace, Menlo, monospace; font-size: 0.7rem; }
.smm-status { color: #059669; font-weight: 700; }
</style>
