import { GET, POST, DELETE, PUT } from "../network";
// 查询表格数据
export const getGoodsData = (params) => GET("goods", params);

// 添加商品
export const addGoods = (data) => POST("goods", data);

// 删除商品
export const delGoods = (id) => DELETE("goods", id);

// 修改商品数据
export const upGoodsInfo = (id, data) => PUT("goods", id, data);
