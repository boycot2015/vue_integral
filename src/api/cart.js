import fetch from "../utils/fetch";
export function getCartData(token) {
  return fetch({
    url: "/cart",
    method: "get",
    params: { token }
  });
}
export function addCart(token, cartData) {
  return fetch({
    url: "/addcart",
    method: "post",
    data: { token, data: cartData }
  });
}
export function deleteCart(token, delData) {
  return fetch({
    url: "/deletecart",
    method: "post",
    data: { token, delData }
  });
}
export function updateCart(token, updateData) {
  return fetch({
    url: "/updatecart",
    method: "post",
    data: { token, updateData }
  });
}
