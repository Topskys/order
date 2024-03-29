import { login, logout, getInfo } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
  SET_NAME: (state, username) => {
    state.name = username || 'Admin'
  },
  SET_AVATAR: (state, avatarUrl) => {
    state.avatar = avatarUrl
  }
}


const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
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
      getInfo(state.token).then(({ data }) => {
        if (!data) return reject('Verification failed, please Login again.');
        commit('SET_NAME', data.username)
        commit('SET_AVATAR', data.avatarUrl)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },


  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        resolve(res)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        location.reload()
      })
    })
  },


  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

