<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll"></check-button>
      <span @click="checkClick()">全选</span>
    </div>
    <div>合计：{{ totalPrice }}</div>
    <div class="num">计算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/contents/checkButton/CheckButton";
import { mapGetters } from 'vuex';
export default {
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if(this.cartList.length == 0) return false;
      return !this.cartList.filter((item) => !item.checked).length;
    },
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 60px;
  background: #eee;
  position: relative;
  line-height: 60px;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  line-height: 20px;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.num {
  position: absolute;
  right: 0;
  padding: 0 10px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>
