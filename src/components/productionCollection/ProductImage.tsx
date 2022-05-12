import React from "react";
import { Image, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
interface PropsType {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price: number | string;
  title: string;
}

export const ProductiImage: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
}) => {
  let navigate = useNavigate();

  //   function jump() {
  //     navigate(`/detail/${id}`);
  //   }
  //   const jump = () => {
  //     navigate(`/detail/${id}`);
  //   };

  return (
    <Link to={`detail/${id}`}>
      {size == "large" ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ￥{price}起{title.slice(0, 25)}
        </Typography.Text>
      </div>
    </Link>
  );
};
