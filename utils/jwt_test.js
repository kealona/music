const jwtUtil = require('./jwtUtil')

let token = jwtUtil.getToken({username: '测试用户'})

console.log(token)

let rs = jwtUtil.verify(token)
console.log(rs)

setTimeout(() => {
	let rs = jwtUtil.verify(token)
	console.log(rs)
}, 5000)