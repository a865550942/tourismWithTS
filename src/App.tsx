import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, SignIn, Register, Detail } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:touristRouteId" element={<Detail />} />
          <Route path="*" element={<>404 not found</>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
