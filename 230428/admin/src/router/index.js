import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const initRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    //    component: Layout,
    redirect: '/product',
    //    children: [
    //      {
    //        path: 'dashboard',
    //        name: 'Dashboard',
    //        component: () => import('@/views/product/index.vue'),
    //        meta: { title: 'Dashboard', icon: 'dashboard' },
    //        hidden: true,
    //      },
    //    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: "/product/list",
    name: 'Product',
    meta: { title: '产品管理', icon: 'product' },
    children: [{
      path: 'list',
      component: () => import('@/views/product/index'),
      meta: { title: '产品信息', icon: '' }
    },
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: "/order/list",
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/index'),
        meta: { title: '订单信息', icon: '' }
      },
    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: "/comment/list",
    meta: { title: '评价管理', icon: 'el-icon-s-comment' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/comment/index'),
        meta: { title: '商品评价', icon: '' }
      },
    ]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/list',
    meta: { title: '客服中心', icon: 'el-icon-chat-dot-round' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/service/index'),
        meta: { title: '顾客咨询', icon: '' }
      },
    ]
  },
  {
    path: '/discount',
    component: Layout,
    redirect: "/discount/list",
    meta: { title: '活动管理', icon: 'discount' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/discount/index'),
        meta: { title: '福利中心', icon: '' }
      },
    ]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: "/staff/list",
    meta: { title: '员工管理', icon: 'staff' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/staff/index'),
        meta: { title: '维修师傅', icon: '' }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: "/user/list",
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/index'),
        meta: { title: '用户信息', icon: '' }
      },
    ]
  },
  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: initRoutes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}



export default router
