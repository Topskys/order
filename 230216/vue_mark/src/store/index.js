/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-03-10 23:03:10
 */
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import file from './modules/file'



Vue.use(Vuex)



const store = new Vuex.Store({
  modules: {
    app,
    user,
    file,
  },
  getters
})


export default store
