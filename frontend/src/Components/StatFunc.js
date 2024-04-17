import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";

const StatFunc = ({ statlabel, price, quantity, fontSize = "20px" }) => {
  return (
    <Stat>
      <StatLabel fontWeight={"bold"} fontSize={fontSize}>
        {statlabel}
      </StatLabel>
      <StatNumber>{price * quantity}£ </StatNumber>
      <StatHelpText fontWeight={"bold"}>Feb 12 - Feb 28</StatHelpText>
    </Stat>
  );
};

export default StatFunc;
