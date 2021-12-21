const Router = require('koa-router')
const koaParty = require('koa2-multiparty')
let musicRouter = new Router()

const music_controller = require('../controller/music.js')

musicRouter.post('/music/add-music', koaParty(), music_controller.add_music)
musicRouter.post('/music/get-music', music_controller.get_music)
musicRouter.get('/music/search', music_controller.searchAll)

module.exports = musicRouter