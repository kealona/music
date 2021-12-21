const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: "smtp.qq.com",
	port: 465, // 端口
	secureConnection: false, // use SSL
	auth: {
		"user": '2274748854@qq.com', // 邮箱账号
		"pass": 'hfmzdpghxlltdhja' // 邮箱的授权码
	}
});

const send = (mailOptions) => {
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.log(error);
		}
	});
}

function randomCode() {
	let max = 9
	let min = 1
	return Math.random() * (max - min + 1) + min | 0
}

module.exports = email => {

	let emailCode = ''
		for(let i=0;i<6;i++) {
			emailCode+=randomCode()
		}
	let emails = {
		title: '欢迎使用云音乐',
		htmlBody: '<h1>欢迎使用云音乐!</h1><p style="font-size: 18px;color:#000;">验证码为：<u style="font-size: 16px;color:#1890ff;">' +
			emailCode + '</u></p><p style="font-size: 14px;color:#666;">5分钟内有效</p>'
	}
	let mailOptions = {
		from: '2274748854@qq.com', // 发件人地址
		to: email, // 收件人地址，多个收件人可以使用逗号分隔
		subject: emails.title, // 邮件标题
		html: emails.htmlBody // 邮件内容
	};
	
	send(mailOptions)

	return emailCode
}