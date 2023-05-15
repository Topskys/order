
import { login, logout, getInfo } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    name: '',
    avatar: '',//"https://qmplusimg.henrongyi.top/gva_header.jpg",
  }
}
const state = getDefaultState()


const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, info) => {
    state.adminInfo = info
  },
  SET_NAME: (state, name) => {
    state.name = name||'Topsky'
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar || "https://qmplusimg.henrongyi.top/gva_header.jpg"
  }
}

const actions = {
  //  login
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then((res) => {
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(({ data }) => {
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USER_INFO', data)
        commit('SET_NAME', data.nickName)
        commit('SET_AVATAR', data.avatarUrl)
        localStorage.setItem('userInfo', JSON.stringify(data))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      localStorage.removeItem('userInfo')
      location.reload()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      localStorage.removeItem('userInfo')
      commit('RESET_STATE')
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

