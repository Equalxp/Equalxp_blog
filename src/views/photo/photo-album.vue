<script setup>
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getAlbumList } from "@/api/photo"

const param = reactive({
  current: 1,
  size: 8
})
const albumList = ref([])
const total = ref(0)

const router = useRouter()
const goToPhotos = id => {
  router.push({ path: "/photos", query: { id } })
}

const pageGetAlbumList = async () => {
  let res = await getAlbumList(param)
  if (res.code == 0) {
    if (param.current == 1) {
      albumList.value = res.result.list
    } else {
      albumList.value = albumList.value.concat(res.result.list)
    }
    total.value = res.result.total
  }
}

onMounted(() => {
  pageGetAlbumList()
})
</script>

<template>
  <PageHeader />
  <div class="albumList">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="albumList-card">
          <el-row class="row-space">
            <el-col class="col-space" :xs="12" :sm="6" v-for="item in albumList" :key="item.id">
              <div class="albumList-box flex_center" @click="goToPhotos(item.id)">
                <div class="albumList-box__mask">
                  <span class="name">{{ item.album_name }}</span>
                  <span class="desc">{{ item.description }}</span>
                </div>
                <el-image class="albumList-box__image animate__animated animate__bounceIn" :src="item.album_cover" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.albumList {
  &-card {
    padding: 10px;
  }
  &-box {
    width: 100%;
    height: 100%;
    &__image {
      position: relative;
      border-radius: 8px;
      vertical-align: middle;
      width: 16rem;
      height: 10rem;
    }
    &__mask {
      display: none;
      .name {
        display: block;
        margin: 15px 0 0 15px;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
      }
      .desc {
        display: block;
        margin: 15px 0 0 15px;
        color: #fff;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }
}
.albumList-box:hover {
  transition: all 0.2s ease-in-out;
  transform: scaleX(0.95);
  .albumList-box__mask {
    display: block;
    position: absolute;
    top: 0;
    left: 3px;
    right: 3px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 999;
  }
}
.row-space {
  padding: 0 !important;
}
.col-space {
  padding: 2px !important;
}
</style>
