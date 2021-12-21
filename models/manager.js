const db = require('../mysql.js')

/**
 * 获取所有管理员
 */
const getAllManager = async () => {
	let sql = "select * from manager a, role b where a.grade = b.role"
	let rs = await db.q(sql, [])
	return rs
}

/**
 * 获取所有角色权限及其描述 管理范围
 */
const getAllRole = async () => {
	let sql = "select * from role"
	let rs = await db.q(sql, [])
	return rs
}

/**  
 * 改变管理员等级名称
 */
const change_role_name = async (id, name) => {
	let sql = "update role set name = ? where id = ?"
	let params = [name, id]
	let res = await db.q(sql, params)
}

/**
 * 改变管理员的权限范围
 */
const change_auth = async (id, music, mv, recommend, user, auth) => {
	let sql = "update auth set music = ?, mv = ?, recommend = ?, user = ?, auth = ? where id = ?"
	let params = [music, mv, recommend, user, auth, id]
	db.q(sql, params)
}

/**
 * 修改管理员的信息
 */
const change_manager = async (account, nickname, password, grade, email) => {
	let sql = 'update manager set nickname = ?, password = ?, grade = ?, email = ? where account = ?'
	let params = [nickname, password, grade, email, account]
	db.q(sql, params)
}

/**
 * 根据id删除管理员
 */
const delete_manager = async (id) => {
	let sql = "delete from manager where id = ?"
	db.q(sql, [id])
}

/**
 * 管理员登录
 */
const login_manager = async (account, password) => {
	let sql = 'select * from manager where account = ? and password = ?'
	let params = [account, password]
	let rs = await db.q(sql, params)
	
	if(rs.length == 0) {
		console.log('管理员登录失败')
		return 0
	} else {
		return rs
	}
}

/**
 * 添加管理员
 */
const add_manager = async (account, nickname, password, grade, time, email) => {
	let sql = 'insert into manager(account, nickname, password, grade ,create_time, email) values(?, ?, ?, ?, ?, ?)'
	let params =  [account, nickname, password, grade, time, email]
	let rs = await db.q(sql, params)
}

/**
 * 修改密码
 */
const updatePassword = async (account, password) => {
	let sql = 'update manager set password = ? where account = ?'
	let params = [password, account]
	let rs = await db.q(sql,params)
}

module.exports = {
	getAllManager,
	getAllRole,
	change_auth,
	change_role_name,
	change_manager,
	delete_manager,
	login_manager,
	add_manager,
	updatePassword
}
