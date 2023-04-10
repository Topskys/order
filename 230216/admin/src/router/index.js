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
    name: 'Index',
    component: () => import('@/views/index/index.vue'),
    meta: { title: 'Index' },
    hidden: true,
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: "/dashboard/index",
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'el-icon-data-analysis' }
    }]
  },
  {
    path: '/document',
    component: Layout,
    redirect: "/document/index",
    children: [{
      path: 'index',
      name: 'Document',
      component: () => import('@/views/document/index'),
      meta: { title: '文档管理', icon: 'el-icon-folder' }
    }]
  },
  {
    path: '/image',
    component: Layout,
    redirect: "/image/index",
    children: [{
      path: 'index',
      name: 'Image',
      component: () => import('@/views/image/index'),
      meta: { title: '图片管理', icon: 'el-icon-picture-outline' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: "/user/index",
    children: [{
      path: 'index',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'el-icon-user' }
    }]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: "/feedback/index",
    children: [{
      path: 'index',
      name: 'Feedback',
      component: () => import('@/views/feedback/index.vue'),
      meta: { title: '反馈信息', icon: 'el-icon-message' }
    }]
  },
  {
    path: '/feedback/send',
    name: 'Send',
    component: () => import('@/views/feedback/send.vue'),
    hidden:true,
  },

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
