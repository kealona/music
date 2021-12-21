<template>
  <div style="color: #d6d6d6;padding-left: 20px;">
    <div class="div_left">
      <h1>动态</h1>
      <ul>
        <li>
          <div class="msg_user">
            <img src="../../assets/song/singer7.jpg"/>
            <span>电鸟个灯泡</span>
            <span>分享单曲</span>
            <br>
            <span>5月4日 20:34</span>
          </div>
          <p>直觉敏锐而不甘</p>
          <div class="content">
            <img src="../../assets/song/cover1.jpg"/>
            <span class="name">勘冴えて悔しいわ</span>
            <br>
            <span class="singer">电鸟个灯泡</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="div_right">
      <div class="myhead">
        <img src="../../assets/defualt-head.jpg" />
        <p>是康居啊<i class="el-icon-female"></i></p>
        <span>wish</span>
      </div>
      <div class="fans">
        <div>
          <h2>0</h2>
          <span>动态</span>
        </div>
        <div>
          <h2>13</h2>
          <span>关注</span>
        </div>
        <div>
          <h2>14</h2>
          <span>粉丝</span>
        </div>
      </div>
      <div style="padding-left: 10px;">
        <p style="font-size: 13px;">添加关注<i class="el-icon-arrow-right"></i></p>
        <div class="add_focus">
          <ul>
            <li>
              <img src="../../assets/song/singer1.jpg"/>
            </li>
            <li>
              <span>林俊杰</span>
            </li>
            <li>
              <button> + 关注 </button>
            </li>
          </ul>
        </div>
        <div class="add_focus">
          <ul>
            <li>
              <img src="../../assets/song/singer2.jpg"/>
            </li>
            <li>
              <span>薛之谦</span>
            </li>
            <li>
              <button> + 关注 </button>
            </li>
          </ul>
        </div>
        <div class="add_focus">
          <ul>
            <li>
              <img src="../../assets/song/singer3.jpg"/>
            </li>
            <li>
              <span>陈奕迅</span>
            </li>
            <li>
              <button> + 关注 </button>
            </li>
          </ul>
        </div>
        <div class="add_focus">
          <ul>
            <li>
              <img src="../../assets/song/singer4.jpg"/>
            </li>
            <li>
              <span>许嵩</span>
            </li>
            <li>
              <button> + 关注 </button>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from '../../utils/axios.js'
  import url from '../../server/serviceAPI.config.js'

  //请求这个界面的时候，需要先将token添加在请求的头信息中，由于使用的是axios
  //所以可以使用axios的请求拦截器修改其头信息，如果后端token不存在或过期，不允许访问！
  export default {
    mounted() {
      //先从localStorage中获取token，如果没有token拒绝访问，如果有token向后端获取验证
      /* let token = localStorage.getItem('token')
      console.log(token) */
      //if(token != null) {
        //向后端获取允许
        axios({
          url: url.verify,
          method: 'post'
        })
        .then((res) => {
          if(res.data.code == 0) {
            //token过期，拦截访问
            localStorage.removeItem('token')
            this.$router.push('/index')
          }else {
            //token没有过期，可以访问

          }
        })
        .catch((err) => {
          console.log(err)
        })
     // }else {
        //todo 不允许访问
       /* this.$notify({
          title: '访问失败',
          message: '请先登录',
          type: 'error',
          duration: 2000
        }) */
    //  }
    }
  }
</script>

<style scoped="scoped">
  .div_left {
    float: left;
    padding-left: 15px;
  }

  .div_right {
    float: right;
    width: 250px;
    height: 80vh;
    border-left: 1px solid #444444;
    padding: 20px 20px;
  }

  .myhead {
    padding: 10px 15px;
  }

  .myhead img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    float: left;
  }

  .myhead p {
    margin-top: 0;
    margin-left: 60px;
    font-size: 14px;
  }

  .myhead span {
    font-size: 13px;
    margin-left: 10px;
    color: #686868;
  }

  .el-icon-female {
    color: #b6366b;
    border-radius: 10px;
    padding: 2px;
    margin-left: 10px;
    background-color: #6c3a55;
  }

  .fans {
    display: flex;
    justify-content: space-between;
    padding: 10px 26px;
  }

  .fans h2 {
    display: flex;
    justify-content: center;
  }

  .add_focus {
    height: 60px;
    border-bottom: 1px solid #353535;
    margin-top: 10px;
  }

  .add_focus ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 200px;
    height: 400px;
  }

  .add_focus li {
    float: left;
  }

  .add_focus li:nth-child(2) {
    padding-top: 13px;
    width: 100px;
  }

  .add_focus li:nth-child(3) {
    padding-top: 13px;
  }

  .add_focus img {
    height: 45px;
    width: 45px;
    border-radius: 40px;
    margin-top: 5px;
  }

  .add_focus span {
    margin-left: 15px;
  }

  .add_focus button {
    border-radius: 10px;
    border: 1px solid #ad1f1f;
    background-color: transparent;
    color: #ad1f1f;
    cursor: pointer;
  }

  .div_left ul {
    padding: 10px 0;
    list-style: none;
  }

  .div_left li {
    border-bottom: 1px solid #434343;
    padding-bottom: 20px;
  }

  .msg_user span:nth-child(2) {
    margin-left: 10px;
  }

  .msg_user span:nth-child(3){
      margin-left: 10px;
      font-size: 14px;
      color: #878787;
  }

  .msg_user span:nth-child(5) {
    margin-left: 10px;
    font-size: 13px;
    color: #636363;
  }

  .msg_user img {
    border-radius: 40px;
    float: left;
  }

  .div_left p {
    margin-left: 45px;
  }

  .content {
    margin-left: 35px;
    padding-left: 10px;
    padding-top: 15px;
    background-color: #353638;
    height: 63px;
    width: 700px;
    border-radius: 10px;
  }

  .content img {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    float: left;
  }

  .name {
    font-size: 16px;
    margin-left: 10px;
  }

  .singer {
    font-size: 15px;
    margin-left: 10px;
    color: #6d6e69;
  }
</style>
