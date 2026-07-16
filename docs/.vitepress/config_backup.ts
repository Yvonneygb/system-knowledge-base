import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '系统知识库',
  description: '家装管理系统业务逻辑梳理与排查知识库',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }],
  ],
  themeConfig: {
    outline: false,
    sidebar: {
      '/家装管理/': [
        {
          text: '家装管理',
          collapsed: false,
          items: [
            {
              text: '项目往来',
              collapsed: false,
              items: [
                { text: '家装真实性核销', link: '/家装管理/项目往来/家装真实性核销/' },
                { text: '家装要货订单', link: '/家装管理/项目往来/家装要货订单/' },
                { text: '家装折扣政策', link: '/家装管理/项目往来/家装折扣政策/' }
              ]
            }
          ]
        }
      ],
      '/工程管理/': [
        {
          text: '工程管理',
          collapsed: false,
          items: [
            {
              text: '项目合同',
              collapsed: false,
              items: [
                { text: '自营工程合同', link: '/工程管理/项目合同/自营工程合同/' }
              ]
            },
            {
              text: '服务费',
              collapsed: false,
              items: [
                { text: '服务费业务背景', link: '/工程管理/服务费/服务费业务背景/' },
                { text: '工程服务费报销', link: '/工程管理/服务费/工程服务费报销/' },
                { text: '工程服务费兑现', link: '/工程管理/服务费/工程服务费兑现/' }
              ]
            },
            {
              text: '项目交付',
              collapsed: false,
              items: [
                { text: '工程要货订单', link: '/工程管理/项目交付/工程要货订单/' }
              ]
            },
            {
              text: '项目往来',
              collapsed: false,
              items: [
                { text: '工程服务费预提', link: '/工程管理/项目往来/工程服务费预提/' },
                { text: '项目到款引入', link: '/工程管理/项目往来/项目到款引入/' },
                { text: '项目到款认领', link: '/工程管理/项目往来/项目到款认领/' },
                { text: '项目到款认领撤销', link: '/工程管理/项目往来/项目到款认领撤销/' },
                { text: '工程折扣政策', link: '/工程管理/项目往来/工程折扣政策/' }
              ]
            }
          ]
        }
      ],
      '/门店管理/': [
        {
          text: '门店管理',
          collapsed: false,
          items: [
            {
              text: '样品及长库龄管理',
              collapsed: false,
              items: [
                { text: '样品及长库龄要货订单', link: '/门店管理/样品及长库龄管理/样品及长库龄要货订单/' },
                { text: '样品及长库龄折扣政策', link: '/门店管理/样品及长库龄管理/样品及长库龄折扣政策/' }
              ]
            }
          ]
        }
      ],
      '/财务管理/': [
        {
          text: '财务管理',
          collapsed: false,
          items: [
            {
              text: '预提与冲销',
              collapsed: false,
              items: [
                { text: '工程服务费冲销', link: '/财务管理/预提与冲销/工程服务费冲销/' }
              ]
            }
          ]
        }
      ]
    }
  },
  appType: 'spa',
  vite: {
    server: {
      port: 5174,
      host: '0.0.0.0',
      hmr: { overlay: false }
    }
  }
})
