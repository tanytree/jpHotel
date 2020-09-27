/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 14:57:19
 * @FilePath: \jiudian\src\assets\languages\commons\commonsRi.js
 */
module.exports = {
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
    all: "選択してください",
    cancel: '取り消し',
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
        '3': '保密',
    },

    F_state: {
        '1': '启用',
        '2': '禁用'
    },
    //用户类型 用于权限空
    userRoleList: [
        { label: '超级用户', value: 0 },
        { label: '普通用户', value: 1 },
        { label: '部门负责人', value: 2 },
        { label: '门店经理', value: 3 },
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
    },
    //订单来源
    orderSource: {
        "1": '前台',
        "2": '销售推荐',
        "3": '渠道订单',
        "10": '其它'
    },
    //正常免费
    checkinType: {
        "1": '正常',
        "2": '免费'
    },
    //客户类型
    guestType: {
        "1": '散客',
        "2": '会员',
        "3": '单位'
    },
    roomStatus: [{
        type: "success",
        name: '空净',
        value: '1'
    }, {
        type: "danger",
        name: '空脏',
        value: '2'
    }, {
        type: "",
        name: '住净',
        value: '3'
    }, {
        type: "warning",
        name: '住脏',
        value: '4'
    }, {
        type: "info",
        name: '维修',
        value: '5'
    }],
    F_roomStatus: {
        '1': '空净',
        '2': '空脏',
        '3': '住净',
        '4': '住脏',
        '5': '维修'
    },
    //朝向
    toward: {
        "1": '朝南',
        "2": '朝北',
        "3": '朝东',
        "4": '朝西'
    },
    //制卡状态
    markCard: {
        "1": '未制卡',
        "2": '已制卡'
    },
    bedCount: {
        "0": '全部',
        "1": '单床',
        "2": '双床',
        "3": '三床'
    },
    //入住状态
    checkinState: {
        "1": '入住中',
        "2": '已退房'
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
        "1": '正常',
        "2": '停用'
    },
    //集团内是否共享
    comShare2or1Flag: {
        '1': '否',
        '2': '是',
    },
    //集团内是否共享
    comShareFlag: {
        '1': '是',
        '2': '否'
    },
    //房间朝向
    towards: {
        '1': '朝南',
        '2': '朝北',
        '3': '朝东',
        '4': '朝西',
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
    weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
}

