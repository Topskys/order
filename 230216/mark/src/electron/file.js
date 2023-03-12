/*
 * @Author: Topskys
 * @Date: 2023-03-01 19:31:30
 * @LastEditTime: 2023-03-10 23:00:20
 */

const { dialog } = require('electron');



/**
     * 打开文件
     * @param {*} win 
     * @returns 
     */
function openFile(win) {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog(win, {
            properties: ['openFile'],
            filters: [{
                name: 'Markdown', extensions: 'md'
            }]
        }).then(result => {
            resolve(result.filePaths[0]);
        }).catch(err => {
            console.log(err)
            reject(err);
        })
    })
}


/**
 * 打开文件夹
 * @param {*} win 
 * @returns 
 */
function openDirectory(win) {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog(win, {
            properties: ['openDirectory'],
        }).then(result => {
            resolve(result.filePaths[0])
        }).catch(err => {
            console.log(new Date().toLocaleString(), err)
            reject(err);
        })
    })
}


export {
    openFile,
    openDirectory
}

