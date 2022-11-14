import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Layout, Avatar, Button } from "antd";
import "./Home.css";
import Aside from "../../components/Aside/Aside.jsx";
import Welcome from "../../components/Welcome/Welcome.jsx";
import { Route, Redirect, withRouter } from "react-router-dom";
import grants from "../../grants";
const { Header, Content, Sider } = Layout;
class Home extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
    //获取权限
    // 1、
    let houPaths = JSON.parse(sessionStorage.getItem("houPaths"));
    // 2、根据后端的路径，获得前端需要的路由配置信息。
    this.routes = grants(houPaths);
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  removeUser = () => {
    sessionStorage.removeItem("username");
    this.props.history.push("/login");
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Aside />
        </Sider>
        <Layout className="site-layout">
          <Header className="header">
            <div className="headerInfo">
              <div className="left">
                <Avatar size="large" icon={<UserOutlined />} />
                <h2>电商后台管理系统</h2>
              </div>
              <div className="right">
                <Button
                  type="primary "
                  block
                  className="info"
                  onClick={this.removeUser}
                >
                  退出
                </Button>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Redirect exact={true} from="/" to="/welcome" />
            <Route exact={true} path="/welcome" component={Welcome} />
            {this.routes.map((child) =>
              child.children.map((item) => (
                <Route
                  exact={true}
                  path={item.path}
                  component={item.component}
                  key={item.id}
                />
              ))
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Home);
