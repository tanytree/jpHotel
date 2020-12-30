import axios from 'axios';
import $router from '../router/router';

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
// axios.defaults.baseURL = 'http://122.51.1.185:8899';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = JSON.stringify(config.data);
    }
    return config;
},(error) =>{
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(!res.data.success){
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    if(error.response && error.response.data === 401) {
        $router.push('/login');
        console.error('token 失效');
    } else {
        console.error('网络错误');
    }

    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response);
        }, err => {
            reject(err);
        }).catch((error) => {
            reject(error)
        })
    })
}
//返回一个Promise(发送post请求)
export function fetchPost2(url, action, params) {
    params = {
        action: action,
        params: params
    }
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response);
        }, err => {
            reject(err);
        }).catch((error) => {
            reject(error)
        })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}
