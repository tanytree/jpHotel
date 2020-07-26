import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
axios.defaults.withCredentials = true;
// create an axios instance
const service = axios.create({
    // baseURL: process.env.BASE_PATH, // url = base url + request url
    baseURL: 'http://xxyweeds.top:8895/',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 200000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // config.headers['token'] = getToken()
        // config.headers['usersid'] = getUserId()
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data;
        console.log(res)
        // if the custom code is not 200, it is judged as an error.
        if (res.code == 200 || res.code == 1 || res.code == -102 || res.code == -103)
           return res;

        Message({
            message: res.message || res.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
        })

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // to re-login
            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                // store.dispatch('user/resetToken').then(() => {
                //   location.reload()
                // })
            })
        }
        return Promise.reject(new Error(res.message || 'Error'))
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
const state = {
  "request": service
}
export default {
  state
}
