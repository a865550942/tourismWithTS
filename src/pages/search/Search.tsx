import React, { useEffect } from "react";
import styles from "./Search.module.css";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";

interface MatchParams {
  keywords: string;
  [key: string]: string;
}

export const Search: React.FC = () => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((state) => state.productSearch.error);
  const pagination = useSelector((s) => s.productSearch.pagination);
  const productList = useSelector((s) => s.productSearch.data);

  const dispatch = useDispatch();
  const location = useLocation();
  console.log("打印keywords", keywords);
  // 由于keyword来源于url，所以这里监听url的变化，搜索一旦被点下就会重新搜索旅游路线
  useEffect(() => {
    // @ts-ignore
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    // @ts-ignore
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };
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
      {/* 分类过滤器 */}
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>
      {/* 产品列表 */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
