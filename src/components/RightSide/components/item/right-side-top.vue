<template>
  <el-image class="info-background" fit="cover" :src="infoBackground"></el-image>
  <div class="info-avatar">
    <router-link to="/"><el-avatar :src="avatar" /> </router-link>
    <span class="blog-name">过期的保鲜袋 </span>
  </div>
  <div class="personal-say">更用心的活下去，给自己一个拥抱。</div>
  <div class="common-menu flex_r_between">
    <span class="flex_c_center" @click="operate('goToCategory')">
      <span class="common-menu__label">分类</span>
      <span class="common-menu__value">15</span>
    </span>
    <span class="flex_c_center" @click="operate('goToTag')">
      <span class="common-menu__label">标签</span>
      <span class="common-menu__value">10</span>
    </span>
    <span class="flex_c_center" @click="operate('goToArchives')">
      <span class="common-menu__label">文章</span>
      <span class="common-menu__value">5</span>
    </span>
  </div>
  <div class="git-ee flex_r_around">
    <span class="git-ee__item button-animated">
      <i class="iconfont icon-gitee2" @click="operate('gitee2')"> </i>
      <span class="git-ee__item-text"> My Gitee</span>
    </span>
  </div>
  <div class="personal-link flex_r_around">
    <i class="iconfont icon-bilibili-line" @click="operate('bilibili')"></i>
    <i class="iconfont icon-github-fill" @click="operate('github')"></i>
  </div>
</template>

<script setup>
import blogAvatar from '@/assets/img/blogAvatar.png'
import computer from '@/assets/img/computer.jpg'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const avatar = ref(blogAvatar) // 博客头像
const infoBackground = ref(computer) // 博客头像背景

/* operate start */
const operate = (op, type) => {
  switch (op) {
    case 'goToCategory':
      router.push('/category')
      break
    case 'goToTag':
      router.push('/tag')
      break
    case 'goToArchives':
      router.push('/archives')
      break
  }
}
</script>
<style lang="scss" scoped>
.info-background {
  height: 8rem;
  width: 100%;
}
.info-avatar {
  display: flex;
  justify-content: flex-start;
  .el-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    transition: ease-in-out 1s;
    background-color: #fff;
    margin: -2rem 0 0 1rem;
    &:hover {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  .blog-name {
    padding-left: 0.5rem;
    color: #222;
    font-size: 14px;
  }
}
.personal-say {
  height: 5rem;
  padding: 5px;
  color: var(--font-color-title);
  font-size: 1em;
}
.common-menu {
  font-size: 1rem;
  color: #1f2d3d;
  font-weight: 1.4rem;
  padding: 1.5rem 3.5rem;
  &__label {
    color: #533737;
    font-size: 1rem;
    font-weight: 400;
  }
  &__value {
    margin-top: 0.3rem;
    color: var(--text-highlight-color);
    font-size: 1.4rem;
  }
}
.git-ee {
  padding: 0 2rem;
  &__item {
    width: 100%;
    line-height: 1.6;
    text-align: center;
    background-color: #533737;
    border-radius: 3px;
    .iconfont {
      color: #fff;
      font-size: 1.2rem;
    }
    &-text {
      font-size: 1.2rem;
      color: #fff;
      padding-left: 0.5rem;
    }
  }
}
.button-animated {
  position: relative;
  z-index: 1;
  transition: color 1s;
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: var(--primary);
    content: '';
    transition: transform 0.5s ease-out;
    transform: scaleX(0);
    transform-origin: 0 50%;
  }
  &:hover {
    &:before {
      transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
      transform: scaleX(1);
    }
  }
}
.personal-link {
  padding: 1rem 6rem;
  .iconfont {
    font-size: 1.8rem;
  }
}
</style>
