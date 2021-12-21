const db = require('../mysql.js')

/**
 * 获取所有图片
 */
const getAllImg = async () => {
	let sql = 'select * from image'
	let res = await db.q(sql, [])
	 return res
}

/**
 * 根据id删除某张图片
 */
const deleteImg = async (id) => {
	let sql = 'delete from image where id = ?'
	let params = [id]
	db.q(sql, params)
}

module.exports = {
	getAllImg,
	deleteImg
}