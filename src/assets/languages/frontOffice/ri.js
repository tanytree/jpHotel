/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-08 18:26:32
 * @FilePath: \jiudian\src\assets\languages\frontOffice\ri.js
 */
module.exports = {
  refundAmount: '返金金額',
  refundAmountA: '返金',

    reserveContent: '预定内容',
  englishM:'フリーメモ',
    enterpriseName: '会社名',
    enterpriseMobile: '会社電話',
    enterpriseAddress: '会社住所',
    cancelRoomKeep: '仮押さえ取り消し',
    checkInfoDesc: '会計情報',
    saveGoon: '保存及び次の予約へ',
    chooseRoomType: '部屋タイプを選択してください',
    nightAudit: {
        auditSuggest: '日時更新を行う前にここのリストをご確認ください。',
        auditTip: '日時更新を実行しますか？一度、実行しますと、修正ができなくなります。',
        audit: '日時更新',
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
        "1": '通常',
        "2": '紛失届済み',
        "3": "起用待ち"
    },
    // 是否黑名单 1否 2是 Integer非必填
    isBlacklist: {
        "1": 'いいえ',
        "2": 'はい'
    },
    priceType: {
        "1": '前受金',
        "2": 'デポジット',
        "3": '支払',
        "4": '返金',
        "5": '素泊り料金請求',
        "6": '延長料金',
        "7": '損害賠償',
        "8": 'ミニバー',
        "9": '会計取消',
        "10": '部分相殺',
        "11": '無料',
        "12": '素泊り料金	',
        "13": '売掛',
        "14": '料飲/部屋付',
        "15":'入湯税',
        "16":'宿泊税',
        "17":'プラン・朝食',
        "18":'プラン・夕食',
        "22":'付帯/部屋付',
        "99":'手付け金を払い下げる',
        "100": 'その他'
    },
    //订单类型
    orderType: {
        "": '全部',
        "1": '滞在中',
        "2": 'C/O予定',
        "3": '顧客履歴',
        // "4": '売掛',
        // "5": 'チェックアウト後精算'
    },

    //入住方式
    checkInRoomType: {
        "0": '全部',
        "1": '一般',
        "2": '日帰り',
        // "3": '深夜部屋'
    },
    leaveDate: {
        "0": '全部',
        "1": '本日',
        "2": '昨日',
        "3": '明日',
        "4": '明後日',
        // "5": '近三天',
        // "6": '近七天',
        // "7": '上月',
        // "8": '本月',
        // "9": '下月',
        "10": '期間選択'
    },
}

