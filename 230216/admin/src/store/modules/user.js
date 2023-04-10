import { login, logout, verify } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    name: 'Topsky',
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
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim() }).then(res => {
        commit("SET_TOKEN", res.token)
        setToken(res.token)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  verify({ commit }) {
    return new Promise((resolve, reject) => {
      verify().then(({ data }) => {
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit("SET_USER_INFO", data)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        localStorage.setItem('userInfo', JSON.stringify(data))
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        this.dispatch("user/resetToken")
        resetRouter()
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      localStorage.removeItem("userInfo")
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

