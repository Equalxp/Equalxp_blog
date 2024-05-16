<script setup>
import { ref, reactive, onMounted } from "vue"
import { preview } from "vue3-preview-image"
import { useRoute } from "vue-router"
import { getPhotosByAlbumId } from "@/api/photo"

const route = useRoute()
const photoList = ref([])
const total = ref(0)
const previewList = ref([])

const param = reactive({
  current: 1,
  size: 12,
  status: 1,
  id: null
})

const pageGetPhotos = async () => {
  let res = await getPhotosByAlbumId(param)
  if (res.code == 0) {
    if (param.current == 1) {
      photoList.value = res.result.list
      previewList.value = res.result.list.map(l => l.url)
    } else {
      photoList.value = photoList.value.concat(res.result.list)
      res.result.list.forEach(l => {
        previewList.value.push(l.url)
      })
    }
    total.value = res.result.total
  }
}

const show = index => {
  preview(index, previewList.value)
}
onMounted(() => {
  if (route.query.id) {
    param.id = Number(route.query.id)
    pageGetPhotos()
  }
})
</script>

<template>
  <PageHeader />
  <div class="photoList">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="photoList-card">
          <el-row v-if="photoList.length" class="row-space">
            <el-col class="col-space" :xs="12" :sm="4" v-for="(item, index) in photoList" :key="index">
              <div class="image-box flex_center animate__animated animate__fadeIn">
                <el-image class="image" :src="item.url" fit="fill" @click="show(index)"></el-image>
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
