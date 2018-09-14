import fetch from "../utils/fetch";
export function getGoodsData(token, id) {
  id = id ? id : "";
  return fetch({
    url: "/goodslist",
    method: "get",
    params: { token, id }
  });
}