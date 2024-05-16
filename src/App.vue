<template>
  <div class="app">
    <layout> </layout>
    <BackTop :right="backTopProps.right" :fontSize="backTopProps.fontSize" />
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { isMobile } from '@/utils/tool'
import { addView } from '@/api/config'

const backTopProps = reactive({
  right: '',
  fontSize: '',
})
onMounted(async () => {
  // 上传访问量
  await addView()
  // 首次判断是手机还是pc
  backTopProps.right = isMobile() ? '0' : '5%'
  backTopProps.fontSize = isMobile() ? '4rem' : '5.5rem'
  // 全局增加窗口变化事件，对backTop的边距进行适配
  window.addEventListener('resize', resize)
})

const resize = () => {
  // 当前视口宽度
  let w = document.documentElement.clientWidth || document.body.clientWidth
  if (w > '1280') {
    backTopProps.right = '5%'
    backTopProps.fontSize = '5rem'
  } else if (w > '798' && w <= '1280') {
    backTopProps.right = '0'
    backTopProps.fontSize = '4.5rem'
  } else {
    backTopProps.right = '0'
    backTopProps.fontSize = '4rem'
  }
}
</script>
<style lang="scss">
.app {
  width: 100%;
  box-sizing: border-box;
}
</style>
