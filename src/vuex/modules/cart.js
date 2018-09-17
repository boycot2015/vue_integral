import { addCart, deleteCart, updateCart } from "@/api/cart";
import common from "../../assets/js/common";
const LS = common.LS;
const GoodsData = {
  state: {
    cartList: LS.get("cartList") ? LS.get("cartList") : []
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  getters: {
    // 获取产品列表
    cartList(state) {
      var cartList = [];
      cartList = state.cartList;
      return cartList;
    }
  },
  mutations: {
    SET_CARTDATA: (state, data) => {
      if (state.cartList.length) {
        var cartData = state.cartList;
        var hasIds = false;
        cartData.forEach(el => {
          if (el.id == data.id) {
            // console.log(el.id)
            hasIds = true;
            el.initNum += data.initNum;
          }
        });
        if (!hasIds) {
          state.cartList.push(data);
        }
        LS.save("cartList", cartData);
      } else {
        state.cartList.push(data);
        LS.save("cartList", data);
      }
    },
    DELETE_CARTDATA: (state, id) => {
      var cartData = state.cartList;
      cartData.forEach((el, i) => {
        if (el.id == id) {
          cartData.splice(i, i + 1);
        }
      });
      state.cartList = cartData;
      LS.update("cartList", cartData);
    },
    UPATE_CARTDATA: (state, data) => {
      var cartData = state.cartList;
      cartData.forEach(el => {
        if (el.id == data.id) {
          el.count = data.count;
        }
      });
      state.cartList = cartData;
      LS.update("cartList", cartData);
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    addCart({ commit, state }, cartData) {
      return new Promise((resolve, reject) => {
        addCart(state.token, cartData)
        .then(response => {
          const addData = JSON.parse(response.config.data);
          if (addData.data) {
            commit("SET_CARTDATA", addData.data);
            resolve({
              code:200,
              msg:"添加成功！"
            });
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    deleteCart({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        deleteCart(state.token, id)
        .then(response => {
          const data = response.data;
          if (data) {
            commit("DELETE_CARTDATA", data);
            resolve({
              code:200,
              msg:"修改成功！"
            });
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    updateCart({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        updateCart(state.token, data)
        .then(response => {
          if (response.data) {
            commit("UPATE_CARTDATA", data);
            resolve(data);
          }
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}


export default GoodsData;
