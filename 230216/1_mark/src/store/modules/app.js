/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:23:36
 * @LastEditTime: 2023-03-14 13:03:38
 */
import { setStorage, getStorage, delStorage } from '../../utils'


export default {
    namespaced: true,

    state: {
        theme: "Light", // 主题
        isCollapsed: true, // 侧边栏
        toolbar: false, // 主要编辑区顶部工具栏
        autoSave: true, // 自动保存
        autoUpload: false, // 自动上传
        upload: 'false', // 上传
        globKey: true, // 全局快捷键
        collapsedKey: "Ctrl + P", // 侧边栏快捷键
        toolBarKey: "Ctrl + T", // 顶部工具栏快捷键

        subfield: true, // 单双列
        ishljs: 'true', // 代码高亮
        lang: "zh-CN", // 编辑区语言
        html: true, // 启用html模式
        fs: '14', // 编辑区字体大小
    },
    mutations: {

        TOGGLE_COLLAPSED: state => {
            state.isCollapsed = !state.isCollapsed;
            setStorage("app", state)
        },
        TOGGLE_TOOLBAR: state => {
            state.toolbar = !state.toolbar;
            setStorage("app", state)
        },
        TOGGLE_SUBFIELD: state => {
            state.subfield = !state.subfield;
            setStorage("app", state)
        },
        TOGGLE_SETTING: (state, payload) => {
            state.autoSave = payload.autoSave

            state.upload = payload.upload
            state.autoUpload = payload.autoUpload
            state.globKey = payload.globKey
            state.collapsedKey = payload.collapsedKey
            state.toolBarKey = payload.toolBarKey

            state.theme = payload.theme
            state.ishljs = payload.ishljs
            state.fs = payload.fs
            state.lang = payload.lang
            state.html = payload.html
            // state = { ...state, ...payload }
            setStorage("app", state)
        },

    },
    actions: {
        toggleCollapsed({ commit }) {
            commit('TOGGLE_COLLAPSED')
        },
        toggleToolbar({ commit }) {
            commit('TOGGLE_TOOLBAR')
        },
        toggleSetting({ commit }, payload) {
            commit('TOGGLE_SETTING', payload)
        },
        toggleSubfield({ commit }) {
            commit('TOGGLE_SUBFIELD')
        },
        // 获取本地设置
        getApp({ commit }) {
            const payload = getStorage('app')
            if (JSON.stringify(payload) === "{}") return
            commit("TOGGLE_SETTING", payload)
        },
    }
}