/*
 * @Author: Topskys
 * @Date: 2023-03-21 20:32:22
 * @LastEditTime: 2023-03-23 15:02:45
 * 登录弹窗窗口
 */
import { BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
const events = require('events');


const winConfig = {
    show: false,
    frame: true,
    focusable: true, // 聚焦
    resizable: false, // 禁止窗口大小变化
    webPreferences: {
        nodeIntegration: true, // 集成node.js
        contextIsolation: false, // 上下文隔离
        webSecurity: false, // 关闭安全检查
    }
}


class Child extends events {
    constructor(confInfo) {
        super();
        this.confInfo = confInfo;
        this.config = Object.assign({}, winConfig, confInfo)
        this.windowInstance = new BrowserWindow(this.config)

        if (process.env.WEBPACK_DEV_SERVER_URL) {
            this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/sign`)
        } else {
            createProtocol('app')
            this.windowInstance.loadURL('app://./index.html#/sign')
        }

        this.init();
    }

    async init() {
        this.windowInstance.once('ready-to-show', () => {
            ipcMain.on("sign", (e, data) => {
                // data ? this.windowInstance.show() : this.close();
                if (data) {
                    this.emit("show")
                    this.windowInstance.show()
                } else {
                    this.close()
                    this.emit("hide")
                }
            })
        })
    }

    close() {
        this.windowInstance && this.windowInstance.isVisible() && this.windowInstance.hide()
    }
}


export default Child;