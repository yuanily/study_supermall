<template>
  <div class="tab-control">
    <div class="tab-control-item" @click="itemClick(index)"  v-for="(item,index) in titles" :key="index" :class="{ active: currentIndex === index}">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            currentIndex:0
        }
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
 .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>