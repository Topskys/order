const { app, Menu, dialog, shell } = require('electron');
const { openFile, openFileFolder } = require("./file");
const createFile = require("./createFile.js");
const notice = require("./notice.js");



const isMac = process.platform === 'darwin'



const menu = (win) => {
    var menus = [
        // { role: 'fileMenu' }
        {
            label: '文件',
            submenu: [
                {
                    label: '新建',
                    accelerator: 'Ctrl+N',
                    click: async () => {
                        try {
                            const { canceled, filePath } = await dialog.showSaveDialog(win, { title: '新建' });
                            !canceled && filePath && win.webContents.send('new', { canceled, filePath });
                        } catch (error) {
                            notice({ title: 'Error', body: error })
                        }
                    }
                },
                {
                    label: '打开文件',
                    accelerator: 'Ctrl+Shift+O',
                    click: async () => win.webContents.send("openFile", await openFile(win))
                },
                {
                    label: '打开文件夹',
                    accelerator: 'Ctrl+K+O',
                    click: async () => win.webContents.send("openDirectory", await openDirectory(win))
                },
                {
                    label: '保存',
                    accelerator: 'Ctrl+S',
                    click: () => win.webContents.send("saveFile")
                },
                {
                    label: '另存为',
                    accelerator: 'Ctrl+Shift+P',
                    click: () => {
                        console.log('2')
                    }
                },
                {
                    label: '导入',
                    click: () => {
                        console.log('3')
                    }
                },
                {
                    label: '导出',
                    click: () => {
                        console.log('2')
                    }
                },
                {
                    label: '设置',
                    accelerator: 'Ctrl+Shift+S',
                    click: () => win.webContents.send('navigation', 'setting')
                },
                {
                    label: '主页',
                    click: () => win.webContents.send('navigation', 'home')
                },
                {
                    label: '返回',
                    click: () => win.webContents.send('navigation', 'back')
                },
                {
                    label: '关闭',
                    role: 'close'
                }
            ]
        },
        // { role: 'editMenu' }
        {
            label: '编辑',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startSpeaking' },
                            { role: 'stopSpeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: '视图',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: '窗口',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
        {
            label: '帮助',
            role: 'help',
            submenu: [
                {
                    label: 'Markdown Reference',
                    click: async () => await shell.openExternal('https://commonmark.org/help/')
                },
                {
                    label: 'Custom Themes',
                    click: () => win.webContents.send('navigation', 'setting')
                },
                {
                    label: 'Website',
                    click: async () => await shell.openExternal('http://127.0.0.1:5137/')
                },
                {
                    label: 'Github',
                    // 使用浏览器打开该链接
                    click: async () => await shell.openExternal('https://github.com/Topskys/order/tree/main/230216')
                },
                {
                    label: '隐私',
                    click: async () => await shell.openExternal('https://electronjs.org')
                },
                {
                    label: '鸣谢',
                    click: async () => await shell.openExternal('https://github.com/hinesboy/mavonEditor')
                },
                {
                    label: '反馈',
                    click: () => win.webContents.send('navigation', 'feedback')
                },
                {
                    label: '关于',
                    click: () => win.webContents.send('navigation', 'about')
                },
            ]
        }
    ]

    const temp = Menu.buildFromTemplate(menus)
    Menu.setApplicationMenu(temp)
}


export default menu