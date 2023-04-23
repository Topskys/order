/**
 * 启动系统Terminal
 */
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

function startTerminal() {
    // let dir = './shell'
    // !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true }) // 判断目录是否存在，否则创建目录
    // // dir = path.resolve(__dirname, dir).replace(/\\/g, '/')
    // child_process.exec(`start cmd.exe /K cd /D ${dir}`); // start cmd.exe /K cd /D D:/shell
    child_process.exec(`start cmd.exe /K`); 
}

export default startTerminal;
