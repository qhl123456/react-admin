import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  message,
  Input,
  Button,
  Table,
  Modal,
  Form,
  Tree,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  getRoles,
  changeRoles,
  delRoles,
  addRoles,
  rightsTree,
  delTag,
} from "../../api/roles";
import "./Roles.css";
const { Content } = Layout;
const { Column } = Table;
class Roles extends Component {
  constructor(props) {
    super();
    this.state = {
      // 表格数据
      tableData: [],
      // 显示修改用户的弹框
      showChangeUser: false,
      // 显示删除用户的弹框
      showDelUser: false,
      // 显示添加用户的弹框
      showAddUser: false,
      // 删除用户的id
      delUserId: "",
      // 修改的用户信息
      userInfo: {
        roleName: "",
        roleDesc: "",
      },
      // 添加用户的信息
      addRoleInfo: {
        roleName: "",
        roleDesc: "",
      },
    };
    this.formRef = React.createRef();
    this.addformRef = React.createRef();
  }
  // 面包屑返回首页
  goHome = () => {
    this.props.history.push("/welcome");
  };
  componentDidMount = () => {
    this.getRolesData();
  };
  // 获取权限列表
  getRolesData = async () => {
    const res = await getRoles();
    // console.log(res.data);
    this.setState({ tableData: res.data });
  };
  // 修改用户弹出框
  changeUserDialog = (showChangeUser, userInfo) => {
    this.setState({ showChangeUser, userInfo });
  };
  // 修改用户输入双向绑定事件
  changeVal = (ev) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [ev.target.name]: ev.target.value,
      },
    });
  };
  // 确定修改
  onFinish = async () => {
    try {
      await this.formRef.current.validateFields();
      console.log(this.state.userInfo);
      const res = await changeRoles(this.state.userInfo.id, {
        roleName: this.state.userInfo.roleName,
        roleDesc: this.state.userInfo.roleDesc,
      });
      if (res.meta.status === 200) {
        message.success("更新用户信息成功");
        this.changeUserDialog(false, {});
        this.getRolesData();
      } else {
        message.error("更新用户信息失败");
      }
    } catch {
      message.error("请稍后再尝试！");
    }
  };
  // 确认删除
  confirmDel = async () => {
    const res = await delRoles(this.state.delUserId);
    if (res.meta.status !== 200) {
      message.error("删除失败");
    } else {
      message.success("删除成功");
      this.showDelUser(false, "");
      this.getRolesData();
    }
  };

  // 展示删除用户弹框
  showDelUser = (showDelUser, delUserId) => {
    if (delUserId === undefined) {
      message.warning("已取消删除");
    }
    this.setState({ showDelUser, delUserId });
  };
  // 添加用户弹出框;
  addRoleDialog = (showAddUser) => {
    this.setState({ showAddUser }, () => {
      this.addformRef.current.resetFields();
    });
  };
  // 添加用户字段更新事件
  AddChangeVal = (changedValues, allValues) => {
    this.setState({
      addRoleInfo: allValues,
    });
  };
  // 添加用户确认;
  onFinishAddRoles = async () => {
    try {
      const value = await this.addformRef.current.validateFields();
      const res = await addRoles(this.state.addRoleInfo);
      if (res.meta.status === 201) {
        message.success("添加角色成功");
        this.addRoleDialog(false);
        this.getRolesData();
      } else {
        message.error("添加用户失败");
      }
    } catch {
      message.error("请重新添加！");
    }
  };
  // 删除标签
  async delTag(info, id) {
    const res = await delTag(info.id, id);
    // console.log(res);
    if (res.meta.status === 200) {
      message.success("删除权限成功");
      this.getRolesData();
    } else {
      message.error("删除权限失败");
    }
  }

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
              <Breadcrumb.Item>角色列表</Breadcrumb.Item>
            </Breadcrumb>
            {/* 头部搜索和添加用户 */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className="userHeader">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => this.addRoleDialog(true)}
                >
                  添加角色
                </Button>
              </div>
              {/* 展示表格 */}
              <Table
                bordered
                dataSource={this.state.tableData}
                pagination={false}
                rowKey="id"
                expandable={{
                  childrenColumnName: "",
                  expandedRowRender: (record) => (
                    <>
                      {/* 一级菜单 */}
                      {record.children.map((first) => (
                        <div key={first.id} className="expanded">
                          <div key={first.id} className="firstexpanded">
                            <Tag
                              color="cyan"
                              key={first.id}
                              closable
                              onClose={() => this.delTag(record, first.id)}
                            >
                              {first.authName}
                            </Tag>
                          </div>
                          {/* 二级菜单 */}
                          <div className="secondexpanded">
                            {first.children.map((second) => (
                              <div key={second.id} className="thirdexpanded">
                                <div className="thirdexpandedLeft">
                                  <Tag
                                    color="blue"
                                    key={second.id}
                                    closable
                                    onClose={() =>
                                      this.delTag(record, second.id)
                                    }
                                  >
                                    {second.authName}
                                  </Tag>
                                </div>
                                {/* 三级菜单 */}
                                <div className="thirdexpandedRight">
                                  {second.children.map((third) => (
                                    <Tag
                                      color="volcano"
                                      key={third.id}
                                      closable
                                      onClose={() =>
                                        this.delTag(record, third.id)
                                      }
                                    >
                                      {third.authName}
                                    </Tag>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ),
                }}
              >
                <Column
                  title="角色名称"
                  dataIndex="roleName"
                  key="id"
                  width={330}
                />
                <Column
                  title="角色描述"
                  dataIndex="roleDesc"
                  key="id"
                  width={330}
                />

                <Column
                  className="operation"
                  title="操作"
                  key="id"
                  width={250}
                  render={(text, record) => (
                    <>
                      {/* 编辑用户 */}
                      <Button
                        icon={<EditOutlined />}
                        size="mini"
                        type="primary"
                        onClick={() => this.changeUserDialog(true, text)}
                      >
                        编辑
                      </Button>
                      {/* 取消/确认删除 */}

                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        size="mini"
                        onClick={() => this.showDelUser(true, text.id)}
                      >
                        删除
                      </Button>
                    </>
                  )}
                />
              </Table>
            </div>
            {/* 修改用户 */}
            <Modal
              title="修改用户"
              centered
              visible={this.state.showChangeUser}
              onOk={this.onFinish}
              onCancel={() => this.changeUserDialog(false, {})}
              okText="确定"
              cancelText="取消"
            >
              <Form
                name="editRoles"
                ref={this.formRef}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 20,
                }}
                onFinish={this.onFinish}
                autoComplete="off"
                initialValues={this.state.userInfo}
              >
                <Form.Item label="角色名称">
                  <Input
                    value={this.state.userInfo.roleName}
                    name="roleName"
                    disabled
                    onChange={this.changeVal}
                  />
                </Form.Item>
                <Form.Item
                  label="角色描述"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名信息",
                    },
                    {
                      type: "string",
                      message: "长度在3-20个字符",
                      pattern: new RegExp(/^\w{3,20}$/),
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input
                    value={this.state.userInfo.roleDesc}
                    name="roleDesc"
                    onChange={this.changeVal}
                  />
                </Form.Item>
              </Form>
            </Modal>
            {/* 删除用户 */}
            <Modal
              title="删除用户"
              centered
              visible={this.state.showDelUser}
              onOk={this.confirmDel}
              onCancel={() => this.showDelUser(false)}
              okText="确定"
              cancelText="取消"
            >
              <p>此操作将永久删除该用户, 是否继续?</p>
            </Modal>
            {/* 添加用户 */}
            <Modal
              title="添加用户"
              centered
              visible={this.state.showAddUser}
              onOk={this.onFinishAddRoles}
              onCancel={() => this.addRoleDialog(false)}
              okText="确定"
              cancelText="取消"
            >
              <Form
                name="basic"
                ref={this.addformRef}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 20,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onValuesChange={this.AddChangeVal}
              >
                <Form.Item
                  label="角色名称"
                  name="roleName"
                  rules={[
                    {
                      required: true,
                      message: "请输入角色名称",
                    },
                    {
                      type: "string",
                      min: 3,
                      max: 8,
                      message: "长度在3到 8位",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="角色描述"
                  name="roleDesc"
                  rules={[
                    {
                      required: true,
                      message: "请输入角色描述",
                    },
                    {
                      type: "string",
                      min: 3,
                      max: 8,
                      message: "长度在3到 8位",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </>
    );
  }
}

export default Roles;
