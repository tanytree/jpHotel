/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-23 03:07:14
 * @FilePath: \jiudian\src\assets\languages\frontOffice\ri.js
 */
module.exports = {
    saveGoon: '新予約に切り替える',
    chooseRoomType: '部屋タイプ選択してください',
    nightAudit: {
        reservationNumber: '予約番号',
        checkInTime: '到着時間',
        arriveTime: '到着予定',
        todayPrice: '本日料金',
        priceDifference: '料金差異',
    },

    //发展途径
    getWay: {
        "1": 'オンライン',
        "2": 'オフライン'
    },

    // state 卡状态 1正常(已发卡) 2已挂失 3.待启用
    state: {
        "1": '正常(已发卡)',
        "2": '已挂失',
        "3": "待启用"
    },
    // 是否黑名单 1否 2是 Integer非必填
    isBlacklist: {
        "1": 'いいえ',
        "2": 'はい'
    },
    priceType: {
        "1": '前受金',
        "2": 'デポジット',
        "3": '入金',
        "4": '返金',
        "5": '加收全天房费',
        "6": '加收半天房费',
        "7": '損害賠償記録master',
        "8": 'ミニバー',
        "9": '完全相殺',
        "10": '部分相殺',
        "11": '無料',
        "12": '宿泊料金	',
        "13": '売掛',
        "100": 'その他'
    },
    //订单类型
    orderType: {
        "": '全部',
        "1": '滞在',
        "2": '出発予定',
        "3": '以前/履歴',
        "4": '売掛',
        "5": 'チェックアウト後精算'
    },

    //入住方式
    checkInRoomType: {
        "0": '全部',
        "1": '一般',
        "2": '時間貸し部屋',
        "3": '深夜部屋'
    },
    leaveDate: {
        "0": '全部',
        "1": '今日',
        "2": '昨日',
        "3": '明日',
        "4": '三日後',
        // "5": '近三天',
        // "6": '近七天',
        // "7": '上月',
        // "8": '本月',
        // "9": '下月',
        "10": '期間選択'
    },
}

