import React, { useState, useEffect } from "react";
import {
  Layout,
  Breadcrumb,
  Table,
  Button,
  Tag,
  Pagination,
  Modal,
  Form,
  Cascader,
  message,
  Input,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  CloseSquareTwoTone,
} from "@ant-design/icons";
import store from "../../store";
import * as actions from "../../store/actions/actions";
import { getCateList, addCate, delCate, editCata } from "../../api/cate";
const { Content } = Layout;
export default function Cates(props) {
  const goHome = () => {
    props.history.push("/welcome");
  };
  const colums = [
    {
      title: "",
      dataIndex: "",
    },
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
      title: "分类名称",
      dataIndex: "cat_name",
    },
    {
      title: "是否有效",
      dataIndex: "cat_deleted",
      width: 280,
      render: (text) => (
        <>
          <Tag visible={text === false}>
            <CheckCircleTwoTone />
          </Tag>
          <Tag visible={text === true}>
            <CloseSquareTwoTone />
          </Tag>
        </>
      ),
    },
    {
      title: "排序",
      dataIndex: "cat_level",
      width: 280,
      render: (text) => (
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
      ),
    },

    {
      title: "操作",
      dataIndex: "action",
      width: 280,
      render: (text, record) => (
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
            onClick={() => showDelbox(record.cat_id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  // 查询条件
  const [queryInfo, setQueryInfo] = useState({
    query: "",
    pagenum: 1,
    pagesize: 5,
  });
  // 表格数据
  const [tableData, setTableData] = useState([]);
  // 分类列表
  const [cateList, setcateList] = useState([]);
  // 页数
  const [pageNums] = useState([3, 5, 10, 15]);
  // 添加分类对话框
  const [addvisible, setaddvisible] = useState(false);
  // 表单对象
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  // 添加分类信息
  const [adduserInfo, setadduserInfo] = useState({
    cat_name: "",
    // 分类分类所属数组
    selectKeys: [],
  });
  // 删除分类对话框
  const [delvisible, setdelvisible] = useState(false);
  // 删除/编辑分类的id
  const [userId, setUserid] = useState("");
  // 编辑商品对话框
  const [editvisible, seteditvisible] = useState(false);
  // 编辑商品信息
  const [edituserinfo, setedituserinfo] = useState({});

  // 请求初始数据
  useEffect(() => {
    // 在redux的action里发送请求获取数据
    store.dispatch(actions.GETCATES());
    // 订阅
    store.subscribe(() => {
      setTableData(store.getState().Cate);
    });
  }, []);
  //二级分类数据
  useEffect(() => {
    getCateList({ type: 2 }).then((res) => setcateList(res.data));
  }, []);
  // 分页器变化请求数据
  useEffect(() => {
    getCateList(queryInfo).then((res) => setTableData(res.data));
  }, [queryInfo, addvisible, delvisible, editvisible]);

  // 分页器变化事件
  function changePageNum(page, pageSize) {
    setQueryInfo({
      ...queryInfo,
      pagenum: page,
      pagesize: pageSize,
    });
  }
  // 添加信息的双向绑定
  function changeUserInfo(changedValues, allValues) {
    setadduserInfo(allValues);
  }
  //取消添加重置表单
  async function calcelAdd() {
    await setaddvisible(false);
    form.resetFields();
  }
  // 确认添加
  async function addConfirm() {
    await form.validateFields();
    try {
      const res = await addCate({
        cat_pid: adduserInfo.selectKeys[adduserInfo.selectKeys.length - 1],
        cat_name: adduserInfo.cat_name,
        cat_level: adduserInfo.selectKeys.length,
      });
      if (res.meta.status === 201) {
        message.success("添加成功");
      } else {
        message.error("添加分类信息失败");
      }
      setaddvisible(false);
      form.resetFields();
    } catch (err) {
      message.error("请稍后重试！");
    }
  }
  // 显示删除弹窗，保存删除id
  async function showDelbox(id) {
    setdelvisible(true);
    setUserid(id);
  }
  // 取消删除
  function calcelDel() {
    setdelvisible(false);
    message.warning("已取消删除");
  }
  // 确认删除
  async function delConfirm() {
    try {
      const res = await delCate(userId);
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
  // 显示修改弹窗，把当前行的值赋给form
  async function showEditBox(info) {
    seteditvisible(true);
    editForm.setFieldsValue({
      cat_name: info.cat_name,
    });
    // 赋值给后台传的值
    setedituserinfo(info);
  }
  // 编辑商品信息的事件
  function editUserInfo(changedValues, allValues) {
    setedituserinfo({
      ...edituserinfo,
      cat_name: allValues.cat_name,
    });
  }
  // 确认编辑
  async function EditConfirm() {
    try {
      await editForm.validateFields();
      const res = await editCata(edituserinfo.cat_id, edituserinfo);
      console.log(res);
      if (res.meta.status === 200) {
        message.success("修改商品信息成功");
      } else {
        message.error("修改商品信息失败");
      }
      seteditvisible(false);
    } catch (err) {
      message.error("请稍后重试");
    }
  }
  return (
    <Layout className="site-layout">
      <Content style={{ margin: " 16px" }}>
        {/* 面包屑导航 */}
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item onClick={goHome}>首页</Breadcrumb.Item>
          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
          <Breadcrumb.Item>分类列表</Breadcrumb.Item>
        </Breadcrumb>
        {/* 头部搜索和添加分类 */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="userHeader">
            {/* 头部、添加*/}
            <Button
              type="primary"
              size="large"
              onClick={() => setaddvisible(true)}
            >
              添加分类
            </Button>
          </div>
          {/* 展示表格 */}
          <Table
            dataSource={tableData.result}
            columns={colums}
            bordered
            pagination={false}
            key="id"
            rowKey="cat_id"
          />
          {/* 分页器 */}
          <Pagination
            total={tableData.total}
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
                label="分类名称"
                name="cat_name"
                rules={[
                  {
                    required: true,
                    message: "请输入分类名称",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="父级分类"
                name="selectKeys"
                rules={[
                  {
                    required: true,
                    message: "请选择父级分类",
                  },
                ]}
              >
                <Cascader
                  options={cateList}
                  expandTrigger="hover"
                  fieldNames={{
                    label: "cat_name",
                    value: "cat_id",
                    children: "children",
                  }}
                  placeholder="请选择父级分类"
                />
              </Form.Item>
            </Form>
          </Modal>
          {/* 删除分类 */}
          <Modal
            title="删除分类"
            visible={delvisible}
            onOk={delConfirm}
            onCancel={calcelDel}
            okText="确定"
            cancelText="取消"
          >
            <p>此操作将永久删除该分类, 是否继续?</p>
          </Modal>
          {/* 编辑分类 */}
          <Modal
            title="编辑分类"
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
                cat_name: "",
              }}
              form={editForm}
              onValuesChange={editUserInfo}
              autoComplete="off"
            >
              <Form.Item
                label="分类名称"
                name="cat_name"
                rules={[
                  {
                    required: true,
                    message: "请输入分类名称",
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
