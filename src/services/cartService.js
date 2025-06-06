import { get, post } from "../utils/request";

export const getCart = async () => {
  const response = await get("/api/user/cart");
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch cart data");
  }
  return response;
};

export const saveCartToDatabase = async (cart) => {
  const response = await post("/api/user/cart", { cart });
  if (!response || response.error) {
    throw new Error(response.error || "Failed to save cart");
  }
  return response;
};

export const getVoucherList = async () => {
  const response = await get("/api/coupons");
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch voucher list");
  }
  return response;
};
