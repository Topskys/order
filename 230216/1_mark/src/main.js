/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-04-01 09:52:22
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// mavon
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import http from '@/utils/http'
import notice from '@/renderer/notice'
import SvgIcon from '@/components/SvgIcon/index.vue'

// store
store.dispatch("file/getFiles")
store.dispatch("app/getApp")



// use
Vue.use(ElementUI);
// 全局注册
Vue.use(mavonEditor)
// 挂载原型
Vue.prototype.$http = http
Vue.prototype.$notice = notice
Vue.component('svg-icon',SvgIcon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
