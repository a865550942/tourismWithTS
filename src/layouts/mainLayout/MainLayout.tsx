import React from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";
interface MainLayoutProps {
  children: React.ReactNode;
}

// react18的children不是默认有的需额外定义
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      {/* 页面内容content */}
      <div className={styles["page-content"]}>{children}</div>
      {/* <Cooperation /> */}
      <Footer></Footer>
    </>
  );
};
