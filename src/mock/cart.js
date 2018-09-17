// 引入mockjs
// const Mock = require("mockjs");

// import { param2Obj } from "../utils";
// 获取 mock.Random 对象
// const Random = Mock.Random;
// mock一组数据

// const cartData = Mock.mock({ " cartList ": [] });
export default {
  addCart: config => {
    const data = JSON.parse(config.body);
    var currData = {};
    if (data.id) {
      data.forEach(el => {
        if (el.id == data.id) {
          currData = el;
        }
      });
    }
    return currData;
  },
  deleteCart: config => {
    const data = JSON.parse(config.body);
    if (data) {
      if (data) {
        return data;
      }
      return {};
    }
  },
  updateCart: config => {
    const data = JSON.parse(config.body);
    if (data) {
      if (data) {
        return data;
      }
      return {};
    }
  }
};
