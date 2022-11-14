// 此模块，是cate和cate的所有操作
// reducer
export default function cate(cate = [], action) {
  const { type, payload } = action;
  switch (type) {
    case "GET":
      cate = payload;
      break;
    default:
      break;
  }
  // console.log(cate);
  return cate;
}
