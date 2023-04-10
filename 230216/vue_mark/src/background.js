'use strict'

import { app, screen, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
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
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      // Install Vue Devtools
      session.defaultSession.loadExtension(path.resolve('shell-chrome'))
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // screen
  const rect = screen.getPrimaryDisplay().bounds;

  function createMainWin(launchWin) {
    const main_w = (rect.width / BASE_WIN_WIDTH) * DESIGN_MAIN_WIDTH
    const main_h = (rect.height / BASE_WIN_HEIGHT) * DESIGN_MAIN_HEIGHT;

    const mainWin = new MainWindow({
      width: main_w,
      height: main_h,
    });

    mainWin.on('show', () => launchWin.close())
  }

  function createLaunchWin() {
    const launch_w = (rect.width / BASE_WIN_WIDTH) * DESIGN_LAUNCH_WIDTH
    const launch_h = (rect.height / BASE_WIN_HEIGHT) * DESIGN_LAUNCH_HEIGHT;

    const launchWin = new LaunchWindow({
      width: launch_w,
      height: launch_h,
    })

    launchWin.on('show', function () {
      setTimeout(() => {
        createMainWin(launchWin)
      }, 1000)
    })
  }

  createLaunchWin()

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




// async function createWindow() {
//   // Create the browser window.
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {

//       // Use pluginOptions.nodeIntegration, leave this alone
//       // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
//       nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
//       contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
//     }
//   })

//   if (process.env.WEBPACK_DEV_SERVER_URL) {
//     // Load the url of the dev server if in development mode
//     await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
//     // if (!process.env.IS_TEST) win.webContents.openDevTools()
//   } else {
//     createProtocol('app')
//     // Load the index.html when not in development
//     win.loadURL('app://./index.html')
//   }
// }


