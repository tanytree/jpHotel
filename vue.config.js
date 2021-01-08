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
                target: 'http://39.104.116.153:8887/',
                // target: 'https://pms-api-dev.sgi-smacha.tokyo/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/system': '' //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        },
        overlay: {
            errors: false,
            warnings: false
        }
    }
}
