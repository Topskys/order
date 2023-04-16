/*
 * @Author: Topskys
 * @Date: 2023-03-10 16:51:14
 * @LastEditTime: 2023-04-13 09:47:25
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
                const res = /\.(.{1,})$/g.test(filePath)
                !res && (filePath = `${filePath}.md`)
            } else {
                filePath = path.resolve(__dirname, `mark@${new Date().getTime()}.md`)
            }
            await fs.promises.writeFile(filePath, fileContent);
            store.dispatch("file/pushFiles", {filePath, curr: true}) // 把文件插入列表并修改当前文件
        } catch (error) {
            notification({title: 'Error', body: error})
        }
    }


    /**
     * 可读流，读取文件，使用流读取文件内容
     * @param {String} filePath 文件路径
     * @returns
     */
    readStream(filePath) {
        if (!filePath) return notification({title: 'Error', body: "文件出现异常"})
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
        console.log('ws--', filePath)
        !(/\.(.{1,})$/g.test(filePath)) && (filePath = `${filePath}.md`);
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

}


export default File