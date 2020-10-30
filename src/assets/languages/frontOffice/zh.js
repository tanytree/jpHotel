/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-28 15:03:20
 * @FilePath: \jiudian\src\assets\languages\frontOffice\zh.js
 */
module.exports = {

    enterpriseName: '单位名称',
    enterpriseMobile: '单位号码',
    enterpriseAddress: '单位地址',
    cancelRoomKeep: '取消预留',
    checkInfoDesc: '入住信息',
    chooseRoomType: '请选择房型',
    saveGoon: '保存后继续办理入住预定',
    nightAudit: {
        auditSuggest: '！建议夜审前处理以下业务',
        auditTip: '您确定要夜审吗？一旦夜审无法撤回',
        audit: '夜审',
        reservationNumber: '预定单号',
        checkInTime: '入住时间',
        arriveTime: '到店时间',
        todayPrice: '本日房价',
        priceDifference: '房价差异',
    },
    //发展途径
    getWay: {
        "1": '线上',
        "2": '线下'
    },
    // state        卡状态 1正常(已发卡)  2已挂失 3.待启用
    state: {
        "1": '正常(已发卡)',
        "2": '已挂失',
        "3": "待启用"
    },

    // 是否黑名单 1否 2是 Integer非必填
    isBlacklist: {
        "1": '否',
        "2": '是'
    },
    priceType: {
        "1": '订金',
        "2": '押金',
        "3": '收款',
        "4": '退款',
        "5": '加收全天房费',
        "6": '加收半天房费',
        "7": '损物赔偿',
        "8": '迷你吧',
        "9": '完全冲调',
        "10": '部分冲调',
        "11": '免单',
        "12": '房费',
        "13": '挂账',
        "100": '其他'
    },
    //订单类型
    orderType: {
        "": '不限',
        "1": '在住订单',
        "2": '今日预离',
        "3": '历史订单',
        "4": '走结订单',
        "5": '反结订单'
    },
    //入住方式
    checkInRoomType: {
        "0": '不限',
        "1": '全天房',
        "2": '钟点房',
        // "3": '午夜房'
    },
    //预离日期筛选条件
    leaveDate: {
        "0": '不限',
        "1": '当天',
        "2": '昨天',
        "3": '明天',
        "4": '后三天',
        // "5": '近三天',
        // "6": '近七天',
        // "7": '上月',
        // "8": '本月',
        // "9": '下月',
        "10": '自定义'
    },
}

