/*
 * @Author: Topskys
 * @Date: 2023-03-27 16:04:56
 * @LastEditTime: 2023-04-06 15:02:42
 */
import { getMenu } from '@/api/menu'
import { getToken } from '@/utils/auth';
import { initRoutes,resetRouter } from '../../router'


export default {
    namespaced: true,
    state: {
        asyncRoutes: [],
        routes: [], // 完成路由
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.asyncRoutes = routes
            state.routes = initRoutes.concat(routes)
        },
        RESET_ROUTES: (state, payload) => {
            state.routers = []
            state.asyncRoutes = []
        }
    },
    actions: {
        getRouter({ commit }) {
            // 解析路由
            function parseRouter(routes = []) {
                const newRoutes = []
                routes.forEach(item => {
                    const newItem = Object.assign({}, item)
                    newItem.component = (resolve) => {
                        // return require([`@/views/${item.component}`],resolve)
                        const component = item.component === 'layout' ? 'layout' : `view/${item.component}`
                        return require([`@/${component}/index.vue`], resolve)
                    }
                    if (newItem.children && newItem.children.length > 0) {
                        newItem.children.map(child => {
                            child.component = (resolve) => {
                                return require([`@/views/${item.component}/index.vue`], resolve)
                            }
                        })
                    }
                    newRoutes.push(newItem)
                })
                return newRoutes
            }
            // 获取并设置路由
            if (getToken()) {
                return new Promise(async (resolve, reject) => {
                    const localMenu = JSON.parse(localStorage.getItem("menu"))
                    if (localMenu) {
                        const arr = parseRouter(localMenu)
                        commit("SET_ROUTES", arr)
                        resolve(arr)
                    } else {
                        getMenu().then(({ data }) => {
                            const remoteRoutes = parseRouter(data)
                            localStorage.setItem("menu", JSON.stringify(data))
                            commit("SET_ROUTES", remoteRoutes)
                            resolve(remoteRoutes)
                        })
                    }
                })

            }
        },
        resetRouter({ commit }) {
            resetRouter()
            commit("RESET_ROUTES")
        }
    }
}