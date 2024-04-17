import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Container } from "@chakra-ui/react";
import BadgeFunc from "./BadgeFunc";
import { Grid, GridItem } from "@chakra-ui/react";
import CardFunc from "./CardFunc";
import StatFunc from "./StatFunc";
import { useNavigate } from "react-router-dom";
import { updateNavState } from "../StoreFolder/navSlice";
import ErrorFunc from "./ErrorFunc";
import PayPalButton from "./PayPalButton";
import { setSubTotal, updateCart } from "../StoreFolder/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  //cartSlice global Config
  const cartItems = useSelector((state) => {
    return state.cartArray.data;
  });
  const subTotal = useSelector((state) => {
    return state.cartArray.subtotal;
  });

  //userGlobal State
  const userInfo = useSelector((state) => state.userState.userInfo);

  useEffect(() => {
    if (subTotal === 0) {
      dispatch(updateNavState(true));
      navigate("/");
      return;
    }
    return () => {
      //clean up
    };
  }, [navigate, subTotal, dispatch]);
  console.log(`get derived cart`, cartItems);

  const handlePayment = async (e) => {
    try {
      if (!userInfo) throw new Error("PLEASE LOGIN TO MAKE PAYMENT");

      console.log("will proceed with payment");
    } catch (error) {
      setError({
        color: "red",
        message: error.message,
      });
      setTimeout(() => {
        navigate("/UserAuth");
        setError(null);
      }, 2000);
    }
  };
  const cleanCart = () => {
    //cleaning the cart
    dispatch(updateCart([]));
    dispatch(setSubTotal(0));
    localStorage.removeItem("cartItems");
    localStorage.removeItem("subTotal");
  };
  return (
    <>
      <Navbar />
      <Container maxW="100%" mt={3} bg={"gray.100"}>
        <Box
          height={{ base: "300px", md: "500px", lg: "550px" }}
          overflowY={"auto"}
        >
          <Box padding={"5px"}>
            <Box>
              <BadgeFunc
                text={"My Cart"}
                colorScheme={"purple"}
                fontsize={"30px"}
              />
            </Box>
            <Box>
              <Grid
                mt={2}
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={4}
              >
                {cartItems?.map((data, idx) => {
                  return (
                    <GridItem
                      key={idx}
                      transition="all 0.3s ease"
                      _hover={{ shadow: "lg" }}
                    >
                      <CardFunc
                        idx={idx}
                        name={data.name}
                        image={data.image}
                        variant={data.variant}
                        price={data.price}
                        quantity={data.quantity}
                        _id={data._id}
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
      {error && <ErrorFunc color={error.color} message={error.message} />}
      <Box
        p={3}
        bg={"gray.100"}
        mt={2}
        transition={"all 0.3s ease"}
        _hover={{ shadow: "xl" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <StatFunc statlabel={"Subtotal :"} price={subTotal} quantity={1} />
        {/* {subTotal !== 0 && userInfo!=''  (
          <Button colorScheme="red" size={"lg"} onClick={handlePayment}>
            PayNow
          </Button>
        )?:''} */}
        {subTotal !== 0 && userInfo === "" ? (
          <Button colorScheme="red" size={"md"} onClick={handlePayment}>
            PayNow
          </Button>
        ) : (
          <PayPalButton setError={setError} />
        )}

        <Button
          colorScheme="red"
          size={"md"}
          onClick={(e) => cleanCart()}
          sx={{
            marginLeft: "2px",
          }}
        >
          Clear Cart
        </Button>
      </Box>
    </>
  );
};

export default Cart;
