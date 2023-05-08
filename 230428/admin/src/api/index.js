/**
 * 统一原型挂载接口
 */
import Vue from 'vue'
const files = require.context("@/api", true, /\.js$/)

files.keys().forEach(key => {
    const module = key.split("/").at(-1).replace(/\.js$/, "")
    if (!module.includes("index")){
        Vue.prototype[`$${module}`] = files(key)
    }
})

