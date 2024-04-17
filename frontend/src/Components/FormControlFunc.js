import React from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
const FormControlFunc = ({
  type = "text",
  isRequired = true,
  formLabel,
  value,
  handler,
}) => {
  return (
    <Box mt={2}>
      <FormControl isRequired={isRequired}>
        <FormLabel>{formLabel}</FormLabel>
        <Input type={type} value={value} onChange={handler} />
      </FormControl>
    </Box>
  );
};

export default FormControlFunc;
