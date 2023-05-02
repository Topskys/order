const nodemailer = require('nodemailer')
const {HOST, EMAIL, PASSWORD} = require('../controller/config/email')

/**
 * 邮件类
 */
class Mailer {

    constructor() {
        this.config ={
            host: HOST, // 邮件供应商
            // port: 587, // 端口号
            secure: false, // true for 465, false for other ports
            service: "qq",
            auth: {
                user: EMAIL, // 发件人邮箱地址
                pass: PASSWORD, // 发件人邮箱密码
            }
        }

        this.transporter = nodemailer.createTransport(this.config)
    }


    // 编辑文本，发送邮件
    sendMail(options) {
        return new Promise((resolve, reject) => {

            const mailOptions = {
                from: EMAIL, // 发件人邮箱地址
                to: options.to, // 收件人邮箱地址
                subject: options.subject || 'Hello ✔', // 邮件主题
                // text: options.text || 'Hello world?', // 邮件正文
                html: options.html || '<b>Hello world?</b>' // 邮件正文（HTML 格式）
            }

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    console.log('Email sent: ' + info.response)
                    resolve(info)
                }
            })
        })
    }
}

module.exports = new Mailer()
