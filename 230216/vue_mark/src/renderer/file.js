/*
 * @Author: Topskys
 * @Date: 2023-03-10 16:51:14
 * @LastEditTime: 2023-04-10 09:10:40
 */
const fs = window.require('fs');
const path = window.require('path');
import notification from './notice'
import store from '../store'


class File {

    /**
     * 新建文件
     * @param {String} filePath 文件路径
     * @param {String} fileContent 文件内容
     */
    async createFile(filePath, fileContent = `${Date.now()}`) {
        try {
            if (filePath) {
                const res = /\.(.{1,})$/.test(filePath)
                !res && (filePath = `${filePath}.md`)
            } else {
                filePath = path.resolve(__dirname, `mark@${new Date().getTime()}.md`)
            }
            await fs.promises.writeFile(filePath, fileContent);
            store.dispatch("file/pushFiles", { filePath, curr: true }) // 把文件插入列表并修改当前文件 
        } catch (error) {
            notification({ title: 'Error', body: error })
        }
    }


    /**
     * 可读流，读取文件，使用流读取文件内容
     * @param {String} filePath 文件路径
     * @returns 
     */
    readStream(filePath) {
        if (!filePath) return notification({ title: 'Error', body: "文件出现异常" })
        const rs = fs.createReadStream(filePath);
        rs.setEncoding("utf8");
        return new Promise((resolve, reject) => {
            let content = '';
            // 当有数据可读时触发data事件
            rs.on('data', (chunk) => (content += chunk));
            // 当所有数据都已被读取时触发end事件
            rs.on('end', () => resolve(content));
            rs.on('error', (err) => reject(err));
        });
    }


    /**
     * 可写流，写入文件
     * @param {String} filePath 文件路径
     * @param {String} content 写入文件内容
     */
    writeStream(filePath = `mark@${new Date().getTime()}.md`, content) {
        filePath = /\.(.{1,})$/.test(filePath) ? filePath : `${filePath}.md`;
        const ws = fs.createWriteStream(filePath);
        ws.write(content, "utf8");
        ws.on("finish", () => store.dispatch("file/setIsSave", true));
        ws.on("error", (err) => {
            store.dispatch("file/setIsSave", false)
            notification({
                title: 'Error',
                body: '保存失败'
            })
        });
        ws.end();
    }


    async openDirectoryPicker() {
        try {
            const handle = await showDirectoryPicker()
            const root = await processHandle(handle) // 根句柄
            console.log("root", root)
            await this.readHandleContext(await root.children[0].getFile())
            // const file = await root.children[0].getFile()
            // const reader = new FileReader()
            // reader.onload = (e) => {
            //     console.log('0-0-0-', e.target.result)
            // }
            // reader.readAsText(file, 'utf-8')
        } catch {
            // 用户拒绝
        }
        async function processHandle(handle) {
            if (handle.kind === 'file') {
                return handle
            }
            handle.children = []
            const iter = handle.entries(); // 异步句柄
            for await (const item of iter) {
                handle.children.push(await processHandle(item[1]))
            }
            return handle
        }
    }

    async readHandleContext(fileHandle) {
        console.log('909090')
        const file = fileHandle//= await fileHandle.getFile()
        const reader = new FileReader()
        reader.onload = (e) => {
            console.log('0-0-0-', e.target.result)
        }
        reader.readAsText(file, 'utf-8')
        reader.onprogress = function () {
            console.log("onprogress状态" + this.readyState)
        }
        reader.onerror = (err) => {
            console.error(err)
        }
    }

}


export default File