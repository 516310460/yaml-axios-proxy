const pkg = require('./package')
const webpack = require('webpack')
// const HappyPack = require('happypack')
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/buybit.ico' },
    ],
    // script: [
    //   { src: 'https://s13.cnzz.com/z_stat.php?id=1273759983&web_id=1273759983' }
    // ],
  },

  ssh: {
    server1: {
      hostname: '1.2.3.4',
      privateKey: '/path/to/key',
      env: {
        FOOBAR: 'foobar'
      },
      log: 'logs/ssh-server1.log'
    }
  },

  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://test.buybit.com' : process.env.NODE_ENV === 'testing' ? 'https://192.168.9.236' : 'http://192.168.9.232',// api接口ip地址
    imgServerUrl: process.env.NODE_ENV === 'production' ? 'https://image.buybit.com/' : process.env.NODE_ENV === 'testing' ? 'http://192.168.9.236:8999/' : 'http://192.168.9.236:8999/',// 图片的服务器地址 正式线上图片地址image.buybit.com
    webSocketUrl: process.env.NODE_ENV === 'production' ? 'wss://test.buybit.com' : process.env.NODE_ENV === 'testing' ? 'wss://192.168.9.236:442' : 'ws://192.168.9.232:8082',// socket ws接口ip地址
    webSocketHttpUrl: process.env.NODE_ENV === 'production' ? 'https://test.buybit.com' : process.env.NODE_ENV === 'testing' ? 'https://192.168.9.236:442' : 'http://192.168.9.232:8082',// socket api接口ip地址
    // baseUrl: process.env.NODE_ENV === 'production' ? 'https://test.buybit.com' : 'http://192.168.9.232',
    // imgServerUrl: process.env.NODE_ENV === 'production' ? 'https://image.buybit.com/' : 'http://192.168.9.236:8999',// 图片的服务器地址 正式线上图片地址image.buybit.com
    // webSocketUrl: process.env.NODE_ENV === 'production' ? 'wss://test.buybit.com' : 'ws://192.168.9.232:8082',
    // webSocketHttpUrl: process.env.NODE_ENV === 'production' ? 'https://test.buybit.com' : 'http://192.168.9.232:8082'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#52a860',
    height: '3px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/bubble.css',
    '~assets/css/core.css',
    '~assets/css/snow.css',
    '~assets/css/main.css',
    '~assets/css/media.css',
    '~assets/icon/iconfont.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  router: {
    middleware: ['i18n']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/API',
    '~plugins/axios',
    '~/plugins/vue-inject.js',
    '~/plugins/myplugin.js',
    { src: '~plugins/element-ui', ssr: true },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    // '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // 'yamlful-nuxt',
    ['yamlful-nuxt', { srcDir: './API' }],
    '@nuxtjs/style-resources',
    ['nuxt-i18n', {
      // Options
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'es',
          name: 'Español'
        },
        {
          code: 'fr',
          name: 'Français'
        }
      ]
    }]
  ],

  styleResources: {
    // your settings here
    scss: [
      './assets/css/mixins.scss',
    ],
    stylus: [
      './assets/css/main.css',
    ]
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  proxy: {
    // '/api/': { target: 'http://192.168.9.232', pathRewrite: function (path, req) { return path.replace('/api/v1/bitbuy/fixprice/common/firstLoadFixPirce', '/api/v1/bitbuy/otc/system/common/getSysTime') } },
    '/api/': { target: 'https://www.buybit.com', pathRewrite: function (path, req) { return path.replace('/api/v1/bitbuy/fixprice/common/firstLoadFixPirce', '/api/v1/bitbuy/otc/system/common/getSysTime') } },
    // '/api/': 'https://www.buybit.com'
    // '/api/': 'http://192.168.9.232',
    // '/api2/': 'http://192.168.9.236',
    // '/api2/': 'http://api.another-website.com'
  },

  /*
  ** Build configuration
  */
  build: {
    // vendor: ['axios', 'element-ui'],
    /*
    ** You can extend webpack config here
    */
    // plugins: [
    //   /*
    //   ** Webpack 优化
    //   */
    //   // 限制最小的分块大小
    //   new webpack.optimize.MinChunkSizePlugin({minChunkSize: 15000}),
    //   new HappyPack({
    //     //用id来标识 happypack处理那里类文件
    //     id: 'happyBabel',
    //     //如何处理  用法和loader 的配置一样
    //     loaders: [{
    //       loader: 'babel-loader?cacheDirectory=true',
    //     },{
    //       loader: 'vue-loader?cacheDirectory=true',
    //     },{
    //       loader: 'vue-style-loader?cacheDirectory=true',
    //     },{
    //       loader: 'postcss-loader?cacheDirectory=true',
    //     },{
    //       loader: 'sass-loader?cacheDirectory=true',
    //     },{
    //       loader: 'style-resources-loader?cacheDirectory=true',
    //     },{
    //       loader: 'url-loader?cacheDirectory=true',
    //     }],
    //     //共享进程池
    //     threadPool: happyThreadPool,
    //     //允许 HappyPack 输出日志
    //     verbose: true,
    //   })
    // ],
    extractCSS: true,
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash].[ext]'
        }
      }
    ],
  }
}
