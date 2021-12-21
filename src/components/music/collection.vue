<template>
  <div style="padding:10px 20px;color: #dfdfdf;">
    <el-tabs v-model="activeName">
        <el-tab-pane label="专辑" name="first">
          <colalnum></colalnum>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="second">
          <colSinger></colSinger>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  import col_album from './col/col-album.vue'
  import col_singer from './col/col-singer.vue'

  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      colalnum: col_album,
      colSinger: col_singer
    }
  }
</script>

<style>
  .el-tabs__item {
    color: #8e8f91!important;
    font-size: 16px;
  }

  .el-tabs__item:hover {
    color: #fff!important;
  }

  .el-tabs__item.is-active {
    color: #d6d6d6!important;
    font-weight: bold!important;
    font-size: 20px!important;
  }

  .el-tabs__active-bar {
    background-color: #ec4141!important;
  }

  .el-tabs__nav-wrap::after {
    background-color: #2b2b2b;
  }

  .el-tabs__active-bar {
    height: 3px!important;
  }
</style>
