// 此模块，是order和order的所有操作
// reducer
export function Order(orders = [], action) {
  const { type, payload } = action;
  switch (type) {
    case "GET":
      orders = payload;
      break;
    default:
      break;
  }
  return orders;
}
export function Log(logInfo = [], action) {
  const { type, payload } = action;
  switch (type) {
    case "LOG":
      logInfo = payload;
      break;
    default:
      break;
  }
  return logInfo;
}
