<template>
  <div class="article">
    <el-row class="article_box">
      <el-col :xs="24" :sm="18">
        <el-card class="md-preview">
          <MdEditor class="md-preview-v3" v-model="mdState.text" :editorId="mdState.id" :previewOnly="true" :preview-theme="previewTheme" :code-theme="codeTheme" :theme="mainTheme ? 'dark' : 'light'" @on-get-catalog="onGetCatalog"></MdEditor>
          <div class="article-info">
            <div class="article-info-inner">
              <div>
                <span>文章作者：</span>
                <a class="to_pointer" href="https://gitee.com/mrzym">{{ articleInfo.authorName }}</a>
              </div>
              <div>
                <span>类型：</span>
                <el-tag>{{ articleInfo.type == 1 ? "原创" : articleInfo.type == 2 ? "转载" : "翻译" }}</el-tag>
              </div>
              <div v-if="articleInfo.type != 1">
                <span>原文链接：</span>
                <a class="to_pointer" :href="articleInfo.origin_url">{{ articleInfo.origin_url }}</a>
              </div>
              <p>声明: 此文章版权归 Mr M 所有，如有转载，请注明来自原作者</p>
            </div>
          </div>
          <div class="thumbs-up" @click="thumbsUp">
            <i class="iconfont icon-icon1"></i>
          </div>
          <div class="recommend flex_r_between">
            <div class="recommend-box">
              <el-image class="recommend-box-img" :src="url" />
              <span class="recommend-box-item prev">
                <span class="flex_r_around">
                  <i class="iconfont icon-arrowleft"></i>
                  <span>上一篇</span>
                </span>
                <tooltip width="60%" color="#fff" :name="'文章二'"></tooltip>
              </span>
            </div>
            <div class="recommend-box">
              <el-image class="recommend-box-img" :src="url" />
              <span class="recommend-box-item next">
                <span class="flex_r_around">
                  <span>下一篇</span>
                  <i class="iconfont icon-arrowright"></i>
                </span>
                <tooltip width="60%" color="#fff" :name="'文章三0000000000000001'"></tooltip>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="6">
        <el-card class="command" header="推荐文章">
          <div class="command-box">
            <div class="command-box-item" v-for="(item, index) in recommend" :key="index">
              <el-image class="command-box-item__img" width="50" :src="item.cover" />
              <tooltip width="35%" weight="600" size="1rem" :name="item.title" />
              <tooltip width="35%" size="0.8rem" :name="item.publishTime" />
            </div>
          </div>
        </el-card>
        <el-affix :offset="53" style="width: inherit">
          <el-card class="catalogue-card" header="目录">
            <div class="catalogue-card__box">
              <MdCatalog :editorId="mdState.id" :scroll-element="scrollElement" />
            </div>
          </el-card>
        </el-affix>
      </el-col>
    </el-row>
    <div class="mobile-affix">
      <i class="iconfont icon-sort" @click="toggleDrawer"></i>
    </div>
    <!-- 移动端目录 -->
    <el-drawer title="目录" v-model="drawerShow" direction="ltr" :before-close="toggleDrawer" :append-to-body="true" size="60%" :z-index="9999">
      <MdCatalog :editorId="mdState.id" :scroll-element="scrollElement" />
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue"
import { staticData } from "@/store/index.js"
import { storeToRefs } from "pinia"

import MdEditor from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import cover from "@/assets/img/computer.jpg"
import { getArticleById } from "@/api/article"
import { useRouter } from "vue-router"

const MdCatalog = MdEditor.MdCatalog
const router = useRouter()
// 初始化pinia
const staticStore = staticData()
const { codeTheme, previewTheme, mainTheme } = storeToRefs(staticStore)

// 模仿获取md文档信息
const mdState = reactive({
  text: "",
  id: "my-editor",
  catalogue: [],
  switch: true
})
const articleInfo = ref({})

// 获取md文档目录
const onGetCatalog = list => {
  mdState.catalogue = list
}
const scrollElement = document.documentElement

// 移动端目录
const drawerShow = ref(false)

const toggleDrawer = () => {
  drawerShow.value = !drawerShow.value
}

const url = ref(cover)

// 推荐文章
const recommend = reactive([
  {
    title: "文章一1111",
    publishTime: "2022-11-12",
    cover: cover
  },
  {
    title: "文章二11111",
    publishTime: "2022-11-12",
    cover: cover
  },
  {
    title: "文章三1111",
    publishTime: "2022-11-12",
    cover: cover
  }
])

// 文章点赞
const thumbsUp = () => {
  console.log("点赞")
}

const getArticleDetails = async id => {
  let res = await getArticleById(id)
  if (res.code == 0) {
    mdState.text = res.result.article_content
    articleInfo.value = res.result
  }
}
const init = async id => {
  await getArticleDetails(id)
}

// 初始化数据
onMounted(() => {
  // 监听滚动
  const id = router.currentRoute.value.query.id
  if (id) {
    init(id)
  }
})
</script>

<style lang="scss" scoped>
.article {
  &-info {
    padding: 2rem 2rem;
    &-inner {
      padding: 1rem;
      background-color: rgb(245 245 245);
      border: 1px solid #fff;
    }
  }
}
.catalogue-card {
  margin-top: 1rem;
  padding: 1rem 0.5rem;
  &__box {
    scrollbar-width: none;
    overflow: auto;
    max-height: calc(100vh - 23.1rem);
    cursor: pointer;
  }
}
.mobile-catalog {
  padding: 2rem;
  max-height: 400px;
  scrollbar-width: none;
  overflow-y: auto;
  cursor: pointer;
}
.md-preview-v3 {
  padding: 2rem;
}
.theme-card {
  padding: 1rem 0.5rem;
}
.command {
  padding: 1rem 0.5rem;
  &-box {
    max-height: 160px;
    scrollbar-width: none;
    overflow-y: auto;
    cursor: pointer;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    &-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0.3rem;
      color: var(--font-color);
      &__img {
        margin-right: 1rem;
        width: 50px;
        height: 40px;
      }
    }
  }
}

.icon-sort {
  font-size: 1.8rem;
  color: var(--font-color);
}

.recommend {
  box-sizing: border-box;
  position: relative;
  padding: 2rem;
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 50%;
    height: 100%;
    background: #000;
    overflow: hidden;
    &:hover {
      .recommend-box-img {
        opacity: 0.8;
        transform: scale(1.2);
      }
    }
    &-img {
      transition: all 0.8s;
      opacity: 0.5;
      width: 100%;
      height: 100%;
    }
    &-item {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      color: #fff;
      font-size: 1.2rem;
      line-height: 1.8;
      i {
        font-size: 1.4rem;
      }
    }
    .prev {
      padding-left: 3rem;
      align-items: flex-start;
      div {
        box-sizing: border-box;
        max-width: 10rem;
        font-size: 1rem;
        margin-left: 1rem;
      }
    }
    .next {
      padding-right: 3rem;
      align-items: flex-end;
      div {
        box-sizing: border-box;
        max-width: 10rem;
        font-size: 1rem;
        margin-right: 1rem;
      }
    }
  }
}
.thumbs-up {
  margin: 1rem;
  display: flex;
  justify-content: center;
  .icon-icon1 {
    font-size: 1.8rem;
    &:hover {
      color: var(--primary);
    }
  }
}
:deep(.el-card__header) {
  font-size: 1.6rem;
  padding: 0 !important;
  font-weight: bold;
  line-height: 1.8;
  color: var(--font-color);
}
a {
  text-decoration: underline;
}
</style>
