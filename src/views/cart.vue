<template>
  <div class="cart-container">
   <div class="content">
     <div class="no-cont" v-if="!hasContent">
       <van-icon name='cart' size='80px' class="cart-icon"></van-icon>
       <p class="title">购物车为空，去商城看看？</p>
       <router-link to="/shop"><van-button type='danger'>点我去商城</van-button></router-link>
     </div>
   </div>
  </div>
</template>
<style lang="scss" scoped>
.no-cont {
  padding: 150px 20px;
  margin: 0 auto;
  background: #fff;
  .cart-icon {
    color: #f54040;
  }
  .title {
    font-size: 16px;
    margin: 40px 0;
  }
}
</style>

<script>
  export default {
    data(){
      return {
        hasContent:false
      }
    }
  }
</script>