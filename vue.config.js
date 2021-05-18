/*
 * @Date: 2020-02-04 15:51:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-17 16:13:22
 * @FilePath: \jiudian\vue.config.js
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
            '/system': {
                // target: 'http://localhost:8887/',
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

