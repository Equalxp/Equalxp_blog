//导入 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      name: '首页',
    },
    component: Home,
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      name: '分类',
    },
    component: () => import('@/views/category/category.vue'),
  },
  {
    path: '/tag',
    name: 'tag',
    meta: {
      name: '标签',
    },
    component: () => import('@/views/tag/tag.vue'),
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      name: '文章',
    },
    component: () => import('@/views/article/article.vue'),
  },
  {
    path: '/articleList',
    name: 'articleList',
    meta: {
      name: '文章列表',
    },
    component: () => import('@/views/article/article-list.vue'),
  },
  {
    path: '/photoAlbum',
    name: 'photoAlbum',
    meta: {
      name: '相册',
    },
    component: () => import('@/views/photo/photo-album.vue'),
  },
  {
    path: '/photos',
    name: 'photos',
    meta: {
      name: '图库',
    },
    component: () => import('@/views/photo/photos.vue'),
  },
  {
    path: '/menu',
    name: 'menu',
    children: [
    
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
