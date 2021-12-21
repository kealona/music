<template>
    <el-aside width="200px" style="background-color: #2b2b2b;border-right: 1px solid #444;height: 80vh;">
      <el-menu router>
        <el-menu-item-group class="main_menu">
          <el-menu-item index="/homePage">发现音乐</el-menu-item>
          <el-menu-item index="/mv">视频</el-menu-item>
          <el-menu-item index="/friends">朋友</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="我的音乐" class="sub_menu">
          <el-menu-item index="/local">
            <i class="iconfont el-icon-msmusic"></i>
            本地音乐
          </el-menu-item>
          <el-menu-item index="/download">
            <i class="el-icon-download"></i>
            下载管理
          </el-menu-item>
          <el-menu-item index="/myradio">
            <i class="iconfont el-icon-msdiantaizhibo"></i>
            我的电台
          </el-menu-item>
          <el-menu-item index="/collection">
            <i class="el-icon-star-off"></i>
            我的收藏
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="创建的歌单" class="sub_menu">
          <el-menu-item index="/mylike">
            <i class="iconfont el-icon-msaixin"></i>
            我喜欢的音乐
          </el-menu-item>
          <el-menu-item index="/mylist">
            <i class="iconfont el-icon-mssonglist"></i>
            我的歌单1
          </el-menu-item>
          <el-menu-item>
            <i class="iconfont el-icon-mssonglist"></i>
            我的歌单2
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="收藏的歌单">
          <el-menu-item index="1-4">
            <i class="iconfont el-icon-mssonglist"></i>
            歌单1
          </el-menu-item>
          <el-menu-item index="1-5">
            <i class="iconfont el-icon-mssonglist"></i>
            歌单2
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
</template>

<script>
</script>

<style scoped="scoped">
  @import url("../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  .iconfont {
    margin-right: 5px;
    height: 18px;
    width: 24px;
    padding-left: 3px;
  }

  .el-menu {
    background-color: #2b2b2b !important;
    color: #fff !important;
    border: none;
  }

  .el-aside::-webkit-scrollbar {
    display: none !important;
  }

  li {
    color: #aaaaaa !important;
    font-size: 15px !important;
    font-weight: 400 !important;
  }

  .el-menu-item {
    transition: 0.3s;
  }

  .el-menu-item:hover {
    background-color: #4a484899;
    color: #fff !important;
  }

  .main_menu .el-menu-item:focus {
    background-color: #4a484899;
    font-size: 18px !important;
    font-weight: bold !important;
  }

  .sub_menu .el-menu-item:focus {
    background-color: #4a484899;
    color: #fff !important;
  }
</style>
