<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div class="detail">
          <div
            class="titles"
            v-for="(item, index) in titles"
            :key="index"
            :class="{ active: index == currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
      <template v-slot:left
        ><div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" /></div
      ></template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      console.log(index);
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.detail {
  display: flex;
}
.titles {
  font-size: 13px;
  flex: 1;
}
.active {
  color: red;
}
.back img {
  margin-top: 12px;
}
</style>