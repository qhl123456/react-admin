import { GET, POST, DELETE, PUT, BindDelete } from "../network";
// 查询权限列表
export const getRoles = (params) => GET("roles", params);

// 编辑权限
export const changeRoles = (id, data) => PUT("roles", id, data);

// 删除权限用户
export const delRoles = (id) => DELETE("roles", id);

// 添加用户
export const addRoles = (data) => POST("roles", data);

// 查看树结构
export const rightsTree = () => GET("rights/tree");

// 删除权限
export const delTag = (id1, id2) => BindDelete("roles", "rights", id1, id2);
