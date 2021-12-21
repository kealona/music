const LOCALURL = "http://localhost:8888/"
const URL = {
    loginUser: LOCALURL+'user/login',
    registerUser : LOCALURL+'user/register',
    verify: LOCALURL+'user/verify',
    updateUser: LOCALURL+'user/update',

    addMusic: LOCALURL+'music/add-music',
    getMusic: LOCALURL+'music/get-music',
    getStaticMusic: LOCALURL+'file',
    getStaticLyric: LOCALURL+'lyric',

    uploadHeadImg: LOCALURL+'user/uploadHead',

    getSongList:LOCALURL+'songlist/querySonglist',

    getSong: LOCALURL+'songlist/getSonglist',

    getMvList: LOCALURL+'mv/getMvList',
    getMvInfo: LOCALURL+'mv/getMvInfo',

    getSearchInfo: LOCALURL+'music/search',

    getColAlbum: LOCALURL+'user/get-col-album',
    getColSinger: LOCALURL+'user/get-col-singer',

    getMsgByUserId: LOCALURL+'user/get-msg-userid',
    getMsgBySenderId: LOCALURL+'user/get-msg-senderid',

    getCode: LOCALURL + 'user/code',
    checkCode: LOCALURL + 'user/checkCode',
    
    follow: LOCALURL + 'user/follow'
}

module.exports = URL
