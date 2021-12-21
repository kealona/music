<template>
  <div style="color: #d6d6d6;padding: 20px;">
    <p class="wy-title">{{ username }}的关注</p>
    <div>
      <ul class="wy-followList">
        <li v-for="(item, index) in followList" :key="index">
          <img :src="getUrl(item.username)" class="wy-userImg"/>
          <p>{{ item.username }}</p>
          <button class="wy-button" @click="openPrivateMessage(item.id)"><i class="el-icon-message"></i> 私信</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'follow',
    data() {
      return {
        username: '',       //用户名
        followList: [{
          username: '是康居吗'
        }],     //我的关注列表
      }
    },
    computed: {
      getUrl() {
        return function(name) {
          return 'http://localhost:8888/headImg/' + name + '.jpg'
        }
      }
    },
    created() {
      this.username = JSON.parse(sessionStorage.getItem('userdata')).username
      this.getAllFollow()
    },
    methods: {
        /**
         * 获取所有我的关注
         */
        getAllFollow() {
          this.$http.get('/user/follow', {
            params: {
              type: 'FOLLOW'
            }
          })
          .then((res) => {
              this.followList = res.data.data
          })
        },
        /**
         * 打开私信界面
         * @param {Object} id
         */
        openPrivateMessage(id) {
          this.$emit('launchChat', id)
        }
    }
  }
</script>

<style scoped="scoped">

  .wy-title {
    font-size: 25px;
    font-weight: bold;
    margin: 0 0 20px 0;
  }

  .wy-followList {
    list-style: none;
    margin: 0;
    padding: 0;

  }

  .wy-followList li {
      float: left;
      width: 30%;
  }

  .wy-userImg {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    float: left;
    margin-right: 20px;
    cursor: pointer;
  }

  .wy-button {
    background-color: transparent;
    color: #d6d6d6;
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid #4F4F4F;
  }

  .wy-button:hover {
    background-color: #343434
  }
</style>
