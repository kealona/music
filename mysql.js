const mysql = require('mysql')

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'music'
})

var db = {}

db.q = function(sql, params) {
	return new Promise((resolve, reject) => {
		//取出连接
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
				return;
			}
			connection.query(sql, params, function(err, res, fileds) {
				connection.release()
				if (err) {
					reject(err)
					return;
				}
				resolve(res)
			})
		})
	}).catch((e) => {
		console.log('数据库报错');
		console.log(e)
	})
}

module.exports = db
