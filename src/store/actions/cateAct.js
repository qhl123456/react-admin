import { getCateList } from "../../api/cate";

// 获取分类
export const GETCATES = () => async (dispatch) => {
  const res = await getCateList({
    query: "",
    pagenum: 1,
    pagesize: 5,
  });
  dispatch({
    type: "GET",
    payload: res.data,
  });
};
