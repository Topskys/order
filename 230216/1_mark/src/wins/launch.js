/*
 * @Author: Topskys
 * @Date: 2023-02-17 17:46:10
 * @LastEditTime: 2023-03-27 21:17:41
 * @Description: 启动窗口
 */
import { BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';


const events = require('events');

const winConfig = {
    show: false, // 优化启动时的白屏
    frame: false, // 不要边框
    focusable: true, // 聚焦
    resizable: false, // 禁止窗口大小变化
    icon: './public/mark@128.ico', // 窗口图标
    webPreferences: {
        nodeIntegration: true, // 集成node.js
        contextIsolation: false, // 上下文隔离
    }
}


class Launch extends events {
    constructor(confInfo) {
        super();
        this.confInfo = confInfo;
        this.config = Object.assign({}, winConfig, confInfo)
        this.windowInstance = new BrowserWindow(this.config)

        if (process.env.WEBPACK_DEV_SERVER_URL) {
            this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/launch`)
        } else {
            createProtocol('app')
            this.windowInstance.loadURL('app://./index.html#/launch')
        }

        this.init();
    }

    async init() {
        this.windowInstance.once('ready-to-show', () => {
            this.windowInstance.show()
        })

        // 通知 mainWin 显示
        this.windowInstance.on('show', () => {
            this.emit('show')  // extends events
        })
    }

    close() {
        if (this.windowInstance && this.windowInstance.isVisible()) {
            this.windowInstance.close()
            this.windowInstance = null
        }
    }
}


export default Launch;