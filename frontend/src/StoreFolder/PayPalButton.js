import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { setPizzas } from "../StoreFolder/arraySlice";
import { useDispatch, useSelector } from "react-redux";
import { setSubTotal, updateCart, updateSubTotal } from "../StoreFolder/cartSlice";

const PayPalButton = ({ setError }) => {
  const CLIENT_ID = "enter uri here";

  const dispatch = useDispatch();

  //user Global Config
  const userInfo = useSelector((state) => state.userState.userInfo);
  const cartItems = useSelector((state) => {
    return state.cartArray.data;
  });
  const subTotal = useSelector((state) => {
    return state.cartArray.subtotal;
  });

  console.log("klsjdf", { cartItems, subTotal });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "10.00",
          },
          description: "Test Transaction",
        },
      ],
    });
  };

  const cleanCart = () => {
    //cleaning the cart
    dispatch(updateCart([]));
    dispatch(setSubTotal(0));
    localStorage.removeItem("cartItems");
    localStorage.removeItem("subTotal");
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log({ details });
      setError({
        color: "green",
        message: "Payment Sucessfull Enjoy Your Pizza Mr " + userInfo?.name,
      });

      setTimeout(() => {
        setError(null);
        cleanCart();
      }, 2000);
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
