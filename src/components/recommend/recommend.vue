<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px" style="padding-left: 20px;">
      <el-carousel-item>
        <img class="card" src="../../assets/card1.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img class="card" src="../../assets/card2.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img class="card" src="../../assets/card3.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img class="card" src="../../assets/card4.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img class="card" src="../../assets/card5.jpg" />
      </el-carousel-item>
    </el-carousel>
    <h2 class="headline">推荐歌单<i class="el-icon-arrow-right"></i></h2>
    <div class="content_list">
      <div class="item">
        <div style="overflow: hidden;border-radius: 4px;">
          <img id="cover" src="../../assets/song/cover1.jpg" />
        </div>
        <span class="item_name">每日歌曲推荐</span>
      </div>
      <div class="item" v-for="(item, index) in playlists" :key="index" @click="junmpPlaylist(item.id)">
        <img v-lazy="item.coverImgUrl" />
        <span>{{ item.name }}</span>
        <img class="run_btn" src="../../assets/播放.png" />
      </div>
    </div>
    <h2 class="headline">最新音乐<i class="el-icon-arrow-right"></i></h2>
    <div class="newSong_list">
      <ul>
        <li v-for="(item, index) in newSonglists.slice(0, 5)" :key="index">
          <img v-lazy="item.album.picUrl" />
          <div>
            <p>{{ item.name }}</p>
            <span>{{ item.artists[0].name }}</span>
          </div>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in newSonglists.slice(6, 11)" :key="index">
          <img v-lazy="item.album.picUrl" />
          <div>
            <p>{{ item.name }}</p>
            <span>{{ item.artists[0].name }}</span>
          </div>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in newSonglists.slice(12, 17)" :key="index">
          <img v-lazy="item.album.picUrl" />
          <div>
            <p>{{ item.name }}</p>
            <span>{{ item.artists[0].name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
          playlists: [],       //歌单列表
          newSonglists: [],   //新歌列表
      }
    },
    created() {
      this.getRecommendList()
      this.getNewSongList()
    },
    methods: {
      /**
       * 获取推荐歌单
       */
      getRecommendList() {
        fetch('http://localhost:3000/top/playlist/highquality?limit=13')
        .then((res) => res.json())
        .then(res => {
          this.playlists = res.playlists
        })
      },
      /**
       * 获取最新歌曲
       */
      getNewSongList() {
        fetch('http://localhost:3000/top/song?type=0')
        .then((res) => res.json())
        .then(res => {
          this.newSonglists = res.data
        })
      },
      /**
       * 跳转到歌单详情界面
       * @param {Object} id
       */
      junmpPlaylist(id) {
        this.$router.push({path: '/playlistDetail', query: { id: id }})
      }
    }
  }
</script>

<style scoped="scoped">
  .card {
    height: 230px;
    width: 500px;
  }

  .headline {
    color: #d6d6d6;
    cursor: pointer;
    margin-top: 6px;
    margin-bottom: 10px;
  }

  .headline:hover {
    color: #fff;
  }

  .el-carousel__item--card {
    width: 500px;
    border-radius: 10px !important;
  }

  .el-carousel__item .el-carousel__mask {
    border-radius: 10px !important;
    width: 400px !important;
  }

  .el-carousel__container {
    width: 800px !important;
  }

  .content_list {
    display: flex;
    justify-content: space-between;
    padding-right: 75px;
    flex-wrap: wrap;
  }

  .item img {
    border-radius: 4px;
    display: block;
    height: 130px;
    width: 130px;
  }

  .item_name {
    font-size: 15px;
  }

  #cover {
    -webkit-filter: blur(3px);
    overflow: hidden;
  }

  .item {
    width: 130px;
    height: 165px;
    margin-right: 23px;
    font-size: 14px;
    margin-bottom: 20px;
    color: #d6d6d6;
    cursor: pointer;
    position: relative;
  }

  .item span:hover {
    color: #fff;
  }

  .run_btn {
    position: absolute;
    bottom: 40px;
    left: 80%;
    height: 22px !important;
    width: 22px !important;
  }

  .newSong_list {
    display: flex;
  }

  .newSong_list ul {
    list-style: none;
    padding: 0;
    width: 360px;
    margin-right: 15px;
  }

  .newSong_list img {
    height: 55px;
    width: 55px;
    border-radius: 3px;
    float: left;
  }

  .newSong_list li {
    height: 60px;
  }

  .newSong_list li:hover {
    background-color: #3b3b3b;
  }

  .newSong_list div {
    float: left;
  }

  .newSong_list p {
    margin: 5px;
    color: #d6d6d6;
  }

  .newSong_list span {
    margin-left: 5px;
    font-size: 13px;
    color: #727272;
  }
</style>
