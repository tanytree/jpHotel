/*
 * @Date: 2020-08-27 13:25:04
 * @Author: 陶子
 * @LastEditTime: 2021-04-28 18:12:30
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
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
