<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { staticData } from "@/store/index.js"
import { storeToRefs } from "pinia"

const staticStore = staticData()
const { codeTheme, previewTheme } = storeToRefs(staticStore)
const route = useRoute()

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  article: {
    type: Object,
    default: () => {},
  },
  bgUrl: {
    type: String,
    default: "https://mrzym.gitee.io/blogimg/cover/cute.jpg",
  },
})

const toggleMdTheme = (type, theme) => {
  staticStore[type] = theme
}

const getBgCover = computed(() => {
  let url = "https://mrzym.gitee.io/blogimg/cover/cute.jpg"
  if (route.path == "/article") {
    url = props.article.article_cover || "https://mrzym.gitee.io/blogimg/cover/cute.jpg"
  }
  return `background-image: url(${url});}`
})
</script>

<template>
  <div class="page-name back-ground-image animate__animated animate__fadeIn" :style="getBgCover">
    <div v-if="route.path != '/article'" class="route-font animate__animated animate__fadeIn">
      {{ route.meta.name }}
    </div>
    <div v-else class="article main-article">
      <el-skeleton v-if="loading" :loading="loading" animated>
        <template #template>
          <SkeletonItem variant="text" width="160px" height="70px" />
          <br />
          <SkeletonItem variant="text" width="300px" height="50px" />
          <br />
          <SkeletonItem variant="text" width="100px" height="40px" />
          <SkeletonItem style="margin-left: 30px" variant="text" width="100px" height="40px" />
        </template>
      </el-skeleton>
      <template v-else>
        <tooltip width="80%" weight="500" size="2.4rem" color="#a2d2f4" align="center" :name="article.article_title" />
        <div class="animate__animated animate__fadeIn">
          <span class="to_pointer">
            <i class="iconfont icon-calendar2"></i>
            <span class="meta-label">发表于</span>
            <span class="meta-value">{{ article.createdAt }}</span>
          </span>
          <span class="to_pointer">
            <i class="iconfont icon-schedule"></i>
            <span class="meta-label">更新于</span>
            <span class="meta-value">{{ article.updatedAt }}</span>
          </span>
          <span class="meta-separator"></span>
          <span class="to_pointer">
            <i class="iconfont icon-folder"></i>
            <span class="meta-value">{{ article.categoryName }}</span>
          </span>
          <span class="meta-separator"></span>
          <span class="to_pointer">
            <i class="iconfont icon-label_fill"></i>
            <span class="meta-value" v-for="(item, index) in article.tagNameList" :key="item">{{ index + 1 == article.tagNameList.length ? item : item + "、" }}</span>
          </span>
          <span class="meta-separator"></span>
          <span class="to_pointer">
            <i class="iconfont icon-speechbubble"></i>
            <span class="meta-label">点赞数</span>
            <span class="meta-value">{{ article.thumbs_up_times }}</span>
          </span>
          <span class="meta-separator"></span>
          <span class="to_pointer">
            <i class="iconfont icon-chakan"></i>
            <span class="meta-label">浏览次数</span>
            <span class="meta-value">{{ article.view_times }}</span>
          </span>
          <span class="meta-separator"></span>
          <span class="to_pointer">
            <i class="iconfont icon-speechbubble"></i>
            <span class="meta-label">阅读时长</span>
            <span class="meta-value">两年半</span>
          </span>
        </div>
        <div class="toggle-theme animate__animated animate__fadeIn">
          <el-dropdown class="theme-card-dropdown">
            <div class="flex_c_center">
              <span>预览主题</span>
              <span>{{ previewTheme }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in staticStore.previewThemeList" :key="index" @click="toggleMdTheme('previewTheme', item)">{{ item }}</el-dropdown-item>
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
                <el-dropdown-item v-for="(item, index) in staticStore.codeThemeList" :key="index" @click="toggleMdTheme('codeTheme', item)">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </div>
  </div>
</template>

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
    content: "";
  }
}

.page-name {
  display: flex;
  justify-content: center;
  align-items: center;

  .route-font {
    font-size: 2.8rem;
    font-weight: 500;
    line-height: 2.4;
    text-align: center;
    color: var(--router-color);
    z-index: 999;
    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }

  .article {
    z-index: 999;
    background: transparent;
    font-size: 1.1rem;
    line-height: 1.4;
    margin-top: 5rem;
    color: transparent;
    text-align: center;
    color: var(--router-color);

    .to_pointer {
      padding: 0 0.3rem;
    }

    .iconfont {
      margin-right: 0.3rem;
    }
  }

  .meta {
    .icon-speechbubble {
      font-size: 1rem;
    }

    &-separator {
      margin: 0 0.4rem;
      font-size: 1.1rem;
      position: relative;

      &::after {
        content: "|";
        position: absolute;
        top: -3px;
        right: 0;
      }
    }

    i {
      margin: 0 0.2rem 0 0;
    }
  }

  .toggle-theme {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

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
      border: 1px solid var(--router-color);
      color: var(--router-color);
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
