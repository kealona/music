<template>
  <div style="padding: 0px 20px;color: #D6D6D6;">
    <h1>编辑个人信息</h1>
    <el-form ref="personDataForm" :model="personData" :label-width="labelWidth" style="float: left;">
      <el-form-item label="昵称:">
        <input type="text" class="nickname_input" v-model="personData.nickname" />
      </el-form-item>
      <el-form-item label="介绍:">
        <textarea class="brief_input" v-model="personData.brief" />
        </el-form-item>
      <el-form-item label="性别:">
        <el-radio v-model="personData.sex" label="保密" value="保密">保密</el-radio>
        <el-radio v-model="personData.sex" label="男" value="男">男</el-radio>
        <el-radio v-model="personData.sex" label="女" value="女">女</el-radio>
      </el-form-item>
      <el-form-item label="生日:">
        <el-date-picker
              v-model="personData.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="地区:">
        <el-cascader size="large" :options="options" v-model="personData.region"></el-cascader>
      </el-form-item>
     <el-form-item>
       <a class="submitBtn" @click="submitInfo">保存</a>
       <a class="cancelBtn">取消</a>
     </el-form-item>
    </el-form>
    <div style="float: right;margin-right: 150px;">
      <img :src="myhead" onerror="../../assets/head.jpg"/>
      <div>
        <el-upload class="img-btn" action="#" :show-file-list="false" :before-upload="beforeHeadUpload"
        :http-request="uploadImg">
        <button class="changeHeadBtn">修改头像</button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import { provinceAndCityData,CodeToText } from 'element-china-area-data'
  import url from '../../server/serviceAPI.config.js'

  export default {
    data () {
      return {
        personData: {
          nickname: '',
          sex: '',
          region: '',
          birth: '',
          brief: '',
          email: ''
        },
        labelWidth: '50px',
        radio: '保密',
        options: provinceAndCityData,
        myhead: 'http://localhost:8888/headImg/1.jpg'
      }
    },
    mounted() {
      let userData = JSON.parse(sessionStorage.getItem('userdata'))
      this.$set(this.personData, 'nickname', userData.username)
      this.$set(this.personData, 'brief', userData.brief)
      this.$set(this.personData, 'email', userData.email)
     // console.log()
      this.myhead = 'http://localhost:8888/headImg/'+userData.username+'.jpg'
      if(userData.brief == undefined) {
        this.$set(this.personData, 'brief', '这个人很懒，什么都没留下')
      }
    },
    methods: {
      submitInfo () {
        let region = CodeToText[this.personData.region[0]] + CodeToText[this.personData.region[1]]
        axios({
          url: url.updateUser,
          method: 'post',
          data: {
            username: this.personData.nickname,
            brief: this.personData.brief,
            sex: this.personData.sex,
            region: region,
            birth: this.personData.birth,
            email: this.personData.email
          }
        })
        .then((res) => {
          let userData = JSON.parse(sessionStorage.getItem('userdata'))
          userData.username = this.personData.nickname
          userData.brief = this.personData.brief
          userData.sex = this.personData.sex
          userData.region = this.personData.region
          userData.birth = this.personData.birth
          sessionStorage.setItem('userdata', JSON.stringify(userData))
          //console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      },
      uploadImg (data) {
        let forms = new FormData()
        let userData = JSON.parse(sessionStorage.getItem('userdata'))
        forms.append('head_file', data.file)
        forms.append('email', userData.email)
        forms.append('name', userData.username+'.jpg')
        let _this = this
        axios({
          url: url.uploadHeadImg,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: forms
        })
        .then((res) => {
          _this.myhead = res.data.data
          location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
      },
      beforeHeadUpload (file) {
         const isJPG = file.type === 'image/jpeg'
         const isLt2M = (file.size / 1024 / 1024) < 2

         if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
         }
         if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
         }
            return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped="scoped">
  input:focus-visible, textarea:focus-visible {
    outline: none;
  }

  input,textarea{
    background-color: #383838!important;
    border: 1px solid #4a4a4a!important;
    color: #d6d6d6;
    padding: 10px 10px;
  }

  .nickname_input {
    width: 400px;
    height: 16px;
    border-radius: 5px;
  }

  .brief_input {
     width: 400px;
     height: 100px;
     border-radius: 5px;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #fff!important;
  }

  img {
    height: 200px;
    width: 200px;
    border-radius: 10px;
  }

  .changeHeadBtn {
    margin-left: 65px;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    background-color: transparent;
    border: 1px solid #4a4a4a;
    color: #d6d6d6;
    margin-top: 15px;
    cursor: pointer;
  }

  .changeHeadBtn:hover {
    background-color: #353535;
  }

  .submitBtn {
    background-color: #ec4141;
    padding: 8px 25px;
    border-radius: 20px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    margin-right: 20px;
  }

  .submitBtn:hover {
    background-color: #d83e3e;
  }

  .cancelBtn {
    padding: 8px 25px;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid #4a4a4a;
    color: #d6d6d6;
    margin-top: 15px;
    cursor: pointer;
  }

  .cancelBtn:hover {
    background-color: #353535;
  }
</style>
