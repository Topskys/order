/*
 * @Author: Topskys
 * @Date: 2023-02-17 17:45:50
 * @LastEditTime: 2023-04-16 22:26:28
 * @Description: 托盘
 */
import {app, Tray, Menu} from 'electron';

const path = require('path');


const trayFn = (win) => {

    const tray = new Tray(
        process.env.NODE_ENV === 'development' ?
            './public/logo.png' :
            '/resources/public/logo.png')

//  const tray=new Tray('./public/logo.png')

    tray.setToolTip('Mark Editor')

    const menu = Menu.buildFromTemplate([
        {
            label: '打开',
            click: () => win.isVisible() ? win.hide() : win.show(),
        },
        {
            label: '退出',
            click: () => {
                app.quit();
            }
        }
    ])

    tray.setContextMenu(menu)

    tray.on('click', () => win.isVisible() ? win.hide() : win.show())

}

export default trayFn