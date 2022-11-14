import React from "react";
import { Layout, Breadcrumb, message } from "antd";
import { getEchartsMock } from "../../api/Welcome";
import * as echarts from "echarts";
import _ from "lodash";
import { getEchartsData } from "../../api/echartTable";
const { Content } = Layout;
const styles = { width: "100%", height: "600px" };

class Reports extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
      // 存放所有图标数据
      echartsData: [],
    };
  }
  // 面包屑返回首页
  goHome = () => {
    this.props.history.push("/welcome");
  };
  componentDidMount = () => {
    this.getEchartData();
    this.getEchartsData();
  };
  getEchartData = async () => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    try {
      const res = await getEchartsData();
      if (res.meta.status === 200) {
        message.success("获取报表信息成功");
        const result = _.merge(res.data, this.state.options);
        // 绘制图表
        myChart.setOption(result);
      } else {
        message.error("获取报表信息失败");
      }
    } catch (error) {
      message.error("获取报表信息失败");
    }
  };
  getEchartsData = async () => {
    const res = await getEchartsMock();
    this.setState(
      {
        echartsData: res,
      },
      () => {
        var firstChart = echarts.init(document.getElementById("next"));
        firstChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option7")[0]
        );
      }
    );
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
              <Breadcrumb.Item>数据统计</Breadcrumb.Item>
              <Breadcrumb.Item>数据列表</Breadcrumb.Item>
            </Breadcrumb>
            {/* 头部搜索和添加用户 */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div id="main" style={styles}></div>
              <div id="next" style={styles}></div>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

export default Reports;
