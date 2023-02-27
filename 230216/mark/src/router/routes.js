/*
 * @Author: Topskys
 * @Date: 2023-02-17 17:36:16
 * @LastEditTime: 2023-02-23 18:42:11
 * @LastEditors: Topskys
 * @Description: 
 */
const routes = [
    {
        path: '/launch',
        name: "Launch",
        component: () => import('@/pages/launch.vue')
    },
    {
        path: '/home',
        name: "Home",
        component: () => import('@/pages/home.vue')
    },
    {
        path: '/setting',
        name: "Setting",
        component: () => import('@/pages/setting.vue')
    },
    {
        path: '/sign', // 登录及注册
        name: "Sign",
        component: () => import('@/pages/sign.vue')
    },
    {
        path: '/about', 
        name: "About",
        component: () => import('@/pages/about.vue')
    },
]



export default routes