/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-07 09:56:35
 * @FilePath: \jiudian\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementUI from 'element-ui';
import { isAuth, formatDate, hasRole } from '@/utils'
import httpRequest from '@/utils/httpRequest'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/index.css';
import VueI18n from 'vue-i18n'
import i18n from './utils/i18n.js'
import utils from '@/utils/publicJS';
import Video from 'video.js'
import Distpicker from 'v-distpicker'
import filters from '@/utils/filter.js'
import * as index from '@/utils/index.js' // h
import enLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

import lang from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)

import 'video.js/dist/video-js.css'

Vue.use(filters)

Vue.use(VueI18n)
Vue.use(ElementUI);
//业务组件
Vue.component('v-distpicker', Distpicker)
Vue.prototype.$F = utils;
Vue.prototype.$index = index;
Vue.prototype.$http = httpRequest
Vue.prototype.hasRole = hasRole
Vue.prototype.isAuth = isAuth //权限验证
Vue.prototype.dateToString = formatDate //时间转换
Vue.config.productionTip = false
Vue.prototype.$video = Video
// 非生产环境, 适配mockjs模拟数据
// if (window.SITE_CONFIG.hasMock) {
//     require('@/assets/mock')
// }
import '@/assets/style/index.less'
// router.beforeEach((to, from, next) => {
//     console.log(to)
//     if (!sessionStorage.accessToken && to.name !== 'login') {
//         next({
//             name: 'login',
//         })
//     } else {
//         next()
//     }
// })
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Vue.prototype.$set = Vue.set;
Vue.prototype.$delete = Vue.delete;
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
