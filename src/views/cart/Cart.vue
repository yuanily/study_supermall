<template>
  <div class="cart-list">
    <nav-bar class="home-nav"
      ><template v-slot:center>购物街({{ length }})</template>
    </nav-bar>
    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from "views/cart/childPage/CartList";
import CartBottomBar from "views/cart/childPage/CartBottomBar";
import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";
export default {
  components: {
    CartList,
    NavBar,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
    ...mapGetters({ length: "cartLength", List: "cartList" }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight:700;
}
</style>