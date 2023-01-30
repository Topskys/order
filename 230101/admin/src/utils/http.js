/**
 * axios二次封装
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'



const showMag = (msg) => Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
})



// create an axios instance
const service = axios.create({
    baseURL: 'http://127.0.0.1:3000', // process.env.VUE_APP_BASE_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})


// request interceptor
service.interceptors.request.use(
    config => {
        // let each request carry token
        store.getters.token && (config.headers['Authorization'] = getToken());
        store.getters.token && (config.headers['X-Token'] = getToken());
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            showMag(res.msg || 'Error')
            if (res.code === 401) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log(error) // for debug
        showMag(error.message)
        return Promise.reject(error)
    }
)

export default service



