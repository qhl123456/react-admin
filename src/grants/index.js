// 此模块功能：根据后端返回的path，得到前端需要的数据（菜单的文字，组件）
import UserS from "../pages/User/User.jsx";
import Roles from "../pages/Roles/Roles";
import Rights from "../pages/Rights/Rights";
import Goods from "../pages/Goods/Goods";
import Categories from "../pages/Categories/Categories";
import Orders from "../pages/Orders/Orders";
import Reports from "../pages/Reports/Reports";

// 1、所有的路由

let routes = [
  {
    authName: "用户管理",
    path: "/users",
    id: "01",
    children: [
      {
        id: "01001",
        authName: "用户列表",
        children: [],
        path: "/users",
        component: UserS,
      },
    ],
  },
  {
    id: "02",
    authName: "权限管理",
    path: "/rights",
    children: [
      {
        id: "02001",
        authName: "角色列表",
        children: [],
        path: "/roles",
        component: Roles,
      },
      {
        id: "02002",
        authName: "权限列表",
        children: [],
        path: "/rights",
        component: Rights,
      },
    ],
  },
  {
    id: "03",
    authName: "商品管理",
    path: "/goods",
    children: [
      {
        id: "03001",
        authName: "商品列表",
        children: [],
        path: "/goods",
        component: Goods,
      },
      {
        id: "03002",
        authName: "商品分类",
        children: [],
        path: "/categories",
        component: Categories,
      },
    ],
  },
  {
    id: "04",
    authName: "订单管理",
    path: "/orders",
    children: [
      {
        id: "04001",
        authName: "订单列表",
        children: [],
        path: "/orders",
        component: Orders,
      },
    ],
  },
  {
    id: "05",
    authName: "数据统计",
    path: "/reports",
    children: [
      {
        id: "05001",
        authName: "数据报表",
        children: [],
        path: "/reports",
        component: Reports,
      },
    ],
  },
];

// 2、定义一个函数，根据后端返回path，来得到前端需要数据（路径，菜单文字，组件）

const grants = (houPaths) => {
  return routes.filter((route) => houPaths.some((item) => item === route.path));
};

export default grants;
