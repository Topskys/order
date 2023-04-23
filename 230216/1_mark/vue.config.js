/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:28:45
 * @LastEditTime: 2023-02-25 22:27:08
 */
const { defineConfig } = require('@vue/cli-service');
// const px2rem = require('postcss-px2rem')

module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, // eslint 

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
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: (config) => {
        config.output.filename('background.js');
      }

      //     nodeIntegration: true,
      //     builderOptions: {
      //       appId: 'com.mark',
      //       productName: 'mark', // 项目名
      //       // eslint-disable-next-line no-template-curly-in-string
      //       artifactName: 'mark-${version}.${ext}',
      //       copyright: 'Copyright © 2023 Topsky',
      //       // extraResources: './public/flash/',
      //       mac: {
      //         icon: 'build/icons/icon.icns',
      //         target: ['dmg']
      //       },
      //       win: {
      //         icon: 'build/icons/icon.ico',
      //         target: [
      //           {
      //             target: 'nsis', // portable 绿色版 nsis 安装版
      //             arch: ['x64']
      //           }
      //         ]
      //       },
      //       asar: true,
      //       nsis: {
      //         oneClick: false,
      //         language: '2052',
      //         // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      //         allowElevation: true,
      //         // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
      //         allowToChangeInstallationDirectory: true,
      //         installerIcon: 'build/icons/icon.ico',
      //         uninstallerIcon: 'build/icons/icon.ico',
      //         installerHeaderIcon: 'build/icons/icon.ico',
      //         createDesktopShortcut: true, // 创建桌面图标
      //         createStartMenuShortcut: true, // 创建开始菜单图标
      //         deleteAppDataOnUninstall: true, // 卸载删除应用数据
      //         shortcutName: '老万录屏' // 图标名称
      //         // perMachine: true,
      //       }
      //     }
    }
  }


})
