<template>
  <div class="article">
    <el-row class="article_box">
      <el-col :xs="24" :sm="18">
        <el-card class="md-preview">
          <MdEditor
            class="md-preview-v3"
            v-model="mdState.text"
            :editorId="mdState.id"
            :previewOnly="true"
            :preview-theme="previewTheme"
            :code-theme="codeTheme"
            :theme="mainTheme ? 'dark' : 'light'"
            @on-get-catalog="onGetCatalog"
          ></MdEditor>
          <div class="article-info">
            <div class="article-info-inner">
              <div>
                <span>文章作者：</span>
                <a class="to_pointer" href="https://gitee.com/mrzym">Mr M</a>
              </div>
              <div>
                <span>文章链接：</span>
                <a class="to_pointer" href="https://gitee.com/mrzym">https://gitee.com/mrzym</a>
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
    <el-drawer
      title="目录"
      v-model="drawerShow"
      direction="ltr"
      :before-close="toggleDrawer"
      :append-to-body="true"
      size="60%"
      :z-index="9999"
    >
      <MdCatalog :editorId="mdState.id" :scroll-element="scrollElement" />
    </el-drawer>
  </div>
</template>

<script setup>
import cover from '@/assets/img/computer.jpg'
import { onMounted, ref, reactive, computed, watch } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { staticData } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { _getLocalItem } from '@/utils/tool'

const MdCatalog = MdEditor.MdCatalog
// 初始化数据
onMounted(() => {
  //loadFile()
  // 监听滚动
  init()
})

// 初始化pinia
const staticStore = staticData()
const { codeTheme, previewTheme, mainTheme } = storeToRefs(staticStore)
// watch(
//   () => mdTheme.value,
//   (newV) => {
//     console.log(newV)
//   }
// )

// 模仿获取md文档信息
const mdState = reactive({
  text: '',
  id: 'my-editor',
  catalogue: [],
  switch: true,
})
const init = () => {
  console.log('init')
}

// 获取md文档目录
const onGetCatalog = (list) => {
  mdState.catalogue = list
}
const scrollElement = document.documentElement
mdState.text = `
## 踩坑日记
### sticky 布局
\`\`\`js
data: [
    {
        name: '1',
        value: 25
    },
    {
        name: '2',
        value: 30
    }
]
\`\`\`
sticky布局1
![](https://mrzym.gitee.io/blogimg/cover/guitarGirl.png)
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
\`\`\`html
.blog_info {
    margin-top: 100px;
    position: sticky;
    top: 53px;
    align-self: flex-start;
}
\`\`\`
### 哈哈哈哈2
我是顶针
皮小浪
# 蓝色妖姬2
## 蓝色妖姬3
### 博尔特4
#### 博尔特5
##### 博尔特6
###### 博尔特7
## 踩坑日记77
### sticky 布局77
77
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用z
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
## 踩坑日记rgrg
### sticky 布局z
sticky布局grgr
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
## 踩坑日记
#### sticky 布局grgr
sticky布局
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
## 踩坑日记
### sticky 布局grgr
sticky布局
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
\`\`\`html
.blog_info {
    margin-top: 100px;
    position: sticky;
    top: 53px;
    align-self: flex-start;
}
\`\`\`
### 哈哈哈哈r
我是顶针
皮小浪
# 蓝色妖姬g
## 蓝色妖姬g
### 博尔特r1
#### 博尔特ree
##### 博尔特rrere
###### 博尔特r32
## 踩坑日记23
### sticky 布局3232
sticky布局3232
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
## 踩坑日记3232
### sticky 布局3232
sticky布局
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
## 踩坑日记3232
#### sticky 布局3232
sticky布局3232
当需要使用sticky的父组件外部布局采用flex布局的时候，需要在当前这个子组件内加上align-self: flex-start;
sticky布局才会起作用
第二天我再次写这个的时候，把top: 53px;写成了 top: 53;真的气死了，找了半天才发现没写单位
`

// 移动端目录
const drawerShow = ref(false)

const toggleDrawer = () => {
  drawerShow.value = !drawerShow.value
}

const url = ref(cover)

// 推荐文章
const recommend = reactive([
  {
    title: '文章一1111',
    publishTime: '2022-11-12',
    cover: cover,
  },
  {
    title: '文章二11111',
    publishTime: '2022-11-12',
    cover: cover,
  },
  {
    title: '文章三1111',
    publishTime: '2022-11-12',
    cover: cover,
  },
])

// 文章点赞
const thumbsUp = () => {
  console.log('点赞')
}
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
