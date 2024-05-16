<script setup>
import { ref } from "vue"
import { Search } from "@element-plus/icons-vue"

import { getHotArticle, getArticleByContent } from "@/api/article"
import { _setLocalItem, _getLocalItem, _removeLocalItem } from "@/utils/tool"
import { useRouter } from "vue-router"

const isClick = ref(false)
const searchShow = ref(false)
const input = ref("") // 搜索内容
const searchResult = ref([]) // 搜索结果
const hotSearchList = ref([])
const historySearchList = ref([])
const numberList = ["&#9312;", "&#9313;", "&#9314;", "&#9315;", "&#9316;"]

const clickSearchIcon = async () => {
  // 打开搜索框
  isClick.value = true
  searchShow.value = true

  historySearchList.value = _getLocalItem("blogSearchHistory") || []

  // 获取热门文章
  let res = await getHotArticle()
  if (res.code == 0) {
    hotSearchList.value = res.result.map((r, index) => {
      return {
        id: r.id,
        article_title: r.article_title,
        icon: numberList[index]
      }
    })
  }
}

const handleClose = () => {
  // 关闭搜索框
  searchShow.value = false
  isClick.value = false
  input.value = ""
  searchResult.value = []
}

const searchInfo = () => {
  // 搜索方法
  if (input.value != "") {
    getArticleList()
  } else {
    searchResult.value = []
    historySearchList.value = _getLocalItem("blogSearchHistory") || []
  }
}

const clickHistoryTag = val => {
  input.value = val
  searchInfo()
}

// 根据文章内容来搜索文章
const getArticleList = async () => {
  let res = await getArticleByContent(input.value)
  if (res.code == 0) {
    searchResult.value =
      res.result.length &&
      res.result.map(r => {
        return {
          id: r.id,
          article_title: r.article_title,
          highlight_content: input.value,
          rest_content: r.article_content.substring(input.value.length)
        }
      })
    if (historySearchList.value.length > 10) {
      historySearchList.shift()
    }
    if (historySearchList.value.findIndex(h => h == input.value) == -1) {
      historySearchList.value.push(input.value)
    }
    _setLocalItem("blogSearchHistory", historySearchList.value)
  }
}

const clearHistorySearch = () => {
  _removeLocalItem("blogSearchHistory")
  historySearchList.value = []
}

const goToArticle = id => {
  handleClose()
  router.push({ path: "/article", query: { id } })
}
</script>

<template>
  <div class="search">
    <span class="iconfont icon-nav-search scale" @click="clickSearchIcon"></span>
    <div v-if="isClick">
      <el-dialog v-model="searchShow" title="搜索" class="my-search-dialog" :before-close="handleClose" :close-on-click-modal="false" :lock-scroll="false" :append-to-body="true">
        <el-input v-model="input" class="search-input" placeholder="请输入搜索内容" :prefix-icon="Search" clearable @clear="searchInfo" @change="searchInfo" />
        <div class="search-main__box">
          <div v-if="result.length">
            <div v-for="(article, index) in result" :key="index">
              <span>{{ article.article_title }}</span>
              <span>{{ article.article_content }}</span>
            </div>
          </div>
          <div v-else class="empty">
            <div class="hot-box">
              <div class="hot-box__search">
                <div class="history">
                  搜索历史
                  <div class="hot-box__tag">
                    <el-tag style="margin: 0.3rem" v-for="history in historySearchList" type="info" :closable="true">{{ history }}</el-tag>
                  </div>
                </div>
                <div class="hot-search">
                  <div class="flex_r_between">
                    热门搜索
                    <i class="iconfont icon-hot"></i>
                  </div>
                  <div class="hot-box__tag">
                    <el-tag style="margin: 0.3rem" v-for="(hot, index) in hotSearchList" :type="index < 3 ? 'danger' : 'info'" :closable="true">{{ hot }}</el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

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
.search-main__box {
  margin-top: 10px;
  height: 100%;
  overflow: auto;
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
}
.hot-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &__search {
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .icon-hot {
    font-size: 1.8rem;
    color: var(--hot-color);
  }
  .history {
    width: 50%;
    height: 100%;
  }
  .hot-search {
    width: 50%;
    height: 100%;
  }
}
</style>
