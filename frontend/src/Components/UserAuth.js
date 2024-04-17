import React from "react";
import AuthComp from "./AuthComp";
import Navbar from "./Navbar";
const UserAuth = () => {
  return (
    <div className="userAuth">
      <Navbar />
      <AuthComp />
    </div>
  );
};

export default UserAuth;
