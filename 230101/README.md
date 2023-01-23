# 230101

## 技术选型
> Node.js(koa) + Vue.js + 原生微信小程序 + MongoDB


## 运行项目

首先，克隆（下载）项目，在Visual Studio Code 打开前台项目 **admin**文件夹，找到新建终端（或终端），下载依赖运行项目；
在微信开发者工具打开**wxapp**文件夹，后面与前台项目admin同样操作；
在IDEA打开**server**文件夹，后面与前台项目admin同样操作：
```bash
# 在此之前，你需要下载git项目版本管理工具，亦可在https://github.com/Topskys/order.git上直接下载项目zip再导入编译器运行

# 克隆项目
git clone https://github.com/Topskys/order.git

# 下载项目依赖
npm install
# 运行项目
npm run dev
```



## 项目进度

### 初始化项目
> 2023年1月1日14:08:45

1、安装环境  
[NodeJs](https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi)

2、安装开发工具  
[intelliJ IDEA](https://www.jetbrains.com/)  
[Visual Studio Code](https://code.visualstudio.com/)  
[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

3、安装数据库及可视化工具  
[MongoDB](https://www.mongodb.com/)  
[MongoDB Compass](https://www.mongodb.com/products/compass)

4、初始化微信小程序、后台管理、Node.js(koa)服务  

### 小程序页面编码
> 2023年1月8日16:24:11

初步完成四个TabBar页面编码绘制，首页预定、服务(wifi、房间清洁、客服、退房、安全通道)、订单(待付款、待入住、入驻中、待评价)、会员中心。


### 小程序封装及后端服务编码
> 2023年1月16日16:35:55

封装网络wx.request()请求、用户信息(权限)效验、各个页面组件，基本完成四个TabBar页面数据服务。


### 小程序及后端服务功能完善和修复
> 2023年1月23日23:27:46

完善小程序，新增客人信息、领取优惠劵、在线充值等功能，重构后端服务，修复权限认证异常。小程序端及其后端服务基本完成。


