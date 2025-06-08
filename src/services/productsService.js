import {get} from '../utils/request';

export const getProductList = async()=>{
    return await get("api/product");
}

export const getCategoryAttributes = async (categoryId) => {
  const response = await get(`api/category/${categoryId}/attributes`);
  if (!response || response.error) {
    throw new Error(response.error || "Failed to fetch category attributes");
  }
  return response;
};


