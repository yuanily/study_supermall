<template>
  <div class="cart-list">
    <Scroll>
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </Scroll>
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
};
</script>

<style scoped>
.cart-list {
  height: 100%;
}
</style>