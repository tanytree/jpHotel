/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Dana
 * @LastEditTime: 2020-07-07 10:20:25
 * @FilePath: /jiudian/src/assets/languages/zh.js
 */
module.exports = {
    queryBtn: '查询',
    resetBtn: '重置',
    exportBtn: '导出',
    F_sex: {
        '1': '男',
        '2': '女',
        '3': '保密',
    },

    F_state: {
        '1': '启用',
        '2': '禁用'
    },
    //用户类型 用于权限空
    userRoleList: [
        {label: '超级用户', value: 0},
        {label: '普通用户', value: 1},
        {label: '部门负责人', value: 2},
        {label: '门店经理', value: 3},
    ],
    //人员管理员工类型
    userStatus: {
        "1": '正式工',
        "2": '实习期',
        "3": '试用期'
    },
    //证件类型 1身份证 2护照 3驾驶证
    idCardType: {
        "1": '身份证',
        "2": '护照',
        "3": '驾驶证'
    }
}

