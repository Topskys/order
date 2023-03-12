/*
 * @Author: Topskys
 * @Date: 2023-03-09 22:43:00
 * @LastEditTime: 2023-03-10 11:55:58
 */
const fs = window.require('fs');
const path = window.require('path');
const notification = require("./notice")



async function createFile(filePath) {
    const fileContent = ''; // 初始化文件内容为空字符串
    try {
        let fileName = `${new Date().getTime()}.md`
        await fs.promises.writeFile(filePath, fileContent);

        console.log('文件创建成功');
    } catch (error) {
        console.error('文件创建失败', error);
        notification({ title: 'Error', body: error })
    }
}


export { createFile }