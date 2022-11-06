<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return{
      message:'',
      show:false
    }
  },
  methods:{
    isShow(message = '默认文字',duration = 2000){
      this.show = true;
      this.message = message;
      setTimeout(() => {
        this.show = false;
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  padding: 15px 25px;
  color: #fff;
  background: rgba(00,00,00,.8);
}
</style>