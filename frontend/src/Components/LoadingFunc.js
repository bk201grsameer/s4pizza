import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const LoadingFunc = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={2}
    >
      <Text>Loading....</Text>
      <Spinner ml={3} size={"lg"} />
    </Box>
  );
};

export default LoadingFunc;
