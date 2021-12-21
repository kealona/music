<template>
  <div style="padding-left: 20px;color: #dfdfdf;">
    <h1>我的电台</h1>
    <h4>我创建的电台 <span class="number">(1)</span></h4>
    <ul class="item_list">
      <li class="item_li">
        <ul class="content">
          <li>
            <img src="../../assets/song/small1.jpg"/>
          </li>
          <li>
            <span class="name">恋一世的爱</span>
          </li>
          <li>
            <span class="album">订阅 12</span>
          </li>
          <li>
            <span class="number">节目 5</span>
          </li>
        </ul>
      </li>
        </ul>
      </li>
    </ul>
    <h4>我订阅的电台 <span class="number">(2)</span></h4>
    <ul class="item_list">
      <li class="item_li">
        <ul class="content">
          <li>
            <img src="../../assets/song/small1.jpg"/>
          </li>
          <li>
            <span class="name">恋一世的爱</span>
          </li>
          <li>
            <span class="album">By Mustard</span>
          </li>
          <li>
            <span class="number">节目 12</span>
          </li>
        </ul>
      </li>
      <li class="item_li">
        <ul class="content">
          <li>
            <img src="../../assets/song/small1.jpg"/>
          </li>
          <li>
            <span class="name">恋一世的爱</span>
          </li>
          <li>
            <span class="album">By 你的胡萝北</span>
          </li>
          <li>
            <span class="number">节目 55</span>
          </li>
        </ul>
      </li>
        </ul>
  </div>
</template>

<script>
</script>

<style scoped="scoped">
  .number {
    font-size: 13px;
    color: #444!important;
  }

  .item_list {
    margin-top: 15px;
    list-style: none;
    padding: 0;
  }

  .item_list li {
    height: 75px;
    padding: 5px 10px;
  }

  .item_li:hover {
    background-color: #373737;
  }

  .item_list span {
    margin-top: 25px;
    float: left;
  }

  .item_list img {
    height: 65px;
    width: 65px;
    border-radius: 10px;
    float: left;
    margin-right: 5px;
  }

  .name {
    font-size: 15px;
  }

  .album {
    color: #a5a7a8;
    font-size: 14px;
  }

  .content {
    padding: 0;
    margin: 0;
  }

  .content li{
    float: left;
    list-style: none;
  }

  .content li:nth-child(2) {
    width: 400px;
  }

  .content li:nth-child(3) {
    width: 300px;
  }
</style>
