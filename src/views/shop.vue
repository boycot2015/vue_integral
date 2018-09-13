<template>
  <div class="shop-container">
    <div class="search-box">
      <van-search v-model="value" 
      placeholder="请输入搜索关键词" 
      show-action @search="onSearch">
      <van-icon slot="action" name="grid" @click="changeLayOut" />
      </van-search>
    </div>
    <div class="nav-list">
      <van-tabs v-model="active">
        <van-tab title="综合"></van-tab>
        <van-tab title="时间"></van-tab>
        <van-tab title="价格"></van-tab>
        <van-tab title="筛选"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="goods-content">
        <lazy-component>
          <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
            <van-cell-group>
                <router-link :to="'/detail?id='+item.id" 
                v-for="(item,index) in goodsList" :key="index">
                  <van-cell >
                    <template slot="title">
                      <div class="img">
                          <img  v-lazy="item.imgUrl" alt=""/>
                          <span v-if="item.type==='jd'" class="icon-jd"></span>
                          <p v-if="item.status==='soldOut'" class="no-goods">区域无货</p>
                      </div>
                    </template>
                    <div class="txt tl">
                      <p class="name line-clamp2">{{item.name}}</p>
                      <span class="price"><i>{{item.price}}</i>积分</span>
                      <span class="cart">
                        <van-icon name="cart" size="20px"/>
                      </span>
                    </div>
                  </van-cell>
                </router-link>
            </van-cell-group>
          </van-list>
        </lazy-component>
      </div>
    </van-pull-refresh>
  </div>
</template>
<style lang="scss" scoped>
.search-box {
  position: fixed;
  top: 0;
  z-index: 99;
  left: 0;
  width: 100%;
}
.nav-list {
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  z-index: 99;
}
.goods-content {
  margin: 98px 0 50px;
  a {
    display: block;
    border-bottom: 1px solid #f0f0f0;
    &:last-child{
      border-bottom: 0;
    }
  }
  .name {
    font-size: 14px;
    line-height: 20px;
  }
  .img {
    height: 100px;
    width: 100px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background-color: rgba(0, 0, 0, 0.03);
    img {
      width: 100%;
      vertical-align: middle;
    }
    .no-goods {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
    }
  }
  .txt {
    position: relative;
    height: 100%;
    .price{
      position: absolute;
      bottom: 0;
      left: 0;
      i {
        color: #f54040;
        margin-right: 10px;
      }
    }
    .cart {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #f54040;
    }
  }
}
img[lazy=loading] {
    /*width: 100px;*/
    background-position:center center!important;
    background: url("../assets/images/default.png");
    background-size:100px 100px;
    background-repeat:no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
img[lazy=error] {
    /*width: 100px;*/
    background-position:center center!important;
    background: url("../assets/images/error.png");
    background-size:100px 100px;
    background-repeat:no-repeat;

    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.4);
}
img[lazy=loaded] {
    /*width: 100px;*/
    background-position:center center!important;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.03);
}
</style>

<script>
  export default {
    data(){
      return{
        value:'',
        active:0,
        goodsList:[],
        loading: false,
        isLoading:false,
        finished: false
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){
        this.$store.dispatch('getGoodsData')
        .then(res=>{
          console.log(res.data)
          this.goodsList = res.data;
        })
      },
      onSearch(){

      },
      onLoad() {
        setTimeout(() => {
          const element = this.goodsList;
          for (let i = 0; i < 3; i++) {
            var lodingItem = element.slice(i,i+1)[0];
            this.goodsList.push(lodingItem);
          }
          this.loading = false;
          if (this.goodsList.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      changeLayOut(){

      },
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 500);
      }
    }
  }
</script>