# 230428
‎2023年4月28日19:30:15

## 技术选型
> Node.js + Vue.js + 原生微信小程序 + MongoDB

## 运行项目

首先，克隆（下载）项目，在Visual Studio Code 打开前台项目 **admin**文件夹，找到新建终端（或终端Terminal），下载依赖运行项目；
在微信开发者工具打开**wxapp**文件夹，后面与前台项目admin同样操作；在IDEA打开**server**文件夹，后面与前台项目admin同样操作：
```bash
# 在此之前，你需要下载git项目版本管理工具，亦可在https://github.com/Topskys/order.git上直接下载项目zip再导入编译器运行

# 克隆项目
git clone https://github.com/Topskys/order.git

# 下载项目依赖
npm install
# 运行项目(server)
npm run start
# 运行项目(wxapp)，顶部菜单中间编译
# 运行项目(admin)
npm run dev
```


## 项目进度

### 搭建环境
> ‎2023‎年‎4‎月‎23‎日 ‏‎22:46:32

1、安装环境  
[NodeJs](https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi)

2、安装开发工具  
[intelliJ IDEA](https://www.jetbrains.com/)  
[Visual Studio Code](https://code.visualstudio.com/)  
[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

3、安装数据库及可视化工具  
[MongoDB](https://www.mongodb.com/)  
[MongoDB Compass](https://www.mongodb.com/products/compass)

### 初始化微信小程序
> ‎2023‎年‎4‎月‎24‎日 ‏‎22:22:18

使用微信开发者工具搭建微信小程序wxapp项目，界面构思与设计，构建界面基础框架。

### Tabbar界面编码
> 2023年4月26日22:12:51

基本完成四个Tabbar基础界面构思与设计，并完成相应界面编码，包括首页、帅选、我的、登录、注册、关注我们，封装网络wx.request()请求。

### 界面编码
> 2023年4月28日00:13:45

初步完成首页、商品详情页、收藏页的界面设计与编码。