import { GET, POST, DELETE, PUT, BindPut, RolePut } from "../network";
// 处理增删改查

// 添加用户
export const addUser = (data) => POST("users", data);

// 查询用户
export const getUser = (params) => GET("users", params);

// 查看左侧菜单栏
export const getMenus = (params) => GET("menus", params);

// 修改用户状态
export const changeState = (id, data) => BindPut("users", "state", id, data);

// 删除用户
export const delUser = (id) => DELETE("users", id);

// 修改用户
export const changeUser = (id, data) => PUT("users", id, data);

// 修改角色
export const changeRole = (id, data) => RolePut("users", "role", id, data);
