import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from 'pinia'


//将request挂载到Vue实例上
// app.config.globalProperties.$request = request

const app = createApp(App)

const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(router).use(pinia).mount('#app')
