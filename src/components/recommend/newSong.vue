<template>
  <div>
    <h1>新歌速递</h1>
    <ul class="sort_ul">
      <li @click="getNewSongList(0)">
        全部
      </li>
      <li @click="getNewSongList(7)">
        华语
      </li>
      <li @click="getNewSongList(96)">
        欧美
      </li>
      <li @click="getNewSongList(16)">
        韩国
      </li>
      <li @click="getNewSongList(8)">
        日本
      </li>
    </ul>
    <button class="colBtn"><i class="el-icon-folder-add"></i>收藏全部</button>
    <button class="playBtn"><i class="el-icon-video-play"></i>播放全部</button>
    <div>
      <ul class="item_list">
        <li class="item_li" v-for="(item, index) in newSonglists" :key="index">
          <ul class="content">
            <li>
              <span class="rank">{{ index + 1 }}</span>
            </li>
            <li>
              <img v-lazy="item.album.picUrl" />
            </li>
            <li>
              <span class="name">{{ item.name }}</span>
            </li>
            <li>
              <span class="singer">{{ item.artists[0].name }}</span>
            </li>
            <li>
              <span class="album">{{ item.album.name }}</span>
            </li>
            <li>
              <span class="time">{{ getTime(item.duration) }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data() {
      return {
        newSonglists: []
      }
    },
    computed: {
      getTime() {
        return (value) => {
          value = value / 1000
          var theTime = parseInt(value); // 秒
          var middle = 0; // 分
          var hour = 0; // 小时

          if (theTime > 60) {

            middle = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (middle > 60) {
              hour = parseInt(middle / 60);
              middle = parseInt(middle % 60);
            }
          }
          var result = "" + parseInt(theTime) + "秒";
          if (middle > 0) {

            result = "" + parseInt(middle) + "分" + result;
          }
          if (hour > 0) {
            result = "" + parseInt(hour) + "小时" + result;
          }
          return result;
        }
      }
    },
    mounted() {
      $('.item_li:even').css('background-color', '#2f2f2f')
      this.getNewSongList(0)
    },
    methods: {
      /**
       * 获取最新歌曲
       */
      getNewSongList(type) {
        fetch('http://localhost:3000/top/song?type=' + type)
          .then((res) => res.json())
          .then(res => {
            this.newSonglists = res.data
          })
      }
    }
  }
</script>

<style scoped="scoped">
  h1 {
    margin-top: 0;
  }

  .sort_ul {
    list-style: none;
    padding: 0;
    width: 300px;
  }

  .sort_ul li {
    float: left;
    margin-right: 15px;
    font-size: 15px;
    color: #909399;
    cursor: pointer;
  }

  .sort_ul li:hover {
    color: #d6d6d6;
  }

  .sort_ul li:focus {
    font-size: 16px;
  }

  .playBtn {
    float: right;
    margin-right: 20px;
    border-radius: 20px;
    height: 23px;
    background-color: #e83838;
    border: none;
    color: #fff;
    padding: 0px 12px;
    cursor: pointer;
  }

  .playBtn:hover {
    background-color: #d73535;
  }

  .colBtn {
    float: right;
    margin-right: 100px;
    border-radius: 20px;
    height: 23px;
    border: 1px solid #4a4a4a;
    color: #D6D6D6;
    background-color: transparent;
    padding: 0 12px;
    cursor: pointer;
  }

  .colBtn:hover {
    background-color: #343434;
  }

  .item_list {
    margin-top: 60px;
    list-style: none;
    padding: 0;
  }

  .item_list li {
    height: 75px;
    padding: 5px 10px;
  }

  .item_li:hover {
    background-color: #373737;
  }

  .item_list span {
    margin-top: 25px;
    float: left;
  }

  .item_list img {
    height: 65px;
    width: 65px;
    border-radius: 10px;
    float: left;
    margin-right: 15px;
  }

  .rank {
    color: #5a5a54;
    float: left;
    margin-right: 15px;
  }

  .name {
    font-size: 15px;
  }

  .singer {
    color: #a5a7a8;
    font-size: 14px;
  }

  .album {
    color: #a5a7a8;
    font-size: 14px;
  }

  .time {
    font-size: 13px;
    color: #5d6464;
  }

  .content {
    padding: 0;
    margin: 0;
  }

  .content li {
    float: left;
    list-style: none;
  }

  .content li:nth-child(3) {
    width: 100px;
  }

  .content li:nth-child(4) {
    width: 200px;
  }

  .content li:nth-child(5) {
    width: 400px;
  }
</style>
