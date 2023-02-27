/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:10:08
 * @LastEditTime: 2023-02-24 18:51:09
 * @LastEditors: Topskys
 * @Description: 
 */

import { Notification } from 'electron';


const notice = (data) => {
    new Notification({
        title: data.title || "Notice",
        body: data.body ,
        icon: "./mark@128.ico",
        // icon: "../assets/images/logo@48.png",
    }).show();
}


export default notice