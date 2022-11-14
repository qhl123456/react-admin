import React, { useState, useEffect } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Button,
  Tag,
  Input,
  Pagination,
  Modal,
  Form,
  Cascader,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCateList } from "../../api/cate";
import { formatDate } from "../../utils/utils";
import _ from "lodash";
import { addGoods, delGoods, getGoodsData, upGoodsInfo } from "../../api/goods";
const { Content } = Layout;
const { Search } = Input;
export default function Goods(props) {
  const goHome = () => {
    props.history.push("/welcome");
  };
  const colums = [
    {
      title: "",
      dataIndex: "",
      key: "id",
      render: (text, record, index) => {
        return (
          <>
            <Tag color="purple" key={record.id}>
              {index + 1}
            </Tag>
          </>
        );
      },
    },
    {
      title: "商品名称",
      dataIndex: "goods_name",
      key: "goods_name",
    },
    {
      title: "商品价格(元)",
      dataIndex: "goods_price",
      key: "goods_price",
      width: 120,
    },
    {
      title: "商品重量(Kg)",
      dataIndex: "goods_weight",
      key: "goods_weight",
      width: 120,
    },
    {
      title: "创建时间",
      dataIndex: "upd_time",
      key: "upd_time",
      width: 150,
    },
    {
      title: "操作",
      key: "action",
      render: (record) => {
        return (
          <div className="operation">
            <Button
              icon={<EditOutlined />}
              size="mini"
              type="primary"
              onClick={() => showEditBox(record)}
            >
              编辑
            </Button>
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              size="mini"
              onClick={() => showDelbox(record.goods_id)}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  // 查询条件
  const [queryInfo, setQueryInfo] = useState({
    query: "",
    pagenum: 1,
    pagesize: 10,
  });
  // 表格数据
  const [tableData, setTableData] = useState([]);
  // 页数
  const [pageNums] = useState([5, 10, 15, 20]);
  // 商品分类
  const [cateList, setcateList] = useState([]);
  // 添加商品对话框
  const [addvisible, setaddvisible] = useState(false);
  // 删除商品对话框
  const [delvisible, setdelvisible] = useState(false);
  // 编辑商品对话框
  const [editvisible, seteditvisible] = useState(false);
  // 删除/编辑商品的id
  const [userId, setUserid] = useState("");
  // 添加商品信息
  const [adduserInfo, setadduserInfo] = useState({
    goods_name: "",
    goods_price: "",
    goods_weight: "",
    goods_number: "",
    // 商品分类所属数组
    goods_cat: "",
  });
  // 编辑商品信息
  const [edituserinfo, setedituserinfo] = useState({});
  // 表单对象
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  // 请求商品数据
  useEffect(() => {
    // 商品信息
    getGoodsData(queryInfo).then((res) => {
      res.data.goods.forEach(
        (item) => (item.upd_time = formatDate(item.upd_time))
      );
      setTableData(res.data);
    });
  }, [queryInfo, addvisible, delvisible, editvisible]);

  // 请求分类列表的查询
  useEffect(() => {
    // 分类列表
    getCateList().then((res) => {
      setcateList(res.data);
    });
  }, []);

  // 分页器变化事件
  function changePageNum(page, pageSize) {
    setQueryInfo({
      ...queryInfo,
      pagenum: page,
      pagesize: pageSize,
    });
  }

  // 输入查询字段(缺少防抖函数)
  function changeSearchValue(e) {
    setQueryInfo({
      ...queryInfo,
      query: e.target.value,
    });
  }
  // 防抖函数
  // const debounceSearch = _.debounce(changeSearchValue, 1000);
  //取消添加重置表单
  async function calcelAdd() {
    await setaddvisible(false);
    form.resetFields();
  }

  // 确认添加
  async function addConfirm() {
    try {
      const value = await form.validateFields();
      const res = await addGoods(adduserInfo);
      // console.log(res);
      if (res.meta.status === 201) {
        message.success("添加商品成功");
      } else {
        message.error("添加商品失败");
        // console.log(res);
      }
      setaddvisible(false);
      form.resetFields();
    } catch (err) {
      message.error("请填写完整信息");
      console.log(err);
    }
  }

  // 添加信息的双向绑定
  function changeUserInfo(changedValues, allValues) {
    setadduserInfo(allValues);
  }

  // 权限数组转字符串
  function changeCate(value) {
    console.log(value);
    setadduserInfo({
      ...adduserInfo,
      goods_cat: value.join(","),
    });
  }
  // 显示删除弹窗，保存删除id
  async function showDelbox(id) {
    setdelvisible(true);
    setUserid(id);
  }
  // 确认删除
  async function delConfirm() {
    try {
      const res = await delGoods(userId);
      if (res.meta.status === 200) {
        message.success("删除成功");
      } else {
        message.error("删除失败");
      }
      setdelvisible(false);
    } catch (error) {
      message.error("服务器出错");
    }
  }
  // 取消删除
  function calcelDel() {
    setdelvisible(false);
    message.warning("已取消删除");
  }
  // 显示修改弹窗，把当前行的值赋给form
  async function showEditBox(info) {
    seteditvisible(true);
    editForm.setFieldsValue({
      ...edituserinfo,
      goods_cat: "0,0,0",
      goods_name: info.goods_name,
      goods_price: info.goods_price,
      goods_weight: info.goods_weight,
      goods_number: info.goods_number,
    });
    // 赋值给后台传的值
    setedituserinfo(info);
  }
  // 编辑商品信息的事件
  function editUserInfo(changedValues, allValues) {
    setedituserinfo({
      ...edituserinfo,
      goods_cat: "0,0,0",
      goods_name: allValues.goods_name,
      goods_price: allValues.goods_price,
      goods_weight: allValues.goods_weight,
      goods_number: allValues.goods_number,
    });
  }
  // 确认编辑
  async function EditConfirm() {
    try {
      await editForm.validateFields();
      const res = await upGoodsInfo(edituserinfo.goods_id, edituserinfo);
      if (res.meta.status === 200) {
        message.success("修改商品信息成功");
      } else {
        message.error("修改商品信息失败");
      }
      seteditvisible(false);
    } catch (err) {
      message.error("请稍后重试");
      console.log(err);
    }
  }
  return (
    <Layout className="site-layout">
      <Content style={{ margin: " 16px" }}>
        {/* 面包屑导航 */}
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item onClick={goHome}>首页</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品列表</Breadcrumb.Item>
        </Breadcrumb>
        {/* 头部搜索和添加商品 */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="userHeader">
            {/* 头部输入、添加*/}
            <Search
              placeholder="请输入内容"
              enterButton
              value={queryInfo.query}
              onChange={changeSearchValue}
              className="search-left"
              size="large"
            />
            <Button
              type="primary"
              size="large"
              onClick={() => setaddvisible(true)}
            >
              添加商品
            </Button>
          </div>
          {/* 展示表格 */}
          <Table
            dataSource={tableData.goods}
            columns={colums}
            bordered
            pagination={false}
            rowKey="goods_id"
          />
          {/* 分页器 */}
          <Pagination
            total={tableData.total}
            showTotal={(total) => `Total ${total} `}
            showSizeChanger
            defaultPageSize={10}
            pageSizeOptions={pageNums}
            showQuickJumper
            onChange={changePageNum}
          />
          {/* 添加商品 */}
          <Modal
            title="添加商品"
            visible={addvisible}
            onOk={addConfirm}
            onCancel={calcelAdd}
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
              onValuesChange={changeUserInfo}
              autoComplete="off"
            >
              <Form.Item
                label="商品名称"
                name="goods_name"
                rules={[
                  {
                    required: true,
                    message: "请输入商品名称",
                  },
                ]}
                validateTrigger="onBlur"
                key="name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品价格(元)"
                name="goods_price"
                key="price"
                rules={[
                  {
                    required: true,
                    message: "请输入商品价格",
                  },
                  {
                    type: "string",
                    message: "请输入正确的价格",
                    pattern: new RegExp(/^\d{1,8}$/),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品数量(个)"
                name="goods_number"
                key="number"
                rules={[
                  {
                    required: true,
                    message: "请输入商品数量",
                  },
                  {
                    type: "string",
                    message: "请输入正确的数量",
                    pattern: new RegExp(/^\d{1,8}$/),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品重量(KG)"
                name="goods_weight"
                key="weight"
                rules={[
                  {
                    required: true,
                    message: "请输入商品重量",
                  },
                  {
                    type: "string",
                    message: "请输入正确的重量",
                    pattern: new RegExp(/^\d{1,8}$/),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品分类"
                name="goods_cat"
                key="cat"
                rules={[
                  {
                    required: true,
                    message: "请选择商品分类",
                  },
                ]}
              >
                <Cascader
                  options={cateList}
                  expandTrigger="hover"
                  fieldNames={{
                    label: "cat_name",
                    value: "cat_name",
                    children: "children",
                  }}
                  placeholder="请选择商品分类"
                  onChange={changeCate}
                />
              </Form.Item>
            </Form>
          </Modal>
          {/* 删除商品 */}
          <Modal
            title="删除商品"
            visible={delvisible}
            onOk={delConfirm}
            onCancel={calcelDel}
            okText="确定"
            cancelText="取消"
          >
            <p>此操作将永久删除该商品, 是否继续?</p>
          </Modal>
          {/* 编辑商品 */}
          <Modal
            title="编辑商品"
            visible={editvisible}
            onOk={EditConfirm}
            onCancel={() => seteditvisible(false)}
            okText="确定"
            cancelText="取消"
          >
            <Form
              name="edit"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 19,
              }}
              initialValues={{
                goods_name: "",
                goods_price: "",
                goods_weight: "",
                goods_number: "",
              }}
              form={editForm}
              onValuesChange={editUserInfo}
              autoComplete="off"
            >
              <Form.Item
                label="商品名称"
                name="goods_name"
                key="index"
                rules={[
                  {
                    required: true,
                    message: "请输入商品名称",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品价格(元)"
                name="goods_price"
                key="id1"
                rules={[
                  {
                    required: true,
                    message: "请输入商品价格",
                  },
                  {
                    message: "请输入正确的价格",
                    pattern: new RegExp(/^\d{1,8}$/),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品数量(个)"
                name="goods_number"
                key="id2"
                rules={[
                  {
                    required: true,
                    message: "请输入商品数量",
                  },
                  {
                    message: "请输入正确的数量",
                    pattern: new RegExp(/^\d{1,8}$/),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品重量(KG)"
                name="goods_weight"
                key="id3"
                rules={[
                  {
                    required: true,
                    message: "请输入商品重量",
                  },
                  {
                    message: "请输入正确的重量",
                    pattern: new RegExp(/^\d{1,8}$/),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
}
