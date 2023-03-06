/*
 * @Author: Topskys
 * @Date: 2023-02-24 19:56:18
 * @LastEditTime: 2023-03-01 17:19:51
 * @Description: renderer 右键
 */
const remote = window.require('@electron/remote'); // npm install --save @electron/remote
const { clipboard } = window.require('electron')
const Menu = remote.Menu

let contextMenu = [
    { label: '新建文本' },
    { label: '复制' },
    { label: '粘贴' },
    { type: 'separator' },
    {
        label: 'others', click() {
            console.log("others")
        }
    },
]

// 创建菜单
let menu = Menu.buildFromTemplate(contextMenu);

// DOM加载完成后，监听鼠标右击
window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        // 在当前窗口弹出右键菜单
        menu.popup({ window: remote.getCurrentWindow() })
    }, false)
})

// export default function rightKey() {
//





//     // 定义一个右键菜单
//     const menu = new remote.Menu();
//     menu.append(new remote.MenuItem({
//         label: '复制',
//         role: 'copy',
//     }));
//     menu.append(new remote.MenuItem({
//         label: '粘贴',
//         role: 'paste',
//     }));

//     // 监听右键点击事件，根据目标元素类型来展示不同的菜单
//     window.addEventListener('contextmenu', (e) => {
//         e.preventDefault(); // 阻止默认菜单
//         menu.popup({ window: remote.getCurrentWindow() }); // 展示菜单
//     }, false);

//     // 监听复制和粘贴事件
//     document.addEventListener('copy', (e) => {
//         const selectedText = window.getSelection().toString();
//         e.clipboardData.setData('text/plain', selectedText);
//         e.preventDefault();
//     });

//     document.addEventListener('paste', (e) => {
//         const text = clipboard.readText();
//         console.log(text);
//     });

// }


