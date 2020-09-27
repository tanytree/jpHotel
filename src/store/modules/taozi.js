

const state = {
  "activeName": 'member',
  'bookingName': 'normal',
  'bookingSubName': 'b3'
};


const mutations = {
  resetActive(state, data) {
    state.activeName = data;
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
