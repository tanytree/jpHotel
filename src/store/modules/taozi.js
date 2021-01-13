/*
 * @Date: 2020-08-27 13:25:04
 * @Author: 陶子
 * @LastEditTime: 2021-01-13 15:16:06
 * @FilePath: \jiudian\src\store\modules\taozi.js
 */


const state = {
  "activeName": 'member',
  'bookingName': 'normal',
  'bookingSubName': 'b3',
  'memberName': 'MemberTypeManager',
};


const mutations = {
  resetActive(state, data) {
    state.activeName = data;
  },
  //设置总办会员管理的启动项
  resetMemberTab(state, data) {
    state.memberName = data;
  },
  resetBookingName(state, data) {
    state.bookingName = data;
  },
  resetBookSub(state, data) {
    state.bookingSubName = data;
  }
};
const getters = {

};
const actions = {


};
export default {
  state,
  getters,
  mutations,
  actions
}
