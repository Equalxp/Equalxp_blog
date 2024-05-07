import { defineStore } from 'pinia' //引入pinia
import { _getLocalItem, _setLocalItem } from '@/utils/tool'
import { useDark, useToggle } from '@vueuse/core'


const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})
const toggle = useToggle(isDark)


export const staticData = defineStore('staticData', {
  state: () => {
    return {
      previewThemeList: ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis'],
      codeThemeList: [
        'atom',
        'a11y',
        'github',
        'gradient',
        'kimbie',
        'paraiso',
        'qtcreator',
        'stackoverflow',
      ],
      previewTheme: 'default',
      codeTheme: 'atom',
      theme: isDark.value,
    }
  },
  getters: {
    mainTheme() {
      return isDark.value
    },
  },
  actions: {
    switchMainTheme() {
      toggle()
      this.theme = isDark.value
      _setLocalItem('mainTheme', this.theme ? 'dark' : 'light')
    },
  },
})

export const user = defineStore('user', {
  state: () => {
    return {
      userInfo: '小张',
    }
  },
})
