<template>
  <div>
    <div>
      <ul>
        <li>
          <span class="title">语种：</span>
        </li>
        <li>
          <span class="sort">全部</span>
        </li>
        <li>
          <span class="sort">欧美</span>
        </li>
        <li>
          <span class="sort">日本</span>
        </li>
        <li>
          <span class="sort">韩国</span>
        </li>
        <li>
          <span class="sort">其他</span>
        </li>
      </ul>
      <br>
      <ul>
        <li>
          <span class="title">分类：</span>
        </li>
        <li>
          <span class="sort">男歌手</span>
        </li>
        <li>
          <span class="sort">女歌手</span>
        </li>
        <li style="width: 80px">
          <span class="sort" >乐队组合</span>
        </li>
      </ul>
    </div>
    <br>
    <div>
      <div class="content_list">
        <div class="item" v-for="(item, index) in singerlist" :key="index">
          <div style="overflow: hidden;border-radius: 4px;">
            <img id="cover" v-lazy="item.picUrl" />
          </div>
          <span class="item_name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'singer',
    data() {
      return {
        singerlist: [],     //歌手列表
      }
    },
    created() {
      this.initSingers()
    },
    methods: {
      initSingers() {
        fetch('http://localhost:3000/top/artists')
        .then((res) => res.json())
        .then(res => {
          this.singerlist = res.artists
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .title {
    font-size: 13px;
    margin-right: 20px;
    color: #fff;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 10px;
  }

  li {
    float: left;
    width: 60px;
    font-size: 14px;
  }

  li span {
    cursor: pointer;
    color: #909399;
  }

  .sort {
    padding: 5px 8px;
  }

  .sort:hover {
    color: #fff;
  }

  .sort:active {
    color: #e1342e;

  }

  .content_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .item {
    width: 150px;
    height: 210px;
    margin-right: 40px;
    font-size: 14px;
    margin-bottom: 20px;
    color: #d6d6d6;
    cursor: pointer;
  }

  .item span:hover {
    color: #fff;
  }

  .item img {
    border-radius: 4px;
    display: block;
    height: 150px;
    width: 150px;
  }
</style>
