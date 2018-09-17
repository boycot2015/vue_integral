import Vue from "vue";
import Vuex from "vuex";
// import app from "./modules/app";
import user from "./modules/user";
import goodsData from "./modules/shop";
import cart from "./modules/cart";
// import permission from "./modules/permission";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // app,
    user,
    goodsData,
    cart
  },
  getters
});

export default store;
