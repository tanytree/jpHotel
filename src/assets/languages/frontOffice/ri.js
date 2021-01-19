/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 11:19:11
 * @FilePath: \jiudian\src\assets\languages\frontOffice\ri.js
 */
module.exports = {
    refundAmount: '払い戻し額',
    reserveContent: '预定内容',
  englishM:'フリーメモ',
    enterpriseName: '会社名',
    enterpriseMobile: '会社電話',
    enterpriseAddress: '会社住所',
    cancelRoomKeep: '仮押さえ取り消し',
    checkInfoDesc: '入居情報',
    saveGoon: '保存及び次の予約へ',
    chooseRoomType: '部屋タイプを選択してください',
    nightAudit: {
        auditSuggest: '！締め前に下記業務をご確認ください。',
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
        "3": '入金',
        "4": '返金',
        "5": '宿泊料金請求',
        "6": '日帰り料金請求',
        "7": '損害賠償記録master',
        "8": 'ミニバー',
        "9": '完全相殺',
        "10": '部分相殺',
        "11": '無料',
        "12": '宿泊料金	',
        "13": '売掛',
        "14": '餐吧消费',
        "15":'温泉税',
        "16":'住宿税',
        "99":'手付け金を払い下げる',
        "100": 'その他'
    },
    priceTypeDesc:{},
    //订单类型
    orderType: {
        "": '全部',
        "1": '滞在',
        "2": '出発予定',
        "3": '以前/履歴',
        // "4": '売掛',
        // "5": 'チェックアウト後精算'
    },

    //入住方式
    checkInRoomType: {
        "0": '全部',
        "1": '一般',
        "2": '時間貸し部屋',
        // "3": '深夜部屋'
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

