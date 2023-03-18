import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from '../router'
import {storeToRefs} from 'pinia'
import {user} from '../store/user'


const showMsg = (msg: string) => ElMessage({
    type: "error",
    message: msg
})


const service = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 5000,
//    withCredentials:true,
});


service.interceptors.request.use(config => {
    // pinia admin 放在该函数外边会报错：未初始化
    const {token, getToken} = storeToRefs(user())
//    getToken.value && (config.headers['Authorization'] = 'Bearer ' + getToken.value)
    getToken.value && (config.headers['Authorization'] = `Bearer ${getToken.value}`)
    return config
}, err => {
    showMsg(err)
    Promise.reject(err)
})


service.interceptors.response.use(response => {
    const result = response?.data
    if (result?.code !== 200) {
        // result?.code === 401 && router.push(`/login?backUrl=${router.currentRoute.value.fullPath}`)
        if (result?.code === 401) {
            // store.clearState() // or store.$reset()
            router.push(`/login?backUrl=${router.currentRoute.value.fullPath}`)
        }
        showMsg(result?.msg)
        return Promise.reject(result)
    }
    return result
}, err => {
    showMsg(err)
    Promise.reject(err)
})


export default service