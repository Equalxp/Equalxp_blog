<script setup>
defineProps({
  configDetail: {
    type: Object,
    default: () => {},
  },
  runtime: {
    type: [String, Number],
    default: "两年半",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
    default: () => {},
  },
})
</script>

<template>
  <div class="right-side">
    <el-row>
      <el-col :span="24" class="right-side-space">
        <el-card class="info-card animate__animated animate__fadeIn" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideTopSkeleton />
            </template>
            <template #default>
              <RightSideTop :configDetail="configDetail" />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space">
        <el-card class="right-card flex_c_center animate__animated animate__fadeIn" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-gonggao" title="公告" color="#f00">
                <div class="notice-text">{{ configDetail.blog_notice }}</div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space">
        <el-card class="right-card flex_c_center animate__animated animate__fadeIn" shadow="hover">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-localoffer" title="标签">
                <div class="notice-text">
                  <span class="notice-text__item" v-for="(tag, index) in tags" :key="index" :style="{ color: tag.color }">{{ index + 1 == tags.length ? tag.tag_name : tag.tag_name + "&nbsp;&nbsp;" }}</span>
                </div>
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
              <RightSideItem icon="icon-localoffer" title="网站资讯">
                <div class="site-info">
                  <div class="flex_r_between">
                    <span>文章数目：</span>
                    <span class="value">{{ configDetail.articleCount }}</span>
                  </div>
                  <div class="flex_r_between">
                    <span>运行时间：</span>
                    <span class="value">{{ runtime }} 天</span>
                  </div>
                  <div class="flex_r_between">
                    <span>博客访问次数：</span>
                    <span class="value">{{ configDetail.view_time }}</span>
                  </div>
                </div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

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
      min-height: 6rem;
      font-size: 1.1rem;
      line-height: 1.2;

      &__item {
        display: inline-block;
        font-weight: bold;
        cursor: pointer;
      }
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
