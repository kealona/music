<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #app {
    padding: 0;
  }
</style>
