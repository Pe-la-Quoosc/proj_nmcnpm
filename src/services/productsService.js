import { del, get, post } from "../utils/request";

export const getProductList = async () => {
  const res = await get(`products`);
  return res;
};
export const createProduct = async (options) => {
  const res = await post(`products`, options);
  return res;
};
export const deleteProduct = async (id) => {
  const res = await del(`products/${id}`);
  return res;
};
export const updateProduct = async (id, options) => {
  const res = await post(`products/${id}`, options);
  return res;
};
