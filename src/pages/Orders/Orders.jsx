import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Breadcrumb,
  Input,
  Button,
  Table,
  Tooltip,
  Pagination,
  Modal,
  Form,
  Cascader,
} from "antd";
import * as actions from "../../store/actions/actions";
import { EditOutlined, EnvironmentFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import cityData from "./citydata";
import OrderStep from "../../components/Step/Step";
import { formatDate } from "../../utils/utils";
const { Content } = Layout;
const { Search } = Input;
function Order(props) {
  const colums = [
    {
      title: "#",
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <>
            <span>{index + 1}</span>
          </>
        );
      },
    },
    {
      title: "订单编号",
      dataIndex: "order_number",
      width: 300,
    },
    {
      title: "订单价格",
      dataIndex: "order_price",
      width: 230,
    },
    {
      title: "是否付款",
      dataIndex: "pay_status",
      width: 230,
    },
    {
      title: "是否发货",
      dataIndex: "is_send",
      width: 240,
    },
    {
      title: "下单时间",
      dataIndex: "create_time",
      width: 300,
    },

    {
      title: "操作",
      dataIndex: "action",
      width: 250,
      render: (text, record) => (
        <div className="operation">
          <Tooltip title="修改地址">
            <Button
              icon={<EditOutlined />}
              size="mini"
              type="primary"
              onClick={() => setaddvisible(true)}
            ></Button>
          </Tooltip>
          <Tooltip title="物流查询">
            <Button
              className="success"
              icon={<EnvironmentFilled />}
              size="mini"
              onClick={() => showDelbox(record)}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const goHome = () => {
    props.history.push("/welcome");
  };
  // 查询条件
  const [queryInfo, setqueryInfo] = useState({
    query: "",
    pagenum: 1,
    pagesize: 5,
  });
  const [pageNums] = useState([5, 10, 15]);
  // 表单对象
  const [form] = Form.useForm();
  // 编辑地址
  const [addvisible, setaddvisible] = useState(false);

  // 搜索事件
  const changeSearchValue = (e) => {
    setqueryInfo({
      ...queryInfo,
      query: e.target.value,
    });
  };
  // 页码改变事件
  const changePageNum = (page, pageSize) => {
    setqueryInfo({
      ...queryInfo,
      pagenum: page,
      pagesize: pageSize,
    });
  };
  // 添加地址关闭事件
  const addAddressColsed = () => {
    setaddvisible(false);
    form.resetFields();
  };
  // 控制modal的显示/隐藏
  const [isModalVisible, setisModalVisible] = useState(false);
  // 初始化数据
  useEffect(() => {
    props.getOrders(queryInfo);
  }, [queryInfo]);

  // 初始化物流数据
  useEffect(() => {
    props.getLog();
  }, [isModalVisible]);
  // 查看物流
  const showDelbox = (info) => {
    controlVisible(true);
  };
  // 控制显示与隐藏的函数
  function controlVisible(flag) {
    setisModalVisible(flag);
  }
  return (
    <>
      <Layout className="site-layout">
        <Content style={{ margin: " 16px" }}>
          {/* 面包屑导航 */}
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item onClick={goHome}>首页</Breadcrumb.Item>
            <Breadcrumb.Item>订单管理</Breadcrumb.Item>
            <Breadcrumb.Item>订单列表</Breadcrumb.Item>
          </Breadcrumb>
          {/* 头部搜索 */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className="userHeader">
              <Search
                placeholder="请输入内容"
                enterButton
                value={queryInfo.query}
                onChange={changeSearchValue}
                className="search-left"
                size="large"
              />
            </div>
            {/* 表格 */}
            <Table
              dataSource={props.orders.goods}
              columns={colums}
              bordered
              pagination={false}
              rowKey="order_id"
            />
            {/* 分页器 */}
            <Pagination
              total={props.orders.total}
              showTotal={(total) => `Total ${total} `}
              showSizeChanger
              defaultPageSize={5}
              pageSizeOptions={pageNums}
              showQuickJumper
              onChange={changePageNum}
            />
            {/* 添加分类 */}
            <Modal
              title="添加分类"
              visible={addvisible}
              onOk={addAddressColsed}
              onCancel={addAddressColsed}
            >
              <Form
                name="basic"
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 19,
                }}
                initialValues={{
                  remember: true,
                }}
                form={form}
                autoComplete="off"
              >
                <Form.Item
                  label="省市区/县"
                  name="address1"
                  rules={[
                    {
                      required: true,
                      message: "请选择省市区/县",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Cascader
                    options={cityData}
                    expandTrigger="hover"
                    placeholder="Select"
                  />
                </Form.Item>
                <Form.Item
                  label="详细地址"
                  name="address2"
                  rules={[
                    {
                      required: true,
                      message: "请填写详细地址",
                    },
                  ]}
                >
                  <Input placeholder="请填写详细地址" />
                </Form.Item>
              </Form>
            </Modal>
            {/* 物流弹框 */}
            <OrderStep
              isModalVisible={isModalVisible}
              fn={controlVisible}
              info={props.loginfo}
            />
          </div>
        </Content>
      </Layout>
    </>
  );
}
// 参数：state是redux所有的数据
// 返回值：当前组件需要的数据
let mapStateToProps = (state) => {
  if (state.Order.goods) {
    state.Order.goods.forEach(
      (item) => (item.create_time = formatDate(item.create_time))
    );
  }
  return {
    orders: state.Order,
    loginfo: state.Log,
  };
};
let mapDispatchToProps = (dispatch) => ({
  getOrders: (queryInfo) => dispatch(actions.GETORDER(queryInfo)),
  getLog: () => dispatch(actions.GETLOG()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
