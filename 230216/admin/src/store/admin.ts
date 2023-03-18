import {defineStore} from 'pinia'
import {login, verify, logout} from '../api/user'


export const admin = defineStore({
    id: "admin",
    state: () => {
        return {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6IlRvcHNreSIsIl9pZCI6IjYzY2U5MTNiMTQ5MjdmZjRiZTNjYWYxMSIsImlhdCI6MTY3Nzk4OTYzMywiZXhwIjoxNjc4NTk0NDMzfQ.zYzLJKlH2rpN5dHFiatqyK4IPieD3-vuFN1Nkfd5SKU",
            userInfo: {},
            role: 'admin'
        }
    },
    getters: {
        getToken(): string {
            return this.token
        },
        getUserInfo(): any {
            return this.userInfo
        },
    },
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
                        this.clearState() // or user().$reset()
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
                storage: localStorage, // 默认session
            }
        ]
    }
})


