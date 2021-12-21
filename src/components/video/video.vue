<template>
  <div style="color: #d6d6d6;padding-left: 20px;">
    <h1>MV</h1>
    <video controls="controls" :src="src" id="myVideo"></video>
    <div class="right_content">
      <p class="mv_name">{{MV.mv_name}}</p>
      <img :src="MV.singer_cover"/>
      <span>{{MV.singer_name}}</span>
      <p class="mv_tip">发布：{{MV.create_time}} 播放量：{{MV.play_num}}次</p>
      <button>赞({{MV.like_num}})</button>
      <button>收藏({{MV.col_num}})</button>
      <button>分享</button>
    </div>
  </div>
</template>

<script>
  import url from '../../server/serviceAPI.config.js'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    data() {
      return {
        src: '',
        MV: {
          singer_cover: 'http://localhost:8888/cover/Offical.jpg',
          singer_name: 'Official髭男dism',
          mv_name: 'Pretender',
          create_time: '2019-07-15',
          MV_play: 14000,
          like_num: 1654,
          col_num: 467
        }

      }
    },
    mounted() {
      let {id, mv} = this.$route.query
      this.get_mv(mv)
      this.get_mvInfo(id)
    },
    methods: {
      get_mv (name) {
        this.src = 'http://localhost:8888/mv/'+name
      },
      get_mvInfo (id) {
        axios({
          url: url.getMvInfo,
          method: 'get',
          params: {
            id: id
          }
        })
        .then((res) => {
          let data = res.data.data[0]
          data.create_time = moment(data.create_time).format('YYYY-MM-DD')
          this.MV = data
          this.$set(this.MV, 'singer_cover', 'http://localhost:8888/cover/'+data.head_url)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  #myVideo {
    width: 640px;
  }

  .right_content {
    float: right;
    margin-right: 10%;
    width: 340px;
    height: 500px;
  }

  .right_content img {
    height: 50px;
    width: 50px;
    border-radius: 30px;
  }

  .right_content span {
    cursor: pointer;
  }

  .mv_name {
    font-size: 30px;
    margin-top: 0;
    font-weight: 500;
  }

  .mv_tip {
    font-size: 14px;
    color: #666;
  }

  button {
    border-radius: 20px;
    background-color: transparent;
    color: #D6D6D6;
    border: 1px solid #444;
    cursor: pointer;
    padding: 8px 20px;
    margin-right: 10px;
  }

  button:hover {
    background-color: #353535;
  }
</style>
