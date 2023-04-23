/*
 * @Author: Topskys
 * @Date: 2023-03-14 11:36:38
 * @LastEditTime: 2023-03-14 11:38:37
 * 自动化更新
 */
const {app}=require("electron")
const { autoUpdater } = require('electron-updater');


module.exports = function updater(){
    autoUpdater.setFeedURL({
        provider: 'github',
        owner: '<github-user>',
        repo: '<github-repo>',
        currentVersion: app.getVersion(), // Optional: Set the current version of the app
    });


    autoUpdater.checkForUpdatesAndNotify();


    autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall();
    });


    autoUpdater.checkForUpdatesAndNotify();
} 


