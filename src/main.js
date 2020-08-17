/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-27 17:56:57
 * @FilePath: /jiudian/src/main.js
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

import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'

Vue.use(filters)

Vue.use(VueI18n)
//业务组件
Vue.component('v-distpicker', Distpicker)
Vue.use(ElementUI);
Vue.prototype.$F = utils;
Vue.prototype.$http = httpRequest
Vue.prototype.hasRole = hasRole
Vue.prototype.isAuth = isAuth //权限验证
Vue.prototype.dateToString = formatDate //时间转换
Vue.config.productionTip = false
Vue.prototype.$video = Video
Vue.use(VideoPlayer);
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
// const i18n = new VueI18n({
//     locale: localStorage.getItem('locale') || 'zh', // 定义默认语言为中文 
//     messages: {
//         'zh': require('@/assets/languages/zh.js'),
//         'ri': require('@/assets/languages/ri.js')
//     },
// 	locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换
// });
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


new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
