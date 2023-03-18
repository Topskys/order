import {defineStore} from 'pinia'


export const app = defineStore({
    id: "app",
    state: () => {
        return {
            isCollapse: true,// 是否展开侧边栏
        }
    },
    getters: {
        getIsCollapse(): boolean {
            return this.isCollapse
        },
    },
    actions: {
        setIsCollapse(val?: boolean) {
            this.isCollapse = val || !this.isCollapse
        },
        clearState() {
            this.isCollapse = false
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


