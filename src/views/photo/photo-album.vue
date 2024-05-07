<template>
  <div class="album">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="album-card">
          <el-row class="row-space">
            <el-col class="col-space" :xs="24" :sm="12" v-for="item in album" :key="item">
              <div class="album-box" @click="details">
                <div class="album-box__mask">
                  <span class="name">宇航员</span>
                  <span class="desc">收藏的一些壁纸</span>
                </div>
                <el-image
                  class="album-box__image animate__animated animate__bounceIn"
                  :src="item"
                />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import articleCover from '@/assets/img/astronaut.jpg'
import articleCover1 from '@/assets/img/computer.jpg'
import { useRouter } from 'vue-router'

const album = reactive([])
for (let i = 0; i < 6; i++) {
  i % 2 == 0 ? album.push(articleCover) : album.push(articleCover1)
}

const router = useRouter()
const details = () => {
  router.push('/photos')
}
</script>

<style lang="scss" scoped>
.album {
  &-card {
    padding: 10px;
  }
  &-box {
    position: relative;
    &__image {
      border-radius: 8px;
      vertical-align: middle;
    }
    &__mask {
      display: none;
      .name {
        display: inline-block;
        margin: 15px 0 0 15px;
        color: rgb(36, 34, 34);
        font-size: 18px;
        font-weight: bold;
      }
      .desc {
        display: inline-block;
        margin: 15px 0 0 15px;
        color: rgb(36, 34, 34);
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
.album-box:hover {
  transition: all 0.5s ease-in-out;
  transform: scaleX(0.99);
  .album-box__mask {
    animation: showName 0.8s;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 53px;
    opacity: 0.7;
    background-color: #fff;
    z-index: 999;
  }
}
.row-space {
  padding: 0 !important;
}
.col-space {
  padding: 2px !important;
}
@keyframes showName {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}
</style>
