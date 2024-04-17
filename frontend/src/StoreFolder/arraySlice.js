import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchArrayData = createAsyncThunk("array/fetchArrayData", async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/pizza/getallpizzas`
    );
    if (data.status === true) return data.message;
    return [];
  } catch (error) {
    console.log(error.message);
  }
  return [];
});

const arraySlice = createSlice({
  name: "array",
  initialState: {
    data: [],
    loading: false,
    error: null,
    loadingStatus: false,
  },
  reducers: {
    updateLoading: (state, action) => {
      state.loadingStatus = action.payload;
    },
    setPizzas: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArrayData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArrayData.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingStatus = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchArrayData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateLoading, setPizzas } = arraySlice.actions;
export { fetchArrayData };
export default arraySlice.reducer;
