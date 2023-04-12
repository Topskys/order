/*
 * @Author: Topskys
 * @Date: 2023-02-17 21:47:41
 * @LastEditTime: 2023-04-12 22:19:38
 */
import { BrowserWindow, app, ipcMain, dialog, Notification, shell } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import tray from '../tray.js';
import menu from '../menu.js';
import notice from '../notice.js';
import startTerminal from '../terminal.js'

const path = require('path');
const events = require('events');
// const updater = require('../autoUpdater')

const winConfig = {
    show: false,
    frame: true,
    focusable: true,
    resizable: true,
    // icon:path.join(__dirname,'./public/mark@32.ico'),
    icon: './public/mark@128.ico',
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false,
    }
}


class MainWin extends events {
    constructor(confInfo) {
        super();
        this.confInfo = confInfo;
        this.config = Object.assign({}, winConfig, confInfo)
        this.win = new BrowserWindow(this.config)

        if (process.env.WEBPACK_DEV_SERVER_URL) {
            this.win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/home`)
        } else {
            createProtocol('app')
            this.win.loadURL('app://./index.html/#/home')
        }
        this.init();
    }

    init() {
        this.win.once('ready-to-show', () => {
            menu(this.win) // 顶部菜单栏
            this.win.show()
        })
        this.win.on('show', () => this.emit('show'))
        // 托盘
        tray(this.win);
        // 当frame为false时，需监听最大、最小、关闭按钮
        this.listen()
        // 检查应用更新
        // updater()
    }




    close() {
        if (this.win && this.win.isVisible()) {
            this.win.close()
            this.win = null
            app.quit()
        }
    }

    listen() {
        // 新建文件
        ipcMain.on("new", async (e, data) => {
            try {
                const { canceled, filePath } = await dialog.showSaveDialog(this.win, { title: '新建' });
                !canceled && filePath && this.win.webContents.send('new', { canceled, filePath });
            } catch (error) {
                notice({ title: 'Error', body: error })
            }
        });

        // 保存文件
        ipcMain.on("save", (event, data) => {
            dialog.showMessageBox({
                title: data.title || "提示",
                message: data.content
            })
        })

        // 错误提示框
        ipcMain.on("error", (e, data) => {
            dialog.showErrorBox({
                title: data.title || 'Error',
                content: data.content
            })
        });

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

        // open Terminal
        ipcMain.on('start-terminal', () => startTerminal())

        // ipcMain.on("dialog-message", function (e, data) {
        //     dialog.showMessageBox(data).then(result => {
        //         result.response === 0 && console.log("-0")
        //         result.response === 1 && console.log("-1")
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // })
    }



}


export default MainWin;

