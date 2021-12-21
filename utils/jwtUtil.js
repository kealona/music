const jwt = require('jsonwebtoken')
//提供两个接口 
//1.获取一个token 
//2.验证一个token

const SIGN_KEY = '$rege#^tj$*#(*$hisw)'

class JwtUtil {
	getToken (userdata) {
		return jwt.sign(userdata, SIGN_KEY, {expiresIn: '2d'})
	}
	verify (token) {
		return jwt.verify(token, SIGN_KEY)
	}
	getUserId(token) {
		return jwt.decode(token, SIGN_KEY)
	}
}

module.exports = new JwtUtil()