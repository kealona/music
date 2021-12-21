const mvModule = require('../models/mv.js')

const get_MvList = async ctx => {
	let status = await mvModule.getMvList()
	ctx.body = {
		code: 1,
		message: '获取MV成功',
		data: status
	}
}

const get_mvInfo = async ctx => {
	let {id} = ctx.query
	let status = await mvModule.getMvInfo(id)
	console.log(status)
	ctx.body = {
		code: 1,
		message: '获取MV信息成功',
		data: status
	}
}

module.exports = {
	get_MvList,
	get_mvInfo
}