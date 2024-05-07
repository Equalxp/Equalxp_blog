<template>
  <div class="main_box">
    <div v-if="getRoute.path != '/'" class="page-name back-ground-image" :style="getBgCover">
      <div class="route-font" v-if="getRoute.path != '/article'">
        {{ getRoute.meta.name == '文章列表' ? getRoute.query.type + '列表' : getRoute.meta.name }}
      </div>
      <div v-else class="article main-article">
        <div class="route-font">{{ article.articleTitle }}</div>
        <span class="to_pointer">
          <i class="iconfont icon-calendar2"></i>
          <span class="meta-label">发表于</span>
          <span class="meta-value">{{ article.publishDate }}</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-schedule"></i>
          <span class="meta-label">更新于</span>
          <span class="meta-value">{{ article.updateDate }}</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-folder"></i>
          <span class="meta-value">{{ article.category }}</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-label_fill"></i>
          <span class="meta-value">{{ article.tags }}</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-speechbubble"></i>
          <span class="meta-label">评论数</span>
          <span class="meta-value">11</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-chakan"></i>
          <span class="meta-label">浏览次数</span>
          <span class="meta-value">11</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-chakan"></i>
          <span class="meta-label">字数统计</span>
          <span class="meta-value">1.1k</span>
          <span class="meta-separator">|</span>
        </span>
        <span class="to_pointer">
          <i class="iconfont icon-speechbubble"></i>
          <span class="meta-label">阅读时长</span>
          <span class="meta-value">11</span>
        </span>
        <div class="toggle-theme">
          <el-dropdown class="theme-card-dropdown">
            <div class="flex_c_center">
              <span>预览主题</span>
              <span>{{ previewTheme }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in staticStore.previewThemeList"
                  :key="index"
                  @click="toggleMdTheme('previewTheme', item)"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown class="theme-card-dropdown">
            <div class="flex_c_center">
              <span>代码主题</span>
              <span>{{ codeTheme }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in staticStore.codeThemeList"
                  :key="index"
                  @click="toggleMdTheme('codeTheme', item)"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Setting, Edit } from '@element-plus/icons-vue'
import { staticData } from '@/store/index.js'
import { storeToRefs } from 'pinia'

const staticStore = staticData()
const { codeTheme, previewTheme } = storeToRefs(staticStore)
const route = useRoute()
const getRoute = computed(() => {
  return route
})

const getBgCover = computed(() => {
  let url = 'https://mrzym.gitee.io/blogimg/cover/11.26.jpg'
  return `background-image: url(${url});}`
})

const article = reactive({
  articleTitle: '我的文章1',
  tags: 'Vue.js、html、hhhh',
  category: '学习',
  publishDate: '2022-9-10',
  updateDate: '2022-9-10',
  author: '小张',
})

const toggleMdTheme = (type, theme) => {
  staticStore[type] = theme
}
</script>

<style lang="scss" scoped>
.back-ground-image {
  position: relative;
  background-color: #fff;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 26rem;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }
}
.page-name {
  display: flex;
  justify-content: center;
  align-items: center;
  .route-font {
    font-size: 3.6rem;
    font-weight: 600;
    line-height: 2.4;
    text-align: center;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right, #c1f7ff, #edc5ff, #cbfff1, #fffdb8);
    z-index: 999;
  }
  .article {
    z-index: 999;
    background: transparent;
    font-size: 1rem;
    line-height: 1.4;
    margin-top: 5rem;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right, #c1f7ff, #edc5ff, #cbfff1, #fffdb8);
    .iconfont {
      margin-right: 0.3rem;
    }
  }
  .meta {
    &-label {
      padding-right: 0.5rem;
    }
    .icon-speechbubble {
      font-size: 1rem;
    }
    &-separator {
      margin: 0 0.5rem;
    }
    i {
      margin: 0 0.2rem 0 0;
    }
  }
  .toggle-theme {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    h3 {
      line-height: 1.4;
    }
    .theme-card-dropdown {
      width: 8rem;
      overflow: auto;
      margin: 0.5rem;
      text-align: center;
      display: block;
      padding: 0.2rem 0;
      background: transparent;
      border: 3px solid #dbcbe3;
      color: #edc5ff;
      font-weight: bold;
      border-radius: 5px;
      span {
        &:first-child {
          line-height: 1.2;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .main-article {
    max-width: 80%;
  }
}
@media screen and (min-width: 768px) {
  .main-article {
    max-width: 60%;
  }
}
</style>
