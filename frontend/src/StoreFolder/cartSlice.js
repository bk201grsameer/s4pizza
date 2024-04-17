import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    subtotal: localStorage.getItem("subTotal")
      ? JSON.parse(localStorage.getItem("subTotal")).subTotal
      : 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
    updateCart: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
    updateSubTotal: (state, action) => {
      state.subtotal += action.payload;
      localStorage.setItem(
        "subTotal",
        JSON.stringify({ subTotal: state.subtotal })
      );
    },
    setSubTotal: (state, action) => {
      state.subtotal = action.payload;
    },
  },
});

export const { addToCart, updateCart, updateSubTotal,setSubTotal } = cartSlice.actions;
export default cartSlice.reducer;
