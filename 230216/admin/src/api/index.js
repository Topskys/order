/*
 * @Author: Topskys
 * @Date: 2023-04-08 00:08:50
 * @LastEditTime: 2023-04-08 13:01:34
 * api统一原型挂载
 */
import Vue from 'vue'
const files = require.context("@/api", true, /\.js$/)

files.keys().forEach(key => {
    const module = key.split("/").at(-1).replace(/\.js$/, "")
    if (!module.includes("index")) {
        Vue.prototype[`$${module}`] = files(key)
    }
})