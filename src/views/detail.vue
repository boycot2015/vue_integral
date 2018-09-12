<template>
  <div class='details-container'>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" />
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn" />
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
    </van-goods-action>
  </div>
</template>
<style lang='scss' scoped>
</style>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    onClickMiniBtn() {
      Toast('点击图标');
    },
    onClickBigBtn() {
      Toast('点击按钮');
    }
  }
};
</script>