<template>
  <div class='details-container'>
    <div class="banner">
      <van-swipe 
      @change="onChange" 
      :height="300"
      :autoplay="3000">
        <van-swipe-item  v-for="(image ,index) in bannerList" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="desc-content">
      <van-cell-group class="section">
        <van-cell class="tl">
          <p class="name line-clamp2 color33">{{detailsData.name}}</p>
          <p class="price"><i class="red">{{detailsData.price}}</i>积分</p>
        </van-cell>
      </van-cell-group>
       <van-cell-group class="section">
            <!-- 优惠券单元格 -->
        <van-coupon-cell
          v-if="detailsData.hasDiscount"
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          class="tl"
          @click="showList = true"
        />
        <!-- 规格选择单元格 -->
        <van-cell title="规格选择" class="tl" is-link  @click="showSKU = true"/>
        <!-- 参数详情单元格 -->
        <van-cell title="参数详情" class="tl" is-link  @click="showParamsList = true"/>
         <!-- 服务单元格 -->
        <van-cell  class="tl serve " is-link  @click="showServeList = true">
          <div class="left line-clamp1">
          <span class="title">服务</span>
          <span class="name "
          v-for=" (item,index) in serveInfo" 
          :key="index">
          · {{item.name}}     
           <div class="img" v-show="isOver">
             服务单元格
             <img src="http://img.limofang.cn/2016/5/2824179677167535743.jpg" alt="">
           </div>
          </span>
          </div>
        </van-cell>
       </van-cell-group>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="cart" text="购物车" :info="cartNum" @click="onClickCartBtn" />
      <van-goods-action-big-btn v-if="detailsData.status=='selling'" text="加入购物车" @click="onClickBigBtn" />
      <van-goods-action-big-btn v-if="detailsData.status=='selling'" text="立即购买" @click="onClickBigBtn" primary />
      <van-button size="large" v-else text="区域无货" disabled />
    </van-goods-action>

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" 
    position="bottom">
      <van-coupon-list
        :close-button-text="'取消'"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChangeCoupon"
        @exchange="onExchange"
      />
    </van-popup>

    <!-- 服务列表 -->
    <van-actionsheet
      title="基础保障" class="serve-title"
      v-model="showServeList">
         <van-cell-group class="section item">
          <van-cell class="tl color33"  v-for="(item ,index) in serveInfo" :key="index">
            <p class="name">{{item.name}}</p>
            <p class="desc">{{item.subname}}</p>
          </van-cell>
        </van-cell-group>
        <van-button @click="showServeList = false" size="large">取消</van-button>
      </van-actionsheet>
    <!-- 规格选择列表 -->
      <van-sku
        v-model="showSKU"
        :sku="sku"
        :goods="goods"
        :goods-id="skuData.goodsId"
        :hide-stock="sku.hide_stock"
        @buy-clicked="onBuyClicked"
        @stepper-change="getInitNum"
        @add-cart="onAddCartClicked"
      />
    <!--  参数详情列表 -->
    <van-actionsheet
      title="参数详情" class="serve-title"
      v-model="showParamsList">
         <van-cell-group class="section item">
            <van-cell title="品牌" class="tl color33">
            <p class="name tl">{{detailsData.brand}}</p>
          </van-cell>
          <van-cell title="名称" class="tl color33">
            <p class="name tl">{{detailsData.name}}</p>
          </van-cell>
          <van-cell title="库存" class="tl color33">
            <p class="name tl" v-if="detailsData.status==='selling'">有货</p>
            <p class="name tl" v-else>无货</p>
          </van-cell>
        </van-cell-group>
        <van-button @click="showParamsList = false" size="large">取消</van-button>
      </van-actionsheet>
  </div>
