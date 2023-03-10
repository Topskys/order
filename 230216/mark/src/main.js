/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-03-11 14:22:30
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import with ES6
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// utils
import http from '@/utils/http'
// renderer
import notice from '@/renderer/notice'


store.dispatch("file/getFiles")
store.dispatch("app/getApp")



// use
Vue.use(ElementUI);
// 全局注册
Vue.use(mavonEditor)
// 挂载原型
Vue.prototype.$http = http
Vue.prototype.$notice = notice


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
