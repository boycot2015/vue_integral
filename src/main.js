import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex";
import Vant from "vant";
import Axios from "axios";
import "./mock";
import "vant/lib/vant-css/index.css";
import "./assets/css/main.css";
import "./assets/js/flexible";
import commonObj from "./assets/js/common";
import { Swipe, SwipeItem } from "vant";
// 懒加载
import VueLazyload from "vue-lazyload";
import { Lazyload } from "vant";
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: "./assets/images/default.png",
  loading: "./assets/images/error.png",
  attempt: 1
});

Vue.prototype.$common = commonObj;
// options 为可选参数，无则不传
// const options = {
//   loading: "334",
//   listenEvents: null
// };
Vue.use(Lazyload, {
  error: "./assets/images/default.png",
  loading: "./assets/images/error.png"
});
Vue.prototype.$http = Axios;
Vue.use(Swipe).use(SwipeItem);
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
