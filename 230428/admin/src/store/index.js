import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import route from './modules/route.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    route,
  },
  getters
})

export default store
