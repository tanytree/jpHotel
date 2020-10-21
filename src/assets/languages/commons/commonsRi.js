/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Dana
 * @LastEditTime: 2020-10-18 17:23:52
 * @FilePath: /jiudian/src/assets/languages/commons/commonsZh.js
 */
module.exports = {
    checkInTypeDesc: '入居類型',
    mobile: '携帯番号',
    operatingTime: 'そうさじかん',
    moreOperating: 'より多くの操作',
    goBackHome: 'トップページに戻る',
    home: 'ホームページ',
    checkAll: '上に整数を取る',
    placeChoose: '選択してください',
    confirm_delete: 'これは削除が確定していますか?',
    tip_desc: '注意',
    request_success: '操作に成功する',
    delete_success: '削除成功',
    delete_batch: '一括削除を確定する',
    delete_single: '削除操作の実行を確定する',
    request_success: '成功を請う',
    request_fail: '失敗を請求する',
    cancel: '取り消し',
    confirm: '确定',
    week: '曜日',
    time: '期間',
    confirm: '確認',
    saveSuccess: '保存に成功する',
    disable: 'off（停止）',
    enable: 'on（起用）',
    newAdd: '追加',
    name: '名称',
    other: 'その他',
    backIntoJob: '再就職',
    delete: "削除",
    positive: '正社員になる',
    forDeparture: '退職の手続きをする',
    detail: '詳細',
    modify: '変更',
    addEmployees: '従業員を追加',
    bulkImport: "バッチインポート",
    downloadTemplate: 'テンプレートをダウンロードする',
    selectDate: '期日を選ぶ',
    all: "ぜんぶ",
    determine: '確認',
    close: "閉める",
    lookDetail: "資料確認",
    back: '戻る',
    save: '保存',
    print: "印刷",
    operating: '設定 ',
    queryBtn: '検索',
    resetBtn: 'リセット',
    exportBtn: '出力',
    pleaseEnter: '入力してください',
    passwordDesc: 'パスワード',

    F_sex: {
        '1': '男',
        '2': '女',
        '3': '秘密保持',
    },

    F_state: {
        '1': '使用開始',
        '2': '使用禁止'
    },
    //用户类型 用于权限空
    userRoleList: [
        { label: '常連', value: 0 },
        { label: '一般', value: 1 },
        { label: '部署責任者', value: 2 },
        { label: 'ホテル支配人', value: 3 },
    ],
    //人员管理员工类型
    userStatus: {
        "1": '正社員',
        "2": '実習期間',
        "3": '試用期間'
    },
    //证件类型 1身份证 2护照 3驾驶证
    idCardType: {
        "1": ' IDカード',
        "2": 'パスポート',
        "3": 'けいめんきょ'
    },
    //订单来源
    orderSource: {
        "1": 'フロント',
        "2": '営業',
        "3": 'ルート注文',
        "10": 'その他'
    },
    //正常免费
    checkinType: {
        "1": 'せいじょう',
        "2": ' むか'
    },
    //客户类型
    guestType: {
        "1": '個人客',
        "2": '会員',
        "3": '会社'
    },
    roomStatus: [{
        type: "success",
        name: '掃除済空室',
        value: '1'
    }, {
        type: "danger",
        name: '掃除必要空室',
        value: '2'
    }, {
        type: "",
        name: '掃除済連泊客室',
        value: '3'
    }, {
        type: "warning",
        name: '掃除必要連泊客室',
        value: '4'
    }, {
        type: "info",
        name: '维修',
        value: '5'
    }],
    F_roomStatus: {
        '1': '掃除済空室',
        '2': '掃除必要空室',
        '3': '掃除済連泊客室',
        '4': '掃除必要連泊客室',
        '5': 'メンテナンス'
    },
    //朝向
    toward: {
        "1": '南',
        "2": '北',
        "3": '東',
        "4": '西'
    },
    //制卡状态
    markCard: {
        "1": 'カードキー未発行',
        "2": 'カードキー発行済み'
    },
    bedCount: {
        "0": 'すべて',
        "1": 'シングル',
        "2": 'ツイン',
        "3": 'トリプル'
    },
    //入住状态
    //入住状态
    checkinState: {
        '1': '在住',
        '2': '预离',
        '3': '离店',
        '4': '离店(走结)',
        '5': '离店(反结)'
    },
    //预订状态
    reserveState: {
        "0": '不限',
        "1": '预订中',
        "2": '已确认',
        "3": '拒单',
        "4": 'NOSHOW',
        "5": '未入住',
        "6": '已入驻',
        "7": '离店',
        "8": '已取消'
    },
    //入住状态
    billType: {
        "1": '已结',
        "2": '挂账',
        "3": '冲调',
        "4": '走结',
        "5": '反结'
    },
    //预订类型
    operCheckinType: {
        "1": '普通房',
        "2": '时租房',
        "3": '会场'
    },
    //单位是否停用
    comState: {
        "1": 'せいじょう',
        "2": '使用停止'
    },
    //集团内是否共享
    comShare2or1Flag: {
        '1': 'いいえ',
        '2': 'はい',
    },
    //集团内是否共享
    comShareFlag: {
        '1': 'はい',
        '2': 'いいえ'
    },

    //会员卡片类型
    memberCardState: {
        '1': '正常',
        '2': '已挂失',
        '3': '待启用'
    },
    //签证类型类型
    F_visaType: {
        '1': '普通签证',
        '2': '外交签证',
        '3': '公务签证'
    },
    //一周得描述
    weeks: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日に"],
    idCardTypeDesc: "身分証明書種類",
    selectIdCardType: 'パスポート',
}

