<template>
  <div class="right-side">
    <el-row>
      <el-col :span="24" class="right-side-space">
        <el-card class="info-card" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideTopSkeleton />
            </template>
            <template #default>
              <RightSideTop />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space">
        <el-card class="right-card flex_c_center" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-gonggao" title="公告" color="#f00">
                <div class="notice-text">欢迎来到小张的blog</div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space">
        <el-card class="right-card flex_c_center" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-speechbubble" title="碎碎念">
                <div class="notice-text">我说话关你什么事</div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space">
        <el-card class="right-card flex_c_center" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-localoffer" title="标签">
                <div class="notice-text">Html、Vue、Css</div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space">
        <el-card class="right-card flex_c_center" shadow="hover">
          <RightSideItem icon="icon-localoffer" title="网站资讯">
            <div class="site-info">
              <div class="flex_r_between">
                <span>文章数目：</span>
                <span class="value">1</span>
              </div>
              <div class="flex_r_between">
                <span>运行时间：</span>
                <span class="value">402天</span>
              </div>
              <div class="flex_r_between">
                <span>访问人数：</span>
                <span class="value">1000+</span>
              </div>
            </div>
          </RightSideItem>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style lang="scss" scoped>
.right-side {
  width: 100%;
  .info-card {
    height: 28rem;
  }
  .right-card {
    padding: 1rem 1.8rem;
    color: #676767;
    min-height: 10rem;
    .card-title {
      font-size: 1.2rem;
      line-height: 2.4;
      .icon-gonggao {
        font-weight: 900;
        color: #f00;
      }
      .icon-speechbubble,
      .icon-schedule,
      .icon-localoffer {
        font-weight: 900;
      }

      span {
        margin-left: 0.3rem;
      }
    }
    .notice-text {
      min-height: 5rem;
      font-size: 1rem;
      line-height: 1.2;
    }
    .site-info {
      padding: 0.3rem 1rem;
      line-height: 2;
      font-size: 1rem;
      .value {
        font-weight: 600;
      }
    }
  }
}
</style>
