<template>
  <div ref="wrapper">
    <div><slot></slot></div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroller: {
        type: Object,
        default() {
          return {};
        },
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false;
        },
      },
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    setTimeout(() => {
      this.scroller = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true, //点击事件在移动端的scroller中滚动时候不生效，需要添加click:true.
      });

      // 监听滚动的位置
      if(this.probeType === 2||this.probeType === 3){
        this.scroller.on("scroll", (position) => {
        this.$emit("scroll", position);
      });

      //监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroller.on('pullingUp',() =>{
          this.$emit('pullingUp')
        })
      }

      }
    }, 500);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      setTimeout(() => {
        this.scroller && this.scroller.scrollTo(x, y, time);
      },500)
    },
    finishPullUp() {
      setTimeout(() => {
        this.scroller.finishPullUp()||this.scroller
      },500)
    },
    refresh() {
      setTimeout(() => {
        this.scroller.refresh();
      }, 500);
    },
    getScrollY() {
      return this.scroller ? this.scroller.y : 0
    }
  },
};
</script>

<style></style>
