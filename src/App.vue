<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from "components/contents/maintarbar/MainTarBar.vue";
export default {
  components: {
    MainTarBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/fonts/iconfont.css";
</style>
