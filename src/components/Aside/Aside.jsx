import { Layout, Menu, message } from "antd";
import React from "react";
import {
  IdcardOutlined,
  UserOutlined,
  AccountBookOutlined,
  ProfileOutlined,
  FundOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "./Aside.css";
import { getMenus } from "../../api/userChange";
import { withRouter } from "react-router";
import grants from "../../grants";
const { SubMenu } = Menu;

class Aside extends React.Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
      //icon菜单
      iconList: [
        <UserOutlined />,
        <IdcardOutlined />,
        <AccountBookOutlined />,
        <ProfileOutlined />,
        <FundOutlined />,
      ],
    };
    //获取权限
    // 1、
    let houPaths = JSON.parse(sessionStorage.getItem("houPaths"));

    // 2、根据后端的路径，获得前端需要的路由配置信息。
    this.routes = grants(houPaths);
  }

  // 展开/收起
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  // 路由跳转
  goOther = (path) => {
    this.props.history.push(path);
  };
  render() {
    return (
      <>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%" }}
        >
          {this.routes.map((menu, index) => (
            // 一级菜单
            <SubMenu
              key={menu.id}
              icon={this.state.iconList[index]}
              title={menu.authName}
            >
              {menu.children.map((item) => (
                // 二级菜单
                <Menu.Item
                  key={item.id}
                  icon={<AppstoreOutlined />}
                  onClick={() => this.goOther(item.path)}
                >
                  {item.authName}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </>
    );
  }
}
export default withRouter(Aside);
