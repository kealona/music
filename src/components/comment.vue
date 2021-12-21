<template>
  <div>
    <h4 style="line-height: 60px;margin-bottom: 0;">全部评论({{commentList.length}})</h4>
    <div class="item" v-for="(comment, index) in commentList" :key="index">
      <img :src="comment.head_url" />
      <p><span class="com_user">{{comment.username}}: </span>{{comment.content}}</p>
      <p>
        <span class="time">{{comment.time}}</span>
        <span class="share">
          <i class="el-icon-share"></i>
        </span>
        <span class="like">
          <i class="el-icon-thumb"></i>
          {{comment.like_num}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        commentList: [{
          head_url: 'http://localhost:8888/headImg/1.jpg',
          username: '用户名',
          content: '这首歌不错',
          time: '2020-05-12 13:57',
          like_num: 154
        }, {
          head_url: 'http://localhost:8888/headImg/1.jpg',
          username: '用户名',
          content: '这首歌不错',
          time: '2020-05-12 13:57',
          like_num: 154
        }]
      }
    }
  }
</script>

<style scoped="scoped">
  .item {
    width: 400px;
    height: 50px;
    border-bottom: 1px solid #434343;
    margin-bottom: 25px;
  }

  .item img {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
  }

  .item p {
    line-height: 15px;
    font-size: 15px;
  }

  .com_user {
    font-size: 15px;
    color: #94ccfd;
    cursor: pointer;
  }

  .com_user:hover {
    color: #b3cee5;
  }

  .time {
    color: #676767;
    font-size: 13px;
  }

  .like, .share {
    float: right;
    color: #989898;
    cursor: pointer;
    margin-left: 10px;
  }

  .like:hover, .share:hover {
    color: #a4a4a4;
  }
</style>
