const Module = require('../models/manager.js')
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
		console.log('Message send: %s', info.messageId);
	});
}

function randomCode() {
	let max = 9
	let min = 1
	return Math.random() * (max - min + 1) + min | 0
}

const getAllManager = async ctx => {
	let res = await Module.getAllManager()

	ctx.body = {
		code: 1,
		message: '获取管理员信息成功',
		data: res
	}

}

const getAllAuth = async ctx => {
	let res = await Module.getAllRole()

	ctx.body = {
		code: 1,
		message: '获取所有权限成功',
		data: res
	}
}

const addManager = async ctx => {
	let {
		nickname,
		account,
		password,
		grade,
		email
	} = ctx.request.body

	let date = new Date()
	let time = date.toLocaleDateString();

	let res = await Module.add_manager(account, nickname, password, grade, time, email)


	ctx.body = {
		code: 1,
		message: '添加管理员成功'
	}
}

const loginManager = async ctx => {
	let {
		account,
		password
	} = ctx.request.body

	let res = await Module.login_manager(account, password)

	ctx.body = {
		code: 1,
		message: '管理员登录成功',
		data: res
	}
}

const updateManager = async ctx => {
	let {
		nickname,
		account,
		password,
		grade,
		email
	} = ctx.request.body

	let res = await Module.change_manager(account, nickname, password, grade, email)

	ctx.body = {
		code: 1,
		message: '修改管理员信息成功',
		data: res

	}
}

const getCode = async ctx => {
	let {
		email
	} = ctx.request.body

	let emailCode = ''
		for(let i=0;i<6;i++) {
			emailCode+=randomCode()
		}
	let emails = {
		title: '欢迎使用网易云音乐',
		htmlBody: '<h1>欢迎使用网易云音乐!</h1><p style="font-size: 18px;color:#000;">验证码为：<u style="font-size: 16px;color:#1890ff;">' +
			emailCode + '</u></p><p style="font-size: 14px;color:#666;">5分钟内有效</p>'
	}
	let mailOptions = {
		from: '2274748854@qq.com', // 发件人地址
		to: email, // 收件人地址，多个收件人可以使用逗号分隔
		subject: emails.title, // 邮件标题
		html: emails.htmlBody // 邮件内容
	};
	
	send(mailOptions)


	ctx.body = {
		code: emailCode,
		message: '修改密码成功',
	}
}

const updatePassword = async ctx => {
	let {account, password} = ctx.request.body
	
	let res = await Module.updatePassword(account, password)
	ctx.body = {
		code: 1,
		message: '修改密码成功'
	}
}

module.exports = {
	getAllManager,
	getAllAuth,
	addManager,
	loginManager,
	updateManager,
	getCode,
	updatePassword
}
