<template>
  <div>
    <h3>官方榜</h3>
    <div>
      <div>
        <img src="https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg"/>
        <ul>
          <li v-for="(item, index) in first" :key="index">
            <span class="top">{{ index + 1 }}</span>
            <span class="name">{{ item.name }}</span>
            <span class="wy-des" v-for="(des, Aindex) in item.alia" :key="Aindex">{{ des }}</span>
            <span class="author">{{ item.ar[0].name }}</span>
          </li>
        </ul>
      </div>
       <div>
         <img src="https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg"/>
         <ul>
           <li v-for="(item, index) in second" :key="index">
             <span class="top">{{ index + 1 }}</span>
             <span class="name">{{ item.name }}</span>
             <span class="wy-des" v-for="(des, Aindex) in item.alia" :key="Aindex">{{ des }}</span>
             <span class="author">{{ item.ar[0].name }}</span>
           </li>
         </ul>
       </div>

       <div>
         <img src="https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg"/>
         <ul>
           <li v-for="(item, index) in third" :key="index">
             <span class="top">{{ index + 1 }}</span>
             <span class="name">{{ item.name }}</span>
             <span class="wy-des" v-for="(des, Aindex) in item.alia" :key="Aindex">{{ des }}</span>
             <span class="author">{{ item.ar[0].name }}</span>
           </li>
         </ul>
       </div>

       <div>
         <img src="https://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg"/>
         <ul>
           <li v-for="(item, index) in fourth" :key="index">
             <span class="top">{{ index + 1 }}</span>
             <span class="name">{{ item.name }}</span>
             <span class="wy-des" v-for="(des, Aindex) in item.alia" :key="Aindex">{{ des }}</span>
             <span class="author">{{ item.ar[0].name }}</span>
           </li>
         </ul>
       </div>

    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data() {
      return {
        first: [],
        second: [],
        third: [],
        fourth: []
      }
    },
      mounted() {
        this.initRank()
      },
      methods: {
        /**
         * 初始化榜单
         */
        initRank () {
          fetch('http://localhost:3000/playlist/detail?id=5453912201')
          .then(res => res.json())
          .then(res => {
             this.fourth = res.playlist.tracks.slice(0, 5)
          })
          fetch('http://localhost:3000/playlist/detail?id=19723756')
          .then(res => res.json())
          .then(res => {
             this.first = res.playlist.tracks.slice(0, 5)
          })
          fetch('http://localhost:3000/playlist/detail?id=3779629')
          .then(res => res.json())
          .then(res => {
             this.second = res.playlist.tracks.slice(0, 5)
          })
          fetch('http://localhost:3000/playlist/detail?id=2884035')
          .then(res => res.json())
          .then(res => {
             this.third = res.playlist.tracks.slice(0, 5)
          })
        }
      }
  }
</script>

<style scoped="scoped">
  h3 {
    margin-top: 0;
  }

  img {
    height: 180px;
    width: 180px;
    border-radius: 6px;
    float: left;
  }

  ul {
    float: left;
    list-style: none;
    margin-top: 0;
  }

  li {
    padding: 7px 15px;
    width: 750px;
    cursor: pointer;
  }

  .author {
    float: right;
    font-size: 14px;
    color: #666c6c;
  }

  span {
    margin-right: 5px;
  }

  li:hover {
    background-color: #343434;
  }

  .name {
    font-size: 14px;
  }

  .percent {
    font-size: 13px;
    color: #666c6c;
  }

  .top {
    color: #bd3d41;
    font-size: 14px;
  }

  .number {
    color: #666c6c;
    font-size: 14px;
  }

  .wy-des {
    color: #666c6c;
  }


</style>
