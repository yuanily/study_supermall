<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      :probe-type="3"
      ref="scroll"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childPage/DetailNavBar";
import DetailSwiper from "views/detail/childPage/DetailSwiper";
import DetailBaseInfo from "views/detail/childPage/DetailBaseInfo";
import DetailShopInfo from "views/detail/childPage/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childPage/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childPage/DetailParamInfo";
import DetailCommentInfo from "views/detail/childPage/DetailCommentInfo";
import DetailBottomBar from "views/detail/childPage/DetailBottomBar";

import BackTop from "components/contents/backTop/BackTop";
import Scroll from "components/common/scroller/Scroller";
import GoodsList from "components/contents/goods/GoodsList";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "../../store/utils";

export default {
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
  },
  name: "detail",

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      themImgListenr: [],
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      isShowBackTop: false,
      message:'',
      show:false
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;

      // 1.获取轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 获取推荐
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(
        this.$refs.comment.$el.offsetTop - 44 ||
          this.$refs.recommend.$el.offsetTop - 44
      );
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 500);
  },
  methods: {
    imageLoad() {
      this.getThemeTopY();
      // this.$refs.scroll.refresh()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // 2.position与主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if (
        //   this.currentIndex != i &&
        //   ((i < length - 1 &&
        //     positionY > this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i == length - 1 && positionY > this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        if (
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        // 3.是否回到顶部
        this.isShowBackTop = -position.y > 500 ? true : false;
      }
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中
      this.$store.dispatch("addCart", product)
      this.$toast.show ( `添加商品成功` ) ;
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // 监听图片加载事件
    this.$bus.on("detailItemImgLoad", () => {
      // console.log(data);
      refresh();
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>