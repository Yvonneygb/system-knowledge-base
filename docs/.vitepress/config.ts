import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/system-knowledge-base/',
  title: '系统知识库',
  description: '家装管理系统业务逻辑梳理与排查知识库',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }],
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📋</text></svg>'}]
  ],
  themeConfig: {
    outline: false,
    nav: [
      { text: '🏠 家装真实性核销', link: '/家装管理/项目往来/家装真实性核销/' },
      { text: '📂 家装管理', link: '/家装管理/项目往来/家装真实性核销/' },
      { text: '⚙️ 工程管理', link: '/工程管理/服务费/服务费业务背景/' },
      { text: '🔧 开发管理', link: '/开发管理/值集配置/装修等级/' }
    ],
    sidebar: {
      '/家装管理/': [
        {
          text: '项目往来',
          items: [
            { text: '🏠 家装真实性核销', link: '/家装管理/项目往来/家装真实性核销/' },
            { text: '🏷️ 家装折扣政策', link: '/家装管理/项目往来/家装折扣政策/' },
            { text: '📦 家装要货订单', link: '/家装管理/项目往来/家装要货订单/' },
            { text: '🧾 家装核销发票上传', link: '/家装管理/家装往来/家装核销发票上传/' },
            { text: '🛒 家装要货订单', link: '/家装管理/家装往来/家装要货订单/' }
          ]
        }
      ],
      '/工程管理/': [
        {
          text: '服务费',
          items: [
            { text: '📋 服务费业务背景', link: '/工程管理/服务费/服务费业务背景/' },
            { text: '💰 工程服务费预提', link: '/工程管理/项目往来/工程服务费预提/' },
            { text: '📑 工程服务费报销', link: '/工程管理/服务费/工程服务费报销/' },
            { text: '✅ 工程服务费兑现', link: '/工程管理/服务费/工程服务费兑现/' }
          ]
        },
        {
          text: '项目往来',
          items: [
            { text: '💳 项目到款认领', link: '/工程管理/项目往来/项目到款认领/' },
            { text: '↩️ 项目到款认领撤销', link: '/工程管理/项目往来/项目到款认领撤销/' },
            { text: '🏷️ 工程折扣政策', link: '/工程管理/项目往来/工程折扣政策/' }
          ]
        },
        {
          text: '项目交付',
          items: [
            { text: '📦 工程要货订单', link: '/工程管理/项目交付/工程要货订单/' },
            { text: '📊 工程折扣政策申请', link: '/工程管理/项目交付/工程折扣政策申请/' },
            { text: '🚫 工程折扣政策失效', link: '/工程管理/项目交付/工程折扣政策失效/' }
          ]
        },
        {
          text: '项目商机',
            items: [
              { text: '📄 报备生失效申请', link: '/工程管理/项目商机/报备生失效申请/' },
              { text: '❄️ 报备解冻申请', link: '/工程管理/项目商机/报备解冻申请/' },
              { text: '✅ 工程项目结案', link: '/工程管理/项目商机/工程项目结案/' },
              { text: '📦 单体项目报备', link: '/工程管理/项目商机/单体项目报备/' },
              { text: '🗂️ 工程项目档案', link: '/工程管理/项目商机/工程项目档案/' }
            ]
          },
        {
          text: '项目合同',
          items: [
            { text: '📝 自营工程合同', link: '/工程管理/项目合同/自营工程合同/' }
          ]
        }
      ],
      '/财务管理/': [
        {
          text: '预提与冲销',
          items: [
            { text: '↔️ 工程服务费冲销', link: '/财务管理/预提与冲销/工程服务费冲销/' }
          ]
        }
      ],
      '/门店管理/': [
        {
          text: '样品及长库龄管理',
          items: [
            { text: '🏷️ 样品及长库龄折扣政策', link: '/门店管理/样品及长库龄管理/样品及长库龄折扣政策/' },
            { text: '📦 样品及长库龄要货订单', link: '/门店管理/样品及长库龄管理/样品及长库龄要货订单/' }
          ]
        }
      ],
      '/开发管理/': [
        {
          text: '值集配置',
          items: [
            { text: '🏠 装修等级', link: '/开发管理/值集配置/装修等级/' }
          ]
        }
      ]
    },
    search: { provider: 'local' },
    socialLinks: []
  },
  vite: {
    server: {
      port: 5174,
      host: '0.0.0.0'
    }
  }
})
