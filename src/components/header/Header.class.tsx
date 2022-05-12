import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import store, { RootState } from "../../redux/store";
// import { languageState } from "../../redux/language/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface Props {
  params: Function;
}

// 由于使用connect后，在props拿到store数据，state暂时不需操作故无用
// interface State extends languageState {
//   // language: "zh" | "en";
//   // languageList: { name: string; code: string }[];
// }

function myWithRouter(HeaderComponent) {
  return (props) => {
    return (
      <HeaderComponent {...props} params={useNavigate()}></HeaderComponent>
    );
  };
}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.languageReducer.language,
    languageList: state.languageReducer.languageList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = Props &
  WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HeaderComponent extends React.Component<PropsType> {
  // constructor(props) {
  //   super(props);
  //   const storeState = store.getState();
  // 通过connect将props与store连接后不需在这里初始该state
  // 同时也不需要订阅store
  // this.state = {
  //   language: storeState.language,
  //   languageList: storeState.languageList,
  // };
  // store.subscribe(this.handleStateChange);
  // }

  // store订阅处理函数，在使用react-redux后已经没用
  // handleStateChange = () => {
  //   const storeNewState = store.getState();
  //   this.setState({
  //     language: storeNewState.language,
  //     languageList: storeNewState.languageList,
  //   });
  // };

  menuClickHandler = (e) => {
    if (e.key === "new") {
      // 添加新语言
      // const action = {
      //   type: "add_language",
      //   payload: { code: "new_lang", name: "新语言" },
      // };
      // const action = addLanguageActionCreator("新语言", "new_language");
      // store.dispatch(action);
      this.props.addLanguage("新语言", "new_lang");
    } else {
      // const action = {
      //   type: "change_language",
      //   payload: e.key,
      // };
      // const action = changeLanguageActionCreator(e.key);
      // store.dispatch(action);
      this.props.changeLanguage(e.key);
    }
  };

  render() {
    const { params, t } = this.props;
    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                  })}
                  {/* <Menu.Item>中文</Menu.Item> */}
                  {/* <Menu.Item>English</Menu.Item> */}
                  <Menu.Item key={"new"}>
                    {t("header.add_new_language")}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined></GlobalOutlined>}
            >
              {this.props.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button
                onClick={() => {
                  params("/register");
                }}
              >
                {t("header.register")}
              </Button>
              <Button
                onClick={() => {
                  params("/signIn");
                }}
              >
                {t("header.signin")}
              </Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span
            onClick={() => {
              params("/");
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
  }
}

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(myWithRouter(HeaderComponent)));

// export const Header: React.FC = () => {
//   let navigate = useNavigate();

// };
