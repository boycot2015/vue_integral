import fetch from "../utils/fetch";
export function getGoodsData(token) {
  return fetch({
    url: "/goodslist",
    method: "get",
    params: { token }
  });
}