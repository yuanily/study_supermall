<template>
  <div class="cart-list">
    <scroll
      class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
      
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroller/Scroller";

import CartListItem from "./CartListItem";
export default {
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated(){
    console.log(11);
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 60px);
}
.content{
  height:100%;
  overflow: hidden;
}
</style>