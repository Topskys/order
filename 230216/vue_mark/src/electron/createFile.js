/*
 * @Author: Topskys
 * @Date: 2023-03-09 22:45:02
 * @LastEditTime: 2023-03-09 23:05:23
 */
const { dialog } = require('electron');



function createFile (win){

    return dialog.showSaveDialog(win, { title: '新建' });
}


export default createFile
