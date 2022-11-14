import React, { Component } from "react";
import { Layout, Breadcrumb, message, Table, Tag, Divider } from "antd";
import { rightsList } from "../../api/rights";
const { Content } = Layout;
const { Column } = Table;
class Rights extends Component {
  constructor(props) {
    super();
    this.state = {
      rightsList: [],
    };
  }
  componentDidMount = () => {
    this.getRightList();
  };
  // 面包屑返回首页
  goHome = () => {
    this.props.history.push("/welcome");
  };
  // 获取所有权限列表
  getRightList = async () => {
    try {
      const res = await rightsList();
      // console.log(res);
      if (res.meta.status === 200) {
        this.setState({ rightsList: res.data });
      } else {
        message.error("获取权限列表失败");
      }
    } catch (err) {
      message.error("请稍后重试");
    }
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
              <Breadcrumb.Item>权限管理</Breadcrumb.Item>
              <Breadcrumb.Item>权限列表</Breadcrumb.Item>
            </Breadcrumb>
            {/* 头部搜索和添加用户 */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Table
                bordered
                dataSource={this.state.rightsList}
                rowKey="id"
                pagination={false}
              >
                <Column
                  title="#"
                  key="id"
                  render={(text, record, index) => (
                    <>
                      <span>{index + 1}</span>
                    </>
                  )}
                />
                <Column title="权限名称" dataIndex="authName" key="id" />
                <Column title="路径" dataIndex="path" key="id" />
                <Column
                  title="权限等级"
                  dataIndex="level"
                  key="id"
                  render={(text) => (
                    <>
                      <Tag color="orange" visible={Number(text) === 0}>
                        一级权限
                      </Tag>
                      <Tag color="purple" visible={Number(text) === 1}>
                        二级权限
                      </Tag>
                      <Tag color="magenta" visible={Number(text) === 2}>
                        三级权限
                      </Tag>
                    </>
                  )}
                />
              </Table>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

export default Rights;
