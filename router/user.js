const Router = require('koa-router')
const koaParty = require('koa2-multiparty')
let userRouter = new Router()

const user_controller = require('../controller/user.js')

//userRouter.get('/user/login', user_controller.login)
userRouter.post('/user/register', user_controller.register)
userRouter.post('/user/loginout', user_controller.loginout)
userRouter.post('/user/verify', user_controller.verify)
userRouter.post('/user/update', user_controller.update)
userRouter.post('/user/uploadHead', koaParty(), user_controller.uploadImg)
userRouter.post('/user/get-col-album', user_controller.get_col_album)
userRouter.post('/user/get-col-singer', user_controller.get_col_singer)
userRouter.post('/user/get-msg-userid', user_controller.get_msg_userid)
userRouter.post('/user/get-msg-senderid', user_controller.get_msg_senderid)
userRouter.get('/user/getAllUser', user_controller.getAllUser)
userRouter.get('/user/code', user_controller.getEmailCode)
userRouter.get('/user/checkCode', user_controller.checkEmailCode)
userRouter.post('/user/follow', user_controller.follow)
userRouter.get('/user/follow', user_controller.getFollow)

module.exports = userRouter