/*
 * @Date: 2020-07-03 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 14:10:12
 * @FilePath: \jiudian\src\assets\languages\ri.js
 */
import bossLang from './boss/bossRi'
import commons from "./commons/commonsRi";
import frontOffice from "./frontOffice/ri";
import login from './login/ri'
import manager from './manager/ri'
import food from './food/ri'
import shop from './shop/ri'
import desk from './desk/deskRi'

export default {
    language: {
        name: '日本语'
    },
    commons: commons,
    //总经理办公室
    boss: bossLang,
    //Dana 前台部
    frontOffice: frontOffice,

    //登录模块
    login: login,
    //管理部
    manager: manager,

    //餐饮部
    food: food,
    //前台部
    desk: desk,
	//商店部
	shop:shop
}
