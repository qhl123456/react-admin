import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 创建连接mock的axios实例，传入全局配置项
const mockServer = axios.create({
  baseURL: "http://localhost:9050",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});
mockServer.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});
mockServer.interceptors.response.use((config) => {
  NProgress.done();
  return config;
});
export default mockServer;
