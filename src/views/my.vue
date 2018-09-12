<template>
<div class="my-container">
  <div class="header flex-h">
    <div class="img">
      <img v-lazy="userInfo.imgUrl" alt=""/>
    </div>
    <div class="text ">
      <p class="name" v-if="userInfo.account">用户名：{{userInfo.account}}</p>
      <p class="name" v-else >用户名：{{userInfo.phone}}</p>
      <p class="time">登录时间：{{userInfo.date}}</p>
    </div>
  </div>
  <div class="item-list">
    <van-cell-group>
      <van-cell value="" is-link to="/order">
        <template slot="title">
          <span class="van-cell-text">我的订单</span>
          <!-- <van-tag type="danger">2</van-tag> -->
        </template>
        <span class="more">查看全部订单</span>
      </van-cell>
    </van-cell-group>
    <div class="item order-links flex-h align-c">
      <router-link to="/pay" class="flex-v align-c flex1">
        <van-icon class="flex1 " name="pending-payment" />
        <span class="name flex1">待支付</span>
      </router-link>
      <router-link to="/send" class="flex-v align-c flex1">
        <van-icon class="flex1 " name="pending-deliver" />
        <span class="name flex1">待发货</span>
      </router-link>
      <router-link to="/recieve" class="flex-v align-c flex1">
        <van-icon class="flex1 " name="tosend" />
        <span class="name flex1">待收货</span>
      </router-link>
      <router-link to="/sold" class="flex-v align-c flex1">
        <van-icon class="flex1 " name="after-sale" />
        <span class="name flex1">退货/售后</span>
      </router-link>
    </div>
  </div>
  <div class="item-list">
    <van-cell-group>
      <van-cell title="优惠券" icon="coupon" is-link to="/coupon"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="收货地址管理" icon="location" is-link to="/address"/>
    </van-cell-group>
  </div>
  <div class="item-list">
     <van-cell-group>
      <van-cell title="设置" icon="settings" is-link to="/setting"/>
    </van-cell-group>
  </div>
  <div class="item-list btn-box">
    <van-button type="danger" plain class="logout-btn" size="large" @click="logout">退出登录</van-button>
  </div>
</div>
</template>
<style lang="scss" scoped>
.my-container {
  .header {
    padding: 20px;
    background: #fff;
    margin-bottom: 10px;
    .img {
      width: 75px;
      height: 75px;
      overflow: hidden;
      border-radius: 75px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .text {
      text-align: left;
      padding: 10px 0;
      p{
        font-size: 14px;
        &.name {
          font-size: 16px;
          color: #333;
          margin-bottom: 20px;
        }
        &.time {
          color: #999;
        }
      }
    }
  }
  .item-list {
    background: #fff;
    margin-bottom: 10px;
    text-align: left;
    .more {
      color: #999;
    }
    .order-links {
      line-height: 30px;
      font-size: 14px;
      padding: 10px;
      .name {
        color: #333;
      }
      .van-icon {
        color: #f54040;
        font-size: 24px;
      }
    }
  }
  .btn-box {
    text-align: center;
    padding-top: 10px;
    background: #fff;
    margin-bottom: 0;
  }
  .logout-btn {
    height: 40px;
    line-height: 40px;
    width: 90%;
  }
}
</style>

<script>
  export default {
    data(){
      return {
        userInfo:{}
      }
    },
    created(){
      this.getUserInfo();
    },
    methods:{
      getUserInfo(){
        this.$store.dispatch('GetInfo')
        .then(res=>{
          console.log(res);
          this.userInfo = res.data;
        })
      },
      logout(){
        this.$store.dispatch('LogOut').then(()=>{
          this.$router.push('/login');
        })
      }
    }
  }
</script>
