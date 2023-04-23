/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:23:37
 * @LastEditTime: 2023-03-23 14:45:11
 */
import { login, logout, getInfo } from '@/api/user'
import { getStorage, setStorage, delStorage } from '@/utils'
import { getToken, setToken, removeToken } from '@/utils/auth'




const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: getStorage("userInfo"),
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
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}


const actions = {
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(({ token }) => {
        commit('SET_TOKEN', token)
        setToken(token)
        // dispatch('getInfo')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(({ userInfo }) => {
        if (!userInfo) return reject('Verification failed, please Login again.');
        commit('SET_USERINFO', userInfo)
        setStorage("userInfo", userInfo)
        resolve(userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        delStorage("userInfo")
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 移除token令牌
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

