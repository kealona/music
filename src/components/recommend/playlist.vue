<template>
  <div class="content">
    <a @click="initplaylists('全部')">全部歌单 <i class="el-icon-arrow-right"></i></a>
    <span class="wy-catogory" v-for="(item, index) in subs.slice(0, 10)"  @click="initplaylists(item.name)">{{ item.name }}</span>
    <div class="content_list">
      <div class="item" v-for="(item, index) in playlists" :key="index" @click="jumpDetail(item.id)">
        <img v-lazy="item.coverImgUrl" />
        <span>{{ item.name }}</span>
        <img class="run_btn" src="../../assets/播放.png" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'playlist',
    data() {
      return {
        subs: [],       //歌单分类
        playlists: [],   //歌单信息
      }
    },
    created() {
      this.getCategories()
      this.initplaylists("全部")
    },
    methods: {
      /**
       * 获取歌单分类
       */
      getCategories() {
        fetch('http://localhost:3000/playlist/highquality/tags')
          .then(res => res.json())
          .then(res => {
              this.subs = res.tags
          })
      },
      /**
       * 初始化歌单信息
       * @param {Object} type 歌单类型
       */
      initplaylists(type) {
        fetch('http://localhost:3000/top/playlist/highquality?cat=' + type)
        .then( res => res.json() )
        .then(res => {
          this.playlists = res.playlists
        })
      },
      /**
       * 跳转到歌单详情界面
       * @param {Object} id
       */
      jumpDetail(id) {
         this.$router.push({path: '/playlistDetail', query: { id: id }})
      }

    }
  }
</script>

<style scoped="scoped">
  a {
    border: 1px solid #444444;
    ;
    border-radius: 17px;
    padding: 6px;
    padding-left: 10px;
    font-size: 15px;
    cursor: pointer;
    margin-right: 550px;
  }

  .wy-catogory {
    cursor: pointer;
  }

  a:hover {
    color: #fff;
    background-color: #343434;
  }

  .content {
    padding: 10px;
  }

  .content>span {
    font-size: 14px;
    margin-right: 6px;
    color: #7f7f7f;
  }

  .content>span:hover {
    color: #D6D6D6;
  }

  .content_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .item {
    width: 180px;
    height: 210px;
    margin-right: 23px;
    font-size: 14px;
    margin-bottom: 20px;
    color: #d6d6d6;
    cursor: pointer;
  }

  .item span:hover {
    color: #fff;
  }

  .item img {
    border-radius: 4px;
    display: block;
    height: 180px;
    width: 180px;
  }

  .run_btn {
    position: relative;
    top: -38%;
    left: 80%;
    height: 30px !important;
    width: 30px !important;
  }
</style>
