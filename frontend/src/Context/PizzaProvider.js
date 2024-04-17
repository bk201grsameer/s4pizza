import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  // console.log("Pizza Provider", { pizzas });
  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/pizza/getallpizzas"
      );
      if (data.status === true) setPizzas(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // fetchPizzas();
    return () => {};
  }, []);
  return (
    <PizzaContext.Provider value={{ pizzas, setPizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};

const PizzaState = () => {
  return useContext(PizzaContext);
};

export { PizzaProvider, PizzaState };
