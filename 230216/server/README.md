# server

## 项目进度
> 2023年3月7日21:21:08

封装CRUD、utils工具（jwt、response、nodemailer、redis、autoRequire）


> 2023年3月11日22:39:24

问题：注册验证邮箱的验证码发送失败
原因：nodemailer.sendMail返回一个Promise，需要await的等待
解决：2023年3月11日23:02:14 在调用nodemailer.sendMail时注意使用异步async/await
