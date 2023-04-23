# BUG

### 解决element-ui按需引用报错
> 2023年4月9日21:04:23

Error：Cannot find module 'babel-preset-es2015'

[腾讯云开发者社区](https://cloud.tencent.com/developer/article/1820418)

```bash
# 安装Element UI 官方提供的按需引入插件
npm install babel-plugin-component -D
```
实际上 Vue CLI 2.x 版本没有 .babelrc 文件，可以直接在 babel.config.js 文件中进行配置。

```bash
# 安装  @babel/preset-env
npm i @babel/preset-env -D
```
在 babel.config.js 文件中进行配置：
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', ["@babel/preset-env", {"modules": false}]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

### 解决electron打包后启动应用白屏问题
> 2023年4月9日21:34:23

vue的路由在electron中使用 hash 模式，解决打包后白屏问题。

```js
// ./src/router/index.js
const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history', // hash
  base: process.env.BASE_URL,
  routes
})
```


### tray托盘不显示
> 2023年4月22日20:34:14

可能文件位置在打包之后发生偏移。
