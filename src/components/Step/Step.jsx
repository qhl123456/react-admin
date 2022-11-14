import { useState, memo, useEffect } from "react";
import { Steps, Modal } from "antd";
import store from "../../store/index";
const { Step } = Steps;
function OrderStep(props) {
  return (
    <>
      <Modal
        title="物流查询"
        visible={props.isModalVisible}
        onOk={() => props.fn(false)}
        onCancel={() => props.fn(false)}
      >
        <Steps current={0} direction="vertical">
          {props.info.map((item) => (
            <>
              {
                <Step
                  title={item.context}
                  description={item.ftime}
                  key="index"
                />
              }
            </>
          ))}
        </Steps>
      </Modal>
    </>
  );
}
let mapStateToProps = (state) => {
  return {
    orders: state.Order,
  };
};
let mapDispatchToProps = (dispatch) => ({
  getOrders: (queryInfo) => dispatch(actions.GETORDER(queryInfo)),
});
export default OrderStep;
