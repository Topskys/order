<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:55
 * @LastEditTime: 2023-02-25 22:22:29
 * @LastEditors: Topskys
 * @Description: 
-->
# 230216 Mark
Mark is a desktop application for editing markdown.

## 技术选型 (暂时)
Electron + Vue.js + Nest.js + MongoDB

## 启动项目

```bash
# 安装依赖
npm install
# 运行项目
npm run electron:serve
# 打包项目
npm run electron:build
```

## 项目规划

## 项目进度

### 项目初始化
> 2023年2月16日23:33:56

1、安装环境  
[NodeJs](https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi)

2、开发工具  
[intelliJ IDEA](https://www.jetbrains.com/)  
[Visual Studio Code](https://code.visualstudio.com/)  

3、数据库及可视化工具（vsCode插件）  
[MongoDB](https://www.mongodb.com/)  
[MongoDB Compass](https://www.mongodb.com/products/compass)
[Database Client](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2)

4、初始化electron应用

### 应用页面编码
> 2023年2月22日23:49:09
难点：根据keyCode模拟键盘事件

> 2023年2月25日21:21:27
问题：NavigationDuplicated: Avoided redundant navigation to current location: "/about".
产生时间：2023年2月25日21:21:27
原因：接收的data字符缺少"/"符号。
```js
// 源码
// 监听路由导航
    ipcRenderer.on(
      "navigation",
      (e, data) =>
        this.$route.path.split("/")[1] !== data &&
        (data === "back" ? this.$router.back() : this.$router.push(data))
    );
```
解决：给data拼接“/”字符即可解决Vue路由重复报错问题。
解决时间：2023年2月25日21:33:02
// 修改后
// 监听路由导航
    ipcRenderer.on(
      "navigation",
      (e, data) =>
        this.$route.path.split("/")[1] !== data &&
        (data === "back" ? this.$router.back() : this.$router.push(`/${data}`))
    );
```



> 2023年2月25日22:21:29
由于.scss不能像.css一样在main.js直接导入使用，需要在vue.config.json引入sass/less样式
```json
css: {
    loaderOptions: {
      scss: {
        // additionalData 可在``中引入多个scss
        additionalData: `
        @import "~@/assets/styles/index.scss";
        `,
      },
    }
  },
```








### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





