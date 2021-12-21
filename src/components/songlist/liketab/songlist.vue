<template>
  <div v-if="show">
    <table cellspacing="0px">
      <tr>
        <td style="width: 80px;"></td>
        <td style="width: 400px;">音乐标题</td>
        <td style="width: 200px;">歌手</td>
        <td style="width: 300px;">专辑</td>
        <td>时长</td>
      </tr>
      <tr class="content" v-for="(item, index) in songlist_list" @click="play(index)">
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
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '../../../server/serviceAPI.config.js'

  export default {
    data() {
      return {

      }
    },
    props: {
      songlist_list: {
        type: Array,
        required: true
      },
      personData: {
        type: Object,
        required: true
      },
      show: {
        type: Boolean,
        required: true
      }

    },
    methods: {
      play(index) {
        if(index !=0 ) {
          this.resetSetItem('cur_songlist', JSON.stringify(this.songlist_list.slice(index)))
        } else {
          this.resetSetItem('cur_songlist', JSON.stringify(this.songlist_list))
        }
      },
      resetSetItem(key, newVal) {
        if (key === 'cur_songlist') {

          // 创建一个StorageEvent事件
          var newStorageEvent = document.createEvent('StorageEvent');
          const storage = {
            setItem: function(k, val) {
              localStorage.setItem(k, val);
              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
              // 派发对象
              window.dispatchEvent(newStorageEvent)
            }
          }
          return storage.setItem(key, newVal);
        }
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../../../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  .el-icon-msaixin {
    color: #ec4141;
  }

  .el-icon-msaixin:hover {
    color: #d83e3e;
  }

  .content td:nth-child(1) {
    font-size: 14px;
    color: #5c5c5c;
    padding-left: 10px;
  }

  .el-icon-download {
    font-size: 18px;
    cursor: pointer;
  }

  .el-icon-download:hover {
    color: #9a9a9a;
  }

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
</style>
