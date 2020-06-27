/*
 * @Date: 2020-01-04 10:19:21
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-15 15:44:06
 * @FilePath: /cloudAdmin/src/store/modules/company.js
 */
import { setToken, removeToken, setRouterKey, setUserInfo } from '@/utils/auth'

const state = {
    "id": "2c915739711b3fc501712aef4fcf00b5",
    "co_name": "测试商家",
    "enterName": "",
    "co_logo": null,
    "bank_user_name": "对公账户姓名",
    "bank_name": "对公账户银行",
    "bank_number": "对公账户卡号",
    "is_authentication": null,
    "create_time": "2019-06-21 14:05:36",
    department: []

};

const getters = {

};

const mutations = {
    setCompanyInfo(state, data) {

        Object.assign(state, data)
    },
};

const actions = {

    companyInit(context, data) {
        context.commit('setCompanyInfo', data);
        sessionStorage.companyInfo = JSON.stringify(data);
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
