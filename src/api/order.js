import { GET, BindGET } from "../network";
//获取订单所有数据
export const getOrderData = (params) => GET("orders", params);
// 获取物流信息
export const getOrderInfo = (id, params) => BindGET("kuaidi", id, params);
