import { Box, Button } from "@chakra-ui/react";
import React from "react";

const SubmitAuthFunc = ({ text, handler, color = "red" }) => {
  return (
    <Box mt={2}>
      <Button
        w={"100%"}
        colorScheme={color}
        size={{ base: "md", md: "md", ld: "lg" }}
        onClick={handler}
      >
        {text}
      </Button>
    </Box>
  );
};

export default SubmitAuthFunc;
