import React from "react";
import { Divider, Typography, Row, Col } from "antd";
import image1 from "../../assets/microsoft-80658_640.png";
import image2 from "../../assets/icon-720944_640.png";
import image3 from "../../assets/follow-826033_640.png";
import image4 from "../../assets/facebook-807588_640.png";
import Styles from "./Cooperation.module.css";

const companies = [
  { src: image1, title: "Microsoft" },
  { src: image2, title: "Youtube" },
  { src: image3, title: "Ins" },
  { src: image4, title: "Facebook" },
];

export const Cooperation: React.FC = () => {
  return (
    <div className={Styles.content}>
      <Divider orientation="left">
        <Typography.Title level={3}>合作企业</Typography.Title>
      </Divider>
      <Row>
        {companies.map((c, idx) => (
          <Col span={6} key={`bussiness-partner-${idx}`}>
            <img
              src={c.src}
              alt="bussiness-partner"
              style={{
                width: "80%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
