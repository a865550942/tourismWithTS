import React from "react";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/order/slice";

export const Placeholder: React.FC = (props) => {
  const jwt = useSelector((s) => s.user.token);
  const loading = useSelector((s) => s.order.laoding);
  const order = useSelector((s) => s.order.currentOrder);
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              // @ts-ignore
              dispatch(placeOrder({ jwt, order: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
