/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-03-10 15:59:01
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import createRoutes from './routes.js'

Vue.use(VueRouter)





const router = new VueRouter({
  mode: 'hash', // 'history',
  base: process.env.BASE_URL,
  routes: createRoutes()
})


export default router
