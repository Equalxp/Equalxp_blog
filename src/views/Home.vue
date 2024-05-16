<script setup>
import { ref, reactive, onMounted } from "vue"
import { homeGetArticleList } from "@/api/article"
import { homeGetConfig } from "@/api/config"
import { getAllTag } from "@/api/tag"
import { homeGetStatistic } from "@/api/home"
import { randomFontColor } from "@/utils/tool"
import HomeArticleList from "@/components/HomeArticle/home-article-list.vue"
import RightSide from "@/components/RightSide/right-side.vue"

/** 文章 */
const param = reactive({
  current: 1, // 当前页
  size: 10, // 每页条目数
  loading: true, // 加载
})
const articleList = ref([])
const articleTotal = ref()

const getHomeArticleList = async type => {
  type == "init" ? "" : (param.loading = true)
  let res = await homeGetArticleList(param.current, param.size)

  if (res.code == 0) {
    const { list, total } = res.result
    articleList.value = list
    articleTotal.value = total
    type == "init" ? "" : (param.loading = false)
  }
}

const pagination = page => {
  param.current = page.current
  getHomeArticleList()
}

/** 网站右侧 */
const rightSizeLoading = ref(true)
const runtime = ref(0)
let configDetail = reactive({})
let tags = ref([])

// 获取网站详细信息
const getConfigDetail = async () => {
  let res = await homeGetConfig()
  if (res.code == 0) {
    configDetail = res.result
    calcRuntimeDays(configDetail.createdAt)
  }
}
// 获取文章数、分类数、标签数
const getStatistic = async () => {
  let res = await homeGetStatistic()
  if (res.code == 0) {
    Object.assign(configDetail, res.result)
  }
}

// 获取所有的标签
const getAllTags = async () => {
  let res = await getAllTag()
  if (res.code == 0) {
    tags.value = res.result.map(r => {
      r.color = randomFontColor()
      return r
    })
  }
}
// 计算出网站运行天数
const calcRuntimeDays = time => {
  if (time) {
    const now = new Date().getTime()
    const created = new Date(time).getTime()
    const days = Math.floor((now - created) / 8.64e7)
    runtime.value = days
  }
}

const init = async () => {
  param.loading = true
  rightSizeLoading.value = true
  await getHomeArticleList("init")
  await getConfigDetail()
  await getStatistic()
  await getAllTags()
  param.loading = false
  rightSizeLoading.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div class="home_center_box">
    <el-row>
      <el-col :xs="24" :sm="18">
        <el-card class="mobile-top-card info-card animate__animated animate__fadeIn" shadow="hover">
          <el-skeleton :loading="rightSizeLoading" animated>
            <template #template>
              <RightSideTopSkeleton />
            </template>
            <template #default>
              <RightSideTop :configDetail="configDetail" />
            </template>
          </el-skeleton>
        </el-card>
        <!-- 博客文章 -->
        <HomeArticleList :articleList="articleList" :param="param" :articleTotal="articleTotal" @pageChange="pagination"></HomeArticleList>
      </el-col>
      <el-col :xs="0" :sm="6">
        <!-- 博客我的信息 -->
        <RightSide :configDetail="configDetail" :tags="tags" :runtime="runtime" :loading="rightSizeLoading" />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.mobile-top-card {
  height: 28rem;
  margin: 4px;
}
</style>
