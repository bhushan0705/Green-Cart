import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    shippingAddress: [], 
  },
  reducers: {
    saveAddress: (state, action) => {
      state.shippingAddress.push(action.payload);
    },
    clearAddress: (state) => {
      state.shippingAddress = [];
    },
  },
});

export const { saveAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;

