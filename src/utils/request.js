import { getCookie } from "../helpers/cookie";
const API_DOMAIN = "http://localhost:3002/";

export const get = async (path) => {
    const token = getCookie("token"); 
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(API_DOMAIN + path,{
    method:"GET",
    headers,
    credentials:"include",
  });
  const res = await response.json();
  return res;
};



export const post = async (path, options) => {
  const token = getCookie("token"); 
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), 
  };

  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers,
    body: JSON.stringify(options),
    credentials: "include",
  });

  return await response.json();
};

export const del = async (path, options = {}) => {
  const token = getCookie("token"); // Lấy token từ cookies
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Thêm token vào header nếu tồn tại
  };

  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
    headers,
    body: JSON.stringify(options), // Gửi dữ liệu trong body
    credentials: "include", // Đảm bảo cookies được gửi kèm
  });

  return await response.json();
};

export const patch = async (path, options) => {
  const token = getCookie("token"); // Lấy token từ cookies
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Thêm token vào header nếu tồn tại
  };

  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers,
    body: JSON.stringify(options),
    credentials: "include", // Đảm bảo cookies được gửi kèm
  });
  return await response.json();
};

export const put = async (path, options) => {
  const token = getCookie("token"); // Lấy token từ cookies
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Thêm token vào header nếu tồn tại
  };

  const response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    headers,
    body: JSON.stringify(options),
    credentials: "include", // Đảm bảo cookies được gửi kèm
  });
  return await response.json();
};