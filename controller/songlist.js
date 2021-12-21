const songlistModels = require('../models/songlist.js')

/**
 * 获取我喜欢的音乐歌单
 */
const querySonglist = async ctx => {
	let {userId, songlistId} = ctx.request.body
	
	//数据库查找数据
	let rs = await songlistModels.querySonglist(userId)

	//返回给前端
	ctx.body = {
		code: 1,
		msg: '获取歌单成功',
		data: rs
	}
	
}

/**
 * 根据歌曲Id获取某首歌曲
 */
const getSong = async ctx => {
	let {songlist_id} = ctx.query
	
	let rs = await songlistModels.getSonglistById(songlist_id)

	ctx.body = {
		code: 1,
		msg: '获取歌单表成功',
		data: rs
	}
}

module.exports = {
	querySonglist,
	getSong
}