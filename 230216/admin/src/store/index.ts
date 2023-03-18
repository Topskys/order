import {createPinia} from 'pinia'
import {App} from 'vue';
import piniaPluginPersist from 'pinia-plugin-persist'


const store = createPinia()

store.use(piniaPluginPersist) // 使用持久化插件

const initStore = (app: App<Element>) => app.use(store)


export default initStore







