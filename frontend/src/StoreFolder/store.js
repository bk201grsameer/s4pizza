import { configureStore } from "@reduxjs/toolkit";
import arrayReducer from "./arraySlice";
import cartReducer from "./cartSlice";
import navReducer from "./navSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    array: arrayReducer,
    cartArray: cartReducer,
    navGlobalState: navReducer,
    userState: userReducer,
  },
});
export { store };
