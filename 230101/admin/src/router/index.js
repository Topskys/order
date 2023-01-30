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
export const constantRoutes = [
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
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据面板', icon: 'dashboard' }
    }]
  },
  {
    path: '/room',
    component: Layout,
    redirect: '/room/list',
    name: 'Room',
    meta: { title: '房间管理', icon: 'el-icon-house' },
    children: [
      {
        path: 'roomList',
        name: 'RoomList',
        component: () => import('@/views/room/index'),
        meta: { title: '房间列表', icon: '' }
      },
      {
        path: 'detailList',
        name: 'DetailList',
        component: () => import('@/views/room/detail.vue'),
        meta: { title: '详情列表', icon: '' }
      },
      {
        path: 'roomAdd',
        name: 'RoomAdd',
        component: () => import('@/views/room/add.vue'),
        meta: { title: '新增房间', icon: '' }
      },
      {
        path: 'detailAdd',
        name: 'DetailAdd',
        component: () => import('@/views/room/add.vue'),
        meta: { title: '新增详情', icon: '' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表', icon: '' }
      }, 
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    name: 'Member',
    meta: { title: '会员管理', icon: 'peoples' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/member/index'),
        meta: { title: '顾客列表', icon: '' }
      }, 
    ]
  },
  {
    path: '/lose',
    component: Layout,
    redirect: '/lose/list',
    name: 'Lose',
    meta: { title: '失物招领', icon: 'el-icon-document' },
    children: [
      {
        path: 'list',
        name: 'LoseList',
        component: () => import('@/views/lose/index'),
        meta: { title: '招领列表', icon: 'table' }
      },
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: 'Personal',
    name: 'Personal',
    meta: { title: '个人中心', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'info',
        name: 'PersonalInfo',
        component: () => import('@/views/table/index'),
        meta: { title: '个人信息', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Topskys/order/tree/main/230101',
        meta: { title: 'Github', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
