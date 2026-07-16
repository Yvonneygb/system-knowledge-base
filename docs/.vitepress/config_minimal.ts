import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '知识库',
  vite: {
    server: {
      port: 5175,
      host: '0.0.0.0'
    }
  }
})
