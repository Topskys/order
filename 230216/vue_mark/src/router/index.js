import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/launch',
    name: 'Launch',
    component: () => import('../views/Launch.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  },
]

const router = new VueRouter({
  mode: 'hash', // process.env.IS_ELECTRON ? 'hash' : 'history', // electron 使用 hash 模式 解决打包后白屏问题
  base: process.env.BASE_URL,
  routes
})

export default router
