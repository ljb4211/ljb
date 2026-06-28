import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //作用：配置模块如何被解析
  //简单说：告诉工具「去哪里找文件」「怎么找文件」
  resolve: {
    //给长路径设置一个短代号，以后直接用代号代替路径
  
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

    server: {
    proxy: {
      '/api': {
        target: 'http://159.75.169.224:1235',
        //http://159.75.169.224:1235/api
        changeOrigin: true
      }
    }
  }
})
