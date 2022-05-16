import styles from "./App.module.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  HomePage,
  SignIn,
  Register,
  Detail,
  Search,
  ShoppingCart,
  Placeholder,
} from "./pages";
import { useEffect } from "react";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";
import React from "react";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const RouteComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Navigate to={{ pathname: "/signIn" }} />
    );
  };
  return <RouteComponent {...rest} />;
  // return <Route element={<RouteComponent {...rest} />} />;
};

function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    // 在登录时加载购物车信息
    if (jwt) {
      // @ts-ignore
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:touristRouteId" element={<Detail />} />
          {/* v6中不允许以这种形式来写可选参数 */}
          {/* <Route path="/search/:keywords?" element={<Search />} /> */}
          {/* 换用该写法完成可选参数 */}
          <Route path="/search">
            <Route path=":keywords" element={<Search />} />
            <Route path="" element={<Search />} />
          </Route>
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute
                isAuthenticated={jwt !== null}
                component={ShoppingCart}
              />
            }
          ></Route>
          <Route
            path="/placeOrder"
            element={
              <PrivateRoute
                isAuthenticated={jwt !== null}
                component={Placeholder}
              />
            }
          ></Route>
          <Route path="*" element={<>404 not found</>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
