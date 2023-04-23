/*
 * @Author: Topskys
 * @Date: 2023-02-24 21:04:24
 * @LastEditTime: 2023-03-14 14:26:38
 */
const { app, Menu, MenuItem,remote } = require('electron')

// 创建菜单模板
const menuTemplate = [
    { label: '复制', role: 'copy' },
    { label: '粘贴', role: 'paste' },
    { type: 'separator' },
    { label: '退出', role: 'quit' }
]

// 创建菜单实例
const menu = Menu.buildFromTemplate(menuTemplate)


export default function rightKey() {
    // 绑定右键菜单事件
   window.addEventListener('contextmenu', function (e) {
        e.preventDefault()
        menu.popup({ window: remote.getCurrentWindow() })
    }, false)
}