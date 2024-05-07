<template>
  <el-timeline class="my-timeline">
    <el-timeline-item
      v-for="(article, index) in articleList"
      :key="index"
      size="large"
      :hollow="true"
      hide-timestamp
      :center="true"
      :class="['my-timeline-item', !article.timestamp && index != 0 ? 'border-orange' : '']"
    >
      <div class="flex_r_start timeline">
        <el-image v-if="article.url" class="timeline-cover scale" :src="article.url"></el-image>
        <div class="timeline-info">
          <div v-if="index == 0" class="timeline-info__total">
            <span>{{ type }} - </span>
            <span> {{ total }} </span>
          </div>
          <div v-else>
            <div v-if="article.content" class="timeline-info__title">
              {{ article.content }}
            </div>
            <div v-if="article.timestamp" class="timeline-info__time">
              {{ article.timestamp }}
            </div>
          </div>
        </div>
      </div>
    </el-timeline-item>
  </el-timeline>
  <pagi-nation
    :size="param.size"
    :current="param.current"
    :layout="layout"
    :total="total"
    @pageNation="pageNation"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import timelineCover from '@/assets/img/astronaut.jpg'
import { useRoute } from 'vue-router'

onMounted(() => {
  console.log(route.query)
  let res = load(param)
  res.forEach((v) => {
    articleList.push(v)
  })
  // articleList.splice(0, res.length, res)
  total.value = res.length
})
const route = useRoute()
const type = route.query.type
const articleList = reactive([])
let param = reactive({
  // 放置页码及相关数据
  current: 1, //当前页
  size: 10, //每页条目数
})
let total = ref(0) // 记录总数
let layout = ' prev, pager, next' //分页组件会展示的功能项

const pageNation = (page) => {
  param.current = page.current
}

const load = (param) => {
  return [
    {
      content: '文章总览',
    },
    {
      content: '2022',
    },
    {
      content: '这是第二篇文章',
      timestamp: '2022-04-03',
      url: timelineCover,
    },
    {
      content: '2021',
    },
    {
      content: '这是第一篇文章',
      timestamp: '2021-04-03',
      url: timelineCover,
    },
  ]
}
</script>

<style lang="scss" scoped>
.timeline {
  padding: 1rem 0;
  &-cover {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  &-info {
    flex: 1;
    &__total {
      font-size: 1.8rem;
      padding: 5px;
      font-weight: bold;
      color: var(--font-color);
    }
    &__title {
      font-size: 1.2rem;
      padding: 5px;
      font-weight: bold;
      color: var(--font-color);
    }
    &__time {
      padding: 5px;
      font-weight: bold;
      color: var(--font-color);
    }
  }
}
.border-orange {
  :deep(.el-timeline-item__node) {
    &.is-hollow {
      border-color: var(--primary) !important;
      &:hover {
        border-color: var(--border-color) !important;
      }
    }
  }
}
.my-timeline {
  width: 100%;
  margin-bottom: 2rem;
  .my-timeline-item {
    padding-top: 5px;
    :deep(.el-timeline-item__tail) {
      height: 100%;
      top: 32px;
      border-left: 3px solid var(--hr-border);
    }
    &:first-child {
      :deep(.el-timeline-item__node) {
        left: -5px;
        width: 1.4rem;
        height: 1.4rem;
        &.is-hollow {
          border-width: 4px;
          border-color: var(--border-color);
          background-color: var(--global-bg);
        }
      }
    }
    &:last-child {
      :deep(.el-timeline-item__tail) {
        height: calc(100% - 30px);
      }
    }
    :deep(.el-timeline-item__node) {
      left: -2px;
      width: 1rem;
      height: 1rem;
      &.is-hollow {
        border-width: 3px;
        border-color: var(--border-color);
        background-color: var(--global-bg);
        &:hover {
          border-color: var(--primary);
        }
      }
    }
    :deep(.el-timeline-item__wrapper) {
      display: flex;
      align-items: center;
      margin-left: 1rem;
    }
  }
}
</style>
