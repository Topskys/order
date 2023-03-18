import {defineStore} from 'pinia'
import {login, verify, logout} from '../api/user'


export const user = defineStore({
    id: "user",
    // 在vuex中state是一个对象
    state: () => {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6IlRvcHNreSIsIl9pZCI6IjYzY2U5MTNiMTQ5MjdmZjRiZTNjYWYxMSIsImlhdCI6MTY3Nzk4OTYzMywiZXhwIjoxNjc4NTk0NDMzfQ.zYzLJKlH2rpN5dHFiatqyK4IPieD3-vuFN1Nkfd5SKU",
            userInfo: {}
        }
    },
    // computed计算属性，与vuex一样，具有缓存，可修饰返回值
    getters: {
        getToken(state): string {
            return state.token
        },
        getUserInfo(): any {
            return this.userInfo
        },
    },
    // 修改state，同时支持异步和同步，几乎与vuex一样
    actions: {
        setToken(val: string) {
            this.token = val
        },
        setUserInfo(val: string) {
            this.userInfo = val
        },
        clearState() {
            this.token = ''
            this.userInfo = {}
        },
        login(data: any) {
            return new Promise((resolve, reject) => {
                login(data).then(({data}) => {
                    this.setToken(data.token)
                    this.verify()
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        verify() {
            return new Promise((resolve, reject) => {
                verify().then(({data}) => {
                    this.setUserInfo(data)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                logout().then(() => {
//                    this.clearState() // or user().$reset()  // 注意，退出登录本地用户验证信息将为空（token，userInfo）
                }).catch(err => {
                    reject(err)
                })
            })
        },
    },
    // 插件持久化存储
    persist: {
        enabled: true,
        // 不写默认session
        strategies: [
            {
                key: "user", // 默认id
                storage: localStorage, // 默认session
            }
        ]
    }
})


