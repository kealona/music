<template>
  <div class="like_page">
    <div style="height: 220px;">
      <div class="left_img">
        <img :src="personData.cover_url"/>
        <i class="iconfont el-icon-msaixin" style="color: #fff;margin-left: 5px;position: absolute;"></i>
      </div>
      <h1> <a class="mark">歌单</a> 我喜欢的音乐</h1>
      <p>
        <img :src="personData.head_url" style="width: 30px;height: 30px;"/><span> {{personData.username}}</span>
        <span class="time">{{personData.create_time}}创建</span>
      </p>
      <button class="playBtn"><i class="iconfont el-icon-msplay1"></i> 播放全部</button>
      <button class="colBtn"><i class="el-icon-folder-add"></i> 收藏({{personData.col_num}})</button>
      <button class="checkBtn"><i class="el-icon-share"></i> 分享</button>
      <button class="checkBtn"><i class="el-icon-download"></i> 下载全部</button>
      <p><span class="p_name">歌曲:</span><span class="p_value">{{song_list.length}}</span><span class="p_name">播放:</span><span class="p_value">{{personData.play_num}}</span></p>
    </div>

    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <songlist v-bind:personData="personData" v-bind:show="show_list" v-bind:songlist_list="song_list"></songlist>
        </el-tab-pane>
        <!-- <el-tab-pane label="评论(0)" name="second">
          <comment></comment>
        </el-tab-pane> -->
        <el-tab-pane label="收藏者" name="third">
          <collector></collector>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import songlist from './liketab/songlist.vue'
  import comment from './liketab/comment.vue'
  import collector from './liketab/collector.vue'
  import url from '../../server/serviceAPI.config.js'
  import axios from 'axios'

  export default {
    data () {
      return {
        activeName: 'first',
        personData: {
          cover_url: '',
          head_url: '',
          username: '是康居吗',
          create_time: '2015-02-15',
          col_num: 2,
          song_num: 1080,
          play_num: 5416,
          comment_num: 0,
          songlist_id: 1,
          songlist_name: '我喜欢的音乐',
          user_id: 6
        },
        song_list: [],
        show_list: false
      }
    },
    mounted() {
      this.init_data()
    },
    methods: {
      /**
       * 初始化我喜欢的音乐歌单
       */
      async init_data () {
        let userdata = JSON.parse(sessionStorage.getItem('userdata'))
        console.log(userdata)
        this.$set(this.personData, 'username', userdata.username)
        this.personData.head_url = userdata.head_img
        let userid = userdata.id
        axios({
          url: url.getSongList,
          method: 'post',
          data: {
            userId: userid
          }
        })
        .then((res) => {
          let data = res.data.data[0]
          console.log(data)
          this.$set(this.personData, 'songlist_name', data.list_name)
          this.$set(this.personData, 'play_num', data.play_num)
          this.$set(this.personData, 'col_num', data.col_num)
          this.$set(this.personData, 'songlist_id', data.songlist_id)

          let date = new Date()
          dateFormat("YYYY-mm-dd", data.create_time)
          this.$set(this.personData, 'create_time', date)
        })
        .catch((err) => {
          console.log(err)
        })
        this.init_songlist()
      },
      /**
       * 初始化我的歌单
       */
      init_songlist() {
        axios({
          url: url.getSong,
          method: 'get',
          params: {
            songlist_id: this.personData.songlist_id
          }
        })
        .then((res) => {
          this.song_list = res.data.data
          this.show_list = true
          //获取第一首歌的歌曲id，获得封面
          this.$set(this.personData, 'cover_url', 'http://localhost:8888/cover/'+ res.data.data[0].cover)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    components: {
      songlist,
      comment,
      collector
    }
  }
</script>

<style scoped="scoped">
  @import url("../../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  .like_page {
    padding: 20px 20px;
    color: #dfdfdf;
  }

  .el-icon-msaixin {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    opacity: .7;
  }

  .left_img {
    float: left;
    margin-right: 20px;
    position: relative;
  }

  .left_img img {
    border-radius: 5px;
    height: 200px;
    width: 200px;
  }

  .mark {
    padding: 5px;
    border: 1px solid #ec4141;
    color: #ec4141;
    font-weight: 200;
    font-size: 13px;
  }

  p img {
    border-radius: 20px;
    float: left;
    margin-right: 5px;
  }

  .time {
    color: #878787;
    font-size: 13px;
  }

  .playBtn {
    background-color: #ec4141;
    color: #fff;
    border: none;
    height: 37px;
    width: 100px;
    border-radius: 20px;
    cursor: pointer;
  }

  .playBtn:hover {
    background-color: #d83e3e;
  }

  .checkBtn {
    height: 37px;
    width: 100px;
    margin-left: 15px;
    border-radius: 20px;
    background-color: transparent;
    color: #D6D6D6;
    border: 1px solid #444;
    cursor: pointer;
  }

  .checkBtn:hover {
    background-color: #353535;
  }

  .colBtn {
    height: 37px;
    width: 100px;
    margin-left: 15px;
    border-radius: 20px;
    background-color: #383838;
    color: #636f69;
    border: 1px solid #444;
  }

  .p_name {
    font-size: 15px;
  }

  .p_value {
    font-size: 14px;
    margin-left: 5px;
    margin-right: 10px;
    color: #81877a;
  }

  .el-tabs__item {
    color: #8e8f91 !important;
    font-size: 16px;
  }

  .el-tabs__item:hover {
    color: #fff !important;
  }

  .el-tabs__item.is-active {
    color: #d6d6d6 !important;
    font-weight: bold !important;
    font-size: 20px !important;
  }

  .el-tabs__active-bar {
    background-color: #ec4141 !important;
  }

  .el-tabs__nav-wrap::after {
    background-color: #2b2b2b;
  }

  .el-tabs__active-bar {
    height: 3px !important;
  }
</style>
