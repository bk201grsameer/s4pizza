import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { IconButton, Stack, useBreakpointValue } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../StoreFolder/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = (e) => setIsOpen(!isOpen);

  //userInfo global config
  const userInfo = useSelector((state) => {
    return state.userState.userInfo;
  });

  //cartSlice global config
  const cartItems = useSelector((state) => state.cartArray.data);

  //navBarSate global config
  const navState = useSelector((state) => state.navGlobalState.navState);

  console.log("get derived", { navState });
  const display = useBreakpointValue({
    base: isOpen ? "block" : "none",
    md: "flex",
  });

  return (
    <>
      <Container
        padding={"15px"}
        maxW={"100%"}
        display={{ base: "block", md: "flex" }}
        fontSize={{ base: "18px", md: "25px" }}
        color={"black.600"}
        boxShadow={"lg"}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text padding={"10px"}>
            <Badge
              colorScheme={"purple"}
              fontSize={{ base: "18px", md: "25px" }}
              borderRadius={"lg"}
              cursor={"pointer"}
              transition="all 0.3s ease"
              _hover={{ color: "red.500", shadow: "xl" }}
              onClick={(e) => {
                navigate("/");
              }}
            >
              Yummy Pizza 😋
            </Badge>
          </Text>
          <IconButton
            display={{ base: "block", md: "none" }}
            onClick={toggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Navigation"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
          />
        </Box>
        <Box
          display={display}
          width={{ base: "full", md: "auto" }}
          ml={"auto"}
          mt={"15px"}
        >
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Text
              transition="all 0.3s ease"
              _hover={{ color: "blue.500", shadow: "lg" }}
              cursor={"pointer"}
              padding={"10px"}
              onClick={(e) => {
                navigate("/");
              }}
            >
              Home
            </Text>

            {userInfo === "" ? (
              <Text
                transition="all 0.3s ease"
                _hover={{ color: "blue.500", shadow: "lg" }}
                cursor={"pointer"}
                padding={"10px"}
                onClick={(e) => {
                  navigate("/UserAuth");
                }}
              >
                Login
              </Text>
            ) : (
              <Text
                transition="all 0.3s ease"
                _hover={{ color: "blue.500", shadow: "lg" }}
                cursor={"pointer"}
                padding={"10px"}
                onClick={(e) => {
                  localStorage.removeItem("userInfo");
                  dispatch(setUserInfo(""));
                  navigate("/");
                }}
              >
                LogOut
              </Text>
            )}
            {userInfo !== "" && (
              <Text
                transition="all 0.3s ease"
                _hover={{ color: "blue.500", shadow: "lg" }}
                cursor={"pointer"}
                padding={"10px"}
                onClick={(e) => {
                  navigate("/billings");
                }}
              >
                Orders
              </Text>
            )}

            <Box position={"relative"}>
              <Text
                padding={"10px"}
                cursor="pointer"
                transition="all 0.3s ease"
                position={"relative"}
                _hover={{ color: "blue.500", shadow: "lg" }}
                onClick={(e) => {
                  navigate("/cart");
                }}
              >
                Cart
              </Text>
              {cartItems?.length > 0 && (
                <IconButton
                  variant="ghost"
                  icon={<FiShoppingCart />}
                  isRound={true}
                  position="absolute"
                  // border={"1px solid red"}
                  top={"-8px"}
                  right={"-10px"}
                  onClick={(e) => {
                    navigate("/cart");
                  }}
                />
              )}
              {cartItems?.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-16px",
                    right: "-10px",
                    fontSize: "20px",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Navbar;
