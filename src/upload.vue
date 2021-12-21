<template>
  <upload :list="file_list"
         :multiple="true"
         :action="uploadUrl"
         :on-error="uploadError"
         :on-success="bannerPicSuccess"
         :before-upload="beforeAvatarUpload"
         @update="updateFile"></upload>
</template>

<script>
  export default {
    data() {
      return {
        banner_list: [], //ele用的
        file_list: [], //自己用的
        bargain: {
          share_image: ""
        },
        number: ""
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      // 上传图片路径
      uploadUrl() {
        return `${process.env.VUE_APP_API_ROOT}upload`;
      },
      // 图片长传-之前
      beforeAvatarUpload(file) {
        let self = this;
        let type_arr = ["image/jpeg", "image/png"];
        let type = file.type;
        if (!type_arr.includes(type)) {
          this.$message.error("图片格式不正确,只支持jpg和png类型图片");
          return false;
        }
        const is_size = new Promise((resolve, reject) => {
         /* let width = 400;
          let height = 320; */
          let img = new Image();
          img.src = window.URL.createObjectURL(file);
          img.onload = () => {
            /* Loading.service({ fullscreen: true, text: "图片上传中，请稍后" }); */
            /* let valid = img.width === width && img.height === height;
            if (valid) {
              
              resolve(file);
            } else {
              self.$message.error("请上传400*320px大小的图片!");
              reject();
            } */
          };
        });
        return is_size;
      },
      // Banner图-成功
      bannerPicSuccess(res) {
        this.bargain.share_image = res.data;
        Loading.service({ fullscreen: true }).close();
        this.file_list.push(res.data);
      },
      // Banner图片上传报错
      uploadError() {
        this.$message.error("上传失败，请重新上传");
        Loading.service({ fullscreen: true }).close();
      },
      updateFile(val) {
        this.file_list = val;
        console.log(this.file_list);
      }
    }
  };
</script>

<style>
</style>
