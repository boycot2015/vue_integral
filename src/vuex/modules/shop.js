import { getGoodsData } from "@/api/goods";
const GoodsData = {
  state: {
    goodsList: [],
    detailData: {}
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    SET_GOODSLIST: (state, data) => {
      state.goodsList = data;
    },
    SET_DETAILDATA: (state, data) => {
      state.detailData = data;
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    // 获取产品列表
    getGoodsData({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        getGoodsData(state.token, id).then(response => {
          const data = response.data;
          if (data.length) {
            commit("SET_GOODSLIST", data);
          }else {
            commit("SET_DETAILDATA", data);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}

export default GoodsData;
