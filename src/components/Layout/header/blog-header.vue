<template>
  <div class="header_box" :class="headerState.headerClass">
    <div class="pc_menu flex_r_between">
      <div class="sub-avatar">
        <router-link to="/"><el-avatar class="el-avatar" :src="headerState.avatar" /> </router-link>
      </div>
      <div class="flex_r_around">
        <BlogSearch></BlogSearch>
        <el-menu
          class="sub-menu"
          mode="horizontal"
          :default-active="getPath"
          :ellipsis="false"
          @select="(val) => handleSelect(val, 'pc')"
        >
          <el-menu-item index="/"><i class="iconfont icon-home"></i> 主页</el-menu-item>
          <el-menu-item index="/category"><i class="iconfont icon-sort"></i> 分类</el-menu-item>
          <el-menu-item index="/tag"><i class="iconfont icon-label_fill"></i> 标签</el-menu-item>
          <el-menu-item index="/photoAlbum"><i class="iconfont icon-paper"></i> 相册</el-menu-item>
          <el-sub-menu index="/menu">
            <template #title><i class="iconfont icon-menu21"></i> 菜单</template>
          </el-sub-menu>
        </el-menu>
        <SwitchTheme />
      </div>
    </div>
    <div class="mobile_menu flex_r_between">
      <span class="iconfont icon-menu2" @click="headerState.drawerShow = true"></span>
      <div class="flex_r_between">
        <BlogSearch></BlogSearch>
        <el-drawer
          title="导航"
          v-model="headerState.drawerShow"
          direction="ltr"
          :before-close="handleClose"
          :append-to-body="true"
          size="60%"
          :z-index="9999"
        >
          <el-menu
            class="sub-menu"
            :default-active="getPath"
            :ellipsis="false"
            @select="(val) => handleSelect(val, 'mobile')"
          >
            <el-menu-item index="/"><i class="iconfont icon-home"></i> 主页</el-menu-item>
            <el-menu-item index="/category"><i class="iconfont icon-sort"></i> 分类</el-menu-item>
            <el-menu-item index="/tag"><i class="iconfont icon-label_fill"></i> 标签</el-menu-item>
            <el-menu-item index="/photoAlbum"
              ><i class="iconfont icon-paper"></i> 相册</el-menu-item
            >
            <el-sub-menu index="/menu">
              <template #title><i class="iconfont icon-menu21"></i> 菜单</template>
            </el-sub-menu>
          </el-menu>
        </el-drawer>
        <SwitchTheme />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import blogAvatar from '@/assets/img/blogAvatar.png'

const router = useRouter()
const route = useRoute()
const headerState = reactive({
  avatar: '',
  drawerShow: false,
  startScrollTop: 0,
  headerClass: '',
  activeIndex: 0,
})

onMounted(() => {
  // 页面增加滚动事件
  headerState.avatar = blogAvatar
  window.addEventListener('scroll', scroll)
})
const getPath = computed(() => {
  return route.path
})

// 切换menu
const handleSelect = function (val, type) {
  router.push(val)
  if (type == 'mobile') {
    headerState.drawerShow = false
  }
}

// 切换抽屉
const handleClose = () => {
  headerState.drawerShow = false
}

// 顶部导航固定
const scroll = () => {
  let scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  const { startScrollTop } = headerState
  if (startScrollTop > scrollTop) {
    headerState.headerClass = 'fixed-header'
  } else if (startScrollTop <= scrollTop) {
    headerState.headerClass = 'hide-header'
  } else if (scrollTop == '0') {
    headerState.headerClass == ''
  }
  headerState.startScrollTop = scrollTop
}
</script>

<style lang="scss" scoped>
.header_box {
  .sub-avatar {
    padding: 5px 0 0 0;
    .el-avatar {
      transition: ease-in-out 1s;
      background-color: #fff;
    }
    .el-avatar:hover {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  .sub-menu {
    height: 53px;
    .icon-sort {
      font-size: 1.2rem;
    }
    .icon-icon,
    .icon-label_fill {
      font-size: 1.3rem;
    }
  }
}
.iconfont {
  font-size: 1.2rem;
  margin-right: 5px;
}
.icon-menu2 {
  font-size: 1.4rem;
}
:deep(.el-drawer__close-btn .el-icon) {
  font-size: 22px;
}

.hide-header {
  animation-name: hideHeader;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}
.fixed-header {
  animation-name: header;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}
@keyframes header {
  0% {
    transform: translateY(-52px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0px);
    opacity: 0.8;
  }
}
@keyframes hideHeader {
  0% {
    transform: translateY(0px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-52px);
    opacity: 0.5;
  }
}
</style>
