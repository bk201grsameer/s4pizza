import { Text } from "@chakra-ui/react";
import React from "react";

const ErrorFunc = ({ color, message, fontSize = "25px" }) => {
  return (
    <Text color={color ? color : "red"} fontSize={fontSize}>
      {message}
    </Text>
  );
};

export default ErrorFunc;
