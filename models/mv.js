const db = require('../mysql.js')

const getMvList = async () => {
	let sql = 'select * from mv'
	let params = []
	let rs = await db.q(sql, params)
	return rs
}

const getMvInfo = async (id) => {
	let sql = 'select * from mv where id = ?'
	let params = [id]
	let rs1 = await db.q(sql, params)
	let singer_id = rs1[0].singer_id
	sql = 'select head_url from singer where id = ?'
	params = [singer_id]
	let rs2 = await db.q(sql, params)
	console.log(rs2)
	rs1[0].head_url = rs2[0].head_url
	return rs1
}

module.exports = {
	getMvList,
	getMvInfo
}