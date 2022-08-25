<template>
  <div id="home">
    <nav-bar class="home-nav"
      ><template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
      ref="tabControl1"
    />
    <scroller
      class="home-scroller"
      ref="scroller"
      @scroll="getPosition"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommon"></recommend-view>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods"/>
    </scroller>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from "network/home"; // 路径要匹配对上!!!
import { debounce } from "../../store/utils";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/contents/tabControl/TabControl";
import GoodList from "components/contents/goods/GoodsList";
import Scroller from "components/common/scroller/Scroller";
import BackTop from "components/contents/backTop/BackTop";

import HomeSwiper from "views/home/childPage/HomeSwiper";
import RecommendView from "views/home/childPage/RecommendView";
import FeatureView from "views/home/childPage/FeatureView";

export default {
  data() {
    return {
      banners: [],
      recommon: [],
      goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroller.scrollTo(0, this.saveY, 0);
    this.$refs.scroller.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroller.getScrollY();

  },
  created() {
    // banner\推荐
    this.getData();
    // 商品
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroller,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // 网络请求
    getData() {
      // 也可以用原生的直接写路径请求
      getHomeMultidata({}).then((res) => {
        this.banners = res.data.banner;
        this.recommon = res.data.recommon;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroller.finishPullUp();
      });
    },
    // 事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroller.scrollTo(0, 0);
    },
    getPosition(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 500 ? true : false;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      // this.$refs.scroller.scroller.refresh()
      setTimeout(() => {
        //  this.getHomeGoods(this.currentType)
        this.$refs.scroller.scroller.refresh();
      }, 1500);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scroller.refresh, 500);
    // 监听图片加载事件
    this.$bus.on("homeitemImageLoad", () => {
      // console.log(data);
      refresh();
    });
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 10;
}

.home-scroller {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 65px;
  right: 0;
  left: 0;
}

.tab-control {
  position: relative;
  z-index: 10;
}
</style>
