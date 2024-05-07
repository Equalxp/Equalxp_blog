<template>
  <div class="category center_box">
    <el-card class="category-card">
      <div class="category-total flex_center">
        <tooltip size="2.6rem" :name="`分类 - ${total}`" />
      </div>
      <el-row>
        <el-col
          :xs="24"
          :md="6"
          class="flex_center"
          v-for="(item, i) in categoryList"
        >
          <el-card class="gradient category-item">
            <el-badge
              class="category-item-label"
              :value="item.value"
              @click="goToArticleList(item.categoryId)"
            >
              <tooltip :weight="600" size="1.6rem" :name="item.label" />
            </el-badge>
            <div class="category-item-des">
              <tooltip :name="item.description" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Minus } from "@element-plus/icons-vue";
const router = useRouter();
const categoryList = reactive([]);
const total = ref(6);

onMounted(() => {
  for (let i = 0; i < total.value; i++) {
    categoryList.push({
      categoryId: i,
      label: "分类" + i,
      value: i,
      description: "这是分类" + i,
    });
  }
});

const goToArticleList = (id) => {
  router.push({ path: "/articleList", query: { id: id, type: "分类" } });
};
</script>

<style lang="scss" scoped>
.category {
  &-total {
    text-align: center;
    line-height: 2.4;
  }
  &-card {
    padding: 40px 30px;
  }
  &-item {
    box-sizing: border-box;
    padding: 1rem !important;
    width: 18rem;
    height: 8rem;
    &-label {
      max-width: 80%;
      padding: 3px 0;
      font-size: 1.4rem;
    }
    &-icon {
      font-size: 1.6rem;
      font-weight: 600;
      margin: 0 1rem;
      color: var(--font-color);
    }
    &-des {
      width: 100%;
      font-size: 1rem;
      color: var(--font-color);
    }
  }
}
</style>
