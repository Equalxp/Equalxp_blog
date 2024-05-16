<template>
  <div class="home_center_box">
    <el-row>
      <el-col :xs="24" :sm="18">
        <!-- 博客文章 -->
        <HomeArticleList></HomeArticleList>
      </el-col>
      <el-col :xs="0" :sm="6">
        <!-- 博客我的信息 -->
        <RightSide />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>

</script>

<style lang="scss" scoped>

</style>
