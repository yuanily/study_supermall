<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @click="titleClick"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info ="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childPage/DetailNavBar";
import DetailSwiper from "views/detail/childPage/DetailSwiper";
import DetailBaseInfo from "views/detail/childPage/DetailBaseInfo";
import DetailShopInfo from "views/detail/childPage/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childPage/DetailGoodsInfo";
import DetailParamInfo from 'views/detail/childPage/DetailParamInfo';
import DetailCommentInfo from 'views/detail/childPage/DetailCommentInfo';

import Scroll from "components/common/scroller/Scroller";
import GoodsList from "components/contents/goods/GoodsList"

import { getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";
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
    GoodsList
  },
  name: "detail",

  data() {
    return {
      idd: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{},
      themImgListenr:[],
      commentInfo:{},
      recommends:[]
    };
  },
  created() {
    this.idd = this.$route.params.iid;
    // 根据idd请求详情数据
    getDetail(this.idd).then((res) => {
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
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论的信息
      if(data.rate.cRate !== 0 ){
        this.commentInfo = data.rate.list[0]
      }
    });

    // 获取推荐
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;

    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(){

    }
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