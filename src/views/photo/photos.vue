<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import { preview } from "vue3-preview-image"
import { useRoute } from "vue-router"
import { getAllPhotosByAlbumId } from "@/api/photo"

const route = useRoute()
const photoList = ref([])
const previewList = ref([])
const loading = ref(false)
const observe = null

// 根据id获取相册图片
const pageGetPhotos = async id => {
  let res = await getAllPhotosByAlbumId(id)
  if (res.code == 0) {
    photoList.value = res.result
    previewList.value = res.result.map(l => l.url)
    loading.value = false
    // 进行观测
    nextTick(() => {
      observePhotoBox() // 监听盒子
    })
    total.value = res.result.total
  }
}

const observePhotoBox = () => {
  // 需要监听的元素
  const boxList = document.querySelectorAll(".image")
  observe = new IntersectionObserver(
    entries => {
      entries.forEach(async e => {
        if (entries.intersectionRatio > 0) {
          // 获取数据
          const src = e.target.getAttribute("data-src")
          // 绑定数据
          e.target.setAttribute("src", src)

          // 停止监听
          observe.unobserve(e.target) //停止监听
        }
      })
    },
    { threshold: [0.1] }
  )
  boxList.forEach(box => {
    // 监听每一张
    observe.observe(box)
  })
}

const show = index => {
  preview(index, previewList.value)
}
onMounted(() => {
  if (route.query.id) {
    pageGetPhotos(Number(route.query.id))
  }
})

onBeforeUnmount(() => {
  observe.disconnect()
})
</script>

<template>
  <PageHeader />
  <div class="photoList">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="photoList-card" v-loading="loading">
          <el-row v-if="photoList.length" class="row-space">
            <el-col class="col-space" :xs="12" :sm="4" v-for="(item, index) in photoList" :key="index">
              <div class="image-box flex_center animate__animated animate__fadeIn">
                <img class="image" :data-src="item.url" fit="fill" @click="show(index)" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.photoList {
  .photoList-card {
    padding: 10px;
    min-height: 12em;
  }
  .image-box {
    width: 100%;
    height: 100%;
  }
  .image {
    vertical-align: middle;
    cursor: pointer;
    width: 10rem;
    height: 10rem;
  }
}
.row-space {
  padding: 0 !important;
}
.col-space {
  padding: 2px !important;
}
</style>
