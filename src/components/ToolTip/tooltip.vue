<template>
  <el-tooltip :content="name" placement="top" effect="light" :disabled="tooltipDisabled">
    <span
      class="tooltip-text-overflow"
      :style="`width: ${width};font-size:${size};color: ${color};font-weight: ${weight};`"
      :data-name="name"
      @mouseenter="onMouseEnter"
      >{{ name }}
    </span>
  </el-tooltip>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  size: {
    type: [String, Number],
    default: '1rem',
  },
  color: {
    type: String,
    default: '#676767',
  },
  weight: {
    type: [String, Number],
    default: '400',
  },
})

const tooltipDisabled = ref(true)

const onMouseEnter = () => {
  const nameNode = document.querySelector(`[data-name="${props.name}"]`)
  if (nameNode) {
    // 当元素滚动宽度超过当前宽度的时候，就显示tooltip
    if (nameNode.offsetWidth < nameNode.scrollWidth) {
      tooltipDisabled.value = false
    } else {
      tooltipDisabled.value = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-text-overflow {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
