<template>
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
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
      </el-col>
      <el-col :span="5">
        <i class="el-icon-search"></i>
        <input type="text" />
      </el-col>
      <el-col :span="5">
        <a class="btn">创作者中心</a>
      </el-col>
      <el-col :span="3">
        <el-dropdown @click.native="clickDrop">
          <span class="el-dropdown-link">
            <img class="head" src="../assets/defualt-head.jpg" />
            <span style="padding-left: 35px;">是康居啊</span>
            <i style="font-size: 12px;" class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
          <div class="dropdown_div" slot="dropdown">
            <div class="dropdown_head">
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
                <li>
                  <i class="el-icon-user"></i>
                  <span>个人信息设置</span>
                </li>
              </ul>
            </div>
            <div class="dropdown_list">
              <ul>
                <li @click="clickLogin()">
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
          <i class="el-icon-star-off"></i>
          <i class="el-icon-setting"></i>
          <i class="el-icon-message" @click="msglist = !msglist"></i>
          <div style="height: 200px;z-index: 10;background-color: #363636;margin-top: 20px;text-align: center;">
            <el-collapse-transition>
              <div v-show="msglist">
                <div class="msglist">
                   <h3>消息</h3>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        msglist: true
      }
    },
    methods: {
      clickDrop() {
        let dom = $('.dropdown_div').css('display')
        console.log(dom)
        if (dom == 'block') {
          $('.dropdown_div').css('display', 'none')
        } else {
          $('.dropdown_div').css('display', 'block')
        }
      },
      clickLogin() {
        console.log('click click')
      }
    }
  }
</script>

<style scoped="scoped">
  c

  #logo {
    height: 32px;
    width: 32px;
  }

  .el-header {
    height: 70px;
    background-color: #212124;
    line-height: 70px;
    color: #fff;
    border-bottom: 2px solid #C20C0C;
    border-image: linear-gradient(to right, #690505, #b32323, #690505) 30 30;
    padding: 0 !important;
    width: 100% !important;
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
    width: 80px;
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

  .el-dropdown {
    color: #b5b5b5 !important;
  }

  h2 {
    color: #ccc;
    display: flex;
    justify-content: center;
  }

  .sign_btn {
    height: 30px;
    width: 70px;
    border-radius: 20px;
    border: 0.3px solid #535353;
    background-color: transparent;
    color: #ccc;
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
</style>
