import { getGoodsData } from "@/api/goods";
const GoodsData = {
  state: {
    goodsList: []
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    SET_GOODSLIST: (state, data) => {
      state.goodsList = data;
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    // 获取用户信息
    getGoodsData({ commit, state }) {
      return new Promise((resolve, reject) => {
        getGoodsData(state.token).then(response => {
          const data = response.data;
          commit("SET_GOODSLIST", data);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}

export default GoodsData;
