<template>
  <el-row>
    <el-col v-for="(item, index) in articleList" :key="item">
      <el-card>
        <div class="article-box">
          <el-skeleton :loading="param.loading" style="height: 100%" animated>
            <template #template>
              <ArticleSkeleton />
            </template>
            <template #default>
              <div class="article-cover scale" @click="operate('detail', item)">
                <el-image
                  :src="item.cover"
                  fit="cover"
                  class="image animate__animated animate__fadeInDown"
                >
                  <template #error>
                    <svg-icon name="image" :width="20" :height="20"></svg-icon>
                  </template>
                </el-image>
              </div>
              <!-- 信息 -->
              <div class="article-info flex_c_between">
                <div class="title" @click="operate('detail', item)">
                  {{ item.articleTitle }}
                </div>
                <div class="meta">
                  <span class="to_pointer">
                    <i class="iconfont icon-calendar2"></i>
                    <span class="meta-label">发表于</span>
                    <span class="meta-value">{{ item.publishDate }}</span>
                  </span>
                  <span class="to_pointer">
                    <i class="iconfont icon-schedule"></i>
                    <span class="meta-label">更新于</span>
                    <span class="meta-value">{{ item.updateDate }}</span>
                    <span class="article-meta__separator">|</span>
                  </span>
                  <span class="to_pointer" @click="operate('category', item)">
                    <i class="iconfont icon-folder"></i>
                    <span class="meta-value">{{ item.category }}</span>
                    <span class="article-meta__separator">|</span>
                  </span>
                  <span class="to_pointer" @click="operate('tag', item)">
                    <i class="iconfont icon-label_fill"></i>
                    <span class="meta-value">{{ item.tags }}</span>
                    <span class="article-meta__separator">|</span>
                  </span>
                  <span class="to_pointer">
                    <i class="iconfont icon-speechbubble"></i>
                    <span class="meta-value">11</span>
                    <span class="article-meta__separator">|</span>
                  </span>
                  <span class="to_pointer">
                    <i class="iconfont icon-chakan"></i>
                    <span class="meta-value">11</span>
                  </span>
                </div>
                <div class="desc flex_c_between">关于我的描述</div>
              </div>
            </template>
          </el-skeleton>
        </div>
        <!-- 图片 -->
      </el-card>
    </el-col>
    <pagi-nation
      :size="param.size"
      :current="param.current"
      :layout="layout"
      :total="total"
      @pagination="pagination"
    />
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import articleCover from "@/assets/img/astronaut.jpg";

const props = defineProps({
  articles: {
    type: Array,
    default: () => {},
  },
});
onMounted(() => {
  init();
});
const articleList = reactive([]);

// 初始化
const init = () => {
  /* 初始化文章 start */
  for (let i = 0; i < 9; i++) {
    articleList.push(props.articles[0]);
    articleList[i].cover = articleCover;
  }
  setTimeout(() => {
    param.loading = false;
  }, 2000);
  /* 初始化文章 end */
};

/* 文章操作 start */
const router = useRouter();
const operate = (type, item, index) => {
  switch (type) {
    case "detail":
      router.push({ path: "/article" });
      break;
    case "tag":
      router.push({ path: "/tag" });
      break;
    case "category":
      router.push({ path: "/category" });
      break;
  }
};
/* 文章操作 end */

let param = reactive({
  // 放置页码及相关数据
  current: 1, //当前页
  size: 10, //每页条目数
  loading: true,
});
let total = ref(20); // 记录总数
let layout = " prev, pager, next"; //分页组件会展示的功能项

const pagination = (page) => {
  param.current = page.current;
  console.log(page);
};
</script>

<style lang="scss" scoped>
.article-cover {
  .image {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
}
.article-info {
  .title {
    font-size: 1.8rem;
    color: #676767;
    font-weight: 600;
    line-height: 3;
    transition: 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }
  .meta {
    color: #858585;
    line-height: 1.4;
    font-size: 100%;
    font-weight: 500;
    &-label {
      padding-right: 0.2rem;
    }
    &-value {
      padding-right: 0.2rem;
    }
    .icon-speechbubble {
      font-size: 14px;
    }
    .article-meta__separator {
      margin: 0 0.3rem;
    }
    i {
      margin: 0 0.2rem 0 0;
    }
  }
  .desc {
    font-size: 120%;
    color: #676767;
    font-weight: 500;
    line-height: 3;
  }
}
@media screen and (max-width: 768px) {
  .article-box {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    height: 30rem;
  }
  .article-cover {
    width: 100%;
    height: 18rem;
    overflow: hidden;
  }
  .article-info {
    width: 100%;
    padding: 1rem 1.5rem;
    overflow: hidden;
    display: inline-block;
  }
}
// pc
@media screen and (min-width: 768px) {
  .article-box {
    display: flex;
    align-items: center;
    height: 20rem;
  }
  .article-cover {
    width: 45%;
    height: 100%;
    overflow: hidden;
  }
  .article-info {
    width: 55%;
    padding: 0 40px;
    overflow: hidden;
    display: inline-block;
  }
}
</style>
