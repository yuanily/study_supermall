<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    /* background-color: red; */
    border-radius: 50%;
    border: 2px solid #aaa;
    /* line-height: 20px; */
  }

  .check{

    background-color: red;
    overflow: hidden;
  }
</style>