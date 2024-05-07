<template>
  <div class="center_box">
    <el-card class="article-list">
      <div class="article-list__head flex_r_between">
        <div class="article-list__head-type">{{ type }}</div>
        <div class="article-list__head-total">文章总数：{{ total }}</div>
      </div>
      <div
        class="article-list__item"
        v-for="(item, index) in articleList"
        :key="index"
      >
        <div class="year">{{ item.year }}</div>
        <el-row>
          <el-col
            :xs="24"
            :sm="6"
            v-for="(article, index) in item.list"
            :key="index"
          >
            <el-card class="gradient">
              <el-image class="article-img" :src="article.url"></el-image>
              <div class="article-title">
                <Tooltip :name="article.title" size="1.2rem" />
                <div class="article-time">{{ article.timestamp }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import timelineCover from "@/assets/img/astronaut.jpg";
import { useRoute } from "vue-router";

onMounted(() => {
  console.log(route.query);
  let res = load(param);
  res.forEach((v) => {
    articleList.push(v);
  });
  // articleList.splice(0, res.length, res)
  total.value = res.length;
});
const route = useRoute();
const type = route.query.type;
const articleList = reactive([]);
let param = reactive({
  // 放置页码及相关数据
  current: 1, //当前页
  size: 10, //每页条目数
});
let total = ref(0); // 记录总数
let layout = " prev, pager, next"; //分页组件会展示的功能项

const pageNation = (page) => {
  param.current = page.current;
};

const load = (param) => {
  return [
    {
      year: "2023",
      list: [
        {
          title: "这是第一篇文章",
          timestamp: "2023-04-03",
          url: timelineCover,
        },
        {
          title: "这是第二篇文章",
          timestamp: "2023-05-03",
          url: timelineCover,
        },
        {
          title: "这是第一篇文章",
          timestamp: "2023-04-03",
          url: timelineCover,
        },
        {
          title: "这是第二篇文章",
          timestamp: "2023-05-03",
          url: timelineCover,
        },
        {
          title: "这是第一篇文章",
          timestamp: "2023-04-03",
          url: timelineCover,
        },
        {
          title: "这是第二篇文章",
          timestamp: "2023-05-03",
          url: timelineCover,
        },
      ],
    },
    {
      year: "2022",
      list: [
        {
          title: "这是第三篇文章",
          timestamp: "2022-04-03",
          url: timelineCover,
        },
        {
          title: "这是第四篇文章1111111111",
          timestamp: "2022-06-03",
          url: timelineCover,
        },
      ],
    },
  ];
};
</script>

<style lang="scss" scoped>
.article-list {
  padding: 40px 30px;
  width: 100%;
  color: var(--font-color);
  &__head {
    font-size: 2.4rem;
    line-height: 1.7;
    font-weight: 600;
    color: #b3b7ff;
    &-total {
      font-size: 1.6rem;
    }
  }
  &__item {
    width: 100%;
    .year {
      font-size: 1.4rem;
      line-height: 1.7;
      font-weight: 600;
      color: #b3b7ff;
    }
    .article {
      &-title {
        font-size: 1.2rem;
        height: 5rem;
        padding: 0.5rem;
        line-height: 1.8;
      }
      &-img {
        width: 100%;
      }
      &-time {
        font-size: 1rem;
        line-height: 1.4;
        color: var(--font-color);
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .article-img {
    height: 8rem;
  }
}
@media screen and (max-width: 768px) {
  .article-img {
    height: 10rem;
  }
}
</style>
