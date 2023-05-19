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
    redirect: '/product',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据面板', icon: 'dashboard' }
    }]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    meta: { title: '家政服务管理', icon: 'el-icon-sell' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/index.vue'),
        meta: { title: '家政服务', icon: '' }
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    meta: { title: '订单管理', icon: 'el-icon-shopping-bag-1' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/index.vue'),
        meta: { title: '订单列表', icon: '' }
      },
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    meta: { title: '活动管理', icon: 'activity' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/activity/index.vue'),
        meta: { title: '活动列表', icon: '' }
      }, 
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    meta: { title: '类别管理', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/category/index.vue'),
        meta: { title: '类别列表', icon: '' }
      },
    ]
  },
  {
    path: '/evaluate',
    component: Layout,
    redirect: '/evaluate/list',
    meta: { title: '服务评价', icon: 'el-icon-receiving' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/evaluate/index.vue'),
        meta: { title: '评价列表', icon: '' }
      },
    ]
  },
  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/list',
    meta: { title: '员工管理', icon: 'peoples' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/employee/index.vue'),
        meta: { title: '员工列表', icon: '' }
      },
    ]
  },
  {
    path: '/contact',
    component: Layout,
    redirect: '/contact/list',
    meta: { title: '留言管理', icon: 'el-icon-chat-line-square' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/contact/index.vue'),
        meta: { title: '留言列表', icon: '' }
      },
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
