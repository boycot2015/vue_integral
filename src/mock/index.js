// 引入mockjs
const Mock = require("mockjs");

import goodsAPI from "./shop";
import loginAPI from "./login";
import cartAPI from "./cart";

// 登录相关
Mock.mock(/\/login/, "post", loginAPI.login);
Mock.mock(/\/login\/logout/, "post", loginAPI.logout);
Mock.mock(/\/user\/info\.*/, "get", loginAPI.getInfo);
Mock.mock(/\/loginbycode/, "get", loginAPI.loginByThirdparty);

// 商品相关
Mock.mock(/\/goodslist/, "get", goodsAPI.getGoodsData);

// 购物车
Mock.mock(/\/cart/, "get", cartAPI.getCartData);
Mock.mock(/\/addcart/, "post", cartAPI.addCart);
Mock.mock(/\/deletecart/, "post", cartAPI.deleteCart);
Mock.mock(/\/updatecart/, "post", cartAPI.updateCart);
export default Mock;

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock("/user/login", "post", userData);
// Mock.mock("/user/query", "post", userData);
