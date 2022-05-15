import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Spin,
  Row,
  Col,
  DatePicker,
  Space,
  Divider,
  Typography,
  Anchor,
  Menu,
} from "antd";
import styles from "./Detail.module.css";
import {
  Header,
  Footer,
  ProductIntro,
  ProductComments,
} from "../../components";
import { commentMockData } from "./mockup";
import {
  productDetailSlice,
  getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import store, { RootDispatch } from "../../redux/store";
import { MainLayout } from "../../layouts/mainLayout";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
  // 如果不加这一句就会报matchparam not assignable to type xxx
  [key: string]: string;
}
type MatchParams1 = {
  touristRouteId: string;
};

export const Detail: React.FC = () => {
  // 报错 Type 'MatchParams' does not satisfy the constraint 'string | Record<string, string | undefined>'.
  // Type 'MatchParams' is not assignable to type 'Record<string, string | undefined>'.
  // Index signature for type 'string' is missing in type 'MatchParams'.ts(2344)
  const { touristRouteId } = useParams<MatchParams>();
  // 不报错
  // const { touristRouteId } = useParams<{ touristRouteId: string }>();
  // 不报错
  // const { touristRouteId } = useParams<MatchParams1>();

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO类型报错，可能是版本问题，后面待解决
    // @ts-ignore
    dispatch(getProductDetail(touristRouteId));
  }, []);

  if (loading) {
    return (
      // 请求中
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  // 如果网络发生错误
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <MainLayout>
      {/* 产品简介 & 日期选择 */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.shortDescription}
              price={product.price}
              coupons={product.coupons}
              points={product.points}
              discount={product.discount}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key={1}>
            <Anchor.Link href="#features" title="产品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Anchor.Link href="#fees" title="费用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Anchor.Link href="#notes" title="预定需知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* 产品特色 后端返回的内容中已包含在后台富文本编辑器写好的html代码*/}
      <div id="features" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 费用 */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>费用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 预定需知 */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>预订须知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 产品评价 */}
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>用户评价</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};
