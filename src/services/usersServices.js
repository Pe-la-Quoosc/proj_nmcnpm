import { post,get } from "../utils/request";
//
export const login = async (username, password) => {
  const response = await post("api/user/login", { username, password });
  if (!response || response.error) {
    throw new Error(response.error || "Login failed");
  }
  return response;
};
//
export const register = async (options) => {
  const response = await post(`api/user/register`, options);
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
//


