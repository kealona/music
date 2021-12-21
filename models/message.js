const db = require('../mysql.js')

const getMsg = async (id) => {

}

//获取消息列表
const getMsgList = async userid => {
	let sql =
		'SELECT username, t.friend_id, t.id, t.create_time FROM ( SELECT * FROM `msg_list` WHERE parent_id = ( SELECT msg_id FROM `users` WHERE `users`.id = ? ) ) t, `users` WHERE t.friend_id = `users`.id;'
	let params = [userid]
	let rs = await db.q(sql, params)
	return rs
}

//用户添加一条消息列表
const addMsgItem = async (userid, createTime, friendid) => {
	//先查询消息列表所有信息，看create有无重复，如果重复，则刷新create_Time
	let msglist = await getMsgList(userid)
	let flag = true
	for (let item of msglist) {
		if (item.friend_id == friendid) {
			//值重复
			flag = false
		}
	}
	let rs
	if (flag) {
		let sql =
			'insert into `msg_list` (parent_id, create_time, friend_id) values((select msg_id from `users` where id=?), ?, ?)'
		let params = [userid, createTime, friendid]
		rs = await db.q(sql, params)
	}
	return rs
}

//注册用户的时候，用户添加消息列表
const addFirstMsg = async () => {
	let sql = 'insert into `msg_list` (parent_id) values (?)'
	let params = [0]
	await db.q(sql, params)
	let sql2 = 'SELECT max(id) from `msg_list`'
	let rs = await db.q(sql2)
	return rs[0]
}

module.exports = {
	getMsg,
	getMsgList,
	addMsgItem,
	addFirstMsg
}
