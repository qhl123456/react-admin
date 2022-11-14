import { GET } from "../network";
// 获取权限列表数据
export const rightsList = () => GET("rights/list");
