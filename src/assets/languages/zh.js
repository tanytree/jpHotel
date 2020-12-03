/*
 * @Date: 2020-07-03 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 14:13:40
 * @FilePath: \jiudian\src\assets\languages\zh.js
 */
import bossLang from "./boss/bossZh";
import commons from "./commons/commonsZh";
import frontOffice from './frontOffice/zh'
import login from './login/zh'
import manager from './manager/zh'
import food from './food/zh'
import shop from './shop/zh.js'
import desk from './desk/deskZh'

export default {
    language: {
        name: '中文'
    },
    //所有模块公共的国际化语言 都可以进行搜录进去 例如 查询 重启 导入 导出 等公用描述
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
