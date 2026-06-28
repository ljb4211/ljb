import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  // 定义状态：控制侧边栏是否折叠
  const isCollapse = ref(false)

  // 定义方法：切换折叠状态
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  // 对外暴露状态和方法
  return {
    isCollapse,
    toggleCollapse
  }
})