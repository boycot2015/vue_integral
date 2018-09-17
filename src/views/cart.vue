<template>
  <div class="cart-container">
   <div class="content">
     <div class="no-cont" v-if="!cartList.length">
       <van-icon name='cart' size='80px' class="cart-icon"></van-icon>
       <p class="title">购物车为空，去商城看看？</p>
       <router-link to="/shop"><van-button type='danger'>点我去商城</van-button></router-link>
     </div>
     <div v-else class="cart-list">
        <lazy-component>
          <van-list >
            <van-cell v-for="(item,index) in cartList" :key="index" @click="selectItem(item)">
              <template slot="title" class="flex1 flex-h">
                  <div class="select-box fl">
                    <van-icon name="select " color="#ccc" v-if="!item.isSelect" size="20px"></van-icon>
                    <van-icon name="selected " color="red" v-else size="20px"></van-icon>
                  </div>
                  <router-link :to="'/detail?id='+item.id" >
                    <div class="img fr">
                        <img  v-lazy="item.imgUrl" alt=""/>
                        <span v-if="item.type==='jd'" class="icon-jd"></span>
                        <p v-if="item.status==='soldOut'" class="no-goods">区域无货</p>
                    </div>
                  </router-link>
              </template>
              <div class="txt tl">
                  <p class="name line-clamp2">{{item.name}}</p>
                <span class="price"><i>{{item.price}}</i>积分</span>
                <span class="cart">
                  <van-stepper
                    v-model="item.initNum"
                    integer
                    :min="1"
                    :max="10"
                    :step="1"
                    @plus="plus(item)"
                    @minus="minus(item)"
                  />
                </span>
                <span class="delete" >
                  <van-icon name="delete" size="20px"></van-icon>
                </span>
              </div>
            </van-cell>
          </van-list>
        </lazy-component>
     </div>
     <van-submit-bar
      :price="3050"
      button-text="提交订单"
      @submit="onSubmit" class="submit-box"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <span slot="tip">
        您的收货地址不支持同城送, <span>修改地址</span>
      </span>
    </van-submit-bar>
   </div>
  </div>
</template>
<style lang="scss">
.van-cell {
  .van-cell__title {
    flex: 1;
  } 
  .van-cell__value {
    flex: 2;
  }
}
  .cart-container{
    text-align: left;
    height: 100%;
    background: #fff;
  }
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
.cart-list {
  margin: 1px 0 50px;
  height: 100%;
  a {
    display: block;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    &:last-child{
      border-bottom: 0;
    }
  }
  .name {
    font-size: 14px;
    line-height: 20px;
    margin-right: 30px;
  }
  .select-box {
    height: 100%;
    line-height: 100%;
    i {
      margin: 35px 0;
    }
  }
  .img {
    height: 80px;
    width: 80px;
    margin: 10px 0;
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
    padding-left: 20px;
    .price{
      position: absolute;
      bottom: 0;
      left: 20px;
      font-size: 14px;
      i {
        color: #f54040;
        font-size: 18px;
        margin-right: 5px;
      }
    }
    .cart,.delete {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #f54040;
    }
    .delete {
      bottom: auto;
      top: 0;
    }
  }
}
.submit-box {
  .van-checkbox {
  padding: 0 10px;

  }
}
</style>

<script>
  import mapGetters from 'vuex';
  export default {
    data(){
      return {
        hasContent:false,
        checked:false,
        cartList:[]
      }
    },
    computed:{
      // ...mapGetters(['getCartData'])
    },
    created(){
      this.getData();
    },
    watch:{
      checked(){
        var select = false;
        this.cartList.forEach(el=>{
          if(el.select){
            select = true;
          }
        })
        if(!select){
          this.selectAll();
        }
      }
    },
    methods:{
      getData(){
        var cartList = this.$store.getters.cartList;
        cartList.forEach(el => {
          el.isSelect = false;
        });
        this.cartList = cartList;
      },
      selectItem(item){
        item.isSelect = !item.isSelect;
        var selectAll = true;
        this.cartList.forEach(el=>{
          if(!el.isSelect){
            selectAll = false;
          }
        })
        if(selectAll){
          this.checked = true;
        }else {
          this.checked = false;
        }
      },
      plus(item){
        item.initNum = item.initNum+1;
        this.$store.dispatch('updateCart',item)
        .then(res=>{
          console.log(res)
          if(res.code==200){
            this.$toast(res.msg);
          }
        })
      },
      onSubmit(){

      },
      selectAll(){
          this.cartList.forEach(el=>{
            el.isSelect = this.checked;
        })
      },
      minus(item){
        item.initNum = item.initNum-1;
        this.$store.dispatch('updateCart',item)
        .then(res=>{
         console.log(res)
          if(res.code==200){
            this.$toast(res.msg);
          }
        })
      }
      
    }
  }
</script>