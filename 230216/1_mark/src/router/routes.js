/*
 * @Author: Topskys
 * @Date: 2023-02-17 17:36:16
 * @LastEditTime: 2023-03-10 15:48:59
 */


const files = require.context("@/pages", true, /.*\.vue$/)


/**
 * 自动化引入页面文件，生成路由数组
 * @returns 路由数组
 */
export default function createRoutes() {
    var routes = []
    files.keys().forEach(key => {
        let name = key.split("/").at(-1).split(".")[0]
        name = name.charAt(0).toLowerCase() + name.slice(1)
        routes.push({
            path: `/${name}`,
            name,
            component: () => import(`@/pages/${name.charAt(0).toUpperCase() + name.slice(1)}`)
        })
    })
    // console.log('routes--', routes)
    return routes
}

