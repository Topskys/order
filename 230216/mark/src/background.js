/*
 * @Author: Topskys
 * @Date: 2023-04-10 23:18:17
 * @LastEditTime: 2023-04-23 09:52:13
 */
'use strict'

import { app, screen, protocol, BrowserWindow, Notification, session } from 'electron'
// window
import LaunchWindow from './electron/wins/launchWindow.js';
import MainWindow from './electron/wins/mainWindow.js';
// window size
import {
    BASE_WIN_WIDTH,
    BASE_WIN_HEIGHT,
    DESIGN_LAUNCH_WIDTH,
    DESIGN_LAUNCH_HEIGHT,
    DESIGN_MAIN_WIDTH,
    DESIGN_MAIN_HEIGHT
} from './utils/var.js';


const isDevelopment = process.env.NODE_ENV !== 'production'


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {
        scheme: 'app',
        privileges: {
            secure: true,
            standard: true
        }
    }
])


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createMainWin()
    app.setAppUserModelId("Mark Editor");
})

function createMainWin(launchWin) {
    const rect = screen.getPrimaryDisplay().bounds;
    const main_w = (rect.width / BASE_WIN_WIDTH) * DESIGN_MAIN_WIDTH
    const main_h = (rect.height / BASE_WIN_HEIGHT) * DESIGN_MAIN_HEIGHT;
    const mainWin = new MainWindow({
        width: main_w,
        height: main_h,
    });
    launchWin && mainWin.on('onShow', () => launchWin.close())
}

function createLaunchWin() {
    const rect = screen.getPrimaryDisplay().bounds;
    const launch_w = (rect.width / BASE_WIN_WIDTH) * DESIGN_LAUNCH_WIDTH
    const launch_h = (rect.height / BASE_WIN_HEIGHT) * DESIGN_LAUNCH_HEIGHT;
    const launchWin = new LaunchWindow({
        width: launch_w,
        height: launch_h,
    })
    launchWin.on('onShow', function () {
        setTimeout(() => {
            createMainWin(launchWin)
        }, 2000)
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWin()
    }
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
