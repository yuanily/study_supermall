<template>
  <tab-bar>
      <tar-bar-item path="/home">
        <template v-slot:item-icon>
          <div class="item-icon iconfont icon-shouye"></div>
        </template>
        <template v-slot:item-text>
          <div class="item-text" slot="item-text">首页</div>
        </template>
      </tar-bar-item >
      <tar-bar-item path="/category">
        <template v-slot:item-icon>
          <div class="item-icon iconfont icon-fenlei"></div>
        </template>
        <template v-slot:item-text>
          <div class="item-text" slot="item-text">分类</div>
        </template>
      </tar-bar-item>
      <tar-bar-item path="/cart">
        <template v-slot:item-icon>
          <div class="item-icon iconfont icon-gouwuche"></div>
        </template>
        <template v-slot:item-text>
          <div class="item-text" slot="item-text">购物车</div>
        </template>
      </tar-bar-item>
      <tar-bar-item path="/profile">
        <template v-slot:item-icon>
          <div class="item-icon iconfont icon-wode"></div>
        </template>
        <template v-slot:item-text>
          <div class="item-text" slot="item-text">我的</div>
        </template>
      </tar-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tarbar/tarBar.vue';
  import TarBarItem from 'components/common/tarbar/tarBarItem.vue';
  export default{
    components:{
      TabBar,
      TarBarItem
    }
  }
</script>