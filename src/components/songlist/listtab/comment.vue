<template>
  <div>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="textarea"
      maxlength="140"
      show-word-limit
      background-color="#444"
      height="100"
    >
    </el-input>
    <button class="checkBtn">评论</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        textarea: ''
      }
    }
  }
</script>

<style scoped="scoped">
  .el-textarea__inner {
    background-color: #444444!important;
    border: 1px solid #272727!important;
  }

  .el-input__count {
    background-color: #444!important;
  }

  .checkBtn {
    float: right;
    height: 37px;
    width: 100px;
    margin-left: 15px;
    border-radius: 20px;
    background-color: transparent;
    color: #D6D6D6;
    border: 1px solid #444;
    cursor: pointer;
    margin-top: 15px;
  }
</style>
