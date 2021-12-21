const musicModule = require('../models/music.js')
const fs = require('fs')
const path = require('path')

const add_music = async ctx => {
	
	let file = ctx.req.files.audio
	let lyric = ctx.req.files.lyric
	let {title, singer, time, name} = ctx.req.body
	
	let filePath = file.path
	let lyricPath = lyric.path
	
	//将传输过来的文件下载到后端的文件夹(\public\file)中
	const fileReader = fs.createReadStream(filePath)
	let fileDir = path.resolve(__dirname,'..') + '\\public\\file'
	const _path = `${fileDir}\\${title}`
	const fw = fs.createWriteStream(_path)
	fileReader.pipe(fw)
	
	//歌词文件下载到后端文件夹中
	const fileReader2 = fs.createReadStream(lyricPath)
	let lyricDir = path.resolve(__dirname,'..') + '\\public\\lyric'
	const _path_lyric = `${lyricDir}\\${name}`
	console.log(_path_lyric)
	const fw_lyric = fs.createWriteStream(_path_lyric)
	fileReader2.pipe(fw_lyric)
	
	let saveSingObj = {title, singer, time}
	
	saveSingObj.lyric = ''
	if(lyric) {
		saveSingObj.lyric = path.parse( fileDir + lyric.path).base
	}
	if(!file) {
		ctx.throw('歌曲必须上传')
		return ;
	} 
	saveSingObj.file = path.parse( fileDir + file.path).base
	//3.插入数据到数据库
	//let result = await musicModule.add_music(saveSingObj)
	//4.响应结果给用户*/
	ctx.body = {
		code: 1,
		msg: '添加音乐成功！'
	}
}

const get_music = async ctx => {
	let fileDir = path.resolve(__dirname,'..') + '\\public\\file\\我上传的歌曲.mp4'
	let lyricDir = path.resolve(__dirname,'..') + '\\public\\lyric\\我的歌词名称.lrc'
	const file_reader = fs.createReadStream(fileDir)
	const lyric_reader = fs.createReadStream(lyricDir)
}

const searchAll = async ctx => {
	let keyword = ctx.query.keyword
	
	let result = await musicModule.searchAll(keyword);
	
	ctx.body = {
		code: 1,
		message: '搜索成功',
		data: result
	}
}


module.exports = {
	add_music,
	get_music,
	searchAll
}