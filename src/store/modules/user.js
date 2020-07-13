// import { login, logout, getInfo } from '@/api/user'

import { setToken, removeToken, setRouterKey, setUserInfo } from '@/utils/auth'
import router from '@/router/router.js'
import md5 from 'js-md5';


const state = {
  id: "",
  userId: "",
  token: "",
  name: '',
  storeList: [],//所有门店集合
  roles: [],
  db: '',
  tenantId: '',
  errmsg: '',
  userInfo: '',
  headimgurl: "",
  nickname: "",
  userName:"",
  userType: '',
  userAuth: '',
  storesInfo: {},
}

const mutations = {
  /**登录保存用户信息 */
  SAVE_USERS: (state, data) => {
    state.storesInfo = data.storesInfo;
    state.token = data.token.accessToken;
    sessionStorage.accessToken = data.token.accessToken;
    Object.assign(state, data.user)
    state.storeList = data.belongTo || [];
  },
  // 全局token
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  // 全局tenantId
  SET_TENANTID: (state, tenantId) => {
    //console.log(tenantId)
    state.tenantId = tenantId
  },

  // 全局db
  SET_DB: (state, db) => {
    //console.log(db)
    state.db = db
  },

  SET_NAME: (state, name) => {
    state.name = name
  },

  SET_ROLES: (state, roles) => {
    //console.log(roles)
    state.roles = roles
  },

  SET_USERINFO: (state, user) => {
    state.userInfo = user
  }
}

const actions = {
  // 用户登录
  loginRole({ commit }, roles) {
    //console.log(roles)
    commit('SET_ROLES', roles)
    setRouterKey(roles)
  },
  saveuser({ commit }, data) {
    commit('SAVE_USERS', data.data)
    setUserInfo(data.data)
  },


  login({ commit }, userInfo) {



  },


  // 处理用户权限
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {

        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const { roles, name } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('角色必须是非空数组!')
        }

        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_TENANTID', '')
        commit('SET_DB', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_TENANTID', '')
      commit('SET_DB', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 更改权限的操作
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {

      const token = role + '-token'

      commit('SET_TOKEN', token)

      commit('SET_TENANTID', tenantId)
      commit('SET_DB', db)

      setToken(token)

      const { roles } = await dispatch('getInfo')


      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
