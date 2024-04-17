import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../StoreFolder/userSlice";
import ErrorFunc from "./ErrorFunc";
import FormControlFunc from "./FormControlFunc";
import SubmitAuthFunc from "./SubmitAuthFunc";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //userGlobal State
  const userInfo = useSelector((state) => state.userState.userInfo);
  console.log("get derived 20", { userInfo });
  //name handler
  const nameHanlder = (e) => {
    setName(e.target.value);
  };
  //email handler
  const emailHanlder = (e) => {
    setEmail(e.target.value);
  };

  //password handler
  const passwordHanlder = (e) => {
    setPassword(e.target.value);
  };

  //confirm password handler
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  //login Handler
  const signUpHandler = async (e) => {
    console.log({ name, email, password, confirmPassword });
    try {
      if (!name || !email || !password || !confirmPassword)
        throw new Error("ALL FIELDS REQUIRED");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (password !== confirmPassword)
        throw new Error("password doesnot match");
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
        { name: name, email: email, password: password },
        config
      );
      console.log({ data });
      if (data.status === false) throw new Error(data.message);
      dispatch(setUserInfo(data.message));
      localStorage.setItem("userInfo", JSON.stringify(data.message));
      navigate("/cart");
    } catch (error) {
      setError({
        color: "red",
        message: error.message,
      });
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
  };
  return (
    <Box>
      {error !== null && (
        <ErrorFunc color={error.color} message={error.message} />
      )}
      <FormControlFunc
        formLabel={"Name"}
        value={name}
        handler={nameHanlder}
        type={"text"}
      />
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
      <FormControlFunc
        formLabel={"ConfirmPassword"}
        value={confirmPassword}
        type={"password"}
        handler={confirmPasswordHandler}
      />
      <SubmitAuthFunc text={"SignUp"} handler={signUpHandler} />
    </Box>
  );
};

export default SignUp;
