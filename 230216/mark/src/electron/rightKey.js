const { app, Menu, MenuItem } =require('electron')

// 创建菜单模板
const menuTemplate = [
    { label: '复制', role: 'copy' },
    { label: '粘贴', role: 'paste' },
    { type: 'separator' },
    { label: '退出', role: 'quit' }
]

// 创建菜单实例
const contextMenu = Menu.buildFromTemplate(menuTemplate)

export default function rightKey(){
    // 绑定右键菜单事件
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        contextMenu.popup()
    })
}