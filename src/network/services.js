// 此模块：是axios的全局性的配置和处理（请求拦截器和响应拦截器）
import axios from "axios";
import { BASE_URL } from "../utils/const";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 创建连接后端axios实例，传入全局配置项
const services = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});
services.interceptors.request.use((config) => {
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
services.interceptors.response.use((config) => {
  NProgress.done();
  return config;
});
export default services;
