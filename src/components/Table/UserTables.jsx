import React from "react";
import {
  Table,
  message,
  Switch,
  Button,
  Tooltip,
  Pagination,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./UserTables.css";
import {
  getUser,
  delUser,
  changeState,
  changeUser,
  changeRole,
} from "../../api/userChange";
import { getRoles } from "../../api/roles";
const { Column } = Table;
const { Option } = Select;
const pageNums = [2, 5, 10, 50];
class Tables extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // 查询条件
      queryInfo: { query: "", pagenum: 1, pagesize: 2 },
      // 表格数据
      tableData: {
        users: [],
        total: 0,
      },
      // 显示修改用户的弹框
      showChangeUser: false,
      // 显示删除用户的弹框
      showDelUser: false,
      // 显示分配角色的弹框
      showChangeRole: false,
      // 删除用户的id
      delUserId: "",
      // 修改的用户信息
      userInfo: {},
      // 需要被分配权限的用户信息
      changeRoleInfo: {},
      // 所有角色列表
      RoleList: [],
      // 当前选择的角色
      roles: "",
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.showTable();
  }

  // 表格数据
  showTable = async () => {
    const res = await getUser(this.state.queryInfo);
    if (res.meta.status !== 200) {
      return message.error("获取用户列表失败");
    } else {
      this.setState({
        tableData: res.data,
      });
    }
  };
  // 修改表格数据，接收父组件传来的搜索信息
  getData = (value) => {
    this.setState({
      tableData: value,
    });
  };
  // 改变状态
  changeStatu = async (record, text, checked) => {
    console.log(text);
    let res = await changeState(record.id, checked);
    if (res.meta.status !== 200) {
      record.mg_state = !record.mg_state;
      message.error("更新用户状态失败");
    } else {
      message.success("更新用户状态成功");
    }
  };
  // 分页
  changePageNum = async (pageNumber, pageSize) => {
    this.setState(
      {
        queryInfo: {
          ...this.state.queryInfo,
          pagenum: pageNumber,
          pagesize: pageSize,
        },
      },
      () => {
        this.showTable();
      }
    );
  };
  // 确认删除
  confirmDel = async () => {
    const res = await delUser(this.state.delUserId);
    if (res.meta.status !== 200) {
      message.error("删除失败");
    } else {
      message.success("删除成功");
      this.showDelUser(false, "");
      this.showTable();
    }
  };
  // 展示删除用户弹框
  showDelUser = (showDelUser, delUserId) => {
    if (delUserId === undefined) {
      message.warning("已取消删除");
    }
    this.setState({ showDelUser, delUserId });
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
      const res = await changeUser(this.state.userInfo.id, {
        email: this.state.userInfo.email,
        mobile: this.state.userInfo.mobile,
      });
      if (res.meta.status === 200) {
        message.success("更新用户信息成功");
        this.changeUserDialog(false, {});
        this.showTable();
      } else {
        message.error("更新用户信息失败");
      }
    } catch {
      message.error("请稍后再尝试！");
    }
  };
  // 拿到所有角色信息
  getRolesList = async () => {
    try {
      const res = await getRoles();
      this.setState({ RoleList: res.data });
    } catch (err) {
      message.error("请求角色信息失败");
    }
  };
  // 分配权限弹出框
  showChangeRoleDialog = async (showChangeRole, changeRoleInfo) => {
    this.setState({ showChangeRole, changeRoleInfo }, () => {
      this.getRolesList();
    });
  };
  // 选择角色
  handleChange = (roles) => {
    this.setState({ roles });
  };
  // 确认分配
  confirmChangeRole = async () => {
    try {
      const res = await changeRole(this.state.changeRoleInfo.id, {
        rid: this.state.RoleList.filter(
          (item) => item.roleName === this.state.roles
        )[0].id,
      });
      if (res.meta.status === 200) {
        message.success("分配角色成功");
        this.showChangeRoleDialog(false, {});
      } else {
        message.error("分配角色失败");
      }
    } catch (error) {
      message.error("请稍后重试");
    }
  };
  render() {
    return (
      <>
        {/* 表格 */}
        <Table
          bordered
          dataSource={this.state.tableData.users}
          pagination={false}
          rowKey="id"
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
          <Column title="姓名" dataIndex="username" key="id" />
          <Column title="邮箱" dataIndex="email" key="id" />
          <Column title="电话" dataIndex="mobile" key="id" />
          <Column title="角色" dataIndex="role_name" key="id" />
          <Column
            title="状态"
            dataIndex="mg_state"
            key="id"
            render={(text, record) => (
              <>
                <Switch
                  onChange={(checked) =>
                    this.changeStatu(record, text, checked)
                  }
                  defaultChecked={record.mg_state}
                />
              </>
            )}
          />
          <Column
            className="operation"
            title="操作"
            key="id"
            render={(text, record) => (
              <>
                {/* 修改用户 */}
                <Button
                  icon={<EditOutlined />}
                  size="mini"
                  className="warning"
                  onClick={() => this.changeUserDialog(true, text)}
                ></Button>
                {/* 取消/确认删除 */}

                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  size="mini"
                  onClick={() => this.showDelUser(true, text.id)}
                ></Button>

                <Tooltip title="分配权限">
                  <Button
                    type="primary"
                    icon={<EllipsisOutlined />}
                    size="mini"
                    onClick={() => this.showChangeRoleDialog(true, text)}
                  ></Button>
                </Tooltip>
              </>
            )}
          />
        </Table>
        {/* 分页器 */}
        <Pagination
          total={this.state.tableData.total}
          showTotal={(total) => `Total ${total} `}
          showSizeChanger
          defaultPageSize={2}
          pageSizeOptions={pageNums}
          showQuickJumper
          onChange={this.changePageNum}
        />
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
            name="basic"
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
            <Form.Item
              label="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名信息",
                },
              ]}
            >
              <Input value={this.state.userInfo.username} disabled />
            </Form.Item>
            <Form.Item
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱号",
                },
                {
                  type: "string",
                  message: "请输入正确的邮箱地址",
                  pattern: new RegExp(
                    /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                  ),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input
                value={this.state.userInfo.email}
                name="email"
                onChange={this.changeVal}
              />
            </Form.Item>

            <Form.Item
              label="手机"
              rules={[
                {
                  required: true,
                  message: "请输入手机号",
                },
                {
                  type: "string",
                  message: "请输入正确的手机号",
                  min: 1,
                  max: 11,
                  pattern: new RegExp(/^1\d{10}$/),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input
                value={this.state.userInfo.mobile}
                name="mobile"
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
        {/* 分配权限 */}
        <Modal
          title="分配角色"
          centered
          visible={this.state.showChangeRole}
          onOk={this.confirmChangeRole}
          onCancel={() => this.showChangeRoleDialog(false, {})}
          okText="确定"
          cancelText="取消"
        >
          <p>当前用户：{this.state.changeRoleInfo.username}</p>
          <p>当前角色 ：{this.state.changeRoleInfo.role_name}</p>
          <div>
            分配新角色：
            <Select
              defaultValue="请选择角色"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              {this.state.RoleList.map((roles) => (
                <Option value={roles.roleName} key={roles.id}>
                  {roles.roleName}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </>
    );
  }
}

export default Tables;
