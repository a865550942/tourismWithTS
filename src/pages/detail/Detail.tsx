import React from "react";
import { useParams } from "react-router-dom";

export const Detail: React.FC = () => {
  console.log("打印路线信息", useParams());
  return <h1>路由路线详情页面</h1>;
};
