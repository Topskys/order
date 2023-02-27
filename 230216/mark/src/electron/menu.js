const { app, Menu, dialog,shell } = require('electron');
// import {keyEvent} from '../utils'
const ke={
    type:'keyUp',
    keyCode:'13'
}

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
                    click: () => win.webContents.sendInputEvent(ke)
                },
                {
                    label: '打开',
                    accelerator: 'Ctrl+Shift+O',
                    click: () => {
                        dialog.showOpenDialog(win, {
                            properties: ['openFile',],
                            filters: [{ name: 'All Files', extensions: ['*'] }]
                        }).then(result => {
                            win.webContents.send("open",result)
                        }).catch(err => {
                            dialog.showErrorBox('Error', err)
                        })
                    }
                },
                {
                    label: '保存',
                    accelerator: 'Ctrl+S',
                    click: () => win.webContents.send("save-m")
                },
                {
                    label: '另存为',
                    accelerator: 'Ctrl+Shift+P',
                    click: () => {
                        console.log('2')
                    }
                },
                {
                    label: '展开工具栏',
                    accelerator: 'Ctrl+Shift+N',
                    click: () => win.webContents.send("spread")
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
                    click: () => win.webContents.send('navigation','setting')
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
            label:'帮助',
            role: 'help',
            submenu: [
                {
                    label: 'Markdown Reference',
                    click: async () => await shell.openExternal('https://electronjs.org')
                },
                {
                    label: 'Custom Themes',
                    click: () => {
                        console.log('2')
                    }
                },
                {
                    label: 'Website',
                    click: async () => await shell.openExternal('https://electronjs.org')
                },
                {
                    label: 'Github',
                    // 使用浏览器打开该链接
                    click: async () => await shell.openExternal('https://electronjs.org')
                },
                {
                    label: '登录',
                    click: () => win.webContents.send('navigation','sign')
                },
                {
                    label: '隐私',
                    click: async () => await shell.openExternal('https://electronjs.org')
                },
                {
                    label: '鸣谢',
                    click: async () => await shell.openExternal('https://electronjs.org')
                },
                {
                    label: '反馈',
                    click: () => {
                        console.log('2')
                    }
                },
                {
                    label: '检查更新',
                    click: () => {
                    }
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