import { post,get,patch } from "../utils/request";
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

export const updateUser= async (id, data) => {
  const response = await patch(`api/user/${id}`, data);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to update user data");
  }
  return response;
};



//


