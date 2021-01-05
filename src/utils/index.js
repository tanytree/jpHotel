import Vue from 'vue'

import { getRouterKey } from '@/utils/auth'
export function hasRole(role) {
    let RouterKey = getRouterKey().slice(1, -1).split(',')
    let roleArr = []

    for (let i in RouterKey) {
        roleArr.push(RouterKey[i] * 1)
    }
    return roleArr.includes(role)
}
/**
 * 获取uuid
 */
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
} 

export function formatDate(now) {
    // now=new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    month = month > 10 ? month : '0' + month;
    date = date > 10 ? date : '0' + date;
    hour = hour > 10 ? hour : '0' + hour;
    minute = minute > 10 ? minute : '0' + minute;
    second = second > 10 ? second : '0' + second;

    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
    return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = []
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1
            temp[data[k][pid]]['children'].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}

export function clearLoginInfo() {
   
}




