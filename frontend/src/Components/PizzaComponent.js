import React, { useState } from "react";
import {
  GridItem,
  Box,
  Card,
  Text,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import BadgeFunc from "./BadgeFunc";
import { Select } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import PizzaModal from "./PizzaModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateSubTotal } from "../StoreFolder/cartSlice";
const PizzaComponent = ({ pizza }) => {
  // const [quantities, setQuantities] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const quantities=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(pizza.prices[0].price);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("small");

  //cart global state config
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    return state.cartArray.data;
  });

  console.log(`get derived`, cartItems);

  //handle option selection for price
  const handlePriceOption = (e) => {
    setPrice(e.target.value);
    setVariant(e.target.options[e.target.selectedIndex].text);
  };
  //handle option selection for quantity
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  //add to item cart
  const handleAddItemToCart = (e) => {
    console.log("item", { price, quantity, pizza });
    const cardItem = {
      name: pizza.name,
      _id: pizza._id,
      image: pizza.image,
      quantity: quantity,
      variant: variant,
      price: price,
    };
    dispatch(addToCart(cardItem));
    dispatch(updateSubTotal(quantity * price));
  };
  return (
    <>
      {pizza && (
        <>
          <GridItem shadow={"lg"}>
            <Box>
              <Card>
                <Box p={4}>
                  <Text textAlign={"center"}>
                    <BadgeFunc text={pizza.name} />
                  </Text>
                  <Box display={"flex"} justifyContent={"center"} mt={"2"}>
                    <Image
                      onClick={onOpen}
                      boxSize={{ base: 260, md: 260 }}
                      name="Segun Adebayo"
                      src={pizza.image}
                      borderRadius={"130px"}
                    />
                  </Box>
                  <Box display={"flex"} justifyContent={"space-around"}>
                    <Box>
                      <Text textAlign={"center"} fontWeight={"bold"}>
                        Varients:
                      </Text>
                      <Select
                        onClick={handlePriceOption}
                        size={"md"}
                        mt={2}
                        w={"125px"}
                        fontSize={"18px"}
                        fontWeight={"bold"}
                      >
                        {pizza &&
                          pizza.prices?.map((price, idx) => {
                            return (
                              <option key={idx} value={price.price}>
                                {price.type}
                              </option>
                            );
                          })}
                      </Select>
                    </Box>
                    <Box>
                      <Text textAlign={"center"} fontWeight={"bold"}>
                        Quantity:
                      </Text>
                      <Select
                        fontSize={"18px"}
                        fontWeight={"bold"}
                        onClick={handleQuantity}
                        size={"md"}
                        mt={2}
                        w={"125px"}
                      >
                        {pizza &&
                          quantities?.map((q, idx) => {
                            return (
                              <option key={idx} value={idx + 1}>
                                {idx + 1}
                              </option>
                            );
                          })}
                      </Select>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    mt={"15px"}
                  >
                    <Text
                      textAlign={"center"}
                      mt={2}
                      fontWeight={"bold"}
                      fontSize={"16px"}
                    >
                      Price : {price} {"  "} £
                    </Text>
                    <Button
                      fontWeight={"bold"}
                      fontSize={"16px"}
                      colorScheme={"red"}
                      onClick={handleAddItemToCart}
                    >
                      Add To Cart <AddIcon ml={2} />
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </GridItem>
          <PizzaModal pizza={pizza} isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
};

export default PizzaComponent;
