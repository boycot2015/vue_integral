import fetch from "../utils/fetch";
export function login(account, password) {
  const data = {
    account,
    password
  };
  return fetch({
    url: "/login",
    method: "post",
    data
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve({
      ok: true
    });
    reject({
      error: "error"
    });
  });
}

export function getInfo(token) {
  return fetch({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}
export function loginByThirdparty(status, phone, code, auth_type) {
  const data = {
    phone,
    code,
    status,
    auth_type
  };
  return fetch({
    url: "/",
    method: "post",
    data
  });
}