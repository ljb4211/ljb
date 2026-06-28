<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
//defineProps 是 Vue 3 <script setup> 里的编译期宏函数，专门用来声明组件的属性（Props）
const props = defineProps({
  title: {
    type: String,
    default: '页面标题'
  }
})
</script>

<style lang="scss" scoped>
.page-head {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page-title {
  font-size: 24px;
  color: #2d3748;
}
}
</style>