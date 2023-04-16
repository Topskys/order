/*
 * @Author: Topskys
 * @Date: 2023-02-17 17:46:10
 * @LastEditTime: 2023-04-16 21:41:21
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
        this.win = new BrowserWindow(this.config)
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            this.win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/launch`)
        } else {
            createProtocol('app')
            this.win.loadURL('app://./index.html/#/launch')
            // this.win.loadURL('app://./launch.html')
        }
        this.init();
    }

    async init() {
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        this.win.on('show', () => {
            this.emit('show')
        })
    }

    close() {
        if (this.win && this.win.isVisible()) {
            this.win.close()
            this.win = null
        }
    }
}


export default Launch;