const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')

//gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
//gzip 压缩

const resolve = dir => {
  return path.join(__dirname, dir)
}

const assetsDir = 'assets'

const posixJoin = _path => path.posix.join(assetsDir, _path)

//现可以进行三种模式的打包 或 开发


//process.env.NODE_ENV ==  'development' 开发环境 本地运行
//process.env.NODE_ENV ==  'alpha' 开发环境 打包上线
//process.env.NODE_ENV ==  'production' 生产环境 打包上线

const BASE_URL = process.env.NODE_ENV === 'production' ?
  './' :
  '/'

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const Version = new Date().getTime();

module.exports = {

  transpileDependencies: [
    'webpack-dev-server/client', //兼容
  ],

  css: { // 配置css模块
    loaderOptions: { // 向预处理器 Loader 传递配置选项
      less: { // 配置less（其他样式解析用法一致）
        javascriptEnabled: true // 设置为true
      }
    }
  },

  chainWebpack: config => {
    // /**
    //  * 删除懒加载模块的 prefetch preload，降低带宽压力
    //  */
    // config.plugins
    //   .delete('prefetch')
    //   .delete('preload')
    // config.resolve.alias
    //   .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    //   .set('#', resolve('src/components'))
    //   .set('$', resolve('src/assets'))
    //   .set('~', resolve('src/mixins'))
    //
    // config.module //svg loader
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons/svg'))
    //   .end()
    //
    // config.module //svg loader
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons/svg'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    // if (IS_PROD) {
    //   config.module //压缩图片
    //     .rule("images")
    //     .use("image-webpack-loader")
    //     .loader("image-webpack-loader")
    //     .options({
    //       mozjpeg: {
    //         progressive: true,
    //         quality: 55,
    //       },
    //       optipng: {
    //         enabled: false
    //       },
    //       pngquant: {
    //         quality: "65-90",
    //         speed: 4
    //       },
    //       gifsicle: {
    //         interlaced: false
    //       }
    //     });
    //   config //vue-cli3.0配置webpack-bundle-analyzer，使用交互式可缩放树形图可视化webpack输出文件的大小。
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //   config.output //JS版本号
    //     .set('filename', posixJoin(`js/${Version}-[name].[hash].js`))
    //     .set('chunkFilename', posixJoin(`js/${Version}-[id].[hash].js`))
    // }
  },

  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push( // gzip 压缩
        new CompressionWebpackPlugin({
          filename: `[path].${Version}.gz[query]`,
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      plugins.push( // 去掉 console.log
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
    }

    // config.externals = { // CDN引入
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'echarts': 'echarts',
    //   'iview': 'iview',
    //   // 'ag-grid-enterprise': 'agGrid'
    // }
  },
  css: {
    // // 增加版本号
    // loaderOptions: {
    //   less: {
    //     javascriptEnabled: true,
    //   }
    // },
    // extract: !IS_PROD ? false : {
    //   filename: posixJoin(`css/${Version}-[name].[hash:8].css`),
    //   chunkFilename: posixJoin(`css/${Version}-[name].[hash:8].css`)
    // }
  },
  devServer: {
    // port: 9090, // 端口号
    // host: 'localhost',
    // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // proxy: {
    //   '/devApi': { //测试环境API 已经做过跨域处理
    //     // target: 'https://www.beesbit.com/api/public/',
    //     target: 'http://129.28.67.91/Beesbit/API/public/',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/devApi': ''
    //     },
    //     emulateJSON: true,
    //     // headers: {
    //     //   'content-type': 'formData'
    //     // }
    //   },
    //   // '/foo': {
    //   //   target: '<other_url>'
    //   // }
    // }, // 配置多个代理
  },
  baseUrl: BASE_URL,
  lintOnSave: false,
  outputDir: 'dist',
  assetsDir: 'assets',
  pluginOptions: { // 第三方插件配置

  },
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
}
