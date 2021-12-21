const Router = require('koa-router')
const msgRouter = new Router()

const msg_controller = require('../controller/message.js')

msgRouter.post('/msg/getMsg', msg_controller.getMsg)
msgRouter.post('/msg/msglist', msg_controller.addMsgItem)
msgRouter.get('/msg/msglist', msg_controller.getMsgList)

module.exports = msgRouter