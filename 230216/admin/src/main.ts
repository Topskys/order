import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router,{ initRouter } from './router'
import initStore from './store'
import autoImport from './utils/autoImport'
// svg-icon
import 'virtual:svg-icons-register'
import svgIcon from './components/svgIcon/index.vue'
//import ids from 'virtual:svg-icons-names'
//console.log('------------------------',ids)



// 路由引入方式一
// createApp(App).use(router).mount('#app')

// 路由引入方式二
const app=createApp(App)
initRouter(app)
initStore(app)
autoImport(app)
app.component('svg-icon',svgIcon).mount('#app')