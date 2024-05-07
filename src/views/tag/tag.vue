<template>
  <div class="tag">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="tag-card">
          <div class="tag-total flex_center">标签 - {{ total }}</div>
          <el-row>
            <el-col :span="24" class="tag-item">
              <span
                v-for="(item, i) in tagList"
                :style="{ fontSize: item.fontSize + 'rem', color: item.fontColor }"
                class="tag-item__label scale"
                @click="goToArticleList(item.tagId)"
              >
                {{ item.label }}
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  for (let i = 0; i < total.value; i++) {
    tagList.push({
      tagId: i,
      label: '标签' + i,
      value: i,
      fontColor: randomFontColor(),
      fontSize: randomFontSize(),
    })
  }
})
const router = useRouter()
const tagList = reactive([])
const total = ref(16)

const randomFontSize = () => {
  return Math.random() * 1.4 + 0.6
}

const randomFontColor = () => {
  return `rgb(${Math.random() * 180 + 30},${Math.random() * 180 + 30},${Math.random() * 180 + 30})`
}

const goToArticleList = (id) => {
  router.push({ path: 'articleList', query: { id: id, type: '标签' } })
}
</script>

<style lang="scss" scoped>
.tag {
  &-card {
    padding: 40px 50px;
  }
  &-total {
    font-size: 2.2rem;
    line-height: 2;
    font-weight: 600;
    color: var(--font-color);
  }
  &-item {
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    &__label {
      display: inline-block;
      font-weight: bold;
      padding: 0 0.8rem;
    }
  }
}
</style>
