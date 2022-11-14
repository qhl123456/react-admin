import React from "react";
import welcome from "./Welcome.module.css";
import { Layout, Card, Col, Row, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { getEchartsMock } from "../../api/Welcome";
import * as echarts from "echarts";
const { Content } = Layout;
class Welcome extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // 存放所有图标数据
      echartsData: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getEchartsData();
    notification.open({
      message: "WelCome! 用户admin！",
      description: "欢迎您回来！",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  getEchartsData = async () => {
    const res = await getEchartsMock();

    this.setState(
      {
        echartsData: res,
        loading: false,
      },
      () => {
        var firstChart = echarts.init(document.getElementById("firstEcharts"));
        var secondChart = echarts.init(
          document.getElementById("secondEcharts")
        );
        var thirdChart = echarts.init(document.getElementById("thirdEcharts"));
        var fourChart = echarts.init(document.getElementById("fourEcharts"));
        var fiveChart = echarts.init(document.getElementById("fiveEcharts"));
        var sixChart = echarts.init(document.getElementById("sixEcharts"));
        firstChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option1")[0]
        );
        secondChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option2")[0]
        );
        thirdChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option3")[0]
        );
        fourChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option4")[0]
        );
        fiveChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option5")[0]
        );
        sixChart.setOption(
          this.state.echartsData.filter((item) => item.id === "option6")[0]
        );
      }
    );
  };
  render() {
    return (
      <>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <h1 id="welcome">Welcome！</h1>
            <div
              className="site-card-wrapper"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Row gutter={10}>
                <Col span={6}>
                  <Card
                    size="small"
                    title="最近访问数"
                    loading={this.state.loading}
                  >
                    <div
                      id="firstEcharts"
                      style={{ width: 260, height: 200 }}
                    ></div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    size="small"
                    title="客户分布"
                    loading={this.state.loading}
                  >
                    <div
                      id="secondEcharts"
                      style={{ width: 260, height: 200 }}
                    ></div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    size="small"
                    title="最近订单数"
                    loading={this.state.loading}
                  >
                    <div
                      id="thirdEcharts"
                      style={{ width: 260, height: 200 }}
                    ></div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    size="small"
                    title="总收藏数"
                    loading={this.state.loading}
                  >
                    <div
                      id="fourEcharts"
                      style={{ width: 260, height: 200 }}
                    ></div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    size="small"
                    title="订单汇总"
                    loading={this.state.loading}
                  >
                    <div
                      id="fiveEcharts"
                      style={{ width: 520, height: 300 }}
                    ></div>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card
                    size="small"
                    title="网络延迟"
                    loading={this.state.loading}
                  >
                    <div
                      id="sixEcharts"
                      style={{ width: 520, height: 300 }}
                    ></div>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

export default Welcome;
