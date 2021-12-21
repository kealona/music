<template>
  <div style="height: 100%;">
    <el-row>
      <el-col :span="24">
        <div class="demo-fit">
          <div class="block" v-for="fit in fits" :key="fit">
            <el-avatar shape="square" :size="180" :fit="fit" :src="url"></el-avatar>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="warning" @click="dialogVisible = true">修改</el-button>
        </div>
      </el-col>
    </el-row>
    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
      :before-upload="beforeAvatarUpload" :auto-upload="false" :on-change="getImgUrl" :file-list="fileList" ref="upload"
      accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF" :http-request="uploadImg">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <div v-else class="avatar"></div>
      <span style="display: block;position: absolute;color: #8D8D8D;font-size: 11px;">PS：请添加个人照片</span>
    </el-upload>
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">

          </div>
        </el-col>
      </el-row>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        fileList: [],
        fits: ['fill'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        dialogVisible: false,
        form: {
          name: ''
        }
      }
    },
    methods: {
      clickIt() {
        console.log('点击')
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      beforeAvatarUpload(file) {
        const isLt20M = file.size / 1024 / 1024 < 8;

        if (!isLt20M) {
          this.$message.error('上传图片大小不能超过 8MB!');
        }
        return isLt20M;
      },
      getImgUrl(file, fileList) {
        console.log('图片上传')
        let imgSize = Number(file.size / 1024 / 1024);
        if (imgSize > 8) {
          this.$message.error('上传图片大小不能超过 8MB!');
        } else {
          let URL = null
          if (window.createObjectURL != undefined) {
            // basic
            URL = window.createObjectURL(file.raw);
          } else if (window.URL != undefined) {
            // mozilla(firefox)
            URL = window.URL.createObjectURL(file.raw);
          } else if (window.webkitURL != undefined) {
            // webkit or chrome
            URL = window.webkitURL.createObjectURL(file.raw);
          }
          file.url = URL
          this.imageList = fileList.slice(-1);
          this.imageUrl = URL
        }

      },
      uploadImg(param) {
        if (param.file) {
          let data = new FormData()
          data.append('file', param.file)
          data.append('phone', this.phone)
          this.$http.post('/user/upload', data, {
              transformRequest: function(data) {
                return data;
              },
              headers: {
                "Content-Type": 'multipart/form-data'
              }
            })
            .then((res) => {
              if (res.data.code != 200) {
                this.$message.error('头像提交失败')
              } else {
                this.updateInfo(res.data.data)
              }
            })
        }
      }
    }
  }
</script>

<style>
  span {
    display: inline-block;

  }

  .name {
    width: 80px;
    text-align: left;
  }

  .el-row {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .avatar-uploader {
    width: 50px;
    height: 50px;
    border: 1px dashed #333;
    cursor: pointer;
  }
</style>
