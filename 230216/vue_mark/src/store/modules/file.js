/*
 * @Author: Topskys
 * @Date: 2023-03-10 12:06:16
 * @LastEditTime: 2023-03-23 16:02:02
 */
import { setStorage, getStorage, delStorage } from '../../utils'


export default {
    namespaced: true,


    state: {
        files: [], // 文件列表数组
        currFile: null, // 当前文件
        isSave: false, // 保存
        activeId: null, // 文件高亮行
    },
    getters: {
        getFiles: (state) => state.files,
        getCurrFile: (state) => state.currFile,
    },
    mutations: {
        // 设置文件列表数组
        SET_FILES(state, payload = []) {
            state.files = payload
            !state.currFile && state.files.length && this.commit("file/SET_CURR_FILE", state.files[0])
            setStorage('files', state.files)
        },
        // 添加文件列表数组
        PUSH_FILES(state, { filePath, curr }) {
            const file = {
                uuid: crypto.randomUUID(),
                name: filePath.split('\\').at(-1).replace("/\.(.{1,})$/", ""),
                filePath,
                save:true,
            }
            state.files.push(file)
            setStorage('files', state.files)
            curr && state.files.length && this.commit("file/SET_CURR_FILE", file)
        },
        // 移除文件
        REMOVE_FILE(state, payload) {
            state.files = state.files.filter(file => file.uuid !== payload.uuid && file)
            setStorage('files', state.files)
            state.files.length && this.commit("file/SET_CURR_FILE", state.files.length > 1 ? state.files[state.files.length - 1] : state.files[0])
            // if (state.files.length) {
            //     const file = state.files.length > 1 ? state.files[state.files.length - 1] : state.files[0]
            //     this.commit("file/SET_CURR_FILE", file)
            // }
        },
        // 设置当前文件列表高亮行
        SET_ACTIVE_ID(state, payload) {
            state.activeId = payload
        },
        // 设置当前文件对象
        SET_CURR_FILE(state, file) {
            state.currFile = file
            this.commit("file/SET_ACTIVE_ID", file.uuid)
        },
        // 设置文件保存状态
        SET_IS_SAVE: (state, payload) => {
            state.isSave = payload || !state.isSave
        },
    },
    actions: {
        pushFiles({ commit }, data) {
            commit("PUSH_FILES", data)
        },
        setCurrFile({ commit }, data) {
            commit("SET_CURR_FILE", data)
        },
        setActiveId({ commit }, data) {
            commit("SET_ACTIVE_ID", data)
        },
        getFiles({ commit, state }) {
            let payload = getStorage('files')
            JSON.stringify(payload) === '{}' && (payload = [])
            commit("SET_FILES", payload)
        },
        setIsSave({ commit }, data) {
            commit("SET_IS_SAVE", data)
        },
        removeFiles({ commit }, payload) {
            commit("REMOVE_FILE", payload)
        }
    }
}