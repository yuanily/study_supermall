<template>
  <div class="tab-item" @click="itemClick">
    <div :class="{active: isActive}">
       <slot name="item-icon"></slot>
       <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
        // isActive:false  
    }
  },
  props: {
    path: {
        type: String,
    },
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  computed:{
     isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
  }
}
</script>

<style>
.tab-item{
  flex:1;
  height: 49px;
  text-align: center;
  font-size: 14px;
  color:black;
  margin-top: 10px;
    font-size: 15px;
}

.iconfont.item-icon{
  display: inline-block;
  width: 25px;
  height: 25px;
  font-size: 20px;
}
.active{
  color:red
}
</style>