import { POST } from "../network";
// 后端登录
export const userLogin = (data) => POST("login", data);
