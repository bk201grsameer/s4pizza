import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import Cart from "./Components/Cart";
import HomePage from "./Components/HomePage";
import UserAuth from "./Components/UserAuth";
import Billings from "./Components/Billings";

const App = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/UserAuth" element={<UserAuth />} />
        <Route exact path="/billings" element={<Billings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
