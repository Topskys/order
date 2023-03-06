/*
 * @Author: Topskys
 * @Date: 2023-02-17 21:47:41
 * @LastEditTime: 2023-03-01 19:29:43
 * @Description: 主窗口
 */
import { BrowserWindow, app, ipcMain, dialog, Notification } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import tray from '../electron/tray.js';
import menu from '../electron/menu.js';
import notice from '../electron/notice.js';

const path = require('path');

const events = require('events');


const winConfig = {
    show: false, // 优化启动时的白屏
    frame: true, // 不要边框
    focusable: true, // 聚焦
    resizable: true, // 禁止窗口大小变化
    // icon:path.join(__dirname,'./public/mark@32.ico'),
    icon: './public/mark@128.ico', // 窗口图标
    webPreferences: {
        nodeIntegration: true, // 集成node.js
        contextIsolation: false, // 上下文隔离，默认true
        // preload: path.resolve(__dirname, "../renderer/rightKey.js")

        webSecurity: false, // 关闭安全检查
    }
}


class MainWin extends events {
    constructor(confInfo) {
        super();
        this.confInfo = confInfo;
        this.config = Object.assign({}, winConfig, confInfo)
        this.windowInstance = new BrowserWindow(this.config)

        if (process.env.WEBPACK_DEV_SERVER_URL) {
            this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/home`)
        } else {
            createProtocol('app')
            this.windowInstance.loadURL('app://./index.html#/home')
        }

        this.init();
    }

    init() {

        // 托盘
        tray(this.windowInstance);

        this.windowInstance.once('ready-to-show', () => {
            this.windowInstance.show()
            // 顶部菜单栏
            menu(this.windowInstance)
        })

        this.windowInstance.once('show', () => {
            this.emit('show')
        })


        // 当frame为false时，需监听最大、最小、关闭按钮
        this.listenIpc()

    }

    close() {
        if (this.windowInstance && this.windowInstance.isVisible()) {
            this.windowInstance.close()
            this.windowInstance = null
        }
    }

    listenIpc() {

        // 保存文件
        ipcMain.on("save", (event, data) => dialog.showMessageBox({ title: data.title || "提示", message: data.content }));

        // 错误提示框
        ipcMain.on("error", (e, data) => dialog.showErrorBox({ title: data.title || 'Error', content: data.content }));

        ipcMain.on("dialog-message", function (e, data) {
            dialog.showMessageBox(data).then(result => {
                console.log("dialog----", result)
                result.response === 0 && console.log("-0")
                result.response === 1 && console.log("-1")
            }).catch(err => {
                console.log(err)
            })
        })


        // 通知
        ipcMain.on("notice", (e, data) => notice(data));



        //  // 最小化窗口 
        // // 在.vue使用ipcRenderer.send('mainwin-minize')发送给主进程，主进程在此监听mainwin-minize事件。
        // ipcMain.on('mainwin-minize',()=>{
        //     this.windowInstance.minimize()
        // })

        // // 最大化窗口
        // ipcMain.on('mainwin-maximize',()=>{
        //     this.windowInstance.maximize()
        // })

        // // 最大化还原
        // ipcMain.on('mainwin-restore',()=>{
        //     this.windowInstance.restore()
        // })

        // // 关闭窗口
        // ipcMain.on('mainwin-close',()=>{
        //     app.quit()
        // })
    }
}


export default MainWin;