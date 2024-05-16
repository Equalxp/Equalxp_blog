<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { getAllCategory } from "@/api/category"
const router = useRouter()
const categoryList = ref([])
const total = ref(0)
const loading = ref(false)

const getCategoryList = async () => {
  loading.value = true
  let res = await getAllCategory()
  if (res.code == 0) {
    categoryList.value = res.result
    total.value = res.result.length
    loading.value = false
  }
}

onMounted(() => {
  getCategoryList()
})

const goToArticleList = item => {
  router.push({ path: "/articleList", query: { id: item.id, type: "category", name: item.category_name } })
}
</script>

<template>
  <div class="category center_box">
    <el-card class="category-card">
      <div class="category-total flex_center">
        <tooltip size="2.6rem" color="#b3b7ff" weight="500" :name="`分类 - ${total}`" />
      </div>
      <el-row v-if="loading">
        <el-col :xs="12" :sm="6" :md="4" class="flex_center" v-for="i in 6" :key="i">
          <el-skeleton :loading="loading" style="height: 100%" animated>
            <template #template>
              <SkeletonItem variant="text" width="100%" height="80px" />
            </template>
          </el-skeleton>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :xs="12" :sm="6" :md="4" class="flex_center" v-for="(item, i) in categoryList">
          <el-card class="gradient category-item" @click="goToArticleList(item)">
            <tooltip class="to_pointer" color="#b3b7ff" :weight="600" size="1.4rem" :name="item.category_name" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.category {
  &-total {
    margin-left: 1.2rem;
    line-height: 2.4;
  }

  &-card {
    padding: 40px 30px;
  }

  &-item {
    box-sizing: border-box;
    padding: 0rem 1rem !important;
    width: 10rem;
    height: 6rem;
    line-height: 6rem;
  }
}
</style>
