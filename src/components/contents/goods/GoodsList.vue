<template>
  <div class="good-list">
    <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"/>
  </div>
</template>

<script>
import GoodsListItem from 'components/contents/goods/GoodsListItem'
export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>