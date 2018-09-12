import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import My from "./views/my.vue";
import Cart from "./views/cart.vue";
import Shop from "./views/shop.vue";
import Login from "./views/login.vue";
import Detail from "./views/detail.vue";
import store from "./vuex";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        login: true
      }
    },
    {
      path: "/my",
      name: "my",
      component: My
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
    }
  ]
});
// permissiom judge
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf("admin") >= 0) return true;
//   // admin权限 直接通过
//   if (!permissionRoles) return true;
//   return roles.some(role => permissionRoles.indexOf(role) >= 0);
// }
const whiteList = ["/", "/home", "/shop", "/detail"];
// 不重定向白名单

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    to.meta.login = true;
    if (to.path === "/login") {
      next("/");
    } else if (to.path === "/detail") {
      to.meta.login = false;
      next();
    }
    next();
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      to.meta.login = true;
      if (to.path === "/detail") {
        to.meta.login = false;
      }
      next();
    } else {
      next();
      router.push("/login");
      // next("/login"); // 否则全部重定向到登录页
    }
  }
});
export default router;
