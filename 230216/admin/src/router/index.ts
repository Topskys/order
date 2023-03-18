import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import {App} from 'vue';
//import {user} from '../store/user'



//const store=user()

interface Result {
    path: string,
    name: string,
    component: Function
}

const autoLoad = (arr: any, dir?: string): RouteRecordRaw[] => {
    const results: RouteRecordRaw[] = []
    arr.forEach(x => {
        const item: Result = {
            path: `/${x}`,
            name: x,
            component: () => import(`${dir ? dir : '../views'}/${x}/index.vue`)
        }
        results.push(item)
    })
//    console.log(results)
    return results
}


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import("../layout/index.vue"),
        children: autoLoad(["dashboard","document","picture","feedback","profile","users"])
    },
    ...autoLoad(["home", "login"])
];


const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: (to, from, savedPosition) => savedPosition || {top: 0}, // 页面滚动设置
    routes
});


// 路由守卫
//router.beforeEach((to, from, next) => !localStorage.getItem('token') ? to.name === "login" ? next() : router.push('login') : next());





// 导入路由并与main.ts初始化 方式1
export default router

// 路由初始化 方式2
export const initRouter = (app: App<Element>) => app.use(router);