<template>
  <div style="color: #d6d6d6;padding: 20px;">
    <h1>{{ username }}的直播</h1>
    <video ref="video" src="" id="id_local_video"
      style="margin:0 auto;width:80%;display:flex;align-items:center;justify-content:center;"></video>
  </div>
</template>

<script>
  export default {
    name: 'live',
    data() {
      return {
        username: '',
        stream: '',
        peer: ''
      }
    },
    created() {
      let userdata = JSON.parse(sessionStorage.getItem('userdata'))
      this.username = userdata.username
    },
    mounted() {
      this.initLive()
    },
    methods: {
      /**
       * 初始化直播
       */
      initLive() {
        this.connectServe()
      },
      /**
       * 与服务器建立连接
       */
      async connectServe() {
        if (!this.stream) {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: true
          }).then(stream => {
            this.stream = stream
            let video = this.$refs.video
            video.srcObject = this.stream; //将媒体流输出到本地video以显示自己
            video.onloadedmetadata = function(e) {
              video.play();
            };
          }, err => (console.log('调起失败')))
        }

      },
      /**
       * 视频传输流创建
       */
      async createPeerConnection() {
        if (!this.peer) {
          peer = new RTCPeerConnection()
        }
        await this.stream.getTracks().forEach(async track => {
          //将本地流附属至peer中
          await this.peer.addTrack(track, this.stream)
        })

        this.peer.addEventListener('addstream', setVideo) //当peer收到其他流时显示另一个video以显示对方
        this.peer.addEventListener('negotiationneeded', sendOffer) //双方约定的协商被完成时才触发该方法
        this.peer.addEventListener('icecandidate', sendIce)
      },
      //setLocalDescription触发时，发送ICE给对方
      sendIce(e) {
        if (!e || !e.candidate) return
        this.$socket.emit('ice', {
          streamData: e.candidate
        })
      },
      //播放对方的视频流
      setVideo(data) {
        
      },
      sendOffer() {
        
      },
      /**
       * 关闭直播
       */
      stopLive() {
        this.stream.getTracks().forEach(async function(track) {
          await track.stop()
          await stream.removeTrack(track)
          this.stream = null
        })
        this.peer.close()
        this.peer = null
        this.$router.push('/homePage')
      }
    }
  }
</script>

<style>
</style>
