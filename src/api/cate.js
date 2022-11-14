import { GET, POST, DELETE, PUT } from "../network";
// 请求分类初始数据
export const getCateList = (params) => GET("categories", params);

// 添加分类数据
export const addCate = (data) => POST("categories", data);

// 删除分类
export const delCate = (id) => DELETE("categories", id);

// 编辑分类
export const editCata = (id, data) => PUT("categories", id, data);
