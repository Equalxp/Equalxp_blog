const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  // 打包输出
  outputDir: resolve(__dirname, 'dist'),
  assetsDir: 'assets',
  transpileDependencies: true,
  // eslint 保存时检查
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.module.rules.delete('svg') //重点:删除默认配置中处理svg,
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  configureWebpack: {
    // 按需导入element-plus
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // scss
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [],
    },
  },
  css: {
    loaderOptions: {
      // 引入全局scss
      scss: {
        additionalData: `@import "./src/styles/base.scss";`,
      },
    },
  },
  devServer: {
    host: 'localhost',
    hot: true,
    open: true,
    port: 8080,
    proxy: {
      //匹配规则
      '/api': {
        //要访问的跨域的域名
        target: 'http://www.test.com',
        ws: true,
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        changOrigin: true, //开启代理
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
})
