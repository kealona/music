<template>
  <div style="color: #d6d6d6;padding-left: 20px;">
    <h2 style="margin-left: 10px;">最新MV<i class="el-icon-arrow-right"></i></h2>
    <div class="content">
      <a>最新MV <i class="el-icon-arrow-right"></i></a>
      <span>内地</span>
      <span>港台</span>
      <span>欧美</span>
      <span>日本</span>
      <span>韩国</span>
      <div class="content_list">
        <div class="item" v-for="(items, index) in mv_list" :key="index" @click="clickToMv(items.id, items.mv_url)">
          <div style="overflow: hidden;border-radius: 4px;">
            <img id="cover" :src="getCoverUrl(items.cover_url)" />
          </div>
          <span class="item_name">{{items.mv_name}}</span>
          <span class="item_singer">{{items.singer_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import url from '../../server/serviceAPI.config.js'
  import axios from 'axios'

  export default {
    data () {
      return {
        mv_list: []
      }
    },
    mounted() {
      this.init_mvList()
    },
    methods: {
      clickToMv (index, mv_url) {
        this.$router.push({path: '/video', query: {id: index, mv: mv_url}})
      },
      init_mvList () {
        axios({
          url: url.getMvList,
          method: 'get'
        })
        .then((res) => {
          this.mv_list = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      },
      getCoverUrl (cover_url) {
        if(cover_url == undefined) {
          return 'http://localhost:8888/cover/water.jpg'
        }
        return 'http://localhost:8888/cover/'+cover_url
      }
    }
  }
</script>

<style scoped="scoped">
  h2 {
    cursor: pointer;
  }

   a {
     border: 1px solid #444444;;
     border-radius: 17px;
     padding: 6px;
     padding-left: 10px;
     font-size: 15px;
     cursor: pointer;
     margin-right: 750px;
   }

   a:hover {
     color: #fff;
     background-color: #343434;
   }

   .content {
     padding: 10px;
   }

   .content > span {
     font-size: 14px;
     margin-right: 6px;
     color: #7f7f7f;
     cursor: pointer;
   }

   .content > span:hover {
     color: #D6D6D6;
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

   .run_btn {
     position: relative;
     top: -38%;
     left: 80%;
     height: 30px !important;
     width: 30px !important;
   }

   .item_singer {
     float: right;
     font-size: 14px;
     color: #909399;
   }

   .item_name {
     font-size: 16px;
   }

</style>
