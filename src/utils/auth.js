/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-31 16:53:55
 * @FilePath: /cloudAdmin/src/utils/auth.js
 */

import Cookies from 'js-cookie'

const TokenKey = 'TokenKey'
const RouterKey = 'RouterKey'
const RouterMsg = 'RouterMsg'
const Language = 'Language'
const OrderDetailInfo = 'OrderDetailInfo'

//储存用户信息
export function setUserInfo (data) {
    sessionStorage.userData = JSON.stringify(data)
}

export function setCompanyInfo (data) {
    sessionStorage.companyInfo = JSON.stringify(data)
}

// 储存Token
export function getToken () {
    return Cookies.get(TokenKey)
}

export function setToken (token) {

    return Cookies.set(TokenKey, token)
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}

// 储存路由权限
export function getRouterKey () {
    return Cookies.get(RouterKey)
}

export function setRouterKey (routerdata) {
    return Cookies.set(RouterKey, routerdata)
}

export function removeRouterKey () {
    return Cookies.remove(RouterKey)
}

// 缓存路由
export function getRouterMsg () {
    // return Cookies.get(RouterMsg)
}

export function setRouterMsg (routermsg) {
    // return Cookies.set(RouterMsg, routermsg)
}

export function removeRouterMsg () {
    return Cookies.remove(RouterMsg)
}

//储存用户选择的语言
export function getLanguage () {
    return Cookies.get(Language) || 'ri'
}

export function setLanguage (language) {
    return Cookies.set(Language, language)
}

/*
//储存当前预定单信息 避免多个页面重复加载
export function getLanguage () {
    return Cookies.get(OrderDetailInfo) || '{}'
}

export function setLanguage (language) {
    return Cookies.set(Language, language)
}
*/
