// 引入mockjs
const Mock = require("mockjs");

import { param2Obj } from "../utils";
// 获取 mock.Random 对象
// const Random = Mock.Random;
// mock一组数据

const goodsData = Mock.mock({
  "goodsList|20": [
    {
      "id|+1": [4600, 4601, 4602],
      "colors|+1":[["黑色", "灰色", "白色"]],
      "size|+1":[["160", "170", "180"], [], []],
      "serveInfo|+1": [
        [{
          "name": "正品保证",
          "subname": "该商品由中国人保承保正品保证险"
        },
        {
          "name": "七天无理由退换",
          "subname": "消费者在满足7天无理由退换货申请条件的前提下，可以提出“7天无理由退换货”的申请"
        },
        {
          "name": "极速退款",
          "subname": "极速退款是为诚信会员提供的退款退货流程的专享特权，额度是根据每个用户当前的信誉评级情况而定"
        }]
      ],
      "brand|+1": ["耐克", "wissBlue", "Pure Young"],
      "name|+1": [
        "户外运动套装",
        "【奥运专享】维仕蓝风行系列背包 WB1145",
        "飘漾（Pure Young）婴儿柔湿巾80片 经济便利型80片*4包PY07"
      ],
      "type|+1": ["", "", "jd"],
      "price|+1": [2000, 1490, 2440],
      "imgUrl|+1": [
        "http://img.limofang.cn/2018/5/8810624732873434846.jpg",
        "http://img.limofang.cn/2016/5/2824179677167535743.jpg",
        "http://img13.360buyimg.com/n2/jfs/t2737/260/1428300467/117564/b5fa4f9f/573e75bdN21d7c3f7.jpg"
      ],
      "desc|+1": ["1", "2", "3"],
      "status|+1": ["selling", "selling", "soldOut"],
      "hasDiscount|+1": [true, true, false],
      "isHot|+1": [false, true, true],
      "bannerImgUrl|+1": [
        ["http://img.limofang.cn/2018/5/8810624732873434846.jpg"],
        [
          "http://img.limofang.cn/2016/5/2824179677167535743.jpg",
          "http://img.limofang.cn/2016/5/8249222351305673068.jpg",
          "http://img.limofang.cn/2016/5/6526115382926114145.jpg"
        ],
        [
          "http://img13.360buyimg.com/n0/jfs/t2737/260/1428300467/117564/b5fa4f9f/573e75bdN21d7c3f7.jpg",
          "http://img13.360buyimg.com/n0/jfs/t2809/145/1412356615/121079/257d9dab/573e7641N80269e0a.jpg",
          "http://img13.360buyimg.com/n0/jfs/t2593/89/1433938240/123343/5321e2ab/573e7645N765a7e9d.jpg",
          "http://img13.360buyimg.com/n0/jfs/t2635/110/1378329446/69839/be7aca3d/573e7649N09fb4777.jpg",
          "http://img13.360buyimg.com/n0/jfs/t2653/110/1433134663/95873/3f438733/573e764eNda5c71e6.jpg"
        ]
      ],
      "detailsImgUrl|+1": [
        [""],
        ["http://img.fygift.com/2016/5/3367300964202983904.jpg"],
        [
          "http://img20.360buyimg.com/vc/jfs/t1159/327/1458366159/85898/52f301d3/57304cc1N6a39b165.jpg",
          "http://img20.360buyimg.com/vc/jfs/t1060/327/1481555895/81192/df0e0b03/57304ccaN38ae8002.jpg",
          "http://img20.360buyimg.com/vc/jfs/t1129/263/1483716552/67422/760ff4bf/57304cd3N86d0d2d1.jpg",
          "http://img20.360buyimg.com/vc/jfs/t829/246/1469344722/101370/2a82381b/57304d02N3189cf39.jpg",
          "http://img20.360buyimg.com/vc/jfs/t1513/223/1542048709/96089/15d82f45/57304d0aN4b08a3ee.jpg",
          "http://img20.360buyimg.com/vc/jfs/t958/20/1498503442/60478/ce425800/57304d48N534533fc.jpg"
        ]
      ],
      "coupons|+1": [
        [
          {
            "available": 1,
            "discount": 0,
            "denominations": 150,
            "originCondition": 0,
            "reason": "",
            "value": 150,
            "name": "下单立减",
            "startAt": 1489104000,
            "endAt": 1514592000
          },
          {
            "available": 0,
            "discount": 0,
            "denominations": 100,
            "originCondition": 0,
            "reason": "",
            "value": 100,
            "name": "下单立减",
            "startAt": 1489104000,
            "endAt": 1514592000
          },
          {
            "available": 1,
            "discount": 90,
            "denominations": 0,
            "originCondition": 0,
            "reason": "",
            "value": 200,
            "name": "9折优惠券",
            "startAt": 1489104000,
            "endAt": 1514592000
          }
        ],
        [
          {
            "available": 1,
            "discount": 80,
            "denominations": 0,
            "originCondition": 0,
            "reason": "",
            "value": 361,
            "name": "8折优惠券",
            "startAt": 1489104000,
            "endAt": 1514592000
          },
          {
            "available": 0,
            "discount": 70,
            "denominations": 0,
            "originCondition": 100,
            "reason": "",
            "value": 1,
            "name": "7折优惠券",
            "startAt": 1489104000,
            "endAt": 1514592000
          }
        ],
        [
          {
            "available": 1,
            "discount": 0,
            "denominations": 1000,
            "originCondition": 10000,
            "reason": "",
            "value": 1000,
            "name": "满减优惠券",
            "startAt": 1489104000,
            "endAt": 1514592000
          },
          {
            "available": 1,
            "discount": 50,
            "denominations": 0,
            "originCondition": 0,
            "reason": "",
            "value": 1220,
            "name": "5折优惠券",
            "startAt": 1489104000,
            "endAt": 1514592000
          }
        ]
      ]
    }
  ]
});
export default {
  getGoodsData: config => {
    const { id } = param2Obj(config.url);
    var data = goodsData.goodsList;
    var currData = [];
    if (id) {
      data.forEach(el => {
        if (el.id == id) {
          currData = el;
        }
      });
    } else {
      currData = goodsData.goodsList;
    }
    return currData;
    // const { data } = JSON.parse(config.body);
  }
};
