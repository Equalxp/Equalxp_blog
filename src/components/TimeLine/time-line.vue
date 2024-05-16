<template>
  <el-timeline class="my-timeline">
    <div v-for="(item, index) in archives" :key="index">
      <div class="year to_pointer">{{ item.year }}</div>
      <el-timeline-item v-for="article in item.articleList" size="large" :hollow="true" hide-timestamp :center="true" class="my-timeline-item border-orange">
        <div class="flex_r_start timeline">
          <el-image class="timeline-cover scale" :src="article.article_cover"></el-image>
          <div class="timeline-info">
            <div class="timeline-info__title">
              {{ article.article_title }}
            </div>
            <div class="timeline-info__time">
              {{ article.createdAt }}
            </div>
          </div>
        </div>
      </el-timeline-item>
    </div>
  </el-timeline>
  <pagi-nation :size="param.size" :current="param.current" :layout="layout" :total="archivesTotal" @pagination="pagination" />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { blogTimelineGetArticleList } from "@/api/article"
const archives = ref([])
let param = reactive({
  // 放置页码及相关数据
  current: 1, //当前页
  size: 10, //每页条目数
})
let archivesTotal = ref(0) // 记录总数
let layout = " prev, pager, next" //分页组件会展示的功能项

const pagination = page => {
  param.current = page.current
  getArchives()
}

// 获取时间轴
const getArchives = async () => {
  let res = await blogTimelineGetArticleList(param.current, param.size)
  if (res.code == 0) {
    const { total, list } = res.result
    archives.value = list
    archivesTotal.value = total
  }
}

onMounted(() => {
  getArchives()
})
</script>

<style lang="scss" scoped>
.year {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--md-active);
}
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
        transform: scale(1.2);
        border-color: var(--second-font-color) !important;
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
