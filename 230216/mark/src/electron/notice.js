/*
 * @Author: Topskys
 * @Date: 2023-02-24 00:10:08
 * @LastEditTime: 2023-03-26 21:02:11
 */

import { Notification } from 'electron';


const notice = (data) => {
    new Notification({
        title: data.title || "Notice",
        body: data.body,
        icon: "../assets/images/logo@48.png",
    }).show();
}


export default notice