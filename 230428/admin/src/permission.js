import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  document.title = getPageTitle(to.meta.title) // set page title
  const hasToken = getToken() // determine whether the user has logged in

  // 获取菜单路由
  const getMenuRouter = async (to, next) => {
    if (store.state.route.asyncRoutes.length == 0) {
      const asyncRoutes = await store.dispatch("route/getRouter")
      // 添加路由
      asyncRoutes.forEach(item => {
        router.addRoute(item)
        // console.log('A', router.options.routes)
      }); 
      next(to.path)
    } else {
      // 匹配路由规则
      if (to.matched.length != 0) {
        next()
      } else {
        alert("暂无页面权限")
        next(to.from)
      }
    }
  }

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo =  store.getters.name
      if (hasGetUserInfo) {
        // getMenuRouter(to, next)
        next()
      } else {
        try {
          await store.dispatch('user/getInfo') // get user info
          next()
          getMenuRouter(to, next)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
