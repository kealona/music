const db = require('../mysql.js')

/**
 * 添加音乐
 */
let add_music = async (obj) => {
	let sql = 'insert into song (title, singer, time, lyric, song) values (?, ?, ?, ?, ?)'
	let rs = await db.q(sql, Object.values(obj))
}

/**
 * 搜索单曲，视频，用户
 */
const searchAll = async (keyword) => {
	keyword = '%'+keyword+'%'
	let result = []
	let sql = 'select * from song where title like ?'
	let rs = await db.q(sql, keyword)
	result.push(rs)
	sql = 'select * from singer where singer_name like ?'
	rs = await db.q(sql, keyword)
	console.log(rs)
	result.push(rs)
	sql = 'select * from mv where mv_name like ?'
	rs = await db.q(sql, keyword)
	result.push(rs)
	sql = 'select * from user where username like ?'
	rs = await db.q(sql, keyword)
	result.push(rs)
	return result
}

module.exports = {
	add_music,
	searchAll
}