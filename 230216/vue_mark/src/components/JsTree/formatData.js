/*
 * @Author: Topskys
 * @Date: 2023-04-06 21:22:58
 * @LastEditTime: 2023-04-07 17:35:47
 */
// { id: "ajson2", parent: "#", text: "Root node 2", type: "root" },

// async function openDirPicker() {
//     const handle = await showDirectoryPicker()
//     const root = await formatHandle(handle)
//     console.log('root', root)
//     await readFileContent(root.children[0])
// }

async function formatHandle(handle) {
    if (handle.kind === 'file') {
        return handle
    }
    handle.children = []
    const iter = handle.entries(); // 异步句柄
    for await (const item of iter) {
        handle.children.push(await formatHandle(item))
    }
    return handle
}

// async function readFileContent(fileHandle) {
//     const file = await fileHandle.getFile();
//     const reader = new FileReader()
//     reader.onload = (e) => {
//         console.log('0-0-0-', e.target.result)
//     }
//     reader.readAsText(file, 'utf-8')
//     // const fileContent = await file.text()
//     // console.log('formatHandle--', fileContent)
//     // return fileContent
// }

var dirHandle

async function openDirPicker() {
    dirHandle = await window.showDirectoryPicker();
    if (!dirHandle) return;
    const root = await formatHandle(dirHandle);
    console.log('root', root)
    await read(root.children[0].name)
}
async function read(filename) {
    const fileHandle = await dirHandle.getFileHandle(filename);
    if (fileHandle.kind === 'file') {
        const file = await fileHandle.getFile();
        const fileContent = await file.text()
        console.log('formatHandle--', fileContent)
    }
}



export {
    openDirPicker,
    // readFileContent,
}