<template>
  <div
    :class="['back-top', backTopShow ? 'back-top-show' : 'back-top-hidden']"
    :style="`bottom: ${backTopProps.bottom};right:${backTopProps.right};height: ${backTopProps.width};width:${backTopProps.width};`"
    @click="scrollToTop"
  >
    <i class="iconfont icon-hangtiantubiao-" :style="`font-size: ${backTopProps.fontSize}`"></i>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'

const props = defineProps({
  bottom: {
    type: [String, Number],
    default: '100px',
  },
  right: {
    type: [String, Number],
    default: '0px',
  },
  // 图标
  icon: {
    type: String,
    default: 'icon-hangtiantubiao-',
  },
  fontSize: {
    type: [String, Number],
    default: '4rem',
  },
})

const backTopProps = reactive({
  bottom: '',
  right: '',
  width: '',
})

watch(
  () => props,
  (newV) => {
    backTopProps.bottom = /^[\d|.]*$/g.test(props.bottom) ? props.bottom + 'rem' : props.bottom
    backTopProps.right = /^[\d|.]*$/g.test(props.right) ? props.right + 'rem' : props.right
    backTopProps.fontSize = /^[\d|.]*$/g.test(props.fontSize)
      ? props.fontSize + 'rem'
      : props.fontSize
  },
  {
    immediate: true,
    deep: true,
  }
)

onMounted(() => {
  // 注册滚动
  window.addEventListener('scroll', scroll)
})
const backTopShow = ref(false)
let oldScrollTop = 0
const scroll = () => {
  let scrollTop = ref(0)
  scrollTop.value =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop.value > 200 && scrollTop.value - oldScrollTop < 0) {
    // 大于200显示
    backTopShow.value = true
  } else {
    backTopShow.value = false
  }
  oldScrollTop = scrollTop.value
}

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    const duration = 600
    const startTime = Date.now()
    return new Promise((res) => {
      const fnc = () => {
        const timestamp = Date.now()
        const time = timestamp - startTime
        const nextScrollTop = easeInOut(Math.min(time, duration), c, 0, duration)
        window.scrollTo(0, nextScrollTop)
        if (time < duration) {
          window.requestAnimationFrame(fnc) // 动画函数
        } else {
          // 由于上面步骤设置了scrollTop, 滚动事件可能未触发完毕
          // 此时应该在下一帧再执行res
          window.requestAnimationFrame(res)
        }
      }
      window.requestAnimationFrame(fnc)
    })
  }
}
const easeInOut = (current, start, end, duration) => {
  const change = (end - start) / 2
  let time = current / (duration / 2)
  if (time < 1) {
    return change * time * time * time + start
  }
  time -= 2
  return change * (time * time * time + 2) + start
}
</script>
<style lang="scss" scoped>
.back-top {
  position: fixed;
  overflow: hidden;
  transition: all ease-in-out 0.3s;
  &-show {
    visibility: visible;
  }
  &-hidden {
    visibility: hidden;
  }
  .icon-hangtiantubiao- {
    color: var(--font-color);
  }
}
</style>
