import { createStore, applyMiddleware, combineReducers } from "redux";
// createStore用来创建redux，applyMiddleware用来给actions提交函数，combineReducers用来合并reduce
import thunk from "redux-thunk";
import Cate from "./reducers/cateRedu";
import { Order, Log } from "./reducers/orderRedu";
// 此处合并的reducer，键就是state中键。
let rootReducer = combineReducers({
  Cate,
  Order,
  Log,
});
let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
