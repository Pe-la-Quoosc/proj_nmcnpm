import { post,get,patch, put } from "../utils/request";
//
export const login = async (username, password) => {
  // console.log("Sending login request:", username, password);
  const response = await post("api/user/login", { username, password });
  // console.log("Login response:", response);
  if (!response || response.error) {
    throw new Error(response.error || "Login failed");
  }
  return response;
};
//
export const register = async (options) => {
  // console.log("Sending register request:", options);
  const response = await post(`api/user/register`, options);
  // console.log("Register response:", response);
  return response;
};
//
export const getUserById = async (id) => {
  const response = await get(`api/user/${id}`);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch user data");
  }
  return response;
}

export const getAllUsers = async (params) => {
  const response = await get("api/user/all-users", params);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch users");
  }
  return response;
};

export const updateUser= async (id, data) => {
  const response = await post(`api/user/${id}`, data);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to update user data");
  }
  return response;
};

export const updateUserAddress = async (payload) => {
  const response = await put(`api/user/update-address`, payload);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to update user address");
  }
  return response; 
};

export const blockUser = async (id) => {
  const response = await put(`api/user/block-user/${id}`);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to block user");
  }
  return response;
}

export const unblockUser = async (id) => {
  const response = await put(`api/user/unblock-user/${id}`);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to unblock user");
  }
  return response;
}

export const createOrder = async (payload) => {
  const response = await post(`api/user/cart/cash-order`, payload);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to create order");
  }
  return response;
}




