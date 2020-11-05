

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
