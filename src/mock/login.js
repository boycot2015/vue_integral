// 引入mockjs
const Mock = require("mockjs");

import { param2Obj } from "../utils";
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const userData = {
  user: {
    account: "0101",
    imgUrl: "https://avatar.csdn.net/C/1/4/1_k3rlt.jpg?1536912598",
    date: Random.datetime(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    token: "account",
    password: "888888"
  },
  phone: {
    phone: Random.string(11),
    date: Random.datetime(),
    code: Random.string(4),
    token: "mobile"
  }
};
export default {
  login: () => {
    // const { account } = JSON.parse(config.body);
    // console.log(account)
    return userData["user"];
  },
  getInfo: config => {
    const { token } = param2Obj(config.url);
    if (token == "account") {
      var user = userData.user;
      delete user.password;
      return user;
    } else if (token == "mobile") {
      var phone = userData.phone;
      delete phone.code;
      return userData.phone;
    } else {
      return Promise.reject("请先登录！");
    }
  },
  logout: () => "success",
  LoginByThirdparty: () => {
    return userData["phone"];
  }
};
