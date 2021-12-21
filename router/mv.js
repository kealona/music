const Router = require('koa-router')
let mvRouter = new Router()

const mv_controller = require('../controller/mv.js')

mvRouter.get('/mv/getMvList', mv_controller.get_MvList)
mvRouter.get('/mv/getMvInfo', mv_controller.get_mvInfo)

module.exports = mvRouter