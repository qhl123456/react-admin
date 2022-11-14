import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userLogin } from "../../api/login";
import { userLoginMock } from "../../api/loginmock";
import "./Login.css";
import { withRouter } from "react-router-dom";
class Login extends React.Component {
  formRef = React.createRef();
  constructor() {
    super();
    this.state = {
      userInfo: {
        username: "",
        password: "",
      },
    };
  }
  // 重置表单事件
  onReset = () => {
    this.formRef.current.resetFields();
  };
  // 输入成功后事件
  onFinish = async () => {
    try {
      const value = await this.formRef.current.validateFields();
      const data = await userLoginMock(value);
      //登录成功后：
      // 1、记录登录的信息
      sessionStorage.setItem("username", this.state.userInfo.username);
      // 2、保存后端返回的权限数据
      sessionStorage.setItem("houPaths", JSON.stringify(data[0].path));
      // 真正的登录
      const res = await userLogin({ username: "admin", password: "123456" });
      if (res.meta.status === 200) {
        message.success("登陆成功");
        sessionStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      } else {
        message.error("用户名或密码不正确");
      }
    } catch {
      message.error("请稍后再尝试！");
    }
  };

  // 输入框输入事件
  changeVal = (changedValues, allFields) => {
    this.setState({
      userInfo: allFields,
    });
  };

  render() {
    return (
      <>
        <div className="login-contain">
          <div className="login-box">
            <div className="avatar_box">
              <img src="/logo192.png" alt="" />
            </div>
            <div className="login_form">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
                ref={this.formRef}
                onValuesChange={(changedValues, allFields) => {
                  this.changeVal(changedValues, allFields);
                }}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入用户名"
                  />
                </Form.Item>
                <Form.Item
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
                      message: "密码最少输入6位,最多15位",
                      pattern: /\d{6}$/,
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入密码"
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit" size="large">
                    登录
                  </Button>
                  <Button size="large" className="info" onClick={this.onReset}>
                    重置
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
