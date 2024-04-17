import React from "react";
import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import BadgeFunc from "./BadgeFunc";
import StatFunc from "./StatFunc";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, updateSubTotal } from "../StoreFolder/cartSlice";

const CardFunc = ({ idx, name, _id, image, price, quantity, variant }) => {
  const dispatch = useDispatch();
  //cartSlice global config
  const cartItems = useSelector((state) => {
    return state.cartArray.data;
  });

  //remove item from the cart
  const handle_Remove_Item_FromCart = (e) => {
    console.log(_id);
    dispatch(updateSubTotal(-1 * quantity * price));
    const newCartItems = cartItems.filter((data, index) => {
      return index !== idx;
    });
    dispatch(updateCart(newCartItems));
  };
  return (
    <Card>
      <CardBody>
        <Box display={"flex"}>
          <Box flexBasis={"70%"}>
            <Box>
              <BadgeFunc text={name} colorScheme={"red"} />
            </Box>
            <Box mt={1} p={1}>
              <Text fontWeight={"bold"}>Type : {variant}</Text>
              <Text fontWeight={"bold"}>Price : {price}</Text>
              <Text fontWeight={"bold"}>Quantity : {quantity}</Text>
              <StatFunc
                statlabel={"Total Cost"}
                price={price}
                quantity={quantity}
              />
            </Box>
          </Box>
          <Box
            flexBasis={"30%"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            alignContent={"center"}
            flexDir="column"
          >
            <Image src={image} boxSize="100px" />
            <Text fontSize={"20px"} cursor={"pointer"}>
              <DeleteIcon onClick={handle_Remove_Item_FromCart} />
            </Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CardFunc;
