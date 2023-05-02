# server

## 项目进度
> 2023年3月7日21:21:08

封装CRUD、utils工具（jwt、response、nodemailer、redis、autoRequire）


> 2023年3月11日22:39:24

问题：注册验证邮箱的验证码发送失败
原因：nodemailer.sendMail返回一个Promise，需要await的等待
解决：2023年3月11日23:02:14 在调用nodemailer.sendMail时注意使用异步async/await

> 2023年3月13日13:11:14

修复Redis不能存储问题。完善登录注册验证码发送问题。

> 2023年3月18日21:29:54

编写获取用户列表信息服务。
使用mongodb默认的模型时间配置，会出现时间差的现象，
mongoDB写入的时间日期是格林尼治时间（0时区），
与我们本地时区相差8个时区，所以需要将格林尼治时间转化为东八区的时间（GMT）。


> 2023年3月19日14:25:52

创建反馈数据模型。
