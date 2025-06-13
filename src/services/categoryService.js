import { get, post, put, del } from "../utils/request";

// Lấy tất cả danh mục
export const getCategories = () => get("api/categories");

// Lấy chi tiết một danh mục theo id
export const getCategoryById = (id) => get(`api/categories/${id}`);

// Tạo mới danh mục
export const createCategory = (data) => post("api/categories", data);

// Cập nhật danh mục
export const updateCategory = (id, data) => put(`api/categories/${id}`, data);

// Xóa danh mục
export const deleteCategory = (id) => del(`api/categories/${id}`);