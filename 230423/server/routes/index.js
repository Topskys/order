const router = require('koa-router')();
const fs = require('fs');
const path = require('path');


/**
 * 自动化引入并注册路由
 * @param filePath 读取目录路径
 */
function loadRoutes(filePath) {

  //将当前目录下 都读出来
  const files = fs.readdirSync(filePath); // ['file.js',...]

  // 过滤
  files.filter(file => {
    // 读取的时候会将当前目录的 index.js 也读取出来，这个不需要，如果拿到别的地方可以不加这个判断
    if (filePath !== __dirname && file === 'index.js') console.log("routes module must not be 'index.js' ")
    return file !== 'index.js'
    // 将 index.js 过滤掉，路由名字一律不能用 index.js 命名，否则不生效，我这里边的 index.js 如果拿到外面就不用添加这个判断了 ...
  }).forEach(file => {
    let newFilePath = path.join(filePath, file);
    if (fs.statSync(newFilePath).isDirectory()) { // 是目录
      loadRoutes(newFilePath); // 递归
    } else { // 是文件
      let route = require(newFilePath);
      //注册路由
      router.use(route.routes())
      router.use(route.allowedMethods())
    }
  })
}

loadRoutes(__dirname);


module.exports = router;
