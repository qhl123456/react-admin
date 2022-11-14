import React from "react";
import { Layout, Breadcrumb, Input, Button } from "antd";
import "./User.css";
import UserTables from "../../components/Table/UserTables.jsx";
import UserModel from "../../components/Modal/userModel.jsx";
import { getUser } from "../../api/userChange";
const { Content } = Layout;
const { Search } = Input;
class User extends React.Component {
  constructor() {
    super();
    this.state = {
      // 查询条件
      queryInfo: { query: "", pagenum: 1, pagesize: 2 },
    };
    this.user = React.createRef();
    this.table = React.createRef();
  }
  // 双向绑定事件
  changeSearchValue = (ev) => {
    this.setState({
      queryInfo: {
        ...this.state.queryInfo,
        query: ev.target.value,
      },
    });
  };
  // 确认搜索
  confirmSearch = async () => {
    const res = await getUser(this.state.queryInfo);
    this.table.current.getData(res.data);
  };
  // 添加用户
  addUser = () => {
    this.user.current.addUserDialog(true);
  };
  // 添加完用户刷新列表
  refresh = () => {
    this.table.current.showTable();
  };
  goHome = () => {
    this.props.history.push("/welcome");
  };

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  render() {
    return (
      <>
        <Layout className="site-layout">
          <Content style={{ margin: " 16px" }}>
            {/* 面包屑导航 */}
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item onClick={this.goHome}>首页</Breadcrumb.Item>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
              <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
            {/* 头部搜索和添加用户 */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className="userHeader">
                <Search
                  placeholder="请输入内容"
                  onSearch={this.confirmSearch}
                  enterButton
                  value={this.state.queryInfo.query}
                  onChange={this.changeSearchValue}
                  onPressEnter={this.confirmSearch}
                  className="search-left"
                  size="large"
                />
                <Button type="primary" size="large" onClick={this.addUser}>
                  添加用户
                </Button>
              </div>
              <UserTables ref={this.table} />
              <UserModel ref={this.user} refreshTable={this.refresh} />
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

export default User;
