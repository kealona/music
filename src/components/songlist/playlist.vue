<template>
  <div class="like_page">
    <div style="height: 220px;">
      <div class="left_img">
        <img :src="personData.coverImgUrl"/>
      </div>
      <h1 class="wy-name"> <a class="mark">歌单</a> {{personData.name}}</h1>
      <p>
        <img :src="creator.avatarUrl" style="width: 30px;height: 30px;"/><span> {{creator.nickname}}</span>
        <span class="time">{{ getDate(personData.createTime) }}创建</span>
      </p>
      <button class="playBtn"><i class="iconfont el-icon-msplay1"></i> 播放全部</button>
      <button class="colBtn"><i class="el-icon-folder-add"></i> 收藏({{personData.subscribedCount}})</button>
      <button class="checkBtn"><i class="el-icon-share"></i> 分享({{ personData.shareCount }})</button>
      <button class="checkBtn"><i class="el-icon-download"></i> 下载全部</button>
      <p><span class="p_name">歌曲:</span><span class="p_value">{{personData.trackCount}}</span><span class="p_name">播放:</span><span class="p_value">{{personData.playCount}}</span></p>
    </div>

    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <songlist v-bind:show="show_list" v-bind:songlist_list="song_list"></songlist>
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
  import songlist from './listtab/songlist.vue'
  import comment from './listtab/comment.vue'
  import collector from './listtab/collector.vue'
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
        creator: {},
        song_list: [],
        show_list: false
      }
    },
    mounted() {
      let id = this.$route.query.id
      this.init_songlist(id)
    },
    computed: {
      getDate() {
        return value => {
          return new Date(value).toLocaleDateString().replaceAll('/', '-')
        }
      }
    },
    methods: {
      /**
       * 初始化歌单
       */
      init_songlist(id) {
          fetch('http://localhost:3000/playlist/detail?id=' + id)
          .then(res => res.json())
          .then(res => {
            this.personData = res.playlist
            this.creator = res.playlist.creator
            this.song_list = res.playlist.tracks
            this.show_list = true
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

  .wy-name {
    word-wrap: break-word;
    width: 100%;
  }
</style>
