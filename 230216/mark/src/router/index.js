/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-02-17 22:33:44
 * @LastEditors: Topskys
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'hash', // 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
