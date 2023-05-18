/*
 * @Author: Topskys
 * @Date: 2023-03-28 10:10:46
 * @LastEditTime: 2023-04-12 15:40:50
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/my_theme/theme/index.css'

import '@/styles/index.scss' // global css
import '@/styles/common.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/api'
import request from '@/utils/request'

Vue.prototype.$http= request
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
