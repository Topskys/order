/*
 * @Author: Topskys
 * @Date: 2023-03-01 19:31:30
 * @LastEditTime: 2023-03-02 11:36:35
 */
const fs = require("fs");
const path = require("path");
const { dialog } = require('electron');


// 打开文件
function openFile(win) {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog(win, {
            properties: ['openFile'],
            filters: [{
                name: 'Markdown', extensions: 'md'
            }]
        }).then(result => {
            resolve(result);
        }).catch(err => {
            console.log(err)
            reject(err);
        })
    })
}


// 打开文件夹
function openFileFolder(win) {
    return new Promise((resolve,reject) => {
        dialog.showOpenDialog(win, {
            properties: ['openDirectory'],
        }).then(result => {
            resolve(result)
        }).catch(err => {
            console.log(new Date().toLocaleString(),err)
            reject(err);
        })
    })
}



// 读取文件内容
function readFile(data) {
    let result = null;
    const readStream = fs.createReadStream(data.filePaths[0]);

    readStream.setEncoding("utf8");

    readStream.on("data", (chunk) => (result = chunk));

    readStream.on("error", (err) => console.error(err));

    return result;
}



// 写入文件
function writeFile(data, filePath = `${new Date().getTime()}.md`) {
    filePath = /\.md$/.test(filePath) ? filePath : `${filePath}.md`;

    const writeStream = fs.createWriteStream(filePath);

    writeStream.write(data, "utf8");

    writeStream.end();

    // 处理流结束事件
    writeStream.on("finish", () =>
        ipcRenderer.send("save", { title: undefined, content: "保存成功" })
    );

    // 处理流错误事件
    writeStream.on("error", (err) => console.error("数据写入失败。", err));
}




export {
    openFile,
    openFileFolder,
    readFile,
    writeFile,
}

