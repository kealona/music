<template>
  <div style="height: 80vh;width: 100%;background-color: #2b2b2b;padding-top: 6px;padding-left: 25px;color: #d6d6d6;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个性推荐" name="first">
          <recommend></recommend>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <playlist></playlist>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="third">
          <rank></rank>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="fourth">
          <singer></singer>
        </el-tab-pane>
        <el-tab-pane label="最新音乐" name="newMusic">
          <newSong></newSong>
        </el-tab-pane>
      </el-tabs>
      <div style="height: 200px;width: 100%;"></div>
  </div>
</template>

<script>
  import recommend from './recommend/recommend.vue'
  import playlist from './recommend/playlist.vue'
  import rank from './recommend/rank.vue'
  import singer from './recommend/singer.vue'
  import newSong from './recommend/newSong.vue'

  export default {
    components: {
      recommend: recommend,
      playlist: playlist,
      rank: rank,
      singer: singer,
      newSong: newSong
    },
    data () {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick () {
        console.log('click it!')
      }
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
