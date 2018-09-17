<template>
  <div id="app">
   <transition name="fold">
      <router-view v-show="show" />
   </transition>
    <van-tabbar v-model="active" v-if="login">
      <van-tabbar-item icon="home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="shop" to="/shop">商城</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart" :info="cartList.length">购物车</van-tabbar-item>
      <van-tabbar-item icon="my" to="/my" info="20">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f5f5;
  overflow: hidden;
  .van-tabbar {
    height: 50px;
    .van-tabbar-item--active {
      color: #f54040;
    }
    .van-tabbar-item__icon {
      font-size: 16px;
      position: relative;
      margin-bottom: 5px;
    }
    .van-tabbar-item__text {
      font-size: 14px;
    }
  }
}
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
}
@keyframes fold-in {
  0% {
    transform: translateX(100%);
  }
  100% {
   transform: translateX(0);
  }
}
@keyframes fold-out {
   0% {
    transform: translateX(-100%);
  }
  100% {
   transform: translateX(0);
  }
}
</style>
<script>
import mapGetters from 'vuex';
export default {
  data() {
    return {
      active: 0,
      show:true,
      login:true,
      icon: {
        normal: "//img.yzcdn.cn/icon-normal.png",
        active: "//img.yzcdn.cn/icon-active.png"
      }
    };
  },
  watch:{
    $route(to){
      this.login = to.meta.login;
      if(to.path=='/'){
        this.active = 0;
      }
      if(to.path=='/shop'){
        this.active = 1;
      }
      if(to.path=='/cart'){
        this.active = 2;
      }
      if(to.path=='/login'){
        this.login = false;
      }
    }
  },
  computed:{
    cartList () {
    return this.$store.getters.cartList
    }
    // ...mapGetters(['cartList'])
  },
  created(){
    this.login = this.$route.meta.login;
    let path = this.$route.path;
    this.getCartNum();
    if(path=='/'){
        this.active = 0;
      }else if(path=='/shop'){
        this.active = 1;
      }else if(path=='/cart'){
        this.active = 2;
      }else {
        this.active = 3;
      }
  },
  methods:{
    getCartNum(){
      this.cartNum = this.$store.getters.cartList.length;
    }
  }
};
</script>
