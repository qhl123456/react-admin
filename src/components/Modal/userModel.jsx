import React from "react";
import { Modal, Form, Input, message } from "antd";
import { addUser } from "../../api/userChange";
class userModel extends React.Component {
  formRef = React.createRef();
  constructor() {
    super();
    this.state = {
      showAddUser: false,
      userInfo: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
    };
  }
  // 添加用户
  onFinish = async () => {
    try {
      await this.formRef.current.validateFields();
      const res = await addUser(this.state.userInfo);
      if (res.meta.status === 201) {
        message.success("添加用户成功");
        this.addUserDialog(false);
      } else {
        message.error("添加用户失败");
      }
    } catch {
      message.error("请填写完成信息");
    }
  };
  // 添加用户弹出框
  addUserDialog = (showAddUser) => {
    this.setState({ showAddUser }, () => {
      this.formRef.current.resetFields();
    });
  };
  // 输入双向绑定事件
  changeVal = (changedValues, allValues) => {
    this.setState({
      userInfo: allValues,
    });
  };

  render() {
    return (
      <>
        <Modal
          title="添加用户"
          centered
          visible={this.state.showAddUser}
          onOk={this.onFinish}
          onCancel={() => this.addUserDialog(false)}
          okText="确定"
          cancelText="取消"
          afterClose={() => this.props.refreshTable()}
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
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onValuesChange={this.changeVal}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名信息",
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
                {
                  type: "string",
                  min: 6,
                  max: 15,
                  message: "密码最少输入6位,最多15位,且必须为数字",
                  pattern: /\d{6}$/,
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
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
              <Input />
            </Form.Item>

            <Form.Item
              label="手机"
              name="mobile"
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
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default userModel;
