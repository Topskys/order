/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:23:36
 * @LastEditTime: 2023-03-07 21:52:38
 */
// import defaultSettings from '@/settings'

// const { showSettings, fixedHeader, sidebarLogo } = null//defaultSettings

const state = {
  // showSettings: showSettings,
  // fixedHeader: fixedHeader,
  // sidebarLogo: sidebarLogo,

  isCollapse: true,
  showToolbar: true,

}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

