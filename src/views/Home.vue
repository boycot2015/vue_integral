<template>
  <div class="home">
    <van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <van-swipe :autoplay="3000" :height="300">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" height="220" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style lang="scss" >
.home {
  .van-swipe__indicators {
    bottom: 1rem;
    .van-swipe__indicator {
      border-radius: 100%;
      background-color: #e8e8e8;
      width: 0.6rem;
      height: 0.6rem;
      margin: 0 0.2rem;
      &.van-swipe__indicator--active {
        background-color: #666;
      }
    }
  }
  .van-cell {
    height: 30px;
  }
}
</style>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      value: "",
      images: ["https://img.yzcdn.cn/2.jpg", "https://img.yzcdn.cn/2.jpg"]
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
