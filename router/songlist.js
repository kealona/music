const Router = require('koa-router')
let songlistRouter = new Router()

const songlist_controller = require('../controller/songlist.js')

songlistRouter.post('/songlist/querySonglist', songlist_controller.querySonglist)
songlistRouter.get('/songlist/getSonglist', songlist_controller.getSong)

module.exports = songlistRouter