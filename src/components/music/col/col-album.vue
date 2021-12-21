<template>
  <div>
    <h4>收藏的专辑 <span class="number">(1)</span></h4>
    <ul class="item_list">
      <li class="item_li">
        <ul class="content">
          <li>
            <div class="album_bg">
              <img src="../../../assets/song/small1.jpg"/>
              <a href="#"></a>
            </div>
          </li>
          <li>
            <span class="name">恋一世的爱</span>
          </li>
          <li>
            <span class="album">莫文蔚</span>
          </li>
          <li>
            <span class="number">16首</span>
          </li>
        </ul>
      </li>
        </ul>
  </div>
</template>

<script>
  import url from '../../../server/serviceAPI.config.js'
  import axios from 'axios'

  export default {
    data() {
      return {
        album_list: []
      }
    },
    mounted () {
      this.init_album()
    },
    methods: {
      init_album () {
        let {id} = JSON.parse(sessionStorage.getItem('userdata'))
        axios({
          url: url.getColAlbum,
          method: 'get',
          params: {
            id: id
          }
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .number {
    font-size: 13px;
    color: #444 !important;
  }

  .item_list {
    margin-top: 15px;
    list-style: none;
    padding: 0;
  }

  .item_list li {
    height: 140px;
    padding: 15px 10px;
  }

  .item_li:hover {
    background-color: #373737;
  }

  .item_list span {
    margin-top: 50px;
    float: left;
  }

  .item_list img {
    height: 120px;
    width: 120px;
    float: left;
    margin-right: 20px;
  }

  .name {
    font-size: 15px;
  }

  .album {
    color: #a5a7a8;
    font-size: 14px;
  }

  .content {
    padding: 0;
    margin: 0;
  }

  .content li{
    float: left;
    list-style: none;
  }

  .content li:nth-child(2) {
    width: 500px;
  }

  .content li:nth-child(3) {
    width: 300px;
  }
  
  .

  .album_bg a{
    height: 120px;
    width: 145px;
    background-position: -170px -850px!important;
    position: absolute;
    top: 38%;
    left: 1.8%;
    background: url(../../../assets/song/cover00.png) no-repeat;
    cursor: pointer;
  }
</style>
