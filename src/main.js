/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-20 10:13:44
 * @FilePath: /cloudAdmin/src/main.js
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




import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'


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

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
