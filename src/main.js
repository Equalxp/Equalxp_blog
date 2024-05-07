import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia' //引入pinia
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './assets/css/iconFont/iconfont.css'

// animate
import 'animate.css'
// image preview
import Vue3PreviewImage from 'vue3-preview-image'

import '@/icons/index'

const app = createApp(App)
app
  .use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
  .use(router)
  .use(createPinia())
  .use(Vue3PreviewImage)
  .mount('#app')
