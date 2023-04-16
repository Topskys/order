const fs = window.require('fs').promises;
const path = window.require('path');


async function createFileTree(rootDir = 'D:/MyProject/temp/20230216/admin-vite/src') {
    const fileTree = [];
    const files = await fs.readdir(rootDir);

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const filePath = path.join(rootDir, fileName);
        const stats = await fs.stat(filePath);
        const isDirectory = stats.isDirectory();

        if (isDirectory) {
            const subtree = await createFileTree(filePath);
            fileTree.push({
                id: fileName,
                text: fileName,
                label: fileName,
                type: 'folder',
                children: subtree,
                filePath: filePath
            });
        } else {
            fileTree.push({
                id: fileName,
                text: fileName,
                label: fileName,
                type: "file",
                filePath: filePath
            });
        }
    }
    return fileTree;
}


//const fileTree = createFileTree('D:/MyProject/temp/20230216/admin-vite/src');
//console.log('weiweiwei--',fileTree.then(res=>{console.log(res)}));

export {createFileTree}