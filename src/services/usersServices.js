<<<<<<< HEAD
import { post,get,patch, put } from "../utils/request";
=======
import { post,get,patch } from "../utils/request";
const API_DOMAIN = "http://localhost:3002/";
>>>>>>> f2fe215 (update cart...)
//
export const login = async (username, password) => {
  // console.log("Sending login request:", username, password);
  const response = await post("api/user/login", { username, password });
  // console.log("Login response:", response);
  if (response.token) {
      document.cookie = `accessToken=${response.token}; path=/; max-age=3600`; // Token tồn tại trong 1 giờ
      // console.log("Token set in cookie:", response.token);
    }
  if (!response || response.error) {
    throw new Error(response.error || "Login failed");
  }
  return response;
};
export const register = async (options) => {
  try {
    const response = await post(`api/user/register`, options);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};
//
export const getUserById = async (id) => {
  const response = await get(`api/user/${id}`);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch user data");
  }
  return response;
}
<<<<<<< HEAD

export const getAllUsers = async (params) => {
  const response = await get("api/user/all-users", params);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch users");
  }
  return response;
};

export const updateUser= async (id, data) => {
  const response = await post(`api/user/${id}`, data);
=======
//Get current user
export const getCurrentUser = async () => {
  const response = await get("api/user/me");
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch current user data");
  }
  return response;
};
//Update current user
export const updateCurrentUser = async (data) => {
  const response = await patch(`api/user/update-me`, data);
>>>>>>> f2fe215 (update cart...)
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

<<<<<<< HEAD
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
=======
export const sendForgotPasswordEmail = async (email) =>{
  const response=await post("api/user/forgot-password",{email});
  return response;
}

export const resetPassword = async(token,password)=>{
  const response = await post(`api/user/reset-password/${token}`,{password});
  return response;
}

export const updatePassword = async(id,password)=>{
  const response = await post("api/user/update-password",{id,password});
  return response;
}

export const logout = async () => {
    const response = await post("api/user/logout");
    if (!response || response.error) {
      throw new Error(response.error || "Logout failed");
    }
    return response;
};

export const refreshToken = async () => {
  try {
    const res = await fetch(`${API_DOMAIN}api/user/refresh`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600`;
    return data.accessToken;
  } catch (err) {
    console.error("Refresh token failed", err);
    return null;
  }
};


>>>>>>> f2fe215 (update cart...)




