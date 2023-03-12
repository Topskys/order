const fs = require('fs');

// 获取指定路径下的所有文件
const getFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

// 导入指定路径下的所有文件
const importFiles = async (path) => {
    const files = await getFiles(path);

    files.forEach((file) => {
        if (/\.js$/.test(file)) {
            require(path + '/' + file);
        }
    });
};


module.exports =importFiles
