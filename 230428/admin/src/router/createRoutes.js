/*
 * @Author: Topskys
 * @Date: 2023-03-17 13:28:18
 * @LastEditTime: 2023-03-27 10:27:42
 */
/**
 * 生成路由数组
 * @param {Array} arr 
 */
export function createRoutes(arr = [], all = true) {
    let result = []
    arr.length && (all = false)
    const files = require.context("@/views", true, /index.vue$/)
    files.keys().filter(key => {
        const name = key.split("/").at(-2)
        all && arr.push(name)
        arr.includes(name) && result.push({
            path: `/${name}`,
            name: name,
            component: files(key).default,
            meta: {
                title: name,
                icon: "",
            }
        })
    })
    console.log(result)
    return result
}