</template>
<style lang='scss' scoped>
  .details-container{
    margin-bottom: 60px;
    text-align: left;
  }
  .serve-title {
    font-size: 18px;
    color: #051b28;
  }
  .section.item {
      .name {
        font-size: 16px;
        color: #051b28;
      }
      .desc{
        font-size: 14px;
        color: #999;
      }
  }
  .desc-content {
    .section {
      margin-bottom: 10px;
      
    }
    .serve {
      height: 44px;
      .left {
        overflow: hidden;
        position: relative;
      }
      .title {
        font-size: 14px;
        color: #333;
        margin-right: 10px;
      }
      .name {
        font-size: 12px;
        color: #666;
        margin: 0 5px;
        // display: inline;
        position: relative;
        div{
          background: #666;
          position: absolute;
          top: 0;
          left: 0;
          height: 30px;
          width: 100%;
          background: #fff;
          img {
            width: 100%;
          }
        }
      }
    }
    .price {
      color: #333;
      margin-top: 10px;
      i{
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
</style>
<script>
const coupon = {
  "available": 1,
  "discount": 60,
  "denominations": 0,
  "originCondition": 0,
  "reason": "",
  "value": 361,
  "name": "6折优惠券",
  "startAt": 1489104000,
  "endAt": 1514592000
};
const sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: '颜色', // skuKeyName：规格类目名称
      v: [
        {
          id: '30349', // skuValueId：规格值 id
          name: '红色', // skuValueName：规格值名称
          imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
        },
        {
          id: '1215',
          name: '蓝色',
          imgUrl: 'https://img.yzcdn.cn/2.jpg'
        }
      ],
      k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
      s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
      s3: '0', // 最多包含3个规格值，为0表示不存在该规格
      stock_num: 110, // 当前 sku 组合对应的库存
      coupon:{}
    }
  ],
  price: '1.00', // 默认价格（单位元）
  stock_num: 227, // 商品总库存
  collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
  none_sku: false, // 是否无规格商品
  hide_stock: true // 是否隐藏剩余库存
}
export default {
  components: {},
  props: {

  },
  data() {
    return {
      sku:sku,
      detailsData:{},
      bannerList:[],
      chosenCoupon: -1,
      selectCoupons:{},
      coupons: [],
      showList:false,
      showServeList:false,
      showParamsList:false,
      showSKU:false,
      colors:[],
      serveInfo:[],
      initNum:1,
      cartNum:0,
      disabledCoupons: [],
      isOver:false,
      goods: {
      // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      },
      skuData: {
        // 商品 id
        goodsId: '946755',
        // 选择的商品数量
        selectedNum: 1,
        // 选择的 coupons 
        coupons:{}
      }
    };
  },
  created() {
    this.getData();
    this.cartNum = this.$store.getters.cartList.length;
  },
  methods: {
    getData(){
      var id = this.$route.query.id;
      this.skuData.goodsId = id;
      this.$store.dispatch('getGoodsData',id)
      .then(res=>{
       this.detailsData = res.data;
      //  console.log(res.data)
       coupon.value = res.data.price*(100-coupon.discount)/100;
       this.bannerList = res.data.bannerImgUrl;
       this.serveInfo = res.data.serveInfo;
       this.size = res.data.size;
       this.colors = res.data.colors;
       var coupons = res.data.coupons;
       coupons.forEach(el => {
         if (el.available) {
            this.coupons.push(el);
        } else {
          this.disabledCoupons.push(el);
        }
       });
      });
    },
    onClickCartBtn(){
      this.$router.push('/cart')
    },
    onClickMiniBtn() {
      this.showSKU = true
    },
    onChange(){

    },
    onClickBigBtn() {
      this.showSKU = true
    },
     onChangeCoupon(index) {
      this.showList = false;
      this.chosenCoupon = index;
      this.selectCoupons = this.coupons[index];
    },
    onExchange(code) {
      if(code!='888888'){
        this.$toast('你输入的优惠券不存在！');
        return;
      }
      this.coupons.push(coupon);
    },
    showImg(){
      this.isOver = true;
    },
    getInitNum(val){
      this.initNum = val;
    },
    onBuyClicked(){
      this.$router.push('/order');
    },
    onAddCartClicked(){
      var cartData = {};
      this.cartNum += this.initNum;

      this.initNum = this.initNum||1;
      cartData.id = this.$route.query.id;
      cartData.initNum = this.initNum||1;
      cartData.price = this.detailsData.price;
      cartData.imgUrl = this.detailsData.imgUrl;
      cartData.desc = this.detailsData.desc;
      cartData.name = this.detailsData.name;
      cartData.type = this.detailsData.type;
      cartData.status = this.detailsData.status;
      cartData.hasDiscount = this.detailsData.hasDiscount;
      cartData.isHot = this.detailsData.isHot;
      cartData.selectCoupons = this.selectCoupons;
      this.$store.dispatch('addCart',cartData).then(res=>{
       if(res.code==200){
         this.$toast(res.msg);
       }else {
         this.$toast(res.error);
       }
      })
      this.showSKU = false
    }
  }
};
</script>