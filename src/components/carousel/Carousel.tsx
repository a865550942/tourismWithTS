import React from "react";
import Styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from "antd";
import carosuelImage1 from "../../assets/carousel_1.jpg";
import carosuelImage2 from "../../assets/carousel_2.jpg";
import carosuelImage3 from "../../assets/carousel_3.jpg";

export const Carousel: React.FC = () => {
  return (
    <AntCarousel autoplay className={Styles.slider}>
      <Image src={carosuelImage1}></Image>
      <Image src={carosuelImage2}></Image>
      <Image src={carosuelImage3}></Image>
    </AntCarousel>
  );
};
