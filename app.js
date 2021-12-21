const Koa = require('koa')
const bodyParser = require("koa-bodyparser");
const Router = require('koa-router')
const render = require('koa-art-template')
const Static = require('koa-static')
const session = require('koa-session')
const cors = require('koa2-cors')
const path = require('path')
const IO = require('koa-socket')
const koaBody = require('koa-body')
const koaParty = require('koa2-multiparty')
const jwt = require('./utils/jwtUtil.js')
const server = require('koa-static-server')

const app = new Koa()
const io = new IO()
const router = new Router()
const userR = require('./router/user.js')
const musicR = require('./router/music.js')
const songlistR = require('./router/songlist.js')
const mvR = require('./router/mv.js')
const msgR = require('./router/messgae.js')
const managerR = require('./router/manager.js')

const user_controller = require('./controller/user.js')

const fs = require('fs')

global.mySessionStore = {}

//根据socketid解析出用户
const getIdBySocket = function(socketid) {
	for (let key in global.mySessionStore) {
		if (socketid == global.mySessionStore[key].id) {
			return global.mySessionStore[key]
		}
	}
}

//用户访问的时候进行拦截，部分界面如果没有登录不可以进行访问...
//虽然前端已经进行拦截了，但是确保安全性，后端我也进行二次判断

//应用层和传输层关联
io.attach(app)


io.on('connection', (socket) => {
	io.broadcast('msg', '服务器连接成功')
})

io.on('login', async (ctx) => {
	let {
		id,
		nickname,
		userid
	} = ctx.data

	let mySocketid = ctx.socket.socket.id

	mySessionStore[id] = {
		id: mySocketid,
		userid: userid,
		nickname: nickname
	}

	//更新
	let socketUser = getIdBySocket(ctx.socket.socket.id)
	let relationship = await user_controller.getAllRelationship(socketUser.userid)
	relationship = JSON.parse(JSON.stringify(relationship))
	let friendlist = []
	for (let item of relationship) {
		for (let key in global.mySessionStore) {
			if (global.mySessionStore[key].userid == item.id) {
				friendlist.push(global.mySessionStore[key])
			}
		}
	}
	
	for(let item of friendlist) {
		app._io.to(item.id).emit('oneOnline')
	}

	app._io.to(ctx.socket.socket.id).emit('sendFriends', friendlist)


})

io.on('online', async ctx => {
	let socketUser = getIdBySocket(ctx.socket.socket.id)
	let relationship = await user_controller.getAllRelationship(socketUser.userid)
	relationship = JSON.parse(JSON.stringify(relationship))
	let friendlist = []
	for (let item of relationship) {
		for (let key in global.mySessionStore) {
			if (global.mySessionStore[key].userid == item.id) {
				friendlist.push(global.mySessionStore[key])
			}
		}
	}
	app._io.to(ctx.socket.socket.id).emit('sendFriends', friendlist)
})

//接收到私聊消息
io.on('privateMsg', (ctx) => {
	let friend_id = getIdBySocket(ctx.socket.socket.id)
	app._io.to(ctx.data.receiver).emit('receiveMessage', ctx.data)
	/* io.to() */
})

app.keys = ['some secret hurr'];
//在服务器内存中存储session_id:用户数据
let store = {
	myStore: {},
	get: function(key) {
		return this.myStore[key]
	},
	set: function(key, session) {
		this.myStore[key] = session
	},
	destroy: function() {
		delete this.myStore[key]
	}
}

router.get('/user/login', async (ctx) => {
	let {
		username
	} = ctx.query

	//生成时间戳将时间戳响应给客户端（类似cookie）
	let id = Date.now()

	//保存到自己的SessionStore中
	global.mySessionStore[id] = ''

	let status = await user_controller.login(ctx)

	status = JSON.parse(JSON.stringify(status))[0]

	const userId = status.id + ''

	if (status == 0) {
		ctx.body = {
			code: 0,
			msg: '用户不存在或密码错误'
		}
	} else {
		ctx.body = {
			code: 1,
			msg: '用户登录成功!',
			data: {
				user: status,
				socketid: jwt.getToken({
					userId
				}),
				token: jwt.getToken({
					userId
				})
			}
		}
	}

})


app.use(koaBody({
	multiparty: true,
	ecoding: 'gzip',
	formdable: {
		maxFiledsSize: 20 * 1024 * 1024
	},
	keepExtensions: true
}))

const filePath = 'D:\\Projects\\Monitor\\images01'
//监听文件夹变化
fs.watch(filePath, (event, filename) => {
	if (filename) {
		console.log(`${filename}文件发生更新`)
	}
	io.broadcast('getPic', `${filename}`)
})

app.use(cors())
//处理静态资源
app.use(Static(path.resolve('./public')))
app.use(Static('D:\\Projects\\Monitor\\images01'))
app.use(session({
	store: store
}, app))
app.use(bodyParser())
app.use(router.routes())
app.use(userR.routes())
app.use(musicR.routes())
app.use(songlistR.routes())
app.use(mvR.routes())
app.use(msgR.routes())
app.use(managerR.routes())
app.use(userR.allowedMethods())

app.on('error', async (err, ctx) => {
	console.log(err)
})

app.listen(8888, () => {
	console.log('服务器开启在端口8888')
})
