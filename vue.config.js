/*
 * @Date: 2020-02-04 15:51:25
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-10 10:44:36
 * @FilePath: /jiudian/vue.config.js
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: process.env.NODE_ENV === 'production' ? './static' : '',
  lintOnSave: false,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
  },
  productionSourceMap: false,
  // devServer: {
  //   // Paths
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxy: {
  //     '/typ-server': {
  //       target: "http://xxyweeds.top:8894/",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/typ-server': ''   //需要rewrite重写的,
  //       }
  //     },
  //     '/common/': {
  //       target: "https://api.apishop.net/",
  //       changeOrigin: true
  //     },
  //     '/typ/': {
  //       target: "http://localhost:8989/",
  //       changeOrigin: true
  //     },
  //     '/system': {
  //       target: 'http://xxyweeds.top:8895/',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/system': ''  //通过pathRewrite重写地址，将前缀/api转为/
  //       }
  //     }
  //   },
  //   // Various Dev Server settings
  //   host: 'localhost', // can be overwritten by process.env.HOST
  //   //port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  //   port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  //   autoOpenBrowser: true,
  //   errorOverlay: true,
  //   notifyOnErrors: true,
  //   poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  //   // https://webpack.js.org/configuration/devtool/#development
  //   devtool: 'cheap-module-eval-source-map',
  //   // If you have problems debugging vue-files in devtools,
  //   // set this to false - it *may* help
  //   // https://vue-loader.vuejs.org/en/options.html#cachebusting
  //   cacheBusting: true,
  //   cssSourceMap: true
  // }
  // devServer: {
  //
  //   // Paths
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxyTable: {
  //     '/typ-server': {
  //       target: "http://xxyweeds.top:8894/",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/typ-server': ''   //需要rewrite重写的,
  //       }
  //     },
  //     '/common/': {
  //       target: "https://api.apishop.net/",
  //       changeOrigin: true
  //     },
  //     '/typ/': {
  //       target: "http://localhost:8989/",
  //       changeOrigin: true
  //     }
  //   },
  //   // Various Dev Server settings
  //   host: 'localhost', // can be overwritten by process.env.HOST
  //   //port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  //   port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  //   autoOpenBrowser: false,
  //   errorOverlay: true,
  //   notifyOnErrors: true,
  //   poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  //
  //   // https://webpack.js.org/configuration/devtool/#development
  //   devtool: 'cheap-module-eval-source-map',
  //   // If you have problems debugging vue-files in devtools,
  //   // set this to false - it *may* help
  //   // https://vue-loader.vuejs.org/en/options.html#cachebusting
  //   cacheBusting: true,
  //
  //   cssSourceMap: true
  // }
  devServer: {
    open: true,
    port: 8008,
    proxy: {
      '/api': {
        target: 'http://39.104.116.153:8886/',
        // target: 'https://www.i2b2b.com/public/index.php',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
        }
      },
      'newApi': {
        target: 'http://115.29.143.91:8886/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/newApi': ''  //通过pathRewrite重写地址，将前缀/api转为/
        }
      },

      '/system': {
        // target: 'http://xxyweeds.top:8895/',  // target: 'http://115.29.143.91:8887/',
        target: 'http://39.104.116.153:8887/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/system': '' //通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    },
    overlay: {
      errors: true,
      warnings: true
    }
  }
}
