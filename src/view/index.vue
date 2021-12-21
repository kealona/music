<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4">
          <a href="/#/homePage" id="Logo_a">
            <div>
              <img src="../assets/logo.png" id="logo">
            </div>
            <h1 id="headline">云音乐</h1>
          </a>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-arrow-left" @click="back"></i>
          <i class="el-icon-arrow-right" @click="ToNext"></i>
        </el-col>
        <el-col :span="5">
          <i class="el-icon-search"></i>
          <input type="text" v-model="keyword" @keyup.enter.prevent="searchContent($event)" />
        </el-col>
        <el-col :span="5">
          <a class="btn" @click="jumpLive">{{ liveStatus }}</a>
        </el-col>
        <el-col :span="3">
          <a class="btn" v-if="!status" style="width: auto;padding: 0px 20px;"
            @click="dialogFormVisible = true">立即登录</a>
          <el-dropdown @click.native="clickDrop" v-else>
            <el-dropdown-menu></el-dropdown-menu>
            <span class="el-dropdown-link">
              <img class="head" :src="user.head_img" />
              <span style="padding-left: 35px;">{{user.username}}</span>
              <i style="font-size: 12px;" class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <div class="dropdown_div" slot="dropdown">
              <div class="dropdown_head">
                <div>
                  <h2>{{ user.dynamic }}</h2>
                  <span>动态</span>
                </div>
                <div @click="jumpFlollow">
                  <h2>{{ user.follow }}</h2>
                  <span>关注</span>
                </div>
                <div @click="jumpFans">
                  <h2>{{ user.fans }}</h2>
                  <span>粉丝</span>
                </div>
              </div>
              <div style="text-align: center;margin-top: 10px;">
                <button class="sign_btn">
                  <i style="font-size: 16px;" class="el-icon-coin"></i>
                  签到
                </button>
              </div>
              <div class="dropdown_list">
                <ul>
                  <li>
                    <i class="el-icon-cloudy"></i>
                    <span>我的会员</span>
                    <div>
                      <span style="font-size: 12px;color: #707070;">2021.6.24过期</span>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </li>
                  <li>
                    <i class="el-icon-medal"></i>
                    <span>等级</span>
                    <div>
                      <span style="font-size: 13px;color: #707070;font-weight: bold;">LV.8</span>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </li>
                  <li>
                    <i class="el-icon-goods"></i>
                    <span>商城</span>
                  </li>
                </ul>
              </div>
              <div class="dropdown_list">
                <ul>
                  <li @click="clickToPersonPage">
                    <i class="el-icon-user"></i>
                    <span>个人信息设置</span>
                  </li>
                </ul>
              </div>
              <div class="dropdown_list">
                <ul>
                  <li @click="status = false">
                    <i class="el-icon-switch-button"></i>
                    <span>退出账号</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-dropdown>
        </el-col>
        <el-col :span="3">
          <div class="icon_div">
            <i style="font-size: 20px;" class="iconfont el-icon-mshuanfu"></i>
            <i class="el-icon-setting"></i>
            <i class="el-icon-message" @click="msglist = !msglist"></i>
            <el-collapse-transition>
              <div v-show="msglist" class="msglist" v-if="changeToPage">
                <h3 style="margin: 0 20px">消息</h3>
                <ul>
                  <li v-for="(item, index) in msgList" @click="clickToPrivate(index), currentOp = index">
                    <img :src="getUserHead(item.nickname)" />
                    <p class="name">{{item.nickname}}</p>
                    <span class="content">{{item.msg}}</span>
                    <span class="time">{{formateTime(new Date().getTime())}}</span>
                  </li>
                </ul>
              </div>
              <div v-if="!changeToPage" v-show="msglist" class="msglist">
                <header class="msg_header">
                  <i class="el-icon-arrow-left" style="margin: 20px 20px;" @click="changeToPage = !changeToPage"></i>
                  {{ friend_name }}
                </header>
                <main class="msg_content">
                  <div v-for="(item, index) in private_msgList" :key="index">
                    <div style="height: 70px;">
                      <p class="msg_time">{{item.create_time}}</p>
                      <img :src="getUserHead(item.nickname)" :class="item.self ? 'right' : 'left' " />
                      <div class="msg_container" :style="item.self ? 'text-align: right;float: right;' : 'float: left'">
                        {{item.msg}}
                      </div>
                    </div>

                  </div>
                </main>
                <div style="position: absolute;z-index: 20;bottom: 10%;">
                  <textarea placeholder="回复" class="replayInput" v-model="message"></textarea>
                  <button class="sendBtn" @click="replay_msg">发送</button>
                </div>
              </div>
            </el-collapse-transition>
            <!-- </div> -->
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="background-color: #2b2b2b;height: 85vh;">
      <asideBar></asideBar>
      <el-main style="height: 80vh;">
        <router-view v-on:launchChat="launchChat" ref="live"></router-view>
      </el-main>
    </el-container>
    <bottomBar></bottomBar>

    <el-dialog title="登录" :visible.sync="dialogFormVisible" :center="center">
      <el-form :model="form" :rules="rules" ref="form" :label-position="right">
        <el-form-item label="帐号" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-link @click="dialogFormVisible = false, dialogForm = true">没有账号？</el-link>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickToLogin">登 录</el-button>
      </div>
    </el-dialog>

    <el-dialog title="注册" :visible.sync="dialogForm" :center="center">
      <el-form :model="register" :rules="rules" ref="form" :label-position="right">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="register.username" autocomplete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="register.email" autocomplete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="register.password" autocomplete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="register.surePassword" autocomplete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="register.code" autocomplete="off" style="width: 200px;"></el-input>
          <el-button type="primary" @click="clickGetCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="clickToRegister">注 册</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import $ from 'jquery'
  import url from '../server/serviceAPI.config.js'
  import qs from 'qs'
  import axios from 'axios'
  import CryptoJS from '../utils/cbs.js'

  import headerPvt from '../components/header.vue'
  import asideBar from '../components/aside.vue'
  import bottomBar from '../components/bottom.vue'

  export default {
    components: {
      headerPvt: headerPvt,
      asideBar: asideBar,
      bottomBar: bottomBar
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePassAgain = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请再次输入密码'))
        } else if (value != this.register.surePassword) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入邮箱'))
        } else {
          var reg = new RegExp(
            "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
          if (reg.test(value)) {
            callback()
          } else {
            callback('邮箱不正确，请重新输入')
          }
        }
      }
      return {
        keyword: '',
        center: 'center',
        dialogForm: false,
        right: 'right',
        dialogFormVisible: false,
        formLabelWidth: '80px',
        msglist: false,
        changeToPage: true,
        status: false,
        user: {
          username: '',
          head_img: ''
        },
        form: {
          id: '',
          password: ''
        },
        register: {
          email: '',
          password: '',
          surePassword: '',
          code: '',
          username: ''
        },
        msgList: [],
        private_msgList: [],
        rules: {
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          username: [{
            validator: validateUsername,
            trigger: 'blur'
          }],
          surePassword: [{
            validator: validatePassAgain,
            trigger: 'blur'
          }],
          email: [{
            validator: validateEmail,
            trigger: 'blur'
          }]
        },
        friend_id: 0, //私信对象的id
        friend_name: '', //私信对象的名称
        message: '', //聊天内容
        currentOp: 0, //当前操作的是第几条私信
        friend_socketid: '', //当前聊天对象的socketid
        options: {},
        liveStatus: '开启直播'
      }
    },
    computed: {
      formateTime() {
        return function(time) {
          return new Date(time * 1000).toLocaleTimeString()
        }
      }
    },
    mounted() {
      /* this.sockets.subscribe('msg', (data) => {
        console.log(data)
      }) */
      this.init_msgList()
      if (sessionStorage.getItem('userdata')) {
        this.status = true
        let userdata = JSON.parse(sessionStorage.getItem('userdata'))
        this.user = userdata
      }
    },
    sockets: {
      //监听接收到信息
      receiveMessage(msg) {
        this.private_msgList.push(msg)
      },
      sendFriends(msg) {
        this.msgList = msg
      },
      oneOnline() {
        this.$socket.emit('online', this.options)
      }
    },
    methods: {
      /**
       * 跳转到直播界面
       */
      jumpLive() {
        if(this.liveStatus == '开启直播') {
          this.liveStatus = '关闭直播'
          this.$router.push('/live')
        } else {
          this.liveStatus = '开启直播'
          this.$refs.live.stopLive()
        }
      },
      /**
       * 发起聊天
       * @param {Object} id
       */
      launchChat(id) {
        //获取私信对象的信息
        axios({
            url: url.getMsgBySenderId,
            method: 'post',
            data: {
              friendId: id
            }
          })
          .then((res) => {
            //消息列表添加一条
            this.currentOp = this.msgList.length - 1
            this.changeToPage = false
            this.msglist = true
            this.friend_id = id
            this.friend_name = res.data.data[0].username
            this.friend_socketid = res.data.socketid
            this.addMsgItem(id)
          })
      },
      /**
       * 用户添加一条消息记录
       * @param {Number} id 接收者id
       */
      addMsgItem(id) {
        //添加入用户的消息列表
        this.$http.post('/msg/msglist', {
            friendid: id,
            createTime: new Date().getTime()
          })
          .then((res) => {
            this.msgList.push({
              username: res.data.data[0].username,
              id: id,
              head_img: res.data.data[0].username,
              msg: '',
              create_time: new Date().toLocaleTimeString()
            })
          })
      },
      /**
       * 点击头像，操作下拉框
       */
      clickDrop() {
        let dom = $('.dropdown_div').css('display')
        if (dom == 'block') {
          $('.dropdown_div').css('display', 'none')
        } else {
          $('.dropdown_div').css('display', 'block')
        }
      },
      /**
       * 跳转到个人信息界面
       */
      clickToPersonPage() {
        this.$router.push('/personinfo')
      },
      clickLogin() {
        //console.log('click click')
      },
      /**
       * 点击登录按钮
       */
      clickToLogin() {
        this.dialogFormVisible = false
        //前端对密码进行加密，保证数据在传输时安全
        let password = CryptoJS.encrypt(this.form.password)
        let _this = this

        axios({
            url: url.loginUser,
            method: 'get',
            params: {
              id: this.form.id,
              password: password
            }
          })
          .then((res) => {
            let data = res.data.data
            if (res.data.code == 1) {
              //todo 登录成功 带回token
              this.user = data.user
              if (!data.user.head_img) {
                this.user.head_img = 'http://localhost:8888/headImg/' + data.user.username + '.jpg'
              } else {
                this.user.head_img = data.user.head_img
              }

              localStorage.setItem('token', data.token)
              sessionStorage.setItem('userdata', JSON.stringify(this.user))

              this.connect(data, _this)

              this.$notify({
                title: '登录成功',
                message: '欢迎' + data.user.username + '使用云音乐',
                type: 'success',
                duration: 2000
              })
              this.status = true
            } else {
              //todo 登陆失败
              this.$notify({
                title: '登录失败',
                message: '用户名或密码错误',
                type: 'error',
                duration: 2000
              })
            }
          })
          .catch((error) => {
            console.log(error + '服务器出错了');
          });
      },
      /**
       * 连接服务器
       */
      connect(data, _this) {
        _this.$socket.emit('connection', function(data) {
          //用户信息中放入socketid，用于聊天
        })
        this.options = {
          id: data.socketid,
          nickname: data.user.username,
          userid: data.user.id
        }
        _this.$socket.emit('login', this.options)
      },
      /**
       * 点击注册
       */
      clickToRegister() {
        this.dialogForm = false
        let time = (new Date()).toLocaleDateString()
        //先确认验证码是否输入正确
        axios.get(url.checkCode, {
            params: {
              code: this.register.code,
              email: this.register.email
            }
          })
          .then((res) => {
            //前端密码加密
            let password = CryptoJS.encrypt(this.register.password)
            axios({
                url: url.registerUser,
                method: 'post',
                data: {
                  email: this.register.email,
                  password: password,
                  username: this.register.username,
                  date: time
                }
              })
              .then((res) => {
                console.log(res.data)
              })
              .catch((err) => {
                console.log(err + '服务器出错了')
              })
          })
          .catch(err => {
            this.$notify({
              title: '注册失败',
              message: '验证码错误',
              type: 'error',
              duration: 2000
            })
          })
      },
      /**
       * 跳转到我的关注界面
       */
      jumpFlollow() {
        this.$router.push('/follow')
      },
      /**
       * 跳转到我的粉丝界面
       */
      jumpFans() {
        this.$router.push('/fans')
      },
      /**
       * 搜索内容
       * @param {Object} e
       */
      searchContent(e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          //把关键字传给搜索结果的界面进行初始化
          this.$router.push({
            path: '/search',
            query: {
              keyword: this.keyword
            }
          })
        }
      },
      /**
       * 点击获取验证码
       */
      clickGetCode() {
        axios.get(url.getCode, {
            params: {
              email: this.register.email
            }
          })
          .then((res) => {
            console.log(res.data)
          })
      },
      /**
       * 初始化消息列表
       */
      init_msgList() {
        this.$http.get('/msg/msglist')
          .then((res) => {
            this.msgList = res.data.data
          })
      },
      /**
       * 点击私信，获取对方的信息列表
       * @param {Object} index
       */
      clickToPrivate(index) {
        let friendId = this.msgList[index].userid
        this.friend_name = this.msgList[index].nickname
        this.friend_socketid = this.msgList[index].id
        let {
          id
        } = JSON.parse(sessionStorage.getItem('userdata'))
        //todo 向后端获取该用户的全部信息
        axios({
            url: url.getMsgBySenderId,
            method: 'post',
            data: {
              id: id,
              friendId: friendId
            }
          })
          .then((res) => {
            this.changeToPage = false
            /* this.private_msgList = res.data.data */
          })
          .catch((err) => {
            console.log(err)
          })
      },
      /**
       * 发送信息
       */
      replay_msg() {
        //向后端确认发送消息
        this.$socket.emit('privateMsg', {
          msg: this.message,
          receiver: this.friend_socketid,
          create_time: new Date().toLocaleTimeString(),
          nickname: this.user.username
        })
        //自己这变也添加一条消息
        this.private_msgList.push({
          msg: this.message,
          create_time: new Date().toLocaleTimeString(),
          nickname: this.user.username,
          self: true
        })
      },
      getUserHead(url) {
        return 'http://localhost:8888/headImg/' + url + '.jpg'
      },
      back() {
        this.$router.go(-1)
      },
      ToNext() {
        this.$router.go(1)
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/font/font_2570492_m9vsrr5kfj/iconfont.css");

  #logo {
    height: 32px;
    width: 32px;
  }

  .el-header {
    height: 70px !important;
    background-color: #212124;
    line-height: 70px;
    color: #fff;
    border-bottom: 2px solid #C20C0C;
    border-image: linear-gradient(to right, #690505, #b32323, #690505) 30 30;
    padding: 0 10px !important;
    width: 100% !important;
  }

  .el-main {
    overflow-x: hidden;
  }

  #headline {
    font-size: 22px;
    color: #fff;
    display: flex;
  }

  #Logo_a {
    display: flex;
    line-height: 70px;
    height: 70px;
    margin-left: 10px;
    text-decoration: none;
  }

  #Logo_a h1 {
    margin: 0;
  }

  #Logo_a div {
    line-height: 70px;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .el-row {
    height: 70px !important;
  }

  .el-col {
    height: 70px !important;
  }

  i {
    cursor: pointer;
    font-size: 20px;
    color: #868686;
  }

  input {
    background-color: #2a2a2d;
    border-radius: 20px;
    height: 30px;
    border: none;
    outline: none;
    padding-left: 30px;
    color: #fff;
  }

  .el-icon-search {
    position: absolute;
    top: 38%;
    left: 26%;
  }

  .el-icon-search:hover {
    color: #b1b1b1;
  }

  .btn {
    border-radius: 20px;
    height: 32px;
    width: 65px;
    border: 1px solid #4F4F4F;
    color: #ccc;
    line-height: 33px;
    margin: 19px 0 0 12px;
    font-size: 12px;
    float: right;
    padding-left: 20px;
    cursor: pointer;
  }

  .btn:hover {
    border-color: #fff;
    color: #fff;
  }

  .head {
    border-radius: 20px;
    position: absolute;
    top: 20px;
  }

  .dropdown_div {
    width: 250px;
    height: 326px;
    background-color: #363636;
    border-radius: 6px;
    box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
    border: 1px solid #000;
    z-index: 10;
    right: 1%;
    top: 98%;
    position: absolute;
    line-height: 10px;
    display: none;
  }

  .icon_div i {
    margin-right: 10px;
    cursor: pointer;
  }

  .icon_div>i:hover {
    color: #b1b1b1;
  }

  .dropdown_head {
    display: flex;
    justify-content: space-between;
    padding: 10px 25px;
  }

  .dropdown_head>div {
    cursor: pointer;
  }

  .dropdown_head>div:hover {
    color: #fff;
  }

  .el-dropdown {
    color: #b5b5b5 !important;
  }

  h2 {
    color: #ccc;
    display: flex;
    justify-content: center;
  }

  h2:hover {
    color: #fff;
  }

  .sign_btn {
    height: 30px;
    width: 70px;
    border-radius: 20px;
    border: 0.3px solid #535353;
    background-color: transparent;
    color: #ccc;
    cursor: pointer;
  }

  .sign_btn:hover {
    color: #fff;
    background-color: #4a484899;
  }

  .dropdown_list {
    border-top: 1px solid #535353;
    margin-top: 10px;
  }

  .dropdown_list ul {
    list-style: none;
    margin: 0;
    padding-top: 5px;
    padding-left: 0;
  }

  .dropdown_list li {
    padding: 10px 10px;
    padding-bottom: 5px;
    cursor: pointer;
  }

  .dropdown_list li:hover {
    background-color: #4a484899;
  }

  .dropdown_list div {
    float: right;
  }

  .dropdown_list i {
    font-size: 16px;
  }

  .el-main {
    padding: 0 !important;
  }

  .el-progress-bar__outer {
    background-color: #363639 !important;
  }

  .el-main::-webkit-scrollbar {
    display: none !important;
  }

  .msglist {
    background-color: #363636;
    z-index: 10;
    height: 560px;
    width: 340px;
    position: relative;
    left: -45%;
    border-radius: 6px;
    box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
    border: 1px solid #000;
  }

  .el-tabs__nav-wrap::after {
    width: 500px !important;
  }

  .msglist ul {
    padding: 0;
    list-style: none;
    line-height: 5px;
    margin: 0;
  }

  .msglist img {
    height: 35px;
    width: 35px;
    border-radius: 20px;
    float: left;
    margin-right: 10px;
    margin-top: 10px;
  }

  .msglist li {
    border-bottom: 1px solid #444;
    padding-top: 10px;
    height: 60px;
    cursor: pointer;
    padding-left: 20px;
  }

  .msglist li:hover {
    background-color: #3d3d3d;
  }

  .content {
    font-size: 14px;
  }

  .name {
    font-size: 15px;
  }

  .time {
    float: right;
    margin-right: 20px;
    font-size: 13px;
  }

  .el-icon-arrow-left:hover,
  .el-icon-arrow-right:hover {
    color: #D6D6D6;
  }

  .head {
    width: 30px;
    height: 30px;
  }

  .msg_header {
    text-align: center;
    height: 70px;
    background-color: #393b3e;
    z-index: 12;
    padding-right: 57px;
  }

  .left {
    float: left;
    margin-right: 15px;
  }

  .right {
    float: right !important;
    margin-left: 15px;
  }

  .msg_header i {
    float: left;
  }

  .replayInput {
    height: 50px;
    width: 290px;
    margin: 13px;
    background-color: #434343;
    color: #D6D6D6;
    font-size: 15px;
    padding: 10px;
    border: 1px solid #323232;
    border-radius: 6px;
  }

  .replayInput:focus-within {
    outline: none;
  }

  .sendBtn {
    border: 1px solid #535353;
    background-color: transparent;
    color: #D6D6D6;
    border-radius: 15px;
    padding: 5px 15px;
    float: right;
    margin-right: 10px;
    position: relative;
    top: -30px;
  }

  .sendBtn:hover {
    background-color: #3f3f3f;
  }

  .msg_content {
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 15px;
  }

  .msg_content::-webkit-scrollbar {
    display: none;
  }

  .msg_content img {
    height: 35px;
    width: 35px;
  }

  .msg_container {
    border-radius: 0 10px 10px 10px;
    margin-top: 10px;
    line-height: normal;
    background-color: #414141;
    padding: 8px 15px;
    font-size: 14px;
  }

  .msg_time {
    margin: 2px;
    text-align: center;
    font-size: 12px;
    color: #6f6f62;
    line-height: normal;
  }
</style>
