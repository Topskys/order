/*
 * @Author: Topskys
 * @Date: 2023-02-17 21:47:41
 * @LastEditTime: 2023-03-27 22:10:51
 * @Description: 主窗口
 */
import { BrowserWindow, app, ipcMain, dialog, Notification, shell } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import tray from '../electron/tray.js';
import menu from '../electron/menu.js';
import notice from '../electron/notice.js';
import rightKey from '../electron/rightKey'

const path = require('path');
const events = require('events');
const updater = require('../electron/autoUpdater')




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

        // 检查应用更新
        // updater()

        // 右键菜单
        // rightKey()
    }

    close() {
        if (this.windowInstance && this.windowInstance.isVisible()) {
            this.windowInstance.close()
            this.windowInstance = null
            app.quit()
        }
    }

    listenIpc() {
        // 新建文件
        ipcMain.on("new", async (e, data) => {
            const win = this.windowInstance
            try {
                const { canceled, filePath } = await dialog.showSaveDialog(win, { title: '新建' });
                !canceled && filePath && win.webContents.send('new', { canceled, filePath });
            } catch (error) {
                notice({ title: 'Error', body: error })
            }
        });

        // 保存文件
        ipcMain.on("save", (event, data) => dialog.showMessageBox({ title: data.title || "提示", message: data.content }));

        // 错误提示框
        ipcMain.on("error", (e, data) => dialog.showErrorBox({ title: data.title || 'Error', content: data.content }));

        // 通知
        ipcMain.on("notice", (e, data) => notice(data));

        // register
        ipcMain.on("register", async (e, data) => {
            try {
                e.preventDefault();
                await shell.openExternal(data)
            } catch (err) {
                notice({ body: "操作异常" })
            }
        })



        ipcMain.on("dialog-message", function (e, data) {
            dialog.showMessageBox(data).then(result => {
                result.response === 0 && console.log("-0")
                result.response === 1 && console.log("-1")
            }).catch(err => {
                console.log(err)
            })
        })
    }
}


export default MainWin;

