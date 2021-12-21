const Router = require('koa-router')
const managerRouter = new Router()

const manager_controller = require('../controller/manager.js')

managerRouter.get('/manager/getAllManager', manager_controller.getAllManager)
managerRouter.get('/manager/getAllAuth', manager_controller.getAllAuth)
managerRouter.post('/manager/addManager', manager_controller.addManager)
managerRouter.post('/manager/login', manager_controller.loginManager)
managerRouter.post('/manager/updateManager', manager_controller.updateManager)
managerRouter.post('/manager/getCode', manager_controller.getCode)
managerRouter.post('/manager/updatePassword', manager_controller.updatePassword)

module.exports = managerRouter