/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-06 15:49:59
 * @FilePath: /jiudian/src/assets/languages/commons/commonsRi.js
 */
module.exports = {
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
    cancel: 'キャンセル',
    determine: '確認',
    close: "閉じる",
    lookDetail: "資料確認",
    back: '戻る',
    save: '保存',
    print: "印刷",
    operating: '操作 ',
    queryBtn: '検索',
    resetBtn: 'リセット',
    exportBtn: 'リセット',
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
        // "3": '渠道订单',
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
    //入住状态
    billType: {
        "1": '已结',
        "2": '挂账',
        "3": '冲调',
        "4": '走结',
        "5": '反结'
    },
    //单位是否停用
    comState: {
        "1": '正常',
        "2": '停用'
    },
    //集团内是否共享
    comShareFlag: {
        "1": '是',
        "2": '否'
    }
}

