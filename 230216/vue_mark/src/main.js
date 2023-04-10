/*
 * @Author: Topskys
 * @Date: 2023-04-09 20:12:11
 * @LastEditTime: 2023-04-10 21:10:19
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons'

import { Button, Select, Message, Dialog, Input, Form, FormItem, Switch, Option } from 'element-ui';

const components = [Button, Select, Dialog, Input, Form, FormItem, Switch, Option]
components.forEach(item => { Vue.use(item) })


Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
