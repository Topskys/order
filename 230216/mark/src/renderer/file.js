/*
 * @Author: Topskys
 * @Date: 2023-03-10 16:51:14
 * @LastEditTime: 2023-03-23 15:51:04
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
    async createFile(filePath, fileContent = '') {
        try {
            if (filePath) {
                const res = /\.(.{1,})$/.test(filePath)
                res || (filePath = `${filePath}.md`)
            } else {
                filePath = path.resolve(__dirname, `mark@${new Date().getTime()}.md`)
            }
            await fs.promises.writeFile(filePath, fileContent);
            store.dispatch("file/pushFiles", { filePath, curr: true }) // 把文件插入列表并修改当前文件 
        } catch (error) {
            // notification({ title: 'Error', body: error })
            this.$message({
                type: "info",
                message: error
            })
        }
    }




    /**
     * 读取文件，使用流读取文件内容
     * @param {String} filePath 
     * @returns 
     */
    readFile(filePath) {

        if (!filePath) return
        const readStream = fs.createReadStream(filePath);
        readStream.setEncoding("utf8");

        // 创建一个Promise对象，以便异步处理
        return new Promise((resolve, reject) => {
            let content = '';

            // 当有数据可读时触发data事件
            readStream.on('data', (chunk) => (content += chunk));

            // 当所有数据都已被读取时触发end事件
            readStream.on('end', () => resolve(content));

            // 当发生错误时触发error事件
            readStream.on('error', (err) => reject(err));
        });
    }


    /**
     * 写入文件
     * @param {String} filePath 文件路径
     * @param {String} content 写入文件内容
     */
    writeFile(filePath = `mark@${new Date().getTime()}.md`, content) {

        filePath = /\.(.{1,})$/.test(filePath) ? filePath : `${filePath}.md`;
        const writeStream = fs.createWriteStream(filePath);

        writeStream.write(content, "utf8");
        writeStream.on("finish", () => store.dispatch("file/setIsSave", true));
        writeStream.on("error", (err) => store.dispatch("file/setIsSave", false));
        writeStream.end();
    }




    /**
     * 保存文件，修改文件的内容的保存
     * @param {String} filePath  文件路径
     * @param {String} content  文件内容
     */
    async saveFile(filePath, content) {
        try {
            // await fs.accessSync(filePath); // 使用accessSync方法检查文件是否存在

            // 文件内容追加
            await fs.writeFile(filePath, content, { flag: 'r+' }, err => {
                this.$message({
                    type: "info",
                    message: err
                })
            })
        } catch (err) {
            notification({ title: "保存文件异常", body: err })
        }
    }
}


export default File