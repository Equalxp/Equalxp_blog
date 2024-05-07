<template>
  <div class="search">
    <span class="iconfont icon-nav-search scale" @click="clickSearchIcon"></span>
    <div v-if="isClick">
      <el-dialog
        v-model="searchShow"
        title="搜索"
        class="my-search-dialog"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :lock-scroll="false"
        :append-to-body="true"
      >
        <el-input
          v-model="input"
          class="search-input"
          placeholder="请输入搜索内容"
          :prefix-icon="Search"
          clearable
          @clear="searchInfo"
          @change="searchInfo"
        />
        <div class="main-box">
          <div v-if="result">
            {{ result }}
          </div>
          <div v-else><el-empty class="empty" description="暂无数据" /></div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from 'vue'
import { Search } from '@element-plus/icons-vue'

const { proxy } = getCurrentInstance()
const isClick = ref(false)
const searchShow = ref(false)
const input = ref('') // 搜索内容
const result = ref('') // 搜索结果

const clickSearchIcon = () => {
  // 打开搜索框
  isClick.value = true
  searchShow.value = true
}

const handleClose = () => {
  // 关闭搜索框
  searchShow.value = false
  isClick.value = false
}

const searchInfo = () => {
  // 搜索方法
  if (input.value != '') {
    result.value = '搜索内容'
  } else {
    result.value = ''
  }
}
</script>

<style lang="scss" scoped>
.search {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .iconfont {
    font-size: 1.8rem;
    cursor: pointer;
    color: var(--font-color);
  }
}
.main-box {
  margin-top: 10px;
  height: 200px;
  overflow: auto;
  //background-color: var(--primary);
}

.search-input {
  height: 35px;
  border-radius: 8px;
  :deep(.el-input__prefix-inner) {
    font-size: 1.6rem;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--primary) inset;
  }
}
.empty {
  width: 100%;
  height: 180px;
}
</style>
