<template>
  <div class="bottom-bar">
    <div>
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div>合计：{{totalPrice}}</div>
  </div>
</template>

<script>
import CheckButton from "components/contents/checkButton/CheckButton";
export default {
  components: {
    CheckButton,
  },
  computed:{
    totalPrice(){
      return '￥'+this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item)=>{
        return item.price*item.count
      },0)
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: red;
  position: relative;
}
.check-button {
  width: 20px;
  height: 20px;
}
</style>