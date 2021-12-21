const userModels = require('../models/user.js')
const jwt = require('../utils/jwtUtil.js')
const md5 = require('md5')
const CryptoJS = require('../utils/cbs.js')
const fs = require('fs')
const path = require('path')
const mailer = require('../utils/mailer.js')
const smsCode = require('../utils/code.js')

/**
 * 注册用户
 */
const register = async ctx => {
	let {
		email,
		username,
		password,
		date
	} = ctx.request.body

	passoword = CryptoJS.decrypt(password)

	let status = userModels.addUser(email, username, password, date)

	ctx.body = {
		data: '用户注册成功'
	}
}

/**
 * 登录
 */
const login = async ctx => {
	let {
		id,
		password
	} = ctx.query
	
	//由于前端进行了加密，后端先用CBS模式的解密，然后再对密码进行md5加密放入数据库
	/* password = md5(CryptoJS.decrypt(password)) */

	//向数据库获取信息返回给前端
	let status = await userModels.findUser(id, password)
	return status
}

const loginout = async ctx => {
	//注销登录，删除token

}

/**
 * 验证token是否过期
 */
const verify = async ctx => {
	//解析token是否过期
	const auth = ctx.get("Authorization");
	const token = auth.split(' ')[1];

	if (jwt.verify(token) != null) {
		ctx.body = {
			code: 1,
			message: '允许访问'
		}
	} else {
		ctx.body = {
			code: 0,
			message: 'session已过期，请重新登录'
		}
	}

}

/**
 * 修改个人信息
 */
const update = async ctx => {
	let {email, username, brief, sex, birth, region} = ctx.request.body
	
	let status = await userModels.ChangeUser(email, username, brief, sex, birth, region)
	console.log(status)
	
	if (status == 0) {
		ctx.body = {
			code: 0,
			msg: '修改失败'
		}
	} else {
		ctx.body = {
			code: 1,
			msg: '用户信息修改成功!',
			data: {
				user: status
			}
		}
	}
}

/**
 * 修改头像
 */
const uploadImg = async ctx => {
	//1.获取ctx中的文件
	let file = ctx.req.files.head_file
	let {email, name} = ctx.req.body
	//2.把图片下载到本地中
	let filePath = file.path
	const fileReader = fs.createReadStream(filePath)
	let fileDir = path.resolve(__dirname,'..') + '\\public\\headImg'
	const _path = `${fileDir}\\${name}`
	const fw = fs.createWriteStream(_path)
	fileReader.pipe(fw)

	//3.返回ctx.body  这里我用用户名称作为唯一的id，所以数据库保存路径不变
	ctx.body = {
		code: 1,
		message: '修改头像成功',
		data: 'http://localhost:8888/headImg/'+name
	}
}

/**
 * 获取收藏的专辑
 */
const get_col_album = async ctx => {
	console.log('获取收藏的专辑')
	ctx.body = {
		code: 1,
		message: '获取收藏专辑成功'
	}
}

/**
 * 获取收藏的歌手
 */
const get_col_singer = async ctx => {
	console.log('获取收藏的歌手')
	ctx.body = {
		code: 1,
		message: '获取关注歌手成功'
	}
}

/**
 * 获取消息列表
 */
const get_msg_userid = async ctx => {
	
	ctx.body = {
		code: 1,
		message: '获取消息成功',
		data: [{
			head_img: '1.jpg',
			username: 'Monster',
			userid: 6,
			senderid: 5,
			msg: '发送一条消息过来了',
			create_time: '2021-06-10 15:41'
		}]
	}
}

/**
 * 获取私信接收者的个人信息
 */
const get_msg_senderid = async ctx => {
	
	let { friendId } = ctx.request.body
	
	let result = await userModels.getUserBaseInfo(friendId)
	
	ctx.body = {
		code: 1,
		message: '操作成功',
		data: result,
		socketid: jwt.getToken({
			id: friendId
		})
	}
}

const getAllUser = async ctx => {
	let status = await userModels.getAllUser()
	
	ctx.body = {
		code: 200,
		msg: '获取用户列表成功',
		data: {
			status
		}
	}
}

/**
 * 获取邮箱验证码
 */
const getEmailCode = async ctx => {
	let { email } = ctx.request.query
	let code = mailer(email)
	code = smsCode.getCode(email)
	ctx.body = {
		code: 200,
		msg: '操作成功',
		data: null
	}
}

/**
 * 验证验证码是否正确
 */
const checkEmailCode = async ctx => {
	let { code, email } = ctx.request.query
	if(smsCode.verifyCode(email, code)) {
		ctx.body = {
			code: 200,
			msg: '操作成功',
			data: null
		}
	} else {
		ctx.body = {
			code: 500,
			msg: '验证码错误',
			data: null
		}
	}
}

/**
 * 关注陌生人
 */
const follow = async ctx => {
	let userId = jwt.getUserId(ctx.headers.token).userId
	let { id } = ctx.request.body
	let result = await userModels.followUser(userId, id)
	ctx.body = {
		code: 200,
		message: '操作成功',
		data: ''
	}
}

/**
 * 获取关注
 * type: ALL 获取好友 FOLLOW 获取关注 FANS 获取粉丝
 */
const getFollow = async ctx => {
	let userId = jwt.getUserId(ctx.headers.token).userId
	let { type } = ctx.query
	let result 
	if(!type || type == 'ALL') {
		result = await userModels.getFriends(userId)
	} else if(type == 'FOLLOW') {
		result = await userModels.getFollow(userId)
	} else {
		result = await userModels.getFans(userId)
	}
	
	ctx.body = {
		code: 200,
		message: '操作成功',
		data: result
	}
}

//获取所有关系
const getAllRelationship = async userid => {
	let result = await userModels.getAllrelationship(userid)
	return result
}

module.exports = {
	login,
	register,
	loginout,
	verify,
	update,
	uploadImg,
	get_col_album,
	get_col_singer,
	get_msg_senderid,
	get_msg_userid,
	getAllUser,
	getEmailCode,
	checkEmailCode,
	follow,
	getFollow,
	getAllRelationship
}
