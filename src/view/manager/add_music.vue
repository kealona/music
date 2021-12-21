<template>
  <div>
    <h1>添加音乐</h1>
    <input type="file" name="" ref="file" />
    <input type="file" name="" ref="lyric" />
    <button @click="upload_song">上传歌曲</button>
    <h1>搜音乐</h1>
    <button @click="get_song">搞点音乐</button>
    <video controls src="http://localhost:8888/file/Jesus In LA.mp4"></video>

    <!-- <div class="di main-wrap" v-loading="audio.waiting">
      <audio ref="audio" class="dn" :src="url" :preload="audio.preload" @play="onPlay" @error="onError" @waiting="onWaiting"
        @pause="onPause" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata"></audio>
      <div>
        <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
        <el-button v-show="!controlList.noSpeed" type="text" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button>

        <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag>

        <el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime"
          class="slider"></el-slider>

        <el-tag type="info">{{ audio.maxTime | formatSecond }}</el-tag>

        <el-button v-show="!controlList.noMuted" type="text" @click="startMutedOrNot">{{audio.muted | transMutedOrNot}}</el-button>

        <el-slider v-show="!controlList.noVolume" v-model="volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume"
          class="slider"></el-slider>

        <a :href="url" v-show="!controlList.noDownload" target="_blank" class="download" download>下载</a>
      </div>
    </div> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '../../server/serviceAPI.config.js'
  import $ from 'jquery'

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

  export default {
    data() {
      return {
        url: 'http://localhost:8888/file/Jesus In LA.mp4',
        sliderTime: 0,
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: 'auto'
        },
        volume: 100,
        speeds: this.theSpeeds,
        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false
        }
      }
    },
    props: {
      /* theUrl: {
        type: String,
        required: true,
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      theControlList: {
        type: String,
        default: ''
      } */
    },
    mounted() {
       axios({
         url: url.getStaticLyric+'/lyric.lrc',
         method: 'get'
       })
       .then((res) => {
         console.log(res)
       })
       .catch((err) => {
         console.log(err)
       })
    },
    methods: {
      upload_song() {
        let forms = new FormData()
        let date = this.$refs.file.files[0]
        let lyric = this.$refs.lyric.files[0]
        console.log(lyric)
        forms.append('audio', date)
        forms.append('title', '我上传的歌曲.mp4')
        forms.append('singer', '我是歌手')
        forms.append('time', 300)
        forms.append('lyric', lyric)
        forms.append('name', '我的歌词名称.lrc')
        axios({
            url: url.addMusic,
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: forms
          })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      get_song() {
        this.$ajax.get('/static/newsong.mp4')
          .then((res) => {
            console.log(res)
          })
      },
      setControlList() {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if (this.controlList[item] !== undefined) {
            this.controlList[item] = true
          }
        })
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause() {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError() {
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting(res) {
        console.log(res)
      },
      // 当音频开始播放
      onPlay(res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false
        if (!this.controlList.onlyOnePlaying) {
          return
        }
        let target = res.target
        let audios = document.getElementsByTagName('audio');
        [...audios].forEach((item) => {
          if (item !== target) {
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      transMutedOrNot(value) {
        return value ? '放音' : '静音'
      },
      transSpeed(value) {
        return '快进: x' + value
      }
    },
    created() {
      //this.setControlList()
    }
  }
</script>

<style>
  #playMusic {
    display: flex;
    align-items: center;




  }

  .el-button {
    margin-right: 15px;
  }

  .slider {
    width: 150px;
    margin-right: 15px;
  }

  >span:nth-of-type(2) {
    margin-left: 5px;
  }
</style>
