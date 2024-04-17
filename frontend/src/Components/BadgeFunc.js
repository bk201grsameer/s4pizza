import { Badge } from "@chakra-ui/react";
import React from "react";

const BadgeFunc = ({ text, fontsize = "20px", colorScheme = "yellow" }) => {
  return (
    <Badge colorScheme={colorScheme} fontSize={fontsize} borderRadius={"lg"}>
      {text}
    </Badge>
  );
};

export default BadgeFunc;
