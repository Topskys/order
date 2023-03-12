import notification from '../../renderer/notice'
import { setStorage, getStorage, delStorage } from '../../utils'


export default {
    namespaced: true,


    state: {
        files: [], // 文件列表数组
        currFile: null, // 当前文件
        isSave:false, // 保存
    },


    getters: {
        getFiles: (state) => state.files,
        getCurrFile: (state) => state.currFile,
    },


    mutations: {
        // 设置文件列表数组
        SET_FILES: (state, payload = []) => {
            state.files = payload
            !state.currFile && state.files.length && (state.currFile = state.files[0])
        },
        // 添加文件列表数组
        PUSH_FILES: (state, filePath) => {
            state.files.push({
                uuid: crypto.randomUUID(),
                name: filePath.split('\\').at(-1).replace("/\.(.{1,})$/", ""),
                filePath,
            })

            setStorage('files', state.files)

            !state.currFile && state.files.length && (state.currFile = state.files[0])
        },
        // 设置当前文件对象
        SET_CURR_FILE: (state, file) => {
            state.currFile = file
        },

        // 
        SET_IS_SAVE: (state, payload) => {
            state.isSave = payload || !state.isSave
        },
    },



    actions: {
        setFiles({ commit }, filePath) {
            commit("PUSH_FILES", filePath)
        },
        setCurrFile({ commit }, data) {
            commit("SET_CURR_FILE", data)
        },
        getFiles({ commit, state }) {
            let payload = getStorage('files')
            JSON.stringify(payload) === '{}' && (payload = [])
            commit("SET_FILES", payload)
        },

        setIsSave({ commit }, data) {
            commit("SET_IS_SAVE", data)
        },


    }
}