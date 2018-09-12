// 引入mockjs
const Mock = require("mockjs");

// import { param2Obj } from "../utils";
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据

const goodsData = Mock.mock({
  "goodsList|20": [
    {
      "id|+1": [Random.id(), Random.id(), Random.id()],
      "name|+1": ["户外运动套装", "香山智能脂肪秤", "雅兰印花冬厚被"],
      "price|+1": [20790, 1490, 2440],
      "imgUrl|+1": [
        "http://img.limofang.cn/2018/5/8810624732873434846.jpg",
        "http://img.limofang.cn/2017/8/8631689953227861389.png",
        "http://img.limofang.cn/2017/8/4138007410326252535.png"
      ],
      "desc|+1": ["1", "2", "3"],
      "hasDiscount|+1": [false, true, false],
      "isHot|+1": [false, true, false]
    }
  ]
});
export default {
  getGoodsData: () => {
    // const { data } = JSON.parse(config.body);
    return goodsData.goodsList;
  }
};
