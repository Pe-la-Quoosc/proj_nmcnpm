import {get,put,post,del,patch } from '../utils/request';

export const getProductList = async()=>{
    return await get("/api/products");
}


