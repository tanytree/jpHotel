/*
 * @Date: 2020-07-03 16:34:17
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-07 10:20:16
 * @FilePath: /jiudian/src/assets/languages/ri.js
 */
import bossLang from './boss/bossRi'
import commons from "./commons/commonsRi";
import frontOffice from "./frontOffice/ri";
import login from './login/ri'

export default {
    language: {
        name: '日本語'
    },
    commons: commons,
    //总经理办公室
    boss: bossLang,
    //前台部
    frontOffice: frontOffice,

    //登录模块
    login: login,

}
