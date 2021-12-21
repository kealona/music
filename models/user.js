const db = require('../mysql.js')

const msgListModels = require('./message.js')

/**
 * 用户登录
 * @param {Object} username 用户名
 * @param {Object} password 密码
 */
let findUser = async function (username, password) {
	let sql = 'select * from users where username = ? and password = ?'
	let rs = await db.q(sql, [username, password])

	if(rs.length == 0) {
		console.log('密码错误')
		return 0
	} else {
		//用户的粉丝，关注，动态数量
		rs = await findUserFriendsNumber(rs)
		return rs
	}
}

/**
 * 查询好友的好友，粉丝，动态数量
 * @param {Object} userdata 用户数据
 */
const findUserFriendsNumber = async function(userdata) {
	userdata = JSON.parse(JSON.stringify(userdata))
	let follow = await getFollow(userdata[0].id)
	let fans = await getFans(userdata[0].id)
	userdata[0].follow = follow.length
	userdata[0].fans = fans.length
	userdata[0].dynamic = 0
	return userdata
}

/**
 * 用户注册
 * @param {Object} email 用户邮箱
 * @param {Object} username 用户名
 * @param {Object} password 密码
 * @param {Object} date 创建日期
 */
let addUser = async function (email, username, password, date) {
	//先给用户注册一条消息列表，然后拿取id
	let msg_id = await msgListModels.addFirstMsg()
	let id = msg_id['max(id)']
	let sql = 'insert into users(email, username, password, create_time, vip, grade, integral, role, msg_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)'
	let params =  [email, username, password, date, 0, 1, 0, 0, id]
	let rs = await db.q(sql, params)
}

/**
 * 修改用户的个人信息
 * @param {Object} email 用户邮箱 ——指定用户
 * @param {Object} username 用户名
 * @param {Object} brief 用户简介
 * @param {Object} sex 性别
 * @param {Object} birth 生日
 * @param {Object} region 地区
 */
let ChangeUser = async function (email, username, brief, sex, birth, region) {
	let sql = 'update users set username=?,brief_intro=?, sex=?,birth=?,region=? where email=?'
	let params = [username, brief, sex, birth, region, email]
	let rs = await db.q(sql, params)
}

/**
 * 用户修改头像
 * @param {Object} email 用户id
 * @param {Object} imgUrl 用户的头像路径
 */
let uploadHeadImg = async function (email, imgUrl) {
	let sql = 'update users set head_img = ? where email = ?'
	let params = [imgUrl, email]
	let rs = await db.q(sql, params)
}

/**
 * 获取用户收藏专辑
 */
let getColAlbum = async (id) => {
	let sql = 'select * from col_album where user_id = ?'
	let params = [id]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 获取用户关注的歌手
 */
let getColSinger = async (id) => {
	let sql = 'select * from col_singer where user_id = ?'
	let params = [id]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 获取所有的用户
 */
let getAllUser = async () => {
	let sql = 'select * from users'
	let rs = db.q(sql, [])
	return rs
}

/**
 * 关注陌生人
 */
const followUser = async (userId, friendId) => {
	let sql = 'insert into follow_relationship values(?, ?)'
	const params = [userId, friendId]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 查询某用户的关注
 */
const getFollow = async (userId) => {
	let sql = 'SELECT users.id, users.username FROM `users` WHERE users.id in ( SELECT follow_id FROM `follow_relationship` WHERE follow_relationship.user_id=?)'
	const params = [userId]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 查询某用户的粉丝
 */
const getFans = async (userId) => {
	let sql = "SELECT users.id, users.username, (SELECT COUNT(*) FROM `follow_relationship` a, `follow_relationship` b WHERE a.user_id=b.follow_id and a.follow_id=b.user_id and a.user_id=?) as 'state' FROM `users` WHERE users.id in ( SELECT follow_relationship.user_id FROM `follow_relationship` WHERE follow_relationship.follow_id=?)"
	const params = [userId, userId]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 获取用户的基本信息
 */
const getUserBaseInfo = async (userId) => {
	let sql = 'select username from users where id=?'
	let params = [userId]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 获取用户的好友列表
 */
const getFriends = async (userId) => {
	let sql = 'SELECT users.id, users.username FROM `users` WHERE users.id in(SELECT a.follow_id from `follow_relationship` a,`follow_relationship`  b, `users` where a.user_id=b.follow_id and a.follow_id=b.user_id and a.user_id=users.id and users.id=8)'
	const params = [userId]
	let rs = await db.q(sql, params)
	return rs
}

/**
 * 获取关注和粉丝，所有人
 */
const getAllrelationship = async (userId) => {
	let sql = 'SELECT users.id FROM `users` WHERE users.id in ( SELECT follow_relationship.user_id FROM `follow_relationship` WHERE follow_relationship.follow_id=?) union SELECT users.id FROM `users` WHERE users.id in ( SELECT follow_id FROM `follow_relationship` WHERE follow_relationship.user_id=?)'
	const params = [userId, userId]
	let rs = await db.q(sql, params)
	return rs
}

module.exports = {
	findUser,
	addUser,
	ChangeUser,
	uploadHeadImg,
	getColAlbum,
	getColSinger,
	getAllUser,
	followUser,
	getFollow,
	getFans,
	getFriends,
	getUserBaseInfo,
	getAllrelationship
}