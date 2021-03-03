import Vue from 'vue'
import axios from 'axios'
import router from '@/router/router'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'
import store from '@/store';
import { MessageBox, Message } from 'element-ui'

const http = axios.create({
    // baseURL: 'https://pms-api-dev.sgi-smacha.tokyo', // url = base url + request url
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
})

function objToParams(obj) {
    var list = [];
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            list.push(key + '=' + obj[key]);
        }
    }
    return list.join('&');
}
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    config.headers['accessToken'] = store.state.user.token // 请求头带上token
    // config.headers['usersid'] = store.state.user.userId // 请求头带上token
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(
    response => {
        if (response.data && (response.data.message == "no token" || response.data.code == 1525)) { // 401, token失效
           clearLoginInfo()
            router.push({ name: 'login' })
        }
        // if (response.data.code !== 200) { // 401, token失效
        //   Message({
        //     message: response.data.message || 'Error',
        //     type: 'error',
        //     duration: 1500
        //   })
        //   // return;
        // } else
        return response.data
    }, error => {
        return Promise.reject(error)
    })

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {

    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (window.SITE_CONFIG.hasMock ? '/proxyApi/' : window.SITE_CONFIG.apiURL) + actionName
}
http.systemUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (window.SITE_CONFIG.hasMock ? '/proxyApi/' : window.SITE_CONFIG.sysURL) + actionName
}
http.newApi = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (window.SITE_CONFIG.hasMock ? '/proxyApi/' : window.SITE_CONFIG.newApi) + actionName
}






/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'form') => {
    data = merge({platSource: '1005'}, data)
    var defaults = {
        userId: store.state.user.id,
        storesNum: (store.state.user.storesInfo && store.state.user.storesInfo.storesNum ?
            ((store.state.user.storesInfo.storesNum == '0000000000' && sessionStorage.checkinDetailStoresNum) ?
                sessionStorage.checkinDetailStoresNum : store.state.user.storesInfo.storesNum) : '')
    }
    data = openDefultdata ? merge(defaults, data) : data;
    if (!data.storesNum) {
       delete data['storesNum'];
    }
    return contentType === 'json' ? JSON.stringify(data) : objToParams(data)
}



/**
 * exportFile导出文件
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 */
http.exportFile = (url, params) => {
    var form = document.createElement('form');
    form.id = 'form'
    form.name = 'form'
    document.body.appendChild(form);
    for (var obj in params) {
        if (params.hasOwnProperty(obj)) {
            //console.log(params[obj])
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = obj;
            input.value = params[obj];
            form.appendChild(input)
        }
    }

    form.method = "POST"; //请求方式
    form.action = http.adornUrl(url);
    form.submit();

    document.body.removeChild(form);
}



export default http
