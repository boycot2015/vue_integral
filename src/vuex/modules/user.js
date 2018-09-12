import { login, logout, getInfo, loginByThirdparty } from "@/api/login";
import Cookies from "js-cookie";
const user = {
  state: {
    user: "",
    status: "",
    account: "",
    code: "",
    uid: undefined,
    auth_type: "",
    token: Cookies.get("Admin-Token"),
    name: "",
    avatar: "",
    introduction: "",
    login_time: "",
    phoneNum: "",
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_LOGIN_TIME: (state, time) => {
      state.login_time = time;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      // console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = "";
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_PHONE_NUM: (state, phoneNum) => {
      state.phoneNum = phoneNum;
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    // 获取用户信息
    GetInfo({commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          if (data.account) {
            commit("SET_AUTH_TYPE", "admin");
            commit("SET_NAME", data.account);
            commit("SET_ACCOUNT", data.account);
          } else {
            commit("SET_AUTH_TYPE", "phoneUser");
            commit("SET_PHONE_NUM", data.phone);
            commit("SET_CODE", data.code);
          }
          commit("SET_AVATAR", data.imgUrl);
          commit("SET_LOGIN_TIME", data.date);
          commit("SET_USER", data);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
  // 登录
    login({ commit }, userInfo) {
      const account = userInfo.account.trim();
      const password = userInfo.password.trim();
      return new Promise((resolve, reject) => {
        login(account, password).then(response => {
          const data = response.data;
          if (account === data.account && password === data.password) {
            Cookies.set("Admin-Token", data.token);
            commit("SET_TOKEN", data.token);
            commit("SET_ACCOUNT", data.account);
            commit("SET_LOGIN_TIME", data.date);
            commit("SET_USER", data);
            resolve({
              code: 200,
              message: "登录成功"
            });
          } else {
            resolve({
              code: 400,
              data: "账号或密码错误！"
            });
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          Cookies.remove("Admin-Token");
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        Cookies.remove("Admin-Token");
        alert("has logout");
        resolve();
      });
    },
    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit("SET_CODE", code);
        loginByThirdparty(state.status, state.phone, state.code, state.auth_type).then(response => {
          commit("SET_TOKEN", response.config.data.token);
          Cookies.set("Admin-Token", response.config.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit("SET_ROLES", [role]);
        commit("SET_TOKEN", role);
        Cookies.set("Admin-Token", role);
        resolve();
      })
    }
  }
}

export default user;
