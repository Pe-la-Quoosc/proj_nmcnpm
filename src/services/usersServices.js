import { get, post } from "../utils/request";

export const login = async (username, password) => {
  const response = await get(`users?username=${username}&password=${password}`);
  return response;
};
export const register = async (options) => {
  const response = await post(`users` , options);
  return response;
};
export const checkExistUser = async (key,value) => {
  const response = await get(`users?${key}=${value}`);
  return response;
}