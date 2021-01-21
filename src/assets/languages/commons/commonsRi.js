/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:21:01
 * @FilePath: \jiudian\src\assets\languages\commons\commonsRi.js
 */
module.exports = {
  mustChoose: '必ず入力',
  mustInput: '必ず入力してください',
  checkInTypeDesc: '入居類型',
  mobile: '携帯電話番号',
  operatingTime: '利用時間',
  moreOperating: 'もっと操作',
  goBackHome: 'ホームに戻る',
  home: 'ホーム',
  checkAll: '全部',
  placeChoose: '選択してください',
  placeChooseA: '種別一覧',
  placeChooseB: '法人一覧',
  confirm_delete: '予約経路リストから削除に確認しますか？',
  tip_desc: 'ご注意',
  request_success: '受取確認',
  delete_success: '削除確認',
  delete_batch: '「一括削除」操作実行しますか？',
  delete_single: '「削除」操作を実行にしますか？',
  request_fail: '指令実行失敗',
  cancel: '取消',
  confirm: '確認',
  week: '曜日',
  time: '時間',
  confirm: '確認',
  saveSuccess: '保存成功',
  disable: '停止',
  enable: '利用中',
  newAdd: '追加',
  newAddA: '追加',
  name: '名称',
  other: 'その他',
  backIntoJob: '再入社',
  delete: "削除",
  positive: '正社員処理master',
  forDeparture: '退職処理',
  detail: '詳細',
  modify: '変更',
  addEmployees: 'スタッフ追加',
  bulkImport: "一括入力",
  downloadTemplate: 'テンプレートダウンロード',
  selectDate: ' 期間設定',
  all: "all",
  allA: '法人一覧',
  determine: '確認',
  close: "閉じる",
  lookDetail: "詳細確認",
  back: '戻る',
  save: '保存',
  print: "印刷",
  operating: '操作 ',
  queryBtn: '検索',
  resetBtn: 'リセット',
  exportBtn: '出力',
  pleaseEnter: '入力してください',
  passwordDesc: 'パスワード',

  F_sex: {
    '1': '男',
    '2': '女',
    '3': 'その他',
  },

  F_state: {
    '1': '起用',
    '2': '使用停止'
  },
  //用户类型 用于权限空
  userRoleList: [
    { label: '常連', value: 0 },
    { label: '一般', value: 1 },
    { label: 'セクション責任者', value: 2 },
    { label: '支配人', value: 3 },
  ],
  //缴费方式
  paymentMethod: {
    '1':'オンライン入金',
    '2':'振込',
    '3':'口座引き落とし',
  },
  //查询字段
  queryText: {
    '1': '総客室数',
    '2': '販売可能客室数',
    "3": '使用客室数',
    "4": '宿泊人数',
    "5": '稼働率（OCC）',
    '6': 'DOR',
    '7': 'ADR',
    "8": 'RevPAR',
    "9": '宿泊売上',
    "10": '料飲・付帯',
    "11": '総売上'
  },
  //人员管理员工类型
  userStatus: {
    "1": '正社員',
    "2": '実習生',
    "3": '試用期間'
  },
  //证件类型 1身份证 2护照 3驾照 4个人号码卡（My No. Card) 5在留卡（旧：外国人登录证） 6健康保险证  7其他
  idCardType: {
    // "1": ' 本人確認書',
    "2": 'パスポート',
    '3': '運転免許証',
    '4': '個人番号カード（マイナンバー）',
    '5': '在留カード（旧 外国人登録証明書）',
    '6': '健康保険証',
    '7': 'その他証明書',
  },
  //1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
  customerTypes: {
    '1': 'たいじん',
    '2': '子供A',
    '3': '子供B',
    '4': '子供C'
  },
  //订单来源
  orderSource: {
    // "1": 'ウォークイン',
    // "2": '営業担当',
    // "3": 'OTA/旅行社',
    // "4": '直電',
    // "10": 'その他'
    '1': '自行步入',
    '2': '电话预定',
    "3": '営業',
    "4": '其他',
    "5": 'OTA'
  },
  //正常免费
  checkinType: {
    "1": '正常',
    "2": ' フリー（サービス）'
  },
  //客户类型
  guestType: {
    "1": '一般',
    "2": '会員',
    "3": '法人/会社',
    "4": '団体'
  },
  roomStatus: [{
    type: "success",
    name: '空室',
    value: '1'
  }, {
    type: "danger",
    name: '清掃',
    value: '2'
  }, {
    type: "",
    name: 'OUT室',
    value: '3'
  }, {
    type: "warning",
    name: 'エコ清掃',
    value: '4'
  }, {
    type: "info",
    name: '故障部屋',
    value: '5'
  }, {
    type: "info",
    name: 'みとう',
    value: '6'
  }],
  F_roomStatus: {
    '1': '空室',
    '2': '清掃',
    '3': 'OUT室',
    '4': 'エコ清掃',
    '5': '故障部屋',
    '6': 'みとう'
  },
  //朝向
  // toward: {
  //     "1": '南向き',
  //     "2": '北向き',
  //     "3": '東向き',
  //     "4": '西向き'
  // },
  towards: {
    '1': '面山',
    '2': '面海',
    '3': '面湖',
    '4': '无',
  },
  //制卡状态
  markCard: {
    "1": 'カードキー発行済み',
    "2": '部屋カードキー設定未だ'
  },
  bedCount: {
    "0": 'all',
    "1": 'シングル',
    "2": 'ツイン',
    "3": 'トリプル'
  },
  //入住状态
  //入住状态
  checkinState: {
    '1': '滞在中',
    '2': 'チェックアウト済み',
    // '3': '离店',
    // '4': '离店(走结)',
    // '5': '离店(反结)'
  },
  //预订状态
  reserveState: {
    "0": 'all',
    "1": '予約中',
    "2": '確認済',
    "4": 'NOSHOW',
    "5": '未使用（未宿泊）',
    "6": '滞在中',
    "7": 'チェックアウト済',
    "8": 'キャンセル',
    '9': '客未着	'
  },
  //入住状态
  billType: {
    '0': '未収',
    "1": '精算済',
    "2": '売掛',
    "3": '相殺調整',
    "4": '未収',
    "5": '追加請求'
  },
  //预订类型
  operCheckinType: {
    "1": '宿泊',
    "2": '日帰り',
    "3": '会場'
  },
  //单位是否停用
  comState: {
    "1": 'せいじょう',
    "2": '停止'
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
    '2': '紛失届済み',
    '3': '起用待ち'
  },
  //签证类型类型
  F_visaType: {
    '1': '一般ビザ',
    '2': '外交ビザ',
    '3': '公務ビザ'
  },
  //结算类型/支付类型
  payType: {
    '1': 'キャッシュ',
    '2': 'クレジットカード',
    '3': '売掛',
    '4': 'その他',
    // '3': '支付宝',
    // '4': '微信',
  },
  //挂账方式
  paymentWay: {
    '1': '单位挂账',
    '2': '商品券',
    '3': '住宿券',
    '4': '折价券',
    '5': '点数',
    '6': '招待券',
    '7': 'その他',
  },
  //一周得描述
  weeks: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
  idCardTypeDesc: "本人確認書種類",
  selectIdCardType: '書類一覧',
  staffManagerDesc: 'アカウント管理',
}

