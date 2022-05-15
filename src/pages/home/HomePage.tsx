import React from "react";
import Styles from "./HomePage.module.css";
import {
  Header,
  // HeaderComponent,
  Footer,
  Carousel,
  SideMenu,
  ProductionCollection,
  Cooperation,
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
// import { productList1, productList2, productList3 } from "./mockup";
import sideImage1 from "../../assets/sider_2019_12-09.png";
import sideImage2 from "../../assets/sider_2019_02-04.png";
import sideImage3 from "../../assets/sider_2019_02-04-2.png";
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
import { Dispatch } from "redux";
import { MainLayout } from "../../layouts/mainLayout";
const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList,
  };
};

// 这里dispatch如果加: Dispatch会导致dispatch中参数不符合Dispatch中AnyAction的形式
const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    },
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData();
  }

  render() {
    // console.log("打印props", this.props.t);
    const { t, productList, loading, error } = this.props;
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
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu></SideMenu>
          </Col>
          <Col span={18}>
            <Carousel></Carousel>
          </Col>
        </Row>
        <ProductionCollection
          title={
            <Typography.Title level={3} type="warning">
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
          sideImage={sideImage1}
          products={productList[0].touristRoutes}
        ></ProductionCollection>
        <ProductionCollection
          title={
            <Typography.Title level={3} type="danger">
              {t("home_page.new_arrival")}
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        ></ProductionCollection>
        <ProductionCollection
          title={
            <Typography.Title level={3} type="success">
              {t("home_page.domestic_travel")}
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        ></ProductionCollection>
        <Cooperation />
      </MainLayout>
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent));
