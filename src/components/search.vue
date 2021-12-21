<template>
  <div style="color: #d6d6d6;padding-left: 20px;padding-top: 20px;">
    <!-- <h1>搜索到{{number}}条记录</h1> -->
    <el-tabs v-model="activeName">
        <el-tab-pane label="单曲" name="first">
          <table cellspacing="0px">
            <tr>
              <td style="width: 80px;"></td>
              <td style="width: 400px;">音乐标题</td>
              <td style="width: 200px;">歌手</td>
              <td style="width: 300px;">专辑</td>
              <td>时长</td>
            </tr>
            <tr class="content" v-for="(item, index) in song_list" @click="play(index)">
              <td>
                {{index + 1}}
                <i class="iconfont el-icon-msaixin"></i>
                <i class="el-icon-download"></i>
              </td>
              <td>{{item.title}}</td>
              <td>{{item.singer}}</td>
              <td>{{item.album}}</td>
              <td>{{item.time}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="second">
         <ul class="search_list">
           <li v-for="(item, index) in singer_list" class="singer_head">
             <img :src="getCoverUrl(item.head_url)"/>
             <span>{{item.singer_name}}</span>
           </li>
         </ul>
        </el-tab-pane>
        <el-tab-pane label="视频" name="third">
          <div class="content_list">
            <div class="item" v-for="(items, index) in mv_list" :key="index" @click="clickToMv(items.id, items.mv_url)">
              <div style="overflow: hidden;border-radius: 4px;">
                <img id="cover" :src="getCoverUrl(items.cover_url)" />
              </div>
              <span class="item_name">{{items.mv_name}}</span>
              <span class="item_singer">{{items.singer_name}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户" name="fourth">
          <ul class="search_list">
            <li v-for="(item, index) in user_list" class="singer_head">
              <img :src="getHeadUrl(item.username)" class="user_head"/>
              <span>{{item.username}}</span>
              <button @click="follow(item.id)"> + 关注 </button>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '../server/serviceAPI.config.js'

  export default {
    data () {
      return {
        activeName: 'first',
        song_list: [{
          title: '怪物',
          album: '怪物',
          singer: 'YOASOBI',
          time: '03:26'
        }],
        singer_list: [],
        mv_list: [],
        user_list: [],
        number: 0
      }
    },
    mounted() {
      //this.init_list()
    },
    methods: {
      /**
       * 关注陌生人
       * @param {Object} id 用户id
       */  
      follow(id) {
        this.$http.post(url.follow, {
          id: id
        })
        .then((res) => {
            if(res.data.code == 200) {
              this.$message.success('关注成功')
            } else {
              this.$message.error(res.data.message)
            }
        })
      },
      /**
       * 初始化搜索列表
       */
      init_list () {
        let keyword = this.$route.query.keyword
        axios({
          url: url.getSearchInfo,
          method: 'get',
          params: {
            keyword: keyword
          }
        })
        .then((res) => {
          let data = res.data.data
          this.song_list = data[0]
          this.singer_list = data[1]
          this.mv_list = data[2]
          this.user_list = data[3]
        })
        .catch((err) => {
          console.log(err)
        })
      },
      /**
       * 获取歌曲封面地址
       * @param {Object} url
       */
      getCoverUrl (url) {
        return 'http://localhost:8888/cover/'+ url + '.jpg'
      },
      /**
       * 获取用户头像地址
       * @param {Object} url
       */
      getHeadUrl (url) {
        return 'http://localhost:8888/headImg/'+ url + '.jpg'
      },
      /**
       * 点击播放音乐
       * @param {Object} index
       */
      play(index) {
        console.log('播放音乐')
      },
      /**
       * 点击MV播放
       * @param {Object} index
       * @param {Object} mv_url
       */
      clickToMv (index, mv_url) {
        this.$router.push({path: '/video', query: {id: index, mv: mv_url}})
      }
    },
    watch: {
      $route () {
        this.keyword = this.$route.query.keyword
        this.init_list()
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  tr:nth-child(1) {
    color: #888888;
  }

  .content:hover {
    background-color: #373737;
  }

  tr {
    height: 50px;
  }

  .content td:nth-child(5) {
    padding-right: 10px;
    font-size: 14px;
    color: #6f6f6f;
  }

  .content td:nth-child(2) {
    font-size: 15px;
  }

  .content td:nth-child(3),
  .content td:nth-child(4) {
    font-size: 14px;
    color: #888888;
    cursor: pointer;
  }

  .content td:nth-child(3):hover,
  .content td:nth-child(4):hover {
    color: #a5a5a5;
  }

  .singer_head img{
    width: 70px;
    height: 70px;
    float: left;
    border-radius: 8px;
    margin: 10px 10px;
  }

  .singer_head {
    list-style: none;
    line-height: 90px;
    height: 90px;
    padding-left: 10px;
  }

  .singer_head:hover {
    background-color: #373737;
  }

  .singer_head:nth-child(even) {
    background-color: #303030;
  }

  .singer_head:nth-child(even):hover {
    background-color: #373737;
  }

  .search_list {
   padding: 10px 10px;
   margin: 0;
  }

  .content_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .item {
    width: 260px;
    height: 210px;
    margin-right: 0px;
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
    height: 145px;
    width: 260px;
  }

  button {
    border-radius: 10px;
    border: 1px solid #ad1f1f;
    background-color: transparent;
    color: #ad1f1f;
    cursor: pointer;
    margin-left: 20vw;
  }

  .item_singer {
    float: right;
    font-size: 14px;
    color: #909399;
  }

  .item_name {
    font-size: 16px;
  }

  .user_head {
    border-radius: 50px;
  }
</style>
