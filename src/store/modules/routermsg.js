/*
 * @Date: 2019-12-12 11:15:44
 * @LastEditors: Dana
 * @LastEditTime: 2020-05-06 17:26:01
 * @FilePath: /cloudAdmin/src/store/modules/routermsg.js
 */
const state = {
    routermsgSource: {a: 1},
    routermsg: [
        {
            name: "管理部",
            icon: "icon06",
            value: "product",
            id: '1',
            children: [
                {name: "管理员管理", id: "11", icon: "manager/nav01.png", value: "manager"},
                //tttt
                // { name: "首页", id: "10", icon: "market/nav01.png", value: "market" },
                // // { name: "产品管理", id: "11", icon: "market/nav02.png", value: "product" },
                // { name: "广告管理", id: "13", icon: "market/nav04.png", value: "advert", },
                // { name: "渠道管理", id: "14", icon: "market/nav06.png", value: "channel" },
                // { name: "价格管理", id: "15", icon: "market/nav05.png", value: "price" },
                // { name: "数据统计", id: "16", icon: "market/nav07.png", value: "dataState", },
            ]
        }, {
            name: "财务部",
            icon: "icon09",
            value: "",
            id: '2',
            children: [
                {name: "收入状况", id: "26", icon: "sales/nav01.png", value: "income"},
                // { name: "销售动态", id: "22", icon: "sales/nav01.png", value: "salemain" },

            ]
        },
        {
            name: "售后部",
            icon: "icon08",
            id: '3',
            children: [
                {name: "当前课程", icon: "sales/nav01.png", id: "301", value: "currentCourse"},
                {name: "活动项目", icon: "sales/nav04.png", id: "302", value: "activityProject"},
                // { name: "采购计划", id: "303", value: "purchasePlan" },
                // { name: "在线询盘", id: "304", value: "onlineEnquiry" },
            ]

        },
        {
            name: "营销部",
            icon: "icon04",
            id: '4',
            children: [
                {name: "产品管理", id: "401", icon: "market/nav02.png", value: "product"},
                {name: "促销管理", id: "402", icon: "market/nav03.png", value: "promotion"},
            ]

        },
        {
            name: "销售部",
            icon: "icon08",
            id: '5',
            children: [
                {name: "订单管理", id: "51", icon: "sales/nav02.png", value: "saleOrder"},
                {name: "会员管理", id: "52", icon: "sales/nav03.png", value: "saleCustomer"},
                {name: "个人分享", id: "53", icon: "sales/nav04.png", value: "saleBussness"},
                {name: "答疑管理", id: "54", icon: "sales/nav05.png", value: "saleContract"},
            ]
        }
    ]
};

const getters = {
    getroutermsg(state) {
        return state.routermsg
    },

    getroutermsgSource(state) {
        return state.routermsgSource
    }
};

const mutations = {

    routermutations(state, arr) {
        state.routermsg = arr;
        console.log(state.routermsg);
    },

    routermutationsSource(state, array) {
        state.routermsgSource = array;
    },

};

const actions = {

    routeractions(context, arr) {
        context.commit('routermutations', arr);
    },

    authUserRouter(context, arr) {
        context.commit('routermutationsSource', arr);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
