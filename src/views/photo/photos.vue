<template>
  <div class="album">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="album-card">
          <el-row class="row-space">
            <el-col
              class="col-space"
              :xs="24"
              :sm="12"
              :md="6"
              v-for="(item, index) in album"
              :key="index"
            >
              <div class="animate__animated animate__fadeIn">
                <el-image class="image" :src="item" fit="contain" @click="show(index)"></el-image>
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
import { preview } from 'vue3-preview-image'

const album = reactive([])
for (let i = 0; i < 6; i++) {
  i % 2 == 0 ? album.push(articleCover) : album.push(articleCover1)
}
const show = (index) => {
  preview(index, album)
}
</script>

<style lang="scss" scoped>
.album {
  .album-card {
    padding: 10px;
  }
  .image {
    vertical-align: middle;
    cursor: pointer;
  }
}
.row-space {
  padding: 0 !important;
}
.col-space {
  padding: 2px !important;
}
</style>
