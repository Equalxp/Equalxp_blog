<template>
  <div class="home_center_box">
    <el-row>
      <el-col :xs="24" :sm="18">
        <!-- 博客文章 -->
        <HomeArticleList :articles="articleList"></HomeArticleList>
      </el-col>
      <el-col :xs="0" :sm="6">
        <!-- 博客我的信息 -->
        <RightSide />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const articleList = reactive([
  {
    articleTitle: '我的文章1',
    tags: 'Vue.js',
    category: '学习',
    publishDate: '2022-9-10',
    updateDate: '2022-9-10',
    author: '小张',
  },
])
</script>

<style lang="scss" scoped></style>
