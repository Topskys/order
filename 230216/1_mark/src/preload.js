/*
 * @Author: Topskys
 * @Date: 2023-02-17 16:32:13
 * @LastEditTime: 2023-02-17 17:16:21
 * @LastEditors: Topskys
 * @Description: 
 */

import { ipcRenderer, contextBridge } from 'electron';


// 保存文件
const save=async (data)=>{
    let result=await ipcRenderer.invoke("on-save-event",data)
    console.log('save--',data)
    return `preload-${result}`
}




const sendUrl = async (url) => {
    let res = await ipcRenderer.invoke('on-url-event', url)
    return res
}

const alert = (msg) => {
    ipcRenderer.invoke('on-alert-event', msg)
}


const open = (url) => {
    ipcRenderer.invoke('on-open-event', url);
}



contextBridge.exposeInMainWorld("api", {
    save,
    sendUrl,
    alert,
    open,
})