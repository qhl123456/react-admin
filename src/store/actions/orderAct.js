import { getOrderData, getOrderInfo } from "../../api/order";

// 获取订单数据
export const GETORDER = (params) => async (dispatch) => {
  const res = await getOrderData(params);
  dispatch({
    type: "GET",
    payload: res.data,
  });
};

// 获取物流信息
export const GETLOG = () => async (dispatch) => {
  const res = await getOrderInfo(1106975712662);
  dispatch({
    type: "LOG",
    payload: res.data,
  });
};
