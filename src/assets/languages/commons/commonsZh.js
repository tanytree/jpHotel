/*
 * @Date: 2020-07-07 16:34:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-15 11:41:18
 * @FilePath: \jiudian\src\assets\languages\commons\commonsZh.js
 */
module.exports = {
  roomAttribles: {

  },

  mustChoose: '必填',
  mustInput: '必须输入',
  checkInTypeDesc: '入住类型',
  mobile: '手机号码',
  operatingTime: '操作时间',
  moreOperating: '更多操作',
  moreOperatingA: '更多操作',
  goBackHome: '返回首页',
  home: '首页',
  checkAll: '全选',
  placeChoose: '请选择',
  placeChooseA: '请选择',
  placeChooseB: '请选择',
  confirm_delete: '确定删除吗？',
  confirm_deleteA: '确定删除吗？',
  confirm_deleteB: '确定删除吗？',
  confirm_deleteC: '确定删除吗？',
  confirm_deleteD: '确定删除吗？',
  tip_desc: '提示',
  request_success: '请求成功',
  delete_success: '删除成功！',
  delete_batch: '确定执行批量删除操作',
  delete_single: '确定执行删除操作',
  delete_singleA: '确定执行删除操作',
  request_fail: '请求失败',
  confirm: '确定',
  time: '时间',
  week: '星期',
  saveSuccess: '保存成功',
  disable: '禁用',
  disableA: '禁用',
  enable: '启用',
  newAdd: '新增',
  newAddA: '+新增',
  name: '名称',
  nameA: '名称',
  other: '其他',
  backIntoJob: '重新入职',
  delete: '删除',
  positive: '转正',
  forDeparture: '办理离职',
  detail: '详情',
  modify: '修改',
  addEmployees: '添加员工',
  bulkImport: '批量导入',
  downloadTemplate: '下载模板',
  selectDate: '选择日期',
  all: '全部',
  allA: '全部',
  cancel: '取消',
  determine: '确定',
  close: '关闭',
  lookDetail: '查看详情',
  back: '返回',
  save: '保存',
  print: '打印',
  operating: '操作',
  queryBtn: '查询',
  resetBtn: '重置',
  exportBtn: '导出',
  pleaseEnter: '请输入',
  pleaseEnterA: '请输入',
  pleaseEnterB: '请输入',
  passwordDesc: '密码',
  // 床型
  bedType: {
    '0': '无床',
    '1': '1床',
    '2': '双人床',
    '3': '两床',
    '4': '三床',
    '5': '四床',
  },
  F_sex: {

    '1': '男',
    '2': '女',
    '3': '保密',
  },

  F_state: {
    '1': '启用',
    '2': '禁用'
  },
  //缴费方式
  paymentMethod: {
    '1': '线上',
    '2': '汇款',
    '3': '账户扣款',
  },
  //查询字段
  queryText: {
    '1': '总客房数',
    '2': '可销售客房数',
    "3": '入住房数',
    "4": '入住人数',
    "5": '入住率',
    '6': '客房销售额/入住房数',
    '7': '客房销售额/入住人数',
    "8": '客房销售额/可销售房数',
    "9": '客房销售额',
    "10": '餐饮/商店部销售',
    "11": '销售总金额'
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
    '1': '正式工',
    '2': '实习期',
    '3': '试用期'
  },
  //证件类型 1身份证 2护照 3驾照 4个人号码卡（My No. Card) 5在留卡（旧：外国人登录证） 6健康保险证  7其他
  idCardType: {
    '1': '身份证',
    '2': '护照',
    '3': '驾照',
    '4': '个人号码卡（My No. Card)',
    '5': '在留卡（旧：外国人登录证）',
    '6': '健康保险证',
    '7': '其他'
  },
  //1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
  customerTypes: {
    '1': '大人',
    '2': '儿童A',
    '3': '儿童B',
    '4': '儿童C'
  },
  //订单来源
  orderSource: {
    '1': '自行步入',
    '2': '电话预定',
    "3": '销售推荐',
    "4": '其他',
    "5": 'OTA'
  },
  //正常免费
  checkinType: {
    '1': '正常',
    '2': '免费'
  },
  //客户类型
  guestType: {
    '1': '散客',
    '2': '会员',
    '3': '单位',
    "4": '団体'
  },
  roomStatus: [{
    type: 'success',
    name: '空净',
    value: '1'
  }, {
    type: 'danger',
    name: '空脏',
    value: '2'
  }, {
    type: '',
    name: '住净',
    value: '3'
  }, {
    type: 'warning',
    name: '住脏',
    value: '4'
  }, {
    type: 'info',
    name: '维修',
    value: '5'
  }, {
    type: '',
    name: '未到',
    value: '6'
  }],
  F_roomStatus: {
    '1': '空净',
    '2': '空脏',
    '3': '住净',
    '4': '住脏',
    '5': '维修',
    '6': '未到',
  },
  //朝向
  toward: {
    '1': '朝南',
    '2': '朝北',
    '3': '朝东',
    '4': '朝西'
  },
  //制卡状态
  markCard: {
    '1': '已制卡',
    '2': '未制卡'
  },
  bedCount: {
    '': '全部',
    '1': '单床',
    '2': '双床',
    '3': '三床'
  },
  //入住状态
  checkinState: {
    '1': '在住',
    '2': '已退房',
    '3': '未入住',
    '10': '已取消',
    '20': 'NOSHOW',
  },
  //预订状态
  reserveState: {
    '': '不限',
    '1': '预订中',
    '2': '已确认',
    '4': 'NOSHOW',
    '5': '未入住',
    '6': '已入住',
    '7': '离店',
    '8': '已取消',
    '9': '应到未到订单'
  },
  //结账状态  如billType字段值为null 传入0  默认为未结    有值情况下为已结
  billType: {
    '0': '未结',
    '1': '已结',
    '2': '挂账',
    '3': '冲调',
    '4': '走结',
    '5': '反结'
  },
  //预订类型
  operCheckinType: {
    '1': '普通房',
    '2': '时租房',
    '3': '会场'
  },
  //单位是否停用
  comState: {
    '1': '正常',
    '2': '停用'
  },
  //集团内是否共享
  comShare2or1Flag: {
    '1': '否',
    '2': '是',
  },
  //集团内否是共享
  comShareFlag: {
    '1': '是',
    '2': '否'
  },
  //房间朝向
  towards: {
    '1': '面山',
    '2': '面海',
    '3': '面湖',
    '4': '无',
  },

  //会员卡片类型
  memberCardState: {
    '1': '正常',
    '2': '已挂失',
    '3': '停用'
  },
  //签证类型类型
  F_visaType: {
    '1': '普通签证',
    '2': '外交签证',
    '3': '公务签证'
  },
  payType: {
    '1': '现金',
    '2': '信用卡',
    '3': '挂账',
    '4': '其他',
    // '3': '支付宝',
    '100': 'payments',
    // '4': '微信',
  },

  paymentWay: {
    '1': '单位挂账',
    '2': '商品券',
    '3': '住宿券',
    '4': '折价券',
    '5': '点数',
    '6': '招待券',
    '8':'辅助金',
    '7': '其他',
  },
  //一周得描述
  weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

  idCardTypeDesc: "证件类型",
  selectIdCardType: '请选择证件类型',
  staffManagerDesc: '人员管理',
}

