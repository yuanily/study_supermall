<template>
  <div class="detail-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in topImages"
          :key="index"
        >
          <img :src="item" alt="item" />
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.css"; //引入swiper样式
import Swiper from "swiper";
export default {
  mounted() {
    setTimeout(() => {
      new Swiper(".swiper-container", {
        // eslint-disable-line no-unused-vars
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
      });
    }, 500);
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>