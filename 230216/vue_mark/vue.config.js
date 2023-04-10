const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // eslint 

  // 配置Electron打包
  pluginOptions: {
    electronBuilder: {
      electronBuilder: {
        nodeIntegration: true, // 在渲染进程使用NodeJS API 或 在new BrowserWindow({})新建窗口时配置
      },
      builderOptions: {
        productName: "Mark", //项目名 这也是生成的exe文件的前缀名
        // appId: "", //包名  
        copyright: "Copyright © 2023", //版权  信息
        asar: false, // asar打包
        compression: "store", // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        win: {
          "icon": "./public/favicon.ico", //这里注意配好图标路径
          target: [{ target: 'nsis', arch: ['ia32', 'x64'] }]
        },
        nsis: {
          oneClick: false, // 一键安装
          perMachine: true, // 为所有用户安装
          allowElevation: true, // 允许权限提升, 设置 false 的话需要重新允许安装程序
          allowToChangeInstallationDirectory: true, // 允许更改安装目录
          "installerIcon": "./public/mark@128.ico",			// 安装图标
          "uninstallerIcon": "./public/mark@32.ico",		//卸载图标
          "installerHeaderIcon": "./public/mark@128.ico", 	// 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单
          deleteAppDataOnUninstall: true,
          "shortcutName": "mark", // 图标名称
          // include: './public/nsis/installer.nsh', // 包含的脚本
          // guid: '53fe4cba-120d-4851-3cdc-dccb3a469019' // 软件guid
        },
        // "publish": [
        //   {
        //     "provider": "Github", 		// 服务器提供商，也可以是GitHub等等
        //     "url": "http://xxxxx/" 		// 服务器地址
        //   }
        // ],
      }
    }
  },
  // css
  css: {
    loaderOptions: {
      scss: {
        // additionalData 可在``中引入多个scss
        additionalData: `
        @import "~@/styles/index.scss";
        `,
      },
    }
  },
  chainWebpack(config) {
    //设置svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },

})
