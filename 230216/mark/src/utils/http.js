import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';
const { ipcRenderer } = window.require("electron");


// service.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// service.defaults.adapter = require('axios/lib/adapters/http');// 强制使用node模块

const service = axios.create({
    baseURL: "http://localhost:3000",//process.env.VUE_APP_BASE_URL,
    withCredentials: true,
    timeout: 5000,
})

// 请求拦截  设置统一header
service.interceptors.request.use(
    config => {
        // store.getters.token && config.headers['Authorization'] = getToken()
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const data = response.data
        if (data.code !== 200) {
            ipcRenderer.send('notice', { title: 'Error', body: data.msg })
        }
        return data;
    },
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

export default service;