const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uid: state => state.user.uid,
  phone: state => state.user.phone,
  introduction: state => state.user.introduction,
  auth_type: state => state.user.auth_type,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  goodsList: state => {
    // var data = state.goodsList;
    // var currData = {};
    // data.forEach(el => {
    //   if (el.id == id) {
    //     currData = el;
    //     currData.code = 200;
    //   } else {
    //     currData.code = 400;
    //     currData.msg = "查找的商品不存在！";
    //   }
    // });
    // return currData;
    return state.goodsList;
  }
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters,
  // siderbar_routers: state => state.permission.siderbar_routers
};
export default getters;
