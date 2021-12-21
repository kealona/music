<template>
  <div class="local_music">
    <h1>本地音乐</h1>
    <button class="playBtn"><i class="iconfont el-icon-msplay1"></i> 播放全部</button>
    <button class="checkBtn"><i class="el-icon-refresh"></i> 匹配音乐</button>
    <span class="directory">存储目录：{{directory}}</span>
    <span class="openBtn">打开目录</span>
    <br>
    <div id="list">
      <el-table :data="tableData" style="width: 79%;background-color: #2b2b2b;" :stripe="true" :header-cell-style="{ textAlign: 'center',
                                   background: '#2b2b2b' }"
        :cell-style="{background: '#2b2b2b'}" :row-class-name="tableRow">
        <el-table-column prop="title" label="音乐标题" width="300">
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="200">
        </el-table-column>
        <el-table-column prop="album" label="专辑" width="200">
        </el-table-column>
        <el-table-column prop="time" label="时长" width="100">
        </el-table-column>
        <el-table-column prop="data" label="大小" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import url from '../../server/serviceAPI.config.js'
  import axios from 'axios'

  export default {
    data() {
      return {
        tableData: [{
          title: '镜花水月',
          singer: 'まふまふ',
          album: 'プレリズムアーチ',
          time: '04:31',
          data: '10.6MB'
        }],
        directory: 'file:///D:/CloudMusic'
      }
    },
    mounted() {
      this.init_file()
    },
    methods: {
      tableRow({
        row,
        rowIndex
      }) {
        if ((rowIndex + 1) % 2 == 0) {
          return 'double'
        } else {
          return 'single'
        }
      },
      init_file() {
        axios({
            url: url.getSong,
            method: 'get',
            params: {
              songlist_id: this.personData.songlist_id
            }
          })
          .then((res) => {
            console.log(res.data)
            this.song_list = res.data.data
            this.show_list = true
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  .local_music {
    color: #D6D6D6;
    padding-left: 20px;
  }

  i {
    font-size: 13px !important;
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

  #list {
    margin-top: 35px;
    border-top: 1px solid #444;
  }

  .el-table__row {
    background-color: #2b2b2b !important;
  }

  .double {
    background-color: #2b2b2b !important;
  }

  .singer {
    background-color: #2f2f2f !important;
  }

  .el-table th,
  .el-table tr {
    background-color: #2f2f2f !important;
  }

  .directory {
    font-size: 14px;
    color: #898989;
  }

  .openBtn {
    font-size: 13px;
    margin-left: 10px;
    color: #80c3fd;
    cursor: pointer;
  }

  .openBtn:hover {
    color: #b3cee5;
  }
</style>
