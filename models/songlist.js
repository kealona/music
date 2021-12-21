const db = require('../mysql.js')

/**
 * 获取我喜欢的歌单
 */
const querySonglist = async (user_id) => {
	let sql = 'select songlist_id from like_songlist where user_id = ?'
	let params = [user_id]
	let rs = await db.q(sql, params)
	let songlist_id = rs[0].songlist_id

	let sql2 = 'select * from song_list where id = ?'
	let params2 = [songlist_id]
	let rs2 = await db.q(sql2, params2)
	rs2[0].songlist_id = songlist_id
	return rs2
}

/**
 * 获取歌单
 */
const getSonglistById = async (songlist_id) => {
	let sql = 'select * from list where list_id = ?'
	let params = [songlist_id]
	let rs = await db.q(sql, params)
	let result = []
	for(let i=0;i<rs.length;i++) {
		sql = 'select * from song where id=?'
		params = [rs[i].song_id]
		let rs1 = await db.q(sql, params)
		result.push(rs1[0])
	}
	return result
}

module.exports = {
	querySonglist,
	getSonglistById
}