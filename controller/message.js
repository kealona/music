const msgModule = require('../models/message.js')
const jwt = require('../utils/jwtUtil.js')

const getMsg = async ctx => {
	console.log('获取私信')
}

//用户向消息列表中添加一条记录
const addMsgItem = async ctx => {
	let { friendid, createTime } = ctx.request.body
	let userId = jwt.getUserId(ctx.headers.token).userId
	let result = await msgModule.addMsgItem(userId, createTime, friendid)

	ctx.body = {
		code: 200,
		message: '操作成功',
		data: result
	}
}

//获取消息列表
const getMsgList = async ctx => {
	let userId = jwt.getUserId(ctx.headers.token).userId
	let result = await msgModule.getMsgList(userId)
	
	ctx.body = {
		code: 200,
		message: '操作成功',
		data: result
	}
}

module.exports = {
	getMsg,
	addMsgItem,
	getMsgList
}