import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import {
  LanguageActionTypes,
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  let navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const menuClickHandler = (e) => {
    if (e.key === "new") {
      const action = addLanguageActionCreator("新语言", "new_lang");
      dispatch(action);
    } else {
      const action = changeLanguageActionCreator(e.key);
      dispatch(action);
    }
  };
  const jwt = useSelector((s) => s.user.token);
  const [username, setUsername] = useState("");
  useEffect(() => {
    console.log("jwt发生改变");
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);
  const onLogout = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/");
  };

  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                })}
                <Menu.Item key={"new"}>
                  {t("header.add_new_language")}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined></GlobalOutlined>}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button onClick={() => navigate("./shoppingCart")}>
                {t("header.shoppingCart")}
              </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                {t("header.register")}
              </Button>
              <Button
                onClick={() => {
                  navigate("/signIn");
                }}
              >
                {t("header.signin")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" className={styles["App-logo"]}></img>
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          className={styles["search-input"]}
          placeholder="请输入查询关键字"
          onSearch={(keywords) => {
            // navigate("/search/" + keywords);
            navigate(`/search/${keywords}`);
          }}
        ></Input.Search>
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
        <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
        <Menu.Item key={3}>{t("header.group")}</Menu.Item>
        <Menu.Item key={4}>{t("header.backpack")}</Menu.Item>
        <Menu.Item key={5}>{t("header.private")}</Menu.Item>
        <Menu.Item key={6}>{t("header.cruise")}</Menu.Item>
        <Menu.Item key={7}>{t("header.hotel")}</Menu.Item>
        <Menu.Item key={8}>{t("header.local")}</Menu.Item>
        <Menu.Item key={9}>{t("header.theme")}</Menu.Item>
        <Menu.Item key={10}>{t("header.custom")}</Menu.Item>
        <Menu.Item key={11}>{t("header.study")}</Menu.Item>
        <Menu.Item key={12}>{t("header.visa")}</Menu.Item>
        <Menu.Item key={13}>{t("header.enterprise")}</Menu.Item>
        <Menu.Item key={14}>{t("header.high_end")}</Menu.Item>
        <Menu.Item key={15}>{t("header.outdoor")}</Menu.Item>
        <Menu.Item key={16}>{t("header.insurance")}</Menu.Item>
      </Menu>
    </div>
  );
};
