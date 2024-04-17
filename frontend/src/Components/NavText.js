import { Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavText = ({ text, route,handler }) => {
  const navigate = useNavigate();
  return (
    <Text
      transition="all 0.3s ease"
      _hover={{ color: "blue.500", shadow: "lg" }}
      cursor={"pointer"}
      padding={"10px"}
      onClick={(e) => {
        navigate(route);
      }}
    >
      {text}
    </Text>
  );
};

export default NavText;
