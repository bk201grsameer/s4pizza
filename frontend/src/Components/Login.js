import { Box, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../StoreFolder/userSlice";
import ErrorFunc from "./ErrorFunc";
import FormControlFunc from "./FormControlFunc";
import LoadingFunc from "./LoadingFunc";
import SubmitAuthFunc from "./SubmitAuthFunc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginState, setLoginState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //email handler
  const emailHanlder = (e) => {
    setEmail(e.target.value);
  };

  //password handler
  const passwordHanlder = (e) => {
    setPassword(e.target.value);
  };

  //login Handler
  const loginHandler = async (e) => {
    try {
      if (!email || !password) throw new Error("ALL FIELDS REQUIRED");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoginState(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
        {
          email: email,
          password: password,
        },
        config
      );
      if (data.status === false) throw new Error(data.message);
      localStorage.setItem("userInfo", JSON.stringify(data.message));
      //updating userInfo
      dispatch(setUserInfo(data.message));
      //routing to the cart site
      setTimeout(() => {
        setLoginState(false);
        navigate("/cart");
      }, 2000);
    } catch (error) {
      setLoginState(false);
      setError({
        color: "red",
        message: error.message,
      });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  return (
    <Box>
      {error !== null && (
        <ErrorFunc color={error.color} message={error.message} />
      )}
      <FormControlFunc
        formLabel={"Email"}
        value={email}
        handler={emailHanlder}
      />
      <FormControlFunc
        formLabel={"Password"}
        value={password}
        type={"password"}
        handler={passwordHanlder}
      />
      <SubmitAuthFunc text={"Login"} handler={loginHandler} />
      {loginState && <LoadingFunc />}
    </Box>
  );
};

export default Login;
