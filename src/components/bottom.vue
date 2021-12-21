<template>
  <div class="el-header1">
    <div>
      <el-row :gutter="40">
        <el-col :span="1">
          <el-tooltip class="item" effect="dark" content="点击展开音乐详情页" placement="bottom-start">
            <img id="cover" :src="currentSong.cover_url" @click="show_song = !show_song" />
          </el-tooltip>
        </el-col>
        <el-col :span="2" style="padding-top: 0px;">
          <span class="sing_com" style="margin-top: 12px;position: absolute;left: 80px;">
            {{currentSong.cur_song.title}}
            <i class="iconfont el-icon-msaixin" style="color: #ec4141;margin-left: 5px;"></i>
          </span>
          <span class="sing_com"
            style="font-size: 14px;position: absolute;top: 70%;left: 80px">{{currentSong.cur_song.singer}}</span>
        </el-col>
        <el-col :span="10" :offset="6">
          <audio id="myaudio" ref='audio' :noCacheSrc="currentSong.src" @pause="onPause" @play='onplay'
            @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata" @error="onError"
            @ended="handlePlayEnded"></audio>
          <div class="progressHead">
            <el-tooltip class="item" effect="dark" content="循环播放" placement="bottom-start">
              <i class="el-icon-refresh"></i>
            </el-tooltip>
            <i class="iconfont el-icon-msshangyishou" @click="current--" style="font-size: 20px;"></i>
            <i class="iconfont el-icon-msplay playBtn" v-show="audio.playing" @click="clickPlay"></i>
            <i class="iconfont el-icon-msplay1 playBtn" v-show="!audio.playing" @click="clickPlay"></i>
            <i class="iconfont el-icon-msxiayishou" @click="current++" style="font-size: 20px;"></i>
            <i class="el-icon-tickets"></i>
          </div>
          <div class="progressBar">
            <span id="time_left">{{audio.currentTime | formartSecond}}</span>
            <!-- <el-progress :percentage="50" color="#ec4141" :show-text="false" :stroke-width="3"></el-progress> -->
            <!-- <el-slider v-model="progress" :show-tooltip="false"></el-slider> -->
            <el-slider color="#ec4141" v-model="sliderTime" @change="changeCurrentTime" class="slider"
              :show-tooltip="false"></el-slider>
            <span id="time_right">{{audio.maxTime | formartSecond}}</span>
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <a class="quality">极高</a>
          <!-- <i class="iconfont el-icon-msyinliang"></i> -->
          <!-- <el-progress :percentage="50" color="#ec4141" :show-text="false" width="20"></el-progress> -->
          <!-- <i class="el-icon-s-fold"></i> -->
        </el-col>
      </el-row>
    </div>
    <div>
      <transition name="el-zoom-in-bottom">
        <div v-show="show_song" class="transition-box">
          <div class="song_head">
            <div class="song_left">
              <img id="needle" class="play-needle pause-needle" src="../assets/play/play_needle.png" />

              <div class="disk-bg"></div>
              <div class="disk-cover disk-cover-animation">
                <img class="album" :src="currentSong.cover_url"
                  onerror="../assets/play/placeholder_disk_play_song.png" />
                <img class="disk-border" src="../assets/play/play_disc.png" />
              </div>
            </div>
            <div class="song_right">
              <p class="songName">{{currentSong.cur_song.title}}</p>
              <p class="singerName">{{currentSong.cur_song.singer}} - {{currentSong.cur_song.album}}</p>
              <div v-if="nolyric">暂时没有歌词噢</div>
              <div v-else id="outer_lyric">
                <div style="height: 400px;">
                  <div id="lyric_div">
                    <ul class="lyric_container" ref="lyric_container"
                      style="padding-left: 0;padding-top: 50px;margin: 0;list-style: none;text-align: center;">
                      <li v-for="(item,index) in lyric" :key="index" class="lyric_li"
                        :class="lineNum == index ? 'active_text' : ''">
                        <span>{{item.txt}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div style="position: absolute;top: 0;left: 64%;">
              <comment></comment>
            </div>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'
  import Lyric from '../utils/lyric-parser.js'
  import comment from './comment.vue'

  // 将整数转换成 时：分：秒的格式
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }

  //todo 监听url的变化，如果变化了就更新当前播放的音乐

  export default {
    components: {
      comment: comment
    },
    data() {
      return {
        cur_song: {
          title: '',
          album: '',
          singer: '',
          cover_url: 'http://localhost:8888/cover/cover9.jpg',
          lyric_url: '',
          song_url: ''
        },
        progress: 0,
        show_song: false,
        sliderTime: 0,
        audio: {
          maxTime: 0,
          /* 音频最大播放时长 */
          currentTime: 0,
          /* 当前播放时长 */
          playing: false,
          /* 音频当前处于播放/暂停状态 */
          waiting: true
        },
        isChange: false,
        currentLyric: '',
        nolyric: true,
        lyric: [],
        mylyric: {},
        currentSong: {
          cur_song: {}
        },
        lineNum: 0, //当前播放到第几行歌词
        playingList: [], //歌曲播放列表
        current: 0, //当前播放到歌单第几首歌
        playStatus: false, //播放状态
      }
    },
    props: {
      src: {
        type: String,
        default: 'http://localhost:8888/file/Jesus In LA.mp4'
      }
    },
    watch: {
      /**
       * 监听当前选择的音乐改变，重新发送请求
       */
      currentSong: {
        deep: true,
        handler: (newValue) => {
          Object.defineProperty(Image.prototype, 'authsrc', {
            writable: true,
            enumerable: true,
            configurable: true
          })
          let audio = document.getElementById('myaudio')
          let url = newValue.src
          let request = new XMLHttpRequest()
          request.open('get', url, true)
          request.setRequestHeader('Cache-Control', 'no-cache')
          request.responseType = 'arraybuffer'
          request.onreadystatechange = e => {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
              let binaryData = [];
              binaryData.push(request.response)
              audio.src = window.URL.createObjectURL(new Blob(binaryData))
              audio.onload = () => {
                window.URL.revokeObjectURL(audio.src)
              }
            }
          }
          request.send(null)
        }
      },
      /**
       * 监听当前播放到第几首歌
       * @param {Object} newValue
       */
      current(newValue) {
        this.update_song(this.playingList[newValue])
      }
    },
    created() {
      let list = JSON.parse(localStorage.getItem('cur_songlist'))
      this.playingList = list
      this.update_song(list[0])
    },
    mounted() {
      //监听切歌事件
      window.addEventListener('setItem', () => {
        this.playStatus = true
        this.current = 0
        let list = JSON.parse(localStorage.getItem('cur_songlist'))
        this.playingList = list
        //重新放路径
        this.update_song(list[0])
      })
    },
    methods: {
      /**
       * 切换歌曲
       */
      update_song(data) {
        this.currentSong.cur_song = data
        this.currentSong.src = 'http://localhost:8888/file/' + data.song_url
        this.currentSong.cover_url = 'http://localhost:8888/cover/' + data.cover
        this.lineNum = 0

        if (this.mylyric instanceof Lyric) {
          this.stopLyric()
        }

        setTimeout(() => {

          if (this.playStatus) {
            let status = $('.disk-cover-animation').css('-webkit-animation-play-state')
            if (status == 'paused') {
              $('.disk-cover-animation').css('-webkit-animation-play-state', 'running')
              $('.play-needle').removeClass('pause-needle')
            }
          }

          this.getLyric(data.lyric_url)
        }, 1500)

      },
      /**
       * 当一首音乐播放完
       */
      handlePlayEnded() {
        this.current++
        if (this.current == this.playingList.length - 1) {
          this.current = 0
        }
      },
      /**
       * 获取歌词名称
       * @param {Object} name 歌词文件名称
       */
      getLyric(name) {
        //获取歌词
        axios.get('http://localhost:8888/lyric/' + name)
          .then((res) => {
            if (res.data) {
              this.nolyric = false
              if (this.playStatus) {
                this.audio.playing = true
                this.startPlayOrPause()
              }
              this.init_lyric(res.data)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      clickPlay() {
        let status = $('.disk-cover-animation').css('-webkit-animation-play-state')
        if (status == 'paused') {
          $('.disk-cover-animation').css('-webkit-animation-play-state', 'running')
          $('.play-needle').removeClass('pause-needle')
        } else {
          $('.disk-cover-animation').css('-webkit-animation-play-state', 'paused')
          $('.play-needle').addClass('pause-needle')
        }
        this.audio.playing = !this.audio.playing
        this.startPlayOrPause()
      },
      /**
       * 初始化歌词
       * @param {Object} lyric 歌词文件
       */
      init_lyric(lyric) {
        let mylyric = new Lyric(lyric, this.handleLyric)
        $('#lyric_div').css('transform', 'translateY(0px)')
        this.lyric = mylyric.lines
        this.mylyric = mylyric
      },
      handleLyric({
        lineNum,
        txt
      }) {

        this.lineNum = lineNum

        if (lineNum >= 3) {
          $('.lyric_li:eq(' + lineNum + ')').removeClass('avtive_text')
          let lineHeight = 0
          for (let i = 3; i < lineNum; i++) {
            let element = $('.lyric_li:eq(' + i + ')')
            lineHeight = lineHeight + element[0].clientHeight
          }
          $('#lyric_div').css('transform', 'translateY(-' + lineHeight + 'px)')
        }

      },
      /* 拖动进度条，改变当前时间 index是进度条改变时的回调函数的参数 值为0~100之间，需要换算成实际时间 */
      changeCurrentTime(index) {
        this.stopLyric()
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
        this.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
        this.isChange = true
        this.playLyric()
      },
      /* 音频加载完成后的回调函数 */
      onLoadedmetadata(res) {
        this.audio.maxTime = parseInt(res.target.duration)
      },
      /* 每秒触发一次 用来更新当前播放时间 */
      onTimeupdate(res) {
        if (this.isChange == false) {
          this.audio.currentTime = res.target.currentTime

          this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
        } else {
          //进度条改变
          this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
          this.isChange = false

        }
      },
      /* 控制音频播放、暂停 */
      startPlayOrPause() {
        this.audio.playing ? this.play() : this.pause()
      },
      /**
       * 暂停歌词播放
       */
      stopLyric() {
        this.mylyric.stop()
      },
      /**
       * 播放歌词
       */
      playLyric() {
        this.mylyric.seek(this.audio.currentTime * 1000)
      },
      /**
       * 播放音乐
       */
      play() {
        this.$refs.audio.play()
        this.playLyric()
      },
      /* 暂停音频 */
      pause() {
        this.$refs.audio.pause()
        this.mylyric.togglePlay()
      },
      /* 当音频播放 */
      onplay() {
        this.audio.playing = true
      },
      /* 当音频暂停 */
      onPause() {
        this.audio.playing = false
      },
      onError() {
        this.audio.waiting = true
      }
    },
    filters: {
      /* 整数转换时分秒 */
      formartSecond(second = 0) {
        return realFormatSecond(second)
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  .el-header1 {
    position: fixed;
    bottom: 0;
    background-color: #212124;
    height: 10vh;
    line-height: 10vh;
    padding: 0 20px;
    width: 100%;
    zoom: 1;
    color: #eeeeee;
    border-top: 1px solid #444444;
    z-index: 20;
  }

  #lyric_div {
    transition: all .3s linear;
  }

  .lyric_li {
    line-height: 40px;
  }

  .lyric_li span {
    width: 400px;
    line-height: 15px;
  }

  #outer_lyric {
    transform: translateX(-95px);
    margin-top: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-mask-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .6) 15%, #fff 25%, #fff 75%, hsla(0, 0%, 100%, .6) 85%, hsla(0, 0%, 100%, 0))
  }

  #outer_lyric::-webkit-scrollbar {
    display: none;
  }

  #cover {
    height: 50px;
    width: 50px;
    border-radius: 8px;
    vertical-align: middle;
    cursor: pointer;
    overflow: hidden;
  }

  #cover:hover {
    filter: blur(2px);
  }

  .sing_com {
    line-height: 0px;
  }

  .progressHead {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 0px 135px;
    padding-top: 15px;
    color: #c7c7c7;

  }

  .progressHead>i:hover {
    color: #c23a3b;
  }

  .playBtn {
    font-size: 20px;
    background-color: #313134;
    border-radius: 30px;
    padding: 8px;
  }

  .playBtn:hover {
    background-color: #353538;
    color: #C7C7C7 !important;
  }

  .el-slider__runway {
    height: 3px !important;
    background-color: #363639 !important;
  }

  .el-slider__runway:hover {
    height: 5px !important;
  }

  .el-slider__bar {
    height: 3px !important;
    background-color: #ec4141;
  }

  .el-slider__bar:hover {
    height: 5px !important;
  }

  .el-slider__button {
    border: none;
    width: 11px;
    height: 11px;
    transform: translateY(-1px);
  }

  #time_left {
    position: absolute;
    top: 20%;
    left: 26%;
    font-size: 13px;
    color: #585f5a;
  }

  #time_right {
    position: absolute;
    top: 20%;
    right: 27%;
    font-size: 13px;
    color: #585f5a;
  }

  .quality {
    color: #ec4141;
    border: 1px solid #ec4141;
    font-size: 13px;
    padding: 2px;
    cursor: pointer;
    margin-right: 10px;
  }

  .el-progress-bar__outer {
    background-color: #363639 !important;
  }

  .transition-box {
    z-index: 100;
    position: absolute;
    top: -80vh;
    left: 0;
    background-color: #2f2f2f;
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }

  .song_head {
    padding: 20px 40px;
  }

  .song_cover {
    height: 180px;
    width: 180px;
    border-radius: 100px;
  }

  @keyframes rotate-disk {
    100% {
      transform: rotateZ(360deg);
    }
  }

  @-webkit-keyframes rotate-disk {
    100% {
      -webkit-transform: rotateZ(360deg);
    }
  }

  .play-board {
    position: absolute;
    overflow: hidden;
    top: 10%;
    width: 100%;
    height: 90%;
    color: white;
  }

  .disk-bg {
    width: 292px;
    height: 292px;
    position: absolute;
    left: 19.6%;
    top: 59px;
    margin: 0px -141px;
    background-color: rgba(251, 251, 251, 0.08);
    border-radius: 150px;
  }

  .disk-cover {
    width: 280px;
    height: 280px;
    position: absolute;
    left: 20%;
    top: 65px;
    margin: 0% -140px;
  }

  .disk-cover-animation {
    animation: rotate-disk 20s infinite normal linear;
    animation-play-state: paused;
    -webkit-animation: rotate-disk 20s infinite normal linear;
    -webkit-animation-play-state: paused;
  }

  .disk-transition {
    transition: left 0.8s ease-in-out;
    -webkit-transition: left 0.8s ease-in-out;
  }

  .disk-cover img {
    display: block;
    width: 100%;
  }

  .disk-cover .album {
    width: 68%;
    margin: 16%;
  }

  .disk-cover .disk-border {
    position: absolute;
    top: 0px;
  }

  .play-needle {
    position: absolute;
    top: -23px;
    left: 20%;
    margin: 0px -12px;
    z-index: 10;
    width: 100px;
    transform-origin: 20px 20px;
    transition: transform 0.4s;
    -webkit-transform-origin: 20px 20px;
    -webkit-transition: -webkit-transform 0.4s;
  }

  .pause-needle {
    transform: rotateZ(-25deg);
    -webkit-transform: rotateZ(-25deg);
  }

  .resume-needle {
    transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
  }

  .song_right {
    width: 400px;
    height: 400px;
    margin-left: 40%;
  }

  .songName {
    position: absolute;
    left: 29.5%;
    top: 4%;
    font-size: 30px;
    margin-top: 0;
    margin-bottom: 0;
    height: 35px;
    width: 500px;
    text-align: center;
  }

  .singerName {
    position: absolute;
    left: 33%;
    top: 13%;
    font-size: 15px;
    margin-top: 0;
    height: 20px;
    width: 400px;
    text-align: center;
    color: #8b8b8b;
    cursor: pointer;
  }

  .singerName:hover {
    color: #23526f;
  }

  .lyric_container {
    line-height: 50px;
    color: #626363;
    font-size: 15px;
    padding-top: 40px;
  }

  .active_text {
    color: #fcfcfc;
    font-weight: 600;
    font-size: 17px;
  }
</style>
