import React from "react";
// import { pizzas } from "../staticdata";
import { Box, Grid, Spinner } from "@chakra-ui/react";
import PizzaComponent from "./PizzaComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPizzas } from "../StoreFolder/arraySlice";

const HomeScreen = () => {
  // const { pizzas } = PizzaState();
  const dispatch = useDispatch();
  const pizzas = useSelector((state) => state.array.data);

  const loadingStatus = useSelector((state) => {
    return state.array.loadingStatus;
  });

  //userGlobal State
  const userInfo = useSelector((state) => state.userState.userInfo);

  console.log(`get derived`, { pizzas, loadingStatus, userInfo });
  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/pizza/getallpizzas`
      );
      if (data.status === false) throw new Error(data.message);
      console.log(data);
      dispatch(setPizzas(data.message))
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchPizzas();
  }, []);
  return (
    <Grid
      mt={"20px"}
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
    >
      {!loadingStatus && pizzas ? (
        pizzas.map((pizza, idx) => {
          return <PizzaComponent key={idx} pizza={pizza} />;
        })
      ) : (
        <Box display={"flex"} justifyContent={"center"}>
          Loading..... <Spinner size="lg" />
        </Box>
      )}
    </Grid>
  );
};
export default HomeScreen;
