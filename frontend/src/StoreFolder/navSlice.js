import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
  name: "navState",
  initialState: {
    navState: localStorage.getItem("navState")
      ? localStorage.getItem("navState")
      : "Login",
  },
  reducers: {
    updateNavState: (state, action) => {
      state.navState = action.payload;
    },
  },
});

export const { updateNavState } = navSlice.actions;
export default navSlice.reducer;
