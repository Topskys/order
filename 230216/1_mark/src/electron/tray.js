/*
 * @Author: Topskys
 * @Date: 2023-02-17 17:45:50
 * @LastEditTime: 2023-03-09 23:36:51
 * @LastEditors: Please set LastEditors
 * @Description: 托盘
 */
import { app, Tray, Menu } from 'electron';



const tray = (win) => {

  const tray = new Tray('./src/assets/images/logo.png')

  tray.setToolTip('Mark Editor')

  const menu = Menu.buildFromTemplate([
    {
      label: '系统设置',
      click: () => {
        console.log('设置');
      },
    },
    {
      label: '退出应用',
      click: () => {
        app.quit();
      }
    }
  ])

  tray.setContextMenu(menu)
  
  tray.on('click', () => win.isVisible() ? win.hide() : win.show())

}

export default tray