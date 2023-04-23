/*
 * @Author: Topskys
 * @Date: 2023-02-16 22:34:06
 * @LastEditTime: 2023-03-27 21:21:05
 * @Description: 主进程
 */
'use strict'
import { app, screen } from 'electron';
import Launch from './wins/launch.js';
import MainWin from './wins/mainWin.js';
import {
  BASE_WIN_WIDTH,
  BASE_WIN_HEIGHT,
  DESIGN_LAUNCH_WIDTH,
  DESIGN_LAUNCH_HEIGHT,
  DESIGN_MAIN_WIDTH,
  DESIGN_MAIN_HEIGHT
} from './utils/var.js';


app.on('ready', async () => {

  const rect = screen.getPrimaryDisplay().bounds;

  const launch_w = (rect.width / BASE_WIN_WIDTH) * DESIGN_LAUNCH_WIDTH
  const launch_h = (rect.height / BASE_WIN_HEIGHT) * DESIGN_LAUNCH_HEIGHT;

  const main_w = (rect.width / BASE_WIN_WIDTH) * DESIGN_MAIN_WIDTH
  const main_h = (rect.height / BASE_WIN_HEIGHT) * DESIGN_MAIN_HEIGHT;

  const launch = new Launch({
    width: launch_w,
    height: launch_h,
  })

  // 启动窗口
  launch.on('show', function () {
    setTimeout(() => {
      const mainWin = new MainWin({
        width: main_w,
        height: main_h,
      });
      mainWin.on('show', () => launch.close());
    }, 1000)
  });



});

