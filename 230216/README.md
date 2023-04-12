<!--
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:55
 * @LastEditTime: 2023-04-12 21:32:04
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

## 项目目录结构
```js
src
├─api
├─assets
│  ├─images
│  └─styles
├─components
│  ├─ContextMenu
│  ├─Footer
│  ├─JsTree
│  │  └─themes
│  │      ├─default
│  │      └─default-dark
│  ├─RightMenu
│  ├─Sign
│  ├─SvgIcon
│  ├─Terminal
│  └─tooltip
├─config
├─electron
├─icons
│  └─svg
├─pages
├─renderer
├─router
├─store
│  └─modules
├─utils
└─wins
```


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

### 问题1
> 2023年2月22日23:49:09
难点：根据keyCode模拟键盘事件

### 问题2
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
```js
// 修改后
// 监听路由导航
    ipcRenderer.on(
      "navigation",
      (e, data) =>
        this.$route.path.split("/")[1] !== data &&
        (data === "back" ? this.$router.back() : this.$router.push(`/${data}`))
    );
```

### Webpack & Vite 配置

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

### 前台页面及逻辑编码
> 2023年3月10日15:46:34

程序主页底部增加侧边栏和顶部工具栏显示与隐藏的控件。
自动化引入页面文件，生成路由数组。
实现文件内容追加。

### 完善前台页面编码，新增底部状态栏
> 2023年3月12日21:07:33

完善设置界面及其功能。新增底部状态栏信息。

### 探索
> 2023年3月14日19:17:32

侧边栏文件模糊搜索。注意：a标签，img标签，div标签、span标签、li标签、p标签、b标签等等html标签都可以在标签内加title完成鼠标悬停，若是悬停必要鼠标指针变成手指状对其配置css （cursor:pointer）
用户反馈界面。

### 增强界面交互效果
> 2023年3月21日21:58:09

新建登录窗口，在表单验证错误时，给表单按钮添加shake左右振动。

### 修复界面无限重绘问题
> 2023年3月23日13:39:13

修改侧边栏搜索输入框样式及动画，移除登录窗口，解决界面重绘

### 新增启动Terminal终端功能
> 2023年4月2日21:21:23

目前，支持调用外部终端，暂不支持集成powerShell，待完善child_proccess子进程spawn执行shell命令。利用node.js的spawn接口调用系统终端程序，方便开发人员调用与开发项目。
### 探索
> 2023年4月2日21:21:23

windows查看端口占用并终止
```bash
netstat -ano|findStr "1234"
taskkill -PID -F pid
```

### #eff2f5

### 解决打包后样式资源加载失败
> 2023年4月12日21:30:23

解决打包后，启动应用，了饿了么图标不显示的问题，以及markdown编辑区样式资源的加载问题。所有资源不用CDN，均使用本地载入。



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





