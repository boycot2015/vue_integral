// 引入mockjs
const Mock = require("mockjs");

import goodsAPI from "./shop";
import loginAPI from "./login";


// 登录相关
Mock.mock(/\/login/, "post", loginAPI.login);
Mock.mock(/\/login\/logout/, "post", loginAPI.logout);
Mock.mock(/\/user\/info\.*/, "get", loginAPI.getInfo);
Mock.mock(/\/loginbycode/, "get", loginAPI.loginByThirdparty);

// 商品相关
Mock.mock(/\/goodslist/, "get", goodsAPI.getGoodsData);
export default Mock;

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock("/user/login", "post", userData);
// Mock.mock("/user/query", "post", userData);
